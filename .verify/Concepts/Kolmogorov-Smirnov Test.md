---
target: Concepts/Kolmogorov-Smirnov Test.md
created: 2026-10-05
---

## [F-001] K-S critical constants are large-sample values, not labelled as such
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'Critical values.' and the exponential example's 1.36/sqrt(8)
- claim: Gives 1.22/sqrt(n), 1.36/sqrt(n), 1.48/sqrt(n), 1.63/sqrt(n) as the 10/5/2.5/1% critical values (attributed to the SOA) and evaluates them at n = 5 and n = 8 without saying they approximate the exact small-sample values.
- evidence: The constants and the attribution are right: SOA Exam C Sample Question #172(iii) (questions PDF p.111, sha256:2e44cec57f895a09b66bd11d32297b3d776d306d4a26b6146c30c1022b9130ed) prints exactly 1.22/sqrt(n), 1.36/sqrt(n), 1.48/sqrt(n), 1.63/sqrt(n) at 0.10/0.05/0.025/0.01, and its solution (solutions PDF p.62, sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a) evaluates them at n = 5 as 0.546, 0.608, 0.662, 0.729, as the page does. They are the quantiles of the limiting distribution of sqrt(n)D (recomputed here: 1.2238, 1.3581, 1.4802, 1.6276). NIST e-Handbook §1.3.5.16 (eda35g.htm, sha256:9e25cf9442f62f998c7a463f27db95b3aabedf15568db101baaefc21f3e465ed) confirms the large-n value (N = 1000, 5% critical value 0.04301 = 1.36/sqrt(1000)) but gives the 5% critical value for N = 20 as 0.294, against 1.36/sqrt(20) = 0.304. At n = 5 and n = 8 the formula therefore overstates the exact critical value; the example's decision (D = 0.123 against 0.481) does not change.
- source_rank: 3
- proposed_action: Say that the c/sqrt(n) values are the large-sample critical values the SOA supplies with its questions, and that exact tables give slightly smaller values for small n.
- applied: false
- fingerprint: ad1ea3f7f34d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Both examples recomputed in python before comparing: all eight F*(x_(i)) values and gaps reproduced, D = 0.12281 at x = 390, 1.36/sqrt(8) = 0.4808; A-D u_i, ln u_i, weighted terms and sum -17.2980 reproduced, A^2 = 0.32449, and the same value obtained independently from the integral definition n * int (F_n - u)^2/(u(1-u)) du (so the computational formula on the page is the right one). K-S critical constants checked against the SOA question/solution, NIST and the limiting Kolmogorov quantiles (finding: large-sample values). Limitations and A-D tabulation claims checked against NIST. Links resolve; LaTeX balanced.
- sources_checked: NIST/SEMATECH e-Handbook §1.3.5.16 Kolmogorov-Smirnov Goodness-of-Fit Test: D = max_i (F(Y_i) - (i-1)/N, i/N - F(Y_i)); distribution of D does not depend on the F tested; only for continuous distributions; more sensitive near the centre than at the tails; fully specified F, otherwise critical region invalid and found by simulation; 5% critical value 0.294 at N = 20 and 0.04301 at N = 1000, sha256:9e25cf9442f62f998c7a463f27db95b3aabedf15568db101baaefc21f3e465ed — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35g.htm; NIST/SEMATECH e-Handbook §1.3.5.14 Anderson-Darling Test: A^2 = -N - S, S = sum (2i-1)/N [ln F(Y_i) + ln(1 - F(Y_(N+1-i)))]; more weight to the tails than K-S; critical values depend on the distribution tested, tabulated for the normal, lognormal, exponential, Weibull, logistic, extreme value type 1 and others; reject when A^2 exceeds the critical value, sha256:937b4c6e5faa3b60df6ac5f20aedd2eaa8cefc3b745950680f562b8eae618771 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35e.htm; Loss Data Analytics (Frees et al., open textbook), ch.4 Model Selection and Estimation, Table 4.2: K-S max|F_n - F| with D+ / D- at i/n and (i-1)/n; A-D definition n integral (F_n - F)^2 / (F(1-F)) f dx; A-D places greater emphasis on the tails, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; SOA Exam C Sample Questions, Question #172(iii), PDF p.111: critical values 1.22/sqrt(n), 1.36/sqrt(n), 1.48/sqrt(n), 1.63/sqrt(n) at 0.10/0.05/0.025/0.01, sha256:2e44cec57f895a09b66bd11d32297b3d776d306d4a26b6146c30c1022b9130ed — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-quest.pdf; SOA Exam C Sample Solutions (C-09-15), Question #172, PDF p.62: n = 5 critical values 0.546, 0.608, 0.662, 0.729; #189 (PDF p.67): the K-S test works only on individual data, sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Tse §13.2, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, printed contents PDF pp.10-13: §13.2.1 'Kolmogorov-Smirnov test', §13.2.2 'Anderson-Darling test' (contents only; body not freely available), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf
