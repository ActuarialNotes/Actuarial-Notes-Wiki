---
aliases:
  - Future Lifetime
  - Complete Future Lifetime Random Variable
  - Future Lifetime Distribution
  - Mortality Probability
  - Individual Live
  - Single Life
  - Single Live
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:61d5fa620f10a1a81e4f2943daa9c3cfd8d16ad1e555a6855a62ffb55ab939d5
  sources:
    - "SOA Exam FAM-L Sample Solutions (2024-10, rev. Aug 2026), Q2.5 p.6 (e40 = e40:20 + 20p40 e60; e40 = e40:1 + p40 e41 with e40:1 = p40), Q3.2 p.10 (complete select recursion e[65] = int tp[65] + p[65] int tp66 + p[65]p66 e67, run into the ultimate table), Q3.13 p.15 (e[58]+2 = p[58]+2 (1 + e60)), Q4.5 p.20 (term to year 30: 95th percentile from the time 5% have died, l65+t = 0.95 l45, PV = 100,000 e^(-0.05t)), Q4.18 p.26 (PV decreasing in T, 90th percentile at the time 10% have died), Q6.45 p.58 (L0 decreasing in T so its 75th percentile is L0(t) with Pr[T35 > t] = 0.75), Q7.41 p.82 (term-type loss: survivor's value compared with the early-death percentile), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "Hartman, Stat 344 Life Contingencies I, Chapter 3 (BYU), slides 16-17 (select notation; all relationships hold in select models; after the d-year select period l[x]+s = l_x+s, mu[x]+s = mu_x+s), sha256:1f528470fb261977396645e963306b1eeb2b4fc7c7cdfe32aa8d30dc1ff03e68 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter3.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), ch.4 exercise 5 p.115 (PDF 125: curtate c_x = p_x(1 + c_x+1)), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Future Lifetime Random Variable.md
---
**The Future Lifetime Random Variable** $T_x$ is the time from now until the death of a single life now aged $x$, written $(x)$. Its distribution gives every survival and mortality probability for that life, and its integer part, the **curtate future lifetime** $K_x = \lfloor T_x \rfloor$, counts the complete years that $(x)$ will still live. It is the random variable behind the [[Survival Model|survival model]] for individual lives in Dickson, Hardy & Waters (AMLCR, chapter 2), and every benefit on a single life depends on $T_x$ or $K_x$.

> $${}_tp_x = \Pr(T_x > t) = S_x(t)$$

> $${}_{u|t}q_x = {}_up_x - {}_{u+t}p_x$$

> $$f_x(t) = {}_tp_x\,\mu_{x+t}$$

> $$\mathring{e}_x = E[T_x] = \int_0^{\infty} {}_tp_x\,dt$$

> $$e_x = E[K_x] = \sum_{k=1}^{\infty} {}_kp_x$$

- **Symbols:** ${}_tq_x = 1 - {}_tp_x$ is the probability that $(x)$ dies within $t$ years, and ${}_{u|t}q_x$ is the probability that $(x)$ survives $u$ years and then dies within the following $t$ years. When $t = 1$ the subscript is dropped, so $p_x$ and $q_x$ are one-year probabilities. $\mu_{x+t}$ is the [[Hazard Rate|force of mortality]] at age $x+t$, and $f_x$ is the density of $T_x$.
- **One life, one model:** The lifetimes at different ages come from one lifetime $T_0$, conditioned on survival to age $x$, so ${}_tp_x = S_0(x+t)/S_0(x)$ and ${}_{t+u}p_x = {}_tp_x\,{}_up_{x+t}$. In a select model the distribution also depends on the age at selection, which the notation shows as ${}_tp_{[x]+s}$. A [[Joint Life|joint life]] status combines the future lifetimes of two such lives, $T_x$ and $T_y$.
- **Curtate lifetime and moments:** $K_x$ takes the value $k$ with probability ${}_kp_x\,q_{x+k} = {}_{k|}q_x$, for $k = 0, 1, 2, \ldots$. The second moments are $E[T_x^2] = 2\int_0^\infty t\,{}_tp_x\,dt$ and $E[K_x^2] = \sum_{k \ge 1}(2k-1)\,{}_kp_x$, and each variance is the second moment less the squared mean. Capping the lifetime at $n$ years gives the term expectations $\mathring{e}_{x:\overline{n}|} = \int_0^n {}_tp_x\,dt$ and $e_{x:\overline{n}|} = \sum_{k=1}^n {}_kp_x$.
- **Under UDD:** With the uniform distribution of deaths [[Fractional Age Assumption|fractional age assumption]], $T_x = K_x + R$, where $R$ is uniform on $(0,1)$ and independent of $K_x$. It follows that $\mathring{e}_x = e_x + \frac12$ and $\text{Var}(T_x) = \text{Var}(K_x) + \frac{1}{12}$.
- **Recursions for the expectation of life:** Splitting the lifetime at $n$ years gives $\mathring{e}_x = \mathring{e}_{x:\overline{n}|} + {}_np_x\,\mathring{e}_{x+n}$, and likewise $e_x = e_{x:\overline{n}|} + {}_np_x\,e_{x+n}$: the years lived in the first $n$, plus, if $(x)$ survives them, the expectation from age $x+n$. With $n = 1$ these are the one-year recursions $\mathring{e}_x = \int_0^1 {}_tp_x\,dt + p_x\,\mathring{e}_{x+1}$ and $e_x = p_x\left(1 + e_{x+1}\right)$.
- **Select expectations:** The same recursions hold for a select life, run year by year through the select period and then into the ultimate part of the table: $\mathring{e}_{[x]} = \int_0^1 {}_tp_{[x]}\,dt + p_{[x]}\,\mathring{e}_{[x]+1}$, and so on. With a select period of $d$ years, the life aged $x+d$ selected at $x$ is subject to ultimate mortality, so $\mathring{e}_{[x]+d} = \mathring{e}_{x+d}$.
- **Percentiles of a decreasing function:** If $Y = g(T_x)$ with $g$ decreasing, a large value of $Y$ comes from an early death. So the $p$-th percentile of $Y$ is $g(t)$ at the $t$ with $\Pr(T_x > t) = {}_tp_x = p$, which is the $(1-p)$-th percentile of $T_x$. The present value $v^{T_x}$ of a benefit paid at death, and most loss random variables, are decreasing in $T_x$, and the same reasoning applies to functions of $K_x$.
- **A term benefit:** For an $n$-year term benefit paid at death, the present value is $v^{T_x}$ if $T_x \le n$ and 0 after the term, so it falls with the time of death and then drops to zero. Its $p$-th percentile comes from an early death: find $t$ with ${}_tp_x = p$, that is $\ell_{x+t} = p\,\ell_x$. If $t$ falls inside the term the percentile is $v^t$. If $t$ falls after it, more than a proportion $p$ of lives survive the term and receive nothing, so the percentile is 0.

> [!example]- Probabilities and Moments from a Survival Function {Example}
> A newborn's lifetime has survival function $S_0(x) = \left(1 - \frac{x}{100}\right)^{1/2}$ for $0 \le x \le 100$. For a life aged 40, find ${}_{20}p_{40}$, ${}_{10|10}q_{40}$, $\mu_{60}$, $\mathring{e}_{40}$ and the standard deviation of $T_{40}$.
>
> > [!answer]-
> > The future lifetime of $(40)$ has ${}_tp_{40} = S_0(40+t)/S_0(40) = \left(1 - \frac{t}{60}\right)^{1/2}$ for $0 \le t \le 60$, so $\mu_{40+t} = -\frac{d}{dt}\ln {}_tp_{40} = \frac{1}{2(60-t)}$.
> > $$
> > \begin{align*}
> > {}_{20}p_{40} &= \left(\tfrac{40}{60}\right)^{1/2} \\
> > &= 0.81650 \\
> > {}_{10|10}q_{40} &= {}_{10}p_{40} - {}_{20}p_{40} \\
> > &= 0.91287 - 0.81650 \\
> > &= 0.09637 \\
> > \mu_{60} &= \frac{1}{2(60 - 20)} \\
> > &= 0.0125
> > \end{align*}
> > $$
> > Substituting $u = 1 - t/60$ turns both integrals into integrals of powers of $u$.
> > $$
> > \begin{align*}
> > \mathring{e}_{40} &= \int_0^{60}\left(1 - \tfrac{t}{60}\right)^{1/2}dt \\
> > &= 60 \cdot \tfrac{2}{3} \\
> > &= 40 \\
> > E\left[T_{40}^2\right] &= 2\int_0^{60} t\left(1 - \tfrac{t}{60}\right)^{1/2}dt \\
> > &= 2(60)^2\left(\tfrac{2}{3} - \tfrac{2}{5}\right) \\
> > &= 1{,}920 \\
> > \text{Var}(T_{40}) &= 1{,}920 - 40^2 \\
> > &= 320
> > \end{align*}
> > $$
> > The standard deviation is $\sqrt{320} = 17.89$ years. The force of mortality grows without limit as $t$ approaches 60, because no one in this model lives past age 100.

> [!example]- Curtate Lifetime at the End of a Table {Example}
> A life table ends at age 100, with $q_{97} = 0.3$, $q_{98} = 0.5$ and $q_{99} = 1$. For a life aged 97, find the distribution of $K_{97}$, $e_{97}$ and $\text{Var}(K_{97})$. Then, assuming UDD, find $\mathring{e}_{97}$ and $\text{Var}(T_{97})$.
>
> > [!answer]-
> > The survival probabilities are $p_{97} = 0.7$, ${}_2p_{97} = 0.7(0.5) = 0.35$ and ${}_3p_{97} = 0$. So $K_{97}$ takes the values 0, 1 and 2 with probabilities $0.30$, $0.35$ and $0.35$.
> > $$
> > \begin{align*}
> > e_{97} &= 0.7 + 0.35 \\
> > &= 1.05 \\
> > E\left[K_{97}^2\right] &= 1(0.7) + 3(0.35) \\
> > &= 1.75 \\
> > \text{Var}(K_{97}) &= 1.75 - 1.05^2 \\
> > &= 0.6475
> > \end{align*}
> > $$
> > The direct sum $0(0.30) + 1(0.35) + 4(0.35)$ gives the same second moment. Under UDD, the part of the year lived in the year of death is uniform and independent of $K_{97}$.
> > $$
> > \begin{align*}
> > \mathring{e}_{97} &= 1.05 + 0.5 \\
> > &= 1.55 \\
> > \text{Var}(T_{97}) &= 0.6475 + \tfrac{1}{12} \\
> > &= 0.7308
> > \end{align*}
> > $$

> [!example]- A Percentile of the Present Value of a Death Benefit {Example}
> For the survival function of the first example, a life aged 40 has ${}_tp_{40} = \left(1 - \frac{t}{60}\right)^{1/2}$. With $\delta = 0.04$, find the 90th percentile of the present value of a benefit of 1 paid at the moment of death under a whole life insurance, a 20-year term insurance and a 10-year term insurance.
>
> > [!answer]-
> > The present value falls as the death comes later, so its 90th percentile comes from the time by which only 10% of lives have died.
> > $$
> > \begin{align*}
> > \left(1 - \tfrac{t}{60}\right)^{1/2} &= 0.9 \\
> > t &= 60(1 - 0.81) \\
> > &= 11.4 \\
> > v^{11.4} &= e^{-0.04(11.4)} \\
> > &= 0.6338
> > \end{align*}
> > $$
> > The 90th percentile is $0.6338$ for the whole life insurance and for the 20-year term, since 11.4 years is inside the term. For the 10-year term it is 0: more than 90% of lives survive ten years, and their present value is zero.

> [!tip]- How it appears on the exam
> - **FAM** gives a survival function, a force of mortality or a life table, and asks for ${}_tp_x$, ${}_tq_x$, ${}_{u|t}q_x$, $\mu_{x+t}$ or the density $f_x(t)$ for a life at a stated age, using select notation where the table is select.
> - **Moments:** A question can also ask for $\mathring{e}_x$, $e_x$, a term expectation such as $\mathring{e}_{x:\overline{n}|}$, or a variance. When only integer-age values are given, the question states UDD or a constant force between integer ages.
> - **Single lives:** Every present value random variable in FAM's long-term topics is a function of $T_x$ or $K_x$ for one life, such as a death benefit paid at time $T_x$ or at the end of year $K_x + 1$.
> - **ALTAM** combines two future lifetimes in [[Joint Life|joint life]] models and asks whether $T_x$ and $T_y$ can be treated as independent, which sources of dependence make them not so, and how the models allow for it.

> [!warning]- Exam traps
> - **Curtate versus complete:** The sum for $e_x$ starts at $k = 1$, while the integral for $\mathring{e}_x$ starts at 0. Starting the sum at $k = 0$ gives $E[K_x + 1]$, which is one year too large.
> - **The second moment:** The second moment of $T_x$ is $2\int_0^\infty t\,{}_tp_x\,dt$. Dropping the factor 2, or squaring $\mathring{e}_x$, gives a variance that is far too small or zero.
> - **Deferred probabilities:** ${}_{u|t}q_x$ equals ${}_up_x\,{}_tq_{x+u}$. Writing ${}_up_x\,{}_tq_x$ applies the mortality of age $x$ to a life that is now $u$ years older.
> - **Conditioning on age $x$:** From a newborn survival function, ${}_tp_x = S_0(x+t)/S_0(x)$, not $S_0(t)$. The two agree only under a constant force of mortality.
