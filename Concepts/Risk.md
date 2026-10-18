---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:3a35c43c8b260495b7a20cc3721875167d902ea915e6c9bfa15bc584a7043960
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

### Financial and Operational Risk

| Term                 | SOA Actuarial Glossary (2022)                                                                                                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [[Financial Risk]]   | "Financial impact from financial transactions." (p.32)                                                                                                                                                                                    |
| [[Operational Risk]] | "Operational risk summarizes the risks a company undertakes when it attempts to operate within a given field or industry. It is the risk remaining after determining financing and systematic risk, and includes risks resulting from breakdowns in internal procedures, people and systems." (p.48) |

### Alternative Definitions of Risk

> ISO defines risk as the effect of uncertainty on objectives.
> - [Society for Risk Analysis Glossary](https://www.sra.org/wp-content/uploads/2020/04/SRA-Glossary-FINAL.pdf), §1.1, SRA - 2018

The Society for Risk Analysis Glossary (§1.1) lists, among its overall qualitative definitions:
- "Risk is exposure to a proposition (e.g., the occurrence of a loss) of which one is uncertain"
- "Risk is uncertainty about and severity of the consequences of an activity with respect to something that humans value"
- "Risk is the deviation from a reference value and associated uncertainties"

It lists separately, as risk metrics/descriptions (examples):
- "The combination of probability and magnitude/severity of consequences"
- "The triplet (si,pi,ci), where si is the ith scenario, pi is the probability of that scenario, and ci is the consequence of the ith scenario"

and adds: "None of these examples can be viewed as risk itself, and the appropriateness of the metric/description can always be questioned."

### Resilience

> Resilience is the ability of the system to sustain or restore its basic functionality following a risk source or an event (even unknown).
> - [Society for Risk Analysis Glossary](https://www.sra.org/wp-content/uploads/2020/04/SRA-Glossary-FINAL.pdf), §1.13, SRA - 2018

> [!warning]- Exam traps
> - In an Exam 5 or Exam 8 question, "a risk", "the risk's experience" and "other risks in its class" mean an insured and other insureds. Read them as uncertainty and the objective stops making sense.
> - One reading can use both senses. The Statement of Principles speaks of "an individual risk's experience" (an insured) and of a charge for "the risk of random variation from the expected costs" (uncertainty).
