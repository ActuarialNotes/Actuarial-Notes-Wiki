---
target: Concepts/Reinsurance.md
created: 2026-09-13
---

## [F-001] Attributes a prescription to Friedland that Friedland explicitly declines to make
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: major
- status: open
- locus: Further points, bullet 1 ('Gross and ceded develop differently'), final sentence
- claim: 'Friedland's guidance is to estimate gross and ceded separately and derive net as the difference - never to develop a net triangle whose mix changes every time the treaty changes.'
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques, Ch. 14 p.330 (PDF p.336) says the opposite of a prescription: 'When required to estimate unpaid claims on a net of reinsurance basis, actuaries vary in their approach. Some actuaries analyze gross (i.e., direct and assumed) and ceded experience separately; others analyze gross and net experience separately. The choice of a gross versus net versus ceded analysis may depend on data availability, characteristics of the gross versus ceded program, and also personal preferences of the actuary.' She then works through net triangles as a matter of course - Exhibit II Sheet 1 is a gross/net/net-to-gross ratio triangle used to test quota share percentages by year, Exhibit II Sheet 2 is gross/net/ceded for a 1M excess of loss programme (p.331, PDF p.337) - and discusses the order in which actuaries select gross versus net development factors. What Friedland does support is the page's preceding sentence: 'Since net claims are often capped due to excess or aggregate coverage, we frequently observe net claim development patterns that are less than or equal to gross claim development patterns' (p.331). The word 'never' is the part the source contradicts. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
- source_rank: 2
- proposed_action: Replace the attributed rule with what Friedland says: actuaries vary; the choice depends on data availability, the character of the ceded programme and actuarial preference; whichever basis is used, gross, ceded and net must be reconciled and judgment kept consistent across them.
- applied: false
- fingerprint: c2f237f1640d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Stands, and Friedland's Exam 7 study note goes further against it. Friedland 2010 Ch.14 printed p.330 (PDF p.336): actuaries vary — gross and ceded, or gross and net — by data availability, programme and preference; pp.331-332 (PDF pp.337-338) require consistency (net IBNR generally not above gross). Friedland, Reserving for Reinsurance, printed pp.48-49 (PDF pp.50-51): ceded data 'often have limited credibility due to a lower volume of losses, higher volatility … and frequent changes in terms and conditions', so 'actuaries typically use the first approach and select development patterns and expected loss ratios … gross and net of reinsurance rather than gross and ceded'. Bullet rewritten to both.

## [F-002] Quota share said to give no protection against a large single loss
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: Proportional, quota share bullet
- claim: Quota share … Provides surplus relief but no protection against a large single loss.
- evidence: Friedland, Reserving for Reinsurance, printed p.15 (PDF p.17): 'Proportional reinsurance is generally quite easy to administer and offers protection to the ceding company against both the frequency and severity of losses'; printed p.14 (PDF p.16): proportional reinsurance 'is intended to provide capacity and surplus relief'; Table 1.1 (printed p.16) cedes 60% of a 3,000 loss. A quota share cedes its percentage of a large loss like any other; what it does not do is cap the cedant's retained share.
- source_rank: 2
- proposed_action: Say quota share provides capacity and surplus relief and protects against frequency and severity alike, but only in proportion.
- applied: true
- fingerprint: 8bc7faa78ba2

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Bullet rewritten to Friedland, Reserving for Reinsurance, printed pp.14-15 (PDF pp.16-17): capacity and surplus relief, protection against frequency and severity, but only in proportion — the cedant keeps its share of every large loss.

## [F-003] Ratemaking 'usually gross' with the net cost loaded; Werner gives two treatments
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Further points, third bullet
- claim: In ratemaking the analysis is usually gross, with the net cost of reinsurance — ceded premium less expected ceded losses — loaded as an expense provision.
- evidence: Werner Ch.6 p.99 (PDF p.111) and Ch.7 p.137 (PDF p.149): 'Typically, the projected losses are reduced for any expected non-proportional reinsurance recoveries … typically done by reducing the total premium by the amount ceded to the reinsurer. Alternatively, the net cost of the non-proportional reinsurance … may be included as an expense item'; proportional reinsurance 'may not necessarily need to be explicitly included'. The expense load is the alternative, not the usual treatment — the same overstatement as Net of Reinsurance F-002.
- source_rank: 2
- proposed_action: State Werner's two treatments and the proportional caveat.
- applied: true
- fingerprint: cb12b54493d1

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullet rewritten to Werner Ch.6 p.99 / Ch.7 p.137 (PDF pp.111, 149): reduce losses by expected recoveries and premium by the cession, or alternatively load the net cost as an expense item; proportional may need no explicit treatment.

## [F-004] Example says the XOL treaty caps any single claim at 1.5M, then retains 1.6M
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'Net Losses Under Quota Share and Excess of Loss', answer, closing paragraph
- claim: the excess treaty cedes nothing below $500K and caps the cedant's exposure to any single claim at $1.5M — claim 1 pierces the top of the layer, so the cedant retains $1.6M of it.
- evidence: Rank-5 recomputation of the page's own table: under 1M xs 500K, claim 1 (2.6M) cedes 1.0M and the cedant retains 1.6M, so nothing caps the cedant at 1.5M — 1.5M is the top of the layer, and the treaty holds the cedant to 500K only for claims up to 1.5M. Friedland, Reserving for Reinsurance, printed p.19 (PDF p.21): excess per risk indemnifies 'the amount of loss in excess of a specified retention', 'subject to a specified limit' (7M xs 3M example: a 6.5M loss leaves the cedant 3M). The table itself is correct.
- source_rank: 5
- proposed_action: Say the treaty holds the cedant to 500K on any claim up to 1.5M.
- applied: true
- fingerprint: e452df2e934f

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Sentence corrected: the treaty holds the cedant to $500K on any claim up to $1.5M; claim 1 pierces the layer and the cedant retains $1.6M. Table unchanged (recomputed: ceded 1,000/400/300/0/0 = 1,700K; net 3,300K).

## [F-005] 'Net data look more credible than they are' is not in the sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Further points, second bullet
- claim: Net experience is smoother than gross … That makes net data look more credible than it is; the smoothing is being paid for.
- evidence: Friedland 2010 Ch.14 p.331 (PDF p.337) supports the smoothing ('net claims are often capped … net claim development patterns that are less than or equal to gross') but credits *gross* triangles with 'greater volume … and thus … greater credibility'; Friedland, Reserving for Reinsurance, printed pp.48-49 (PDF pp.50-51) says ceded data have limited credibility. Neither says net data look spuriously credible.
- source_rank: 2
- proposed_action: Keep the smoothing statement in Friedland's terms; drop the credibility gloss.
- applied: true
- fingerprint: 3d8c42155017

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Credibility gloss deleted; bullet now ends with Friedland 2010 Ch.14 p.331 (PDF p.337): net development patterns frequently at or below gross.

## [F-006] Example says gross and ceded stay analyzable after an attachment change
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'Why the Ceded Triangle Cannot Be Scaled from Gross', second consequence
- claim: One change in the attachment point makes every prior net year non-comparable, while gross and ceded remain separately analyzable.
- evidence: Friedland, Reserving for Reinsurance, printed pp.48-49 (PDF pp.50-51): ceded data have limited credibility owing to 'frequent changes in terms and conditions (such as attachment points, limits, participation percentages, and treatment of ALAE) that result in data that are not homogeneous'. An attachment change re-cuts the ceded triangle exactly as it re-cuts the net one; it is the corollary of F-001 in the worked example.
- source_rank: 2
- proposed_action: Say an attachment change alters both the ceded and the net triangle, citing Friedland's reason ceded data are not homogeneous.
- applied: true
- fingerprint: 14d61d554f2e

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-006
- status: resolved
- note: Bullet rewritten: an attachment change alters both the ceded and the net triangle; Friedland's study note (printed pp.48-49) counts frequent changes in attachment points, limits and participation among the reasons ceded data are not homogeneous. The CDF arithmetic (5,000/3,000 = 1.667; 1,700/150 = 11.33; 150 x 1.667 = 250, 85% short) recomputed and unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: F-001 re-read and fixed; every definition (reinsurance, cedant, quota share, surplus share, per-risk, per-occurrence/catastrophe, aggregate stop loss, layer formula, functions incl. surplus relief and catastrophe protection, default risk falling back on the cedant) diffed against Friedland's Reserving for Reinsurance Ch.1; development and volatility claims against its Ch.3 and Friedland 2010 Ch.14; ratemaking against Werner. Both examples recomputed (QS 2,000/3,000; XOL ceded 1,700, net 3,300; ceded-to-gross 5.0/16.7/29.2/34.0%; CDFs 1.667 and 11.33).
- sources_checked: Friedland, Reserving for Reinsurance (CAS Exam 7 study note), Ch.1 printed pp.6-22 (PDF pp.8-24), Ch.3 printed pp.48-49, 53 (PDF pp.50-51, 55), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.14 pp.330-332 (PDF pp.336-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 p.99 (PDF p.111), Ch.7 p.137 (PDF p.149), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: First pass on this page. F-001 fixed; five new findings (one major, four minor) found and fixed. Medium: vault-authored examples. The page is linked from Exam 5, 6U, 7, 9 and several SOA/DISC pages; it carries no claim specific to their other readings.
