---
target: Concepts/Experience Rating.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: medium
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1-9, Ch.2 §2, PDF pp.8-14, 22, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 experience rating, PDF pp.301-305, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Fisher Ch.1: standard premium = e-mod x manual premium; mod > 1 debit, < 1 credit; mod is a prospective measure of loss potential relative to others in the class, not a charge-back; credibility Z = E/(E+K) grows with size; MSL caps single losses; min/max mods; split plans weight primary losses (frequency) more than excess (severity), NCCI WC is a split plan; incentive for safety; schedule vs experience double counting (PDF pp.8-14). Fisher Ch.2 §2: retro rating adjusts the same policy period (PDF p.22). Werner Ch.15: experience period usually two to five policy years ending with the last complete year; actual and expected on the same basis; per-occurrence caps; off-balance (PDF pp.301-303). Examples recomputed: 1.24, 1.10; capped 1.50 vs 0.83. Claim-suppression sentence is a finding.

## [F-001] Claim-suppression incentive not in the readings
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: sixth bullet
- claim: Experience rating creates an equally real incentive for claim suppression - paying small claims outside the policy to keep them out of the mod.
- evidence: Fisher Ch.1 §4 (PDF p.9) states only the increased incentive for safety; Werner Ch.15 (PDF pp.301-305) does not mention suppression. No reading checked supports the claim-suppression statement or "equally real".
- source_rank: 2
- proposed_action: Cite a source for the claim-suppression incentive or delete the clause.
- applied: false
- fingerprint: 254395def583

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:18Z/46f7
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: delta check of the c7887a25 additions (credibility properties, Bühlmann Z and M=(A+K)/(E+K), MSL/min-max, split plans, why split, split-plan mod both forms, NCCI weight-and-ballast form, quintile and efficiency tests) sentence by sentence against Fisher Ch.1; split-plan example recomputed blind; derived Zp/Ze checked by expanding the NCCI form; exam-8 question files grepped for the example's figures; unchanged older text not re-checked (verified 2026-10-17 against Fisher and Werner, C-001)
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §6-8, §10, PDF pp.10-13, 14-17, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 experience rating, PDF pp.301-305, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Every new bullet matches Fisher Ch.1 pp.10-17 (properties of Z p.10; Bühlmann K=EPV/VHM and M=(ZA+(1-Z)E)/E=(A+K)/(E+K) pp.10-11; MSL and min/max p.11; split at 5,000 table p.12; log-credibility rationale, frequency/severity reading and NCCI empirical result p.12; both split-mod forms and the NCCI form p.13; quintile and efficiency tests pp.14-17). Zp=E/(E+B), Ze=wE/(E+B) are not stated by Fisher, who only calls the forms 'mathematically equivalent'; they follow directly: the NCCI form expands to 1+(Ap-Ep)/(E+B)+w(Ae-Ee)/(E+B), which matches 1+Zp(Ap-Ep)/E+Ze(Ae-Ee)/E term by term. Kept, and the page's 'Matching the two forms' marks it as a derivation. Example recomputed: Ap=8+4+10+10+10+10=52,000, Ae=5+15+21=41,000; (52,000+16,400+36,000+100,000)/200,000=1.022; 1+0.5(0.12)+0.2(-0.19)=1.022. The example shares a 10,000 split, one 8,000 claim and Ze=0.2 with cas8-2014-q9, but none of its other figures or its answer (1.51), so rule 10 holds. F-001 (claim suppression, minor) stays open and untouched by this edit.

## [F-002] ISO bullets reproduced BattleActs sentences nearly word for word
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:57Z/ad84
- date: 2026-10-31
- severity: minor
- status: open
- locus: ISO experience period (Rule 4) bullet; What the ISO adjustment factors do bullet; ISO loss history bullet
- claim: The experience period ends at least six months before the rating date, so the latest policy year is always incomplete and is not used. The experience period consists of the latest three full policy years of experience, or at least one complete policy year if data is unavailable.
- evidence: BattleActs ISO.Rating.Peek PDF p.3 reads 'The experience period ends at least six months before the rating date, so the latest policy year is always incomplete and isn't used. The experience period should consist of the latest three full policy years of experience, or at least one complete policy year if data is unavailable.' The page's Rule 4 bullet differed only in 'is not' and 'consists'. The 13C and detrend sentences ('translates from an occurrence ... to the policy type used in the historical experience period'; 'moves them back to be at the same level as the actual historical experience', p.3) and 'Since the losses are capped at the basic limit, this means the ISO CGL plan responds mostly to frequency' (p.4) were also near-verbatim. BattleActs is a commercial secondary study guide, not a syllabus reading, so its sentences should not be on the page; the facts are supported.
- source_rank: 3
- proposed_action: Restate the four sentences in the vault's own words, keeping the facts.
- applied: true
- fingerprint: cf671b318229

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:57Z/ad84
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated in this run: Rule 4 now reads 'The plan uses the three most recent complete policy years, or as few as one complete policy year when no more data exists. Those years end no later than six months before the rating date, which leaves out the most recent policy year, since it is still incomplete.'; the 13C, detrend and frequency sentences reworded with the same content. Facts unchanged and still match BattleActs pp.3-4.

## [F-003] Double-counting bullet went beyond Fisher on when a separate schedule credit is earned
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:57Z/ad84
- date: 2026-10-31
- severity: minor
- status: open
- locus: Don't count the same experience twice bullet, last sentence
- claim: Only an effect that the experience period does not contain, such as a program implemented during or after the experience period, earns a separate credit, and a risk too small to have fully credible experience may earn a smaller credit for it.
- evidence: Fisher Ch.1 §9 (PDF pp.13-14): a schedule credit is appropriate for a *recent* change (a newly hired safety manager); a risk that always had one has its effect already in its experience, so a credit would double-count it; 'However, if the risk is too small to have fully credible experience, it might be appropriate to give some schedule credit for the safety manager—but less than for the first risk, since the impact ... is partially credited by the experience mod'. Fisher says nothing of a program 'implemented during' the experience period, and the page's 'Only ... earns a separate credit, and a [small] risk ... may earn a smaller credit for it' attached the smaller credit to the new program rather than to the long-standing one, and contradicted its own 'Only'.
- source_rank: 2
- proposed_action: Restate as Fisher has it: a recent change can earn a credit; a small, not fully credible risk may get some (smaller) credit for a program it always had, because its mod credits it only in part.
- applied: true
- fingerprint: 3e22f9428877

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:57Z/ad84
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Restated in this run: 'A recent change that the experience period does not yet reflect, such as a newly hired safety manager, can properly earn a schedule credit. A risk too small to have fully credible experience might still be given some schedule credit for a program it has always had, but less than a risk whose program is new, because its mod credits the program's effect only in part.' Matches Fisher PDF pp.13-14.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:57Z/ad84
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: delta check of the round-2 additions only (ballast bullet, double-counting bullet, ISO CGL section of 11 bullets) sentence by sentence; Zp=E/(E+B) dampening re-derived from the NCCI form; full-text check of every ISO rule number, factor name and term against BattleActs; wording compared with BattleActs for copied sentences; checked no manual table values or figures (credibility thresholds, schedule ranges, basic limits) are on the page; exam-8 ISO questions (2012-q14, 2013-q8, 2014-q8, 2015-q9, 2017-q9) compared for figures; answerability status for 8, 5, 7, 9, MAS-I, MAS-II before and after edits; older text not re-checked (verified today, C-002 run 46f7)
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §6-9, PDF pp.11, 13-14, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; BattleActs, ISO.Rating.Peek (BattleActs Wiki study guide to ISO's Commercial General Liability Experience and Schedule Rating Plan; secondary source, page last edited 28 May 2024, oldid 18420), PDF pp.1-5: Overview, Rules 4, 5, 5B, 5D-5E, 10, 16, sha256:f18b7f8350d8e78cff420ac68e594ae81190cfd9f40266d4c9739f6e66149c66 — https://battleacts8.ca/0/wiki/index.php?title=ISO.Rating.Peek
- note: The ISO CGL section rests on a secondary description of the manual: BattleActs' ISO.Rating.Peek (pp.1-5), since ISO's Commercial General Liability Experience and Schedule Rating Plan itself (CAS study kit only) was not read; hence medium confidence. Every ISO statement matches BattleActs: Rule 4 period; mod from AER and EER, positive = debit; BLEL = ELR x annual basic limits premium incl. ALAE, Rule 10 when only premium at purchased limits; Rule 5B CSLC = sum of BLEL x PAF 13B x PAF 13C x detrend (Rule 14); PAF/detrend purposes; Rule 16 credibility/EER/MSL; EFD = CSLC row x EER x LDF (Rule 15), also called the Adjustment to Reflect Ultimate Level of Losses; claims-made LDF 0; loss history capped at basic limit then MSL, responds mostly to frequency. Derivations kept as plain consequences: first claims-made policy rated off prior occurrence years via the PAFs; CSLC already detrended so no further trend; claims-made year adds no EFD. The acronym ARULL is the vault's, not BattleActs'. No manual figures or table values copied. Ballast: Fisher p.13 gives B in numerator and denominator; Zp=E/(E+B) follows from matching forms (C-002), so larger B lowers Z and holds M near 1; MSL and min/max as dampers p.11. Double counting per Fisher pp.13-14 after F-003's restatement. F-002 (copied BattleActs wording) and F-003 fixed in this run. F-001 (claim suppression) still open and not touched.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:29Z/d9a2
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: delta check of the three new bullets: NCCI expected losses = payroll in hundreds by class x expected loss rate, rates reflecting losses expected at the 18/30/42-month evaluations (Ch.15 p.295); D-ratio = LER at the primary loss limit, Ep = E x D, Ee = E - Ep (p.296, Table 15.5 cols 5-6); the writer's gloss 'share of expected losses expected to be primary' tested against the LER definition (Ch.11 p.201: losses eliminated / total losses, i.e. losses capped at the limit / total) and kept; App. D p.D-2: loss cost premium on historical average mods, x col 7 / col 6 to the projected mod level. Table 15.5 recomputed: 19,560 x 3.52 = 68,851; x 0.24 = 16,524; 52,327 (and 74,906/17,977/56,929; 81,558/19,574/61,984). Rest of page verified today (C-003) and unchanged; Loss Elimination Ratio link resolves.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 11 p.201 (PDF p.213); Ch. 15 pp.295-296, Tables 15.4-15.5 (PDF pp.307-308); App. D p.D-2 (PDF p.395), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: F-001 (claim suppression, minor) remains open and untouched.
