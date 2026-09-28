# Contributing

`open.json-to-csv-tsv` is intentionally small.

## Development

```bash
npm test
```

## Pull requests

Changes should:

- preserve the existing `jsonToCsv()` API,
- include tests for corrected or new behavior,
- keep CSV and TSV behavior aligned,
- preserve zero runtime dependencies,
- update documentation when observable behavior changes,
- avoid unrelated refactors.

## Design boundary

This package converts arrays of object-like rows to delimited strings. Parsing,
file I/O, automatic nested-object flattening, and spreadsheet application
behavior belong outside this library.
