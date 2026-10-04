---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:1aa3bebfa0e72e747fb7dc95a207b912cf65eb30828ba7dc00b4bc8471bbd41d
  sources:
    - "Siegrist, Random (randomservices.org), ch.8 Hypothesis Testing §1 Introduction: hypotheses H0/H1, rejection (critical) region, type 1 and type 2 errors table, significance level, power, two-sided/left/right-tailed tests named for the alternative, P-value as the smallest alpha that rejects, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "Penn State STAT 415 (2026 notes), Lesson 9 Hypothesis Tests (Part I): §9.1 Defs 9.1-9.4 (H0, Ha, alpha, beta), power = 1 - beta, Type I/II error table, alpha chosen in advance (0.05 most common), §9.5 Z test with known sigma, sha256:4b40913ee64c6e155867542d9d3517e3384e5a942452f6fc8b1e72bf815a8acf — https://online.stat.psu.edu/stat415/Lesson09.html"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed. (Springer 2021, CAS-hosted copy), §13.1 pp.555-560 (PDF pp.561-566): p-value = probability of a statistic equal to or more extreme under H0, Table 13.1 decision/truth table, power = probability of correctly rejecting H0, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Pr(Z<1.645) = 0.950), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 3 'Test statistical hypotheses, including Type I and Type II errors' (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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

![[Media/Figures/Hypothesis_Testing.svg|340]]

> [!example]- One-Sample Z-Test for a Mean {Example}
> A claims adjuster believes average claim size is \$$5{,}000$. A sample of $n = 100$ claims has $\bar{x} = 5{,}200$ and $\sigma = 800$. Test $H_0: \mu = 5{,}000$ vs. $H_1: \mu > 5{,}000$ at $\alpha = 0.05$.
>
> > [!answer]-
> > $$Z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}} = \frac{5{,}200 - 5{,}000}{800 / \sqrt{100}} = \frac{200}{80} = 2.50$$
> > The critical value for a one-sided test at $\alpha = 0.05$ is $z_{0.05} = 1.645$. Since $2.50 > 1.645$, **reject $H_0$**. There is sufficient evidence that the mean claim size exceeds \$$5{,}000$.
