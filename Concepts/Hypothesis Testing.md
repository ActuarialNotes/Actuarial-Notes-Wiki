---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1aa3bebfa0e72e747fb7dc95a207b912cf65eb30828ba7dc00b4bc8471bbd41d
  sources: []
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
