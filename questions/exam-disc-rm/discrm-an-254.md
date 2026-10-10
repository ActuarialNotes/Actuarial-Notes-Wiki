---
id: "discrm-an-254"
exam: "Exam DISC-RM"
topic: "Excess of Loss"
learning_objective: "14. Understanding Reinsurance"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Excess+of+Loss
  - Concepts/Types+of+Reinsurance
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:b5c82df001f1b0f9b640f3fbde657a121be60c6a56c7e6e35729b0c3dd1048ab
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
    - "Myers, Reinsurance Overview (NAMIC Directors' Education, 9 May 2017), slides pp.6–17 (functions, types, facultative uses, pro rata, per-risk/cat XOL, types of reinsurers, marketing), sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-254.md
---

An insurer buys a per-risk excess of loss treaty of \$800,000 excess of \$200,000. In one year it has three losses, on three different risks, of \$150,000, \$600,000 and \$1,500,000. How much does the reinsurer pay in total?

- A) \$1,200,000
- B) \$1,650,000
- C) \$1,700,000
- D) \$2,250,000

## Explanation

Each loss is ceded above the \$200,000 retention, up to the \$800,000 limit:

$$
\begin{align*}
Y_1 &= \min(\max(150{,}000 - 200{,}000,\ 0),\ 800{,}000) \\
&= 0 \\
Y_2 &= \min(600{,}000 - 200{,}000,\ 800{,}000) \\
&= 400{,}000 \\
Y_3 &= \min(1{,}500{,}000 - 200{,}000,\ 800{,}000) \\
&= 800{,}000
\end{align*}
$$

The total is \$1,200,000. The answer is **A**. Unlike a surplus share, the excess treaty pays nothing on the small loss.

**Why not the others**

- **B** — Drops the floor at zero, letting the small loss count as $-50{,}000$, and drops the limit.
- **C** — Applies the retention but not the limit to the largest loss.
- **D** — Cedes every loss in full.
