---
target: Concepts/Credit-Based Insurance Scoring.md
created: 2026-10-10
---

## [F-001] Debate attributed to a syllabus that does not frame it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'The debate, as the syllabus frames it.'
- claim: The debate, as the syllabus frames it. For: ... Against: ...
- evidence: The DISC-DA course syllabus (The Institutes, (c) 2023, sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16, https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf, PDF pp.1-3) lists only the title '10.d Societal Impact of Credit-Based Insurance Scores'; no syllabus read this run sets out a for/against list. The arguments themselves check against the FTC 2007 report (effective predictors; 59% of consumers predicted to pay less, PDF pp.13, 48; no sufficient evidence on the cause of the correlation, p.13; African Americans and Hispanics over-represented in low deciles, p.13) and the NCOIL model's hardship exceptions; the attribution does not.
- source_rank: 1
- proposed_action: Delete the clause 'as the syllabus frames it'.
- applied: true
- fingerprint: 03bdb6bd6753

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Deleted 'as the syllabus frames it' in this run; the bullet now reads 'The debate.'

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: FTC findings (predictive, racial/ethnic distribution, 59% decrease, causation unresolved, HI statutory and CA/MA effective bans); NCOIL prohibited inputs, not-sole-basis, neutral treatment of no-hit/thin files, re-rating on request, extraordinary life circumstances list; Safeco v. Burr; FCRA; both examples recomputed (64.5%, relativities 1.318/1.008/0.775, weighted 1.00; 1.29 and 0.76 under a ban); links resolve
- sources_checked: FTC, Credit-Based Insurance Scores: Impacts on Consumers of Automobile Insurance (Report to Congress, July 2007), PDF pp.13-14, 29, 48-49, sha256:4ab0292ce105ff017feb03304dd6f89120b87fa76f8afea1594d7f2c7cbeb05d — https://www.ftc.gov/sites/default/files/documents/reports/credit-based-insurance-scores-impacts-consumers-automobile-insurance-report-congress-federal-trade/p044804facta_report_credit-based_insurance_scores.pdf; NCOIL Model Act Regarding Use of Credit Information in Personal Insurance (2025 readoption text), §5A-B, §5E, §6, re-rating at renewal, sha256:77244865a5db8d1912cec5675aa3e089e5f7c42114fe2b179919a79beadb4f3f — https://ncoil.org/wp-content/uploads/2025/12/NCOIL-Credit-Model-July-2025.pdf; Safeco Ins. Co. of America v. Burr, 551 U.S. 47 (2007), syllabus (Cornell LII), syllabus, sha256:1a96e589293bc167f65cec575a3318a6fa61a1b4eb4191f84c7eb573cd2eaee5 — https://www.law.cornell.edu/supct/html/06-84.ZS.html; 15 U.S.C. §1681b (Cornell LII), (a)(3)(C), sha256:6a76f86911643b4584aa96bbce68bbfcf097b5295d6c90e236c8256d16a02c1f — https://www.law.cornell.edu/uscode/text/15/1681b; 15 U.S.C. §1681m (Cornell LII), (a), sha256:328c82a65f0c1484276bdcc5f8ef2e0175a70a94491a87aa4a01abe456c03f06 — https://www.law.cornell.edu/uscode/text/15/1681m; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.10 operational criteria PDF p.168, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; The Institutes, CAS DISC DA Course Syllabus (© 2023), PDF pp.1-3, section 10.a-d titles, sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: F-001 applied and resolved. Medium: the state-ban list rests on the FTC's 2007 snapshot, and the 'cheap, objective, hard to manipulate' argument is not sourced beyond W&M's general operational criteria.
