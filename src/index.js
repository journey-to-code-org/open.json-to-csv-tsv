/**
 * Converts an array of objects into a CSV or TSV string.
 * @param {Array<Object>} jsonArray - The array of objects to convert.
 * @param {Object} [options] - Configuration options.
 * @param {'csv' | 'tsv'} [options.format='csv'] - Output format ('csv' or 'tsv').
 * @param {string[]} [options.headers] - Custom header array. Inferred from keys if omitted.
 * @returns {string} The formatted CSV or TSV string.
 */
export function jsonToCsv(jsonArray, options = {}) {
  if (!Array.isArray(jsonArray) || jsonArray.length === 0) return '';

  const { format = 'csv', headers: customHeaders } = options;
  const delimiter = format.toLowerCase() === 'tsv' ? '\t' : ',';

  // Get all unique keys if custom headers aren't provided
  const headers = customHeaders || Array.from(
    new Set(jsonArray.flatMap((obj) => Object.keys(obj)))
  );

  const escapeCell = (val) => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    
    // Wrap in quotes if it contains delimiter, newline, or quotes
    if (str.includes(delimiter) || str.includes('\n') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headerRow = headers.map(escapeCell).join(delimiter);
  const dataRows = jsonArray.map((row) =>
    headers.map((field) => escapeCell(row[field])).join(delimiter)
  );

  return [headerRow, ...dataRows].join('\n');
}