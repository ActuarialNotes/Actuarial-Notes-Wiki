---
Title: "Solvency II Technical Provisions for General Insurers"
Authors: "Institute and Faculty of Actuaries, GI ROC Working Party on Solvency II Technical Provisions"
Year: "2013"
date: "2013"
Publisher: "Institute and Faculty of Actuaries"
Type: "Working Party Paper"
Available from: "[cambridge.org](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/C5898B42008C775573CEC7051D3A3E86/S1357321714000099a.pdf/solvency-ii-technical-provisions-for-general-insurers-by-the-institute-and-faculty-of-actuaries-general-insurance-reserving-oversight-committees-working-party-on-solvency-ii-technical-provisions.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9069f284916f05223b5824b72cdcdedc3cb14f510bf42aea71e41a799e2d4d2f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/IFOA.md
---
![[IFOA - Cover.svg]]

The IFoA General Insurance Reserving Oversight Committee working party's paper on **[[Solvency II]] technical provisions**, presented to the Institute and Faculty of Actuaries in November 2013 and published in the *British Actuarial Journal* (Vol. 20, part 1, pp. 7–129). Read for [[Exam 6C (CAS)|Exam 6C]] objective C4. The syllabus assigns **Sections 6.4 and 6.5 only**.

## The assigned sections: ENID

Sections 6.4 and 6.5 are about **ENID — "events not in data"**, also called **binary events**. Solvency II requires the best estimate to allow for **all possible future outcomes**; standard reserving techniques project from the data, and the data by construction does not contain the events that have not happened yet.

### 6.4 — What are ENID?

The working party proposes a definition that returns to the Directive's own wording:

> **ENID is "the balancing amount required to bring the best estimate before ENID up to an amount allowing for all possible future outcomes."**

Two consequences follow, and both are examinable:

- **The loading is entity-specific.** It depends not only on the risks underwritten but on **the insurer's own reserving policy** — an insurer that already books an actuarial best estimate plus a management adjustment has absorbed some ENID into that adjustment, and must not count it twice.
- **An ENID loading is not necessarily an increase.** One must allow for **both positive and negative** outcomes not already in the estimate: a successful new claims process, a court award in the insurer's favour, a legislative change in its favour.

The paper also sets out the alternatives it rejects or qualifies — most notably the **uplift/truncated-distribution approach**: assume standard techniques capture only events up to a realistically foreseeable level (for consistency with capital setting, say 1-in-200), fit a distribution, and take the ratio of the "true mean" to the "mean of the truncated distribution" as an uplift factor. Workable, but "very sensitive" and heavily dependent on the assumed distribution and truncation point.

### 6.5 — Estimating a loading for ENID

- **6.5.1 The starting point.** Determine first **what exposures and risks are already included in the best estimate** under current reserving practice, so the ENID bucket neither double-counts a management adjustment nor omits what the adjustment did not cover.
- **6.5.2 Identifying ENID.** **The exposure period is limited**: the insurer need only consider future events on business it is *obligated to* at the valuation date — an annual-policy writer accepting business within a month of inception need consider only about 13 months. Candidates should consider catastrophe exposure, potential large one-off claims, legislative change, court awards, other environmental changes, accumulations, changes in policy terms and conditions, and changes in claims processing. Consistency should be maintained with **[[Reverse Stress Testing|reverse stress testing]]**, the risk register, pricing models, catastrophe models and the internal capital model.
- **6.5.3 Is it necessary to identify potential ENID?** Strictly no — a loading can be computed without enumerating the events, and enumerating *all* possible outcomes is impossible. But the exercise supports a probability/severity calculation, provides a check on a truncated-distribution method, and the "blue sky thinking" has value in itself. Judgement is unavoidable, so **document it** — minutes of the discussions and process documentation are the evidence.

## Why a European paper is on a Canadian syllabus

Exam 6C asks candidates to compare **rules-based and [[Principles-Based Regulation|principles-based]]** solvency regimes. Solvency II is the principles-based comparator to the [[MCT]], and ENID is the sharpest illustration of the difference: a formula-driven regime never asks for a loading for events not in the data, and a principles-based one cannot avoid asking. The rest of the paper — best estimate, claims and premium provisions, contract boundaries, and the **risk margin** (its own section 8, a cost-of-capital construction of the same shape as the [[Risk Adjustment for Non-Financial Risk|IFRS 17 risk adjustment]] in [[CIA IFRS 2]] §5) — is context rather than assigned material.

## Related readings
- [[OSFI MCT]] — the Canadian rules-based capital test
- [[OSFI ORSA]] — the Canadian import of a Solvency II Pillar 2 idea
- [[CIA IFRS 2]] §5 — the cost-of-capital risk adjustment

## Links
- [Solvency II Technical Provisions for General Insurers (Cambridge / British Actuarial Journal)](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/C5898B42008C775573CEC7051D3A3E86/S1357321714000099a.pdf/solvency-ii-technical-provisions-for-general-insurers-by-the-institute-and-faculty-of-actuaries-general-insurance-reserving-oversight-committees-working-party-on-solvency-ii-technical-provisions.pdf)
