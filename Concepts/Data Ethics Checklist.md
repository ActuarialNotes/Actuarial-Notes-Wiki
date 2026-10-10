---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:961dc93fd5d54c61c4b6dd789d5e763f14acdff71f9c648dbd356ee91cf0a86f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Ethics Checklist.md
---

A **data ethics checklist** is a list of questions a data team works through at each stage of a project, from collecting data to running a model in production, so that the ethical risks of the work are discussed, decided and documented before they cause harm. It turns the principles of [[Data Ethics]] into prompts tied to specific steps; the best-known public example is **Deon**, DrivenData's default Data Science Ethics Checklist.

- **What a checklist is for:** Deon's authors state that the main benefit of a checklist is making sure important work is not overlooked under deadline pressure. Its items are prompts for discussion among people acting in good faith, not rules that dictate an action such as "remove variable X", and the discussions and decisions should be documented. Teams are expected to drop items that do not apply, mark them N/A, or write custom checklists for their domain. Deon leaves out pure statistical best practice so it can focus on what needs attention beyond it.
- **Origin:** Deon was built from items on several proposed checklists and was "heavily inspired" by Loukides, Mason and Patil's O'Reilly article "Of Oaths and Checklists". It comes with a list of real-world examples connected to each item.
- **A. Data collection:** informed consent (subjects opt in with a clear understanding of how their data will be used); collection bias; limiting exposure of personally identifiable information, for example by anonymizing or not collecting what the analysis does not need; and downstream bias mitigation, such as collecting protected-group status so results can be tested for bias.
- **B. Data storage:** data security (encryption at rest and in transit, access controls, access logs, up-to-date software); a way for a person to ask for their data to be removed; and a plan to delete data once it is no longer needed.
- **C. Analysis:** missing perspectives (engaging affected communities and subject matter experts); dataset bias (stereotypes, confirmation bias, imbalanced classes, omitted confounders); honest representation in visualizations, summary statistics and reports; privacy in analysis; and auditability, meaning the analysis is documented and reproducible.
- **D. Modeling:** proxy discrimination (the model does not rely on variables, or proxies for variables, that are unfairly discriminatory); fairness across groups, such as testing for different error rates; the effects of the metric being optimized; explainability of individual decisions; and communicating the model's limitations and biases.
- **E. Deployment:** monitoring and evaluation after release, including drift; a plan for redress if people are harmed; a way to turn the model off or roll it back; and preventing unintended use.

**Applying it to insurance.** Many items have a direct counterpart in the rules an insurer already works under ([[Insurance Data Regulation]]), and a checklist is where the team confirms them alongside the ethical questions the law leaves open:

- *Limit PII* and *data retention* match the Insurance Data Security Model Law's requirement of a retention and destruction schedule for nonpublic information, and *data security* matches its safeguards.
- *Proxy discrimination* and *fairness across groups* are the questions Colorado's SB21-169 requires some insurers to answer by testing, and the NAIC AI bulletin expects bias analysis as part of an AIS program. They are also where [[Unfair Discrimination]] and [[Proxy Discrimination|proxy discrimination]] are caught.
- *Downstream bias mitigation* raises a real tension: testing outcomes by race or sex needs that information, which insurers often do not collect, and Colorado's law states that it does not require insurers to collect it.
- *Monitoring* matches the bulletin's attention to model drift, and *redress* matches the FCRA's adverse action notice and dispute rights.
- *Honest representation* is also Precept 8 of the actuaries' Code of Professional Conduct, which bars letting one's work be used to mislead ([[Professional Responsibilities of the Actuary]]).

> [!example]- A Claims Fraud Triage Model Through Deon {Example}
> An insurer is building a model that scores every new auto claim for fraud; claims above a threshold are sent to the special investigations unit, which delays payment. The training data are past claims labeled "fraud" if the unit referred them for prosecution. Inputs include the claimant's ZIP code, phone carrier, the number of prior claims and free-text adjuster notes. Which checklist items does this raise, and what should the team do?
>
> > [!answer]-
> > - **C.2 Dataset bias:** The label is "referred for prosecution", which reflects where investigators looked in the past, not where fraud was. A model trained on it can learn and repeat past investigation patterns. The team should examine how claims came to be investigated.
> > - **D.1 Proxy discrimination:** ZIP code and phone carrier may stand in for race or income. The team should ask whether each variable is related to fraud or only to who was investigated.
> > - **D.2 Fairness across groups:** Compare false positive rates across groups. A legitimate claimant who is wrongly flagged has payment delayed, so the cost of a false positive falls on the customer.
> > - **D.4 Explainability and E.2 Redress:** An adjuster should be able to say why a claim was referred, and a claimant whose claim is delayed needs a route to have it reviewed.
> > - **C.4 Privacy in analysis:** Adjuster notes can hold health and other sensitive details; use only what the model needs.
> > - **E.1 Monitoring:** Track referral rates and fraud confirmed by group after launch.
> >
> > Each discussion and decision is documented. The checklist does not by itself say to drop ZIP code; it makes sure the team decides deliberately and can explain the decision.

> [!example]- Which Section Does Each Concern Belong To? {Example}
> Assign each concern to Deon's sections A (collection), B (storage), C (analysis), D (modeling) or E (deployment).
>
> 1. A telematics app records precise location every second, though the rating variables use only speed and braking.
> 2. A chart for the board starts its loss ratio axis at 60% to make a small improvement look large.
> 3. A pricing model is deployed with no way to revert to the old rating plan if it misbehaves.
> 4. Former policyholders' trip data are kept indefinitely after their policies end.
> 5. A model is tuned only to maximize lift, with no look at how its errors fall on different groups.
>
> > [!answer]-
> > 1. **A, limit PII exposure:** collect only what the analysis needs.
> > 2. **C, honest representation:** visualizations must represent the data honestly.
> > 3. **E, roll back:** there must be a way to turn off or roll back a model in production.
> > 4. **B, data retention plan:** data should be deleted once no longer needed.
> > 5. **D, metric selection and fairness across groups:** consider the effects of optimizing one metric and test results across groups.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 10.3 covers applying ethics checklists to insurance data modeling. Questions describe a project step and ask which checklist question applies, or give a concern and ask at which stage of the project it should be raised.
> - Questions combine this with [[Data Ethics]] principles and with [[Insurance Data Regulation]], asking what goes beyond legal compliance.

> [!warning]- Exam traps
> - **A checklist is not a verdict:** Its items prompt a discussion and a documented decision. It does not tell the team which variable to remove or certify the model as fair.
> - **Ticking boxes once:** Deployment items, such as monitoring, redress and rollback, apply after launch. A checklist completed only at the start misses section E.
> - **Collection vs. modeling:** Consent and PII limits are collection questions; proxy variables and fairness tests are modeling questions. Match the concern to the stage where it is decided.
> - **One checklist for every project:** Deon expects teams to drop items that do not apply and add domain-specific ones. An insurer adds items for its own rules, such as rating law and adverse action notices.
