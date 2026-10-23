---
target: questions/exam-fam/fams-095.md
created: 2026-10-23
---

## [F-001] SOA typo 'lost cost' kept without the as-printed marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- severity: nit
- status: open
- locus: explanation, both projection lines
- claim: 'AY3 lost cost projected…' and 'AY4 lost cost projected…', unmarked.
- evidence: SOA FAM-S sample solutions p.37, Q95, prints 'AY3 lost cost projected to May 1, AY6' and 'AY4 lost cost projected to May 1, AY6' (for 'loss cost'). Kept as printed; markers added.
- source_rank: 1
- proposed_action: Mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: 79b025578068

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
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q95, p.77, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q95, p.37, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Stem, formulas, tables and options match booklet p.77; explanation matches the SOA solution p.37 in method and figures, arithmetic resolves; answer equals the SOA key. Recompute: Average accident date May 1 CY6: 0.9·450e^{0.182(1.833)}+0.1·400e^{0.182(2.833)}=632.4 (D). SOA's 'lost cost' marked '(as printed)' (F-001).
