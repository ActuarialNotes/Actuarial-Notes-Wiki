---
target: Concepts/Severity Distribution.md
created: 2026-10-05
---

## [F-001] Leveraged trend stated for every excess layer; it holds for unlimited excess losses, not for capped layers
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: Inflation bullet ('The excess layers grow faster than r')
- claim: 'Inflation multiplies the scale parameter ... The excess layers grow faster than r, which is leveraged trend.'
- evidence: Werner & Modlin, Basic Ratemaking 5th ed. (CAS 2016), ch.6 'Leveraged Effect of Limits on Severity Trend', pp.117-118 (PDF 129-130), Tables 6.20-6.21: with positive trend, basic limits trend < total limits trend < excess losses trend, where excess losses are 'the portion of the losses that exceed the basic limit' (no upper limit); a 10% total trend becomes 31.3% on excess losses. A layer with a limit does not obey this: Loss Data Analytics (open text, 1st ed.) ch.3 §3.4.3 Example 3.4.5 - exponential mean 1000, deductible 100, maximum payment 500 (a 500 xs 100 layer), 5% inflation - 'Due to the policy limit, the cost per payment event grew by only 1.1% ... even though the ground up losses increased by 5%'. Recomputed: per loss 356.026 -> 361.660 (+1.58%), per payment 393.469 -> 397.797 (+1.10%), while the unlimited layer excess of 100 grows +5.50% per loss. So excess layers grow faster than r only above a fixed attachment with no (or a rarely reached) upper limit; a capped layer can grow slower than r.
- source_rank: 2
- proposed_action: Restrict the statement to losses above a fixed attachment point with no upper limit, and note that a layer with a limit can grow faster or slower than r (a basic-limits layer always slower). Authoring - needs a human.
- applied: false
- fingerprint: c3783a97cabd

## [F-002] Mixed exponentials classed as heavy-tailed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: Families bullet ('The lognormal, the Pareto and mixed exponentials are heavy-tailed')
- claim: 'The lognormal, the Pareto and mixed exponentials are heavy-tailed, and those are the ones used for excess layers'.
- evidence: Loss Data Analytics (open text, 1st ed.) ch.10 §10.2.1, Definition 10.1: a loss is light-tailed (moment method) if all positive moments exist; the section's closing paragraph gives the more common MGF criterion, under which the lognormal (all moments finite, no MGF) is heavy - so lognormal and Pareto (Ex. 10.2.3, moments only up to alpha) are correctly classed. A finite mixture of exponentials sum_j w_j Exp(theta_j) has every moment (E[X^k] = k! sum_j w_j theta_j^k) and an MGF sum_j w_j / (1 - theta_j t) for t < 1/max theta_j, so it is light-tailed under both criteria; under Definition 10.2 (limiting survival ratio) its tail is proportionally equivalent to the exponential with the largest mean (rank-5 check: w = (0.7, 0.3), theta = (1000, 20000): S_mix(x) / S_Exp(20000)(x) -> 0.3). It is heavier than one exponential only in the relative sense (decreasing hazard rate). LDA ch.3 §3.2.1 classes the gamma light-tailed on the same all-moments ground.
- source_rank: 3
- proposed_action: Drop 'mixed exponentials' from the heavy-tailed list (deletion is transcription), or say they fit large losses better than a single exponential while remaining light-tailed by the moment and MGF criteria (authoring).
- applied: false
- fingerprint: 96b7d70de5d2

## [F-003] Weibull missing from the families the MAS-I syllabus links this page for
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: Families bullet
- claim: Families listed: exponential and gamma (light-tailed); lognormal, Pareto and mixed exponentials (heavy-tailed). No Weibull, and the Pareto is not linked.
- evidence: Exam MAS-I (CAS).md, Statistics > Loss Models, links this page as 'Claim-severity distributions: [[Exponential Distribution]], [[Gamma]], [[Weibull Distribution]], and [[Pareto Distribution]]'. Tse, Nonlife Actuarial Models (CUP 2009; MAS-I reading), printed contents pp.vii-viii (preview PDF pp.9-10): §2.2 'Some continuous distributions for claim severity' = 2.2.1 Exponential, 2.2.2 Gamma, 2.2.3 Weibull, 2.2.4 Pareto; §2.4 Tail properties of claim severity. Loss Data Analytics ch.3 §3.2.3 (Weibull hazard decreasing for shape < 1, 'heavy tailed', increasing for shape > 1) and ch.10 Ex. 10.2.2 (all moments exist -> light-tailed by the moment method). A MAS-I reader arriving from the syllabus finds three of Tse's four named families and no tail statement for the fourth. Concepts/Weibull Distribution.md and Concepts/Pareto Distribution.md both exist.
- source_rank: 2
- proposed_action: Add the Weibull to the families bullet (light-tailed by moments; hazard decreasing for shape < 1) and link [[Weibull Distribution]] and [[Pareto Distribution]]. The sentence is authoring; the links alone are mechanical.
- applied: false
- fingerprint: 81affe4a5647

## [F-004] MBBEFD curves said to 'reproduce' the Swiss Re and Lloyd's curves; the source says they approximate them
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: nit
- status: open
- locus: The MBBEFD class bullet
- claim: 'The one-parameter subfamily with c = 1.5, 2, 3, 4 reproduces the Swiss Re Y1-Y4 curves, and c = 5 reproduces the Lloyd's industrial curve.'
- evidence: Bernegger, 'The Swiss Re Exposure Curves and the MBBEFD Distribution Class', ASTIN Bulletin 27(1) 1997, §4.3 p.109: the Y_i curves 'can be approximated very well with the help of a subclass of the MBBEFD exposure curves' (b and g fitted per curve, then modelled as functions of one parameter c, eq. 4.6); p.110: 'The four curves defined by c = {1.5, 2.0, 3.0 and 4.0} coincide very well with the Swiss Re curves {Y1, Y2, Y3, Y4}' and 'The curve defined by c = 5.0 coincides very well with a Lloyd's curve used for the rating of industrial risks.' The c values, curve names and industrial attribution all match; only 'reproduces' turns a close fit into identity.
- source_rank: 2
- proposed_action: Replace 'reproduces' with the source's 'coincide very well with' (closely approximates).
- applied: false
- fingerprint: ebfb492bfc09

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Definition (size of one claim, CDF/density) = Tse §1.1-1.2; E[X ^ u] = int_0^u (1 - F) = LDA §3.4.2, Bernegger eq. 2.1; layer = difference of LEVs = LDA §3.4.2; ILFs from LEVs = Werner & Modlin ch.11 p.193; G(d) = E[X ^ d]/E[X], increasing, concave, G(0) = 0, G(1) = 1, E[X] = 1/G'(0), 1 - F(d) = G'(d)/G'(0) for d < 1 = Bernegger eqs. 2.1-2.4; x as a fraction of MPL = Bernegger §2.1; MBBEFD c = 1.5-4 / 5 = Bernegger §4.3 (wording, F-004); tail classes: exponential/gamma light, lognormal/Pareto heavy = LDA §3.2, §10.2 (mixed exponential is not, F-002); Weibull absent vs Tse §2.2 and the MAS-I page (F-003); MLE with truncation f/S(d) and censoring S(u) = LDA §3.5.2; inflation multiplies the scale parameter = LDA §3.3.2; leveraged trend = Werner & Modlin ch.6, falsified for a capped layer by LDA Ex. 3.4.5 (F-001). Worked examples recomputed in python before comparing: truncated exponential MLE theta-hat = 11000/4 = 2750 (grid MLE agrees), naive 3750, +36.4%, 4/e^(-1000/2750) = 5.754 ground-up losses (all match); S(x) = (1-x)^3: E[X] = 0.25, G(d) = 1 - (1-d)^4, G(0.2) = 0.5904, G(0.5) = 0.9375, layer 0.3471 x 30,000 = 10,413, retained 17,712, above 5M 1,875, G'(0) = 4 (all match, by numerical integration). All 11 wiki-links resolve. Scope: linked by Exam MAS-I (Loss Models), Exam 8 objective 2 and Exam 9 objective 1; definitions consistent with all three.
- sources_checked: Tse, Nonlife Actuarial Models: Theory, Methods and Evaluation (Cambridge UP 2009; MAS-I reading) — publisher preview: §1.1 p.4 (PDF 22: 'the monetary amount of each claim is called the claim severity or claim size'; frequency and severity modelled separately, severity continuous), §1.2 eqs. 1.1-1.2 (F_X(x) = Pr(X <= x), f_X = dF_X/dx); printed contents pp.vii-viii (PDF 9-10: ch.2 §2.2.1-2.2.4 exponential, gamma, Weibull, Pareto; §2.4 tail properties; §2.5 coverage modifications incl. 2.5.4 inflation, 2.5.5 deductible and claim frequency), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; Frees et al. (eds.), Loss Data Analytics (open textbook, 1st ed.), ch.3 'Modeling Loss Severity': preview (severity = size of loss, combined with frequency by convolution), §3.2.1 gamma light-tailed (all moments exist), §3.2.2 Pareto heavy-tailed, §3.2.3 Weibull hazard, §3.3.2 scale distributions (cX multiplies the scale parameter; lognormal scale e^mu), §3.3.4 lognormal 'heavy-tailed', §3.4.2 E(X ^ u) = int_0^u [1 - F(x)] dx and Y^L = (X ^ u) - (X ^ d), §3.4.3 inflation and Example 3.4.5 (500 xs 100 layer +1.1% per payment under 5% inflation), §3.5.2.2-3.5.2.3 censored (S(u)) and truncated (f(x)/S(d)) likelihoods, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Frees et al. (eds.), Loss Data Analytics (open textbook, 1st ed.), ch.10 §10.2 'Tails of Distributions': Definition 10.1 (moment method), MGF criterion remark (lognormal), Examples 10.2.1-10.2.3 (gamma, Weibull light; Pareto heavy), Definition 10.2 (limiting survival ratio), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html; Bernegger, 'The Swiss Re Exposure Curves and the MBBEFD Distribution Class', ASTIN Bulletin 27(1), May 1997, pp.99-111 (Exam 9 reading; CAS-hosted scan, read from page images): §1 p.99 (risk bands by SI/MPL/EML; risk premium = loss ratio x premium, split between retention and cession); §2.1 eq. 2.1 pp.100-101 (x = X/M, M the MPL; G(d) = L(d)/L(1) = int_0^d (1 - F)/E[x], increasing, concave, G(0) = 0, G(1) = 1; G(d) the ratio of the risk premium retained by the cedent); §2.2 eqs. 2.2-2.3 p.101 (G'(d) = (1 - F(d))/E[x]; F(x) = 1 - G'(x)/G'(0) for 0 <= x < 1); §2.3 eq. 2.4 (E[x] = 1/G'(0)); §4.3 pp.109-110 (one-parameter subclass in c; c = 1.5, 2, 3, 4 'coincide very well' with Y1-Y4, c = 5 with a Lloyd's industrial curve), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/database/astin_vol27no1_99.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), ch.6 'Leveraged Effect of Limits on Severity Trend' pp.117-118 (PDF 129-130, Tables 6.20-6.21: basic limits trend < total limits trend < excess losses trend for positive trend) and ch.11 pp.193, 197 (PDF 205, 209: indicated ILF(H) = LAS(H)/LAS(B); leveraged effect on increased limits), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 5, 8 and 9 and readings Hogg, Tse (p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam 9 Content Outline, Fall 2026, Domain A task 1 'Fit loss distribution-based exposure curves' (p.3) and text reference Bernegger (p.7), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: One major finding open (F-001: 'excess layers grow faster than r' lacks the unlimited-layer condition - LDA Ex. 3.4.5 has a 500 xs 100 layer growing 1.1% under 5% inflation), two minor (F-002 mixed exponentials called heavy-tailed; F-003 Weibull omitted) and one nit (F-004 'reproduces' vs Bernegger's 'coincide very well'). Exposure-curve claims confirmed by Bernegger (the Exam 9 reading itself) and the definition by Tse; the body of Tse ch.2 is not freely available, so the severity-family and coverage-modification claims rest on Loss Data Analytics (rank 3) - medium.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Inflation bullet: 'The excess layers grow faster than r' replaced by the conditioned statement - with the limits held fixed and positive inflation, losses capped at a basic limit grow no faster than r and the losses excess of it, with no cap above, at least as fast; a layer with both an attachment and a cap can grow more slowly than r, e.g. an exponential with mean 1,000 under 5% inflation raises the expected cost per payment in a 500 xs 100 layer by only 1.1%. Sources: Werner & Modlin, Basic Ratemaking 5th ed., ch.6 'Leveraged Effect of Limits on Severity Trend' pp.117-118 (PDF 129-130; Table 6.21 and 'Basic Limits Trend <= Total Limits Trend <= Excess Losses Trend' for positive trend, read from the rendered page; excess = total minus basic, no upper limit), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Loss Data Analytics ch.3 §3.4.3 Example 3.4.5 ('the cost per payment event grew by only 1.1% ... even though the ground up losses increased by 5%'), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html. Recomputed in python: per loss 356.026 -> 361.660 (+1.58%), per payment 393.469 -> 397.798 (+1.10%); unlimited xs 100 per loss +5.50%; Werner Table 6.20: basic 99,000 -> 102,500 (+3.5%), excess 30,000 -> 39,400 (+31.3%), total +10.0%.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Families bullet: 'mixed exponentials' removed from the heavy-tailed list; added that a finite mixture of exponentials has every moment and an MGF, so it is light-tailed. Also stated the criteria: Pareto heavy (moments only below alpha), lognormal heavy under the MGF criterion (every moment, no MGF). Sources: Loss Data Analytics ch.10 §10.2.1 Definition 10.1 (all moments -> light), Example 10.2.3 (Pareto k* = alpha, heavy) and the closing paragraph on the MGF criterion (lognormal), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html; LDA ch.3 §3.3.5.2 (k-point mixture: E(X^r) = sum p_i E(X_i^r), M_X(t) = sum p_i M_{X_i}(t)), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html. The unsupported clause 'those are the ones used for excess layers' was replaced by 'A layer's cost depends only on 1 - F inside the layer, so for excess layers the tail decides the answer' (LDA §3.4.2: E(X ^ u) = int_0^u [1 - F], Y^L = (X ^ u) - (X ^ d)).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Families bullet now opens with Tse's four claim-severity families, linked: [[Exponential Distribution|exponential]], [[Gamma|gamma]], [[Weibull Distribution|Weibull]], [[Pareto Distribution|Pareto]]; Weibull added with what the sources support: every moment exists so it is light-tailed by the moment criterion, though with shape below 1 its hazard rate decreases, the mark of a heavier tail. Sources: Tse, Nonlife Actuarial Models (CUP 2009), publisher preview, printed contents pp.vii-viii (PDF 9-10: §2.2.1-2.2.4 Exponential, Gamma, Weibull, Pareto), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404; CAS MAS-I Content Outline 2026 PDF p.6 (Tse §§1.1, 2.2-2.5 assigned to Domain B), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed; LDA ch.10 Example 10.2.2 (Weibull all moments, light-tailed) and ch.3 §3.2.3 (hazard decreasing for shape < 1, 'heavy tailed'; increasing for > 1) with §3.2.2 (decreasing Pareto hazard 'another indication that the distribution is heavy tailed'). Both linked pages exist.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-004
- status: resolved
- note: MBBEFD bullet: 'reproduces' replaced by Bernegger's wording - the c = 1.5, 2, 3, 4 subfamily 'coincides very well with' the Swiss Re Y1-Y4 curves, and c = 5 with 'a Lloyd's curve used for rating industrial risks'. Source: Bernegger, ASTIN Bulletin 27(1) 1997, §4.3 p.110 (re-read from the page image this session), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/database/astin_vol27no1_99.pdf
