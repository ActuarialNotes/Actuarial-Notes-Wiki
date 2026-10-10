---
aliases:
  - ISO WC
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:be331fc47be0d3c1c31d4e851e8689324ca9b29e0cf402694ffbd2d2cb6484f3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employers Liability Insurance.md
---
**Employers Liability Insurance** (EL) covers an employer's legal liability for bodily injury to its employees arising out of their employment, in the cases the workers compensation law does not make the employee's only remedy. In the United States it is Part Two of the standard Workers Compensation and Employers Liability Insurance Policy, which pays statutory [[Workers Compensation Insurance|workers compensation]] benefits under Part One and these liability claims under Part Two. The standard form is published by the National Council on Compensation Insurance (NCCI), although the GI-302 syllabus groups it with the ISO forms.

> $$\text{Paid}^{\text{acc}}_k = \min\Big(\sum_i X_{k,i},\ L_{\text{acc}}\Big)$$

> $$\text{Paid}^{\text{dis}}_j = \min\big(Y_j,\ L_{\text{emp}},\ G_{j-1}\big)$$

> $$G_j = G_{j-1} - \text{Paid}^{\text{dis}}_j$$

- **Symbols:** $X_{k,i}$ is the damages for employee $i$ injured in accident $k$, and $L_{\text{acc}}$ is the bodily injury by accident, each accident limit, which applies to all employees hurt in one accident together and has no annual aggregate. $Y_j$ is the damages for employee $j$'s occupational disease, $L_{\text{emp}}$ is the bodily injury by disease, each employee limit, and $G_{j-1}$ is what remains of the bodily injury by disease, policy limit, starting from $G_0 = L_{\text{pol}}$. Standard limits are \$100,000 each accident, \$500,000 disease-policy limit and \$100,000 disease-each employee, and higher limits are bought for a premium.
- **Why EL is needed:** Workers compensation is the exclusive remedy against the employer for a covered work injury, but there are exceptions. In a third-party-over action, an injured employee sues a third party, such as an equipment maker, which then sues the employer for contribution or indemnity. In a dual-capacity suit, the employee sues the employer in a second capacity, such as the maker of the product that caused the injury. Family members may sue for their own consequential injury, such as loss of consortium. And some employees, such as some farm or domestic workers in many states, fall outside the compensation law and can sue in [[Negligence|negligence]].
- **Part One, workers compensation:** The insurer pays the benefits the compensation law of each state listed in Item 3.A of the information page requires. Part One has no dollar limit, because the statute sets the benefits.
- **Part Two, employers liability:** The insurer pays damages because of bodily injury by accident or by disease, and defends the employer. Defense costs are paid in addition to the limits. Bodily injury by accident must occur during the policy period, and bodily injury by disease must be caused or aggravated by the conditions of the employment, with the employee's last day of last exposure during the policy period.
- **Part Two exclusions:** These move claims to other policies or to nobody. They include employment practices claims such as wrongful termination, discrimination and harassment, which belong under [[Employment Practices Liability Insurance|employment practices liability insurance]], liability assumed under contract, injury the employer intentionally caused, punitive damages for employees employed in violation of law, fines and penalties, obligations under the compensation law itself, and injury under the federal acts for railroad, maritime and longshore workers unless endorsed.
- **Part Three, other states insurance:** If the employer begins work in a state listed in Item 3.C after the policy starts, the policy applies there as if that state were listed in Item 3.A. The employer must tell the insurer at once.
- **Monopolistic states:** North Dakota, Ohio, Washington and Wyoming require compensation to be bought from a state fund, which does not provide employers liability. Employers there buy EL separately, as stop-gap coverage endorsed onto another policy.
- **Relation to other covers:** The [[Commercial General Liability|CGL]] excludes injury to employees, so EL fills that gap, and an [[Umbrella Liability Insurance|umbrella policy]] usually lists EL as underlying insurance and pays above its limits.

> [!example]- Applying the Three Limits Over One Policy Year {Example}
> A manufacturer's policy has standard EL limits: \$100,000 each accident, \$500,000 disease-policy limit and \$100,000 disease-each employee. During the year:
>
> 1. A scaffold collapse injures two employees. Each sues the scaffold maker, which sues the employer in third-party-over actions, and the employer's share is \$70,000 and \$60,000.
> 2. Six employees bring disease claims in this order, for \$150,000, \$90,000, \$250,000, \$120,000, \$80,000 and \$60,000.
>
> Find what the insurer pays and what the employer bears.
>
> > [!answer]-
> > **Accident.** Both injuries come from one accident, so they share one each accident limit.
> > $$
> > \begin{align*}
> > \text{Paid}^{\text{acc}} &= \min(70{,}000 + 60{,}000,\ 100{,}000) \\
> > &= 100{,}000
> > \end{align*}
> > $$
> > The employer bears \$30,000.
> >
> > **Disease.** Each claim is capped at \$100,000 and all of them draw on the \$500,000 policy limit. In thousands:
> >
> > | Claim | Damages | Paid | Disease limit left | Employer bears |
> > |---|---|---|---|---|
> > | 1 | 150 | 100 | 400 | 50 |
> > | 2 | 90 | 90 | 310 | 0 |
> > | 3 | 250 | 100 | 210 | 150 |
> > | 4 | 120 | 100 | 110 | 20 |
> > | 5 | 80 | 80 | 30 | 0 |
> > | 6 | 60 | 30 | 0 | 30 |
> >
> > The last claim is within the each employee limit, but only \$30,000 of the policy limit is left.
> > $$
> > \begin{align*}
> > \text{Paid}^{\text{dis}}_6 &= \min(60{,}000,\ 100{,}000,\ 30{,}000) \\
> > &= 30{,}000
> > \end{align*}
> > $$
> > The insurer pays \$600,000 in all, plus defense costs outside the limits, and the employer bears \$280,000. An umbrella with EL as underlying insurance would pay the \$280,000 above the EL limits, which is why umbrella insurers usually require higher EL limits than the standard ones.

> [!example]- Which Part Responds? {Example}
> A contractor's policy lists Texas in Item 3.A and all other states except the monopolistic ones in Item 3.C. Which part of the policy, if any, responds to each claim?
>
> 1. A carpenter breaks an arm on a Texas job site.
> 2. The carpenter's spouse sues the contractor for loss of consortium.
> 3. A laborer who was dismissed sues for wrongful termination.
> 4. The contractor starts a job in Oklahoma mid-term, and a worker there is injured.
>
> > [!answer]-
> > 1. **Part One** pays the statutory compensation benefits, with no dollar limit.
> > 2. **Part Two**, as a consequential injury to a family member, subject to the each accident limit.
> > 3. **Neither.** Employment practices claims are excluded from Part Two and belong under employment practices liability insurance.
> > 4. **Part Three.** Oklahoma is listed in Item 3.C, so the policy pays Oklahoma's benefits as if the state were in Item 3.A. The contractor should have told the insurer when the work began.

> [!tip]- How it appears on the exam
> - **GI-302:** Objective 9 asks why employers liability insurance is needed and how the standard workers compensation and employers liability policy meets that need. Expect a written answer naming the exceptions to the exclusive remedy and describing Parts One to Three.
> - **GI-302:** A short calculation may apply the three Part Two limits to a set of accident and disease claims, as in the first example. It pairs with objective 8 on the workers compensation system and objective 10 on premium bases and adjustments.
> - **Coverage questions:** A fact pattern may ask which part of the policy responds to a claim, or whether a claim falls to the CGL, the EL coverage or employment practices liability insurance.

> [!warning]- Exam traps
> - **The accident limit has no aggregate:** Each accident gets a fresh \$100,000, however many accidents occur. Only the disease coverage has a policy limit, and charging accident claims against it understates what the insurer still owes on disease claims.
> - **One accident, one limit:** Two employees hurt in the same accident share one each accident limit. Applying \$100,000 to each employee double counts the limit.
> - **Part One has no limit:** The statutory benefits are paid in full. Applying the EL limits to a compensation claim confuses the two parts.
> - **Employment practices are excluded:** Wrongful termination, discrimination and harassment are not bodily injury claims under Part Two, even though the claimant is an employee.
