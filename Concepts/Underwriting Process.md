---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c5315052fe249492cba1a2b8756ef0beed42d9e49caa40779702917e07bb6a65
  sources: []
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
