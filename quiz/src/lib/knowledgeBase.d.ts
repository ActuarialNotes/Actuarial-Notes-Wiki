import { type AnswerOption, type Difficulty, type QuestionType } from './parser';
import { type VerificationStatus } from './verification';
/** Bumped whenever the shape below changes; the connector refuses a version it doesn't know. */
export declare const KNOWLEDGE_BASE_VERSION = 1;
/** Where the build emits the export, relative to the site root. */
export declare const KNOWLEDGE_BASE_ASSET = "ai/knowledge-base.json";
/** One row of `scripts/exam_catalog.json` — the pinned list of exam pages. */
export interface ExamCatalogRow {
    page: string;
    exam_id: string;
    wiki_id: string;
    progress_key: string;
    body: string;
    bank: string | null;
    status: string;
}
export interface KeystoneSource {
    id: string;
    concepts: {
        name: string;
        why: string;
    }[];
}
export interface KnowledgeBaseSources {
    /**
     * Repo-relative path → markdown for every page: the root `Exam *.md` pages,
     * `Concepts/`, `Resources/**` and `Guides/**`.
     */
    pages: Record<string, string>;
    /** Repo-relative path (`questions/<bank>/<file>.md`) → markdown. */
    questions: Record<string, string>;
    catalog: ExamCatalogRow[];
    /** `scripts/concept_aliases.json` → `aliases`: normalised variant → concept page. */
    aliases: Record<string, string>;
    keystones: KeystoneSource[];
    site: {
        /** Public origin of the app, e.g. `https://quiz.actuarialnotes.com`. */
        url: string;
        /** `owner/name` of the vault's GitHub repository. */
        repo: string;
        branch: string;
        commit?: string | null;
        builtAt: string;
    };
}
export interface KbFactCheck {
    status: VerificationStatus;
    /** The verdict the in-app Fact Check badge shows, e.g. "Not fact checked". */
    label: string;
    detail: string;
    /** ISO date of the last check, or null. */
    checked: string | null;
    sources: {
        label: string;
        url: string | null;
        locator: string | null;
    }[];
    openFindings: number;
    openCritical: number;
}
export type KbDocKind = 'exam' | 'concept' | 'resource' | 'guide';
export interface KbDoc {
    /** Stable id: `concept/Bayes Theorem`, `exam/P`, `resource/…`, `guide/…`. */
    id: string;
    kind: KbDocKind;
    title: string;
    /** Repo-relative path of the source file. */
    path: string;
    /** Where a person reads it: the app's page when it has one, else GitHub. */
    url: string;
    /** The page body as plain markdown — frontmatter, HTML and Obsidian syntax removed. */
    text: string;
    /** The first paragraph, flattened, for search results. */
    summary: string;
    /** Titles of the vault pages this one links to, in order of first mention. */
    links: string[];
    /** Exam keys the page belongs to (a syllabus concept, a syllabus reading, an exam's guide). */
    exams: string[];
    /** Other names the page is known by. */
    aliases: string[];
    /** Front-matter metadata worth showing (author, year, jurisdiction, source links…). */
    meta: Record<string, string | number | boolean | string[]>;
    factCheck: KbFactCheck;
}
export interface KbObjective {
    title: string;
    /** The share of the exam, as the page writes it (`23–30%`), or null. */
    weight: string | null;
    /** Concept names in the order the syllabus introduces them. */
    concepts: string[];
}
export interface KbReading {
    title: string;
    /** The chapters or sections assigned, as the page writes them. */
    detail: string | null;
    /** The reading's own resource page, when the vault has one. */
    docId: string | null;
}
export type KbExamStatus = 'ready' | 'beta' | 'development';
export interface KbExam {
    /** The short key an assistant passes around: `P`, `FM`, `MAS-I`, `5`, `6C`… */
    key: string;
    /** The exam page's own id (`P-1`, `FM-2`, `5`). */
    examId: string;
    name: string;
    body: string;
    subject: string;
    status: KbExamStatus;
    docId: string;
    url: string;
    summary: string;
    objectives: KbObjective[];
    readings: KbReading[];
    keystones: {
        name: string;
        why: string;
    }[];
    guides: {
        id: string;
        title: string;
    }[];
    /** `questions/<bank>/`, or null for an exam with no question bank yet. */
    bank: string | null;
    /** Questions a practice set may draw (withheld and off-syllabus ones excluded). */
    questionCount: number;
}
export interface KbQuestionPart {
    label: string;
    points: number;
    stem: string;
    type: 'multiple-choice' | 'free-entry';
    options: AnswerOption[];
    /** '' for an essay part, which has a model answer but no key. */
    answer: string;
    explanation: string;
    examinerReport: string | null;
}
export interface KbQuestion {
    id: string;
    /** Exam key of the bank the question sits in. */
    exam: string;
    bank: string;
    path: string;
    /** Opens the question in the app. */
    url: string;
    topic: string;
    objective: string;
    difficulty: Difficulty;
    type: QuestionType;
    points: number;
    /** Concept page names the question is tagged with. */
    concepts: string[];
    /** `Fall 2013`, `2019`, or null when the question names no sitting. */
    sitting: string | null;
    originallyExam: string | null;
    offSyllabus: boolean;
    stem: string;
    options: AnswerOption[];
    answer: string;
    explanation: string;
    examinerReport: string | null;
    parts: KbQuestionPart[] | null;
    factCheck: KbFactCheck;
}
export interface KnowledgeBase {
    version: typeof KNOWLEDGE_BASE_VERSION;
    builtAt: string;
    commit: string | null;
    site: string;
    repo: string;
    branch: string;
    counts: {
        exams: number;
        concepts: number;
        resources: number;
        guides: number;
        questions: number;
        withheld: number;
    };
    exams: KbExam[];
    docs: KbDoc[];
    questions: KbQuestion[];
    /** Questions kept out of the export, and why. */
    withheld: {
        id: string;
        exam: string;
        reason: string;
    }[];
    /** Normalised variant (see {@link normalizeTerm}) → concept page name. */
    aliases: Record<string, string>;
}
/**
 * The key a name is looked up by: lower-case, accents folded (`Bühlmann` →
 * `buhlmann`), apostrophes dropped, hyphens and underscores as spaces. Mirrors
 * `normalize_term` in scripts/vault_links.py, which is how the curated
 * `concept_aliases.json` keys are written — plus the accent fold, since a
 * reader types "Buhlmann". `quiz/api/_mcp/knowledgeBase.js` normalises the
 * same way at run time.
 */
export declare function normalizeTerm(value: string): string;
/** `P-1` → `P`, `FM-2` → `FM`; every other exam id is already its key. */
export declare function examKeyFromExamId(examId: string): string;
/**
 * Obsidian markdown → markdown any reader understands. Links become their
 * display text (the page list travels separately in `links`), embedded figures
 * become a link to the image, callout headers become bold lines, and the
 * frontmatter, HTML chrome and `%%comments%%` go. LaTeX is left alone: models
 * read it natively, and every formula stays exactly as authored.
 */
export declare function cleanVaultMarkdown(markdown: string, repo: string, branch: string): string;
/** Titles of the pages a markdown file links to, in order, without embeds. */
export declare function extractLinkTitles(markdown: string): string[];
/** The first paragraph of cleaned markdown, flattened to one line of prose. */
export declare function summarize(text: string, max?: number): string;
/**
 * The two filesystem calls the collector needs, passed in so this module stays
 * free of Node imports (it is type-checked with the app). Paths are
 * repo-relative; `''` is the vault root.
 */
export interface VaultReader {
    /** Entries of a directory, or [] when it doesn't exist. */
    list(dir: string): Promise<{
        name: string;
        isDirectory: boolean;
    }[]>;
    /** A file's text, or null when it can't be read. */
    read(path: string): Promise<string | null>;
}
/**
 * Everything the knowledge base is built from. This is the one list of which
 * vault directories an assistant can read — the root exam pages, `Concepts/`,
 * all of `Resources/`, `Guides/` and the question bank — so add a new content
 * directory here as well as to the app's own collectors in vite.config.ts.
 */
export declare function readKnowledgeBaseSources(vault: VaultReader): Promise<Pick<KnowledgeBaseSources, 'pages' | 'questions' | 'catalog' | 'aliases'>>;
export declare function buildKnowledgeBase(sources: KnowledgeBaseSources): KnowledgeBase;
/**
 * `/llms.txt` — the llmstxt.org convention: a short markdown index an assistant
 * that is only browsing the site can read to find its way around, pointing it
 * at the connector for anything deeper.
 */
export declare function buildLlmsTxt(kb: KnowledgeBase, connectorUrl: string, skillUrl: string): string;
