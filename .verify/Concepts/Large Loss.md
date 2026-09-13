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
