---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4c7f026a08ff26c30a5ab3640c8afae249c6ae19dfff1c8653cffce40c9f76c4
  sources:
    - "Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf"
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employment Practices Liability Insurance.md
---

**Employment Practices Liability Insurance** (EPLI) covers an employer, and usually its directors, officers, managers and employees, against claims by employees, former employees and job applicants alleging a wrongful employment practice, such as discrimination, harassment, wrongful termination or retaliation. It fills a gap left by the [[Commercial General Liability|CGL]], whose Coverage A covers bodily injury and property damage and excludes bodily injury to an employee arising out of employment, and by [[Workers Compensation Insurance|workers compensation]] and employers liability, which cover work-related injury rather than the employment relationship itself. Most EPLI is written on a [[Claims Made Coverage|claims-made]] basis with defense costs inside the limit.

> $$X = I + E$$

> $$\text{Paid} = \min\left((1 - c)\,(X - R)^+,\ L\right)$$

> $$\text{Borne} = X - \text{Paid}$$

- **Symbols:** $I$ is the indemnity, meaning the settlement or judgment, $E$ is the defense cost and $X$ is the covered loss. $R$ is the retention, $c$ is the insured's coinsurance share of loss above the retention, and $L$ is the limit, which defense costs erode.
- **Covered practices:** The insuring agreement lists the wrongful acts it covers. They include wrongful termination, discrimination on a protected characteristic such as age, sex, race, religion or disability, sexual and workplace harassment, retaliation against an employee who complained or blew the whistle, wrongful discipline, failure to promote, and negligent evaluation.
- **What counts as a claim:** A claim usually includes an administrative charge before a government agency, such as a charge of discrimination, as well as a lawsuit or a written demand. Defending the agency charge is often where the defense costs start, long before any suit is filed.
- **Duty to defend:** An EPLI form may give the insurer the [[Duty to Defend|duty to defend]] and the right to choose counsel from its list of approved employment defense firms, or leave the defense to the insured, with the insurer advancing covered defense costs; Chubb's form lets the insured select either in the declarations.
- **Exclusions:** Obligations under workers compensation, unemployment and disability benefit laws are excluded, as are benefit plan claims, which belong to [[Fiduciary Liability Insurance|fiduciary liability]]. Wage and hour claims, such as unpaid overtime, are usually excluded or covered only for defense under a sublimit. Costs of reinstating an employee or of complying with an accommodation order, and bodily injury other than emotional distress, are also excluded.
- **Third-party EPL:** Cover for discrimination against or harassment of third parties, such as customers, clients, patients or vendors, is part of some base EPL forms (Chubb's includes a Third Party Liability insuring clause) and is added by endorsement to others. It matters to restaurants, retailers, hotels and health care providers, whose staff deal with the public every day.

> [!example]- A Wrongful Termination Settlement With a Retention and Coinsurance {Example}
> A restaurant chain's EPLI policy has a \$1,000,000 aggregate limit with defense inside the limit, a \$50,000 retention and 10% coinsurance on all loss above the retention, defense costs included. A dismissed manager files an age discrimination charge and then a wrongful termination suit. Defense costs reach \$180,000 and the case settles for \$320,000. What does the insurer pay, and what does the chain bear?
>
> > [!answer]-
> > The defense costs and the settlement are one loss, so the retention and the coinsurance apply to their total.
> > $$
> > \begin{align*}
> > X &= 320{,}000 + 180{,}000 \\
> > &= 500{,}000 \\
> > \text{Paid} &= 0.90\,(500{,}000 - 50{,}000) \\
> > &= 405{,}000 \\
> > \text{Borne} &= 500{,}000 - 405{,}000 \\
> > &= 95{,}000
> > \end{align*}
> > $$
> > The chain bears the \$50,000 retention and \$45,000 of coinsurance. The insurer's payment is well within the limit, but \$180,000 of it went to defense, so the limit left for the rest of the policy year is \$595,000. Coinsurance keeps the employer sharing in every dollar of defense, which gives it a reason to settle early and to manage its employment practices.

> [!example]- Separating an Excluded Wage Claim {Example}
> A former employee's suit combines a sexual harassment claim with a claim for \$60,000 of unpaid overtime. The case settles for \$260,000, of which \$200,000 is allocated to the harassment claim and \$60,000 to the overtime. Defense costs are \$90,000, all of which the policy treats as covered. The policy excludes wage and hour claims, has a \$25,000 retention and no coinsurance. Find the insurer's payment and the employer's share.
>
> > [!answer]-
> > Only the harassment settlement and the defense costs are covered loss.
> > $$
> > \begin{align*}
> > X &= 200{,}000 + 90{,}000 \\
> > &= 290{,}000 \\
> > \text{Paid} &= 290{,}000 - 25{,}000 \\
> > &= 265{,}000
> > \end{align*}
> > $$
> > The employer pays the \$25,000 retention and the \$60,000 overtime itself, \$85,000 in all. Back pay is part of the harassment damages and covered, while the overtime is wages the employer owed under the law in any case, which is why the policy treats it as uninsurable.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask what wrongful employment practices EPLI covers, why the CGL and workers compensation do not, who is an insured, and which exclusions apply. The applied version describes a claim and asks whether EPLI responds and how the retention, coinsurance and defense-inside-limits terms divide the loss.
> - **Neighbouring lines:** Candidates should be able to tell an EPLI claim from a [[Directors and Officers Liability Insurance|D&O]] claim, a fiduciary claim over a benefit plan and a workers compensation claim for a workplace injury.

> [!warning]- Exam traps
> - **Defense inside the limit:** EPLI defense costs erode the limit, so the limit left after a long defense is smaller than the limit less the settlement. Treating defense as paid in addition, as under the CGL, overstates the remaining limit.
> - **Coinsurance on defense too:** Where the coinsurance applies to loss above the retention, it applies to defense costs as well as the settlement. Applying it to the settlement alone understates the employer's share.
> - **Applicants are claimants:** A job applicant who was not hired can bring a covered discrimination claim, even though they were never an employee.
> - **Read the form for third-party cover:** Harassment of a customer by an employee is a third-party claim, not an employment claim. It is covered only if the policy has third-party cover, in its base form or by endorsement.
> - **Workplace injury is elsewhere:** A claim for physical injury at work goes to workers compensation and employers liability, not EPLI. EPLI pays emotional distress that flows from the employment practice, not bodily injury.
