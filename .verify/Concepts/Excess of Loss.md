---
target: Concepts/Excess of Loss.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Per-risk vs per-occurrence, working/exposed excess/clash layers, experience rating steps (trend each loss before layering, excess LDFs, divide by adjusted subject premium, ALAE pro rata added per loss), exposure rating with exposure curves and ILFs, credibility blending, rate on line and payback against Clark pp.14-15, 17-23, 27, 47-48. Recomputed the experience example (layer 254/26/750/77; developed 1,205.6; loss cost 7.54%; untrended 850, +30.2%; ground-up +16.6%) and the ILF example (0.40/1.75=0.2286, 0.40/2.00=0.2000, 0.65x3.286=2.136M, 14.2%).
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf
- note: Medium: vault-authored examples; formulas consistent with Clark (rank 2).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page: formulas and every Clark attribution against pp.22-32 word for word; the ALAE-effects bullet against Clark pp.24-25 and p.29 (ALAE inside a limit is reached by loss of AP/(1+e): a lower effective attachment) and the 2014 Q21 report for the tie-break; drift bullet against Clark p.24 and the 2014 Q20(b) report; examples recomputed: pro rata 400 + 133 = 533 vs part-of-loss 500; umbrella 1M at 1M attachment = 2M ground-up, 3M with today's 2M; burn cost 1,205.6 / 16,000 = 7.54%, leverage 30.2% vs 16.6%; ILF exposure 2.136M, 14.2%; rule 10: no example carries 2014 Q20/Q21 or 2016 Q19 figures
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), §1B p.9 (loss occurrence limit), §2A-2B pp.16-20 (experience and exposure rating, credibility, free cover), §3A pp.22-25 (working, exposed excess and clash layers; ALAE method may expose the clash layer; trend then cap; no generally accepted solution; historical limit leaves out that insureds raise limits; uncapped trend assumes limits drift with inflation and needs premium adjusted; pro-rata with loss vs ALAE as part of loss; Examples 1-2; 'not necessarily higher or lower for either method'; excess development), pp.27-30 (casualty exposure factor with ILFs; ALAE included with loss, attachment and limit divided by 1+e), §3B(a) pp.31-32 (umbrella over another carrier: (Loss + Underlying limit) x Trend - Underlying limit), §5 (reinstatements, rate on line, payback), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 8 Fall 2014 — sample answers and examiner's report, Q20(b) and Q21(a), PDF pp.90, 91-93 (2004 attachment likely lower, so the ground-up loss lower; ALAE inside the underlying lowers the umbrella attachment; outside/outside least and inside/outside most; lowered attachment outweighs uncapped ALAE as most expected loss sits low in the layer), sha256:305e1211892c48fd58bd8be8038483992fba1100023d37422a2bca209f90ada1 — https://www.casact.org/sites/default/files/2021-03/14-8_0.pdf; CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q19, PDF p.75 (pro-rata ALAE in proportion to ceded loss, claim by claim; common mistake: the wrong ratio), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Whole-page check after the writer's Exam 9 G8 passages. The ALAE ranking is kept: the two effects are Clark's (limit applied to loss plus ALAE, p.24; attachment AP/(1+e), p.29), and the tie-break is labelled as the reasoning CAS's examiners credit. Linked from DISC-RM, FAM and ACIA Capstone exam pages, but its verification has been on Clark for Exam 9; this pass stands as their re-check too (rule 6). Source hashes: every CAS and USGS PDF re-fetched from its URL this run and hashed; each matches the hash the writer cited.
