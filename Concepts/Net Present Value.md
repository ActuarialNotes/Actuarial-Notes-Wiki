$$NPV = \sum_t C_t\, v^t = PV(\text{inflows}) - PV(\text{outflows})$$

The **net present value** (NPV) is the sum of the present values of all cash flows associated with a project or investment, with inflows treated as positive and outflows as negative. Discounting each cash flow $C_t$ at effective rate $i$ using $v = (1+i)^{-1}$:

$$NPV = -C_0 + C_1 v + C_2 v^2 + \cdots + C_n v^n$$

A positive NPV means the investment creates value at rate $i$ — the inflows more than compensate for the outflows at the chosen discount rate. A negative NPV means the opposite. The **internal rate of return** (IRR) is the rate $i^*$ at which $NPV = 0$.

> [!example]- Comparing Two Investment Projects {💡 Example}
> Project A requires an outlay of $\$10{,}000$ today and returns $\$4{,}000$ at the end of each of the next 3 years. Project B requires $\$10{,}000$ today and returns $\$12{,}500$ at the end of year 3 only. Using $i = 6\%$, which project has the higher NPV?
>
> > [!answer]- Answer
> > **Project A:**
> > $$NPV_A = -10{,}000 + 4{,}000\,a_{\overline{3}|0.06}$$
> > $$a_{\overline{3}|} = \frac{1-(1.06)^{-3}}{0.06} = \frac{1-0.83962}{0.06} \approx 2.6730$$
> > $$NPV_A = -10{,}000 + 4{,}000 \times 2.6730 \approx -10{,}000 + 10{,}692 = \$692$$
> >
> > **Project B:**
> > $$NPV_B = -10{,}000 + 12{,}500\,(1.06)^{-3} = -10{,}000 + 12{,}500 \times 0.83962 \approx -10{,}000 + 10{,}495 = \$495$$
> >
> > Project A has the higher NPV ($\$692 > \$495$), so Project A is preferred at a 6% discount rate.
