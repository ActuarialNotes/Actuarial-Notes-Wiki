---
target: Concepts/Reasonableness Testing.md
created: 2026-10-16
---

## [C-001] Exam 5, Exam 8 and most Exam 7 claims need sources outside this packet
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rca
- date: 2026-10-16
- locus: whole page
- note: Checked in the Exam 7 reading packet Brosius / Mack (2000) / Hurlimann. Those readings support one claim on the page: 'A credibility-weighted estimate should lie between the chain ladder and the a priori' (Mack 2000 s.2 p.335, U_c = cU_CL + (1-c)U_0 with c in [0,1]; Brosius Development Formula 2 p.13, L = Z x/d + (1-Z)E(Y); Hurlimann (3.1)). None of the three states the rest: the Exam 5 ratemaking/reserving/monitoring bullets (Werner & Modlin, Friedland), the excess-layer and net-vs-gross checks (Sahasrabuddhe, Siewert, Friedland 2022), Shapland's standard-error/CoV patterns, Meyers' uniformity test with the 136/sqrt(n) K-S band, the 'slanted S = light tails' reading and Meyers' finding for Mack on incurred data. A later pass needs Shapland (CAS Monograph #4), Meyers (CAS Monograph #8, 2nd ed.) and Friedland's Exam 5 text. Recomputation (rank 5, can only falsify) found no arithmetic error in the three examples: 1,030/845 = 1.219; 1.03 x 1.02 x 1.02 = 1.072; E = 6,000 x 0.30/0.50 = 3,600, A/E = 1.25, CL 13,125, BF 12,900; 136/sqrt(200) = 9.6, 136/sqrt(50) = 19.2. The expected-emergence identity follows from IBNR = Ult x (1 - p_t) for both CL and BF.

## [C-002] Suggestion for a writer: the Exam 7 checks Brosius states
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rca
- date: 2026-10-16
- locus: Unpaid claim estimates (Exam 7) bullet
- note: Not a finding (what a topic covers is a writer's call). Brosius, the first reading on Exam 7's A3/A11 lines, states reasonableness checks the page does not mention: intervene when a least-squares fit gives a < 0 (substitute the link ratio method) or b < 0 (substitute the budgeted loss method), p.4; and across a triangle Z should rise, and c and a fall, as years mature, 'a way to cross-check the work ... one should not believe the analysis if it makes no sense', p.18. Mack (2000) s.7 adds that its mse formulas assume the prior U_0 is independent of the observed claims, so a prior adjusted during development defeats them.

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rca
- date: 2026-10-16
- status_set: in_review
- checks_run: objective lines that link the page read (Exam 7 A3 and A11, Exam 5 A4/B2/B17, Exam 8); claims sorted by which reading states them; the one claim this packet's readings cover checked against Mack 2000 s.2 and Brosius Formula 2; all three worked examples recomputed (rank 5); wiki-links resolve
- sources_checked: CREDIBLE CLAIMS RESERVES: THE BENKTANDER METHOD, Section 2, p.335 (credibility mixture U_c = cU_CL + (1-c)U_0), sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086 — https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf; https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf, Development Formula 2, p.13; parameter checks p.4; Table 9 cross-check p.18, sha256:de06a701db8825c8a6384bf92f577a5fe6ccfab627379f21199df35396a2a690 — https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf
- note: in_review, not verified: most of the page rests on Shapland, Meyers and Friedland, none read in this packet. See the comment for what still needs a source.

## [F-001] BF IBNR is the a priori, not the BF ultimate, times 1 - p_t
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rta
- date: 2026-10-16
- severity: critical
- status: open
- locus: first bullet, second sentence (expected-emergence formula)
- claim: It holds for both chain ladder and BF IBNR, because each equals its own ultimate times 1 - p_t.
- evidence: Friedland (Exam 5) ch.9 p.154: BF expected unreported claims = expected claims x percentage unreported (1 - 1/CDF); i.e. BF IBNR = a priori x (1 - p_t), not BF ultimate x (1 - p_t). Recomputed on the page's own example: BF ultimate 12,900 x 0.20 = 2,580, while BF IBNR = 12,000 x 0.20 = 2,400. The displayed formula itself is Friedland ch.15 p.351 ([(selected ult - reported)/% unreported] x change in % reported) and does hold for BF, because (Ult - Rep)/(1 - p_t) is the a priori; only the stated reason is a wrong identity a student could carry into a BF IBNR calculation.
- source_rank: 2
- proposed_action: Restate the reason to Friedland: chain ladder IBNR is its ultimate times 1 - p_t, BF IBNR is the expected claims times 1 - p_t.
- applied: false
- fingerprint: c08f9d95609d

## [F-002] Net IBNR can exceed gross; 'never' contradicts Friedland
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rta
- date: 2026-10-16
- severity: major
- status: open
- locus: Unpaid claim estimates (Exam 7) bullet, last sentence
- claim: net should never exceed gross.
- evidence: Friedland (Exam 5) ch.14 p.331: 'one of the first checks ... is that net claim and net premium data are equal to or less than the gross data'; p.332: 'net IBNR in each accident year is generally not greater than gross IBNR', fn 81: 'There are times when the net IBNR will be greater than the gross IBNR' (uncollectible reinsurance carried in net IBNR only; a runoff book with reinsurance disputes such as asbestos). The page's 'never' drops that qualification.
- source_rank: 2
- proposed_action: Restate to Friedland: net claims and premium should not exceed gross, and net IBNR is generally no greater than gross IBNR.
- applied: false
- fingerprint: 5bbe54e5c648

## [F-003] Development of excess vs ground-up: 'ceded amounts' overgeneralises
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rta
- date: 2026-10-16
- severity: minor
- status: open
- locus: Unpaid claim estimates (Exam 7) bullet, excess-layer sentence
- claim: Excess layers and ceded amounts should develop more slowly than ground-up losses
- evidence: Friedland, Reserving for Reinsurance (2022) ch.3 pp.61-62: reinsurance shows 'longer (i.e., slower) reporting and payment patterns' than primary insurance, and non-proportional (excess) longer than proportional, which 'attaches on a ground-up basis'. Neither Friedland text says ceded amounts in general develop more slowly: a quota-share cession is a share of ground-up losses, and Friedland (Exam 5) ch.14 p.331 fn 80 notes exceptions even for net vs gross development. Sahasrabuddhe and Siewert were searched and state no such check.
- source_rank: 2
- proposed_action: Restate to Friedland 2022: reinsurance should show longer reporting and payment patterns than primary insurance, and excess (non-proportional) cover longer than proportional.
- applied: false
- fingerprint: 5cabf09feda4

## [F-004] Shapland: CoVs generally fall, and may rise again in the latest years
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rta
- date: 2026-10-16
- severity: minor
- status: open
- locus: Distribution output (Exam 7) bullet
- claim: standard errors rising toward recent years, CoVs falling
- evidence: Shapland (2016) s.5.5.1 pp.41-42: standard error 'should increase when moving from the oldest years to the most recent years'; CoVs 'should generally decrease ... While the coefficients of variation should go down, they could also start to rise again in the most recent years' (parameter uncertainty). The page's unqualified 'falling' would mark a legitimate recent-year rise as a failure. Standard-error pattern and min/max plausibility (p.43) confirmed.
- source_rank: 2
- proposed_action: Change 'CoVs falling' to 'CoVs generally falling'.
- applied: false
- fingerprint: 74f199ebe8ea

## [F-005] Ratemaking sub-bullets not stated by Werner & Modlin or ASOP 23
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rta
- date: 2026-10-16
- severity: minor
- status: open
- locus: Ratemaking data and analyses (Exam 5) bullet, four sub-bullets
- claim: Reconcile premium and losses to the financial records (Data Quality, ASOP 23). Compare the extract with the prior one. Check average premium, severity, frequency and loss ratio by year for jumps that rate changes and trend do not explain. Confirm that exposure definitions and coding have not changed.
- evidence: Full-text search: 'reconcil' occurs zero times in Werner & Modlin (2016) and in ASOP 23 (2016). W&M ch.3 p.37: 'the actuary should review the data for appropriateness for its intended purpose and reasonableness and comprehensiveness of the data elements', citing ASOP 23. ASOP 23 s.3.3: review whether data are reasonable 'with particular attention to internal consistency' and 'consider comparing current data with the data used in the prior analysis ... if such consistency can reasonably be expected'. W&M ch.6 p.106: review losses at the first development age to see whether they are 'generally consistent from year to year, with consideration for loss trends and any changes in the portfolio'; if 'dramatically different', examine claim counts. The reconciliation and coding checks are Friedland's reserving checks (ch.3 p.37, ch.4), not the ratemaking readings'; the average-premium jump test is not stated in that form.
- source_rank: 2
- proposed_action: Restate the sub-bullets to W&M p.37, ASOP 23 s.3.3 and W&M p.106.
- applied: false
- fingerprint: 9e89869d0adf

## [F-006] Implied-ratio list differs from Friedland's
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rta
- date: 2026-10-16
- severity: minor
- status: open
- locus: Reserving data and analyses (Exam 5) bullet
- claim: ultimate claim ratios, severities, frequencies and pure premiums by year, IBNR-to-case, and paid-to-ultimate.
- evidence: Friedland ch.15 p.346: 'An important final check of the selected ultimate claims ... should include calculation of claim ratios, severities, pure premiums, and claim frequencies ... Another valuable test ... is the implied average case outstanding and unreported claim on open and unreported claims.' IBNR-to-case and paid-to-ultimate are not in that list.
- source_rank: 2
- proposed_action: Replace 'IBNR-to-case, and paid-to-ultimate' with Friedland's implied average case outstanding and unreported claim.
- applied: false
- fingerprint: 76341b2557f9

## [F-007] Unsourced prescription in the A/E example
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rta
- date: 2026-10-16
- severity: minor
- status: open
- locus: Example 'Actual Versus Expected at an Interim Valuation', last paragraph
- claim: One period's A/E is not yet a trend. Before choosing, check whether the excess came from one large claim (then a BF-type response is right) or from broad-based emergence (then the pattern may have changed). Paid A/E and counts will tell which.
- evidence: Friedland ch.15 pp.350-351, the reading for the monitoring objective, says only that actual-to-expected comparisons let the actuary 'understand the appropriateness of prior selections and make revisions as necessary if actual claims do not emerge as expected'. No reading checked states which response fits a large claim versus broad emergence. The example's arithmetic recomputed blind: E = 6,000 x 0.30/0.50 = 3,600; A = 4,500; A/E = 1.25; CL 10,500 x 1.25 = 13,125 (+1,125); BF 10,500 + 0.20 x 12,000 = 12,900 (+900) — all agree with the page.
- source_rank: 2
- proposed_action: Delete the paragraph.
- applied: false
- fingerprint: 86cb2c560c9d

## [C-004] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rta
- date: 2026-10-16
- status_set: disputed
- checks_run: example recomputation done blind before reading the stated answers (three examples); every claim matched to the reading that should state it; full-text search of Shapland, Meyers, Friedland 2010 and 2022, Werner & Modlin, ASOP 23, Sahasrabuddhe, Siewert; Meyers and Shapland errata checked (no change on the pages used); wiki-links resolve
- sources_checked: CREDIBLE CLAIMS RESERVES: THE BENKTANDER METHOD, Section 2, p.335 (credibility mixture U_c = cU_CL + (1-c)U_0), sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086 — https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf; https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf, Development Formula 2, p.13, sha256:de06a701db8825c8a6384bf92f577a5fe6ccfab627379f21199df35396a2a690 — https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf; https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf, s.5.5.1, pp.41-43 (PDF 49-51): SE rises oldest to most recent; CoV generally decreases, may rise again in most recent years; min/max plausibility, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf, s.3, pp.7-11 (PDF 17-21): uniformity of predicted percentiles, p-p plot, KS critical value 136/sqrt(n) at 5%, slanted S = light tails, Figure 3.2 Mack incurred, critical values 19.2 and 9.6, sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf; Estimating Unpaid Claims Using Basic Techniques, ch.3 p.37; ch.9 p.154; ch.14 pp.331-332 incl. fn 80-81; ch.15 pp.345-346, 350-351, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (5th ed. 2016), ch.3 p.37; ch.6 p.106, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; ASOP No. 23, Data Quality (2016), s.3.3 Review of Data, pp.3-4, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf; Friedland, Reserving for Reinsurance (CAS Exam 7 study note), ch.3 pp.61-62: longer reporting/payment patterns for reinsurance vs primary and non-proportional vs proportional, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf
- note: Sweep of the claims C-001 left unchecked. Confirmed: Meyers' uniformity test, p-p plot, 136/sqrt(n) KS band at 5%, slanted S = light tails and the Mack-incurred finding (critical values 9.6 and 19.2 match Fig 3.2); Shapland's SE pattern and min/max check; Friedland's expected-emergence formula (ch.15 p.351), A/E and roll-forward monitoring, method comparison (ch.15 pp.345-346); credibility-between-CL-and-a-priori carried forward from e7rca (Mack 2000 s.2, Brosius Formula 2). One critical (BF IBNR identity), one major, five minor findings; disputed until the clean-up round restates them.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rtb
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Restated to Friedland ch.9 p.154: 'chain ladder IBNR is its ultimate times 1 - p_t, and BF IBNR is the expected claims times 1 - p_t.' The formula block is unchanged (Friedland ch.15 p.351).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rtb
- date: 2026-10-16
- resolves: F-002
- status: resolved
- note: Restated to Friedland ch.14 pp.331-332: 'Net claims and premium should not exceed gross, and net IBNR is generally no greater than gross IBNR.'

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rtb
- date: 2026-10-16
- resolves: F-003
- status: resolved
- note: Restated to Friedland, Reserving for Reinsurance pp.61-62: 'Reinsurance should show longer reporting and payment patterns than primary insurance, and excess (non-proportional) cover longer than proportional.'

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rtb
- date: 2026-10-16
- resolves: F-004
- status: resolved
- note: 'CoVs falling' changed to 'CoVs generally falling' (Shapland s.5.5.1 p.42).

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rtb
- date: 2026-10-16
- resolves: F-005
- status: resolved
- note: The four sub-bullets replaced by three restated to the readings: review for appropriateness, reasonableness and comprehensiveness (W&M p.37, ASOP 23); internal consistency and comparison with the prior analysis's data where consistency can be expected (ASOP 23 s.3.3); first-age losses consistent year to year allowing for trend and portfolio changes, else examine claim counts (W&M p.106). Reconciliation and coding checks deleted from the ratemaking bullet.

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rtb
- date: 2026-10-16
- resolves: F-006
- status: resolved
- note: 'IBNR-to-case, and paid-to-ultimate' replaced with Friedland ch.15 p.346's 'the implied average case outstanding and unreported claim on open and unreported claims'.

## [F-007/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rtb
- date: 2026-10-16
- resolves: F-007
- status: resolved
- note: Paragraph deleted; the example now ends at the recomputed CL and BF updates.

## [C-005] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rtb
- date: 2026-10-16
- locus: Example 'A Jump in Average Premium'
- note: Left as written. Its numbers recompute blind (845/820 = 1.030; 1,030/845 = 1.219; 1.03 x 1.02 x 1.02 = 1.072, the 'about 7%' upper bound) and its conclusion matches Friedland ch.3 p.37 ('Questionable values are not always incorrect values, but the actuary should generally investigate questionable values before using them') and ASOP 23 s.3.3's internal-consistency review. The three causes are offered as 'likely candidates', an illustration rather than a sourced claim. The page still says nothing specific to the Exam 8 objective that links it (reasonability by layer); that is a coverage gap for a writer, not an error. Brosius's own checks (C-002) were not added.

## [C-006] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rtb
- date: 2026-10-16
- status_set: verified
- confidence: medium
- checks_run: all seven sweep findings restated or deleted to the readings; every remaining claim re-read against its source (Meyers s.3, Shapland s.5.5.1, Friedland 2010 chs.3/9/14/15, Friedland 2022 ch.3, Werner & Modlin chs.3/6, ASOP 23 s.3.3, Mack 2000 s.2, Brosius Formula 2); three examples recomputed blind; wiki-links unchanged
- sources_checked: CREDIBLE CLAIMS RESERVES: THE BENKTANDER METHOD, Section 2, p.335 (credibility mixture U_c = cU_CL + (1-c)U_0), sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086 — https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf; https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf, Development Formula 2, p.13, sha256:de06a701db8825c8a6384bf92f577a5fe6ccfab627379f21199df35396a2a690 — https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf; https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf, s.5.5.1, pp.41-43 (PDF 49-51): SE rises oldest to most recent; CoV generally decreases, may rise again in most recent years; min/max plausibility, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf, s.3, pp.7-11 (PDF 17-21): uniformity of predicted percentiles, p-p plot, KS critical value 136/sqrt(n) at 5%, slanted S = light tails, Figure 3.2 Mack incurred, critical values 19.2 and 9.6, sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf; Estimating Unpaid Claims Using Basic Techniques, ch.3 p.37; ch.9 p.154; ch.14 pp.331-332 incl. fn 80-81; ch.15 pp.345-346, 350-351, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (5th ed. 2016), ch.3 p.37; ch.6 p.106, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; ASOP No. 23, Data Quality (2016), s.3.3 Review of Data, pp.3-4, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf; Friedland, Reserving for Reinsurance (CAS Exam 7 study note), ch.3 pp.61-62: longer reporting/payment patterns for reinsurance vs primary and non-proportional vs proportional, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf
- note: Verified after the clean-up round. Medium rather than high: the first example's diagnosis is an illustration resting on ASOP 23's general consistency review, and the page has no Exam 8 content for the objective that links it.
