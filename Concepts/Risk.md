---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:d5471a666b5d1c679dc7b476e78870c91b95535ccaadf0ac71436dfbf3fb009c
  sources:
    - "SOA Actuarial Glossary (2022), entries \"Risk\" (PDF p.60), \"Financial Risk\" (p.32), \"Operational Risk\" (p.48), sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf"
    - "Society for Risk Analysis Glossary (2018), §1.1 Risk (PDF p.4), §1.13 Resilience (PDF pp.6-7), sha256:0701d3716beb7ef322991178d1c2a2c220933f2fcdb204335af3c975254b18cc — https://www.sra.org/wp-content/uploads/2020/04/SRA-Glossary-FINAL.pdf"
    - "ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.4, §2.7, §2.9, PDF p.8, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1, PDF p.8, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "CAS, Statement of Principles Regarding Property and Casualty Insurance Ratemaking (May 1988; reinstated May 2021), Principle 2 PDF p.2, Considerations 'Individual Risk Rating' and 'Risk' PDF p.4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "CAS Exam 8 Content Outline, Fall 2026 (October 2026 administration), Domain A task 7 (PDF p.3), Experience Rating and Retrospective and Loss Sensitive Rating statements (PDF p.4), sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Risk.md
---

**Risk** has two meanings on the actuarial exams, and syllabi link this page in both. In **ratemaking and individual risk rating** (CAS Exams 5 and 8), a risk is an *insured*: the person or business being classified and priced. In **risk management** (CAS Exam 9 and the SOA exams), risk is the possibility that outcomes fall short of what was intended.

## Risk as the Insured (Ratemaking)

> **Risk(s)** — Individuals or entities covered by financial or personal security systems.
> - [[ASOP 12 - Risk Classification (ASB - 2005)|ASOP No. 12, Risk Classification]], §2.7, Actuarial Standards Board - 2005

- A *financial or personal security system* is ASOP 12's umbrella term for insurance and its relatives: its examples include auto, homeowners and life insurance and pension plans (§2.4). A **risk class** is "a set of risks grouped together under a risk classification system" (§2.9); see [[Rating Class]].
- This is the sense of "risk" in [[Individual Risk Rating]]. Fisher et al. explain that an experience mod "merely indicates the risk's expected loss relative to other risks in its class", and call a mod above 1.0 on a risk a debit mod (*Individual Risk Rating*, Ch.1 §1). Exam 8's objective on [[Experience Rating]] uses the word the same way: an individual risk's own experience shows how it differs from "other risks in the same class".
- The CAS [[Statement of Principles Regarding Property and Casualty Insurance Ratemaking (CAS - 1988)|ratemaking principles]] use it this way too: "When the experience of an individual risk does not provide a credible basis for estimating these costs, it is appropriate to consider the aggregate experience of similar risks." The same document also uses the second sense: "The rate should include a charge for the risk of random variation from the expected costs."

## Risk as Uncertainty (Risk Management)

> **Risk** — (1) Possibility of failing to meet objectives. (2) Can only be defined in context.
> - [Actuarial Glossary](https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf) , SOA - 2022

### Categories of Risk
Risk can be categorized based on the **type of objective** which is at risk.

| Risk Category                       | Objective at Risk                                                   |
| ----------------------------------- | ------------------------------------------------------------------- |
| [[Financial Risk]]                  | Risk about the value of assets and investments.                     |
| [[Operational Risk]]                | Risk about internal processes, people, systems, or external events. |
| [[Business Risk|Strategic Risk]] or Business Risk | Risk about decisions and how they're made.                          |

### Alternative Definitions of Risk

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

### The Impact of a Risk Definition
The [[Risk Taxonomies|language]] used to define risk has a direct impact on [[Decision-Making|decision-making]]. For example, if risk is viewed purely as a exposure to a negative outcome, then the primary objective becomes to avoid it. This perspective may be appropriate in the domain of health and safety, where the risk is to human well-being and life.

However, if risk is thought of as a deviation from an expected reference value - whether positive or negative - it might be useful to take on some risk to gain insights and learn from new experience. Through this lens, risk can be modeled as a priced [[Risk as a Commodity|commodity]] where higher risk is associated with higher *expected returns*, a perspective is commonly applied in finance. See Modern Portfolio Theory to learn more about risk and return.
### Risk and Resilience
Risk is highly related to the idea of resilience, which is defined as the ability to recover quickly or "bounce back". Organizations with more resilience can afford to make riskier decisions.

> [!warning]- Exam traps
> - In an Exam 5 or Exam 8 question, "a risk", "the risk's experience" and "other risks in its class" mean an insured and other insureds. Read them as uncertainty and the objective stops making sense.
> - One reading can use both senses. The Statement of Principles speaks of "an individual risk's experience" (an insured) and of a charge for "the risk of random variation from the expected costs" (uncertainty).
