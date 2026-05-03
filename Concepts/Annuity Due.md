$$\ddot{a}_{\overline{n}|} = \frac{1-v^n}{d}$$

An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period. Because each payment is received one period earlier than in an [[Annuity Immediate|annuity-immediate]], the annuity-due is worth exactly $(1+i)$ times as much:

$$\ddot{a}_{\overline{n}|} = (1+i)\,a_{\overline{n}|} = \frac{1-v^n}{d}$$

The accumulated value at the end of the last period (one period after the final payment) is $\ddot{s}_{\overline{n}|}$:

$$\ddot{s}_{\overline{n}|} = (1+i)\,s_{\overline{n}|} = \frac{(1+i)^n - 1}{d}$$

Here $d = i/(1+i)$ is the effective annual [[Discount Rate]]. Annuities-due arise naturally when payments are made at the start of a period, such as lease payments, insurance premiums paid in advance, or tuition fees.

> [!example]- Present Value of a 4-Year Annuity-Due {💡 Example}
> A lease requires payments of $\$800$ at the **beginning** of each year for 4 years. The effective annual rate is $i = 5\%$. Find the present value.
>
> > [!answer]- Answer
> > $$\ddot{a}_{\overline{4}|0.05} = (1.05)\,a_{\overline{4}|0.05} = (1.05)\cdot\frac{1-(1.05)^{-4}}{0.05}$$
> > $$(1.05)^{-4} \approx 0.82270, \quad a_{\overline{4}|} = \frac{0.17730}{0.05} = 3.5460$$
> > $$\ddot{a}_{\overline{4}|} = 1.05 \times 3.5460 \approx 3.7233$$
> > $$PV = 800 \times 3.7233 \approx \$2{,}978.64$$
