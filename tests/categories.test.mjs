import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pagePath = resolve(root, "site/sections/03-categories/index.html");
const page = await readFile(pagePath, "utf8");
const scriptPath = resolve(root, "site/sections/03-categories/categories.js");
const script = await readFile(scriptPath, "utf8");

function getCategories() {
  const sandbox = { window: {} };
  vm.runInNewContext(script, sandbox, { filename: "categories.js" });
  return sandbox.window.AliPartnerCategories;
}
const ids = (items) => Array.from(items, (item) => item.id);

test("taxonomy is explicitly identified as a preview, not a live catalog", () => {
  const { categories } = getCategories();
  assert.equal(categories.length, 8);
  assert.match(page, /not yet connected to a shared live catalog/i);
  assert.ok(Array.from(categories).every((item) => /^[a-z0-9-]+$/.test(item.id)));
});

test("empty category search returns every category without mutating source data", () => {
  const { categories, filterCategories } = getCategories();
  const originalIds = ids(categories);
  assert.equal(filterCategories("", "all", categories).length, 8);
  assert.deepEqual(ids(categories), originalIds);
});

test("category search is case-insensitive and matches descriptions and keywords", () => {
  const { categories, filterCategories } = getCategories();
  assert.deepEqual(ids(filterCategories("AI assistants", "all", categories)), ["ai-automation"]);
  assert.deepEqual(ids(filterCategories("landing pages", "all", categories)), ["websites-commerce"]);
  assert.deepEqual(ids(filterCategories("newsletter", "all", categories)), ["email-crm"]);
});

test("area filter narrows categories and combines with text search", () => {
  const { categories, filterCategories } = getCategories();
  assert.deepEqual(ids(filterCategories("", "digital", categories)), ["ai-automation", "websites-commerce"]);
  assert.deepEqual(ids(filterCategories("campaign", "operations", categories)), []);
  assert.deepEqual(ids(filterCategories("campaign", "growth", categories)), ["marketing-growth"]);
});

test("no-match query returns an empty result", () => {
  const { categories, filterCategories } = getCategories();
  assert.equal(filterCategories("category-does-not-exist", "all", categories).length, 0);
});

test("category page local styles and scripts exist", () => {
  for (const match of page.matchAll(/(?:href|src)=["']([^"'#]+)["']/gi)) {
    const raw = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(raw)) continue;
    const url = new URL(raw, pathToFileURL(pagePath));
    if (url.protocol !== "file:") continue;
    const target = resolve(decodeURIComponent(url.pathname));
    assert.ok(existsSync(target), `missing local target: ${target}`);
  }
});