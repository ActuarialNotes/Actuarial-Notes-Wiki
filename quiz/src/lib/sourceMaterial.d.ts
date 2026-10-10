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
/** One numbered learning objective of an exam page — `A1`, `C5`. */
export interface SyllabusObjective {
    /** The section letter and the item's number, as the readings cite it. */
    code: string;
    /** The section's letter — `A`. */
    section: string;
    /** The section's callout title, weight tag split off — "A. Regulation of …". */
    sectionTitle: string;
    /** The objective's own words with the wiki links flattened, up to its examples. */
    summary: string;
}
/**
 * The numbered learning objectives of an exam page, in page order. A section
 * is a `> [!example]- A. Title {weight}` callout and an objective a numbered
 * item inside it, coded by the section's letter and the item's own number —
 * so a page that numbers each section from 1 (6C: A1–A3, B1–B3, C1–C5) and one
 * that numbers straight through (Exam 5: A1–A17, B18–B42) both come out as the
 * readings cite them. A callout with no letter numbers nothing.
 */
export declare function parseSyllabusObjectives(md: string): SyllabusObjective[];
/**
 * The learning objectives a reading assignment is read for: the codes it opens
 * with, runs expanded (`A1, C1-C5` → A1, C1, C2, C3, C4, C5), in syllabus
 * order. Each `;`-joined reading is read on its own, so a source with two
 * bullets (`A1–A15; A17`) keeps both. A run across sections (`B8–C2`) can't be
 * expanded without knowing how long B is, so only its two ends are kept.
 */
export declare function readingObjectives(detail: string | undefined): string[];
/** One choice of the shelf's objective filter. */
export interface ObjectiveFilterOption {
    /** The code — what is selected, and what the pill says when it is the one. */
    value: string;
    label: string;
    /** The objective's statement, as the page words it. */
    hint: string;
    /** The section heading it is listed under — "A. Regulation of …". */
    group: string;
    /** How many of the shelf's sources are read for it. */
    count: number;
}
/**
 * The objectives the shelf can be filtered by: every code some reading cites,
 * in syllabus order, named from the page. An objective no reading cites isn't
 * offered — choosing it would empty the shelf.
 *
 * A shelf with a reading that cites a code the page doesn't number gets no
 * filter at all: its readings and its objectives are numbered two different
 * ways (Exam 5 numbers its objectives A1–A17 then B18–B42, its readings cite
 * B1–B42), and a filter that named some codes and left others bare would be
 * guessing which numbering a reader means. Nor does a shelf with fewer than two
 * objectives to tell apart.
 */
export declare function objectiveFilterOptions(entries: SourceMaterialEntry[], objectives: SyllabusObjective[]): ObjectiveFilterOption[];
/**
 * The sources read for any of the chosen objectives, in the page's order. An
 * empty choice is no filter.
 */
export declare function filterSourcesByObjectives(entries: SourceMaterialEntry[], selected: ReadonlySet<string>): SourceMaterialEntry[];
