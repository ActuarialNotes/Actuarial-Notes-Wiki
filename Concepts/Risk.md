---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:10c247bebde773bef8be978fe3b31439a7c4002366f41b6be60207712259b242
  sources:
    - "SOA Actuarial Glossary (2022), entry \"Risk\", PDF p.60, sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf"
    - "Society for Risk Analysis Glossary (2018), §1.1 Risk, PDF p.4, sha256:0701d3716beb7ef322991178d1c2a2c220933f2fcdb204335af3c975254b18cc — https://www.sra.org/wp-content/uploads/2020/04/SRA-Glossary-FINAL.pdf"
    - "ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.7, PDF p.8, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1, §3, PDF p.8, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Risk.md
---

 > **Risk** is the possibility of failing to meet objectives. Risk is only able to be defined in context.
 > - [Actuarial Glossary](https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf) , SOA - 2022

## Categories of Risk
Risk can be categorized based on the **type of objective** which is at risk.

| Risk Category                       | Objective at Risk                                                   |
| ----------------------------------- | ------------------------------------------------------------------- |
| [[Financial Risk]]                  | Risk about the value of assets and investments.                     |
| [[Operational Risk]]                | Risk about internal processes, people, systems, or external events. |
| [[Business Risk|Strategic Risk]] or Business Risk | Risk about decisions and how they're made.                          |

## Alternative Definitions of Risk

> **Risk** is the effect of uncertainty on objectives.
> - ISO 31000 - Risk Management - Guidelines, ISO - 2018
> 
> The Society for Risk Analysis reviewed several definitions of risk in their Risk Analysis Glossary. Risk can be defined as;
>- an **effect** of uncertainty on objectives
>- an **exposure** to an uncertain proposition
>- an **uncertainty** about an event and the severity of its consequences
>- a **probability** of an event times the expected severity of its consequences
>- a **deviation** from a reference value
>- a **triple** of scenario, probability, and consequence

These definitions are applied in different contexts within risk management. Fields such as finance, audit, or emergency response each adopt different definitions of risk to fit their use cases.

## The Impact of a Risk Definition
The [[Risk Taxonomies|language]] used to define risk has a direct impact on [[Decision-Making|decision-making]]. For example, if risk is viewed purely as a exposure to a negative outcome, then the primary objective becomes to avoid it. This perspective may be appropriate in the domain of health and safety, where the risk is to human well-being and life.

However, if risk is thought of as a deviation from an expected reference value - whether positive or negative - it might be useful to take on some risk to gain insights and learn from new experience. Through this lens, risk can be modeled as a priced [[Risk as a Commodity|commodity]] where higher risk is associated with higher *expected returns*, a perspective is commonly applied in finance. See Modern Portfolio Theory to learn more about risk and return.
## Risk and Resilience
Risk is highly related to the idea of resilience, which is defined as the ability to recover quickly or "bounce back". Organizations with more resilience can afford to make riskier decisions.