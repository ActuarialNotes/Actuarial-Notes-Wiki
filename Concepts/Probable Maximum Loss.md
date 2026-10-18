---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:c9760db9706a4dcf72de48b50dac69577325b3dc5cf8d14e790eb07ce2e26cc0
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
    - "OSFI, Guideline B-9 Earthquake Exposure Sound Practices (PML500, gross/net PML, models), definitions of PML, PML500, gross/net PML; models, sha256:e826e5e04f4c4170671288527ae7bebd0ace06ac940254e7d5ecd3adbe92f37e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/earthquake-exposure-sound-practices"
    - "OSFI, Minimum Capital Test Guideline (2026), ch.1 (100% minimum, 150% supervisory target), ch.1 100% minimum, 150% supervisory target, sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026"
    - "IRMI Glossary, 'probable maximum loss (PML)', entry, sha256:f5a52026910edc505ad6eca7e31f08994d2ab6ffd9b55e16685b3e6d2cd4e8ee — https://www.irmi.com/term/insurance-definitions/probable-maximum-loss"
    - "IRMI Glossary, 'maximum foreseeable loss (MFL)', entry, sha256:ac6a852f104fe279e0909ec10a83934963490673519be7caa5ceef6192b7151c — https://www.irmi.com/term/insurance-definitions/maximum-foreseeable-loss"
    - "IRMI Glossary, 'maximum possible loss (MPL)', entry, sha256:5216b2a4bb6e2fd2293be9003732c8549708b87e7e3be408b39de7a8a93e50e9 — https://www.irmi.com/term/insurance-definitions/maximum-possible-loss"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probable Maximum Loss.md
---

**The Probable Maximum Loss** (PML) is the loss an insurer's portfolio would suffer from a catastrophe of a specified return period — commonly the $1$-in-$500$ year event for [[Earthquake Exposure Risk Margin|earthquake]] under [[OSFI]]'s requirements. It is the central figure in catastrophe risk management: it sizes the reinsurance programme, drives the capital requirement, and is the number the board is asked to accept.

> $$\text{PML}_{p} = \text{VaR}_{p}(\text{Portfolio catastrophe loss})$$

- **In property underwriting the term is used per location.** Underwriters and loss control staff use probable maximum loss for one location: the largest loss expected there from a fire, stated in dollars or as a percentage of the location's total values. It sits between two neighbours: the maximum foreseeable loss (MFL), the worst loss likely from a single event, and the maximum possible loss (MPL), the worst that could possibly occur. DISC-RM uses it to determine the potential loss severity of a commercial property, and for business income it is the income lost over the longest probable [[Period of Restoration|period of restoration]] ([[Business Income Coverage]], [[COPE]]).
- **It is a modelled quantity, not an observed one.** PMLs come from catastrophe models built on hazard science (fault maps, ground motion, wind fields), an exposure database (location, construction, occupancy, height, age), a vulnerability function linking hazard intensity to damage, and the financial terms (limits, deductibles, reinsurance).
- **Return period language is often misread.** A $1$-in-$500$ event has a $0.2\%$ annual probability; over $30$ years the probability of at least one such event is $1 - 0.998^{30} \approx 5.8\%$. "Once in $500$ years" does not mean "not in our lifetime."
- **Gross and net PML are different questions.** Gross PML sizes the reinsurance programme; net PML — after reinsurance and after any reinstatement premiums — is what actually hits capital. OSFI's earthquake requirements test whether the insurer's financial resources cover the net exposure.
- **Model uncertainty is large.** Different vendor models produce materially different PMLs for the same portfolio, and all are sensitive to exposure data quality. Using a single model's output as a precise figure is a [[Model Risk]] failure; the defensible practice is multiple models, sensitivity testing, and disclosure of the basis.
- **Exposure data quality dominates.** A PML computed on unmapped or mis-coded locations is wrong regardless of the model's sophistication — one of the most common and least visible errors in catastrophe management.
- **The PML feeds [[FCT]] and [[ORSA]]**: the catastrophe scenario in the financial condition testing report is usually built from it, and the [[Internal Target Capital Ratio|internal target]] should be set so the ratio survives the net figure.

![[Media/Figures/Probable_Maximum_Loss.svg|340]]

> [!example]- Sizing a Catastrophe Programme From the PML {Example}
> An insurer's modelled earthquake PMLs are: $1$-in-$100$, $\$180$ million; $1$-in-$250$, $\$310$ million; $1$-in-$500$, $\$430$ million. Its reinsurance programme retains $\$40$ million and covers up to $\$350$ million. Capital available is $\$390$ million and minimum capital required under the [[MCT]] is $\$230$ million.
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
> > - **Buy the top layer.** Extending cover from $\$350$M to $\$430$M removes the $\$80$M excess exposure. The question is whether that layer's premium is worth the roughly $26$ points of post-event MCT ratio it protects.
> > - **Check reinstatements.** If the programme has limited reinstatements and a foreshock or a second event occurs, the analysis above is optimistic.
> > - **Check the model.** A single model's $1$-in-$500$ figure carries real uncertainty; a second model might put it at $\$550$ million, at which point the retained loss is $\$240$ million and the conclusion changes entirely.
> > - **Reinsurer credit.** A $\$310$ million recovery is only worth what the reinsurers pay. Their [[Credit Risk Margin|credit standing]] and any [[Concentration Risk|concentration]] among them is part of the assessment, and it matters most in exactly the scenario where every cedant is claiming at once.
