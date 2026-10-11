---
id: "cas7-an-006"
exam: "Exam 7"
topic: "Ceded Loss Reserve"
learning_objective: "Estimation of Claims Liabilities"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Ceded+Loss+Reserve
  - Concepts/Excess+of+Loss
  - Concepts/Quota+Share
  - Concepts/Aggregate+Excess+of+Loss
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:600563acf3003f160ad1732955caea7170eed65720b2ae7908bdf05cb6bfd4c8
  sources:
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.73 (ceded = gross x % ceded; % may be quoted ceded or retained), 74-75 (Table 3.14: retained after QS and stop-loss = min(retained after QS, limit); paid and reported similarly), 76 (Table 3.15: XS removed first, then QS, then stop-loss; 'Stop-loss limits typically apply after all other reinsurance'), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-7/cas7-an-006.md
---

A captive insurer's general liability losses for one accident year (in 000s) are:

- Selected ultimate loss gross of all reinsurance: 3,000
- Paid loss gross of all reinsurance: 1,200
- One large loss in that total, with an estimated ultimate of 500 and 50 paid to date

The captive has three reinsurance covers, applied in this order:

1. Excess per occurrence reinsurance attaching at 100, with a limit large enough to cover the large loss in full.
2. A quota share treaty under which the captive cedes 40%.
3. Stop-loss reinsurance that caps the captive's retained losses, after the first two covers, at 1,500 for the accident year.

The excess per occurrence cover inures to the benefit of the quota share and the stop-loss, and the quota share inures to the benefit of the stop-loss. Paid losses are ceded on the same basis as ultimate losses.

Calculate the total unpaid losses ceded to all three covers.

- A) 720
- B) 780
- C) 960
- D) 1,020
- E) 1,240

## Explanation

Work each cover in order, on ultimate and on paid losses.

**Excess per occurrence.** Only the large loss pierces the attachment:

$$
\begin{align*}
\text{Ceded ultimate} &= 500 - 100 \\
&= 400 \\
\text{Ceded paid} &= \max(50 - 100,\ 0) \\
&= 0
\end{align*}
$$

leaving an ultimate of 2,600 and paid of 1,200.

**Quota share** at 40% ceded:

$$
\begin{align*}
\text{Ceded ultimate} &= 0.40 \times 2{,}600 \\
&= 1{,}040 \\
\text{Ceded paid} &= 0.40 \times 1{,}200 \\
&= 480
\end{align*}
$$

leaving an ultimate of 1,560 and paid of 720.

**Stop-loss.** Retained losses are capped at 1,500, so the stop-loss takes 1,560 - 1,500 = 60 of ultimate and nothing of paid (720 is below the cap).

Net of all reinsurance, ultimate is 1,500 and paid is 720, so net unpaid is 780. Gross unpaid is 3,000 - 1,200 = 1,800, so

$$
\begin{align*}
\text{Ceded unpaid} &= 1{,}800 - 780 \\
&= (400 + 1{,}040 + 60) - (0 + 480 + 0) \\
&= \mathbf{1{,}020}
\end{align*}
$$

The answer is **D**.

**Why not the others**

- **A** (720) cedes 40% of the gross unpaid losses and ignores the other two covers.
- **B** (780) is the unpaid losses **net** of all reinsurance, not the ceded unpaid.
- **C** (960) leaves out the stop-loss, ceding only 400 + 1,040 - 480. Retained ultimate after the quota share is 1,560, above the 1,500 cap, so the stop-loss responds.
- **E** (1,240) reads 40% as the percentage *retained*, ceding 60% to the quota share. A quota share percentage can be quoted either way; the actuary should confirm which it is.
