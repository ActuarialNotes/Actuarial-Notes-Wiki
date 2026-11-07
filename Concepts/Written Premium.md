---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3192646e2c9190a2f5eddf0935e7220d2fdc42223d037a81f1ad74bb15770d4e
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 53 ¶3-4, 6, 12, 14-15 (PDF pp.347-350); SSAP No. 62R ¶30 (62-8, PDF p.441), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), U&IE Part 1B columns, pp.82-83, 218 (printed 81-82, 217), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 p.2, Ch.5 pp.66-70, 78-79 (PDF pp.14, 78-82, 90-91) — prior-pass source, re-fetched this run, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Written Premium.md
---

![[Media/Figures/Written_Premium.svg|340]]

**Written Premium** is the total premium of the policies written during a period, the full-term premium of each policy whose effective date falls in the period, regardless of how much of its coverage has been provided. Mid-term adjustments, such as endorsements, cancellations and audits, are written premium too. For a period, it is

> $$\text{Written Premium} = \sum \text{Full-Term Premium} + \text{Adjustments}$$

- $\text{Full-Term Premium}$ is the premium for the whole term of each policy with an effective date in the period.
- $\text{Adjustments}$ are the additional and return premiums of the mid-term changes assigned to the period.

Written premium is assigned by the policy's effective date. Under SSAP No. 53 it is recorded on the effective date, not when the premium is billed or received. Premium received before the effective date is an advance premium liability, not written premium, until coverage begins.

> [!example]- An annual homeowners policy is written on 10/1/2024 for $\$1{,}200$. What are its calendar year 2024 written, earned and unearned premium? {Example}
> - Its effective date is in 2024, so its whole $\$1{,}200$ is calendar year 2024 written premium.
> - Three of its twelve months fall in 2024, so its 2024 [[Earned Premium|earned premium]] is $1{,}200 \times 3/12 = \$300$.
> - The [[Unearned Premium|unearned premium]] at 12/31/2024 is $1{,}200 \times 9/12 = \$900$, which is earned in 2025.

## Cancellations and audits

A pro rata mid-term cancellation returns the premium for the unexpired part of the term as negative written premium. Only the premium for the expired part is earned. Where the negative written premium goes depends on the aggregation:

- **Calendar year.** The return premium is written premium of the calendar year in which the cancellation occurs, which can be a later year than the original. The original year is not restated.
- **Policy year.** The return premium is booked in the policy's own policy year, once the cancellation has occurred by the evaluation date. Before that, the policy year holds the full original written premium.

Audit premium follows the same rule. It is written premium of the calendar year in which it is booked, and of the policy's original policy year once the audit has occurred. Policy year premium in an audited line, such as workers compensation, therefore keeps developing after the policy year ends.

> [!example]- An annual policy is written on 7/1/2011 for $\$400$ and cancelled on 3/31/2012, after 75% of its term has expired. What written premium does it contribute to each calendar year and to policy year 2011? {Example}
> - Its original $\$400$ is calendar year 2011 written premium.
> - The cancellation returns the unexpired 25%, $0.25 \times 400 = \$100$, as $-\$100$ of calendar year 2012 written premium.
> - In policy year 2011, the original $\$400$ and the $-\$100$ are both booked, for $\$300$ of written premium once the evaluation date is on or after 3/31/2012.
> - The policy earns $\$200$ in 2011 and $\$100$ in 2012, its premium for the 75% of the term that expired.

## Written and earned premium

Earned premium is the written premium adjusted for the change in the unearned premium reserve:

> $$\text{Written Premium} = \text{Earned Premium} + \text{Ending UEP} - \text{Beginning UEP}$$

- $\text{Ending UEP}$ and $\text{Beginning UEP}$ are the unearned premium reserves at the end and the start of the period.

In a growing book, the unearned premium reserve rises and written premium exceeds earned premium. In a shrinking book the relationship reverses.

## Written premium in ratemaking

Losses arise from the coverage provided in a period, so a loss ratio's denominator is earned premium. Written premium shows what is being sold now. The changes in average written premium at current rate level measure [[Premium Trend|premium trend]]. The premium is first restated at current rate level, or the trend data shows an abrupt change at each rate change, and the rate change would be counted twice: once in the current rate level adjustment and once in the trend.

## Direct, assumed, ceded and net written premium

An insurer's written premium is direct, on its own policies, or assumed, on reinsurance it accepts. Ceded written premium is the part it passes to its reinsurers. Its net written premium is

> $$\text{Net Written Premium} = \text{Direct} + \text{Assumed} - \text{Ceded}$$

- $\text{Direct}$, $\text{Assumed}$ and $\text{Ceded}$ are the direct, assumed and ceded written premium of the period.

> [!trap] A loss ratio on written premium
> An insurer writes $\$40{,}000{,}000$ and earns $\$37{,}000{,}000$ in 2023, then writes $\$52{,}000{,}000$ and earns $\$44{,}000{,}000$ in 2024, with losses of $\$26{,}640{,}000$ and $\$31{,}680{,}000$. On written premium its loss ratio falls from 66.6% to 60.9%. On earned premium it is 72.0% in both years. A growing book always looks better on written premium. Divide losses by earned premium.
