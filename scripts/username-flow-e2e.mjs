#!/usr/bin/env node
/**
 * Username flow E2E: fetch-profile -> analyze -> results page.
 * Run against a dev server in mock mode: TEST_BASE_URL=http://localhost:3000
 */
const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";
let cookie = "";
let failed = false;

function check(name, pass, detail = "") {
	if (!pass) failed = true;
	console.log(`[${pass ? "PASS" : "FAIL"}] ${name}${detail ? ` - ${detail}` : ""}`);
}

async function post(path, body) {
	const res = await fetch(`${BASE}${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Cookie: cookie },
		body: JSON.stringify(body),
	});
	return { status: res.status, body: await res.json() };
}

const home = await fetch(`${BASE}/`);
cookie = (home.headers.get("set-cookie") ?? "").split(";")[0] ?? "";
check("session cookie issued", cookie.includes("="));

const invalid = await post("/api/fetch-profile", { username: "not valid" });
check("rejects an invalid username", invalid.status === 400, invalid.body.error);

const profile = await post("/api/fetch-profile", {
	username: "https://www.linkedin.com/in/jane-doe/",
});
check(
	"fetches a profile from a URL",
	profile.status === 200 && profile.body.profile?.name === "Jane Doe",
	profile.body.error ?? profile.body.profile?.name,
);

const analysis = await post("/api/analyze", {
	snapshotId: profile.body.snapshotId,
	careerGoal: "Move into a senior product role at a fintech company",
});
check("analyzes the snapshot", analysis.status === 200, analysis.body.error);

const results = await fetch(`${BASE}/results/${analysis.body.analysisId}`, {
	headers: { Cookie: cookie },
});
check("results page loads", results.status === 200, String(results.status));

let limited = false;
for (let i = 0; i < 6 && !limited; i++) {
	limited = (await post("/api/fetch-profile", { username: "jane-doe" })).status === 429;
}
check("rate limits repeated lookups", limited);

process.exit(failed ? 1 : 0);
