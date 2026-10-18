---
id: "cas5-an-004"
exam: "Exam 5"
topic: "Underwriting Year"
learning_objective: "Estimating Claim Liabilities (Reserving)"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Underwriting+Year
  - Concepts/Accident+Year
  - Concepts/Policy+Year
  - Concepts/Reserving+Data+Organization
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:db069dc34361c72df387aded4b0f475c1ce6fbdc339a3239d79ea553ccd5be04
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, v3 2010), Ch.3 Aggregation by Accident Year / Policy Year or Underwriting Year, printed pp.41-42 (PDF 47-48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-004.md
---

A reinsurer writes annual reinsurance contracts incepting throughout each year and is choosing between underwriting-year and accident-year aggregation of its claims data for a reserve analysis.

Determine which of the following statements are true.

- I. Underwriting-year data match the claims and the premium arising from the same block of reinsurance contracts.
- II. Because underwriting-year data group contracts by inception date, the ultimate claims of an underwriting year can generally be estimated reliably sooner than those of the corresponding accident year.
- III. The effect of a major court ruling that changes how contracts are interpreted is easier to isolate in underwriting-year data than in accident-year data.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Friedland (Chapter 3) defines underwriting-year data as claims grouped by the year in which the **reinsurance policy became effective**, the reinsurer's counterpart of policy-year data.

- **I. True.** The chief advantage of policy-year (or underwriting-year) aggregation is a true match between claims and exposures: the premium and the claims in the cohort come from the same contracts.
- **II. False.** It is the other way round. Claims from an underwriting year of 12-month contracts can occur over a 24-month calendar period (a contract effective December 31 covers accidents into the following December), so it takes longer for the claims to be reported and for ultimate claims to be reliably estimated. Accident-year claims occur within a shorter time frame, which is one of accident year's stated advantages.
- **III. False.** Friedland lists this as a disadvantage of policy-year (and underwriting-year) data: they make it *difficult* to isolate the effect of a single large event, such as a major catastrophe or a major court ruling that changes how contracts are interpreted, because the event's claims are spread across the cohorts of every contract in force when it happened. Accident-year data, by contrast, are valuable for tracking such changes.

Only I is true. The answer is **A**.

**Why not the others**

- **B** — accepts II, which reverses the time frame: underwriting-year cohorts take *longer* to mature than accident-year cohorts.
- **C** — accepts III, which reverses Friedland's point: a court ruling is *harder* to isolate in underwriting-year data.
- **D** — rejects I, the true match of claims to premium that is underwriting-year data's chief advantage, and accepts both false statements.
- **E** — would require all three statements to be true, or only II or III; neither is the case.
