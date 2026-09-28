# Changelog

## [1.0.1] - 2026-09-28

### Fixed

- Quote cells containing carriage returns in addition to line feeds.
- Provide clearer validation errors for malformed non-empty rows.
- Validate custom header configuration before conversion.

### Improved

- Expanded coverage for inferred headers, TSV escaping, falsy values, CR/LF
  handling, malformed rows, and option behavior.
- Added TypeScript declarations and an explicit package export map.
- Added Node.js version requirements and package file allow-listing.
- Added GitHub Actions CI.
- Expanded usage, compatibility, and scope documentation.

## [1.0.0]

- Initial JSON-array to CSV/TSV converter.
