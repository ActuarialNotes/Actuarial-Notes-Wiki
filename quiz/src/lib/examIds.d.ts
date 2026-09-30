export declare const EXAM_LABEL_TO_ID: Record<string, string>;
export declare const EXAM_ID_TO_LABEL: Record<string, string>;
export declare const RESETTABLE_EXAMS: Array<{
    id: string;
    label: string;
}>;
export declare function questionExamLabel(syllabus: {
    examId: string;
    examTopic: string;
}): string;
/** The bank label a syllabus's questions carry, or undefined when it has no bank. */
export declare function bankLabelFor(syllabus: {
    examId: string;
}): string | undefined;
