---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8747b2feab55d3f233b8c3eb7656b5a0707aa63a9bc612b2dba37d5af0d426d1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Transfer Testing.md
---

**Risk Transfer Testing** is the analysis of whether a [[Reinsurance|reinsurance]] contract transfers enough insurance risk to be accounted for as reinsurance. Under U.S. GAAP (FAS 113, now ASC 944-20) and statutory accounting (SSAP No. 62R), unless the reinsurer assumes substantially all of the insurance risk, it must assume significant insurance risk, both underwriting and timing risk, and it must be reasonably possible that the reinsurer realizes a significant loss. A contract that fails gets [[Deposit Accounting|deposit accounting]] instead of [[Reinsurance Accounting|reinsurance accounting]].

> $$G = \text{PV}(\text{premium}) - \text{PV}(\text{commissions}) - \text{PV}(\text{losses})$$

> $$\text{10-10 rule: } \Pr\big(G \le -0.10\,P\big) \ge 10\%$$

> $$\text{ERD} = \frac{p\,T}{P} = \frac{E\big[\max(-G,\,0)\big]}{P}$$

- **Symbols:** $G$ is the reinsurer's net economic gain in one scenario, all cash flows between the cedant and the reinsurer discounted at a risk-free rate to inception. $P$ is the expected present value of the premium. In the expected reinsurer deficit, $p = \Pr(G < 0)$ is the probability of a net loss and $T = E[-G \mid G < 0]$ is its average size.
- **The three-step process:** The CAS Working Party summarized by Ruhm and Brehm (2007) tests in order. First, if the reinsurer assumes substantially all of the insurance risk on the reinsured portion, the contract qualifies. Second, if risk transfer is reasonably self-evident, no calculation is needed. Third, the remaining contracts are modelled and their risk metrics compared with a threshold.
- **Reasonably self-evident:** This is a practical convenience, not an accounting term. The Working Party's examples are standard per-risk and catastrophe excess of loss contracts, excess of loss contracts without loss-sensitive features, and contracts with an immaterial premium.
- **The 10-10 rule:** The long-standing rule of thumb asks for at least a 10% chance of a net loss of at least 10% of premium, which is a [[Risk Measure|value-at-risk]] test at the 90th percentile. It ignores how large the loss is beyond the 10% point, so it fails many catastrophe covers whose chance of loss is under 10%.
- **Expected reinsurer deficit:** The ERD measures the frequency times the severity of net economic loss, relative to premium. A contract that just passes the 10-10 rule has an ERD of at least $10\% \times 10\% = 1\%$, so the Working Party proposed a 1% ERD threshold. It admits every contract the 10-10 rule admits, plus low-frequency, high-severity covers and stable quota shares with frequent small losses. $T$ is the tail value-at-risk at the breakeven percentile, which is why ERD is called an expected shortfall measure.
- **Other measures:** The risk coverage ratio $E[G]/(pT)$ compares expected gain to the same tail risk. Wang's right-tailed deviation transforms the outcome distribution and measures the resulting risk load.
- **Modelling the contract:** The scenarios must include every term that moves cash between the parties: [[Loss Corridors|loss corridors]], [[Sliding Scale Commissions|sliding-scale commissions]], [[Profit Commission|profit commissions]], aggregate limits and caps, additional premiums, experience accounts and cancellation terms. Brokerage and the reinsurer's own expenses are not cash flows between the parties. The model must reflect parameter risk as well as process risk, or the tail is too thin.

> [!example]- A Quota Share With and Without a Loss Corridor {Example}
> A cedant cedes \$10,000,000 of premium on a quota share, paid at inception, and receives a 30% ceding commission at inception. Losses are paid two years after inception, on average, and the risk-free rate is 4%. The loss ratio scenarios are 55% with probability 0.25, 65% with 0.30, 75% with 0.20, 85% with 0.12, 100% with 0.08 and 130% with 0.05. Test the contract with the 10-10 rule and with ERD. Then repeat the test with a loss corridor in which the cedant retains all losses between loss ratios of 80% and 110%.
>
> > [!answer]-
> > Each scenario's gain, in \$000s, is $G = 10{,}000 - 3{,}000 - \text{LR} \times 10{,}000 \times 1.04^{-2}$, and $1.04^{-2} = 0.92456$.
> >
> > | LR | Prob. | $G$, no corridor | $G$, with corridor |
> > |---|---|---|---|
> > | 55% | 0.25 | 1,915 | 1,915 |
> > | 65% | 0.30 | 990 | 990 |
> > | 75% | 0.20 | 66 | 66 |
> > | 85% | 0.12 | -859 | -396 |
> > | 100% | 0.08 | -2,246 | -396 |
> > | 130% | 0.05 | -5,019 | -2,246 |
> >
> > Without the corridor, a loss of at least 10% of premium (\$1,000,000) occurs in the last two scenarios, with probability 13%.
> > $$
> > \begin{align*}
> > p &= 0.12 + 0.08 + 0.05 \\
> > &= 0.25 \\
> > pT &= 0.12(859) + 0.08(2{,}246) + 0.05(5{,}019) \\
> > &= 533.7 \\
> > \text{ERD} &= 533.7 / 10{,}000 \\
> > &= 5.3\%
> > \end{align*}
> > $$
> > The contract passes both tests. With the corridor, the reinsurer pays an 80% loss ratio in the 85% and 100% scenarios and 100% in the 130% scenario, so only the last scenario loses more than \$1,000,000.
> > $$
> > \begin{align*}
> > \Pr(G \le -1{,}000) &= 0.05 \\
> > pT &= 0.12(396) + 0.08(396) + 0.05(2{,}246) \\
> > &= 191.6 \\
> > \text{ERD} &= 191.6 / 10{,}000 \\
> > &= 1.9\%
> > \end{align*}
> > $$
> > The corridor fails the 10-10 rule but passes a 1% ERD test, because the reinsurer still faces a 5% chance of losing 22% of premium. The two tests disagree, and the actuary's report should show both and the judgment between them.

> [!tip]- How it appears on the exam
> - **GI-301 (objective 7i):** Candidates test a contract for risk transfer from a table of scenarios, computing present-value gains, the 10-10 probability and ERD, and state whether the contract passes.
> - **Contract features:** Questions add a loss corridor, a sliding-scale commission, a profit commission or an aggregate cap and ask how the result changes. The answer recomputes the reinsurer's cash flows in each scenario before discounting.
> - **Written answers:** Candidates describe the substantially-all and reasonably self-evident steps, the weakness of the 10-10 rule, and why ERD or another tail measure is preferred.

> [!warning]- Exam traps
> - **Nominal instead of present value:** Every cash flow is discounted at a risk-free rate to the same date. Testing nominal losses against premium paid at inception understates the gain and can pass a contract that only transfers timing risk.
> - **Missing cash flows:** The ceding commission, any additional premium and every loss-sensitive term belong in $G$. Testing only premium against losses ignores the features that are usually the reason the test is needed.
> - **Wrong probability:** The 10-10 rule needs the probability of a loss of at least 10% of premium, not the probability of any loss. Here that is 13% without the corridor, not 25%.
> - **ERD denominator:** ERD divides the expected deficit by the expected premium. Dividing by the expected loss or by the expected gain gives a different measure, the latter being the reciprocal of the risk coverage ratio.
