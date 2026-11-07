---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:f49fd2883392c37b759ccc3edcf5d80a59d4e3aa0d948804f824fe5fee52b527
  sources:
    - "Struppeck, Life Contingencies Study Note for CAS Exam S (revised 9/19/2015), ch.1-2 pp.3-5 (l_x, d_x = l_x - l_{x+1}, q_x = d_x/l_x, p_x = l_{x+1}/l_x, radix, npx = l_{x+n}/l_x = p_x p_{x+1}...p_{x+n-1}, nqx = 1 - npx), ch.6 p.10 (linear / exponential / hyperbolic interpolation), ch.7 p.12 (curtate expectation = Σ_{n>=1} npx; complete = curtate + 0.5 under uniform deaths), appendix p.13 (Ex.2, 10p50 × q60), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Tables, Illustrative Life Table: Basic Functions and Single Benefit Premiums at i = 0.06, PDF p.4, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §1.1 pp.1-2 (S(x) = l_x/l_0), §2.2 pp.38-42 (f = -S', μ = -d/dx ln S), §4.2 p.110 cases (a) uniform failures and (b) constant force within integer ages, eq.(4.31) complete = curtate + 1/2 exactly under (a), approximately under (b), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A tasks 4-6 and readings (p.3), reading list (p.6: Ross A1-A6, Struppeck A5-6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Table.md
---

![[Media/Figures/Life_Table.svg|340]]

A **Life Table** is the tabular form of a [[Survival Model|survival model]]. Starting from a radix $l_0$ of lives at age 0, it lists $l_x$, the expected number of lives surviving to age $x$. The expected number of deaths between ages $x$ and $x + 1$ is

> $$d_x = l_x - l_{x+1}$$

The probability that a life aged $x$, written $(x)$, dies within one year is

> $$q_x = \frac{d_x}{l_x}$$

The probability that $(x)$ survives one year is $p_x = 1 - q_x = l_{x+1}/l_x$. A table can be built from its mortality rates, since $l_{x+1} = l_x(1 - q_x)$. At the oldest age of a table $q_x = 1$, so every remaining life dies within the year.

The probability that $(x)$ survives $t$ years is

> $${}_tp_x = \frac{l_{x+t}}{l_x}$$

The probability that $(x)$ dies within $t$ years is ${}_tq_x = 1 - {}_tp_x = (l_x - l_{x+t})/l_x$. Survival probabilities over consecutive years multiply, so the probability of surviving $n$ years is

> $${}_np_x = p_x \, p_{x+1} \cdots p_{x+n-1}$$

When a table applies only up to some age, the survival probability is split there: ${}_{s+t}p_x = {}_sp_x \; {}_tp_{x+s}$, with each factor taken from the mortality that applies to it.

> [!example]- A life table has $l_{60} = 1{,}000$, $l_{61} = 950$, $l_{62} = 870$, $l_{63} = 740$ and $l_{64} = 0$. What are $q_{60}$ and ${}_2p_{60}$? {Example}
> - The number of deaths between ages 60 and 61 is $d_{60} = 1{,}000 - 950 = 50$, so $q_{60} = 50/1{,}000 = 0.05$.
> - The probability of surviving two years is ${}_2p_{60} = l_{62}/l_{60} = 870/1{,}000 = 0.87$.
> - The same probability is $p_{60}\,p_{61} = 0.95 \times (870/950) = 0.87$.

## Deferred mortality probability

The probability that $(x)$ survives $u$ years and then dies within the following $t$ years is

> $${}_{u|t}q_x = \frac{l_{x+u} - l_{x+u+t}}{l_x}$$

When $t = 1$ it is written ${}_{u|}q_x$, and it equals ${}_up_x\, q_{x+u}$.

> [!example]- With the life table above, what is the probability that a life aged 60 dies between ages 62 and 63? {Example}
> - The life must survive 2 years and then die within the next year.
> - The probability is ${}_{2|}q_{60} = (l_{62} - l_{63})/l_{60} = (870 - 740)/1{,}000 = 0.13$.

## Expectation of life

The curtate expectation of life $e_x$ is the expected number of whole years that $(x)$ will live:

> $$e_x = \sum_{k=1}^{\infty} {}_kp_x$$

The complete expectation of life is the expected future lifetime, $\mathring{e}_x = \int_0^\infty {}_tp_x\,dt$. If deaths are uniformly distributed within each year of age, $\mathring{e}_x = e_x + 0.5$.

> [!example]- With the life table above, what are the curtate and complete expectations of life at age 60? {Example}
> - The curtate expectation adds the survival probabilities, $e_{60} = (l_{61} + l_{62} + l_{63} + l_{64})/l_{60}$.
> - $e_{60} = (950 + 870 + 740 + 0)/1{,}000 = 2.56$ years.
> - If deaths are uniformly distributed within each year of age, the complete expectation is $\mathring{e}_{60} = 2.56 + 0.5 = 3.06$ years.

## Fractional ages

A life table gives $l_x$ at integer ages only. A [[Fractional Age Assumption|fractional age assumption]] fills in $l_{x+s}$ for $0 < s < 1$. Under the uniform distribution of deaths (UDD) assumption, $l_{x+s}$ is linear in $s$:

> $$l_{x+s} = l_x - s\,d_x$$

It follows that ${}_sq_x = s\,q_x$ and $\int_0^1 {}_tp_x\,dt = 1 - 0.5\,q_x$.

Under a constant force of mortality within each year of age, $l_{x+s}$ is geometric in $s$:

> $$l_{x+s} = (l_x)^{1-s}\,(l_{x+1})^{s}$$

It follows that ${}_sp_x = (p_x)^s$.

> [!example]- With the life table above, what is the probability that a life aged 60 survives half a year, under each assumption? {Example}
> - Under UDD, ${}_{0.5}q_{60} = 0.5 \times 0.05 = 0.025$, so ${}_{0.5}p_{60} = 0.975$.
> - Under a constant force of mortality, ${}_{0.5}p_{60} = (0.95)^{0.5} = 0.9747$.

## Select life tables

A select life table gives mortality that depends on the time since a life was selected, for example by underwriting. The number of lives at age $x$ who were selected at age $x$ is $l_{[x]}$, and the one-year survival probability of such a life is

> $$p_{[x]} = \frac{l_{[x]+1}}{l_{[x]}}$$

After the select period the life follows the ultimate column of the table, and multi-year survival probabilities are products of the one-year probabilities along the life's path through the table.

> [!trap] Dividing by the wrong number of lives
> Every probability for $(x)$ divides by $l_x$, the lives at the current age. With the table above, the probability that a life aged 61 dies before age 63 is $(950 - 740)/950 = 0.2211$, not $(950 - 740)/1{,}000 = 0.21$.
