---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a3fb736d5acccbec379a38a06772c978f75639a524be7d2b93aa90f0bc7fcc52
  sources: []
  open_findings: 0
  log: .verify/Concepts/Sample Space.md
---

A **Sample Space** $S$ (or $\Omega$) is the set of all possible outcomes of a random experiment.
- Every conceivable result of the experiment appears as exactly one element of $S$
- Outcomes in $S$ must be mutually exclusive (no two can occur simultaneously) and collectively exhaustive (together they cover every possibility)
- The sample space can be finite, countably infinite, or uncountably infinite depending on the experiment

> $$S = \{\omega_1, \omega_2, \ldots\}$$
>
> $$\text{where each } \omega_i = \text{an elementary outcome of the experiment}$$

![[Media/Figures/Sample_Space.svg|340]]

> [!example]- Sample Space for Claim Occurrence and Size {Example}
> An experiment records whether a policyholder files a claim and, if so, classifies the loss as small ($\le$ \$$1{,}000$) or large ($>$ \$$1{,}000$). Write the sample space.
>
> > [!answer]-
> > There are three mutually exclusive, exhaustive outcomes:
> > $$S = \{\text{No Claim},\; \text{Small Claim},\; \text{Large Claim}\}$$
> > Each outcome is distinct, they cannot co-occur, and every possible result of the experiment is represented.
