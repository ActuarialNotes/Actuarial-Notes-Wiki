---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d9ecd07cf05b1157d75cabf25730135887339b14e9e373deb3d196bd4d398584
  sources:
    - "SOA Exam FAM Sample Solutions (version Aug 18, 2026), Q1.1 and Q1.2 p.2, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q7.26 p.115; Q1.1-1.2 p.3, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Insurance.md
---

**Life Insurance** is a contract that pays a benefit on the death of the insured (and, for an endowment, on survival to the end of the term), in exchange for premiums paid while the insured is alive. It is valued through its present value [[Random Variable|random variable]] $Z$, whose [[Expected Value|expected value]] is the expected present value (EPV) written $A$ in standard actuarial notation.

For a [[Whole Life Insurance|whole life insurance]] of 1 on $(x)$, paid at the end of the year of death, the present value is

> $$Z = v^{K_x + 1}$$

- $K_x$ is the curtate future lifetime of $(x)$, so the benefit is paid at the end of the year of death.
- $v = 1/(1+i)$ is the discount factor.

$Z$ takes one value for each possible year of death, with the probability of death in that year. Its EPV is $A_x$, and a benefit of $B$ has EPV $B\,A_x$. Paid at the moment of death the time is $T_x$ ($\bar{A}$), so $Z = v^{T_x}$, and a benefit $b_t$ that depends on the time of death gives $Z = b_{T_x}v^{T_x}$. Paid at the end of the $1/m$-th of a year of death, the EPV is $A^{(m)}$.

## Term insurance

An $n$-year term insurance pays only on death within $n$ years:

> $$Z = v^{K_x + 1}\,\mathbb{1}\{K_x < n\}$$

- $\mathbb{1}\{K_x < n\}$ is 1 if $(x)$ dies within $n$ years and 0 otherwise.

Its EPV is the sum, over each year of the term, of the discount factor times the probability of surviving $k$ years and dying in the next:

> $$A^{1}_{x:\overline{n}|} = \sum_{k=0}^{n-1} v^{k+1}\;{}_kp_x\,q_{x+k}$$

> [!example]- What is the EPV of this 3-year term insurance? {Example}
> A 3-year term insurance on $(60)$ pays 100,000 at the end of the year of death. The mortality rates are $q_{60} = 0.010$, $q_{61} = 0.012$ and $q_{62} = 0.014$, and $i = 5\%$.
>
> > [!answer]-
> > - The probabilities of death in years 1, 2 and 3 are $0.010$, $0.99(0.012) = 0.01188$ and $0.97812(0.014) = 0.013694$.
> > - $A^{1}_{60:\overline{3}|} = 0.010v + 0.01188v^2 + 0.013694v^3$.
> > - That is $0.009524 + 0.010776 + 0.011829 = 0.032128$.
> > - The EPV is $100{,}000(0.032128) = \$3{,}212.84$.

## Pure endowment and endowment insurance

A [[Pure Endowment|pure endowment]] pays 1 at time $n$ if $(x)$ is then alive. Its EPV is

> $${}_nE_x = v^n\,{}_np_x$$

An [[Endowment Insurance|endowment insurance]] pays on death within $n$ years or on survival to $n$:

> $$Z = v^{\min(K_x + 1,\, n)}$$

It is a term insurance plus a pure endowment, so its EPV is

> $$A_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + {}_nE_x$$

> [!example]- For the same life and rates, what is the EPV of a 3-year endowment insurance of 1? {Example}
> - ${}_3p_{60} = (0.99)(0.988)(0.986) = 0.96443$.
> - ${}_3E_{60} = 0.96443v^3 = 0.833108$.
> - $A_{60:\overline{3}|} = 0.032128 + 0.833108 = 0.865236$.

## Variance of the present value

The second moment ${}^2\!A$ is $A$ computed at $v^2$, that is at the force of interest $2\delta$. For a benefit of $B$, the variance is

> $$\text{Var}(Z) = B^2\left[{}^2\!A - A^2\right]$$

For an endowment insurance, the term and the pure endowment never both pay, so the second moments add: ${}^2\!A_{x:\overline{n}|} = {}^2\!A^{1}_{x:\overline{n}|} + v^{2n}\,{}_np_x$. Their covariance is $-A^{1}_{x:\overline{n}|}\,{}_nE_x$, so the endowment's variance is not the sum of the two variances.

> [!example]- What are the standard deviations of the present values of the 3-year term and endowment insurances of 100,000 above? {Example}
> - ${}^2\!A^{1}_{60:\overline{3}|} = 0.010v^2 + 0.01188v^4 + 0.013694v^6 = 0.029062$.
> - The term insurance's SD is $100{,}000\sqrt{0.029062 - 0.032128^2} = 16{,}742$, five times its EPV.
> - ${}^2\!A_{60:\overline{3}|} = 0.029062 + 0.96443v^6 = 0.748732$.
> - The endowment's variance per unit is $0.748732 - 0.865236^2 = 0.0000986$.
> - Its SD is $100{,}000\sqrt{0.0000986} = 993$, because it pays at time 3 at the latest.

## Insurance and annuity

Insurance and [[Life Annuity|annuity]] EPVs are linked by $A_{x:\overline{n}|} = 1 - d\,\ddot{a}_{x:\overline{n}|}$, and for whole life by

> $$A_x = 1 - d\,\ddot{a}_x$$

- $d = i/(1+i)$ is the effective annual rate of discount.

Values of $A_x$ and $\ddot{a}_x$ at a given age and interest rate are read from the Standard Ultimate Life Table.

> [!example]- For the same life and rates, what is $\ddot{a}_{60:\overline{3}|}$? {Example}
> - $d = 0.05/1.05$.
> - $\ddot{a}_{60:\overline{3}|} = (1 - 0.865236)/d = 2.83004$.
> - Directly, $1 + 0.99v + 0.97812v^2 = 2.83004$.

## Continuous and $m$-thly insurance under UDD

Under the uniform distribution of deaths [[Fractional Age Assumption|fractional age assumption]], the EPV paid at the moment of death is

> $$\bar{A}_x = \frac{i}{\delta}A_x$$

and the EPV paid at the end of the $1/m$-th of a year of death is

> $$A^{(m)}_x = \frac{i}{i^{(m)}}A_x$$

- $\delta = \ln(1+i)$ is the force of interest, and $i^{(m)}$ is the nominal rate convertible $m$ times a year.

For a term or endowment insurance, only the death part is adjusted. The pure endowment is paid at a fixed time.

> [!example]- At $i = 5\%$, $A_{50} = 0.24905$. Under UDD, what are $\bar{A}_{50}$ and $A^{(12)}_{50}$? {Example}
> - $\delta = \ln 1.05 = 0.048790$ and $i^{(12)} = 12(1.05^{1/12} - 1) = 0.048889$.
> - $\bar{A}_{50} = (0.05/0.048790)(0.24905) = 0.25523$.
> - $A^{(12)}_{50} = (0.05/0.048889)(0.24905) = 0.25471$.

## Products with account values

Policies such as [[Universal Life Insurance|universal life]] and equity-linked contracts combine savings with protection. Over the last few decades life insurance products, and the way insurers manage their risks, have changed radically and grown more complex. The reasons given are more sophisticated policyholders, more competition among life insurers and more computing power, together with more complex risk management techniques.

The distribution method affects how much underwriting is done. A direct-marketed product with a low face amount may have very limited underwriting. The actuary then assumes higher than normal mortality, which the low expense of selling the business partly offsets.

> [!trap] Squaring the EPV to get the second moment
> ${}^2\!A$ is computed at $v^2$ (or $2\delta$), not as $(A)^2$. The two differ, and their difference is the variance.
