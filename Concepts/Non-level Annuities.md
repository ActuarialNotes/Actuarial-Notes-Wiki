**Non-level annuities** have payments that vary over time. Key types covered on Exam FM:

- **[[Arithmetic Increasing Annuity|Arithmetic progression]]**: payments increase (or decrease) by a constant amount each period — $(P), (P+Q), (P+2Q), \ldots$
- **[[Geometric Increasing Annuity|Geometric progression]]**: payments grow at a constant rate each period — $(1), (1+g), (1+g)^2, \ldots$
- **Other non-level cash flows**: solved using first-principles discounting, annuity decomposition, or recursive techniques

Any non-level cash flow stream can be valued by discounting each payment individually:
$$\text{PV} = \sum_{t=1}^{n} C_t \cdot v^t$$

> [!example]- Staircase Payments {💡 Example}
> Payments of $100$, $200$, $300$, $400$ are made at end of years 1–4. Find the PV at $i = 5\%$.
>
> > [!answer]- Answer
> > $$\text{PV} = 100v + 200v^2 + 300v^3 + 400v^4 = \frac{100}{1.05} + \frac{200}{1.05^2} + \frac{300}{1.05^3} + \frac{400}{1.05^4}$$
> > $= 95.24 + 181.41 + 259.15 + 329.08 = 864.88$
