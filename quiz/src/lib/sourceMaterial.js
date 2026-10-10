// The `[!answer]- Source Material` callout on an exam study-guide page lists the
// exam's syllabus readings: one bullet per source (a [[wiki link]] to its
// Resources/Books page) with an indented bullet naming the chapters or sections
// the syllabus actually covers.
//
// The app renders that list as a gallery of resource cards — the same shelf the
// Study Guides tab's Resources page shows — instead of a collapsed callout, so this module
// lifts the entries out of the markdown and leaves a marker in their place for
// `WikiArticle` to swap for the gallery. The vault keeps the callout: it is what
// Obsidian renders, and `parseExamSyllabus` still reads its links.
//
// A reading assignment usually opens with the learning objectives the source
// is read for — `A1, C1-C5`, `B1–B3 (Chapter 7)` — so the shelf can be
// filtered by objective: `readingObjectives` reads those codes, and
// `parseSyllabusObjectives` names them from the page's own `[!example]`
// callouts. Nothing is inferred either way: a reading that opens with no codes
// is under no objective, and a code the page doesn't number is offered bare.
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
import { splitWeightTag } from './examWeight';
export var SOURCE_MATERIAL_MARKER = '%%source-material%%';
// `> [!answer]- Source Material {6 Sources}` — the `>` may carry no space, the
// fold marker may be `-`, `+` or absent, and the count tag is optional.
var CALLOUT_HEADER_RE = /^>\s*\[!(\w+)\][+-]?\s*(.*)$/;
function isSourceMaterialHeader(line) {
    var m = CALLOUT_HEADER_RE.exec(line);
    if (!m || m[1].toLowerCase() !== 'answer')
        return false;
    var title = m[2].replace(/\{[^}]*\}/g, '').trim();
    return /^source material$/i.test(title);
}
function isCalloutHeader(line) {
    return CALLOUT_HEADER_RE.test(line);
}
var LINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/;
/** `[[Target|Shown]]` → `Shown`, `[[Folder/Target]]` → `Target`. */
function flattenWikiLinks(text) {
    return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_full, target, shown) { var _a; return ((_a = shown !== null && shown !== void 0 ? shown : target.split('/').pop()) !== null && _a !== void 0 ? _a : target).trim(); });
}
// The vault writes Obsidian inline footnotes (`^[…]`) for the long
// excluded-sections lists. remark has no such syntax, so flatten them into
// parentheses rather than dropping the (load-bearing) content.
//
// A note can name another source (`A1 — replaced by [[CFAI]] for Fall 2026`);
// the card prints text, so a wiki link is cut down to what it displays.
export function cleanReadingDetail(text) {
    return flattenWikiLinks(text)
        .replace(/\s*\^\[([^\]]*)\]/g, function (_full, note) { return " (".concat(note.trim(), ")"); })
        .replace(/\|+\s*$/, '')
        .replace(/\s+/g, ' ')
        .trim();
}
/**
 * Pull the source-material entries out of an exam page and replace the callout
 * they came from with {@link SOURCE_MATERIAL_MARKER}. Pages without such a
 * callout come back unchanged with no entries.
 */
export function extractSourceMaterial(md) {
    var _a, _b;
    var lines = md.split('\n');
    var start = lines.findIndex(isSourceMaterialHeader);
    if (start === -1)
        return { markdown: md, entries: [] };
    // The block runs to the first line that leaves the blockquote or opens a
    // different callout.
    var end = start + 1;
    while (end < lines.length && lines[end].startsWith('>') && !isCalloutHeader(lines[end]))
        end++;
    var entries = [];
    var seen = new Set();
    // Set while a top-level bullet was skipped (no link, or a source already
    // listed) so its indented readings don't land on the entry above it.
    var skipping = false;
    for (var _i = 0, _c = lines.slice(start + 1, end); _i < _c.length; _i++) {
        var raw = _c[_i];
        var body = raw.replace(/^>[ \t]?/, '');
        var bullet = /^(\s*)-\s*(.*)$/.exec(body);
        if (!bullet)
            continue;
        var indent = bullet[1].length;
        var text = bullet[2].trim();
        if (indent === 0) {
            var link = LINK_RE.exec(text);
            var target = (_a = link === null || link === void 0 ? void 0 : link[1].trim()) !== null && _a !== void 0 ? _a : '';
            var name_1 = target.includes('/') ? target.split('/').pop().trim() : target;
            skipping = !name_1 || seen.has(name_1.toLowerCase());
            if (skipping)
                continue;
            seen.add(name_1.toLowerCase());
            entries.push({ name: name_1, target: target, label: ((_b = link[2]) !== null && _b !== void 0 ? _b : '').trim() || name_1 });
            continue;
        }
        // An indented bullet is the reading assignment for the entry above it.
        var last = entries[entries.length - 1];
        if (skipping || !last)
            continue;
        var detail = cleanReadingDetail(text);
        if (!detail)
            continue;
        last.detail = last.detail ? "".concat(last.detail, "; ").concat(detail) : detail;
    }
    var markdown = __spreadArray(__spreadArray(__spreadArray([], lines.slice(0, start), true), [
        '',
        SOURCE_MATERIAL_MARKER,
        ''
    ], false), lines.slice(end), true).join('\n');
    return { markdown: markdown, entries: entries };
}
var OBJECTIVE_HEADER_RE = /^>\s*\[!example\][-+]?\s*(.*)$/i;
var SECTION_TITLE_RE = /^([A-Z])\.\s+\S/;
var OBJECTIVE_ITEM_RE = /^>\s*(\d+)\.\s+(.*)$/;
/**
 * The objective's statement without the list of examples a syllabus hangs off
 * it — "Discuss the current state of Insurance Regulation in Canada" rather than
 * the forty concepts after the dash. The cut is at the first bracket, dash or
 * semicolon, which is where the syllabi's examples begin.
 */
function objectiveSummary(text) {
    var flat = flattenWikiLinks(text).replace(/\s+/g, ' ').trim();
    var cut = flat.search(/\s\(|\s[—–]\s|;/);
    return (cut > 0 ? flat.slice(0, cut) : flat).replace(/[.,\s]+$/, '');
}
/**
 * The numbered learning objectives of an exam page, in page order. A section
 * is a `> [!example]- A. Title {weight}` callout and an objective a numbered
 * item inside it, coded by the section's letter and the item's own number —
 * so a page that numbers each section from 1 (6C: A1–A3, B1–B3, C1–C5) and one
 * that numbers straight through (Exam 5: A1–A17, B18–B42) both come out as the
 * readings cite them. A callout with no letter numbers nothing.
 */
export function parseSyllabusObjectives(md) {
    var _a;
    var objectives = [];
    var seen = new Set();
    var section = null;
    for (var _i = 0, _b = md.split('\n'); _i < _b.length; _i++) {
        var line = _b[_i];
        var header = OBJECTIVE_HEADER_RE.exec(line);
        if (header) {
            var title = splitWeightTag(header[1].trim()).title;
            var letter = (_a = SECTION_TITLE_RE.exec(title)) === null || _a === void 0 ? void 0 : _a[1];
            section = letter ? { letter: letter, title: title } : null;
            continue;
        }
        if (!section)
            continue;
        if (!line.startsWith('>')) {
            // A blank line between callouts ends nothing; prose or a heading does.
            if (line.trim() !== '')
                section = null;
            continue;
        }
        var item = OBJECTIVE_ITEM_RE.exec(line);
        if (!item)
            continue;
        var code = "".concat(section.letter).concat(Number(item[1]));
        if (seen.has(code))
            continue;
        seen.add(code);
        objectives.push({
            code: code,
            section: section.letter,
            sectionTitle: section.title,
            summary: objectiveSummary(item[2]),
        });
    }
    return objectives;
}
// `C1`, `C1-C5`, `A1–15` — one code or a run of them, never a bare number
// (`Chapters 1–7` and The Institutes' `1–10` are chapters, not objectives).
var CODE_RUN = String.raw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["[A-Z]d+(?:s*[-\u2013]s*[A-Z]?d+)?(?![w.])"], ["[A-Z]\\d+(?:\\s*[-\u2013]\\s*[A-Z]?\\d+)?(?![\\w.])"])));
var LEADING_CODES_RE = new RegExp(String.raw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["^s*(", "(?:s*,s*", ")*)"], ["^\\s*(", "(?:\\s*,\\s*", ")*)"])), CODE_RUN, CODE_RUN));
var RUN_RE = /^([A-Z])(\d+)(?:\s*[-–]\s*([A-Z])?(\d+))?$/;
function objectiveSortKey(code) {
    return [code[0], Number(code.slice(1))];
}
function compareCodes(a, b) {
    var _a = objectiveSortKey(a), la = _a[0], na = _a[1];
    var _b = objectiveSortKey(b), lb = _b[0], nb = _b[1];
    return la === lb ? na - nb : la < lb ? -1 : 1;
}
/**
 * The learning objectives a reading assignment is read for: the codes it opens
 * with, runs expanded (`A1, C1-C5` → A1, C1, C2, C3, C4, C5), in syllabus
 * order. Each `;`-joined reading is read on its own, so a source with two
 * bullets (`A1–A15; A17`) keeps both. A run across sections (`B8–C2`) can't be
 * expanded without knowing how long B is, so only its two ends are kept.
 */
export function readingObjectives(detail) {
    var _a;
    if (!detail)
        return [];
    var codes = new Set();
    for (var _i = 0, _b = detail.split(';'); _i < _b.length; _i++) {
        var reading = _b[_i];
        var lead = (_a = LEADING_CODES_RE.exec(reading)) === null || _a === void 0 ? void 0 : _a[1];
        if (!lead)
            continue;
        for (var _c = 0, _d = lead.split(','); _c < _d.length; _c++) {
            var run = _d[_c];
            var m = RUN_RE.exec(run.replace(/\s+/g, ''));
            if (!m)
                continue;
            var from = m[1], start = m[2], toLetter = m[3], end = m[4];
            if (end === undefined) {
                codes.add("".concat(from).concat(Number(start)));
            }
            else if ((toLetter !== null && toLetter !== void 0 ? toLetter : from) === from && Number(end) >= Number(start)) {
                for (var n = Number(start); n <= Number(end); n++)
                    codes.add("".concat(from).concat(n));
            }
            else {
                codes.add("".concat(from).concat(Number(start)));
                codes.add("".concat(toLetter !== null && toLetter !== void 0 ? toLetter : from).concat(Number(end)));
            }
        }
    }
    return __spreadArray([], codes, true).sort(compareCodes);
}
/**
 * The objectives the shelf can be filtered by: every code some reading cites,
 * in syllabus order, named from the page. An objective no reading cites isn't
 * offered — choosing it would empty the shelf.
 *
 * A shelf with a reading that cites a code the page doesn't number gets no
 * filter at all: its readings and its objectives are numbered two different
 * ways (Exam 5 numbers its objectives A1–A17 then B18–B42, its readings cite
 * B1–B42), and a filter that named some codes and left others bare would be
 * guessing which numbering a reader means. Nor does a shelf with fewer than two
 * objectives to tell apart.
 */
export function objectiveFilterOptions(entries, objectives) {
    var _a;
    var counts = new Map();
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        for (var _b = 0, _c = readingObjectives(entry.detail); _b < _c.length; _b++) {
            var code = _c[_b];
            counts.set(code, ((_a = counts.get(code)) !== null && _a !== void 0 ? _a : 0) + 1);
        }
    }
    var byCode = new Map(objectives.map(function (o) { return [o.code, o]; }));
    if (counts.size < 2 || __spreadArray([], counts.keys(), true).some(function (code) { return !byCode.has(code); }))
        return [];
    return __spreadArray([], counts.keys(), true).sort(compareCodes).map(function (code) {
        var objective = byCode.get(code);
        return {
            value: code,
            label: code,
            hint: objective.summary,
            group: objective.sectionTitle,
            count: counts.get(code),
        };
    });
}
/**
 * The sources read for any of the chosen objectives, in the page's order. An
 * empty choice is no filter.
 */
export function filterSourcesByObjectives(entries, selected) {
    if (selected.size === 0)
        return entries;
    return entries.filter(function (entry) { return readingObjectives(entry.detail).some(function (code) { return selected.has(code); }); });
}
var templateObject_1, templateObject_2;
