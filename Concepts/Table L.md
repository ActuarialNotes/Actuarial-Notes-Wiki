---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ed37ed0ce682d1df0cab9e114a0090b3926f74f290ce67eb6ff97b7cfcf8caa5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Table L.md
---

**Table L** prices a per-occurrence limit and an aggregate limit together, in one factor. The **Table L charge** $\phi^*_D(r)$ is the expected loss removed from the insured's ratable or deductible losses by a per-occurrence limit $D$ plus an aggregate limit at $r$ times the expected *unlimited* loss $E$, as a ratio to $E$. The alternative, **Table $M_D$**, charges only the aggregate excess of the limited losses and leaves the per-occurrence excess to a separate charge ([[Insurance Charge]], [[Large Deductible Policy]]).

> $$k = \frac{E - E\{A_D\}}{E}$$

> $$\phi^*_D(r) = \int_r^{\infty} (y - r)\,dF_D(y) + k$$

> $$\psi^*_D(r) = \int_0^{r} (r - y)\,dF_D(y)$$

> $$\psi^*_D(r) = \phi^*_D(r) + r - 1$$

- $A_D$ is the actual aggregate loss with each occurrence limited to $D$, $k$ the per-occurrence excess ratio, and $F_D$ the distribution of $y = A_D/E$ — limited loss over expected **unlimited** loss, so the entry ratio is (aggregate limit)/$E$. The integral is the aggregate excess of the limited losses and $k$ is the per-occurrence excess. With no per-occurrence limit, $k = 0$ and $F_D = F$, so Table L becomes Table M.
- **Table $M_D$** is an ordinary Table M built from limited losses. Its entry ratio is $A_D/E\{A_D\}$ and its charge $\phi_D$ is a ratio to expected *limited* loss, so the loss cost is $kE + \phi_D(r_D)\,E\{A_D\}$. Each occurrence must be limited before a policy's losses are aggregated. A lower limit leaves less variance in the limited aggregate, which usually means lower charges above an entry ratio of $1$. Built from the same data, the two tables give the same total loss cost.
- **Why the charges cannot simply be added.** The per-occurrence limit is applied first, so dollars above $D$ belong to the per-occurrence charge. An *unlimited* Table M charge also counts the large claims that push a risk over its aggregate, so adding it to $kE$ double-counts the overlap. The combined charge is generally less than the sum of the two stand-alone charges.
- **On a Lee diagram**, the upper curve is $F$ and the lower curve $F_D$, and the area between them is $k$. Above the aggregate line, the area under $F_D$ is the aggregate excess of the limited losses. Together these make $\phi^*_D(r)$, while the unlimited Table M charge is the area under $F$ above the same line ([[Lee Diagram]]).
- **ICRLL** (Insurance Charge Reflecting Loss Limitation, used by NCCI until 2019) approximates Table $M_D$ from an unlimited Table M. It selects the expected loss group from $E$ times the state/hazard group relativity times the loss group adjustment factor $(1 + 0.8k)/(1 - k)$, enters the table at (aggregate limit)/$E\{A_D\}$, and multiplies the charge by $E\{A_D\}$. The factor exceeds $1$ whenever $k > 0$: limited losses vary less, so the risk is treated as a larger one.

> [!example]- Building a Table L and Comparing It with Table M_D {Example}
> Eight similar risks have a \$100,000 per-occurrence limit. Their annual aggregate losses (\$000):
>
> | Risk | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
> |---|---|---|---|---|---|---|---|---|
> | Unlimited | 120 | 200 | 240 | 280 | 320 | 400 | 520 | 1,120 |
> | Limited | 120 | 200 | 240 | 280 | 320 | 360 | 440 | 600 |
>
> A policy adds an aggregate limit of \$480,000 on the limited losses.
>
> 1. Find $k$ and the Table L charge and savings at the aggregate limit, by horizontal slicing.
> 2. Price the same policy with Table $M_D$.
> 3. An analyst instead adds the unlimited Table M charge at \$480,000 to $kE$. What does that give, and why is it wrong?
>
> > [!answer]-
> > **1.** The averages are $E = 3{,}200/8 = 400$ and $E\{A_D\} = 2{,}560/8 = 320$, so $k = (400 - 320)/400 = 0.20$. Divide the limited losses by $400$: $y = 0.30, 0.50, 0.60, 0.70, 0.80, 0.90, 1.10, 1.50$. Slice from the bottom row up:
> >
> > | $r$ | risks over $r$ | % over $r$ | gap | $\phi^*_D - k$ | $\phi^*_D$ |
> > |---|---|---|---|---|---|
> > | 0 | 8 | 100% | 0.3 | 0.8000 | 1.0000 |
> > | 0.3 | 7 | 87.5% | 0.2 | 0.5000 | 0.7000 |
> > | 0.5 | 6 | 75% | 0.1 | 0.3250 | 0.5250 |
> > | 0.6 | 5 | 62.5% | 0.1 | 0.2500 | 0.4500 |
> > | 0.7 | 4 | 50% | 0.1 | 0.1875 | 0.3875 |
> > | 0.8 | 3 | 37.5% | 0.1 | 0.1375 | 0.3375 |
> > | 0.9 | 2 | 25% | 0.2 | 0.1000 | 0.3000 |
> > | 1.1 | 1 | 12.5% | 0.4 | 0.0500 | 0.2500 |
> > | 1.5 | 0 | 0% | — | 0 | 0.2000 |
> >
> > The aggregate limit is at $r = 480/400 = 1.2$, inside the slice from $1.1$ to $1.5$:
> >
> > $$
> > \begin{align*}
> > \phi^*_D(1.2) &= 0.20 + [0.05 - 0.125(0.1)] \\
> > &= 0.2375 \\[4pt]
> > \psi^*_D(1.2) &= 0.2375 + 1.2 - 1 \\
> > &= 0.4375
> > \end{align*}
> > $$
> >
> > The insurer's expected loss is $0.2375 \times \$400{,}000 = \$95{,}000$ per policy.
> >
> > **2.** On Table $M_D$ the entry ratio is $480/320 = 1.5$. Only risk 8, at $600/320 = 1.875$, exceeds it:
> >
> > $$
> > \begin{align*}
> > \phi_D(1.5) &= \frac{1.875 - 1.5}{8} \\
> > &= 0.046875 \\[4pt]
> > \text{Loss cost} &= 0.20(400{,}000) + 0.046875(320{,}000) \\
> > &= 80{,}000 + 15{,}000 \\
> > &= \$95{,}000
> > \end{align*}
> > $$
> >
> > **3.** On unlimited losses the entry ratio is again $1.2$, and risks 7 and 8 exceed $480$ by $40$ and $640$:
> >
> > $$
> > \begin{align*}
> > \phi(1.2) &= \frac{40 + 640}{8 \times 400} \\
> > &= 0.2125 \\[4pt]
> > \text{Sum} &= 80{,}000 + 0.2125(400{,}000) \\
> > &= \$165{,}000
> > \end{align*}
> > $$
> >
> > That is $\$70{,}000$ too much. Risk 7's $40$ above the aggregate is all per-occurrence excess, since its limited loss is only $440$. Of risk 8's $640$, $520$ is per-occurrence excess and only $120$ is aggregate excess of limited loss. The $560$ counted twice, spread over $8$ risks, is exactly $\$70{,}000$. Table L and Table $M_D$ both avoid the overlap by working from the limited losses.

> [!example]- Approximating Table M_D with ICRLL {Example}
> A workers compensation large deductible policy has expected unlimited losses of $\$800{,}000$, a $\$200{,}000$ per-occurrence deductible with excess ratio $k = 0.25$, and an aggregate deductible limit of $\$900{,}000$. The state/hazard group relativity is $1.05$. Given these excerpts from an unlimited Table M:
>
> | Expected loss group | 30 | 29 | 28 | 27 |
> |---|---|---|---|---|
> | Expected losses (\$000) | 720–830 | 830–990 | 990–1,180 | 1,180–1,415 |
> | Charge at $r = 1.5$ | 0.172 | 0.162 | 0.151 | 0.140 |
>
> Use the ICRLL procedure to find the charge for the aggregate limit and the total expected loss cost. Explain the effect of the loss group adjustment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E\{A_D\} &= (1 - 0.25)(800{,}000) \\
> > &= 600{,}000 \\[4pt]
> > r &= \frac{900{,}000}{600{,}000} \\
> > &= 1.5 \\[4pt]
> > \text{Adjustment} &= \frac{1 + 0.8(0.25)}{1 - 0.25} \\
> > &= 1.60 \\[4pt]
> > \text{Group selector} &= 800{,}000(1.05)(1.60) \\
> > &= 1{,}344{,}000
> > \end{align*}
> > $$
> >
> > $\$1{,}344{,}000$ falls in expected loss group 27, so the charge is $0.140$:
> >
> > $$
> > \begin{align*}
> > \text{Aggregate charge} &= 0.140(600{,}000) \\
> > &= \$84{,}000 \\[4pt]
> > \text{Total loss cost} &= 0.25(800{,}000) + 84{,}000 \\
> > &= \$284{,}000
> > \end{align*}
> > $$
> >
> > Without the adjustment the selector would be $800{,}000 \times 1.05 = \$840{,}000$, in group 29, and the charge $0.162 \times 600{,}000 = \$97{,}200$. The deductible strips out the large claims, so the limited aggregate varies like that of a much larger risk. The factor $(1 + 0.8k)/(1 - k)$ moves the policy to a larger group, with lower charges above $r = 1$, to reflect that.
