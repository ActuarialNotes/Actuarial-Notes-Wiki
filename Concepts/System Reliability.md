---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:b133aea359a50dfad97df9c4c561270134c48a2151a36005be22da29021fec17
  sources:
    - "Jensen & Bard, Operations Research Models and Methods (Univ. of Texas at Austin ORMM supplement), Ch. 26 'Reliability' (5/28/02): structure function and R = P{phi(X)=1} = E[phi(X)] with independent components PDF p.2; series and parallel structure functions and reliabilities eqs (2)-(5) PDF pp.3-4; k-out-of-n eq. (6) and binomial reliability eq. (7), 2-of-3 with p = 0.9 -> 0.972 PDF pp.4-5; minimal paths/cuts and structure functions from them eqs (9)-(11) PDF pp.8-9; bounds R_U = 1 - prod_j(1 - prod_{i in P_j} p_i), R_L = prod_j(1 - prod_{i in C_j} q_i), Example 4 (2-of-3 minimal paths and cuts are the three pairs) and 'lower bound better when reliabilities are high' PDF pp.15-16, sha256:4dc0c5592ed88249e31a90b2dedc12b9bfc355cba4262dc36ee757daa4d67a3d - https://utw11041.utweb.utexas.edu/ORMM/supplements/units/reliability/reliability.pdf"
    - "Rausand, System Reliability Theory (Wiley 2004) course slides, NTNU RAMS Group, Ch. 3 'Structure Analysis': k-out-of-n structure, noon = series, 1oon = parallel PDF pp.8-9; minimal path and cut sets of the bridge {1,4},{2,5},{1,3,5},{2,3,4} / {1,2},{4,5},{1,3,5},{2,3,4} PDF pp.14-17; pivotal decomposition phi(x) = x_i phi(1_i,x) + (1-x_i) phi(0_i,x) PDF p.25, sha256:e7e0e27e5ba2e4647b0280b7650cc6f8ce06f5a1cad591bc036ce9a818adc624 - https://www.ntnu.edu/documents/624876/1277590549/chapt03-structure.pdf/ce525e3b-3f22-43c8-9ed3-d1dcba174742"
    - "Rausand, System Reliability Theory course slides, NTNU, Ch. 4 'System of Independent Components': koon reliability as a binomial tail PDF p.12; 2oo3 of identical exponential components R_S(t) = 3e^{-2 lambda t} - 2e^{-3 lambda t}, MTTF = integral of R_S = 5/(6 lambda), 'less than the MTTF of a single component' PDF p.29, sha256:5acd59f70a27bd39e8c7514208db1e8ef55f6e640350d023b2278a13385227c6 - https://www.ntnu.edu/documents/624876/1277590549/chapt04-1.pdf"
    - "Struppeck, 'Life Contingencies', CAS Study Note (Oct 2014, rev. Sept 2015) - MAS-I syllabus reading: joint-life annuity pays until the first death, last-survivor until both have died, PDF p.11, sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 - https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06): Ross, Introduction to Probability Models, Sections 9.1-9.6 assigned to Domain A, PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed - https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/System Reliability.md
---

**System Reliability** is the probability that a system of components functions, when whether the system works is a fixed function of which components work — its **structure function** $\phi$ — and each component $i$ works independently with probability $p_i$ (Ross, ch. 9).

> $$\phi(\mathbf{x}) = \begin{cases} 1 & \text{if the system works} \\ 0 & \text{if it fails} \end{cases}$$

> $$r(\mathbf{p}) = P\big(\phi(\mathbf{X}) = 1\big) = E\big[\phi(\mathbf{X})\big]$$

- $x_i = 1$ if component $i$ works and $0$ if not; $r(\mathbf{p})$ is the **reliability function**.
- **Series** (works only if all work): $\phi = \prod x_i$ and $r = \prod p_i$. **Parallel** (works if any works): $\phi = 1 - \prod(1 - x_i)$ and $r = 1 - \prod(1 - p_i)$. A [[Joint Life]] status is a series system of lives; a last-survivor status is a parallel one.
- **$k$-out-of-$n$** (works if at least $k$ work): with equal $p$, $r = \sum_{i=k}^{n} \binom{n}{i} p^i (1-p)^{n-i}$, a [[Binomial Distribution|binomial]] tail. Series is $n$-out-of-$n$; parallel is $1$-out-of-$n$.
- A **minimal path set** is a set of components whose working alone makes the system work, with no proper subset doing so; a **minimal cut set** is a set whose failure alone makes it fail, again minimal. A $k$-out-of-$n$ system has $\binom{n}{k}$ minimal path sets (every $k$-subset) and $\binom{n}{n-k+1}$ minimal cut sets (every $(n-k+1)$-subset) — the [[Combinatorics]] in the syllabus.
- **Bounds** from minimal cut sets $C_j$ and minimal path sets $A_j$, when the exact $r(\mathbf{p})$ is tedious:

> $$\prod_{j} \Big[1 - \prod_{i \in C_j} (1 - p_i)\Big] \;\leq\; r(\mathbf{p})$$
>
> $$r(\mathbf{p}) \;\leq\; 1 - \prod_{j} \Big[1 - \prod_{i \in A_j} p_i\Big]$$

- **Lifetimes:** if component $i$ survives to $t$ with probability $\bar F_i(t)$, the system does with probability $r(\bar{\mathbf{F}}(t))$, and its expected life is $\int_0^\infty r(\bar{\mathbf{F}}(t))\,dt$. A $k$-out-of-$n$ system fails at the $(n-k+1)$-th component failure, an [[Order Statistics|order statistic]].

> [!example]- Path and Cut Sets of a $k$-out-of-$n$ System {Example}
> An insurer's claims platform runs on three servers and stays up while at least two are running. Each server is up independently with probability $0.9$. List the minimal path and cut sets, find the reliability, and count the sets for a 3-out-of-5 design.
>
> > [!answer]-
> > Minimal path sets are the pairs $\{1,2\}, \{1,3\}, \{2,3\}$; minimal cut sets are also the pairs, since $n - k + 1 = 2$ failures bring it down.
> >
> > $$
> > \begin{align*}
> > r &= 3p^2(1-p) + p^3 \\
> > &= 3(0.81)(0.1) + 0.729 \\
> > &= 0.972
> > \end{align*}
> > $$
> >
> > For 3-out-of-5: $\binom{5}{3} = 10$ minimal path sets and $\binom{5}{5-3+1} = \binom{5}{3} = 10$ minimal cut sets.

> [!example]- Bounding a Bridge Structure {Example}
> A bridge system has components 1 and 2 leaving the source, 4 and 5 entering the sink, and 3 linking the two middle nodes. Its minimal path sets are $\{1,4\}, \{2,5\}, \{1,3,5\}, \{2,3,4\}$ and its minimal cut sets $\{1,2\}, \{4,5\}, \{1,3,5\}, \{2,3,4\}$. Each component works with probability $0.9$. Find $r$ exactly and compare with the bounds.
>
> > [!answer]-
> > Condition on component 3. If it works, the system is (1 or 2) in series with (4 or 5); if not, it is $\{1,4\}$ in parallel with $\{2,5\}$:
> >
> > $$
> > \begin{align*}
> > r &= 0.9\,\big[1 - 0.1^2\big]^2 + 0.1\,\big[1 - (1 - 0.81)^2\big] \\
> > &= 0.9(0.9801) + 0.1(0.9639) \\
> > &= 0.97848
> > \end{align*}
> > $$
> >
> > Bounds: lower $= (1 - 0.1^2)^2 (1 - 0.1^3)^2 = 0.97814$; upper $= 1 - (1 - 0.81)^2 (1 - 0.729)^2 = 0.99735$. The cut-set bound is very tight when components are reliable.

> [!example]- Expected Life of a 2-out-of-3 System {Example}
> Each server in the first example has an exponential lifetime with mean $10$ years. Find the system's expected life.
>
> > [!answer]-
> > With $p = e^{-t/10}$, $r = 3p^2 - 2p^3$:
> >
> > $$
> > \begin{align*}
> > E[L] &= \int_0^\infty \left(3e^{-2t/10} - 2e^{-3t/10}\right) dt \\
> > &= 3(5) - 2\left(\tfrac{10}{3}\right) \\
> > &= 8.33 \text{ years}
> > \end{align*}
> > $$
> >
> > Shorter than one server's $10$ years: the system fails at the second failure, which on average comes sooner than a single server's failure. Redundancy here buys reliability early on, not a longer expected life.
