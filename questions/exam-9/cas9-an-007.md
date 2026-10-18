---
id: "cas9-an-007"
exam: "Exam 9"
topic: "Insurer"
learning_objective: "Financial Risk Management (FRM)"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurer
  - Concepts/Capital+Structure
  - Concepts/Return+on+Capital
  - Concepts/Financial+Risk
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5aff259ff24babd34fdda5539f433aa1d37e81670878dafd6580f8e0e1c4ebdc
  sources:
    - "CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.1-3 (r_E = r_A(1+k1+k2) + r1 s1 + r2 s2; corrected r_i = -(k_i/s_i) r_F + beta_i (r_M - r_F); error on article p.15), sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-007.md
---

An insurer writes two lines of business. Its equity is $E = 100$. The line liabilities (loss and other reserves) are $L_1 = 120$ and $L_2 = 60$, and the premiums are $P_1 = 80$ and $P_2 = 40$. The insurer's invested assets equal its equity plus its liabilities, and earn a rate of return of 5%. The underwriting returns, as underwriting profit divided by premium, are $r_1 = -2\%$ and $r_2 = +3\%$.

Using the model of the insurer's return on equity in Cummins's *Allocation of Capital in the Insurance Industry*, calculate the insurer's return on equity.

- A) 4.6%
- B) 4.9%
- C) 8.6%
- D) 13.6%
- E) 15.0%

## Explanation

The insurer's income is investment income on all its assets plus underwriting income on each line. Dividing by equity, with $k_i = L_i / E$ (liabilities to equity) and $s_i = P_i / E$ (premium to equity):

$$
r_E = \frac{I}{E} = r_A \,\frac{E + L_1 + L_2}{E} + r_1 \frac{P_1}{E} + r_2 \frac{P_2}{E} = r_A (1 + k_1 + k_2) + r_1 s_1 + r_2 s_2
$$

$$
r_E = 0.05(1 + 1.2 + 0.6) + (-0.02)(0.8) + 0.03(0.4) = 0.140 - 0.016 + 0.012 = \mathbf{13.6\%}
$$

Policyholders' funds held as reserves are invested for the owners, so the 5% asset return is levered 2.8 times; the first line's underwriting loss is the price of that funding. The answer is **D**.

**Why not the others**

- **A** — 4.6% earns the asset return on equity alone, as if reserves were not invested.
- **B** — 4.9% divides the total income of 13.6 by total assets of 280: a return on assets, not on equity.
- **C** — 8.6% drops the leading 1 in the leverage factor $(1 + k_1 + k_2)$, investing the reserves but not the equity itself.
- **E** — 15.0% adds the two underwriting returns unweighted, ignoring that each is a rate on its own line's premium, which must be scaled by premium to equity.
