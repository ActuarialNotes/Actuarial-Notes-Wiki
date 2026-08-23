---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:102117df3cdcd49bca010274fa8525798e56da43712c3d90c5994ea658109f24
  sources: []
  open_findings: 0
  log: .verify/Concepts/Life Table.md
---

A **Life Table** is the tabular form of a [[Survival Model]]: starting from a radix $\ell_0$ of newborns, it records $\ell_x$, the expected number still alive at age $x$, and $d_x = \ell_x - \ell_{x+1}$, the number dying between ages $x$ and $x+1$. Every survival and mortality probability the exam asks for can be read off these two columns.

> $$_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\ell_x}$$

> $$e_x = \sum_{t=1}^{\infty} {}_{t}p_x = \frac{\ell_{x+1} + \ell_{x+2} + \cdots}{\ell_x}$$

- $_{t}p_x$ is the probability a life aged $x$ survives $t$ more years; $_{t|}q_x = {}_{t}p_x \cdot q_{x+t}$ is the probability of dying in the year *after* surviving $t$ years (a deferred death probability)
- Survival probabilities **multiply** across periods: $_{s+t}p_x = {}_{s}p_x \cdot {}_{t}p_{x+s}$, which is why $\ell_x$ alone is enough to answer any question
- The table is the discrete counterpart of the continuous survival function: $\ell_x = \ell_0\, S(x)$, and the [[Hazard Rate]] (force of mortality) is $\mu_x = -\frac{d}{dx}\ln \ell_x$
- The **curtate expectation** $e_x$ counts complete years survived; the complete expectation is approximately $\mathring{e}_x \approx e_x + \tfrac12$ under a uniform-deaths assumption
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
> > A life aged $60$ completes on average $1.936$ further whole years; the complete expectation of life is roughly $1.936 + 0.5 = 2.44$ years.
