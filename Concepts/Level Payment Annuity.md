A **level payment annuity** makes equal (level) payments at regular intervals for a fixed term. It is the most basic annuity structure, forming the basis for [[Annuity Immediate]], [[Annuity Due]], [[Perpetuity]], and loan amortization.

For a level payment $P$, $n$-period annuity-immediate at rate $i$:
$$\text{PV} = P \cdot a_{\overline{n}|i} = P \cdot \frac{1-v^n}{i}$$
$$\text{FV} = P \cdot s_{\overline{n}|i} = P \cdot \frac{(1+i)^n - 1}{i}$$

The symbols $a_{\overline{n}|}$ (present value annuity factor) and $s_{\overline{n}|}$ (accumulated value annuity factor) are standard actuarial notation.

> [!example]- Loan Repayment {💡 Example}
> A $20{,}000$ loan at $5\%$ effective annual interest is repaid with 5 level annual payments (end of year). Find the payment amount.
>
> > [!answer]- Answer
> > $$20000 = P \cdot a_{\overline{5}|5\%} = P \cdot \frac{1-(1.05)^{-5}}{0.05} = P \times 4.3295$$
> > $$P = 20000/4.3295 = 4621.02$$
