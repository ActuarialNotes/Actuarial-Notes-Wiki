**Principles of Ratemaking** are the four statements in the CAS *[[Statement of Principles Regarding Property and Casualty Insurance Ratemaking (CAS - 1988)|Statement of Principles Regarding Property and Casualty Insurance Ratemaking]]* that define what makes a rate actuarially sound. The Statement first defines a **rate** as an estimate of the expected value of future costs, and distinguishes it from a *price*, which may also reflect marketing, competition and regulation.

> $$\text{Rate} = E[\text{Losses} + \text{LAE} + \text{Expenses} + \text{Cost of Capital}]$$

**Principle 1 — A rate is an estimate of the expected value of future costs.**
Ratemaking is **prospective**. Historical data is used only as evidence about the future, which is why losses are developed to ultimate and trended forward, and why premium is put on level. A rate based on what happened, rather than on what is expected to happen, fails this principle regardless of how carefully the history was compiled.

**Principle 2 — A rate provides for all costs associated with the transfer of risk.**
Everything must be in there: losses, [[Allocated Loss Adjustment Expense|ALAE]] and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]], [[Fixed Expenses|fixed]] and [[Variable Expenses|variable]] underwriting expenses, the net cost of [[Reinsurance|reinsurance]], and a provision for the cost of capital — [[Profit and Contingency Provision|profit and contingencies]]. Omitting a real cost because it is hard to estimate does not make the rate conservative; it makes it inadequate.

**Principle 3 — A rate provides for the costs associated with an individual risk transfer.**
Rates should reflect **the risk being transferred**, not the average of a heterogeneous pool. This is the actuarial basis for [[Classification Ratemaking|risk classification]]: the Statement calls for consideration of the risk's own expected costs, allowing for [[Credibility|credibility]] where individual experience is thin.

**Principle 4 — A rate is reasonable and not excessive, inadequate, or unfairly discriminatory if it is an actuarially sound estimate of the expected value of all future costs associated with an individual risk transfer.**
This connects the actuarial standard to the statutory one. The regulatory language in most jurisdictions is "not excessive, inadequate, or unfairly discriminatory"; the Statement's position is that a rate meeting Principles 1–3 satisfies it. Note what follows: a rate differential that reflects a genuine cost difference is **not** unfair discrimination, and charging the same rate for materially different risks **is**.

Further points:

- The Statement lists considerations the actuary must weigh — exposure, data organization, [[Loss Trend|trend]], [[Loss Development|development]], catastrophes, credibility, individual risk rating, [[Ratemaking Constraints|regulatory constraints]] — and is explicit that judgment is a necessary part of ratemaking.
- The four principles underlie the whole syllabus: developing and trending is Principle 1, the expense and profit provisions are Principle 2, classification and individual risk rating are Principle 3, and the departure from an indication for competitive or regulatory reasons is precisely where Principle 4 gets tested.

> [!example]- Applying the Principles to a Rate Build-Up {Example}
> An actuary projects a pure premium of $\$250$, variable expenses of $20\%$, fixed expenses of $\$38$ per exposure, and a target underwriting profit provision of $5\%$.
>
> Build the rate and identify which principle each step serves.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Rate} &= \frac{\$250 + \$38}{1 - 0.20 - 0.05} \\
> > &= \frac{\$288}{0.75} \\
> > &= \$384.00
> > \end{align*}$$
> >
> > | Step | Principle |
> > |---|---|
> > | The $\$250$ is *projected* — developed to ultimate and trended to the future policy period | **1** — expected value of *future* costs |
> > | Expenses and profit are loaded, including the cost of capital | **2** — all costs of the risk transfer |
> > | The $\$384$ is the rate for *this* class, derived from its own experience | **3** — costs of the individual risk transfer |
> > | The rate is neither padded above nor cut below the estimate | **4** — not excessive, inadequate or unfairly discriminatory |

> [!example]- Which Principle Is Violated? {Example}
> Evaluate each practice.
>
> (a) An insurer uses a five-year average of raw calendar-year loss ratios, with no development or trend, to set next year's rates.
> (b) A regulator caps homeowners rates $10\%$ below the indication in coastal territories and allows a $5\%$ increase inland to compensate.
> (c) An insurer charges the same rate to all commercial auto risks regardless of radius of operation, because splitting them "would be discriminatory".
> (d) An actuary omits the profit provision, reasoning that investment income will cover the cost of capital.
>
> > [!answer]-
> > **(a) Principle 1.** Raw historical loss ratios are neither developed nor trended, so they are an estimate of past costs, not of expected future costs. Immature years understate; the whole series is at the wrong cost level.
> >
> > **(b) Principle 4** — and it is the regulator's departure, not the actuary's. The coastal rate is inadequate and the inland rate excessive relative to the costs of each risk transfer; inland policyholders are subsidizing coastal ones. The actuary's obligation is to compute and disclose the indication; the constraint is then a documented departure from it ([[Ratemaking Constraints]]).
> >
> > **(c) Principle 3**, on a misunderstanding of Principle 4. If long-haul risks cost twice what local risks cost, a single rate does not avoid discrimination — it imposes it, by making local operators pay for long-haul exposure. *Unfair* discrimination means a rate difference **not** justified by expected cost.
> >
> > **(d) Principle 2.** Investment income is a legitimate offset and belongs in the *derivation* of the target underwriting profit provision — a long-tail line can support a lower $Q_T$ for exactly this reason. What it cannot do is justify a zero provision: capital still has a cost, and the rate must provide for it.
