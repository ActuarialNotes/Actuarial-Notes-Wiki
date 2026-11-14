---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:4f3f184e9c8df8b11533bfb0a1098c18ccf8b60740ac13067547d9f24f000b62
  sources:
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "Perryman, International Actuarial Notation, PCAS XXXVI (1949), pp.124-130 (general principles of the four spaces; p, q, mu, e, A, E, a; trema, bar, ring, (m); numeral over the status; nEx; endowment assurance; selection [x]+t), sha256:819cf715537c2dd1dd6adbd72e41aa9c6dd7f4b8c5571ab6795f79182b2949d2 — https://www.casact.org/sites/default/files/database/proceed_proceed49_49123.pdf"
    - "SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table pp.20-21; Makeham's law formula p.22, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "SOA Exam FAM-L sample solutions (2024-10), Q4.12 p.23 (Cov(Z1,Z2) = -E[Z1]E[Z2]), Q4.19 p.26, Q6.3-6.4 p.35 (second moments, variances), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Endowment Insurance.md
---

An **Endowment Insurance** is a life insurance that pays a sum insured on the death of the insured within a term of $n$ years, or at the end of the term if the insured survives it, so the benefit is certain to be paid by time $n$. For a life aged $x$ with the death benefit paid at the end of the year of death, its present value random variable is

> $$Z = v^{\min(K_x+1,\,n)}$$

- $K_x$ is the curtate [[Future Lifetime Random Variable|future lifetime]] of $(x)$.
- $v = 1/(1+i)$ is the annual discount factor.

A death in year $n$ is paid at time $n$, the same time as the maturity benefit, so $Z = v^n$ with probability ${}_{n-1}p_x$.

An endowment insurance is a [[Term Life Insurance|term insurance]] plus a [[Pure Endowment|pure endowment]], so its expected present value (EPV) is

> $$A_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + {}_nE_x$$

- $A^{1}_{x:\overline{n}|}$ is the EPV of an $n$-year term insurance of 1.
- ${}_nE_x = v^n\,{}_np_x$ is the EPV of an $n$-year pure endowment of 1.

Because the benefit is paid by time $n$ at the latest, $A_{x:\overline{n}|} \ge v^n$, and for a young life most of the value is the maturity payment.

> [!example]- What are $A_{45:\overline{20}|}$ and the net annual premium for this endowment insurance? {Example}
> A fully discrete 20-year endowment insurance of $\$100{,}000$ is issued to $(45)$. On the SULT at $5\%$, $A_{45} = 0.15161$, $A_{65} = 0.35477$, ${}_{20}E_{45} = 0.35994$ and $\ddot{a}_{45} = 17.8162$.
>
> > [!answer]-
> > - The term part is the whole life value less a whole life insurance deferred 20 years, $A^{1}_{45:\overline{20}|} = 0.15161 - 0.35994(0.35477) = 0.023914$.
> > - Adding the pure endowment gives $A_{45:\overline{20}|} = 0.023914 + 0.35994 = 0.383854$.
> > - With $d = 0.05/1.05$, the annuity-due is $\ddot{a}_{45:\overline{20}|} = (1 - 0.383854)/d = 12.9391$.
> > - The net annual premium is $38{,}385.4/12.9391 = \$2{,}966.62$.
> > - The whole life premium is $15{,}161/17.8162 = \$850.97$. The endowment costs three and a half times as much, because $94\%$ of its EPV is the pure endowment.

## Variance of the present value

The variance of the present value of an endowment insurance of 1 is

> $$\text{Var}(Z) = {}^2A_{x:\overline{n}|} - \left(A_{x:\overline{n}|}\right)^2$$

- ${}^2A_{x:\overline{n}|}$ is the EPV at $v^2$, which equals ${}^2A^{1}_{x:\overline{n}|} + v^{2n}\,{}_np_x$.

For a benefit of $b$, the variance is $b^2$ times this. $Z$ is the sum of the term insurance and pure endowment present values, $Z_1 + Z_2$. They can never both be positive, so $E[Z_1 Z_2] = 0$ and $\text{Cov}(Z_1, Z_2) = -A^{1}_{x:\overline{n}|}\,{}_nE_x$. The second moments therefore add, but the variances do not.

> [!trap] Adding the variances of the parts
> The variance of $Z$ is not $\text{Var}(Z_1) + \text{Var}(Z_2)$, because the covariance $-A^{1}_{x:\overline{n}|}\,{}_nE_x$ is negative. Leaving it out overstates the variance. Add $2\,\text{Cov}(Z_1, Z_2)$, or work from the second moments.

## Relationship with the temporary annuity-due

The present value of an $n$-year temporary [[Life Annuity|life annuity]]-due is $Y = (1 - Z)/d$. Taking expectations, its EPV is

> $$\ddot{a}_{x:\overline{n}|} = \frac{1 - A_{x:\overline{n}|}}{d}$$

- $d = i/(1+i)$ is the annual rate of discount.

Equivalently $A_{x:\overline{n}|} = 1 - d\,\ddot{a}_{x:\overline{n}|}$, and $\text{Var}(Y) = \text{Var}(Z)/d^2$. The identity needs the endowment insurance value, not the term value $A^{1}_{x:\overline{n}|}$. It follows that the net annual premium per unit is $A_{x:\overline{n}|}/\ddot{a}_{x:\overline{n}|} = d\,A_{x:\overline{n}|}/(1 - A_{x:\overline{n}|})$, which is also $1/\ddot{a}_{x:\overline{n}|} - d$.

## Death benefit paid at the moment of death

When the death benefit is paid at the moment of death, $\bar{Z} = v^{\min(T_x,\,n)}$ and $\bar{a}_{x:\overline{n}|} = (1 - \bar{A}_{x:\overline{n}|})/\delta$. Under [[Fractional Age Assumption|UDD]] only the term part is converted to continuous, so the EPV is

> $$\bar{A}_{x:\overline{n}|} = \frac{i}{\delta}A^{1}_{x:\overline{n}|} + {}_nE_x$$

- $\delta = \ln(1+i)$ is the force of interest.

The maturity payment is made at time $n$ in either case, so multiplying all of $A_{x:\overline{n}|}$ by $i/\delta$ overstates the value.

> [!example]- Under UDD with $\delta = \ln 1.05 = 0.048790$, what are $\bar{A}_{45:\overline{20}|}$ and $\bar{a}_{45:\overline{20}|}$ for the policy above? {Example}
> - Only the term part is multiplied by $i/\delta = 1.024797$, which gives $1.024797(0.023914) = 0.024507$.
> - Adding the pure endowment gives $\bar{A}_{45:\overline{20}|} = 0.024507 + 0.35994 = 0.384447$.
> - The continuous annuity is $\bar{a}_{45:\overline{20}|} = (1 - 0.384447)/0.048790 = 12.6164$.
> - Paying claims sooner adds less than $0.2\%$ to the value, because the death benefit is a small part of it.
