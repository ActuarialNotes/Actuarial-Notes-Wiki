---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:19a777f5f884e1e623ec58a22f69164ca29b2597a2d2b488badc107013b3f0a5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Class Action.md
---

![[Media/Figures/Class_Action.svg|340]]

A **Class Action** is a proceeding in which one representative plaintiff sues on behalf of a class of people with common claims, binding every class member who does not opt out. It turns many claims too small to litigate individually into a single action large enough to litigate, and it exposes an insurer to a practice rather than to an event.

A class action must first be certified. A court certifies it only if it finds:

1. An identifiable class.
2. Common issues.
3. A suitable representative plaintiff.
4. That a class proceeding is the preferable procedure.

Most of the litigation risk is decided at certification. Certification usually forces a settlement, and refusal usually ends the matter.

## Class actions against insurers

Insurers face class actions over improper claims-handling practices, systematic underpayment (such as depreciation deducted from replacement cost), premium or fee overcharges, denial of a coverage across a book, and privacy breaches. What these have in common is a practice applied uniformly, which is exactly what creates the common issues.

Insurers appear on both sides. They are defendants for their own practices, and as liability insurers they defend policyholders facing class actions in product liability, environmental, securities and mass-tort claims.

## Reserving a class action

A class action is hard to reserve for four reasons:

1. Its aggregate exposure does not develop like ordinary claims, so no development pattern applies.
2. Its outcome is binary, turning on certification and liability.
3. The size of the class is known only after a long delay.
4. Every affected policy is exposed to the same decision at the same time, the opposite of the independence ordinary reserving assumes.

> [!example]- How should this class action be reserved? {Example}
> An insurer is a defendant in a certified class action alleging it improperly deducted depreciation on $60{,}000$ replacement-cost claims over six years. The average alleged underpayment is $\$1{,}400$. Counsel assesses a $35\%$ probability that liability is established and estimates that, if it is, $70\%$ of class members would ultimately be paid.
>
> > [!answer]-
> > - The maximum exposure is $60{,}000 \times \$1{,}400 = \$84{,}000{,}000$.
> > - If liability is found, the payout is $0.70 \times \$84{,}000{,}000 = \$58{,}800{,}000$.
> > - The expected value is $0.35 \times \$58{,}800{,}000 = \$20{,}580{,}000$, plus defence costs, which are payable whatever the outcome and material in an action of this size.
> > - The outcome is about $\$0$ with probability $0.65$ and $\$59$ million with probability $0.35$, so the $\$20.6$ million expected value will never actually be paid, and the actuarial report should say so.
> > - There is no triangle for this. The estimate is legal judgement quantified, and it should be labelled as such.
> > - The [[Risk Adjustment for Non-Financial Risk|risk adjustment]] should be large, because a confidence level derived from a smooth distribution would badly understate a binary $\$59$ million exposure.
> > - If $\$59$ million would threaten the [[MCT]] ratio, the case also belongs in the [[FCT]] as an adverse scenario.

## Class actions in Canada

Canadian class actions are governed provincially. Ontario, Quebec and British Columbia are the principal venues, and Quebec's regime has historically been the most permissive on certification. Contingency fees and cost rules make Canada's class-action environment less expansive than the American one, but the number of filings has been rising, one of the [[Tort Litigation|tort litigation]] trends the syllabus asks about.

> [!trap] Reading the expected value as a central estimate
> A class action's expected value is a probability-weighted average of a near-zero outcome and a large one. Neither outcome is near the expected value, so state the two outcomes and their probabilities beside it.
