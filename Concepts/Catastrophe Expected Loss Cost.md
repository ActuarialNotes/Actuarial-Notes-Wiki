---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:75c4796eb846aa72839a4be0b0cee606409d00cb2c13226f6eed78e351cbef80
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

> $$\text{AAL} = \sum_{i} \lambda_i\, \bar{L}_i$$
>
> $$\text{Cat loss cost} = \frac{\text{AAL}}{\text{Exposure units}}$$

- $\lambda_i$ is the annual rate of event $i$ in the model's event loss table and $\bar{L}_i$ the mean loss it causes to the book after policy terms (deductibles, limits, coinsurance). Summed over the stochastic event set, this is the area under the aggregate exceedance probability curve — see [[Catastrophe Risk]].
- **Why a model.** For hurricane and earthquake the return periods far exceed any usable history, and the insurer's exposure has moved since the historical events. A model runs a simulated event catalogue against the *current* book through its hazard, inventory (exposure), vulnerability and loss modules, so the loss cost does not depend on which storms happened to occur. The Exam 5 mechanics of removing observed catastrophes and loading the expectation are on [[Catastrophe Loss]].
- **Order of adjustments.** A catastrophe model typically outputs the *ultimate* catastrophe losses expected in the future policy period, already at that period's cost level. That provision is added to non-catastrophe losses that have already been trended and developed to ultimate; adding it first and then trending and developing the sum over-adjusts the expected catastrophe losses (Werner & Modlin).
- **Rating detail.** The model works property by property from insured values, construction types, occupancies, geocoded location and policy terms such as deductibles, so the loss cost it gives can vary with those characteristics.
- **Risk load.** The AAL is only the expectation. Catastrophe business also consumes a great deal of capital, so a separate [[Risk Loads|risk load]] is added — the model gives the standard deviation of the loss as well as its expectation, and the profit provision can reflect the higher cost of the capital that concentrated catastrophe exposure needs.
- **Adjustments and uncertainty.** What the model does not include must be added more subjectively — for example fire following an earthquake where earthquake cover is not sold, or the rise in the cost of materials and labour after a major event (demand surge). Different vendors' models give different results for the same portfolio, so comparing them shows a range of loss estimates rather than a single one ([[Model Risk]]), and imprecise exposure data — values aggregated by zip code or state rather than geocoded — gives less precise results ([[Data Quality]]). Regulators review models used in rate filings: Florida's Commission on Hurricane Loss Projection Methodology reviews the hurricane models insurers may use in residential rate filings.
- **Historical alternatives** remain for frequent perils (a long-run ratio of catastrophe to non-catastrophe losses) and as reasonability checks. Reinsurers once loaded by *payback* — a 1-in-20-year event as a $5\%$ loading of its amount — before models displaced it ([[Reinsurance Pricing]]).

> [!example]- From an Event Loss Table to a Homeowners Rate {Example}
> A homeowners book in one territory insures \$2.0 billion of total insured value (TIV), average \$300,000 a home. The model's event loss table, in \$ millions: severe convective storm at rate $0.40$ a year, mean loss $2$; category 1 hurricane, $0.10$, $8$; category 3 hurricane, $0.03$, $60$; category 5 hurricane, $0.005$, $300$. The non-catastrophe pure premium is \$900, fixed expense \$60 a policy, variable expense $20\%$ and profit $5\%$. Find the catastrophe loss cost and the indicated rate.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{AAL} &= 0.40(2) + 0.10(8) + 0.03(60) + 0.005(300) \\
> > &= 0.8 + 0.8 + 1.8 + 1.5 \\
> > &= \$4.9\text{M} \\
> > \text{Per \$1{,}000 TIV} &= \frac{\$4{,}900{,}000}{2{,}000{,}000} \\
> > &= \$2.45 \\
> > \text{Per home} &= 2.45 \times 300 \\
> > &= \$735
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Rate} &= \frac{\$900 + \$735 + \$60}{1 - 0.20 - 0.05} \\
> > &= \$2{,}260
> > \end{align*}
> > $$
> >
> > The catastrophe provision accounts for $735/0.75 = \$980$, or $43\%$ of the rate, and $31\%$ of the AAL comes from an event expected once in $200$ years ($1.5$ of $4.9$) that the experience period almost certainly never saw. No capital-based risk load is included here; in practice one would be added.

> [!example]- A Catastrophe Layer: Payback Versus Model {Example}
> The insurer buys \$50M xs \$50M per occurrence on the same book. Using the event loss table above, find the layer's modelled expected loss, and compare it with a premium set on a 25-year payback.
>
> > [!answer]-
> > Only the category 3 ($60 - 50 = 10$) and category 5 (full limit, $50$) events reach the layer:
> >
> > $$
> > \begin{align*}
> > \text{Layer AAL} &= 0.03(10) + 0.005(50) \\
> > &= \$0.55\text{M} \\
> > \text{Payback premium} &= \frac{\$50\text{M}}{25} \\
> > &= \$2.0\text{M}
> > \end{align*}
> > $$
> >
> > The modelled loss on line is $0.55/50 = 1.1\%$ against a payback rate on line of $4\%$, a $27.5\%$ loss ratio. Payback says nothing about how likely the layer is to be hit; the model does, and the gap between $0.55$ and $2.0$ is what the reinsurer charges for expenses and for the capital the layer ties up. (The calculation assumes reinstatements are available and uses mean event losses only.)
