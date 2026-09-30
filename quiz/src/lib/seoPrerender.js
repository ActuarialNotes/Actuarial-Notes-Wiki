// The crawlable copy of a page.
//
// Every exam, concept and resource URL gets its own static HTML file at build
// time (`seoPagesPlugin` in vite.config.ts). Its <head> is the page's own —
// title, description, canonical, JSON-LD, from `lib/seo.ts` — and inside
// `#root` sits the article as plain HTML: headings, paragraphs, lists, tables,
// and every wiki link as a real <a href>. That is what a crawler that runs no
// JavaScript reads (most AI crawlers, social previews, Bing's first pass), and
// what Google's HTML-only first pass indexes before it renders the app.
//
// No reader ever sees it: `index.html` hides `#prerender` the moment scripting
// is on, and React replaces the contents of `#root` when it mounts. It is the
// same article the app renders, so there is nothing a crawler reads that a
// reader doesn't.
//
// Build-time only — nothing in the app imports this, so unified and friends
// stay out of the bundle. Imports are relative, for the vite config's graph.
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import { hrefToEntryRef, wikiRoute } from './wikiRoutes';
import { normalizeVaultMath } from './vaultMath';
import { escapeHtml, headTagsHtml, pageBody, SITE_NAME } from './seo';
var HEAD_MARKERS_RE = /<!-- page-head -->[\s\S]*?<!-- \/page-head -->/;
var ROOT_TAG = '<div id="root"></div>';
function escapeMarkdownLabel(label) {
    return label.replace(/[\\[\]()*_`{}]/g, '\\$&');
}
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
/**
 * Vault markdown made plain CommonMark: comments, embeds and inline footnotes
 * dropped; a callout's header turned into a bold line (a learning objective
 * keeps its weight — "**General Probability (23–30%)**"); every [[wiki link]]
 * turned into a link to the page it names, at that page's canonical path —
 * or into plain text when it names no page worth sending a crawler to
 * (`resolve` returns nothing), so no crawl is spent on a missing page or an
 * unwritten stub.
 */
export function staticMarkdown(markdown, resolve) {
    var md = pageBody(markdown)
        .replace(/%%[\s\S]*?%%/g, '')
        .replace(/!\[\[[^\]]*\]\]/g, '')
        .replace(/\s*\^\[(?:[^[\]]|\[[^\]]*\])*\]/g, '')
        .replace(/^((?:>\s?)+)\[!(\w+)\][+-]?[ \t]*(.*)$/gm, function (_m, quote, type, rawTitle) {
        var title = rawTitle
            .replace(/\{([^}]*)\}/g, function (_w, inner) { return (/%/.test(inner) ? "(".concat(inner.trim(), ")") : ''); })
            .trim();
        return "".concat(quote, "**").concat(title || capitalize(type), "**");
    })
        .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_m, target, display) {
        var _a;
        var t = target.trim();
        var label = (display !== null && display !== void 0 ? display : '').trim() || (t.includes('/') ? t.split('/').pop() : t);
        var ref = (_a = hrefToEntryRef(t)) !== null && _a !== void 0 ? _a : { kind: 'concept', name: t };
        var path = resolve(wikiRoute(ref));
        return path ? "[".concat(escapeMarkdownLabel(label), "](").concat(path, ")") : escapeMarkdownLabel(label);
    });
    return normalizeVaultMath(md);
}
var VOID_TAGS = new Set(['br', 'hr']);
// Everything else — task-list checkboxes, images, raw HTML — is left out.
var DROPPED_TAGS = new Set(['input', 'img', 'script', 'style', 'iframe', 'svg']);
var KEPT_ATTRIBUTES = {
    a: { href: 'href', title: 'title' },
    code: { className: 'class' },
    td: { align: 'align' },
    th: { align: 'align' },
    ol: { start: 'start' },
};
function attributes(tag, properties) {
    var kept = KEPT_ATTRIBUTES[tag];
    if (!kept || !properties)
        return '';
    var out = '';
    for (var _i = 0, _a = Object.entries(kept); _i < _a.length; _i++) {
        var _b = _a[_i], prop = _b[0], name_1 = _b[1];
        var value = properties[prop];
        if (value == null || value === false)
            continue;
        var text = Array.isArray(value) ? value.join(' ') : String(value);
        out += " ".concat(name_1, "=\"").concat(escapeHtml(text), "\"");
    }
    return out;
}
/** A hast tree as HTML — only the tags and attributes an article needs. */
export function hastToHtml(node) {
    switch (node.type) {
        case 'root':
            return node.children.map(hastToHtml).join('');
        case 'text':
            return escapeHtml(node.value);
        case 'element': {
            var tag = node.tagName;
            if (DROPPED_TAGS.has(tag))
                return '';
            var open_1 = "<".concat(tag).concat(attributes(tag, node.properties), ">");
            if (VOID_TAGS.has(tag))
                return open_1;
            return "".concat(open_1).concat(node.children.map(hastToHtml).join(''), "</").concat(tag, ">");
        }
        default:
            return '';
    }
}
export function markdownToHtml(markdown) {
    var processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(remarkRehype);
    var tree = processor.runSync(processor.parse(markdown));
    return hastToHtml(tree);
}
function crumbLink(crumb) {
    return "<a href=\"".concat(escapeHtml(crumb.path), "\">").concat(escapeHtml(crumb.name), "</a>");
}
/** "By Sheldon Ross · Pearson · 2019" — a resource's facts, over its outline. */
function byline(page) {
    var _a, _b;
    var w = page.work;
    if (!w)
        return '';
    var parts = [
        w.author ? "By ".concat(w.author) : '',
        w.publisher && w.publisher !== w.author ? w.publisher : '',
        (_a = w.year) !== null && _a !== void 0 ? _a : '',
        (_b = w.code) !== null && _b !== void 0 ? _b : '',
    ].filter(Boolean);
    return parts.length ? "<p>".concat(escapeHtml(parts.join(' · ')), "</p>") : '';
}
/** The `#prerender` article that goes inside `#root`. */
export function staticBody(input) {
    var _a;
    var page = input.page, markdown = input.markdown, resolve = input.resolve, _b = input.sections, sections = _b === void 0 ? [] : _b;
    var guides = (_a = page.guides) !== null && _a !== void 0 ? _a : (page.parent ? [page.parent] : []);
    var crumbs = __spreadArray([{ name: 'Study Guides', path: '/wiki' }], (page.parent ? [page.parent] : []), true);
    var nav = page.kind === 'hub'
        ? ''
        : "<nav aria-label=\"Breadcrumb\">".concat(__spreadArray(__spreadArray([], crumbs.map(crumbLink), true), ["<span>".concat(escapeHtml(page.name), "</span>")], false).join(' › '), "</nav>");
    var article = markdown ? markdownToHtml(staticMarkdown(markdown, resolve)) : '';
    var heading = /^\s*<h1>/.test(article) ? '' : "<h1>".concat(escapeHtml(page.name), "</h1>");
    var guideLinks = guides.length && page.kind !== 'exam'
        ? "<p>Study guide".concat(guides.length === 1 ? '' : 's', ": ").concat(guides.map(crumbLink).join(', '), "</p>")
        : '';
    var listing = sections
        .filter(function (s) { return s.links.length; })
        .map(function (s) { return "<h2>".concat(escapeHtml(s.heading), "</h2><ul>").concat(s.links.map(function (l) { return "<li>".concat(crumbLink(l), "</li>"); }).join(''), "</ul>"); })
        .join('');
    return [
        '<div id="prerender">',
        "<header><a href=\"/\">".concat(SITE_NAME, "</a></header>"),
        nav,
        "<main><article>".concat(heading).concat(byline(page)).concat(guideLinks).concat(article).concat(listing, "</article></main>"),
        '</div>',
    ].join('');
}
/**
 * The app's built `index.html`, made one page's own: its head between the
 * `page-head` markers, its article inside `#root`. Throws rather than ship a
 * page with the site's generic head — the markers are load-bearing.
 */
export function renderStaticPage(template, head, body) {
    if (!HEAD_MARKERS_RE.test(template))
        throw new Error('index.html has lost its <!-- page-head --> markers');
    if (!template.includes(ROOT_TAG))
        throw new Error("index.html has lost its empty ".concat(ROOT_TAG));
    return template
        .replace(HEAD_MARKERS_RE, function () { return "<!-- page-head -->\n    ".concat(headTagsHtml(head), "\n    <!-- /page-head -->"); })
        .replace(ROOT_TAG, function () { return "<div id=\"root\">".concat(body, "</div>"); });
}
