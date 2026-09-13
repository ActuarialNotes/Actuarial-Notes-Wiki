---
target: Concepts/Retrospective Rating.md
created: 2026-09-13
---

## [F-001] 'Table M' and 'excess loss premium' named as fact; neither term is in Werner
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: minor
- status: open
- locus: bullets on the excess loss premium and on the net insurance charge / Table M
- claim: An excess loss premium is added when the plan limits individual claims; the net insurance charge 'is derived from Table M (insurance charges by entry ratio and risk size)'.
- evidence: Full-text search of Werner & Modlin (5th ed., the Exam 5 reading for retrospective rating, Ch.15) returns zero occurrences of 'Table M' and zero of 'excess loss premium'. What Werner does say, printed p.308 (PDF p.320): the insurance charge and insurance savings 'are contained in a table of values. The derivation of these tables is beyond the scope of this paper; however, it should be noted that the insurance charge and insurance savings are expressed as a percentage of expected unlimited losses', and where the table reflects only the max/min, 'the effect of the per occurrence loss limitation is computed as a separate additional charge'. So the substance of both bullets is supported -- a separate per-occurrence charge exists, and the net insurance charge comes out of a table -- but the two proper nouns, and the 'entry ratio and risk size' parameterisation, come from material outside this syllabus text.
- source_rank: 2
- proposed_action: Attribute the names (NCCI retrospective rating plan / Table M material) or restate in Werner's wording: a table of insurance charges and savings expressed as a percentage of expected unlimited losses, derivation beyond the text's scope.
- applied: false
- fingerprint: 01bbe12bcc44

## [F-002] Symbol CL is glossed as 'converted losses' but carries limited losses
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: nit
- status: open
- locus: first display formula and the 'Converted losses' bullet
- claim: R = (BP + CL x LCF) x TM, with the bullet headed 'Converted losses (CL x LCF)'.
- evidence: Werner printed p.307 (PDF p.319) defines 'Converted Losses = Reported Losses x LCF' and printed p.306 (PDF p.318) gives 'Retro Premium = [Basic Premium + Converted Losses] x Tax Multiplier ... subject to a maximum and a minimum' -- which is the page's formula once CL is read as limited reported losses. Read the other way (CL = converted losses, as the bullet heading suggests) the formula applies the LCF twice. The page's own worked example resolves it correctly -- ($100,000 + $350,000 x 1.10) x 1.03 = $499,550, recomputed and confirmed -- so this is presentation, not arithmetic.
- source_rank: 2
- proposed_action: Use a neutral symbol for limited losses (e.g. L) so that CL x LCF cannot be read as converted losses times the LCF.
- applied: false
- fingerprint: 82d103add00a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Located Werner's retro section and diffed it clause by clause. Formula confirmed: printed p.306 'Retro Premium = [Basic Premium + Converted Losses] x Tax Multiplier ... subject to a maximum and a minimum'; Converted Losses = Reported Losses (limited by the accident limit) x LCF, p.307; Basic Premium = [Expense Allowance - Expense Provided Through LCF + Net Insurance Charge] x Standard Premium with Net Insurance Charge = Insurance Charge - Insurance Savings, p.307 (so the page's 'basic premium factor times standard premium' and its account of what the basic premium provides for -- target UW profit and non-LAE expenses, plus the cost of the max/min -- are right); Minimum/Maximum Retro Premium = ratio x Standard Premium, p.308. Independently recomputed both examples before reading the answers: (100,000+350,000x1.10)x1.03 = 485,000x1.03 = 499,550, inside [300,000, 800,000]; (100+110)x1.03 = 216,300 -> floored at 300,000; (100+990)x1.03 = 1,122,700 -> capped at 800,000, excess 322,700; marginal cost 1.10x1.03 = 1.133; inversion of the band, L = (300/1.03-100)/1.10 = 173.9K and (800/1.03-100)/1.10 = 615.2K, matching the page's ~174K and ~615K. Werner's own Table 15.17 example reproduces on the same formula. Terminology check: 'Table M' and 'excess loss premium' occur zero times in Werner -> F-001; symbol CL glossed as converted losses -> F-002. LaTeX delimiters balanced; wiki-links and the Media/Figures embed resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 'Commercial Lines Rating Mechanisms', printed pp.305-309 (PDF pp.317-321), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
