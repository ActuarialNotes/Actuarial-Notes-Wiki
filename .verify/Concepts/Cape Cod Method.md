---
target: Concepts/Cape Cod Method.md
created: 2026-10-31
---

## [F-001] 'A new programme' offered as a case for Cape Cod, which the source says needs a sufficient volume of credible reported claims
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- severity: major
- status: open
- locus: bullets, third bullet ('That makes Cape Cod the right choice ...')
- claim: Page said Cape Cod is the right choice when no credible external ELR exists, 'a new programme, a book whose pricing history is unreliable'.
- evidence: Friedland, Basic Techniques Ch.10, PDF p.182 (printed 176): 'The Cape Cod method is not necessarily as appropriate as the Bornhuetter-Ferguson technique if the data is extremely thin or volatile or both. Since the expected claims are based on reported claims to date, there must be a sufficient volume of credible reported claims in order to derive a reliable expected claims estimate.' A new programme is the thin-data case; the source points the other way.
- source_rank: 2
- proposed_action: Delete 'a new programme,' from the list.
- applied: true
- fingerprint: 0e9c574211bb

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted (rule 2: a clause the source contradicts). The bullet now reads '... when **no credible external ELR exists** — a book whose pricing history is unreliable — and it removes BF's dependence on a judgmentally selected loss ratio.'

## [F-002] Unsourced superlative: 'the single largest source of BF error'
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, third bullet
- claim: Page said Cape Cod 'removes the single largest source of BF error'.
- evidence: Patrik printed p.453 lists BF's disadvantages without ranking them ('1. It is very dependent upon the selected loss ratio.'), and p.454 gives SB's innovation as the ELR 'estimated from the overall reported claims experience, instead of being selected judgmentally, as in the BF Method'. Neither Patrik nor Friedland Ch.10 calls it BF's largest source of error.
- source_rank: 2
- proposed_action: Restate to Patrik: 'removes BF's dependence on a judgmentally selected loss ratio'.
- applied: true
- fingerprint: 4a2c909f2b2d

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated to Patrik pp.453-454: '... and it removes BF's dependence on a judgmentally selected loss ratio.'

## [F-003] Unsourced claim: on-level premium is 'Cape Cod's most-missed requirement'
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, fourth bullet, last sentence
- claim: Page said: 'This is Cape Cod's most-missed requirement.'
- evidence: Friedland Ch.10 PDF p.182 (printed 176) says the adjustment is required 'from a theoretical perspective' and that in practice 'many actuaries continue to use both the Bornhuetter-Ferguson and Cape Cod methods ... without the adjustment of premiums or claims'; Patrik p.454 calls it 'difficult and uncertain, but must be done'. Neither ranks it as the most-missed requirement.
- source_rank: 2
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: 2f91902751b0

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Deleted. The rest of the bullet (premium on level, losses trended) stands on Friedland p.182 and Patrik p.454.

## [F-004] Generalized Cape Cod described as weighting recent years more heavily
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- severity: major
- status: open
- locus: bullets, 'A decay-weighted variant' bullet
- claim: Page said the generalized Cape Cod 'weights recent years more heavily in the ELR estimate'.
- evidence: Gluck (PCAS 1997) printed p.495, eq. 6.1: the weights (E_j/DF_j) x D^|i-j| decrease 'as the length of the trending period, |i-j|, increases', and 'the value E(PP_i) now contains a subscript denoting the year of origin, since the weights will now shift for each year of origin'. Each year gets its own ELR weighted toward the years near it, not toward recent years; for an old year the old years dominate. The vault's own Generalized Cape Cod Method page (rank 4) agrees ('nearby years count most').
- source_rank: 2
- proposed_action: Restate: 'estimates a separate ELR for each year, weighting the other years less the further they lie from it, recognizing that the loss ratio level drifts.'
- applied: true
- fingerprint: c0b720beb99c

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Restated to Gluck p.495: '(generalized Cape Cod) estimates a separate ELR for each year, weighting the other years less the further they lie from it, recognizing that the loss ratio level drifts.'

## [F-005] SB's judgment-free ELR placed under 'Against the chain ladder' without naming BF as the contrast
- entry_type: finding
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- severity: nit
- status: open
- locus: Patrik bullet group, 'Against the chain ladder', first sentence
- claim: Page said: 'The ELR comes from the overall reported experience rather than from judgment'.
- evidence: Patrik p.454: 'the ultimate expected loss ratio for all years combined is estimated from the overall reported claims experience, instead of being selected judgmentally, as in the BF Method.' The contrast is with BF; the chain ladder selects no ELR.
- source_rank: 2
- proposed_action: Restate to 'rather than being selected judgmentally, as in Bornhuetter-Ferguson'.
- applied: true
- fingerprint: 0dc2246b8786

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- resolves: F-005
- status: resolved
- note: Restated to Patrik p.454: 'The ELR comes from the overall reported experience rather than being selected judgmentally, as in Bornhuetter-Ferguson, though ...'

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-cas7-chk-pk
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page (never verified): every bullet against Patrik pp.451-458, Friedland Ch.10 and Gluck; the three Patrik sub-bullets of commit 94c03eac sentence by sentence (p.454 exposure base and netting; pp.454, 458 key innovation, rate-level dependence, more accurate for recent immature years and overall; p.458 credibility weighting and Formula 7.66); ELR and IBNR formulas against Formula 7.64 with Rlag = 1/CDF (Friedland p.181); both examples recomputed (ELR 7,200/14,764.5 = 48.8%, IBNR 263 + 662 + 1,384 = 2,309 with the unrounded ELR; example b against Friedland Scenario 3, p.184); links resolve; no question numbers on the page (rule 10)
- sources_checked: Patrik, Reinsurance, Ch.7 of Foundations of Casualty Actuarial Science (4th ed., CAS 2001) — Exam 7's reading before Friedland (2022), printed pp.451-458 (PDF pp.109-116: CL and BF disadvantages; Stanard-Bühlmann method, earned risk pure premium net of commissions, brokerage and internal expenses, Formula 7.64, used-up premium, Table 7.65 and the accuracy comparison; Credibility IBNR, Formula 7.66), sha256:26f2fc8441b1a2f8b335a9bfc9e20f0c742fa340c4b7f6eff93376c3c340cf06 — https://www.casact.org/sites/default/files/database/studynotes_ch7.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.10 Cape Cod Technique, PDF pp.180-185 (printed 174-179: Cape Cod = reported BF with the expected claim ratio from reported experience; used-up premium = EP x % reported; % reported = 1/CDF; not as appropriate as BF for thin or volatile data; on-level premium and trended claims required in theory; Scenario 3 case-strength overstatement), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Gluck, Balancing Development and Trend in Loss Reserve Analysis (PCAS LXXXIV, 1997), printed pp.482, 494-496 (PDF pp.1, 13-15: Generalized Cape Cod; Cape Cod gives excessive weight to out-of-date results; decay weight D^|i-j| decreases with the trending period, so each year of origin gets its own drifting expected pure premium, eq. 6.1), sha256:98aa10a8d79b378de986f403150d498778088c48a9d0d5f4f18689e664a9da1c — https://casact.org/sites/default/files/database/proceed_proceed97_97482.pdf
- note: Five findings, all fixed within rule 2 (two deletions, three restatements to the source). The example (b) mechanism ('enters twice') is the page's own framing of Friedland's Scenario 3 (expected claims rise with the reported claims, BF's do not); consistent, not contradicted. Patrik's chapter is cited as the earlier Exam 7 reading; Cape Cod Method is an Exam 5 and GI-101 page and not an Exam 7 syllabus concept.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-cas7-chk-last
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: delta check of commit b6bb15ae: the one added sentence (end of the Patrik 'Exposure base' sub-bullet) against Patrik printed p.457 ('remember to use the adjusted risk pure premium, ARPP, not the original premium, in the SB calculation'), Formula 7.64 (p.455: SBELR and SBIBNR(k) both on ARPP(k)) and Table 7.65 (p.457: column (2) Earned Risk Pure Premium); column (6) SB Loss Ratio recomputed as (Table 7.63 reported + SB IBNR)/ERPP: 7,346/6,000 = 122%, 5,909/7,000 = 84%, 4,589/8,000 = 57%, 5,031/9,000 = 56%, 10,062/10,000 = 100%, total 32,908/40,000 = 82%, all as printed (over ARPP 1996 would read 92%); SB IBNR reproduced as 0.866 x ARPP x (1 - Rlag), e.g. 0.866 x 8,000 x 0.05 = 346, 0.866 x 10,000 x 0.70 = 6,062; rest of page unchanged since the high pass of g8-cas7-chk-pk (diff read); no question numbers or wording on the page (rule 10, against cas7-2014-q14)
- sources_checked: Patrik, Reinsurance, Ch.7 of Foundations of Casualty Actuarial Science (4th ed., CAS 2001) — Exam 7's reading before Friedland (2022), printed pp.451-458 (PDF pp.109-116: CL and BF disadvantages; Stanard-Bühlmann method, earned risk pure premium net of commissions, brokerage and internal expenses, Formula 7.64, used-up premium, Table 7.65 and the accuracy comparison; Credibility IBNR, Formula 7.66), sha256:26f2fc8441b1a2f8b335a9bfc9e20f0c742fa340c4b7f6eff93376c3c340cf06 — https://www.casact.org/sites/default/files/database/studynotes_ch7.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.10 Cape Cod Technique, PDF pp.180-185 (printed 174-179: Cape Cod = reported BF with the expected claim ratio from reported experience; used-up premium = EP x % reported; % reported = 1/CDF; not as appropriate as BF for thin or volatile data; on-level premium and trended claims required in theory; Scenario 3 case-strength overstatement), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Gluck, Balancing Development and Trend in Loss Reserve Analysis (PCAS LXXXIV, 1997), printed pp.482, 494-496 (PDF pp.1, 13-15: Generalized Cape Cod; Cape Cod gives excessive weight to out-of-date results; decay weight D^|i-j| decreases with the trending period, so each year of origin gets its own drifting expected pure premium, eq. 6.1), sha256:98aa10a8d79b378de986f403150d498778088c48a9d0d5f4f18689e664a9da1c — https://casact.org/sites/default/files/database/proceed_proceed97_97482.pdf
- note: Sources: the page's three existing sources passed again unchanged (Patrik Ch.7, Friedland Ch.10, Gluck); Patrik re-read this session at printed pp.454-458 (PDF pp.112-116) from the cached copy, sha256 26f2fc84... matching the citation. 'Ultimate = reported + IBNR' is not stated in prose by Patrik; it is what Table 7.65's column (6) reproduces exactly over column (2) in every row, so the sentence is a transcription of the table's construction, not an inference beyond it.
