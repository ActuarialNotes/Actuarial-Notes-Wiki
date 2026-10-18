---
target: questions/exam-srm/srm-an-005.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T19:37Z/7805
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind reasoning to the key before reading it (residuals uncorrelated, squares autocorrelated, clustering without trend -> D); ±2/sqrt(T) band convention checked against Frees; ARCH(p) formula in the explanation diffed against Frees §9.5 (Frees writes w for omega - notation only); unconditional variance w/(1-sum gamma) checked against Frees's GARCH result with delta = 0; each distractor's rationale; section number; syllabus scope
- sources_checked: Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge, 2010) — author-posted online text, Ch. 9 Forecasting and Time Series Models, §9.5 ARCH/GARCH Models (volatility clustering; ARCH(p) conditional variance recursion; weak stationarity with constant unconditional variance), sha256:b2cb2744c12fcd2d8921bc23c8fe10c2304561e9c117b8ee2d0039791a7f4b3f — https://users.ssc.wisc.edu/~ewfrees/ActuarialRegression2009/C9Forecast.html; Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge, 2010) — author-posted online text, Ch. 8 Autocorrelations and Autoregressive Models, §8.2 (se(r_k) = 1/sqrt(T); rule of thumb |r_k| > 2 se(r_k) at 5%), sha256:815296f6791408afe67faf1e7bf9f91f23dcc23c3461e56bd40da90f89bd6ff8 — https://users.ssc.wisc.edu/~ewfrees/ActuarialRegression2009/C8AR.html; SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf
- note: Key D confirmed. The writer's doubt about the bands is settled: Frees §8.2 gives se(r_k) = 1/sqrt(T) and treats |r_k| > 2 se(r_k) as significant at 5%, so ±2/sqrt(240) is Frees's convention. Frees §9.5 describes volatility clustering ('periods of high volatility ... followed by periods of low volatility'), defines ARCH(p) as sigma_t^2 = w + gamma_1 eps_{t-1}^2 + ... + gamma_p eps_{t-p}^2 with gamma(1) < 1, and says 'despite having a changing conditional variance, the unconditional variance remains constant over time' (supports D and refutes C/E). Citation 'Frees, §9.5' is correct. Not in Frees: the squared-residual autocorrelation diagnostic itself is not stated in §9.5; it follows from the ARCH recursion (a large eps_{t-1}^2 raises sigma_t^2), so that link rests on the model's definition rather than a sentence in the reading. Source read is the author's posted online text, not the printed 2010 edition: medium ceiling (D7). Within SRM 'Time Series Models' obj. 2.
