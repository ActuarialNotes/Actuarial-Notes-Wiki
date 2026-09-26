---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1f47c5feec203bfaac18f4d9552431263dc4ee7aa76889bc5cc9dcc3f5f30b54
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Capital.md
---

**Risk Capital** is the capital an insurer holds to absorb unexpected losses — outcomes worse than those funded by premium and reserves — sized by a [[Risk Measure]] at a chosen tolerance. Merton and Perold define it as the smallest amount that, invested, would insure the value of the firm's net assets against a loss relative to a risk-free investment of those assets; allocating its [[Cost of Capital|cost]] to [[Business Unit|business units]] and [[Line of Business|lines]] is the core calculation of [[Financial Risk Management]].

> $$C = \rho(X) - E[X]$$

> $$\sum_i C_i = C \leq \sum_i C_i^{\text{standalone}}$$

- $X$ is the insurer's aggregate loss, $\rho$ the risk measure — VaR or TVaR at a chosen level, or the assets needed to hold the expected policyholder deficit (EPD) to a target — and $C_i$ the capital allocated to unit $i$. The gap below the sum of standalone amounts is the **diversification benefit**; how to share it is the allocation problem.
- **Allocation methods:**
  - **Proportional** to standalone capital, or to a regulatory [[Risk-Based Capital]] formula — simple, but blind to how each unit diversifies the rest.
  - **CAPM** — a cost of capital per line from underwriting betas; prices systematic risk only.
  - **VaR or EPD by line** — size each line to the firm's ruin probability or EPD ratio as if it stood alone. The EPD version is better, since it reflects the size of shortfalls, but both ignore diversification.
  - **Merton–Perold marginal** — $C_i = C(\text{all}) - C(\text{all but } i)$. Correct for adding or dropping a whole line, but the pieces sum to *less* than $C$, leaving capital unallocated.
  - **Shapley** — each unit's marginal capital averaged over every order in which units could be added; adds up exactly.
  - **Myers–Read and Euler (gradient)** — each unit's contribution to the default value or risk measure for a *small* change in its size. For a measure that scales with the portfolio these add up exactly (Euler's theorem); for a standard-deviation measure they reduce to allocating by covariance with the total.
  - **Co-measures and margin allocation** — co-TVaR allocates by each unit's average loss in the tail; Mildenhall and Major allocate margin directly (the *natural allocation*) and let the implied capital follow.
- **Allocation is a device.** All capital stands behind every policy; the allocation exists to set [[Risk-Adjusted Pricing|prices]] and judge [[Risk-Adjusted Performance|performance]], and marginal methods that recognise diversification are the ones that support good decisions.

> [!example]- Four Allocations of the Same Capital {Example}
> Two lines have loss standard deviations $\sigma_A = 30$ and $\sigma_B = 50$ with correlation $0.5$. The insurer holds capital equal to twice the standard deviation of its total loss. Allocate total capital by (a) standalone proportions, (b) Merton–Perold, (c) Shapley, (d) covariance (Euler).
>
> > [!answer]-
> > Standalone capital: $C_A = 60$, $C_B = 100$, total $160$.
> >
> > $$
> > \begin{align*}
> > \sigma_{A+B}^2 &= 30^2 + 50^2 + 2(0.5)(30)(50) \\
> > &= 4{,}900 \\
> > C &= 2\sqrt{4{,}900} \\
> > &= 140
> > \end{align*}
> > $$
> >
> > so diversification saves $20$.
> >
> > - **(a) Proportional:** $A = 140 \times 60/160 = 52.5$; $B = 87.5$.
> > - **(b) Merton–Perold:** $A = 140 - 100 = 40$; $B = 140 - 60 = 80$. They sum to $120$, leaving $20$ unallocated.
> > - **(c) Shapley:** $A = \tfrac{1}{2}(60 + 40) = 50$; $B = \tfrac{1}{2}(100 + 80) = 90$.
> > - **(d) Covariance:** $\text{Cov}(A, A{+}B) = 900 + 750 = 1{,}650$ and $\text{Cov}(B, A{+}B) = 2{,}500 + 750 = 3{,}250$, so $A = 2(1{,}650)/70 = 47.14$ and $B = 2(3{,}250)/70 = 92.86$.
> >
> > Line A is charged anywhere from $40$ to $52.5$. Under every method that recognises diversification, the smaller line gets the larger *percentage* reduction from its standalone capital — $33\%$ against $20\%$ under Merton–Perold, $17\%$ against $10\%$ under Shapley, $21\%$ against $7\%$ by covariance — and that difference flows straight into its price and its measured return.

> [!example]- Capital from an EPD Target {Example}
> Aggregate losses are $50$ w.p. $0.50$, $100$ w.p. $0.30$, $200$ w.p. $0.15$ and $300$ w.p. $0.05$. The insurer targets an EPD ratio of $1\%$ of expected losses. Find the assets and risk capital required, and compare with $\text{VaR}_{0.95}$.
>
> > [!answer]-
> > $E[X] = 25 + 30 + 30 + 15 = 100$, so the target is $\text{EPD} = E[(X - a)_+] = 1$. For assets $a$ between $200$ and $300$ only the worst outcome falls short:
> >
> > $$
> > \begin{align*}
> > 0.05(300 - a) &= 1 \\
> > a &= 280
> > \end{align*}
> > $$
> >
> > Risk capital is $280 - 100 = 180$.
> >
> > $\text{VaR}_{0.95} = 200$ would suggest capital of only $100$ — but at $a = 200$ the EPD is $0.05 \times 100 = 5$, an EPD ratio of $5\%$. VaR sees only the probability of shortfall; the EPD also sees its size, which is why it is the better standard for capital.
