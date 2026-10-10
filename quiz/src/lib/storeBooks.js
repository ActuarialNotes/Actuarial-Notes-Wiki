// The Store's **Textbooks** aisle, built from the vault rather than typed into
// the Store: every `Resources/Books` page that describes a book a candidate
// buys (a textbook or casebook with an ISBN), with the exams it is a syllabus
// reading for and the chapters each exam assigns.
//
// Both halves are already authored — the book's facts in its page's front
// matter, the reading assignment in each exam page's `Source Material`
// callout (`lib/sourceMaterial.ts`) — so the aisle can't drift from the study
// guides: a book added to an exam's reading list is on the shelf at the next
// build, and one dropped from every list leaves it.
//
// It runs at bundle time (`virtual:store-books` in `vite.config.ts`), so the
// Store carries a few kilobytes of book facts instead of the wiki's megabytes.
// Imports are relative, not `@/`-aliased, for that reason: the vite config
// pulls this module into its own Node graph, as it does `resourceExams.ts`.
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { extractSourceMaterial } from './sourceMaterial';
import { compareExamLabels, examPillLabel } from './resourceExams';
/**
 * The exam a reading-list label names — the labels `lib/resourceExams.ts`
 * prints on a resource's pills ("Exam P-1", "Exam 6C") — or undefined for an
 * exam the Store doesn't carry (the SOA exams past FM), whose readings stay off
 * its shelf.
 */
var READING_LABEL_KEYS = {
    'Exam P-1': 'P',
    'Exam FM-2': 'FM',
    'Exam MAS-I': 'MAS-I',
    'Exam MAS-II': 'MAS-II',
    'Exam DISC-IA': 'CAS-IA',
    'Exam DISC-DA': 'CAS-DA',
    'Exam DISC-RM': 'CAS-RM',
    'Exam 5': 'CAS-5',
    'Exam PCPA': 'CAS-PCPA',
    'Exam 6C': 'CAS-6',
    'Exam 6U': 'CAS-6',
    'Exam 7': 'CAS-7',
    'Exam 8': 'CAS-8',
    'Exam 9': 'CAS-9',
};
export function readingExamKey(label) {
    return READING_LABEL_KEYS[label];
}
/** The kinds of document a candidate buys rather than reads free from the publisher. */
var BOUGHT_TYPES = new Set(['textbook', 'casebook']);
function str(value) {
    if (value === null || value === undefined)
        return undefined;
    var s = String(value).trim();
    return s || undefined;
}
/** `[statlearning.com](https://www.statlearning.com/)` → the URL; a bare URL as is. */
export function linkTarget(value) {
    if (!value)
        return undefined;
    var md = /\]\((https?:\/\/[^)\s]+)\)/.exec(value);
    if (md)
        return md[1];
    return /^https?:\/\/\S+$/.test(value) ? value : undefined;
}
/**
 * The books on the Textbooks aisle: pages typed Textbook or Casebook that carry
 * an ISBN and are a syllabus reading for at least one exam — in syllabus order
 * of their first exam, then by title.
 */
export function buildStoreBooks(examPages, books) {
    var _a, _b, _c, _d, _e;
    var readings = new Map();
    var _loop_1 = function (page) {
        var exam = examPillLabel(page.name);
        if (!readingExamKey(exam))
            return "continue";
        for (var _g = 0, _h = extractSourceMaterial(page.markdown).entries; _g < _h.length; _g++) {
            var entry = _h[_g];
            var key = entry.name.toLowerCase();
            var list = (_a = readings.get(key)) !== null && _a !== void 0 ? _a : [];
            if (list.some(function (r) { return r.exam === exam; }))
                continue;
            list.push(entry.detail ? { exam: exam, detail: entry.detail } : { exam: exam });
            readings.set(key, list);
        }
    };
    for (var _i = 0, examPages_1 = examPages; _i < examPages_1.length; _i++) {
        var page = examPages_1[_i];
        _loop_1(page);
    }
    var out = [];
    for (var _f = 0, books_1 = books; _f < books_1.length; _f++) {
        var book = books_1[_f];
        var isbn = str(book.attrs['ISBN']);
        var type = str(book.attrs['Type']);
        if (!isbn || !type || !BOUGHT_TYPES.has(type.toLowerCase()))
            continue;
        var assigned = __spreadArray([], ((_b = readings.get(book.name.toLowerCase())) !== null && _b !== void 0 ? _b : []), true).sort(function (a, b) { return compareExamLabels(a.exam, b.exam); });
        if (assigned.length === 0)
            continue;
        var year = Number.parseInt((_c = str(book.attrs['Year'])) !== null && _c !== void 0 ? _c : '', 10);
        var entry = {
            name: book.name,
            title: (_d = str(book.attrs['Title'])) !== null && _d !== void 0 ? _d : book.name,
            isbn: isbn,
            type: type,
            readings: assigned,
        };
        var authors = (_e = str(book.attrs['Authors'])) !== null && _e !== void 0 ? _e : str(book.attrs['Author']);
        if (authors)
            entry.authors = authors;
        var publisher = str(book.attrs['Publisher']);
        if (publisher)
            entry.publisher = publisher;
        if (Number.isFinite(year))
            entry.year = year;
        var edition = str(book.attrs['Edition']);
        if (edition)
            entry.edition = edition;
        var freeUrl = linkTarget(str(book.attrs['Available from']));
        if (freeUrl)
            entry.freeUrl = freeUrl;
        if (book.coverImage)
            entry.coverImage = book.coverImage;
        out.push(entry);
    }
    return out.sort(function (a, b) {
        return compareExamLabels(a.readings[0].exam, b.readings[0].exam) || a.title.localeCompare(b.title);
    });
}
