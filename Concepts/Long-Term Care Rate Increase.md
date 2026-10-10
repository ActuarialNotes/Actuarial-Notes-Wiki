---
aliases:
  - Long Term Care Rate Increase
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3cf27fdc627ba28abc8dacf35f6952a1efa76949fcc4a6ae2e18335e80aa913c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Long-Term Care Rate Increase.md
---
A **Long-Term Care Rate Increase** is an increase in the premium rates of an in-force block of [[Long-Term Care Insurance|long-term care insurance]], which an insurer may file because LTC premiums are level but not guaranteed and can be raised for a whole class of policyholders with the approval of state regulators. Many blocks sold before the late 2000s have needed repeated increases, because claims have run far above the pricing. Regulators review each filing against loss ratio tests, rate stability rules and, for filings submitted to it, the NAIC's multistate rate review framework.

> $$\text{LLR} = \frac{\text{AV}(C) + \text{PV}(C)}{\text{AV}(P) + (1 + r)\,\text{PV}(P)}$$

> $$r_{\text{makeup}} = \frac{\big(\text{AV}(C) + \text{PV}(C)\big)/\text{LLR}_0 - \text{AV}(P)}{\text{PV}(P)} - 1$$

> $$\text{AV}(C) + \text{PV}(C) \ge 0.58\,\big(\text{AV}(P) + \text{PV}(P)\big) + 0.85\,r\,\text{PV}(P)$$

- **Symbols:** $\text{AV}(C)$ and $\text{AV}(P)$ are the past incurred claims and earned premiums accumulated with interest to the valuation date, and $\text{PV}(C)$ and $\text{PV}(P)$ are the present values of projected future claims and of future premiums at current rates. $r$ is the proposed increase, $\text{LLR}$ the lifetime [[Loss Ratio|loss ratio]] after it, and $\text{LLR}_0$ the lifetime loss ratio in the original pricing.
- **Why blocks need increases:** Early LTC pricing assumed that many policyholders would [[Lapse|lapse]], but far fewer did, so many more policies survive to the ages where claims happen. Mortality improved, claims lasted longer as care moved to assisted living and home care, and the long fall in interest rates cut the investment income the level premium relied on. Each of these raises the present value of future claims well above the pricing.
- **Pre-rate-stability policies:** For older policies, a rate increase is justified when the projected lifetime loss ratio exceeds the loss ratio of the original pricing. The **makeup** approach finds the increase that brings the lifetime loss ratio back to the original level, so the remaining policyholders make up for the premium that was too low in the past.
- **Rate stability rules:** Under the NAIC's rate stability provisions, which most states adopted from the early 2000s, the initial premium must be certified as sufficient under moderately adverse experience. A later increase must meet the 58/85 test in the third block above: lifetime claims must be at least 58% of the premiums at original rates plus 85% of the premium from the increase, which limits the margin an insurer keeps from an increase to 15%.
- **The if-knew premium:** The **if-knew** premium is what the original premium would have been if today's assumptions had been known at issue. Raising rates only to the if-knew premium means current policyholders don't pay for the past shortfall, so the insurer bears the losses already incurred.
- **The multistate framework:** The NAIC adopted the multistate actuarial (MSA) rate review framework in 2022, so that a team of state actuaries reviews an insurer's filing once and recommends a result each state may adopt. It originally reviewed filings under both the Minnesota approach, a blend of the makeup and if-knew approaches with cost sharing, and the Texas approach, which looks at whether the increase reflects changes in expected future experience. The December 2025 revision uses the Minnesota-based approach, with cost sharing that increases with a policyholder's cumulative past increases, so older policyholders who have already absorbed several increases bear less of the next one. Reviews may adjust for interest rates using a market index, and approved increases are often phased in over several years.
- **Policyholder options:** With an increase, insurers offer reduced benefit options that keep the premium level, such as a shorter benefit period, a lower daily maximum or less inflation protection. Policyholders who lapse after a substantial increase keep a paid-up contingent nonforfeiture benefit.
- **Guaranty associations:** When an LTC insurer becomes insolvent, the state life and health guaranty association in each policyholder's state continues the coverage up to a statutory limit, often \$300,000 of LTC benefits, funded by assessments on the other insurers licensed in the state. The 2017 liquidation of Penn Treaty, the largest LTC insolvency, showed how much of the cost can fall on the guaranty system, and it is one reason regulators approve increases that keep a carrier solvent. Associations may themselves seek rate increases on the policies they assume. The P&C counterpart is described under [[Guaranty Funds|guaranty funds]].

> [!example]- Makeup Increase and the 58/85 Test {Example}
> An LTC block was priced to a lifetime loss ratio of 60%. Accumulated past premiums are \$500 million and accumulated past claims \$250 million. At current rates, the present value of future premiums is \$400 million and of future claims \$650 million. Find the projected lifetime loss ratio, the makeup increase, and the largest increase the 58/85 test would allow.
>
> > [!answer]-
> > The projected lifetime loss ratio is $(250 + 650)/(500 + 400) = 100\%$, well above the 60% priced for.
> > $$
> > \begin{align*}
> > r_{\text{makeup}} &= \frac{900/0.60 - 500}{400} - 1 \\
> > &= 1.500 \\
> > 900 &\ge 0.58(900) + 0.85\,r\,(400) \\
> > r &\le \frac{900 - 522}{340} \\
> > &= 1.112
> > \end{align*}
> > $$
> > Restoring the original 60% loss ratio needs a 150% increase. The 58/85 test, which applies to a rate-stability policy, allows at most 111.2%, which leaves a lifetime loss ratio of 66.9%. Both figures ignore the shock lapse and benefit reductions that follow a large increase, which lower future premiums and claims.

> [!example]- If-Knew Increase, Phase-In and a Reduced Benefit Option {Example}
> A policy issued at \$2,000 a year has had increases of 30% and 25%. Under today's assumptions, the if-knew premium is \$4,000. Find the if-knew increase on the current premium, the cumulative increase since issue, the annual increase if it is phased in equally over two years, and the cut in benefits that would keep the premium unchanged.
>
> > [!answer]-
> > The current premium is $2{,}000 \times 1.30 \times 1.25 = 3{,}250$ dollars.
> > $$
> > \begin{align*}
> > r_{\text{if-knew}} &= \frac{4{,}000}{3{,}250} - 1 \\
> > &= 23.08\% \\
> > r_{\text{phase}} &= \sqrt{1.2308} - 1 \\
> > &= 10.94\% \\
> > \text{Benefit kept} &= \frac{3{,}250}{4{,}000} \\
> > &= 81.25\%
> > \end{align*}
> > $$
> > The cumulative increase since issue is 100%. The reduced benefit option keeps the premium at \$3,250 by cutting the benefits to 81.25% of their current level, for example by lowering the daily maximum. The makeup approach would ask for more than 23.08%, because it also recovers the past shortfall.

> [!tip]- How it appears on the exam
> - **CP-321 objective 2f:** Written questions ask candidates to describe the purpose and objectives of guaranty associations and the NAIC multistate rate review framework for LTC rate increases, from Sections V and VI of the framework document.
> - **Calculation:** Questions on Eaton's chapter on premium rate increases give past and projected premiums and claims and ask for the lifetime loss ratio, the increase that meets a loss ratio target, or whether a proposed increase passes the 58/85 test.
> - **Judgment:** Questions also ask candidates to compare the makeup and if-knew approaches, to explain who bears the cost of past mispricing under each, and to recommend phase-ins or reduced benefit options for older policyholders.

> [!warning]- Exam traps
> - **Past values accumulate:** Past premiums and claims are accumulated with interest to the valuation date, not discounted. Treating them as present values at issue mixes values at different dates in one loss ratio.
> - **The increase applies to future premiums:** The rate increase multiplies only the future premium, so $(1 + r)$ goes on $\text{PV}(P)$, not on the total. Applying it to past premiums makes the required increase look far smaller.
> - **The 58 and the 85:** The 58% applies to all premiums at the original rates, past and future, and the 85% only to the extra premium from the increase. Applying 85% to the whole future premium understates the allowed increase.
> - **Makeup versus if-knew:** The makeup increase recovers past losses from remaining policyholders, and the if-knew increase does not. A question that asks for the if-knew increase is answered from premiums, not from the block's loss ratio.
