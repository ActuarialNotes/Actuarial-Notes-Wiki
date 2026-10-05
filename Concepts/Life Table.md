---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:7acf71268e60d4e7b19a773011a7efa4588a2777c1698e5a34467e12be62b3a2
  sources:
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.1-2 pp.1-5 (l_x, d_x = l_x - l_{x+1}, q_x = d_x/l_x, p_x, npx = l_{x+n}/l_x = p_x p_{x+1}...p_{x+n-1}, nqx = 1 - npx, radix), ch.6 p.10 (linear / exponential / hyperbolic interpolation), ch.7 p.12 (curtate expectation = sum of npx from n = 1; complete = curtate + 0.5 under uniform deaths), appendix p.13 (Ex.2: 10p50 x q60, a deferred death probability), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §2.2 pp.38-39 and §2.5 p.59 (S(x) = l_x/l_0, μ(x+t) = -(d/dt) ln l_{x+t}), §3.2 pp.62-65 (piecewise-uniform density: S(k+t) = S(k) - t f(k); piecewise-constant hazard: S(k+t) = S(k)e^{-tμ(k)}, p_k = e^{-μ(k)}), §4.2 p.110 eq.(4.31), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Life Table.md
---

A **Life Table** is the tabular form of a [[Survival Model]]: starting from a radix $\ell_0$ of newborns, it records $\ell_x$, the expected number still alive at age $x$, and $d_x = \ell_x - \ell_{x+1}$, the number dying between ages $x$ and $x+1$. Every survival and mortality probability the exam asks for can be read off these two columns.

> $$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\ell_x}$$

> $$e_x = \sum_{t=1}^{\infty} {}_{t}p_x = \frac{\ell_{x+1} + \ell_{x+2} + \cdots}{\ell_x}$$

- $_{t}p_x$ is the probability a life aged $x$ survives $t$ more years; $_{t|}q_x = {}_{t}p_x \cdot q_{x+t}$ is the probability of dying in the year *after* surviving $t$ years (a deferred death probability)
- Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$, which is why $\ell_x$ alone is enough to answer any question
- The table is the discrete counterpart of the continuous survival function: $\ell_x = \ell_0\, S(x)$, and the [[Hazard Rate]] (force of mortality) is $\mu_x = -\frac{d}{dx}\ln \ell_x$
- The **curtate expectation** $e_x$ counts complete years survived; if deaths are uniformly distributed within each year of age, the complete expectation is exactly $\mathring{e}_x = e_x + \tfrac12$ (under a constant force it is only an approximation, close when death rates are small)
- Fractional-age assumptions fill in between integer ages — **UDD** gives $_{s}q_x = s\,q_x$, a **constant force** gives $_{s}p_x = (p_x)^s$
- Life-table probabilities feed straight into [[Whole Life Insurance]] and [[Life Annuity]] values, and into [[Joint Life]] statuses when two independent lives are combined by multiplying their survival probabilities

![[Media/Figures/Life_Table.svg|340]]

> [!example]- Reading Probabilities off a Table {Example}
> A life table gives $\ell_{60} = 8{,}000$, $\ell_{61} = 7{,}840$, $\ell_{62} = 7{,}650$, $\ell_{63} = 7{,}430$. Find $q_{60}$, $_{2}p_{60}$, and $_{2|}q_{60}$.
>
> > [!answer]-
> > $$q_{60} = \frac{\ell_{60} - \ell_{61}}{\ell_{60}} = \frac{160}{8{,}000} = 0.02$$
> > $$_{2}p_{60} = \frac{\ell_{62}}{\ell_{60}} = \frac{7{,}650}{8{,}000} = 0.95625$$
> > $$_{2|}q_{60} = \frac{\ell_{62} - \ell_{63}}{\ell_{60}} = \frac{220}{8{,}000} = 0.0275$$

> [!example]- Curtate Expectation from a Terminating Table {Example}
> A table ends at age $63$ with $\ell_{63} = 0$ and has $\ell_{60} = 8{,}000$, $\ell_{61} = 7{,}840$, $\ell_{62} = 7{,}650$. Find $e_{60}$.
>
> > [!answer]-
> > $$e_{60} = \frac{\ell_{61} + \ell_{62} + \ell_{63}}{\ell_{60}} = \frac{7{,}840 + 7{,}650 + 0}{8{,}000} = 1.936 \text{ years}$$
> > A life aged $60$ completes on average $1.936$ further whole years; if deaths are uniform within each year, the complete expectation of life is $1.936 + 0.5 = 2.436$ years.
