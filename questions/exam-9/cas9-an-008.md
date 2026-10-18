---
id: "cas9-an-008"
exam: "Exam 9"
topic: "Insurance Policy"
learning_objective: "Financial Risk Management (FRM)"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurance+Policy
  - Concepts/Risk-Adjusted+Pricing
  - Concepts/Insurance+Pricing
  - Concepts/Cost+of+Capital
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3cbe90d33f27e9ad199128c779305e8ff24cdd77c57bd620bb277c88fbe45135
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-008.md
---

An insurer sets the underwriting profit target for the insurance policies of one line on a risk-adjusted basis, using the insurance CAPM from Cummins's *Allocation of Capital in the Insurance Industry*, as corrected by the CAS Exam 9 Working Group's January 2026 note. For this line:

- Liabilities to equity: $k_i = 0.75$
- Premium to equity: $s_i = 0.50$
- Underwriting beta: $\beta_i = 0.20$
- Risk-free rate: $r_F = 4\%$
- Market risk premium: $r_M - r_F = 6\%$

Calculate the line's required underwriting return (underwriting profit as a percentage of premium).

- A) $-4.8\%$
- B) $-1.8\%$
- C) $-1.5\%$
- D) $+1.2\%$
- E) $+7.2\%$

## Explanation

The corrected formula for line $i$'s required underwriting return is

$$
r_i = -\frac{k_i}{s_i}\, r_F + \beta_i (r_M - r_F)
$$

The ratio $k_i / s_i = L_i / P_i$ is the line's liabilities per dollar of premium, here $k_i/s_i = 0.75/0.50 = 1.5$. Policyholders' funds held for the line earn the risk-free rate for the insurer, so the policyholders are credited with that interest, and charged only for the line's systematic underwriting risk:

$$
r_i = -1.5(0.04) + 0.20(0.06) = -0.060 + 0.012 = \mathbf{-4.8\%}
$$

The line can be priced at an expected underwriting loss of 4.8% of premium and still give owners their required return. The answer is **A**.

**Why not the others**

- **B** — $-1.8\%$ uses $-k_i r_F$, the formula as printed on page 15 of the article before the correction: the interest credit must be per dollar of premium, so $k_i$ is divided by $s_i$.
- **C** — $-1.5\%$ inverts the ratio, using $s_i / k_i$ premium per dollar of liabilities.
- **D** — $+1.2\%$ keeps only the risk charge and gives policyholders no credit for the investment income their funds earn.
- **E** — $+7.2\%$ adds the interest term instead of subtracting it, charging policyholders for funds they supply.
