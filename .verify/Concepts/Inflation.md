---
target: Concepts/Inflation.md
created: 2026-09-28
---

## [F-001] Lead says fixed limits leverage inflation upward; P-21-05 shows a fixed limit damps it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: opening paragraph, line 14
- claim: Because policy provisions - deductibles, limits, retentions - are stated in fixed dollars, inflation does not scale the insurer's cost proportionally: it is leveraged, raising the insurer's payment by more than r.
- evidence: P-21-05 §VII: with a fixed 500 deductible and no limit, expected claim payments grow 650 -> 998 (+54%) while expected losses grow 750 -> 1098 (+46%) over five years of 10% inflation (PDF p.10) - leverage, as the page says. But with a fixed 12,500 maximum claim payment added: Adding a fixed maximum on claim payments limits the effect of inflation. Expected claim payments grow from 610 in year 1 to 819 in year 5, an increase of 34%, which is less than the 46% increase in expected losses (PDF p.11). Werner & Modlin Ch.6 (PDF pp.129-130): a 10% total-limits severity trend is dampened to 3.5% in basic-limits losses. The second bullet of the page says the same (less than r growth for the primary insurer), so the lead contradicts both the source and the page itself. More than r holds for a fixed deductible or retention alone.
- source_rank: 1
- proposed_action: Restrict the lead's 'more than r' to deductibles and retentions, and say a fixed limit damps the primary insurer's growth (P-21-05 p.11).
- applied: false
- fingerprint: 17abdfcf92c8

## [F-002] Worked example: 1100 e^-0.4545 is 698.2, not 698.1
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: Leveraged Effect example, answer align block, line 41
- claim: E[(X' - 500)+] = 1100 e^-0.4545 = 698.1
- evidence: Recomputed before reading the answer: E[(X - d)+] = E[X] - E[X^d] = theta e^(-d/theta) (SOA Tables for Exam C, exponential, PDF p.11). Before: 1000 e^-0.5 = 606.53. After 10% inflation, theta = 1100: 1100 e^(-500/1100) = 1100 x 0.634736 = 698.21. The page prints 698.1, and 698.1 again in the ratio line. The conclusion survives: 698.21/606.53 - 1 = 15.12%, which rounds to the +15.1% the page gives. Low consequence, hence minor.
- source_rank: 5
- proposed_action: Change 698.1 to 698.2 in the align block and in the ratio line.
- applied: false
- fingerprint: 22d2bd296fea

## [F-003] Reserving example: the figures quoted do not show the excess growing with maturity
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: Calendar Year example, answer first paragraph, line 63
- claim: Every factor on the latest diagonal exceeds its column history, and the excess grows with maturity - +11% at 12-24 but +7 points at 48-60 where development had been nearly complete.
- evidence: Recomputed from the table: latest-diagonal factor vs column average is 1.58/1.42 = +11.3% (+16 points), 1.28/1.18 = +8.5% (+10 points), 1.16/1.09 = +6.4% (+7 points), 1.11/1.04 = +6.7% (+7 points). As a percentage or in points the excess shrinks with maturity; it grows only as a share of the expected remaining development (0.16/0.42 = 38%, 0.10/0.18 = 56%, 0.07/0.09 = 78%, 0.07/0.04 = 175%). The sentence compares a percentage at 12-24 with points at 48-60, so the numbers it quotes contradict the claim they illustrate.
- source_rank: 5
- proposed_action: Say in which measure the excess grows (excess development over the column-average development) and quote those figures.
- applied: false
- fingerprint: ffabca05f58d

## [F-004] Exam FM-2 links this page beside the real rate of interest; the page covers only the loss-model sense
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole page, opening definition line 14
- claim: Inflation in an insurance context is growth in the underlying loss random variable over time, X' = (1+r)X.
- evidence: Exam FM-2 (SOA).md line 25 lists [[Inflation]] and [[Real Rate of Interest]] among the interest-rate measures; an FM candidate following that link finds no treatment of inflation as a rate in the real/nominal interest relation. The Exam P sense is right: SOA Exam P sample Q328 models 3% inflation as Var[1.03X + 2.5] (solution PDF p.91), i.e. the loss scaled by (1+r). A legitimate SOA FM vs SOA P context difference to flag, not reconcile; the FM syllabus was not read in this pass (rank-4 cross-reference).
- source_rank: 4
- proposed_action: Either add the FM sense (inflation rate and the real rate of interest) with its source, or point the FM page link at Real Rate of Interest.
- applied: false
- fingerprint: 726e81c0f776

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: in_review
- checks_run: X' = (1+r)X vs SOA Q328 solution. Identity E[(X'-d)+] = (1+r)E[(X - d/(1+r))+] by substitution; deductible leverage vs P-21-05 p.10; limit damping vs P-21-05 p.11 and Werner pp.129-130 (bullet 2 correct, lead contradicts it - major). Example 1 recomputed first: 606.53 and 698.21, +15.12% - result agrees, intermediate 698.1 off (minor). Example 2 factors recomputed (minor on the maturity wording). Links and embed resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VII Inflation PDF pp.10-11; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF pp.17-18), Q243 (PDF p.72), Q328 (PDF p.91), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Werner & Modlin, Basic Ratemaking (CAS), Ch.6 Leveraged Effect of Limits on Severity Trend PDF pp.129-130; Ch.11 coinsurance notation PDF pp.221-222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note, 451 pp.), claim life cycle PDF p.14, reopened claims and IBNR PDF p.20, claims-made accident date PDF p.44, reported claim count triangle PDF p.66, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: In review: the reserving content is unsourced - inflation as a calendar-year effect seen as an elevated diagonal, social inflation, and Example 2's prescribed treatment (apply the level shift to unpaid, select factors from pre-shock history) were not found in Friedland (searched for calendar year / diagonal near inflation: only p.50 lists inflation among environmental changes and p.397 a paid-to-paid distortion); the 5% -> 8% ratemaking figure is not in Werner pp.129-130. Needs the Exam 5 reading that treats calendar-year effects (e.g. Friedland Ch.13 Berquist-Sherman) and a source for the ratemaking figure.

## [F-005] Unsourced ratemaking and reserving statements
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullets 3-5 and Calendar Year example answer
- claim: Excess and reinsurance rates move so violently with modest changes in ground-up severity; a 5% economic trend can produce an 8% trend on a book with fixed deductibles; inflation as a calendar-year effect seen as an elevated diagonal that development factors do not anticipate; social inflation (litigation funding, broadened liability theories) makes long-tail reserves inadequate across a book; Example 2 prescribed treatment (apply the level shift to unpaid, select factors from pre-shock history).
- evidence: The C-001 pass of this run searched Werner & Modlin and Friedland and found none of these: Werner pp.129-130 has no 5% -> 8% figure, Friedland mentions inflation only among environmental changes (PDF p.50) and in the frequency-severity discussion (PDF p.218).
- source_rank: 1
- proposed_action: Replace with what Werner & Modlin and Friedland say.
- applied: true
- fingerprint: 66422796aa4d

## [F-001/R] Lead restricted: a fixed deductible leverages, a fixed limit damps
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Lead now says a fixed deductible raises the insurer expected payment by more than r and a fixed limit raises the capped payment by less than r, and a new bullet quotes P-21-05 PDF pp.10-11: expected losses +46% (750 -> 1098), payments under a fixed 500 deductible +54% (650 -> 998), with a fixed 12,500 maximum +34% (610 -> 819).

## [F-002/R] 698.1 corrected to 698.2
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Both occurrences changed: 1100 e^(-500/1100) = 698.21; ratio 698.21/606.53 - 1 = 15.1% unchanged.

## [F-003/R] Maturity comparison restated in one measure
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-003
- status: resolved
- note: The answer now lists each latest-diagonal factor against its column average (1.58 vs 1.42, 1.28 vs 1.18, 1.16 vs 1.09, 1.11 vs 1.04) and shows the excess growing as a share of expected development: 0.16/0.42 = 38%, 0.10/0.18 = 56%, 0.07/0.09 = 78%, 0.07/0.04 = 175%. The prescribed treatment was replaced by what Friedland PDF p.218 says (development techniques assume past patterns account for inflation; frequency-severity reflects it explicitly but is highly sensitive to the assumption).

## [F-004/R] Exam FM sense added with the FM syllabus as source
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-004
- status: resolved
- note: Added a bullet: on Exam FM the word belongs to interest theory; the December 2026 FM syllabus, Topic 1 Time Value of Money outcome a, lists inflation and real rate of interest together among the terms to define and recognize (PDF p.2), with a link to Real Rate of Interest.

## [F-005/R] Unsourced statements replaced from Werner & Modlin and Friedland
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-005
- status: resolved
- note: Excess-layer bullet now quotes Werner PDF pp.129-130 (positive severity trend: basic limits <= total limits <= excess losses; 10% dampened to 3.5%; deductibles leverage with censoring below the deductible). Ratemaking bullet: monetary inflation, increasing medical costs and advancements in safety technology drive loss trends (Werner PDF p.122). Reserving bullet: an increase in the inflation rate among economic-environment changes (Friedland PDF p.50); average case outstanding rising down a column at the inflation rate in a stable environment (Friedland PDF p.81); development vs frequency-severity techniques (Friedland PDF p.218). Social inflation defined as Werner PDF p.204 does. The 5% -> 8% figure, the violently sentence and the prescribed reserving treatment were deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001 to F-005 (and the C-001 in_review reasons): every bullet traced to P-21-05, Werner & Modlin, Friedland or the FM syllabus. Identity E[(X-d)+] under X = (1+r)X by substitution. Example 1 recomputed: 1000 e^-0.5 = 606.53; 1100 e^-0.4545 = 698.21; +15.1%; 500/1.1 = 454.55. Example 2 recomputed: 38%, 56%, 78%, 175%. Real Rate of Interest page exists. Medium: original worked examples, the reserving diagnosis is an illustration.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VII Inflation: fixed deductible +54% vs losses +46% PDF p.10; fixed maximum claim payment +34% PDF p.11; SOA Exam P Sample Solutions (Aug 2026 revision), Q328 (3% inflation as Var[1.03X + 2.5], PDF p.91), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.6 loss trend drivers PDF p.122; Leveraged Effect of Limits on Severity Trend PDF pp.129-130; Ch.11 social inflation PDF p.204, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note), economic environment PDF p.50; diagonals as valuation dates PDF p.59; average case outstanding in a stable environment PDF p.81; frequency-severity and inflation PDF p.218, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money outcome a (inflation and real rate of interest), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-006] Latest-diagonal diagnosis read as inflation is not in Friedland, which warns of a claim-mix explanation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T18:02Z/0389
- date: 2026-11-06
- severity: minor
- status: open
- locus: On other exams, Exam 5 reserving, third bullet
- claim: When every factor on the latest diagonal exceeds its column average, and paid severity on closed claims rose too, the payments themselves went up. That is consistent with an inflation shift.
- evidence: Friedland (5_Friedland.pdf, sha256:5e98308233...) says triangles of average values for a stable insurer should change down the columns by inflationary forces only (PDF p.80), but when the latest diagonal of the average paid triangle is the highest in each column it asks whether there has been a change in the type of claim being closed at those ages (PDF p.80) and, in Ch.11, whether the speed-up in settlement has shifted the type of claim closed at each maturity (PDF p.218); it also warns that a different mix of claims alone raises averages (PDF p.82). No passage reads an elevated latest diagonal plus rising closed-claim severity as payments having gone up or as an inflation shift. The other three reserving bullets are supported (PDF pp.50, 59, 80, 218).
- source_rank: 2
- proposed_action: Cite a reading that draws this conclusion, or qualify it with Friedland's mix-of-claims caveat (pp.80, 82, 218), or drop the bullet. Needs authoring; not auto-fixed.
- applied: false
- fingerprint: ab6c1aab8937

## [F-007] P-21-05 bullet filed under the Exam 5 and Exam 8 heading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-06T18:02Z/0389
- date: 2026-11-06
- severity: nit
- status: open
- locus: On other exams, Exam 5 and Exam 8, third bullet
- claim: The study note P-21-05 shows both effects on a car policy at 10% inflation a year.
- evidence: The figures are right (P-21-05 PDF pp.10-11: losses 750 -> 1098, +46%; fixed 500 deductible 650 -> 998, +54%; with 12,500 maximum 610 -> 819, +34%; recomputed 46.4%, 53.5%, 34.3%), but P-21-05 is the SOA Exam P study note (Exam P syllabus PDF p.3), not an Exam 5 or Exam 8 reading; under this heading a reader may take it for one.
- source_rank: 1
- proposed_action: Move the bullet to the body (e.g. under 'A fixed limit') or name it as the Exam P study note.
- applied: false
- fingerprint: fe8e7eeec22d

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-06T18:02Z/0389
- date: 2026-11-06
- status_set: verified
- confidence: medium
- checks_run: Recomputed in python before comparing (scipy quad / closed forms): uniform(0,1000) -> (0,1100): mean 500/550, Var 83,333/100,833; E[(X-200)+] 320 -> 368.18 (+15.1%), P(pay) 0.8 -> 0.818; 1.1 x E[(X-181.82)+] = 1.1 x 334.71 = 368.18; per payment 400 -> 450 (+12.5%), 1.151 = 1.125 x 1.0227; E[X^600] 420 -> 436.36 (+3.9%), above limit 80 -> 113.64 (+42.0%); LER 180/500 = 0.360 -> 181.82/550 = 0.331; FM 1.05/1.02 - 1 = 2.94%. Try-its: 606.53 -> 698.21 (+15.1%), 500/1.1 = 454.55; per payment +10%, e^-0.5 = 0.6065 -> e^-0.4545 = 0.6347, 1.10 x 1.0465 = 1.151; exponential 2000 limit 3000: 1553.74 -> 1637.40 (+5.4%), above 446.26 -> 562.60 (+26.1%); P-21-05 46.4%, 53.5%, 34.3%. All agree. Scaling identities vs LDA §3.4.3 and Bahnemann eq. 2.67 context; family/parameter rules vs LDA §3.3.1, Bahnemann p.80. Exam bullets vs FM Q402, W&M pp.122, 129-130, 204, Bahnemann §2.8/§5.5 (Exam 8 reading, Ch.5-6 assigned per Exam 8 content outline), Friedland pp.50, 59, 80, 218. Links resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VII Inflation: fixed deductibles and limits; deductible 500 table 650 -> 998 (+54%) vs losses 750 -> 1098 (+46%) PDF p.10; maximum 12,500 table 610 -> 819 (+34%) PDF p.11, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.3.1 scale distributions and inflation (lognormal mu + log 1.3, sigma unchanged); §3.4.3 inflated loss (1 + r)X with d and u unchanged, E(Y^L) = alpha(1 + r)[E(X^(u/(1+r))) - E(X^(d/(1+r)))], sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Bahnemann, Distributions for Actuaries (CAS Monograph 2), §2.8 Inflation Effects: uniform trend Y = tX, lognormal (mu + log t, sigma), monetary vs social/judicial inflation PDF p.80; censored severity E[tX; l] and the leveraging effect of an upper limit, which disappears when the limit is trended too PDF p.81; §5.5 Inflation Effects PDF p.165, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 trend drivers (monetary inflation, medical costs, safety technology) PDF p.122; Leveraged Effect of Limits on Severity Trend, 10% -> 3.5%, basic <= total <= excess, deductibles leverage with censoring below the deductible PDF pp.129-130; Ch.11 social inflation, disproportionate impact on increased limits PDF p.204, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS), economic environment, increase in the inflation rate PDF p.50; diagonals as valuation dates PDF p.59; average values down columns limited to inflationary forces PDF p.80; frequency-severity reflects inflation explicitly, highly sensitive to the inflation assumption PDF p.218, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; SOA Exam FM Sample Questions, Q402 interest rate i, real rate i', inflation r (PDF p.170), sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions, Q402 solution (1 + i')(1 + r) = 1 + i (PDF p.106), sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM syllabus, December 2026, Topic 1 outcome a: inflation and real rate of interest, PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam P Sample Questions (2026-05 edition), Q328: 3% inflation and fixed maintenance cost 2.5 (PDF p.134), sha256:24980e6de9cc0a68f13ac33b0ab4b18ad8ebb54d42d1afe08eed8bebb212cf06 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf; SOA Exam P Sample Solutions (2026-05 edition), Q328 solution Var(1.03X + 2.5) = 1.03^2 Var X (PDF p.90), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Tables for Exam C (Fall 2009), A.3.3.1 exponential E[X^x] = theta(1 - e^(-x/theta)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcome: as well as other factors, such as inflation, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Verified with two open findings: a minor (an unsourced reserving diagnosis that overlooks Friedland's claim-mix caveat) and a nit (P-21-05 bullet under the Exam 5/8 heading). Medium because of the open minor.
