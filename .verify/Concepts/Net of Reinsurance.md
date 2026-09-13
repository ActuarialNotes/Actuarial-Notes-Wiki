---
target: Concepts/Net of Reinsurance.md
created: 2026-09-12
---

## [F-001] Attributes to Friedland a prohibition on net triangles that the text contradicts
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: major
- status: open
- locus: fifth bullet, final sentence
- claim: 'Friedland's guidance is to estimate gross and ceded separately and derive net as the difference, not to develop a net triangle whose mix shifts with each treaty change.'
- evidence: Friedland, Estimating Unpaid Claims 3rd ed., Ch. 14 'Recoveries: Salvage and Subrogation and Reinsurance' (printed pp.331-332 = PDF pp.337-338) prescribes no such order and routinely develops net triangles: Exhibit II, Sheet 2 'present[s] the gross, net, and ceded reported claim triangles' for an insurer with $1 million excess of loss cover, and the text states 'Actuaries differ in their practice with respect to the order in which they choose gross or net claim development factors. Some actuaries first select gross claim development factors since these tr[iangles]...', continuing that in other situations 'the actuary first selects claim development factors for the net claims... the actuary may then use the selected net claim development factors as input for the selection of gross claim development factors.' What Friedland actually requires is consistency: 'It is particularly important for a net (of reinsurance) or ceded analysis that the actuary be aware of the implied relationships between gross, ceded, and net claims' at the data, judgment and selection stages, with checks such as net data being no greater than gross and 'net IBNR in each accident year is generally not greater than gross IBNR'. The page's underlying caution (treaty changes shift the net mix) is sound, but it is presented as Friedland's rule and as a prohibition, and the text says the opposite about order of selection.
- source_rank: 2
- proposed_action: Replace with Friedland's actual guidance: gross, ceded and net analyses may each be performed, actuaries differ on whether gross or net development factors are selected first, and the requirement is that assumptions and the implied gross/ceded/net relationships stay consistent (e.g. net IBNR not exceeding gross IBNR).
- applied: false
- fingerprint: e5c0c20c032b

## [F-002] Net cost of reinsurance presented as the required treatment; Werner offers it as one of two
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: minor
- status: open
- locus: second bullet
- claim: 'Ratemaking is normally performed gross, then the net cost of reinsurance is loaded as an expense... it belongs in the numerator of the indication alongside other expense provisions, not buried in the loss ratio.'
- evidence: Werner & Modlin, Basic Ratemaking 5th ed., Ch. 6 (printed p.99 = PDF p.111) and Ch. 7 'Reinsurance Costs' (printed p.137 = PDF p.149) give two treatments, the expense load being the alternative rather than the norm: 'Typically, the projected losses are reduced for any expected non-proportional reinsurance recoveries. Of course, the cost of purchasing the reinsurance must be recognized, too. That is typically done by reducing the total premium by the amount ceded to the reinsurer. Alternatively, the net cost of the non-proportional reinsurance (i.e., the cost of the reinsurance minus the expected recoveries) may be included as an expense item in the overall rate level indication.' The same passages add two qualifications the bullet drops: proportional reinsurance 'may not necessarily need to be explicitly included in the pricing consideration', and the historical direct basis is giving way to net analyses ('Historically, actuaries performed ratemaking analysis for primary insurance on a direct basis... some ratemaking analyses are now performed on a net basis'). The definition the page attributes to Werner is exactly right — Appendix B, Row 3 computes Net Cost of Reinsurance = Cost of Reinsurance (Expected Ceded Premium) $673,248 - Expected Reinsurance Recoveries $458,673 = $214,575, then loads $15.68 per exposure (PDF p.366) — so only the 'normally' and 'belongs' are overstated.
- source_rank: 2
- proposed_action: Say that Werner gives two treatments (reduce projected losses for expected recoveries and reduce premium by the cession, or load the net cost as an expense item in the indication), and note that proportional reinsurance may need no explicit treatment.
- applied: false
- fingerprint: 7516fef00af6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Both examples recomputed from scratch before reading their answers. Example 1: gross LR 1,300,000/2,000,000 = 65.0%, ceded LR 150,000/200,000 = 75.0%, net LR 1,150,000/1,800,000 = 63.89% — all three reproduce, and the stated direction (net below gross because ceded is above gross) is right. Example 2: 0.64/0.73 = 0.8767 = -12.3%; net cost 3,000,000 - 2,100,000 = 900,000, /40,000,000 = 2.25%; 0.6625/0.73 = 0.9075 = -9.2%; the gap is 3.1 points, matching 'three points'. The net cost definition and its treatment as a per-exposure numerator item are confirmed against Werner Appendix B (PDF p.366), whose own arithmetic I re-checked: 673,248 - 458,673 = 214,575 and 214,575/13,681 = $15.68 per exposure. Net = Gross - Ceded and the consistency rule (net losses over net premium) confirmed against Friedland PDF p.337. The volatility bullet is supported by Friedland PDF p.338: 'Since net claims are often capped due to excess or aggregate coverage, we frequently observe net claim development patterns that are less than or equal to gross claim development patterns.'
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p.99 (PDF p.111), Ch. 7 p.137 (PDF p.149) and Appendix B pp.B-3,B-8 (PDF pp.361,366), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 14 pp.330-332 (PDF pp.336-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
- note: Two open findings (F-001 major misattribution to Friedland, F-002 minor overstatement of Werner). All arithmetic in both examples is correct.
