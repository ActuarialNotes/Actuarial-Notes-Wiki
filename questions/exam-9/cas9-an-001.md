---
id: "cas9-an-001"
exam: "Exam 9"
topic: "Facultative Reinsurance"
learning_objective: "Catastrophe and Reinsurance"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Facultative+Reinsurance
  - Concepts/Exposure+Curves
  - Concepts/Loss+Cost
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:fa7760fb1c1998a52ef55fbf1f8c65be515b46dda733f87835996fd7cde8aa4e
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, rev. 2014), §2A(b) Exposure Rating pp.17-19 (exposure-factor table p.18: 20%→49%, 60%→76%, 80%→85%, 100%→93%) and Introduction p.2 (facultative pricing 'variations on the same themes'), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-001.md
---

A primary insurer writes a commercial property policy on a single building with an insured value of \$2,000,000. The policy premium is \$16,000 and its expected loss ratio is 60%. The insurer keeps the first \$400,000 of any loss and offers the reinsurer a facultative excess certificate of \$1,200,000 excess of \$400,000 on this building alone.

The reinsurer prices the certificate by exposure rating with the following exposure curve, where $G(p)$ is the share of the building's expected loss from losses capped at a fraction $p$ of insured value:

| $p$ (percent of insured value) | 20% | 60% | 80% | 100% |
|---|---|---|---|---|
| $G(p)$ | 0.49 | 0.76 | 0.85 | 0.93 |

Calculate the certificate's expected loss.

- A) \$3,456
- B) \$4,896
- C) \$5,760
- D) \$7,296
- E) \$8,160

## Explanation

A facultative certificate covers one risk, so it is priced the way a per-risk treaty prices each risk in its limits profile: express the retention and the retention plus limit as fractions of insured value, and take the difference of the exposure curve between them.

$$
\text{Expected loss on the building} = 0.60 \times \$16{,}000 = \$9{,}600
$$

$$
\frac{\text{Retention}}{IV} = \frac{400{,}000}{2{,}000{,}000} = 20\%, \qquad \frac{\text{Retention} + \text{Limit}}{IV} = \frac{1{,}600{,}000}{2{,}000{,}000} = 80\%
$$

$$
\text{Share in the layer} = G(0.80) - G(0.20) = 0.85 - 0.49 = 0.36
$$

$$
\text{Certificate expected loss} = 0.36 \times \$9{,}600 = \mathbf{\$3{,}456}
$$

The certificate covers 60% of the building's value but only 36% of its expected loss, because most property losses are partial and fall in the cedant's retention. The answer is **A**.

**Why not the others**

- **B** — $\text{share} = 1 - G(0.20) = 0.51$ treats the certificate as covering everything above the retention, ignoring its \$1,600,000 top.
- **C** — 60% of the expected loss treats the excess certificate as if it were pro rata: a \$1,200,000 limit is 60% of insured value, but an excess layer does not take 60% of every loss.
- **D** — $G(0.60) = 0.76$ uses the limit alone as a fraction of insured value, as if the layer started at zero.
- **E** — $G(0.80) = 0.85$ reads the curve at the top of the layer without subtracting the retained part below 20%.
