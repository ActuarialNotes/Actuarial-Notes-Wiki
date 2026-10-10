---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b621cd69cbe52a88a3e6f14a80f85ac900bea7e50fc7e063ebeaf57d6c2f40fa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Persistency.md
---

**Premium Persistency** is the pattern of premiums that owners of flexible-premium policies, chiefly [[Universal Life Insurance|universal life]] (UL), actually pay while their policies stay in force: whether each year's premium is paid, and how much of the planned premium it is. Because a UL owner can pay more, less or nothing in any year, a premium persistency assumption is needed beside the [[Lapse|lapse]] assumption to project account values, cost of insurance revenue, secondary guarantee costs and the lapses that follow from underfunding.

> $$\text{PPR}_t = \frac{\sum \text{premium paid in policy year } t}{\sum \text{planned premium in policy year } t}$$

> $$AV_t = \left(AV_{t-1} + \rho_t\,G - C_t\right)(1 + i^{c}_t)$$

- **Symbols:** $\text{PPR}_t$ is the premium persistency ratio in policy year $t$, measured over the policies in force in that year. In the projection, $G$ is the planned (billed) premium, $\rho_t$ is the assumed premium persistency in year $t$, $C_t$ is the year's expense and cost of insurance charges and $i^{c}_t$ is the credited rate.
- **Premium patterns:** Owners fund UL policies in recognizable ways: a single premium or a large dump-in in the early years, the level planned premium, the commission target premium, the minimum premium needed to keep a [[No-Lapse Guarantee|no-lapse guarantee]] in force, or a premium that stops after a few years and relies on the account value. A study measures persistency separately for each pattern, because each one behaves differently.
- **Distinct from lapse:** Policy persistency asks whether the policy is still in force, and premium persistency asks what premium a persisting policy pays. A UL policy can stop premiums and stay in force for years on its account value, so a premium shortfall today becomes a lapse later, when the account can no longer pay the charges.
- **Why it matters for secondary guarantees:** On a secondary guarantee UL policy, the guarantee depends on cumulative premiums or a shadow account, not on the account value. An owner who pays just the guarantee premium keeps the cover with a small or empty account, so premiums that fall to the guarantee minimum mean less premium income and a larger cost of the guarantee. Owners who keep paying that minimum when the product was priced for them to stop also mean fewer lapses than were priced.
- **Setting the assumption:** The assumption comes from an [[Experience Study|experience study]] of premiums received against planned premiums, by premium pattern, policy duration, issue age, funding level and product type, such as current-assumption UL against secondary guarantee UL. The SOA's 2012 report on premium persistency of flexible premium UL is the industry reference on the ILA-101 syllabus.
- **Uses:** The assumption feeds pricing and [[Profit Testing|profit tests]], principle-based reserves, cash flow testing and illustrations. It interacts with the lapse, mortality and interest assumptions, so it must be set consistently with them. In a stochastic model it can be made a [[Dynamic Policyholder Behavior|dynamic]] assumption, so that owners pay more or less as credited rates move.

> [!example]- Account Value Under Two Premium Patterns {Example}
> A universal life policy has a planned annual premium of \$2,000. With illustrative charges, \$1,000 of expense and cost of insurance charges is deducted at the start of each year, and the account is credited 4% a year. The policy carries a no-lapse guarantee that keeps the cover in force while cumulative premiums paid are at least \$800 times the number of years elapsed. Project the account value under pattern A, which pays the planned premium every year, and pattern B, which pays the planned premium for two years and then nothing, and say what happens in year 5.
>
> > [!answer]-
> > Both patterns are the same for the first two years.
> > $$
> > \begin{align*}
> > AV_1 &= (0 + 2{,}000 - 1{,}000)(1.04) \\
> > &= 1{,}040.00 \\
> > AV_2 &= (1{,}040.00 + 2{,}000 - 1{,}000)(1.04) \\
> > &= 2{,}121.60
> > \end{align*}
> > $$
> > Under pattern A, each year adds \$1,000 before interest, giving $AV_3 = 3{,}246.46$, $AV_4 = 4{,}416.32$ and $AV_5 = 5{,}632.98$. Under pattern B, the charges run the account down.
> > $$
> > \begin{align*}
> > AV_3 &= (2{,}121.60 - 1{,}000)(1.04) \\
> > &= 1{,}166.46 \\
> > AV_4 &= (1{,}166.46 - 1{,}000)(1.04) \\
> > &= 173.12
> > \end{align*}
> > $$
> > At the start of year 5 the account of \$173.12 cannot pay the \$1,000 of charges. Without the guarantee, the policy would lapse at the end of its grace period. Under the guarantee, cumulative premiums are $\$4{,}000 \geq 5 \times \$800$, so the cover stays in force and the insurer bears the charges that the account can no longer pay. From year 6 the test needs \$4,800 or more, so the owner must resume premiums of at least \$800 a year to keep the guarantee, which is the minimum-premium funding pattern. The same owner is a lapse under one product and a guarantee claim under the other, which is why premium persistency matters most on secondary guarantee products.

> [!example]- Expected Premium Income From a Study {Example}
> A study of a UL block gives the following planned and received premiums, in millions, for the policies in force in each policy year.
>
> | Policy year | 1 | 2 | 3 |
> |---|---|---|---|
> | Planned premium | 5.00 | 4.40 | 3.90 |
> | Premium received | 4.60 | 3.52 | 2.73 |
>
> A new block of 1,000 policies with a planned premium of \$2,000 each is expected, on the lapse assumption, to have 100%, 92% and 85% of its policies in force at the start of years 1, 2 and 3. Find the premium persistency ratios and the expected premium income in each year.
>
> > [!answer]-
> > The ratios are $4.60/5.00 = 92\%$, $3.52/4.40 = 80\%$ and $2.73/3.90 = 70\%$. Expected premium is the number in force times the planned premium times the ratio.
> > $$
> > \begin{align*}
> > P_1 &= 1{,}000(1.00)(2{,}000)(0.92) \\
> > &= 1{,}840{,}000 \\
> > P_2 &= 1{,}000(0.92)(2{,}000)(0.80) \\
> > &= 1{,}472{,}000 \\
> > P_3 &= 1{,}000(0.85)(2{,}000)(0.70) \\
> > &= 1{,}190{,}000
> > \end{align*}
> > $$
> > Premium income falls faster than the number of policies, because the owners who stay also pay less. The ratios are measured over persisting policies, so they are applied to the policies in force and not to the policies issued.

> [!tip]- How it appears on the exam
> - **ILA-101 assumption questions:** Candidates describe how premium persistency is defined and measured for flexible premium UL, how it differs from lapse, and how it varies by premium pattern, duration and product type, drawing on the 2012 premium persistency study.
> - **Evaluation:** A question may give a product, such as a secondary guarantee UL, and ask how a change in the assumption affects reserves, profitability or lapse risk, or which assumption would be appropriate for pricing as opposed to valuation.
> - **Calculation:** Short calculations project an account value or premium income under a given persistency pattern, or compute ratios of received to planned premium from study data.

> [!warning]- Exam traps
> - **Counting lapse twice:** A ratio measured over persisting policies already excludes lapsed policies. Multiplying it by a survival factor is correct, but applying a ratio measured over all issued policies and then a survival factor counts the lapses twice.
> - **Low premium is not lower risk:** On a secondary guarantee product, an owner who pays exactly the guarantee premium instead of the planned premium keeps the guarantee while the account stays small, so the insurer pays more of the cost once the account is exhausted. Assuming that underfunded policies lapse when the account runs out, as they would without the guarantee, understates the reserve.
> - **Stopped premiums are not lapses:** A policy that stops paying stays in force until the account is exhausted. Treating the stop as an immediate lapse removes years of cost of insurance charges and, under a guarantee, the claims that follow.
> - **Pattern mix:** An aggregate ratio blends dump-in, target and minimum premium payers. If the new business mix differs from the study's, the aggregate ratio misstates future premiums even when each pattern's behavior is unchanged.
