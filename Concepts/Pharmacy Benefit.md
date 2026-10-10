---
aliases:
  - Prescription Drug
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:63c931b96658e4d3da336d26f3e8569c013e49cc76991b21f3dc2f866006e89c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pharmacy Benefit.md
---
A **Pharmacy Benefit** is the part of a health plan that pays for outpatient prescription drugs dispensed by retail, mail-order and specialty pharmacies. It is usually run for the plan by a pharmacy benefit manager (PBM), which builds the pharmacy network, keeps the formulary, processes claims at the point of sale and negotiates rebates with drug manufacturers. Its cost is the number of scripts times the cost per script, less the member's cost sharing and the rebates the plan receives, quoted per member per month (PMPM).

> $$A = \min\big((1 - d)\,\text{AWP},\ \text{MAC}\big) + f$$

> $$K = \min(\text{Copay},\ A)$$

> $$\text{PMPM} = \sum_{j} \frac{S_j\,(\bar{A}_j - \bar{K}_j)}{12{,}000} - R$$

- **Symbols:** $A$ is the allowed cost of a script, $\text{AWP}$ the drug's average wholesale price, $d$ the discount off AWP in the pharmacy contract, $\text{MAC}$ the maximum allowable cost the PBM sets for a multi-source generic, and $f$ the dispensing fee. $K$ is the member's cost sharing. $S_j$ is the number of scripts per 1,000 members per year in tier $j$, $\bar{A}_j$ and $\bar{K}_j$ are the average allowed cost and cost sharing per script in the tier, and $R$ is the rebate PMPM.
- **AWP pricing:** AWP is a published list price, not what anyone pays, so pharmacy contracts and PBM guarantees are written as a discount off AWP plus a fee. Discounts are much deeper for generics than for brands, which is why generics are usually paid at the lower of the AWP discount and the MAC. Mail-order and specialty pharmacies get their own discounts, and a 90-day mail-order script counts as one script with three times the days supply.
- **Formulary tiers:** The formulary lists covered drugs in tiers with rising cost sharing, typically generic, preferred brand, non-preferred brand and specialty. Utilization management, such as prior authorization, step therapy and quantity limits, steers members to the drugs the plan prefers. A copay tier is a fixed dollar amount, so it is [[Medical Cost Trend|leveraged]] as drug prices rise, and many plans use coinsurance with a per-script maximum for the costlier tiers.
- **Rebates:** Manufacturers pay rebates on brand drugs in return for formulary placement. The PBM passes some or all of them through to the plan sponsor, and the rebate is credited after the fact, so it lowers the net cost of the benefit but not the member's cost sharing at the counter.
- **Specialty drugs:** Specialty drugs treat complex conditions such as cancer, multiple sclerosis and rheumatoid arthritis, often by injection. They are a small share of scripts but a large and fast-growing share of cost, so a few members on them can dominate a small group's claims.
- **Estimating claim costs:** The actuary projects each tier's utilization and cost per script separately from completed, normalized experience. Projections then reflect brand drugs losing their patents to generics or biosimilars, new drugs coming to market, contract and rebate changes, and the plan design in the rating period.
- **Moral hazard and risk:** Low copays encourage use, and members who expect to need costly drugs choose richer drug coverage, which is [[Adverse Selection|adverse selection]]. Plans also bear the contract risk of how the PBM is paid, through a spread between what it charges and what it pays the pharmacy, or by a transparent administrative fee with rebates passed through.

> [!example]- Cost per Script and Plan PMPM for a Brand Drug {Example}
> A preferred brand drug has an AWP of \$400 per script. The plan's PBM contract pays the pharmacy AWP minus 18% plus a \$1.50 dispensing fee, and the member pays a \$40 copay. Members fill 2,400 preferred brand scripts per 1,000 members per year, and the manufacturer pays a rebate of \$60 per script. Find the plan's cost per script and the plan's PMPM for this tier before and after rebates.
>
> > [!answer]-
> > The allowed cost is above the copay, so the member pays the full \$40.
> > $$
> > \begin{align*}
> > A &= 0.82 \times 400 + 1.50 \\
> > &= 329.50 \\
> > \text{Plan cost} &= 329.50 - 40.00 \\
> > &= 289.50 \\
> > \text{PMPM} &= \frac{2{,}400 \times 289.50}{12{,}000} \\
> > &= 57.90 \\
> > R &= \frac{2{,}400 \times 60}{12{,}000} \\
> > &= 12.00
> > \end{align*}
> > $$
> > The plan pays \$57.90 PMPM at the pharmacy and \$45.90 PMPM net of rebates. If the copay stays at \$40 while the AWP rises, every dollar of the increase falls on the plan.

> [!example]- Why Specialty Drugs Dominate the Cost {Example}
> A plan's drug utilization per 1,000 members per year is 9,000 generic, 2,000 preferred brand and 60 specialty scripts. The illustrative pricing is shown below, with cost sharing of \$10 for a generic, \$40 for a brand, and 20% coinsurance up to \$250 per script for a specialty drug.
>
> | Tier | Average AWP | Pricing |
> | --- | --- | --- |
> | Generic | \$60 | AWP minus 80% plus \$1.00 |
> | Preferred brand | \$450 | AWP minus 18% plus \$1.50 |
> | Specialty | \$6,000 | AWP minus 16% plus \$2.00 |
>
> Find the plan's PMPM by tier and the specialty tier's share of it.
>
> > [!answer]-
> > The allowed costs per script are \$13.00, \$370.50 and \$5,042.00. The specialty coinsurance is 20% of \$5,042.00, or \$1,008.40, so the \$250 maximum applies.
> > $$
> > \begin{align*}
> > \text{Generic} &= \frac{9{,}000\,(13.00 - 10.00)}{12{,}000} \\
> > &= 2.25 \\
> > \text{Brand} &= \frac{2{,}000\,(370.50 - 40.00)}{12{,}000} \\
> > &= 55.08 \\
> > \text{Specialty} &= \frac{60\,(5{,}042.00 - 250.00)}{12{,}000} \\
> > &= 23.96
> > \end{align*}
> > $$
> > The plan's PMPM is \$81.29. Specialty scripts are 0.54% of the 11,060 scripts but 29.5% of the plan's cost, and the per-script maximum means the plan bears almost every dollar of a specialty price increase.

> [!tip]- How it appears on the exam
> - **GH-101 objective 1:** Written questions ask candidates to describe a pharmacy benefit: who offers and manages it, how formularies and tiers work, the role of the PBM and rebates, and the moral hazard and financial risks of a design.
> - **GH-101 objective 2:** Calculation questions give AWP, contract discounts, dispensing fees, utilization by tier and cost sharing, and ask for the allowed and paid cost per script and the plan's PMPM. Some add rebates, a generic conversion when a brand loses its patent, or a shift of scripts to mail order.
> - **Projection:** Pharmacy trend questions separate utilization, unit cost and mix, as in [[Medical Cost Trend|medical trend]], and ask how a new specialty drug or a patent expiry changes the projected PMPM.

> [!warning]- Exam traps
> - **Copay above the cost:** The member pays the lesser of the copay and the allowed cost. A \$10 copay on a \$7 generic means the member pays \$7 and the plan pays nothing, not a negative amount.
> - **Discount is off AWP:** The ingredient cost is $(1 - d)$ times AWP. Taking 18% of AWP, or subtracting the dispensing fee rather than adding it, misprices every script.
> - **Rebates don't reduce cost sharing:** Rebates are credited to the plan after the script is paid. Subtracting them from the allowed cost before applying a coinsurance percentage understates what the member pays and overstates the plan's net cost.
> - **Days supply:** A 90-day mail-order script is one script but three months of drug. Comparing a mail-order cost per script with a retail one without adjusting for days supply makes mail order look far costlier than it is.
