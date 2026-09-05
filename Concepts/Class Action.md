---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:77a68f2ec0c5113e18d646ed6971c1582701e359e7ef85ecccb49618aff60b94
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Class Action.md
---

**A Class Action** is a proceeding in which one representative plaintiff sues on behalf of a class of people with common claims, binding every class member who does not opt out. It converts many individually uneconomic claims into a single action large enough to litigate, and it is the mechanism through which insurers face aggregate exposure to a practice rather than to an event.

- **Certification** is the gate: a court must find an identifiable class, common issues, a suitable representative, and that a class proceeding is the preferable procedure. Most of the litigation risk is decided here — certification usually forces settlement, and refusal usually ends the matter.
- **Insurance-specific subject matter:** improper claims-handling practices, systematic underpayment (such as depreciation deducted from replacement cost), premium or fee overcharges, denial of a coverage across a book, and privacy breaches. The common thread is a **practice applied uniformly**, which is exactly what creates commonality.
- **Insurers appear on both sides.** As defendants, for their own practices; as liability insurers, defending policyholders facing class actions in product liability, environmental, securities and mass-tort claims.
- **Actuarial characteristics that make class actions hard to reserve:** aggregate exposure that does not develop like ordinary claims; a **binary** outcome around certification; a long delay before the size of the class is known; and correlation across the book, since every affected policy is exposed to the same decision at the same time — the antithesis of the independence that ordinary reserving assumes.
- Canadian class actions are governed provincially, with Ontario, Quebec and British Columbia the principal venues, and Quebec's regime historically the most permissive on certification.
- Contingency fees and cost rules make Canada's class-action environment materially less expansive than the American one, but the trend has been toward more filings, not fewer — one of the [[Tort Litigation]] trends the syllabus asks candidates to discuss.

> [!example]- Reserving a Certified Class Action {Example}
> An insurer is a defendant in a certified class action alleging it improperly deducted depreciation on $60{,}000$ replacement-cost claims over six years. Average alleged underpayment is $\$1{,}400$. Counsel assesses a $35\%$ probability of liability being established, and estimates that if liability is found, $70\%$ of class members would ultimately be paid.
>
> How should this be reserved, and what makes it different from an ordinary reserve?
>
> > [!answer]-
> > **Expected value:**
> >
> > $$\begin{align*}
> > \text{Maximum exposure} &= 60{,}000 \times \$1{,}400 = \$84{,}000{,}000 \\[4pt]
> > \text{If liable} &= 0.70 \times \$84{,}000{,}000 = \$58{,}800{,}000 \\[4pt]
> > \text{Expected} &= 0.35 \times \$58{,}800{,}000 \\
> > &= \$20{,}580{,}000
> > \end{align*}$$
> >
> > Add defence costs, which are payable regardless of outcome and in a class action of this size are themselves material.
> >
> > **What makes it different from a normal reserve:**
> >
> > - **The distribution is binary, not smooth.** The outcome is approximately $\$0$ with probability $0.65$ and $\$59$ million with probability $0.35$. The expected value of $\$20.6$ million is a number that will **never actually be paid** — a fact worth stating explicitly in the actuarial report, because the reader will otherwise treat it as a central estimate in the usual sense.
> > - **No development pattern applies.** There is no triangle for this; the estimate is legal judgement quantified, and it should be labelled as such.
> > - **The [[Risk Adjustment for Non-Financial Risk|risk adjustment]] should be large.** A binary $\$59$ million exposure against the insurer's surplus is exactly the uncertainty a risk adjustment is meant to price, and a confidence-level disclosure derived from a smooth distribution would understate it badly.
> > - **It belongs in [[FCT]] as an adverse scenario**, not only in the reserve. If $\$59$ million would threaten the [[MCT]] ratio, that is a financial-condition matter for the board.
> > - **It is a conduct problem before it is a reserve problem.** If the practice continues, the class keeps growing.
