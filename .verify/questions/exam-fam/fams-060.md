---
target: questions/exam-fam/fams-060.md
created: 2026-10-23
---

## [F-001] SOA solution slip silently corrected by the transcriber
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- severity: nit
- status: open
- locus: explanation, final calculation, first bracket
- claim: The explanation printed 0.80[2727.27 - 833.33].
- evidence: SOA FAM-S sample solutions p.27, Q60, prints '= 0.80[2727, 27 - 833.33]' (a comma for the decimal point) in the second line of the final calculation; the table above it gives E(X∧6000)=2727.27. The vault had corrected the figure without a note. Restored as printed with the '(as printed)' marker; no figure or the key (C, 2699.36) changes.
- source_rank: 1
- proposed_action: Mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: 04c4b4655dee

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
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q60, p.49, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q60, p.27, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Stem, formulas, tables and options match booklet p.49; explanation matches the SOA solution p.27 in method and figures, arithmetic resolves; answer equals the SOA key. Recompute: Breakpoint 14,000; 0.8[2727.27-833.33]+0.9[5000-3684.21]=2699.4 (C). SOA's printed '2727, 27' restored with '(as printed)' (F-001).
