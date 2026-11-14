---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f27b736ad140fb83148da50e0162559eeb20c2a9897670ded962d520e49d78a8
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Canadian Annual Return.md
---

![[Media/Figures/Canadian_Annual_Return.svg|340]]

The **Canadian Annual Return** is the standardised regulatory filing every Canadian P&C insurer submits to [[OSFI]] and to provincial regulators after each year end. It is the regulator's primary view of an insurer, standardised so that companies can be compared with one another and monitored over time.

Its principal components are:

1. Audited **financial statements**:
   - the [[Financial Position|statement of financial position]];
   - the statement of income and [[Comprehensive Income|comprehensive income]];
   - the [[Statement of Changes in Equity|statement of changes in equity]];
   - the statement of cash flows;
   - the [[Notes to Financial Statements|notes]].
2. **Supplementary exhibits**:
   - premiums and claims by province and class of insurance;
   - claims development, paid and incurred by accident year (the Canadian analogue of Schedule P);
   - reinsurance ceded by reinsurer, with [[Registered Reinsurance|registered]] or [[Unregistered Reinsurance|unregistered]] status;
   - investment schedules.
3. The **[[MCT]]** calculation, showing [[Capital Available|capital available]], [[Capital Required|capital required]] and minimum capital required.
4. The [[Appointed Actuary|Appointed Actuary's]] report and [[Statement of Actuarial Opinion|opinion]] on the [[Insurance Contract Liabilities|insurance contract liabilities]].

The [[Canadian Council of Insurance Regulators|CCIR]] and OSFI publish the instructions that govern its preparation. The [[Quarterly Return|quarterly return]] is a reduced version filed each quarter, giving OSFI a more frequent view of capital and results.

The returns are publicly available, and MSA Research publishes the [[MSA Ratios|MSA ratios]] derived from them. Together they make Canadian P&C financial analysis possible from outside a company.

## The claims development exhibit

The claims development exhibit is the one analysts use most. It shows how each accident year's estimate has moved over successive valuations, so persistent adverse or favourable development becomes visible and cannot be concealed by a single year's release.

> [!example]- What would a regulator conclude from this insurer's development of accident year 2021? {Example}
> An insurer's annual return shows these estimates of ultimate claims for accident year 2021:
>
> | Valuation at year end | Estimated ultimate ($M) |
> | :--- | ---: |
> | 2021 | 142 |
> | 2022 | 148 |
> | 2023 | 157 |
> | 2024 | 169 |
>
> Surplus is $\$210$ million and total unpaid claims are $\$480$ million.
>
> > [!answer]-
> > - The cumulative adverse development is $169 - 142 = \$27$ million, $19\%$ above the original estimate.
> > - It is accelerating: $+\$6$M, $+\$9$M and $+\$12$M.
> > - Three movements in the same direction, each larger than the last, point to reserving that is biased low rather than random error around an unbiased estimate.
> > - The wrong assumption probably applies to other accident years too. If all $\$480$ million of unpaid claims is $19\%$ light, the deficiency is about $\$91$ million against $\$210$ million of surplus.
> > - Rates built on understated loss estimates are inadequate, so under [[IFRS 17]] current business should be showing up as [[Onerous Contract|onerous]] groups.
> > - The [[MCT]] ratio is overstated to the extent the liabilities are understated.
> > - The Appointed Actuary's actual-versus-expected analysis at each valuation should have led to a change in method or assumptions by the second movement.

## The return under IFRS 17

The return was substantially rebuilt for [[IFRS 17]]. Its line items follow [[Insurance Revenue|insurance revenue]], [[Insurance Service Expenses|insurance service expenses]] and [[Insurance Finance Income or Expenses|insurance finance income or expenses]] in place of written and earned premium and incurred losses.
