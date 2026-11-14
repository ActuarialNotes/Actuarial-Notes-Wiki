---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e25246fdeaed2f89152eef89f8c9db4d8377959fcaff721572e86c08d43306e0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Transfer Testing.md
---
**Risk Transfer Testing** is the analysis of whether a [[Reinsurance|reinsurance]] contract transfers enough insurance risk to be accounted for as reinsurance. Under U.S. GAAP (FAS 113, now ASC 944-20) and statutory accounting (SSAP No. 62R), unless the reinsurer assumes substantially all of the insurance risk, it must assume significant insurance risk, both underwriting and timing risk, and it must be reasonably possible that the reinsurer realizes a significant loss. A contract that fails gets [[Deposit Accounting|deposit accounting]] instead of [[Reinsurance Accounting|reinsurance accounting]].

The CAS Working Party summarized by Ruhm and Brehm (2007) tests in three steps, in order:

1. If the reinsurer assumes substantially all of the insurance risk on the reinsured portion, the contract qualifies.
2. If risk transfer is reasonably self-evident, no calculation is needed.
3. The remaining contracts are modelled and their risk metrics compared with a threshold.

"Reasonably self-evident" is a practical convenience, not an accounting term. The Working Party's examples are standard per-risk and catastrophe excess of loss contracts, excess of loss contracts without loss-sensitive features, and contracts with an immaterial premium.

The metrics are built on the reinsurer's net economic gain in each scenario, which is

> $$G = \text{PV}(\text{premium}) - \text{PV}(\text{commissions}) - \text{PV}(\text{losses})$$

- $\text{PV}$ discounts each cash flow between the cedant and the reinsurer at a risk-free rate to inception.

## Modelling the contract

The scenarios must include every term that moves cash between the parties: [[Loss Corridors|loss corridors]], [[Sliding Scale Commissions|sliding-scale commissions]], [[Profit Commission|profit commissions]], aggregate limits and caps, additional premiums, experience accounts and cancellation terms. Brokerage and the reinsurer's own expenses are not cash flows between the parties. The model must reflect parameter risk as well as process risk, or the tail is too thin.

## The 10-10 rule

The long-standing rule of thumb asks for at least a 10% chance of a net loss of at least 10% of premium:

> $$\Pr\big(G \le -0.10\,P\big) \ge 10\%$$

- $P$ is the expected present value of the premium.

It is a [[Risk Measure|value-at-risk]] test at the 90th percentile. It ignores how large the loss is beyond the 10% point, so it fails many catastrophe covers whose chance of loss is under 10%.

## Expected reinsurer deficit

The expected reinsurer deficit (ERD) measures the frequency times the severity of net economic loss, relative to premium:

> $$\text{ERD} = \frac{p\,T}{P}$$

- $p = \Pr(G < 0)$ is the probability of a net loss.
- $T = E[-G \mid G < 0]$ is its average size.

The numerator $pT$ is $E[\max(-G,\,0)]$. $T$ is the tail value-at-risk at the breakeven percentile, which is why ERD is called an expected shortfall measure. A contract that just passes the 10-10 rule has an ERD of at least $10\% \times 10\% = 1\%$, so the Working Party proposed a 1% ERD threshold. It admits every contract the 10-10 rule admits, plus low-frequency, high-severity covers and stable quota shares with frequent small losses.

Other measures use the same tail. The risk coverage ratio $E[G]/(pT)$ compares expected gain to it. Wang's right-tailed deviation transforms the outcome distribution and measures the resulting risk load.

> [!example]- Does this quota share pass the 10-10 rule and a 1% ERD test, with and without a loss corridor? {Example}
> A cedant cedes $\$10{,}000{,}000$ of premium on a quota share, paid at inception, and receives a 30% ceding commission at inception. Losses are paid two years after inception, on average, and the risk-free rate is 4%. The loss ratio scenarios are:
>
> | Loss ratio | 55% | 65% | 75% | 85% | 100% | 130% |
> | :--- | ---: | ---: | ---: | ---: | ---: | ---: |
> | Probability | 0.25 | 0.30 | 0.20 | 0.12 | 0.08 | 0.05 |
>
> In the loss corridor, the cedant retains all losses between loss ratios of 80% and 110%.
>
> > [!answer]-
> > - Each scenario's gain, in $\$000$s, is $G = 10{,}000 - 3{,}000 - \text{LR} \times 10{,}000 \times 0.92456$, since $1.04^{-2} = 0.92456$.
> > - Without the corridor the gains are $1{,}915$, $990$, $66$, $-859$, $-2{,}246$ and $-5{,}019$.
> > - A loss of at least $\$1{,}000{,}000$ occurs in the last two scenarios, with probability $0.08 + 0.05 = 13\%$, so the contract passes the 10-10 rule.
> > - $pT = 0.12(859) + 0.08(2{,}246) + 0.05(5{,}019) = 533.7$, so $\text{ERD} = 533.7/10{,}000 = 5.3\%$, which passes.
> > - With the corridor, the reinsurer pays an 80% loss ratio in the 85% and 100% scenarios and 100% in the 130% scenario. Those gains become $-396$, $-396$ and $-2{,}246$.
> > - Only the last scenario loses more than $\$1{,}000{,}000$, with probability 5%, so the contract fails the 10-10 rule.
> > - $pT = 0.12(396) + 0.08(396) + 0.05(2{,}246) = 191.6$, so $\text{ERD} = 1.9\%$, which passes a 1% ERD test.
> > - The reinsurer still faces a 5% chance of losing 22% of premium. The two tests disagree, and the actuary's report should show both and the judgment between them.

> [!trap] Using the probability of any loss in the 10-10 rule
> The 10-10 rule needs the probability of a loss of at least 10% of premium, not the probability of any loss. In the example without the corridor that is 13%, not 25%.
