import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { content } from "../src/data/content.ts";

test("project and article assets exist locally with real source metadata", () => {
  assert.equal(content.projects.length, 9);
  assert.equal(content.articles.length, 6);
  for (const entry of [...content.projects, ...content.articles]) {
    assert.ok(entry.source.startsWith("https://lifetimedesign.co/"));
    assert.ok(existsSync("public" + entry.image.src), entry.image.src);
    assert.ok(entry.image.width > 0 && entry.image.height > 0);
    assert.ok(entry.image.alt.length > 0);
  }
  assert.equal(new Set(content.articles.map((article) => article.slug)).size, 6);
  for (const article of content.articles) {
    assert.match(article.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(article.blocks.length > 5);
  }
  assert.doesNotMatch(JSON.stringify(content), /mdesigngroup|metaphor|ikons|modulo/i);
});
