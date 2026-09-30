// The vault as a knowledge base an AI assistant can read — the "facts" half of
// the Claude / ChatGPT connector (see docs/ai-connector.md).
//
// Built once, at bundle time: `vite.config.ts` (knowledgeBasePlugin) reads the
// vault, hands the raw files to `buildKnowledgeBase`, and emits the result as a
// static asset (`/ai/knowledge-base.json`). The MCP endpoint (`quiz/api/mcp.js`)
// loads that asset from its own deployment and serves tools over it, so what an
// assistant reads is always exactly what the deployed app renders.
//
// The rules this module keeps:
//
//  - **The app's parsers, not a second reading of the vault.** Questions go
//    through `parseQuestion`, exam objectives through `parseExamSyllabus`, source
//    readings through `extractSourceMaterial`, fact-check verdicts through
//    `factCheckBadge` — so a question the app drops, or a page the app badges
//    "Known issue", says the same thing to an assistant.
//  - **A critically flagged question reaches nobody.** `filterQuestions` keeps a
//    question with an open critical finding out of every quiz, by any route;
//    here it is left out of the export altogether and listed as withheld.
//  - **Nothing is invented.** Every field is read off the vault. An exam page
//    with no weights has objectives with no weights; a question with no sitting
//    names none.
//
// Imports are relative, not `@/`-aliased: the vite config pulls this module
// into its own Node graph, which doesn't resolve the alias.
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
import fm from 'front-matter';
import { parseQuestion } from './parser';
import { parseExamMetadata, parseExamSyllabus } from './wikiParser';
import { extractSourceMaterial } from './sourceMaterial';
import { factCheckBadge, hasCriticalFinding, summarizeSource, verificationFromAttributes, } from './verification';
import { examDisplayName, wikiRoute } from './wikiRoutes';
/** Bumped whenever the shape below changes; the connector refuses a version it doesn't know. */
export var KNOWLEDGE_BASE_VERSION = 1;
/** Where the build emits the export, relative to the site root. */
export var KNOWLEDGE_BASE_ASSET = 'ai/knowledge-base.json';
// ── Helpers ──────────────────────────────────────────────────────────────────
/**
 * The key a name is looked up by: lower-case, accents folded (`Bühlmann` →
 * `buhlmann`), apostrophes dropped, hyphens and underscores as spaces. Mirrors
 * `normalize_term` in scripts/vault_links.py, which is how the curated
 * `concept_aliases.json` keys are written — plus the accent fold, since a
 * reader types "Buhlmann". `quiz/api/_mcp/knowledgeBase.js` normalises the
 * same way at run time.
 */
export function normalizeTerm(value) {
    return value
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/['’`]/g, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
/** `P-1` → `P`, `FM-2` → `FM`; every other exam id is already its key. */
export function examKeyFromExamId(examId) {
    return /^[A-Z]+-\d+$/.test(examId) ? examId.replace(/-\d+$/, '') : examId;
}
/**
 * Parentheses percent-encoded as well. `encodeURIComponent` leaves them alone,
 * and the vault's file names are full of them (`Basic Ratemaking (Werner -
 * 2016)`) — a bare `)` ends a markdown link's URL early, in this module's own
 * figure links and in every citation an assistant writes.
 */
function encodeParens(url) {
    return url.replace(/\(/g, '%28').replace(/\)/g, '%29');
}
function encodedPath(path) {
    return encodeParens(path.split('/').map(encodeURIComponent).join('/'));
}
function githubBlobUrl(repo, branch, path) {
    return "https://github.com/".concat(repo, "/blob/").concat(branch, "/").concat(encodedPath(path));
}
function githubRawUrl(repo, branch, path) {
    return "https://raw.githubusercontent.com/".concat(repo, "/").concat(branch, "/").concat(encodedPath(path));
}
/** The app's own page for a vault entry, safe to drop into a markdown link. */
function appUrl(site, ref) {
    return "".concat(site).concat(encodeParens(wikiRoute(ref)));
}
var IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i;
/** A wiki-link target's page name: the last path segment, without `.md`. */
function linkTitle(target) {
    var clean = target.trim().replace(/\\$/, '');
    return (clean.includes('/') ? clean.split('/').pop() : clean).replace(/\.md$/i, '').trim();
}
/** An Obsidian comment, `%%…%%` — invisible in the vault, so invisible here. */
var COMMENT_RE = /%%[\s\S]*?%%/g;
/** `[[a\|b]]` — the pipe escaped because the link sits in a table. */
var ESCAPED_PIPE_LINK_RE = /\[\[([^\]]*?)\\\|([^\]]*?)\]\]/g;
var EMBED_RE = /!\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;
var LINK_RE = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g;
var CALLOUT_RE = /^((?:>[ \t]*)+)\[!(\w+)\][+-]?[ \t]*(.*)$/;
function calloutHeading(type, rawTitle) {
    var _a;
    var tag = /\{([^}]*)\}\s*$/.exec(rawTitle);
    var title = (tag ? rawTitle.slice(0, tag.index) : rawTitle).trim();
    var tagText = (_a = tag === null || tag === void 0 ? void 0 : tag[1].trim()) !== null && _a !== void 0 ? _a : '';
    var kind = type.toLowerCase();
    var typeLabel = kind.charAt(0).toUpperCase() + kind.slice(1);
    if (tagText && /%/.test(tagText))
        return "**".concat(title || typeLabel, " (").concat(tagText, ")**");
    if (tagText)
        return title ? "**".concat(tagText, ": ").concat(title, "**") : "**".concat(tagText, "**");
    if (kind === 'question')
        return title ? "**Q: ".concat(title, "**") : '**Question**';
    return "**".concat(title || typeLabel, "**");
}
/**
 * Obsidian markdown → markdown any reader understands. Links become their
 * display text (the page list travels separately in `links`), embedded figures
 * become a link to the image, callout headers become bold lines, and the
 * frontmatter, HTML chrome and `%%comments%%` go. LaTeX is left alone: models
 * read it natively, and every formula stays exactly as authored.
 */
export function cleanVaultMarkdown(markdown, repo, branch) {
    var body = markdown.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, '');
    var text = body
        .replace(/\r\n/g, '\n')
        .replace(COMMENT_RE, '')
        .replace(/<div\b[^>]*>[\s\S]*?<\/div>/gi, '')
        .replace(/<\/?(?:div|span|br)\b[^>]*>/gi, '')
        .replace(ESCAPED_PIPE_LINK_RE, '[[$1|$2]]')
        .replace(EMBED_RE, function (_all, target) {
        var path = target.trim();
        var name = linkTitle(path);
        if (!IMAGE_EXT_RE.test(path))
            return "(see \u201C".concat(name, "\u201D)");
        var resolved = path.includes('/') ? path : "Media/Attachments/".concat(path);
        var label = name.replace(IMAGE_EXT_RE, '').replace(/[_]+/g, ' ');
        return "[Figure: ".concat(label, "](").concat(githubRawUrl(repo, branch, resolved), ")");
    })
        .replace(LINK_RE, function (_all, target, display) { return ((display === null || display === void 0 ? void 0 : display.trim()) || linkTitle(target)); })
        .split('\n')
        .map(function (line) {
        var m = CALLOUT_RE.exec(line);
        return m ? "".concat(m[1].replace(/[ \t]+$/, ''), " ").concat(calloutHeading(m[2], m[3])) : line.replace(/[ \t]+$/, '');
    })
        .join('\n')
        .replace(/\n{3,}/g, '\n\n');
    return text.trim();
}
/** Titles of the pages a markdown file links to, in order, without embeds. */
export function extractLinkTitles(markdown) {
    var out = [];
    var seen = new Set();
    var text = markdown.replace(COMMENT_RE, '').replace(ESCAPED_PIPE_LINK_RE, '[[$1|$2]]');
    for (var _i = 0, _a = text.matchAll(/(?<!!)\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g); _i < _a.length; _i++) {
        var m = _a[_i];
        var title = linkTitle(m[1]);
        var key = title.toLowerCase();
        if (!title || seen.has(key))
            continue;
        seen.add(key);
        out.push(title);
    }
    return out;
}
/** The first paragraph of cleaned markdown, flattened to one line of prose. */
export function summarize(text, max) {
    if (max === void 0) { max = 300; }
    for (var _i = 0, _a = text.split(/\n\s*\n/); _i < _a.length; _i++) {
        var block = _a[_i];
        // A heading is a title, not prose — but it often shares a block with the
        // paragraph under it (`# Exam P-1` directly above the exam's description).
        var para = block.split('\n').filter(function (l) { return !/^#{1,6}\s/.test(l.trim()); }).join('\n').trim();
        if (!para || /^\[Figure:[^\]]*\]\([^)]*\)$/.test(para))
            continue;
        var flat = para
            .split('\n')
            .map(function (l) { return l.replace(/^(?:>\s*)+/, '').replace(/^\s*(?:[-*+]|\d+\.)\s+/, '').trim(); })
            .filter(Boolean)
            .join(' ')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/\*\*|__|`/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        if (!flat)
            continue;
        if (flat.length <= max)
            return flat;
        var cut = flat.slice(0, max - 1);
        var space = cut.lastIndexOf(' ');
        return "".concat((space > max * 0.6 ? cut.slice(0, space) : cut).trimEnd(), "\u2026");
    }
    return '';
}
function factCheckOf(v) {
    var _a, _b, _c, _d, _e;
    var badge = factCheckBadge(v);
    return {
        status: (_a = v === null || v === void 0 ? void 0 : v.status) !== null && _a !== void 0 ? _a : 'unverified',
        label: badge.label,
        detail: badge.detail,
        checked: (_b = v === null || v === void 0 ? void 0 : v.lastChecked) !== null && _b !== void 0 ? _b : null,
        sources: ((_c = v === null || v === void 0 ? void 0 : v.sources) !== null && _c !== void 0 ? _c : []).map(summarizeSource),
        openFindings: (_d = v === null || v === void 0 ? void 0 : v.openFindings) !== null && _d !== void 0 ? _d : 0,
        openCritical: (_e = v === null || v === void 0 ? void 0 : v.openCritical) !== null && _e !== void 0 ? _e : 0,
    };
}
function attributesOf(markdown) {
    var _a;
    try {
        return ((_a = fm(markdown).attributes) !== null && _a !== void 0 ? _a : {});
    }
    catch (_b) {
        return {};
    }
}
/** Front matter → the metadata worth handing an assistant (the verification block has its own field). */
function metaOf(attrs) {
    var meta = {};
    for (var _i = 0, _a = Object.entries(attrs); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (key === 'verification' || value == null)
            continue;
        if (value instanceof Date) {
            if (!isNaN(value.getTime()))
                meta[key] = value.toISOString().slice(0, 10);
        }
        else if (Array.isArray(value)) {
            var items = value.filter(function (v) { return v != null && typeof v !== 'object'; }).map(String);
            if (items.length)
                meta[key] = items;
        }
        else if (typeof value === 'string') {
            // "[casact.org](https://…)" — keep the URL, which is the part a reader follows.
            var trimmed = value.trim();
            var link = /^\[[^\]]*\]\((https?:[^)\s]+)\)$/.exec(trimmed);
            if (trimmed)
                meta[key] = link ? link[1] : trimmed;
        }
        else if (typeof value === 'number' || typeof value === 'boolean') {
            meta[key] = value;
        }
    }
    return meta;
}
var RESOURCE_CATEGORY = {
    books: 'book',
    regulation: 'regulation',
    events: 'event',
    benchmarks: 'benchmark',
    data: 'data',
};
/** `Concepts/Conditional+Probability` → `Conditional Probability`. */
function conceptFromWikiLink(link) {
    var _a;
    var clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '');
    var last = (_a = clean.split('/').filter(Boolean).pop()) !== null && _a !== void 0 ? _a : '';
    try {
        last = decodeURIComponent(last);
    }
    catch ( /* already plain */_b) { /* already plain */ }
    return last.trim();
}
function markdownUnder(vault, dir, into, depth) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, entry, path, text;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, vault.list(dir)];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    entry = _a[_i];
                    path = "".concat(dir, "/").concat(entry.name);
                    if (!entry.isDirectory) return [3 /*break*/, 5];
                    if (!(depth > 0 && !entry.name.startsWith('.'))) return [3 /*break*/, 4];
                    return [4 /*yield*/, markdownUnder(vault, path, into, depth - 1)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    if (!entry.name.endsWith('.md'))
                        return [3 /*break*/, 7];
                    return [4 /*yield*/, vault.read(path)];
                case 6:
                    text = _b.sent();
                    if (text != null)
                        into[path] = text;
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function readJson(vault, path, fallback) {
    return __awaiter(this, void 0, void 0, function () {
        var text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, vault.read(path)];
                case 1:
                    text = _a.sent();
                    if (text == null)
                        return [2 /*return*/, fallback];
                    try {
                        return [2 /*return*/, JSON.parse(text)];
                    }
                    catch (_b) {
                        return [2 /*return*/, fallback];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Everything the knowledge base is built from. This is the one list of which
 * vault directories an assistant can read — the root exam pages, `Concepts/`,
 * all of `Resources/`, `Guides/` and the question bank — so add a new content
 * directory here as well as to the app's own collectors in vite.config.ts.
 */
export function readKnowledgeBaseSources(vault) {
    return __awaiter(this, void 0, void 0, function () {
        var pages, _i, _a, entry, text, questions, _b, _c, bank, catalog, aliases;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    pages = {};
                    _i = 0;
                    return [4 /*yield*/, vault.list('')];
                case 1:
                    _a = _f.sent();
                    _f.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    entry = _a[_i];
                    if (entry.isDirectory || !/^Exam\b.*\.md$/i.test(entry.name))
                        return [3 /*break*/, 4];
                    return [4 /*yield*/, vault.read(entry.name)];
                case 3:
                    text = _f.sent();
                    if (text != null)
                        pages[entry.name] = text;
                    _f.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, markdownUnder(vault, 'Concepts', pages, 0)];
                case 6:
                    _f.sent();
                    return [4 /*yield*/, markdownUnder(vault, 'Resources', pages, 3)];
                case 7:
                    _f.sent();
                    return [4 /*yield*/, markdownUnder(vault, 'Guides', pages, 1)];
                case 8:
                    _f.sent();
                    questions = {};
                    _b = 0;
                    return [4 /*yield*/, vault.list('questions')];
                case 9:
                    _c = _f.sent();
                    _f.label = 10;
                case 10:
                    if (!(_b < _c.length)) return [3 /*break*/, 13];
                    bank = _c[_b];
                    if (!bank.isDirectory) return [3 /*break*/, 12];
                    return [4 /*yield*/, markdownUnder(vault, "questions/".concat(bank.name), questions, 0)];
                case 11:
                    _f.sent();
                    _f.label = 12;
                case 12:
                    _b++;
                    return [3 /*break*/, 10];
                case 13: return [4 /*yield*/, readJson(vault, 'scripts/exam_catalog.json', {})];
                case 14:
                    catalog = _f.sent();
                    return [4 /*yield*/, readJson(vault, 'scripts/concept_aliases.json', {})];
                case 15:
                    aliases = _f.sent();
                    return [2 /*return*/, { pages: pages, questions: questions, catalog: (_d = catalog.exams) !== null && _d !== void 0 ? _d : [], aliases: (_e = aliases.aliases) !== null && _e !== void 0 ? _e : {} }];
            }
        });
    });
}
// ── Builder ──────────────────────────────────────────────────────────────────
export function buildKnowledgeBase(sources) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    var _1 = sources.site, repo = _1.repo, branch = _1.branch;
    var site = sources.site.url.replace(/\/+$/, '');
    var docs = [];
    var usedIds = new Set();
    var uniqueId = function (preferred, fallback) {
        var id = usedIds.has(preferred) ? fallback : preferred;
        usedIds.add(id);
        return id;
    };
    var paths = Object.keys(sources.pages).sort();
    // Exams first: the objectives say which exams every concept and reading
    // belongs to, and the readings which exams a resource is on.
    var exams = [];
    var conceptExams = new Map();
    var readingExams = new Map();
    var note = function (map, name, exam) {
        var key = name.toLowerCase();
        if (!map.has(key))
            map.set(key, new Set());
        map.get(key).add(exam);
    };
    var catalogByPage = new Map(sources.catalog.map(function (row) { return [row.page, row]; }));
    var _loop_1 = function (row) {
        var markdown = sources.pages[row.page];
        if (markdown == null)
            return "continue";
        var bare = row.page.replace(/\.md$/i, '');
        var key = examKeyFromExamId(row.exam_id);
        var meta = parseExamMetadata(markdown);
        var syllabus = parseExamSyllabus(markdown, row.exam_id, examDisplayName(bare), (_a = meta === null || meta === void 0 ? void 0 : meta.examTopic) !== null && _a !== void 0 ? _a : '', bare);
        var objectives = syllabus.topics.map(function (topic) {
            var _a;
            return ({
                title: topic.name,
                weight: (_a = topic.weight) !== null && _a !== void 0 ? _a : null,
                concepts: topic.concepts.map(function (c) { return c.name; }),
            });
        });
        for (var _21 = 0, objectives_1 = objectives; _21 < objectives_1.length; _21++) {
            var objective = objectives_1[_21];
            for (var _22 = 0, _23 = objective.concepts; _22 < _23.length; _22++) {
                var c = _23[_22];
                note(conceptExams, c, key);
            }
        }
        var readings = extractSourceMaterial(markdown).entries.map(function (entry) {
            var _a;
            note(readingExams, entry.name, key);
            return { title: entry.name, detail: (_a = entry.detail) !== null && _a !== void 0 ? _a : null, docId: null };
        });
        var text = cleanVaultMarkdown(markdown, repo, branch);
        var docId = uniqueId("exam/".concat(key), "exam/".concat(row.exam_id));
        exams.push({
            key: key,
            examId: row.exam_id,
            name: examDisplayName(bare),
            body: row.body,
            subject: (_b = meta === null || meta === void 0 ? void 0 : meta.examTopic) !== null && _b !== void 0 ? _b : '',
            status: (['ready', 'beta', 'development'].includes(row.status) ? row.status : 'beta'),
            docId: docId,
            url: appUrl(site, { kind: 'exam', name: bare }),
            summary: summarize(text),
            objectives: objectives,
            readings: readings,
            keystones: (_d = (_c = sources.keystones.find(function (k) { return k.id === key; })) === null || _c === void 0 ? void 0 : _c.concepts.map(function (c) { return ({ name: c.name, why: c.why }); })) !== null && _d !== void 0 ? _d : [],
            guides: [],
            bank: row.bank,
            questionCount: 0,
        });
        docs.push({
            id: docId,
            kind: 'exam',
            title: "".concat(examDisplayName(bare), " \u2014 ").concat((_e = meta === null || meta === void 0 ? void 0 : meta.examTopic) !== null && _e !== void 0 ? _e : bare),
            path: row.page,
            url: appUrl(site, { kind: 'exam', name: bare }),
            text: text,
            summary: summarize(text),
            links: extractLinkTitles(markdown),
            exams: [key],
            aliases: [bare, examDisplayName(bare), "Exam ".concat(key), (_f = meta === null || meta === void 0 ? void 0 : meta.examTopic) !== null && _f !== void 0 ? _f : ''].filter(Boolean),
            meta: { body: row.body, status: row.status },
            factCheck: factCheckOf(verificationFromAttributes(attributesOf(markdown))),
        });
    };
    for (var _i = 0, _2 = sources.catalog; _i < _2.length; _i++) {
        var row = _2[_i];
        _loop_1(row);
    }
    var examForGuideFolder = function (folder) {
        var row = catalogByPage.get("".concat(folder, ".md"));
        return row ? examKeyFromExamId(row.exam_id) : null;
    };
    var guidesByExam = new Map();
    var _loop_2 = function (path) {
        var markdown = sources.pages[path];
        var lower = path.toLowerCase();
        var file = path.split('/').pop().replace(/\.md$/i, '');
        var attrs = attributesOf(markdown);
        var text = cleanVaultMarkdown(markdown, repo, branch);
        var base = {
            path: path,
            text: text,
            summary: summarize(text),
            links: extractLinkTitles(markdown).filter(function (t) { return t.toLowerCase() !== file.toLowerCase(); }),
            factCheck: factCheckOf(verificationFromAttributes(attrs)),
        };
        var frontAliases = Array.isArray(attrs.aliases) ? attrs.aliases.map(String).filter(Boolean) : [];
        if (lower.startsWith('concepts/') && path.split('/').length === 2) {
            docs.push(__assign(__assign({}, base), { id: uniqueId("concept/".concat(file), "concept/".concat(path)), kind: 'concept', title: file, url: appUrl(site, { kind: 'concept', name: file }), exams: __spreadArray([], ((_g = conceptExams.get(file.toLowerCase())) !== null && _g !== void 0 ? _g : []), true), aliases: frontAliases, meta: {} }));
        }
        else if (lower.startsWith('resources/')) {
            var folder = (_j = (_h = path.split('/')[1]) === null || _h === void 0 ? void 0 : _h.toLowerCase()) !== null && _j !== void 0 ? _j : '';
            var declared = String((_k = attrs.type) !== null && _k !== void 0 ? _k : '').toLowerCase();
            var category = declared === 'event' || declared === 'regulation' ? declared : ((_l = RESOURCE_CATEGORY[folder]) !== null && _l !== void 0 ? _l : 'resource');
            var isBook = folder === 'books' && path.split('/').length === 3;
            docs.push(__assign(__assign({}, base), { id: uniqueId("resource/".concat(file), "resource/".concat(path.replace(/\.md$/i, ''))), kind: 'resource', title: file, url: isBook ? appUrl(site, { kind: 'resource', name: file }) : githubBlobUrl(repo, branch, path), exams: __spreadArray([], ((_m = readingExams.get(file.toLowerCase())) !== null && _m !== void 0 ? _m : []), true), aliases: __spreadArray([], new Set(__spreadArray(__spreadArray([], frontAliases, true), [attrs.title, attrs.Title].filter(function (t) { return typeof t === 'string' && t.trim() !== '' && t !== file; }), true)), true), meta: __assign({ category: category }, metaOf(attrs)) }));
        }
        else if (lower.startsWith('guides/')) {
            var segments = path.split('/');
            var folder = segments.length === 3 ? segments[1] : null;
            var examKey = folder ? examForGuideFolder(folder) : null;
            var id = uniqueId(folder ? "guide/".concat(folder, "/").concat(file) : "guide/".concat(file), "guide/".concat(path));
            docs.push(__assign(__assign({}, base), { id: id, kind: 'guide', title: folder ? "".concat(examDisplayName(folder), ": ").concat(file) : file, url: githubBlobUrl(repo, branch, path), exams: examKey ? [examKey] : [], aliases: [], meta: metaOf(attrs) }));
            if (examKey) {
                // A present, numeric `order:` only — `Number(undefined)` is NaN and
                // `Number(null)` is 0, and neither is an authored position.
                var order = typeof attrs.order === 'number' ? attrs.order : Number((_o = attrs.order) !== null && _o !== void 0 ? _o : NaN);
                if (!guidesByExam.has(examKey))
                    guidesByExam.set(examKey, []);
                guidesByExam.get(examKey).push({ id: id, title: file, order: Number.isFinite(order) ? order : Infinity });
            }
        }
    };
    for (var _3 = 0, paths_1 = paths; _3 < paths_1.length; _3++) {
        var path = paths_1[_3];
        _loop_2(path);
    }
    for (var _4 = 0, exams_1 = exams; _4 < exams_1.length; _4++) {
        var exam = exams_1[_4];
        // The authored reading order; a tip with no `order:` goes last (lib/examGuides.ts).
        exam.guides = ((_p = guidesByExam.get(exam.key)) !== null && _p !== void 0 ? _p : [])
            .sort(function (a, b) { return a.order - b.order || a.title.localeCompare(b.title); })
            .map(function (_a) {
            var id = _a.id, title = _a.title;
            return ({ id: id, title: title });
        });
    }
    var docByTitle = new Map();
    for (var _5 = 0, docs_1 = docs; _5 < docs_1.length; _5++) {
        var doc = docs_1[_5];
        if (doc.kind === 'resource' && !docByTitle.has(doc.title.toLowerCase()))
            docByTitle.set(doc.title.toLowerCase(), doc);
    }
    for (var _6 = 0, exams_2 = exams; _6 < exams_2.length; _6++) {
        var exam = exams_2[_6];
        for (var _7 = 0, _8 = exam.readings; _7 < _8.length; _7++) {
            var reading = _8[_7];
            reading.docId = (_r = (_q = docByTitle.get(reading.title.toLowerCase())) === null || _q === void 0 ? void 0 : _q.id) !== null && _r !== void 0 ? _r : null;
        }
    }
    // Questions, through the app's own parser.
    var questions = [];
    var withheld = [];
    var seenQuestions = new Set();
    var examByBank = new Map(exams.filter(function (e) { return e.bank; }).map(function (e) { return [e.bank, e]; }));
    for (var _9 = 0, _10 = Object.keys(sources.questions).sort(); _9 < _10.length; _9++) {
        var path = _10[_9];
        var q = parseQuestion(sources.questions[path]);
        if (!q || seenQuestions.has(q.id))
            continue;
        seenQuestions.add(q.id);
        var bank = (_s = path.split('/')[1]) !== null && _s !== void 0 ? _s : '';
        var examKey = (_u = (_t = examByBank.get(bank)) === null || _t === void 0 ? void 0 : _t.key) !== null && _u !== void 0 ? _u : bank.replace(/^exam-/, '').toUpperCase();
        if (hasCriticalFinding(q.verification)) {
            withheld.push({ id: q.id, exam: examKey, reason: 'An unresolved critical fact-check finding.' });
            continue;
        }
        questions.push({
            id: q.id,
            exam: examKey,
            bank: bank,
            path: path,
            url: "".concat(site, "/quiz?ids=").concat(encodeURIComponent(q.id)),
            topic: q.topic,
            objective: q.learning_objective,
            difficulty: q.difficulty,
            type: q.type,
            points: q.points,
            concepts: __spreadArray([], new Set(q.wiki_link.map(conceptFromWikiLink).filter(Boolean)), true),
            sitting: q.year ? (q.session ? "".concat(q.session, " ").concat(q.year) : String(q.year)) : null,
            originallyExam: (_v = q.originally_exam) !== null && _v !== void 0 ? _v : null,
            offSyllabus: q.off_syllabus === true,
            stem: q.stem,
            options: q.options,
            answer: q.answer,
            explanation: q.explanation,
            examinerReport: (_w = q.examiner_report) !== null && _w !== void 0 ? _w : null,
            parts: (_y = (_x = q.parts) === null || _x === void 0 ? void 0 : _x.map(function (p) {
                var _a;
                return ({
                    label: p.label,
                    points: p.points,
                    stem: p.stem,
                    type: p.type,
                    options: p.options,
                    answer: p.answer,
                    explanation: p.explanation,
                    examinerReport: (_a = p.examiner_report) !== null && _a !== void 0 ? _a : null,
                });
            })) !== null && _y !== void 0 ? _y : null,
            factCheck: factCheckOf((_z = q.verification) !== null && _z !== void 0 ? _z : null),
        });
    }
    var _loop_3 = function (exam) {
        exam.questionCount = questions.filter(function (q) { return q.exam === exam.key && !q.offSyllabus; }).length;
    };
    for (var _11 = 0, exams_3 = exams; _11 < exams_3.length; _11++) {
        var exam = exams_3[_11];
        _loop_3(exam);
    }
    // Aliases: the curated table first, then the vault's own link text —
    // `[[Independent Events|Independence]]` says "Independence" means that page.
    // A display text that points at two different pages says nothing, and a
    // variant never shadows a real page title.
    var conceptTitles = new Map(docs.filter(function (d) { return d.kind === 'concept'; }).map(function (d) { return [normalizeTerm(d.title), d.title]; }));
    var aliases = {};
    for (var _12 = 0, _13 = Object.entries(sources.aliases); _12 < _13.length; _12++) {
        var _14 = _13[_12], variant = _14[0], page = _14[1];
        var target = conceptTitles.get(normalizeTerm(page));
        var key = normalizeTerm(variant);
        if (target && key && !conceptTitles.has(key))
            aliases[key] = target;
    }
    var fromLinks = new Map();
    var allMarkdown = __spreadArray([], Object.values(sources.pages), true);
    for (var _15 = 0, allMarkdown_1 = allMarkdown; _15 < allMarkdown_1.length; _15++) {
        var markdown = allMarkdown_1[_15];
        for (var _16 = 0, _17 = markdown.replace(ESCAPED_PIPE_LINK_RE, '[[$1|$2]]').matchAll(/(?<!!)\[\[([^\]|#]+)(?:#[^\]|]*)?\|([^\]]+)\]\]/g); _16 < _17.length; _16++) {
            var m = _17[_16];
            var target = conceptTitles.get(normalizeTerm(linkTitle(m[1])));
            var key = normalizeTerm(m[2]);
            if (!target || !key || key.length < 3 || conceptTitles.has(key))
                continue;
            if (!fromLinks.has(key))
                fromLinks.set(key, new Set());
            fromLinks.get(key).add(target);
        }
    }
    for (var _18 = 0, fromLinks_1 = fromLinks; _18 < fromLinks_1.length; _18++) {
        var _19 = fromLinks_1[_18], key = _19[0], targets = _19[1];
        if (targets.size === 1 && !(key in aliases))
            aliases[key] = __spreadArray([], targets, true)[0];
    }
    var _loop_4 = function (doc) {
        if (doc.kind !== 'concept')
            return "continue";
        var own = Object.entries(aliases).filter(function (_a) {
            var t = _a[1];
            return t === doc.title;
        }).map(function (_a) {
            var k = _a[0];
            return k;
        });
        doc.aliases = __spreadArray([], new Set(__spreadArray(__spreadArray([], doc.aliases, true), own, true)), true);
    };
    for (var _20 = 0, docs_2 = docs; _20 < docs_2.length; _20++) {
        var doc = docs_2[_20];
        _loop_4(doc);
    }
    var count = function (kind) { return docs.filter(function (d) { return d.kind === kind; }).length; };
    return {
        version: KNOWLEDGE_BASE_VERSION,
        builtAt: sources.site.builtAt,
        commit: (_0 = sources.site.commit) !== null && _0 !== void 0 ? _0 : null,
        site: site,
        repo: repo,
        branch: branch,
        counts: {
            exams: exams.length,
            concepts: count('concept'),
            resources: count('resource'),
            guides: count('guide'),
            questions: questions.length,
            withheld: withheld.length,
        },
        exams: exams,
        docs: docs,
        questions: questions,
        withheld: withheld,
        aliases: aliases,
    };
}
// ── llms.txt ─────────────────────────────────────────────────────────────────
var STATUS_WORD = {
    ready: 'complete',
    beta: 'beta — still being filled out',
    development: 'in development — syllabus outline only',
};
/**
 * `/llms.txt` — the llmstxt.org convention: a short markdown index an assistant
 * that is only browsing the site can read to find its way around, pointing it
 * at the connector for anything deeper.
 */
export function buildLlmsTxt(kb, connectorUrl, skillUrl) {
    var exams = kb.exams.map(function (e) {
        var bank = e.questionCount > 0 ? ", ".concat(e.questionCount, " practice questions") : '';
        return "- [".concat(e.name, " \u2014 ").concat(e.subject, "](").concat(e.url, "): ").concat(e.body, " \u00B7 ").concat(STATUS_WORD[e.status]).concat(bank);
    });
    var general = kb.docs.filter(function (d) { return d.kind === 'guide' && d.exams.length === 0; });
    return __spreadArray(__spreadArray(__spreadArray([
        '# Actuarial Notes',
        '',
        "> Study guides, concept pages and a practice-question bank for the SOA and CAS actuarial exams: ".concat(kb.counts.concepts, " concept pages, ").concat(kb.counts.resources, " source pages and ").concat(kb.counts.questions, " practice questions with worked solutions."),
        '',
        'Every page is community-written study material. Each one carries a fact-check status; most have not yet been checked against the source text, and the official syllabus and readings always take precedence.',
        '',
        '## Exams'
    ], exams, true), (general.length ? __spreadArray(['', '## Guides'], general.map(function (g) { return "- [".concat(g.title, "](").concat(g.url, "): ").concat(g.summary); }), true) : []), true), [
        '',
        '## For AI assistants',
        "- [MCP connector](".concat(connectorUrl, "): add this URL as a custom connector in Claude or ChatGPT (no sign-in) to search the notes, read syllabi and concept pages, and practise exam questions with the official solutions."),
        "- [Agent skill](".concat(skillUrl, "): a SKILL.md package that teaches an assistant to tutor with the connector \u2014 upload it in Claude or ChatGPT."),
        "- [Knowledge base export](".concat(kb.site, "/").concat(KNOWLEDGE_BASE_ASSET, "): every page and question above as one JSON file."),
        '',
    ], false).join('\n');
}
