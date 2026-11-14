---
aliases:
  - ISO WC
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a69b813a7045980cc787c38bf2b8c7fa8cad30c71636146d433c15fcceecd91e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employers Liability Insurance.md
---
**Employers Liability Insurance** (EL) is coverage for an employer's legal liability for bodily injury to its employees arising out of their employment, in the cases where the workers compensation law does not make the employee's only remedy. In the United States it is Part Two of the standard Workers Compensation and Employers Liability Insurance Policy, published by the National Council on Compensation Insurance (NCCI), although the GI-302 syllabus groups it with the ISO forms.

The standard policy has three parts:

1. **Part One, workers compensation.** The insurer pays the benefits that the compensation law of each state listed in Item 3.A of the information page requires. Part One has no dollar limit, because the statute sets the benefits.
2. **Part Two, employers liability.** The insurer pays damages because of bodily injury by accident or by disease, and defends the employer. Defense costs are paid in addition to the limits.
3. **Part Three, other states insurance.** If the employer begins work in a state listed in Item 3.C after the policy starts, the policy applies there as if that state were listed in Item 3.A. The employer must tell the insurer at once.

Bodily injury by accident must occur during the policy period. Bodily injury by disease must be caused or aggravated by the conditions of the employment, with the employee's last day of last exposure during the policy period.

> [!example]- Which part of this contractor's policy responds to each claim? {Example}
> A contractor's policy lists Texas in Item 3.A and all other states except the monopolistic ones in Item 3.C. Four claims arise:
>
> 1. A carpenter breaks an arm on a Texas job site.
> 2. The carpenter's spouse sues the contractor for loss of consortium.
> 3. A laborer who was dismissed sues for wrongful termination.
> 4. The contractor starts a job in Oklahoma mid-term, and a worker there is injured.
>
> > [!answer]-
> > - Claim 1 falls under Part One, which pays the statutory compensation benefits with no dollar limit.
> > - Claim 2 falls under Part Two, as a consequential injury to a family member, subject to the each accident limit.
> > - Claim 3 falls under neither part, because employment practices claims are excluded from Part Two.
> > - Claim 4 falls under Part Three, because Oklahoma is listed in Item 3.C. The policy pays Oklahoma's benefits as if the state were in Item 3.A, and the contractor should have told the insurer when the work began.

## Why employers liability insurance is needed

Workers compensation is the exclusive remedy against the employer for a covered work injury, but there are exceptions, and Part Two covers them:

- In a third-party-over action, an injured employee sues a third party, such as an equipment maker, which then sues the employer for contribution or indemnity.
- In a dual-capacity suit, the employee sues the employer in a second capacity, such as the maker of the product that caused the injury.
- Family members may sue for their own consequential injury, such as loss of consortium.
- Some employees, such as some farm or domestic workers in many states, fall outside the compensation law and can sue in [[Negligence|negligence]].

The [[Commercial General Liability|CGL]] excludes injury to employees, so EL fills that gap. An [[Umbrella Liability Insurance|umbrella policy]] usually lists EL as underlying insurance and pays above its limits.

## Limits of Part Two

Part Two has three limits. Standard limits are \$100,000 each accident, \$500,000 disease-policy limit and \$100,000 disease-each employee, and higher limits are bought for a premium. For accident $k$, the insurer pays

> $$\text{Paid}^{\text{acc}}_k = \min\Big(\sum_i X_{k,i},\ L_{\text{acc}}\Big)$$

- $X_{k,i}$ is the damages for employee $i$ injured in accident $k$.
- $L_{\text{acc}}$ is the bodily injury by accident, each accident limit. It applies to all employees hurt in one accident together and has no annual aggregate.

For the $j$th disease claim of the policy year, the insurer pays

> $$\text{Paid}^{\text{dis}}_j = \min\big(Y_j,\ L_{\text{emp}},\ G_{j-1}\big)$$

- $Y_j$ is the damages for employee $j$'s occupational disease.
- $L_{\text{emp}}$ is the bodily injury by disease, each employee limit.
- $G_{j-1}$ is what remains of the bodily injury by disease, policy limit after the earlier claims, starting from $G_0 = L_{\text{pol}}$.

After each disease claim, what remains of the policy limit is

> $$G_j = G_{j-1} - \text{Paid}^{\text{dis}}_j$$

> [!example]- A scaffold collapse injures two employees, and the employer's share of their third-party-over actions is $\$70{,}000$ and $\$60{,}000$. What does the insurer pay under standard limits? {Example}
> - Both injuries come from one accident, so they share one each accident limit.
> - The insurer pays $\min(130{,}000,\ 100{,}000) = \$100{,}000$.
> - The employer bears the other $\$30{,}000$.

> [!example]- What does the insurer pay on these disease claims, and what does the employer bear? {Example}
> A manufacturer's policy has standard limits. Six employees bring disease claims during the year, in this order (in thousands of dollars):
>
> | Claim | 1 | 2 | 3 | 4 | 5 | 6 |
> | --- | ---: | ---: | ---: | ---: | ---: | ---: |
> | Damages | 150 | 90 | 250 | 120 | 80 | 60 |
>
> > [!answer]-
> > - Each claim is capped at $100$ and all of them draw on the $500$ policy limit.
> >
> > | Claim | Paid | Limit left | Employer bears |
> > | --- | ---: | ---: | ---: |
> > | 1 | 100 | 400 | 50 |
> > | 2 | 90 | 310 | 0 |
> > | 3 | 100 | 210 | 150 |
> > | 4 | 100 | 110 | 20 |
> > | 5 | 80 | 30 | 0 |
> > | 6 | 30 | 0 | 30 |
> >
> > - The last claim is within the each employee limit, but only $30$ of the policy limit is left, so $\min(60,\ 100,\ 30) = 30$ is paid.
> > - The insurer pays $\$500{,}000$ in all, plus defense costs outside the limits, and the employer bears $\$250{,}000$.
> > - An umbrella with EL as underlying insurance would pay the $\$250{,}000$ above the EL limits, which is why umbrella insurers usually require higher EL limits than the standard ones.

## Exclusions and stop-gap coverage

The Part Two exclusions move claims to other policies or to nobody. They include employment practices claims such as wrongful termination, discrimination and harassment, which belong under [[Employment Practices Liability Insurance|employment practices liability insurance]]. They also exclude liability assumed under contract, injury the employer intentionally caused, punitive damages for employees employed in violation of law, fines and penalties, and obligations under the compensation law itself. Injury under the federal acts for railroad, maritime and longshore workers is excluded unless endorsed.

North Dakota, Ohio, Washington and Wyoming are monopolistic states. They require compensation to be bought from a state fund, which does not provide employers liability. Employers there buy EL separately, as stop-gap coverage endorsed onto another policy.

> [!trap] Giving each employee in one accident a separate limit
> Two employees hurt in the same accident share one each accident limit, so applying \$100,000 to each double counts it. Each new accident gets a fresh limit, with no aggregate. Only the disease coverage has a policy limit, and charging accident claims against it understates what the insurer still owes on disease claims.
