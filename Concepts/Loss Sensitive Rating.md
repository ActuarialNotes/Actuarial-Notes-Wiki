---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e3b004f06727dd1c16681e519c3b8d90b3dc6b758bdfdde642c03c1016aab7e9
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §2-9, Ch.3 §1.2-3.1, Ch.4 §1, PDF pp.22-32, 58, 62, 66, 100, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 retrospective rating, PDF p.319, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §1 PDF p.21, §6 PDF pp.29-30; Ch.3 §5.2 PDF p.89; Ch.4 §1 and Q1 PDF pp.100, 121; Ch.4 §3 PDF p.105, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Sensitive Rating.md
---

**Loss Sensitive Rating** is any plan under which what the insured ultimately pays, premium or premium plus retained losses, depends on its own losses during the policy period. [[Retrospective Rating|Retrospective rating]] is the classic form. [[Large Deductible Policy|Large deductibles]], [[Self-Insured Retention|self-insured retentions]] and loss-sensitive dividend plans are the others.

Under a retrospective rating plan, the retro premium is

> $$R = (B + cL)\,T$$

- $B$ is the basic premium.
- $c$ is the loss conversion factor, which loads LAE.
- $L$ is the ratable loss, the actual loss held between the losses at the minimum and the maximum.
- $T = 1/(1 - \text{tax rate})$ is the tax multiplier.

The ratable loss is

> $$L = \min\left(\max(A,\ r_H E),\ r_G E\right)$$

- $A$ is the actual aggregate (ratable) loss, $E = \mathrm{E}[A]$ its expected value, and $r = A/E$ the **entry ratio**.
- $r_G$ and $r_H$ are the entry ratios at the maximum and minimum.

## Insurance charge and savings

The **Table M charge** at entry ratio $r$, the expected loss above $rE$ per unit of $E$, is

> $$\phi(r) = \mathrm{E}[\max(A/E - r,\,0)]$$

The **savings** at $r$, the expected shortfall below $rE$ per unit of $E$, is

> $$\psi(r) = \mathrm{E}[\max(r - A/E,\,0)]$$

The savings in terms of the charge is always

> $$\psi(r) = \phi(r) + r - 1$$

The charges, savings and their overlap are drawn as areas in a [[Lee Diagram|Lee diagram]]. [[Table M]] is entered by risk size, because small risks have volatile entry ratios and therefore larger charges.

> [!example]- Five similar accounts finish at entry ratios $0.4$, $0.7$, $0.9$, $1.2$ and $1.8$. What are $\phi(1.5)$ and $\psi(0.6)$? {Example}
> - Each account is equally likely, so each charge or saving is an average over the five.
> - Only the $1.8$ account exceeds $1.5$, so $\phi(1.5) = 0.3/5 = 0.06$.
> - Only the $0.4$ account falls short of $0.6$, so $\psi(0.6) = 0.2/5 = 0.04$.
> - As a check, $\phi(0.6) = (0 + 0.1 + 0.3 + 0.6 + 1.2)/5 = 0.44$, and $0.44 + 0.6 - 1 = 0.04 = \psi(0.6)$.
> - A maximum at $1.5E$ transfers $6\%$ of expected loss to the insurer, and a minimum at $0.6E$ hands $4\%$ back. The net insurance charge is $2\%$ of $E$.

## Basic premium

With the loss capped and floored, the expected ratable loss is

> $$\mathrm{E}[L] = E\left(1 - \phi(r_G) + \psi(r_H)\right)$$

Setting $\mathrm{E}[R]/T = e + E$ gives the basic premium

> $$B = e - (c - 1)E + cI$$

- $e$ is total expense before taxes, including LAE and profit.
- $I = E[\phi(r_G) - \psi(r_H)]$ is the **net insurance charge**.

Fisher et al. note that this balanced premium is no longer required or desirable for most plans, because the plans transfer less risk than guaranteed cost. The expected losses must still balance.

> [!example]- What are the basic, maximum and minimum premiums for this retro plan, and does it balance? {Example}
> The five accounts above have $E = \$600{,}000$, $e = \$250{,}000$, $c = 1.10$ and $T = 1.03$, with the maximum and minimum at entry ratios $1.5$ and $0.6$.
>
> > [!answer]-
> > - The net insurance charge is $I = 600{,}000 \times (0.06 - 0.04) = 12{,}000$.
> > - The basic premium is $B = 250{,}000 - 0.10(600{,}000) + 1.10(12{,}000) = \$203{,}200$.
> > - The maximum premium is $[203{,}200 + 1.10(900{,}000)] \times 1.03 = \$1{,}228{,}996$.
> > - The minimum premium is $[203{,}200 + 1.10(360{,}000)] \times 1.03 = \$617{,}176$.
> > - The five outcomes produce retro premiums of $\$617{,}176$, $\$685{,}156$, $\$821{,}116$, $\$1{,}025{,}056$ and $\$1{,}228{,}996$.
> > - Their average is $\$875{,}500 = (250{,}000 + 600{,}000) \times 1.03$, exactly the guaranteed-cost premium, so the plan balances.
> > - The good year is floored and the bad one capped. The $\$13{,}200$ loaded into $B$ pays for that asymmetry.

## Per-occurrence limits

A loss limit adds an excess-loss charge. The aggregate charge is then computed on *limited* losses (Table M$_D$), or both are combined in one charge ([[Table L]]). Until 2019, when it published only an unlimited Table M, the NCCI approximated the limited-loss charge with its [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]] procedure.

## Other loss-sensitive plans

Large deductibles are now more common than retro plans.

| Plan | How it works |
| :--- | :--- |
| Large deductible | The insurer pays every claim and bills the deductible back. It must have a per-occurrence limit, may have an aggregate, and has no minimum. Reimbursements are not premium, so they escape premium tax. |
| Self-insured retention (SIR) | The insured handles its own claims, and the insurer's limit sits above the retention. |
| Dividend plan | Returns money when losses are low but collects nothing when they are high, so it is unbalanced. |

## Loss-sensitive rating and guaranteed cost

Under a guaranteed-cost policy the premium is fixed up front, and the insured does not share in its own risk, except perhaps through a small deductible. Its cost is certain and its cash flow stable, but good loss experience is not reflected, and the insurer bears all of the variability. A loss-sensitive plan reflects good and bad experience immediately, without the lag and credibility-weighting of [[Experience Rating|experience rating]], at the price of uncertain costs. Because the insured retains a significant fraction of the risk, the fair premium for a retro plan with a high aggregate limit is lower than the guaranteed-cost premium for the same risk.

## Analysing a plan

Analysing a plan means looking at [[Credit Risk|credit risk]] on future premium or reimbursements, which is managed with collateral, loss development factors and holdbacks. The insured should keep the predictable working layer, and retentions should rise with trend. Cash flow differs between paid and incurred retros. The aggregate charge is highly sensitive to the loss pick.

The sum of the predicted primary, per-occurrence excess and aggregate excess losses should compare reasonably with the predicted total losses, for the various plans that might be written on various accounts. If it does not, the assumptions behind the excess estimates need investigating. Per-occurrence and aggregate charges developed independently, such as a company's own excess factors with a rating bureau's aggregate factors, can price the same plan differently depending on how it is described. A per-occurrence limit at or above the aggregate limit should not change the loss cost. A rating bureau's "pure premium" is sometimes loaded with non-loss items such as LAE and loss-based assessments, so it can be larger than a loss-only estimate. Unadjusted bureau excess factors multiplied by a loss estimate that excludes those items understate excess losses, sometimes substantially.

One occurrence that triggers retentions on several lines can be capped by a single combined retention on the sum of retained losses from that occurrence, a *clash deductible* or *clash aggregate*. The reinsurance layer of the same name is [[Clash Cover|clash cover]].
