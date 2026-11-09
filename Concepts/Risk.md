---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:36e878b02d3788b5f981e9bf49eaf10ef8dabaa8774560e5af360a091a14ae33
  sources:
    - "SOA Actuarial Glossary (2022), entries \"Risk\" (PDF p.60), \"Financial Risk\" (p.32), \"Operational Risk\" (p.48), sha256:9e6976838bc6d827be402fba326a3f977bc566bc5700470e9208ec59a93bf953 — https://www.soa.org/4a537f/globalassets/assets/files/edu/actuarial-glossary.pdf"
    - "Society for Risk Analysis Glossary (2018), §1.1 Risk (PDF p.4), §1.13 Resilience (PDF p.6), sha256:0701d3716beb7ef322991178d1c2a2c220933f2fcdb204335af3c975254b18cc — https://www.sra.org/wp-content/uploads/2020/04/SRA-Glossary-FINAL.pdf"
    - "ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.4, §2.7, §2.9, PDF p.8, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1, PDF p.8, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "CAS, Statement of Principles Regarding Property and Casualty Insurance Ratemaking (May 1988; reinstated May 2021), Principle 2 PDF p.2, Considerations 'Individual Risk Rating' and 'Risk' PDF p.4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "CAS Exam 8 Content Outline, Fall 2026 (October 2026 administration), Experience Rating statement (PDF p.4), sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk.md
---

A **Risk** has two meanings on the actuarial exams. In ratemaking and [[Individual Risk Rating|individual risk rating]] (CAS Exams 5 and 8), a risk is an insured, the person or business that is classified and priced. In risk management (CAS Exam 9 and the SOA exams), risk is the possibility that outcomes fall short of what was intended.

| | Risk as the insured | Risk as uncertainty |
| --- | --- | --- |
| Used in | Ratemaking, risk classification, experience rating | Enterprise risk management |
| Definition | Individuals or entities covered by financial or personal security systems (ASOP 12, §2.7) | Possibility of failing to meet objectives (SOA Actuarial Glossary) |
| Example | "Other risks in its class" | "The risk of random variation from the expected costs" |

> [!example]- In an Exam 8 question, an insured's experience modification is 1.15. What does "the risk" mean, and what does the mod say about it? {Example}
> - "The risk" is the insured whose experience is being rated, not an uncertainty.
> - Fisher et al. explain that an experience mod "merely indicates the risk's expected loss relative to other risks in its class", and call a mod above 1.0 on a risk a debit mod.
> - A mod of 1.15 says the insured's expected loss is 15% above its class average. It does not make the insured a bad risk to be non-renewed.

## Risk as the insured

[[ASOP 12 - Risk Classification (ASB - 2005)|ASOP 12]] defines risks as individuals or entities covered by financial or personal security systems (§2.7). A financial or personal security system is its umbrella term for insurance and its relatives, such as auto, homeowners and life insurance and pension plans (§2.4). A **risk class** is a set of risks grouped together under a risk classification system (§2.9), as a [[Rating Class|rating class]] is.

This is the sense of the word in [[Experience Rating|experience rating]], where an individual risk's own experience shows how it differs from other risks in the same class. The CAS [[Statement of Principles Regarding Property and Casualty Insurance Ratemaking (CAS - 1988)|ratemaking principles]] use it too: "When the experience of an individual risk does not provide a credible basis for estimating these costs, it is appropriate to consider the aggregate experience of similar risks."

## Risk as uncertainty

The SOA Actuarial Glossary defines risk as the possibility of failing to meet objectives, and adds that it can only be defined in context. ISO defines it as the effect of uncertainty on objectives. Its two named kinds are:

- **[[Financial Risk|Financial risk]]**, the financial impact from financial transactions.
- **[[Operational Risk|Operational risk]]**, the risk remaining after determining financing and systematic risk, including risks resulting from breakdowns in internal procedures, people and systems.

The Society for Risk Analysis Glossary (§1.1) lists other qualitative definitions, among them "Risk is exposure to a proposition (e.g., the occurrence of a loss) of which one is uncertain" and "Risk is the deviation from a reference value and associated uncertainties". It lists metrics such as "the combination of probability and magnitude/severity of consequences" separately, and adds that none of them can be viewed as risk itself. Its **resilience** is the ability of the system to sustain or restore its basic functionality following a risk source or an event (§1.13).

> [!trap] Reading "a risk" as an uncertainty in a ratemaking question
> In an Exam 5 or Exam 8 question, "a risk", "the risk's experience" and "other risks in its class" mean an insured and other insureds. One reading can use both senses: the Statement of Principles speaks of an individual risk's experience and of a charge for "the risk of random variation from the expected costs".
