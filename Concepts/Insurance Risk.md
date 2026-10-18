---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:6d7ef22ecd6ed89bef994ca499c3bd3b7db2ca618bf7d2b9bf466907d0d58348
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Exam 7 Spring 2017 — sample answers and examiner's report, Q22 PDF pp.86-87 (accepted aspects of parameter risk), Q24 PDF pp.93-95 (scenario planning), Q25 PDF p.96 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Insurance Risk.md
---

**Insurance Risk** is the risk that claims, their timing and the cost of settling them differ from what was expected when the business was priced and reserved. For a P&C insurer it has three parts: **underwriting (premium) risk** on business written or to be written, **reserve risk** on claims already incurred, and **catastrophe risk** from single events that strike many policies at once.

> $$
> \begin{aligned}
> \text{Var}(L) &= E\big[\text{Var}(L \mid \theta)\big] \\
> &\quad + \text{Var}\big(E[L \mid \theta]\big)
> \end{aligned}
> $$

- $L$ is aggregate loss and $\theta$ the true, unknown parameters of its distribution. The first term is **process risk** — randomness given the parameters, which pooling diversifies away ([[Law of Large Numbers]]). The second is **[[Parameter Risk|parameter risk]]** — the chance the parameters are wrong — which does **not** diversify, because it moves every policy the same way. (Credibility theory splits variance the same way, into the [[Expected Value of Process Variance|EPV]] and the [[Variance of Hypothetical Means|VHM]].)
- **Brehm's components of underwriting risk:** process risk in frequency and severity (an [[Aggregate Loss Model|aggregate loss model]]); pricing risk from mis-estimation and competitive pressure; parameter risk, subdivided into *estimation* (too little data), *projection* (trend and development, often driven by [[Inflation|inflation]]), *event* (a court ruling, a latent exposure, a new cause of loss) and *systematic* (drivers that hit all policies together); and catastrophe risk, where the correlation is physical.
- **Reserve risk** applies the same analysis to liabilities already on the balance sheet — the distribution of unpaid claims ([[Unpaid Claim Distribution]], [[Stochastic Reserving]]). For long-tailed lines it is often the largest single risk, and A.M. Best's impairment studies have consistently found deficient reserves and inadequate pricing to be the leading cause of P&C insurer impairment.
- **Analysing it quantitatively** means giving each part a distribution and a [[Risk Measure|risk measure]] — coefficient of variation, VaR, TVaR, PML — and combining it with [[Financial Risk|financial risk]] in the [[Risk Modeling|internal risk model]].

> [!example]- Parameter Risk Does Not Diversify {Example}
> Given the true mean $\theta$, each policy's annual loss has standard deviation $\$3{,}000$ and losses are independent. The mean is estimated at $\$1{,}000$ per policy but is uncertain, with standard deviation $\$50$. Find the coefficient of variation of total losses for $100$ and $10{,}000$ policies.
>
> > [!answer]-
> > For $n$ policies, $\text{Var}(S) = n(3{,}000)^2 + n^2(50)^2$.
> >
> > $$
> > \begin{align*}
> > n = 100: \quad \text{Var}(S) &= 9.0 \times 10^8 + 2.5 \times 10^7 \\
> > &= 9.25 \times 10^8 \\
> > \text{CV} &= \frac{30{,}414}{100{,}000} \\
> > &= 30.4\% \\[6pt]
> > n = 10{,}000: \quad \text{Var}(S) &= 9.0 \times 10^{10} + 2.5 \times 10^{11} \\
> > &= 3.4 \times 10^{11} \\
> > \text{CV} &= \frac{583{,}095}{10{,}000{,}000} \\
> > &= 5.83\%
> > \end{align*}
> > $$
> >
> > Growing the book a hundredfold cuts the process CV from $30\%$ to $3\%$, but the CV can never fall below $50/1{,}000 = 5\%$: at $10{,}000$ policies parameter risk is already $74\%$ of the variance. Volume diversifies process risk, not parameter risk.

> [!example]- Catastrophe Risk: Same Mean, Different Tail {Example}
> An insurer covers $1{,}000$ homes worth $\$250{,}000$ each. In book A the homes face independent fires, each destroying a home with probability $0.2\%$ a year. In book B there is no fire risk, but a hurricane with annual probability $2\%$ would damage every home by $10\%$. Compare the mean, standard deviation and $99$th percentile of annual loss.
>
> > [!answer]-
> > **Book A.** $N \sim \text{Bin}(1{,}000,\ 0.002)$ homes lost.
> >
> > $$
> > \begin{align*}
> > E[L_A] &= 2 \times \$250{,}000 \\
> > &= \$500{,}000 \\
> > \text{SD}(L_A) &= \$250{,}000\sqrt{1{,}000(0.002)(0.998)} \\
> > &= \$353{,}000
> > \end{align*}
> > $$
> >
> > $P(N \leq 5) = 0.984$ and $P(N \leq 6) = 0.996$, so the $99$th percentile is $6$ homes, $\$1.5$ million.
> >
> > **Book B.** The loss is $\$25$ million with probability $2\%$, else zero: mean $\$500{,}000$, standard deviation $\$25\text{M}\sqrt{0.02 \times 0.98} = \$3.5$ million, and $99$th percentile $\$25$ million.
> >
> > Same expected loss; the catastrophe book's 1-in-100 loss is about $17$ times larger, and writing more homes in the same region does not help. That is why catastrophe risk is managed through exposure limits, reinsurance and [[CAT Bonds|cat bonds]] rather than volume.
