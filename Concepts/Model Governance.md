---
aliases:
  - Governance
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c8eb73c4d0229759e1d189bf3d2202edccb7d738093b222202f7bef9bb440f1d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Governance.md
---
**Model Governance** is the framework of policies, roles, controls and documentation by which an organization makes sure each model is fit for its intended purpose over its whole life, and keeps the [[Model Risk|model risk]] it carries identified, rated and managed. **Data governance** is its companion for the inputs: who owns each data source, how its quality is assured and who may use it for what.

A model is governed through each stage of its life:

1. Design and development.
2. Independent review.
3. Approval and deployment.
4. Monitoring and change.
5. Decommission.

Governance runs to decommission. A model validated at launch and never monitored, or never re-reviewed after a change, is still a gap.

## What counts as a model

[[ASOP 56 - Modeling (ASB - 2019)|ASOP 56]] (§2.8) and OSFI's Guideline E-23 both define a model by its three components: input, processing and results. A spreadsheet that turns assumptions into reserves meets that definition as surely as a gradient-boosted [[Predictive Analytics|predictive model]] does, so exempting a spreadsheet because it is "not a model" is a gap.

## The risk-based approach

E-23 asks for a lifecycle-wide, risk-based approach. Each model gets a risk rating from measurable criteria:

- quantitative criteria, such as materiality;
- qualitative criteria, such as complexity, use and data.

The rating sets how deep the model's review is, how often it is monitored and who must approve it. Applying the same review to every model ignores this approach. Every model of non-negligible risk sits in an **inventory** with its ID, owner, rating and dependencies.

## Roles and responsibilities

E-23 names four roles:

- The **model owner** coordinates development, deployment and monitoring.
- The **model developer** designs, evaluates and documents the model.
- The **model reviewer** tests conceptual soundness, inputs, methodology, assumptions and performance.
- The **model approver** signs the model off.

Review must be independent of development. In three-lines language, developers and owners are the first line, an independent model-risk or validation function is the second, and internal audit is the third.

> [!example]- Why is this lapse model a governance failure, and what fixes each gap? {Example}
> A life insurer's pricing actuary builds a gradient-boosted lapse model in a personal notebook. She reports a $0.81$ [[AUROC]] measured on the data used to fit it and signs it off herself. The valuation team starts using its output as the lapse assumption in reserves. Six months later she retunes it after a rate change, and no record is kept. The model is not in any inventory.
>
> > [!answer]-
> > - A model driving a reserve assumption is material, so it should be in the inventory, rated high and owned by a named model owner.
> > - An AUROC on the fitting data measures fit, not prediction. Output validation needs hold-out or out-of-time data (ASOP 56 §3.6.2), and back-testing of predicted against actual lapses once in use.
> > - The developer approved her own model. A reviewer independent of development must test conceptual soundness, such as whether lapses after a rate change are outside the training experience, and an approver with authority must sign off.
> > - The model was built for pricing and adopted for valuation without a review for that use. Its intended purpose and limitations must be documented and disclosed.
> > - Retuning is a model change, so it needs version control, a change log and a re-review proportional to the change.
> > - The model may be good, but the firm cannot show it, and that is the governance failure.

## Controls and documentation

ASOP 56 §3.6 lists model testing, [[Model Validation|output validation]] (including [[Holdout Sample|hold-out data]]), review by another professional, and reasonable governance and controls. Its Appendix 1 gives examples such as access limits, reproducibility on rerun and change management. Documentation should let another qualified actuary assess the reasonableness of the work (§3.7). Data inputs follow [[Data Quality|ASOP 23]].

## Centralized and decentralized modeling

A central modeling unit and modeling within each business line are the two organizational structures to compare.

| | Centralized | Business-line |
| :--- | :--- | :--- |
| Strengths | One code base of reusable modules, so a correction is made once; uniform documentation, testing and change control; a clean inventory; less key-person risk | Developers close to the business, who know the products well and respond quickly |
| Weaknesses | Distance from the business; a single point of failure if the central platform is wrong | Different tools and standards in each team; corrections made many times |

> [!example]- A mid-size insurer has six actuarial teams, each maintaining its own projection models in different tools. Should it set up a central modeling unit? {Example}
> - Centralizing gives one code base, uniform documentation, testing and change control, a clean inventory and less key-person risk.
> - It also moves developers away from the business, so responses are slower and the developers know the products less well than line actuaries.
> - A defensible structure centralizes the platform, standards and controls, and keeps the second-line review independent of both.
> - The business-line actuaries remain model owners, responsible for assumptions and use.
> - Accountability then stays with the people who use the output, and consistency with the people who build it.

The governance of the board and its oversight functions (agency, compliance, audit) is [[Corporate Governance|corporate governance]], not the model lifecycle.

> [!trap] Letting the developer validate the model
> "The developer tested it thoroughly" describes model testing, not independent review. An answer that lets the developer approve their own model fails E-23's independence requirement.
