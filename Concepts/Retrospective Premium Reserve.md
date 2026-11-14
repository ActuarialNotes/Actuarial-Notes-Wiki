---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:c114128b5c8e2dbc85c9364740937eb02e2fbdef0a42fe39c7baf8064321b92b
  sources:
    - "Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996, pp.611-647), PDF pp.1-13 (definition, EBNR, retro reserve, formulas 2.1-2.4, empirical lags, CPDLD), 17 (incremental capping ratio, eq. 5.2), 18 (collectibility), sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf"
    - "Feldblum, Discussion of Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXV, 1998, pp.274-315), PDF pp.1-2, 21-24, sha256:1c572191d2239553f306dc29ba1186f3c3477e06b1652562ab55acd4c8bc04ed — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins_Discussion_of_Paper.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retrospective Premium Reserve.md
---
A **Retrospective Premium Reserve** is the provision for premium adjustments still to come on [[Retrospective Rating|retrospectively rated]] policies. It is the expected ultimate retrospective premium, given the losses still to emerge, less the premium already booked. When positive it is an asset, the **premium asset** (earned but not reported premium, shown as accrued retrospective premiums). When negative it is a liability for return premium. The premium asset is

> $$\text{Premium asset} = \text{Expected ultimate premium} - \text{Premium booked}$$

The "retro reserve" of the older literature (Berry, Fitzgibbon) is the same quantity with the opposite sign, the premium deviation to date less the ultimate premium deviation ([[Estimating the Premium Asset on Retrospectively Rated Policies (Teng and Perkins - 1996)|Teng and Perkins]]).

## PDLD ratios

**Teng and Perkins** estimate how premium develops *as losses develop*. The retro premium at adjustment $n$ is

> $$P_n = (\text{BP} + CL_n \times \text{LCF}) \times \text{TM}$$

- $\text{BP}$ is the basic premium.
- $CL_n$ is the capped losses at adjustment $n$.
- $\text{LCF}$ is the loss conversion factor and $\text{TM}$ the tax multiplier.

The ratio of premium development to loss development, the **PDLD** ratio, at the first adjustment is

> $$\text{PDLD}_1 = \frac{\text{BPF} \times \text{TM}}{\text{ELR} \times \%L_1} + \frac{CL_1}{L_1}\,\text{LCF} \times \text{TM}$$

- BPF is the basic premium factor, the basic premium divided by standard premium.
- ELR is the expected loss ratio to standard premium.
- $L_n$ is the losses emerged by adjustment $n$, and $\%L_1$ the share of losses emerged at the first adjustment.
- $CL/L$ is the **loss capping ratio**, the share of loss development that the per-accident limit and the retro maximum and minimum let through.

The basic premium is collected only once, so at a later adjustment the PDLD ratio is

> $$\text{PDLD}_n = \frac{CL_n - CL_{n-1}}{L_n - L_{n-1}}\,\text{LCF} \times \text{TM}$$

$\text{PDLD}_1$ is usually above 1. The whole basic premium is collected at the first adjustment and few losses are capped yet. Later PDLDs fall well **below 1** as more of each new dollar of loss lands above a cap.

The cumulative ratio $\text{CPDLD}_k$ averages the PDLDs from adjustment $k$ onward, weighted by the expected loss emerging in each. It is the premium expected per dollar of loss still to emerge. The cumulative ratio is

> $$\text{CPDLD}_k = \frac{\sum_{j \ge k} \text{PDLD}_j\, \Delta\%L_j}{\sum_{j \ge k} \Delta\%L_j}$$

- $\Delta\%L_j$ is the share of ultimate loss that emerges between adjustments $j-1$ and $j$.

Loss that emerges after the last retro adjustment brings in no premium, so its PDLD is zero. It stays in the denominator's loss emergence but adds nothing to the numerator, which pulls every CPDLD down.

> [!example]- What are the PDLD and CPDLD ratios of this book of retro plans? {Example}
> A book of retro plans has BPF $0.25$, TM $1.04$, LCF $1.10$ and ELR $0.65$. Losses emerge $80\%$ by the first adjustment, a further $12\%$ by the second and a further $8\%$ by the third (the last). The incremental loss capping ratios are $0.90$, $0.60$ and $0.40$.
>
> > [!answer]-
> > - $\text{PDLD}_1 = \frac{0.25(1.04)}{0.65(0.80)} + 0.90(1.10)(1.04) = 0.5000 + 1.0296 = 1.5296$.
> > - $\text{PDLD}_2 = 0.60(1.10)(1.04) = 0.6864$.
> > - $\text{PDLD}_3 = 0.40(1.10)(1.04) = 0.4576$.
> > - $\text{CPDLD}_1 = 1.5296(0.80) + 0.6864(0.12) + 0.4576(0.08) = 1.3427$, since the shares sum to 1.
> > - $\text{CPDLD}_2 = \frac{0.6864(0.12) + 0.4576(0.08)}{0.20} = 0.5949$.
> > - $\text{CPDLD}_3 = 0.4576$.
> > - Before the first adjustment each dollar of expected loss brings $\$1.34$ of premium. After it, each further dollar brings only $\$0.59$, because the basic premium has been collected and caps increasingly bind.

## Projecting the premium asset

The expected ultimate premium of a policy period is

> $$\text{Ult. premium} = P_{\text{last adj.}} + \text{CPDLD}_k \times \text{Future loss emergence}$$

- $P_{\text{last adj.}}$ is the premium booked at the period's last retro adjustment, zero before the first.
- $k$ is the next adjustment the period will undergo.
- The future loss emergence is the expected loss still to emerge.

Future loss emergence should come from the same analysis that sets IBNR, so a reserve increase raises the premium asset consistently. The asset is collected from insureds after the fact, so collectability and collateral matter. The [[Premium Reserve|premium reserve]] covers the other premium-sensitive reserves.

> [!example]- What is the premium asset on these two policy years? {Example}
> The CPDLDs are those of the example above.
>
> - Policy year A has had no retro adjustment. Its expected losses through all adjustments are $\$10.0$M, and $\$12.0$M of standard premium has been booked.
> - Policy year B has had its first adjustment, which produced $\$11.5$M of premium. Losses still expected to emerge are $\$1.8$M, and booked premium is now $\$11.6$M.
>
> > [!answer]-
> > - Year A's ultimate premium is $1.3427 \times 10.0 = 13.43$, so its asset is $13.43 - 12.00 = 1.43$.
> > - Year B's ultimate premium is $11.50 + 0.5949 \times 1.8 = 12.57$, so its asset is $12.57 - 11.60 = 0.97$.
> > - The total premium asset is $\$2.40$M.
> > - Note how year B uses booked premium from its *last adjustment* as the base and applies only the later, smaller CPDLD to the losses still to come. Had the actuary applied $1.34$ to B's remaining $\$1.8$M, the asset would be overstated by $\$1.3$M.

## Formula and empirical PDLD ratios

PDLDs can come from the plan parameters sold, which respond to changes in plan design, or from history, dividing booked premium by reported loss. Premium is booked with a lag. In Teng and Perkins' example, premium at 27 months reflects losses valued at 18 months, the first adjustment. Capping ratios are estimated with Table M charges and a loss elimination ratio for the per-accident limit.

> [!trap] Assuming premium moves one-for-one with loss
> Assuming premium tracks losses one-for-one overstates the asset. After the first adjustment, each further dollar of loss brings $\$0.59$ of premium in the example above, not $\$1$.
