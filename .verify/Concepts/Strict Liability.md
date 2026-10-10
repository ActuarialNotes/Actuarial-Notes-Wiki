---
target: Concepts/Strict Liability.md
created: 2026-10-10
---

## [F-001] Dram shop acts presented as strict liability
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: major
- status: open
- locus: Statutory strict liability bullet; 'A Dram Shop Claim' example; tip callout
- claim: Dram shop acts are listed as statutory strict liability, and the example says the bar's liability 'requires no proof of negligence'.
- evidence: Cornell LII Wex 'dram shop rule' (reviewed July 2025): dram shop laws hold sellers liable for serving visibly intoxicated or underage patrons, and 'These laws are usually based on negligence and not strict liability.' Some states' acts do impose liability without fault, so the page's general statement and the example's 'no proof of negligence' are not true as a general U.S. rule. The DISC-IA reading (The Institutes) could not be read, so whether the course classes dram shop liability as statutory strict liability is unknown; this is a conflict between the page and the only source read, not a confirmed error.
- source_rank: 3
- proposed_action: Reword to say dram shop liability varies by state (strict in some, negligence-based in most per LII), or confirm against the Institutes text; the same claim is in discia-an-229's explanation of option B. Maintainer or course-text decision.
- applied: false
- fingerprint: 2a532b955505

## [F-002] Livestock trespass rule not found in a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Animals bullet, last sentence
- claim: Owners of livestock are traditionally strictly liable when their animals trespass on others' land.
- evidence: Not stated in any source read this run (LII 'strict liability', 'one-bite rule', 'abnormally dangerous activity', 'ultrahazardous activity'). It is the traditional Restatement (Second) s.504 rule, but that text was not read.
- source_rank: 5
- proposed_action: Cite a source for the livestock rule or drop the sentence.
- applied: false
- fingerprint: 1ba4d89712ed

## [F-003] Links Canadian-framed workers compensation and vicarious liability pages
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Statutory strict liability and vicarious liability bullets
- claim: The U.S. statements about workers compensation and respondeat superior link [[Workers Compensation Insurance]] and [[Vicarious Liability]].
- evidence: DISC-IA is a U.S. course. The linked page is written for Exam 6C: Concepts/Workers Compensation Insurance.md is 'in Canada ... a provincially administered social insurance program' and Concepts/Vicarious Liability.md is framed on Canadian auto owner liability ('the version that matters on 6C'). The U.S. rules the bullets state are on LII Wex 'workers compensation' and 'respondeat superior'.
- source_rank: 3
- proposed_action: Point the links at U.S. treatments (Workers Compensation Underwriting exists for DISC-RM; Tort Law carries the U.S. respondeat superior bullet).
- applied: false
- fingerprint: 1d4df8192737

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: in_review
- checks_run: every definition, rule and list against the sources cited; worked examples recomputed; every [[link]] resolves; U.S. framing of links
- note: Checked against LII Wex (strict liability, abnormally dangerous activity, ultrahazardous activity, one-bite rule, dram shop rule, workers compensation, vicarious liability, respondeat superior), 42 U.S.C. s.9607 via LII (sha256:44d4821fc4607bf9e56abf0eb70b7b5966b58fa03e5e2e4b081c321b7fe4e1f0), Webb v. Zern (402A) and CG 00 01 04 13 exclusions c (liquor) and f (pollution). Rylands 1868, s.520 factors, wild/domestic animal rules, workers compensation, CERCLA and 402A agree. Examples recomputed (0.4*90,000=36,000; 100,000+150,000=250,000). Held in_review on the open major finding: the dram shop classification contradicts the one source read, and the course text that might support it could not be reached.
