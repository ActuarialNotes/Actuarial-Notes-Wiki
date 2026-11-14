---
aliases:
  - Term Insurance Reserve
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e757d59840a04fa28a594ba1a32b4713688012413d6a131caed447e5a1af132f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability for Future Policy Benefits.md
---
The **Liability for Future Policy Benefits** (LFPB) is the U.S. [[GAAP]] reserve for traditional long-duration contracts such as [[Term Life Insurance|term]] and [[Whole Life Insurance|whole life insurance]] and payout annuities. Under ASC 944 as amended by the long-duration targeted improvements (LDTI), it is the present value of future benefits and related expenses less the present value of future net premiums, where the net premiums are a fixed share of the gross premiums.

That share is the net premium ratio, which is

> $$\text{NPR} = \frac{\text{PV}(\text{past and future benefits})}{\text{PV}(\text{past and future gross premiums})}$$

- Each present value is taken over a cohort of contracts, grouped no more broadly than by issue year.
- Past amounts are the actual cash flows to date and future amounts the current best estimates, all discounted at the cohort's locked-in rate.
- Benefits include the related claim expenses.

The NPR is set at issue by the [[Equivalence Principle|equivalence principle]] on best-estimate assumptions, with no provision for adverse deviation. The rest of the premium emerges as margin over the life of the cohort, so profit is recognised in proportion to premium. At duration $t$, the liability is

> $$\text{LFPB}_t = \text{PV}_t(\text{future benefits}) - \text{NPR} \times \text{PV}_t(\text{future gross premiums})$$

Acquisition costs do not enter the benefit present value, because the [[Deferred Acquisition Cost|deferred acquisition cost]] asset is amortised separately.

> [!example]- What are this term cohort's NPR and its LFPB at the end of year 1? {Example}
> An insurer issues 1,000 three-year term policies, each paying $\$100{,}000$ at the end of the year of death, with an annual gross premium of $\$600$ at the start of each year. Best-estimate mortality is $q = 0.004$, $0.005$ and $0.006$ in years 1 to 3, and 10% of survivors lapse at the end of years 1 and 2. The locked-in discount rate is $4\%$, and year 1 goes exactly as expected.
>
> | Year | In force | Deaths | Premiums ($000) | Benefits ($000) |
> | :--- | ---: | ---: | ---: | ---: |
> | 1 | 1,000.000 | 4.000 | 600.000 | 400.000 |
> | 2 | 896.400 | 4.482 | 537.840 | 448.200 |
> | 3 | 802.726 | 4.816 | 481.636 | 481.636 |
>
> > [!answer]-
> > - Premiums are discounted from the start of each year and benefits from the end, at $4\%$.
> > - At issue, the premiums are worth 1,562.453 and the benefits 1,227.174, so $\text{NPR} = 1{,}227.174/1{,}562.453 = 78.54\%$.
> > - At the end of year 1, the remaining premiums are worth 1,000.951 and the remaining benefits 876.261.
> > - The liability is $876.261 - 0.785415(1{,}000.951) = 90.099$, or $\$90{,}099$.
> > - That is $\$100.51$ for each of the 896.4 policies in force.
> > - The retrospective check gives the same figure: $0.785415(600)(1.04) - 400 = 90.099$.

## Unlocking with a catch-up

At least annually, at the same time each year, the insurer reviews its mortality, lapse and other cash-flow assumptions and updates them. The NPR is recomputed from inception using actual history and the new expectations. The change in the liability at the locked-in rate is reported in net income as a remeasurement gain or loss.

If the updated NPR exceeds 100%, the benefits cost more than the gross premiums. The NPR is then set to 100% and the excess is recognised as a loss at once, so a cohort cannot carry an unrecognised loss forward.

> [!example]- What are the cohort's new NPR, revised LFPB and remeasurement after this assumption update? {Example}
> In the cohort above, year 1 went as expected, but the annual review raises the best-estimate mortality for years 2 and 3 to $q = 0.006$ and $0.007$, with lapses unchanged. The recomputed present values at $4\%$ are:
>
> | Measured from | Premiums | Benefits |
> | :--- | ---: | ---: |
> | Issue | 1,562.006 | 1,380.911 |
> | End of year 1 | 1,000.486 | 1,036.148 |
>
> > [!answer]-
> > - The NPR is recomputed from inception: $1{,}380.911/1{,}562.006 = 88.41\%$.
> > - The revised liability is $1{,}036.148 - 0.884063(1{,}000.486) = 151.655$.
> > - The retrospective check confirms it: $0.884063(600)(1.04) - 400 = 151.655$.
> > - The remeasurement is $151.655 - 90.099 = 61.556$, a loss of $\$61{,}556$ in net income in the period of the update.
> > - The future margin falls from 21.46% to 11.59% of premium.

## Two discount rates

Interest accretion, the unwinding of the discount through the income statement, uses the rate locked in at issue. The balance sheet carries the liability at the current yield on upper-medium-grade fixed-income instruments, usually read as single-A, updated each reporting date. The difference between the two measurements sits in accumulated [[Comprehensive Income|other comprehensive income]].

> [!example]- At a current upper-medium-grade rate of 5%, what balance sheet liability does the original cohort carry at the end of year 1? {Example}
> - The NPR stays at the locked-in 78.54%.
> - At $5\%$, the remaining benefits are worth 863.715 and the remaining premiums 996.541.
> - The liability is $863.715 - 0.785415(996.541) = 81.017$, or $\$81{,}017$.
> - The $\$9{,}082$ difference from the locked-in measure is a gain in other comprehensive income, while net income keeps accreting interest at $4\%$.

## Before LDTI and other frameworks

Before LDTI, traditional contracts used assumptions locked in at issue with provisions for adverse deviation, and they were unlocked only when a premium deficiency (loss recognition) test failed. Guarantees that expose the insurer to capital market risk are now measured at fair value as market risk benefits.

A [[Statutory Accounting Principles|statutory]] reserve uses prescribed conservative assumptions and the [[Commissioners Reserve Valuation Method|CRVM]] formula, so it is generally larger. [[IFRS 17]] adds a risk adjustment and defers profit in a [[Contractual Service Margin|contractual service margin]] rather than in the premium ratio. The [[Valuation Principle|valuation principle]] page compares the three.

> [!trap] Taking a discount rate change to net income
> The net premium ratio and the interest accreted through net income use the rate locked in at issue. A move in the current rate changes only the balance sheet amount, and the difference goes to other comprehensive income. In the example, the $\$9{,}082$ from the move to 5% is not a gain in net income.
