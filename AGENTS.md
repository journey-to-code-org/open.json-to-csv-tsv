# AI agent guidance

AI-assisted contributions are welcome, but contributors remain responsible for
correctness and understanding the change.

Before editing:

1. Read `README.md` and the tests.
2. Preserve the public `jsonToCsv()` API.
3. Restate the exact behavior being changed.

During implementation:

- Keep zero runtime dependencies.
- Preserve CSV and TSV support.
- Do not silently introduce file I/O, parsing, or nested-object flattening.
- Treat escaping behavior as compatibility-sensitive.
- Add tests for every behavior change.
- Avoid unrelated rewrites.

Completion reports should include changed files, tests run, and compatibility
considerations.
