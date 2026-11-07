---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:fd38f891956745899efb3aab0acc8dc4092e0f4d3ee0ba3194104bd7eba804b6
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.6, 9 fn.5 (PDF pp.12, 15), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 36, Statements of Actuarial Opinion Regarding Property/Casualty Loss and Loss Adjustment Expense Reserves (ASB, March 2024, Doc. No. 213), §§3.8-3.11, 3.14, 4.2-4.3, pp.7-11 (PDF pp.14-18), sha256:3bdfe0e5e237233d7333a051b34fa8c1bf805510f0f1dbe8947c52a3cfe14b8b — https://www.actuarialstandardsboard.org/wp-content/uploads/2024/09/asop036_213.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§1.2, 4.1-4.2, pp.1-10 (PDF pp.6-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Regulatory Reporting.md
---

![[Media/Figures/Regulatory_Reporting.svg|340]]

**Regulatory Reporting** is the reporting of an insurer's [[Unpaid Claims|unpaid claim estimates]], and the actuarial work behind them, to the insurance regulators who supervise its financial position. Regulators rely on the insurer's financial statements to carry out that role. If a struggling insurer masks its true state with inadequate reserves, the regulator may not become involved until too late to help it regain its strength. In the U.S. the reports are

1. **The statutory Annual Statement**, whose [[Schedule P]] is its actuarial portion.
2. **The [[Statement of Actuarial Opinion]]**, a qualified actuary's opinion on whether the carried loss and LAE reserves are reasonable.
3. **The [[Actuarial Report|actuarial report]]** that supports the opinion, documenting the data, methods, assumptions and selections.

Schedule P is critical to monitoring the [[Solvency|solvency]] of insurers. It holds a ten-year summary by line of earned premiums, claim and claim expense payments and unpaid claims and expenses. It also holds claim development schedules by line for net incurred claims, net paid claims and net bulk and IBNR reserves. The NAIC has required most property and casualty insurers to file a Statement of Actuarial Opinion since 1990, and since 1993 the actuary signing it is the [[Appointed Actuary]], appointed by the board of directors.

In Canada, the Insurance Companies Act requires every federally regulated insurer to have an Appointed Actuary, whose first responsibility is to value the policy liabilities at the end of each financial year in accordance with the standards of the Canadian Institute of Actuaries. OSFI sets the requirements of the Appointed Actuary's report.

> [!example]- An insurer carried inadequate reserves for several years before it failed. How did the inadequacy delay its regulator? {Example}
> - The regulator judges the insurer's financial position from its financial statements.
> - Understated reserves overstate surplus, so the capital looked adequate and the insurer's weakness was masked.
> - The regulator therefore stepped in only once the true position emerged, too late to help the insurer regain its strength.
> - Rate filings built on the understated losses also looked adequate, so the regulator had no reason to question rates that were too low.

## Types of actuarial opinion

Under ASOP 36, an opinion on the carried reserves is one of these types:

1. **Reasonable.** The reserves are within the range of estimates the actuary considers reasonable.
2. **Deficient or inadequate.** The reserves are below the minimum amount the actuary believes reasonable, and the opinion states that minimum.
3. **Redundant or excessive.** The reserves are above the maximum amount the actuary believes reasonable, and the opinion states that maximum.
4. **Qualified.** The reserves for an item are in question because the actuary cannot estimate them or opine on them. The actuary states whether the rest of the reserves are reasonable.
5. **No opinion.** The data, analyses or assumptions are too deficient or limited to reach a conclusion, and the opinion says why.

An opinion covering both direct and assumed reserves and reserves net of recoverables gives an opinion on each basis.

> [!example]- An insurer carries $\$36$M of reserves. The actuary's range of reasonable estimates is $\$38$M to $\$44$M. Which type of opinion applies? {Example}
> - The carried $\$36$M is below the $\$38$M the actuary believes is the minimum reasonable amount.
> - The reserves therefore do not make a reasonable provision, and the opinion is deficient or inadequate.
> - The opinion states the $\$38$M minimum.
> - Had the insurer carried $\$38.5$M, inside the range, the opinion would be reasonable, even though it is below the middle of the range.

## Risk of material adverse deviation

The opinion also says whether there are significant risks and uncertainties that could result in material adverse deviation, measured against a materiality standard the actuary chooses, such as a percentage of surplus or the amount that would trigger regulatory action. A significant risk of material adverse deviation exists when

> $$\text{Carried Reserves} + \text{Materiality Standard} \le \text{High Reasonable Estimate}$$

- $\text{High Reasonable Estimate}$ is the top of the actuary's range of reasonable estimates.

The actuary may find a significant risk even when the sum exceeds the range. The risk is assessed on reserves net of recoverables.

> [!example]- An insurer carries $\$41$M against a range of reasonable estimates of $\$38$M to $\$44$M. The materiality standard is 10% of its $\$25$M surplus. Is there a significant risk of material adverse deviation? {Example}
> - The materiality standard is $0.10 \times 25 = \$2.5$M.
> - The carried reserves plus the materiality standard are $41 + 2.5 = \$43.5$M.
> - $\$43.5$M is within the range, below its $\$44$M top, so a reasonable estimate exceeds the carried reserves by more than the materiality standard.
> - A significant risk of material adverse deviation exists, and the opinion says so.
