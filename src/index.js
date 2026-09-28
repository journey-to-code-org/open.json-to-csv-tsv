/**
 * Converts an array of object-like rows into a CSV or TSV string.
 *
 * Backward-compatible behavior:
 * - empty arrays return an empty string
 * - null/undefined input returns an empty string
 * - unknown format values fall back to CSV
 *
 * @param {Array<Record<string, unknown>> | null | undefined} jsonArray
 * @param {{
 *   format?: 'csv' | 'tsv' | string,
 *   headers?: string[]
 * }} [options]
 * @returns {string}
 */
export function jsonToCsv(jsonArray, options = {}) {
  if (jsonArray == null) {
    return "";
  }

  if (!Array.isArray(jsonArray)) {
    throw new TypeError("Expected jsonArray to be an array, null, or undefined");
  }

  if (jsonArray.length === 0) {
    return "";
  }

  if (options === null || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("Expected options to be an object");
  }

  const { format = "csv", headers: customHeaders } = options;

  if (typeof format !== "string") {
    throw new TypeError("Expected format to be a string");
  }

  validateRows(jsonArray);
  validateHeaders(customHeaders);

  const delimiter = format.toLowerCase() === "tsv" ? "\t" : ",";
  const headers = customHeaders ?? inferHeaders(jsonArray);

  if (headers.length === 0) {
    return "";
  }

  const headerRow = headers
    .map((value) => escapeCell(value, delimiter))
    .join(delimiter);

  const dataRows = jsonArray.map((row) =>
    headers
      .map((field) => escapeCell(row[field], delimiter))
      .join(delimiter)
  );

  return [headerRow, ...dataRows].join("\n");
}

function validateRows(rows) {
  rows.forEach((row, index) => {
    if (row === null || typeof row !== "object" || Array.isArray(row)) {
      throw new TypeError(
        `Expected row at index ${index} to be a non-null object`
      );
    }
  });
}

function validateHeaders(headers) {
  if (headers === undefined) {
    return;
  }

  if (!Array.isArray(headers)) {
    throw new TypeError("Expected headers to be an array of strings");
  }

  headers.forEach((header, index) => {
    if (typeof header !== "string") {
      throw new TypeError(
        `Expected header at index ${index} to be a string`
      );
    }
  });
}

function inferHeaders(rows) {
  return Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
}

function escapeCell(value, delimiter) {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  if (
    stringValue.includes(delimiter) ||
    stringValue.includes('"') ||
    stringValue.includes("\n") ||
    stringValue.includes("\r")
  ) {
    return `"${stringValue.replace(/"/gu, '""')}"`;
  }

  return stringValue;
}
