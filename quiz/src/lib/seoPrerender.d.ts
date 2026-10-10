import type { Nodes } from 'hast';
import { type PageHead, type SeoCrumb, type SeoPage } from './seo';
/** A route → the canonical path of the page it names, or nothing when there is none to link. */
export type LinkResolver = (route: string) => string | undefined;
/**
 * Vault markdown made plain CommonMark: comments, embeds and inline footnotes
 * dropped; a callout's header turned into a bold line (a learning objective
 * keeps its weight — "**General Probability (23–30%)**"); every [[wiki link]]
 * turned into a link to the page it names, at that page's canonical path —
 * or into plain text when it names no page worth sending a crawler to
 * (`resolve` returns nothing), so no crawl is spent on a missing page or an
 * unwritten stub.
 */
export declare function staticMarkdown(markdown: string, resolve: LinkResolver): string;
/** A hast tree as HTML — only the tags and attributes an article needs. */
export declare function hastToHtml(node: Nodes): string;
export declare function markdownToHtml(markdown: string): string;
export interface StaticBodyInput {
    page: SeoPage;
    /** The page's vault markdown; absent for the hub. */
    markdown?: string;
    resolve: LinkResolver;
    /** The hub's listing: sections of links. */
    sections?: {
        heading: string;
        links: SeoCrumb[];
    }[];
}
/** The `#prerender` article that goes inside `#root`. */
export declare function staticBody(input: StaticBodyInput): string;
/**
 * The app's built `index.html`, made one page's own: its head between the
 * `page-head` markers, its article inside `#root`. Throws rather than ship a
 * page with the site's generic head — the markers are load-bearing.
 */
export declare function renderStaticPage(template: string, head: PageHead, body: string): string;
