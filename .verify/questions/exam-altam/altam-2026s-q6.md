---
target: questions/exam-altam/altam-2026s-q6.md
created: 2026-10-23
---

## [F-001] SOA slips unmarked in (a), (c) and (d)(ii)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a Explanation and Examiner Report; Part c Explanation and Examiner Report; Part d Explanation (ii)
- claim: (a) 'p(0) = 37,544.2 − 121,242.8 = 16,301.4'; comment 2 'part (i)' for part (a); (c) 'lognnormal' twice; (d)(ii) ä_{80_i}; no markers.
- evidence: Model solutions p.13 print 121,242.8 where 21,242.8 is meant (37,544.2 − 21,242.8 = 16,301.4; F0(1−m)^10 Φ(−d1) = 81,298.7 × 0.26129 = 21,242.8, the figure (b)(i) uses), and refer to part (a) as 'part (i)'; p.14 print 'lognnormal' in the solution and in comment 3; p.15 write the annuity at rate i as ä_{80_i}. All A.7. Kept as printed with markers.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: d60cff7fcffa

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked in place with " (as printed)" after the slip, the vault convention (P1: the vault transcribes the publisher, it does not correct it); the figures themselves are unchanged and match the page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation before reading the key (SULT/SUSM recomputed from Makeham A=0.00022, B=2.7e-6, c=1.124 at 5%%); stem, tables and every formula diffed against the rendered question pages; explanation diffed line by line against the rendered model-solution pages; examiners' comments checked verbatim and filed under the right part; diagrams compared with the page; points, type, topic and wiki_link targets checked (all exist)
- sources_checked: SOA Exam ALTAM Spring (April) 2026 – exam (questions), Q6, pp.12-13, sha256:be424c84e360f858fda955257513b27618d695b7e05cae80fca475145f90a9aa — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-exam.pdf; SOA ALTAM Spring 2026 Model Solutions and Examiners' Comments, Q6, pp.13-15, sha256:ca1bffa86e9b64729358c65e002dc38c533661dda14693310f8b3cddc852b4d6 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-altam-solutions.pdf
- note: Recompute: ξ = 0.812987, d1 0.63936, d2 −0.15121, p(0) 16,301.37, 10p70 0.830645, π(0) 13,540.65; stock part −17,645; in-the-money probability 0.29528; GMIB 15,543; ä80 at 5% 8.5484 < 9.524 so j < 5% — equal to the SOA's. A.7's '10p70 0.83064 vs 0.830645' is rounding, not marked. Printed slips marked (F-001).
