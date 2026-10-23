---
target: questions/exam-altam/altam-2026s-q5.md
created: 2026-10-23
---

## [F-001] SOA slip unmarked: 0.13890 in the sum
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, Explanation (i)
- claim: Sum reads 0.04744 + 0.13890 − 0.17900 = 0.008236 with no marker.
- evidence: Model solutions p.11 compute A^1_{71:10} = 0.13980 one line above and write 0.13890 in the sum; the result 0.008236 follows 0.13980 (my SUSM recompute: 0.047436 + 0.139801 − 0.179000 = 0.008236). Kept as printed with marker (A.7).
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: 841bcb10eabc

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
- sources_checked: SOA Exam ALTAM Spring (April) 2026 – exam (questions), Q5, pp.10-11, sha256:be424c84e360f858fda955257513b27618d695b7e05cae80fca475145f90a9aa — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-exam.pdf; SOA ALTAM Spring 2026 Model Solutions and Examiners' Comments, Q5, pp.10-12, sha256:ca1bffa86e9b64729358c65e002dc38c533661dda14693310f8b3cddc852b4d6 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-altam-solutions.pdf
- note: Recompute (SUSM): 1000·q51·q61 = 0.00505; AV1 = 8,856.90; AV7 both alive 110,139.0, X only 107,919.1; A^1 last-survivor 0.008236; reserves 0 and 12,800.5 — equal to the SOA's. A.7's '(iii) 139,800.5' is not a slip: 10^6·A^1_{71:10} = 139,800.5 exactly (0.1398005), no marker. One printed slip marked (F-001).
