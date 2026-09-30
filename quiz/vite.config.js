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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { PDFJS_ASSET_DIRS } from './src/lib/pdfjsAssets';
import path from 'path';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import fm from 'front-matter';
import { KEYSTONE_EXAMS } from './src/data/keystoneConcepts';
import { buildResourceExamMap, examsForResource } from './src/lib/resourceExams';
import { examDisplayName, examIdFromFile } from './src/lib/wikiRoutes';
import { resourcePdfUrl } from './src/lib/examPdf';
import { KNOWLEDGE_BASE_ASSET, buildKnowledgeBase, buildLlmsTxt, readKnowledgeBaseSources, } from './src/lib/knowledgeBase';
import { PUBLIC_SITE_URL, SKILL_ASSET, connectorUrl, skillUrl } from './src/lib/aiConnector';
import { buildZip } from './src/lib/xlsx';
import { buildSeoPages, countQuestionsByExam, pageHead, sitemapXml, SITEMAP_APP_PATHS } from './src/lib/seo';
import { renderStaticPage, staticBody } from './src/lib/seoPrerender';
var REPO_ROOT = path.resolve(__dirname, '..');
var _buildEnv = loadEnv('', __dirname, 'VITE_');
var GITHUB_REPO = _buildEnv.VITE_GITHUB_REPO || 'ActuarialNotes/Actuarial-Notes-Wiki';
var GITHUB_BRANCH = _buildEnv.VITE_GITHUB_BRANCH || 'main';
var IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i;
function extractCoverImageUrl(content) {
    var m = /!\[\[([^\]]+)\]\]/.exec(content);
    if (!m)
        return undefined;
    var imagePath = m[1].trim();
    if (!IMAGE_EXT_RE.test(imagePath))
        return undefined;
    var resolved = imagePath.includes('/') ? imagePath : "Media/Attachments/".concat(imagePath);
    var encoded = resolved.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/');
    return "https://raw.githubusercontent.com/".concat(GITHUB_REPO, "/").concat(GITHUB_BRANCH, "/").concat(encoded);
}
function collectWikiContent() {
    return __awaiter(this, void 0, void 0, function () {
        var files, index, examPages, rootEntries, _i, rootEntries_1, name_1, text, bare, examMap, conceptEntries, _a, conceptEntries_1, name_2, text, bookEntries, _b, bookEntries_1, name_3, text, attrs, yearNum, bare, exams, guideEntries, _c, guideEntries_1, entry, dir, _d, _e, name_4, text_1, text;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    files = {};
                    index = [];
                    examPages = [];
                    return [4 /*yield*/, readdir(REPO_ROOT).catch(function () { return []; })];
                case 1:
                    rootEntries = _g.sent();
                    _i = 0, rootEntries_1 = rootEntries;
                    _g.label = 2;
                case 2:
                    if (!(_i < rootEntries_1.length)) return [3 /*break*/, 5];
                    name_1 = rootEntries_1[_i];
                    if (!name_1.endsWith('.md') || !/^Exam\b/i.test(name_1))
                        return [3 /*break*/, 4];
                    return [4 /*yield*/, readFile(path.join(REPO_ROOT, name_1), 'utf-8').catch(function () { return null; })];
                case 3:
                    text = _g.sent();
                    if (text == null)
                        return [3 /*break*/, 4];
                    files[name_1] = text;
                    bare = name_1.replace(/\.md$/i, '');
                    // `name` stays the file name (it is the route key); `title` is what a
                    // surface shows, with the examining-body suffix stripped.
                    index.push({ category: 'exam', name: bare, path: name_1, title: examDisplayName(bare) });
                    examPages.push({ name: bare, markdown: text });
                    _g.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    examMap = buildResourceExamMap(examPages);
                    return [4 /*yield*/, readdir(path.join(REPO_ROOT, 'Concepts')).catch(function () { return []; })];
                case 6:
                    conceptEntries = _g.sent();
                    _a = 0, conceptEntries_1 = conceptEntries;
                    _g.label = 7;
                case 7:
                    if (!(_a < conceptEntries_1.length)) return [3 /*break*/, 10];
                    name_2 = conceptEntries_1[_a];
                    if (!name_2.endsWith('.md'))
                        return [3 /*break*/, 9];
                    return [4 /*yield*/, readFile(path.join(REPO_ROOT, 'Concepts', name_2), 'utf-8').catch(function () { return null; })];
                case 8:
                    text = _g.sent();
                    if (text == null)
                        return [3 /*break*/, 9];
                    files["Concepts/".concat(name_2)] = text;
                    index.push({ category: 'concept', name: name_2.replace(/\.md$/i, ''), path: "Concepts/".concat(name_2) });
                    _g.label = 9;
                case 9:
                    _a++;
                    return [3 /*break*/, 7];
                case 10: return [4 /*yield*/, readdir(path.join(REPO_ROOT, 'Resources/Books')).catch(function () { return []; })];
                case 11:
                    bookEntries = _g.sent();
                    _b = 0, bookEntries_1 = bookEntries;
                    _g.label = 12;
                case 12:
                    if (!(_b < bookEntries_1.length)) return [3 /*break*/, 15];
                    name_3 = bookEntries_1[_b];
                    if (!name_3.endsWith('.md'))
                        return [3 /*break*/, 14];
                    return [4 /*yield*/, readFile(path.join(REPO_ROOT, 'Resources/Books', name_3), 'utf-8').catch(function () { return null; })];
                case 13:
                    text = _g.sent();
                    if (text == null)
                        return [3 /*break*/, 14];
                    files["Resources/Books/".concat(name_3)] = text;
                    attrs = ((_f = fm(text).attributes) !== null && _f !== void 0 ? _f : {});
                    yearNum = attrs['Year'] ? parseInt(String(attrs['Year']), 10) : undefined;
                    bare = name_3.replace(/\.md$/i, '');
                    exams = examsForResource(examMap, bare);
                    index.push({
                        category: 'document',
                        name: bare,
                        path: "Resources/Books/".concat(name_3),
                        exams: exams.length > 0 ? exams : undefined,
                        author: (attrs['Authors'] || attrs['Author']) ? String(attrs['Authors'] || attrs['Author']) : undefined,
                        year: Number.isFinite(yearNum) ? yearNum : undefined,
                        title: attrs['Title'] ? String(attrs['Title']) : undefined,
                        edition: attrs['Edition'] ? String(attrs['Edition']) : undefined,
                        publisher: attrs['Publisher'] ? String(attrs['Publisher']) : undefined,
                        coverImage: extractCoverImageUrl(text),
                        pdf: resourcePdfUrl(attrs['Available from']) ? true : undefined,
                    });
                    _g.label = 14;
                case 14:
                    _b++;
                    return [3 /*break*/, 12];
                case 15: return [4 /*yield*/, readdir(path.join(REPO_ROOT, 'Guides'), { withFileTypes: true }).catch(function () { return []; })];
                case 16:
                    guideEntries = _g.sent();
                    _c = 0, guideEntries_1 = guideEntries;
                    _g.label = 17;
                case 17:
                    if (!(_c < guideEntries_1.length)) return [3 /*break*/, 26];
                    entry = guideEntries_1[_c];
                    if (!entry.isDirectory()) return [3 /*break*/, 23];
                    dir = path.join(REPO_ROOT, 'Guides', entry.name);
                    _d = 0;
                    return [4 /*yield*/, readdir(dir).catch(function () { return []; })];
                case 18:
                    _e = _g.sent();
                    _g.label = 19;
                case 19:
                    if (!(_d < _e.length)) return [3 /*break*/, 22];
                    name_4 = _e[_d];
                    if (!name_4.endsWith('.md'))
                        return [3 /*break*/, 21];
                    return [4 /*yield*/, readFile(path.join(dir, name_4), 'utf-8').catch(function () { return null; })];
                case 20:
                    text_1 = _g.sent();
                    if (text_1 != null)
                        files["Guides/".concat(entry.name, "/").concat(name_4)] = text_1;
                    _g.label = 21;
                case 21:
                    _d++;
                    return [3 /*break*/, 19];
                case 22: return [3 /*break*/, 25];
                case 23:
                    if (!entry.name.endsWith('.md'))
                        return [3 /*break*/, 25];
                    return [4 /*yield*/, readFile(path.join(REPO_ROOT, 'Guides', entry.name), 'utf-8').catch(function () { return null; })];
                case 24:
                    text = _g.sent();
                    if (text != null)
                        files["Guides/".concat(entry.name)] = text;
                    _g.label = 25;
                case 25:
                    _c++;
                    return [3 /*break*/, 17];
                case 26: return [2 /*return*/, { files: files, index: index }];
            }
        });
    });
}
// ── Exam pages ───────────────────────────────────────────────────────────────
// Just the root `Exam *.md` syllabus pages, as their own tiny module.
//
// `virtual:wiki-content` already carries these, but it also carries every
// concept and resource page — megabytes that only the wiki routes need, and
// which is why that module is imported from `WikiLayout` (its own lazy chunk).
// The syllabi, by contrast, are needed by the Dashboard, the Sidebar, the quiz
// builder and Flashcards, none of which mount `WikiLayout`. Those surfaces used
// to reach GitHub's Contents API at runtime for them, which meant an API
// outage, an offline user or an unauthenticated rate-limit (60 requests/hour
// per IP) left the app with *no* exams at all — a new account could add an exam
// and never see it appear. Bundling the ~80 KB of markdown removes that
// dependency entirely. See `useWikiSyllabus`.
function collectExamPages() {
    return __awaiter(this, void 0, void 0, function () {
        var files, rootEntries, _i, rootEntries_2, name_5, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = {};
                    return [4 /*yield*/, readdir(REPO_ROOT).catch(function () { return []; })];
                case 1:
                    rootEntries = _a.sent();
                    _i = 0, rootEntries_2 = rootEntries;
                    _a.label = 2;
                case 2:
                    if (!(_i < rootEntries_2.length)) return [3 /*break*/, 5];
                    name_5 = rootEntries_2[_i];
                    if (!name_5.endsWith('.md') || !/^Exam\b/i.test(name_5))
                        return [3 /*break*/, 4];
                    return [4 /*yield*/, readFile(path.join(REPO_ROOT, name_5), 'utf-8').catch(function () { return null; })];
                case 3:
                    text = _a.sent();
                    if (text != null)
                        files[name_5] = text;
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, files];
            }
        });
    });
}
function examPagesPlugin() {
    var _this = this;
    var VIRTUAL_ID = 'virtual:exam-pages';
    var RESOLVED_ID = '\0' + VIRTUAL_ID;
    return {
        name: 'exam-pages',
        resolveId: function (id) { return id === VIRTUAL_ID ? RESOLVED_ID : undefined; },
        load: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (id !== RESOLVED_ID)
                            return [2 /*return*/];
                        _a = "export default ".concat;
                        _c = (_b = JSON).stringify;
                        return [4 /*yield*/, collectExamPages()];
                    case 1: return [2 /*return*/, _a.apply("export default ", [_c.apply(_b, [_d.sent()])])];
                }
            });
        }); },
    };
}
function wikiContentPlugin() {
    var _this = this;
    var VIRTUAL_ID = 'virtual:wiki-content';
    var RESOLVED_ID = '\0' + VIRTUAL_ID;
    return {
        name: 'wiki-content',
        resolveId: function (id) { return id === VIRTUAL_ID ? RESOLVED_ID : undefined; },
        load: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (id !== RESOLVED_ID)
                            return [2 /*return*/];
                        return [4 /*yield*/, collectWikiContent()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, "export default ".concat(JSON.stringify(data))];
                }
            });
        }); },
    };
}
var TIMELINE_SOURCES = [
    { dir: 'Resources/Books', kind: 'book' },
    { dir: 'Resources/Events', kind: 'event' },
    { dir: 'Resources/Regulation', kind: 'regulation' },
    { dir: 'Resources/Benchmarks', kind: 'benchmark' },
];
// front-matter delegates to js-yaml, which parses an unquoted `date: 1965-03-18`
// into a JS Date (UTC midnight). Normalise both Dates and strings to a plain key.
function toDateString(v) {
    if (v == null)
        return undefined;
    if (v instanceof Date && !isNaN(v.getTime()))
        return v.toISOString().slice(0, 10);
    var s = String(v).trim();
    return s || undefined;
}
function yearFromFilename(name) {
    var m = /\((\d{4})\)/.exec(name);
    return m ? m[1] : undefined;
}
var MD_LINK_RE = /\[([^\]]+)\]\([^)]+\)/g;
var MD_BOLD_RE = /\*\*([^*]+)\*\*/g;
var MD_ITALIC_RE = /(?<!\*)\*([^*]+)\*(?!\*)/g;
// First descriptive paragraph of the body, stripped of headings and markdown.
function extractSummary(raw) {
    var body = raw.replace(/^---[\s\S]*?\n---[ \t]*\r?\n?/, '');
    var cur = '';
    var first = '';
    for (var _i = 0, _a = body.split('\n'); _i < _a.length; _i++) {
        var lineRaw = _a[_i];
        var line = lineRaw.trim();
        if (/^#{1,6}\s/.test(line) || line === '') {
            if (cur.trim()) {
                first = cur.trim();
                break;
            }
            continue;
        }
        cur += (cur ? ' ' : '') + line;
    }
    if (!first && cur.trim())
        first = cur.trim();
    if (!first)
        return undefined;
    var s = first
        .replace(MD_LINK_RE, '$1')
        .replace(MD_BOLD_RE, '$1')
        .replace(MD_ITALIC_RE, '$1')
        .trim();
    if (s.length > 260)
        s = s.slice(0, 257).trimEnd() + '…';
    return s;
}
function collectResourceTimeline() {
    return __awaiter(this, void 0, void 0, function () {
        var entries, _i, TIMELINE_SOURCES_1, _a, dir, kind, names, _b, names_1, name_6, text, attrs, bare, date, yearNum, isBook, declaredType, resolvedKind;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    entries = [];
                    _i = 0, TIMELINE_SOURCES_1 = TIMELINE_SOURCES;
                    _g.label = 1;
                case 1:
                    if (!(_i < TIMELINE_SOURCES_1.length)) return [3 /*break*/, 7];
                    _a = TIMELINE_SOURCES_1[_i], dir = _a.dir, kind = _a.kind;
                    return [4 /*yield*/, readdir(path.join(REPO_ROOT, dir)).catch(function () { return []; })];
                case 2:
                    names = _g.sent();
                    _b = 0, names_1 = names;
                    _g.label = 3;
                case 3:
                    if (!(_b < names_1.length)) return [3 /*break*/, 6];
                    name_6 = names_1[_b];
                    if (!name_6.endsWith('.md'))
                        return [3 /*break*/, 5];
                    return [4 /*yield*/, readFile(path.join(REPO_ROOT, dir, name_6), 'utf-8').catch(function () { return null; })];
                case 4:
                    text = _g.sent();
                    if (text == null)
                        return [3 /*break*/, 5];
                    attrs = ((_c = fm(text).attributes) !== null && _c !== void 0 ? _c : {});
                    bare = name_6.replace(/\.md$/i, '');
                    date = (_e = (_d = toDateString(attrs['date'])) !== null && _d !== void 0 ? _d : toDateString(attrs['Year'])) !== null && _e !== void 0 ? _e : yearFromFilename(bare);
                    if (!date)
                        return [3 /*break*/, 5]; // no resolvable date → omit from the timeline (still in the grid)
                    yearNum = parseInt(date.slice(0, 4), 10);
                    isBook = kind === 'book';
                    declaredType = String((_f = attrs['type']) !== null && _f !== void 0 ? _f : '').toLowerCase();
                    resolvedKind = declaredType === 'event' ? 'event'
                        : declaredType === 'regulation' ? 'regulation'
                            : kind;
                    entries.push({
                        id: attrs['id'] ? String(attrs['id']) : bare,
                        kind: resolvedKind,
                        date: date,
                        title: String(attrs['title'] || attrs['Title'] || bare),
                        name: bare,
                        path: "".concat(dir, "/").concat(name_6),
                        summary: isBook ? undefined : extractSummary(text),
                        jurisdiction: attrs['jurisdiction'] ? String(attrs['jurisdiction']) : undefined,
                        lob: Array.isArray(attrs['lob']) ? attrs['lob'].map(String) : undefined,
                        impactLevel: attrs['impact_level'] ? String(attrs['impact_level']) : undefined,
                        status: attrs['status'] ? String(attrs['status']) : undefined,
                        issuingBody: attrs['issuing_body'] ? String(attrs['issuing_body']) : undefined,
                        author: (attrs['Authors'] || attrs['Author']) ? String(attrs['Authors'] || attrs['Author']) : undefined,
                        publisher: attrs['Publisher'] ? String(attrs['Publisher']) : undefined,
                        edition: attrs['Edition'] ? String(attrs['Edition']) : undefined,
                        year: Number.isFinite(yearNum) ? yearNum : undefined,
                        coverImage: isBook ? extractCoverImageUrl(text) : undefined,
                    });
                    _g.label = 5;
                case 5:
                    _b++;
                    return [3 /*break*/, 3];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7:
                    entries.sort(function (a, b) { return (a.date < b.date ? -1 : a.date > b.date ? 1 : 0); });
                    return [2 /*return*/, entries];
            }
        });
    });
}
function resourceTimelinePlugin() {
    var _this = this;
    var VIRTUAL_ID = 'virtual:resource-timeline';
    var RESOLVED_ID = '\0' + VIRTUAL_ID;
    return {
        name: 'resource-timeline',
        resolveId: function (id) { return id === VIRTUAL_ID ? RESOLVED_ID : undefined; },
        load: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (id !== RESOLVED_ID)
                            return [2 /*return*/];
                        return [4 /*yield*/, collectResourceTimeline()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, "export default ".concat(JSON.stringify(data))];
                }
            });
        }); },
    };
}
function collectQuestions() {
    return __awaiter(this, void 0, void 0, function () {
        var rawFiles, questionsDir, examDirs, _i, examDirs_1, examDir, examPath, files, _a, files_1, name_7, text;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rawFiles = [];
                    questionsDir = path.join(REPO_ROOT, 'questions');
                    return [4 /*yield*/, readdir(questionsDir).catch(function () { return []; })];
                case 1:
                    examDirs = _b.sent();
                    _i = 0, examDirs_1 = examDirs;
                    _b.label = 2;
                case 2:
                    if (!(_i < examDirs_1.length)) return [3 /*break*/, 8];
                    examDir = examDirs_1[_i];
                    examPath = path.join(questionsDir, examDir);
                    return [4 /*yield*/, readdir(examPath).catch(function () { return []; })];
                case 3:
                    files = _b.sent();
                    _a = 0, files_1 = files;
                    _b.label = 4;
                case 4:
                    if (!(_a < files_1.length)) return [3 /*break*/, 7];
                    name_7 = files_1[_a];
                    if (!name_7.endsWith('.md'))
                        return [3 /*break*/, 6];
                    return [4 /*yield*/, readFile(path.join(examPath, name_7), 'utf-8').catch(function () { return null; })];
                case 5:
                    text = _b.sent();
                    if (text != null)
                        rawFiles.push(text);
                    _b.label = 6;
                case 6:
                    _a++;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/, rawFiles];
            }
        });
    });
}
function questionsContentPlugin() {
    var _this = this;
    var VIRTUAL_ID = 'virtual:questions-content';
    var RESOLVED_ID = '\0' + VIRTUAL_ID;
    return {
        name: 'questions-content',
        resolveId: function (id) { return id === VIRTUAL_ID ? RESOLVED_ID : undefined; },
        load: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var questions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (id !== RESOLVED_ID)
                            return [2 /*return*/];
                        return [4 /*yield*/, collectQuestions()];
                    case 1:
                        questions = _a.sent();
                        return [2 /*return*/, "export default ".concat(JSON.stringify(questions))];
                }
            });
        }); },
    };
}
// Comprehension checks: one markdown file per concept under
// comprehension-checks/<exam-id>/<Concept Name>.md, parsed at runtime by
// lib/comprehensionCheckParser.ts. Structured just like the question bank above.
// No surface renders them since flashcard collection stopped gating on them
// (see data/comprehensionChecks.ts).
function collectComprehensionChecks() {
    return __awaiter(this, void 0, void 0, function () {
        var rawFiles, root, examDirs, _i, examDirs_2, examDir, examPath, files, _a, files_2, name_8, text;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rawFiles = [];
                    root = path.join(REPO_ROOT, 'comprehension-checks');
                    return [4 /*yield*/, readdir(root).catch(function () { return []; })];
                case 1:
                    examDirs = _b.sent();
                    _i = 0, examDirs_2 = examDirs;
                    _b.label = 2;
                case 2:
                    if (!(_i < examDirs_2.length)) return [3 /*break*/, 8];
                    examDir = examDirs_2[_i];
                    examPath = path.join(root, examDir);
                    return [4 /*yield*/, readdir(examPath).catch(function () { return []; })];
                case 3:
                    files = _b.sent();
                    _a = 0, files_2 = files;
                    _b.label = 4;
                case 4:
                    if (!(_a < files_2.length)) return [3 /*break*/, 7];
                    name_8 = files_2[_a];
                    if (!name_8.endsWith('.md'))
                        return [3 /*break*/, 6];
                    return [4 /*yield*/, readFile(path.join(examPath, name_8), 'utf-8').catch(function () { return null; })];
                case 5:
                    text = _b.sent();
                    if (text != null)
                        rawFiles.push(text);
                    _b.label = 6;
                case 6:
                    _a++;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/, rawFiles];
            }
        });
    });
}
function comprehensionChecksPlugin() {
    var _this = this;
    var VIRTUAL_ID = 'virtual:comprehension-checks';
    var RESOLVED_ID = '\0' + VIRTUAL_ID;
    return {
        name: 'comprehension-checks',
        resolveId: function (id) { return id === VIRTUAL_ID ? RESOLVED_ID : undefined; },
        load: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var checks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (id !== RESOLVED_ID)
                            return [2 /*return*/];
                        return [4 /*yield*/, collectComprehensionChecks()];
                    case 1:
                        checks = _a.sent();
                        return [2 /*return*/, "export default ".concat(JSON.stringify(checks))];
                }
            });
        }); },
    };
}
function collectExamGuides() {
    return __awaiter(this, void 0, void 0, function () {
        var root, entries, _i, _a, examDir, dir, _b, _c, name_9, text, attrs, order;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    root = path.join(REPO_ROOT, 'Guides');
                    entries = [];
                    _i = 0;
                    return [4 /*yield*/, readdir(root).catch(function () { return []; })];
                case 1:
                    _a = _e.sent();
                    _e.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    examDir = _a[_i];
                    dir = path.join(root, examDir);
                    _b = 0;
                    return [4 /*yield*/, readdir(dir).catch(function () { return []; })];
                case 3:
                    _c = (_e.sent()).sort();
                    _e.label = 4;
                case 4:
                    if (!(_b < _c.length)) return [3 /*break*/, 7];
                    name_9 = _c[_b];
                    if (!name_9.endsWith('.md'))
                        return [3 /*break*/, 6];
                    return [4 /*yield*/, readFile(path.join(dir, name_9), 'utf-8').catch(function () { return null; })];
                case 5:
                    text = _e.sent();
                    if (text == null)
                        return [3 /*break*/, 6];
                    attrs = ((_d = fm(text).attributes) !== null && _d !== void 0 ? _d : {});
                    order = Number(attrs['order']);
                    entries.push({
                        examId: examIdFromFile(examDir),
                        examPage: "".concat(examDir, ".md"),
                        examLabel: examDisplayName(examDir),
                        title: name_9.replace(/\.md$/i, ''),
                        path: "Guides/".concat(examDir, "/").concat(name_9),
                        order: Number.isFinite(order) ? order : null,
                    });
                    _e.label = 6;
                case 6:
                    _b++;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/, entries];
            }
        });
    });
}
function examGuidesPlugin() {
    var _this = this;
    var VIRTUAL_ID = 'virtual:exam-guides';
    var RESOLVED_ID = '\0' + VIRTUAL_ID;
    return {
        name: 'exam-guides',
        resolveId: function (id) { return id === VIRTUAL_ID ? RESOLVED_ID : undefined; },
        load: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var guides;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (id !== RESOLVED_ID)
                            return [2 /*return*/];
                        return [4 /*yield*/, collectExamGuides()];
                    case 1:
                        guides = _a.sent();
                        return [2 /*return*/, "export default ".concat(JSON.stringify(guides))];
                }
            });
        }); },
    };
}
// Keystone link map: for every keystone concept page, the other concept pages it
// links to directly. This is what the `strong_key` study plan orders by — a
// keystone, then the concepts its own page leans on (see lib/studyPlanOrder.ts).
//
// Only keystone pages are collected. The whole concept graph would be ~45 kB of
// JSON in the main chunk to answer a question the plan only ever asks about the
// ~15 concepts per exam in the catalogue.
function collectKeystoneLinks() {
    return __awaiter(this, void 0, void 0, function () {
        var dir, entries, pages, _i, entries_1, name_10, links, _a, KEYSTONE_EXAMS_1, exam, _b, _c, name_11, page, text, out, seen, _d, _e, match, target, key, linked;
        var _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    dir = path.join(REPO_ROOT, 'Concepts');
                    return [4 /*yield*/, readdir(dir).catch(function () { return []; })
                        // Every real concept page, keyed lowercase — a link only counts when it lands
                        // on one of these (so figure embeds, resources and exam pages drop out).
                    ];
                case 1:
                    entries = _h.sent();
                    pages = new Map();
                    for (_i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                        name_10 = entries_1[_i];
                        if (name_10.endsWith('.md'))
                            pages.set(name_10.slice(0, -3).toLowerCase(), name_10.slice(0, -3));
                    }
                    links = {};
                    _a = 0, KEYSTONE_EXAMS_1 = KEYSTONE_EXAMS;
                    _h.label = 2;
                case 2:
                    if (!(_a < KEYSTONE_EXAMS_1.length)) return [3 /*break*/, 7];
                    exam = KEYSTONE_EXAMS_1[_a];
                    _b = 0, _c = exam.concepts;
                    _h.label = 3;
                case 3:
                    if (!(_b < _c.length)) return [3 /*break*/, 6];
                    name_11 = _c[_b].name;
                    page = pages.get(name_11.toLowerCase());
                    if (!page)
                        return [3 /*break*/, 5]; // keystone.test.ts pins this, but never emit a dead key
                    return [4 /*yield*/, readFile(path.join(dir, "".concat(page, ".md")), 'utf-8').catch(function () { return null; })];
                case 4:
                    text = _h.sent();
                    if (text == null)
                        return [3 /*break*/, 5];
                    out = [];
                    seen = new Set([page.toLowerCase()]) // never link a page to itself
                    ;
                    for (_d = 0, _e = text.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g); _d < _e.length; _d++) {
                        match = _e[_d];
                        target = (_g = (_f = match[1].trim().split('/').pop()) === null || _f === void 0 ? void 0 : _f.replace(/\.md$/i, '').trim()) !== null && _g !== void 0 ? _g : '';
                        key = target.toLowerCase();
                        if (!key || seen.has(key))
                            continue;
                        linked = pages.get(key);
                        if (!linked)
                            continue;
                        seen.add(key);
                        out.push(linked);
                    }
                    links[page] = out;
                    _h.label = 5;
                case 5:
                    _b++;
                    return [3 /*break*/, 3];
                case 6:
                    _a++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/, links];
            }
        });
    });
}
function keystoneLinksPlugin() {
    var _this = this;
    var VIRTUAL_ID = 'virtual:keystone-links';
    var RESOLVED_ID = '\0' + VIRTUAL_ID;
    return {
        name: 'keystone-links',
        resolveId: function (id) { return id === VIRTUAL_ID ? RESOLVED_ID : undefined; },
        load: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var links;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (id !== RESOLVED_ID)
                            return [2 /*return*/];
                        return [4 /*yield*/, collectKeystoneLinks()];
                    case 1:
                        links = _a.sent();
                        return [2 /*return*/, "export default ".concat(JSON.stringify(links))];
                }
            });
        }); },
    };
}
// ── AI connector assets ──────────────────────────────────────────────────────
// What Claude and ChatGPT read the vault through (docs/ai-connector.md):
//
//   ai/knowledge-base.json       every page and question, processed by
//                                lib/knowledgeBase.ts — the MCP endpoint
//                                (api/mcp.js) loads it from its own deployment
//   ai/actuarial-notes-skill.zip the Agent Skill in quiz/skills/actuarial-notes/,
//                                zipped the way Claude and ChatGPT upload it
//   llms.txt                     a short index for an assistant that is only
//                                browsing the site
//
// Emitted into the build rather than bundled: the app itself never imports any
// of it, and the export is ~10 MB.
var vaultReader = {
    list: function (dir) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readdir(path.join(REPO_ROOT, dir), { withFileTypes: true }).catch(function () { return []; })];
                case 1: return [2 /*return*/, (_a.sent())
                        .map(function (entry) { return ({ name: entry.name, isDirectory: entry.isDirectory() }); })];
            }
        });
    }); },
    read: function (file) { return readFile(path.join(REPO_ROOT, file), 'utf-8').catch(function () { return null; }); },
};
function collectKnowledgeBase() {
    return __awaiter(this, void 0, void 0, function () {
        var sources;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readKnowledgeBaseSources(vaultReader)];
                case 1:
                    sources = _a.sent();
                    return [2 /*return*/, buildKnowledgeBase(__assign(__assign({}, sources), { keystones: KEYSTONE_EXAMS, site: {
                                url: _buildEnv.VITE_SITE_URL || PUBLIC_SITE_URL,
                                repo: GITHUB_REPO,
                                branch: GITHUB_BRANCH,
                                // Vercel exposes the commit being built; elsewhere the export is undated by commit.
                                commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
                                builtAt: new Date().toISOString(),
                            } }))];
            }
        });
    });
}
var SKILL_DIR = 'quiz/skills/actuarial-notes';
/** The skill folder as a zip whose root is the folder itself — the layout the upload dialogs expect. */
function buildSkillZip() {
    return __awaiter(this, void 0, void 0, function () {
        var files, walk;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = [];
                    walk = function (dir, prefix) { return __awaiter(_this, void 0, void 0, function () {
                        var _i, _a, entry, data;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _i = 0;
                                    return [4 /*yield*/, vaultReader.list(dir)];
                                case 1:
                                    _a = (_b.sent()).sort(function (a, b) { return a.name.localeCompare(b.name); });
                                    _b.label = 2;
                                case 2:
                                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                                    entry = _a[_i];
                                    if (entry.name.startsWith('.'))
                                        return [3 /*break*/, 6];
                                    if (!entry.isDirectory) return [3 /*break*/, 4];
                                    return [4 /*yield*/, walk("".concat(dir, "/").concat(entry.name), "".concat(prefix).concat(entry.name, "/"))];
                                case 3:
                                    _b.sent();
                                    return [3 /*break*/, 6];
                                case 4: return [4 /*yield*/, readFile(path.join(REPO_ROOT, dir, entry.name)).catch(function () { return null; })];
                                case 5:
                                    data = _b.sent();
                                    if (data)
                                        files.push({ name: "".concat(prefix).concat(entry.name), data: new Uint8Array(data) });
                                    _b.label = 6;
                                case 6:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, walk(SKILL_DIR, "".concat(path.basename(SKILL_DIR), "/"))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, buildZip(files)];
            }
        });
    });
}
function aiConnectorAssetsPlugin() {
    var _a;
    var _this = this;
    var origin = _buildEnv.VITE_SITE_URL || PUBLIC_SITE_URL;
    var assets = (_a = {},
        _a[KNOWLEDGE_BASE_ASSET] = { type: 'application/json', build: function () { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).stringify;
                        return [4 /*yield*/, collectKnowledgeBase()];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            }); }); } },
        _a[SKILL_ASSET] = { type: 'application/zip', build: buildSkillZip },
        _a['llms.txt'] = {
            type: 'text/plain; charset=utf-8',
            build: function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = buildLlmsTxt;
                        return [4 /*yield*/, collectKnowledgeBase()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent(), connectorUrl(origin), skillUrl(origin)])];
                }
            }); }); },
        },
        _a);
    return {
        name: 'ai-connector-assets',
        // In dev each asset is rebuilt on request, so an edit to the vault shows up
        // on the next fetch — and `vercel dev` can run the connector against the
        // working tree. (scripts/mcp-local.mjs reads a production build instead.)
        configureServer: function (server) {
            var _this = this;
            var _loop_1 = function (file, asset) {
                server.middlewares.use("/".concat(file), function (_req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                    var body, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, asset.build()];
                            case 1:
                                body = _a.sent();
                                res.setHeader('Content-Type', asset.type);
                                res.end(body);
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                next(err_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            };
            for (var _i = 0, _a = Object.entries(assets); _i < _a.length; _i++) {
                var _b = _a[_i], file = _b[0], asset = _b[1];
                _loop_1(file, asset);
            }
        },
        generateBundle: function () {
            return __awaiter(this, void 0, void 0, function () {
                var kb, _a;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, collectKnowledgeBase()];
                        case 1:
                            kb = _c.sent();
                            this.emitFile({ type: 'asset', fileName: KNOWLEDGE_BASE_ASSET, source: JSON.stringify(kb) });
                            _a = this.emitFile;
                            _b = { type: 'asset', fileName: SKILL_ASSET };
                            return [4 /*yield*/, buildSkillZip()];
                        case 2:
                            _a.apply(this, [(_b.source = _c.sent(), _b)]);
                            this.emitFile({ type: 'asset', fileName: 'llms.txt', source: buildLlmsTxt(kb, connectorUrl(origin), skillUrl(origin)) });
                            return [2 /*return*/];
                    }
                });
            });
        },
    };
}
/**
 * Serves the asset directories pdf.js loads at runtime, from `/pdf-<dir>/`.
 *
 * The exam-PDF viewer draws pages itself (see `lib/pdfjsSetup.ts`), and pdf.js
 * keeps a surprising amount of itself outside its bundle, fetched on demand
 * from URLs the caller has to supply. Miss one and the failure is silent: the
 * part of the page that needed it simply isn't drawn, with a `warn()` in the
 * console and no error anywhere the reader can see.
 *
 *   standard_fonts  A PDF that names Helvetica/Times/Courier without embedding
 *                   it — routine for anything produced from Word — renders
 *                   blank text without these font programs.
 *   wasm            The image codecs. **CCITT fax and JBIG2 live here**, which
 *                   is to say every bitonal scan: the examining bodies' older
 *                   papers are photocopies, and their ink is a CCITT image.
 *                   JPEG 2000 (openjpeg) and colour management (qcms) too.
 *                   Without it `JBig2CCITTFaxImage.decode` throws "failed to
 *                   initialize", the image object resolves to null, and the
 *                   scan is never painted — a ghost page carrying only
 *                   whatever else the page happened to draw.
 *   cmaps           Character maps for CID-keyed fonts that name a predefined
 *                   encoding rather than embedding one.
 *   iccs           The fallback ICC profile.
 *
 * They ship inside pdfjs-dist rather than in `public/`, so they're copied into
 * the build here and read straight from node_modules in dev. Nothing is
 * fetched until a document actually needs it, so none of this is weight on a
 * reader who never opens a paper.
 */
function pdfjsAssetsPlugin() {
    // Directory in pdfjs-dist → the path it is served from. `lib/pdfjsAssets.ts`
    // is the shared list; `lib/pdfjsSetup.ts` builds the matching URLs from it.
    var DIRS = PDFJS_ASSET_DIRS;
    var CONTENT_TYPES = {
        '.wasm': 'application/wasm',
        '.js': 'text/javascript',
        '.mjs': 'text/javascript',
        '.bcmap': 'application/octet-stream',
        '.icc': 'application/vnd.iccprofile',
        '.pfb': 'application/x-font-type1',
        '.ttf': 'font/ttf',
    };
    var dirFor = function (name) { return path.resolve(__dirname, 'node_modules/pdfjs-dist', name); };
    // Flat directories of ordinary filenames — anything else isn't ours to serve.
    var safeName = function (name) { return /^[\w.-]+$/.test(name) && name !== '..'; };
    return {
        name: 'pdfjs-assets',
        configureServer: function (server) {
            var _this = this;
            var _loop_2 = function (dir, prefix) {
                server.middlewares.use("/".concat(prefix, "/"), function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                    var name, body, _a;
                    var _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                name = decodeURIComponent(((_b = req.url) !== null && _b !== void 0 ? _b : '').replace(/^\/+/, '').split('?')[0]);
                                if (!safeName(name))
                                    return [2 /*return*/, next()];
                                _d.label = 1;
                            case 1:
                                _d.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, readFile(path.join(dirFor(dir), name))];
                            case 2:
                                body = _d.sent();
                                res.setHeader('Content-Type', (_c = CONTENT_TYPES[path.extname(name).toLowerCase()]) !== null && _c !== void 0 ? _c : 'font/otf');
                                res.end(body);
                                return [3 /*break*/, 4];
                            case 3:
                                _a = _d.sent();
                                next();
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            };
            for (var _i = 0, _a = Object.entries(DIRS); _i < _a.length; _i++) {
                var _b = _a[_i], dir = _b[0], prefix = _b[1];
                _loop_2(dir, prefix);
            }
        },
        generateBundle: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, _b, dir, prefix, _c, _d, name_12, _e;
                var _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _i = 0, _a = Object.entries(DIRS);
                            _g.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            _b = _a[_i], dir = _b[0], prefix = _b[1];
                            _c = 0;
                            return [4 /*yield*/, readdir(dirFor(dir))];
                        case 2:
                            _d = _g.sent();
                            _g.label = 3;
                        case 3:
                            if (!(_c < _d.length)) return [3 /*break*/, 6];
                            name_12 = _d[_c];
                            if (!safeName(name_12))
                                return [3 /*break*/, 5];
                            _e = this.emitFile;
                            _f = {
                                type: 'asset',
                                fileName: "".concat(prefix, "/").concat(name_12)
                            };
                            return [4 /*yield*/, readFile(path.join(dirFor(dir), name_12))];
                        case 4:
                            _e.apply(this, [(_f.source = _g.sent(),
                                    _f)]);
                            _g.label = 5;
                        case 5:
                            _c++;
                            return [3 /*break*/, 3];
                        case 6:
                            _i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
    };
}
// ── SEO: every page described, a static file per page, and the sitemap ──────
// Each exam, concept and resource page is described once (`lib/seo.ts`: its
// title, its description, what it links up to) and the record is used three
// ways:
//   - `virtual:seo-pages` hands the records to the app, which writes a page's
//     head as it opens (`hooks/usePageHead.ts`);
//   - at the end of a build each page gets its own
//     `dist/wiki/<kind>/<slug>/index.html` — the app's shell with that page's
//     head and a crawlable copy of its article (`lib/seoPrerender.ts`). Vercel
//     serves a file before the SPA rewrite, so a crawler that fetches a page
//     gets its title, description and words without running the app;
//   - `dist/sitemap.xml` lists every page worth indexing — generated, so it
//     can't fall behind the vault the way a hand-kept one did.
// See docs/seo.md.
function seoPagesPlugin() {
    var _this = this;
    var VIRTUAL_ID = 'virtual:seo-pages';
    var RESOLVED_ID = '\0' + VIRTUAL_ID;
    var outDir = '';
    var isBuild = false;
    var logger;
    var site = null;
    var loadSite = function () { return (site !== null && site !== void 0 ? site : (site = (function () { return __awaiter(_this, void 0, void 0, function () {
        var files, pages, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, collectWikiContent()];
                case 1:
                    files = (_d.sent()).files;
                    _a = buildSeoPages;
                    _b = [files];
                    _c = countQuestionsByExam;
                    return [4 /*yield*/, collectQuestions()];
                case 2:
                    pages = _a.apply(void 0, _b.concat([_c.apply(void 0, [_d.sent()])]));
                    return [2 /*return*/, { files: files, pages: pages }];
            }
        });
    }); })())); };
    return {
        name: 'seo-pages',
        configResolved: function (config) {
            outDir = path.resolve(config.root, config.build.outDir);
            isBuild = config.command === 'build' && !process.env.VITEST;
            logger = config.logger;
        },
        resolveId: function (id) { return id === VIRTUAL_ID ? RESOLVED_ID : undefined; },
        load: function (id) { return __awaiter(_this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (id !== RESOLVED_ID)
                            return [2 /*return*/];
                        return [4 /*yield*/, loadSite()
                            // Which vault file a page came from is the build's business, not the app's.
                        ];
                    case 1:
                        pages = (_a.sent()).pages;
                        // Which vault file a page came from is the build's business, not the app's.
                        return [2 /*return*/, "export default ".concat(JSON.stringify(pages.map(function (page) { return (__assign(__assign({}, page), { source: undefined })); })))];
                }
            });
        }); },
        closeBundle: function () {
            return __awaiter(this, void 0, void 0, function () {
                var template, _a, files, pages, indexable, canonical, resolve, crumb, hubSections, _i, pages_1, page, body, file, listed;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!isBuild)
                                return [2 /*return*/];
                            return [4 /*yield*/, readFile(path.join(outDir, 'index.html'), 'utf-8')];
                        case 1:
                            template = _b.sent();
                            return [4 /*yield*/, loadSite()];
                        case 2:
                            _a = _b.sent(), files = _a.files, pages = _a.pages;
                            indexable = pages.filter(function (p) { return !p.noindex; });
                            canonical = new Map(indexable.map(function (p) { return [p.path.toLowerCase(), p.path]; }));
                            resolve = function (route) { return canonical.get(route.toLowerCase()); };
                            crumb = function (p) { return ({ name: p.name, path: p.path }); };
                            hubSections = [
                                { heading: 'Exams', links: pages.filter(function (p) { return p.kind === 'exam'; }).map(crumb) },
                                { heading: 'Syllabus readings', links: indexable.filter(function (p) { return p.kind === 'resource'; }).map(crumb) },
                            ];
                            _i = 0, pages_1 = pages;
                            _b.label = 3;
                        case 3:
                            if (!(_i < pages_1.length)) return [3 /*break*/, 7];
                            page = pages_1[_i];
                            body = staticBody({
                                page: page,
                                markdown: page.source ? files[page.source] : undefined,
                                resolve: resolve,
                                sections: page.kind === 'hub' ? hubSections : [],
                            });
                            file = path.join.apply(path, __spreadArray(__spreadArray([outDir], decodeURIComponent(page.path).split('/'), false), ['index.html'], false));
                            if (!file.startsWith(outDir + path.sep))
                                throw new Error("SEO page would be written outside dist: ".concat(page.path));
                            return [4 /*yield*/, mkdir(path.dirname(file), { recursive: true })];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, writeFile(file, renderStaticPage(template, pageHead(page), body))];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 3];
                        case 7:
                            listed = __spreadArray(__spreadArray([], SITEMAP_APP_PATHS, true), indexable.map(function (p) { return p.path; }), true);
                            return [4 /*yield*/, writeFile(path.join(outDir, 'sitemap.xml'), sitemapXml(listed))];
                        case 8:
                            _b.sent();
                            logger === null || logger === void 0 ? void 0 : logger.info("seo: ".concat(pages.length, " static pages (").concat(pages.length - indexable.length, " noindex stubs), ").concat(listed.length, " URLs in sitemap.xml"));
                            return [2 /*return*/];
                    }
                });
            });
        },
    };
}
export default defineConfig({
    plugins: [react(), examPagesPlugin(), wikiContentPlugin(), resourceTimelinePlugin(), questionsContentPlugin(), comprehensionChecksPlugin(), examGuidesPlugin(), keystoneLinksPlugin(), pdfjsAssetsPlugin(), seoPagesPlugin(), aiConnectorAssetsPlugin()],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
    // The PCPA workspace's Python runs in a module worker that imports Pyodide
    // from its CDN at run time (lib/project/pythonWorker.ts). The default `iife`
    // worker bundle is a classic script, where that dynamic import isn't
    // guaranteed; emit workers as ES modules to match `{ type: 'module' }`.
    worker: {
        format: 'es',
    },
    // Unit tests (vitest) live alongside the modules they cover under src/. Scope
    // collection to src/ so the Playwright E2E specs in e2e/*.spec.ts — which
    // import @playwright/test and only run under `playwright test` — aren't swept
    // up by vitest's default **/*.spec.ts glob.
    test: {
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
    },
});
