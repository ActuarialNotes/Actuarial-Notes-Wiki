---
aliases:
  - Governance
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f2925afa316db99fca8be3d2b265eb18255fac4ed5ecb86b3de84a7e0b6e82be
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Governance.md
---
**Model governance** is the framework of policies, roles, controls and documentation by which an organization makes sure each model is fit for its intended purpose over its whole life — design, review, use, change and retirement — and keeps the [[Model Risk]] it carries identified, rated and managed. **Data governance** is its companion for the inputs: who owns each data source, how its quality is assured and who may use it for what. For the board-level direction of an insurer, see [[Corporate Governance]].

> $$\text{Model} = \text{input} + \text{processing} + \text{results}$$
>
> $$\begin{gathered} \text{Design and development} \\ \Downarrow \\ \text{Independent review} \\ \Downarrow \\ \text{Approval and deployment} \\ \Downarrow \\ \text{Monitoring and change} \\ \Downarrow \\ \text{Decommission} \end{gathered}$$
>
> $$\text{Risk rating} = g\big(\underbrace{\text{materiality}}_{\text{quantitative}},\ \underbrace{\text{complexity, use, data}}_{\text{qualitative}}\big)$$

- **What is governed.** [[ASOP 56 - Modeling (ASB - 2019)|ASOP 56]] (§2.8) and OSFI's Guideline E-23 both define a model by its three components — input, processing, results. A spreadsheet that turns assumptions into reserves meets that definition as surely as a gradient-boosted [[Predictive Analytics|predictive model]] does.
- **Proportionality.** E-23 asks for a lifecycle-wide, risk-based approach: each model gets a risk rating from measurable quantitative and qualitative criteria, and the rating sets how deep its review, how often its monitoring and who must approve it. Every model of non-negligible risk sits in an **inventory** with its ID, owner, rating and dependencies.
- **Roles.** E-23 names the model **owner** (coordinates development, deployment and monitoring), **developer** (designs, evaluates and documents), **reviewer** (tests conceptual soundness, inputs, methodology, assumptions and performance) and **approver**. Review must be independent of development. In three-lines language: developers and owners are the first line, an independent model-risk or validation function the second, internal audit the third.
- **Controls and evidence.** ASOP 56 §3.6 lists model testing, [[Model Validation|output validation]] (including [[Holdout Sample|hold-out data]]), review by another professional and reasonable governance and controls; its Appendix 1 gives examples such as access limits, reproducibility on rerun and change management. Documentation should let another qualified actuary assess the reasonableness of the work (§3.7). Data inputs follow [[Data Quality|ASOP 23]].

> [!example]- Governance Review of a Machine-Learning Lapse Model {Example}
> A life insurer's pricing actuary builds a gradient-boosted lapse model in a personal notebook. She reports a $0.81$ [[AUROC]] measured on the data used to fit it, signs it off herself, and the valuation team starts using its output as the lapse assumption in reserves. Six months later she retunes it after a rate change; no record is kept. The model is not in any inventory. Identify the governance failures and the fix for each.
>
> > [!answer]-
> > - **No inventory, no risk rating.** A model driving a reserve assumption is material; it should be inventoried, rated high and owned by a named model owner.
> > - **Validation on training data.** An AUROC on the fitting data measures fit, not prediction. Output validation needs hold-out or out-of-time data (ASOP 56 §3.6.2), and back-testing of predicted against actual lapses once in use.
> > - **No independent review.** The developer approved her own model. A reviewer independent of development must test conceptual soundness — are lapses after a rate change outside the training experience? — and an approver with authority sign off.
> > - **Use beyond intended purpose.** Built for pricing, it was adopted for valuation without a review for that use; the intended purpose and limitations must be documented and disclosed.
> > - **Uncontrolled change.** Retuning is a model change: version control, change log, re-review proportional to the change.
> >
> > The model may be good; the firm cannot show it, and that is the governance failure.

> [!example]- Centralized or Business-Line Modeling? {Example}
> A mid-size insurer has six actuarial teams, each maintaining its own projection models in different tools. The CRO proposes a central modeling unit. Evaluate the proposal.
>
> > [!answer]-
> > **For centralization:** one code base of reusable modules, so a correction is made once; uniform documentation, testing and change control; a clean inventory; less key-person risk.
> >
> > **Against:** distance from the business — slower response, developers who know the products less well than line actuaries — and a single point of failure if the central platform is wrong.
> >
> > **A defensible answer:** centralize the platform, standards and controls (and keep the second-line review independent of both), while the business-line actuaries remain model owners responsible for assumptions and use. That keeps accountability with the people who use the output and consistency with the people who build it.

> [!tip]- How it appears on the exam
> - **CP-312** (written): describe and apply governance best practice across the stages its syllabus lists — fit for purpose, design and development, model risk management, validation, maintenance and change management, documentation and disclosures — usually by diagnosing a case.
> - **CP-312**: describe, compare and evaluate organizational structures for model governance, including controls, roles and responsibilities — centralized against decentralized, who reviews whom, where approval sits.
> - **ATPA** (project-based assessment): perform data and model governance and write model documentation in an ethical context — data lineage and quality, the reasons a variable was excluded (fairness, [[Unfair Discrimination]]), limitations and monitoring.

> [!warning]- Exam traps
> - **Self-validation.** "The developer tested it thoroughly" is model testing, not independent review; an answer that lets the developer approve fails E-23's independence requirement.
> - **One-off validation.** Governance runs to decommission. A model validated at launch and never monitored or re-reviewed after a change is still a gap.
> - **Uniform rigour.** Applying the same review to every model ignores the risk-based approach; so does exempting a spreadsheet because it is "not a model".
> - **The wrong governance.** CFE-101's governance objective (agency, compliance, audit) is [[Corporate Governance]] — the board and its oversight functions — not this page's model lifecycle.
