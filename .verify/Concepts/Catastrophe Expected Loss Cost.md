---
target: Concepts/Catastrophe Expected Loss Cost.md
created: 2026-10-31
---

## [F-001] Rating-detail bullet: age, mitigation credits, territories and deductible credits in no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Rating detail'
- claim: Because the AAL is computed location by location, it can vary with construction, occupancy, age, mitigation features and deductible, which supports catastrophe rating territories, mitigation credits and deductible credits.
- evidence: Clark (Basics of Reinsurance Pricing) PDF p.44: a catastrophe model needs insured values, construction types, occupancies, geocoded property addresses and the policies' deductible and coinsurance terms, and estimates damage 'for each property within a portfolio'. No source read (Clark, Werner & Modlin Ch.6, Humphreys, the Wharton review, the Exam 8 2016 report) names building age, mitigation credits, catastrophe rating territories or deductible credits. Clark, Basics of Reinsurance Pricing (CAS Study Note, rev. 2014), PDF p.5 (payback: 'A 1-in-20-year event would be included as a loading of 5% of the loss amount'; now a reasonability check for property), PDF p.44 (payback approach; four components: event sets, local intensity, damage, insured loss; inputs: insured values, construction types, occupancies, geocoded location — zip-code or state aggregation gives less precise results — deductible and coinsurance), PDF p.45 (AAL of the layer with its standard deviation as a starting point for the loss cost; items not modeled added subjectively: workers compensation, inuring terms, fire following earthquake, increased demand for materials and labour after a major event), PDF pp.26, 50 (risk load), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf
- source_rank: 2
- proposed_action: Restate to Clark's inputs: the model works property by property from insured values, construction, occupancy, location and deductibles, so the loss cost can vary with them.
- applied: true
- fingerprint: 1f69698821cf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated this run to Clark p.44's list of model inputs; the unsourced age, mitigation-credit, territory and deductible-credit claims are gone.

## [F-002] Risk load tied to PML or a tail measure — in no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Risk load'
- claim: A separate risk load is added — commonly tied to the modelled volatility or to the capital (the PML or tail measure) the exposure draws on.
- evidence: Clark PDF p.45: the model gives the layer's AAL 'along with its standard deviation'; PDF p.50: risk load is beyond the note's scope. Werner & Modlin printed p.99: the actuary 'may alter the underwriting profit provision in the rates to reflect the higher cost of capital needed to support the extraordinary risk caused by the higher concentration of policies'. Neither ties a risk load to a PML or tail measure. Clark, Basics of Reinsurance Pricing (CAS Study Note, rev. 2014), PDF p.5 (payback: 'A 1-in-20-year event would be included as a loading of 5% of the loss amount'; now a reasonability check for property), PDF p.44 (payback approach; four components: event sets, local intensity, damage, insured loss; inputs: insured values, construction types, occupancies, geocoded location — zip-code or state aggregation gives less precise results — deductible and coinsurance), PDF p.45 (AAL of the layer with its standard deviation as a starting point for the loss cost; items not modeled added subjectively: workers compensation, inuring terms, fire following earthquake, increased demand for materials and labour after a major event), PDF pp.26, 50 (risk load), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 printed pp.94 (order of adjustments: a catastrophe model's ultimate losses for the future policy period are added to non-catastrophe losses already trended and developed; adding first and then trending and developing over-adjusts), 98-99 (catastrophe losses removed and replaced with an average expected provision; non-modeled: long-term ratio of cat to non-cat losses, or a cat pure premium; exposure concentration grown; models for hurricanes and earthquakes, thirty years may not suffice; model estimates the expected annual catastrophe loss on the insurer's exposure, added to non-cat losses; profit provision may reflect the cost of capital for concentrated exposure), Ch.8 printed p.141 (pure premium method), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- source_rank: 2
- proposed_action: Restate to Clark (standard deviation) and Werner & Modlin (profit provision for the cost of capital).
- applied: true
- fingerprint: 3d2c231c565c

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated this run: the model gives the standard deviation as well as the expectation (Clark p.45), and the profit provision can reflect the higher cost of capital concentrated catastrophe exposure needs (Werner & Modlin p.99). The [[Probable Maximum Loss|PML]] link went with the clause.

## [F-003] Adjustments bullet: LAE, business interruption, secondary uncertainty and blending in no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Adjustments and uncertainty', first two sentences
- claim: Demand surge, loss adjustment expense, coverages or perils the model omits (fire following earthquake, business interruption) and secondary uncertainty may need explicit treatment. Vendor models disagree, so results are tested against each other or blended, and poor exposure data corrupts everything.
- evidence: Clark PDF p.45 lists what may need to be included 'more subjectively' if not modeled: workers compensation, inuring terms, 'fire following' an earthquake where earthquake cover is not sold, and 'increased demand for materials and labor' after a major event; PDF p.44: aggregation by zip code or state gives 'less precise model results'. The Wharton review of Grossi & Kunreuther: the three firms' EP curves for one portfolio differed, so one should 'think in terms of a range of loss estimates — rather than a single estimate'. None names LAE, business interruption or secondary uncertainty, or blending vendor models. Clark, Basics of Reinsurance Pricing (CAS Study Note, rev. 2014), PDF p.5 (payback: 'A 1-in-20-year event would be included as a loading of 5% of the loss amount'; now a reasonability check for property), PDF p.44 (payback approach; four components: event sets, local intensity, damage, insured loss; inputs: insured values, construction types, occupancies, geocoded location — zip-code or state aggregation gives less precise results — deductible and coinsurance), PDF p.45 (AAL of the layer with its standard deviation as a starting point for the loss cost; items not modeled added subjectively: workers compensation, inuring terms, fire following earthquake, increased demand for materials and labour after a major event), PDF pp.26, 50 (risk load), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf; Knowledge at Wharton, 'Catastrophe Modeling: A New Approach to Managing Risk' (review of Grossi & Kunreuther; three modelling firms' EP curves for a common Charleston portfolio compared, 'a range of loss estimates — rather than a single estimate'), sha256:61a28860f775955632db13031e09d7e1e44627caa25e23c567c6551f73e3c1ec — https://knowledge.wharton.upenn.edu/article/catastrophe-modeling-a-new-approach-to-managing-risk/
- source_rank: 2
- proposed_action: Restate to Clark's list and the Wharton review; keep the Florida Commission sentence (s.627.0628).
- applied: true
- fingerprint: b8d8ac4010aa

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Restated this run to Clark p.44-45 (fire following, demand for materials and labour, zip-code aggregation) and the Wharton review (a range of estimates across models); the Florida Commission sentence is kept on s.627.0628.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page (first check): lead and replacement of actual cat losses by an expected provision (W&M pp.98-99); AAL = sum of rate x mean loss (Humphreys p.2, Clark p.45; the area-under-the-AEP sentence is the identity E[X] = integral of P(X > x), recomputed, not sourced); why a model, exposure moved (W&M p.98-99); modules (Exam 8 2016 Q18 report; Clark p.44's four components); new order-of-adjustments bullet against W&M printed p.94 word for word; rating detail, risk load and adjustments restated (F-001-F-003); FCHLPM (s.627.0628); historical alternatives (W&M p.98) and payback 1-in-20 as 5% (Clark p.5) and as a reasonability check; both examples recomputed blind (AAL 0.8+0.8+1.8+1.5 = 4.9M, 2.45 per 1,000 TIV, 735 per home, rate 1,695/0.75 = 2,260, cat share 980 = 43%, 1.5/4.9 = 31%; layer AAL 0.03(10) + 0.005(50) = 0.55M, payback 50/25 = 2.0M, ROL 1.1% vs 4%, 27.5%); rule 10: the rate example shares no figures with cas9-an-002 (410, 210, 85, 1.15, 40)
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 printed pp.94 (order of adjustments: a catastrophe model's ultimate losses for the future policy period are added to non-catastrophe losses already trended and developed; adding first and then trending and developing over-adjusts), 98-99 (catastrophe losses removed and replaced with an average expected provision; non-modeled: long-term ratio of cat to non-cat losses, or a cat pure premium; exposure concentration grown; models for hurricanes and earthquakes, thirty years may not suffice; model estimates the expected annual catastrophe loss on the insurer's exposure, added to non-cat losses; profit provision may reflect the cost of capital for concentrated exposure), Ch.8 printed p.141 (pure premium method), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Clark, Basics of Reinsurance Pricing (CAS Study Note, rev. 2014), PDF p.5 (payback: 'A 1-in-20-year event would be included as a loading of 5% of the loss amount'; now a reasonability check for property), PDF p.44 (payback approach; four components: event sets, local intensity, damage, insured loss; inputs: insured values, construction types, occupancies, geocoded location — zip-code or state aggregation gives less precise results — deductible and coinsurance), PDF p.45 (AAL of the layer with its standard deviation as a starting point for the loss cost; items not modeled added subjectively: workers compensation, inuring terms, fire following earthquake, increased demand for materials and labour after a major event), PDF pp.26, 50 (risk load), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf; Humphreys, Exceedance Probability in Catastrophe Modeling, CAS E-Forum Winter 2021, pp.1-2 (models used in ratemaking, loss mitigation, cost of capital; AAL = sum of p_i X_i over the event set; EP curve as the survival function), sha256:c161864d85d35169b8e1f92af664542f05f005772e4cc6607ead0d68f08fdf89 — https://www.casact.org/sites/default/files/2021-03/02_humphreys.pdf; CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q18, PDF pp.72-73 (catastrophe model modules: hazard, inventory, vulnerability, loss), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf; Knowledge at Wharton, 'Catastrophe Modeling: A New Approach to Managing Risk' (review of Grossi & Kunreuther; three modelling firms' EP curves for a common Charleston portfolio compared, 'a range of loss estimates — rather than a single estimate'), sha256:61a28860f775955632db13031e09d7e1e44627caa25e23c567c6551f73e3c1ec — https://knowledge.wharton.upenn.edu/article/catastrophe-modeling-a-new-approach-to-managing-risk/; Florida Statutes s.627.0628 (Florida Commission on Hurricane Loss Projection Methodology: created (2)(a); considers models and adopts findings as to their accuracy or reliability (3)(a); its standards must be used by insurers in rate filings under s.627.062 (1)(c), (3)(d)), read this session via WebFetch, no file hash — http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0627/Sections/0627.0628.html
- note: First check of this page; verified at medium (D22/D27: Grossi & Kunreuther, the Exam 9 reading, is commercial; checked on Werner & Modlin, Clark, Humphreys and the Wharton review). Three minor restatements (F-001-F-003). Linked by no other exam's page.
