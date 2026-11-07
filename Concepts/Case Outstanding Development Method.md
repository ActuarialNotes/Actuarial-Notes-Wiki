---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:9ec9cf2aabca4a27e792c9ea3ac664e1742773b36eae9cb27e359b6ee79f8808
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.12 Case Outstanding Development Technique, PDF pp.271-275 (printed 265-269): Approach #1, Approach #2 key assumptions, common uses, mechanics, factor formula and limitations, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Case Outstanding Development Method.md
---

![[Media/Figures/Case_Outstanding_Development_Method.svg|340]]

The **Case Outstanding Development Method** is the reserving method that projects an accident year's future payments from its current [[Case Reserves|case outstanding]], using the historical relationship between payments and the case outstanding they were paid against. The case outstanding is the reported claims less the paid claims. In Wiser's version, Friedland's Approach #1, two ratios are selected for each age from the history, and the case outstanding and the payments are projected one development period at a time:

> $$\text{Incremental Paid}_{n \to n+1} = r_{n+1} \times \text{Case Outstanding}_n$$

> $$\text{Case Outstanding}_{n+1} = c_{n+1} \times \text{Case Outstanding}_n$$

- $r_{n+1}$ is the selected ratio of incremental paid claims in the interval from age $n$ to $n+1$ to the case outstanding at age $n$, the start of the interval.
- $c_{n+1}$ is the selected ratio of case outstanding at age $n+1$ to case outstanding at age $n$.
- Both are selected from the triangles of historical ratios, for example by the average of the latest years, with judgmental ratios to ultimate.

The incremental paid triangle comes from differencing the cumulative paid triangle. The projection starts from the latest case outstanding and runs it down to zero, so the [[Unpaid Claims|unpaid claims]] are the sum of the projected payments, and the payments already made are not part of them. The ultimate claims are the paid claims to date plus the unpaid claims, and the [[IBNR]] is the ultimate less the reported claims. A projected period's incremental reported claims are its projected payment plus the change in projected case outstanding.

> [!example]- AY 2023 at 24 months has paid claims of $\$800{,}000$ and case outstanding of $\$500{,}000$. The selected paid-to-prior-case ratios are 0.60 at 36 months, 0.50 at 48 months and 1.10 to ultimate. The case-to-prior-case ratios are 0.50, 0.40 and 0 to ultimate. What are its unpaid claims, ultimate claims and IBNR? {Example}
> - From 24 to 36 months, $0.60 \times 500{,}000 = \$300{,}000$ is paid and the case outstanding falls to $0.50 \times 500{,}000 = \$250{,}000$.
> - From 36 to 48 months, $0.50 \times 250{,}000 = \$125{,}000$ is paid and the case outstanding falls to $0.40 \times 250{,}000 = \$100{,}000$.
> - After 48 months, $1.10 \times 100{,}000 = \$110{,}000$ is paid and no case outstanding remains.
> - The unpaid claims are $300{,}000 + 125{,}000 + 110{,}000 = \$535{,}000$.
> - The ultimate claims are $800{,}000 + 535{,}000 = \$1{,}335{,}000$, and the IBNR is $1{,}335{,}000 - 1{,}300{,}000 = \$35{,}000$.

## Key assumption and common uses

Beyond the assumptions of the other development techniques, the method assumes that claims activity on IBNR is related consistently to the claims already reported. That holds where most claims are reported in the first accident period, so the method is strongest for [[Claims Made Coverage|claims-made]] coverage and [[Report Year|report year]] analysis. It is not used extensively. Its limitations are:

1. The assumption does not hold for many lines, which have material pure IBNR that the current case outstanding cannot capture.
2. The ratios to ultimate are hard to select, and there are no benchmarks or experience to say what ratios are reasonable at each age.
3. It depends on consistent [[Case Adequacy|case reserve adequacy]]. Stronger case reserves, unadjusted, are developed with ratios estimated on weaker ones, so the unpaid claims are overstated.
4. A large unusual open claim in the case outstanding is developed with the same ratios and can distort the estimate.

## When case outstanding is the only data

Friedland's Approach #2 applies the ordinary development technique to case outstanding alone, for a self-insurer or older years with no paid or reported history: years before a self-insurance program began, or after a merger. Its case outstanding development factor is derived from benchmark reported and paid CDFs:

> $$\text{Case Outstanding CDF} = \frac{(\text{Reported CDF} - 1) \times \text{Paid CDF}}{\text{Paid CDF} - \text{Reported CDF}} + 1$$

- $\text{Reported CDF}$ and $\text{Paid CDF}$ are the benchmark, usually industry, CDFs to ultimate at the year's age.

The unpaid claims are the current case outstanding times this factor, so the projection is of unpaid claims, not ultimate claims. The factor carries provisions for both the case outstanding and the broad IBNR. It is the ratio of the unpaid claims to the case outstanding under the benchmark patterns, $(1 - 1/\text{Paid CDF})/(1/\text{Reported CDF} - 1/\text{Paid CDF})$. Its ratio of IBNR to case outstanding is the percent unreported over the percent reported less the percent paid. A benchmark reported CDF that is too low understates the factor and the unpaid claims.

> [!example]- A self-insurer has $\$1{,}000{,}000$ of case outstanding and no other claims history. The benchmark CDFs at its age are 1.40 reported and 2.20 paid. What are its unpaid claims? {Example}
> - The factor is $(0.40 \times 2.20)/(2.20 - 1.40) + 1 = 1.10 + 1 = 2.10$.
> - As a check, $(1 - 1/2.20)/(1/1.40 - 1/2.20) = 0.5455/0.2597 = 2.10$.
> - The unpaid claims are $1{,}000{,}000 \times 2.10 = \$2{,}100{,}000$, of which $\$1{,}100{,}000$ is IBNR.

The benchmarks may not fit the entity's own reserving, settlement and mix, the factors are highly leveraged for the recent, less mature years, and individual large claims in the case outstanding can distort the result.

> [!trap] Dividing by the case outstanding at the wrong age
> The paid ratio divides the incremental payment in an interval by the case outstanding at the **start** of the interval. In Friedland's U.S. Industry Auto data, AY 1998 paid $\$14{,}691{,}785$ between 12 and 24 months on case outstanding of $\$18{,}478{,}233$ at 12 months, a ratio of 79.5%. Dividing by the $\$9{,}937{,}970$ outstanding at 24 months gives 147.8%, and the projected payments would nearly double.
