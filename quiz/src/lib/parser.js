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
import fm from 'front-matter';
import { verificationFromAttributes, hasCriticalFinding } from './verification';
var OPTION_REGEX = /^- ([A-E])\)\s+(.+)/;
// Normalize a free-entry answer for comparison: strip whitespace and common
// currency/formatting characters ($, €, £, commas), then if parseable as a
// number round to 4 decimal places so "3400", "$3,400", and "3,400" all compare
// equal, and "3.670" and "3.67" compare equal.
export function normalizeAnswerText(s) {
    var trimmed = s.trim();
    var stripped = trimmed.replace(/[$€£,]/g, '');
    var num = Number(stripped);
    if (stripped !== '' && !isNaN(num)) {
        return String(Math.round(num * 10000) / 10000);
    }
    return trimmed.toLowerCase();
}
// Single grading function that works for all question types.
export function isAnswerCorrect(question, chosen) {
    var _a;
    if (question.type === 'multiple-choice') {
        return chosen === question.answer;
    }
    if (question.type === 'free-entry') {
        return normalizeAnswerText(chosen) === normalizeAnswerText(question.answer);
    }
    if (question.type === 'multi-part') {
        try {
            var chosenParts_1 = JSON.parse(chosen);
            var parts = (_a = question.parts) !== null && _a !== void 0 ? _a : [];
            if (parts.length === 0)
                return false;
            // Essay parts (answer === '') are ungraded — exclude from correctness check.
            var gradedParts = parts.filter(function (p) { return p.answer !== ''; });
            if (gradedParts.length === 0)
                return true;
            return gradedParts.every(function (part) {
                var _a;
                var partChosen = (_a = chosenParts_1[part.label]) !== null && _a !== void 0 ? _a : '';
                if (part.type === 'multiple-choice')
                    return partChosen === part.answer;
                return normalizeAnswerText(partChosen) === normalizeAnswerText(part.answer);
            });
        }
        catch (_b) {
            return false;
        }
    }
    return false;
}
// Fraction of credit [0,1] earned on a question, honouring manual grade
// overrides and — crucially — awarding *partial* credit for multi-part
// questions where only some graded parts are right (or a part was manually
// graded 'partial'). `isAnswerCorrect` collapses these to a single boolean;
// this is the graded-per-part view used by the results summary.
export function questionCredit(question, chosen, manualGrades) {
    var _a, _b;
    if (manualGrades === void 0) { manualGrades = {}; }
    if (chosen == null)
        return 0;
    if (question.type === 'multiple-choice') {
        return isAnswerCorrect(question, chosen) ? 1 : 0;
    }
    if (question.type === 'free-entry') {
        var override = manualGrades[question.id];
        if (override !== undefined)
            return override === 'correct' ? 1 : override === 'partial' ? 0.5 : 0;
        return isAnswerCorrect(question, chosen) ? 1 : 0;
    }
    if (question.type === 'multi-part') {
        try {
            var parts = (_a = question.parts) !== null && _a !== void 0 ? _a : [];
            // Essay parts (answer === '') are ungraded — excluded, matching isAnswerCorrect.
            var gradedParts = parts.filter(function (p) { return p.answer !== ''; });
            if (gradedParts.length === 0)
                return 1;
            var chosenParts = JSON.parse(chosen);
            var earned = 0;
            for (var _i = 0, gradedParts_1 = gradedParts; _i < gradedParts_1.length; _i++) {
                var part = gradedParts_1[_i];
                var override = manualGrades["".concat(question.id, "__").concat(part.label)];
                if (override !== undefined) {
                    earned += override === 'correct' ? 1 : override === 'partial' ? 0.5 : 0;
                    continue;
                }
                var partChosen = (_b = chosenParts[part.label]) !== null && _b !== void 0 ? _b : '';
                var right = part.type === 'multiple-choice'
                    ? partChosen === part.answer
                    : normalizeAnswerText(partChosen) === normalizeAnswerText(part.answer);
                earned += right ? 1 : 0;
            }
            return earned / gradedParts.length;
        }
        catch (_c) {
            return 0;
        }
    }
    return 0;
}
// Three-state outcome derived from questionCredit: full credit → 'correct',
// no credit → 'incorrect', anything in between → 'partial' (shown yellow).
export function questionOutcome(question, chosen, manualGrades) {
    if (manualGrades === void 0) { manualGrades = {}; }
    var credit = questionCredit(question, chosen, manualGrades);
    if (credit >= 1)
        return 'correct';
    if (credit <= 0)
        return 'incorrect';
    return 'partial';
}
// Whether every graded part of a multi-part question has a non-empty answer
// (essay parts with answer === '' need no user input and are skipped).
export function isMultiPartAnswerComplete(question, chosen) {
    var _a;
    var parts = (_a = question.parts) !== null && _a !== void 0 ? _a : [];
    if (parts.length === 0)
        return true;
    try {
        var chosenParts_2 = JSON.parse(chosen);
        return parts.every(function (p) { var _a; return p.answer === '' || ((_a = chosenParts_2[p.label]) !== null && _a !== void 0 ? _a : '').trim() !== ''; });
    }
    catch (_b) {
        return false;
    }
}
// Parse the content within a single Part block into its sub-sections.
function parsePartSections(content) {
    var sectionBlocks = content.split(/^### /m);
    var rawStem = sectionBlocks[0].trim();
    var answer = '';
    var explanation = '';
    var examiner_report;
    for (var i = 1; i < sectionBlocks.length; i++) {
        var block = sectionBlocks[i];
        var newlineIdx = block.indexOf('\n');
        var heading = (newlineIdx >= 0 ? block.slice(0, newlineIdx) : block).trim().toLowerCase();
        var body = (newlineIdx >= 0 ? block.slice(newlineIdx + 1) : '').trim();
        if (heading === 'answer') {
            answer = body.split('\n')[0].trim();
        }
        else if (heading === 'explanation') {
            explanation = body;
        }
        else if (heading === 'examiner report') {
            examiner_report = body;
        }
    }
    // Detect option lines within the stem (supports mixed MC/free-entry multi-part)
    var stemLines = rawStem.split('\n');
    var optionStartIdx = stemLines.findIndex(function (l) { return OPTION_REGEX.test(l); });
    var stem = rawStem;
    var options = [];
    if (optionStartIdx >= 0) {
        stem = stemLines.slice(0, optionStartIdx).join('\n').trim();
        options = stemLines
            .slice(optionStartIdx)
            .filter(function (l) { return OPTION_REGEX.test(l); })
            .map(function (l) {
            var match = l.match(OPTION_REGEX);
            return { key: match[1], text: match[2].trim() };
        });
    }
    return { stem: stem, answer: answer, explanation: explanation, examiner_report: examiner_report, options: options };
}
// Parse the body of a multi-part question into an array of Parts.
// Format:
//   ## Part a (0.25 points)
//   [stem text]
//   ### Answer
//   4.5
//   ### Explanation
//   [text]
//   ### Examiner Report
//   [text]
function parseMultiPartBody(body) {
    var PART_HEADING_RE = /^## Part ([A-Ea-e])(?:\s*\(([0-9.]+)\s*points?\))?[^\n]*/gm;
    var matches = __spreadArray([], body.matchAll(PART_HEADING_RE), true);
    if (matches.length === 0)
        return null;
    var parts = [];
    var _loop_1 = function (i) {
        var match = matches[i];
        var label = match[1].toLowerCase();
        var points = match[2] ? parseFloat(match[2]) : 0;
        var startIdx = match.index + match[0].length;
        var endIdx = i + 1 < matches.length ? matches[i + 1].index : body.length;
        var partContent = body.slice(startIdx, endIdx).trim();
        var _a = parsePartSections(partContent), stem = _a.stem, answer = _a.answer, explanation = _a.explanation, examiner_report = _a.examiner_report, options = _a.options;
        var type = options.length > 0 ? 'multiple-choice' : 'free-entry';
        // Skip malformed MC parts where the answer key has no matching option
        if (type === 'multiple-choice' && answer && !options.some(function (o) { return o.key === answer; })) {
            return "continue";
        }
        parts.push({ label: label, points: points, stem: stem, type: type, options: options, answer: answer, explanation: explanation, examiner_report: examiner_report });
    };
    for (var i = 0; i < matches.length; i++) {
        _loop_1(i);
    }
    return parts.length > 0 ? parts : null;
}
export function parseQuestion(raw) {
    var _a, _b, _c;
    try {
        var parsed = fm(raw);
        var data = parsed.attributes;
        var content = parsed.body;
        var type = data.type;
        if (!data.id || !data.exam || !data.topic || !data.difficulty || !data.type) {
            return null;
        }
        // multi-part stores answers in parts[], not in frontmatter
        if (type !== 'multi-part' && !data.answer) {
            return null;
        }
        var rawLink = data.wiki_link;
        var wikiLinks = Array.isArray(rawLink)
            ? rawLink.map(String).filter(function (s) { return s.length > 0; })
            : rawLink ? [String(rawLink)].filter(function (s) { return s.length > 0; }) : [];
        var base = {
            id: String(data.id),
            exam: String(data.exam),
            topic: String(data.topic),
            learning_objective: data.learning_objective ? String(data.learning_objective) : '',
            difficulty: data.difficulty,
            type: type,
            wiki_link: wikiLinks,
            points: Number((_a = data.points) !== null && _a !== void 0 ? _a : 1),
            author: data.author ? String(data.author) : undefined,
            year: data.year ? Number(data.year) : undefined,
            session: data.session ? String(data.session) : undefined,
            originally_exam: data.originally_exam ? String(data.originally_exam) : undefined,
            off_syllabus: String(data.off_syllabus).toLowerCase() === 'true' ? true : undefined,
            verification: (_b = verificationFromAttributes(data)) !== null && _b !== void 0 ? _b : undefined,
        };
        // ── multi-part ──────────────────────────────────────────────────────────
        if (type === 'multi-part') {
            var firstPartIdx = content.search(/^## Part /m);
            var parts = parseMultiPartBody(content);
            if (parts) {
                var stem_1 = firstPartIdx >= 0
                    ? content.slice(0, firstPartIdx).trim()
                    : content.trim();
                return __assign(__assign({}, base), { stem: stem_1, options: [], answer: '', explanation: '', parts: parts });
            }
            // No explicit "## Part" headings — treat the whole body as a single
            // implicit part. Covers single-part CAS written/calculation questions
            // authored with ### Answer/### Explanation/### Examiner Report sections
            // but no part split, so they parse instead of being silently dropped.
            var sec = parsePartSections(content);
            if (!sec.answer && !sec.explanation)
                return null;
            var singlePart = {
                label: 'a',
                points: base.points,
                stem: '',
                type: sec.options.length > 0 ? 'multiple-choice' : 'free-entry',
                options: sec.options,
                answer: sec.answer,
                explanation: sec.explanation,
                examiner_report: sec.examiner_report,
            };
            return __assign(__assign({}, base), { stem: sec.stem, options: [], answer: '', explanation: '', parts: [singlePart] });
        }
        // ── free-entry and multiple-choice ──────────────────────────────────────
        // Split off "## Explanation" section
        var bodyParts = content.split(/^## Explanation\s*$/m);
        var bodyBeforeExplanation = bodyParts[0];
        var rawExplanation = bodyParts.length > 1 ? bodyParts[1].trim() : null;
        // Split off "## Examiner Report" from whichever section it appears in
        var explanation = void 0;
        var examiner_report = void 0;
        if (rawExplanation !== null) {
            var expParts = rawExplanation.split(/^## Examiner Report\s*$/m);
            explanation = expParts[0].trim();
            examiner_report = expParts.length > 1 ? expParts[1].trim() : undefined;
        }
        else {
            // Backward compat: explanation in YAML frontmatter
            explanation = String((_c = data.explanation) !== null && _c !== void 0 ? _c : '');
        }
        // Also check body-before-explanation for an Examiner Report block
        if (!examiner_report) {
            var bodyExParts = bodyBeforeExplanation.split(/^## Examiner Report\s*$/m);
            if (bodyExParts.length > 1) {
                examiner_report = bodyExParts[1].split(/^## /m)[0].trim() || undefined;
            }
        }
        // ── free-entry ──────────────────────────────────────────────────────────
        if (type === 'free-entry') {
            var stemContent = bodyBeforeExplanation
                .split(/^## Examiner Report\s*$/m)[0]
                .trim();
            return __assign(__assign({}, base), { stem: stemContent, options: [], answer: String(data.answer), explanation: explanation, examiner_report: examiner_report });
        }
        // ── multiple-choice ─────────────────────────────────────────────────────
        var lines = bodyBeforeExplanation.trim().split('\n');
        var optionStartIdx = lines.findIndex(function (l) { return OPTION_REGEX.test(l); });
        var stem = optionStartIdx > 0
            ? lines.slice(0, optionStartIdx).join('\n').trim()
            : bodyBeforeExplanation.trim();
        var options = optionStartIdx >= 0
            ? lines
                .slice(optionStartIdx)
                .filter(function (l) { return OPTION_REGEX.test(l); })
                .map(function (l) {
                var match = l.match(OPTION_REGEX);
                return { key: match[1], text: match[2].trim() };
            })
            : [];
        var answerKey_1 = String(data.answer);
        if (options.length === 0 || !options.some(function (o) { return o.key === answerKey_1; })) {
            return null;
        }
        return __assign(__assign({}, base), { stem: stem, options: options, answer: answerKey_1, explanation: explanation, examiner_report: examiner_report });
    }
    catch (_d) {
        return null;
    }
}
var STOP_WORDS = new Set([
    'the', 'and', 'that', 'this', 'with', 'for', 'are', 'was', 'were', 'been',
    'have', 'has', 'had', 'will', 'would', 'could', 'should', 'may', 'might',
    'shall', 'can', 'does', 'did', 'not', 'but', 'from', 'they', 'their',
    'there', 'when', 'where', 'which', 'who', 'what', 'how', 'its', 'also',
    'more', 'than', 'some', 'such', 'each', 'into', 'about', 'over', 'does',
    'only', 'very', 'even', 'most', 'both', 'your', 'our', 'any', 'all',
]);
export function estimateEssayScore(userAnswer, sampleAnswer) {
    if (!userAnswer.trim() || !sampleAnswer.trim())
        return { matched: 0, total: 0, pct: 0 };
    var tokenize = function (text) {
        return new Set(text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, ' ')
            .split(/\s+/)
            .filter(function (w) { return w.length > 3 && !STOP_WORDS.has(w); }));
    };
    var sampleWords = tokenize(sampleAnswer);
    if (sampleWords.size === 0)
        return { matched: 0, total: 0, pct: 0 };
    var userWords = tokenize(userAnswer);
    var matched = 0;
    for (var _i = 0, sampleWords_1 = sampleWords; _i < sampleWords_1.length; _i++) {
        var w = sampleWords_1[_i];
        if (userWords.has(w))
            matched++;
    }
    return { matched: matched, total: sampleWords.size, pct: Math.round((matched / sampleWords.size) * 100) };
}
export function parseAllQuestions(rawFiles) {
    var seen = new Set();
    var result = [];
    for (var _i = 0, rawFiles_1 = rawFiles; _i < rawFiles_1.length; _i++) {
        var raw = rawFiles_1[_i];
        var q = parseQuestion(raw);
        if (!q)
            continue;
        if (seen.has(q.id))
            continue;
        seen.add(q.id);
        result.push(q);
    }
    return result;
}
/**
 * True when `q` sits on `exam` only because the syllabus moved — it was written
 * for, and sat on, the paper of a different exam (`originally_exam`).
 *
 * Such a question keeps the `year`/`session` of the paper it really came from,
 * so those dates name a sitting of the *other* exam. Anything that reasons
 * about "this exam's sitting" has to skip it, or the transplanted date invents
 * a sitting that never happened — the CAS moved Time Series and Statistical
 * Learning from MAS-I to MAS-II, and the re-tagged MAS-I Spring 2018 questions
 * would otherwise conjure an "Exam MAS-II Spring 2018" paper, six months before
 * MAS-II was first sat.
 */
export function isFromAnotherExamsPaper(q, exam) {
    var _a;
    var from = (_a = q.originally_exam) === null || _a === void 0 ? void 0 : _a.trim();
    return !!from && from.toLowerCase() !== exam.trim().toLowerCase();
}
/**
 * How a question's `learning_objective` is matched to a syllabus section. The
 * CAS content outlines letter their domains (`A. Ratemaking`) and the exam page
 * keeps the letter; a question names the domain by its words. So the letter is
 * dropped, with case and spacing, before comparing — `A. Ratemaking`,
 * `ratemaking` and `Ratemaking` are one objective. Mirrors `objective_key` in
 * scripts/syllabus_lib.py, which is what scripts/syllabus_lint.py holds every
 * bank to.
 */
export function objectiveKey(title) {
    return title.trim().replace(/^[A-Z]\.\s+/, '').replace(/\s+/g, ' ').toLowerCase();
}
export function filterQuestions(questions, filters) {
    return questions.filter(function (q) {
        var _a, _b, _c, _d, _e, _f;
        // Before anything else, and ahead of the `ids` short-circuit: a question the
        // record says is critically wrong should not reach a student by any route,
        // including a direct id lookup, unless the caller has explicitly asked for
        // flagged questions.
        if (!filters.includeFlagged && hasCriticalFinding(q.verification))
            return false;
        if ((_a = filters.ids) === null || _a === void 0 ? void 0 : _a.length)
            return filters.ids.includes(q.id);
        // A question kept only for the record: it belongs to its paper, so a
        // sitting filter still finds it, and so does a search — but a quiz drawn
        // from an exam, a topic or a concept never serves it.
        if (q.off_syllabus && !filters.includeOffSyllabus && !filters.year && !filters.session && !filters.search)
            return false;
        if (filters.exam && q.exam.toLowerCase() !== filters.exam.toLowerCase())
            return false;
        if (filters.topic && q.topic.toLowerCase() !== filters.topic.toLowerCase())
            return false;
        if ((_b = filters.topics) === null || _b === void 0 ? void 0 : _b.length) {
            if (!filters.topics.some(function (s) { return q.topic.toLowerCase() === s.toLowerCase(); }))
                return false;
        }
        if (filters.learningObjective && objectiveKey(q.learning_objective) !== objectiveKey(filters.learningObjective))
            return false;
        if ((_c = filters.learningObjectives) === null || _c === void 0 ? void 0 : _c.length) {
            var key_1 = objectiveKey(q.learning_objective);
            if (!filters.learningObjectives.some(function (s) { return key_1 === objectiveKey(s); }))
                return false;
        }
        if (filters.difficulty && q.difficulty !== filters.difficulty)
            return false;
        if (filters.author) {
            if (!((_d = q.author) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(filters.author.toLowerCase())))
                return false;
        }
        if (filters.year && q.year !== filters.year)
            return false;
        if (filters.session && ((_e = q.session) === null || _e === void 0 ? void 0 : _e.toLowerCase()) !== filters.session.toLowerCase())
            return false;
        // Filtering to a sitting of a named exam: a question carried over from
        // another exam's paper is not part of it, whatever date it still carries.
        if ((filters.year || filters.session) && filters.exam && isFromAnotherExamsPaper(q, filters.exam))
            return false;
        if (filters.search) {
            var needle = filters.search.toLowerCase();
            if (!q.stem.toLowerCase().includes(needle) && !q.id.toLowerCase().includes(needle))
                return false;
        }
        if (filters.concept) {
            var needle_1 = filters.concept.toLowerCase();
            var matches = q.wiki_link.some(function (link) {
                var _a;
                var clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '');
                var lastSegment = (_a = clean.split('/').filter(Boolean).pop()) !== null && _a !== void 0 ? _a : '';
                return lastSegment.toLowerCase() === needle_1;
            });
            if (!matches)
                return false;
        }
        if ((_f = filters.concepts) === null || _f === void 0 ? void 0 : _f.length) {
            var needles_1 = new Set(filters.concepts.map(function (c) { return c.toLowerCase(); }));
            var matches = q.wiki_link.some(function (link) {
                var _a;
                var clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '');
                var lastSegment = (_a = clean.split('/').filter(Boolean).pop()) !== null && _a !== void 0 ? _a : '';
                return needles_1.has(lastSegment.toLowerCase());
            });
            if (!matches)
                return false;
        }
        return true;
    });
}
