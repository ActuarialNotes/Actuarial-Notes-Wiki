/**
 * A minimal **.xlsx writer** — enough of the format to hand someone a real
 * workbook, and no more.
 *
 * Why write one rather than take a dependency: an export is the last step of
 * the Cowork loop and the only thing that leaves the app, so it is worth the
 * few hundred bytes of arithmetic here instead of ~700 KB of SheetJS in the
 * bundle for a feature that writes cells and nothing else. What it does *not*
 * do is the reason it stays small: no formulas, no styling beyond a bold header
 * row, no shared-string table (values are written as inline strings), no
 * compression. A spreadsheet application reads all of that fine.
 *
 * An .xlsx is a ZIP of XML parts. The two pieces that have to be exactly right
 * are the ZIP container (local header, central directory, end record — with a
 * CRC-32 per entry) and the workbook's part-to-part relationships. Both are
 * written here with **stored** (uncompressed) entries, which is a legal ZIP and
 * removes the only piece that would need a deflate implementation.
 *
 * Pure: `buildXlsx` takes rows and returns bytes, so the whole format is
 * testable without a DOM. `downloadWorkbook` is the one impure helper.
 */
/** A cell. `null` writes an empty cell rather than the string "null". */
export type CellValue = string | number | boolean | null;
export interface Sheet {
    /** Excel caps a sheet name at 31 characters and forbids : \ / ? * [ ]. */
    name: string;
    /** The header row, written bold. Optional — a sheet may be rows alone. */
    columns?: string[];
    rows: CellValue[][];
}
export declare function crc32(bytes: Uint8Array): number;
/**
 * Escapes text for an XML text node or attribute. The control characters XML
 * 1.0 forbids outright are dropped rather than escaped — a stray \u0001 in a
 * pasted title would otherwise make the whole workbook unreadable.
 */
export declare function xmlEscape(value: string): string;
/** `0 → A`, `25 → Z`, `26 → AA`. Excel's column naming is base-26 bijective. */
export declare function columnName(index: number): string;
/**
 * Excel rejects a workbook whose sheet name is empty, over 31 characters or
 * carries one of the six reserved characters, so the name is cleaned rather
 * than passed through — an export must never fail on its own tab label.
 */
export declare function safeSheetName(name: string, fallback?: string): string;
export interface ZipEntry {
    name: string;
    data: Uint8Array;
}
/**
 * A ZIP with every entry **stored**. `date` sets the DOS timestamp each entry
 * carries — passed in rather than read from the clock so the same workbook
 * built twice is byte-identical, which is what makes the container testable.
 */
export declare function buildZip(entries: ZipEntry[], date?: Date): Uint8Array;
/**
 * Builds a workbook from its sheets. Sheet names are made safe and
 * de-duplicated — Excel refuses a workbook with two tabs of the same name, and
 * two exports of the same table is a thing a reader will do.
 */
export declare function buildXlsx(sheets: Sheet[], date?: Date): Uint8Array;
export declare const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
/** Renders sheets as CSV — one sheet only, for the plain-text export option. */
export declare function sheetToCsv(sheet: Sheet): string;
/** Hands the reader a file. The one impure function in this module. */
export declare function downloadBlob(filename: string, blob: Blob): void;
export declare function downloadWorkbook(filename: string, sheets: Sheet[]): void;
export declare function downloadCsvSheet(filename: string, sheet: Sheet): void;
