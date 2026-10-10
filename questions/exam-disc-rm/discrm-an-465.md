---
id: "discrm-an-465"
exam: "Exam DISC-RM"
topic: "Risk Classifications"
learning_objective: "1. Introduction to Risk Management"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Risk+Classifications
  - Concepts/Law+of+Large+Numbers
  - Concepts/Coefficient+of+Variation
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6f7ee9812d6356f48b266a2bedac8a960b52aa33c2f777999f07bc8ff26907bd
  sources:
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10 binomial mean np, SD sqrt(npq), sha256:0fb4dd0d04812eb4f4ceaf8bc2e059ae323809659ce7945309682a998ee487fd — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-05-appendix-more-exposures-less-r.html"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.1 p.3 objective risk varies inversely with sqrt of exposures, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-465.md
---
Insurer A pools 900 similar homes and Insurer B pools 3,600. Each home has an independent probability of 0.02 of a fire claim in a year. Measuring objective risk as the standard deviation of the number of claims divided by the expected number, how does Insurer B's objective risk compare with Insurer A's?

- A) It is one-quarter of Insurer A's
- B) It is one-half of Insurer A's
- C) It is the same as Insurer A's
- D) It is four times Insurer A's

## Explanation

For $n$ independent homes with claim probability $p$ and $q = 1 - p$, the number of claims has mean $np$ and standard deviation $\sqrt{npq}$:

$$
\begin{align*}
\text{A: } \sigma/\mu &= \sqrt{900(0.02)(0.98)} / 18 \\
&= 4.2 / 18 \\
&\approx 0.233 \\
\text{B: } \sigma/\mu &= \sqrt{3{,}600(0.02)(0.98)} / 72 \\
&= 8.4 / 72 \\
&\approx 0.117
\end{align*}
$$

Four times the exposures gives twice the standard deviation and four times the mean, so the relative variation **halves**. The answer is **B**.

**Why not the others**

- **A** — One-quarter assumes the relative variation falls in proportion to the number of exposures; it falls with the *square root* of that number.
- **C** — The probability per home is the same, but the variation of actual from expected claims, relative to the expected number, is not.
- **D** — Four times describes the expected number of claims, not the objective risk.
