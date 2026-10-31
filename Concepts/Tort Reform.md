---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:932a22265060bc70b2d55b0515d764b4ab9f77c4014f96202c642d3a4317e3cd
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.7 p.96 (PDF 102); Ch.8 pp.133-134 (PDF 139-140); Ch.11 pp.204, 211 (PDF 210, 217), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Automobile Insurance Advisory Committee, Report on Fundamental Reform of the Alberta Automobile Insurance Compensation System (2020), pp.74, 185, sha256:2fb0e97ad65126b5f2bcd44abf9f1215a21f2240dc2be147e9df66f86e8a163e — https://www.casact.org/sites/default/files/2021-05/6C_Alberta_Auto_Reform.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tort Reform.md
---

**Tort Reform** is legislative change to the civil liability system aimed at reducing the cost, volatility or duration of [[Tort Litigation|tort claims]] — caps on damages, thresholds on the right to sue, deductibles, changes to limitation periods, and rules on costs, interest and expert evidence. In Canadian auto insurance it is the principal cost lever available to a government facing an affordability problem.

- **The standard measures:**
  - *Restricting access* — a [[Tort Threshold and Deductible|verbal threshold and deductible]] for pain and suffering, or abolishing the action entirely as in Quebec's public bodily injury scheme.
  - *Capping damages* — the judicially imposed non-pecuniary cap already limits Canadian awards; statutory caps go further for defined injury categories.
  - *Procedural* — shorter [[Limitation Period|limitation periods]], restrictions on expert reports, and changes to [[Prejudgment Interest]].
  - *Coordination* — deducting [[Collateral Benefits]] so the plaintiff is not compensated twice.
- **Savings are real but decay.** Canadian auto-insurance reforms that kept a tort component have typically produced an initial cost reduction followed by erosion, through judicial interpretation of the new boundary. Estimating the *durable* saving rather than the first-year saving is the actuarial skill being tested.
- **The trade-off is explicit and should be stated as such.** Reform lowers premiums by lowering compensation. Whether that is desirable depends on whether one values affordability of a compulsory product above full restitution of the seriously injured — an allocation question, not a technical one.
- **Distributional effect:** thresholds and deductibles bite hardest on the *moderately* injured, who lose all or most of their claim, while the catastrophically injured lose proportionally little.
- The reverse also happens: a reform can be **rolled back**, and courts can widen a definition.
- **Reflecting a reform in an unpaid-claims estimate** (Friedland). When a reform changes the legal environment, historical claims need to be restated as if they had occurred in the new legal environment: claims from years before the reform are multiplied by a reform adjustment factor of one minus the estimated reduction in claim cost, a year in which the reform took effect part-way through gets a pro rata factor, and years wholly after it are left alone (Ch.8, pp.133–134, the expected claims technique). In a frequency-severity projection the reform adjustment goes on the severities, beside the severity trend, while the frequencies are adjusted for frequency trend and rate level (Ch.11, pp.204, 211). A reform also undermines the development technique's assumption that historical development will be predictive, so the actuary considers other techniques or at least adjusts the selected development factors (Ch.7, p.96).

![[Media/Figures/Tort_Reform.svg|340]]

> [!example]- Estimating the Durable Saving {Example}
> A reform introduces a $\$40{,}000$ deductible on non-pecuniary awards. In the year after enactment, the insurer's bodily injury loss cost falls $22\%$. Three years later it is only $9\%$ below the pre-reform trend line.
>
> Explain the gap and say which figure belongs in a rate filing.
>
> > [!answer]-
> > The $22\%$ was never the durable saving. Three forces close the gap:
> >
> > 1. **Judicial interpretation.** Courts define which claims clear the threshold, and the boundary moves outward as case law accumulates.
> > 2. **Damage inflation of assessed awards.** A fixed $\$40{,}000$ deductible removes a shrinking *proportion* of a growing award. If awards grow $5\%$ per year, the deductible's bite falls by roughly $5\%$ per year in relative terms — arithmetic that makes erosion inevitable unless the deductible is indexed.
> > 3. **Behavioural adaptation.** Claims are pleaded and documented to clear the threshold; borderline claims that would once have settled small are now pursued.
> >
> > **For a rate filing, use the durable estimate**, not the first-year one, and disclose the basis. A filing built on $22\%$ prices a saving that no longer exists and produces inadequacy the moment the erosion is recognised. The defensible approach is to fit the post-reform experience directly once enough of it exists, and in the interim to select within a range and show the sensitivity.
> >
> > This is also the honest answer to a government asking "how much will this reform save?": a number, a decay assumption, and the statement that the decay assumption drives the answer.
