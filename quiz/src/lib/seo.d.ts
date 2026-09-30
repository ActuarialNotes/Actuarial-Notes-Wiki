export declare const SITE_ORIGIN = "https://quiz.actuarialnotes.com";
export declare const SITE_NAME = "Actuarial Notes";
export declare const SITE_LOGO = "https://quiz.actuarialnotes.com/actuarialnotes-logo-black-512.png";
/** The site's own name and pitch — the home page, and every route with nothing better. */
export declare const DEFAULT_TITLE = "Actuarial Notes \u2014 Study Guides & Practice Questions for Actuarial Exams";
export declare const DEFAULT_DESCRIPTION = "Study guides, concept pages and practice questions for SOA and CAS actuarial exams \u2014 Exam P, FM, MAS-I, MAS-II, Exam 5 and beyond.";
/** Where a search result's snippet is cut. Google shows roughly this much. */
export declare const DESCRIPTION_MAX = 160;
/** A page with fewer words than this is a stub — kept out of the index until written. */
export declare const THIN_PAGE_WORDS = 20;
/** The app's own public routes, listed in the sitemap beside the vault's pages. */
export declare const SITEMAP_APP_PATHS: string[];
export type SeoPageKind = 'hub' | 'exam' | 'concept' | 'resource';
export interface SeoCrumb {
    name: string;
    path: string;
}
/** A resource's bibliographic facts, as its front matter records them. */
export interface SeoWork {
    author?: string;
    publisher?: string;
    year?: string;
    edition?: string;
    isbn?: string;
    type?: string;
    /** A standard's or guideline's own number — "ASOP No. 12", "Guideline E-15". */
    code?: string;
}
/** One public page, described. The build writes one of these per page. */
export interface SeoPage {
    kind: SeoPageKind;
    /** The canonical path — the same one `wikiRoute` builds for a link. */
    path: string;
    /** The page's own name, as its heading shows it. */
    name: string;
    title: string;
    description: string;
    /** The study guide it sits under — the middle breadcrumb. */
    parent?: SeoCrumb;
    /** Every study guide that lists it, when more than the parent. */
    guides?: SeoCrumb[];
    /** Its vault file. Build-time only; not shipped to the app. */
    source?: string;
    /** An unwritten stub: served, but kept out of the index and the sitemap. */
    noindex?: boolean;
    work?: SeoWork;
}
/** Everything the document head says about a page. */
export interface PageHead {
    title: string;
    description: string;
    /** Absolute. Absent on a route that has no one URL (the SPA fallback). */
    canonical?: string;
    noindex?: boolean;
    ogType?: 'website' | 'article';
    jsonLd?: object[];
}
/**
 * Read a TeX fragment as plain text — `$E[X^2]$` as "E[X²]", `$\frac{a}{b}$` as
 * "a/b", `$\mu$` as "μ" — for the places math has to be *read* rather than
 * typeset: a meta description, a snippet. It covers what the vault's inline
 * math actually uses and drops, rather than prints, whatever it doesn't know.
 */
export declare function latexToText(tex: string): string;
/**
 * One paragraph of vault markdown, read as plain text: wiki links as their
 * label, emphasis and code unmarked, inline math read out by `latexToText`,
 * embeds, footnotes, comments and HTML dropped.
 */
export declare function inlineMarkdownToText(md: string): string;
/** A page's markdown without its YAML front matter and Obsidian Publish breadcrumb line. */
export declare function pageBody(markdown: string): string;
/**
 * The page's introduction, as markdown: the first substantial paragraph of its
 * opening — a concept page's definition, an exam page's first line. Headings
 * before it are passed over (older pages open on `## Name`), but the search
 * stops at the first heading after any other content, so a chapter outline or
 * a page that opens on a formula has no lead rather than some paragraph from
 * its middle. A quoted definition (`> An agent is …`) counts; a callout, a
 * formula box and a list never do.
 */
export declare function leadParagraph(markdown: string): string;
/** An unwritten page: too few words, or a placeholder line where its summary goes. */
export declare function isStubPage(markdown: string): boolean;
/** Words of prose on a page, front matter and comments aside. */
export declare function bodyWordCount(markdown: string): number;
/**
 * Cut a description to fit a search result. A whole sentence is preferred when
 * one fills at least half the budget; otherwise it is cut at a word, with an
 * ellipsis, so it never ends mid-word.
 */
export declare function clampText(text: string, max?: number): string;
/** "A", "A and B", "A, B and C". */
export declare function listJoin(items: string[]): string;
/** `Name | Actuarial Notes`, with a qualifier when the whole still fits. */
export declare function composeTitle(name: string, qualifier?: string): string;
export declare function conceptSeo(input: {
    name: string;
    markdown: string;
    exams: SeoCrumb[];
}): SeoPage;
export declare function examSeo(input: {
    fileName: string;
    markdown: string;
    questions: number;
}): SeoPage;
export declare function resourceSeo(input: {
    name: string;
    markdown: string;
    exams: SeoCrumb[];
}): SeoPage;
export declare function hubSeo(exams: SeoCrumb[]): SeoPage;
/**
 * Practice questions per bank label (`exam:` in a question's front matter), not
 * counting the ones no current syllabus covers (`off_syllabus: true`).
 */
export declare function countQuestionsByExam(rawQuestions: string[]): Record<string, number>;
/**
 * Every public page the vault makes, described: the study-guide hub, each exam,
 * each concept and each resource (`Resources/Books/`). `files` is the wiki
 * bundle's file map (vault path → markdown).
 */
export declare function buildSeoPages(files: Record<string, string>, questionCounts: Record<string, number>): SeoPage[];
export declare function absoluteUrl(path: string): string;
/** Everything the document head should say for one described page. */
export declare function pageHead(page: SeoPage): PageHead;
/**
 * The head a route gets before (or without) its page's own description: its
 * name, the site's description, and its canonical URL when it has one. A wiki
 * page's is its name read back off the URL; the page replaces it with the full
 * record once its chunk has loaded.
 */
export declare function fallbackHead(pathname: string): PageHead;
/**
 * A route that names nothing — an unknown path, a wiki page that won't load.
 * The app answers those 200, so without this they would be indexed as pages.
 */
export declare const NOT_FOUND_HEAD: PageHead;
export declare function escapeHtml(text: string): string;
/** JSON for a <script> body: `<` escaped so no string can close the tag. */
export declare function jsonForScript(value: unknown): string;
/**
 * The head as HTML — what the build writes between the `page-head` markers of
 * each page's static file. `lib/documentHead.ts` writes the same tags live;
 * the two must name the same elements, or a page would carry both.
 */
export declare function headTagsHtml(head: PageHead): string;
/** A sitemap of absolute URLs, one per path. */
export declare function sitemapXml(paths: string[]): string;
