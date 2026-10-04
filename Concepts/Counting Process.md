---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:baf2d6c0fc2c88c595808950ca8b3c2014c348777916f4ead1331fab4a19f163
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, ch.1 §1.1 p.3 (N(t) counts events in (0, t]; increments over non-overlapping intervals independent, touching endpoints OK), Def. & Prop. 1.2 p.4, Example 1.6 pp.5-6 (T_3 > 1.2 iff N(1.2) ≤ 2), §1.4.1 p.13 (stationary increments only in the homogeneous case), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Chen, Math 263 Stochastic Processes, 'Poisson processes' slides (San José State U.; based on Ross §§5.3.1-5.3.4, 5.4.1-5.4.2), counting-process conditions PDF p.4, increments Def 0.2 p.5, Poisson Def 0.3 p.6, sha256:a349a248cda7898d393bb41861b87fd65399e793d1abd981babaab36dbdbf826 — https://www.sjsu.edu/faculty/guangliang.chen/Math263/lec8PoissonProcesses.pdf"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 9 slides, following Ross, Introduction to Probability Models ch.5, slides p.8 counting process, p.9 stationary / independent increments, p.10 Definition 5.1, sha256:0c3cfbea1eaf30332c7914d77ba9716b1d1cc790a9a25bad3d4d7cfe52a3259b — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture9.pdf"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides pp.17-18 §5.4.3 conditional (mixed) Poisson process: stationary increments, in general NOT independent increments, sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Introduction' (N_t ≥ n iff T_n ≤ t), sha256:7a4c43eb9386b17752c17d239847db0fbd50dd9a72f3017bf28f7e335fee13ae — https://www.randomservices.org/random/poisson/Introduction.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Poisson Distribution', subsection 'The Binomial Distribution' (N_s given N_t = n is binomial(n, s/t), independent of r), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Counting Process.md
---

A **Counting Process** $\{N(t), t \geq 0\}$ is a [[Stochastic Processes|stochastic process]] in which $N(t)$ is the total number of events — [[Claim|claims]] reported, policies lapsing, storms making landfall — that have occurred by time $t$. It is the frame on which the [[Poisson Process]] and all its variants are built.

> $$N(t) - N(s) = \text{number of events in } (s, t], \quad s < t$$

- **Four defining conditions** (Ross): $N(t) \geq 0$; $N(t)$ is integer-valued; $N(t)$ is nondecreasing, so $s < t \Rightarrow N(s) \leq N(t)$; and the increment $N(t) - N(s)$ counts the events in $(s, t]$. A quantity that can fall — open claims, surplus — is not a counting process.
- **Independent increments**: counts in disjoint intervals are independent. **Stationary increments**: the distribution of $N(t+s) - N(s)$ depends only on the length $t$, not on where the interval sits.
- The [[Poisson Process]] is the counting process with $N(0) = 0$, independent increments and $N(t+s) - N(s) \sim \text{Poi}(\lambda t)$. Let the rate vary over time and stationarity is lost — the [[Nonhomogeneous Poisson Process]]; let the rate vary randomly across risks and independence is lost — the [[Mixed Poisson Process]].
- Counting and waiting carry the same information: $N(t) \geq n \iff S_n \leq t$, where $S_n$ is the arrival time of the $n$-th event (see [[Interarrival Time]]).
- **Exam technique:** rewrite a joint probability such as $P(N(1) = a,\ N(3) = b)$ in terms of **non-overlapping increments** — $N(1)$ and $N(3) - N(1)$ — so that independence lets it factor.

> [!example]- Which Claim Measures Are Counting Processes? {Example}
> A claims department tracks four quantities through a policy year:
>
> 1. $A(t)$ — the cumulative number of claims reported by time $t$
> 2. $B(t)$ — the number of claims open at time $t$
> 3. $C(t)$ — the cumulative dollars paid on claims by time $t$
> 4. $D(t)$ — the cumulative number of claims over $\$50{,}000$ reported by time $t$
>
> Which are counting processes, and when would they have stationary increments?
>
> > [!answer]-
> > - $A(t)$: **yes** — nonnegative, integer-valued and nondecreasing. Its increments are stationary only if the reporting rate is constant through the year; a hail-exposed book with a summer peak breaks that.
> > - $B(t)$: **no** — it falls every time a claim closes.
> > - $C(t)$: **no** — it is nondecreasing but records dollars, not events. Aggregate amounts are modelled on top of a counting process, as in the [[Compound Poisson Process]].
> > - $D(t)$: **yes** — it is $A(t)$ with each claim kept only if it is large, a [[Poisson Thinning|thinned]] count.

> [!example]- Joint and Conditional Claim Counts {Example}
> Claims are reported as a Poisson process at $\lambda = 2$ per week. Find $P(N(1) = 1,\ N(3) = 4)$ and $P(N(1) = 1 \mid N(3) = 4)$.
>
> > [!answer]-
> > Split into the disjoint increments $N(1)$ and $N(3) - N(1)$, which are independent with means $2$ and $4$:
> >
> > $$
> > \begin{align*}
> > P(N(1)=1,\ N(3)=4) &= P(N(1)=1)\,P\big(N(3)-N(1)=3\big) \\
> > &= \left(2e^{-2}\right)\left(\frac{e^{-4}\,4^3}{3!}\right) \\
> > &= (0.27067)(0.19537) \\
> > &= 0.05288
> > \end{align*}
> > $$
> >
> > Dividing by $P(N(3) = 4) = e^{-6}6^4/4! = 0.13385$, the rate cancels and a binomial is left — given four claims in three weeks, each falls in week 1 independently with probability $1/3$:
> >
> > $$
> > \begin{align*}
> > P(N(1)=1 \mid N(3)=4) &= \binom{4}{1}\left(\tfrac{1}{3}\right)\left(\tfrac{2}{3}\right)^3 \\
> > &= \frac{32}{81} \\
> > &= 0.3951
> > \end{align*}
> > $$
> >
> > Conditioning on the total turns a Poisson question into a binomial one, and $\lambda$ no longer matters.
