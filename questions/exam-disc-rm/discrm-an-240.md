---
id: "discrm-an-240"
exam: "Exam DISC-RM"
topic: "Unfair Claims Settlement Practices"
learning_objective: "13. The Claims Function"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Unfair+Claims+Settlement+Practices
  - Concepts/Claims+Handling+Process
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:69a928b7ad6d3e138d064ba8c537f6cc7d27db3451634db951c9818103d066f3
  sources:
    - "NAIC Unfair Property/Casualty Claims Settlement Practices Model Regulation, Model #902 (Jul 1997 printing), §§2–9, pp.1–9, sha256:f33578860a5603a165819316747c996514340f371ca42f77f00621e3b3d41f55 — https://content.naic.org/sites/default/files/model-law-902.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-240.md
---

Under the periods in the NAIC Unfair Property/Casualty Claims Settlement Practices Model Regulation, consider this first-party claim file. The insured reported the loss to the insurer's agent on day 0. The insurer acknowledged it on day 12. A properly executed proof of loss arrived on day 30. The insurer accepted the claim and affirmed liability for an undisputed \$18,000 on day 55, and paid it on day 80. It sent no letter asking for more time. Which step was late?

- A) The acknowledgment
- B) The acceptance of the claim
- C) The payment
- D) None of them

## Explanation

$$
\begin{align*}
t_{\text{ack}} &\le 0 + 15 \\
&= 15 \\
t_{\text{decision}} &\le 30 + 21 \\
&= 51 \\
t_{\text{pay}} &\le 55 + 30 \\
&= 85
\end{align*}
$$

The acknowledgment on day 12 and the payment on day 80 were on time. The claimant had to be told of acceptance or denial within 21 days of the proof of loss, by day 51, unless the insurer sent a letter explaining why it needed more time. Day 55 was late. The answer is **B**.

**Why not the others**

- **A** — Notice to the agent is notice to the insurer, and day 12 is within 15 days.
- **C** — Payment is due within 30 days of affirming liability, so day 80 is within the deadline of day 85.
- **D** — The decision missed the 21-day standard.
