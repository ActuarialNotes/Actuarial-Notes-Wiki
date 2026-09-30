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
// Maps a wikiParser examId to the exam_progress table key used in tracks.ts.
// "P-1" → "P", "FM-2" → "FM", "MAS-I" → "MAS-I", "7" → "CAS-7", "6C" → "CAS-6",
// "PCPA" → "CAS-PCPA", "DISC-DA" → "CAS-DA"
export function wikiExamIdToProgressKey(examId) {
    if (examId.startsWith('MAS-'))
        return examId;
    // PCPA is a CAS requirement named by letters rather than a number, and the
    // tracks key it `CAS-PCPA` — the bare-letters branch below would give `PCPA`.
    if (examId === 'PCPA')
        return 'CAS-PCPA';
    // The three DISC courses: the tracks key them by their letters alone
    // (`CAS-DA`, `CAS-RM`, `CAS-IA`).
    var disc = examId.match(/^DISC-([A-Z]+)$/);
    if (disc)
        return "CAS-".concat(disc[1]);
    if (/^[A-Z]+-\d+$/.test(examId))
        return examId.replace(/-\d+$/, '');
    if (/^[A-Z]+$/.test(examId))
        return examId;
    return 'CAS-' + examId.replace(/[A-Z]+$/, '');
}
// Strip [[wiki links]] from text, keeping only display names, for use as excerpts.
export function cleanWikiLinks(text) {
    return text
        .replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1')
        .replace(/\[\[([^\]]+)\]\]/g, function (_, t) { var _a; return t.includes('/') ? ((_a = t.split('/').pop()) !== null && _a !== void 0 ? _a : t) : t; });
}
// Extract all [[Name]] and [[Name|Display]] patterns from text.
// Always uses the last path segment of the target as the concept name so that
// aliased links like [[Callable Bond|Callable]] produce name="Callable Bond",
// not the syllabus shorthand "Callable". Deduplicates by lowercased name.
function extractWikiLinks(text) {
    var regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
    var seen = new Set();
    var concepts = [];
    var match;
    while ((match = regex.exec(text)) !== null) {
        var target = match[1].trim();
        var baseName = target.includes('/') ? target.split('/').pop() : target;
        var name_1 = baseName;
        if (!seen.has(name_1.toLowerCase())) {
            seen.add(name_1.toLowerCase());
            concepts.push({ name: name_1, target: target });
        }
    }
    return concepts;
}
// Extract exam identity from the data-current attribute on the exam-nav div.
// data-current="P-1|Probability" → { examId: "P-1", examTopic: "Probability", examLabel: "Exam P" }
export function parseExamMetadata(content) {
    var match = content.match(/data-current="([^|"]+)\|([^"]+)"/);
    if (!match)
        return null;
    var examId = match[1].trim(); // e.g. "P-1"
    var examTopic = match[2].trim(); // e.g. "Probability"
    var examLabel = 'Exam ' + examId.replace(/-\d+$/, ''); // "Exam P"
    return { examId: examId, examTopic: examTopic, examLabel: examLabel };
}
// Parse an exam markdown file and extract Learning Objectives as a
// WikiExamSyllabus. `[!example]` callouts (`> [!example]- TopicName {weight}`)
// become topics; every [[wiki link]] inside becomes a concept. Any other
// callout ends the current topic; the book links inside the
// `[!answer]- Source Material` block are collected as resources so they don't
// get folded into the last learning objective. Callouts of any other type
// (e.g. `[!info]`/`[!tip]` exam-day and study-approach notes) are ignored
// entirely — their wiki links are guidance, not syllabus concepts or sources.
export function parseExamSyllabus(content, examId, examLabel, examTopic, fileName) {
    var _a;
    var lines = content.split('\n');
    var topics = [];
    var current = null;
    var inResource = false;
    var resourceLines = [];
    var flush = function () {
        if (!current)
            return;
        var concepts = [];
        var seen = new Set();
        for (var _i = 0, _a = current.lines; _i < _a.length; _i++) {
            var line = _a[_i];
            var lineLinks = extractWikiLinks(line);
            var excerpt = cleanWikiLinks(line).trim();
            for (var _b = 0, lineLinks_1 = lineLinks; _b < lineLinks_1.length; _b++) {
                var link = lineLinks_1[_b];
                if (!seen.has(link.name.toLowerCase())) {
                    seen.add(link.name.toLowerCase());
                    concepts.push(__assign(__assign({}, link), { excerpt: excerpt }));
                }
            }
        }
        topics.push({ name: current.name, weight: current.weight, concepts: concepts });
        current = null;
    };
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        // Any callout header: > [!type]- Title {weight}
        var header = line.match(/^>\s*\[!(\w+)\]-?\s*([^{}\n]*?)(?:\s*\{([^}]+)\})?\s*$/);
        if (header) {
            flush();
            var kind = header[1].toLowerCase();
            if (kind === 'example') {
                inResource = false;
                current = { name: header[2].trim(), weight: (_a = header[3]) === null || _a === void 0 ? void 0 : _a.trim(), lines: [] };
            }
            else {
                // Only the `[!answer]- Source Material` callout holds resources. Other
                // callout types (exam-day notes, study advice) end the current topic but
                // contribute neither concepts nor resources — their links are guidance,
                // not syllabus entries.
                inResource = kind === 'answer';
            }
        }
        else if (line.startsWith('>')) {
            var body = line.replace(/^>\s?/, '');
            if (current)
                current.lines.push(body);
            else if (inResource)
                resourceLines.push(body);
        }
        // Blank lines and non-callout lines outside a block are ignored
    }
    flush();
    var resources = [];
    var seenResources = new Set();
    for (var _b = 0, resourceLines_1 = resourceLines; _b < resourceLines_1.length; _b++) {
        var line = resourceLines_1[_b];
        for (var _c = 0, _d = extractWikiLinks(line); _c < _d.length; _c++) {
            var link = _d[_c];
            if (!seenResources.has(link.name.toLowerCase())) {
                seenResources.add(link.name.toLowerCase());
                resources.push({ name: link.name, target: link.target });
            }
        }
    }
    return { examId: examId, examLabel: examLabel, examTopic: examTopic, topics: topics, resources: resources, fileName: fileName };
}
/**
 * All syllabi whose topic lists reference a concept, matched by display name
 * or by the raw `[[target]]` basename (handles `[[Bond Price|Price]]` aliases).
 * A concept taught in more than one exam's study guide yields multiple results —
 * callers must not silently pick the first one; ask the user which to open.
 */
export function findSyllabiForConcept(syllabi, conceptName) {
    var needle = conceptName.toLowerCase();
    return syllabi.filter(function (s) { return s.topics.some(function (t) { return t.concepts.some(function (c) {
        var _a;
        if (c.name.toLowerCase() === needle)
            return true;
        var targetBase = (_a = c.target.split('/').pop()) === null || _a === void 0 ? void 0 : _a.replace(/\.md$/i, '').toLowerCase();
        return targetBase === needle;
    }); }); });
}
