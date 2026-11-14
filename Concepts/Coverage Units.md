---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:41d6b2242c5292b09e04b8a75957e137c19f05914423814495237adffe3cae25
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coverage Units.md
---
![[Media/Figures/Coverage_Units.svg|340]]

**Coverage Units** are the [[IFRS 17]] measure of the quantity of service a group of contracts provides in a period. They allocate the [[Contractual Service Margin]] (CSM) to [[Insurance Revenue|insurance revenue]], by spreading the CSM over the coverage units provided this period and expected in future periods.

The CSM released in a period is

> $$\text{CSM released} = \text{CSM} \times \frac{\text{Coverage units this period}}{\text{Total coverage units remaining}}$$

- $\text{CSM}$ is the contractual service margin available for the group.
- The total coverage units remaining are the units provided this period plus those expected in future periods.

## Choosing the coverage unit driver

The quantity of coverage is determined by considering the amount of benefits the contracts could provide and their expected duration. IFRS 17 does not prescribe a formula. The insurer selects a driver that reflects the service and applies it consistently. Common drivers are:

1. the number of contracts in force, the simplest, appropriate where each contract provides similar coverage;
2. the sum insured or policy limit, where amounts differ materially;
3. expected claims;
4. time.

The choice is a significant judgement and must be disclosed. It can change reported profit substantially. A limit-weighted driver front-loads profit on a group whose large policies expire early, while a contract-count driver spreads it evenly over the contracts.

> [!example]- What is this group's year-1 CSM release under a contract-count driver and under a limit-weighted driver, and which driver fits? {Example}
> A three-year group has a CSM at inception of $\$15$ million and two sub-blocks:
>
> | Sub-block | Contracts | Limit each | In force in year 2 | In force in year 3 |
> | :--- | ---: | ---: | ---: | ---: |
> | Large | $1{,}000$ | $\$1$ million | $100\%$ | $100\%$ |
> | Small | $4{,}000$ | $\$100{,}000$ | $50\%$ | $25\%$ |
>
> > [!answer]-
> > - Contracts in force are $5{,}000$ in year 1, $1{,}000 + 2{,}000 = 3{,}000$ in year 2 and $1{,}000 + 1{,}000 = 2{,}000$ in year 3, a total of $10{,}000$.
> > - Under the contract-count driver, the year-1 release is $\$15\text{M} \times 5{,}000/10{,}000 = \$7.5$ million.
> > - Limits in force, in millions, are $1{,}000 + 400 = 1{,}400$ in year 1, $1{,}200$ in year 2 and $1{,}100$ in year 3, a total of $3{,}700$.
> > - Under the limit-weighted driver, the year-1 release is $\$15\text{M} \times 1{,}400/3{,}700 = \$5.68$ million.
> > - The two drivers differ by $\$1.8$ million of year-1 profit, with no difference in cash, claims or coverage.
> > - A $\$1$ million contract provides far more coverage than a $\$100{,}000$ one, and the large contracts persist while the small ones lapse.
> > - Counting contracts would not reflect the amount of benefits the contracts could provide, so the limit-weighted driver fits these facts.

## Expected duration and revision

Because expected duration is part of the quantity of coverage, coverage units reflect **expected lapses**. Units are counted for the coverage actually expected to be provided, not for the full contractual term. The pattern of expected future coverage units is revised each period, which changes the release rate prospectively. A group whose expected duration shortens releases its CSM faster.

## Where coverage units apply

Under the [[Premium Allocation Approach|premium allocation approach]], the [[Liability for Remaining Coverage|liability for remaining coverage]] has no CSM to release, so coverage units are not needed. They matter to a Canadian P&C insurer mainly on multi-year contracts measured under the [[General Measurement Model|general measurement model]] and on some [[Reinsurance Contracts Held|reinsurance contracts held]].

> [!trap] Counting the full contractual term
> Coverage units ignoring cancellation overstate the coverage still to come, so the CSM is released too slowly. Count only the coverage expected to be provided after expected lapses.
