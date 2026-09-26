---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:09c20f2fc6d0bb1c2f5f8735cb48b57627f25da2788aaf5ee7ad7b69546da47a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rate of Return.md
---

The **rate of return** on an investment is the interest rate at which the money put in and the money taken out are equivalent — the [[Yield Rate|yield rate]] or **internal rate of return (IRR)** of its cash flows. For a fund with deposits and withdrawals during the year it is measured two ways: **dollar-weighted**, which reflects the investor's own timing, and **time-weighted**, which removes it.

> $$\sum_{t} C_t\, v^t = 0$$

> $$i_{DW} \approx \frac{I}{A + \sum_t C_t\,(1-t)}$$

> $$1 + i_{TW} = \prod_{k=1}^{m} \frac{B_k}{B_{k-1} + C_{k-1}}$$

- **IRR.** $C_t$ is the net cash flow at time $t$ (outflows negative) and $v = 1/(1+i)$; the IRR is the $i$ that makes the [[Net Present Value|net present value]] zero. For a bond it is the yield to maturity. It is unique when the cash flows change sign only once — all outlays before all receipts; with several sign changes there can be more than one root.
- **Dollar-weighted.** Over one year, $A$ is the fund at the start, $B$ at the end, $C_t$ the net deposit at time $t$ (withdrawals negative), $C = \sum C_t$, and $I = B - A - C$ the interest earned. The formula is the simple-interest approximation to the exact equation $A(1+i) + \sum_t C_t (1+i)^{1-t} = B$.
- **Time-weighted.** Split the year at every deposit or withdrawal. $B_0 = A$, $C_0 = 0$, $B_k$ is the fund value just before cash flow $C_k$, and $B_m = B$. Each ratio is one sub-period's growth; chaining them gives a return that does not depend on how much money was in the fund when.
- **Which to use.** The time-weighted rate measures the **fund manager** (who does not control the deposits); the dollar-weighted rate measures the **investor's** actual experience. With no cash flows during the year, the two coincide.
- Rates of return on a [[Portfolio]] of assets feed [[Duration]] and [[Immunization]] work, where the yield on assets is compared with the rate needed to support the liabilities.

> [!example]- Dollar-Weighted Versus Time-Weighted Return {Example}
> An insurer's investment fund is worth \$100,000 on January 1. On July 1 it is worth \$120,000, and the insurer immediately deposits another \$50,000. On December 31 the fund is worth \$160,000. Find the dollar-weighted and time-weighted rates of return.
>
> > [!answer]-
> > Dollar-weighted, with $I = 160{,}000 - 100{,}000 - 50{,}000 = 10{,}000$:
> >
> > $$
> > \begin{align*}
> > i_{DW} &\approx \frac{10{,}000}{100{,}000 + 50{,}000(0.5)} \\
> > &= \frac{10{,}000}{125{,}000} \\
> > &= 8.00\%
> > \end{align*}
> > $$
> >
> > (Solving the exact equation $100{,}000(1+i) + 50{,}000(1+i)^{0.5} = 160{,}000$ gives $8.03\%$.)
> >
> > Time-weighted, splitting the year at July 1:
> >
> > $$
> > \begin{align*}
> > 1 + i_{TW} &= \frac{120{,}000}{100{,}000} \times \frac{160{,}000}{120{,}000 + 50{,}000} \\
> > &= 1.2 \times 0.94118 \\
> > &= 1.12941
> > \end{align*}
> > $$
> >
> > So $i_{TW} = 12.94\%$. The manager earned $20\%$ in the first half and lost $5.9\%$ in the second; the dollar-weighted rate is lower because the insurer added money just before the losing half.

> [!example]- IRR of an Investment {Example}
> An insurer pays \$10,000 today for a note that returns \$6,000 in one year and \$5,500 in two years. Find the rate of return.
>
> > [!answer]-
> > Set the net present value to zero and solve the quadratic in $v$:
> >
> > $$
> > \begin{align*}
> > -10{,}000 + 6{,}000v + 5{,}500v^2 &= 0 \\
> > v &= \frac{-6{,}000 + \sqrt{6{,}000^2 + 4(5{,}500)(10{,}000)}}{2(5{,}500)} \\
> > &= \frac{-6{,}000 + 16{,}000}{11{,}000} \\
> > &= 0.90909
> > \end{align*}
> > $$
> >
> > So $i = 1/0.90909 - 1 = 10\%$. There is one sign change, so this is the only rate of return.
