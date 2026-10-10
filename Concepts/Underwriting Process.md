---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c5315052fe249492cba1a2b8756ef0beed42d9e49caa40779702917e07bb6a65
  sources:
    - "Risk & Insurance Education Alliance (National Alliance), 'Six Steps of the Underwriting Process' (Research Academy, 30 Jan 2023), Steps 1-6, sha256:ee0156096b5f8c331aae216b138dcade35da2127854d0bee28423df26c0d2ba0 — https://www.riskeducation.org/six-steps-of-the-underwriting-process/"
    - "IRMI Glossary, 'line underwriter', entry, sha256:5798e2b8d8b3f666cb25ffe076c1283556d86f27c6dcb33b49929a4152f707b5 — https://www.irmi.com/term/insurance-definitions/line-underwriter"
    - "15 U.S.C. §1681b (LII), §1681b(a)(3)(C), sha256:6a76f86911643b4584aa96bbce68bbfcf097b5295d6c90e236c8256d16a02c1f — https://www.law.cornell.edu/uscode/text/15/1681b"
    - "15 U.S.C. §1681a (LII), §1681a(k)(1)(B)(i), sha256:d9b556114b94811875c7ebf82b608df90cf08a16f1d78eb8fc5f5bf50c4b7843 — https://www.law.cornell.edu/uscode/text/15/1681a"
    - "15 U.S.C. §1681m (LII), §1681m(a), sha256:328c82a65f0c1484276bdcc5f8ef2e0175a70a94491a87aa4a01abe456c03f06 — https://www.law.cornell.edu/uscode/text/15/1681m"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), schedule rating, PDF pp.39-45, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Process.md
---

The **Underwriting Process** is the sequence an underwriter follows to decide a submission: evaluate it against the [[Underwriting Guidelines|underwriting guidelines]], develop the alternatives, select one, determine the premium, implement the decision, and monitor the result. It applies to new business and to renewals, and its purpose is to write the risks the insurer's [[Underwriting Policy|underwriting policy]] wants at a premium that matches their exposure, and to keep the book within the insurer's risk appetite.

> $$P = P_{\text{manual}} \times (1 + c)$$

> $$-c_{\max} \le c \le c_{\max}$$

- **Symbols:** $P_{\text{manual}}$ is the premium from the manual rate for the risk's class, and $c$ is the underwriter's net schedule credit ($c < 0$) or debit ($c > 0$). The guidelines cap it at $c_{\max}$, and in commodity lines such as private passenger auto and homeowners there is usually no latitude at all, so $c = 0$ and pricing is a matter of classification ([[Schedule Rating]]).
- **1. Evaluate the submission:** The underwriter first checks whether the submission falls within the guidelines and the insurer's appetite, and declines it at once if it does not. If it does, the underwriter gathers what is missing. Sources include the ACORD application and any supplemental application, loss runs, motor vehicle records, CLUE reports, credit reports and a loss control inspection. The analysis looks at the risk's characteristics and its loss history, and for property its [[COPE]] characteristics.
- **2. Develop the alternatives:** There are three. Accept the submission as it is, accept it with modifications, or decline it. Modifications include a higher [[Deductible|deductible]], different limits, a limiting [[Endorsement|endorsement]], or a condition such as completing a loss control recommendation.
- **3. Select an alternative:** The underwriter chooses the alternative that fits the guidelines and the account. A marginal submission is often acceptable once it is modified, so an acceptable modification is worth considering before a decline. A submission beyond the underwriter's [[Underwriting Authority|authority]] is referred upward with a recommendation.
- **4. Determine the premium:** The risk is classified and rated. Where the line allows it, the underwriter applies discretionary credits or debits within the guidelines' limits, places the account in a standard or a preferred program, or recognises the producer's results through agency credits.
- **5. Implement the decision:** The decision is communicated to the producer, and once the insured buys the coverage the policy is issued and delivered, electronically or by mail. Some regulators don't allow electronic delivery.
- **6. Monitor the decision:** A policy written subject to conditions needs follow-up, such as receiving missing information or checking that loss control recommendations were carried out. The underwriter also reviews endorsements, changes in exposure and renewals, and the book's results are measured by its [[Underwriting Profit|underwriting results]]. A risk that has changed is re-evaluated, which starts the process again.
- **Consumer reports:** Using a credit report in steps 1 and 4 is a permissible purpose under the Fair Credit Reporting Act, and declining or surcharging an applicant because of it is an adverse action that requires a notice to the consumer.

> [!example]- A Small Contractor Through the Six Steps {Example}
> A producer submits a landscaping contractor for general liability on an ACORD application. The manual premium is \$12,000. The insurer's guideline accepts landscapers with three years' loss runs showing no more than two claims, requires a motor vehicle record for any employee who drives a mower trailer, and allows schedule credits or debits of up to 25%. The loss runs show one claim. The inspection finds well-maintained equipment and written safety rules, worth a 10% credit in the underwriter's judgment, but also that tree removal over 30 feet, which the guideline excludes, makes up a small part of the work. Walk the account through the process.
>
> > [!answer]-
> > - **Evaluate:** The class is acceptable, the loss history is within the guideline, and the underwriter requests the drivers' records the guideline requires. The tree work is the issue.
> > - **Develop:** Accept as is, which the guideline doesn't allow because of the tree work; accept with an endorsement excluding tree removal above 30 feet; or decline.
> > - **Select:** The endorsement makes the account acceptable, so the underwriter offers it rather than declining.
> > - **Premium:** The 10% credit is within the 25% limit.
> > $$
> > \begin{align*}
> > P &= 12{,}000 \times (1 - 0.10) \\
> > &= 10{,}800
> > \end{align*}
> > $$
> > - **Implement:** The quote goes to the producer with the endorsement, and once the contractor accepts it the policy is issued and delivered.
> > - **Monitor:** The underwriter diarizes the drivers' records if they arrive after binding, and at renewal checks that the contractor still does no excluded tree work.

> [!example]- When Monitoring Finds a Change {Example}
> A restaurant's commercial property policy was written on condition that its kitchen hood suppression system be serviced every six months. At the mid-term follow-up, the inspection report shows that the system was last serviced fourteen months ago and that the restaurant has added deep fryers. What should the underwriter do?
>
> > [!answer]-
> > Monitoring has found two things: a condition of acceptance was not met, and the exposure has grown. The underwriter re-evaluates the account as if it were a new submission. The alternatives are to continue the policy while requiring service of the system by a stated date, to charge for the added hazard where the rating plan allows, or to stop insuring the account. Any cancellation or nonrenewal has to follow the policy's conditions and the state's law, so a sensible first step is a written requirement to the insured and the producer with a deadline, followed by another check. The file records each step, which supports the decision later.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask for the steps in order, or give an activity and ask which step it belongs to, such as ordering a motor vehicle record (evaluate) or checking that a loss control recommendation was carried out (monitor).
> - **Scenario** questions describe a submission and a guideline and ask which alternative an underwriter should choose, or what modification would make the account acceptable.
> - **Premium** questions apply a schedule credit or debit within a cap, or ask why a personal lines account gets none.

> [!warning]- Exam traps
> - **Decline is one alternative of three:** The alternatives are accept, accept with modifications, and decline. Treating the decision as accept-or-decline misses the modification that is often the best choice.
> - **The process doesn't end at issue:** Monitoring is a step, not an afterthought. A condition attached to acceptance that nobody follows up on is no condition at all.
> - **Credits stay inside the cap:** A schedule credit larger than the guideline allows has to be referred. Applying it anyway is a breach of authority, even if the account deserves it.
> - **Commodity lines are classified, not negotiated:** In private passenger auto and homeowners the premium follows from the class and tier. Applying discretionary pricing there confuses personal and commercial practice.
