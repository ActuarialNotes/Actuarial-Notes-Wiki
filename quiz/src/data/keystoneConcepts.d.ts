export interface KeystoneConcept {
    /** Canonical concept name — matches `Concepts/<name>.md`. */
    name: string;
    /** One line: what it says, then what the rest of the syllabus leans on it for. */
    why: string;
}
export interface KeystoneExam {
    /** Exam id, matching the exam_progress key (`P`, `FM`, `MAS-I`, `5`). */
    id: string;
    /** Display label used in the badge popover. */
    label: string;
    concepts: KeystoneConcept[];
}
export declare const KEYSTONE_EXAMS: KeystoneExam[];
