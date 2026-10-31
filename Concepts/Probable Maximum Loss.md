---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:bdd8ef5becff418f6545a40d8f8022f4b9813d261ea99e68bd591b38b25285ed
  sources:
    - "OSFI, Guideline B-9 Earthquake Exposure Sound Practices (2013), current web text: Principle 2 data quality, Principle 3 models (significant uncertainty, wide range of results from model to model, consider more than one model), Principle 4 PML estimates (data quality, non-modelled exposures, model uncertainty, multiple regions), financial resources against gross PML, FCT earthquake scenario, definitions (PML as return period loss for probabilistic models; gross and net PML), sha256:0421fe099975731fb9a3d9d47c1b484be4fd79f8891b7c54c5edc3c15efc03fd — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/earthquake-exposure-sound-practices-guideline-2013"
    - "OSFI, Earthquake Exposure Sound Practices — Letter (2013), Appendix A (PML250 and PML500 at return periods, gross and net PML definitions), sha256:64484c9bebbdb759294daf5cf7cadcb550b00028793dc69e2441c3c5567dbade — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/earthquake-exposure-sound-practices"
    - "IRMI Glossary, 'probable maximum loss (PML)' (a property loss control term: the maximum loss expected at a given location from a fire, in dollars or as a percentage of total values), sha256:571dfca5c63cde057b827d8cb7f28c3b8071793b5076b6dcf5d191a89e3da739 — https://www.irmi.com/term/insurance-definitions/probable-maximum-loss; 'maximum foreseeable loss (MFL)' and 'maximum possible loss (MPL)' entries, same site, read this run"
    - "SOA, An Overview of Catastrophe Modeling Output (GI-301 study note, May 2025), pp.1-3 (printed): OEP/AEP/CEP; AAL = sum p_i L_i; independent Bernoulli events at most once; OEP(L_i) = 1 - prod(1 - p_j); return period = 1/OEP; RPL = PML; TVaR the average loss above a return period; ground-up, gross, net and final net (plus reinstatements) losses; demand surge; secondary uncertainty, sha256:e3826f24e743ccb668df1033fd90465e42c77f1c751682e0805edd748c2ce95e — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-301-study-note-catastrophe-output.pdf"
    - "Lloyd's Market Association, Catastrophe Modelling: Guidance for Non-Catastrophe Modellers (June 2013), PDF pp.7-9 (ELT from the financial module; EP curve; OEP and AEP; VaR and TVaR; ELT; CoV; ground-up, gross, net and final net losses; RMS weighting academic models into a blended frequency), sha256:a09d4b5333c2e7e3a2f0c7b28a1c083cf66f274ef65f79b07e7d876bfb88fbb9 — https://web.actuaries.ie/sites/default/files/erm-resources/catastrophe_modelling_guidance_for_non_catastrophe_modellers.pdf"
    - "CAS Exam 8 Fall 2012 — sample answers and examiner's report, Q9(b), PDF p.51 (1/25 = 0.04; linearly interpolate; eyeballing the graph and treating the curve as discrete (selecting 5M or 10M) are errors), sha256:f0a8a4e1060ad54d4a69208dd574d53dbcafc29ceddbabe7be0a2da2e0f9232b — https://www.casact.org/sites/default/files/2021-03/f12-8.pdf"
    - "CAS Exam 8 Fall 2013 — sample answers and examiner's report, Q24(a), PDF pp.90-91 (1/250 = 0.004; linear interpolation between OEP points 0.002 and 0.005), sha256:8e644179a5722b0d1968c3d9caa38514a01ca4cded397441dd1d9af00d3cc9dc — https://www.casact.org/sites/default/files/2021-03/13-8.pdf"
    - "CAS Exam 8 Fall 2015 — sample answers and examiner's report, Q22(b), PDF p.94 (discrete distribution: select the loss amount rather than interpolate), sha256:02718b9e95a9c4fc0203158467fe573920d774e0498460bb2dee0d6b4db1a0df — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_15-8.pdf"
    - "CAS Exam 8 Fall 2018 — sample answers and examiner's report, Q16(a), PDF pp.86-87 (interpolate the exceedance probabilities; common mistakes: using return period years for interpolation), sha256:7993ff15f4c6aae538bde337a57fbbf775aab27f3a232b8a828458ac52a330c4 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf"
    - "OSFI, Minimum Capital Test Guideline (2026), ch.1 (100% minimum, 150% supervisory target), sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026 (carried from C-002, not re-read)"
    - "OSFI Guideline A-4 (December 2017), p.3 (minimum capital required for P&C), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf (carried from C-002, not re-read)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probable Maximum Loss.md
---

**The Probable Maximum Loss** (PML) is the loss an insurer's portfolio would suffer from a catastrophe of a specified return period — commonly the $1$-in-$500$ year event for [[Earthquake Exposure Risk Margin|earthquake]] under [[OSFI]]'s requirements. It is the central figure in catastrophe risk management: it sizes the reinsurance programme, drives the capital requirement, and is the number the board is asked to accept.

> $$\text{PML}_{p} = \text{VaR}_{p}(\text{Portfolio catastrophe loss})$$

- **In property underwriting the term is used per location.** Underwriters and loss control staff use probable maximum loss for one location: the largest loss expected there from a fire, stated in dollars or as a percentage of the location's total values. It sits between two neighbours: the maximum foreseeable loss (MFL), the worst loss likely from a single event, and the maximum possible loss (MPL), the worst that could possibly occur. DISC-RM uses it to determine the potential loss severity of a commercial property, and for business income it is the income lost over the longest probable [[Period of Restoration|period of restoration]] ([[Business Income Coverage]], [[COPE]]).
- **It is a modelled quantity, not an observed one.** PMLs come from catastrophe models built on hazard science (fault maps, ground motion, wind fields), an exposure database (location, construction, occupancy, height, age), a vulnerability function linking hazard intensity to damage, and the financial terms (limits, deductibles, reinsurance).
- **Return period language is often misread.** A $1$-in-$500$ event has a $0.2\%$ annual probability; over $30$ years the probability of at least one such event is $1 - 0.998^{30} \approx 5.8\%$. "Once in $500$ years" does not mean "not in our lifetime."
- **Reading a PML between the tabulated points.** An exceedance probability curve is a continuous curve, and a table or graph gives only some of its points. To read the PML at a return period that isn't listed, convert the return period to an exceedance probability ($1/\text{RP}$) and interpolate linearly *in exceedance probability* between the two bracketing points; don't pick the nearer plotted point, and don't interpolate on the return-period years — CAS's examiners list each of these as a common mistake. For example, with points at exceedance probability $0.010$ (loss $\$40$M) and $0.004$ (loss $\$70$M), the $1$-in-$200$ PML at $0.005$ is $40 + \frac{0.010 - 0.005}{0.010 - 0.004}(70 - 40) = \$65$M; interpolating on return periods $100$ and $250$ would give $40 + \frac{200 - 100}{250 - 100}(30) = \$60$M instead. The exception is a *discrete* loss distribution, such as a short list of events each with a fixed loss: there the loss at a given probability is the step the probability falls on, the losses in between can't occur, and interpolating is wrong (the reading in the [[Catastrophe Model Output]] example).
- **Gross and net PML are different questions.** Gross PML sizes the reinsurance programme; net PML — after reinsurance — is what actually hits capital. OSFI's earthquake requirements test whether the insurer's financial resources cover the net exposure.
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
