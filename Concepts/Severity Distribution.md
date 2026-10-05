---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:6ad97d0172e7b3c0d499d14313e6014fff360f49c94acf2bf604ab4dbfd2b4a1
  sources:
    - "Tse, Nonlife Actuarial Models: Theory, Methods and Evaluation (Cambridge UP 2009; MAS-I reading) — publisher preview: §1.1 p.4 (PDF 22: 'the monetary amount of each claim is called the claim severity or claim size'; frequency and severity modelled separately, severity continuous), §1.2 eqs. 1.1-1.2 (F_X(x) = Pr(X <= x), f_X = dF_X/dx); printed contents pp.vii-viii (PDF 9-10: ch.2 §2.2.1-2.2.4 exponential, gamma, Weibull, Pareto; §2.4 tail properties; §2.5 coverage modifications incl. 2.5.4 inflation, 2.5.5 deductible and claim frequency), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Frees et al. (eds.), Loss Data Analytics (open textbook, 1st ed.), ch.3 'Modeling Loss Severity': preview (severity = size of loss, combined with frequency by convolution), §3.2.1 gamma light-tailed (all moments exist), §3.2.2 Pareto heavy-tailed, §3.2.3 Weibull hazard, §3.3.2 scale distributions (cX multiplies the scale parameter; lognormal scale e^mu), §3.3.4 lognormal 'heavy-tailed', §3.4.2 E(X ^ u) = int_0^u [1 - F(x)] dx and Y^L = (X ^ u) - (X ^ d), §3.4.3 inflation and Example 3.4.5 (500 xs 100 layer +1.1% per payment under 5% inflation), §3.5.2.2-3.5.2.3 censored (S(u)) and truncated (f(x)/S(d)) likelihoods, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Frees et al. (eds.), Loss Data Analytics (open textbook, 1st ed.), ch.10 §10.2 'Tails of Distributions': Definition 10.1 (moment method), MGF criterion remark (lognormal), Examples 10.2.1-10.2.3 (gamma, Weibull light; Pareto heavy), Definition 10.2 (limiting survival ratio), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html"
    - "Bernegger, 'The Swiss Re Exposure Curves and the MBBEFD Distribution Class', ASTIN Bulletin 27(1), May 1997, pp.99-111 (Exam 9 reading; CAS-hosted scan, read from page images): §1 p.99 (risk bands by SI/MPL/EML; risk premium = loss ratio x premium, split between retention and cession); §2.1 eq. 2.1 pp.100-101 (x = X/M, M the MPL; G(d) = L(d)/L(1) = int_0^d (1 - F)/E[x], increasing, concave, G(0) = 0, G(1) = 1; G(d) the ratio of the risk premium retained by the cedent); §2.2 eqs. 2.2-2.3 p.101 (G'(d) = (1 - F(d))/E[x]; F(x) = 1 - G'(x)/G'(0) for 0 <= x < 1); §2.3 eq. 2.4 (E[x] = 1/G'(0)); §4.3 pp.109-110 (one-parameter subclass in c; c = 1.5, 2, 3, 4 'coincide very well' with Y1-Y4, c = 5 with a Lloyd's industrial curve), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/database/astin_vol27no1_99.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), ch.6 'Leveraged Effect of Limits on Severity Trend' pp.117-118 (PDF 129-130, Tables 6.20-6.21: basic limits trend < total limits trend < excess losses trend for positive trend) and ch.11 pp.193, 197 (PDF 205, 209: indicated ILF(H) = LAS(H)/LAS(B); leveraged effect on increased limits), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 5, 8 and 9 and readings Hogg, Tse (p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, Domain A task 1 'Fit loss distribution-based exposure curves' (p.3) and text reference Bernegger (p.7), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Severity Distribution.md
---

**A severity distribution** is the probability distribution of the size $X$ of a single loss or claim, given that one happens. It is described by its CDF $F(x) = P(X \le x)$ or its density $f(x)$. Paired with a claim-count distribution, it prices anything that depends on how large claims are: deductibles, limits, excess layers and [[Exposure Curves|exposure curves]].

> $$E[X \wedge u] = \int_0^u \big[1 - F(x)\big]\,dx$$

> $$G(d) = \frac{E[X \wedge d]}{E[X]}$$

- $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]], the expected loss capped at $u$. A layer's expected cost is the difference of two of these, so this integral is how the severity distribution turns into [[Expected Loss|expected losses by layer]] and [[Increased Limits|increased limits factors]].
- **Families.** The MAS-I reading's four are the [[Exponential Distribution|exponential]], [[Gamma|gamma]], [[Weibull Distribution|Weibull]] and [[Pareto Distribution|Pareto]]. The first three have every moment, so they are light-tailed by the moment criterion, though a Weibull with shape below 1 has a decreasing hazard rate, the mark of a heavier tail. The Pareto has moments only of order below its shape $\alpha$ and is heavy-tailed. The [[Lognormal Distribution|lognormal]] has every moment but no moment generating function, which makes it heavy-tailed under the more common MGF criterion. A finite mixture of exponentials has every moment and an MGF, so it is light-tailed. A layer's cost depends only on $1 - F$ inside the layer, so for excess layers the tail decides the answer. Parameters are fitted by [[Maximum Likelihood Estimation|maximum likelihood]]. The fit must allow for [[Truncation|truncation]] by deductibles and [[Censoring|censoring]] at policy limits.
- **Exposure curves (Exam 9).** Property losses grow with the size of the risk, so they are expressed as a fraction $X \in [0,1]$ of the risk's maximum possible loss or sum insured. $G(d)$ is then the share of expected loss kept below a deductible of $d$. It rises from $G(0) = 0$ to $G(1) = 1$ and is concave. The curve and the distribution determine each other: $E[X] = 1/G'(0)$, and $1 - F(d) = G'(d)/G'(0)$ for $d < 1$.
- **The MBBEFD class.** Bernegger's MBBEFD distributions give such curves in closed form. The one-parameter subfamily with $c = 1.5, 2, 3, 4$ coincides very well with the Swiss Re Y1–Y4 curves, and $c = 5$ with a Lloyd's curve used for rating industrial risks.
- **Inflation** multiplies the scale parameter: if losses rise by $r$, then $\theta$ becomes $\theta(1+r)$. With the limits held fixed, the effect is leveraged ([[Inflation]]): under positive inflation, losses capped at a basic limit grow no faster than $r$, and the losses excess of it, with no cap above, at least as fast. A layer with both an attachment and a cap can grow more slowly than $r$: for an exponential with mean $1{,}000$, $5\%$ inflation raises the expected cost per payment in a $500$ xs $100$ layer by only $1.1\%$.

> [!example]- Fitting Severity to Deductible Data {Example}
> Four claims are reported under a $\$1{,}000$ deductible, with ground-up sizes $\$1{,}500$, $\$2{,}500$, $\$4{,}000$ and $\$7{,}000$. Losses below $\$1{,}000$ are never reported.
>
> Fit an exponential by maximum likelihood.
>
> > [!answer]-
> > Each observation is left-truncated at $1{,}000$, so its likelihood is $f(x_i) / [1 - F(1000)]$:
> >
> > $$
> > \begin{align*}
> > L(\theta) &= \prod_{i=1}^{4} \frac{\theta^{-1} e^{-x_i/\theta}}{e^{-1000/\theta}} \\
> > &= \theta^{-4}\,e^{-(500 + 1500 + 3000 + 6000)/\theta} \\
> > &= \theta^{-4}\,e^{-11{,}000/\theta}
> > \end{align*}
> > $$
> >
> > Setting $\frac{d}{d\theta}\ln L = -4/\theta + 11{,}000/\theta^2$ to zero gives $\hat\theta = 11{,}000/4 = 2{,}750$, the mean excess over the deductible.
> >
> > Ignoring the truncation gives $\hat\theta = 15{,}000/4 = 3{,}750$, which overstates severity by $36\%$. The fitted curve also says the four reports stand for $4 / e^{-1000/2750} = 5.75$ ground-up losses. Frequency needs the same correction as severity.

> [!example]- An Exposure Curve from a Destruction-Rate Distribution {Example}
> For a class of property risks, the loss as a fraction of MPL has survival function $1 - F(x) = (1 - x)^3$ on $[0, 1]$. One risk has an MPL of $\$10{,}000{,}000$, premium of $\$50{,}000$ and an expected loss ratio of $60\%$.
>
> Derive the exposure curve and find the expected loss in a $\$3$M excess of $\$2$M per-risk layer.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X \wedge d] &= \int_0^d (1 - x)^3\,dx \\
> > &= \frac{1 - (1 - d)^4}{4} \\[4pt]
> > G(d) &= 1 - (1 - d)^4
> > \end{align*}
> > $$
> >
> > The layer runs from $d = 0.2$ to $d = 0.5$ of MPL. Expected loss is $0.60 \times 50{,}000 = \$30{,}000$.
> >
> > $$
> > \begin{align*}
> > G(0.5) - G(0.2) &= 0.9375 - 0.5904 \\
> > &= 0.3471 \\[4pt]
> > \text{Layer loss} &= 0.3471 \times 30{,}000 \\
> > &= \$10{,}413
> > \end{align*}
> > $$
> >
> > The cedant keeps $0.5904 \times 30{,}000 = \$17{,}712$ below $\$2$M, and $\$1{,}875$ lies above $\$5$M. Recovering the distribution from the curve: $G'(d) = 4(1 - d)^3$, so $E[X] = 1/G'(0) = 0.25$ and $G'(d)/G'(0) = (1 - d)^3$. That matches the survival function we started from.
