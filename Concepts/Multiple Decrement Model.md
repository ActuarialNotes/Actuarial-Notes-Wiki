---
aliases:
  - Multiple Decrement
  - Deconstruct Multiple Decrement Table
  - Single Decrement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ef55a010dc0580f6519c99489dcab8ea11738060f863766ae60c2ec79d3f232d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multiple Decrement Model.md
---

**A Multiple Decrement Model** follows a group of lives who can leave one active state by any of several causes, such as death, withdrawal, disability or retirement. It is the [[Multiple State Model|multiple state model]] with a single active state and one absorbing exit state for each cause, and in table form it gives the **dependent** probability $q^{(j)}_x$ of leaving by cause $j$ within a year while every cause operates.

> $$q^{(\tau)}_x = \sum_{j=1}^{m} q^{(j)}_x$$

> $$p'^{(j)}_x = \exp\left(-\int_0^1 \mu^{(j)}_{x+t}\,dt\right)$$

> $$p'^{(j)}_x = \left(p^{(\tau)}_x\right)^{q^{(j)}_x / q^{(\tau)}_x}$$

> $$q^{(1)}_x = q'^{(1)}_x\left(1 - \tfrac{1}{2}\,q'^{(2)}_x\right)$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 8), $q^{(\tau)}_x$ is the probability of leaving by any cause and $p^{(\tau)}_x = 1 - q^{(\tau)}_x$. The **associated single decrement** probability $q'^{(j)}_x = 1 - p'^{(j)}_x$ is the probability of leaving by cause $j$ in a model where $j$ is the only cause, with the same [[Transition Intensity|intensity]] $\mu^{(j)}$. Because the intensities add, $p^{(\tau)}_x = \prod_j p'^{(j)}_x$ holds without any further assumption.
- **Deconstructing a table:** The third block recovers the single decrement rates from the table. It holds under uniform distribution of each decrement in the multiple decrement table, ${}_tq^{(j)}_x = t\,q^{(j)}_x$, and also under constant intensities over the year, because both make $\mu^{(j)}_{x+t}/\mu^{(\tau)}_{x+t}$ equal to $q^{(j)}_x/q^{(\tau)}_x$ throughout the year. Run backward, it constructs a table: $q^{(j)}_x = q^{(\tau)}_x\ln p'^{(j)}_x / \ln p^{(\tau)}_x$.
- **Constructing from single decrement tables:** The fourth block assumes instead a uniform distribution of decrements in each single decrement model, for two causes. With three causes it becomes $q^{(1)}_x = q'^{(1)}_x\,(1 - \tfrac{1}{2}(q'^{(2)}_x + q'^{(3)}_x) + \tfrac{1}{3}q'^{(2)}_x\,q'^{(3)}_x)$. The two [[Fractional Age Assumption|fractional age assumptions]] give slightly different tables.
- **Decrements at fixed times:** Some causes act only at one moment, such as withdrawals at the policy anniversary or retirement at a set age. A cause at the end of the year is applied to the survivors of the other causes, $q^{(w)}_x = \left(1 - q'^{(d)}_x\right)q'^{(w)}_x$, and no fractional age assumption is needed for it.

> [!example]- Constructing a Death and Lapse Table {Example}
> For a block of term policies, the single decrement probabilities in one policy year are $q'^{(d)} = 0.010$ for death and $q'^{(w)} = 0.150$ for lapse. Construct the dependent probabilities (a) under UDD in each single decrement model, (b) under constant intensities, and (c) when lapses happen only at the end of the year.
>
> > [!answer]-
> > In (a) and (b), $p^{(\tau)} = (0.99)(0.85) = 0.8415$, so $q^{(\tau)} = 0.1585$.
> > $$
> > \begin{align*}
> > \text{(a)}\ q^{(d)} &= 0.010(1 - 0.075) \\
> > &= 0.009250 \\
> > q^{(w)} &= 0.150(1 - 0.005) \\
> > &= 0.149250 \\
> > \text{(b)}\ q^{(d)} &= \frac{\ln 0.99}{\ln 0.8415}(0.1585) \\
> > &= 0.009231 \\
> > q^{(w)} &= \frac{\ln 0.85}{\ln 0.8415}(0.1585) \\
> > &= 0.149269 \\
> > \text{(c)}\ q^{(d)} &= 0.010 \\
> > q^{(w)} &= 0.99(0.150) \\
> > &= 0.148500
> > \end{align*}
> > $$
> > The two fractional age assumptions differ by less than 0.00002. Year-end lapses change the table more, because every policy is exposed to death for the whole year before it can lapse.

> [!example]- Changing the Lapse Assumption {Example}
> A multiple decrement table gives $q^{(d)} = 0.004$ for death, $q^{(i)} = 0.006$ for disability and $q^{(w)} = 0.060$ for withdrawal at one age. A new product design is expected to halve the single decrement withdrawal rate. Assuming UDD in the multiple decrement table for the old table and constant intensities for the new one, find the new dependent rates.
>
> > [!answer]-
> > Deconstruct the old table with $p^{(\tau)} = 0.93$ and $q^{(\tau)} = 0.07$.
> > $$
> > \begin{align*}
> > p'^{(d)} &= 0.93^{0.004/0.07} \\
> > &= 0.995862 \\
> > p'^{(i)} &= 0.93^{0.006/0.07} \\
> > &= 0.993799 \\
> > p'^{(w)} &= 0.93^{0.060/0.07} \\
> > &= 0.939692
> > \end{align*}
> > $$
> > The new withdrawal rate is $q'^{(w)} = 0.060308/2 = 0.030154$, so $p^{(\tau)} = 0.995862(0.993799)(0.969846) = 0.959844$ and $q^{(\tau)} = 0.040156$, with $\ln p^{(\tau)} = -0.040985$.
> > $$
> > \begin{align*}
> > q^{(d)} &= \frac{0.004147}{0.040985}(0.040156) \\
> > &= 0.004063 \\
> > q^{(i)} &= \frac{0.006220}{0.040985}(0.040156) \\
> > &= 0.006094 \\
> > q^{(w)} &= \frac{0.030618}{0.040985}(0.040156) \\
> > &= 0.029999
> > \end{align*}
> > $$
> > Fewer withdrawals leave more lives exposed to death and disability, so both dependent rates rise even though their single decrement rates are unchanged.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to construct and deconstruct multiple decrement tables using the associated single decrement models and a stated fractional age assumption.
> - **Estimation:** ALTAM also asks for maximum likelihood estimates of the intensities in a multiple decrement model, assuming piecewise constant intensities, and for the probabilities that follow from them.
> - **Valuation:** The resulting table feeds the EPVs of benefits that depend on the cause of exit, such as a death benefit and a cash value on withdrawal, or the [[Service Table|service table]] of a pension plan.

> [!warning]- Exam traps
> - **Dependent versus single decrement rates:** $q^{(j)}_x$ is always smaller than $q'^{(j)}_x$ when other causes operate, because some lives leave by another cause first. Adding the single decrement rates overstates $q^{(\tau)}_x$, which must come from $1 - \prod_j p'^{(j)}_x$.
> - **Which UDD:** UDD in the multiple decrement table leads to the power formula, while UDD in each single decrement model leads to the product formula with $\tfrac{1}{2}$ and $\tfrac{1}{3}$. Using one when the question states the other lands on a nearby answer.
> - **Decrements at a single moment:** If withdrawals happen only at year end, no fractional age assumption applies to them. Spreading them through the year understates the death rate, because each policy is exposed to death for the full year.
