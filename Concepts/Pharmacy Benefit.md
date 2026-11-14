---
aliases:
  - Prescription Drug
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:df267a311ea672c5a6ec3a4de92548679648b429e09cd0a0a35521c0495f722f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pharmacy Benefit.md
---

A **Pharmacy Benefit** is the part of a health plan that pays for outpatient prescription drugs dispensed by retail, mail-order and specialty pharmacies. It is usually run for the plan by a pharmacy benefit manager (PBM), which builds the pharmacy network, keeps the formulary, processes claims at the point of sale and negotiates rebates with drug manufacturers.

The average wholesale price (AWP) is a published list price, not what anyone pays, so pharmacy contracts and PBM guarantees are written as a discount off AWP plus a dispensing fee. The allowed cost of a script is

> $$A = \min\big((1 - d)\,\text{AWP},\ \text{MAC}\big) + f$$

- $d$ is the discount off AWP in the pharmacy contract.
- $\text{MAC}$ is the maximum allowable cost the PBM sets for a multi-source generic.
- $f$ is the dispensing fee.

Discounts are much deeper for generics than for brands, which is why generics are usually paid at the lower of the AWP discount and the MAC. Mail-order and specialty pharmacies get their own discounts.

Under a copay, the member's cost sharing on a script is

> $$K = \min(\text{Copay},\ A)$$

- A \$10 copay on a \$7 generic means the member pays \$7 and the plan pays nothing, not a negative amount.

The benefit's cost is the number of scripts times the cost per script, less the member's cost sharing and the rebates the plan receives, quoted per member per month (PMPM). Summed over the formulary tiers $j$, it is

> $$\text{PMPM} = \sum_{j} \frac{S_j\,(\bar{A}_j - \bar{K}_j)}{12{,}000} - R$$

- $S_j$ is the number of scripts per 1,000 members per year in tier $j$.
- $\bar{A}_j$ and $\bar{K}_j$ are the average allowed cost and cost sharing per script in the tier.
- $R$ is the rebate PMPM.

> [!example]- What are the plan's cost per script and its PMPM for this tier, before and after rebates? {Example}
> A preferred brand drug has an AWP of \$400 per script. The plan's PBM contract pays the pharmacy AWP minus 18% plus a \$1.50 dispensing fee, and the member pays a \$40 copay. Members fill 2,400 preferred brand scripts per 1,000 members per year, and the manufacturer pays a rebate of \$60 per script.
>
> > [!answer]-
> > - The allowed cost is $0.82 \times 400 + 1.50 = \$329.50$.
> > - The allowed cost is above the copay, so the member pays the full \$40 and the plan's cost per script is $329.50 - 40.00 = \$289.50$.
> > - The plan's PMPM at the pharmacy is $2{,}400 \times 289.50/12{,}000 = \$57.90$.
> > - The rebate is $2{,}400 \times 60/12{,}000 = \$12.00$ PMPM, so the net PMPM is \$45.90.
> > - If the copay stays at \$40 while the AWP rises, every dollar of the increase falls on the plan.

## Formulary tiers

The formulary lists covered drugs in tiers with rising cost sharing, typically generic, preferred brand, non-preferred brand and specialty. Utilization management, such as prior authorization, step therapy and quantity limits, steers members to the drugs the plan prefers. A copay tier is a fixed dollar amount, so it is [[Medical Cost Trend#Leveraging|leveraged]] as drug prices rise. Many plans use coinsurance with a per-script maximum for the costlier tiers.

## Rebates

Manufacturers pay rebates on brand drugs in return for formulary placement. The PBM passes some or all of them through to the plan sponsor. The rebate is credited after the fact, so it lowers the net cost of the benefit but not the member's cost sharing at the counter. A coinsurance percentage is applied to the allowed cost before rebates.

## Specialty drugs

Specialty drugs treat complex conditions such as cancer, multiple sclerosis and rheumatoid arthritis, often by injection. They are a small share of scripts but a large and fast-growing share of cost, so a few members on them can dominate a small group's claims.

> [!example]- What is this plan's PMPM by tier, and what share of it is specialty? {Example}
> A plan's drug utilization per 1,000 members per year is 9,000 generic, 2,000 preferred brand and 60 specialty scripts. Cost sharing is \$10 for a generic, \$40 for a brand, and 20% coinsurance up to \$250 per script for a specialty drug. The illustrative pricing is:
>
> | Tier | Average AWP | Pricing |
> | :--- | ---: | :--- |
> | Generic | \$60 | AWP minus 80% plus \$1.00 |
> | Preferred brand | \$450 | AWP minus 18% plus \$1.50 |
> | Specialty | \$6,000 | AWP minus 16% plus \$2.00 |
>
> > [!answer]-
> > - The allowed costs per script are \$13.00, \$370.50 and \$5,042.00.
> > - The specialty coinsurance is 20% of \$5,042.00, or \$1,008.40, so the \$250 maximum applies.
> > - The generic PMPM is $9{,}000 \times (13.00 - 10.00)/12{,}000 = \$2.25$.
> > - The brand PMPM is $2{,}000 \times (370.50 - 40.00)/12{,}000 = \$55.08$.
> > - The specialty PMPM is $60 \times (5{,}042.00 - 250.00)/12{,}000 = \$23.96$.
> > - The plan's PMPM is \$81.29. Specialty scripts are 0.54% of the 11,060 scripts but 29.5% of the plan's cost.
> > - Because of the per-script maximum, the plan bears almost every dollar of a specialty price increase.

## Estimating claim costs

The actuary projects each tier's utilization and cost per script separately from completed, normalized experience. Projections then reflect brand drugs losing their patents to generics or biosimilars, new drugs coming to market, contract and rebate changes, and the plan design in the rating period. Pharmacy trend separates utilization, unit cost and mix, as [[Medical Cost Trend|medical cost trend]] does.

A 90-day mail-order script counts as one script with three times the days supply. Comparing a mail-order cost per script with a retail one without adjusting for days supply makes mail order look far costlier than it is.

## Moral hazard and risk

Low copays encourage use. Members who expect to need costly drugs choose richer drug coverage, which is [[Adverse Selection|adverse selection]]. Plans also bear the contract risk of how the PBM is paid, either through a spread between what it charges the plan and what it pays the pharmacy, or by a transparent administrative fee with rebates passed through.

> [!trap] Taking the discount instead of the price
> The ingredient cost is $(1 - d)$ times AWP. On a \$400 AWP with an 18% discount it is \$328, not \$72. Subtracting the dispensing fee rather than adding it also misprices every script.
