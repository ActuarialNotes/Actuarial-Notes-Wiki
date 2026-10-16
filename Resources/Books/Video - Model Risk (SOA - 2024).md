---
Title: "Model Risk"
Authors: "Society of Actuaries"
Publisher: "Society of Actuaries"
Year: "2024"
date: "2024"
Type: "Course"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/files/edu/2025/2025-cp-312-model-risk-notes.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cc2086d1fda20c44f5b344b4505cc5e371033990d6150f6d043ff95d4154dcd6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Video - Model Risk (SOA - 2024).md
---
![[Video - Model Risk (SOA - 2024) - Cover.svg]]

The companion notes to the Society of Actuaries' Model Risk video for the CP 312 course, offering a few warnings about modeling through a stylized example. The notes follow an actuary, B. A. Actuary ("BA"), who models the one-year profits of a complex life product with equity-linked components, and they are directed at candidates for the Model Development and Governance exam while holding for anyone who builds or uses financial models.

> [!info] On the syllabus
> - [[Exam CP-312 (SOA)|Exam CP-312]] — Video: Model Risk, SOA, 2024, and its Model Risk Companion Notes, for outcomes 1a (Topic 1) and 2a (Topic 2).

## Inherent Uncertainty
- BA's stochastic model of 10,000 scenario paths gives a mean profit of $50M and a 90% confidence interval of $40M to $60M, yet the profit turns out to be $35M.
- Actuarial models are by nature probabilistic: they treat unknown values such as the number of deaths or in-force policies as random variables and report the mean, the variance and the 95 CTE.
- Even a perfect model's actual claims, premium and profit will not equal the mean.
- Treating mortality deterministically, with each policyholder dying "a little bit", hides variation: for an expected 10 deaths, the number of deaths is approximately Poisson with mean 10, and the probability of 3 or more extra deaths is about 0.136.
- BA's 90% confidence interval was inappropriate because it ignored the stochastic nature of mortality; with stochastic mortality it might have been $33M to $67M.

## Parameter Uncertainty
- The [[Parameter Risk|parameters]] of the model are estimates: the mortality table may be built from blocks that are not that similar, may be an educated guess, or may be the wrong table by accident.
- The equity model's mean return and volatility are likewise estimates and actually unknown.
- A first-order check on sensitivity is ΔV ≈ (∂V/∂α)Δα; if the uncertainty in a parameter α is small enough that ΔV/V stays under 0.05, BA may decide not to worry about it.
- Where parameter uncertainty creates larger deviations, a distribution can be put around the parameter and the parameter selected at random for each path, which widens the confidence interval further.

## Model Specification
- Assuming normally distributed log-equity returns is common, but empirically log-equity returns exhibit large kurtosis and skew, which can make a significant difference to a confidence interval.
- "All models are wrong, but some are useful" (George E. P. Box), with quotations from his 1976 article Science as Statistics.
- Actuaries must never forget that their models are all wrong, even those whose outputs determine the official accounting results of a firm.

## Final Thoughts
- Quantify the uncertainty: never give just a single number if a range can be given, and make clear that the range itself depends on assumptions that could be wrong.
- Include the impact of parameter uncertainty, or the range will always be too small.
- Have a good feel for where the model specifications are potentially the most problematic.
- Strike the balance: do not be overconfident in the models, but do not bring so much skepticism that the estimate becomes "$50M plus or minus $500M".

## Sources
- [CP 312 Model Risk companion notes (SOA, 2025 posting)](https://www.soa.org/globalassets/assets/files/edu/2025/2025-cp-312-model-risk-notes.pdf) — the document: its title and section headings and the points each makes; the video itself could not be watched, so only these notes were read
- [CP 312 Syllabus, Nov 2026/Mar 2027 (SOA)](https://www.soa.org/globalassets/assets/files/edu/2026/cp-312/2026-2027-cp-312-syllabus.pdf) — the citation (Video: Model Risk, SOA, 2024, with the Model Risk Companion Notes) and the learning outcomes it is assigned to
