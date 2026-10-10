---
aliases:
  - Term Insurance Reserve
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:619427342ed624d2fe88ce6cfa5b39708310edb7dcd595c12b70a63bcd2495b7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability for Future Policy Benefits.md
---
**The Liability for Future Policy Benefits** (LFPB) is the U.S. [[GAAP]] reserve for traditional long-duration contracts such as [[Term Life Insurance|term]] and [[Whole Life Insurance|whole life insurance]] and payout annuities. Under ASC 944 as amended by the long-duration targeted improvements (LDTI), it is the present value of future benefits and related expenses less the present value of future net premiums, where the net premiums are a fixed share of the gross premiums, the net premium ratio. Cash-flow assumptions are updated at least once a year with a retrospective catch-up through net income, and the discount rate is updated each reporting date with the effect taken to [[Comprehensive Income|other comprehensive income]].

> $$\text{NPR} = \frac{\text{PV}(\text{past and future benefits})}{\text{PV}(\text{past and future gross premiums})}$$

> $$\text{LFPB}_t = \text{PV}_t(\text{future benefits}) - \text{NPR} \times \text{PV}_t(\text{future gross premiums})$$

- **Symbols:** Each present value is taken over a cohort of contracts, grouped no more broadly than by issue year. Past amounts are the actual cash flows to date and future amounts the current best estimates, all discounted at the cohort's locked-in rate. Benefits include the related claim expenses.
- **The net premium ratio:** The NPR is the share of each gross premium needed to fund the benefits, set at issue by the [[Equivalence Principle|equivalence principle]] on best-estimate assumptions, with no provision for adverse deviation. The rest of the premium emerges as margin over the life of the cohort, so profit is recognised in proportion to premium.
- **Unlocking with a catch-up:** At least annually, at the same time each year, the insurer reviews its mortality, lapse and other cash-flow assumptions and updates them. The NPR is recomputed from inception using actual history and the new expectations, and the change in the liability at the locked-in rate is reported in net income as a remeasurement gain or loss.
- **Two discount rates:** Interest accretion, the unwinding of the discount through the income statement, uses the rate locked in at issue. The balance sheet carries the liability at the current yield on upper-medium-grade fixed-income instruments, usually read as single-A, and the difference between the two measurements sits in accumulated other comprehensive income.
- **The 100% cap:** If the updated NPR exceeds 100%, the benefits cost more than the gross premiums. The NPR is then set to 100% and the excess is recognised as a loss at once, so a cohort cannot carry an unrecognised loss forward.
- **What LDTI changed:** Before LDTI, traditional contracts used assumptions locked in at issue with provisions for adverse deviation, and they were unlocked only when a premium deficiency (loss recognition) test failed. The [[Deferred Acquisition Cost|deferred acquisition cost]] asset is now amortised separately, and guarantees that expose the insurer to capital market risk are measured at fair value as market risk benefits.
- **Against other frameworks:** A [[Statutory Accounting Principles|statutory]] reserve uses prescribed conservative assumptions and the [[Commissioners Reserve Valuation Method|CRVM]] formula, so it is generally larger. [[IFRS 17]] adds a risk adjustment and defers profit in a [[Contractual Service Margin|contractual service margin]] rather than in the premium ratio. The [[Valuation Principle|valuation principle]] page compares the three.

> [!example]- LFPB for a Term Insurance Cohort {Example}
> An insurer issues 1,000 three-year term policies, each paying \$100,000 at the end of the year of death, with an annual gross premium of \$600 at the start of each year. Best-estimate mortality is $q = 0.004$, $0.005$ and $0.006$ in years 1 to 3, and 10% of survivors lapse at the end of years 1 and 2. The locked-in discount rate is $4\%$. Find the NPR and the LFPB at the end of year 1, assuming year 1 goes exactly as expected. Then measure the balance sheet liability at a current upper-medium-grade rate of $5\%$.
>
> | Year | In force | Deaths | Premiums (\$000) | Benefits (\$000) |
> |---|---|---|---|---|
> | 1 | 1,000.000 | 4.000 | 600.000 | 400.000 |
> | 2 | 896.400 | 4.482 | 537.840 | 448.200 |
> | 3 | 802.726 | 4.816 | 481.636 | 481.636 |
>
> > [!answer]-
> > Premiums are discounted from the start of each year and benefits from the end, at $4\%$.
> > $$
> > \begin{align*}
> > \text{PV prem} &= 1{,}562.453 \\
> > \text{PV ben} &= 1{,}227.174 \\
> > \text{NPR} &= \frac{1{,}227.174}{1{,}562.453} \\
> > &= 78.54\%
> > \end{align*}
> > $$
> > At the end of year 1, the remaining premiums are worth 1,000.951 and the remaining benefits 876.261 at $4\%$.
> > $$
> > \begin{align*}
> > \text{LFPB}_1 &= 876.261 - 0.785415(1{,}000.951) \\
> > &= 90.099
> > \end{align*}
> > $$
> > The liability is \$90,099, or \$100.51 for each of the 896.4 policies in force. The retrospective check gives the same figure: $0.785415(600)(1.04) - 400 = 90.099$. At $5\%$, the same net premiums give $863.715 - 0.785415(996.541) = 81.017$, so the balance sheet liability is \$81,017. The \$9,082 difference is a gain in other comprehensive income, while net income keeps accreting interest at $4\%$.

> [!example]- Unlocking the Mortality Assumption {Example}
> In the cohort above, the year 1 experience was as expected, but the annual review raises the best-estimate mortality for years 2 and 3 to $q = 0.006$ and $0.007$, with lapses unchanged. The recomputed present values from issue, at $4\%$, are 1,562.006 for premiums and 1,380.911 for benefits, and from the end of year 1 they are 1,000.486 and 1,036.148. Find the new NPR, the revised LFPB and the remeasurement.
>
> > [!answer]-
> > The NPR is recomputed from inception, combining the actual year 1 cash flows with the new expectations.
> > $$
> > \begin{align*}
> > \text{NPR} &= \frac{1{,}380.911}{1{,}562.006} \\
> > &= 88.41\% \\
> > \text{LFPB}_1 &= 1{,}036.148 - 0.884063(1{,}000.486) \\
> > &= 151.655 \\
> > \text{Remeasurement} &= 151.655 - 90.099 \\
> > &= 61.556
> > \end{align*}
> > $$
> > The insurer reports a remeasurement loss of \$61,556 in net income in the period of the update. It is the catch-up for applying the higher net premium ratio from issue, which the retrospective check confirms: $0.884063(600)(1.04) - 400 = 151.655$. The future margin falls from 21.46% to 11.59% of premium. Had the NPR exceeded 100%, it would have been capped and the excess loss recognised as well.

> [!tip]- How it appears on the exam
> - **ILA-101:** Candidates calculate a term insurance reserve under US GAAP from a small table of cash flows. They find the net premium ratio, the LFPB at a duration, and sometimes the DAC balance alongside it.
> - **ILA-201U:** Questions go further into LDTI: the annual unlocking and the catch-up, the split between net income and other comprehensive income when the discount rate moves, the 100% cap, and the contrast with statutory reserves and with the pre-LDTI treatment.

> [!warning]- Exam traps
> - **The NPR uses the locked-in rate:** The net premium ratio and the interest accreted through net income use the rate locked in at issue. The current rate only changes the balance sheet amount, and the difference goes to OCI rather than net income.
> - **Catch-up from inception:** An assumption update recomputes the NPR over the whole life of the cohort, including actual past cash flows. Applying the new assumptions only to the future with the old NPR leaves out the catch-up.
> - **Gross premiums, not net:** The present values use gross premiums and the NPR turns them into net premiums. Dividing by the present value of net premiums double-counts the ratio.
> - **No margin for adverse deviation:** LDTI removed provisions for adverse deviation, so the assumptions are best estimates. Loading them with margins, as pre-LDTI practice did, overstates the liability.
> - **Acquisition costs are not in the LFPB:** DAC is a separate asset amortised on its own basis, so commissions and other acquisition costs do not enter the benefit present value.
