/**
 * Hosts whose PDFs the endpoint will serve. Mirrors `DEFAULT_HOSTS` in
 * `quiz/api/exam-pdf.js`.
 *
 * Wider than the exams alone: every PDF a resource page's `Available from`
 * names is read in the same viewer, so every publisher the vault links a PDF
 * on belongs here too — the standards board's ASOPs, a paper on its author's
 * university site, a regulator's or an industry body's report. A PDF on a host
 * missing from this list shows up as a card that can't be read in the app;
 * `examPdf.test.ts` holds every resource page to it. Adding a host here without
 * adding it there opens a viewer the endpoint then refuses.
 */
export declare const EXAM_PDF_HOSTS: string[];
/** Can this URL be shown in the viewer? https, a `.pdf`, on a publisher we proxy. */
export declare function isSupportedPdfSource(url: string): boolean;
/**
 * The PDF a resource page's link field names, when the app can read it — the
 * `"[host](url)"` value of its `Available from`. `undefined` for a page whose
 * link is not a PDF (a publisher's landing page, a catalogue search) or names
 * none.
 *
 * What a resource card's PDF mark and the page's **Read PDF** both rest on, so
 * the shelf never promises a document the page can't open.
 */
export declare function resourcePdfUrl(link: unknown): string | undefined;
/** The proxy endpoint. Overridable for a split deployment, as `VITE_PASS_RATES_URL` is. */
export declare function examPdfEndpoint(): string;
/** Where the viewer reads the document's bytes from. */
export declare function pdfProxyUrl(sourceUrl: string): string;
/** The same file, served as an attachment so the browser saves it. */
export declare function pdfDownloadUrl(sourceUrl: string): string;
/** The file's own name (`sp19-5.pdf`), used as the download filename. */
export declare function pdfFileName(sourceUrl: string): string;
export declare function looksLikePdf(bytes: Uint8Array): boolean;
/**
 * A reader-facing sentence for a response that came back without a PDF in it.
 *
 * The case worth naming precisely is HTML: the app is a single-page app whose
 * host rewrites unknown paths to `index.html`, so a deployment missing the
 * endpoint answers **200 with the app's own page**. Handed to a PDF parser that
 * reads as "invalid structure", which sends whoever debugs it hunting for a
 * corrupt file instead of a missing function.
 */
export declare function describeNonPdfResponse(status: number, contentType: string, body: string): string;
/** The publisher, for the "where did this come from" line under the viewer. */
export declare function pdfSourceHost(sourceUrl: string): string;
/**
 * The modifier state of a click, as far as "does this open a new tab" goes.
 * Taken as a plain shape rather than a `MouseEvent` so the rule is testable
 * without a DOM.
 */
export interface ClickModifiers {
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    button: number;
}
/**
 * Does this click on a PDF link belong to the in-app reader?
 *
 * Every PDF button in the app is an anchor to the publisher underneath, so the
 * real URL stays visible and ⌘/ctrl-click, middle-click, shift-click and
 * long-press keep doing what a link does. A *plain* left click is the one the
 * reader takes — and only for a source `quiz/api/exam-pdf.js` will actually
 * serve, since opening a panel that can't load is worse than the tab.
 *
 * `linkOnly` is the host's veto, for a surface the reader can't paint above.
 */
export declare function opensInReader(url: string, click: ClickModifiers, linkOnly?: boolean): boolean;
