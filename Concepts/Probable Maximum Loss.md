---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fa18605849440ff94d60da0e8cbf035062ea974f7d6d2fc3128848bdbd3cb9a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probable Maximum Loss.md
---

**The Probable Maximum Loss** (PML) is the loss an insurer's portfolio would suffer from a catastrophe of a specified return period — commonly the $1$-in-$500$ year event for [[Earthquake Exposure Risk Margin|earthquake]] under [[OSFI]]'s requirements. It is the central figure in catastrophe risk management: it sizes the reinsurance programme, drives the capital requirement, and is the number the board is asked to accept.

> $$\text{PML}_{p} = \text{VaR}_{p}(\text{Portfolio catastrophe loss})$$

- **It is a modelled quantity, not an observed one.** PMLs come from catastrophe models built on hazard science (fault maps, ground motion, wind fields), an exposure database (location, construction, occupancy, height, age), a vulnerability function linking hazard intensity to damage, and the financial terms (limits, deductibles, reinsurance).
- **Return period language is often misread.** A $1$-in-$500$ event has a $0.2\%$ annual probability; over $30$ years the probability of at least one such event is $1 - 0.998^{30} \approx 5.8\%$. "Once in $500$ years" does not mean "not in our lifetime."
- **Gross and net PML are different questions.** Gross PML sizes the reinsurance programme; net PML — after reinsurance and after any reinstatement premiums — is what actually hits capital. OSFI's earthquake requirements test whether the insurer's financial resources cover the net exposure.
- **Model uncertainty is large.** Different vendor models produce materially different PMLs for the same portfolio, and all are sensitive to exposure data quality. Using a single model's output as a precise figure is a [[Model Risk]] failure; the defensible practice is multiple models, sensitivity testing, and disclosure of the basis.
- **Exposure data quality dominates.** A PML computed on unmapped or mis-coded locations is wrong regardless of the model's sophistication — one of the most common and least visible errors in catastrophe management.
- **The PML feeds [[FCT]] and [[ORSA]]**: the catastrophe scenario in the financial condition testing report is usually built from it, and the [[Internal Target Capital Ratio|internal target]] should be set so the ratio survives the net figure.

> [!example]- Sizing a Catastrophe Programme From the PML {Example}
> An insurer's modelled earthquake PMLs are: $1$-in-$100$, $\$180$ million; $1$-in-$250$, $\$310$ million; $1$-in-$500$, $\$430$ million. Its reinsurance programme retains $\$40$ million and covers up to $\$350$ million. Capital available is $\$390$ million and the base solvency buffer is $\$230$ million.
>
> Assess the adequacy of the programme.
>
> > [!answer]-
> > **At the $1$-in-$500$ level the programme is exhausted.** The insurer retains:
> >
> > $$\begin{align*}
> > \text{Net loss} &= \$40\text{M} + (\$430\text{M} - \$350\text{M}) \\
> > &= \$40\text{M} + \$80\text{M} \\
> > &= \$120\text{M}
> > \end{align*}$$
> >
> > **Effect on the capital ratio**, taking the loss after tax at roughly $\$88$ million:
> >
> > $$\begin{align*}
> > \text{MCT} &= \frac{\$390\text{M} - \$88\text{M}}{\$230\text{M}} \\
> > &= 131\%
> > \end{align*}$$
> >
> > **The insurer survives** — above the $100\%$ minimum — **but falls below the $150\%$ supervisory target**, with an earthquake to pay for, a damaged region, likely reinstatement premium to find, and no easy access to capital markets.
> >
> > **What to consider:**
> >
> > - **Buy the top layer.** Extending cover from $\$350$M to $\$430$M removes the $\$80$M excess exposure. The question is whether that layer's premium is worth the $17$ points of post-event MCT ratio it protects.
> > - **Check reinstatements.** If the programme has limited reinstatements and a foreshock or a second event occurs, the analysis above is optimistic.
> > - **Check the model.** A single model's $1$-in-$500$ figure carries real uncertainty; a second model might put it at $\$550$ million, at which point the retained loss is $\$240$ million and the conclusion changes entirely.
> > - **Reinsurer credit.** A $\$310$ million recovery is only worth what the reinsurers pay. Their [[Credit Risk Margin|credit standing]] and any [[Concentration Risk|concentration]] among them is part of the assessment, and it matters most in exactly the scenario where every cedant is claiming at once.
