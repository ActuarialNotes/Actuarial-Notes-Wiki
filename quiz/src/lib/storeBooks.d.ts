import { type ExamPageSource } from './resourceExams';
export declare function readingExamKey(label: string): string | undefined;
/** One exam's assignment of the book. */
export interface StoreBookReading {
    /** The exam's label, as a resource pill prints it — "Exam P-1", "Exam 6C". */
    exam: string;
    /** The chapters or sections the exam assigns, as the exam page writes them. */
    detail?: string;
}
export interface StoreBook {
    /** The vault page's name — its route key (`/wiki/resource/<slug>`). */
    name: string;
    title: string;
    authors?: string;
    publisher?: string;
    year?: number;
    edition?: string;
    isbn: string;
    /** `Type` from the front matter — "Textbook", "Casebook". */
    type: string;
    /** The publisher's own free copy, when the page names one (`Available from`). */
    freeUrl?: string;
    coverImage?: string;
    readings: StoreBookReading[];
}
/** A `Resources/Books` page, its front matter already parsed. */
export interface BookPageSource {
    name: string;
    attrs: Record<string, unknown>;
    coverImage?: string;
}
/** `[statlearning.com](https://www.statlearning.com/)` → the URL; a bare URL as is. */
export declare function linkTarget(value: string | undefined): string | undefined;
/**
 * The books on the Textbooks aisle: pages typed Textbook or Casebook that carry
 * an ISBN and are a syllabus reading for at least one exam — in syllabus order
 * of their first exam, then by title.
 */
export declare function buildStoreBooks(examPages: ExamPageSource[], books: BookPageSource[]): StoreBook[];
