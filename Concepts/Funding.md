---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cc35bf6d810678b67830d2be450b53ba01d095f8cee644b66581809853f6e054
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Funding.md
---

**Funding** is the arrangement by which money is set aside to pay for the benefits a plan promises — how much, when, and who bears the cost if experience differs from expectation. For a [[Pension Plan|pension plan]] it is the [[Plan Sponsor|sponsor's]] contribution policy, which builds assets ahead of benefit payments; for group [[Health Insurance|health]] and life benefits it is the **funding arrangement** — fully insured, experience-refund, minimum premium, self-funded with stop-loss, level funded — that decides how much claim risk the employer keeps.

> $$A_{t+1} = A_t + C_t + I_t - B_t - E_t$$

> $$C_t = NC_t + \frac{AAL_t - A_t}{\ddot{a}_{\overline{n}|}}$$

> $$\text{Refund} = P - \text{Claims} - \text{Retention}$$

- **Pension fund roll-forward**: assets $A$ grow by contributions $C$ and investment income $I$ and fall by benefits $B$ and expenses $E$. Over a plan's life this is the fundamental identity $C + I = B + E$: every dollar of benefit not earned by investment must come from contributions, so a funding method changes only the **timing** of contributions, not their total.
- **Contribution**: the [[Normal Cost|normal cost]] plus a payment amortizing the unfunded [[Actuarial Accrued Liability|actuarial accrued liability]] over $n$ years. The funded ratio is $A/AAL$. Canadian plans fund on both a going-concern and a [[Solvency|solvency]] (hypothetical wind-up) basis, and RET-301 is about choosing the assumptions — discount rate, [[Mortality|mortality]], expenses — for each.
- **A funding policy** (RET-201; CAPSA Guideline No. 7) sets the sponsor's objectives — benefit security, contribution stability, intergenerational equity — and the margins, methods and amortization rules that serve them.
- **Group insurance arrangements** run from most risk with the insurer to most with the employer: fully insured (pooled premium, no refund); experience-refund or retrospective premium (surplus refunded, deficit carried forward); minimum premium (employer funds claims up to a trigger); self-funded or ASO with stop-loss; and level funding, a small-group self-funded plan billed as level monthly payments. [[Experience Rating|Experience rating]] and [[Credibility|credibility]] sit inside the middle options.

> [!example]- Going-Concern Contribution with Amortization {Example}
> A defined benefit plan has actuarial accrued liability $\$12.0$M, assets $\$10.5$M and normal cost $\$400{,}000$. The unfunded liability is amortized over $15$ years by level payments at the start of each year, at $5.5\%$. Find the funded ratio and this year's contribution.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Funded ratio} &= 10.5 / 12.0 \\
> > &= 87.5\% \\
> > \text{Unfunded} &= 12{,}000{,}000 - 10{,}500{,}000 \\
> > &= 1{,}500{,}000 \\
> > \ddot{a}_{\overline{15}|5.5\%} &= 10.5896 \\
> > \text{Amortization} &= 1{,}500{,}000 / 10.5896 \\
> > &= 141{,}648 \\
> > C &= 400{,}000 + 141{,}648 \\
> > &= 541{,}648
> > \end{align*}
> > $$
> >
> > The sponsor contributes about $\$541{,}648$, about $35\%$ above normal cost. Lengthening the period lowers this year's cost and raises total contributions later — the stability-versus-security trade a funding policy has to defend.

> [!example]- Who Pays When Claims Swing: Three Funding Arrangements {Example}
> An employer's group medical plan has expected claims of $\$1{,}000{,}000$. The options:
> - **Fully insured**: premium $\$1{,}150{,}000$, no refund.
> - **Retrospective premium (experience refund)**: premium $\$1{,}150{,}000$, retention $\$130{,}000$; any surplus is refunded, any deficit carried forward.
> - **ASO with stop-loss**: administration fee $\$100{,}000$ plus stop-loss premium $\$40{,}000$; the employer pays claims (no single claim reaches the stop-loss deductible).
>
> Find the employer's cost if actual claims are $\$900{,}000$, and if they are $\$1{,}250{,}000$.
>
> > [!answer]-
> > Claims of $\$900{,}000$:
> >
> > $$
> > \begin{align*}
> > \text{Refund} &= 1{,}150{,}000 - 900{,}000 - 130{,}000 \\
> > &= 120{,}000 \\
> > \text{Retro cost} &= 1{,}150{,}000 - 120{,}000 \\
> > &= 1{,}030{,}000 \\
> > \text{ASO cost} &= 900{,}000 + 140{,}000 \\
> > &= 1{,}040{,}000
> > \end{align*}
> > $$
> >
> > Claims of $\$1{,}250{,}000$:
> >
> > $$
> > \begin{align*}
> > \text{Balance} &= 1{,}150{,}000 - 1{,}250{,}000 - 130{,}000 \\
> > &= -230{,}000 \\
> > \text{ASO cost} &= 1{,}250{,}000 + 140{,}000 \\
> > &= 1{,}390{,}000
> > \end{align*}
> > $$
> >
> > | Claims | Fully insured | Retro | ASO |
> > |---|---|---|---|
> > | $900$K | $1{,}150$K | $1{,}030$K | $1{,}040$K |
> > | $1{,}250$K | $1{,}150$K | $1{,}150$K + $230$K deficit | $1{,}390$K |
> >
> > Fully insured fixes the cost; the retro arrangement shares the good year and defers the bad one as a deficit to be recovered from future refunds; ASO passes every claim dollar through. The employer's tolerance for that swing — and its cash flow — is what picks the arrangement.

> [!tip]- How it appears on the exam
> - GH-101 (Underwriting and Funding): a case with expected claims, premium, retention and stop-loss terms, asking for the employer's cost or the insurer's gain under each arrangement — and a written recommendation of the arrangement that fits the group's size, credibility and risk appetite.
> - RET-201 (Valuations for the Purpose of Funding): written answers describing the funding options open to a sponsor and defending a funding policy for a single-employer, multi-employer or public plan.
> - RET-301 (Assumptions): selecting and justifying going-concern and solvency funding assumptions, usually written with some calculation of their effect on liability or contribution.

> [!warning]- Exam traps
> - Treating a retrospective deficit as the insurer's loss: it is carried forward against the group's future refunds, so the employer's true cost of the bad year is premium **plus** the deficit — the insurer absorbs it only if the group leaves before repaying it.
> - Mixing a level annuity-immediate into an amortization stated as start-of-year payments: the payment comes out about $5.5\%$ too high.
> - Reading a higher contribution as a higher plan cost: by $C + I = B + E$, funding faster changes timing and investment income, not the benefits.
> - Applying going-concern assumptions to a solvency valuation: the solvency basis values a hypothetical wind-up, with settlement-based discount rates.
