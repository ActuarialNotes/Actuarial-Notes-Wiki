/**
 * The read side of VERIFY — the content-validation layer that records what has
 * been checked, against what source, by whom, and when. **Fact Check** is what
 * that layer is called on screen; the vault's own schema keeps the older
 * `verification:` spelling, so this module reads one and speaks the other.
 *
 * The vault is the source of truth. Every content file carries a `verification:`
 * block in its frontmatter (written and policed by `scripts/verify_check.py`);
 * this module parses that block, and the append-only sidecar log that backs it,
 * for the Fact Check surfaces that show a student what has been checked.
 *
 * Two things worth keeping straight:
 *
 *  - The block is *bound to the bytes of the file*, not to its name. A file
 *    edited after being verified is downgraded to `stale` by tooling, so a green
 *    badge always describes the text actually on screen.
 *  - Sidecar logs are deliberately **not** bundled at build time. They grow
 *    without bound and only matter when a reader opens the log panel, so
 *    `fetchVerificationLog` pulls one on demand. Everything the badge needs —
 *    status, date, open-finding count — is in the block itself.
 */
export type VerificationStatus = 'unverified' | 'in_review' | 'verified' | 'disputed' | 'stale';
export type VerificationConfidence = 'high' | 'medium' | 'low';
export interface Verification {
    status: VerificationStatus;
    confidence: VerificationConfidence | null;
    /** ISO `YYYY-MM-DD`, or null when the page has never been checked. */
    lastChecked: string | null;
    /** `agent:validate-v1` or `human:jordan`, or null when never checked. */
    lastCheckedBy: string | null;
    contentHash: string;
    sources: string[];
    openFindings: number;
    /**
     * How many of those are `critical`. Carried in the block rather than derived
     * from the log because sidecar logs are not bundled at build time, and the
     * quiz needs severity to decide what to exclude from a session.
     */
    openCritical: number;
    /** Repo-relative path of the sidecar log, e.g. `.verify/Concepts/Convexity.md`. */
    log: string;
}
/** The block every page falls back to: nothing claimed, nothing checked. */
export declare const UNVERIFIED: Verification;
/**
 * Read the `verification:` block out of already-parsed frontmatter attributes.
 * Unknown or malformed values degrade to the `unverified` default rather than
 * throwing — a page must still render when its block is wrong; CI is what fails
 * on a malformed block, not the reader.
 */
export declare function verificationFromAttributes(attrs: unknown): Verification | null;
/** Parse the block straight out of a markdown file's raw text. */
export declare function parseVerification(markdown: string): Verification | null;
/** Where a content file's sidecar log lives. Mirrors `verify_lib.log_path_for`. */
export declare function verificationLogPath(contentPath: string): string;
/**
 * Recover a page's own vault path from its block.
 *
 * Questions reach the app as raw markdown with no filename attached — the build
 * collects file *contents*, and a question's `id` doesn't map to its filename
 * (`cas5-2013f-q1` lives in `cas5-2013f-001.md`). But `log:` is that path with
 * `.verify/` on the front, and CI enforces that it is correct, so the block
 * carries the answer already.
 */
export declare function contentPathFromVerification(v: Verification | null | undefined): string | null;
export type FactCheckTone = 'green' | 'amber' | 'grey' | 'red';
export interface FactCheckBadge {
    label: string;
    /** The same verdict in one or two words, for a dense row or a menu pill. */
    short: string;
    tone: FactCheckTone;
    /** One sentence explaining what the badge actually promises. */
    detail: string;
}
/** `2026-08-12` → `12 Aug 2026`. Parsed by hand: `new Date('2026-08-12')` is UTC. */
export declare function formatCheckedDate(iso: string | null): string | null;
/**
 * What to show a student — the verdict the **Fact Check** surfaces read out.
 * Deliberately conservative: only a page whose status is `verified` *and* whose
 * hash still matches gets the green badge, and a page carrying an open finding
 * says so even when it was verified, because an open finding is exactly the
 * thing a reader needs to know about.
 */
export declare function factCheckBadge(v: Verification | null | undefined): FactCheckBadge;
export type LogEntryType = 'finding' | 'correction' | 'comment' | 'question' | 'resolution';
export type LogEntrySeverity = 'critical' | 'major' | 'minor' | 'nit';
export type LogEntryStatus = 'open' | 'resolved' | 'wontfix' | 'superseded';
export interface LogEntry {
    id: string;
    title: string;
    entryType: LogEntryType | '';
    author: string;
    date: string;
    severity: LogEntrySeverity | '';
    status: LogEntryStatus | '';
    resolves: string;
    /**
     * Whether the correction this finding proposed has already been made to the
     * page. Independent of `status`: a fix can land before a human signs the
     * finding off, and the Fact Check panel marks such a row so a reader can see
     * that the text in front of them has already been changed.
     */
    applied: boolean;
    /** Every `- key: value` field, in source order, for display. */
    fields: Array<{
        key: string;
        value: string;
    }>;
}
export interface VerificationLog {
    target: string;
    created: string;
    entries: LogEntry[];
}
/**
 * Parse a sidecar log. Tolerant on purpose — a human can open one of these in
 * Obsidian and append a comment by hand, and their entry has to survive the
 * round trip into the next agent sweep verbatim.
 */
export declare function parseVerificationLog(raw: string): VerificationLog;
/**
 * Findings still open, accounting for later resolutions. Nothing in a log is
 * ever edited, so "is it still open" is always a question about what came after.
 */
export declare function openFindings(log: VerificationLog): LogEntry[];
export declare function openCriticalFindings(log: VerificationLog): LogEntry[];
export interface SourceSummary {
    /** The source's name — what a reader recognises it by. */
    label: string;
    /** Where it can be read, when the citation names a URL. */
    url: string | null;
    /** The chapters, sections and pages the claim was checked on. */
    locator: string | null;
}
/**
 * Cut a cited source into the three parts worth printing.
 *
 * A citation is written for an auditor, not a reader: it carries the URL, a
 * sha256 of the exact file that was read, a version string and the pages the
 * claim was checked on. The hash and the version have to stay in the vault — it
 * is what makes the check reproducible — but on screen they bury the two things
 * a student wants, which are *which book* and *which pages*. So the name
 * becomes the card's title, the pages become the line under it, the URL becomes
 * the way to go and read it, and the fingerprint doesn't reach the screen at
 * all.
 */
export declare function summarizeSource(raw: string): SourceSummary;
export interface LogEntryGroup {
    entry: LogEntry;
    /** The later entry that closed it, when one exists. */
    closedBy: LogEntry | null;
}
/**
 * A page's log, split into the three things a reader is actually asking:
 * what is still wrong, what has been put right, and what people have said.
 */
export interface LogSummary {
    /** Open findings, worst first. */
    open: LogEntryGroup[];
    /** Findings something later closed, plus standalone corrections. */
    resolved: LogEntryGroup[];
    /** Comments and questions — reader reports, mostly. */
    notes: LogEntryGroup[];
}
export declare function summarizeLog(log: VerificationLog): LogSummary;
/** One `- key: value` field of an entry, or '' when it has none. */
export declare function logField(entry: LogEntry, key: string): string;
export interface EvidenceSummary {
    /** The evidence as prose, with the auditor's fingerprints taken out. */
    text: string;
    /** The links it cited, in order, so they can be offered as links. */
    links: string[];
}
/**
 * Evidence as a reader can read it.
 *
 * An `evidence:` line is where a finding says what the source says, and it is
 * the other half of the diff the panel draws against what the page said. Most
 * of it is plain prose, but a citation inside it carries what `summarizeSource`
 * cuts off a source line — a sha256 of the file that was read, and the URL it
 * was read at — usually in the middle of a sentence ("… REFERENCES pp.5-7,
 * sha256:bed2…, https://…. p.5 lists …"). Both come out, the URL to be offered
 * as a link instead, and the separators they leave behind are tidied. Text with
 * neither is returned exactly as written: the tidying is only ever a repair of
 * what the cut left, never an edit of the finding.
 */
export declare function summarizeEvidence(raw: string): EvidenceSummary;
/**
 * What became of a finding — the line under the diff.
 *
 * `fixed` / `wontfix` / `superseded` are the three ways something later in the
 * log (or the finding's own status) closes it, with the date it was closed and
 * what the closing entry said. `applied` is an open finding whose correction
 * has already been made to the page; `proposed` is one still waiting for it.
 */
export type FindingOutcome = {
    kind: 'fixed' | 'wontfix' | 'superseded';
    date: string;
    note: string;
} | {
    kind: 'applied' | 'proposed';
    note: string;
};
export declare function findingOutcome(group: LogEntryGroup): FindingOutcome | null;
/**
 * Should this page be kept out of a quiz session by default?
 *
 * True when something critical is on file about it: an unresolved critical
 * finding, or a `disputed` status (which means either sources conflict or a
 * critical finding is unresolved). Serving a student a question that the record
 * says is wrong is the exact failure this whole layer exists to prevent — but it
 * is a *default*, not a lock, because reviewing flagged questions is how they get
 * fixed. `hooks/useShowFlaggedQuestions.ts` is the toggle.
 */
export declare function hasCriticalFinding(v: Verification | null | undefined): boolean;
