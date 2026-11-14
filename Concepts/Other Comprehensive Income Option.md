---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:def97b5c6e54f0d23afa4b8d700b595c31384bec1b3cb9ba0c0b2cb426176efe
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Other Comprehensive Income Option.md
---

![[Media/Figures/Other_Comprehensive_Income_Option.svg|340]]

The **Other Comprehensive Income Option** is the [[IFRS 17]] accounting policy choice to present the effect of changes in discount rates on insurance contract liabilities in other comprehensive income (OCI) rather than in profit or loss. Profit keeps a systematic finance expense based on the rate locked in at initial recognition, or for a group under the [[Premium Allocation Approach|premium allocation approach]] at the date of the incurred claims.

Under the option, the insurance finance income or expenses (IFIE) are

> $$\text{IFIE} = \text{Systematic amount} + \text{Rate change effect}$$

- $\text{Systematic amount}$ is the finance expense at the locked-in rate, reported in profit or loss.
- $\text{Rate change effect}$ is the rest of the effect of discount-rate changes, reported in OCI.

The option is elected by portfolio and applied consistently to all groups within it. It is an accounting policy, not a period-by-period decision, and it must be disclosed. Tracking the locked-in rate by group carries the same operational burden as [[Contractual Service Margin|CSM]] accretion. [[Reinsurance Contracts Held|Reinsurance held]] may be treated the same way, and the gross and ceded presentation should be consistent, or the option reintroduces the mismatch it was meant to remove.

## Purpose of the option

The option reduces accounting mismatch. Many insurers hold bonds at fair value through OCI. If their liability discount-rate effects went to profit while the asset fair-value movements went to OCI, a parallel rate movement would swing reported profit with no economic change. Putting the liability effect in OCI aligns the two.

Total [[Comprehensive Income]] is the same either way. The option changes only where the effect appears, and so the volatility of profit, which is what most readers and many incentive schemes look at. Once assets and liabilities are both in OCI, what remains there is the effect of the [[Duration|duration]] mismatch between them.

> [!example]- Should each of these insurers elect the option? {Example}
> Each insurer has $\$800$ million of liabilities, and rates move $80$ basis points.
>
> | Insurer | Liability duration | Assets |
> | :--- | ---: | :--- |
> | A | 6 years | Mostly bonds at fair value through OCI, duration 5.8 years |
> | B | 1.5 years | Short-term instruments and equities at fair value through profit or loss |
>
> > [!answer]-
> > - Insurer A's liabilities change by about $6 \times 0.008 \times 800 = \$38.4$ million.
> > - Without the election, that change lands in profit while the offsetting asset movement sits in OCI.
> > - With the election both sit in OCI, and with durations of $6.0$ and $5.8$ the OCI residual is small. Insurer A should elect the option.
> > - Insurer B's asset movements already go to profit, so putting its liability rate effects in OCI would create a mismatch rather than remove it.
> > - Its liabilities change by only about $1.5 \times 0.008 \times 800 = \$9.6$ million. Insurer B should not elect the option.

> [!trap] Electing the option to smooth profit
> The option is meant to follow the assets: it puts the liability effect wherever the backing assets' movements are reported. Electing it where the assets are at fair value through profit or loss creates the mismatch it exists to remove.
