---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:940562f642361912ca0e096f2fae59fa84882e6a4fd7bc8d2c46af8100b4c269
  sources:
    - "CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988), pp.2-4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.125, 138 (PDF pp.137, 150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.142-144 (PDF pp.154-156), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Profit and Contingency Provision.md
---

**Profit and Contingency Provision** ($Q_T$) is the loading in the rate that, together with net investment and other income, provides an appropriate total after-tax return — the CAS Statement of Principles' definition of the underwriting profit and contingency provisions. The two halves answer two different risks: a charge for **random** variation from expected costs belongs in the total return consistent with the cost of capital, and so in the underwriting profit provision; a charge for **systematic** variation of the estimated costs from the expected costs belongs in the contingency provision.

> $$\text{Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

> $$\text{Target Combined Ratio} = 1 - Q_T$$

- $Q_T$ is a **target underwriting** profit provision, not a target total profit. Total return also includes investment income on policyholder-supplied funds (the loss and unearned premium reserves) and on capital (whether to include the latter is disputed), so the actuary typically determines the underwriting profit needed to achieve the target total return after consideration of investment income.
- Consequently $Q_T$ is **line-dependent**. [[Long Tail Lines|Long-tail lines]] hold reserves for years and earn substantial investment income on them, so they can support a low or even negative underwriting provision and still return the target on equity; [[Short Tail Insurance|short-tail lines]] have little float and need a positive one.
- Standard derivations: the **target return on equity** approach solves for the $Q_T$ that produces the required return given a premium-to-surplus ratio and an investment yield; **discounted cash flow / internal rate of return** models value the whole policy cash flow; the **calendar-year investment income offset** approach credits investment income directly against the provision.
- The **contingency** element is the Statement of Principles' charge for *systematic* variation — the estimated costs differing from the expected costs. Random variation around expected costs, the long right tail of the loss distribution, is not what it covers: that risk is charged through the cost of capital in the underwriting profit provision.
- The Statement of Principles asks that the contribution of net investment and other income be considered, and that the material assumptions and actuarial judgments of a ratemaking be documented and available for disclosure — so how investment income and the cost of capital were reflected belongs in the documentation, not just the selected $Q_T$.

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
> > The indicated provision is about $1.5\%$ of premium — small, because this line's float and surplus are already producing most of the required return.
> >
> > Change one assumption and the answer moves sharply: at a $1:1$ premium-to-surplus ratio the required income doubles to $\$0.120$ while the investment income rises only to $\$0.068$, pushing $Q_T$ to $0.052/0.79 = 6.6\%$. That sensitivity to the capital assumption is why the assumptions behind the provision should be documented rather than asserted.
