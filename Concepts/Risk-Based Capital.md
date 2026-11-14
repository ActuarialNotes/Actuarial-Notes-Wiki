---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:51077418286f8027751f4646e328a5b711d1b78d5289e2bdaad684b6591a6c27
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk-Based Capital.md
---
**Risk-Based Capital** (RBC) is the NAIC's standardised formula for the minimum capital a U.S. insurer needs given its asset, credit, underwriting and catastrophe risks, together with the model act that ties regulatory action to the ratio of the insurer's **Total Adjusted Capital** (TAC) to its **Authorized Control Level** (ACL) RBC.

For a P&C insurer, the RBC after covariance is

> $$\text{RBC}_{\text{cov}} = R_0 + \sqrt{R_1^2 + R_2^2 + R_3^2 + R_4^2 + R_5^2 + R_{\text{cat}}^2}$$

- $R_0$ is the charge for affiliated insurance companies, plus off-balance-sheet and miscellaneous items (guarantees, contingent liabilities). It is added in full, outside the square root.
- $R_1$ is the charge for fixed-income assets: bonds by NAIC designation, mortgage loans, cash and short-term investments, plus an asset-concentration charge.
- $R_2$ is the charge for equity assets: unaffiliated common and preferred stock, real estate and other long-term assets.
- $R_3$ is the credit risk charge on [[Reinsurance Credit Risk|reinsurance recoverables]] and other receivables.
- $R_4$ is the reserve risk charge: line-of-business factors on unpaid loss and LAE, adjusted for the company's own development and for investment income, plus a charge for excessive premium growth.
- $R_5$ is the written premium risk charge: line factors on net written premium, from the excess of an investment-income-adjusted combined ratio over $100\%$ and blended with company experience, plus a growth charge.
- $R_{\text{cat}}$ is the [[Catastrophe Risk|catastrophe risk]] charge on modelled hurricane and earthquake losses. Other perils, such as wildfire, have been reported for information while the NAIC evaluates them. Older texts show the formula without $R_{\text{cat}}$.

Adding the charges would assume every risk goes wrong at once. The square root treats $R_1$–$R_5$ and $R_{\text{cat}}$ as independent, which gives the largest diversification credit.

An [[Operational Risk|operational risk]] charge of $3\%$ of $\text{RBC}_{\text{cov}}$ is added, and the Authorized Control Level RBC is half the total:

> $$\text{ACL RBC} = \tfrac{1}{2}\big(1.03 \times \text{RBC}_{\text{cov}}\big)$$

The RBC ratio is

> $$\text{RBC ratio} = \frac{\text{TAC}}{\text{ACL RBC}}$$

- $\text{TAC}$ is [[Capital and Surplus|statutory surplus]], adjusted chiefly by removing any non-tabular reserve discount and by affiliate adjustments. Credit for capital and surplus notes is capped.

> [!example]- What are this insurer's RBC ratio and action level? {Example}
> A P&C insurer with no life affiliates reports, in $\$$ millions:
>
> | $R_0$ | $R_1$ | $R_2$ | $R_3$ | $R_4$ | $R_5$ | $R_{\text{cat}}$ |
> | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
> | 6 | 4 | 18 | 10 | 55 | 38 | 12 |
>
> TAC is $105$ and the trend-test combined ratio is $123\%$.
>
> > [!answer]-
> > - The sum of squares is $16 + 324 + 100 + 3{,}025 + 1{,}444 + 144 = 5{,}053$.
> > - $\text{RBC}_{\text{cov}} = 6 + \sqrt{5{,}053} = 6 + 71.08 = 77.08$.
> > - The operational risk charge is $0.03 \times 77.08 = 2.31$.
> > - $\text{ACL RBC} = \tfrac{1}{2}(77.08 + 2.31) = 39.70$.
> > - The RBC ratio is $105/39.70 = 264.5\%$.
> > - The undiversified sum of the charges is $143$, and covariance cuts it to $77.08$. The four smaller charges total $44$ but add only about $4$ once squared alongside $R_4$ and $R_5$.
> > - On capital alone, $264.5\% \geq 200\%$ means no action.
> > - The ratio lies between $200\%$ and $300\%$ and the combined ratio exceeds $120\%$, so the trend test is failed. The insurer is at **Company Action Level** and must file an RBC plan.

## The reinsurance split between $R_3$ and $R_4$

If the loss-reserve charge exceeds the other credit charges plus half the reinsurance-recoverable charge, half of the reinsurance charge moves from $R_3$ into $R_4$. The formula treats that half of reinsurance credit risk as moving with reserve risk, because reinsurers are hardest to collect from when reserves develop adversely and recoverables balloon.

> [!example]- How much does the split add inside the square root? {Example}
> Credit RBC on non-reinsurance receivables is $3$, the reinsurance-recoverable charge is $8$, and the loss-reserve charge is $50$.
>
> > [!answer]-
> > - The test is $50 > 3 + \tfrac{1}{2}(8) = 7$, so the charge is split.
> > - $R_3 = 3 + 4 = 7$ and $R_4 = 50 + 4 = 54$.
> > - $R_3^2 + R_4^2 = 49 + 2{,}916 = 2{,}965$.
> > - With the whole charge in $R_3$, $11^2 + 50^2 = 121 + 2{,}500 = 2{,}621$.
> > - The split adds $344$ inside the square root. Adding to the largest component earns almost no diversification credit.

## Action levels

| RBC ratio | Level | What happens |
| :--- | :--- | :--- |
| $\geq 200\%$ | None | No action, except the trend test below |
| $150$–$200\%$ | Company Action Level | The insurer files an RBC plan within 45 days |
| $100$–$150\%$ | Regulatory Action Level | RBC plan, examination or analysis, and a corrective order |
| $70$–$100\%$ | Authorized Control Level | The commissioner *may* take control |
| $< 70\%$ | Mandatory Control Level | The commissioner must, with narrow exceptions, place the insurer under regulatory control (rehabilitation or liquidation) |

A ratio of $200$–$300\%$ with a combined ratio above $120\%$ fails the **trend test** and is treated as Company Action Level.

The NAIC says RBC is not meant to rank insurers. It is a floor that triggers legal authority, one tool of [[Solvency Monitoring|solvency monitoring]] alongside the [[IRIS Ratios]]. The great majority of insurers trigger no action level.

> [!trap] Stopping at 200% without the trend test
> A P&C insurer with an RBC ratio between $200\%$ and $300\%$ is not clear until its combined ratio is checked. Above $120\%$, it is at Company Action Level.
