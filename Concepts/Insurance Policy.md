---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:08ccf77a822459203a367c2675acec5554052374d014b0cff3105da5be11cb20
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §1-3, PDF pp.21-26 (incl. footnote 5, p.22), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 PDF pp.13-14, 17 (insurance as a promise over a specified period; fundamental insurance equation); Ch.2 PDF p.38 (claims-made vs occurrence trigger); Ch.3 PDF p.55 (policy year aggregation), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Exam P syllabus (November 2026), learning objective 2(e)-(f), PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Whiten v. Pilot Insurance Co., 2002 SCC 18, [2002] 1 S.C.R. 595, at 639-640, sha256:fa9bdddc4551ad4445af241523212e6199d687659c382a4ec0b337d7f283300a — https://decisions.scc-csc.ca/scc-csc/scc-csc/en/1956/1/document.do"
    - "Marshall, Fair Benefits Fairly Delivered (Ontario, Apr 2017), Insurance Act s.233 as quoted at PDF p.70; SABS as O. Reg. 34/10, PDF pp.3, 23, 90, sha256:326913d5117f8dc2cc937a10f31f2d6fa712b509e040cd63220c2a8843b9d8fc — https://www.casact.org/sites/default/files/2021-03/6C_Marshall.pdf"
    - "CAS, Statement of Principles Regarding Property and Casualty Insurance Ratemaking (May 1988; reinstated May 2021), Definitions PDF pp.1-2, Consideration 'Risk' PDF p.4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "CAS Exam 8 Content Outline, Fall 2026 (October 2026 administration), Domain A task 7 (PDF p.3), Experience Rating and Retrospective and Loss Sensitive Rating statements (PDF p.4), sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf"
    - "CAS Exam 6C Content Outline, Fall 2026, Domain A tasks and readings (PDF p.3), reading table: CIA Territories, FSCO Tech Notes, Marshall, Landmark Legal (PDF pp.9-11), sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, Domain C task 3 (PDF p.5), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Insurance Policy.md
---

**An insurance policy** is the contract under which an [[Insurer|insurer]] promises, in exchange for [[Insurance Premium|premium]], to pay covered losses or provide specified benefits arising during the policy period, subject to the policy's terms. The terms turn a ground-up loss $X$ into the insurer's payment $Y = g(X)$, and the price is built on that payment.

> $$\text{Premium} = E[Y] + \text{Expenses} + \text{Risk Load}$$

- **Anatomy.** How a policy is put together, from declarations, forms and endorsements, is on [[Insurance Policy Structure]], and what each kind of provision does is on [[Policy Provisions]]. The payment function $g$ comes from the policy information: the [[Deductible|deductible]], any [[Coinsurance|coinsurance]] and the benefit limits are the inputs Exam P's syllabus names for calculating what an insurer pays on a claim ([[Policy Information]]).
- **Policy period.** Coverage runs from the effective date to **expiration**. Premium is [[Earned Premium|earned]] over the term. Losses attach to the policy through an [[Occurrence Coverage|occurrence]] or [[Claims Made Coverage|claims-made]] trigger, and [[Policy Year|policy-year]] data group policies by their inception date.
- **After expiration (Exam 8).** A guaranteed-cost policy's premium is fixed at inception, except for a [[Premium Audit|premium audit]] of the exposure. Under a [[Loss Sensitive Rating|loss-sensitive]] plan the premium keeps moving. A [[Retrospective Rating|retrospectively rated]] policy is re-rated on the insured's own developing losses, within a minimum and a maximum. For incurred loss retrospective plans, Fisher et al. say losses are *typically* first evaluated six months after expiration (18 months of development) and annually after that, so the insured typically gets a partial return of premium at the first evaluation and pays more as losses develop ([[Individual Risk Rating Study Note (Fisher et al. - 2019)|Fisher et al.]], Ch.2).
- **Canadian law (Exam 6C).** Good faith runs both ways. In *Whiten v. Pilot Insurance* (2002 SCC 18), one of the [[Landmark Legal|landmark cases]], the Supreme Court held that an insurer's duty of good faith and fair dealing is independent of, and in addition to, its duty to pay the loss, so breaching it can support [[Punitive Damages|punitive damages]] ([[Duty of Good Faith]], [[Bad Faith Damages]]); the Court also noted the "mutual 'good faith' obligation in insurance contracts". On the insured's side, Ontario's [[Insurance Legislation|Insurance Act]] s.233 makes an auto claim invalid and forfeits indemnity where the applicant knowingly misrepresents or fails to disclose a fact the application requires, the insured breaks a term of the contract or commits fraud, or the insured wilfully makes a false statement in a claim. Section 233(2) exempts statutory accident benefits, which are set by regulation, the Statutory Accident Benefits Schedule, Ontario Regulation 34/10 ([[Marshall]]; [[Statutory Accident Benefits]]).
- **Risk load.** The CAS ratemaking principles say the rate should include "a charge for the risk of random variation from the expected costs", reflected in a total return "consistent with the cost of capital" ([[Statement of Principles Regarding Property and Casualty Insurance Ratemaking (CAS - 1988)|Statement of Principles]]). Exam 9 asks for prices set on a [[Risk-Adjusted Pricing|risk-adjusted basis]] ([[Insurance Pricing]], [[Cost of Capital]]).

> [!example]- A Retro Policy Re-Rated After Expiration {Example}
> A one-year workers compensation policy is written on a retrospective plan with basic premium $\$30{,}000$, loss conversion factor $1.10$, tax multiplier $1.04$, minimum $\$80{,}000$ and maximum $\$200{,}000$. The insured paid a $\$125{,}000$ deposit at inception. Losses valued six months after expiration are $\$70{,}000$. A year later they have developed to $\$150{,}000$.
>
> Find the retrospective premium and the premium returned or charged at each adjustment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > R_1 &= (30{,}000 + 1.10 \times 70{,}000) \times 1.04 \\
> > &= 107{,}000 \times 1.04 \\
> > &= 111{,}280
> > \end{align*}
> > $$
> >
> > $R_1$ falls between the minimum and maximum, so the insurer **returns** $125{,}000 - 111{,}280 = \$13{,}720$.
> >
> > $$
> > \begin{align*}
> > R_2 &= (30{,}000 + 1.10 \times 150{,}000) \times 1.04 \\
> > &= 195{,}000 \times 1.04 \\
> > &= 202{,}800
> > \end{align*}
> > $$
> >
> > This is above the maximum, so the premium is capped at $\$200{,}000$ and the insurer **charges** $200{,}000 - 111{,}280 = \$88{,}720$.
> >
> > The policy expired more than a year earlier and its premium is still moving. The insurer carries credit risk on that additional premium, and the maximum has transferred the last $\$2{,}800$ of the insured's cost to the insurer.
