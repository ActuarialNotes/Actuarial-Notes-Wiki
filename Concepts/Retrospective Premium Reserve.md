---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aeb89c9c5a40650665a6c65a07717041274dcb6e756cf3d6d98830d2b5e4adb6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retrospective Premium Reserve.md
---

**The retrospective premium reserve** is the provision for premium adjustments still to come on [[Retrospective Rating|retrospectively rated]] policies: the expected ultimate retrospective premium, given the losses still to emerge, less the premium already booked. When positive it is an asset, the **premium asset** (earned but not reported premium, shown as accrued retrospective premiums). When negative it is a liability for return premium, the "retro reserve" of the older literature.

> $$\text{Premium asset} = \text{Expected ultimate premium} - \text{Premium booked}$$

> $$\text{Ult. premium} = P_{\text{last adj.}} + \text{CPDLD}_k \times \text{Future loss emergence}$$

- **Teng and Perkins** estimate how premium develops *as losses develop*. The retro formula at adjustment $n$ is $P_n = (\text{BP} + CL_n \times \text{LCF}) \times \text{TM}$, with capped losses $CL_n$. The ratio of premium development to loss development (**PDLD**) is then:

> $$\text{PDLD}_1 = \frac{\text{BPF} \times \text{TM}}{\text{ELR} \times \%L_1} + \frac{CL_1}{L_1}\,\text{LCF} \times \text{TM}$$

> $$\text{PDLD}_n = \frac{CL_n - CL_{n-1}}{L_n - L_{n-1}}\,\text{LCF} \times \text{TM}$$

- The symbols:
  - BPF is the basic premium factor (basic premium divided by standard premium), TM the tax multiplier and LCF the loss conversion factor;
  - ELR is the expected loss ratio to standard premium, and $\%L_1$ the share of losses emerged at the first adjustment;
  - $CL/L$ is the **loss capping ratio**, the share of loss development that the per-accident limit and the retro maximum and minimum let through.
- **$\text{PDLD}_1$ is usually above 1.** The whole basic premium is collected at the first adjustment and few losses are capped yet. Later PDLDs fall well **below 1** as more of each new dollar of loss lands above a cap. Assuming premium tracks losses one-for-one overstates the asset.
- **Cumulative ratios.** $\text{CPDLD}_k$ averages the PDLDs from adjustment $k$ onward, weighted by the expected loss emerging in each: $\sum_{j \ge k} \text{PDLD}_j\, \Delta\%L_j \,/\, \sum_{j \ge k} \Delta\%L_j$. It is the premium expected per dollar of loss still to emerge.
- **Formula or empirical.** PDLDs can come from the plan parameters sold, which respond to changes in plan design, or from history, dividing booked premium by reported loss. Premium is booked with a lag: in Teng and Perkins' example, premium at 27 months reflects losses valued at 18 months, the first adjustment. Capping ratios are estimated with Table M charges and a loss elimination ratio for the per-accident limit.
- **Tie it to the loss reserve.** Future loss emergence should come from the same analysis that sets IBNR, so a reserve increase raises the premium asset consistently. The asset is collected from insureds after the fact, so collectability and collateral matter. See [[Premium Reserve]] for the other premium-sensitive reserves.

> [!example]- PDLD and CPDLD Ratios from Plan Parameters {Example}
> A book of retro plans has BPF $0.25$, TM $1.04$, LCF $1.10$ and ELR $0.65$. Losses emerge $80\%$ by the first adjustment, $12\%$ by the second and $8\%$ by the third (the last). The loss capping ratios are $0.90$, $0.60$ and $0.40$.
>
> Compute the PDLD and CPDLD ratios.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PDLD}_1 &= \frac{0.25(1.04)}{0.65(0.80)} + 0.90(1.10)(1.04) \\
> > &= 0.5000 + 1.0296 \\
> > &= 1.5296 \\
> > \text{PDLD}_2 &= 0.60(1.10)(1.04) \\
> > &= 0.6864 \\
> > \text{PDLD}_3 &= 0.40(1.10)(1.04) \\
> > &= 0.4576
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{CPDLD}_1 &= 1.5296(0.80) + 0.6864(0.12) + 0.4576(0.08) \\
> > &= 1.3427 \\
> > \text{CPDLD}_2 &= \frac{0.6864(0.12) + 0.4576(0.08)}{0.20} \\
> > &= 0.5949 \\
> > \text{CPDLD}_3 &= 0.4576
> > \end{align*}
> > $$
> >
> > Before the first adjustment each dollar of expected loss brings $\$1.34$ of premium. After it, each further dollar brings only $\$0.59$, because the basic premium has been collected and caps increasingly bind.

> [!example]- Premium Asset at a Valuation Date {Example}
> Using the CPDLDs above:
>
> - **Policy year A** has had no retro adjustment. Its expected losses through all adjustments are $\$10.0$M, and $\$12.0$M of standard premium has been booked.
> - **Policy year B** has had its first adjustment, which produced $\$11.5$M of premium. Losses still expected to emerge are $\$1.8$M, and booked premium is now $\$11.6$M.
>
> Compute the premium asset.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Ult}_A &= 1.3427 \times 10.0 \\
> > &= 13.43 \\
> > \text{Asset}_A &= 13.43 - 12.00 \\
> > &= 1.43 \\
> > \text{Ult}_B &= 11.50 + 0.5949 \times 1.8 \\
> > &= 12.57 \\
> > \text{Asset}_B &= 12.57 - 11.60 \\
> > &= 0.97
> > \end{align*}
> > $$
> >
> > The total premium asset is $\$2.40$M. Note how year B uses booked premium from its *last adjustment* as the base and applies only the later, smaller CPDLD to the losses still to come. Had the actuary applied $1.34$ to B's remaining $\$1.8$M, the asset would be overstated by $\$1.3$M.
