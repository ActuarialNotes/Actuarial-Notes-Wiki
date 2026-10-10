---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:2dc7f1eb156ce4356febe6debd099f97a408b893891f300ffdba09a7cef2eaea
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

**Whole Life Insurance** is a life insurance contract with an unlimited term: it pays a benefit of 1 (one unit) on the death of the insured, whenever that occurs. In the life-table model of Exam MAS-I the benefit is paid at the **end of the year of death**, and its actuarial present value (the **net single premium**) for a life aged $x$ is $A_x$.

> $$A_x = \sum_{k=0}^{\infty} v^{k+1}\,{_k}p_x\,q_{x+k}$$

> $$A_x = v\,q_x + v\,p_x\,A_{x+1}$$

> $$P = \frac{A_x}{\ddot{a}_x}$$

- $v = 1/(1+i)$: a death in year $k+1$ (survive $k$ years, probability ${_k}p_x$, then die, $q_{x+k}$) is paid at time $k+1$
- **Recursion:** either $(x)$ dies in the first year and 1 is paid in a year, or $(x)$ survives and holds, one year from now, a whole life policy on $(x+1)$
- **Level annual premium:** a premium $P$ paid at the start of each year while $(x)$ is alive is a [[Life Annuity|life-annuity-due]], so $A_x = P\,\ddot{a}_x$; since $\ddot{a}_x = (1 - A_x)/d$, $P$ follows from $A_x$ and $d$ alone
- **Variance:** the second moment ${}^2\!A_x$ of the present value is $A_x$ at discount factor $v^2$ (double the force of interest), and $\text{Var} = {}^2\!A_x - (A_x)^2$. The exam's Illustrative Life Table lists $1000A_x$, $1000\,{}^2\!A_x$ and $\ddot{a}_x$ at $i = 0.06$
- **Paid at the moment of death** (continuous variant): $\bar{A}_x = E\!\left[e^{-\delta T_x}\right] = \int_0^\infty e^{-\delta t}\,{_t}p_x\,\mu_{x+t}\,dt$, with ${}^2\!\bar{A}_x$ at $2\delta$; under a constant force of mortality $\mu$, $\bar{A}_x = \mu/(\mu + \delta)$
- **As a product:** Whole life is a *cash value* policy: coverage lasts for life as long as premiums are paid, and the premiums are typically level, so they start higher than for the same amount of [[Term Life Insurance|term insurance]] and build a cash value. A limited-payment version, such as premiums payable to age 65, has higher premiums. The owner can take a policy loan against the cash value, and any unpaid loan and interest is subtracted from the death benefit or cash value. If premiums stop, state nonforfeiture laws require the policy to give a paid-up benefit and, once premiums have been paid for at least three full years, a cash surrender value. Whole life's premiums follow a set schedule, unlike the flexible premiums of [[Universal Life Insurance|universal life]].

![[Media/Figures/Whole_Life_Insurance.svg|340]]

> [!example]- Whole Life Value by Recursion {Example}
> The Illustrative Life Table ($i = 0.06$) gives $1000q_{40} = 2.78$ and $1000A_{41} = 168.69$. Calculate $A_{40}$.
>
> > [!answer]-
> > $$A_{40} = \frac{q_{40} + p_{40}\,A_{41}}{1.06} = \frac{0.00278 + 0.99722 \times 0.16869}{1.06} = \frac{0.17100}{1.06} = 0.16132$$
> > This is the table's own $1000A_{40} = 161.32$.

> [!example]- Level Annual Premium from the Illustrative Life Table {Example}
> Using the Illustrative Life Table ($A_{40} = 0.16132$, $\ddot{a}_{40} = 14.8166$, $i = 0.06$), find the level annual premium for a whole life insurance of 1 on $(40)$.
>
> > [!answer]-
> > $$P = \frac{A_{40}}{\ddot{a}_{40}} = \frac{0.16132}{14.8166} = 0.010888$$
> > From $A_{40}$ alone, with $d = 0.06/1.06$: $\ddot{a}_{40} = (1 - 0.16132)(1.06)/0.06 = 14.8167$, and $P = 0.16132/14.8167 = 0.010888$ again.

> [!example]- Paid at the Moment of Death, Constant Force {Example}
> A life is subject to constant force of mortality $\mu = 0.02$ and the force of interest is $\delta = 0.05$. Calculate $\bar{A}_x$ and the variance of the present value $e^{-\delta T_x}$.
>
> > [!answer]-
> > $$\bar{A}_x = \frac{\mu}{\mu + \delta} = \frac{0.02}{0.07} = 0.2857$$
> > $${}^2\!\bar{A}_x = \frac{0.02}{0.02 + 2(0.05)} = \frac{0.02}{0.12} = 0.1667$$
> > $$\text{Var} = {}^2\!\bar{A}_x - (\bar{A}_x)^2 = \frac{1}{6} - \frac{4}{49} = \frac{25}{294} \approx 0.0850$$

> [!tip]- How it appears on the exam
> - **MAS-I:** The objective is to calculate simple whole life or annuity problems. Questions give Illustrative Life Table values and ask for an EPV, a level premium $A_x/\ddot{a}_x$, or the effect of a change in the table, as in the examples.
> - **DISC-IA:** The Life and Health Insurance section asks for the features of whole life against [[Term Life Insurance|term]] and universal life: lifetime coverage, level scheduled premiums, cash values, policy loans and the nonforfeiture options if premiums stop.
