$$PV = \frac{FV}{(1+i)^{n}} = FV \cdot v^n$$

The **present value** (PV) is the value today of a future payment, discounted at an interest rate. Because a dollar received in the future is worth less than a dollar today — it could have been invested to earn interest — future cash flows are multiplied by the discount factor $v = (1+i)^{-1}$ raised to the number of periods. A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:

$$PV = FV \cdot (1+i)^{-n} = FV \cdot v^n$$

For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = \sum_t C_t\, v^t$. Present value is the fundamental building block of [[Annuity Immediate|annuity]], [[Net Present Value|NPV]], and [[Deferred Annuity|deferred annuity]] calculations.

> [!example]- Present Value of a Lump Sum {💡 Example}
> An investor will receive $\$5{,}000$ in 6 years. If the effective annual interest rate is $i = 7\%$, what is the present value of this payment?
>
> > [!answer]- Answer
> > $$PV = \frac{5{,}000}{(1.07)^{6}} = 5{,}000 \times v^6 = \frac{5{,}000}{1.500730} \approx \$3{,}332.11$$
