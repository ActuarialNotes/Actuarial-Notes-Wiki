---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:248872019833654b986e9827f45a3948704b01678205f3e5e669f525b2a434db
  sources:
    - "CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; reinstated May 2021), Sections I-IV pp.1-5, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 p.158 (PDF p.170), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Principles of Ratemaking.md
---

![[Media/Figures/Principles_of_Ratemaking.svg|340]]

The **Principles of Ratemaking** are the four statements in the CAS *[[Statement of Principles Regarding Property and Casualty Insurance Ratemaking (CAS - 1988)|Statement of Principles Regarding Property and Casualty Insurance Ratemaking]]* that define what makes a rate actuarially sound. The Statement defines **ratemaking** as the process of establishing rates, involving considerations such as marketing goals, competition and legal restrictions *to the extent they affect the estimation of future costs*. The Statement confines itself to that estimation. The four principles are:

1. **A rate is an estimate of the expected value of future costs.** Ratemaking is prospective.
2. **A rate provides for all costs associated with the transfer of risk.** Every cost is in the rate, including the cost of capital.
3. **A rate provides for the costs associated with an individual risk transfer.** Rates should reflect **the risk being transferred**, not the average of a heterogeneous pool.
4. **A rate is reasonable and not excessive, inadequate, or unfairly discriminatory if it is an actuarially sound estimate of the expected value of all future costs associated with an individual risk transfer.**

Under Principle 1, historical data is used only as evidence about the future, which is why losses are developed to ultimate and trended forward, and why premium is put on level. A rate based on what happened, rather than on what is expected to happen, fails this principle regardless of how carefully the history was compiled.

Under Principle 2, the costs are incurred losses, [[Allocated Loss Adjustment Expense|ALAE]] and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]], commission and brokerage, other acquisition costs, taxes, licenses and fees, policyholder dividends and general administrative expenses, both [[Fixed Expenses|fixed]] and [[Variable Expenses|variable]]. The cost of capital enters through the [[Profit and Contingency Provision|underwriting profit and contingency provisions]], the amounts that, considered with net investment and other income, provide an appropriate total after-tax return. Omitting a real cost because it is hard to estimate makes the rate inadequate, not conservative.

Principle 3 is the actuarial basis for [[Classification Ratemaking|risk classification]]. It calls for the risk's own expected costs, allowing for [[Credibility|credibility]] where individual experience is thin.

Principle 4 connects the actuarial standard to the statutory one. Most U.S. states' statutes require rates to be "not excessive, not inadequate, and not unfairly discriminatory", and the Statement's position is that a rate estimated on the first three principles meets those criteria. A rate differential that reflects a genuine cost difference is **not** unfair discrimination, and charging the same rate for materially different risks fails Principle 3.

> [!example]- A projected pure premium is $\$250$, fixed expenses are $\$38$ per exposure, variable expenses 20% and the target profit 5%. What is the rate, and which principle does each step serve? {Example}
> - The rate is $(250 + 38)/(1 - 0.20 - 0.05) = 288/0.75 = \$384.00$.
> - The $\$250$ is developed to ultimate and trended to the future policy period, which serves **Principle 1**.
> - Expenses and profit are loaded, including the cost of capital, which serves **Principle 2**.
> - The rate is for this class, derived from its own experience, which serves **Principle 3**.
> - The rate is neither padded above nor cut below the estimate, which serves **Principle 4**.

> [!example]- An insurer sets next year's rates from a five-year average of raw calendar-year loss ratios, with no development or trend. Which principle does this violate? {Example}
> - The loss ratios are neither developed nor trended, so they estimate past costs, not expected future costs.
> - Immature years understate the losses, and the whole series is at the wrong cost level.
> - The practice **violates Principle 1**.

> [!example]- An insurer charges every commercial auto risk the same rate whatever its radius of operation, because splitting them "would be discriminatory". Which principle does this violate? {Example}
> - If long-haul risks cost twice what local risks cost, a single rate makes local operators pay for long-haul exposure.
> - A rate difference that is an actuarially sound reflection of expected cost is not unfairly discriminatory under Principle 4.
> - The single rate **violates Principle 3**, on a misreading of Principle 4.

> [!example]- An actuary omits the profit provision, reasoning that investment income will cover the cost of capital. Which principle does this violate? {Example}
> - Investment income belongs in the derivation of the target underwriting profit provision, and a long-tail line can support a lower $Q_T$ for that reason.
> - It cannot justify a zero provision, because capital still has a cost.
> - The omission **violates Principle 2**.

## Considerations in ratemaking

The Statement lists considerations that commonly apply: the exposure unit, data and its organization, homogeneity, credibility, [[Loss Development|loss development]], [[Loss Trend|trends]], catastrophes, policy provisions, mix of business, reinsurance, operational changes, other influences such as [[Ratemaking Constraints|regulatory and legislative changes]], classification plans, individual risk rating, risk, and investment and other income. Informed actuarial judgment can be used effectively and may be applied throughout the process, documented and available for disclosure.

The four principles underlie the whole ratemaking syllabus. Developing and trending is Principle 1, the expense and profit provisions are Principle 2, and classification and individual risk rating are Principle 3. The departure from an indication for competitive or regulatory reasons is precisely where Principle 4 gets tested.

> [!example]- A regulator caps coastal homeowners rates 10% below the indication and allows a 5% increase inland to compensate. Which principle is at stake? {Example}
> - The coastal rate is inadequate and the inland rate excessive relative to the costs of each risk transfer.
> - Inland policyholders subsidize coastal ones.
> - The rates **fail Principle 4**, and the departure is the regulator's, which the actuary computes and documents ([[Ratemaking Constraints]]).
