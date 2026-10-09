---
aliases:
  - New Business
  - Insurance Enterprise
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:49c09ed76c520f16f797240615923fc5aa141a59c10745bac91363ff4cb466a7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Embedded Value.md
---
**Embedded Value** (EV) is a measure of the value to shareholders of a life insurer's existing business: the net assets already held for them, plus the present value of the profits expected to emerge from the policies [[In-Force|in force]], less the cost of the capital those policies tie up and of the options and guarantees they contain. It ignores the value of business not yet written. The **value of new business** (VNB) applies the same calculation to the policies sold in a period, so EV says what the insurance enterprise is worth today, and VNB says how much value each year's sales add to it.

> $$\text{EV} = \text{ANAV} + \text{VIF}$$

> $$\text{ANAV} = \text{FS} + \text{RC}$$

> $$\text{VIF} = \text{PVFP} - \text{CoC} - \text{TVOG}$$

> $$\text{CoC} = \text{RC}_0 - \sum_{t \ge 1} \frac{\text{RC}_{t-1}(1 + j) - \text{RC}_t}{(1+r)^t}$$

- **Symbols:** ANAV is the adjusted net asset value, the shareholders' statutory capital and surplus with adjustments such as removing intangible assets. It splits into the free surplus FS and the required capital RC, which is what the regulator or the company's own target requires to be held for the in-force business. VIF is the value of in-force. PVFP is the present value, at the risk discount rate $r$, of the after-tax statutory profits the in-force business is projected to release. $j$ is the after-tax return earned on the required capital while it is held.
- **Cost of capital:** Required capital is locked in until the business runs off, and it earns only $j$ while the shareholders want $r > j$. The cost of capital (CoC) is the required capital today less the present value of its future release with its earnings, which is the shortfall of that return below $r$. See [[Cost of Capital]].
- **TVOG:** A deterministic projection on best-estimate assumptions misses the cost of options and guarantees that pay off only in bad scenarios, such as a guaranteed crediting rate or a guaranteed minimum benefit on a variable annuity. The time value of options and guarantees (TVOG) is the extra cost found by valuing them stochastically, as the average over many scenarios less the cost in the central scenario.
- **Value of new business:** VNB is the PVFP of the policies sold in the period, measured at the point of sale, less their cost of capital and TVOG, and it includes the acquisition expenses and the initial strain. The new business margin divides VNB by the present value of new business premiums (PVNBP). Alongside the [[Internal Rate of Return|internal rate of return]], the [[Profit Margin|profit margin]] and the [[Return on Capital|return on equity]], it is one of the profit metrics a [[Profit Testing|profit test]] reports.
- **Distributable earnings:** Profits less the increase in required capital, plus the earnings on that capital, are the amounts that can be paid to shareholders. Discounting them at $r$, after the initial capital strain, gives the same answer as PVFP less CoC, which is why a VNB is often computed directly from a distributable earnings [[Profit Signature|profit signature]].
- **Movement analysis:** The change in EV over a year, plus dividends paid and less capital injected, is the EV profit. It is analysed into the expected return on the opening EV at $r$, the VNB, experience variances, assumption changes and economic variances, and EV profit over opening EV is the return on embedded value.
- **Reporting standards:** A traditional EV uses one deterministic projection with a risk discount rate that carries every allowance for risk. The CFO Forum's European Embedded Value (EEV) principles required an explicit TVOG and a disclosed basis for $r$. Its Market Consistent Embedded Value (MCEV) principles value each cash flow consistently with market prices, with risk-free discounting, and add a cost of residual non-hedgeable risks in place of a margin in $r$.

> [!example]- Embedded Value of a Run-Off Block {Example}
> A block of in-force business is projected to release after-tax statutory profits of 50, 45 and 40 at the ends of the next three years. Its required capital is 100 now, then 70, 35 and 0 at the ends of years 1 to 3, and it earns 3% after tax while held. The company also holds free surplus of 40, the TVOG is 5, and the risk discount rate is 9%. Find the embedded value.
>
> > [!answer]-
> > Each year's release of required capital with its earnings is $\text{RC}_{t-1}(1.03) - \text{RC}_t$, which gives 33, 37.10 and 36.05.
> > $$
> > \begin{align*}
> > \text{PVFP} &= \frac{50}{1.09} + \frac{45}{1.09^2} + \frac{40}{1.09^3} \\
> > &= 114.63 \\
> > \text{CoC} &= 100 - \left(\frac{33}{1.09} + \frac{37.10}{1.09^2} + \frac{36.05}{1.09^3}\right) \\
> > &= 100 - 89.34 \\
> > &= 10.66 \\
> > \text{VIF} &= 114.63 - 10.66 - 5 \\
> > &= 98.97 \\
> > \text{EV} &= (40 + 100) + 98.97 \\
> > &= 238.97
> > \end{align*}
> > $$
> > The same answer comes from the distributable earnings $50 + 33 = 83$, $45 + 37.10 = 82.10$ and $40 + 36.05 = 76.05$. Their present value at 9% is 203.97, and adding the free surplus of 40 and deducting the TVOG of 5 gives 238.97. The cost of capital of 10.66 is what holding 100 of capital at 3% costs shareholders who want 9%.

> [!example]- Value of New Business and the Other Metrics {Example}
> A year's sales of a product produce distributable earnings of $-120$ at issue, from acquisition costs and the capital set up, and then 32, 34, 36, 38 and 40 at the ends of years 1 to 5. The present value of new business premiums is 1,000, and the risk discount rate is 10%. Find the VNB, the new business margin and the IRR. Ignore TVOG.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{VNB} &= -120 + 29.09 + 28.10 + 27.05 \\
> > &\quad + 25.95 + 24.84 \\
> > &= 15.03 \\
> > \text{Margin} &= \frac{15.03}{1{,}000} \\
> > &= 1.50\%
> > \end{align*}
> > $$
> > The IRR solves $-120 + \sum_t \text{DE}_t (1+j)^{-t} = 0$, which gives $j = 14.6\%$. The three metrics agree that the business adds value: the IRR is above the 10% hurdle, so the VNB is positive. They answer different questions, though. The VNB is the value added in money, the margin is the value per unit of premium, which compares products of different sizes, and the IRR is the return on the capital strain.

> [!tip]- How it appears on the exam
> - **ILA-101:** Pricing questions ask candidates to describe the common profit metrics (IRR, VNB, EV and ROE) and to compute them from projected profits or distributable earnings, then to say which metric suits a given decision.
> - **ILA-201I and ILA-201U:** Questions ask candidates to describe and apply embedded value methods for an insurance enterprise. They calculate EV from its components, explain the cost of capital and TVOG, analyse the movement in EV over a year, and compare traditional, EEV and MCEV approaches.

> [!warning]- Exam traps
> - **Double counting capital:** If the projected profits are distributable earnings, which already release the required capital, deducting the cost of capital again counts it twice. Statutory profits need the CoC deduction, and distributable earnings already include it.
> - **Required capital in ANAV:** The required capital is part of ANAV at its face value, while the CoC in VIF reflects only the cost of locking it in. Leaving required capital out of ANAV understates EV by the whole amount.
> - **No future sales:** EV values only the business in force, and the value of future new business is a separate item in an appraisal value. Including next year's VNB in this year's EV overstates it.
> - **The discount rate:** A higher risk discount rate lowers the PVFP and raises the CoC, so EV falls on both counts. Under MCEV the allowance for risk moves into explicit deductions, so the EV and MCEV figures for the same block are not directly comparable.
