**Profit and Contingency Provision** ($Q_T$) is the loading in the rate that pays for the cost of the capital supporting the business and provides a margin for the possibility that actual results fall short of expected — the "contingency" half recognizing that a rate built on expected values will, on average, be exceeded some of the time.

> $$\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

> $$\text{Target Combined Ratio} = 1 - Q_T$$

- $Q_T$ is a **target underwriting** profit provision, not a target total profit. Total return also includes investment income on policyholder-supplied funds (the loss and unearned premium reserves) and on surplus, so the underwriting provision is what remains after that income is credited.
- Consequently $Q_T$ is **line-dependent**. [[Long Tail Lines|Long-tail lines]] hold reserves for years and earn substantial investment income on them, so they can support a low or even negative underwriting provision and still return the target on equity; [[Short Tail Insurance|short-tail lines]] have little float and need a positive one.
- Standard derivations: the **target return on equity** approach solves for the $Q_T$ that produces the required return given a premium-to-surplus ratio and an investment yield; **discounted cash flow / internal rate of return** models value the whole policy cash flow; the **calendar-year investment income offset** approach credits investment income directly against the provision.
- The **contingency** element is a provision for the difference between expected costs and the costs that actually materialize when a rate is set from a distribution with a long right tail. It is not a redundancy: if it is never realized as profit, the estimate of expected costs was too high, and the provision should be re-examined.
- $Q_T$ is a **regulated** number. It is one of the most scrutinized components of a filing, and the actuary must be able to show how investment income and the cost of capital were reflected — which is why the derivation, not just the selection, belongs in the documentation.

![[Media/Figures/Profit_and_Contingency_Provision.svg|340]]

> [!example]- The Provision in the Rate {Example}
> A line has a projected pure premium of $\$250$, fixed expenses of $\$0$, variable expenses of $30\%$ and a target underwriting profit provision of $5\%$.
>
> Compute the rate and verify the profit margin.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Rate} &= \frac{\$250}{1 - 0.30 - 0.05} \\
> > &= \frac{\$250}{0.65} \\
> > &= \$384.62
> > \end{align*}$$
> >
> > Decomposing:
> >
> > $$\begin{align*}
> > \text{Losses} &= \$250.00 \quad (65.0\%) \\
> > \text{Variable expenses} &= 0.30 \times \$384.62 = \$115.39 \quad (30.0\%) \\
> > \text{Profit} &= 0.05 \times \$384.62 = \$19.23 \quad (5.0\%)
> > \end{align*}$$
> >
> > The target combined ratio is $95\%$: the insurer expects to spend $\$0.95$ of every premium dollar and keep $\$0.05$ as underwriting profit, before any investment income.

> [!example]- Deriving the Provision from a Target Return {Example}
> An insurer targets a $12\%$ after-tax return on equity. It writes at a premium-to-surplus ratio of $2:1$. Reserves and unearned premium average $70\%$ of annual premium and earn $4\%$ after tax; surplus also earns $4\%$ after tax. The tax rate on underwriting profit is $21\%$.
>
> Derive the indicated underwriting profit provision.
>
> > [!answer]-
> > Work per $\$1$ of premium. Surplus is $\$0.50$ (from the $2:1$ ratio).
> >
> > **Required after-tax income:**
> >
> > $$0.12 \times \$0.50 = \$0.060$$
> >
> > **Investment income already available (after tax):**
> >
> > $$\begin{align*}
> > \text{On policyholder funds} &= 0.70 \times 0.04 = \$0.028 \\
> > \text{On surplus} &= 0.50 \times 0.04 = \$0.020 \\[4pt]
> > \text{Total} &= \$0.048
> > \end{align*}$$
> >
> > **Shortfall to be earned from underwriting, after tax:**
> >
> > $$\$0.060 - \$0.048 = \$0.012$$
> >
> > **Grossing up for tax:**
> >
> > $$Q_T = \frac{\$0.012}{1 - 0.21} = \$0.0152 \approx 1.5\%$$
> >
> > The indicated provision is about $1.5\%$ of premium, far below a typical $5\%$ — because this line's float and surplus are already producing most of the required return.
> >
> > Change one assumption and the answer moves sharply: at a $1:1$ premium-to-surplus ratio the required income doubles while the investment income rises less, pushing $Q_T$ up. This sensitivity to the capital allocation is why the profit provision is contested in filings and why the derivation must be shown rather than asserted.
