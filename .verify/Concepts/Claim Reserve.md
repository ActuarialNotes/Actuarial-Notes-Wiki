---
target: Concepts/Claim Reserve.md
created: 2026-10-31
---

## [F-001] Exam 5 links 'reserve analysis' to a page written for group health
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: whole page (lead, line 14); Exam 5 (CAS).md tasks B16, B20
- claim: The page defines a claim reserve as the liability a health or group insurer holds, with completion factors and disabled life reserves (GH-201, CP-321 context).
- evidence: Exam 5 (CAS).md links B16 'Evaluate the results of a [[Claim Reserve|reserve]] analysis' and B20 'in a [[Claim Reserve|reserve]] analysis' here. In Exam 5's reading the quantity is the P&C unpaid claim estimate: Friedland Ch.1 pp.13-14 (PDF 19-20) uses ASOP 43's 'unpaid claim estimate' (case outstanding plus broad IBNR) and keeps 'reserve' for the booked amount. Nothing on this page covers that sense. The CAS and SOA usages legitimately differ, so this is flagged, not reconciled.
- source_rank: 2
- proposed_action: On Exam 5 (CAS).md, relink B16 and B20 'reserve analysis' to [[Unpaid Claims]] (the P&C page), or add a P&C note here. Decision for a maintainer.
- applied: false
- fingerprint: 838bbb426a13

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- status_set: in_review
- checks_run: Friedland searched for P&C usage (Ch.1 pp.13-14, PDF 19-20). Health content (completion factors, PVANYD/ICOS, DLR, ASOP 5 definition) not checked against a source. Both examples recomputed independently (volume-weighted factors 2.0529/1.1169/1.0318/1.0101; CF 0.4185-0.9900; reserve 850.5 and 762.8; PMPM 110.10; DLR 86,325 and 103,899). Rank 5: they agree with the page but cannot confirm it.
- note: Not verified: this page is written for GH-201/CP-321, and its sources (the SOA group health reserving readings and ASOP 5) were outside this Friedland packet and were not fetched. Needs a pass against those readings. One minor finding on the Exam 5 link target.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:claude
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Exam 5 (CAS).md B16 and B20 now link 'reserve' to [[Loss Reserving]] (commit 0aa16da6); the delta pass in run 2026-10-31T13:42Z/4730 re-verified the exam page with that link. This page is no longer on Exam 5.
