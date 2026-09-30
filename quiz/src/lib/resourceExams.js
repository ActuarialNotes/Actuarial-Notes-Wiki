// Which exam(s) a resource is a syllabus reading for.
//
// A `Resources/Books` page carries no `exam:` field — the relationship is
// authored the other way round, in each exam study guide's `Source Material`
// callout (see `lib/sourceMaterial.ts`). This module inverts those callouts
// into a resource-page-name → exam-labels map, which the wiki index hangs on
// its `document` items so a resource card can be tagged with the exam it
// belongs to without the shelf re-reading every exam page.
//
// Imports here are relative rather than `@/`-aliased: `vite.config.ts` pulls
// this module into its own Node graph to build the map at bundle time, and the
// alias only exists inside the app's build.
import { extractSourceMaterial } from './sourceMaterial';
import { examDisplayName } from './wikiRoutes';
// Preliminary exams, then the CAS upper exams in sitting order. A label that
// isn't listed (a new exam page) sorts after these, alphabetically, rather than
// being dropped.
var EXAM_ORDER = [
    'Exam P-1',
    'Exam FM-2',
    'Exam MAS-I',
    'Exam MAS-II',
    'Exam DISC-DA',
    'Exam DISC-RM',
    'Exam DISC-IA',
    'Exam 5',
    'Exam PCPA',
    'Exam 6C',
    'Exam 6U',
    'Exam 7',
    'Exam 8',
    'Exam 9',
];
/** The label a pill shows — the same name the exam grid and `TRACKS` use. */
export function examPillLabel(pageName) {
    return examDisplayName(pageName);
}
export function compareExamLabels(a, b) {
    var ra = EXAM_ORDER.indexOf(a);
    var rb = EXAM_ORDER.indexOf(b);
    if (ra !== rb)
        return (ra === -1 ? EXAM_ORDER.length : ra) - (rb === -1 ? EXAM_ORDER.length : rb);
    return a.localeCompare(b);
}
/**
 * Build the resource → exams map from the exam study guides. Pages with no
 * `Source Material` callout contribute nothing; a resource listed by two exams
 * gets both labels.
 */
export function buildResourceExamMap(pages) {
    var _a;
    var map = {};
    for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
        var page = pages_1[_i];
        var label = examPillLabel(page.name);
        if (!label)
            continue;
        for (var _b = 0, _c = extractSourceMaterial(page.markdown).entries; _b < _c.length; _b++) {
            var entry = _c[_b];
            var key = entry.name.trim().toLowerCase();
            if (!key)
                continue;
            var labels = (_a = map[key]) !== null && _a !== void 0 ? _a : (map[key] = []);
            if (!labels.includes(label))
                labels.push(label);
        }
    }
    for (var _d = 0, _e = Object.values(map); _d < _e.length; _d++) {
        var labels = _e[_d];
        labels.sort(compareExamLabels);
    }
    return map;
}
/** The exams a resource page belongs to, or `[]` when it isn't a syllabus reading. */
export function examsForResource(map, pageName) {
    var _a;
    if (!map)
        return [];
    return (_a = map[pageName.trim().toLowerCase()]) !== null && _a !== void 0 ? _a : [];
}
