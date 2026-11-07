---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d56732f83b621879c776d4bae63f4142aeb3aa7cae049f16568cd8c820186103
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.5 p.61 (PDF 67); Ch.11 p.196 (PDF 202), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Claim Count Triangle.md
---

![[Media/Figures/Claim_Count_Triangle.svg|340]]

A **Claim Count Triangle** is a [[Development Triangle|development triangle]] of numbers of claims rather than dollars, by accident year and age. A reported claim count triangle is developed like a dollar triangle, so the ultimate claim counts of an accident year at age $n$ are

> $$\text{Ultimate Claim Counts} = \text{Reported Claim Counts} \times \text{CDF}_{n \to \text{ult}}$$

- $\text{Reported Claim Counts}$ are the accident year's claims reported through age $n$.
- $\text{CDF}_{n \to \text{ult}}$ is the [[Cumulative Development Factor|cumulative development factor]] selected from the claim count triangle.

Counts separate more claims from costlier claims, so ultimate claims divided by ultimate claim counts is the ultimate [[Severity|severity]]. Counts are the input to the [[Frequency-Severity Method|frequency-severity techniques]]. A count factor is usually smaller than a dollar factor at the same age, because a claim is counted as soon as it is reported while its dollars accrue for years afterward.

> [!example]- Reported claim counts are 450, 520 and 545 at 12, 24 and 36 months for accident year 2021, 475 and 550 for 2022, and 500 at 12 months for 2023. The tail factor is 1.010, and accident year 2023's ultimate claims are $\$612{,}000$. What are its ultimate claim counts and severity? {Example}
> - The volume-weighted 12 to 24 month factor is $(520 + 550)/(450 + 475) = 1{,}070/925 = 1.157$.
> - The 24 to 36 month factor is $545/520 = 1.048$.
> - The CDF at 12 months is $1.157 \times 1.048 \times 1.010 = 1.225$.
> - The ultimate claim counts are $500 \times 1.225 = 612$.
> - The ultimate severity is $612{,}000/612 = \$1{,}000$.

## Types of claim count triangles

Each count triangle answers a different question:

1. **Reported counts** show how fast claims are reported, and they develop to the ultimate counts that give the pure [[IBNR]] counts.
2. **Closed counts** show how fast claims settle.
3. **Open counts**, reported less closed, are the claims still to be settled.
4. **Counts closed with payment** and **closed without payment** split the closed claims, and a shift between them changes the average paid claim with no change in claim cost.

Ratios of these triangles are the diagnostics. The ratio of closed to reported counts tests for a change in [[Settlement Rate|settlement rate]], and the [[Berquist-Sherman Method|Berquist-Sherman]] disposal rate is closed counts over ultimate counts. Case outstanding divided by open counts is the **average case outstanding**, one of the most important tests of [[Case Adequacy|case adequacy]].

> [!example]- Accident year 2022 has $\$5{,}000{,}000$ of reported claims on 1,000 reported claims at 24 months, with 600 closed and $\$2{,}000{,}000$ of case outstanding. Accident year 2023 has $\$6{,}000{,}000$ on 1,500 reported claims, with 900 closed and $\$2{,}100{,}000$ of case outstanding. Reported claims rose 20%. What happened? {Example}
> - The average reported claim fell from $5{,}000{,}000/1{,}000 = \$5{,}000$ to $6{,}000{,}000/1{,}500 = \$4{,}000$.
> - The ratio of closed to reported counts stayed at $600/1{,}000 = 900/1{,}500 = 60\%$, so settlement speed did not change.
> - The average case outstanding fell from $2{,}000{,}000/400 = \$5{,}000$ to $2{,}100{,}000/600 = \$3{,}500$.
> - Counts rose 50% while severity fell 20%, so the book grew into smaller claims.
> - The fall in average case outstanding fits smaller claims, but it is also what a weakening of case outstanding would look like, so the claims department is asked which it is.

## Defining claim counts

Counts must be defined the same way throughout the experience period. The actuary needs to know whether a claim is counted per claim or per claimant, whether claims closed without payment are in the closed and reported counts, and whether a reopened claim is a new claim. A change of definition partway through the triangle looks like a change in frequency or settlement rate.

Reported counts can develop downward. When reported counts exclude claims closed without payment, a claim counted while open drops out if it later closes without payment. In Friedland's private passenger collision example, more claims close without payment at later valuations than are newly reported, so the reported count factors are below 1.00.

## Pure IBNR and development on known claims

Counts split the broad IBNR into its two parts. The unreported claim counts, ultimate less reported, valued at an expected severity, are the pure IBNR. The rest of the IBNR is IBNER, the development on claims already reported. Dollar triangles alone cannot separate them.
