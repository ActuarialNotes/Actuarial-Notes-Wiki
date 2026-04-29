The **current value** of a cash flow stream is its value at a specified reference point in time — not necessarily today (present) or at the end (future). It is computed by discounting future cash flows and accumulating past cash flows to the reference date using the applicable [[Interest Rate]] or [[Accumulation Function]].

$$\text{Current Value at time } t = \sum_{k} C_k \cdot \frac{a(t)}{a(t_k)}$$

where $a(t)$ is the [[Accumulation Function]] and $C_k$ is the cash flow at time $t_k$.

> [!example]- Value at an Intermediate Date {💡 Example}
> Payments of $1000$ at time 0 and $1000$ at time 4 are made. Find the current value at time 2 using an effective annual rate of 5%.
>
> > [!answer]- Answer
> > Accumulate the time-0 payment forward 2 years and discount the time-4 payment back 2 years:
> > $$\text{CV}_2 = 1000(1.05)^2 + 1000(1.05)^{-2} = 1102.50 + 907.03 = 2009.53$$
