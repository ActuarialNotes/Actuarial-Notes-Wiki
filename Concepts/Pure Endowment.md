---
aliases:
  - Endowment
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:541f0bbb9051b57f8c3ddbf119421dd6bb39ceb25b4db1f746f1cb06ff3d3fc5
  sources:
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "Perryman, International Actuarial Notation, PCAS XXXVI (1949), pp.124-130 (general principles of the four spaces; p, q, mu, e, A, E, a; trema, bar, ring, (m); numeral over the status; nEx; endowment assurance; selection [x]+t), sha256:819cf715537c2dd1dd6adbd72e41aa9c6dd7f4b8c5571ab6795f79182b2949d2 — https://www.casact.org/sites/default/files/database/proceed_proceed49_49123.pdf"
    - "SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table pp.20-21; Makeham's law formula p.22, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "SOA Exam FAM-L sample solutions (2024-10), Q4.12 p.23 (Cov(Z1,Z2) = -E[Z1]E[Z2]), Q4.19 p.26, Q6.3-6.4 p.35 (second moments, variances), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pure Endowment.md
---

A **Pure Endowment** pays a sum insured at the end of a term of $n$ years if the insured, aged $x$ at issue, is still alive then, and pays nothing if the insured dies first. The present value of a pure endowment of 1 is

> $$Z = \begin{cases} 0 & K_x \le n-1 \\ v^n & K_x \ge n \end{cases}$$

- $K_x$ is the curtate future lifetime of $(x)$, and $v = 1/(1+i)$.

So $Z = v^n I$, where $I$ indicates survival of $(x)$ to age $x+n$ and is a Bernoulli variable with probability ${}_np_x$. Its expected present value (EPV) is

> $${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}|} = v^n\,{}_np_x$$

- The 1 above $\overline{n}|$ shows that the term must end before the life fails.

From a life table, ${}_np_x = \ell_{x+n}/\ell_x$. The payment time is fixed, so there are no annual, $1/m$-thly or continuous versions to convert between. ${}_nE_x$ falls when the interest rate rises and rises when mortality is lighter. That is the opposite of a death benefit's response to mortality, which is why survival benefits carry longevity risk.

The variance of the present value is

> $$\text{Var}(Z) = v^{2n}\,{}_np_x\,{}_nq_x$$

- The second moment is ${}^2_{\,n}E_x = v^{2n}\,{}_np_x = v^n\,{}_nE_x$, and the variance is the second moment less $({}_nE_x)^2$.

> [!example]- What are the EPV and the standard deviation of this pure endowment's present value? {Example}
> A pure endowment of $\$100{,}000$ is issued to $(45)$ for 20 years. On the SULT, $\ell_{45} = 99{,}033.9$ and $\ell_{65} = 94{,}579.7$, and $i = 5\%$.
>
> > [!answer]-
> > - ${}_{20}p_{45} = 94{,}579.7/99{,}033.9 = 0.955023$ and $v^{20} = 0.376889$.
> > - ${}_{20}E_{45} = 0.376889(0.955023) = 0.359938$, so the EPV is $\$35{,}993.8$.
> > - $\sqrt{{}_{20}p_{45}\,{}_{20}q_{45}} = \sqrt{0.955023(0.044977)} = 0.207253$.
> > - The standard deviation is $100{,}000(0.376889)(0.207253) = \$7{,}811.1$, about $22\%$ of the EPV.

## The actuarial discount factor

${}_nE_x$ moves a value at age $x+n$ back to age $x$ for a life who must survive to collect it. Over consecutive periods the factors multiply:

> $${}_{m+n}E_x = {}_mE_x\;{}_nE_{x+m}$$

A deferred annuity is valued this way:

> $${}_{n|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$$

- ${}_{n|}\ddot{a}_x$ is the EPV of a whole life annuity-due of 1 a year that starts at age $x+n$.

In the same way an $n$-year deferred whole life insurance is worth ${}_nE_x\,A_{x+n}$, and a [[Whole Life Insurance|whole life]] value splits at age $x+n$:

> $$A_x = A^{1}_{x:\overline{n}|} + {}_nE_x\,A_{x+n}$$

- $A^{1}_{x:\overline{n}|}$ is the EPV of an $n$-year [[Term Life Insurance|term insurance]] of 1.

Dividing by ${}_nE_x$ accumulates with interest and survivorship instead, so the actuarial accumulated value of an annuity is $\ddot{s}_{x:\overline{n}|} = \ddot{a}_{x:\overline{n}|}/{}_nE_x$.

> [!example]- What pure endowment at 65 do these deposits buy, and how does it compare with a bank account at $5\%$? {Example}
> A life aged 55 pays $\$10{,}000$ at the start of each year for 10 years, while alive, to buy a pure endowment payable at age 65. On the SULT at $5\%$, $\ddot{a}_{55:\overline{10}|} = 8.0192$ and ${}_{10}E_{55} = 0.59342$.
>
> > [!answer]-
> > - By the [[Equivalence Principle|equivalence principle]], $X\,{}_{10}E_{55} = 10{,}000\,\ddot{a}_{55:\overline{10}|}$.
> > - So $X = 10{,}000(8.0192)/0.59342 = \$135{,}135.3$.
> > - Saved at $5\%$ interest only, the deposits accumulate to $10{,}000\,\ddot{s}_{\overline{10}|} = \$132{,}067.9$.
> > - The survivors receive about $\$3{,}067$ more. That is their share of the deposits of the $3.3\%$ of lives who die before 65 and forfeit them.

## Pure endowment in an endowment insurance

An [[Endowment Insurance|endowment insurance]] is a term insurance plus a pure endowment, so its EPV is

> $$A_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + {}_nE_x$$

The two parts can never both pay, so their present values have covariance $-A^{1}_{x:\overline{n}|}\,{}_nE_x$. When the death benefit is paid at the moment of death, a UDD factor such as $i/\delta$ applies only to the term insurance part, because the maturity payment is made at a fixed time.

> [!trap] Endowment versus pure endowment
> ${}_nE_x = A^{\phantom{x:}1}_{x:\overline{n}|}$ values a payment on survival only, while $A_{x:\overline{n}|}$, with no 1 over the age or the term, also values the payment on death within the term. Reading one for the other changes the answer by the whole term insurance.
