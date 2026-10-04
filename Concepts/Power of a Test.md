---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:44acc5a65c120c1c4876ac5c0dfd071210666dd1f1db71699812e0683b406c66
  sources:
    - "Siegrist, Random, ch.8 Hypothesis Testing §1 Introduction: power = probability of rejecting H0 for a distribution in H1; power function Q(theta) = P_theta(X in R), Q is the type 1 error probability on Theta0, 1 - Q the type 2 probability off it; uniformly most powerful tests, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "Siegrist, Random, ch.8 §2 Tests in the Normal Model: power functions with Q(mu0) = alpha and Q -> 1 away from the null, larger n or smaller sigma gives a uniformly more powerful test, one-sided sample-size formula n = (sigma[z(power) - z(alpha)]/(mu1 - mu0))^2, sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html"
    - "Siegrist, Random, ch.8 §5 Likelihood Ratio Tests: Neyman-Pearson lemma - the likelihood-ratio rejection region is most powerful among regions of no greater size for simple H0 vs simple H1, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html"
    - "Penn State STAT 415 (2026 notes), Lesson 10 §10.3: Def 10.1 power; power function K(mu) with alpha = K(mu0); lower alpha lowers power; 'the only way that alpha and beta can be decreased simultaneously is by increasing the sample size n'; §10.3.3 sample size for 0.90 power using 1.645 + 1.28, sha256:4277fd734c4d2b8b297124d4f9378d1fe638d9a4c4547b2689e24a9dfa1daf96 — https://online.stat.psu.edu/stat415/Lesson10.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Phi(0.85) = 0.8023, Phi(0.86) = 0.8051; z = 1.282 for 0.900 and 1.645 for 0.950), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Power of a Test.md
---

The **Power of a Test** is the probability it rejects the null hypothesis when the null is false — the chance of detecting a real effect. Power is the complement of the [[Type II Error]] probability $\beta$, and it is a *function* of the true parameter value, not a single number.

> $$\text{Power}(\theta) = P(\text{reject } H_0 \mid \theta) = 1 - \beta(\theta)$$

> $$\alpha = \text{Power}(\theta_0) = P(\text{reject } H_0 \mid H_0 \text{ true})$$

- Power rises with: a **larger sample** $n$, a **larger true effect** $|\theta - \theta_0|$, a **smaller** $\sigma$, and a **larger** $\alpha$
- The trade-off with [[Type I Error]] is unavoidable at fixed $n$: lowering $\alpha$ shrinks the rejection region and so lowers power. Only more data improves both
- The **power function** evaluated at $\theta_0$ equals the significance level $\alpha$; plotted against $\theta$ it rises from $\alpha$ toward $1$ as the truth moves away from $H_0$
- Among all level-$\alpha$ tests of a simple null against a simple alternative, the [[Likelihood Ratio Test]] has the highest power — the **Neyman–Pearson lemma**
- "Fail to reject" is not "accept": with low power, a null that is badly wrong still survives most of the time. Reporting a [[Confidence Interval]] shows what the test could and could not have ruled out
- Power calculations are how sample size gets set in advance — solve $\text{Power}(\theta_1) = 0.80$ for $n$ at the smallest effect worth detecting

![[Media/Figures/Power_of_a_Test.svg|340]]

> [!example]- Computing Power for a Mean {Example}
> Test $H_0: \mu = 5{,}000$ vs $H_1: \mu > 5{,}000$ at $\alpha = 0.05$ using $n = 100$ claims with known $\sigma = 800$. Find the power when the true mean is $\mu = 5{,}200$.
>
> > [!answer]-
> > The test rejects when $\bar{X} > 5{,}000 + 1.645\dfrac{800}{\sqrt{100}} = 5{,}000 + 131.6 = 5{,}131.6$.
> > If $\mu = 5{,}200$, then $\bar{X} \sim N(5{,}200, 80^2)$:
> > $$\text{Power} = P(\bar{X} > 5{,}131.6) = P\!\left(Z > \frac{5{,}131.6 - 5{,}200}{80}\right) = P(Z > -0.855) \approx 0.804$$
> > So $\beta \approx 0.196$: about one time in five a $200$ shift would be missed.

> [!example]- Sample Size for a Target Power {Example}
> With $\sigma = 800$ and $\alpha = 0.05$ one-sided, how many claims are needed for $90\%$ power against $\mu = 5{,}200$?
>
> > [!answer]-
> > $$n \ge \left(\frac{(z_\alpha + z_\beta)\,\sigma}{\mu_1 - \mu_0}\right)^{2} = \left(\frac{(1.645 + 1.282)(800)}{200}\right)^{2} = (11.71)^2 \approx 137.1$$
> > Take $n = 138$. Note that raising power from $80\%$ to $90\%$ costs about $38$ extra claims — power is expensive near the top of the curve.
