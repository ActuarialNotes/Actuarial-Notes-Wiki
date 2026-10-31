---
target: Concepts/Defined Contribution Plan.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:55Z/3416
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: links read first; definition and risk-bearing against DOL, TPR and ALTAM Q40(a); accumulation, annuity purchase and replacement-ratio formulas against ALTAM Q38(d) and Q47; both examples recomputed before reading the answers; exam traps against graders' comments
- sources_checked: SOA Exam ALTAM sample written-answer solutions (Jan 2026), Q37-Q38 pp.76-78, Q40 pp.80-83, Q42 p.86, Q47 p.94, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA Exam ALTAM sample written-answer questions (Jan 2026), Q38-Q40 pp.71-73, Q42 p.77, Q47 p.85, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; The Pensions Regulator (UK), Trustee toolkit: How a DB scheme works, Tutorial 1, pp.2-3, 9, sha256:99f71eb7fbadec8b4143d239503d18a10b1ed18454401729aa1a6a9f3704d60f — https://trusteetoolkit.thepensionsregulator.gov.uk/pluginfile.php/133/mod_data/content/3071/How%20a%20DB%20scheme%20works%20-%20Tutorial%201%20The%20basics.pdf; U.S. Department of Labor, Types of Retirement Plans (https://www.dol.gov/general/topic/retirement/typesofplans), read 2026-10-31 by web fetch; no sha256 — the site refuses scripted downloads; SOA RET-101 syllabus 2026-2027, Topics 1 and 3, pp.2-4, 7, sha256:d33bc465548ca0595f8f716f3bcd30ef23c54843c4ed46a6d01ba46c67d10bc6 — https://www.soa.org/globalassets/assets/files/edu/2026/ret-101/2026-2027-ret-101-syllabus.pdf
- note: Clean pass. DC definition: DOL ('does not promise a specific amount... based on contributions plus or minus investment gains or losses'), ALTAM Q40(a) solution ('actual retirement income may be well below or above the target, depending on investment experience'), TPR p.2 (contributions known, pension variable). Start-of-year accumulation and the geometric form c*S0*(1+i)^n*(1-k^n)/(1-k), k=(1+g)/(1+i), as in ALTAM Q38(d) (contribution rate solved by equating to the annuity value, c = 8.70%). R over the final year's salary: Q38 and Q47 graders' comments. Annuity priced separately from the accumulation rate: Q38 (7% fund, 5% annuity). Example 1 recomputed: (1-k^30)/(1-k) = 21.678, 1.06^30 = 5.74349, F = 622,58x; P = 47,572; S64 = 135,593; R = 35.08%. Example 2: c* = 17.10%; at 4% F = 454,05x, P = 34,695, R = 25.59%, c* = 23.45%; gap 6.3 points. Notation note: the page reuses k as both summation index and ratio (cosmetic, not filed). The mid-year approximation for monthly contributions is timing arithmetic, not a sourced claim. Rule 6: unverified for every exam linking it; no re-check owed.
