---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:a145478c64c9ec1445e80df32c83df1041243a8161a71e72be4d15a95b81d880
  sources:
    - "Siegrist, Random (randomservices.org), ch.8 Hypothesis Testing §1 Introduction: hypotheses H0/H1, rejection (critical) region, type 1 and type 2 errors table, significance level, power, two-sided/left/right-tailed tests named for the alternative, P-value as the smallest alpha that rejects, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "Penn State STAT 415 (2026 notes), Lesson 9 Hypothesis Tests (Part I): §9.1 Defs 9.1-9.4 (H0, Ha, alpha, beta), power = 1 - beta, Type I/II error table, alpha chosen in advance (0.05 most common), §9.5 Z test with known sigma, sha256:4b40913ee64c6e155867542d9d3517e3384e5a942452f6fc8b1e72bf815a8acf — https://online.stat.psu.edu/stat415/Lesson09.html"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed. (Springer 2021, CAS-hosted copy), §13.1 pp.555-560 (PDF pp.561-566): p-value = probability of a statistic equal to or more extreme under H0, Table 13.1 decision/truth table, power = probability of correctly rejecting H0, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Pr(Z<1.645) = 0.950), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 3 'Test statistical hypotheses, including Type I and Type II errors' (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods §7.3.1.1 Analysis of paired observations: d_i = Y_i - Z_i, t = dbar/(s_d/sqrt N), nu = N - 1 — https://itl.nist.gov/div898/handbook/prc/section3/prc311.htm"
    - "OpenStax Introductory Statistics 2e §10.7 Matched or Paired Samples (LibreTexts): \"The differences are the data\"; differences from a normal population; df = number of pairs, not observations, minus 1; sd of matched pairs expected smaller than unmatched — https://stats.libretexts.org/Bookshelves/Introductory_Statistics/Introductory_Statistics_2e_(OpenStax)/10%3A_Hypothesis_Testing_with_Two_Samples/10.07%3A_Matched_or_Paired_Samples"
    - "NIST/SEMATECH e-Handbook §1.3.6.7.2 Critical Values of the Student t Distribution: nu = 5, 0.95 column 2.015, 0.975 column 2.571 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hypothesis Testing.md
---

**Hypothesis Testing** is a statistical procedure for deciding between two competing claims about a population parameter: the **null hypothesis** $H_0$ and the **alternative hypothesis** $H_1$ (or $H_a$).

> **Decision Rule:** Reject $H_0$ if the test statistic falls in the **rejection region** (critical region); otherwise, fail to reject $H_0$.
>
> $$\text{p-value} = P(\text{test statistic as extreme or more extreme} \mid H_0 \text{ true})$$

**Types of hypotheses:**
- **Simple** $H_0: \theta = \theta_0$ vs. **one-sided** $H_1: \theta > \theta_0$ or $H_1: \theta < \theta_0$
- **Two-sided** $H_1: \theta \neq \theta_0$

**Decision errors:**

| | $H_0$ True | $H_0$ False |
| :--- | :--- | :--- |
| Reject $H_0$ | [[Type I Error]] ($\alpha$) | Correct (Power $= 1-\beta$) |
| Fail to Reject $H_0$ | Correct | [[Type II Error]] ($\beta$) |

- The **significance level** $\alpha = P(\text{Type I Error})$ is set in advance (e.g., 0.05)
- **Power** $= 1 - \beta = P(\text{Reject } H_0 \mid H_1 \text{ true})$
- Reject $H_0$ when p-value $< \alpha$

**Paired observations.** When the two samples are matched pairs (the same unit measured before and after, or two naturally paired units), the observations within a pair are dependent, and a test for two independent samples does not apply. When observations come in dependent matched pairs, form the within-pair differences and apply a one-sample $t$-test to those differences. This paired t-test reduces two matched samples to a single sample of within-pair differences $d_i = y_i - z_i$ and tests whether the mean difference equals zero, $H_0: \mu_d = 0$:

> $$t = \frac{\bar{d}}{s_d / \sqrt{n}}$$

- $\bar{d}$ and $s_d$ are the mean and standard deviation of the differences, assumed to come from a normal population; $t$ has a [[Student's t-Distribution|$t$ distribution]] with $n - 1$ degrees of freedom, where $n$ is the number of pairs, not the number of observations
- Pairing removes the variation between units, so the differences usually vary less than unmatched observations do and a real difference is easier to detect

![[Media/Figures/Hypothesis_Testing.svg|340]]

> [!example]- One-Sample Z-Test for a Mean {Example}
> A claims adjuster believes average claim size is \$$5{,}000$. A sample of $n = 100$ claims has $\bar{x} = 5{,}200$ and $\sigma = 800$. Test $H_0: \mu = 5{,}000$ vs. $H_1: \mu > 5{,}000$ at $\alpha = 0.05$.
>
> > [!answer]-
> > $$Z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}} = \frac{5{,}200 - 5{,}000}{800 / \sqrt{100}} = \frac{200}{80} = 2.50$$
> > The critical value for a one-sided test at $\alpha = 0.05$ is $z_{0.05} = 1.645$. Since $2.50 > 1.645$, **reject $H_0$**. There is sufficient evidence that the mean claim size exceeds \$$5{,}000$.

> [!example]- Paired t-Test on Two Repair Estimates {Example}
> Two body shops each estimate the repair cost of the same six damaged vehicles. Shop A's estimate minus Shop B's, in hundreds, is $3, 1, 4, -2, 2, 4$. At $\alpha = 0.05$, test whether Shop A's estimates are higher on average, $H_1: \mu_d > 0$.
>
> > [!answer]-
> > Plan: the estimates are paired by vehicle, so test the six differences as one sample.
> >
> > $$\bar{d} = \frac{12}{6} = 2$$
> >
> > $$s_d^2 = \frac{1 + 1 + 4 + 16 + 0 + 4}{5} = 5.2, \quad s_d = 2.280$$
> >
> > $$t = \frac{2}{2.280/\sqrt{6}} = 2.148$$
> >
> > With $6 - 1 = 5$ degrees of freedom the one-sided 5% critical value is $t_{0.05,5} = 2.015$. Since $2.148 > 2.015$, **reject $H_0$**: Shop A's estimates run higher. A two-sided test at 5% would use $t_{0.025,5} = 2.571$ and would not reject, so the direction of $H_1$ decides this one.
