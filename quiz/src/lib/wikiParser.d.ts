export interface WikiConcept {
    name: string;
    target: string;
    excerpt?: string;
}
export interface WikiTopic {
    name: string;
    weight?: string;
    concepts: WikiConcept[];
}
export interface WikiResource {
    name: string;
    target: string;
}
export interface WikiExamSyllabus {
    examId: string;
    examLabel: string;
    examTopic: string;
    topics: WikiTopic[];
    /** Source-material books, parsed from the `[!answer]` callout. */
    resources: WikiResource[];
    /** Source file name without .md extension, e.g. "Exam FM-2 (SOA)" */
    fileName?: string;
}
export declare function wikiExamIdToProgressKey(examId: string): string;
export declare function cleanWikiLinks(text: string): string;
export declare function parseExamMetadata(content: string): {
    examId: string;
    examTopic: string;
    examLabel: string;
} | null;
export declare function parseExamSyllabus(content: string, examId: string, examLabel: string, examTopic: string, fileName?: string): WikiExamSyllabus;
/**
 * All syllabi whose topic lists reference a concept, matched by display name
 * or by the raw `[[target]]` basename (handles `[[Bond Price|Price]]` aliases).
 * A concept taught in more than one exam's study guide yields multiple results —
 * callers must not silently pick the first one; ask the user which to open.
 */
export declare function findSyllabiForConcept(syllabi: WikiExamSyllabus[], conceptName: string): WikiExamSyllabus[];
