---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5584c8df01b92734890ec5a4cb42380c5f832e25823342b2ca89078bf50426da
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Governance.md
---

**Insurance Governance** is the system by which an insurer is directed and controlled — board oversight, independent audit and risk functions, internal controls and [[Enterprise Risk Management|enterprise risk management]] — together with the U.S. state requirements that make it visible to regulators: the Model Audit Rule, the Own Risk and Solvency Assessment (ORSA), the Corporate Governance Annual Disclosure (CGAD) and holding-company risk reporting.

> $$\begin{gathered} \text{Premium} > \$500\text{M} \\ \Downarrow \\ \text{ORSA} + \text{internal audit function} \\ + \text{ management's ICFR report} \\ + \geq 75\% \text{ independent audit committee} \end{gathered}$$

- **Premium** is annual direct written plus assumed premium (the models differ in detail on affiliated business). ORSA and internal audit also apply to any insurer in a **group** above $\$1$ billion.
- **No single governance code.** U.S. regulators layered process and disclosure requirements, mostly through the Solvency Modernization Initiative ([[History of Solvency Regulation]]):
  - **Model Audit Rule** — the auditor answers to the audit committee, independence scales with size, management reports on internal control, and an internal audit function has direct access to the board ([[Sarbanes-Oxley]]).
  - **Risk Management and ORSA Model Act** (effective 2015) — maintain a risk-management framework, conduct an ORSA at least annually, and file a confidential **ORSA Summary Report** with the lead state: the framework, the insurer's assessment of its risk exposures under normal and stressed conditions, and group risk capital with a prospective solvency assessment. The idea is the one on the vault's [[ORSA]] page (written for Canada); the U.S. form is a filing to the lead state.
  - **CGAD** (NAIC models adopted 2014) — a confidential annual disclosure, due June 1, of the governance framework, board and committee practices, policies for senior management (suitability, code of conduct, compensation, succession) and how the board oversees critical risk areas. It sets no standard: it makes the insurer describe and defend its own.
  - **Holding-company act** — Form A (acquisition of control), Form B (registration), Form D (prior notice of material affiliate transactions) and, since 2010, **Form F**, the ultimate controlling person's report on enterprise risks outside the insurers that could harm them.
- **Examination.** Risk-focused financial examinations assess the board, management oversight and the risk-management system, and a regulator can order governance deficiencies corrected ([[Solvency Monitoring]]).
- **Governing the regulators.** Most commissioners are appointed by the governor; about a dozen states elect theirs. The NAIC is governed by those commissioners, its models bind no one until enacted, and accreditation is the peer review that keeps baseline solvency standards uniform ([[State and Federal Insurance Regulation]]).
- Compare the Canadian treatment on [[Corporate Governance]].

> [!example]- Governance Review of a Mid-Size Mutual {Example}
> A mutual P&C insurer writes $\$700$ million of direct and assumed premium. Four of its seven audit committee members are independent. The head of internal audit reports only to the CEO and has not met the audit committee this year. The ORSA Summary Report is drafted by consultants and tabled at the board without discussion. The chief risk officer reports to the CFO. Identify the problems.
>
> > [!answer]-
> > **Breaches of the models** (as enacted in the domiciliary state):
> >
> > - **Audit committee independence.** $4/7 = 57\%$, below the $75\%$ required above $\$500$ million.
> > - **Internal audit.** The function must be organisationally independent, its head must have direct and unrestricted access to the board, and it must report to the audit committee at least annually. Reporting solely to the CEO fails; a dual line to the CEO and the audit committee would be acceptable.
> >
> > **Weaknesses an examiner will pursue:**
> >
> > - **ORSA ownership.** The ORSA is the insurer's *own* assessment; the summary report is attested by the CRO or the executive responsible for ERM, and a board that never discusses it cannot show it uses it.
> > - **CRO under the CFO.** Not prohibited, but the CGAD must describe it and the examiner will test whether risk management can challenge the finance function it reports to.
> >
> > The pattern is typical: the numeric thresholds are easy to fix; the ownership and challenge failures are what the examination report will dwell on.
