---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d1bffd61c2ba6692136b15883605b649a2ed1a5755b16acb22081b48433a99b6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/IFRS.md
---

**IFRS** (International Financial Reporting Standards) are the accounting standards issued by the International Accounting Standards Board (IASB) and required or permitted for listed companies in many jurisdictions — the EU, the UK, Canada and Australia among them. For insurers the governing standard is **[[IFRS 17]] *Insurance Contracts***, effective for annual periods beginning on or after 1 January 2023, with IFRS 9 for the investments. A U.S. actuary meets IFRS mainly through a U.S. subsidiary reporting to a foreign parent.

> $$\text{LIC} = \text{PV(future claim cash flows)} + \text{Risk adjustment}$$

- **The measurement gap with the U.S. bases.** [[Statutory Accounting Principles|SAP]] and [[GAAP]] carry P&C claim liabilities at an undiscounted estimate with no explicit margin; the IFRS 17 [[Liability for Incurred Claims]] is discounted at current rates and carries an explicit [[Risk Adjustment for Non-Financial Risk|risk adjustment]] whose confidence level is disclosed.
- **The premium side.** Under the [[Premium Allocation Approach]] — available for coverage periods of one year or less, so most P&C business — the [[Liability for Remaining Coverage]] resembles unearned premium less deferred acquisition costs; there is no separate DAC asset, and on such contracts acquisition costs may instead be expensed as incurred. An [[Onerous Contract|onerous]] group recognises its expected loss at once.
- **Reinsurance** is presented gross, as under GAAP and unlike SAP: [[Reinsurance Contracts Held]] are a separately measured asset, reduced for the reinsurer's risk of non-performance.
- **The income statement** replaces written and earned premium with [[Insurance Revenue]], and separates the [[Insurance Service Result]] from [[Insurance Finance Income or Expenses|insurance finance income or expense]] (the unwinding of discount). Neither SAP nor GAAP makes that split.
- **Primary statements** (IAS 1; IFRS 18 replaces it for periods beginning on or after 1 January 2027): the [[Financial Position|statement of financial position]], profit or loss and [[Comprehensive Income|other comprehensive income]], [[Statement of Changes in Equity|changes in equity]], cash flows, and notes.
- **In the United States**, domestic SEC registrants report under GAAP; a foreign private issuer may file IFRS statements as issued by the IASB without reconciling them to GAAP. See [[Accounting Standards]] for how the three regimes' objectives differ.

> [!example]- One Claim Liability, Three Regimes {Example}
> A U.S. subsidiary of a European group has unpaid claims with an undiscounted best estimate of $\$10{,}000$ (thousands), expected to be paid $\$5{,}000$, $\$3{,}000$ and $\$2{,}000$ in each of the next three years, mid-year. The group's IFRS 17 discount rate is $4\%$ and its risk adjustment is $\$400$.
>
> Compare the liability on each basis, and describe next year's income effect if claims are paid exactly as expected.
>
> > [!answer]-
> > SAP and GAAP both carry the undiscounted $\$10{,}000$. Under IFRS 17:
> >
> > $$
> > \begin{align*}
> > \text{PV} &= \frac{5{,}000}{1.04^{0.5}} + \frac{3{,}000}{1.04^{1.5}} + \frac{2{,}000}{1.04^{2.5}} \\
> > &= 4{,}902.90 + 2{,}828.60 + 1{,}813.20 \\
> > &= 9{,}544.70 \\
> > \text{LIC} &= 9{,}544.70 + 400 \\
> > &= 9{,}944.70
> > \end{align*}
> > $$
> >
> > IFRS 17 carries $\$55.30$ less: the $\$455.30$ discount is only partly offset by the risk adjustment.
> >
> > **Next year** the remaining payments are worth $\frac{3{,}000}{1.04^{0.5}} + \frac{2{,}000}{1.04^{1.5}} = 4{,}827.47$, so the discount unwinds by $4{,}827.47 + 5{,}000 - 9{,}544.70 = 282.77$. That is an **insurance finance expense**, reported below the insurance service result; the release of risk adjustment as uncertainty expires is a gain *within* the service result. Under SAP and GAAP the same year shows nothing at all — the claims were paid exactly as reserved.

> [!example]- The Premium Side: UPR, DAC and the LRC {Example}
> At year end an insurer has $\$600$ of unearned premium on annual policies, fully collected, and $\$120$ of acquisition costs relating to that unexpired coverage. No group is onerous.
>
> Show the net liability under SAP, GAAP and IFRS 17 (PAA).
>
> > [!answer]-
> > - **SAP:** unearned premium liability $\$600$; the $\$120$ was expensed when incurred. Net liability $\$600$.
> > - **GAAP:** unearned premium $\$600$ less a DAC asset of $\$120$. Net liability $\$480$.
> > - **IFRS 17, costs deferred:** the LRC is premium received less unamortised acquisition cash flows, $600 - 120 = \$480$, with no separate asset.
> > - **IFRS 17, costs expensed** (permitted because coverage is one year or less): LRC $\$600$.
> >
> > GAAP and IFRS reach the same equity through different presentation — an asset beside the liability versus a smaller liability — while SAP, and IFRS under the expensing election, hold back the $\$120$ of equity in the unearned premium. Had the group been onerous, IFRS 17 would add a [[Loss Component]] immediately, where SAP and GAAP would test for a premium deficiency reserve.
