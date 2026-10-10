---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bfbb16b9516ce3d6723f24bcd9d3be03e940eb5225ab124fd9c06d67d534db8d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Standard Actuarial Notation.md
---

**Standard Actuarial Notation** is the international system of symbols for survival probabilities, expectations of life and the expected present values of life insurance and annuity benefits, as used in Dickson, Hardy & Waters (AMLCR). Every symbol is a core letter for the quantity, with a status on the right ($x$, $[x]+t$, $x{:}\overline{n}|$), a duration or deferral on the left, and marks above and around it that say when payments are made. Reading the marks correctly is most of the work, because the same letter stands for several different values.

> $${}_tp_x = \Pr(T_x > t) = 1 - {}_tq_x$$

> $${}_{t|u}q_x = {}_tp_x - {}_{t+u}p_x$$

> $$A_{x:\overline{n}|} = A^1_{x:\overline{n}|} + {}_nE_x$$

> $$\ddot{a}_x = \frac{1 - A_x}{d}$$

- **Symbols:** $T_x$ is the [[Future Lifetime Random Variable|future lifetime]] of a life aged $x$, written $(x)$, and $K_x = \lfloor T_x \rfloor$ is its curtate future lifetime. $v = 1/(1+i)$ is the discount factor, $d = 1 - v$ the effective rate of discount, $\delta = \ln(1+i)$ the [[Force of Interest|force of interest]], and $\mu_x$ the [[Hazard Rate|force of mortality]] at age $x$. When the left subscript is 1 it is dropped, so $p_x$ and $q_x$ are one-year probabilities.
- **Survival and death:** ${}_tp_x$ is the probability that $(x)$ survives $t$ years and ${}_tq_x$ the probability that it dies within $t$ years. The deferred probability ${}_{t|u}q_x$ is the probability that $(x)$ survives $t$ years and then dies within the next $u$, and ${}_{t|}q_x$ means $u = 1$. Survival probabilities chain, ${}_{s+t}p_x = {}_sp_x\,{}_tp_{x+s}$, and ${}_tp_x = \exp\left(-\int_0^t \mu_{x+s}\,ds\right)$.
- **Expectation of life:** The complete expectation $\mathring{e}_x = E[T_x] = \int_0^\infty {}_tp_x\,dt$ carries a ring, and the curtate expectation $e_x = E[K_x] = \sum_{k \ge 1} {}_kp_x$ counts whole years only. Under the uniform distribution of deaths [[Fractional Age Assumption|fractional age assumption]], $\mathring{e}_x = e_x + \tfrac12$.
- **Select and ultimate:** Square brackets mark the age at selection, so $q_{[x]+t}$ is the mortality rate at age $x+t$ for a life selected (underwritten) at age $x$, $t$ years ago. After the select period ends the brackets drop and the ultimate rate $q_{x+t}$ applies. A recently underwritten life has lighter mortality than an ultimate life of the same age, so $q_{[x]} < q_{[x-1]+1} < q_x$ in a typical table.
- **Insurance symbols:** $A$ is the expected present value (EPV) of a benefit of 1. $A_x$ is [[Whole Life Insurance|whole life]], $A^1_{x:\overline{n}|}$ is [[Term Life Insurance|term]] (the 1 over $x$ says the benefit is paid only if $x$ fails first, before $n$ ends), ${}_nE_x = A_{x:\overline{n}|}^{\ \ 1} = v^n\,{}_np_x$ is the [[Pure Endowment|pure endowment]], and $A_{x:\overline{n}|}$ with no 1 is the [[Endowment Insurance|endowment insurance]], the sum of the two. A left subscript defers the cover, as in ${}_{u|}A_x = {}_uE_x\,A_{x+u}$.
- **Annuity symbols:** $\ddot{a}$ with two dots is an annuity-due, paid at the start of each period, and $a$ without dots is an annuity-immediate, paid at the end, so $a_x = \ddot{a}_x - 1$. The term annuity $\ddot{a}_{x:\overline{n}|}$ pays at most $n$ times. See [[Life Annuity]].
- **Timing marks:** A bar means continuous, so $\bar{A}_x = E[v^{T_x}]$ pays at the moment of death and $\bar{a}_x$ pays continuously. Without a bar, $A_x = E[v^{K_x+1}]$ pays at the end of the year of death. A superscript $(m)$ means $m$ payments a year, as in $\ddot{a}^{(12)}_x$, each of $1/m$, or a death benefit at the end of the $1/m$-year of death, $A^{(m)}_x$.
- **Second moments:** A left superscript 2 means the same benefit valued at double the force of interest, $v^2$ in place of $v$. So ${}^2A_x = E[v^{2(K_x+1)}]$, and the variance of the present value of a whole life benefit of 1 is ${}^2A_x - A_x^2$.

> [!example]- Reading a Select Table {Example}
> An illustrative select-and-ultimate table has a two-year select period.
>
> | $x$ | $\ell_{[x]}$ | $\ell_{[x]+1}$ | $\ell_{x+2}$ | $x+2$ |
> |---|---|---|---|---|
> | 60 | 80,000 | 79,000 | 77,800 | 62 |
> | 61 | 78,600 | 77,500 | 76,200 | 63 |
> | 62 | 77,100 | 75,900 | 74,400 | 64 |
>
> Find ${}_2p_{[60]}$ and ${}_{1|2}q_{[61]}$. Then, at $i = 5\%$, find $A^1_{[60]:\overline{2}|}$, ${}_2E_{[60]}$ and $A_{[60]:\overline{2}|}$, and check the last one against $\ddot{a}_{[60]:\overline{2}|}$.
>
> > [!answer]-
> > A life selected at 60 reads along the first row, and after two years it joins the ultimate column at age 62. A life selected at 61 reaches age 64 after three years, which is the ultimate $\ell_{64}$ in the third row.
> > $$
> > \begin{align*}
> > {}_2p_{[60]} &= \frac{\ell_{62}}{\ell_{[60]}} \\
> > &= \frac{77{,}800}{80{,}000} \\
> > &= 0.9725 \\
> > {}_{1|2}q_{[61]} &= \frac{\ell_{[61]+1} - \ell_{64}}{\ell_{[61]}} \\
> > &= \frac{77{,}500 - 74{,}400}{78{,}600} \\
> > &= 0.03944
> > \end{align*}
> > $$
> > The deaths in the two years after selection at 60 are $d_{[60]} = 1{,}000$ and $d_{[60]+1} = 1{,}200$, and $v = 1/1.05$.
> > $$
> > \begin{align*}
> > A^1_{[60]:\overline{2}|} &= \frac{1{,}000\,v + 1{,}200\,v^2}{80{,}000} \\
> > &= 0.025510 \\
> > {}_2E_{[60]} &= v^2(0.9725) \\
> > &= 0.882086 \\
> > A_{[60]:\overline{2}|} &= 0.025510 + 0.882086 \\
> > &= 0.907596
> > \end{align*}
> > $$
> > The annuity-due pays at times 0 and 1, so $\ddot{a}_{[60]:\overline{2}|} = 1 + v(79{,}000/80{,}000) = 1.940476$. With $d = 0.047619$, $1 - d\,\ddot{a}_{[60]:\overline{2}|} = 0.907596$, which matches the endowment insurance, as the identity requires.

> [!example]- Moments Under a Constant Force {Example}
> Assume a constant force of mortality $\mu = 0.02$ and a force of interest $\delta = 0.05$. Find $\mathring{e}_x$, $\bar{A}_x$, ${}^2\bar{A}_x$, $\bar{a}_x$, and the standard deviation of the present value of a whole life benefit of 1 paid at the moment of death.
>
> > [!answer]-
> > Under a constant force, ${}_tp_x = e^{-\mu t}$ at every age, so each symbol is a simple integral.
> > $$
> > \begin{align*}
> > \mathring{e}_x &= \frac{1}{\mu} \\
> > &= 50 \\
> > \bar{A}_x &= \frac{\mu}{\mu + \delta} \\
> > &= 0.285714 \\
> > {}^2\bar{A}_x &= \frac{\mu}{\mu + 2\delta} \\
> > &= 0.166667 \\
> > \bar{a}_x &= \frac{1 - \bar{A}_x}{\delta} \\
> > &= 14.285714
> > \end{align*}
> > $$
> > The variance is ${}^2\bar{A}_x - \bar{A}_x^2 = 0.166667 - 0.081633 = 0.085034$, so the standard deviation is $0.2916$. The second moment uses $2\delta$, not $\delta^2$, and $\bar{a}_x = 1/(\mu + \delta)$ gives the same 14.2857 directly.

> [!tip]- How it appears on the exam
> - **FAM:** Questions on mortality models give a life table, a select table or a survival function and ask for a probability such as ${}_{t|u}q_{[x]+s}$, or for $\mathring{e}_x$ or $e_x$, often over a term, as in $\mathring{e}_{x:\overline{n}|}$. The select questions turn on reading the right row and knowing when a life joins the ultimate column.
> - **FAM:** Questions on long-term coverages ask for the expected value, and often the variance, of the present value random variable of a whole life, term, endowment or deferred insurance, or of a life annuity. Answers rest on the identities above, such as $A_{x:\overline{n}|} = A^1_{x:\overline{n}|} + {}_nE_x$ and $\ddot{a}_x = (1 - A_x)/d$, and on the second moment at double the force of interest.

> [!warning]- Exam traps
> - **Pure endowment versus endowment insurance:** ${}_nE_x$ pays only on survival, while $A_{x:\overline{n}|}$ pays on death within $n$ years or on survival to $n$. Confusing them changes the answer by the whole term insurance.
> - **Brackets on the select age:** $q_{[x]+1}$ and $q_{x+1}$ are both rates at age $x+1$ but for different lives. Using the ultimate column during the select period overstates mortality for a recently underwritten life.
> - **The deferral subscript:** ${}_{t|u}q_x$ needs survival to $t$ first, so it is ${}_tp_x\,{}_uq_{x+t}$, not ${}_uq_{x+t}$ on its own. Leaving out ${}_tp_x$ overstates the probability.
> - **Second moments:** ${}^2A_x$ is $A_x$ at $v^2$, or at $2\delta$ for $\bar{A}_x$. It is not $(A_x)^2$, and for an annuity the variance comes through $\text{Var}(\bar{a}_{\overline{T}|}) = ({}^2\bar{A}_x - \bar{A}_x^2)/\delta^2$.
> - **Due versus immediate:** $\ddot{a}_x = 1 + a_x$, because the annuity-due makes the payment at time 0 that the annuity-immediate does not. The identity $\ddot{a}_x = (1 - A_x)/d$ holds for the annuity-due only.
