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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.15 p.308 (PDF p.320): insurance charge and savings come from a table of values expressed as a percentage of expected unlimited losses, derivation beyond the text's scope; the per-occurrence loss limitation is either in the table or computed as a separate additional charge. Both bullets rewritten to that wording; 'Table M', 'entry ratio and risk size' and 'excess loss premium' removed.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Formula symbol changed from CL to L (limited reported losses); the bullet now reads 'Converted losses (L x LCF) are the insured's reported losses L, limited by any per-accident limit, multiplied by the LCF', per Werner p.307 (PDF p.319). Example arithmetic unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Formula and min/max against Werner p.306-308; basic premium contents p.307; LCF loads ALAE not in losses plus ULAE p.307 (page made specific); tax multiplier now 'premium taxes and related assessments' as Werner says — unsourced 'licences, fees' and 'payable on the premium collected' removed; insurance charge/savings and loss limitation p.308; unsourced 'credit risk' sentence replaced with Werner's 'similar to self-insurance' remark p.305. Examples recomputed: 499,550; 216,300 -> 300,000; 1,122,700 -> 800,000; 1.133 per dollar; band 173.9K-615.2K.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.305-309 (PDF pp.317-321), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Both findings fixed. Medium: the second example's framing is vault-authored.

## [F-003] Raising the per-occurrence limit: all the moved loss sent to ratable losses
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- severity: minor
- status: open
- locus: The formula in full, 'Moving the per-occurrence limit' bullet
- claim: Raising the per-occurrence limit moves expected loss out of the per-occurrence excess charge in B and into the expected ratable losses, dollar for dollar, and both carry the same c.
- evidence: Fisher et al. Ch.2 PDF p.26: total expected loss = expected per-occurrence excess + expected aggregate excess (net of savings) + expected ratable losses. With a maximum, the loss a higher limit brings under the limit is split between ratable losses and the aggregate excess (the aggregate charge is priced on limited losses, PDF pp.84-85, 89-90), so not all of it reaches ratable losses; only the total is dollar for dollar. Both the aggregate and per-occurrence charges carry c (PDF p.24). Consistent with CAS Exam 8 2014 Q17(c) examiner's report: 'a decrease in the ELF, and an increase in both the limited expected loss and insurance charge'.
- source_rank: 2
- proposed_action: Say the moved loss goes into the expected ratable losses and the aggregate excess charge, dollar for dollar in total, all carrying c.
- applied: true
- fingerprint: 6b52933e2845

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Restated: 'moves expected loss out of the per-occurrence excess charge in B and into the expected ratable losses and the aggregate excess charge, dollar for dollar in total, and all of them carry the same c' (Fisher PDF pp.24, 26).

## [F-004] LER link bullet ambiguous about which share is the LER
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- severity: minor
- status: open
- locus: opening bullets, last bullet
- claim: The per-accident limit's share of expected loss is its Loss Elimination Ratio.
- evidence: Read as the share the limit removes, this is Fisher's excess ratio k = (E - E{A_D})/E (Fisher PDF p.84, Formula 3.8), which is 1 - LER, not the LER. The linked page defines LER(d) = E[X ^ d]/E[X], the share below the limit; for a retro per-accident limit that is the share entering ratable losses, E{A_D}/E = 1 - k.
- source_rank: 2
- proposed_action: Name the share below the limit, the part that enters ratable losses.
- applied: true
- fingerprint: 3e310a641626

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Restated: 'The share of expected loss below the per-accident limit, the part that enters ratable losses, is the limit's Loss Elimination Ratio' (= E{A_D}/E = 1 - k, Fisher PDF p.84).

## [F-005] Retro development provision U(1 - 1/f) presented as if from the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- severity: minor
- status: open
- locus: Retrospective development, third bullet
- claim: If the development factor to ultimate is f and the ultimate limited loss is U, the reported loss is U/f, so the provision for future development of limited losses is U(1 - 1/f).
- evidence: Fisher et al. full-text search: 'development factor' and 'retrospective development' occur zero times; PDF p.31 says only that the insurer can apply loss development factors to the losses in the retro formula, and fn.12 that the NCCI and ISO plans provide for IBNR through factors applied to standard premium, times c and T. The U(1 - 1/f) step is plain arithmetic on the meaning of a factor to ultimate (reported x f = ultimate), not a formula Fisher prints, and the sentence did not say so.
- source_rank: 2
- proposed_action: Say Fisher gives no formula and give the step as what a factor to ultimate implies.
- applied: true
- fingerprint: ea9a4a1d655d

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- resolves: F-005
- status: resolved
- note: Restated: 'Fisher et al. give no formula for the provision itself. A development factor to ultimate f takes reported limited losses U/f to the ultimate limited loss U, so the future development of limited losses it provides for is U(1 - 1/f).' Kept as a derivation from the factor's meaning; Fisher's mechanism (LDFs applied to the losses, PDF p.31; NCCI/ISO factors on standard premium, fn.12) is in the bullet before.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Delta only (the Werner content was verified 2026-10-09 and is unchanged). Formula R=(B+cL)T and contents of B, fn.6 excess loss premium, c applied to the charges, expense part e-(c-1)E with e reflecting the premium discount (pp.22-24); minimum premium B x T with no minimum (p.25); three loss components (p.26); 18-month first adjustment, refund then additional premium, credit risk (p.26); LDFs, fn.12 NCCI/ISO factors on standard premium x c x T for 3/4 adjustments, none for paid plans (p.31); Formula 3.3 B = e-(c-1)E+cI and balance equations 3.4/3.5 (pp.62-63), tax version re-derived dividing premiums by T; per-occurrence-limit version re-derived from Formula 3.8 and the ICRLL pricing (e+E total, E{A_D} in denominators); psi(r_G) = (G/T-(E+e))/(cE) re-derived from Formulas 3.1-3.3 with r_H=0 — kept, plain derivation. Three findings fixed (F-003 dollar-for-dollar split, F-004 LER share, F-005 U(1-1/f) restated). Rule 10: no 2012-q19, 2014-q17/18, 2015-q13/16/17 figures on the page.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.305-309 (PDF pp.317-321), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §3 and §7, PDF pp.22-26, 31 incl. fn.6 and fn.12; Ch.3 §2.2 Formulas 3.1-3.5, PDF pp.58-63; Table L PDF p.84; ICRLL PDF pp.89-90; answers PDF pp.116-117, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Medium: three sentences are derivations from Fisher's formulas rather than its words, each re-derived.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:58Z/2de4
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Delta only: 'Balanced plans' bullet against Ch.4 p.95 (expected premium the same regardless of the retrospective provisions; actual premium varies if actual losses are more or less than expected; not necessary to balance premium for most policy types, expected losses still balanced) and Ch.2 p.21 (balance principle required under some US filed plans, does not make sense given the difference in risk transfer and capital). ELG bullet against PDF p.89 (1998 Table M by ELG with a State/Hazard Group adjustment) and the p.89-90 example (adjusted figure selects ELG 29; entry ratio 750,000/490,000 and charge 0.1583 x 490,000 on unadjusted amounts). r_G bullet derived from psi = phi + r - 1 (Fisher p.52, PDF p.57) and the page's no-minimum equation, which I re-derived from B = e - (c-1)E + c phi(r_G) E and G/T = B + c r_G E. No question's numbers.
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 p.21 (PDF p.26); Ch.3 §5.2 p.84-85 (PDF pp.89-90); Ch.4 p.95 (PDF p.100), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Older content verified this morning (run be9b/714a); only the delta re-checked.
