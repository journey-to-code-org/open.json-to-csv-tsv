# open.json-to-csv-tsv

A lightweight, zero-dependency utility for converting arrays of JSON-style
objects into CSV or TSV strings.

[![npm version](https://img.shields.io/npm/v/@journey-to-code/json-to-csv-tsv.svg)](https://www.npmjs.com/package/@journey-to-code/json-to-csv-tsv)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Features

- Zero runtime dependencies.
- CSV and TSV output.
- Automatic header discovery across all rows.
- Optional custom header order.
- Correct escaping for delimiters, quotes, LF, and CR line breaks.
- Missing, `null`, and `undefined` values become empty cells.
- TypeScript declarations included.
- Node.js 18+ and modern ESM tooling.

## Installation

```bash
npm install @journey-to-code/json-to-csv-tsv
```

## Basic CSV

```js
import { jsonToCsv } from "@journey-to-code/json-to-csv-tsv";

const csv = jsonToCsv([
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
]);

console.log(csv);
```

Output:

```text
name,age
Alice,30
Bob,25
```

## TSV

```js
const tsv = jsonToCsv(
  [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 }
  ],
  { format: "tsv" }
);
```

Output:

```text
name	age
Alice	30
Bob	25
```

## Custom headers

```js
jsonToCsv(
  [
    { name: "Alice", age: 30 },
    { name: "Bob", city: "NYC" }
  ],
  { headers: ["name", "city"] }
);
```

Output:

```text
name,city
Alice,
Bob,NYC
```

## Escaping

Cells are quoted when required by the selected delimiter or when they contain
quotes or line breaks. Embedded quotes are doubled.

Carriage returns (`\r`) and line feeds (`\n`) are both escaped correctly.

## Header inference

When `headers` is omitted, headers are collected from every row in first-seen
order.

## Empty input

For compatibility with the original API:

```js
jsonToCsv([]);   // ""
jsonToCsv(null); // ""
```

## Supported values

Cell values are converted with JavaScript's `String()` conversion. `null` and
`undefined` become empty cells.

For complex nested values, serialize them yourself before conversion if you
need a specific representation.

## API

### `jsonToCsv(jsonArray, options?)`

#### `jsonArray`

An array of object-like rows. Empty arrays and `null` return an empty string for
backward compatibility.

#### `options.format`

- `"csv"` (default)
- `"tsv"`

Matching is case-insensitive. Unknown strings preserve the original behavior
and fall back to CSV.

#### `options.headers`

Optional array of strings. When omitted, keys are inferred across all rows.

## Scope

This package converts in-memory row objects to delimited text. It does not:

- parse JSON strings,
- parse CSV/TSV input,
- write files,
- flatten nested objects automatically,
- perform spreadsheet-specific formula escaping.

## Development

```bash
npm test
```

## License

MIT
