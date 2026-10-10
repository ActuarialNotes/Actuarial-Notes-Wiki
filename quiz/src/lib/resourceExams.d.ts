export interface ExamPageSource {
    /** Exam page name, without the extension ("Exam P-1 (SOA)"). */
    name: string;
    /** The page's raw markdown. */
    markdown: string;
}
/** Resource page name (lowercased) → exam labels, in syllabus order. */
export type ResourceExamMap = Record<string, string[]>;
/** The label a pill shows — the same name the exam grid and `TRACKS` use. */
export declare function examPillLabel(pageName: string): string;
export declare function compareExamLabels(a: string, b: string): number;
/**
 * Build the resource → exams map from the exam study guides. Pages with no
 * `Source Material` callout contribute nothing; a resource listed by two exams
 * gets both labels.
 */
export declare function buildResourceExamMap(pages: ExamPageSource[]): ResourceExamMap;
/** The exams a resource page belongs to, or `[]` when it isn't a syllabus reading. */
export declare function examsForResource(map: ResourceExamMap | undefined, pageName: string): string[];
