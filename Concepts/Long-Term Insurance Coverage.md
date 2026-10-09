---
aliases:
  - Long-Term Insurance Benefit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cdaa148bebaac149667ec24e241a80bccf664974dea9e3388ccc660818d2271a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Long-Term Insurance Coverage.md
---
**A Long-Term Insurance Coverage** is an [[Insurance Coverage|insurance coverage]] written for many years or for life, whose guaranteed terms the [[Insurer|insurer]] cannot change while the contract is in force: life insurance, annuities, long-term health insurance and pension plans. The cash flows run for decades and depend on the survival or health of the insured, so they are valued with interest and mortality, paid for by level premiums, and backed by policy values.

> $$\text{EPV} = \sum_{k} \text{CF}_k\, v^{k}\,\Pr(\text{CF}_k \text{ is paid})$$

> $$\text{EPV(premiums)} = \text{EPV(benefits)} + \text{EPV(expenses)}$$

> $${}_tV = \text{EPV}_t(\text{outgo}) - \text{EPV}_t(\text{income})$$

| Coverage | What it pays | Main risks to the provider |
|---|---|---|
| [[Term Life Insurance]] | Sum insured on death within $n$ years | Mortality, lapse |
| [[Whole Life Insurance]] | Sum insured on death whenever it occurs | Mortality, interest |
| [[Endowment Insurance]] | Sum insured on death within $n$ years or on survival to $n$ | Interest |
| [[Universal Life Insurance]] | Death benefit plus an account value credited with interest | Interest, lapse |
| [[Life Annuity]] | Income while the annuitant is alive | Longevity, interest |
| Disability income insurance | Income while the insured is sick | Morbidity, recovery |
| Long-term care insurance | Care costs while the insured cannot live independently | Morbidity, longevity |
| Critical illness insurance | Lump sum on diagnosis of a listed illness | Morbidity |
| [[Defined Benefit Plan]] | Pension set by a formula | Sponsor: investment, longevity |
| [[Defined Contribution Plan]] | Whatever the member's account buys | Member: investment, annuity price |

- **Symbols:** $\text{CF}_k$ is a cash flow due at time $k$, paid only if the life is in the state the contract requires, such as alive, dead or sick. The second block is the [[Equivalence Principle|equivalence principle]], and the third is the policy value, the long-term form of a [[Reserve|reserve]].
- **What makes a coverage long-term:** The terms are guaranteed, so the insurer cannot reprice when mortality, morbidity or interest rates move against it. A level premium is more than the cost of cover in the early years and less than it later, so the insurer holds a policy value that earns investment income for decades. Interest therefore matters as much as mortality.
- **Health:** Long-term [[Health Insurance|health insurance]] is modelled with a [[Multiple State Model|multiple state model]], in which benefits depend on being sick or on falling sick.
- **Contrast:** A [[Short-Term Insurance Coverage|short-term coverage]] is priced one term at a time, so its premium is close to that term's expected claims, and its reserves are for claims already incurred rather than for future guaranteed benefits.

> [!example]- Why a Level Premium Builds a Reserve {Example}
> A fully discrete whole life insurance of \$100,000 on $(50)$ has the SULT net premium \$1,111.99 at $i = 5\%$, as in [[Equivalence Principle]]. The cost of one year's cover at age $y$, paid at the start of the year, is $100{,}000\,v\,q_y$. Compare it with the premium at ages 50, 60, 70 and 80, given $q_{50} = 0.001209$, $q_{60} = 0.003398$, $q_{70} = 0.010413$ and $q_{80} = 0.032658$. At what age does the cost first exceed the premium, given $q_{71} = 0.011670$ and $q_{72} = 0.013081$?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Age 50: } 100{,}000(0.001209)/1.05 &= 115.14 \\
> > \text{Age 60: } 100{,}000(0.003398)/1.05 &= 323.62 \\
> > \text{Age 70: } 100{,}000(0.010413)/1.05 &= 991.71 \\
> > \text{Age 80: } 100{,}000(0.032658)/1.05 &= 3{,}110.29
> > \end{align*}
> > $$
> > The cost is \$1,111.43 at age 71 and \$1,245.81 at age 72, so it first exceeds the level premium at age 72. Until then, each premium pays more than the year's cover, and the excess is held as the policy value and earns interest. From age 72 on, that policy value pays for the shortfall, which is why a guaranteed level premium needs a reserve that a one-year coverage does not.

> [!example]- Interest Sensitivity of Long-Term Values {Example}
> On the SULT, $\ddot{a}_{65} = 13.5498$ and $A_{65} = 0.35477$ at $5\%$, and $\ddot{a}_{65} = 14.8746$ and $A_{65} = 0.42790$ at $4\%$, with $q_{65} = 0.005915$. Find the change in the EPV of a life annuity-due of \$10,000 a year on $(65)$, in $A_{65}$, and in the EPV of a one-year term insurance of \$100,000 on $(65)$ when the interest rate falls from $5\%$ to $4\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Annuity: } 10{,}000(13.5498) &= 135{,}498 \\
> > 10{,}000(14.8746) &= 148{,}746 \\
> > \text{Change} &= +9.8\% \\
> > \text{Whole life: } 0.42790/0.35477 - 1 &= +20.6\% \\
> > \text{One-year term: } 100{,}000(0.005915)/1.05 &= 563.33 \\
> > 100{,}000(0.005915)/1.04 &= 568.75 \\
> > \text{Change} &= +1.0\%
> > \end{align*}
> > $$
> > A one-point fall in the interest rate barely moves a one-year cover, but it raises the cost of the long-term benefits by 10% to 21%. An insurer that guaranteed these benefits at $5\%$ bears that cost, which is the interest rate risk of a long-term coverage.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to identify the long-term coverages, including life, health, annuities, and DB and DC pension plans, from a description of their benefits, and to contrast them, for example by who bears the investment risk in a pension plan.
> - **Calculations:** FAM's sections on present value random variables and on premiums and policy values are the calculation side of the same coverages: EPVs, premiums by the equivalence or portfolio percentile principle, policy values, and the effect of a change in mortality or interest.
> - **ALTAM** asks candidates to critique the Markov assumption in multiple state models for long-term benefits. A typical point is that the chance of recovering from sickness depends on how long the life has been sick, which a Markov model ignores.

> [!warning]- Exam traps
> - **Long-term health is not group medical:** Disability income, long-term care and critical illness are long-term coverages with level premiums. Group medical insurance, renewed and repriced each year, is short-term, so its reserves are chiefly claim reserves.
> - **Who bears the risk:** In a DB plan the sponsor bears investment and longevity risk, and in a DC plan the member does. Reversing the two describes the other kind of plan.
> - **Endowment versus pure endowment:** An endowment insurance pays on death within the term as well as on survival. A [[Pure Endowment|pure endowment]] pays only on survival, so a question about "the death benefit of an endowment" refers to the endowment insurance.
