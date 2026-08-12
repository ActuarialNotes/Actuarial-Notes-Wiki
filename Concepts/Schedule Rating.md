**Schedule Rating** applies underwriter-assigned debits and credits to the manual premium for characteristics of the individual risk that the classification system does not capture — the physical condition of premises, management quality, safety programmes, employee selection and training, loss-control practices.

> $$\text{Schedule-Rated Premium} = \text{Manual Premium} \times \left(1 + \sum_k s_k\right)$$

- Where [[Experience Rating|experience rating]] is **statistical** — it looks at what happened — schedule rating is **prospective and judgmental**: it looks at features expected to affect future losses before they show up in the record. That makes it the right tool for a risk that has recently improved, or for a new operation with no experience at all.
- The filed schedule lists eligible categories with maximum credits and debits, and most jurisdictions cap the total modification at $\pm 25\%$. Each modification must be documented against a specific, observable characteristic.
- Order of application: schedule and experience modifications are both applied to manual premium to produce **standard premium**. Convention varies on sequencing; because both are multiplicative the product is the same, but the filed [[Rating Algorithm|rating algorithm]] must state the order so results are reproducible.
- The obvious weakness is **consistency**. Two underwriters can see the same risk differently, and the discretion can become a competitive discount wearing an actuarial label. Regulators review aggregate schedule credits for exactly this reason: a book where nearly every risk receives the maximum credit is not being schedule-rated, it is being discounted.
- Because credits are judgmental, they are also a source of **rate level leakage**: the filed manual rate can be adequate while the *achieved* rate is not. Monitoring the average schedule modification over time is part of measuring true rate change.

![[Media/Figures/Schedule_Rating.svg|340]]

> [!example]- Applying a Schedule Modification {Example}
> A commercial general liability risk has a manual premium of $\$20{,}000$. The underwriter assigns a $-10\%$ credit for an excellent safety programme and a $+5\%$ debit for the age and condition of the building. The risk also carries an experience modification of $0.90$.
>
> Compute the standard premium.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Net schedule modification} &= -10\% + 5\% = -5\% \\[4pt]
> > \text{Schedule-rated} &= \$20{,}000 \times 0.95 = \$19{,}000 \\[4pt]
> > \text{Standard premium} &= \$19{,}000 \times 0.90 = \$17{,}100
> > \end{align*}$$
> >
> > The two modifications together deliver a $14.5\%$ reduction from manual. Note that the discount rests on two different kinds of evidence: the $0.90$ is what this risk's losses actually were, while the $-5\%$ is what an underwriter expects them to be — and only the first is auditable after the fact.

> [!example]- Schedule Credits Eroding Rate Adequacy {Example}
> An insurer files a $+8\%$ manual rate increase. Over the same period the average schedule credit on its book moves from $-6\%$ to $-13\%$.
>
> What is the achieved rate change, and what should the actuary do?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Achieved factor} &= 1.08 \times \frac{1 - 0.13}{1 - 0.06} \\
> > &= 1.08 \times \frac{0.87}{0.94} \\
> > &= 1.08 \times 0.9255 \\
> > &= 0.9995
> > \end{align*}$$
> >
> > The achieved rate change is essentially **zero**. The filed increase was given back entirely through underwriting discretion, and the book's rate adequacy is unchanged while the filing suggests it improved by $8\%$.
> >
> > Three consequences follow:
> >
> > 1. The **on-level factors** used in the next indication are wrong. They reflect the filed $+8\%$, not the achieved $0\%$, so historical premium is being over-adjusted and the next indication will understate the rate need. Schedule credits must be tracked and reflected in the rate level history.
> > 2. The next indication will therefore ask for less than the book needs — an error that compounds each cycle it goes unnoticed.
> > 3. The pattern itself is the finding worth escalating: a seven-point swing in average credit across a book is a pricing decision being made outside the pricing process.
