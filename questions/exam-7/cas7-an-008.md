---
id: "cas7-an-008"
exam: "Exam 7"
topic: "Types of Reinsurance"
learning_objective: "Estimation of Claims Liabilities"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Types+of+Reinsurance
  - Concepts/Treaty+Reinsurance
  - Concepts/Surplus+Share
  - Concepts/Aggregate+Excess+of+Loss
  - Concepts/Ceded+Loss+Reserve
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:902dd4551e50a0218c463d62ed4fb6b0bb552a015c839a5d6e81285dc5a670d0
  sources:
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.14-15 (treaty: absence of individual underwriting; facultative underwriting mitigates adverse selection), 19 (proportion ceded = (limit - line)/limit, Table 1.3), 24 (aggregate excess applies to net retention, other reinsurance inures), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-7/cas7-an-008.md
---

Determine which of the following statements about types of reinsurance are true.

- I. The most important characteristic of treaty reinsurance is that the reinsurer underwrites each risk ceded to it, which protects it from adverse selection.
- II. Under a surplus share treaty, a loss smaller than the ceding company's retained line is still partly ceded when the policy's limit exceeds the retained line.
- III. Aggregate excess of loss reinsurance generally applies to the ceding company's net retention, with its other reinsurance inuring to the benefit of the aggregate cover.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

- **I is false.** The most important characteristic of treaty reinsurance is the *absence* of individual underwriting by the reinsurer: it accepts all business within the treaty's terms, including policies not yet written, and so bears the risk that the cedant's underwriting misjudged them. It is **facultative** reinsurance in which the reinsurer may conduct its own underwriting of each submission, mitigating adverse selection.
- **II is true.** A surplus share cedes a proportion of *each loss* on a policy, set by the policy's limit: $(\text{policy limit} - \text{retained line}) / \text{policy limit}$. With a 2.5 million retained line, a policy with a 10 million limit is 75% ceded, so a 1 million loss on it cedes 0.75 million, even though the loss is smaller than the line. Only policies with limits at or below the line cede nothing.
- **III is true.** Aggregate excess of loss (aggregate stop-loss) generally applies to all or part of the cedant's net retention and protects its net results, so other reinsurance inures to its benefit.

II and III are true. The answer is **D**.

**Why not the others**

- **A**, **B** and **C** each accept statement I, attributing facultative underwriting to treaty reinsurance.
- **E** would require II or III to be false. II is the misconception that a surplus share works like excess of loss, ceding only the part of a loss above the line; III holds as stated.
