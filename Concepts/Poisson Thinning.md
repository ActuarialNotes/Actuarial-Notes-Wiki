---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:f6f574025467aff734e7476b0f5ae6ba9438bacb02f63a4259f6fecc276d4a4d
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Fact 1.13 p.9 (types with probabilities π_j(t): each type a Poisson process with rate π_j(t)λ(t), and the type counts independent), Example 1.14 p.9, §1.4.3 and Example 1.29 pp.14-15 (thinning a homogeneous process with π(t) gives a non-homogeneous one), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Thinning and Superposition', Thinning (two-type process: rates rp and r(1 − p), independent; M_t given N_t = n binomial(n, p); k types), sha256:e07aab3aa8206236541466f57719dcdce9fdf7f1f21a9dd5357d89034cf623ba — https://www.randomservices.org/random/poisson/Splitting.html"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides pp.4-5 Proposition 5.2 and pp.8-9 Proposition 5.3 (time-dependent classification: N_i(t) independent Poisson with means λ∫_0^t p_i(s)ds; claim-reporting example), sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Gallager, Discrete Stochastic Processes (MIT OCW 6.262, Spring 2011), ch.2 Poisson Processes, §2.4 Non-homogeneous Poisson processes, Thm 2.4.1 and Example 2.4.1 (M/G/∞ splitting), PDF pp.18-20 (book pp.86-88), sha256:22aca1e5891be88631806e7a32fe24ba6b4e4729d61b9217a4517a379ea9838f — https://ocw.mit.edu/courses/6-262-discrete-stochastic-processes-spring-2011/3a19ce0e02d0008877351bfa24f3716a_MIT6_262S11_chap02.pdf"
    - "Sigman, 'Non-stationary Poisson processes and Compound (batch) Poisson processes', Columbia IEOR 4404 notes (2013), §1.1 The non-stationary case: Thinning, PDF pp.1-2, sha256:91ae1398bbf6f852a48bac75670d19e25cc6369d31f0cb1579627d1c09b80dd4 — http://www.columbia.edu/~ks20/4404-Sigman/4404-Notes-NSP.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Thinning.md
---

**Poisson Thinning** (splitting) is the result that if each event of a [[Poisson Process]] with rate $\lambda$ is independently classified as type 1 with probability $p$ and type 2 with probability $1-p$, the two type counts are themselves **independent** Poisson processes with rates $\lambda p$ and $\lambda(1-p)$.

> $$N_1(t) \sim \text{Poi}(\lambda p\, t)$$
>
> $$N_2(t) \sim \text{Poi}\big(\lambda (1-p)\, t\big)$$

- $N_1(t)$ and $N_2(t)$ are independent of each other, and each has independent, stationary increments. With $k$ types of probabilities $p_1, \ldots, p_k$, the result gives $k$ independent Poisson processes with rates $\lambda p_i$.
- **Independence is the surprising part.** Learning that many small claims occurred says nothing about the number of large ones. Contrast conditioning on the total: given $N(t) = n$, $N_1(t)$ is [[Binomial Distribution|binomial]]$(n, p)$ and the two counts are negatively dependent.
- **Time-dependent classification** (Ross): if an event at time $s$ is type $i$ with probability $P_i(s)$, the $N_i(t)$ are independent Poisson with means $\lambda \int_0^t P_i(s)\,ds$. Reporting-lag and [[IBNR]] counts come from this version.
- Thinning with a probability $p(t)$ that varies over time produces a [[Nonhomogeneous Poisson Process]] with [[Intensity Function|intensity]] $\lambda p(t)$ — which is also how such a process is simulated.
- Standard uses: claims that pierce a [[Deductible]] ($p = P(X > d)$), claims by cause of loss or coverage, losses in a reinsurance layer. The reverse operation is [[Poisson Superposition]], and each type's aggregate amount is its own [[Compound Poisson Process]].

> [!example]- Claims That Pierce a Deductible {Example}
> Losses on a book occur as a Poisson process at $\lambda = 10$ per year. Loss amounts are exponential with mean $\$5{,}000$, independent of the arrival process, and every policy carries a $\$2{,}000$ deductible.
>
> (a) At what rate do paid claims arrive? (b) What is the probability of no paid claims in a year? (c) This year $4$ losses below the deductible have been recorded. What is the expected number of paid claims this year?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > p &= P(X > 2{,}000) \\
> > &= e^{-2{,}000/5{,}000} \\
> > &= 0.67032 \\
> > \lambda p &= 10 \times 0.67032 \\
> > &= 6.7032
> > \end{align*}
> > $$
> >
> > (a) Paid claims form a Poisson process at $6.70$ per year.
> >
> > (b) $P(N_1(1) = 0) = e^{-6.7032} = 0.00123$.
> >
> > (c) Still $6.70$. The small-loss count $N_2$ is independent of $N_1$, so the four losses under the deductible carry no information about the number of paid claims.

> [!example]- Counting IBNR Claims from Reporting Lags {Example}
> Claims occur as a Poisson process at $\lambda = 20$ per month starting at time $0$. Each claim's reporting delay is exponential with mean $2$ months, independent of everything else. At $t = 6$ months, find the expected numbers of incurred-but-not-reported and reported claims.
>
> > [!answer]-
> > A claim occurring at time $s \leq 6$ is still unreported at $t = 6$ with probability $e^{-(6-s)/2}$. By time-dependent thinning:
> >
> > $$
> > \begin{align*}
> > E[N_{\text{IBNR}}(6)] &= 20 \int_0^6 e^{-(6-s)/2}\,ds \\
> > &= 20 \times 2\left(1 - e^{-3}\right) \\
> > &= 40 \times 0.95021 \\
> > &= 38.01
> > \end{align*}
> > $$
> >
> > The reported count has mean $20 \times 6 - 38.01 = 81.99$. Both are Poisson and **independent** — under this model, the number of claims already reported says nothing about how many are still to come.
