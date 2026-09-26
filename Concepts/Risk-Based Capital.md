---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d936b92bf517b56c2264b13892729eb59c6c678434d86c5d498a2e9719a72d35
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk-Based Capital.md
---

**Risk-Based Capital** (RBC) is the NAIC's standardised formula for the minimum capital a U.S. insurer needs given its asset, credit, underwriting and catastrophe risks, together with the model act that ties regulatory action to the ratio of the insurer's **Total Adjusted Capital** (TAC) to its **Authorized Control Level** (ACL) RBC.

> $$\text{RBC}_{\text{cov}} = R_0 + \sqrt{R_1^2 + R_2^2 + R_3^2 + R_4^2 + R_5^2 + R_{\text{cat}}^2}$$
>
> $$\text{ACL RBC} = \tfrac{1}{2}\big(\text{RBC}_{\text{cov}} + \text{Operational risk charge}\big)$$
>
> $$\text{RBC ratio} = \frac{\text{TAC}}{\text{ACL RBC}}$$

- **The P&C components:**
  - $R_0$ — affiliated insurance companies, plus off-balance-sheet and miscellaneous items (guarantees, contingent liabilities); added in full, outside the square root.
  - $R_1$ — fixed-income assets: bonds by NAIC designation, mortgage loans, cash and short-term investments, plus an asset-concentration charge.
  - $R_2$ — equity assets: unaffiliated common and preferred stock, real estate, other long-term assets.
  - $R_3$ — credit risk: reinsurance recoverables and other receivables.
  - $R_4$ — reserve risk: line-of-business factors on unpaid loss and LAE, adjusted for the company's own development and for investment income, plus a charge for excessive premium growth.
  - $R_5$ — written premium risk: line factors on net written premium, from the excess of an investment-income-adjusted combined ratio over $100\%$ and blended with company experience, plus a growth charge.
  - $R_{\text{cat}}$ — modelled hurricane and earthquake losses; other perils, such as wildfire, have been reported for information while the NAIC evaluates them. Older texts show the formula without $R_{\text{cat}}$.
- **Covariance.** Adding the charges would assume every risk goes wrong at once; the square root treats $R_1$–$R_5$ and $R_{\text{cat}}$ as independent. An **operational risk** add-on of $3\%$ of $\text{RBC}_{\text{cov}}$ follows, and ACL is **half** the total.
- **The reinsurance split.** If the loss-reserve charge exceeds the other credit charges plus half the reinsurance-recoverable charge, half of the reinsurance charge moves from $R_3$ into $R_4$ (Example 2).
- **TAC** is statutory surplus, adjusted — chiefly by removing any non-tabular reserve discount and by affiliate adjustments; credit for capital and surplus notes is capped.
- **Action levels** (RBC ratio):
  - $\geq 200\%$ — none, except that a ratio of $200$–$300\%$ with a combined ratio above $120\%$ fails the **trend test** and is treated as Company Action Level.
  - $150$–$200\%$, **Company Action Level** — the insurer files an RBC plan within 45 days.
  - $100$–$150\%$, **Regulatory Action Level** — RBC plan, examination or analysis, and a corrective order.
  - $70$–$100\%$, **Authorized Control Level** — the commissioner *may* take control.
  - $< 70\%$, **Mandatory Control Level** — the commissioner must, with narrow exceptions, place the insurer under regulatory control (rehabilitation or liquidation).
- **What it is not.** The NAIC says RBC is not meant to rank insurers: it is a floor that triggers legal authority, part of [[Solvency Monitoring]]. The great majority of insurers trigger no action level.

> [!example]- RBC Ratio and Action Level {Example}
> A P&C insurer (no life affiliates) reports, in $\$$ millions: $R_0 = 6$, $R_1 = 4$, $R_2 = 18$, $R_3 = 10$, $R_4 = 55$, $R_5 = 38$, $R_{\text{cat}} = 12$. TAC is $105$ and the trend-test combined ratio is $123\%$. Find the RBC ratio and the action level.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \sum R_i^2 &= 16 + 324 + 100 + 3{,}025 + 1{,}444 + 144 \\
> > &= 5{,}053 \\
> > \text{RBC}_{\text{cov}} &= 6 + \sqrt{5{,}053} \\
> > &= 6 + 71.08 \\
> > &= 77.08 \\
> > \text{Operational risk} &= 0.03 \times 77.08 \\
> > &= 2.31 \\
> > \text{ACL RBC} &= \tfrac{1}{2}(77.08 + 2.31) \\
> > &= 39.70 \\
> > \text{RBC ratio} &= \frac{105}{39.70} \\
> > &= 264.5\%
> > \end{align*}
> > $$
> > The undiversified sum of the charges is $143$; covariance cuts it to $77.08$. Most of the saving comes from the four smaller charges, which total $44$ but add only about $4$ once squared alongside $R_4$ and $R_5$.
> >
> > On capital alone, $264.5\% \geq 200\%$ means no action. But the ratio lies between $200\%$ and $300\%$ and the combined ratio exceeds $120\%$, so the **trend test** is failed: the insurer is at **Company Action Level** and must file an RBC plan.

> [!example]- Why Half the Reinsurance Charge Moves to R4 {Example}
> Credit RBC on non-reinsurance receivables is $3$, the reinsurance-recoverable charge is $8$, and the loss-reserve charge is $50$. Allocate $R_3$ and $R_4$, and compare $R_3^2 + R_4^2$ with keeping the whole reinsurance charge in $R_3$.
>
> > [!answer]-
> > The test: $50 > 3 + \tfrac{1}{2}(8) = 7$, so the charge is split.
> >
> > $$
> > \begin{align*}
> > R_3 &= 3 + 4 = 7 \\
> > R_4 &= 50 + 4 = 54 \\
> > R_3^2 + R_4^2 &= 49 + 2{,}916 \\
> > &= 2{,}965
> > \end{align*}
> > $$
> >
> > With the whole charge in $R_3$: $11^2 + 50^2 = 121 + 2{,}500 = 2{,}621$.
> >
> > The split adds $344$ inside the square root. Adding to the largest component earns almost no diversification credit — the formula is treating half of reinsurance credit risk as moving **with** reserve risk, because reinsurers are hardest to collect from exactly when reserves develop adversely and recoverables balloon.
