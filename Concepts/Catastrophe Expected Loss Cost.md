---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:6465f09cbd9449981d2ddb311e580548147bf5e6ffa1aa3a7c9d7d5c9830bcb0
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 printed pp.94 (order of adjustments: a catastrophe model's ultimate losses for the future policy period are added to non-catastrophe losses already trended and developed; adding first and then trending and developing over-adjusts), 98-99 (catastrophe losses removed and replaced with an average expected provision; non-modeled: long-term ratio of cat to non-cat losses, or a cat pure premium; exposure concentration grown; models for hurricanes and earthquakes, thirty years may not suffice; model estimates the expected annual catastrophe loss on the insurer's exposure, added to non-cat losses; profit provision may reflect the cost of capital for concentrated exposure), Ch.8 printed p.141 (pure premium method), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, rev. 2014), PDF p.5 (payback: 'A 1-in-20-year event would be included as a loading of 5% of the loss amount'; now a reasonability check for property), PDF p.44 (payback approach; four components: event sets, local intensity, damage, insured loss; inputs: insured values, construction types, occupancies, geocoded location — zip-code or state aggregation gives less precise results — deductible and coinsurance), PDF p.45 (AAL of the layer with its standard deviation as a starting point for the loss cost; items not modeled added subjectively: workers compensation, inuring terms, fire following earthquake, increased demand for materials and labour after a major event), PDF pp.26, 50 (risk load), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
    - "Humphreys, Exceedance Probability in Catastrophe Modeling, CAS E-Forum Winter 2021, pp.1-2 (models used in ratemaking, loss mitigation, cost of capital; AAL = sum of p_i X_i over the event set; EP curve as the survival function), sha256:c161864d85d35169b8e1f92af664542f05f005772e4cc6607ead0d68f08fdf89 — https://www.casact.org/sites/default/files/2021-03/02_humphreys.pdf"
    - "CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q18, PDF pp.72-73 (catastrophe model modules: hazard, inventory, vulnerability, loss), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf"
    - "Knowledge at Wharton, 'Catastrophe Modeling: A New Approach to Managing Risk' (review of Grossi & Kunreuther; three modelling firms' EP curves for a common Charleston portfolio compared, 'a range of loss estimates — rather than a single estimate'), sha256:61a28860f775955632db13031e09d7e1e44627caa25e23c567c6551f73e3c1ec — https://knowledge.wharton.upenn.edu/article/catastrophe-modeling-a-new-approach-to-managing-risk/"
    - "Florida Statutes s.627.0628 (Florida Commission on Hurricane Loss Projection Methodology: created (2)(a); considers models and adopts findings as to their accuracy or reliability (3)(a); its standards must be used by insurers in rate filings under s.627.062 (1)(c), (3)(d)), read this session via WebFetch, no file hash — http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0627/Sections/0627.0628.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophe Expected Loss Cost.md
---

The **Catastrophe Expected Loss Cost** is the long-run expected annual catastrophe loss per unit of exposure. In modern practice it is the **average annual loss** (AAL) from a [[Catastrophe Modelling|catastrophe model]], divided by the exposure base, and it becomes the catastrophe provision in a rate in place of whatever catastrophe losses happened to occur in the experience period.

The average annual loss of a book is

> $$\text{AAL} = \sum_{i} \lambda_i\, \bar{L}_i$$

- $\lambda_i$ is the annual rate of event $i$ in the model's event loss table.
- $\bar{L}_i$ is the mean loss event $i$ causes to the book after policy terms such as deductibles, limits and coinsurance.

Summed over the stochastic event set, this is the area under the aggregate exceedance probability curve ([[Catastrophe Risk#The exceedance probability curve|exceedance probability curve]]). The catastrophe expected loss cost is then

> $$\text{Cat loss cost} = \frac{\text{AAL}}{\text{Exposure units}}$$

The provision is added to the non-catastrophe pure premium and loaded for expenses and profit like any other loss cost. The model works property by property from insured values, construction types, occupancies, geocoded location and policy terms such as deductibles, so the loss cost it gives can vary with those characteristics.

> [!example]- What are this book's catastrophe loss cost per home and its indicated rate? {Example}
> A homeowners book in one territory insures $\$2.0$ billion of total insured value (TIV), an average of $\$300{,}000$ a home. The non-catastrophe pure premium is $\$900$, fixed expense is $\$60$ a policy, variable expense is 20% and profit is 5%. The model's event loss table is:
>
> | Event | Annual rate | Mean loss ($M) |
> | :--- | ---: | ---: |
> | Severe convective storm | 0.40 | 2 |
> | Category 1 hurricane | 0.10 | 8 |
> | Category 3 hurricane | 0.03 | 60 |
> | Category 5 hurricane | 0.005 | 300 |
>
> > [!answer]-
> > - The AAL is $0.40(2) + 0.10(8) + 0.03(60) + 0.005(300) = \$4.9\text{M}$.
> > - Per $\$1{,}000$ of TIV, the loss cost is $4{,}900{,}000/2{,}000{,}000 = \$2.45$.
> > - Per home, it is $2.45 \times 300 = \$735$.
> > - The indicated rate is $(900 + 735 + 60)/(1 - 0.20 - 0.05) = \$2{,}260$.
> > - The catastrophe provision accounts for $735/0.75 = \$980$ of it, or 43%.
> > - 31% of the AAL ($1.5$ of $4.9$) comes from an event expected once in 200 years, which the experience period almost certainly never saw.

## Why a model is used

For hurricane and earthquake, the return periods far exceed any usable history, and the insurer's exposure has moved since the historical events. A model runs a simulated event catalogue against the *current* book through its hazard, inventory (exposure), vulnerability and loss modules, so the loss cost does not depend on which storms happened to occur. The Exam 5 mechanics of removing observed catastrophes and loading the expectation are on [[Catastrophe Loss]]. Historical alternatives remain for frequent perils, such as a long-run ratio of catastrophe to non-catastrophe losses, and as reasonability checks.

What the model does not include must be added more subjectively, for example fire following an earthquake where earthquake cover is not sold, or the rise in the cost of materials and labour after a major event (demand surge). Different vendors' models give different results for the same portfolio, so comparing them shows a range of loss estimates rather than a single one ([[Model Risk|model risk]]). Imprecise exposure data, such as values aggregated by zip code or state rather than geocoded, gives less precise results ([[Data Quality|data quality]]). Regulators review models used in rate filings. Florida's Commission on Hurricane Loss Projection Methodology reviews the hurricane models insurers may use in residential rate filings.

## Risk load

The AAL is only the expectation. Catastrophe business also consumes a great deal of capital, so a separate [[Risk Loads|risk load]] is added, commonly tied to the modelled volatility or to the capital (the [[Probable Maximum Loss|PML]] or tail measure) the exposure draws on. The model gives the standard deviation of the loss as well as its expectation. The profit provision can also reflect the higher cost of the capital that concentrated catastrophe exposure needs. With the expense load expressed as a share of premium, the risk load is added to the expected loss before dividing by one minus that share.

## Payback pricing of a catastrophe layer

Reinsurers once loaded by *payback* — a 1-in-20-year event as a $5\%$ loading of its amount — before models displaced it ([[Reinsurance Pricing]]). A layer with a payback period of $n$ years, the reciprocal of the annual probability of a full-limit loss, is priced at

> $$\text{Payback premium} = \frac{\text{Layer limit}}{n}$$

Payback says nothing about how likely the layer is to be hit. A model does.

> [!example]- How does this layer's modelled expected loss compare with a 25-year payback premium? {Example}
> The insurer above buys $\$50\text{M}$ xs $\$50\text{M}$ per occurrence on the same book, with the same event loss table.
>
> > [!answer]-
> > - Only the category 3 event (a layer loss of $60 - 50 = 10$) and the category 5 event (the full $50$ limit) reach the layer.
> > - The layer AAL is $0.03(10) + 0.005(50) = \$0.55\text{M}$, a loss on line of $0.55/50 = 1.1\%$.
> > - The payback premium is $50/25 = \$2.0\text{M}$, a rate on line of 4%.
> > - The modelled loss is 27.5% of the payback premium. The gap pays for the reinsurer's expenses and the capital the layer ties up.
> > - The calculation assumes reinstatements are available and uses mean event losses only.

> [!trap] Trending and developing the model's catastrophe losses
> A catastrophe model typically outputs the *ultimate* catastrophe losses expected in the future policy period, already at that period's cost level. Add that provision to non-catastrophe losses that have already been trended and developed to ultimate. Adding it first and then trending and developing the sum over-adjusts the expected catastrophe losses (Werner & Modlin).
