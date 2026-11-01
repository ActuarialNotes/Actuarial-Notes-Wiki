---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:2c5a1cf3f77f93a8d7b3e32a9d7eb9e7709d75f8f13966eac6f022a440be5796
  sources:
    - "Hartman, Stat 344 Life Contingencies I, Chapter 5 (BYU), slide 6 (ä_x = (1 - A_x)/d, holding between the random variables), slide 7 (Var(Y) = (2A_x - A_x^2)/d^2; ä_x = 1 + v p_x ä_x+1), slide 17 (immediate Y* = Y - 1, same variance), slide 18 (a_x:n = ä_x:n + nE_x - 1), slide 27 (Y = (1 - v^(K(m)+1/m))/d(m), ä(m)_x = (1 - A(m)_x)/d(m)), sha256:3cceb4a4ae537548e470a22a01a01f62e1de16319c9669ddeeb17bed4c9509cf — https://hartman.byu.edu/docs/344Files/Stat344_Chapter5.pdf"
    - "SOA Exam FAM-L Sample Solutions (2024-10, rev. Aug 2026), Q6.4 p.35 (Var(X) = (2A(12)_62 - (A(12)_62)^2)/(d(12))^2), Q6.36 p.52 (constant force: ā_x:20 = (1 - e^(-20(mu+delta)))/(mu+delta)), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.3 pp.6-8 (ä_x recursion; 1 = d ä_x + A_x), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Tables, Illustrative Life Table at i = 0.06, PDF p.4 (1000q40 = 2.78, ä41 = 14.6864, 1000A40 = 161.32, ä40 = 14.8166, ä65 = 9.8969, l40 = 9,313,166, l65 = 7,533,964), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Annuity.md
---

A **Life Annuity** pays periodic benefits contingent on the survival of one or more lives. A **life-annuity-due** pays 1 at the start of each year while $(x)$ is alive; its actuarial present value (EPV) is $\ddot{a}_x$. A **life-annuity-immediate** pays 1 at the end of each year, provided $(x)$ is still alive then; its EPV is $a_x$.

> $$\ddot{a}_x = \sum_{k=0}^{\infty} v^k\,{_k}p_x$$

> $$\ddot{a}_x = 1 + v\,p_x\,\ddot{a}_{x+1}$$

> $$\ddot{a}_x = \frac{1 - A_x}{d}$$

- **Recursion:** an annuity-due on $(x)$ is a payment of 1 now plus, if $(x)$ survives the year, an annuity-due on $(x+1)$ delivered in one year
- **Relationship to [[Whole Life Insurance]]:** $d\,\ddot{a}_x + A_x = 1$, where $d = 1 - v = i/(1+i)$ is the effective rate of discount — 1 today is worth $d$ at the start of each year while $(x)$ lives plus the 1 returned at the end of the year of death
- The annuity-immediate is the annuity-due without its first payment: $a_x = \ddot{a}_x - 1$
- **Temporary** annuity (pays until death or $n$ years, whichever comes first): $\ddot{a}_{x:\overline{n}|} = \ddot{a}_x - v^n\,{_n}p_x\,\ddot{a}_{x+n}$. **Guaranteed** for $n$ years (whichever comes last): $\ddot{a}_{\overline{n}|} + v^n\,{_n}p_x\,\ddot{a}_{x+n}$
- **Paid continuously** (continuous variant): $\bar{a}_x = \int_0^\infty e^{-\delta t}\,{_t}p_x\,dt = (1 - \bar{A}_x)/\delta$; under a constant force of mortality $\mu$, $\bar{a}_x = 1/(\mu + \delta)$
- **Temporary annuity-immediate:** $a_{x:\overline{n}|} = \ddot{a}_{x:\overline{n}|} - 1 + {}_nE_x$. Compared with the temporary annuity-due it loses the payment at time 0 and gains a payment at time $n$ if $(x)$ is alive then.
- **Temporary continuous annuity under a constant force:** with constant force of mortality $\mu$, ${}_tp_x = e^{-\mu t}$, so $\bar{a}_{x:\overline{n}|} = \int_0^n e^{-(\mu+\delta)t}\,dt = \left(1 - e^{-n(\mu+\delta)}\right)/(\mu+\delta)$, the temporary counterpart of $1/(\mu+\delta)$.
- **Variance:** the present value of the whole life annuity-due is $Y = \ddot{a}_{\overline{K_x+1}|} = (1 - Z)/d$ with $Z = v^{K_x+1}$, so $\text{Var}(Y) = \left({}^2\!A_x - A_x^2\right)/d^2$, where ${}^2\!A_x$ is $A_x$ at $v^2$. The annuity-immediate has the same variance, since it differs from the annuity-due by the constant 1.
- **Paid $m$ times a year:** the same argument gives $\ddot{a}^{(m)}_x = \left(1 - A^{(m)}_x\right)/d^{(m)}$ and $\text{Var}(Y) = \left({}^2\!A^{(m)}_x - \left(A^{(m)}_x\right)^2\right)/\left(d^{(m)}\right)^2$, where $A^{(m)}_x$ pays at the end of the $\frac1m$-th of a year of death and $d^{(m)}$ is the nominal rate of discount convertible $m$-thly.

![[Media/Figures/Life_Annuity.svg|340]]

> [!example]- Annuity-Due from the Illustrative Life Table, Two Ways {Example}
> The Illustrative Life Table ($i = 0.06$) gives $1000q_{40} = 2.78$, $\ddot{a}_{41} = 14.6864$ and $1000A_{40} = 161.32$. Calculate $\ddot{a}_{40}$ by the recursion and from $A_{40}$.
>
> > [!answer]-
> > $$\ddot{a}_{40} = 1 + \frac{0.99722 \times 14.6864}{1.06} = 1 + 13.8166 = 14.8166$$
> > $$\ddot{a}_{40} = \frac{1 - 0.16132}{0.06/1.06} = \frac{0.83868 \times 1.06}{0.06} = 14.8167$$
> > The table lists $\ddot{a}_{40} = 14.8166$; the second route is off in the last digit only because $A_{40}$ is rounded to five places.

> [!example]- Temporary Annuity-Due to Age 65 {Example}
> Using the Illustrative Life Table ($\ell_{40} = 9{,}313{,}166$, $\ell_{65} = 7{,}533{,}964$, $\ddot{a}_{40} = 14.8166$, $\ddot{a}_{65} = 9.8969$, $i = 0.06$), find the EPV of an annuity-due of 1 a year on $(40)$ that stops at death or at age 65, whichever comes first.
>
> > [!answer]-
> > Give a life annuity on $(40)$ now and take back, in 25 years, a life annuity on $(65)$ if $(40)$ is still alive:
> > $$\ddot{a}_{40:\overline{25}|} = \ddot{a}_{40} - v^{25}\,\frac{\ell_{65}}{\ell_{40}}\,\ddot{a}_{65}$$
> > $$= 14.8166 - 0.23300 \times 0.80896 \times 9.8969 = 14.8166 - 1.8654 = 12.9512$$

> [!example]- Continuous Annuity Under Constant Force of Mortality {Example}
> A life has constant force of mortality $\mu = 0.03$ and the force of interest is $\delta = 0.05$. Calculate $\bar{a}_x$.
>
> > [!answer]-
> > $$\bar{a}_x = \frac{1}{\mu + \delta} = \frac{1}{0.03 + 0.05} = \frac{1}{0.08} = 12.5$$
