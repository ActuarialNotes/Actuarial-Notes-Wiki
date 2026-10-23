---
target: questions/exam-fam/fams-085.md
created: 2026-10-23
---

## [F-001] SOA variance-formula slip kept without the as-printed marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, Var(S) line
- claim: Var(S) = E(N)Var(X∧500) + E((X∧500)^2)Var(N) = 20(26,189), with no note.
- evidence: SOA FAM-S sample solutions p.34, Q85, prints exactly this line. The second term should be [E(X∧500)]^2 Var(N), the square of the mean (with Poisson N the two terms sum to λE[(X∧500)^2]=20(26,189), which the SOA uses). The vault transcribes the slip faithfully but unmarked; marker added. Key C unaffected (3137.82).
- source_rank: 1
- proposed_action: Mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: 0ff7d54e0dc4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: '(as printed)' marker added in this run; the explanation now reads as the SOA printed it, marked.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute before the key; stem, every formula, table cell and option diffed against the rendered booklet page; explanation diffed line by line against the rendered SOA solution page; answer = SOA key; wiki_link targets and topic page exist; validate_content.py clean
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q85, p.67, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q85, p.34, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Stem, formulas, tables and options match booklet p.67; explanation matches the SOA solution p.34 in method and figures, arithmetic resolves; answer equals the SOA key. Recompute: E(X∧500)=110.49, E S=2209.8, Var S=20(26,189); 90th pct 3137 (C). SOA's printed Var(S) slip marked '(as printed)' (F-001).
