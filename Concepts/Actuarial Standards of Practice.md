---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7df585f0e468458f3d76e668400b87c8d985538c5426e682d308048336c074a1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Standards of Practice.md
---

**The Actuarial Standards of Practice** (ASOPs) are the numbered standards issued by the U.S. Actuarial Standards Board (ASB) that describe what an actuary should do, consider and disclose when performing actuarial services in the United States. They bind members of the U.S.-based actuarial organizations — including the CAS and the [[American Academy of Actuaries]] — through Precept 3 of the Code of Professional Conduct. They are distinct from Canada's [[Standards of Practice]], issued for CIA members.

> $$\begin{aligned} &\text{Code, Precept 3} \\ &\Rightarrow \text{comply with applicable ASOPs} \\ &\Rightarrow \text{disclose any deviation} \end{aligned}$$

- **Who does what.** The ASB — an independent board created and staffed by the American Academy of Actuaries — promulgates the ASOPs; the Academy issues the U.S. Qualification Standards and non-binding practice notes (such as its practice note on P&C statements of actuarial opinion); the Actuarial Board for Counseling and Discipline enforces the Code. The ASOPs use "should" for what is normally required and allow deviation only where the actuary discloses it and the reason, as ASOP No. 41 requires.
- **The P&C financial-reporting ASOPs (Exam 6U).** The NAIC instructions require the SAO and its support to be consistent with ASOPs **No. 23** (data quality), **No. 36** (statements of actuarial opinion on P&C loss, LAE or other reserves — revised effective October 2024, with expanded disclosure on the risk of material adverse deviation), **No. 41** (actuarial communications) and **No. 43** (P&C unpaid claim estimates). **No. 20** governs discounting of P&C claim estimates, and **No. 21** governs work responding to or assisting auditors and examiners in financial audits, reviews and examinations.
- **ASOP No. 43 (Exam 7).** The actuary identifies the **intended purpose**, the **intended measure** (for example an actuarial central estimate), and the **scope** — gross, ceded or net; which claims; whether LAE is included; discounted or not — then selects methods and assumptions suited to the data and to changing conditions. For excess and reinsurance business that means working through the contract terms: retentions, limits, aggregate features, reinstatements and collectability. See [[Unpaid Claims]] and [[Reinsurance Reserving]].
- **Versus Canada.** CIA standards take legal force through the [[Insurance Companies Act]]'s reference to [[Accepted Actuarial Practice]]; ASOPs through the profession's Code and the regulators who require consistency with them. Both are principles-based, both permit disclosed deviation, and both sit above non-binding guidance ([[Educational Note|educational notes]] in Canada, practice notes in the U.S.).
- **Readings in the vault:** [[ASOP 12 - Risk Classification (ASB - 2005)|No. 12]] (risk classification), [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|No. 13]] (trending), [[ASOP 23 - Data Quality (ASB - 2016)|No. 23]], [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|No. 43]] and [[ASOP 56 - Modeling (ASB - 2019)|No. 56]] (modeling).

> [!example]- Which ASOP Applies? {Example}
> Identify the principal ASOP in each situation.
>
> 1. Claim data for one line cannot be reconciled to Schedule P.
> 2. Management asks for the reserve estimate on a discounted basis for a loss portfolio transfer.
> 3. The external auditor's actuary asks the Appointed Actuary to explain the tail factor selection.
> 4. The actuary signs the SAO and prepares the supporting Actuarial Report.
>
> > [!answer]-
> > 1. **No. 23, Data Quality** — review the data for reasonableness and consistency, and disclose the limitation and its effect; a material defect belongs in the opinion's relevant comments.
> > 2. **No. 20, discounting** — selection of payment pattern and discount rate — alongside **No. 43** for the undiscounted estimate beneath it.
> > 3. **No. 21, auditors and examiners** — cooperate and explain, without handing the judgement to the auditor.
> > 4. **No. 36** for the opinion, **No. 43** for the estimates behind it, and **No. 41** for the report and its disclosures.

> [!example]- Estimating an Excess Layer (ASOP 43 Scope) {Example}
> A reinsurer covers $\$4$ million excess of $\$1$ million per occurrence. One ground-up claim is case-reserved at $\$3.5$ million and is expected to settle at $\$6$ million. Compare the development of the ground-up claim with that of the layer.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Layer case} &= 3.5 - 1 \\
> > &= 2.5 \\[4pt]
> > \text{Layer ultimate} &= \min(6, 5) - 1 \\
> > &= 4.0 \\[4pt]
> > \text{Layer factor} &= 4.0 / 2.5 \\
> > &= 1.60 \\[4pt]
> > \text{Ground-up factor} &= 6 / 3.5 \\
> > &= 1.71
> > \end{align*}
> > $$
> >
> > With no upper limit the layer factor would be $5 / 2.5 = 2.00$: the retention **leverages** development, the limit **caps** it. That is why ASOP 43 asks the actuary to define the scope against the contract terms — a ground-up factor applied to an excess layer is wrong in both directions.
