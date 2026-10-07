---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9221ca7d63bb7f6146e3e83484d47f41d482d41016d89ef70e58565c272dcdf3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claim Reserve.md
---

**A claim reserve** is the liability a [[Health Insurance|health]] or group insurer holds at the valuation date for benefits on claims **incurred on or before that date but not yet paid** — reported claims still in course of settlement, claims incurred but not reported ([[IBNR]]), and, on disability and long-term care claims, the present value of benefits not yet due. It is the health counterpart of P&C [[Unpaid Claims|unpaid claims]], and it is distinct from the non-claim [[Reserve|reserves]] (policy, unearned premium and premium deficiency reserves) held for coverage not yet provided.

> $$\hat{C}_m = \frac{P_m}{CF_{k(m)}}$$

> $$\hat{R} = \sum_m \left(\hat{C}_m - P_m\right)$$

> $$\text{DLR} = \sum_{t \geq 0} v^{t}\, {}_{t}p^{\,d}\, B_t$$

- **Completion factor method** (short-duration medical, dental, drug): $P_m$ is claims incurred in month $m$ and paid to date, $k(m)$ the months of lag since $m$, and $CF_k$ the share of ultimate incurred claims paid by lag $k$, read off a lag [[Development Triangle|triangle]] as the reciprocal of the product of the remaining age-to-age factors. It is the [[Chain Ladder Method|chain ladder]] stated as a percentage complete.
- For the most recent incurral months $CF_k$ is small, so $1/CF_k$ magnifies any noise in $P_m$. Practice replaces those months with a **projection** (expected PMPM $\times$ members, trended), or blends the two.
- **Disabled life reserve** (LTD, LTC, waiver of premium): for an open claim, $B_t$ is the benefit due at time $t$ and ${}_tp^{\,d}$ the probability the claimant is still disabled (claim termination by recovery or death). CP-321 names the pieces for long-duration contracts: the present value of amounts not yet due (PVANYD), claims in course of settlement (ICOS) and IBNR.
- [[Actuarial Standards of Practice|ASOP 5]] defines the unpaid claims liability as the unpaid portion of incurred claims, including unreported and reported-but-unpaid claims. Environmental changes — [[Trend|trend]], [[Seasonality|seasonality]], [[Claims Processing Changes|claim processing speed]] — distort completion factors, which is why the syllabus asks you to evaluate them.

> [!example]- Completion Factor Reserve with a Projected Recent Month {Example}
> A medical plan values claims at May 31. Cumulative paid claims ($\$000$) by incurral month and lag in months:
>
> | Incurred | Lag 0 | Lag 1 | Lag 2 | Lag 3 | Lag 4 |
> |---|---|---|---|---|---|
> | Jan | 420 | 860 | 960 | 990 | 1,000 |
> | Feb | 400 | 830 | 925 | 955 | |
> | Mar | 450 | 920 | 1,030 | | |
> | Apr | 430 | 880 | | | |
> | May | 470 | | | | |
>
> Claims are complete by lag 4. Using volume-weighted age-to-age factors, compute the claim reserve. Then replace May with a projection of $\$101.50$ PMPM on $10{,}200$ members.
>
> > [!answer]-
> > Age-to-age factors, then completion factors (product of the remaining factors, inverted):
> >
> > $$
> > \begin{align*}
> > f_{0 \to 1} &= \tfrac{3{,}490}{1{,}700} \\
> > &= 2.0529 \\
> > f_{1 \to 2} &= \tfrac{2{,}915}{2{,}610} \\
> > &= 1.1169 \\
> > f_{2 \to 3} &= \tfrac{1{,}945}{1{,}885} \\
> > &= 1.0318 \\
> > f_{3 \to 4} &= \tfrac{1{,}000}{990} \\
> > &= 1.0101
> > \end{align*}
> > $$
> >
> > $CF_4 = 1$, $CF_3 = 0.9900$, $CF_2 = 0.9595$, $CF_1 = 0.8591$, $CF_0 = 0.4185$. Reserve by month, $P_m(1/CF - 1)$:
> >
> > $$
> > \begin{align*}
> > \text{Feb} &= 955/0.9900 - 955 \\
> > &= 9.6 \\
> > \text{Mar} &= 1{,}030/0.9595 - 1{,}030 \\
> > &= 43.5 \\
> > \text{Apr} &= 880/0.8591 - 880 \\
> > &= 144.3 \\
> > \text{May} &= 470/0.4185 - 470 \\
> > &= 653.1 \\
> > \hat{R} &= 850.5
> > \end{align*}
> > $$
> >
> > May's completion estimate implies $1{,}123.1/10.2 = \$110.10$ PMPM, well above the projection. Replacing May:
> >
> > $$
> > \begin{align*}
> > \hat{C}_{\text{May}} &= 10{,}200 \times 101.50 / 1{,}000 \\
> > &= 1{,}035.3 \\
> > \hat{R} &= 197.5 + (1{,}035.3 - 470) \\
> > &= 762.8
> > \end{align*}
> > $$
> >
> > The reserve is $\$762.8$K rather than $\$850.5$K. With only 42% of May paid, an unusually fast first month of payments was being multiplied by $2.39$; the projection gives that month the weight its data deserves.

> [!example]- Disabled Life Reserve on an Open LTD Claim {Example}
> A disabled claimant receives $\$36{,}000$ a year, paid at the start of each year, for at most three more payments. The probabilities the claim is still open at times $1$ and $2$ are $0.80$ and $0.68$. At $4\%$ interest, compute the reserve for amounts not yet due.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{DLR} &= 36{,}000\left(1 + 0.80v + 0.68v^{2}\right) \\
> > &= 36{,}000\,(1 + 0.7692 + 0.6287) \\
> > &= 36{,}000 \times 2.3979 \\
> > &= 86{,}325
> > \end{align*}
> > $$
> >
> > The reserve is $\$86{,}325$. Ignoring claim terminations would give $\$103{,}899$ — termination rates, not interest, drive this reserve.

> [!tip]- How it appears on the exam
> - GH-201U and GH-201C (objective 3, "calculate appropriate claim reserves given data"): a lag triangle of paid claims plus membership, asking for completion factors, the reserve, and a judgement on the most recent months — usually blended with a PMPM projection.
> - GH-201 objective 4 pairs the calculation with an environmental change (a processing backlog, a seasonal spike, a trend shift) and asks how the factors and reserve move, in writing.
> - "Describe the types of claim reserves" (GH-201 objective 1) is a written list: reported but unpaid, IBNR, PVANYD on long-duration claims, and claim adjustment expense, set apart from non-claim reserves.
> - CP-321 objective 4 moves to long-duration contracts: a disabled life or LTC claim reserve from termination rates and interest, alongside policy and premium deficiency reserves.

> [!warning]- Exam traps
> - Inverting the wrong way: a completion factor is below $1$ and you **divide** paid by it. Multiplying gives a reserve that is negative.
> - Trusting lag-0 completion: dividing a recent month by a factor near $0.4$ turns a 10% blip in paid into a 10% error in that month's ultimate. Projection or blending is expected for recent months.
> - Not adjusting for a processing speed-up: faster payment raises recent paid amounts, and historical completion factors then **overstate** the reserve.
> - Calling a disabled life reserve IBNR: the claim is reported; its future benefits are amounts not yet due, valued with termination rates.
