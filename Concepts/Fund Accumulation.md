**Fund accumulation** is the growth of a fund's balance over time from an initial deposit and/or a stream of periodic deposits or withdrawals, each earning interest at the fund's rate. It generalizes the single-sum [[Accumulation Function]] to a fund that also receives ongoing cash flows.

> $$AV_n = F_0(1+i)^n + \sum_t C_t(1+i)^{n-t}$$

- $F_0$ is the initial balance, $C_t$ is the net deposit (or withdrawal, if negative) at time $t$, and $i$ is the fund's effective interest rate.
- When deposits are level, $\sum_t C_t(1+i)^{n-t}$ reduces to $C\cdot s_{\overline{n}|i}$, the [[Annuity Immediate|annuity]] accumulated value.
- A common Exam FM scenario: amounts withdrawn from one fund are immediately deposited into and accumulate within a **second** fund earning a different rate — the accumulated value in the second fund uses its own rate, even though the deposits originated from the first fund's activity.
- Directly related to [[Accumulated Value]] and [[Future Value]].

> [!example]- Fund with an Initial Deposit and Level Additions {Example}
> \$$2{,}000$ is deposited into a fund today, and an additional \$$300$ is deposited at the end of each year for 6 years. The fund earns an annual effective interest rate of $5\%$. Find the accumulated value of the fund at the end of year 6.
>
> > [!answer]-
> > $$F_0(1.05)^6 = 2{,}000(1.34010) \approx \$2{,}680.19$$
> > $$300\cdot s_{\overline{6}|0.05} = 300\left(\frac{1.34010-1}{0.05}\right) = 300(6.80191) \approx \$2{,}040.57$$
> > $$AV_6 \approx 2{,}680.19 + 2{,}040.57 = \$4{,}720.76$$

> [!example]- Reinvesting Interest From One Fund Into Another {Example}
> \$$500$ is deposited into Fund A, which earns an annual effective rate of $5\%$. At the end of each year, the interest earned by Fund A is withdrawn and deposited into Fund B, which earns $8\%$. Find the accumulated value of Fund B at the end of year 4.
>
> > [!answer]-
> > Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year, deposited into Fund B.
> > $$s_{\overline{4}|0.08} = \frac{(1.08)^4 - 1}{0.08} = \frac{1.36049-1}{0.08} \approx 4.50611$$
> > $$AV_B = 25 \times 4.50611 \approx \$112.65$$
