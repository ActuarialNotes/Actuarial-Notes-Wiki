---
id: "discrm-an-253"
exam: "Exam DISC-RM"
topic: "Pro Rata Reinsurance"
learning_objective: "14. Understanding Reinsurance"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Pro+Rata+Reinsurance
  - Concepts/Quota+Share
  - Concepts/Reinsurance+Contract+Provisions
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:26e0f389165a10540e9afd7551c07c8601f3932aaf8c73589d75d60080ab20a2
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-253.md
---

A proportional treaty has a sliding scale ceding commission: a minimum of 25% at a 65% loss ratio, rising one point for each point the loss ratio falls to 35% at a 55% loss ratio, then half a point for each point it falls, to a maximum of 45% at a 35% loss ratio. The provisional commission is 30%. If the treaty's loss ratio turns out to be 50%, what is the final commission?

- A) 30.0%
- B) 37.5%
- C) 40.0%
- D) 45.0%

## Explanation

At a 55% loss ratio the commission is 35%. Below that it rises half a point per point of loss ratio:

$$
\begin{align*}
c &= 35\% + 0.5 \times (55\% - 50\%) \\
&= 35\% + 2.5\% \\
&= 37.5\%
\end{align*}
$$

The answer is **B**. The commission slides with experience, so the cedant earns more when its business performs better.

**Why not the others**

- **A** — Is the provisional commission, paid before the loss ratio is known.
- **C** — Keeps the 1:1 slide below a 55% loss ratio.
- **D** — Is the maximum, reached only at a 35% loss ratio.
