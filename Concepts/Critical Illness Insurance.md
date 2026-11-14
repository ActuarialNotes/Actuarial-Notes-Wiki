---
aliases:
  - Critical Illness
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bc2a76da2a55b8b70a0584903636d3aaed93edceb19ed79ec46c821a4bd16a2f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Critical Illness Insurance.md
---
**Critical Illness Insurance** (CI) is insurance that pays a lump sum when the insured is first diagnosed with one of the serious conditions the policy lists, such as cancer, heart attack or stroke, provided the condition meets the policy's definition and the insured survives a short survival period after diagnosis. The benefit does not depend on the cost of treatment or on lost income, so the insured can spend it on anything.

CI is a long-duration [[Health Insurance|health insurance]] contract, priced from the incidence of the covered conditions in a [[Multiple State Model|multiple state model]] with healthy, diagnosed and dead states. For a policy of $n$ years on a healthy life aged $x$ paying a lump sum $B$ at the end of the year of diagnosis, the net single premium is

> $$\text{NSP} = B\,s \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x^{00}\,i_{x+k}$$

- $s$ is the probability of surviving the survival period after diagnosis.
- $v$ is the annual discount factor.
- ${}_kp_x^{00}$ is the probability of being alive and claim-free at time $k$.
- $i_{x+k}$ is the probability that a healthy life aged $x+k$ is first diagnosed with a covered condition in the year.

The formula assumes diagnoses fall at the end of the year, as a [[Multiple Decrement Model|multiple decrement]] approximation. The probability of staying alive and claim-free is built up year by year, and is

> $${}_{k+1}p_x^{00} = {}_kp_x^{00}\,\left(1 - i_{x+k} - q_{x+k}\right)$$

- $q_{x+k}$ is the probability of dying in the year without a covered diagnosis.

By the [[Equivalence Principle|equivalence principle]], the level annual premium is

> $$P = \frac{\text{NSP}}{\ddot{a}^{00}_{x:\overline{n}|}}$$

- $\ddot{a}^{00}_{x:\overline{n}|}$ is the present value of 1 a year paid at the start of each year while the insured is alive and claim-free.

> [!example]- What are the net single premium and the level annual premium of this 3-year CI policy? {Example}
> A 3-year term CI policy on a healthy life aged 50 pays $\$50{,}000$ at the end of the year of diagnosis if the insured survives the survival period, which happens with probability 0.95. Interest is 4%.
>
> | Year | First-diagnosis probability | Probability of death without diagnosis |
> | :--- | ---: | ---: |
> | 1 | 0.0040 | 0.0030 |
> | 2 | 0.0045 | 0.0033 |
> | 3 | 0.0050 | 0.0036 |
>
> > [!answer]-
> > - The benefit times the survival probability is $50{,}000 \times 0.95 = 47{,}500$.
> > - The claim-free probabilities are ${}_1p^{00} = 1 - 0.0040 - 0.0030 = 0.993$ and ${}_2p^{00} = 0.993\,(1 - 0.0045 - 0.0033) = 0.985255$.
> > - The year 1 term is $47{,}500 \times 0.0040/1.04 = 182.69$.
> > - The year 2 term is $47{,}500 \times 0.993 \times 0.0045/1.04^2 = 196.24$.
> > - The year 3 term is $47{,}500 \times 0.985255 \times 0.0050/1.04^3 = 208.02$.
> > - The net single premium is $182.69 + 196.24 + 208.02 = \$586.96$.
> > - The annuity is $\ddot{a}^{00}_{50:\overline{3}|} = 1 + 0.993/1.04 + 0.985255/1.04^2 = 2.86573$.
> > - The level premium is $586.96/2.86573 = \$204.82$ a year. Incidence rises with age, so the level premium builds a small reserve in the early years.

## Covered conditions and the survival period

Every product covers the core conditions of cancer, heart attack and stroke, which produce most claims. Many add coronary bypass surgery, kidney failure, major organ transplant, multiple sclerosis, paralysis, blindness and others. Each condition has a written definition of the severity it must reach. Early-stage cancers, for example, are usually excluded or paid a partial benefit.

The benefit is paid only if the insured survives a set period after diagnosis, often 30 days. This keeps the product distinct from [[Life Insurance|life insurance]], since a death soon after diagnosis is a death claim, not a CI claim.

## Product forms and who sells them

CI is sold as a stand-alone policy, as a rider accelerating part of a life insurance benefit, and in the U.S. mostly as a group voluntary benefit paid for by employees. Riders add a return of premium on expiry or on death without a claim, a second payment for a recurrence or a new condition, or a waiver of premium.

The product was first sold in South Africa in 1983, designed by the cardiac surgeon Marius Barnard. It spread to the U.K., Canada, Asia and Australia, where most CI is individual. U.S. sales are mostly worksite and group.

## Pricing data and risks

Incidence rates come from population cancer registries and hospital data adjusted to insured lives, from reinsurers' tables, and from the insurer's own experience as it builds. Population rates must be adjusted to the policy's definitions, for the effect of underwriting, and for the healthier lives who buy insurance.

Medical advances move the definitions under the price, which is called definition drift. Better screening finds more cancers, more sensitive tests diagnose more heart attacks, and better treatment means more people survive the survival period, so incidence rises. Buyers who know their family history or genetic results select against the insurer, which is [[Adverse Selection|adverse selection]]. Claims on a guaranteed-rate product can't be repriced. A return of premium rider adds lapse risk, because if fewer policyholders [[Lapse|lapse]] than assumed, more refunds are paid.

> [!example]- How much must the level premium rise after this definition drift? {Example}
> On the 3-year policy above, cancer makes up 65% of the expected claim cost, heart attack 20%, stroke 10% and other conditions 5%. Better screening raises the incidence of cancers that meet the definition by 15%, and a more sensitive test raises the incidence of qualifying heart attacks by 20%. The claim-free probabilities barely change.
>
> > [!answer]-
> > - Each condition's share of the claim cost grows by its own increase in incidence.
> > - The cost factor is $1 + 0.65(0.15) + 0.20(0.20) = 1.1375$.
> > - The new premium is $204.82 \times 1.1375 = \$232.98$, a rise of 13.75% with no change in the insured population's health.
> > - On a product with guaranteed rates the insurer bears the whole increase, which is why CI definitions are reviewed regularly and why many products tie the cancer definition to a stated severity rather than to whatever a test can detect.

> [!trap] Leaving out the survival period
> The benefit is paid only to those who survive the survival period, so the incidence of diagnosis is multiplied by $s$. Leaving out $s$ overstates the cost, because an insured who dies within the period receives nothing from the CI policy. The incidence also applies only to lives still alive and claim-free, not to everyone alive.
