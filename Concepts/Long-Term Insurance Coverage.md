---
aliases:
  - Long-Term Insurance Benefit
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:09e60d53dde5244b1c1887eac949251b349840d776d39f52fdf1063d8cb5177b
  sources:
    - "Dickson, Hardy & Waters, AMLCR 3rd ed. (CUP 2020) — publisher's excerpt, Ch. 1 §§1.1-1.3.5, pp.1-10, sha256:31487d2e0f23e14b52e889f99ea95d4e7bfe00d9059ce1796d18d15f0dc94656 — https://assets.cambridge.org/97811084/78083/excerpt/9781108478083_excerpt.pdf"
    - "SOA Exam FAM-L sample questions (Oct 2024), Q1.1-1.4, pp.3-4, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L sample solutions (Oct 2024), Q1.1-1.4, p.2, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam ALTAM sample written-answer questions (Jan 2026), Q1 p.2 (LTC multiple state), Q16 p.31 (CI on diagnosis), Q49 p.89 (Type B UL, surrenders), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM sample written-answer solutions (Jan 2026), DI elimination period p.27; Markov critique p.29; Q40(a) DC description p.80; Q53 UL p.105, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
    - "SOA Tables for Exam FAM (Oct 2024), SULT at i=0.05, pp.20-21 (ages 50, 55, 60, 65, 70-72, 80), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "U.S. Administration for Community Living, What is long-term care insurance?, whole page, sha256:73e93bb3582774260ce46b93582e373816335198ffc595fb057b58bdc0dc2c59 — https://acl.gov/ltc/costs-and-who-pays/what-is-long-term-care-insurance"
    - "SOA Exam FAM syllabus, October 2026, Readings, p.8; Topics 5 and 7, pp.5-6, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "U.S. Department of Labor, Types of Retirement Plans (https://www.dol.gov/general/topic/retirement/typesofplans), read 2026-10-31 by web fetch; no sha256 — the site refuses scripted downloads"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Long-Term Insurance Coverage.md
---
**A Long-Term Insurance Coverage** is an [[Insurance Coverage|insurance coverage]] written for many years or for life: life insurance, annuities, long-term health insurance and pension plans. The cash flows run for decades and depend on the survival or health of the insured, so they are valued with interest and mortality, paid for by level premiums, and backed by policy values.

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
- **What makes a coverage long-term:** A level premium is more than the cost of cover in the early years and less than it later, so the insurer holds a policy value that earns investment income for decades. Interest therefore matters as much as mortality.
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
