---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:f7d786b5f9d84098f1d36fab155382c337ad2d5fa0dc72f581e0df3aee0648a6
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §2-9, Ch.3 §1.2-3.1, Ch.4 §1, PDF pp.22-32, 58, 62, 66, 100, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 retrospective rating, PDF p.319, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Sensitive Rating.md
---

**Loss Sensitive Rating** covers any plan under which what the insured ultimately pays — premium, or premium plus retained losses — depends on its own losses during the policy period. [[Retrospective Rating|Retrospective rating]] is the classic form. [[Large Deductible Policy|Large deductibles]], [[Self-Insured Retention|self-insured retentions]] and loss-sensitive dividend plans are the others.

> $$L = \min\left(\max(A,\ r_H E),\ r_G E\right)$$

> $$\mathrm{E}[L] = E\left(1 - \phi(r_G) + \psi(r_H)\right)$$

> $$B = e - (c - 1)E + cI$$

- $A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ the **entry ratio**. $r_G$ and $r_H$ are the entry ratios at the maximum and minimum. The **Table M charge** $\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$ is the expected loss above $rE$ per unit of $E$, and the **savings** $\psi(r) = \mathrm{E}[\max(r - A/E,\,0)]$ is the expected shortfall below it. Always $\psi(r) = \phi(r) + r - 1$.
- **Retro premium** is $R = (B + cL)\,T$, with loss conversion factor $c$ (loads LAE) and tax multiplier $T = 1/(1 - \text{tax rate})$. Setting $\mathrm{E}[R]/T = e + E$ gives the basic premium $B$ above. Here $e$ is total expense before taxes, including LAE and profit, and $I = E[\phi(r_G) - \psi(r_H)]$ is the **net insurance charge**. Fisher et al. note that this *balanced* premium is no longer required or desirable for most plans, because the plans transfer less risk than guaranteed cost; the *expected losses* must still balance.
- **Per-occurrence limits.** A loss limit adds an excess-loss charge. The aggregate charge is then computed on *limited* losses (Table M$_D$), or both are combined in one charge (Table L). Table M is entered by risk size, because small risks have volatile entry ratios and therefore larger charges. The charges, savings and their overlap are drawn as areas in a [[Lee Diagram]]. The NCCI approximates the limited-loss charge with its [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]] procedure; see [[Table M]] and [[Table L]].
- **The other plans** (large deductibles are now more common than retro plans):
  - *Large deductible:* the insurer pays every claim and bills the deductible back. It must have a per-occurrence limit, may have an aggregate, and has no minimum. Reimbursements are not premium, so they escape premium tax.
  - *SIR:* the insured handles its own claims, and the insurer's limit sits above the retention.
  - *Dividend plans:* return money when losses are low but collect nothing when they are high, so they are unbalanced.
- **Against guaranteed cost.** Under a guaranteed-cost policy the premium is fixed up front and the insured does not share in its own risk, except perhaps through a small deductible: its cost is certain and its cash flow stable, but good loss experience is not reflected, and the insurer bears all of the variability. A loss-sensitive plan reflects good (and bad) experience immediately, without the lag and credibility-weighting of experience rating, at the price of uncertain costs. Because the insured retains a significant fraction of the risk, the fair premium for a retro plan with a high aggregate limit is lower than the guaranteed-cost premium for the same risk.
- **Consistency of assumptions.** The sum of the predicted primary, per-occurrence excess and aggregate excess losses should compare reasonably with the predicted total losses, for the various plans that might be written on various accounts; if it does not, the assumptions behind the excess estimates need investigating. Per-occurrence and aggregate charges developed independently (say, a company's own excess factors with a rating bureau's aggregate factors) can price the same plan differently depending on how it is described — a per-occurrence limit at or above the aggregate limit should not change the loss cost. A rating bureau's "pure premium" is sometimes loaded with non-loss items such as LAE and loss-based assessments, so it can be larger than a loss-only estimate. Unadjusted bureau excess factors multiplied by a loss estimate that excludes those items understate excess losses, sometimes substantially.
- **Analysing a plan** means looking at [[Credit Risk|credit risk]] on future premium or reimbursements (managed with collateral, loss development factors and holdbacks). The insured should keep the predictable working layer, and retentions should rise with trend. Cash flow differs between paid and incurred retros. The aggregate charge is highly sensitive to the loss pick.
- **Clash.** One occurrence that triggers retentions on several lines can be capped by a single combined retention; see [[Clash Cover]].

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
