---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:740f2cc5d532e8d108403b58a05e08efc668f2b2b705b4dd11b735342a692ba4
  sources:
    - "NAIC, Life Insurance Buyer's Guide (c)2026, p.5 (term vs cash value; renewable vs nonrenewable term; whole life set premium schedule vs universal life flexible premiums) and p.6 (most term policies have no cash value), sha256:c7439cde01522328eca7eab1a7323e5ca193ed8af7d21deb80bda6ae9f36837a — https://content.naic.org/sites/default/files/publication-lig-lp-consumer-life.pdf"
    - "NAIC Life Insurance Buyer's Guide as adopted at Ill. Admin. Code tit. 50, pt. 930, exh. B (LII), sections Term Insurance (renewal, conversion even if not in good health, largest protection per premium dollar), Cash Value Life Insurance (policy loans; unpaid loan and interest subtracted from benefits or cash value), Whole Life (lifetime if premiums paid; same premium; limited-pay to age 65 higher), Universal Life (flexible premiums and face amount; account falls, coverage ends unless more paid or benefit lowered; increases may need proof), sha256:63fd04a11145a404600bda86539dfb0b5d0ca3d26d2ccba09323a3ff7f261ab7 — https://www.law.cornell.edu/regulations/illinois/Ill-Admin-Code-tit-50-930-Exhibit-B"
    - "NAIC Standard Nonforfeiture Law for Life Insurance (Model 808, MO-808, January 2014), Section 2A-D pp.1-2 (paid-up nonforfeiture benefit on default within 60 days; cash surrender value after premiums paid at least 3 full years, ordinary insurance; specified paid-up benefit effective unless another option elected within 60 days), sha256:627c7440efe9047fbd0e941b19c90efe0e39a3920cc95ec960db2e9e9cd416b9 — https://content.naic.org/sites/default/files/model-law-808.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A task 6 'Calculate simple whole life or annuity problems' (p.3), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-I Fall 2019, Q11 (Modified ILT: change in annual level benefit premium on a 10,000 whole life) — official paper (scan), PDF p.15 read as an image this run, sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (rev. 9/19/2015), ch.3 pp.5-8 and appendix p.14 (re-fetched this run; hash unchanged from the 2026-10-05 pass), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Tables, Illustrative Life Table at i = 0.06, PDF p.4 (re-fetched this run; hash unchanged), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §4.1 pp.98-100 (term insurance A^1_{x:n}, decreasing term, nEx = v^n npx) and §4.2 p.108 eq.(4.24), p.111 eq.(4.33) (A-bar term = (i/δ)A term under fractional-age uniformity), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "SOA Exam MLC Sample Solutions (2016), Q2 and Q14 (re-fetched this run; hash unchanged), sha256:791e13b42b926bfe8abe54f489fa6767aa508c9c0419bfa2340a24e9a2ea37f7 — https://www.soa.org/globalassets/assets/files/edu/edu-2014-spring-mlc-sol.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Whole Life Insurance.md
---

![[Media/Figures/Whole_Life_Insurance.svg|340]]

A **Whole Life Insurance** is a life insurance contract with no fixed term that pays a benefit on the death of the insured, whenever death occurs. For a benefit of 1 paid at the end of the year of death of $(x)$, the actuarial present value, $A_x$, is

> $$A_x = \sum_{k=0}^{\infty} v^{k+1}\,{}_kp_x\,q_{x+k}$$

- $v = 1/(1+i)$ is the discount factor at the annual interest rate $i$.
- ${}_kp_x\,q_{x+k}$ is the probability that $(x)$ survives $k$ years and dies in the following year, when the benefit is paid at time $k + 1$.

$A_x$ is the expected value of the present value $Z = v^{K_x + 1}$, where the curtate future lifetime $K_x$ is the number of whole years $(x)$ lives. A benefit of $B$ has actuarial present value $B\,A_x$. On the exam $A_x$ is often read from a table, such as the Illustrative Life Table at $i = 0.06$.

> [!example]- A life table has $l_{60} = 1{,}000$, $l_{61} = 950$, $l_{62} = 870$, $l_{63} = 740$ and $l_{64} = 0$. The interest rate is $i = 0.05$. What is $A_{60}$? {Example}
> - The probabilities of death in years 1 to 4 are $d_{60+k}/l_{60}$: $0.05$, $0.08$, $0.13$ and $0.74$.
> - Each is discounted from the end of its year, so $A_{60} = 0.05v + 0.08v^2 + 0.13v^3 + 0.74v^4$ with $v = 1/1.05$.
> - $A_{60} = 0.8413$.

## Recursion for whole life insurance

Conditioning on the first year, either $(x)$ dies and 1 is paid at time 1, or $(x)$ survives and then holds a whole life insurance on $(x+1)$. The actuarial present value therefore satisfies

> $$A_x = v\,q_x + v\,p_x\,A_{x+1}$$

When the interest rate differs by year, $v$ is the discount factor for the first year. When the mortality of one year changes, the recursion gives the new value from the unchanged value at the next age.

> [!example]- The Illustrative Life Table at $i = 0.06$ gives $1000q_{40} = 2.78$ and $1000A_{41} = 168.69$. What is $A_{40}$? {Example}
> - The survival probability is $p_{40} = 1 - 0.00278 = 0.99722$.
> - $A_{40} = \frac{0.00278 + 0.99722 \times 0.16869}{1.06} = 0.16132$, which is the table's $1000A_{40} = 161.32$.

## Relation to the life annuity-due

A unit invested now earns interest $d$ at the start of each year while $(x)$ is alive and is returned at the end of the year of death. Its value of 1 is therefore $d\,\ddot{a}_x + A_x$, where $\ddot{a}_x$ is the [[Life Annuity|whole life annuity-due]]. The whole life insurance is

> $$A_x = 1 - d\,\ddot{a}_x$$

- $d = i/(1+i)$ is the annual discount rate.

Equivalently, $\ddot{a}_x = (1 - A_x)/d$.

> [!example]- With $A_{60} = 0.8413$ at $i = 0.05$, what is $\ddot{a}_{60}$? {Example}
> - The discount rate is $d = 0.05/1.05 = 0.047619$.
> - $\ddot{a}_{60} = (1 - 0.8413)/0.047619 = 3.333$.

## Level annual premium

A level premium $P$ paid at the start of each year while $(x)$ is alive has actuarial present value $P\,\ddot{a}_x$. By the equivalence principle, the actuarial present value of the premiums equals that of the benefit, so the net premium for a benefit $B$ is

> $$P = \frac{B\,A_x}{\ddot{a}_x}$$

For a benefit of 1, $P + d = 1/\ddot{a}_x$. If premiums are paid for at most $n$ years, $\ddot{a}_x$ is replaced by the temporary annuity-due $\ddot{a}_{x:\overline{n}|}$. Net premiums are fixed at issue on the pricing basis.

> [!example]- The Illustrative Life Table at $i = 0.06$ gives $A_{40} = 0.16132$ and $\ddot{a}_{40} = 14.8166$. What is the level annual net premium for a whole life insurance of 1,000 on $(40)$? {Example}
> - The actuarial present value of the benefit is $1{,}000 \times 0.16132 = 161.32$.
> - The premium is $P = 161.32/14.8166 = 10.89$.

## Variance of the present value

The second moment of $Z = v^{K_x+1}$ is $A_x$ calculated at the discount factor $v^2$, that is, at double the force of interest. It is written ${}^2A_x$, and the variance of the present value is

> $$\text{Var}(Z) = {}^2A_x - (A_x)^2$$

${}^2A_x$ satisfies the same recursion as $A_x$ with $v^2$ in place of $v$. For a benefit of $B$, the variance is $B^2$ times this.

> [!example]- For the life table in the first example at $i = 0.05$, what is the variance of the present value of a whole life insurance of 1 on $(60)$? {Example}
> - The second moment is ${}^2A_{60} = 0.05v^2 + 0.08v^4 + 0.13v^6 + 0.74v^8 = 0.70904$.
> - The variance is $0.70904 - 0.8413^2 = 0.00128$.

## Benefit paid at the moment of death

If the benefit is paid at the moment of death, its present value is $e^{-\delta T_x}$, where $\delta$ is the force of interest, and its actuarial present value is

> $$\bar{A}_x = \int_0^\infty e^{-\delta t}\,{}_tp_x\,\mu_{x+t}\,dt$$

Under a constant force of mortality $\mu$, $\bar{A}_x = \mu/(\mu + \delta)$. The second moment ${}^2\bar{A}_x$ is $\bar{A}_x$ at $2\delta$.

> [!example]- A life has a constant force of mortality $\mu = 0.02$, and the force of interest is $\delta = 0.05$. What are $\bar{A}_x$ and the variance of the present value? {Example}
> - $\bar{A}_x = 0.02/(0.02 + 0.05) = 0.2857$.
> - ${}^2\bar{A}_x = 0.02/(0.02 + 0.10) = 0.1667$.
> - The variance is $0.1667 - 0.2857^2 = 0.0850$.

## Related insurances

A [[Term Life Insurance|term insurance]] $A^{1}_{x:\overline{n}|}$ pays only on death within $n$ years. A [[Pure Endowment|pure endowment]] pays 1 at time $n$ if $(x)$ is alive then, and its actuarial present value is

> $${}_nE_x = v^n\,{}_np_x$$

A whole life insurance is a term insurance for $n$ years followed by a whole life insurance bought at age $x + n$ if $(x)$ survives, so $A_x = A^{1}_{x:\overline{n}|} + {}_nE_x\,A_{x+n}$. An [[Endowment Insurance|endowment insurance]] is a term insurance plus a pure endowment.

## Whole life insurance as a product

Whole life insurance provides coverage for life as long as premiums are paid. Its premiums follow a fixed schedule and are usually level, so they are higher than the premiums for the same amount of term insurance at the same age, and the excess builds a cash value. The owner can borrow against the cash value, and an unpaid loan with its interest is deducted from the death benefit. If premiums stop, the Standard Nonforfeiture Law requires a paid-up benefit, and after premiums have been paid for at least three full years, a cash surrender value. [[Universal Life Insurance|Universal life insurance]] differs in having flexible premiums and an account value.

> [!trap] Using $i$ in place of $d$
> The relation is $A_x = 1 - d\,\ddot{a}_x$ with $d = i/(1+i)$, not $i$. At $i = 0.06$ with $\ddot{a}_{40} = 14.8166$, $A_{40} = 1 - 0.056604 \times 14.8166 = 0.1613$, not $1 - 0.06 \times 14.8166 = 0.1110$.
