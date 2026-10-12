#!/usr/bin/env node
/**
 * Screenshots of the paywall, mock checkout and paid features.
 * Requires `pnpm dev:mock` running.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const OUT = join(process.cwd(), "artifacts", "monetization");
mkdirSync(OUT, { recursive: true });

const shot = (page, name, options = {}) =>
	page.screenshot({ path: join(OUT, `${name}.png`), ...options });

async function runReview(page, username, goal) {
	await page.goto(BASE, { waitUntil: "load" });
	// Wait for hydration so the submit runs the client handler.
	await page.waitForTimeout(2500);
	await page.fill("#linkedin-username", username);
	await page.fill("#career-goal", goal);
	await page.click('button[type="submit"]');
	await page.waitForURL(/\/results\//, { timeout: 60_000 });
	await page.waitForLoadState("load");
	await page.waitForTimeout(1500);
}

async function pay(page, { phone = "923456789" } = {}) {
	const dialog = page.getByRole("dialog");
	await dialog.getByPlaceholder("you@example.com").fill("ana@example.com");
	const tel = dialog.locator('input[type="tel"]');
	if (await tel.count()) {
		await tel.fill(phone);
	}
	await dialog.getByRole("button", { name: /^Pay / }).click();
	await dialog.getByText("Payment confirmed").waitFor({ timeout: 15_000 });
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
	viewport: { width: 1280, height: 900 },
	deviceScaleFactor: 1,
});
const page = await context.newPage();

// Landing
await page.goto(BASE, { waitUntil: "load" });
await page.waitForTimeout(1200);
await shot(page, "01-landing-hero");
await page.locator("#pricing").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.locator("#pricing").screenshot({ path: join(OUT, "02-landing-pricing.png") });
await page.getByRole("button", { name: "Brasil" }).click();
await page.locator("#pricing").screenshot({ path: join(OUT, "03-landing-pricing-brasil.png") });
await page.getByText("Para universidades e empresas").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page
	.locator("section", { hasText: "Para universidades e empresas" })
	.last()
	.screenshot({ path: join(OUT, "04-landing-teams.png") });

// Locked results
await runReview(page, "ana-domingos", "Senior financial analyst at an oil and gas operator in Luanda");
await shot(page, "05-results-locked", { fullPage: true });

// Checkout
await page.getByRole("button", { name: /Unlock for/ }).click();
await page.getByRole("dialog").waitFor();
await page.getByRole("dialog").getByPlaceholder("you@example.com").fill("ana@example.com");
await page.getByRole("dialog").locator('input[type="tel"]').fill("923456789");
await shot(page, "06-checkout");
await page.getByRole("dialog").getByRole("button", { name: /^Pay / }).click();
await page.getByRole("dialog").getByText("Payment confirmed").waitFor({ timeout: 15_000 });
await shot(page, "07-checkout-paid");
await page.getByRole("button", { name: "See my full review" }).click();
await page.waitForTimeout(1500);
await shot(page, "08-results-unlocked", { fullPage: true });

// Rewritten profile modal with char counts and language toggle
await page.getByRole("button", { name: "See my rewritten profile" }).click();
await page.waitForTimeout(600);
await shot(page, "09-rewrites-modal");
await page.getByRole("dialog").getByRole("button", { name: "pt", exact: true }).click();
await page.waitForTimeout(300);
await shot(page, "10-rewrites-modal-pt");
await page.keyboard.press("Escape");

// CV export
const analysisUrl = page.url();
await page.getByRole("link", { name: "Export CV" }).click();
await page.waitForURL(/\/cv\//);
await page.waitForTimeout(800);
await shot(page, "11-cv-export", { fullPage: true });
await page.goto(analysisUrl, { waitUntil: "load" });
await page.waitForTimeout(2500);

// Job hunt pass + job matching
await page.getByRole("button", { name: "Get the 30-day pass" }).click();
await page.getByRole("dialog").waitFor();
await pay(page);
await page.getByRole("button", { name: "See my full review" }).click();
await page.waitForTimeout(1500);
await page
	.getByPlaceholder(/Paste the full job ad/)
	.fill(
		"Financial Analyst (FP&A), Azule Energy, Luanda\nWe need a Financial Analyst with Excel, Power BI, SAP and IFRS experience. You'll own Budgeting, Forecasting and CAPEX reporting, present to Leadership in English and manage Stakeholder management across teams. Agile ways of working and SQL are a plus.",
	);
await page.getByRole("button", { name: "Match this job" }).click();
await page.getByText("fit for this job").waitFor({ timeout: 15_000 });
await page.getByText("Tailor your profile to each job").scrollIntoViewIfNeeded();
await page
	.locator("section", { hasText: "Tailor your profile to each job" })
	.last()
	.screenshot({ path: join(OUT, "12-job-match.png") });

// Second review: pass auto-unlocks, score shows progress
await runReview(page, "ana-domingos", "FP&A analyst at an oil and gas operator in Luanda");
await shot(page, "13-results-rescan-progress");

await browser.close();
console.log(`Saved screenshots to ${OUT}`);
