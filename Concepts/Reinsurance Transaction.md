---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:634cd293e9100b08ce40868c121e9d2f949e2854a511f37f3db063c0926a2181
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Transaction.md
---

A **Reinsurance Transaction** in life and annuity business is a [[Reinsurance|reinsurance]] agreement under which a ceding company transfers part of the risk on a block of policies to a reinsurer. Its form decides who holds the [[Reserve|reserve]], who holds the assets and who earns the investment income.

The four standard forms are:

| Form | What the reinsurer takes | Reserve held by | Assets held by |
| --- | --- | --- | --- |
| Yearly renewable term (YRT) | Mortality risk only | Cedant | Cedant |
| Coinsurance | A proportional share of everything | Reinsurer | Reinsurer |
| Modified coinsurance (modco) | A proportional share of everything | Cedant | Cedant |
| Funds withheld | A proportional share of everything | Reinsurer | Cedant |

## Yearly renewable term

Under YRT the reinsurer covers the ceded net amount at risk (NAR), the ceded face less the ceded share of the reserve. The YRT premium is

> $$\text{YRT premium} = \text{YRT rate} \times \text{ceded NAR}$$

- The YRT rate is set by the reinsurer and is not tied to the original premium.

The cedant keeps the reserve and the investment risk. As the reserve builds, the NAR and the YRT premium per unit of face fall, while the rate per $1{,}000$ rises with age.

> [!example]- What is this year's YRT premium on this excess cession? {Example}
> A cedant retains $250{,}000$ on a $1{,}000{,}000$ policy and cedes the excess on a YRT basis. The policy reserve is $40$ per $1{,}000$ of face and the YRT rate is $2.10$ per $1{,}000$ of net amount at risk.
>
> > [!answer]-
> > - The ceded face is $750{,}000$, and its share of the reserve is $750(40) = 30{,}000$.
> > - The ceded NAR is $750{,}000 - 30{,}000 = 720{,}000$.
> > - The YRT premium is $720(2.10) = 1{,}512$.

## Coinsurance

Under coinsurance the reinsurer takes share $s$ of premiums, claims, surrenders and the reserve, and pays an allowance toward the cedant's acquisition and maintenance expenses. Assets equal to its reserve move to the reinsurer, so it earns the investment income on them, sets up its share of each reserve increase, and bears the investment and [[Interest Rate Risk|interest rate]] risk.

## Modified coinsurance

Under modco the cedant keeps the reserve and the assets. To give the reinsurer the economics of coinsurance, the cedant pays the reinsurer interest $I$ on the reserve, and the reinsurer pays the cedant the increase in reserve $\Delta V$. The modco adjustment, the net of the two paid by the reinsurer when positive, is

> $$\text{Modco adjustment} = s\left(\Delta V - I\right)$$

> [!example]- What is the reinsurer's result under coinsurance and under modco? {Example}
> A block is reinsured $50\%$. This year the block has premiums $100{,}000$, claims $60{,}000$, opening reserve $400{,}000$ and closing reserve $430{,}000$. Assets backing the reserve earn $5\%$. The allowance is $15\%$ of ceded premium. All cash flows occur at year end, so interest is earned on the opening reserve only.
>
> > [!answer]-
> > - The ceded premium is $50{,}000$, the ceded claims $30{,}000$ and the allowance $7{,}500$.
> > - The ceded reserve rises from $200{,}000$ to $215{,}000$, an increase of $15{,}000$.
> > - Under coinsurance the reinsurer's assets earn $0.05(200{,}000) = 10{,}000$.
> > - Its coinsurance result is $50{,}000 - 30{,}000 - 7{,}500 + 10{,}000 - 15{,}000 = 7{,}500$.
> > - Under modco the interest on the reserve is $0.05(400{,}000) = 20{,}000$, so the modco adjustment is $0.5(30{,}000 - 20{,}000) = 5{,}000$, paid by the reinsurer.
> > - Its modco result is $50{,}000 - 30{,}000 - 7{,}500 - 5{,}000 = 7{,}500$.
> > - The profit is identical. Under modco the reinsurer holds no reserve and no assets, and the cedant keeps control of the investments.

## Funds withheld

Under funds withheld the reinsurer reports the reserve liability, but the cedant withholds the assets and credits interest on them. The reinsurer's asset is a funds-withheld receivable from the cedant. The arrangement limits the cedant's [[Reinsurance Credit Risk|credit risk]] to an unauthorized or offshore reinsurer.

> [!trap] Getting the direction of the modco adjustment wrong
> With the reserve rising faster than the interest on it, the reinsurer pays the cedant. A sign error moves both parties' results by twice the adjustment: the reinsurer's result would be $17{,}500$ in place of $7{,}500$ in the example.
