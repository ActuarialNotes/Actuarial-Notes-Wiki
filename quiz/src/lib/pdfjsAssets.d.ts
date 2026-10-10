/** Directory inside `pdfjs-dist` → the path prefix it is served from. */
export declare const PDFJS_ASSET_DIRS: {
    /**
     * The Standard 14 font programs. A PDF that names Helvetica/Times/Courier
     * without embedding it — routine for anything produced from Word, which is
     * most of what the examining bodies publish — renders blank text without
     * these.
     */
    readonly standard_fonts: "pdf-standard-fonts";
    /**
     * The image codecs, compiled to WebAssembly. **CCITT fax and JBIG2 are
     * here**, which is to say every bitonal scan: the older CAS papers are
     * photocopies whose ink is one fax-compressed image. Without this,
     * `JBig2CCITTFaxImage.decode` throws "JBig2 failed to initialize", the image
     * resolves to null and the page's ink is never painted — leaving whatever
     * else that page drew, which is why the failure looks like a haunting rather
     * than a blank page. JPEG 2000 and colour management live here too.
     */
    readonly wasm: "pdf-wasm";
    /** Character maps, for CID-keyed fonts naming a predefined encoding. */
    readonly cmaps: "pdf-cmaps";
    /** The fallback ICC profile, for documents relying on colour management. */
    readonly iccs: "pdf-iccs";
};
/**
 * The URL a served directory is reached at.
 *
 * The trailing slash is not cosmetic: pdf.js validates these and throws
 * `Invalid factory url` on one without it.
 */
export declare function pdfjsAssetUrl(baseUrl: string, prefix: string): string;
