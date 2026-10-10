---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:923167f6eb09e006779df43e65fa8b88ee7abaafca28d562e8ffb1fa71c82e60
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Professional Responsibilities of the Actuary.md
---

**The Professional Responsibilities of the Actuary** are the obligations an actuary owes — to the principal, to the users of the work, to regulators and to the public — when producing work others rely on. They are set by law and regulation, by the profession's code of conduct and qualification rules, and by its standards of practice; in [[Financial Reporting|financial reporting]] they fall above all on the actuary who values an insurer's claim liabilities and opines on them.

> $$\text{Law} \succ \text{Code of Conduct} \succ \text{Standards of Practice} \succ \text{Guidance}$$

- **The hierarchy.** Law prevails: an actuary required by law or regulation to use a method or assumption complies and discloses it. The code of conduct governs integrity, competence, qualification and conflicts. Standards of practice govern how the work is done and what is disclosed. Guidance — CIA [[Educational Note|educational notes]], U.S. practice notes — is non-binding but in practice expected.
- **Canada.** The [[Insurance Companies Act]] (and provincial Insurance Acts) require the board to appoint an [[Appointed Actuary]] who values the liabilities in accordance with [[Accepted Actuarial Practice]], reports to the directors, performs [[FCT]] and carries the [[Duty to Report]]. The CIA's Rules of Professional Conduct and [[Standards of Practice]] govern the work — [[Materiality]], [[Subsequent Events]], [[Model Risk|models]], [[Runoff|run-off and wind-up valuations]], the [[Statement of Actuarial Opinion|opinion]] and the [[Appointed Actuary's Report|report]]. OSFI's Guideline E-15 adds qualification and [[Peer Review|peer review]] expectations, and the [[Actuary and Auditor Relationship]] and [[Corporate Governance]] fix whom the actuary works with and answers to.
- **United States.** The Code of Professional Conduct, adopted by the U.S.-based actuarial organizations including the CAS, requires qualification under the [[American Academy of Actuaries|Academy]]'s U.S. Qualification Standards and compliance with the [[Actuarial Standards of Practice]]; the Actuarial Board for Counseling and Discipline enforces it. The NAIC instructions add the statutory layer ([[Appointed Actuary Responsibilities]]): appointment by the board, a defined "Qualified Actuary", an annual report to the board on the opinion's scope, an SAO consistent with ASOPs 23, 36, 41 and 43, the [[Actuarial Opinion Summary]] and [[Actuarial Report]], and a duty to notify when an opinion proves to have been in error.
- **Data modeling (U.S.).** The same Code applies to an actuary building or using a predictive model. Precept 1 requires skill and care, Precept 2 work only within the actuary's qualification, Precept 3 compliance with the standards of practice, Precept 4 communications that are clear and appropriate to their audience, Precept 8 reasonable steps so the work is not used to mislead, and Precept 9 protection of confidential information. The standards most often engaged are ASOP 23 (*Data Quality*: select appropriate data, review it for questionable values unless that is not necessary or practical, and disclose its limitations), ASOP 12 (*Risk Classification*: risk characteristics must be related to expected outcomes, though a cause-and-effect relationship need not be shown, and applicable law can limit the choice) and ASOP 56 (*Modeling*: the model must meet its intended purpose, model risk must be evaluated and mitigated, and it defines hold-out data and overfitting). See [[Insurance Data Regulation]] for the law around these.
- **The common core:** be qualified for the work; exercise independent judgement even when employed by the company; disclose reliance on others, deviations from standards and material limitations; and escalate rather than resign quietly when the numbers are wrong.

> [!example]- A U.S. Opinion Found to Be in Error {Example}
> In June, the Appointed Actuary learns that the claim data used for the year-end SAO omitted a block of open claims that existed at December 31. With the correct data, the carried reserve would have been below the actuary's range. What must happen?
>
> > [!answer]-
> > This is an **error** under the NAIC instructions: the opinion relied on data that was factually incorrect as of the balance sheet date, and would have been materially different with the correct data.
> >
> > 1. The actuary notifies the **board of directors or audit committee in writing within five business days** of determining the error.
> > 2. The insurer forwards the **amended opinion** to the **domiciliary commissioner** within five business days and gives the actuary a copy; if the actuary does not receive it in that time, the actuary notifies the commissioner.
> > 3. Had the effect not been clear at once, the company would have had **ten business days** to supply corrected data and support before the actuary went to the board and the commissioner directly.
> > 4. Statements made in a good-faith effort to comply carry **immunity**.
> >
> > Contrast: if the reserve had merely developed adversely because of events after December 31, the opinion would **not** be in error — it is judged on what was true at the valuation date.

> [!example]- The Same Deficiency in Two Countries {Example}
> Carried net claim liabilities are $\$470$ million. The actuary's range of reasonable estimates is $\$480$ million to $\$540$ million. Surplus is $\$150$ million. State the actuary's responsibilities in Canada and in the United States.
>
> > [!answer]-
> > The shortfall against the low end is $480 - 470 = \$10$ million, about $6.7\%$ of surplus.
> >
> > **Canada:** the amount carried does not make appropriate provision, so the opinion is **adverse** and must quantify the deficiency. The matter affects financial condition, so the [[Duty to Report]] escalation applies — CEO and CFO, then the directors, then [[OSFI]] if not addressed.
> >
> > **United States:** the SAO is a **Determination of Deficient or Inadequate Provision**, and must disclose the minimum amount the actuary considers reasonable, $\$480$ million. The risk-of-material-adverse-deviation comments state the materiality standard in dollars, the board hears the actuary's findings, and the regulator sees the deficiency in the Annual Statement filing.
> >
> > In neither country may the actuary sign a clean opinion on a number outside the range, or resolve the disagreement by resigning.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 10.2 covers how professional codes affect data modeling. Questions describe an actuary's conduct on a modeling project and ask which precept or standard applies, such as reviewing data under ASOP 23, using a rating variable related to expected cost under ASOP 12, or keeping a model's results from being presented misleadingly under Precept 8.
> - **Exams 6C and 6U:** Questions apply the hierarchy and the opinion requirements in each country, as in the examples above.

> [!warning]- Exam traps
> - **Causality is not required:** ASOP 12 requires a demonstrated relationship between a risk characteristic and expected outcomes, not proof of cause and effect. Law may still forbid a predictive characteristic.
> - **Law prevails:** Where law requires a method or forbids a variable, the actuary complies and discloses; the standards do not override it.

