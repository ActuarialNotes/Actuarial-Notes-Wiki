---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c918cd8e632c1255ac513d96bc953e62270cd2e03397ef8e2687195351b02630
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Crop Insurance.md
---

**Crop Insurance** in the United States is the Federal Crop Insurance Program — a public-private partnership in which the Federal Crop Insurance Corporation (FCIC), administered by the USDA's Risk Management Agency (RMA), sets the policy terms and premium rates, subsidises farmers' premiums, and reinsures the private **Approved Insurance Providers** (AIPs) that sell and service the policies under the **Standard Reinsurance Agreement** (SRA).

> $$\text{Guarantee} = \text{APH} \times c \times \max(P_{\text{proj}},\, P_{\text{harv}})$$

> $$\text{Indemnity} = \max\big(0,\; \text{Guarantee} - Y \times P_{\text{harv}}\big)$$

- **Symbols (revenue protection).** APH is the farm's Actual Production History yield per acre, $c$ the coverage level the farmer chooses, $P_{\text{proj}}$ and $P_{\text{harv}}$ the projected and harvest prices set from commodity futures, and $Y$ the actual yield. *Yield protection* instead pays $(\text{APH} \times c - Y)^+ \times P_{\text{proj}}$, covering yield loss only; revenue protection, which also covers a price fall, is the most widely purchased plan.
- **Other designs:** area plans that pay on county yield or revenue rather than the farm's own — less [[Moral Hazard|moral hazard]], but basis risk; and catastrophic (CAT) coverage, a low-level guarantee whose premium is fully subsidised, the farmer paying an administrative fee. Crop-hail cover is sold privately outside the federal program.
- **Who pays what.** The farmer pays the premium net of a subsidy whose percentage falls as the coverage level rises. The FCIC also reimburses AIPs' administrative and operating (A&O) expenses. Under the SRA each AIP places its policies into funds that retain different shares of the underwriting gain or loss, and the FCIC reinsures the rest — so the government carries the catastrophic tail.
- **Rating standard.** The Federal Crop Insurance Act directs the FCIC to set rates for an overall projected loss ratio of no more than $1.0$, measured on the **total** premium including subsidy. The farmer-paid premium is therefore well below expected indemnity, and the subsidy is a transfer to farmers.
- **Why government.** Crop losses are **systemic** — one drought hits a whole region — so a private insurer cannot diversify them; [[Adverse Selection]] and moral hazard are severe because the farmer knows the land and controls the inputs. The program dates from the 1938 Act and was expanded repeatedly (1980, 1994, 2000), each time with higher subsidies to raise participation and reduce reliance on ad hoc disaster payments — which have nonetheless continued. Canada's counterpart is [[Agricultural Insurance|AgriInsurance]], delivered by provincial crown agencies.
- **Evaluation.** Participation and coverage are broad, and delivery is through a competitive private channel. The costs are fiscal (subsidy, A&O, AIP underwriting gains) and behavioural: subsidies that scale with premium encourage planting riskier crops and marginal land. See [[Government Program Evaluation]].

> [!example]- Revenue Protection Versus Yield Protection {Example}
> A corn farm has an APH of $180$ bushels per acre and buys $80\%$ coverage. The projected price is $\$4.50$.
>
> Find the indemnity per acre under revenue protection and yield protection when (a) drought cuts the yield to $120$ and the harvest price rises to $\$5.20$; (b) the yield is $150$ but the harvest price falls to $\$3.80$.
>
> > [!answer]-
> > The guaranteed yield is $0.80 \times 180 = 144$ bushels.
> >
> > **(a) Drought, price up.**
> >
> > $$
> > \begin{align*}
> > \text{RP guarantee} &= 144 \times \$5.20 \\
> > &= \$748.80 \\[4pt]
> > \text{RP indemnity} &= \$748.80 - 120 \times \$5.20 \\
> > &= \$124.80 \\[4pt]
> > \text{YP indemnity} &= (144 - 120) \times \$4.50 \\
> > &= \$108.00
> > \end{align*}
> > $$
> >
> > The harvest price raises the RP guarantee, so the farmer can replace the lost bushels at the higher price — the reason a drought-driven price spike is covered.
> >
> > **(b) Good yield, price down.**
> >
> > $$
> > \begin{align*}
> > \text{RP guarantee} &= 144 \times \$4.50 \\
> > &= \$648.00 \\[4pt]
> > \text{RP indemnity} &= \$648.00 - 150 \times \$3.80 \\
> > &= \$78.00
> > \end{align*}
> > $$
> >
> > Yield protection pays nothing because $150 > 144$. Revenue protection pays on the **price** fall, which is a market risk rather than a peril — the feature that makes RP popular and makes the program's losses correlated with commodity markets across every state at once.

> [!example]- What the Premium Subsidy Transfers {Example}
> A policy's total premium is $\$40$ per acre, rated to the program's $1.0$ target loss ratio. Suppose the subsidy at the chosen coverage level is $55\%$. What does the farmer expect to gain on $1{,}000$ acres, and what does the program cost the government?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Farmer premium} &= 0.45 \times \$40 \\
> > &= \$18 \\[4pt]
> > \text{Expected indemnity} &= 1.0 \times \$40 \\
> > &= \$40 \\[4pt]
> > \text{Expected gain} &= (\$40 - \$18) \times 1{,}000 \\
> > &= \$22{,}000
> > \end{align*}
> > $$
> >
> > The government's cost is the $\$22$ per acre of subsidy, plus the A&O reimbursement to the AIP, plus any underwriting gain the AIP earns under the SRA.
> >
> > **Why it is designed this way.** A buyer who expects to receive more than they pay will participate, so the subsidy overcomes the adverse selection that would otherwise leave only the worst farms insured. The cost of that design: the subsidy is a percentage of premium, so it is **largest in dollars for the riskiest crops and land** — the incentive critics point to when the program is evaluated.
