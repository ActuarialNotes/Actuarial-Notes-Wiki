---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b90a928e25e95c72d9c1f91d596c2ec7fd6572efa6161ae1642fe1a6d3cd237a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Services Regulatory Authority of Ontario.md
---

**The Financial Services Regulatory Authority of Ontario** (FSRA) is Ontario's insurance regulator, created in 2019 to replace **FSCO**. It licenses insurers, agents and adjusters in Ontario, regulates [[Market Conduct Regulation|market conduct]], and — the piece that matters most to actuaries — **approves private passenger automobile rates and risk classification systems** before they may be used.

- FSRA is a **self-funded, principles-based** regulator: it is financed by industry assessments rather than the provincial budget, and it was designed to be more outcome-focused and less rules-prescriptive than its predecessor.
- **Auto rate filings.** Ontario private passenger auto is *file-and-approve*: an insurer files a proposed rate level and [[Risk Classification Restrictions|classification]] change, FSRA reviews the actuarial support, and the rates may not be used until approved. FSRA publishes approved average rate changes quarterly, which makes Ontario's rate history unusually public.
- FSRA also administers the **[[Statutory Accident Benefits]]** framework in practice — the [[Minor Injury Guideline]], the professional services guideline, and the arbitration/dispute rules — and supervises the **[[Facility Association]]** and Ontario's [[Risk Sharing Pool|risk sharing pool]] arrangements.
- It publishes **technical notes** and bulletins that tell filers what actuarial support FSRA expects: trend selections, [[Loss Development|development]], expense and profit provisions, and the treatment of reform savings.
- FSRA does **not** regulate solvency of federally incorporated insurers — that remains [[OSFI]]'s. A national insurer therefore satisfies FSRA on price and conduct and OSFI on capital, simultaneously.

> [!example]- A Rate Filing That Will Not Be Approved {Example}
> An insurer files for a $9.8\%$ Ontario private passenger auto rate increase. The indication is supported by a loss trend of $+8\%$ per year selected from four years of the insurer's own data, which comprises about $1{,}200$ claims per year. No adjustment is made for a recently enacted benefit reform that industry analysis suggests will reduce accident benefit costs by roughly $5\%$.
>
> Identify the problems FSRA would raise.
>
> > [!answer]-
> > Three, and each is independently fatal to approval:
> >
> > 1. **Trend credibility.** $1{,}200$ claims a year over four years is thin for an $8\%$ severity-and-frequency trend selection. FSRA expects the filer to blend its own experience with industry data ([[Credibility|credibility-weight]] it), and to show the fit rather than assert the selection.
> > 2. **The reform is ignored.** An approved rate must reflect the cost level that will apply *during* the policy period. Filing a rate that omits an enacted benefit reduction charges policyholders for costs the law has removed — the single most common ground for rejection after a reform.
> > 3. **Double counting risk.** If the historical years already contain part of the reform's effect, applying an unadjusted historical trend forward compounds the error.
> >
> > The insurer's corrected indication would be materially below $9.8\%$. The wider exam point is that Ontario rate regulation is a *prospective cost* test: the question is never "what did we earn?" but "what will the coverage cost, under the law as it will then be?"
