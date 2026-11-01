---
target: Concepts/Defined Benefit Plan.md
created: 2026-10-31
---

## [F-001] CAE benefit said not to depend on the salary scale
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Salary scale'
- claim: FAS benefits depend on it [the salary scale]; CAE benefits do not, which is why a CAE plan needs a higher alpha for the same replacement ratio.
- evidence: A CAE benefit sums every year's salary to retirement (alpha times total career earnings: SOA ALTAM sample Q42 solution p.86 values it from total past earnings plus next year's salary), so a projected CAE benefit moves with future salary growth too. What the sources say is the comparison: the Pensions Authority (Ireland) — 'An employee whose earnings grow by more than the revaluation rate will get lower retirement benefits from a career average scheme than from a comparable final salary scheme.' The page's conclusion (higher alpha needed) is right; the stated reason is not.
- source_rank: 1
- proposed_action: Restate the reason to the Pensions Authority's sentence.
- applied: true
- fingerprint: 449eb59d3025

## [F-002] Exam trap on salary rates at exact age stated in no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- severity: minor
- status: open
- locus: Exam traps, bullet 2
- claim: A salary rate at exact age x is centred on x - 1/2: divide by s_{x-1/2} (often (s_{x-1}+s_x)/2), not by s_x.
- evidence: None of the open sources read this session (SOA ALTAM sample questions/solutions Jan 2026, ALTAM notation note, FAM tables, TPR and Pensions Authority pages) states the half-year centring convention; it is AMLCR ch.10's, which is commercial and was not read. Under the brief's rule for commercial readings (cut or restate what no open source states) the bullet is removed rather than verified on recall.
- source_rank: 5
- proposed_action: Removed. A checker with AMLCR 3rd ed. ch.10 may restore it with a page citation.
- applied: true
- fingerprint: 2281746ce7b6

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated to the Pensions Authority (Ireland) sentence in this run.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Bullet deleted in this run (clean-up round, rule 2).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: links read first; definition, FAS/CAE/CARE formulas, salary convention, replacement ratio, risk-bearing, PUC/TUC against SOA ALTAM sample solutions, TPR and the Pensions Authority; both examples recomputed independently, SULT inputs against the FAM tables; exam-tips against the ALTAM sample set and the RET-101 syllabus
- sources_checked: SOA Exam ALTAM sample written-answer solutions (Jan 2026), Q37-Q38 pp.76-78, Q40 pp.80-83, Q42 p.86, Q47 p.94, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA Exam ALTAM sample written-answer questions (Jan 2026), Q38-Q40 pp.71-73, Q42 p.77, Q47 p.85, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; The Pensions Regulator (UK), Trustee toolkit: How a DB scheme works, Tutorial 1, pp.2-3, 9, sha256:99f71eb7fbadec8b4143d239503d18a10b1ed18454401729aa1a6a9f3704d60f — https://trusteetoolkit.thepensionsregulator.gov.uk/pluginfile.php/133/mod_data/content/3071/How%20a%20DB%20scheme%20works%20-%20Tutorial%201%20The%20basics.pdf; The Pensions Authority (Ireland), Career average defined benefit schemes, whole page, sha256:ca61f10538960af012606f48a5be0889d3a74c7d093186ec50851021893178c2 — https://pensionsauthority.ie/?p=3931; SOA Tables for Exam FAM (Oct 2024), SULT at i=0.05, pp.20-21 (ages 50, 55, 60, 65, 70-72, 80), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; U.S. Department of Labor, Types of Retirement Plans (https://www.dol.gov/general/topic/retirement/typesofplans), read 2026-10-31 by web fetch; no sha256 — the site refuses scripted downloads
- note: Definition: DOL ('promises a specified monthly benefit... plan formula that considers such factors as salary and service'), TPR p.2 (benefit agreed at outset, contributions variable). FAS = n*alpha*S_Fin as in ALTAM Q38/Q40 solutions; CAE = alpha * total earnings (Q42); CARE with revaluation by an index to retirement (TPR p.3, CPI; Pensions Authority). S_y = salary in year of age y to y+1 (Q37/Q38 solutions); replacement ratio over the final year's salary (Q38(b) graders' comment). Risks with the sponsor: TPR p.9 (equity returns below assumption -> higher contributions; shorter life expectancy assumption). PUC projects salary, TUC does not (Q40 solutions p.83). Example 1 recomputed: S62..S64 = 133,277 / 137,276 / 141,394; FAS 137,316; B 61,792; R 43.7%; career total 2,854,525; CAE 42,818, 30.3%; alpha 2.165%. Example 2: 1.03^15 = 1.557967 -> 124,637; B_PUC 28,043; 15E50 = 5E50*10E55 = 0.77772*0.59342 = 0.46152 (FAM tables; page 0.46151); AL 108,716 and 169,376 (unrounded B). The 'Dickson, Hardy & Waters, ch.10' notation attribution was not checked (commercial). RET-101 tip matches the syllabus topics (DB vs DC, hybrid, sponsor risk). Two minor findings fixed. Rule 6: page was unverified for every exam that links it (FAM, ALTAM, RET-101, CIA pages), so no re-check is owed.
