---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a8ecea8cc7ab94861f55f44481e0d886df10e2f617d669d82e1b8a31a932f224
  sources:
    - "Texas Insurance Code ch. 38 (Texas Legislature), §38.002(a)(4), (b), (e); §38.003(c)-(d), sha256:362ed8ab524661320175c0c52224afe8f9a2ad104649b8b11a691ce81cfe5156 — https://tcss.legis.texas.gov/resources/IN/htm/IN.38.htm"
    - "15 U.S.C. §1681b (LII), §1681b(a)(3)(C), sha256:6a76f86911643b4584aa96bbce68bbfcf097b5295d6c90e236c8256d16a02c1f — https://www.law.cornell.edu/uscode/text/15/1681b"
    - "15 U.S.C. §1681a (LII), §1681a(k)(1)(B)(i), sha256:d9b556114b94811875c7ebf82b608df90cf08a16f1d78eb8fc5f5bf50c4b7843 — https://www.law.cornell.edu/uscode/text/15/1681a"
    - "15 U.S.C. §1681m (LII), §1681m(a), sha256:328c82a65f0c1484276bdcc5f8ef2e0175a70a94491a87aa4a01abe456c03f06 — https://www.law.cornell.edu/uscode/text/15/1681m"
    - "IRMI Glossary, 'underwriting guidelines', entry, sha256:0ebdd2f245496dfc1f32b8a478a7daf0a89ee1494cda4ffa445471b5d33ac113 — https://www.irmi.com/term/insurance-definitions/underwriting-guidelines"
    - "IRMI Glossary, 'line underwriter', entry, sha256:5798e2b8d8b3f666cb25ffe076c1283556d86f27c6dcb33b49929a4152f707b5 — https://www.irmi.com/term/insurance-definitions/line-underwriter"
    - "IRMI Glossary, 'staff underwriter', entry, sha256:b2d2b0aacfead61f6ee5debe5c8f13fdd6475253d2bba76b5ee7a148cf45b632 — https://www.irmi.com/term/insurance-definitions/staff-underwriter"
    - "Risk & Insurance Education Alliance (National Alliance), 'Six Steps of the Underwriting Process' (Research Academy, 30 Jan 2023), Steps 1-4, sha256:ee0156096b5f8c331aae216b138dcade35da2127854d0bee28423df26c0d2ba0 — https://www.riskeducation.org/six-steps-of-the-underwriting-process/"
    - "Verisk ISO Mitigation, 'How Does PPC Information Affect Individual Insurance Policies?', entry, sha256:b80e04ee1eed4f7fafbbaf95b73c5f5f169f0b5600915fabf74fe7ae8fa4407d — https://www.isomitigation.com/ppc/program-works/how-does-ppc-information-affect-individual-insurance-policies/"
    - "Verisk ISO Mitigation, PPC program page, entry, sha256:b5fbc3d99b2fc0609bcefbe9be85c7d295aeb2ca552a9ee106b2ce82bad2a873 — https://www.isomitigation.com/ppc/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Guidelines.md
---

**Underwriting Guidelines** are the rules, standards and practices an insurer gives its underwriters and agents for deciding whether to accept, modify or reject an applicant for insurance, and how to classify an accepted risk for rating. They are how [[Underwriting Policy|underwriting policy]], which senior management sets, reaches the line underwriter who decides each account.

A guideline is applied by testing a submission against each criterion it states, such as protection class, loss history or roof age. The submission then falls into one of three outcomes:

1. **Accept.** It meets every criterion.
2. **Accept with a modification.** It fails a criterion, but a modification the guidelines allow makes it acceptable. Allowed modifications include a higher [[Deductible|deductible]], a lower limit, a limiting [[Endorsement|endorsement]], or a condition that the insured carry out a loss control recommendation.
3. **Decline.** No allowed modification makes it acceptable.

A submission the guidelines accept but that is outside the underwriter's own limits is referred upward rather than declined ([[Underwriting Authority]]). One within the underwriter's authority is decided by the underwriter.

> [!example]- Should the underwriter accept, modify or decline each of these three homeowners applicants? {Example}
> An insurer's illustrative homeowners guideline accepts dwellings in public protection classes 1 to 8 with no more than one property claim in the past three years and a roof under 20 years old. A dwelling with a roof 20 years or older is acceptable only with a roof surfacing endorsement that settles roof losses at actual cash value. Anything else is declined.
>
> | Applicant | Protection class | Claims | Roof age (years) |
> | :--- | ---: | ---: | ---: |
> | A | 4 | 0 | 8 |
> | B | 5 | 1 | 24 |
> | C | 10 | 0 | 3 |
>
> > [!answer]-
> > - A meets every criterion, so it is accepted and written at the class rate for its tier.
> > - B fails the roof age criterion, but the guideline names a modification that makes the risk acceptable. The underwriter offers the policy with the roof endorsement, and the applicant can take it or go elsewhere.
> > - C is in protection class 10, which means the area's fire suppression does not meet ISO's minimum criteria. No modification in the guideline cures that, so it is declined. The new roof does not change the decision, because the guideline does not let one criterion offset another.
> > - Two underwriters given applicant B would both offer the endorsement, rather than one accepting and the other declining.

## Who writes and who uses them

Staff underwriters develop and interpret the guidelines. They analyze loss experience, follow market and regulatory developments, conduct underwriting audits, train line underwriters, and recommend changes to forms, rates, eligibility rules and authority levels. The result is consistent decisions across underwriters and offices, which is the guidelines' purpose.

Line underwriters apply the guidelines, together with loss experience, the risk's characteristics and available capacity, to decide whether to offer coverage and on what terms, limits and premium. Insurers give the same guidelines to their agents, so a producer knows which risks the insurer will consider before submitting one.

## What they contain

Guidelines state which risks are eligible, what information a submission must include, how an accepted risk is classified, and how much pricing judgment an underwriter may use. The information required goes beyond the standard ACORD application. It can include a supplemental application, loss runs, motor vehicle records, CLUE reports, credit reports and loss control inspections.

Pricing latitude varies by line. Some commercial lines allow an underwriter to credit or debit an account on its merits ([[Schedule Rating]]). Commodity lines such as private passenger auto and homeowners are usually class-rated with no deviation allowed, so an underwriter there classifies the risk rather than adjusting its price.

Guidelines often turn on outside data. Most U.S. property insurers use ISO's Public Protection Classification of a community's fire protection to identify where to write new business, to offer coverages and to set deductibles ([[COPE]]). How an insurer uses it depends on its own fire loss experience, underwriting guidelines and marketing strategy.

Guidelines change when results, the market, the law or the insurer's reinsurance change. An underwriting audit that finds files outside the guidelines is a signal either to retrain or to change the guidelines.

## Regulation of underwriting guidelines

States regulate guidelines because they decide who can buy insurance. Texas law defines an underwriting guideline as any rule, standard, guideline or practice, whether written, oral or electronic, used to accept or reject an application or to classify the accepted risks for the purpose of determining a rate. In Texas:

- Personal auto and residential property insurers must file their guidelines with the Department of Insurance and update the filing each time they change.
- Those guidelines must be sound, actuarially justified, or otherwise substantially commensurate with the risk, and may not be [[Unfair Discrimination|unfairly discriminatory]].
- Guidelines for other lines are confidential but available to the department on request.

Other states' rules differ, so whether guidelines must be filed depends on the state and the line.

A guideline that uses a consumer report, such as a credit report, triggers the federal Fair Credit Reporting Act. Underwriting insurance is a permissible purpose for obtaining one. Denying coverage, raising a charge, or reducing the coverage offered because of the report is an adverse action, and the insurer must notify the consumer.

> [!example]- What do federal and Texas law require of this personal auto insurer? {Example}
> A Texas personal auto insurer writes a preferred tier and a more expensive standard tier. Its guideline places an applicant in the standard tier when the applicant's credit report shows a recent collection account. An applicant is placed in the standard tier for that reason.
>
> > [!answer]-
> > - The insurer may obtain the credit report, because underwriting insurance is a permissible purpose under the Fair Credit Reporting Act.
> > - Charging the applicant more because of the report is an adverse action, so the insurer must give the applicant notice of it.
> > - The rule is part of the personal auto guidelines the insurer must file with the Department of Insurance, and the filing must be updated if the insurer changes it.
> > - The rule must be sound, actuarially justified or otherwise commensurate with the risk, and not unfairly discriminatory.

> [!trap] Guidelines confused with policy
> Underwriting policy is the decision about what business to write. Guidelines are the tool that puts it into practice for each submission. An answer that has line underwriters or producers setting the guidelines has the roles reversed: staff underwriters write them, and line underwriters and producers work within them.
