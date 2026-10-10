export type WikiEntryKind = 'concept' | 'resource' | 'exam' | 'event' | 'regulation' | 'guide';
export interface WikiEntryRef {
    kind: WikiEntryKind;
    name: string;
    path?: string;
}
export declare function fromSlug(slug: string): string;
export declare function wikiRoute(ref: WikiEntryRef): string;
/** The Study Guides tab's shelf of syllabus readings (`pages/wiki/WikiResources.tsx`). */
export declare const RESOURCES_ROUTE = "/wiki/resources";
/**
 * The Study Guides tab's two pages, which the sidebar lists under it the way
 * it lists an open project's views under Projects: **Exams** — the exam ladder
 * at `/wiki`, with the exam and concept pages read from it — and **Resources**,
 * the shelf, with the resource pages opened from it.
 */
export type StudyGuidesSection = 'exams' | 'resources';
/** Which of the Study Guides pages `pathname` sits under, or null outside the tab. */
export declare function studyGuidesSection(pathname: string): StudyGuidesSection | null;
export declare function pathToEntryRef(path: string): WikiEntryRef | null;
export declare function entryRefToRepoPath(ref: WikiEntryRef): string;
export declare function hrefToEntryRef(href: string): WikiEntryRef | null;
export declare function examIdFromFile(name: string): string;
export declare function examDisplayName(name: string): string;
