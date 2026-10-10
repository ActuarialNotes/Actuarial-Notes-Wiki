---
id: "discrm-an-022"
exam: "Exam DISC-RM"
topic: "Risk Measure"
learning_objective: "1. Introduction to Risk Management"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Risk+Measure
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c0ef037424dcec30820815bef3bec38366920fe03f74f4ed38198c8a63914c09
  sources:
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.117-118 (PDF p.19), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-022.md
---

The CAS's 2003 overview of enterprise risk management splits risk measures into solvency-related measures, which concentrate on the adverse tail, and performance-related measures, which concentrate on volatility near the mean. An insurance regulator wants a measure of how likely an insurer is to exhaust its capital. Which measure is designed for that concern?

- A) The standard deviation of annual earnings
- B) The semi-variance of annual earnings below plan
- C) The coefficient of variation of annual premium
- D) The probability of ruin over the coming year

## Explanation

The **probability of ruin** is the probability that results fall far enough for capital to be exhausted. It is a solvency-related measure, a special case of shortfall risk, and solvency-related measures are of particular concern to customers and their proxies, such as regulators and rating agencies. The answer is **D**.

**Why not the others**

- **A** — The standard deviation measures volatility around the mean, giving equal weight to favorable and unfavorable deviations; it is a performance-related measure of concern to owners and analysts.
- **B** — Semi-variance counts only unfavorable deviations, but it measures volatility below a target such as plan, not the chance of running out of capital.
- **C** — The coefficient of variation of premium measures relative variability in revenue, not insolvency.
