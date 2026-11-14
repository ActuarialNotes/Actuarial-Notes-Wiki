---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0867ff51f67136186b302dbd85de012d3c1441761185e04216f5186518bb40a6
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

The **Underwriting Process** is the sequence an underwriter follows to decide a submission, for new business and for renewals. Its purpose is to write the risks the insurer's [[Underwriting Policy|underwriting policy]] wants at a premium that matches their exposure, and to keep the book within the insurer's risk appetite. Its six steps are:

1. **Evaluate the submission.** The underwriter checks whether it falls within the [[Underwriting Guidelines|underwriting guidelines]] and the insurer's appetite, and declines it at once if it does not. Otherwise the underwriter gathers and reviews what is missing about the risk, its characteristics and its loss history.
2. **Develop the alternatives.** There are three. Accept the submission as it is, accept it with modifications, or decline it.
3. **Select an alternative.** The underwriter chooses the one that fits the guidelines and the account.
4. **Determine the premium.** The risk is classified and rated.
5. **Implement the decision.** The decision is communicated to the producer, and once the insured buys the coverage the policy is issued and delivered, electronically or by mail.
6. **Monitor the decision.** The underwriter follows up on the policy and the account after it is written.

## Evaluating the submission

Sources include the ACORD application and any supplemental application, loss runs, motor vehicle records, CLUE reports, credit reports and a loss control inspection. For property the analysis covers the risk's [[COPE]] characteristics. [[Risk Control|Risk control]] surveys report the insured's operations and hazards, and the underwriter uses them to accept, modify or decline the account.

Using a credit report in steps 1 and 4 is a permissible purpose under the Fair Credit Reporting Act. Declining or surcharging an applicant because of it is an adverse action that requires a notice to the consumer.

## Developing and selecting an alternative

Modifications include a higher [[Deductible|deductible]], different limits, a limiting [[Endorsement|endorsement]], or a condition such as completing a loss control recommendation. A marginal submission is often acceptable once it is modified, so an acceptable modification is worth considering before a decline. A submission beyond the underwriter's [[Underwriting Authority|authority]] is referred upward with a recommendation.

## Determining the premium

Where the line allows it, the underwriter applies discretionary credits or debits to the manual premium within the guidelines' limits ([[Schedule Rating]]), places the account in a standard or a preferred program, or recognises the producer's results through agency credits. With a net schedule credit or debit $c$, the premium is

> $$P = P_{\text{manual}} \times (1 + c)$$

- $P_{\text{manual}}$ is the premium from the manual rate for the risk's class.
- $c < 0$ is a credit and $c > 0$ a debit.
- $-c_{\max} \le c \le c_{\max}$, where $c_{\max}$ is the cap the guidelines set.

A credit beyond the cap has to be referred. In commodity lines such as private passenger auto and homeowners there is usually no latitude at all, so $c = 0$, and the premium follows from the class and tier the underwriter places the risk in.

> [!example]- What is the premium for this landscaping contractor, and what alternative should the underwriter choose? {Example}
> A producer submits a landscaping contractor for general liability. The manual premium is \$12,000. The guideline accepts landscapers whose three years' loss runs show no more than two claims, requires a motor vehicle record for any employee who drives a mower trailer, and allows schedule credits or debits of up to 25%. The loss runs show one claim. The inspection finds well-maintained equipment and written safety rules, worth a 10% credit in the underwriter's judgment, but also tree removal over 30 feet, which the guideline excludes, in a small part of the work.
>
> > [!answer]-
> > - Evaluate: the class is acceptable and the loss history is within the guideline. The underwriter requests the drivers' records the guideline requires.
> > - Develop: accepting as is isn't allowed because of the tree work. The alternatives left are an endorsement excluding tree removal above 30 feet, or a decline.
> > - Select: the endorsement makes the account acceptable, so the underwriter offers it rather than declining.
> > - Premium: the 10% credit is within the 25% cap, so $P = 12{,}000 \times (1 - 0.10) = \$10{,}800$.
> > - Implement: the quote goes to the producer with the endorsement, and once the contractor accepts it the policy is issued and delivered.
> > - Monitor: the underwriter diarizes the drivers' records if they arrive after binding, and at renewal checks that the contractor still does no excluded tree work.

## Monitoring the decision

A policy written subject to conditions needs follow-up, such as receiving missing information or checking that loss control recommendations were carried out. The underwriter also reviews endorsements, changes in exposure and renewals, and the book's results are measured by its [[Underwriting Profit|underwriting results]]. A risk that has changed is re-evaluated, which starts the process again.

> [!example]- What should the underwriter do about this restaurant? {Example}
> A restaurant's commercial property policy was written on condition that its kitchen hood suppression system be serviced every six months. At the mid-term follow-up, the inspection report shows that the system was last serviced fourteen months ago and that the restaurant has added deep fryers.
>
> > [!answer]-
> > - Monitoring has found two things: a condition of acceptance was not met, and the exposure has grown.
> > - The underwriter re-evaluates the account as if it were a new submission.
> > - The alternatives are to continue the policy while requiring service of the system by a stated date, to charge for the added hazard where the rating plan allows, or to stop insuring the account.
> > - Any cancellation or nonrenewal has to follow the policy's conditions and the state's law, so a sensible first step is a written requirement to the insured and the producer with a deadline, followed by another check.

> [!trap] Treating the decision as accept or decline
> The alternatives are accept, accept with modifications, and decline. An answer that only weighs accepting against declining misses the modification, such as a higher deductible or an exclusion, that is often the best choice.
