export interface SourceMaterialEntry {
    /** Canonical page name — the last path segment of the [[target]]. */
    name: string;
    /** Raw [[target]] as written, used to build the wiki route. */
    target: string;
    /** Display label: the link's alias when it has one, otherwise the name. */
    label: string;
    /** The reading note under the link ("Chapters 1–8, Excluding …"). */
    detail?: string;
}
export declare const SOURCE_MATERIAL_MARKER = "%%source-material%%";
export declare function cleanReadingDetail(text: string): string;
/**
 * Pull the source-material entries out of an exam page and replace the callout
 * they came from with {@link SOURCE_MATERIAL_MARKER}. Pages without such a
 * callout come back unchanged with no entries.
 */
export declare function extractSourceMaterial(md: string): {
    markdown: string;
    entries: SourceMaterialEntry[];
};
