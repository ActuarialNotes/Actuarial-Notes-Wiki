---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:be8420fbda9427a4fb7ee7624b91b7e38d9e3063cfb1b470d6b91c0110e397a8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Charge.md
---

**Insurance Charge** is the expected aggregate loss above a maximum of $r$ times the expected loss $E$ — the losses an insurer pays because the insured's retained or ratable losses are capped. As a ratio to $E$ it is the **Table M charge** $\phi(r)$, where $r = A/E$ is the **entry ratio**; its mirror image is the **Table M savings** $\psi(r)$, the expected shortfall below $rE$, which a minimum generates ([[Retrospective Rating]], [[Loss Sensitive Rating]]).

> $$r = \frac{A}{E}$$

> $$\phi(r) = \int_r^{\infty} (y - r)\,dF(y)$$

> $$\psi(r) = \int_0^{r} (r - y)\,dF(y)$$

> $$\psi(r) = \phi(r) + r - 1$$

- $A$ is the risk's actual aggregate loss, $E = E\{A\}$ its expected loss, and $F$ the distribution of $Y = A/E$. The insurance charge in dollars is $\phi(r)E$ and the insurance savings $\psi(r)E$. $\phi$ is also called the aggregate excess loss factor or aggregate excess ratio, and $\psi$ the aggregate minimum loss factor; a collection of them by entry ratio and risk size is **Table M**.
- **Shape.** $\phi(0) = 1$ and $\phi$ falls toward $0$, with $\phi'(r) = -S(r)$; $\psi(0) = 0$ and $\psi$ rises without bound, with $\psi'(r) = F(r)$. The identity comes from splitting $r$ into the part of $E$ below $rE$, $1 - \phi(r)$, and the shortfall $\psi(r)$ — see [[Lee Diagram]].
- **In a retro plan** the ratable loss is held between $r_H E$ and $r_G E$, so $E\{L\} = E - I$ with **net insurance charge** $I = [\phi(r_G) - \psi(r_H)]E$. The balanced basic premium is $B = e - (c - 1)E + cI$. Given the maximum and minimum premiums $G$ and $H$, the balance equations $r_G - r_H = (G - H)/(cE)$ and $\phi(r_H) - \phi(r_G) = [(e + E) - H]/(cE)$ locate the entry ratios.
- **Constructing Table M.** Group similar risks, use the group's average loss as $E$ (so $\phi(0) = 1$), and divide each risk's loss by it. *Vertical slicing* averages $\max(r_i - r, 0)$ over the risks, one entry ratio at a time. *Horizontal slicing* works up from $\phi = 0$ at the largest entry ratio, adding (share of risks above $r$) $\times$ (gap to the next $r$) for each slice. The two agree when a slice starts at every observed entry ratio. Savings follow from the identity, and fitted frequency and severity distributions can replace the data.
- **Why it is entered by size.** The variance of the entry ratio is driven mostly by the expected number of claims. A large risk's entry ratios cluster near $1$, so its charges above $r = 1$ are small; a small risk's expected loss sits in rare large outcomes. Table M therefore has a column per expected loss group (or expected claim count group), and severity differences (hazard group, state) shift a risk's implied claim count. With a per-occurrence limit, the aggregate charge must come from limited losses — Table $M_D$ or [[Table L]] — or it overlaps the per-occurrence excess charge.

> [!example]- Building a Table M from Ten Risks {Example}
> Ten workers compensation risks in the same expected loss group had annual aggregate losses (\$000) of $80$, $160$, $240$, $320$, $320$, $360$, $400$, $480$, $640$ and $1{,}000$. Taking the group average as the expected loss:
>
> 1. Find $\phi(1.0)$ by vertical slicing.
> 2. Build the charges at every observed entry ratio by horizontal slicing, and read off $\phi(0.5)$, $\phi(1.5)$ and $\phi(2.0)$.
> 3. Find $\psi(0.5)$ and $\psi(1.5)$.
>
> > [!answer]-
> > The average loss is $4{,}000/10 = 400$, so the entry ratios are $0.2$, $0.4$, $0.6$, $0.8$, $0.8$, $0.9$, $1.0$, $1.2$, $1.6$ and $2.5$.
> >
> > **1. Vertical slicing** — only the three risks above $1.0$ contribute:
> >
> > $$
> > \begin{align*}
> > \phi(1.0) &= \frac{0.2 + 0.6 + 1.5}{10} \\
> > &= 0.23
> > \end{align*}
> > $$
> >
> > **2. Horizontal slicing** — start at $0$ in the bottom row; each row adds (% of risks over $r$) $\times$ (gap to the next row) to the row below:
> >
> > | $r$ | risks over $r$ | % over $r$ | gap | $\phi(r)$ |
> > |---|---|---|---|---|
> > | 0 | 10 | 100% | 0.2 | 1.00 |
> > | 0.2 | 9 | 90% | 0.2 | 0.80 |
> > | 0.4 | 8 | 80% | 0.2 | 0.62 |
> > | 0.6 | 7 | 70% | 0.2 | 0.46 |
> > | 0.8 | 5 | 50% | 0.1 | 0.32 |
> > | 0.9 | 4 | 40% | 0.1 | 0.27 |
> > | 1.0 | 3 | 30% | 0.2 | 0.23 |
> > | 1.2 | 2 | 20% | 0.4 | 0.17 |
> > | 1.6 | 1 | 10% | 0.9 | 0.09 |
> > | 2.5 | 0 | 0% | — | 0 |
> >
> > The same risks lie above every level within a slice, so $\phi$ is linear between rows:
> >
> > $$
> > \begin{align*}
> > \phi(0.5) &= 0.62 - 0.80(0.1) \\
> > &= 0.54 \\[4pt]
> > \phi(1.5) &= 0.17 - 0.20(0.3) \\
> > &= 0.11 \\[4pt]
> > \phi(2.0) &= 0.09 - 0.10(0.4) \\
> > &= 0.05
> > \end{align*}
> > $$
> >
> > **3. Savings** from $\psi(r) = \phi(r) + r - 1$:
> >
> > $$
> > \begin{align*}
> > \psi(0.5) &= 0.54 + 0.5 - 1 \\
> > &= 0.04 \\[4pt]
> > \psi(1.5) &= 0.11 + 1.5 - 1 \\
> > &= 0.61
> > \end{align*}
> > $$
> >
> > Check $\psi(0.5)$ directly: only the risks at $0.2$ and $0.4$ fall short of $0.5$, by $0.3$ and $0.1$, so $\psi(0.5) = 0.4/10 = 0.04$. A maximum at $1.5E$ transfers $11\%$ of expected loss to the insurer, and a minimum at $0.5E$ hands $4\%$ back.

> [!example]- Solving a Retro Plan from Its Maximum and Minimum Premiums {Example}
> A risk in that expected loss group has $E = \$400{,}000$, expenses $e = \$120{,}000$ and a loss conversion factor $c = 1.12$ (ignore taxes). The insured asks for a maximum premium $G = \$775{,}360$ and a minimum premium $H = \$327{,}360$. Excerpt of the Table M from the previous example:
>
> | $r$ | 0.4 | 0.5 | 0.6 | 1.4 | 1.5 | 1.6 |
> |---|---|---|---|---|---|---|
> | $\phi(r)$ | 0.62 | 0.54 | 0.46 | 0.13 | 0.11 | 0.09 |
>
> Find the entry ratios at the maximum and minimum, the net insurance charge and the basic premium.
>
> > [!answer]-
> > The two balance equations:
> >
> > $$
> > \begin{align*}
> > r_G - r_H &= \frac{G - H}{cE} \\
> > &= \frac{448{,}000}{1.12(400{,}000)} \\
> > &= 1.00 \\[6pt]
> > \phi(r_H) - \phi(r_G) &= \frac{(e + E) - H}{cE} \\
> > &= \frac{520{,}000 - 327{,}360}{448{,}000} \\
> > &= 0.43
> > \end{align*}
> > $$
> >
> > Try pairs one apart: $r_H = 0.4$ gives $0.62 - 0.13 = 0.49$; $r_H = 0.5$ gives $0.54 - 0.11 = 0.43$; $r_H = 0.6$ gives $0.46 - 0.09 = 0.37$. So $r_H = 0.5$ and $r_G = 1.5$: ratable losses run from $\$200{,}000$ to $\$600{,}000$.
> >
> > $$
> > \begin{align*}
> > \psi(0.5) &= 0.54 + 0.5 - 1 \\
> > &= 0.04 \\[4pt]
> > I &= (0.11 - 0.04)(400{,}000) \\
> > &= \$28{,}000 \\[4pt]
> > B &= e - (c - 1)E + cI \\
> > &= 120{,}000 - 0.12(400{,}000) + 1.12(28{,}000) \\
> > &= \$103{,}360
> > \end{align*}
> > $$
> >
> > Check: $H = B + c\,r_H E = 103{,}360 + 1.12(200{,}000) = \$327{,}360$. The expected ratable loss is $E - I = \$372{,}000$, so the expected premium is $103{,}360 + 1.12(372{,}000) = \$520{,}000 = e + E$. The plan balances, and the $\$31{,}360$ of $cI$ in the basic premium is what the insured pays for the cap net of the floor.

> [!example]- Why Table M Is Entered by Size {Example}
> Two accounts buy an aggregate maximum at $1.1$ times expected loss.
>
> - **Large account:** $E = \$5{,}000{,}000$. Aggregate losses of $\$4.0$M, $\$4.5$M, $\$5.0$M, $\$5.5$M and $\$6.0$M are equally likely.
> - **Small account:** $E = \$200{,}000$. Aggregate losses are $\$0$ ($50\%$), $\$100{,}000$ ($20\%$), $\$300{,}000$ ($20\%$) or $\$1{,}200{,}000$ ($10\%$).
>
> Find $\phi(1.1)$ and the insurance charge for each. What goes wrong if the large account's factor is used for the small one?
>
> > [!answer]-
> > Large account: entry ratios $0.8$ to $1.2$, and only $1.2$ exceeds $1.1$. Small account: entry ratios $0$, $0.5$, $1.5$ and $6.0$.
> >
> > $$
> > \begin{align*}
> > \phi_{\text{large}}(1.1) &= 0.2(1.2 - 1.1) \\
> > &= 0.02 \\[4pt]
> > \text{Charge} &= 0.02(5{,}000{,}000) \\
> > &= \$100{,}000 \\[6pt]
> > \phi_{\text{small}}(1.1) &= 0.2(1.5 - 1.1) + 0.1(6.0 - 1.1) \\
> > &= 0.08 + 0.49 \\
> > &= 0.57 \\[4pt]
> > \text{Charge} &= 0.57(200{,}000) \\
> > &= \$114{,}000
> > \end{align*}
> > $$
> >
> > The large account's factor would charge the small account $0.02 \times \$200{,}000 = \$4{,}000$ — $\$110{,}000$ short. Both have entry ratios averaging $1$, but the small account's rest on whether a claim happens at all, so most of its expected loss lies in rare, very high outcomes. That variance comes mainly from the expected claim count, which is why Table M is laid out by expected loss (or claim count) group and a risk must enter the column for its own size.
