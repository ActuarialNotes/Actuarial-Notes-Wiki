// The `[!answer]- Source Material` callout on an exam study-guide page lists the
// exam's syllabus readings: one bullet per source (a [[wiki link]] to its
// Resources/Books page) with an indented bullet naming the chapters or sections
// the syllabus actually covers.
//
// The app renders that list as a gallery of resource cards — the same shelf the
// study-guide home page shows — instead of a collapsed callout, so this module
// lifts the entries out of the markdown and leaves a marker in their place for
// `WikiArticle` to swap for the gallery. The vault keeps the callout: it is what
// Obsidian renders, and `parseExamSyllabus` still reads its links.
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
// The vault writes Obsidian inline footnotes (`^[…]`) for the long
// excluded-sections lists. remark has no such syntax, so flatten them into
// parentheses rather than dropping the (load-bearing) content.
export function cleanReadingDetail(text) {
    return text
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
