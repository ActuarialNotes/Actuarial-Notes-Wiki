---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:d949ca53318269f43b04ead32b34a516b41ccf0d4196e8caf13e0d65a2d60861
  sources:
    - "Humphreys, Exceedance Probability in Catastrophe Modeling, CAS E-Forum Winter 2021, pp.1-7, 16 (definition and perils incl. terrorism; uses: ratemaking, portfolio management, underwriting, cost of capital, cost of reinsurance and risk transfer, ERM, capital adequacy; EP(x) = P(X > x); AAL = sum p_i X_i; return period = 1/EP; OEP = probability the largest loss in a year exceeds x; AEP the survival function of the annual aggregate S, E[S] = integral of A(x) dx; AEP used for aggregate covers such as stop loss), sha256:c161864d85d35169b8e1f92af664542f05f005772e4cc6607ead0d68f08fdf89 — https://www.casact.org/sites/default/files/2021-03/02_humphreys.pdf"
    - "SOA Actuarial Glossary, p.12 'Catastrophe', sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf"
    - "CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q18, PDF pp.72-73 (the four modules: event/hazard, inventory/exposure, vulnerability/damage, loss; inventory data on building codes, built value, type, contents; policy limits and deductibles; epistemic reducible, aleatory not), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf"
    - "CAS Exam 8 Fall 2018 — exam and examiner's report, Q17, PDF pp.88-89 (inventory and vulnerability modules; parameters such as magnitude, soil type, location, wind speed; epistemic uncertainty; logic trees and simulation), sha256:7993ff15f4c6aae538bde337a57fbbf775aab27f3a232b8a828458ac52a330c4 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf"
    - "Ermoliev, Ermolieva, MacDonald & Norkin, Insurability of Catastrophic Risks: The Stochastic Optimization Model, IIASA Research Report RR-00-20 (reprinted from Optimization 47, 2000, with permission), PDF pp.3-4 (catastrophes produce losses highly correlated in space and time, which break the law of large numbers; insurers can reduce ruin only by deliberately selecting the dependent risks they cover; catastrophe modelling used for coverage, premiums and reinsurance), sha256:451edc97fb5e761c971298be1e43e1f43ad5970a850631a559fa93d7b93cb5d0 — https://pure.iiasa.ac.at/id/eprint/6252/1/RR-00-20.pdf"
    - "Braun & Kousky, Catastrophe Bonds, Wharton Risk Center Primer (July 2021), pp.1-6 (sponsor, bankruptcy-remote SPV, Treasury collateral in trust, floating rate plus premium; indemnity, industry-loss, parametric and modelled-loss triggers and Figure 3: parametric most transparent and most basis risk, indemnity the opposite, the other two between; modeller estimates probability of first loss and EL from property and policy data; average maturity three years; proportional payout from attachment to exhaustion; multi-year price stability, full collateral, dollar-for-dollar capital in the top layers; complement and substitute for reinsurance), sha256:38708381788f2732616650c245307b1775384bb347f4d1f7a884d05eb13918e7 — https://esg.wharton.upenn.edu/wp-content/uploads/2023/08/Cat-Bond-Primer-July-2021.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18) — scope check, pp.3, 5, 7 (Domain A tasks 4-5 with Grossi & Kunreuther; Domain C task 7 securitization and CAT bonds with Coval, Jurek & Stafford, Cummins CAT Bond, Cummins Capital, Mildenhall & Major, Panning; readings table: Grossi & Kunreuther Ch.2-6 for A4-A5, CJS for C5-C6, Cummins CAT Bond for C7), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Syllabus Committee, Clarification and Errata to Catastrophe Modeling (Grossi & Kunreuther), March 29 2021, pp.1-3 (OEP, AEP and CEP definitions; AAL = sum p_i L_i in Table 2.1), sha256:8677464a4952483b031c9559d96f083629d4e22a14281c604368665f4d9c63a6 — https://www.casact.org/sites/default/files/2021-05/8_Grossi_Kunreuther_Errata_2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Catastrophe Modelling.md
---

> "==Catastrophes== are infrequent events that cause severe loss, injury or property damage to a large population of exposures. "
> - [Actuarial Glossary](https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf) - SOA

> ==Catastrophe modelling== is an estimation technique used in property and casualty insurance to predict and evaluate the damage caused by natural catastrophes — hurricanes, earthquakes, tornadoes, hail, winter storms, floods and wildfires — and by man-made catastrophes such as terrorism.

| Section                             | Description                                                                                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [[Catastrophe Modelling Framework]] | Catastrophe models are made up of several parts, such as simulation of events, hazards, vulnerabilities, and ultimately estimation of financial risk.      |
| Data for Catastrophe Modelling      | Data used in catastrophe models describe the hazard (event magnitude, location, wind speed, soil type), the exposed properties (construction type, building codes, built value, contents) and the policy terms, such as limits and deductibles, that turn damage into insured loss. |
| [[Concepts/Climate Change]]                  | How are catastrophe models adapted for changes in climate?                                                                                                 |

## Uses of Catastrophe Models

Catastrophe models are used in ratemaking, underwriting and portfolio management, the cost and analysis of [[Reinsurance|reinsurance]] and other risk transfer, the allocation of the cost of capital, and the capital-adequacy analysis rating agencies perform.
## Sources
1. [Exceedance Probability in Catastrophe Modeling](https://www.casact.org/sites/default/files/2021-03/02_humphreys.pdf) (Casualty Actuarial Society E-Forum, Winter 2021)