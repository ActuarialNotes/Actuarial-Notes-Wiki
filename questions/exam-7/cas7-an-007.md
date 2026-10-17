---
id: "cas7-an-007"
exam: "Exam 7"
topic: "Ceded Loss Reserve"
learning_objective: "Estimation of Claims Liabilities"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Ceded+Loss+Reserve
  - Concepts/Quota+Share
  - Concepts/Surplus+Share
  - Concepts/Aggregate+Excess+of+Loss
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:bcc496cd136206c92ab460da7120c7784b7f32b0c1a059f8fc91178e148e61df
  sources:
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.73 and fn 52 (QS factors identical; surplus share differs), 74 (risks-attaching: change applies by policy year of underlying risks, not accident year), 76 (stop-loss after all other reinsurance, protects net result), 24 (other reinsurance inures to the aggregate cover), 27-28 (LOD vs RA), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-7/cas7-an-007.md
---

A primary insurer estimates the losses it cedes to reinsurers. Determine which of the following statements about estimating its ceded losses are true.

- I. Because surplus share is a form of proportional reinsurance, the age-to-age factors for gross, ceded and net losses on a surplus share treaty are identical, as they are on a quota share.
- II. The insurer analyzes gross losses by accident year. If the ceded percentage of a risks-attaching quota share treaty changes, the new percentage applies to all losses with accident dates after the change.
- III. Stop-loss reinsurance typically applies after all other reinsurance, so the losses ceded to it are measured on the insurer's net result after those other covers.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

- **I is false.** On a quota share, premiums and losses are shared at one fixed percentage from the ground up, so the age-to-age factors for gross, ceded and net losses are identical. A surplus share cedes a different percentage of each risk, depending on its policy limit, so its gross, ceded and net factors differ, although usually far less than they do between proportional and non-proportional reinsurance.
- **II is false.** A risks-attaching treaty covers the policies that incept during its term. When its ceded percentage changes, the change applies by the **policy year** of the underlying risks, not by the accident year of the insured event, which is what makes the calculation complicated for an insurer whose gross analysis is by accident year.
- **III is true.** Stop-loss limits typically apply after all other reinsurance: the other covers inure to its benefit, and it protects the net result of the ceding company.

Only III is true, and "III only" is not among (A) to (D). The answer is **E**.

**Why not the others**

- **A**, **B** and **C** each accept statement I, treating every proportional treaty like a quota share.
- **D** accepts statement II, applying a risks-attaching cession change by accident date as a losses-occurring-during treaty would.
