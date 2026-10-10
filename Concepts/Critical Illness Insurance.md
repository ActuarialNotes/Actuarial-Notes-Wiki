---
aliases:
  - Critical Illness
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3f57a7b3bb2e50bf018c93fd4bc5be4ca555c17e1ef7b83f4ad35e608cfd0b66
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Critical Illness Insurance.md
---
**Critical Illness Insurance** (CI) pays a lump sum when the insured is first diagnosed with one of the serious conditions the policy lists, such as cancer, heart attack or stroke, provided the condition meets the policy's definition and the insured survives a short survival period after diagnosis. The benefit does not depend on the cost of treatment or on lost income, so the insured can spend it on anything. It is a long-duration [[Health Insurance|health insurance]] contract, priced from the incidence of the covered conditions in a [[Multiple State Model|multiple state model]] with healthy, diagnosed and dead states.

> $$\text{NSP} = B\,s \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x^{00}\,i_{x+k}$$

> $${}_{k+1}p_x^{00} = {}_kp_x^{00}\,\left(1 - i_{x+k} - q_{x+k}\right)$$

> $$P = \frac{\text{NSP}}{\ddot{a}^{00}_{x:\overline{n}|}}$$

- **Symbols:** $B$ is the lump sum, $s$ the probability of surviving the survival period after diagnosis, $v$ the annual discount factor, $i_{x+k}$ the probability that a healthy life aged $x+k$ is first diagnosed with a covered condition in the year, and $q_{x+k}$ the probability of dying in the year without a covered diagnosis. ${}_kp_x^{00}$ is the probability of being alive and claim-free at time $k$, and $\ddot{a}^{00}_{x:\overline{n}|}$ is the present value of 1 a year paid at the start of each year while the insured is in that state, so $P$ is the level annual premium by the [[Equivalence Principle|equivalence principle]]. The formula assumes diagnoses fall at the end of the year, as a [[Multiple Decrement Model|multiple decrement]] approximation.
- **Covered conditions:** Every product covers the core conditions of cancer, heart attack and stroke, which produce most claims, and many add coronary bypass surgery, kidney failure, major organ transplant, multiple sclerosis, paralysis, blindness and others. Each condition has a written definition of the severity it must reach. Early-stage cancers, for example, are usually excluded or paid a partial benefit.
- **Survival period:** The benefit is paid only if the insured survives a set period after diagnosis, often 30 days. This keeps the product distinct from [[Life Insurance|life insurance]], since a death soon after diagnosis is a death claim, not a CI claim.
- **Product forms:** CI is sold as a stand-alone policy, as a rider accelerating part of a life insurance benefit, and in the U.S. mostly as a group voluntary benefit paid for by employees. Riders add a return of premium on expiry or on death without a claim, a second payment for a recurrence or a new condition, or a waiver of premium.
- **Pricing data:** Incidence rates come from population cancer registries and hospital data adjusted to insured lives, from reinsurers' tables, and from the insurer's own experience as it builds. Population rates must be adjusted to the policy's definitions, for the effect of underwriting, and for the healthier lives who buy insurance.
- **Key risks:** Medical advances move the definitions under the price, which is called definition drift. Better screening finds more cancers, more sensitive tests diagnose more heart attacks, and better treatment means more people survive the survival period, so incidence rises. Buyers who know their family history or genetic results select against the insurer, which is [[Adverse Selection|adverse selection]], and claims on a guaranteed-rate product can't be repriced. A return of premium rider adds lapse risk, because if fewer policyholders [[Lapse|lapse]] than assumed, more refunds are paid.
- **Origin:** The product was first sold in South Africa in 1983, designed by the cardiac surgeon Marius Barnard, and spread to the U.K., Canada, Asia and Australia, where most CI is individual. U.S. sales are mostly worksite and group.

> [!example]- Net Single Premium and Level Premium for a Term CI Policy {Example}
> A 3-year term CI policy on a healthy life aged 50 pays \$50,000 at the end of the year of diagnosis if the insured survives the survival period, which happens with probability 0.95. The illustrative first-diagnosis probabilities are 0.0040, 0.0045 and 0.0050 for years 1 to 3, the probabilities of dying without a diagnosis are 0.0030, 0.0033 and 0.0036, and $i = 4\%$. Find the net single premium and the level annual net premium paid at the start of each year while the insured is healthy.
>
> > [!answer]-
> > The benefit times the survival probability is $50{,}000 \times 0.95 = 47{,}500$. The probabilities of being alive and claim-free are ${}_1p^{00} = 1 - 0.0040 - 0.0030 = 0.993$ and ${}_2p^{00} = 0.993\,(1 - 0.0045 - 0.0033) = 0.985255$.
> > $$
> > \begin{align*}
> > \text{NSP} &= 47{,}500 \Big(\frac{0.0040}{1.04} + \frac{0.993(0.0045)}{1.04^2} \\
> > &\quad + \frac{0.985255(0.0050)}{1.04^3}\Big) \\
> > &= 182.69 + 196.24 + 208.02 \\
> > &= 586.96 \\
> > \ddot{a}^{00}_{50:\overline{3}|} &= 1 + \frac{0.993}{1.04} + \frac{0.985255}{1.04^2} \\
> > &= 2.86573 \\
> > P &= \frac{586.96}{2.86573} \\
> > &= 204.82
> > \end{align*}
> > $$
> > The level premium is \$204.82 a year. The cost rises each year because incidence rises with age, so the level premium builds a small reserve in the early years.

> [!example]- The Cost of Definition Drift {Example}
> On the policy above, cancer makes up 65% of the expected claim cost, heart attack 20%, stroke 10% and other conditions 5%. Better screening raises the incidence of cancers that meet the definition by 15%, and a more sensitive diagnostic test raises the incidence of qualifying heart attacks by 20%. Find the new level premium, assuming the claim-free probabilities barely change.
>
> > [!answer]-
> > Each condition's share of the claim cost grows by its own increase in incidence.
> > $$
> > \begin{align*}
> > \text{Factor} &= 1 + 0.65(0.15) + 0.20(0.20) \\
> > &= 1.1375 \\
> > P' &= 204.82 \times 1.1375 \\
> > &= 232.98
> > \end{align*}
> > $$
> > The premium needs to rise 13.75% with no change in the insured population's health. On a product with guaranteed rates, the insurer bears the whole increase, which is why CI definitions are reviewed regularly and why many products tie the cancer definition to a stated severity rather than to whatever a test can detect.

> [!tip]- How it appears on the exam
> - **CP-321 objective 1:** Written questions ask candidates to describe a CI contract, the organizations that offer it and why, and the moral hazard and financial and legal risks it carries, drawing on the Health Watch article "Critical Illness Turns 40!".
> - **Risks:** A common written part asks how medical advances, definitions and the survival period affect claims, and how an insurer controls definition drift and anti-selection.
> - **Calculation:** Questions on manual rates give incidence, mortality and survival probabilities and ask for a net premium or a claim cost by age, often linked to the multiple state treatment in [[Health Insurance]].

> [!warning]- Exam traps
> - **Survival period:** The benefit is paid only to those who survive it, so the incidence of diagnosis is multiplied by $s$. Leaving out $s$ overstates the cost, because an insured who dies within the period receives nothing from the CI policy.
> - **Incidence is from the healthy state:** The incidence rate applies only to lives still alive and claim-free. Applying it to everyone who is alive overstates claims, since a life that has claimed can't claim again on a single-pay policy.
> - **Population versus insured definitions:** A registry's cancer rate counts every diagnosed cancer, including early-stage ones the policy excludes. Using it without adjusting to the policy's definition and to insured lives misprices the product.
> - **Return of premium:** A return of premium rider is paid to those who don't claim and don't lapse. Ignoring lapses, or assuming too many, understates or overstates its cost.
