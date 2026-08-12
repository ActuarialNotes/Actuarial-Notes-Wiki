**Lifetime Value** (LTV) is the present value of the expected profit from a customer relationship over its whole life, rather than over a single policy period. It is the framework Werner uses for the retention and acquisition questions that sit *on top of* the actuarial indication.

> $$\text{LTV} = \sum_{t=1}^{T} \frac{\left(P_t - L_t - E_t\right) \times {}_{t}p}{(1 + r)^{t}}$$

> $$\text{Retention Ratio} = \frac{\text{Policies renewed}}{\text{Policies eligible to renew}}$$

- ${}_{t}p$ is the probability the customer is still on the books at time $t$ and $r$ the discount rate. Retention is what makes the sum finite: a book renewing at $85\%$ has an average customer life of about $1/(1-0.85) \approx 6.7$ years, at $90\%$ about ten years.
- LTV justifies **first-year pricing below full cost** where acquisition costs are large and renewal margins are reliable — but only if the retention and loss-improvement assumptions hold. The "seasoning" effect (a policy's loss ratio improving with tenure) is real in personal lines and is one of the strongest arguments for the approach.
- The corresponding risk is **adverse selection on price**: a below-cost new-business rate attracts the most price-sensitive shoppers, who are also the least likely to renew. If the customers acquired are not the ones the retention assumption describes, the LTV never materializes.
- **Price elasticity and retention modelling** are what make LTV operational. Modelling renewal probability as a function of the rate change offered lets an insurer see the trade-off directly: a larger increase raises premium per policy and lowers the number of policies, and the optimum is rarely at either extreme.
- The professional boundary matters: the **indication** is an actuarial estimate of expected cost; LTV is a **business decision layer** applied to it. Departing from the indication for retention reasons is legitimate and must be documented as a departure ([[Rate Change]], [[Ratemaking Constraints]]) — not folded back into the cost estimate.

> [!example]- LTV Justifying a First-Year Loss {Example}
> Acquiring a homeowners customer costs $\$200$. The first-year underwriting result is $-\$50$; expected renewal profit is $\$120$ a year for four further years, and the discount rate is $8\%$. Assume renewal is certain for those four years.
>
> Compute the lifetime value.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{PV of renewals} &= \$120 \times \frac{1 - 1.08^{-4}}{0.08} \\
> > &= \$120 \times 3.3121 \\
> > &= \$397.45 \\[6pt]
> > \text{LTV} &= -\$200 - \$50 + \$397.45 \\
> > &= +\$147.45
> > \end{align*}$$
> >
> > The relationship is worth $\$147$ despite losing money in year one, so the acquisition is justified — *conditional on the customer renewing four times*.

> [!example]- The Same Customer at a Realistic Retention Rate {Example}
> Repeat the calculation with an annual retention rate of $80\%$, and then with the $65\%$ retention typical of price-shopped new business.
>
> > [!answer]-
> > With retention $p$, the year-$t$ profit is received with probability $p^{t}$:
> >
> > $$\text{PV} = \$120 \sum_{t=1}^{4} \frac{p^{t}}{1.08^{t}}$$
> >
> > **At $p = 0.80$** the per-year discount factor is $0.80/1.08 = 0.7407$:
> >
> > $$\begin{align*}
> > \text{PV} &= \$120 \times (0.7407 + 0.5487 + 0.4064 + 0.3011) \\
> > &= \$120 \times 1.9969 = \$239.63 \\[4pt]
> > \text{LTV} &= -\$250 + \$239.63 = -\$10.37
> > \end{align*}$$
> >
> > **At $p = 0.65$**, the factor is $0.6019$:
> >
> > $$\begin{align*}
> > \text{PV} &= \$120 \times (0.6019 + 0.3622 + 0.2180 + 0.1312) \\
> > &= \$120 \times 1.3133 = \$157.60 \\[4pt]
> > \text{LTV} &= -\$250 + \$157.60 = -\$92.40
> > \end{align*}$$
> >
> > The acquisition swings from $+\$147$ to $-\$92$ on the retention assumption alone.
> >
> > This is the trap in LTV-justified pricing. The customers attracted by a below-cost first-year rate are precisely those shopping on price, and they are the least likely to renew at the full rate — so the low-retention column is the relevant one, not the certain-renewal column used to justify the discount. Testing the LTV at the retention rate **the discount itself produces**, rather than at the book's average, is what separates a sound acquisition strategy from a slow leak.
