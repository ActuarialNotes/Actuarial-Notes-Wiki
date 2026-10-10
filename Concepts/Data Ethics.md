---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:b6d793e731a29f6fe6cf8b46934f9826b80d8ec1328a4fde2721158f621b8ad8
  sources:
    - "DrivenData, Deon default Data Science Ethics Checklist (checklist.yml), sections A-E, items A.1-E.4, sha256:d1d2681923bba6f52c2900bae79d61e4ebe1a5ae8c1d19274b69a915277e4631 — https://raw.githubusercontent.com/drivendataorg/deon/main/deon/assets/checklist.yml"
    - "NAIC Insurance Data Security Model Law (#668, 4th Qtr 2017), §4B-I, §5D, §6A, §9A(1), sha256:761e268abebbe55d4612b406d1ea1cfcba23b86264da2255ef15134da601e45f — https://content.naic.org/sites/default/files/model-law-668.pdf"
    - "29 CFR §1607.4(D) (Cornell LII), four-fifths rule, sha256:82e07c3127d8ea1907eccc1e0acef7832201cfddf9753055a7933af7e9338f33 — https://www.law.cornell.edu/cfr/text/29/1607.4"
    - "CAS Statement of Principles Regarding P&C Insurance Ratemaking (1988; reinstated May 2021 for U.S. reference), Principle 4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "Colorado SB21-169 as signed (C.R.S. 10-3-1104.9), (1), (3)(b), (6), (7)(a), (8)(b), PDF pp.2-8, sha256:7fda1f5b30f27b3908e2f2f35e008babcf71235bbfcb905fb7d4627174a5942b — https://leg.colorado.gov/sites/default/files/2021a_169_signed.pdf"
    - "15 U.S.C. §6802 (Cornell LII), (a)-(b), sha256:3fca2e8411b1bad536f5fe8ef6f197c521f95a16ecc96af2419d6af0a039dc51 — https://www.law.cornell.edu/uscode/text/15/6802"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Ethics.md
---

**Data Ethics** is the set of principles that govern how data about people are collected, used and shared, so that an analysis is lawful and also respects privacy, consent, transparency, fairness and accountability. For an insurer it applies at every step of a modelling project, from deciding which data to gather to how a model's outputs affect policyholders, and an ethics checklist is the practical tool for applying it step by step.

> $$R_g = \frac{\bar{P}_g / \bar{P}}{\bar{L}_g / \bar{L}}$$

> $$\text{AIR} = \frac{p_{\text{protected}}}{p_{\text{reference}}}$$

- **Symbols:** In the first block, $\bar{P}_g$ and $\bar{L}_g$ are the average premium and average loss cost of group $g$, and $\bar{P}$ and $\bar{L}$ are the portfolio averages. A ratio $R_g$ near 1 means the group's premium is in line with its expected cost, and a ratio well above 1 means it pays more than its losses support. In the second block, the adverse impact ratio compares the rate at which a protected group receives a favourable outcome, such as a discount or an acceptance, with the rate for a reference group.
- **Privacy:** Personal data should be collected only for a stated purpose, limited to what that purpose needs, kept secure, and retained no longer than necessary. Location traces, health information and data on household members are especially sensitive.
- **Consent:** People should know what data are collected about them and agree to its use. Consent given for one purpose, such as claims handling, does not automatically cover another, such as marketing or pricing.
- **Transparency:** Policyholders, regulators and internal reviewers should be able to learn which data a decision used and, at an appropriate level, why it came out as it did. This connects data ethics to [[Explainability|explainability]] and to the right to correct inaccurate data.
- **Fairness:** A model should not produce [[Unfair Discrimination|unfair discrimination]], meaning different treatment of risks with the same expected cost or treatment based on a prohibited characteristic. Leaving a protected characteristic out of the model is not enough, because a correlated variable can stand in for it as [[Proxy Discrimination|proxy discrimination]], and [[Credit-Based Insurance Scoring|credit-based insurance scores]] are the best-known contested case.
- **Accountability:** Someone must own each model and its outcomes, the decisions and tests must be documented, and affected people need a way to question a result. [[Model Governance|Model governance]] and the profession's codes and standards, discussed on [[Professional Responsibilities of the Actuary]], supply this structure.
- **Ethics checklists:** A checklist turns the principles into questions asked at each stage of the project ([[Data Ethics Checklist]]). At collection, it asks about consent, the data's purpose and possible collection bias. At storage, it asks about security and retention. At analysis, it asks whether any groups are missing from the data and whether results are reported honestly. At modelling, it asks about proxy variables and fairness across groups. At deployment, it asks about monitoring, redress and how a harmful model would be withdrawn.
- **Regulation as the floor:** Laws and regulations set the minimum, such as limits on rating variables in [[Risk Classification Restrictions|risk classification restrictions]] and privacy statutes ([[Insurance Data Regulation]]). Ethical practice asks whether a use is right even where it is legal, because a use that customers or regulators see as unfair can harm the insurer's reputation and lead to new restrictions.

> [!example]- A Telematics Pricing Model Through a Checklist {Example}
> An insurer builds a [[Usage-Based Insurance|usage-based]] auto discount from a phone app that records speed, braking, mileage, time of day and location. The draft model includes a night-driving variable. For policyholders in the lowest-income territories, the average premium relativity is 1.14 and the average loss cost relativity is 1.05. With the night-driving variable removed, their premium relativity is 1.07, their loss cost relativity is still 1.05, and the model's accuracy drops only slightly. Walk the model through an ethics checklist.
>
> > [!answer]-
> > Each stage of the checklist raises its own question.
> >
> > - **Collection and consent:** Participants should be told which data the app records and that they will be used for pricing. Precise location is not needed to measure speed and braking, so the app should keep only what the rating variables use.
> > - **Storage:** Trip data should be secured, kept no longer than the rating period needs, and shared with no one beyond the stated purpose.
> > - **Fairness:** Compare the premium ratio with the loss ratio for the group.
> >
> > $$
> > \begin{align*}
> > R_{\text{with}} &= \frac{1.14}{1.05} \\
> > &= 1.086 \\
> > R_{\text{without}} &= \frac{1.07}{1.05} \\
> > &= 1.019
> > \end{align*}
> > $$
> >
> > With the night-driving variable, the group pays about 8.6% more than its loss costs support, which suggests the variable is acting partly as a proxy for shift work and income. Without it, the gap falls to about 1.9%.
> > - **Transparency and accountability:** The insurer should tell participants which behaviours affect the discount, document the fairness test and the decision to drop or keep the variable, and name who monitors the model after launch.
> >
> > The cost in accuracy is small and the fairness gain is large, so dropping the variable, or replacing it with one closer to the cause of loss such as hard braking at night, is the defensible choice.

> [!example]- Screening Discount Outcomes {Example}
> After launch, 38% of participants in a protected group earn a discount of at least 10%, against 55% in the reference group. Compute the adverse impact ratio and interpret it using a four-fifths threshold.
>
> > [!answer]-
> > The ratio compares the two rates of the favourable outcome.
> > $$
> > \begin{align*}
> > \text{AIR} &= \frac{0.38}{0.55} \\
> > &= 0.691
> > \end{align*}
> > $$
> > The ratio is below 0.8, so the screen flags the result for review. It does not prove unfair discrimination, because the groups may genuinely differ in how they drive. The next step is to compare loss costs, as in the first example, and to check which variables drive the difference. The four-fifths threshold comes from U.S. employment practice and is used here only as a screening heuristic.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Questions give a data project, often a pricing, underwriting or claims model, and ask which ethical principle a practice violates, such as using data beyond the purpose consented to or a variable that acts as a proxy. Others ask which checklist question applies at a given stage of the project, or what the analyst should do next. The same topic covers regulations and professional codes and the societal impact of credit-based insurance scores, so questions often combine them.
> - **Applied questions:** Expect scenario questions on telematics, external data and automated claims decisions, where the right answer balances predictive value against privacy and fairness rather than rejecting the data outright.

> [!warning]- Exam traps
> - **Removing the protected variable is not enough:** A model without race, religion or another protected characteristic can still discriminate through correlated variables. Fairness is tested on the model's outcomes by group, not on its list of inputs.
> - **Legal is not the same as ethical:** A data use can be permitted by law and still violate consent or transparency principles. Questions that ask what the ethical analyst should do often go beyond the legal minimum.
> - **Consent has a purpose:** Data collected for one purpose, such as claims, cannot be assumed to be available for another, such as marketing or pricing, without considering the consent given.
> - **A flag is not a verdict:** A low adverse impact ratio calls for investigation of whether the difference is cost-justified. It is not, on its own, proof of unfair discrimination.
