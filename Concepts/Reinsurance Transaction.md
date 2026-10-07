---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d3b4ff943c91104d8150cee66ec586818dda642e3efd99d14d2c4b8001eea153
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Transaction.md
---

A **Reinsurance Transaction** in life and annuity business is an agreement under which a ceding company transfers part of the risk on a block of policies to a reinsurer, in one of four standard forms: **yearly renewable term** (YRT, mortality risk only), **coinsurance** (a proportional share of everything, reserves included), **modified coinsurance** (modco, coinsurance with the reserve and its assets kept by the cedant) and **funds withheld** (the reinsurer holds the reserve but the cedant keeps the assets). The form decides who holds the [[Reserve|reserve]], who holds the assets and who earns the investment income. See [[Reinsurance]] for the general idea.

> $$\text{YRT premium} = \text{YRT rate} \times \text{ceded net amount at risk}$$

> $$\text{Modco adjustment} = s\left(\Delta V - I\right)$$

- The ceded net amount at risk is the ceded face less the ceded share of the reserve. YRT rates are set by the reinsurer and are not tied to the original premium; the cedant keeps the reserve and the investment risk
- **Coinsurance:** the reinsurer takes share $s$ of premiums, claims, surrenders and the reserve, and pays an **allowance** toward the cedant's acquisition and maintenance expenses. Assets equal to its reserve move to the reinsurer, so it bears the investment and [[Interest Rate Risk|interest rate]] risk
- **Modco:** the cedant keeps the reserve and the assets. To give the reinsurer the economics of coinsurance it pays the reinsurer interest $I$ on the reserve, and the reinsurer pays the cedant the increase in reserve $\Delta V$; the net is the modco adjustment above, paid by the reinsurer when positive
- **Funds withheld:** the reinsurer shows the reserve but the cedant withholds the assets and credits interest on them, which limits the cedant's [[Reinsurance Credit Risk|credit risk]] to an unauthorized or offshore reinsurer

> [!example]- YRT Premium on an Excess Cession {Example}
> A cedant retains $250{,}000$ on a $1{,}000{,}000$ policy and cedes the excess on a YRT basis. The policy reserve is $40$ per $1{,}000$ of face and the YRT rate is $2.10$ per $1{,}000$ of net amount at risk. Find this year's YRT premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Ceded NAR} &= 750{,}000 - 750(40) \\
> > &= 720{,}000
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{YRT premium} &= 720(2.10) \\
> > &= 1{,}512
> > \end{align*}
> > $$
> > As the reserve builds, the NAR and the YRT premium per unit of face fall, while the rate per $1{,}000$ rises with age.

> [!example]- Coinsurance and Modco Give the Reinsurer the Same Result {Example}
> A block is reinsured $50\%$. This year the block has premiums $100{,}000$, claims $60{,}000$, opening reserve $400{,}000$ and closing reserve $430{,}000$. Assets backing the reserve earn $5\%$. The allowance is $15\%$ of ceded premium. Assume all cash flows occur at year end, so interest is earned on the opening reserve only. Find the reinsurer's result under coinsurance and under modco.
>
> > [!answer]-
> > Ceded: premium $50{,}000$, claims $30{,}000$, allowance $7{,}500$; reserve $200{,}000 \to 215{,}000$.
> >
> > **Coinsurance** — the reinsurer holds $200{,}000$ of assets earning $10{,}000$ and sets up the $15{,}000$ reserve increase:
> > $$
> > \begin{align*}
> > \text{Result} &= 50{,}000 - 30{,}000 - 7{,}500 + 10{,}000 - 15{,}000 \\
> > &= 7{,}500
> > \end{align*}
> > $$
> > **Modco** — the cedant keeps reserve and assets; the reinsurer pays the modco adjustment:
> > $$
> > \begin{align*}
> > \text{Modco adjustment} &= 0.5(30{,}000 - 20{,}000) \\
> > &= 5{,}000
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{Result} &= 50{,}000 - 30{,}000 - 7{,}500 - 5{,}000 \\
> > &= 7{,}500
> > \end{align*}
> > $$
> > The profit is identical; what differs is the balance sheet. Under modco the reinsurer holds no reserve and no assets, and the cedant keeps control of the investments.

> [!tip]- How it appears on the exam
> - **CP-341** and **ILA-101** ask for financial statement calculations under YRT, coinsurance, modco and funds withheld: premiums, allowances, reserve credit, the modco adjustment and each party's income statement and balance sheet for a year.
> - CP-341 asks to describe and evaluate reinsurance transactions for annuity contracts (asset-intensive coinsurance, funds withheld, longevity swaps for pension risk transfer) and when each form suits the cedant's goal: capital relief, mortality transfer or investment management.
> - CP-341's regulatory objectives ask how the form interacts with credit for reinsurance, collateral and the insolvency of either party, typically as a written answer on a case.

> [!warning]- Exam traps
> - Basing YRT on the ceded face instead of the net amount at risk (or the reverse) when the question defines it: $750{,}000$ versus $720{,}000$ in the first example.
> - Getting the modco adjustment's direction wrong. With the reserve rising faster than the interest on it, the reinsurer pays the cedant; a sign error moves both parties' results by twice the adjustment.
> - Forgetting that under coinsurance the reinsurer also earns investment income and sets up its share of the reserve increase; leaving out either gives a result that disagrees with the modco answer.
> - Treating funds withheld as modco: under funds withheld the reinsurer still reports the reserve liability, with a funds-withheld receivable from the cedant as the asset.
