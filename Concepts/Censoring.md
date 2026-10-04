---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:9437f24387e53f20a23a9b98458898342cc4a32d765b83b2e9ad56b8ac3101c4
  sources:
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.4 Model Selection and Estimation §4.3.1.2 censored data (right-censoring most common, min(X, C_U) with policy limit example; left-censoring max(X, C_L)), §4.3.1.4 likelihood-contribution table (exact f(x), right-censored 1 - F(C_U), interval-censored F(C_U) - F(C_L)) and exponential special case, mortality-study Type A (alive at study end = right-censored), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.5.2.2 MLE for censored data, L = prod f(x_i) x S(u)^m, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Dey, Lipsitz, Cooper, Trinh, Krzywinski & Altman, \"Survival analysis—time-to-event data and censoring\", Nature Methods 19(8), 2022 (Points of Significance), Fig. 3 caption, sha256:ca9f23c68a24089908bddcad8f88975bbf7ef603a0835200bfd828849af4f28d (article page HTML) — https://www.nature.com/articles/s41592-022-01563-7"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 8 and 9 \"accounting for censoring and truncation\", \"missing data values, including censoring and truncation\" (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Censoring.md
---

**Censoring** occurs when the exact value of an observation is unknown, but it is known to exceed (or fall below) a threshold. In actuarial and survival analysis, **right-censoring** is most common: a claim or lifetime is observed only up to some censoring time $c$, after which observation ends.

> **Right-censored likelihood contribution:**
> $$\text{If } X > c: \quad L_i(\theta) = P(X > c \mid \theta)$$

> $$= S(c \mid \theta)$$

> **Observed (uncensored) likelihood contribution:**
> $$\text{If } X = x \leq c: \quad L_i(\theta) = f(x \mid \theta)$$

- **Right-censoring**: true value exceeds $c$ (e.g., policy limit reached, study ends before claim settles)
- **Left-censoring**: true value is below a detection threshold
- **Interval censoring**: the value is known only to lie within an interval $(a, b)$
- Censoring must be accounted for in [[Maximum Likelihood Estimation]] to avoid **downward bias** in estimated means or survival times
- An observation that is **not** censored (the exact value is known) contributes $f(x|\theta)$ to the likelihood

![[Media/Figures/Censoring.svg|340]]

> [!example]- MLE With Censored Exponential Data {Example}
> Three claims have observed values $x_1 = 2$, $x_2 = 3$, and one claim is right-censored at $c = 4$ (i.e., we know $X_3 > 4$). Assuming $X \sim \text{Exp}(\theta)$, write the likelihood.
>
> > [!answer]-
> > $$L(\theta) = f(2|\theta)\cdot f(3|\theta)\cdot S(4|\theta) = \frac{1}{\theta}e^{-2/\theta}\cdot\frac{1}{\theta}e^{-3/\theta}\cdot e^{-4/\theta} = \frac{1}{\theta^2}e^{-9/\theta}$$
> > Taking the log and differentiating: $\ell(\theta) = -2\ln\theta - 9/\theta$; $\ell'(\theta) = -2/\theta + 9/\theta^2 = 0$ gives $\hat{\theta} = 9/2 = 4.5$. Note: the censored observation still contributes information (the $e^{-4/\theta}$ term).
