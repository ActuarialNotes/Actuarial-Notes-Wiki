---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c4228879a94411184387ddcd73ebab06bc5690faad95f136c9f0b2a52ebf40ba
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Standards of Practice.md
---

An **Actuarial Standard of Practice** (ASOP) is one of the numbered standards issued by the U.S. Actuarial Standards Board (ASB) that describe what an actuary should do, consider and disclose when performing actuarial services in the United States. The ASOPs bind members of the U.S.-based actuarial organizations, including the CAS and the [[American Academy of Actuaries]], through Precept 3 of the Code of Professional Conduct.

Three bodies divide the work:

1. The **ASB**, an independent board created and staffed by the American Academy of Actuaries, promulgates the ASOPs.
2. The **Academy** issues the U.S. Qualification Standards and non-binding practice notes, such as its practice note on P&C statements of actuarial opinion.
3. The **Actuarial Board for Counseling and Discipline** enforces the Code.

The ASOPs use "should" for what is normally required. They allow deviation only where the actuary discloses it and the reason, as ASOP No. 41 requires.

## The P&C financial-reporting ASOPs

The NAIC instructions require the statement of actuarial opinion (SAO) and its support to be consistent with four ASOPs, and two more govern related work:

| ASOP | Subject |
| --- | --- |
| No. 23 | Data quality |
| No. 36 | Statements of actuarial opinion on P&C loss, LAE or other reserves, revised effective October 2024 with expanded disclosure on the risk of material adverse deviation |
| No. 41 | Actuarial communications |
| No. 43 | P&C unpaid claim estimates |
| No. 20 | Discounting of P&C claim estimates |
| No. 21 | Work responding to or assisting auditors and examiners in financial audits, reviews and examinations |

The vault has pages for ASOPs [[ASOP 12 - Risk Classification (ASB - 2005)|No. 12]] (risk classification), [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|No. 13]] (trending), [[ASOP 23 - Data Quality (ASB - 2016)|No. 23]], [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|No. 43]] and [[ASOP 56 - Modeling (ASB - 2019)|No. 56]] (modeling).

> [!example]- Which ASOP applies in each of these four situations? {Example}
> 1. Claim data for one line cannot be reconciled to Schedule P.
> 2. Management asks for the reserve estimate on a discounted basis for a loss portfolio transfer.
> 3. The external auditor's actuary asks the Appointed Actuary to explain the tail factor selection.
> 4. The actuary signs the SAO and prepares the supporting Actuarial Report.
>
> > [!answer]-
> > - Situation 1 is No. 23, data quality. The actuary reviews the data for reasonableness and consistency and discloses the limitation and its effect. A material defect belongs in the opinion's relevant comments.
> > - Situation 2 is No. 20, discounting, for the payment pattern and discount rate, alongside No. 43 for the undiscounted estimate beneath it.
> > - Situation 3 is No. 21, auditors and examiners. The actuary cooperates and explains, without handing the judgement to the auditor.
> > - Situation 4 is No. 36 for the opinion, No. 43 for the estimates behind it and No. 41 for the report and its disclosures.

## ASOP No. 43 and unpaid claims

Under ASOP No. 43 the actuary identifies three things before estimating [[Unpaid Claims|unpaid claims]]:

1. The **intended purpose**.
2. The **intended measure**, for example an actuarial central estimate.
3. The **scope**: gross, ceded or net, which claims, whether LAE is included, and discounted or not.

The actuary then selects methods and assumptions suited to the data and to changing conditions. For excess and [[Reinsurance Reserving|reinsurance]] business that means working through the contract terms: retentions, limits, aggregate features, reinstatements and collectability.

> [!example]- How does the development of this excess layer differ from the ground-up claim's? {Example}
> A reinsurer covers $\$4$ million excess of $\$1$ million per occurrence. One ground-up claim is case-reserved at $\$3.5$ million and is expected to settle at $\$6$ million.
>
> > [!answer]-
> > - The layer's case reserve is $3.5 - 1 = \$2.5$ million.
> > - The layer's ultimate is $\min(6, 5) - 1 = \$4.0$ million.
> > - The layer's development factor is $4.0/2.5 = 1.60$, against $6/3.5 = 1.71$ ground-up.
> > - With no upper limit the layer factor would be $5/2.5 = 2.00$. The retention leverages development and the limit caps it.
> > - A ground-up factor applied to an excess layer can be wrong in either direction, which is why ASOP 43 has the actuary define the scope against the contract terms.

## ASOPs and the Canadian standards

The ASOPs are distinct from Canada's [[Standards of Practice]], issued for CIA members. CIA standards take legal force through the [[Insurance Companies Act]]'s reference to [[Accepted Actuarial Practice]], and ASOPs through the profession's Code and the regulators who require consistency with them. Both are principles-based and both permit disclosed deviation. Both sit above non-binding guidance: [[Educational Note|educational notes]] in Canada and practice notes in the U.S.
