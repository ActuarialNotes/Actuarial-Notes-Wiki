---
target: Concepts/Large Loss.md
created: 2026-09-13
---

## [F-001] Threshold-selection rule attributed to Werner is not in Werner
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: minor
- status: open
- locus: Bullet 2 ('The threshold is a trade-off'), final sentence
- claim: 'Werner's guidance is to set M where the credibility gained by capping outweighs the data lost.'
- evidence: Werner & Modlin Ch. 6 pp.95-96 (PDF pp.107-108) gives two concrete bases for the cap and no credibility trade-off rule: 'In some cases, the threshold for capping shock losses may be based on the minimum amount of insurance offered, often called the basic limit as it corresponds to the limit associated with the base rate' (with the corollary that the premium in the indication must then also be put on a basic-limits basis), and, where the size-of-loss distribution varies greatly from policy to policy, 'it may be more appropriate to use a threshold that is a percentage of the amount of insurance than to use a fixed threshold'. The stability-versus-relevance trade-off Werner does spell out applies to the number of YEARS used for the excess provision, not to the threshold: 'the average should be based on the number of years necessary to produce a stable and reasonable estimate without including so many years as to make the historical data irrelevant' (p.96), with 10 years for a medium-sized homeowners insurer and 20 for a small personal umbrella insurer as the illustrations. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Replace the attributed rule with Werner's actual bases for the threshold (basic limit, or a percentage of the amount of insurance), and keep the credibility trade-off as the page's own commentary.
- applied: false
- fingerprint: 3a81a9b3d2af

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.6 pp.95-96 (PDF pp.107-108), re-read: threshold ideally where losses become extraordinary and cause volatility; may be the basic limit (premium then on a basic-limits basis for a loss ratio indication); otherwise balance including as many losses as possible against minimizing volatility — e.g. 99th percentile of claim sizes or a percentage of losses; for property, a percentage of amount of insurance. The bullet is rewritten to that and the attributed credibility rule deleted.

## [F-002] Shock-loss reserving example uses a $700,000 large-loss provision the question never gives
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'A Shock Loss in an Immature Triangle', stem and answer
- claim: The answer adds 'Expected additional large losses ≈ $700,000' with no basis in the stem.
- evidence: The stem gives reported losses, the large claim, the CDF and the ordinary-loss projection, but nothing from which $700,000 can be derived, so a reader cannot reproduce the $11.8M ultimate. Friedland Ch.3 p.32 (PDF p.38) describes the treatment the example models: exclude large claims, add a case-specific projection for reported large claims and a smoothed provision for the IBNR portion of large claims — the provision is an input, which the stem should state. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: State the smoothed large-claim IBNR provision ($700,000) in the stem.
- applied: true
- fingerprint: dd2a4b3495ae

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Stem now states the CDF is built on ordinary claims and that the smoothed provision for large claims not yet reported is $700,000; the redundant 'ordinary losses develop to about $9.6M' sentence is removed. Answer unchanged and recomputed: 3,000,000 x 3.20 = 9.6M; 9.6M + 1.5M + 0.7M = 11.8M; wrong method 4.5M x 3.2 = 14.4M.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Shock-loss definition, capping, excess provision as ratio of excess to non-excess losses, catastrophe distinction against Werner pp.95-98; threshold bullet rewritten to Werner (F-001); years-of-data bullet rewritten to Werner's 10/20-year illustrations and the relevance caveat plus trending before capping — the unsourced 'same five years defeats the purpose' deleted; 'more states, industry data' replaced by Werner's longer-term view; the ILF(U)/ILF(M) - 1 identity, stated in no source read, removed; reserving bullet rewritten to Friedland p.32 (exclude, case-specific projection, smoothed IBNR provision; limited triangles p.73) with the CDF-of-4 leverage from Friedland p.96. Example 1 recomputed: excess removed 1,000,000; 13,000,000/20,000 = 650; x1.08 = 702; uncapped 700; without the two claims 600.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 pp.95-98 (PDF pp.107-110), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 p.32 (PDF p.38); Ch.7 p.96 (PDF p.102), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: F-001 fixed; F-002 found and fixed. Medium: examples are vault-authored.
