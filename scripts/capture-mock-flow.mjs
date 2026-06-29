#!/usr/bin/env node
/**
 * Capture screenshots and video of the AI mock mode flow.
 * Requires dev server running with AI_MOCK_MODE=true.
 */
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const ARTIFACTS = join(process.cwd(), "artifacts");
const VIDEO_DIR = join(ARTIFACTS, "videos");

mkdirSync(ARTIFACTS, { recursive: true });
mkdirSync(VIDEO_DIR, { recursive: true });

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

async function waitForServer(maxAttempts = 30) {
	for (let i = 0; i < maxAttempts; i++) {
		try {
			const res = await fetch(BASE);
			if (res.ok) return;
		} catch {
			// retry
		}
		await new Promise((r) => setTimeout(r, 1000));
	}
	throw new Error(`Server not reachable at ${BASE}`);
}

async function captureFlow() {
	await waitForServer();

	const pdfPath = join(ARTIFACTS, "test-linkedin-profile.pdf");
	writeFileSync(pdfPath, createTestPdf());

	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({
		viewport: { width: 1280, height: 900 },
		recordVideo: {
			dir: VIDEO_DIR,
			size: { width: 1280, height: 900 },
		},
	});
	const page = await context.newPage();

	const shots = [];

	console.log("1. Home page with mock banner...");
	await page.goto(BASE, { waitUntil: "domcontentloaded" });
	await page.waitForSelector("text=AI mock mode");
	await page.waitForSelector("text=SWOT Analyzer");
	await page.waitForTimeout(1000);
	const homeShot = join(ARTIFACTS, "mock-flow-01-home.png");
	await page.screenshot({ path: homeShot, fullPage: true });
	shots.push({
		file: "mock-flow-01-home.png",
		label: "Homepage — light theme with form",
	});

	console.log("2. Uploading PDF and entering career goal...");
	const fileInput = page.locator("#pdf-upload-input");
	await fileInput.setInputFiles(pdfPath);
	await page
		.locator("#career-goal")
		.fill(
			"I want to transition from Software Engineering to Product Management at a fast-growing tech startup.",
		);
	await page.waitForTimeout(500);
	const formFilledShot = join(ARTIFACTS, "mock-flow-02-form-filled.png");
	await page.screenshot({ path: formFilledShot, fullPage: true });
	shots.push({
		file: "mock-flow-02-form-filled.png",
		label: "Form filled with PDF and career goal",
	});

	console.log("3. Submitting and capturing loading screen...");
	await page.getByRole("button", { name: /Generate Strategic Analysis/ }).click();

	let loadingCaptured = false;
	try {
		await page.waitForSelector("text=AI is analysing your profile", {
			timeout: 8000,
		});
		await page.waitForTimeout(600);
		const loadingShot = join(ARTIFACTS, "mock-flow-03-loading.png");
		await page.screenshot({ path: loadingShot, fullPage: true });
		shots.push({
			file: "mock-flow-03-loading.png",
			label: "Full-page analysis loading screen",
		});
		loadingCaptured = true;
	} catch {
		console.warn("Loading screen was too fast to capture — continuing...");
	}

	if (!loadingCaptured) {
		const busyShot = join(ARTIFACTS, "mock-flow-03-loading.png");
		await page.screenshot({ path: busyShot, fullPage: true });
		shots.push({
			file: "mock-flow-03-loading.png",
			label: "Analysis in progress",
		});
	}

	console.log("4. Waiting for profile review page...");
	await page.waitForSelector("text=Review your profile", { timeout: 45000 });
	await page.waitForTimeout(800);
	const reviewShot = join(ARTIFACTS, "mock-flow-04-profile-review.png");
	await page.screenshot({ path: reviewShot, fullPage: true });
	shots.push({
		file: "mock-flow-04-profile-review.png",
		label: "Profile review with career goal banner",
	});

	const profileUrl = page.url();
	const snapshotId = profileUrl.split("/profile/")[1]?.split("?")[0] ?? "unknown";

	await context.close();
	await browser.close();

	const videoFiles = execSync(`ls -t ${VIDEO_DIR}`, { encoding: "utf8" })
		.trim()
		.split("\n")
		.filter(Boolean);
	const latestVideo = videoFiles[0];
	if (latestVideo) {
		const videoSrc = join(VIDEO_DIR, latestVideo);
		const videoDest = join(ARTIFACTS, "mock-flow-demo.webm");
		execSync(`cp "${videoSrc}" "${videoDest}"`);
	}

	const summary = {
		capturedAt: new Date().toISOString(),
		baseUrl: BASE,
		snapshotId,
		profileUrl,
		screenshots: shots,
		video: "mock-flow-demo.webm",
	};

	writeFileSync(
		join(ARTIFACTS, "mock-flow-capture.json"),
		JSON.stringify(summary, null, 2),
	);

	console.log("\nCapture complete:");
	console.log("  Video:  artifacts/mock-flow-demo.webm");
	for (const shot of shots) {
		console.log(`  Image:  artifacts/${shot.file} — ${shot.label}`);
	}
	console.log(`  Profile: ${profileUrl}`);

	return summary;
}

captureFlow().catch((error) => {
	console.error("Capture failed:", error);
	process.exit(1);
});
