---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a8a016b97258b0f9381ff5261dc0270303e5085e980bca6985af4b0244006eff
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retiree.md
---

**A retiree** is a former employee who has left active service and is receiving, or is entitled to, benefits from a [[Plan Sponsor|plan sponsor's]] [[Retirement Plan|retirement plan]] or post-retirement welfare plan — a pension, retiree health coverage, retiree life insurance. In a valuation a retiree's benefit is **fully accrued**: no more service is earned, so the obligation is simply the expected present value of the benefits still to be paid.

> $$\text{Obligation}_x = \sum_{t \geq 0} v^{t}\, {}_{t}p_{x}\, B_{x+t}$$

> $$B_{x+t} = s\; c_{x+t}\,(1+h)^{t}$$

- $x$ is the retiree's age, ${}_tp_x$ the probability of surviving $t$ years ([[Mortality|mortality]]), $v$ the discount factor at the [[Discount Rate|discount rate]], and $B_{x+t}$ the benefit expected at age $x+t$. For a pension, $B$ is the annuity payment (with any indexation); for retiree health, $c_{x+t}$ is the per capita claims cost at that age, $h$ the health care cost trend, and $s$ the share the plan pays after retiree contributions and any government program.
- Because a retiree earns no further service, the retiree's whole obligation is accrued liability: under IAS 19 the defined benefit obligation equals the full expected present value, and there is no current service cost — the same split as [[Actuarial Accrued Liability|accrued liability]] and [[Normal Cost|normal cost]] for an active member.
- **Risks a retiree faces** (RET-101): outliving savings (longevity), [[Inflation|inflation]] eroding fixed income, investment and [[Interest Rate Risk|interest rate risk]] on savings and annuity purchase, rising health and long-term care costs, the death of a spouse, cognitive decline, and the sponsor reducing or ending a benefit.
- **[[Plan Design|Plan design]] moves those risks**: a [[Life Annuity|life annuity]] form pools longevity, indexation absorbs inflation, joint-and-survivor forms protect the spouse, and retiree health design (caps on the employer subsidy, defined-dollar accounts, a pre-65 bridge) decides how much health cost risk stays with the sponsor and how much passes to the retiree.

> [!example]- Retiree Health Obligation for a Pre-65 Bridge {Example}
> A retiree aged $62$ is covered by an employer plan until $65$, when a government plan takes over. The per capita claims cost at $62$ is $\$9{,}000$, rising $4\%$ a year with age; health care trend is $6\%$; the retiree pays $30\%$ of cost. Survival: ${}_1p_{62} = 0.99$, ${}_1p_{63} = 0.985$. Discount at $4\%$; costs are paid at the start of each year. Compute the employer's obligation.
>
> > [!answer]-
> > Employer cost each year is $0.70 \times 9{,}000 \times (1.04)^t (1.06)^t$:
> >
> > $$
> > \begin{align*}
> > B_{62} &= 0.70 \times 9{,}000 \\
> > &= 6{,}300.00 \\
> > B_{63} &= 0.70 \times 9{,}921.60 \\
> > &= 6{,}945.12 \\
> > B_{64} &= 0.70 \times 10{,}937.57 \\
> > &= 7{,}656.30
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Obligation} &= 6{,}300 + 0.99\,v\,(6{,}945.12) \\
> > &\quad + 0.97515\,v^{2}(7{,}656.30) \\
> > &= 6{,}300.00 + 6{,}611.22 + 6{,}902.77 \\
> > &= 19{,}813.99
> > \end{align*}
> > $$
> >
> > The employer's obligation is about $\$19{,}814$. Aging and trend together grow the cost $10.2\%$ a year, more than the discount rate pulls it back — which is why trend is the assumption retiree health valuations argue about most.

> [!example]- Longevity Risk in a Drawdown vs. an Annuity {Example}
> A $65$-year-old retiree has $\$500{,}000$ and plans to withdraw $\$35{,}000$ at the start of each year while the balance earns $4\%$. An insurer quotes an annuity-due factor of $14.2$ at $65$. How long does the drawdown last, and what life income would the annuity buy?
>
> > [!answer]-
> > The drawdown runs out when $35{,}000\,\ddot{a}_{\overline{n}|} = 500{,}000$:
> >
> > $$
> > \begin{align*}
> > \ddot{a}_{\overline{n}|} &= 500{,}000 / 35{,}000 \\
> > &= 14.2857 \\
> > 1 - v^{n} &= 14.2857 \times 0.03846 \\
> > &= 0.5495 \\
> > n &= -\ln(0.4505) / \ln(1.04) \\
> > &= 20.3
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Annuity income} &= 500{,}000 / 14.2 \\
> > &= 35{,}211
> > \end{align*}
> > $$
> >
> > The drawdown is exhausted a little after age $85$; the annuity pays slightly more, for life. The retiree who self-insures bears the whole tail of the survival curve, while the annuity pools it — the core RET-101 argument for annuity forms in plan design, against which the retiree gives up liquidity and any bequest.

> [!tip]- How it appears on the exam
> - RET-101 (Participant Risks): written answers that identify the risks a retiree faces and say which plan design features (annuity form, indexation, survivor benefits, retiree medical) manage each, or where a sponsor's goals contradict them.
> - CP-321 (Retiree Group Benefits): a retiree health valuation — per capita costs by age, trend, contributions, survival and discount — to give the obligation, often with a change in design (a cap, a bridge ending at 65) to evaluate.
> - CP-321 also asks, in writing, for design proposals that manage retirees' risks and for advice to a sponsor choosing retiree health design elements.

> [!warning]- Exam traps
> - Charging service cost on a retiree: a retiree accrues no further service, so the whole value is accrued obligation; a positive retiree "service cost" is the giveaway.
> - Applying trend without aging (or the reverse): $c_{x+t}(1+h)^t$ needs both; dropping aging understates a retiree health obligation materially.
> - Forgetting retiree contributions or the government plan offset: the plan's share $s$ applies to gross cost, not the other way round.
> - Treating a lump sum as protection against longevity: a drawdown that lasts to life expectancy leaves roughly half of retirees outliving it.
