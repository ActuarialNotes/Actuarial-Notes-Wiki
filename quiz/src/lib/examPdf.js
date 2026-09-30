// The client half of the exam-PDF viewer: where a source paper is read from,
// and what it's called once saved.
//
// Nothing here fetches the publisher directly. `quiz/api/exam-pdf.js` re-serves the
// file from our own origin, because the examining bodies send no CORS headers,
// may refuse to be framed, and can't be saved through a cross-origin
// `<a download>`. This module only builds the URLs and keeps the same
// allowlist the endpoint enforces, so an unsupported source is refused before a
// viewer is opened rather than after a request round-trips.
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
export var EXAM_PDF_HOSTS = [
    'casact.org',
    'www.casact.org',
    'soa.org',
    'www.soa.org',
    'actuarialstandardsboard.org',
    'www.actuarialstandardsboard.org',
    // Gelman & Unwin's manuscript, on the Columbia statistics department's site
    // (`www.` redirects to `sites.`, and the endpoint re-checks where it lands).
    'stat.columbia.edu',
    'www.stat.columbia.edu',
    'sites.stat.columbia.edu',
    // The Institute and Faculty of Actuaries' GIRO working-party paper.
    'actuaries.org.uk',
    'www.actuaries.org.uk',
    // MSA Research's legend of P&C KPI definitions.
    'msaresearch.com',
    'www.msaresearch.com',
    // PACICC's report on the actuary's role in safeguarding solvency.
    'pacicc.ca',
    'www.pacicc.ca',
];
/** Can this URL be shown in the viewer? https, a `.pdf`, on a publisher we proxy. */
export function isSupportedPdfSource(url) {
    try {
        var parsed = new URL(url);
        return (parsed.protocol === 'https:' &&
            EXAM_PDF_HOSTS.includes(parsed.hostname.toLowerCase()) &&
            /\.pdf$/i.test(parsed.pathname));
    }
    catch (_a) {
        return false;
    }
}
/**
 * The PDF a resource page's link field names, when the app can read it — the
 * `"[host](url)"` value of its `Available from`. `undefined` for a page whose
 * link is not a PDF (a publisher's landing page, a catalogue search) or names
 * none.
 *
 * What a resource card's PDF mark and the page's **Read PDF** both rest on, so
 * the shelf never promises a document the page can't open.
 */
export function resourcePdfUrl(link) {
    var _a, _b;
    if (typeof link !== 'string')
        return undefined;
    var value = link.trim();
    var url = (_b = (_a = value.match(/\(([^)]+)\)/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : (value.startsWith('http') ? value : undefined);
    return url && isSupportedPdfSource(url) ? url : undefined;
}
/** The proxy endpoint. Overridable for a split deployment, as `VITE_PASS_RATES_URL` is. */
export function examPdfEndpoint() {
    return import.meta.env.VITE_EXAM_PDF_URL || '/api/exam-pdf';
}
/** Where the viewer reads the document's bytes from. */
export function pdfProxyUrl(sourceUrl) {
    return "".concat(examPdfEndpoint(), "?url=").concat(encodeURIComponent(sourceUrl));
}
/** The same file, served as an attachment so the browser saves it. */
export function pdfDownloadUrl(sourceUrl) {
    return "".concat(examPdfEndpoint(), "?url=").concat(encodeURIComponent(sourceUrl), "&download=1");
}
/** The file's own name (`sp19-5.pdf`), used as the download filename. */
export function pdfFileName(sourceUrl) {
    try {
        var name_1 = new URL(sourceUrl).pathname.split('/').pop();
        return name_1 && /\.pdf$/i.test(name_1) ? name_1 : 'exam.pdf';
    }
    catch (_a) {
        return 'exam.pdf';
    }
}
/** The first bytes of every PDF. Anything else is not one, whatever it claims. */
var PDF_MAGIC = '%PDF-';
export function looksLikePdf(bytes) {
    if (bytes.length < PDF_MAGIC.length)
        return false;
    for (var i = 0; i < PDF_MAGIC.length; i++) {
        if (bytes[i] !== PDF_MAGIC.charCodeAt(i))
            return false;
    }
    return true;
}
/**
 * A reader-facing sentence for a response that came back without a PDF in it.
 *
 * The case worth naming precisely is HTML: the app is a single-page app whose
 * host rewrites unknown paths to `index.html`, so a deployment missing the
 * endpoint answers **200 with the app's own page**. Handed to a PDF parser that
 * reads as "invalid structure", which sends whoever debugs it hunting for a
 * corrupt file instead of a missing function.
 */
export function describeNonPdfResponse(status, contentType, body) {
    var type = contentType.toLowerCase();
    var trimmed = body.trimStart();
    if (type.includes('text/html') || trimmed.startsWith('<!') || trimmed.startsWith('<html')) {
        return "the PDF service isn't available on this deployment";
    }
    if (type.includes('json')) {
        try {
            var parsed = JSON.parse(body);
            if (typeof parsed.error === 'string' && parsed.error)
                return parsed.error;
        }
        catch (_a) {
            /* not the JSON it claimed to be — fall through */
        }
    }
    if (status < 200 || status >= 300)
        return "the service responded ".concat(status);
    return 'the response was not a PDF';
}
/** The publisher, for the "where did this come from" line under the viewer. */
export function pdfSourceHost(sourceUrl) {
    try {
        return new URL(sourceUrl).hostname.replace(/^www\./, '');
    }
    catch (_a) {
        return '';
    }
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
export function opensInReader(url, click, linkOnly) {
    if (linkOnly === void 0) { linkOnly = false; }
    if (linkOnly)
        return false;
    if (click.metaKey || click.ctrlKey || click.shiftKey || click.altKey)
        return false;
    if (click.button !== 0)
        return false;
    return isSupportedPdfSource(url);
}
