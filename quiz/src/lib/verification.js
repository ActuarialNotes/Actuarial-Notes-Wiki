var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import fm from 'front-matter';
var STATUSES = [
    'unverified', 'in_review', 'verified', 'disputed', 'stale',
];
var CONFIDENCES = ['high', 'medium', 'low'];
/** The block every page falls back to: nothing claimed, nothing checked. */
export var UNVERIFIED = {
    status: 'unverified',
    confidence: null,
    lastChecked: null,
    lastCheckedBy: null,
    contentHash: '',
    sources: [],
    openFindings: 0,
    openCritical: 0,
    log: '',
};
function asString(value) {
    if (value == null)
        return null;
    // js-yaml turns an unquoted `2026-08-23` into a Date; normalise back to ISO.
    if (value instanceof Date)
        return isNaN(value.getTime()) ? null : value.toISOString().slice(0, 10);
    var text = String(value).trim();
    return text === '' ? null : text;
}
/**
 * Read the `verification:` block out of already-parsed frontmatter attributes.
 * Unknown or malformed values degrade to the `unverified` default rather than
 * throwing — a page must still render when its block is wrong; CI is what fails
 * on a malformed block, not the reader.
 */
export function verificationFromAttributes(attrs) {
    var _a, _b;
    if (attrs == null || typeof attrs !== 'object')
        return null;
    var raw = attrs.verification;
    if (raw == null || typeof raw !== 'object')
        return null;
    var block = raw;
    var status = asString(block.status);
    var confidence = asString(block.confidence);
    var openFindings = Number(block.open_findings);
    var openCritical = Number(block.open_critical);
    return {
        status: STATUSES.includes(status)
            ? status
            : 'unverified',
        confidence: CONFIDENCES.includes(confidence)
            ? confidence
            : null,
        lastChecked: asString(block.last_checked),
        lastCheckedBy: asString(block.last_checked_by),
        contentHash: (_a = asString(block.content_hash)) !== null && _a !== void 0 ? _a : '',
        sources: Array.isArray(block.sources)
            ? block.sources.map(function (s) { return String(s).trim(); }).filter(Boolean)
            : [],
        openFindings: Number.isFinite(openFindings) && openFindings > 0 ? Math.floor(openFindings) : 0,
        openCritical: Number.isFinite(openCritical) && openCritical > 0 ? Math.floor(openCritical) : 0,
        log: (_b = asString(block.log)) !== null && _b !== void 0 ? _b : '',
    };
}
/** Parse the block straight out of a markdown file's raw text. */
export function parseVerification(markdown) {
    try {
        return verificationFromAttributes(fm(markdown).attributes);
    }
    catch (_a) {
        return null;
    }
}
/** Where a content file's sidecar log lives. Mirrors `verify_lib.log_path_for`. */
export function verificationLogPath(contentPath) {
    return ".verify/".concat(contentPath.replace(/^\/+/, ''));
}
/**
 * Recover a page's own vault path from its block.
 *
 * Questions reach the app as raw markdown with no filename attached — the build
 * collects file *contents*, and a question's `id` doesn't map to its filename
 * (`cas5-2013f-q1` lives in `cas5-2013f-001.md`). But `log:` is that path with
 * `.verify/` on the front, and CI enforces that it is correct, so the block
 * carries the answer already.
 */
export function contentPathFromVerification(v) {
    var _a;
    if (!((_a = v === null || v === void 0 ? void 0 : v.log) === null || _a === void 0 ? void 0 : _a.startsWith('.verify/')))
        return null;
    var path = v.log.slice('.verify/'.length);
    return path || null;
}
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** `2026-08-12` → `12 Aug 2026`. Parsed by hand: `new Date('2026-08-12')` is UTC. */
export function formatCheckedDate(iso) {
    if (!iso)
        return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
    if (!m)
        return null;
    var month = MONTHS[Number(m[2]) - 1];
    if (!month)
        return null;
    return "".concat(Number(m[3]), " ").concat(month, " ").concat(m[1]);
}
/**
 * What to show a student — the verdict the **Fact Check** surfaces read out.
 * Deliberately conservative: only a page whose status is `verified` *and* whose
 * hash still matches gets the green badge, and a page carrying an open finding
 * says so even when it was verified, because an open finding is exactly the
 * thing a reader needs to know about.
 */
export function factCheckBadge(v) {
    if (v && v.openCritical > 0 && v.status !== 'disputed') {
        // A critical finding outranks every other state: it is the one thing a
        // reader has to know before they trust the page.
        return {
            label: 'Known issue',
            short: 'Issue',
            tone: 'red',
            detail: "".concat(v.openCritical, " unresolved critical finding").concat(v.openCritical === 1 ? '' : 's', " on this page."),
        };
    }
    if (!v || v.status === 'unverified') {
        return {
            label: 'Not fact checked',
            short: 'Unchecked',
            tone: 'grey',
            detail: 'Not yet checked against a source.',
        };
    }
    if (v.status === 'disputed') {
        return {
            label: 'Disputed',
            short: 'Disputed',
            tone: 'red',
            detail: 'Sources disagree, or something critical is unresolved.',
        };
    }
    if (v.status === 'stale') {
        return {
            label: 'Re-check needed',
            short: 'Re-check',
            tone: 'amber',
            detail: 'Edited since it was last checked.',
        };
    }
    if (v.status === 'in_review') {
        return {
            label: 'Under review',
            short: 'Review',
            tone: 'amber',
            detail: 'A fact check is in progress.',
        };
    }
    var date = formatCheckedDate(v.lastChecked);
    if (v.openCritical > 0) {
        return {
            label: 'Known issue',
            short: 'Issue',
            tone: 'red',
            detail: "".concat(v.openCritical, " unresolved critical finding").concat(v.openCritical === 1 ? '' : 's', " on this page."),
        };
    }
    if (v.openFindings > 0) {
        return {
            label: date ? "Fact checked \u00B7 ".concat(date) : 'Fact checked',
            short: 'Checked',
            tone: 'amber',
            detail: "Checked against ".concat(v.sources.length, " source").concat(v.sources.length === 1 ? '' : 's', ", with ").concat(v.openFindings, " open finding").concat(v.openFindings === 1 ? '' : 's', "."),
        };
    }
    return {
        label: date ? "Fact checked \u00B7 ".concat(date) : 'Fact checked',
        short: 'Checked',
        tone: 'green',
        detail: "Checked against ".concat(v.sources.length, " source").concat(v.sources.length === 1 ? '' : 's', "."),
    };
}
var ENTRY_HEADING = /^##\s+\[([^\]]+)\]\s*(.*)$/;
var ENTRY_FIELD = /^-\s+([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$/;
/** Statuses that close the finding an entry `resolves:`. Mirrors verify_lib. */
var CLOSING = ['resolved', 'wontfix', 'superseded'];
/**
 * Parse a sidecar log. Tolerant on purpose — a human can open one of these in
 * Obsidian and append a comment by hand, and their entry has to survive the
 * round trip into the next agent sweep verbatim.
 */
export function parseVerificationLog(raw) {
    var _a, _b;
    var attrs = {};
    var body = raw;
    try {
        var parsed = fm(raw);
        attrs = ((_a = parsed.attributes) !== null && _a !== void 0 ? _a : {});
        body = parsed.body;
    }
    catch (_c) {
        body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '');
    }
    var entries = [];
    var current = null;
    var lastField = null;
    var setField = function (key, value) {
        if (!current)
            return;
        var existing = current.fields.find(function (f) { return f.key === key; });
        if (existing)
            existing.value = value;
        else
            current.fields.push({ key: key, value: value });
    };
    for (var _i = 0, _d = body.split('\n'); _i < _d.length; _i++) {
        var line = _d[_i];
        var heading = ENTRY_HEADING.exec(line);
        if (heading) {
            current = {
                id: heading[1].trim(),
                title: heading[2].trim(),
                entryType: '', author: '', date: '', severity: '', status: '', resolves: '',
                applied: false,
                fields: [],
            };
            entries.push(current);
            lastField = null;
            continue;
        }
        if (!current)
            continue;
        var field = ENTRY_FIELD.exec(line);
        if (field) {
            lastField = field[1];
            setField(lastField, field[2].trim());
            continue;
        }
        if (lastField && /^[ \t]/.test(line) && line.trim()) {
            // A wrapped value: `evidence:` prose routinely runs to several lines.
            var existing = current.fields.find(function (f) { return f.key === lastField; });
            if (existing)
                existing.value = "".concat(existing.value, " ").concat(line.trim()).trim();
            continue;
        }
        if (!line.trim())
            lastField = null;
    }
    var _loop_1 = function (entry) {
        var get = function (key) { var _a, _b; return (_b = (_a = entry.fields.find(function (f) { return f.key === key; })) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : ''; };
        entry.entryType = get('entry_type').toLowerCase();
        entry.author = get('author');
        entry.date = get('date');
        entry.severity = get('severity').toLowerCase();
        entry.status = get('status').toLowerCase();
        entry.resolves = get('resolves');
        entry.applied = get('applied').toLowerCase() === 'true';
    };
    for (var _e = 0, entries_1 = entries; _e < entries_1.length; _e++) {
        var entry = entries_1[_e];
        _loop_1(entry);
    }
    return {
        target: attrs.target == null ? '' : String(attrs.target),
        created: attrs.created instanceof Date
            ? attrs.created.toISOString().slice(0, 10)
            : String((_b = attrs.created) !== null && _b !== void 0 ? _b : ''),
        entries: entries,
    };
}
/** Every entry id that something later in the log has closed. */
function closedEntryIds(log) {
    var closed = new Set();
    for (var _i = 0, _a = log.entries; _i < _a.length; _i++) {
        var entry = _a[_i];
        var closes = CLOSING.includes(entry.status);
        if (entry.resolves && closes)
            closed.add(entry.resolves);
        if (closes)
            closed.add(entry.id);
    }
    return closed;
}
/**
 * Findings still open, accounting for later resolutions. Nothing in a log is
 * ever edited, so "is it still open" is always a question about what came after.
 */
export function openFindings(log) {
    var closed = closedEntryIds(log);
    return log.entries.filter(function (e) { return e.entryType === 'finding' && !closed.has(e.id); });
}
export function openCriticalFindings(log) {
    return openFindings(log).filter(function (e) { return e.severity === 'critical'; });
}
var SOURCE_URL = /https?:\/\/[^\s)>\]]+/;
/** The auditor's fingerprint of the exact file that was read. */
var SOURCE_HASH = /\bsha-?256[:\s]+[0-9a-f]{16,}\b/gi;
/** A parenthetical carrying that fingerprint, and nothing a reader wants. */
var HASH_PAREN = /\s*\([^()]*sha-?256[^()]*\)/gi;
/**
 * Where in a citation the work stops being named and starts being located.
 *
 * A locator segment opens with a chapter, a section, a page or the word for one
 * — optionally behind an "and" / "incl." that continues a previous locator. Two
 * near misses are deliberately not here: `Q17` (a paper's question number reads
 * as part of what the source *is* — "CAS Exam 5 Fall 2019, Q17") and a bare
 * `PDF` (it opens plenty of titles), which arrives through `printed …` or
 * `PDF pp.` instead.
 */
var LOCATOR_START = /^(?:(?:and|incl\.?|including|plus|also|see|at)\s+)*(?:ch(?:apter)?s?\.?\s*\d|chapters?\b|§|sections?\b|pp?\.\s*[0-9A-Z]|pp?\s+\d|pages?\s+\d|printed\b|standard\s+pp?\b|appendi(?:x|ces)\b|principles?\b|tables?\s+\d|figs?\.|figures?\s+\d|exhibits?\b|footnotes?\b|fn\.|paras?\.|paragraphs?\b|arts?\.|articles?\s+\d|slides?\s+\d|PDF\s+pp?\.|domains?\s+[A-Z0-9]|parts?\s+[IVX0-9])/i;
/** Punctuation left stranded by cutting a citation in two. */
function trimCitationEdges(text) {
    return text.replace(/^[\s,;:—–-]+/, '').replace(/[\s,;:—–(-]+$/, '').trim();
}
/**
 * Where the locator begins, or -1 — the index of the separator to cut on.
 *
 * Two separators say it, and the earlier one wins. The convention is
 * `<name> — <where it was checked>`, but plenty of citations run the locator on
 * after a comma and only then reach a dash ("… (CAS, 5th ed. May 2016), Ch. 2
 * p.29 — NCCI loss costs …"), where cutting at the dash would keep the chapter
 * in the title. Commas and dashes inside brackets are part of whatever they sit
 * in, so the scan only sees the top level.
 */
function locatorCut(text) {
    var depth = 0;
    var segmentStart = 0;
    for (var i = 0; i < text.length; i++) {
        var c = text[i];
        if (c === '(' || c === '[')
            depth++;
        else if (c === ')' || c === ']')
            depth = Math.max(0, depth - 1);
        else if (depth > 0)
            continue;
        else if (c === '—' || c === '–')
            return i;
        else if (c === ',') {
            var segment = text.slice(segmentStart, i);
            if (segmentStart > 0 && LOCATOR_START.test(trimCitationEdges(segment)))
                return segmentStart - 1;
            segmentStart = i + 1;
        }
    }
    var last = text.slice(segmentStart);
    if (segmentStart > 0 && LOCATOR_START.test(trimCitationEdges(last)))
        return segmentStart - 1;
    return -1;
}
/**
 * Cut a cited source into the three parts worth printing.
 *
 * A citation is written for an auditor, not a reader: it carries the URL, a
 * sha256 of the exact file that was read, a version string and the pages the
 * claim was checked on. The hash and the version have to stay in the vault — it
 * is what makes the check reproducible — but on screen they bury the two things
 * a student wants, which are *which book* and *which pages*. So the name
 * becomes the card's title, the pages become the line under it, the URL becomes
 * the way to go and read it, and the fingerprint doesn't reach the screen at
 * all.
 */
export function summarizeSource(raw) {
    var text = (raw !== null && raw !== void 0 ? raw : '').trim();
    var match = SOURCE_URL.exec(text);
    var url = match ? match[0].replace(/[.,;:]+$/, '') : null;
    // Everything that isn't the citation's prose, removed before it is cut — the
    // URL and the hash both sit *between* the name and the locator as often as
    // they sit after them.
    var prose = (match ? text.slice(0, match.index) + ' ' + text.slice(match.index + match[0].length) : text)
        .replace(HASH_PAREN, ' ')
        .replace(SOURCE_HASH, ' ')
        .replace(/\(\s*\)/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    var cut = locatorCut(prose);
    var label = trimCitationEdges(cut < 0 ? prose : prose.slice(0, cut));
    var locator = cut < 0 ? '' : trimCitationEdges(prose.slice(cut + 1));
    if (!label)
        label = url !== null && url !== void 0 ? url : text;
    return { label: label, url: url, locator: locator || null };
}
var SEVERITY_ORDER = {
    critical: 0, major: 1, minor: 2, nit: 3,
};
export function summarizeLog(log) {
    var _a;
    var closed = closedEntryIds(log);
    var closers = new Map();
    for (var _i = 0, _b = log.entries; _i < _b.length; _i++) {
        var entry = _b[_i];
        if (entry.resolves && CLOSING.includes(entry.status)) {
            closers.set(entry.resolves, entry);
        }
    }
    var summary = { open: [], resolved: [], notes: [] };
    for (var _c = 0, _d = log.entries; _c < _d.length; _c++) {
        var entry = _d[_c];
        // A resolution belongs to the finding it closes; listing it separately would
        // say the same thing twice, in two places, out of order.
        if (entry.resolves && closers.get(entry.resolves) === entry)
            continue;
        var group = { entry: entry, closedBy: (_a = closers.get(entry.id)) !== null && _a !== void 0 ? _a : null };
        if (entry.entryType === 'finding') {
            if (closed.has(entry.id))
                summary.resolved.push(group);
            else
                summary.open.push(group);
        }
        else if (entry.entryType === 'correction' || entry.entryType === 'resolution') {
            summary.resolved.push(group);
        }
        else {
            summary.notes.push(group);
        }
    }
    summary.open.sort(function (a, b) { var _a, _b; return ((_a = SEVERITY_ORDER[a.entry.severity]) !== null && _a !== void 0 ? _a : 9) - ((_b = SEVERITY_ORDER[b.entry.severity]) !== null && _b !== void 0 ? _b : 9); });
    return summary;
}
/** One `- key: value` field of an entry, or '' when it has none. */
export function logField(entry, key) {
    var _a, _b;
    return (_b = (_a = entry.fields.find(function (f) { return f.key === key; })) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
}
/**
 * A fingerprint as evidence prose writes it — in full, or cut short behind an
 * ellipsis ("sha256:1cb44e7f..."), which a source line never is.
 */
var EVIDENCE_HASH = /\bsha-?256[:\s]+[0-9a-f]{6,}(?:\.{3}|…)?/gi;
/** Separators a removed URL or hash can leave stranded. Not `-`: it is a minus sign too. */
var STRANDED_CHARS = ',;:—–';
var STRANDED = "[".concat(STRANDED_CHARS, "]");
/**
 * Evidence as a reader can read it.
 *
 * An `evidence:` line is where a finding says what the source says, and it is
 * the other half of the diff the panel draws against what the page said. Most
 * of it is plain prose, but a citation inside it carries what `summarizeSource`
 * cuts off a source line — a sha256 of the file that was read, and the URL it
 * was read at — usually in the middle of a sentence ("… REFERENCES pp.5-7,
 * sha256:bed2…, https://…. p.5 lists …"). Both come out, the URL to be offered
 * as a link instead, and the separators they leave behind are tidied. Text with
 * neither is returned exactly as written: the tidying is only ever a repair of
 * what the cut left, never an edit of the finding.
 */
export function summarizeEvidence(raw) {
    var text = (raw !== null && raw !== void 0 ? raw : '').trim();
    var links = __spreadArray([], text.matchAll(new RegExp(SOURCE_URL.source, 'g')), true).map(function (m) { return m[0].replace(/[.,;:]+$/, ''); });
    var hasHash = new RegExp(EVIDENCE_HASH.source, 'i').test(text);
    if (links.length === 0 && !hasHash)
        return { text: text, links: links };
    // The hash alone, not the bracket around it as `summarizeSource` drops: in
    // evidence that bracket is as often the name of what was read ("P-21-05
    // (Risk and Insurance, sha256:1cb4…)") as the auditor's aside.
    var prose = links
        .reduce(function (t, url) { return t.split(url).join(' '); }, text)
        .replace(EVIDENCE_HASH, ' ')
        .replace(/\s+/g, ' ');
    var previous = '';
    while (prose !== previous) {
        previous = prose;
        prose = prose
            // Brackets the cut emptied, or left opening or closing on a separator.
            .replace(new RegExp("\\(\\s*(?:".concat(STRANDED, "\\s*)*\\)"), 'g'), '')
            .replace(new RegExp("\\(\\s*".concat(STRANDED, "\\s*"), 'g'), '(')
            .replace(new RegExp("\\s*".concat(STRANDED, "\\s*\\)"), 'g'), ')')
            // Two separators in a row where something between them was taken out.
            .replace(new RegExp("(".concat(STRANDED, ")(?:\\s*").concat(STRANDED, ")+"), 'g'), '$1')
            .replace(new RegExp("".concat(STRANDED, "\\s*\\."), 'g'), '.')
            .replace(/\s+([,;:.)])/g, '$1')
            .replace(/\s+/g, ' ');
    }
    // Not `trimCitationEdges`: evidence can open on a negative number.
    var trimmed = prose
        .replace(new RegExp("^[\\s".concat(STRANDED_CHARS, "]+")), '')
        .replace(new RegExp("[\\s(".concat(STRANDED_CHARS, "]+$")), '');
    return { text: trimmed, links: __spreadArray([], new Set(links), true) };
}
export function findingOutcome(group) {
    var _a, _b;
    var entry = group.entry, closedBy = group.closedBy;
    if (entry.entryType !== 'finding')
        return null;
    var proposed = logField(entry, 'proposed_action');
    var status = (closedBy === null || closedBy === void 0 ? void 0 : closedBy.status) || entry.status;
    if (CLOSING.includes(status)) {
        var said = closedBy ? logField(closedBy, 'note') : '';
        // A finding closed without a word is fixed the way it proposed. One set
        // aside is not: its proposal is exactly what was *not* done.
        if (status === 'resolved')
            return { kind: 'fixed', date: (_a = closedBy === null || closedBy === void 0 ? void 0 : closedBy.date) !== null && _a !== void 0 ? _a : '', note: said || proposed };
        return { kind: status, date: (_b = closedBy === null || closedBy === void 0 ? void 0 : closedBy.date) !== null && _b !== void 0 ? _b : '', note: said };
    }
    if (entry.applied)
        return { kind: 'applied', note: proposed };
    return proposed ? { kind: 'proposed', note: proposed } : null;
}
/**
 * Should this page be kept out of a quiz session by default?
 *
 * True when something critical is on file about it: an unresolved critical
 * finding, or a `disputed` status (which means either sources conflict or a
 * critical finding is unresolved). Serving a student a question that the record
 * says is wrong is the exact failure this whole layer exists to prevent — but it
 * is a *default*, not a lock, because reviewing flagged questions is how they get
 * fixed. `hooks/useShowFlaggedQuestions.ts` is the toggle.
 */
export function hasCriticalFinding(v) {
    if (!v)
        return false;
    return v.openCritical > 0 || v.status === 'disputed';
}
