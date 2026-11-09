---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:86be73828fe71a65611d13f93507b209b4ce9eed2346788c2783b4cfea2ad79c
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 100-104 (PDF pp. 112-116), Tables 6.4-6.6; App. D pp. D-1-D-3, D-8 (PDF pp. 394-396, 401), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 p. 44; Ch. 6 p. 76; Ch. 7 p. 96; Ch. 13 p. 283, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Provision Changes.md
---

![[Media/Figures/Policy_Provision_Changes.svg|340]]

**Policy Provision Changes** are changes in what a policy covers: its limits, deductibles, coverages and exclusions, and the benefit levels a law change or court ruling sets, such as a cap on damages or a change in workers compensation statutory benefits. They change the losses paid on the same underlying risks, so historical losses are restated to the provisions that will apply in the future. A change in the rates charged is not one of them, since it changes premium but not losses.

Werner & Modlin's adjustment to bring a historical period's losses to the current benefit level, like the on-level factor for premium, is

> $$\text{Benefit Adjustment Factor} = \frac{\text{Current Loss Level}}{\text{Average Loss Level of the Historical Period}}$$

- Each loss level is the product of $1$ plus the effect of each benefit change in force, starting from $1.00$ before the first change.
- The average loss level weights each level by the share of the period's losses incurred under it.

A change can apply to claims occurring on or after a date, or to losses on policies written on or after a date. On accident year data, the first splits each year at the date, so a year is affected in proportion to its claims after the date. The second splits it along a diagonal, the line of a policy written on the date, and the shares are found by the parallelogram method used for on-level premium.

> [!example]- A reform cuts benefits by $20\%$ for accidents on or after $7/1/2024$, with accidents uniform over each year. What factors bring accident years $2023$, $2024$ and $2025$ to the new benefit level? {Example}
> - The loss level is $1.00$ before the reform and $0.80$ after it.
> - Accident year $2023$ is entirely at $1.00$, so its factor is $0.80/1.00 = 0.800$.
> - Half of accident year $2024$ is at each level, so its average level is $0.90$ and its factor is $0.80/0.90 = 0.889$.
> - Accident year $2025$ is entirely at the new level, so it is not adjusted.

> [!example]- A law change raises losses by $5\%$ on annual policies written on or after $7/1/2024$, with policies written uniformly. What is the adjustment factor for accident year $2024$? {Example}
> - The losses of accident year $2024$ on policies written after $7/1/2024$ form a triangle with base and height one-half of the year, so their share is $0.5 \times 0.5 \times 0.5 = 0.125$.
> - The average loss level is $0.875 \times 1.00$ plus $0.125 \times 1.05$, or $1.00625$.
> - The factor is $1.05/1.00625 = 1.0435$.

## Restating history to the current level

When losses throughout the history are stated at the level before every change that will apply in the future, each year is multiplied by the product of $1$ plus the effect of each of those changes. When the changes take effect at different times, each accident year is multiplied by the product of the changes after it, plus any known change after the experience period. A year's own change is not applied to it again. A law or court change that raises future payments is reflected by multiplying the projected future severities, the unpaid amounts for periods after its effective date, by the increase.

Loss trend is selected from losses first adjusted for the benefit changes. Data that still contain a benefit increase overstate the trend, and applying the benefit adjustment on top of such a trend counts the change twice.

> [!example]- A deductible rises from $\$1{,}000$ to $\$5{,}000$. Of $1{,}000$ historical claims, already net of the old deductible, $600$ had ground-up losses between $\$1{,}000$ and $\$5{,}000$ and total $\$1{,}800{,}000$, and $400$ were larger and total $\$6{,}200{,}000$. What are the restated losses? {Example}
> - Under the new deductible the $600$ small claims pay nothing, which eliminates $\$1{,}800{,}000$.
> - Each of the $400$ larger claims pays $\$4{,}000$ less, which eliminates $400 \times 4{,}000 = \$1{,}600{,}000$.
> - The restated losses are the $\$8{,}000{,}000$ less $\$3{,}400{,}000$ eliminated, or $\$4{,}600{,}000$.
> - The claim count falls from $1{,}000$ to $400$, and the average severity rises from $\$8{,}000$ to $\$11{,}500$.

A lower deductible works the other way. More losses exceed it and are reported, so the frequency rises and the average severity per claim falls with the added small claims, while each claim pays more. The [[Frequency-Severity Method|frequency-severity technique]] assumes claim definitions, policy terms and the mix of deductibles are consistent over time, so the history is first adjusted to the current terms. In a rate indication, the historical losses and LAE are restated to the new deductible with [[Deductible Rating|deductible factors]], unless the trend already reflects the change. Otherwise the loss provision is overstated.

[[Policy Year|Policy year]] grouping separates the policies written under the old and new deductibles, and the earlier policy years are then adjusted to the new level. A policy year is not fully mature until well after it ends, because its policies span two calendar years. It is better suited to long-tailed lines and to isolating changes in limits and deductibles than to short-tailed lines such as property.

## Benefit changes in workers compensation

In [[Workers Compensation Insurance|workers compensation]] the statute sets a compensation rate, a percentage of the worker's pre-injury wage, and a minimum and maximum weekly benefit stated as percentages of the state average weekly wage. A worker's weekly benefit is the compensation rate times the wage, raised to the minimum or cut to the maximum.

The **direct effect** of a change is the total benefits after it divided by the total benefits before it, minus one, over the distribution of workers by wage. A wage band below the minimum or above the maximum is paid the limit times its number of workers, and a band between them is paid the compensation rate times its total wages. Lowering the maximum cuts benefits only for the workers whose benefit is at or above the new maximum.

**Indirect effects** arise from changes in claimant behaviour caused by the benefit change, and are much harder to quantify. A benefit that replaces more of the wage may lead more workers to file claims and to return to work later. A lower maximum benefit may also have an indirect effect, whose strength depends on the economic environment and the nature of the insured population. With no data to estimate the indirect effect, it is set judgmentally.

Indemnity benefits are tied to wages, so they also rise with wage inflation. In Werner & Modlin's workers compensation indication the annual benefit-level changes and the annual impact of wage inflation on benefits are separate factors, multiplied together into one benefit cost level factor.
