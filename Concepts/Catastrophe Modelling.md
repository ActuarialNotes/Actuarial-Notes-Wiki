---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b7a8811eaef8a1834f8fa80d6c91ac304a555852fc5f316d38724d0e88730a2e
  sources:
    - "Petersen et al., Documentation for the 2014 Update of the United States National Seismic Hazard Maps, USGS Open-File Report 2014-1091 (public domain), PDF p.16 (aleatory variability, 'random variability in a given model', and epistemic uncertainty, 'uncertainty in which model is most correct'), PDF p.41 (Mesozoic extended margin, New Madrid and Charleston: Mmax weights 0.1/0.3/0.5/0.1 on 6.8/7.2/7.6/8.0, weighted average 7.44), PDF p.120 (ground motion models: intensity in terms of source, path and site; mean and SD of a normal density for log spectral acceleration), sha256:60738755ce084738d4cd82a65c280523bd43b5cb768e6f16f3f4ea7710549296 — https://pubs.usgs.gov/of/2014/1091/pdf/ofr2014-1091.pdf"
    - "Humphreys, Exceedance Probability in Catastrophe Modeling, CAS E-Forum Winter 2021, p.1 (definition; uses: ratemaking, portfolio management, underwriting, loss mitigation, cost of capital, reinsurance and risk transfer, ERM, capital adequacy used by rating agencies), p.12 (Poisson claim counts, the common assumption for catastrophes), sha256:c161864d85d35169b8e1f92af664542f05f005772e4cc6607ead0d68f08fdf89 — https://www.casact.org/sites/default/files/2021-03/02_humphreys.pdf"
    - "SOA Actuarial Glossary, p.12 'Catastrophe', sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf"
    - "CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q18, PDF pp.72-73 (the four modules; inventory data; epistemic reducible, aleatory not), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf"
    - "CAS Exam 8 Fall 2017 — sample answers and examiner's report, Q20(a), PDF pp.93-94 (A damage function, B uncertainty of the actual damage, C the uncertainty of the forces experienced by the structure during the event; Sample 2 'given an initial estimate'), sha256:9496e4d8e8eeea922abcb05728d8df22b73ca717b8bde0ee5e877f6d33bc3a65 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_17-8.pdf"
    - "CAS Exam 8 Fall 2018 — sample answers and examiner's report, Q17(b)-(c), PDF pp.88-89 (epistemic; logic trees: weights from expert opinion, weighted combination, easy to trace and communicate, simplified opinions, not easy to scale; simulation: randomly sampled alternatives, complex situations, robust assumptions, updated more easily, computationally intensive, black box; the two methods candidates most commonly used), sha256:7993ff15f4c6aae538bde337a57fbbf775aab27f3a232b8a828458ac52a330c4 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf"
    - "CAS Syllabus Committee, Clarification and Errata to Catastrophe Modeling (Grossi & Kunreuther), March 29 2021, pp.1-3 (OEP/AEP/CEP definitions; Table 2.1 events as independent Bernoulli random variables, each occurring at most once; loss 0 if an event does not occur; AAL = sum p_i L_i), sha256:8677464a4952483b031c9559d96f083629d4e22a14281c604368665f4d9c63a6 — https://www.casact.org/sites/default/files/2021-05/8_Grossi_Kunreuther_Errata_2021.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Catastrophe Modelling.md
---

**Catastrophe Modelling** is an estimation technique used in property and casualty insurance to predict and evaluate the damage caused by natural catastrophes, such as hurricanes, earthquakes, tornadoes, hail, winter storms, floods and wildfires, and by man-made catastrophes such as terrorism. A catastrophe is an infrequent event that causes severe loss, injury or property damage to a large population of exposures ([[Catastrophe Risk|catastrophe risk]]).

A catastrophe model is built from four modules ([[Catastrophe Risk#Modelling catastrophe risk|Grossi and Kunreuther's four parts]]):

1. **Hazard**: where events occur, how often and how intense they are.
2. **Inventory**: the exposed properties.
3. **Vulnerability**: the damage to a property given the intensity it experiences.
4. **Loss**: the financial result after policy terms.

Data used in catastrophe models describe the hazard (event magnitude, location, wind speed, soil type), the exposed properties (construction type, building codes, built value, contents) and the policy terms, such as limits and deductibles, that turn damage into insured loss. The platforms that run these modules are on [[Catastrophe Modelling Framework]], and how the models are adapted for a changing climate is on [[Climate Change]].

## Uses of catastrophe models

Catastrophe models are used in ratemaking, underwriting and portfolio management, the cost and analysis of [[Reinsurance|reinsurance]] and other risk transfer, the allocation of the cost of capital, and the capital-adequacy analysis rating agencies perform.

## Uncertainty in catastrophe models

The USGS's national seismic hazard model distinguishes *aleatory* variability, the random variability in a given model, from *epistemic* uncertainty, the uncertainty in which model is most correct. The first is the randomness of the hazard itself. The second comes from lack of knowledge and can be reduced by more data and science.

Given an event, the intensity a structure actually experiences is itself uncertain. In the USGS model, a ground motion model expresses the ground motion intensity in terms of the earthquake source, the path of the seismic waves and the site conditions. It quantifies the intensity by the mean and standard deviation of a normal density for the logarithm of spectral acceleration, so for one event a site has a *distribution* of intensity, not a single value. This sits beside the uncertainty in damage at a given intensity, the spread of damage ratios around the damage function on the vulnerability side ([[Catastrophe Model Output]], secondary uncertainty), and a model carries both.

Logic trees and simulation are the two methods of incorporating uncertainty that candidates most commonly used, and CAS's examiners credit them contrasted on these points:

| | Logic tree | Simulation |
| :--- | :--- | :--- |
| Method | Alternative parameter values or models are set out as branches, each weighted by expert judgement, and the results are combined as a weighted average. | Parameter values are drawn at random from probability distributions over many trials, giving a distribution of outcomes rather than a weighted point estimate. |
| Strengths | It addresses epistemic uncertainty and is easy to trace and communicate. | It handles complex situations and richer assumptions, and can be updated as data arrive. |
| Weaknesses | It rests on simplified, subjective weights and does not scale well to many parameters and scenarios. | It is computationally intensive and can be a "black box" to anyone who doesn't follow its mechanics. |

> [!example]- What maximum magnitude does the USGS logic tree give for the Mesozoic extended margin of the central and eastern United States? {Example}
> The USGS represents its uncertainty in the maximum magnitude $M_{\max}$ of this region, where the New Madrid and Charleston seismic zones lie, by weights on four plausible values:
>
> | $M_{\max}$ | Weight |
> | ---: | ---: |
> | 6.8 | 0.1 |
> | 7.2 | 0.3 |
> | 7.6 | 0.5 |
> | 8.0 | 0.1 |
>
> > [!answer]-
> > - Each branch's value is multiplied by its weight: $0.68 + 2.16 + 3.80 + 0.80$.
> > - The weighted average is $M_{\max} = 7.44$.
> > - The tree also gives a distribution of $M_{\max}$, not only its average.
