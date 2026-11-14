---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:bd73f195fecfe4d7b7aab69e5706c72255e962d0a545575043b967eba4089aee
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claim Reserve.md
---
A **Claim Reserve** is the liability a [[Health Insurance|health]] or group insurer holds at the valuation date for benefits on claims incurred on or before that date but not yet paid. It covers reported claims still in course of settlement, claims incurred but not reported ([[IBNR]]), and, on disability and long-term care claims, the present value of benefits not yet due.

It is the health counterpart of P&C [[Unpaid Claims|unpaid claims]], and it is distinct from the non-claim [[Reserve|reserves]] (policy, unearned premium and premium deficiency reserves) held for coverage not yet provided. [[Actuarial Standards of Practice|ASOP 5]] defines the unpaid claims liability as the unpaid portion of incurred claims, including unreported and reported-but-unpaid claims.

## The completion factor method

Short-duration medical, dental and drug claims are reserved with completion factors. If $P_m$ is the claims incurred in month $m$ and paid to date, the estimate of that month's ultimate incurred claims is

> $$\hat{C}_m = \frac{P_m}{CF_{k(m)}}$$

- $k(m)$ is the number of months of lag since month $m$.
- $CF_k$ is the share of ultimate incurred claims paid by lag $k$, read off a lag [[Development Triangle|triangle]] as the reciprocal of the product of the remaining age-to-age factors.

It is the [[Chain Ladder Method|chain ladder]] stated as a percentage complete. A completion factor is below 1, so the paid amount is divided by it. The claim reserve is

> $$\hat{R} = \sum_m \left(\hat{C}_m - P_m\right)$$

For the most recent incurral months $CF_k$ is small, so $1/CF_k$ magnifies any noise in $P_m$. Practice replaces those months with a projection (expected PMPM $\times$ members, trended), or blends the two. Environmental changes such as [[Trend|trend]], [[Seasonality|seasonality]] and [[Claims Processing Changes|claim processing speed]] distort completion factors. Faster payment raises recent paid amounts, and historical completion factors then overstate the reserve.

> [!example]- What is this medical plan's claim reserve at May 31, and what is it with May projected? {Example}
> Cumulative paid claims ($\$000$) by incurral month and lag in months are below. Claims are complete by lag 4. Use volume-weighted age-to-age factors, then replace May with a projection of $\$101.50$ PMPM on $10{,}200$ members.
>
> | Incurred | Lag 0 | Lag 1 | Lag 2 | Lag 3 | Lag 4 |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | Jan | 420 | 860 | 960 | 990 | 1,000 |
> | Feb | 400 | 830 | 925 | 955 | |
> | Mar | 450 | 920 | 1,030 | | |
> | Apr | 430 | 880 | | | |
> | May | 470 | | | | |
>
> > [!answer]-
> > - The age-to-age factors are $f_{0 \to 1} = 3{,}490/1{,}700 = 2.0529$, $f_{1 \to 2} = 2{,}915/2{,}610 = 1.1169$, $f_{2 \to 3} = 1{,}945/1{,}885 = 1.0318$ and $f_{3 \to 4} = 1{,}000/990 = 1.0101$.
> > - The completion factors are $CF_4 = 1$, $CF_3 = 0.9900$, $CF_2 = 0.9595$, $CF_1 = 0.8591$ and $CF_0 = 0.4185$.
> > - February's reserve is $955/0.9900 - 955 = 9.6$.
> > - March's is $1{,}030/0.9595 - 1{,}030 = 43.5$.
> > - April's is $880/0.8591 - 880 = 144.4$.
> > - May's is $470/0.4185 - 470 = 653.2$.
> > - The reserve is $\hat{R} = \$850.7$K.
> > - May's completion estimate implies $1{,}123.2/10.2 = \$110.11$ PMPM, well above the projection.
> > - The projection gives $\hat{C}_{\text{May}} = 10{,}200 \times 101.50/1{,}000 = 1{,}035.3$.
> > - With May projected, the reserve is $197.5 + (1{,}035.3 - 470) = \$762.8$K.
> > - With only 42% of May paid, a fast first month of payments was being multiplied by $2.39$. The projection gives that month the weight its data deserves.

## The disabled life reserve

On long-duration contracts (LTD, LTC, waiver of premium), an open claim's future benefits are valued with claim termination rates and interest. The disabled life reserve is

> $$\text{DLR} = \sum_{t \geq 0} v^{t}\, {}_{t}p^{\,d}\, B_t$$

- $B_t$ is the benefit due at time $t$.
- ${}_tp^{\,d}$ is the probability the claimant is still disabled at time $t$, allowing for claim termination by recovery or death.

CP-321 names the pieces of a long-duration claim reserve: the present value of amounts not yet due (PVANYD), claims in course of settlement (ICOS) and IBNR. A disabled life reserve is not IBNR, because the claim is reported.

> [!example]- What is the reserve for amounts not yet due on this open LTD claim? {Example}
> A disabled claimant receives $\$36{,}000$ a year, paid at the start of each year, for at most three more payments. The probabilities the claim is still open at times 1 and 2 are 0.80 and 0.68. Interest is 4%.
>
> > [!answer]-
> > - The reserve is $36{,}000\,(1 + 0.80v + 0.68v^{2}) = 36{,}000\,(1 + 0.7692 + 0.6287)$.
> > - That is $36{,}000 \times 2.3979 = \$86{,}325$.
> > - Ignoring claim terminations would give $\$103{,}899$, so termination rates, more than interest, drive this reserve.

> [!trap] Trusting the completion factor on a recent month
> Dividing a recent month by a completion factor near 0.4 turns a 10% blip in paid claims into a 10% error in that month's ultimate. Projection or blending is expected for recent months.
