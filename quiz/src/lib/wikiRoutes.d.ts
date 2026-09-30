export type WikiEntryKind = 'concept' | 'resource' | 'exam' | 'event' | 'regulation' | 'guide';
export interface WikiEntryRef {
    kind: WikiEntryKind;
    name: string;
    path?: string;
}
export declare function fromSlug(slug: string): string;
export declare function wikiRoute(ref: WikiEntryRef): string;
export declare function pathToEntryRef(path: string): WikiEntryRef | null;
export declare function entryRefToRepoPath(ref: WikiEntryRef): string;
export declare function hrefToEntryRef(href: string): WikiEntryRef | null;
export declare function examIdFromFile(name: string): string;
export declare function examDisplayName(name: string): string;
