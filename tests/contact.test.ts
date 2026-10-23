import test from "node:test";
import assert from "node:assert/strict";
import { inquiryMailto, validateInquiry, type Inquiry } from "../src/lib/contact.ts";

const valid: Inquiry = { firstName: "Dewi", lastName: "Putri", email: "dewi@example.com", phone: "+62 811 123 456", message: "Konsultasi interior & arsitektur\nRumah keluarga." };

test("valid inquiry generates an encoded email handoff, not a submission", () => {
  assert.deepEqual(validateInquiry(valid), {});
  const link = inquiryMailto(valid, "lidia@lifetimedesign.co");
  assert.ok(link.startsWith("mailto:lidia@lifetimedesign.co?"));
  const params = new URLSearchParams(link.split("?")[1]);
  assert.equal(params.get("subject"), "Konsultasi desain - Lifetime Design");
  assert.ok(params.get("body")?.includes(valid.message));
  assert.ok(params.get("body")?.includes(valid.email));
});

test("required fields reject whitespace and identify every field", () => {
  assert.equal(Object.keys(validateInquiry({ firstName: " ", lastName: "", email: "", phone: "", message: "\n" })).length, 5);
});

test("invalid input, header injection, and excessive lengths are rejected", () => {
  assert.ok(validateInquiry({ ...valid, email: "wrong" }).email);
  assert.ok(validateInquiry({ ...valid, email: "dewi@example.com\r\nBcc:leak@example.com" }).email);
  assert.ok(validateInquiry({ ...valid, phone: "not-a-phone" }).phone);
  assert.ok(validateInquiry({ ...valid, phone: "-------" }).phone);
  assert.ok(validateInquiry({ ...valid, message: "x".repeat(2001) }).message);
  assert.ok(validateInquiry({ ...valid, firstName: "x".repeat(81) }).firstName);
  assert.throws(() => inquiryMailto({ ...valid, email: "invalid" }, "lidia@lifetimedesign.co"));
  assert.throws(() => inquiryMailto(valid, "lidia@lifetimedesign.co\nBcc:leak@example.com"));
});
