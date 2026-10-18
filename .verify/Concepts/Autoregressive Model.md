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
