---
target: Concepts/Reserve Communication.md
created: 2026-10-31
---

## [F-001] ASOP 43 disclosure list omits the three dates and reliances, and overstates 'methods'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: major
- status: open
- locus: paragraph 'What ASOP 43 requires the actuary to disclose'
- claim: What ASOP 43 requires the actuary to disclose: the intended purpose and scope of the estimate, the basis (an actuarial central estimate, a range, or another target), the methods and key assumptions, any material assumption changes from the prior analysis, significant limitations and uncertainties, and whether the estimate is gross or net, discounted or undiscounted, and what it includes (indemnity, ALAE, ULAE, recoveries).
- evidence: ASOP 43 §4.1, pp.9-10 (PDF pp.14-15) requires: (a) intended purpose(s) or use(s); (b) significant limitations; (c) scope per §3.3; (d) 'the following dates: (1) the accounting date ... (2) the valuation date ... and (3) the review date'; (e) specific significant risks and uncertainties; (f) significant events, assumptions, or reliances, including assumptions provided by the principal or an outside party; (g)-(i) the ASOP 41 disclosures. §4.2 adds the basis of any range and, for an update, changes in assumptions, procedures, methods or models with a material impact (impact need not be quantified). The page's list omits the three dates of §4.1(d) — a standard exam point — and the reliances of §4.1(f). 'The methods' is not a general §4.1 disclosure: ASOP 43 asks for the method rationale only when a material component uses a single method (§3.6.1) and for method changes on an update (§4.2(b)); documentation otherwise goes to ASOP 41 (§3.8). The rest of the list matches §3.3 and §4.1-4.2.
- source_rank: 2
- proposed_action: Add the accounting, valuation and review dates (§4.1(d), with its example sentence if wanted) and reliances (§4.1(f)); qualify 'methods' to the single-method rationale and method changes.
- applied: false
- fingerprint: 61a3e5045420

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Example arithmetic recomputed: 5.2M + 1.9M + 0.9M = 8.0M = 50M − 42M. The disclosure paragraph diffed clause by clause against ASOP 43 §4.1(a)-(i) and §4.2(a)-(b) (F-001); 'basis' and gross/net/discount/expense-type items against §3.3(a)-(e); 'material assumption changes ... identified explicitly' against §4.2(b). Change decomposition (new exposure / run-off / re-estimation) against Friedland Ch.15 p.351 (changes for historical periods vs exposure for the current period). Audiences against Friedland Ch.1 pp.4-5 (internal management, investors, regulators) and task B18 (Fall 2026 outline p.5); SAO and Schedule P against Friedland Ch.1 p.6 and fn.5. Links resolve.
- sources_checked: ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§3.3, 3.6.1, 3.8, 4.1-4.2, pp.3-10 (PDF pp.8-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.4-5, 9-10 (PDF pp.10-11, 15-16); Ch.15 pp.350-351 (PDF pp.356-357), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Verified against ASOP 43 §§3-4 and Friedland Ch.1/15 with one open major finding (F-001: the ASOP 43 disclosure list omits the three dates and reliances, and overstates 'methods') — needs authoring, not fixed. Rating agencies and auditors as audiences, and 'the reserve is the least precise number on the balance sheet', are the page's own framing, not in either reading.
