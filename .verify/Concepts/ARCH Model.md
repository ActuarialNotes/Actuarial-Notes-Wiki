---
target: Concepts/ARCH Model.md
created: 2026-10-31
---

## [F-001] GARCH(p, q) index order differs from Bollerslev/Wikipedia
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- severity: nit
- status: open
- locus: body, third formula block and Symbols bullet
- claim: GARCH(p, q) is written with p lags of the squared shock and q lags of the conditional variance.
- evidence: Wikipedia, 'Autoregressive conditional heteroskedasticity', GARCH(p, q) model specification, writes sigma_t^2 = omega + sum_{i=1}^{q} alpha_i eps_{t-i}^2 + sum_{i=1}^{p} beta_i sigma_{t-i}^2, p being the order of the GARCH (sigma^2) terms and q of the ARCH (eps^2) terms - the reverse of the page's labels. The syllabus reading (Frees 2010, §9.5 'ARCH/GARCH Models', p.285 per the publisher's printed contents) is commercial and was not read, so which order SRM's reading uses is unconfirmed. A notation difference, not an error: the formulas themselves agree, and GARCH(1, 1), the case both examples use, is unaffected.
- source_rank: 3
- proposed_action: A reader with Frees §9.5 confirms which index order the reading uses; if it is Bollerslev's, add a one-line notation note. No change made.
- applied: false
- fingerprint: 1ba39ac2db38

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Read every link (all resolve). Definition and volatility clustering against Engle pp.327-330 and Wikipedia; ARCH(p) equation, positivity constraints and conditional-variance definition against Wikipedia; long-run variance, stationarity condition, fat tails and the per-period decay of a shock (half-life ln 0.5/ln(gamma+delta)) against V-Lab; squared-residual autocorrelation as the ARCH signal against Engle p.328 and p.336; 'Frees Chapter 9 treats both' against the publisher's printed contents (9.5 ARCH/GARCH Models). SRM exam claims against the January 2027 syllabus (3b names ARCH models, 3c predicted values and confidence intervals). Both worked examples recomputed independently (rank 5, consistent): sigma^2 = 0.004, sd 0.0632, interval -11.6% to 13.2%, unconditional sd 0.0378, ratio 1.67; long-run 0.0005, forecast 0.00102 (3.19%), half-life 34.3 months. Nit F-001 (GARCH index order vs Bollerslev/Wikipedia) left open as a notation difference; Frees §9.5 itself is commercial and not read, hence medium.
- sources_checked: SOA, Exam SRM syllabus, January 2027, Topic 3 learning outcomes 3a-3c, p.4; Textbooks, Frees Ch.9 §1-5, p.5, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf; Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge, 2010), publisher's front matter, printed contents p.viii: Chapter 9, §9.5 ARCH/GARCH Models p.285, sha256:5ba2667a8ef934a28ca17bec157901c672026dbf2613d4c16afafc935df2d0ac — https://assets.cambridge.org/97805217/60119/frontmatter/9780521760119_frontmatter.pdf; Engle, 'Risk and Volatility: Econometric Models and Financial Practice', Nobel Lecture, 8 Dec 2003, pp.327-330 (ARCH as weighted average of past squared forecast errors; squared residuals autocorrelated though residuals are not; GARCH(1,1) as long-run, previous forecast and news; fat tails and volatility clustering; mean reversion), pp.336-337 (squared-return autocorrelations; long-run variance dominates multi-step forecasts), sha256:3f695ec65f09f4e774efdf0b665860297351d62ca3f00cb8c42f54c77b961004 — https://www.nobelprize.org/uploads/2018/06/engle-lecture.pdf; Wikipedia, 'Autoregressive conditional heteroskedasticity' (read 2026-10-31), Model specification and GARCH(p, q) model specification (ARCH(q) equation, alpha_0 > 0, alpha_i >= 0, conditional variance given the past), sha256:dc2f9fafd6d55d312ec93fa705a44f4bdf25eaa63a80e4f8bbba3eed3bc8aba7 — https://en.wikipedia.org/wiki/Autoregressive_conditional_heteroskedasticity; NYU Stern V-Lab, GARCH Model Documentation, Level 1 (long-run variance omega/(1-alpha-beta); alpha+beta < 1 for mean reversion and a finite unconditional variance; fat tails from normal innovations; half-life ln(0.5)/ln(alpha+beta)), sha256:3670f3187430338b34d68bd2db4fce7c9e0987ed3b98a74001cfc4a60bf59805 — https://vlab.stern.nyu.edu/docs/volatility/GARCH
