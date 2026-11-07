---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e3489f7697021e4e80437e1d407f4fdfa6a2779b3fba5061fc27f83c7c9528fb
  sources:
    - "Hartman, Stat 344 Life Contingencies I, Chapter 5 (BYU), slide 6 (ä_x = (1 - A_x)/d, holding between the random variables), slide 7 (Var(Y) = (2A_x - A_x^2)/d^2; ä_x = 1 + v p_x ä_x+1), slide 17 (immediate Y* = Y - 1, same variance), slide 18 (a_x:n = ä_x:n + nE_x - 1), slide 27 (Y = (1 - v^(K(m)+1/m))/d(m), ä(m)_x = (1 - A(m)_x)/d(m)), sha256:3cceb4a4ae537548e470a22a01a01f62e1de16319c9669ddeeb17bed4c9509cf — https://hartman.byu.edu/docs/344Files/Stat344_Chapter5.pdf"
    - "SOA Exam FAM-L Sample Solutions (2024-10, rev. Aug 2026), Q6.4 p.35 (Var(X) = (2A(12)_62 - (A(12)_62)^2)/(d(12))^2), Q6.36 p.52 (constant force: ā_x:20 = (1 - e^(-20(mu+delta)))/(mu+delta)), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 pp.6-8 (ä_x recursion; 1 = d ä_x + A_x), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Tables, Illustrative Life Table at i = 0.06, PDF p.4 (1000q40 = 2.78, ä41 = 14.6864, 1000A40 = 161.32, ä40 = 14.8166, ä65 = 9.8969, l40 = 9,313,166, l65 = 7,533,964), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Annuity.md
---

![[Media/Figures/Life_Annuity.svg|340]]

A **Life Annuity** is a series of payments made while a life survives. For a life annuity-due that pays 1 at the start of each year while $(x)$ is alive, the actuarial present value, $\ddot{a}_x$, is

> $$\ddot{a}_x = \sum_{k=0}^{\infty} v^k\,{}_kp_x$$

- $v = 1/(1+i)$ is the discount factor at the annual interest rate $i$.
- ${}_kp_x$ is the probability that $(x)$ survives $k$ years, when the payment at time $k$ is made.

A payment of $B$ a year has actuarial present value $B\,\ddot{a}_x$. Level premiums and level annual expenses paid at the start of each year are valued this way. On the exam $\ddot{a}_x$ is often read from a table, such as the Illustrative Life Table at $i = 0.06$.

> [!example]- A life table has $l_{60} = 1{,}000$, $l_{61} = 950$, $l_{62} = 870$, $l_{63} = 740$ and $l_{64} = 0$. The interest rate is $i = 0.05$. What is $\ddot{a}_{60}$? {Example}
> - The survival probabilities are ${}_kp_{60} = l_{60+k}/l_{60}$: $1$, $0.95$, $0.87$ and $0.74$ for $k = 0$ to 3.
> - $\ddot{a}_{60} = 1 + 0.95v + 0.87v^2 + 0.74v^3$ with $v = 1/1.05$.
> - $\ddot{a}_{60} = 3.3331$.

A life annuity-immediate pays 1 at the end of each year while $(x)$ is alive. It is the annuity-due without its first payment, so $a_x = \ddot{a}_x - 1$.

## Recursion for the life annuity-due

An annuity-due on $(x)$ is a payment of 1 now and, if $(x)$ survives the year, an annuity-due on $(x+1)$ one year from now. The actuarial present value therefore satisfies

> $$\ddot{a}_x = 1 + v\,p_x\,\ddot{a}_{x+1}$$

$\ddot{a}_{x+1}$ depends only on the survival probabilities from age $x + 1$ on. A change in one survival probability changes the annuity values at that age and younger, and the recursion carries the change back one age at a time.

> [!example]- The Illustrative Life Table at $i = 0.06$ gives $1000q_{40} = 2.78$ and $\ddot{a}_{41} = 14.6864$. What is $\ddot{a}_{40}$? {Example}
> - The survival probability is $p_{40} = 1 - 0.00278 = 0.99722$.
> - $\ddot{a}_{40} = 1 + \frac{0.99722 \times 14.6864}{1.06} = 14.8166$, which is the table's value.

## Relation to whole life insurance

The life annuity-due and the [[Whole Life Insurance#Relation to the life annuity-due|whole life insurance]] $A_x$ are related by

> $$\ddot{a}_x = \frac{1 - A_x}{d}$$

- $d = i/(1+i)$ is the annual discount rate.

> [!example]- The Illustrative Life Table at $i = 0.06$ gives $1000A_{40} = 161.32$. What is $\ddot{a}_{40}$? {Example}
> - The discount rate is $d = 0.06/1.06 = 0.056604$.
> - $\ddot{a}_{40} = (1 - 0.16132)/0.056604 = 14.8167$, which differs from the table's 14.8166 only by the rounding of $A_{40}$.

## Temporary and deferred life annuities

A temporary life annuity-due pays at the start of each year for at most $n$ years while $(x)$ is alive, and a deferred life annuity-due pays from time $n$ on if $(x)$ is alive then. A whole life annuity is a temporary annuity followed by a deferred one, so the temporary life annuity-due is

> $$\ddot{a}_{x:\overline{n}|} = \ddot{a}_x - {}_nE_x\,\ddot{a}_{x+n}$$

- ${}_nE_x = v^n\,{}_np_x$ is the actuarial present value of the [[Pure Endowment|pure endowment]] of 1 at time $n$.
- ${}_{n|}\ddot{a}_x = {}_nE_x\,\ddot{a}_{x+n}$ is the deferred life annuity-due.

Premiums paid for at most $n$ years are valued with $\ddot{a}_{x:\overline{n}|}$. It also satisfies the recursion $\ddot{a}_{x:\overline{n}|} = 1 + v\,p_x\,\ddot{a}_{x+1:\overline{n-1}|}$.

> [!example]- The Illustrative Life Table at $i = 0.06$ gives $l_{40} = 9{,}313{,}166$, $l_{65} = 7{,}533{,}964$, $\ddot{a}_{40} = 14.8166$ and $\ddot{a}_{65} = 9.8969$. What is the actuarial present value of an annuity-due of 1 a year on $(40)$ that stops at death or at age 65? {Example}
> - The pure endowment factor is ${}_{25}E_{40} = 1.06^{-25} \times \frac{7{,}533{,}964}{9{,}313{,}166} = 0.23300 \times 0.80896 = 0.18849$.
> - The deferred annuity from age 65 is worth $0.18849 \times 9.8969 = 1.8654$.
> - The temporary annuity-due is $\ddot{a}_{40:\overline{25}|} = 14.8166 - 1.8654 = 12.9512$.

## Certain and life annuity

A certain and life annuity-due pays at the start of each year for $n$ years whether or not $(x)$ survives, and after that while $(x)$ is alive. Its actuarial present value is

> $$\ddot{a}_{\overline{n}|} + {}_nE_x\,\ddot{a}_{x+n}$$

- $\ddot{a}_{\overline{n}|} = (1 - v^n)/d$ is the annuity-due certain for $n$ years.

> [!example]- With the life table in the first example at $i = 0.05$, what is the actuarial present value of a certain and life annuity-due on $(60)$ with 2 years certain? {Example}
> - The annuity-due certain is $\ddot{a}_{\overline{2}|} = 1 + v = 1.9524$.
> - The annuity-due at age 62 is $\ddot{a}_{62} = 1 + v \times \frac{740}{870} = 1.8101$, and ${}_2E_{60} = v^2 \times 0.87 = 0.7891$.
> - The actuarial present value is $1.9524 + 0.7891 \times 1.8101 = 3.3807$.

## Continuous life annuity

A continuous life annuity pays at the rate of 1 a year while $(x)$ is alive. With force of interest $\delta$, its actuarial present value is

> $$\bar{a}_x = \int_0^\infty e^{-\delta t}\,{}_tp_x\,dt$$

It is related to the insurance paid at the moment of death by $\bar{a}_x = (1 - \bar{A}_x)/\delta$. Under a constant force of mortality $\mu$, $\bar{a}_x = 1/(\mu + \delta)$ and ${}_nE_x = e^{-(\mu+\delta)n}$.

> [!example]- A life has a constant force of mortality $\mu = 0.03$, and the force of interest is $\delta = 0.05$. What is $\bar{a}_x$? {Example}
> - $\bar{a}_x = 1/(0.03 + 0.05) = 12.5$.

## Variance of the present value

The present value of the whole life annuity-due is $Y = \ddot{a}_{\overline{K_x+1}|} = (1 - Z)/d$, where $Z = v^{K_x+1}$ is the present value of the whole life insurance. Its variance is

> $$\text{Var}(Y) = \frac{{}^2A_x - (A_x)^2}{d^2}$$

- ${}^2A_x$ is $A_x$ calculated at the discount factor $v^2$.

The annuity-immediate has the same variance, because it differs from the annuity-due by the constant 1.

> [!example]- For the life table in the first example at $i = 0.05$, $A_{60} = 0.84128$ and ${}^2A_{60} = 0.70904$. What is the variance of the present value of the life annuity-due on $(60)$? {Example}
> - The variance of $Z$ is $0.70904 - 0.84128^2 = 0.0012846$.
> - The discount rate is $d = 0.05/1.05 = 0.047619$.
> - The variance of $Y$ is $0.0012846/0.047619^2 = 0.5665$.

> [!trap] Discounting a deferred annuity for interest only
> A deferred annuity pays only if $(x)$ survives to the deferral age, so it carries the survival probability as well as the discount. With the Illustrative Life Table, the annuity on $(40)$ deferred to age 65 is $0.18849 \times 9.8969 = 1.8654$, not $1.06^{-25} \times 9.8969 = 2.3060$.
