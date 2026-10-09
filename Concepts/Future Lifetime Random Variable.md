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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2d0a5cb1b5101adac47aba8121e3909a39614f24815dffc742f44ebc3f9a9898
  sources: []
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
