---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:245fcfdd8310113b1ad5c5f8d1edabc4ffdd8ba2d5212ee8d785b0bb093c77a7
  sources:
    - "Perryman, International Actuarial Notation, PCAS XXXVI (1949), pp.124-130 (general principles of the four spaces; p, q, mu, e, A, E, a; trema, bar, ring, (m); numeral over the status; nEx; endowment assurance; selection [x]+t), sha256:819cf715537c2dd1dd6adbd72e41aa9c6dd7f4b8c5571ab6795f79182b2949d2 — https://www.casact.org/sites/default/files/database/proceed_proceed49_49123.pdf"
    - "SOA, Notation and Terminology Used on Exam FAM (November 2025), pp.2-5 (mu_x, mu_[x]+t, T_x, K_x, select-table conventions, assumptions), sha256:e49fee84a35dcbb8555aca3d3fee328d9e6de8e5125dfa08e3764ad127ecf719 — https://www.soa.org/globalassets/assets/files/edu/2025/2025-11-fam-notation-note.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "SOA Exam FAM-L sample questions (2024-10), Q3.1-3.3 pp.13-15 (select-and-ultimate tables), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L sample solutions (2024-10), Q4.12 p.23 (Cov(Z1,Z2) = -E[Z1]E[Z2]), Q4.19 p.26, Q6.3-6.4 p.35 (second moments, variances), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table pp.20-21; Makeham's law formula p.22, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Standard Actuarial Notation.md
---

**Standard Actuarial Notation** is the international system of symbols for survival probabilities, expectations of life and the expected present values of life insurance and annuity benefits, as used in Dickson, Hardy & Waters (AMLCR). Every symbol is a core letter for the quantity, with a status on the right ($x$, $[x]+t$, $x{:}\overline{n}|$), a duration or deferral on the left, and marks above and around it that say when payments are made.

> [!idea] The idea
> Reading the marks correctly is most of the work, because the same letter stands for several different values.

## Survival and death probabilities

For a life aged $x$, written $(x)$, with [[Future Lifetime Random Variable|future lifetime]] $T_x$, the probability of surviving $t$ years is

> $${}_tp_x = \Pr(T_x > t) = 1 - {}_tq_x$$

- ${}_tp_x$ is the probability that $(x)$ survives $t$ years and ${}_tq_x$ the probability that it dies within $t$ years.
- When the left subscript is 1 it is dropped, so $p_x$ and $q_x$ are one-year probabilities.

Survival probabilities chain. The probability of surviving $s + t$ years is

> $${}_{s+t}p_x = {}_sp_x\,{}_tp_{x+s}$$

Applied one year at a time, ${}_kp_x = p_x\,p_{x+1} \cdots p_{x+k-1}$. From a life table, ${}_tp_x = \ell_{x+t}/\ell_x$. In terms of the [[Hazard Rate|force of mortality]] $\mu_x$ at age $x$, the survival probability is

> $${}_tp_x = \exp\left(-\int_0^t \mu_{x+s}\,ds\right)$$

The deferred probability ${}_{t|u}q_x$ is the probability that $(x)$ survives $t$ years and then dies within the next $u$, and ${}_{t|}q_x$ means $u = 1$. It is

> $${}_{t|u}q_x = {}_tp_x - {}_{t+u}p_x$$

It also equals ${}_tp_x\,{}_uq_{x+t}$. Leaving out ${}_tp_x$, the survival to $t$, overstates the probability.

## Expectation of life

The complete expectation of life carries a ring and is

> $$\mathring{e}_x = E[T_x] = \int_0^\infty {}_tp_x\,dt$$

The curtate expectation counts whole years only and is

> $$e_x = E[K_x] = \sum_{k \ge 1} {}_kp_x$$

- $K_x = \lfloor T_x \rfloor$ is the curtate future lifetime of $(x)$.

Under the uniform distribution of deaths [[Fractional Age Assumption|fractional age assumption]], $\mathring{e}_x = e_x + \tfrac12$.

## Select and ultimate mortality

Square brackets mark the age at selection, so $q_{[x]+t}$ is the mortality rate at age $x+t$ for a life selected (underwritten) at age $x$, $t$ years ago. After the select period ends the brackets drop and the ultimate rate $q_{x+t}$ applies. A recently underwritten life has lighter mortality than an ultimate life of the same age, so $q_{[x]} < q_{[x-1]+1} < q_x$ in a typical table. $q_{[x]+1}$ and $q_{x+1}$ are both rates at age $x+1$, but for different lives.

> [!example]- In this select table, what are ${}_2p_{[60]}$ and ${}_{1|2}q_{[61]}$? {Example}
> An illustrative select-and-ultimate table has a two-year select period.
>
> | $x$ | $\ell_{[x]}$ | $\ell_{[x]+1}$ | $\ell_{x+2}$ | $x+2$ |
> |---|---|---|---|---|
> | 60 | 80,000 | 79,000 | 77,800 | 62 |
> | 61 | 78,600 | 77,500 | 76,200 | 63 |
> | 62 | 77,100 | 75,900 | 74,400 | 64 |
>
> > [!answer]-
> > - A life selected at 60 reads along the first row, and after two years it joins the ultimate column at age 62.
> > - So ${}_2p_{[60]} = \ell_{62}/\ell_{[60]} = 77{,}800/80{,}000 = 0.9725$.
> > - A life selected at 61 reaches age 64 after three years, which is the ultimate $\ell_{64}$ in the third row.
> > - It must survive one year, to $\ell_{[61]+1}$, and then die within two, before $\ell_{64}$.
> > - So ${}_{1|2}q_{[61]} = (77{,}500 - 74{,}400)/78{,}600 = 0.03944$.

## Insurance symbols

$A$ is the expected present value (EPV) of a benefit of 1. For [[Whole Life Insurance|whole life]] insurance, without a bar, it pays at the end of the year of death and is

> $$A_x = E[v^{K_x+1}]$$

- $v = 1/(1+i)$ is the discount factor, at the annual effective interest rate $i$.

$A^1_{x:\overline{n}|}$ is [[Term Life Insurance|term]] insurance (the 1 over $x$ says the benefit is paid only if $x$ fails first, before $n$ ends). The [[Pure Endowment|pure endowment]] pays 1 at time $n$ if $(x)$ survives, and its EPV is

> $${}_nE_x = v^n\,{}_np_x$$

It is also written $A_{x:\overline{n}|}^{\ \ 1}$, with the 1 over the term. The [[Endowment Insurance|endowment insurance]] $A_{x:\overline{n}|}$, with no 1, pays on death within $n$ years or on survival to $n$. Its EPV is the sum of the two, which is

> $$A_{x:\overline{n}|} = A^1_{x:\overline{n}|} + {}_nE_x$$

A left subscript defers the cover, as in ${}_{u|}A_x = {}_uE_x\,A_{x+u}$.

> [!example]- At $i = 5\%$, what are $A^1_{[60]:\overline{2}|}$, ${}_2E_{[60]}$ and $A_{[60]:\overline{2}|}$ for this select life? {Example}
> A life selected at 60 has $\ell_{[60]} = 80{,}000$, $\ell_{[60]+1} = 79{,}000$ and, after a two-year select period, $\ell_{62} = 77{,}800$.
>
> > [!answer]-
> > - The deaths in the two years after selection are $d_{[60]} = 1{,}000$ and $d_{[60]+1} = 1{,}200$, and $v = 1/1.05$.
> > - The term insurance pays at the end of the year of death, so $A^1_{[60]:\overline{2}|} = (1{,}000\,v + 1{,}200\,v^2)/80{,}000 = 0.025510$.
> > - The survival probability is $77{,}800/80{,}000 = 0.9725$, so ${}_2E_{[60]} = v^2(0.9725) = 0.882086$.
> > - The endowment insurance is the sum, $A_{[60]:\overline{2}|} = 0.025510 + 0.882086 = 0.907596$.

> [!trap] Pure endowment versus endowment insurance
> ${}_nE_x$ pays only on survival, while $A_{x:\overline{n}|}$ pays on death within $n$ years or on survival to $n$. Confusing them changes the answer by the whole term insurance.

## Annuity symbols

$\ddot{a}$ with two dots is an annuity-due, paid at the start of each period, and $a$ without dots is an annuity-immediate, paid at the end, so $a_x = \ddot{a}_x - 1$. The term annuity $\ddot{a}_{x:\overline{n}|}$ pays at most $n$ times. See [[Life Annuity]]. The whole life annuity-due is

> $$\ddot{a}_x = \frac{1 - A_x}{d}$$

- $d = 1 - v$ is the effective rate of discount.

The same identity links the term annuity-due to the endowment insurance, $A_{x:\overline{n}|} = 1 - d\,\ddot{a}_{x:\overline{n}|}$. It holds for the annuity-due only.

> [!example]- For the life selected at 60 above, does $\ddot{a}_{[60]:\overline{2}|}$ give the same $A_{[60]:\overline{2}|} = 0.907596$ at $i = 5\%$? {Example}
> - The annuity-due pays at times 0 and 1, so $\ddot{a}_{[60]:\overline{2}|} = 1 + v(79{,}000/80{,}000) = 1.940476$.
> - The rate of discount is $d = 1 - 1/1.05 = 0.047619$.
> - $1 - d\,\ddot{a}_{[60]:\overline{2}|} = 0.907596$, which matches the endowment insurance.

## Timing marks

A bar means continuous, so $\bar{a}_x$ pays continuously and the whole life insurance paying at the moment of death is

> $$\bar{A}_x = E[v^{T_x}]$$

A superscript $(m)$ means $m$ payments a year, as in $\ddot{a}^{(12)}_x$, each of $1/m$, or a death benefit at the end of the $1/m$-year of death, $A^{(m)}_x$.

## Second moments

A left superscript 2 means the same benefit valued at double the force of interest, $v^2$ in place of $v$. For whole life it is

> $${}^2A_x = E[v^{2(K_x+1)}]$$

It is not $(A_x)^2$. The variance of the present value of a whole life benefit of 1 is

> $${}^2A_x - A_x^2$$

For a continuous annuity the variance comes through $\text{Var}(\bar{a}_{\overline{T}|}) = ({}^2\bar{A}_x - \bar{A}_x^2)/\delta^2$, where $\delta = \ln(1+i)$ is the [[Force of Interest|force of interest]].

> [!example]- At a constant force of mortality $\mu = 0.02$ and $\delta = 0.05$, what is the standard deviation of the present value of 1 paid at death? {Example}
> - Under a constant force, ${}_tp_x = e^{-\mu t}$ at every age, so each symbol is a simple integral.
> - $\bar{A}_x = \mu/(\mu + \delta) = 0.285714$.
> - The second moment uses $2\delta$, not $\delta^2$, so ${}^2\bar{A}_x = \mu/(\mu + 2\delta) = 0.166667$.
> - The variance is $0.166667 - 0.285714^2 = 0.085034$.
> - The standard deviation is $\sqrt{0.085034} = 0.2916$.
