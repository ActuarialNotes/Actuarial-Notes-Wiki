---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ed58e319a8ffdae7adca479b64d5f4e9af90f289e309e379a90514a80cadb8f8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Crop Insurance.md
---
**Crop Insurance** in the United States is the Federal Crop Insurance Program, a public-private partnership in which the Federal Crop Insurance Corporation (FCIC), administered by the USDA's Risk Management Agency (RMA), sets the policy terms and premium rates, subsidises farmers' premiums, and reinsures the private **Approved Insurance Providers** (AIPs) that sell and service the policies under the **Standard Reinsurance Agreement** (SRA).

Revenue protection, which covers both a yield loss and a price fall, is the most widely purchased plan. Its revenue guarantee per acre is

> $$\text{Guarantee} = \text{APH} \times c \times \max(P_{\text{proj}},\, P_{\text{harv}})$$

- $\text{APH}$ is the farm's Actual Production History yield per acre.
- $c$ is the coverage level the farmer chooses.
- $P_{\text{proj}}$ and $P_{\text{harv}}$ are the projected and harvest prices, set from commodity futures.

and its indemnity per acre is

> $$\text{Indemnity} = \max\big(0,\; \text{Guarantee} - Y \times P_{\text{harv}}\big)$$

- $Y$ is the actual yield per acre.

## Yield protection

Yield protection covers yield loss only. Its indemnity per acre is

> $$\text{Indemnity} = \max\big(0,\; \text{APH} \times c - Y\big) \times P_{\text{proj}}$$

> [!example]- What do revenue protection and yield protection pay per acre in each season? {Example}
> A corn farm has an APH of $180$ bushels per acre and buys $80\%$ coverage. The projected price is $\$4.50$. In season (a), drought cuts the yield to $120$ and the harvest price rises to $\$5.20$. In season (b), the yield is $150$ but the harvest price falls to $\$3.80$.
>
> > [!answer]-
> > - The guaranteed yield is $0.80 \times 180 = 144$ bushels.
> > - (a) The revenue protection guarantee uses the higher harvest price: $144 \times \$5.20 = \$748.80$.
> > - (a) Revenue protection pays $\$748.80 - 120 \times \$5.20 = \$124.80$, and yield protection pays $(144 - 120) \times \$4.50 = \$108.00$.
> > - (b) The revenue protection guarantee is $144 \times \$4.50 = \$648.00$, and it pays $\$648.00 - 150 \times \$3.80 = \$78.00$.
> > - (b) Yield protection pays nothing, because $150 > 144$.
> > - Revenue protection pays on the price fall, a market risk rather than a peril, so the program's losses are correlated with commodity markets across every state at once.

## Other designs

Area plans pay on county yield or revenue rather than the farm's own, which reduces [[Moral Hazard|moral hazard]] but adds basis risk. Catastrophic (CAT) coverage is a low-level guarantee whose premium is fully subsidised, the farmer paying an administrative fee. Crop-hail cover is sold privately outside the federal program.

## Premium subsidy and rating

The farmer pays the premium net of a subsidy whose percentage falls as the coverage level rises. The FCIC also reimburses AIPs' administrative and operating (A&O) expenses. Under the SRA each AIP places its policies into funds that retain different shares of the underwriting gain or loss, and the FCIC reinsures the rest, so the government carries the catastrophic tail.

The Federal Crop Insurance Act directs the FCIC to set rates for an overall projected loss ratio of no more than $1.0$, measured on the **total** premium including subsidy. The farmer-paid premium is therefore well below expected indemnity, and the subsidy is a transfer to farmers.

> [!example]- What does a farmer expect to gain on $1{,}000$ acres, and what does the program cost the government? {Example}
> A policy's total premium is $\$40$ per acre, rated to the program's $1.0$ target loss ratio. The subsidy at the chosen coverage level is $55\%$.
>
> > [!answer]-
> > - The farmer pays $0.45 \times \$40 = \$18$ per acre.
> > - The expected indemnity is $1.0 \times \$40 = \$40$ per acre.
> > - The farmer's expected gain is $(\$40 - \$18) \times 1{,}000 = \$22{,}000$.
> > - The government's cost is the $\$22$ per acre of subsidy, plus the A&O reimbursement to the AIP, plus any underwriting gain the AIP earns under the SRA.
> > - A buyer who expects to receive more than they pay will participate, so the subsidy overcomes the [[Adverse Selection|adverse selection]] that would otherwise leave only the worst farms insured.

## Why the government insures crops

Crop losses are **systemic**, since one drought hits a whole region, so a private insurer cannot diversify them. [[Adverse Selection]] and moral hazard are severe because the farmer knows the land and controls the inputs. The program dates from the 1938 Act and was expanded repeatedly (1980, 1994, 2000), each time with higher subsidies to raise participation and reduce reliance on ad hoc disaster payments, which have nonetheless continued. Canada's counterpart is [[Agricultural Insurance|AgriInsurance]], delivered by provincial crown agencies.

## Evaluation

Participation and coverage are broad, and delivery is through a competitive private channel. The costs are fiscal (subsidy, A&O, AIP underwriting gains) and behavioural. Subsidies that scale with premium encourage planting riskier crops and marginal land. See [[Government Program Evaluation]].

> [!trap] Using the projected price in a revenue guarantee
> The revenue protection guarantee uses the higher of the projected and harvest prices. In a drought year with a price spike, a guarantee at the projected price understates the indemnity, as $\$648.00$ in place of $\$748.80$ in season (a) above.
