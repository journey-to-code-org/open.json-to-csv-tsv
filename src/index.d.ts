export interface JsonToCsvOptions {
  /**
   * Output format. "csv" is the default. "tsv" uses tab delimiters.
   * Matching is case-insensitive. Unknown strings fall back to CSV for
   * backward compatibility.
   */
  format?: "csv" | "tsv" | string;

  /**
   * Explicit header list and output order.
   * When omitted, headers are inferred from all rows in first-seen order.
   */
  headers?: string[];
}

export type JsonRow = Record<string, unknown>;

export function jsonToCsv(
  jsonArray: JsonRow[] | null | undefined,
  options?: JsonToCsvOptions
): string;
