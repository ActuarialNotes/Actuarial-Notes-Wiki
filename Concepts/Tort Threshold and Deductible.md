---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cf459d4d7c061952b6b65c584b0336f376afbd6b9c85a193cea1b35354835044
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tort Threshold and Deductible.md
---

**A tort threshold and deductible** are the two devices that restrict access to bodily injury lawsuits in a partial [[No-Fault Insurance|no-fault]] auto system. The **threshold** is a qualitative or quantitative test an injury must meet before a claim for pain and suffering may be brought; the **deductible** is a fixed amount subtracted from any non-pecuniary award that does get through.

> $$\text{Award paid} = \max\bigl(0,\; \text{Assessed damages} - \text{Deductible}\bigr)$$

- **Verbal (qualitative) threshold** — the injury must be a "permanent serious impairment of an important physical, mental or psychological function," or death. Ontario's approach. It is judged case by case, which makes it flexible and litigated.
- **Monetary (quantitative) threshold** — damages must exceed a stated dollar amount. Simpler to administer but crude, and it invites damage estimates to cluster just above the line.
- **The deductible** operates on top: even a claim that clears the threshold has a substantial amount (in Ontario, tens of thousands of dollars, indexed annually) removed from the non-pecuniary award. Because the deductible applies per claim, it eliminates the economics of small claims entirely.
- **Effect on the severity distribution:** the threshold **truncates** the small claims out of the tort layer, and the deductible **shifts** what remains downward. The observed average tort award therefore rises after a threshold is introduced, even though total cost falls — a statistic routinely misread as evidence that the reform failed.
- **Erosion** is the standard pattern. A verbal threshold is defined by the courts over time, and each decision that admits a category of injury widens it; a fixed-dollar deductible loses bite to inflation unless indexed. Both are why savings estimated at enactment decline.
- The deductible is typically **not disclosed to the jury** in Ontario, which produces the recurring problem of awards assessed just below the deductible and therefore paid at zero after years of litigation.

> [!example]- Threshold Plus Deductible {Example}
> Four claimants sue for pain and suffering. The verbal threshold requires permanent serious impairment; the deductible is $\$45{,}000$.
>
> - A: soft-tissue injury, recovered in four months, assessed at $\$18{,}000$.
> - B: permanent back injury, assessed at $\$40{,}000$.
> - C: permanent back injury, assessed at $\$120{,}000$.
> - D: catastrophic injuries, assessed at $\$350{,}000$.
>
> What is paid, and what does it show?
>
> > [!answer]-
> > - **A: $\$0$.** Fails the threshold — not permanent, not serious. The claim never reaches the deductible question.
> > - **B: $\$0$.** Clears the threshold, but $\$40{,}000 - \$45{,}000 < 0$. The claimant litigated for years, won, and recovers nothing on this head.
> > - **C: $\$75{,}000$**, being $\$120{,}000 - \$45{,}000$ — a $38\%$ reduction.
> > - **D: $\$305{,}000$**, being $\$350{,}000 - \$45{,}000$ — a $13\%$ reduction.
> >
> > Total paid is $\$380{,}000$ against $\$528{,}000$ assessed: a $28\%$ saving.
> >
> > Two structural facts fall out of this. First, the **deductible is regressive within the tort layer** — it takes $100\%$ from B, $38\%$ from C and $13\%$ from D, so the burden falls hardest on the moderately injured. Second, the **average paid award rises**: before the reform the mean was $\$132{,}000$; after, among the two claims that pay, it is $\$190{,}000$. Anyone citing rising average awards as proof the reform failed has confused a truncation effect with a cost increase.
