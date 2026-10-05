---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:ec1636aaf1dc7deaa6f66de28ac45d43389613c471e6a33af481616f59c7d25a
  sources:
    - "Siegrist, Random, ch.8 Hypothesis Testing §1 Introduction: type 2 error = failing to reject H0 when H1 is true; 1 - Q(theta) is the type 2 error probability for theta outside Theta0; trade-off with type 1 error, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "Siegrist, Random, ch.8 §2 Tests in the Normal Model: power function of the Z tests, 'increasing the sample size n or decreasing the standard deviation sigma results in a uniformly more powerful test', sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html"
    - "Penn State STAT 415 (2026 notes), Lesson 10 §10.3: Type II error and power definitions, power depends on the true mean, Ex 10.6 power function K(mu) = 1 - Phi((106.58 - mu)/4) for the one-sided Z test with sigma/sqrt(n) = 4 at alpha = 0.05, Ex 10.7 lower alpha -> lower power, Ex 10.8 larger n -> higher power, sha256:4277fd734c4d2b8b297124d4f9378d1fe638d9a4c4547b2689e24a9dfa1daf96 — https://online.stat.psu.edu/stat415/Lesson10.html"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed., Table 13.1 and §13.1.2, pp.559-560 (PDF pp.565-566): Type II errors are false negatives; power = probability of not making a Type II error given Ha holds, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Phi(0.85) = 0.8023, Phi(0.86) = 0.8051; Pr(Z<1.645) = 0.950), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Type II Error.md
---

A **Type II Error** occurs when a [[Hypothesis Testing|hypothesis test]] **fails to reject a false null hypothesis** $H_0$. It is also called a **false negative**.

> $$\beta = P(\text{Fail to Reject } H_0 \mid H_0 \text{ is false})$$

> $$\text{Power} = 1 - \beta = P(\text{Reject } H_0 \mid H_0 \text{ is false})$$

- $\beta$ depends on the true value of the parameter, the significance level $\alpha$, and the sample size $n$
- Increasing sample size $n$ **decreases** $\beta$ (increases power) for a fixed $\alpha$
- Decreasing $\alpha$ generally **increases** $\beta$ — there is a trade-off between Type I and Type II errors
- In actuarial contexts, a Type II Error might mean failing to detect an inadequate premium rate

![[Media/Figures/Type_II_Error.svg|340]]

> [!example]- Power of a Test {Example}
> A test of $H_0: \mu = 100$ vs. $H_1: \mu = 110$ uses a sample of $n = 25$ with $\sigma = 20$ and $\alpha = 0.05$ (one-sided, upper). Find the power (probability of rejecting $H_0$ when the true mean is 110).
>
> > [!answer]-
> > The critical value is $c = 100 + 1.645 \cdot (20/\sqrt{25}) = 100 + 6.58 = 106.58$.
> > Power $= P(\bar{X} > 106.58 \mid \mu = 110) = P\!\left(Z > \frac{106.58 - 110}{20/5}\right) = P(Z > -0.855) = \Phi(0.855) \approx 0.804$.
> > So $\beta = 1 - 0.804 = 0.196$; there is about a 20% chance of a Type II Error.
