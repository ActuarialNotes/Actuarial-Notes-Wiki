---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:db4595ab31e9beb37b501f240188fc060403d463e851d4b3d5488a889f1477f0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Standards of Practice.md
---
![[Media/Figures/Standards_of_Practice.svg|340]]

The **Standards of Practice** are the rules the [[Canadian Institute of Actuaries (CIA)]] sets for how actuarial work in Canada must be done. Compliance is mandatory for CIA members, and the [[Insurance Companies Act]]'s requirement to value liabilities in accordance with [[Accepted Actuarial Practice]] gives them legal force for federally regulated insurers.

They sit in a hierarchy of professional obligation:

1. The CIA's **Rules of Professional Conduct**: integrity, competence, disclosure of conflicts and cooperation with other actuaries.
2. The **Standards of Practice**:
   - the **General Standards**, which apply to all practice;
   - the **Practice-Specific Standards**, including those for insurance contract valuation.
3. **[[Educational Note|Educational notes]]**: non-binding guidance on how to comply.

The standards are principles-based. They tell the actuary what must be considered and disclosed, not which development factor to select, so the burden of judgement, and of documenting it, falls on the actuary.

## General Standards

The General Standards cover the work an actuary does in any practice area: the appropriateness of the work to its use, the sufficiency and reliability of the **data**, the **assumptions and methods** and the basis for selecting them, [[Materiality|materiality]], [[Subsequent Events|subsequent events]], approximations, **reliance on others**, and **communication**. A report must state its user, its purpose and its limitations.

> [!example]- Claim data for one line can't be reconciled to the general ledger, with a $\$4$ million unexplained difference on $\$300$ million of liabilities. What does the data standard require? {Example}
> - The standard requires the actuary to assess whether the data are sufficient and reliable for the purpose.
> - The difference is $4/300 = 1.3\%$ of the liabilities, which is likely immaterial.
> - The actuary must still investigate it, form a conclusion and disclose it.
> - Ignoring it because it is small is not the same as concluding it is immaterial, and only the second satisfies the standard.

> [!example]- A court decision after the valuation date, before the report is signed, widens a benefit definition. Is the liability adjusted or only disclosed? {Example}
> - This is a [[Subsequent Events|subsequent event]].
> - The decision provides evidence of conditions that existed at the valuation date, so the liability must be **adjusted**, not merely disclosed.
> - A subsequent event that creates a new condition after the valuation date would be disclosed instead.

Reliance on another actuary's work, such as a reserve estimate for a small subsidiary prepared by its own actuary, is permitted. The actuary must be satisfied the work is appropriate for the purpose and must disclose the reliance in the [[Appointed Actuary's Report]] and the opinion. The [[Appointed Actuary|appointed actuary]] remains responsible for the opinion given.

## Practice-Specific Standards for P&C insurance

The Practice-Specific Standards for P&C insurance address the valuation of [[Insurance Contract Liabilities|insurance contract liabilities]] under [[IFRS 17]]: the measurement of [[Fulfilment Cash Flows|fulfilment cash flows]], the [[Risk Adjustment for Non-Financial Risk|risk adjustment]], [[IFRS 17 Discount Rates|discount rates]], and the [[Appointed Actuary|appointed actuary]]'s reports and opinions.

## Deviation and enforcement

An actuary may depart from the standards where circumstances justify it, provided the deviation and its reason are stated. Silent deviation is a discipline matter. Enforcement runs through the CIA's discipline process and, for an [[Appointed Actuary|appointed actuary]], through [[OSFI]], which can find the work inadequate and require it to be redone.

> [!trap] Changing an assumption without saying so
> A tail factor selected materially differently from last year's, with no explanation in the report, is a clear failure of the communication standard. A material assumption change must be identified, its effect on the liability quantified and the reason given, so the reader can separate the effect of experience from the effect of the actuary's own judgement.
