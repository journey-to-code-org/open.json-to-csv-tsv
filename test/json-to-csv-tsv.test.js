import test from "node:test";
import assert from "node:assert/strict";

import { jsonToCsv } from "../src/index.js";

test("converts basic array of objects to CSV", () => {
  const data = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 }
  ];

  assert.equal(jsonToCsv(data), "name,age\nAlice,30\nBob,25");
});

test("converts to TSV case-insensitively", () => {
  const data = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 }
  ];

  assert.equal(
    jsonToCsv(data, { format: "TSV" }),
    "name\tage\nAlice\t30\nBob\t25"
  );
});

test("unknown format preserves original fallback-to-CSV behavior", () => {
  assert.equal(
    jsonToCsv([{ a: 1, b: 2 }], { format: "unknown" }),
    "a,b\n1,2"
  );
});

test("escapes commas, quotes, and LF newlines in CSV", () => {
  const data = [
    {
      name: "Doe, John",
      quote: 'He said "Hello"',
      notes: "Line 1\nLine 2"
    }
  ];

  assert.equal(
    jsonToCsv(data),
    'name,quote,notes\n"Doe, John","He said ""Hello""","Line 1\nLine 2"'
  );
});

test("escapes carriage returns", () => {
  assert.equal(
    jsonToCsv([{ value: "Line 1\rLine 2" }]),
    'value\n"Line 1\rLine 2"'
  );
});

test("escapes tabs when producing TSV", () => {
  assert.equal(
    jsonToCsv([{ value: "one\ttwo" }], { format: "tsv" }),
    'value\n"one\ttwo"'
  );
});

test("does not quote commas solely because output is TSV", () => {
  assert.equal(
    jsonToCsv([{ value: "one,two" }], { format: "tsv" }),
    "value\none,two"
  );
});

test("infers headers across every row in first-seen order", () => {
  const data = [
    { name: "Alice", age: 30 },
    { name: "Bob", city: "NYC", age: 25 }
  ];

  assert.equal(
    jsonToCsv(data),
    "name,age,city\nAlice,30,\nBob,25,NYC"
  );
});

test("custom headers control inclusion and order", () => {
  const data = [
    { name: "Alice", age: 30 },
    { name: "Bob", city: "NYC" }
  ];

  assert.equal(
    jsonToCsv(data, { headers: ["city", "name"] }),
    "city,name\n,Alice\nNYC,Bob"
  );
});

test("custom headers are escaped", () => {
  assert.equal(
    jsonToCsv([{ "first,name": "Alice" }], {
      headers: ["first,name"]
    }),
    '"first,name"\nAlice'
  );
});

test("missing, null, and undefined cells become empty", () => {
  const data = [
    { a: null, b: undefined, c: 0, d: false },
    {}
  ];

  assert.equal(jsonToCsv(data), "a,b,c,d\n,,0,false\n,,,");
});

test("stringifies non-null values using String conversion", () => {
  assert.equal(
    jsonToCsv([{ number: 42, boolean: true, array: [1, 2] }]),
    'number,boolean,array\n42,true,"1,2"'
  );
});

test("returns empty string for empty and nullish input", () => {
  assert.equal(jsonToCsv([]), "");
  assert.equal(jsonToCsv(null), "");
  assert.equal(jsonToCsv(undefined), "");
});

test("returns empty string when rows have no enumerable keys", () => {
  assert.equal(jsonToCsv([{}]), "");
});

test("rejects non-array non-null input with a clear error", () => {
  assert.throws(() => jsonToCsv("not rows"), TypeError);
  assert.throws(() => jsonToCsv({}), TypeError);
});

test("rejects malformed rows with a clear error", () => {
  assert.throws(() => jsonToCsv([{ a: 1 }, null]), TypeError);
  assert.throws(() => jsonToCsv([[1, 2]]), TypeError);
});

test("rejects non-object options", () => {
  assert.throws(() => jsonToCsv([{ a: 1 }], null), TypeError);
  assert.throws(() => jsonToCsv([{ a: 1 }], []), TypeError);
});

test("rejects non-string format", () => {
  assert.throws(
    () => jsonToCsv([{ a: 1 }], { format: 42 }),
    TypeError
  );
});

test("rejects invalid headers", () => {
  assert.throws(
    () => jsonToCsv([{ a: 1 }], { headers: "a" }),
    TypeError
  );

  assert.throws(
    () => jsonToCsv([{ a: 1 }], { headers: ["a", 2] }),
    TypeError
  );
});

test("supports an explicitly empty header selection", () => {
  assert.equal(jsonToCsv([{ a: 1 }], { headers: [] }), "");
});
