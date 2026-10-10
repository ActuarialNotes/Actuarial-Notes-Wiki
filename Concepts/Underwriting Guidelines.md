---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6d959e3aa47017b04c1ea964ed4479930ec5ccb900091dcba0ffaa5bb554e9dd
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

**Underwriting Guidelines** are the rules, standards and practices an insurer gives its underwriters and agents for deciding whether to accept, modify or reject an applicant for insurance, and how to classify an accepted risk for rating. They are how [[Underwriting Policy|underwriting policy]], which senior management sets, reaches the line underwriter who decides each account. Texas law defines an underwriting guideline as any such rule, standard, guideline or practice, whether written, oral or electronic, used to accept or reject an application or to classify the accepted risks for the purpose of determining a rate.

> $$d(s) = \begin{cases} \text{accept} & s \in \mathcal{A} \\[4pt] \text{accept modified} & s \notin \mathcal{A},\ m(s) \in \mathcal{A} \text{ for some } m \in \mathcal{M} \\[4pt] \text{decline} & \text{otherwise} \end{cases}$$

- **Symbols:** $s$ is a submission, $\mathcal{A}$ is the set of risks the guidelines make acceptable, and $\mathcal{M}$ is the set of modifications the guidelines allow, such as a higher [[Deductible|deductible]], a lower limit, a limiting [[Endorsement|endorsement]], or a condition that the insured carry out a loss control recommendation. $d(s)$ is the decision. A submission inside $\mathcal{A}$ but outside the underwriter's own limits is referred upward rather than declined ([[Underwriting Authority]]).
- **Who uses them:** Line underwriters apply the guidelines, together with loss experience, the risk's characteristics and available capacity, to decide whether to offer coverage and on what terms, limits and premium. Insurers give the same guidelines to their agents, so a producer knows which risks the insurer will consider before submitting one.
- **Who writes them:** Staff underwriters develop and interpret the guidelines. They analyze loss experience, follow market and regulatory developments, conduct underwriting audits, train line underwriters, and recommend changes to forms, rates, eligibility rules and authority levels. The result is consistent decisions across underwriters and offices, which is the guidelines' purpose.
- **What they contain:** Guidelines state which risks are eligible, what information a submission must include, how an accepted risk is classified, and how much pricing judgment an underwriter may use. The information required goes beyond the standard ACORD application. It can include a supplemental application, loss runs, motor vehicle records, CLUE reports, credit reports and loss control inspections. Pricing latitude varies by line. Some commercial lines allow an underwriter to credit or debit an account on its merits, while commodity lines such as private passenger auto and homeowners are usually class-rated with no deviation allowed.
- **Third-party classifications:** Guidelines often turn on outside data. Most U.S. property insurers use ISO's Public Protection Classification of a community's fire protection to identify where to write new business, to offer coverages and to set deductibles, and the way an insurer uses it depends on its own fire loss experience, underwriting guidelines and marketing strategy ([[COPE]]).
- **Regulation:** States regulate guidelines because they decide who can buy insurance. Texas requires personal auto and residential property insurers to file their guidelines with the Department of Insurance and to update the filing each time they change. Those guidelines must be sound, actuarially justified, or otherwise substantially commensurate with the risk, and may not be [[Unfair Discrimination|unfairly discriminatory]]. Guidelines for other lines are confidential in Texas but available to the department on request. Other states' rules differ, so whether guidelines must be filed depends on the state and the line.
- **Consumer reports:** A guideline that uses a consumer report, such as a credit report, triggers the federal Fair Credit Reporting Act. Underwriting insurance is a permissible purpose for obtaining one. Denying coverage, raising a charge, or reducing the coverage offered because of the report is an adverse action, and the insurer must notify the consumer.
- **Keeping them current:** Guidelines change when results, the market, the law or the insurer's reinsurance change. The [[Underwriting Policy]] page covers how those changes are announced and how audits check that the guidelines are followed. An audit that finds files outside the guidelines is a signal either to retrain or to change the guidelines.

> [!example]- Applying a Homeowners Guideline to Three Applicants {Example}
> An insurer's illustrative homeowners guideline accepts dwellings in public protection classes 1 to 8 with no more than one property claim in the past three years and a roof under 20 years old. A dwelling with a roof 20 years or older is acceptable only with a roof surfacing endorsement that settles roof losses at actual cash value. Anything else is declined. Decide each applicant: (A) protection class 4, no claims, roof 8 years old; (B) protection class 5, one claim, roof 24 years old; (C) protection class 10, no claims, roof 3 years old.
>
> > [!answer]-
> > - **(A) Accept:** It meets every criterion, so it is in the acceptable set and is written at the class rate for its tier.
> > - **(B) Accept modified:** The roof fails the age criterion, but the guideline names a modification that makes the risk acceptable. The underwriter offers the policy with the roof endorsement, and the applicant can take it or go elsewhere.
> > - **(C) Decline:** Class 10 means the area's fire suppression does not meet ISO's minimum criteria, and no modification in the guideline cures that. The new roof does not change the decision, because the guideline does not let one criterion offset another.
> >
> > The guideline turned three different files into three consistent decisions. Two underwriters given applicant B would both offer the endorsement rather than one accepting and the other declining.

> [!example]- A Guideline That Uses Credit Information {Example}
> A Texas personal auto insurer writes a preferred tier and a standard tier, and the standard tier costs more. Its guideline places an applicant in the standard tier when the applicant's credit report shows a recent collection account. An applicant is placed in the standard tier for that reason. What do federal and Texas law require of the insurer?
>
> > [!answer]-
> > - **The report:** The insurer may obtain the credit report, because underwriting insurance is a permissible purpose under the Fair Credit Reporting Act.
> > - **The notice:** Charging the applicant more because of the report is an adverse action, so the insurer must give the applicant notice of it, with the other disclosures the Act requires.
> > - **The guideline:** In Texas the guideline is part of the personal auto guidelines the insurer must file with the Department of Insurance. It must be sound, actuarially justified or otherwise commensurate with the risk, and not unfairly discriminatory, and the filing must be updated if the insurer changes the rule.
> >
> > The same tiering rule could be lawful in one state and need changes in another, which is why an insurer operating in many states keeps state exceptions in its guidelines.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The objective on implementing underwriting policy asks how policy reaches the line underwriter. Questions ask what a guideline contains, who writes and who applies it, and why it makes decisions consistent.
> - **Applied questions** give a short guideline and a few submissions and ask which to accept, which to accept with a modification, which to decline, and which to refer to a higher [[Underwriting Authority|authority]].
> - **Regulation** questions ask why a state restricts or reviews guidelines, such as a ban on unfair discrimination or a requirement that a guideline be justified by the risk.

> [!warning]- Exam traps
> - **Guidelines versus policy:** Underwriting policy is the decision about what business to write. Guidelines are the tool that puts it into practice for each submission. An answer that has line underwriters setting policy has the two reversed.
> - **Refer is not decline:** A submission that is acceptable but larger than the underwriter's authority goes to a higher level. Declining it because the line underwriter can't approve it confuses the guideline with the authority limit.
> - **Modification before rejection:** The guidelines usually allow an acceptable modification, such as a higher deductible or a loss control requirement. Jumping to decline skips the alternative that keeps the account.
> - **Pricing latitude is not universal:** Schedule credits and debits are allowed in some commercial lines. Personal auto and homeowners are usually class-rated, so an underwriter there classifies the risk rather than adjusting its price.
