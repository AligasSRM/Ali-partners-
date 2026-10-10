import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = resolve(root, "site/index.html");
const html = await readFile(htmlPath, "utf8");
const appSource = await readFile(resolve(root, "site/app.js"), "utf8");

function getFilter() {
  const sandbox = { window: {} };
  vm.runInNewContext(appSource, sandbox, { filename: "site/app.js" });
  return sandbox.window.AliPartnerHome.filterSections;
}

test("empty search returns all sections", () => {
  const sections = [{ title: "Marketplace" }, { title: "Compare" }];
  assert.equal(getFilter()("", sections).length, 2);
  assert.equal(getFilter("   ", sections).length, 2);
});

test("search is case-insensitive and trims whitespace", () => {
  const sections = [{ title: "Marketplace" }, { title: "Compare" }];
  assert.deepEqual(getFilter()("  MARKET  ", sections).map((x) => x.title), ["Marketplace"]);
});

test("search includes descriptions and keywords", () => {
  const sections = [
    { title: "Learn", description: "Guides and education", keywords: "academy tutorials" },
    { title: "Free Tools", description: "Business utilities", keywords: "calculators generators" }
  ];
  assert.equal(getFilter()("tutorials", sections)[0].title, "Learn");
  assert.equal(getFilter()("calculators", sections)[0].title, "Free Tools");
});

test("unmatched query returns no results without mutating source array", () => {
  const sections = [{ title: "Marketplace" }, { title: "Compare" }];
  const result = getFilter()("no-such-section", sections);
  assert.equal(result.length, 0);
  assert.equal(sections.length, 2);
});

test("all local HTML href and script/style src targets on the home page exist", () => {
  const localTargets = [];
  for (const match of html.matchAll(/(?:href|src)\s*=\s*["']([^"'#]+)["']/gi)) {
    const raw = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(raw)) continue;
    const url = new URL(raw, pathToFileURL(htmlPath));
    if (url.protocol !== "file:") continue;
    localTargets.push(resolve(decodeURIComponent(url.pathname)));
  }
  assert.ok(localTargets.length > 0, "expected to find local references");
  for (const target of localTargets) {
    assert.ok(existsSync(target), `missing local target: ${target}`);
  }
});
