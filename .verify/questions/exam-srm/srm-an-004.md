---
target: questions/exam-srm/srm-an-004.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T19:37Z/7805
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation: ybar 7, deviations -3,-1,-2,2,1,3, numerator 6, denominator 28, r1 = 0.2143 -> A; formula in the explanation diffed symbol by symbol against Frees's definition; each distractor reproduced (0.257 = (6/5)/(28/6); 0.316 = 6/19; 0.453 = ordinary Pearson correlation of the lagged pairs, Sxy 7.8, Sxx = Syy = 17.2; 0.780 = 251/322); option distinctness; section number against the text's contents; syllabus scope
- sources_checked: Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge, 2010) — author-posted online text, Ch. 8 Autocorrelations and Autoregressive Models, §8.1 Autocorrelations (Definition of the lag k autocorrelation statistic r_k), sha256:815296f6791408afe67faf1e7bf9f91f23dcc23c3461e56bd40da90f89bd6ff8 — https://users.ssc.wisc.edu/~ewfrees/ActuarialRegression2009/C8AR.html; SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf
- note: Key A confirmed. The explanation's r_k is Frees's definition verbatim (single mean ybar, full-series sum of squares in the denominator), and it sits in §8.1 of the text, so the citation 'Frees, §8.1' is correct. Source read is the author's own posted online version of the book (users.ssc.wisc.edu, 'ActuarialRegression2009'); its Chapter 8 section list (8.1 Autocorrelations ... 8.4 Smoothing and Prediction) matches the SRM assignment Ch.8 §1-4, but the printed 2010 Cambridge edition itself was not read - medium is the ceiling (D7). Within SRM 'Time Series Models' obj. 1.
