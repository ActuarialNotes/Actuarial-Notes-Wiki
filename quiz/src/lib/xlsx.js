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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* --------------------------------------------------------------------- CRC */
var CRC_TABLE = (function () {
    var table = new Uint32Array(256);
    for (var i = 0; i < 256; i++) {
        var c = i;
        for (var k = 0; k < 8; k++)
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        table[i] = c >>> 0;
    }
    return table;
})();
export function crc32(bytes) {
    var c = 0xffffffff;
    for (var i = 0; i < bytes.length; i++)
        c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
}
/* --------------------------------------------------------------------- XML */
/**
 * Escapes text for an XML text node or attribute. The control characters XML
 * 1.0 forbids outright are dropped rather than escaped — a stray \u0001 in a
 * pasted title would otherwise make the whole workbook unreadable.
 */
export function xmlEscape(value) {
    return value
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
/** `0 → A`, `25 → Z`, `26 → AA`. Excel's column naming is base-26 bijective. */
export function columnName(index) {
    var n = Math.max(0, Math.floor(index));
    var name = '';
    for (;;) {
        name = String.fromCharCode(65 + (n % 26)) + name;
        n = Math.floor(n / 26) - 1;
        if (n < 0)
            return name;
    }
}
/**
 * Excel rejects a workbook whose sheet name is empty, over 31 characters or
 * carries one of the six reserved characters, so the name is cleaned rather
 * than passed through — an export must never fail on its own tab label.
 */
export function safeSheetName(name, fallback) {
    if (fallback === void 0) { fallback = 'Sheet'; }
    var cleaned = name.replace(/[:\\/?*[\]]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 31);
    return cleaned || fallback;
}
function cellXml(ref, value, bold) {
    var style = bold ? ' s="1"' : '';
    if (value === null || value === undefined || value === '')
        return "<c r=\"".concat(ref, "\"").concat(style, "/>");
    if (typeof value === 'number' && Number.isFinite(value)) {
        return "<c r=\"".concat(ref, "\"").concat(style, "><v>").concat(value, "</v></c>");
    }
    if (typeof value === 'boolean') {
        return "<c r=\"".concat(ref, "\"").concat(style, " t=\"b\"><v>").concat(value ? 1 : 0, "</v></c>");
    }
    // `xml:space="preserve"` keeps a value that is meant to be indented or that
    // ends in a space from being trimmed back by the reader.
    return "<c r=\"".concat(ref, "\"").concat(style, " t=\"inlineStr\"><is><t xml:space=\"preserve\">").concat(xmlEscape(String(value)), "</t></is></c>");
}
function sheetXml(sheet) {
    var _a;
    var rows = [];
    var rowIndex = 1;
    if ((_a = sheet.columns) === null || _a === void 0 ? void 0 : _a.length) {
        var cells = sheet.columns.map(function (c, i) { return cellXml("".concat(columnName(i)).concat(rowIndex), c, true); }).join('');
        rows.push("<row r=\"".concat(rowIndex, "\">").concat(cells, "</row>"));
        rowIndex++;
    }
    for (var _i = 0, _b = sheet.rows; _i < _b.length; _i++) {
        var row = _b[_i];
        var cells = row.map(function (v, i) { return cellXml("".concat(columnName(i)).concat(rowIndex), v, false); }).join('');
        rows.push("<row r=\"".concat(rowIndex, "\">").concat(cells, "</row>"));
        rowIndex++;
    }
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
        "<sheetData>".concat(rows.join(''), "</sheetData>") +
        '</worksheet>');
}
/** Two fonts and two cell formats: the header row is bold, everything else isn't. */
var STYLES_XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font>' +
    '<font><b/><sz val="11"/><name val="Calibri"/></font></fonts>' +
    '<fills count="1"><fill><patternFill patternType="none"/></fill></fills>' +
    '<borders count="1"><border/></borders>' +
    '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
    '<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
    '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs>' +
    '</styleSheet>';
function utf8(text) {
    return new TextEncoder().encode(text);
}
function u16(value) {
    return [value & 0xff, (value >>> 8) & 0xff];
}
function u32(value) {
    return [value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff];
}
/**
 * A ZIP with every entry **stored**. `date` sets the DOS timestamp each entry
 * carries — passed in rather than read from the clock so the same workbook
 * built twice is byte-identical, which is what makes the container testable.
 */
export function buildZip(entries, date) {
    if (date === void 0) { date = new Date(2020, 0, 1); }
    var dosTime = ((date.getHours() << 11) | (date.getMinutes() << 5) | (Math.floor(date.getSeconds() / 2))) & 0xffff;
    var dosDate = (((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()) & 0xffff;
    // Headers are small number arrays; entry data is copied in with `set`, never
    // spread — a plot or a data file is far more bytes than a call can take as
    // arguments.
    var parts = [];
    var central = [];
    var offset = 0;
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        var nameBytes = utf8(entry.name);
        var crc = crc32(entry.data);
        var size = entry.data.length;
        // Flag bit 11 marks the filename as UTF-8, which every part name here is.
        var header = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], u32(0x04034b50), true), u16(20), true), u16(0x0800), true), u16(0), true), u16(dosTime), true), u16(dosDate), true), u32(crc), true), u32(size), true), u32(size), true), u16(nameBytes.length), true), u16(0), true);
        parts.push(header, nameBytes, entry.data);
        central.push.apply(central, __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], u32(0x02014b50), false), u16(20), false), u16(20), false), u16(0x0800), false), u16(0), false), u16(dosTime), false), u16(dosDate), false), u32(crc), false), u32(size), false), u32(size), false), u16(nameBytes.length), false), u16(0), false), u16(0), false), u16(0), false), u16(0), false), u32(0), false), u32(offset), false), nameBytes, false));
        offset += header.length + nameBytes.length + size;
    }
    var end = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], u32(0x06054b50), true), u16(0), true), u16(0), true), u16(entries.length), true), u16(entries.length), true), u32(central.length), true), u32(offset), true), u16(0), true);
    parts.push(central, end);
    var out = new Uint8Array(parts.reduce(function (n, p) { return n + p.length; }, 0));
    var at = 0;
    for (var _a = 0, parts_1 = parts; _a < parts_1.length; _a++) {
        var p = parts_1[_a];
        out.set(p, at);
        at += p.length;
    }
    return out;
}
/* ---------------------------------------------------------------- workbook */
/**
 * Builds a workbook from its sheets. Sheet names are made safe and
 * de-duplicated — Excel refuses a workbook with two tabs of the same name, and
 * two exports of the same table is a thing a reader will do.
 */
export function buildXlsx(sheets, date) {
    var used = new Set();
    var named = sheets.map(function (sheet, i) {
        var name = safeSheetName(sheet.name, "Sheet".concat(i + 1));
        if (used.has(name.toLowerCase())) {
            var n = 2;
            // Leave room for the " (n)" suffix inside the 31-character cap.
            while (used.has(safeSheetName("".concat(name, " (").concat(n, ")")).toLowerCase()))
                n++;
            name = safeSheetName("".concat(name, " (").concat(n, ")"));
        }
        used.add(name.toLowerCase());
        return __assign(__assign({}, sheet), { name: name });
    });
    var entries = [];
    var overrides = named
        .map(function (_, i) {
        return "<Override PartName=\"/xl/worksheets/sheet".concat(i + 1, ".xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>");
    })
        .join('');
    entries.push({
        name: '[Content_Types].xml',
        data: utf8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
            '<Default Extension="xml" ContentType="application/xml"/>' +
            '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
            '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
            overrides +
            '</Types>'),
    });
    entries.push({
        name: '_rels/.rels',
        data: utf8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
            '</Relationships>'),
    });
    entries.push({
        name: 'xl/workbook.xml',
        data: utf8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
            named
                .map(function (s, i) { return "<sheet name=\"".concat(xmlEscape(s.name), "\" sheetId=\"").concat(i + 1, "\" r:id=\"rId").concat(i + 1, "\"/>"); })
                .join('') +
            '</sheets></workbook>'),
    });
    entries.push({
        name: 'xl/_rels/workbook.xml.rels',
        data: utf8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
            named
                .map(function (_, i) {
                return "<Relationship Id=\"rId".concat(i + 1, "\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" Target=\"worksheets/sheet").concat(i + 1, ".xml\"/>");
            })
                .join('') +
            "<Relationship Id=\"rId".concat(named.length + 1, "\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" Target=\"styles.xml\"/>") +
            '</Relationships>'),
    });
    entries.push({ name: 'xl/styles.xml', data: utf8(STYLES_XML) });
    named.forEach(function (sheet, i) {
        entries.push({ name: "xl/worksheets/sheet".concat(i + 1, ".xml"), data: utf8(sheetXml(sheet)) });
    });
    return buildZip(entries, date);
}
export var XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
/** Renders sheets as CSV — one sheet only, for the plain-text export option. */
export function sheetToCsv(sheet) {
    var _a;
    var escape = function (value) {
        if (value === null || value === undefined)
            return '';
        var str = String(value);
        // Defuse spreadsheet formula injection, the same way lib/exportData.ts does.
        if (/^[=+\-@]/.test(str))
            str = "'".concat(str);
        return /[",\n\r]/.test(str) ? "\"".concat(str.replace(/"/g, '""'), "\"") : str;
    };
    var lines = __spreadArray(__spreadArray([], (((_a = sheet.columns) === null || _a === void 0 ? void 0 : _a.length) ? [sheet.columns.map(escape).join(',')] : []), true), sheet.rows.map(function (row) { return row.map(escape).join(','); }), true);
    // Leading BOM so Excel opens the file as UTF-8.
    return '﻿' + lines.join('\r\n') + '\r\n';
}
/** Hands the reader a file. The one impure function in this module. */
export function downloadBlob(filename, blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoked on the next tick: revoking synchronously races the click in Safari.
    setTimeout(function () { return URL.revokeObjectURL(url); }, 0);
}
export function downloadWorkbook(filename, sheets) {
    var bytes = buildXlsx(sheets, new Date());
    // A fresh ArrayBuffer copy — a Uint8Array view can be a slice of a larger
    // buffer, and Blob would then carry the whole of it.
    downloadBlob(filename, new Blob([bytes.slice().buffer], { type: XLSX_MIME }));
}
export function downloadCsvSheet(filename, sheet) {
    downloadBlob(filename, new Blob([sheetToCsv(sheet)], { type: 'text/csv;charset=utf-8' }));
}
