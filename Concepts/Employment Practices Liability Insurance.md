---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:29cf012679359e6a478510c22a1d0ee1b15aff2e39937e227dd3848ce472cdaf
  sources:
    - "Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf"
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employment Practices Liability Insurance.md
---

**Employment Practices Liability Insurance** (EPLI) is insurance that covers an employer, and usually its directors, officers, managers and employees, against claims by employees, former employees and job applicants alleging a wrongful employment practice, such as discrimination, harassment, wrongful termination or retaliation. Most EPLI is written on a [[Claims Made Coverage|claims-made]] basis with defense costs inside the limit.

EPLI fills a gap left by the [[Commercial General Liability|CGL]] and by [[Workers Compensation Insurance|workers compensation]] and employers liability:

| Coverage | What it covers | Why it leaves employment practices uncovered |
| :--- | :--- | :--- |
| CGL | Coverage A covers bodily injury and property damage | It excludes bodily injury to an employee arising out of employment |
| Workers compensation and employers liability | Work-related injury to employees | It covers the injury, not the employment relationship itself |

EPLI in turn excludes bodily injury other than emotional distress. A guest's slip and fall on the premises is a CGL claim, and an employee's workplace injury is a workers compensation and employers liability claim.

## What EPLI covers

The insuring agreement lists the wrongful acts it covers. They include wrongful termination, discrimination on a protected characteristic such as age, sex, race, religion or disability, sexual and workplace harassment, retaliation against an employee who complained or blew the whistle, wrongful discipline, failure to promote, and negligent evaluation. A job applicant who was not hired can bring a covered discrimination claim.

A claim usually includes an administrative charge filed with a government agency, such as a charge of discrimination, as well as a lawsuit or a written demand. Defending the agency charge is often where the defense costs start, long before any suit is filed.

An EPLI form may give the insurer the [[Duty to Defend|duty to defend]] and the right to choose counsel from its list of approved employment defense firms, or leave the defense to the insured, with the insurer advancing covered defense costs. Chubb's form lets the insured select either in the declarations.

## Retention, coinsurance and the limit

The defense costs and the settlement are one loss, and the retention, the coinsurance and the limit apply to their total. The amount the insurer pays is

> $$\text{Paid} = \min\left((1 - c)\,(I + E - R)^+,\ L\right)$$

- $I$ is the indemnity, meaning the settlement or judgment.
- $E$ is the defense cost.
- $R$ is the retention.
- $c$ is the insured's coinsurance share of loss above the retention, defense costs included.
- $L$ is the limit, which defense costs erode.

The employer bears the rest of the covered loss, $I + E - \text{Paid}$.

> [!example]- What does the insurer pay on this wrongful termination claim, and what does the chain bear? {Example}
> A restaurant chain's EPLI policy has a $\$1{,}000{,}000$ aggregate limit with defense inside the limit, a $\$50{,}000$ retention and 10% coinsurance on all loss above the retention, defense costs included. A dismissed manager files an age discrimination charge and then a wrongful termination suit. Defense costs reach $\$180{,}000$ and the case settles for $\$320{,}000$.
>
> > [!answer]-
> > - The covered loss is $320{,}000 + 180{,}000 = \$500{,}000$.
> > - The insurer pays $0.90 \times (500{,}000 - 50{,}000) = \$405{,}000$.
> > - The chain bears $500{,}000 - 405{,}000 = \$95{,}000$: the $\$50{,}000$ retention and $\$45{,}000$ of coinsurance.
> > - The limit left for the rest of the policy year is $1{,}000{,}000 - 405{,}000 = \$595{,}000$.

## Exclusions

Obligations under workers compensation, unemployment and disability benefit laws are excluded, as are benefit plan claims, which belong to [[Fiduciary Liability Insurance|fiduciary liability]]. Wage and hour claims, such as unpaid overtime, are usually excluded or covered only for defense costs under a sublimit. The costs of reinstating an employee or of complying with an accommodation order are also excluded.

> [!example]- What does the insurer pay on this harassment suit with an overtime claim, and what does the employer pay? {Example}
> A former employee's suit combines a sexual harassment claim with a claim for $\$60{,}000$ of unpaid overtime. The case settles for $\$260{,}000$, of which $\$200{,}000$ is allocated to the harassment claim and $\$60{,}000$ to the overtime. Defense costs are $\$90{,}000$, all of which the policy treats as covered. The policy excludes wage and hour claims and has a $\$25{,}000$ retention and no coinsurance.
>
> > [!answer]-
> > - Only the harassment settlement and the defense costs are covered loss: $200{,}000 + 90{,}000 = \$290{,}000$.
> > - The insurer pays $290{,}000 - 25{,}000 = \$265{,}000$.
> > - The employer pays the $\$25{,}000$ retention and the $\$60{,}000$ of overtime itself, $\$85{,}000$ in all.
> > - The overtime is excluded because it is wages the employer owed under the law in any case.

## Third-party EPL

Cover for discrimination against or harassment of third parties, such as customers, clients, patients or vendors, is part of some base EPL forms and is added by endorsement to others. Chubb's form includes a Third Party Liability insuring clause. It matters to restaurants, retailers, hotels and health care providers, whose staff deal with the public every day. Harassment of a customer by an employee is a third-party claim, not an employment claim, so it is covered only if the policy has third-party cover.

> [!trap] Treating defense costs as paid in addition to the limit
> EPLI defense costs erode the limit, as they do not under the CGL. The limit left after a long defense is the limit less the defense and the settlement paid, not the limit less the settlement alone.
