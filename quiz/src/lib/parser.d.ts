import { type Verification } from './verification';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple-choice' | 'free-entry' | 'multi-part';
export type QuizMode = 'quiz' | 'mock-exam';
export interface AnswerOption {
    key: string;
    text: string;
}
export interface Part {
    label: string;
    points: number;
    stem: string;
    type: 'multiple-choice' | 'free-entry';
    options: AnswerOption[];
    answer: string;
    explanation: string;
    examiner_report?: string;
}
export interface Question {
    id: string;
    exam: string;
    topic: string;
    learning_objective: string;
    difficulty: Difficulty;
    type: QuestionType;
    wiki_link: string[];
    answer: string;
    explanation: string;
    points: number;
    stem: string;
    options: AnswerOption[];
    parts?: Part[];
    examiner_report?: string;
    author?: string;
    year?: number;
    session?: string;
    /**
     * The exam this question was originally sat under, when the syllabus has
     * since moved the material to the exam named in `exam`. Set on the 2018
     * MAS-I sittings whose content CAS later moved to MAS-II.
     */
    originally_exam?: string;
    /**
     * Set on a question from a part of an old syllabus that no current exam
     * covers — the insurance-company valuation questions on the 2012–2019
     * Exam 7 papers. Kept for the record, not for study: `filterQuestions`
     * leaves it out of quiz draws unless a reader asks for its sitting, for it by
     * id, or searches for it.
     */
    off_syllabus?: boolean;
    /**
     * The question's VERIFY record — what has been checked about it, against what
     * source, and when. Undefined only for a file with no `verification:` block,
     * which CI does not allow into the bank.
     */
    verification?: Verification;
}
export interface QuestionFilter {
    exam?: string;
    topic?: string;
    topics?: string[];
    learningObjective?: string;
    learningObjectives?: string[];
    difficulty?: Difficulty;
    mode?: QuizMode;
    count?: number;
    /**
     * Where the quiz builder's difficulty slider sits (0 Easy … 1 Hard). Not a
     * filter — `filterQuestions` ignores it — but a lean on which `count`
     * questions are drawn. See lib/quizDifficulty.ts.
     */
    difficultyTarget?: number;
    author?: string;
    year?: number;
    session?: string;
    search?: string;
    ids?: string[];
    concept?: string;
    concepts?: string[];
    /**
     * Include questions the fact-check record flags as critically wrong. Off by
     * default — see `hasCriticalFinding`. Review surfaces turn it on so the
     * flagged questions can actually be fixed.
     */
    includeFlagged?: boolean;
    /**
     * Include questions no current syllabus covers (`off_syllabus`) even with no
     * sitting, id or search to ask for them — for surfaces that list the bank
     * rather than draw a quiz from it.
     */
    includeOffSyllabus?: boolean;
}
export type SelfGrade = 'correct' | 'partial' | 'incorrect';
export declare function normalizeAnswerText(s: string): string;
export declare function isAnswerCorrect(question: Question, chosen: string): boolean;
export type QuestionOutcome = 'correct' | 'partial' | 'incorrect';
export declare function questionCredit(question: Question, chosen: string | null | undefined, manualGrades?: Record<string, SelfGrade>): number;
export declare function questionOutcome(question: Question, chosen: string | null | undefined, manualGrades?: Record<string, SelfGrade>): QuestionOutcome;
export declare function isMultiPartAnswerComplete(question: Question, chosen: string): boolean;
export declare function parseQuestion(raw: string): Question | null;
export declare function estimateEssayScore(userAnswer: string, sampleAnswer: string): {
    matched: number;
    total: number;
    pct: number;
};
export declare function parseAllQuestions(rawFiles: string[]): Question[];
/**
 * True when `q` sits on `exam` only because the syllabus moved — it was written
 * for, and sat on, the paper of a different exam (`originally_exam`).
 *
 * Such a question keeps the `year`/`session` of the paper it really came from,
 * so those dates name a sitting of the *other* exam. Anything that reasons
 * about "this exam's sitting" has to skip it, or the transplanted date invents
 * a sitting that never happened — the CAS moved Time Series and Statistical
 * Learning from MAS-I to MAS-II, and the re-tagged MAS-I Spring 2018 questions
 * would otherwise conjure an "Exam MAS-II Spring 2018" paper, six months before
 * MAS-II was first sat.
 */
export declare function isFromAnotherExamsPaper(q: Question, exam: string): boolean;
/**
 * How a question's `learning_objective` is matched to a syllabus section. The
 * CAS content outlines letter their domains (`A. Ratemaking`) and the exam page
 * keeps the letter; a question names the domain by its words. So the letter is
 * dropped, with case and spacing, before comparing — `A. Ratemaking`,
 * `ratemaking` and `Ratemaking` are one objective. Mirrors `objective_key` in
 * scripts/syllabus_lib.py, which is what scripts/syllabus_lint.py holds every
 * bank to.
 */
export declare function objectiveKey(title: string): string;
export declare function filterQuestions(questions: Question[], filters: QuestionFilter): Question[];
