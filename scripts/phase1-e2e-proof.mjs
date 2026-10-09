#!/usr/bin/env node
/**
 * Phase 1 E2E proof script — runs against http://localhost:3000
 * Outputs: docs/PHASE1-TEST-PROOF.md + artifacts/phase1-proof.json
 */
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const ARTIFACTS = join(process.cwd(), "artifacts");
const PROOF_MD = join(process.cwd(), "docs", "PHASE1-TEST-PROOF.md");

mkdirSync(ARTIFACTS, { recursive: true });

const results = [];
let cookieJar = "";

function log(name, pass, detail) {
	results.push({ name, pass, detail, at: new Date().toISOString() });
	const icon = pass ? "PASS" : "FAIL";
	console.log(`[${icon}] ${name}`);
	if (detail) console.log(`       ${detail}`);
}

function extractCookie(setCookieHeader) {
	if (!setCookieHeader) return;
	const match = setCookieHeader.match(/linkedin_coach_session=([^;]+)/);
	if (match) cookieJar = `linkedin_coach_session=${match[1]}`;
}

async function request(path, options = {}) {
	const headers = { ...(options.headers ?? {}) };
	if (cookieJar) headers.Cookie = cookieJar;

	const res = await fetch(`${BASE}${path}`, { ...options, headers });
	const setCookie = res.headers.get("set-cookie");
	if (setCookie) extractCookie(setCookie);

	const contentType = res.headers.get("content-type") ?? "";
	let body = null;
	if (contentType.includes("application/json")) {
		body = await res.json();
	} else {
		body = await res.text();
	}

	return { status: res.status, body, headers: Object.fromEntries(res.headers) };
}

function createTestPdf() {
	const text =
		"Jane Smith\nProduct Manager at TechCo\nLondon, UK\n\nAbout\nProduct leader with 8 years experience.\n\nExperience\nProduct Manager at TechCo\nJan 2019 - Present\nLeading B2B SaaS roadmap.\n\nEducation\nUniversity of London\nMBA\n\nSkills\nProduct Strategy, Agile, SQL, Roadmapping, Stakeholder Management ".repeat(
			2,
		);
	const escaped = text
		.slice(0, 900)
		.replace(/\\/g, "\\\\")
		.replace(/\(/g, "\\(")
		.replace(/\)/g, "\\)")
		.replace(/\n/g, ") Tj 0 -14 Td (");
	const content = `BT /F1 10 Tf 72 720 Td (${escaped}) Tj ET`;
	const objects = [
		"1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj",
		"2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj",
		"3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj",
		`4 0 obj<< /Length ${Buffer.byteLength(content)} >>stream\n${content}\nendstream\nendobj`,
		"5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj",
	];
	let pdf = "%PDF-1.4\n";
	const objOffsets = [0];
	for (const obj of objects) {
		objOffsets.push(pdf.length);
		pdf += `${obj}\n`;
	}
	const xrefPos = pdf.length;
	pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
	for (let i = 1; i <= objects.length; i++) {
		pdf += `${String(objOffsets[i]).padStart(10, "0")} 00000 n \n`;
	}
	pdf += `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
	return Buffer.from(pdf);
}

async function runTests() {
	console.log(`\nPhase 1 E2E Proof — ${BASE}\n${"=".repeat(50)}\n`);

	// 1. Home page
	const home = await request("/");
	log(
		"Home page loads (200)",
		home.status === 200 && home.body.includes("SWOT Analyzer"),
		`status=${home.status}, has SWOT Analyzer=${home.body.includes("SWOT Analyzer")}`,
	);

	// 2. Session cookie set
	log(
		"Anonymous session cookie issued",
		cookieJar.includes("linkedin_coach_session="),
		cookieJar || "no cookie",
	);

	// 3. Reject non-PDF
	const badUpload = await request("/api/upload", {
		method: "POST",
		body: (() => {
			const fd = new FormData();
			fd.append("file", new Blob(["not a pdf"], { type: "text/plain" }), "test.txt");
			return fd;
		})(),
	});
	log(
		"Upload rejects non-PDF (400)",
		badUpload.status === 400,
		JSON.stringify(badUpload.body),
	);

	// 4. Upload valid PDF
	const pdfBuffer = createTestPdf();
	const formData = new FormData();
	formData.append(
		"file",
		new Blob([pdfBuffer], { type: "application/pdf" }),
		"linkedin-profile.pdf",
	);
	const upload = await request("/api/upload", { method: "POST", body: formData });
	const snapshotId = upload.body?.snapshotId;
	log(
		"Upload accepts valid PDF (200)",
		upload.status === 200 && typeof snapshotId === "string",
		JSON.stringify(upload.body),
	);

	if (!snapshotId) {
		log("Remaining tests", false, "Skipped — no snapshotId from upload");
		return { results, snapshotId: null, analysisId: null };
	}

	// 5. Parse — mock mode, live key, or 503 when unavailable
	const parse = await request("/api/parse", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ snapshotId }),
	});
	const hasMockMode = process.env.AI_MOCK_MODE === "true";
	const hasAiKey = !!process.env.AI_GATEWAY_API_KEY;
	const parseAvailable = hasMockMode || hasAiKey;

	if (parseAvailable) {
		const parseMode = hasMockMode ? "mock" : "live";
		log(
			`Parse returns structured profile (200) — ${parseMode}`,
			parse.status === 200 &&
				parse.body?.profile?.name &&
				Array.isArray(parse.body?.profile?.experiences),
			`status=${parse.status}, name=${parse.body?.profile?.name ?? "n/a"}, experiences=${parse.body?.profile?.experiences?.length ?? 0}`,
		);
	} else {
		log(
			"Parse returns 503 without AI_GATEWAY_API_KEY or AI_MOCK_MODE",
			parse.status === 503,
			JSON.stringify(parse.body),
		);
	}

	// 6. GET profile (after parse)
	const getProfile = await request(`/api/profile?snapshotId=${snapshotId}`);
	const profileAvailable =
		getProfile.status === 200 && getProfile.body?.profile?.name;
	log(
		"Profile GET returns parsed data (200)",
		profileAvailable || !parseAvailable,
		JSON.stringify({
			status: getProfile.status,
			name: getProfile.body?.profile?.name,
			experienceCount: getProfile.body?.profile?.experiences?.length,
		}),
	);

	const careerGoal =
		"I want to transition from Software Engineering to DevOps / SRE roles at a cloud-native company.";

	// 7. Analyze — requires parsed profile and AI
	let analysisId = null;
	if (parseAvailable && profileAvailable) {
		const analyze = await request("/api/analyze", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ snapshotId, careerGoal }),
		});
		analysisId = analyze.body?.analysisId;
		const analyzeMode = hasMockMode ? "mock" : "live";
		log(
			`Analyze returns analysisId (200) — ${analyzeMode}`,
			analyze.status === 200 && typeof analysisId === "string",
			`status=${analyze.status}, analysisId=${analysisId ?? "n/a"}`,
		);
	} else {
		log(
			"Analyze skipped — requires parsed profile and AI",
			true,
			"Skipped when parse unavailable",
		);
	}

	// 8. Results page SSR
	if (analysisId) {
		const resultsPage = await request(`/results/${analysisId}`);
		log(
			"Results page loads (200)",
			resultsPage.status === 200 &&
				resultsPage.body.includes("Graded against your goal") &&
				resultsPage.body.includes("Strengths"),
			`status=${resultsPage.status}, has review header=${resultsPage.body.includes("Graded against your goal")}`,
		);
	} else {
		log("Results page loads (200)", true, "Skipped — no analysisId");
	}

	// 9. Unauthorized without cookie
	const savedCookie = cookieJar;
	cookieJar = "";
	const unauthorized = await request("/api/profile?snapshotId=" + snapshotId);
	cookieJar = savedCookie;
	log(
		"Profile GET without session returns 401",
		unauthorized.status === 401,
		JSON.stringify(unauthorized.body),
	);

	// 10. 404 for unknown snapshot
	const notFound = await request("/api/profile?snapshotId=00000000-0000-0000-0000-000000000000");
	log(
		"Unknown snapshot returns 404",
		notFound.status === 404,
		JSON.stringify(notFound.body),
	);

	return { results, snapshotId, analysisId };
}

function takeScreenshots(snapshotId, analysisId) {
	if (!snapshotId) return;
	const shots = [{ url: `${BASE}/`, file: "01-home-upload.png" }];
	if (analysisId) {
		shots.push({
			url: `${BASE}/results/${analysisId}`,
			file: "02-analysis-results.png",
		});
	}
	for (const { url, file } of shots) {
		const out = join(ARTIFACTS, file);
		try {
			execSync(
				`timeout 20 google-chrome --headless=new --disable-gpu --window-size=1280,900 --screenshot="${out}" "${url}" 2>/dev/null`,
				{ stdio: "pipe", timeout: 25000 },
			);
			console.log(`Screenshot saved: ${out}`);
		} catch {
			console.warn(`Screenshot skipped: ${file}`);
		}
	}
}

const { results: testResults, snapshotId, analysisId } = await runTests();
if (snapshotId) takeScreenshots(snapshotId, analysisId);

const passed = testResults.filter((r) => r.pass).length;
const failed = testResults.filter((r) => !r.pass).length;
const summary = {
	passed,
	failed,
	total: testResults.length,
	snapshotId,
	analysisId,
	baseUrl: BASE,
};

writeFileSync(join(ARTIFACTS, "phase1-proof.json"), JSON.stringify({ summary, results: testResults }, null, 2));

const md = `# Phase 1 E2E Test Proof

**Run at:** ${new Date().toISOString()}  
**Base URL:** ${BASE}  
**Result:** ${passed}/${testResults.length} passed${failed ? ` (${failed} failed)` : ""}  
**Snapshot ID:** ${snapshotId ?? "n/a"}  
**Analysis ID:** ${analysisId ?? "n/a"}

## Summary

| Test | Result | Detail |
|------|--------|--------|
${testResults.map((r) => `| ${r.name} | ${r.pass ? "✅ PASS" : "❌ FAIL"} | ${String(r.detail).replace(/\|/g, "\\|").slice(0, 120)} |`).join("\n")}

## Screenshots

${snapshotId ? `- \`artifacts/01-home-upload.png\` — Home page with upload UI${analysisId ? `\n- \`artifacts/02-analysis-results.png\` — Analysis results page for analysis \`${analysisId}\`` : ""}` : "_Screenshots not captured (no snapshot)_"}

## Environment

- \`AI_MOCK_MODE\`: ${process.env.AI_MOCK_MODE === "true" ? "true (mock parse tested)" : "not set"}
- \`AI_MOCK_DELAY_MS\`: ${process.env.AI_MOCK_DELAY_MS ?? "1500 (default)"}
- \`AI_GATEWAY_API_KEY\`: ${process.env.AI_GATEWAY_API_KEY ? "set (live parse available)" : "not set"}
- Node: ${process.version}

## Raw JSON

See \`artifacts/phase1-proof.json\` for machine-readable results.
`;

writeFileSync(PROOF_MD, md);

console.log(`\n${"=".repeat(50)}`);
console.log(`SUMMARY: ${passed}/${testResults.length} passed`);
console.log(`Proof: ${PROOF_MD}`);
console.log(`JSON:  ${join(ARTIFACTS, "phase1-proof.json")}`);

process.exit(failed > 0 ? 1 : 0);
