---
target: Concepts/Autoregressive Model.md
created: 2026-10-18
---

## [F-001] AR(1) with phi near 1 called 'long memory'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'phi near 1 means ...'
- claim: $\phi$ near 1 means slow mean reversion and long memory
- evidence: An AR(1) has acf rho_k = phi^k (the page's own first bullet; fpp3 §9.4 MA(inf) weights phi^k), a geometric decay at every phi<1 - short memory. 'Long memory' is a separate class in the reading itself: Cowpertwait's contents (Springer front matter p.xiii) give it its own Chapter 8 'Long-Memory Processes' (fractional differencing), outside the MAS-II assignment. Rank-5 reasoning plus the source's own structure; the clause is wrong, the rest of the bullet stands.
- source_rank: 2
- proposed_action: Delete 'and long memory'.
- applied: true
- fingerprint: d93544c08605

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted ' and long memory'; the bullet now reads 'phi near 1 means slow mean reversion'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: mu = 0.24/0.30 = 0.80, Var = 0.0025/0.51 = 0.0049, Y21 = 0.884, Y22 = 0.8588 = 0.80+0.49*0.12 (all agree). Model equation and phi(B) form per fpp3 §9.3/9.5; |phi|<1 stationarity and phi=1 random walk, negative phi oscillates per §9.3; acf phi^k follows from the MA(∞) weights in §9.4; identification per §9.5. One wrong clause fixed (F-001). Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.3 Autoregressive models (AR(1) cases, stationarity constraints), §9.4 (AR(1) as MA(∞) with weights phi^j), §9.5 identification, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §5.5 prediction intervals, read 2026-10-18, sha256:d72117b50768eed014ba8ec8bc835940cdfa2b34ca7ec76b22ce2b0484877f9a — https://otexts.com/fpp3/toolbox.html
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:16Z/23c2
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole-page re-check after the G8 writer's edit (MAS-II page links it — rule 6 delta check done here): AR(p) and backshift form, AR(1) correlation φ^k, mean c/(1−φ), variance σ²/(1−φ²), stationarity |φ| < 1 / roots outside unit circle, φ = 1 random walk, ACF tails off / PACF cuts off, geometric forecast decay vs FPP3 Ch.9 §9.3–9.5, §9.8 and Wikipedia 'Autoregressive model'; new AR(1) fitting passage: b1 = r1 with r1 per FPP3 §2.8 r_k (index shifted) and the Yule–Walker p = 1 result ρ1 = φ1 (Wikipedia); b0 = ȳ(1 − b1) from FPP3 eq.(9.4) c = μ(1 − φ1) with μ estimated by ȳ; fitted value and residuals for t = 2..T, and s² = Σ(e_t − ē)²/(T − 3) vs Frees's own posted Chapter 8 R script (ind = index[-1]; e = ind − fitted; s = sqrt(sum((e − mean(e))^2)/(length(ind) − 2)), length(ind) = T − 1); ē ≠ 0 under the r1 approximation shown by recomputation (example ē = 0.55; the SOA SRM Q58 solution's ē = 2.78); worked examples recomputed before reading: μ 0.80, Var 0.0049, Ŷ21 0.884, Ŷ22 0.859; T = 5 fit r1 = 0.1, b0 = 10.8, residuals −0.8, 1.1, −0.1, 2.0, ē 0.55, Σ(e − ē)² 4.65, s² 2.325 — all agree
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.3 AR(p), §9.4 AR(1) as MA(∞) with weights φ1^j, §9.5 eq.(9.4) c = μ(1 − φ1 − … − φp), §9.8 Forecasting (point-forecast recursion; MA(q) interval σ²[1+Σθ²]; AR(1) via MA(∞); stationary intervals converge; intervals too narrow — parameter and order uncertainty not included), §9.10 ETS(A,N,N) = ARIMA(0,1,1), read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/arima.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.2 §2.8 Autocorrelation: r_k = Σ_{t=k+1}^T (y_t − ȳ)(y_{t−k} − ȳ) / Σ_{t=1}^T (y_t − ȳ)², read 2026-10-31, sha256:9ac4109a793cf41388d4d737c2b457334d63fe527f8276ded8ebe829b8e1d72c — https://otexts.com/fpp3/acf.html; Wikipedia, 'Autoregressive model', §Calculation of the AR parameters, Yule–Walker equations, p = 1: γ1 = φ1γ0, hence ρ1 = φ1; AR(1) variance σ²/(1−φ²), autocovariance ∝ φ^|n|, sha256:f63c5614c92d1ccc852634c1cf08c9e59f3ece7ad5a4f78d96eed080185391f8 — https://en.wikipedia.org/wiki/Autoregressive_model; Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge 2010) — the author's posted Chapter 8 R script (free, book website), 'Fit AR1 model' block: lagind=index[-51], ind=index[-1], e=ind-fitted, s=sqrt(sum((e-mean(e))^2)/(length(ind)-2)) — residuals for t = 2..T, centred on their mean, divisor (T−1)−2 = T−3, sha256:b308455a8cf8b10e777ade3982e3a883edabb5ffc11aafe87ff8db6af5bc07d5 — https://instruction.bus.wisc.edu/jfrees/jfreesbooks/Regression%20Modeling/BookWebDec2010/RScripts/Chap8RCode.txt; Frees (2010), Regression Modeling with Actuarial and Financial Applications — publisher's index (Cambridge), index entries 'double smoothing, 274', 'exponential smoothed estimate, 276', 'lag k autocorrelation, 253', explanatory variable 'omitted, 197, 201' — locates the syllabus text's treatment (the book itself is commercial and was not read), sha256:1b66298471851d67b5963ff635a7aea743e34afb4ed76006e0b99fc77ad379de — https://assets.cambridge.org/97805217/60119/index/9780521760119_index.pdf
- note: Writer caveat (a) settled: the (T − 3)-divisor, ē-centred s² is stated in an open source by the syllabus author himself — Frees's posted Chapter 8 R script on the book's website, which fits the AR(1) to the T − 1 lagged pairs and computes s from residuals centred on their mean with divisor length(ind) − 2 = T − 3. (His script fits by lm rather than the r1 shortcut, so there ē = 0; the formula is the same.) Frees 2010 Ch.8 text is commercial and was not read (D7). Checked by a different agent from the writer.
