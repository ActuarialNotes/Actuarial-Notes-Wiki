The **future value** (FV) of a cash flow is its [[Accumulated Value]] at a specified future date, accounting for the time value of money. Under [[Compound Interest]] at effective annual rate $i$:

$$\text{FV} = \text{PV} \cdot (1+i)^n$$

where $n$ is the number of periods. Future value is the inverse operation of [[Present Value]]: discounting finds PV from FV, while accumulation finds FV from PV.

For a series of cash flows $C_t$ at times $t = 0, 1, \ldots, n$, the future value at time $n$ is:
$$\text{FV}_n = \sum_{t=0}^{n} C_t (1+i)^{n-t}$$

> [!example]- Saving for a Future Goal {💡 Example}
> An investor deposits $500$ at the start of each year for 4 years at 6% effective annual interest. Find the accumulated value at the end of year 4.
>
> > [!answer]- Answer
> > This is an [[Annuity Due]] with payments of $500$:
> > $$\text{FV} = 500(1.06)^4 + 500(1.06)^3 + 500(1.06)^2 + 500(1.06)^1 = 500 \cdot \ddot{s}_{\overline{4}|} \approx 2431.01$$
