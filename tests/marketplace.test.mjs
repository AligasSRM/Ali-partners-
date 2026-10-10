import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pagePath = resolve(root, "site/sections/02-marketplace/index.html");
const page = await readFile(pagePath, "utf8");
const scriptPath = resolve(root, "site/sections/02-marketplace/marketplace.js");
const script = await readFile(scriptPath, "utf8");

function getMarketplace() {
  const sandbox = { window: {} };
  vm.runInNewContext(script, sandbox, { filename: "marketplace.js" });
  return sandbox.window.AliPartnerMarketplace;
}

const ids = (items) => Array.from(items, (item) => item.id);

test("marketplace starts with clearly identified demo listings", () => {
  const { demoListings } = getMarketplace();
  assert.equal(demoListings.length, 3);
  assert.ok(Array.from(demoListings).every((listing) => listing.id.startsWith("demo-")));
  assert.match(page, /illustrative demo content/i);
  assert.match(script, /no real provider or offer/i);
});

test("empty search shows all listings", () => {
  const { demoListings, filterListings } = getMarketplace();
  assert.equal(filterListings("", "all", demoListings).length, 3);
  assert.equal(filterListings("   ", "all", demoListings).length, 3);
});

test("search is case-insensitive and matches title, description, and keywords", () => {
  const { demoListings, filterListings } = getMarketplace();
  assert.deepEqual(ids(filterListings("  WEBSITE  ", "all", demoListings)), ["demo-digital-service"]);
  assert.deepEqual(ids(filterListings("campaign planning", "all", demoListings)), ["demo-marketing-service"]);
  assert.deepEqual(ids(filterListings("productivity", "all", demoListings)), ["demo-business-software"]);
});

test("category filter narrows results and combines with search", () => {
  const { demoListings, filterListings } = getMarketplace();
  assert.deepEqual(ids(filterListings("", "marketing", demoListings)), ["demo-marketing-service"]);
  assert.equal(filterListings("website", "marketing", demoListings).length, 0);
});

test("no-match query returns an empty result without mutating source data", () => {
  const { demoListings, filterListings } = getMarketplace();
  const originalIds = ids(demoListings);
  assert.equal(filterListings("nothing-matches", "all", demoListings).length, 0);
  assert.deepEqual(ids(demoListings), originalIds);
});

test("marketplace local styles and script references exist", () => {
  for (const match of page.matchAll(/(?:href|src)\s*=\s*["']([^"'#]+)["']/gi)) {
    const raw = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(raw)) continue;
    const url = new URL(raw, pathToFileURL(pagePath));
    if (url.protocol !== "file:") continue;
    const target = resolve(decodeURIComponent(url.pathname));
    assert.ok(existsSync(target), `missing local target: ${target}`);
  }
});