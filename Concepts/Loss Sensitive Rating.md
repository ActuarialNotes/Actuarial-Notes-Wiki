---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:12bec7411f39a1b5fbf1e093e537b80d7201b13e8cc31fec120354764f2cb598
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Sensitive Rating.md
---

**Loss Sensitive Rating** covers any plan under which what the insured ultimately pays — premium, or premium plus retained losses — depends on its own losses during the policy period. [[Retrospective Rating|Retrospective rating]] is the classic form. [[Large Deductible Policy|Large deductibles]], [[Self-Insured Retention|self-insured retentions]] and loss-sensitive dividend plans are the others.

> $$L = \min\left(\max(A,\ r_H E),\ r_G E\right)$$

> $$E[L] = E\left[1 - \phi(r_G) + \psi(r_H)\right]$$

> $$B = e - (c - 1)E + cI$$

- $A$ is the actual aggregate (ratable) loss, $E$ its expected value, and $r = A/E$ the **entry ratio**. $r_G$ and $r_H$ are the entry ratios at the maximum and minimum. The **Table M charge** $\phi(r) = E[\max(A/E - r,\,0)]$ is the expected loss above $rE$ per unit of $E$, and the **savings** $\psi(r) = E[\max(r - A/E,\,0)]$ is the expected shortfall below it. Always $\psi(r) = \phi(r) + r - 1$.
- **Retro premium** is $R = (B + cL)\,T$, with loss conversion factor $c$ (loads LAE) and tax multiplier $T = 1/(1 - \text{tax rate})$. Setting $E[R]/T = e + E$ gives the basic premium $B$ above. Here $e$ is total expense before taxes, including LAE and profit, and $I = E[\phi(r_G) - \psi(r_H)]$ is the **net insurance charge**. Fisher et al. note that this *balanced* premium is no longer required or desirable for most plans, because the plans transfer less risk than guaranteed cost; the *expected losses* must still balance.
- **Per-occurrence limits.** A loss limit adds an excess-loss charge. The aggregate charge is then computed on *limited* losses (Table M$_D$), or both are combined in one charge (Table L). Table M is entered by risk size, because small risks have volatile entry ratios and therefore larger charges.
- **The other plans** (large deductibles are now more common than retro plans):
  - *Large deductible:* the insurer pays every claim and bills the deductible back. It must have a per-occurrence limit, may have an aggregate, and has no minimum. Reimbursements are not premium, so they escape premium tax.
  - *SIR:* the insured handles its own claims, and the insurer's limit sits above the retention.
  - *Dividend plans:* return money when losses are low but collect nothing when they are high, so they are unbalanced.
- **Analysing a plan** means looking at [[Credit Risk|credit risk]] on future premium or reimbursements (managed with collateral, loss development factors and holdbacks). The insured should keep the predictable working layer, and retentions should rise with trend. Cash flow differs between paid and incurred retros. The aggregate charge is highly sensitive to the loss pick.

> [!example]- Table M Charges from Aggregate Outcomes {Example}
> Five similar accounts, equally likely, finish at entry ratios $0.4$, $0.7$, $0.9$, $1.2$ and $1.8$. Compute $\phi(1.5)$ and $\psi(0.6)$, and verify the charge–savings identity at $r = 0.6$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \phi(1.5) &= \frac{0 + 0 + 0 + 0 + 0.3}{5} \\
> > &= 0.06 \\[4pt]
> > \psi(0.6) &= \frac{0.2 + 0 + 0 + 0 + 0}{5} \\
> > &= 0.04 \\[4pt]
> > \phi(0.6) &= \frac{0 + 0.1 + 0.3 + 0.6 + 1.2}{5} \\
> > &= 0.44
> > \end{align*}
> > $$
> >
> > Check: $\phi(0.6) + 0.6 - 1 = 0.04 = \psi(0.6)$. A maximum at $1.5E$ transfers $6\%$ of expected loss to the insurer, and a minimum at $0.6E$ hands $4\%$ back. The net insurance charge is $2\%$ of $E$.

> [!example]- Pricing a Balanced Retro Plan {Example}
> Using those charges, let $E = \$600{,}000$, $e = \$250{,}000$, $c = 1.10$, $T = 1.03$, with the maximum and minimum at entry ratios $1.5$ and $0.6$. Find $B$, the maximum and minimum premiums, and confirm the plan balances.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > I &= 600{,}000 \times (0.06 - 0.04) \\
> > &= 12{,}000 \\[4pt]
> > B &= 250{,}000 - 0.10(600{,}000) + 1.10(12{,}000) \\
> > &= \$203{,}200 \\[4pt]
> > G &= \left[203{,}200 + 1.10(900{,}000)\right] \times 1.03 \\
> > &= \$1{,}228{,}996 \\[4pt]
> > H &= \left[203{,}200 + 1.10(360{,}000)\right] \times 1.03 \\
> > &= \$617{,}176
> > \end{align*}
> > $$
> >
> > The five outcomes produce retro premiums of $\$617{,}176$, $\$685{,}156$, $\$821{,}116$, $\$1{,}025{,}056$ and $\$1{,}228{,}996$. Their average is $\$875{,}500 = (250{,}000 + 600{,}000) \times 1.03$ — exactly the guaranteed-cost premium. The good year is floored and the bad one capped. The $\$13{,}200$ loaded into $B$ is what pays for that asymmetry.
