---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:699f767949c48a3dcedf9e750142aa6ab7513945448ec2f1aa04012d47ba089d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Year.md
---

**Underwriting Year** (UY), also called year of account or treaty year, groups all premium and losses by the year in which the *contract was bound*. It is the [[Policy Year]] concept carried into reinsurance, where the contract being tracked is a treaty rather than a single policy.

> $$\text{UY } n \text{ Loss Ratio} = \frac{\text{Losses ceded under contracts bound in year } n}{\text{Premium on contracts bound in year } n}$$

- On a **direct** book, underwriting year and policy year are the same thing. The distinction matters in reinsurance, where a $1/1/2024$ treaty covers a whole portfolio of cedant policies written throughout $2024$, each of which then runs a further $12$ months.
- That stacking makes UY the **slowest-developing** basis of all. A $2024$ treaty covering annual policies is exposed to accident dates as late as $12/31/2025$, so its accidents alone span two years before any reporting or settlement lag is added.
- The offsetting advantage is an exact match of premium to exposure: the ceded premium, the commission, the reinstatement premiums and the losses in a UY all belong to one set of contract terms — attachment point, limit, and treaty conditions — so the cohort's profitability is measured against the deal that was actually struck.
- UY is standard at Lloyd's and in treaty reinsurance pricing, and it is the basis on which a reinsurer's [[Bornhuetter-Ferguson Method|BF]] and [[Expected Loss Method|expected loss]] reserving is usually performed, since chain ladder factors at early UY maturities are extremely leveraged.
- Converting between bases loses information: a UY triangle cannot be re-cut into accident years without claim-level accident dates, which is one reason ceded data quality is a recurring problem in [[Reinsurance Recovery|reinsurance reserving]].

![[Media/Figures/Underwriting_Year.svg|340]]

> [!example]- How Long a $\;2024$ Treaty Stays Exposed {Example}
> A quota share treaty incepting $1/1/2024$ covers all $12$-month policies written by the cedant during calendar $2024$. The line has an average reporting lag of nine months.
>
> Over what period can accidents and reports attach to underwriting year 2024?
>
> > [!answer]-
> > The last policy subject to the treaty is written $12/31/2024$ and expires $12/31/2025$, so:
> >
> > - **Accident dates** run $1/1/2024$ through $12/31/2025$ — a $24$-month exposure window.
> > - With a nine-month average reporting lag, **reports** keep arriving well into $2026$, and the tail of the reporting distribution runs years beyond that.
> >
> > At $12$ months of maturity ($12/31/2024$) the treaty is barely half-written and only a fraction of one year's accidents have been reported. This is why a UY $12$-month [[Chain Ladder Method|chain ladder]] estimate is unusable and reinsurers lean on an a priori loss ratio at early maturities.

> [!example]- Same Claim, Three Cohorts {Example}
> A cedant writes a general liability policy on $7/1/2024$, subject to a treaty bound $1/1/2024$. A claim occurs $3/15/2025$ and is reported $6/20/2025$.
>
> Place the claim on the underwriting-year, policy-year and accident-year bases.
>
> > [!answer]-
> > | Basis | Cohort | Driver |
> > |---|---|---|
> > | **Underwriting Year** | UY 2024 | treaty bound $1/1/2024$ |
> > | [[Policy Year]] | PY 2024 | policy incepted $7/1/2024$ |
> > | [[Accident Year]] | AY 2025 | loss occurred $3/15/2025$ |
> >
> > The reinsurer books this loss against premium it earned on a treaty struck $15$ months before the accident. Nothing is wrong with that — the treaty premium was priced for exactly this exposure — but it explains why the reinsurer carries [[IBNR]] on UY 2024 for years after the cedant's own AY 2024 has largely settled.
