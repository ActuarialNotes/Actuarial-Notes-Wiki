**Policy Information** (or provisions) refers to the contractual terms of an insurance policy that determine how much of a ground-up loss $X$ the insurer pays.
- The main provisions are [[Deductible]] ($d$), [[Benefit Limit|benefit limit]] ($u$), and [[Coinsurance Percentage|coinsurance]] ($\alpha$)
- These provisions transform the loss random variable $X$ into a [[Payment Random Variable]] $Y$
- The policy features allocate financial responsibility between the insured and insurer, affecting both expected payments and risk exposure:

> $$\text{Payment} = g(X;\ d,\ u,\ \alpha)$$

> [!example]- Identifying Policy Provisions from a Contract {Example}
> A health policy states: the insured pays the first \$500 of any claim, the insurer covers 80% of amounts above \$500, and the insurer's maximum payment is \$10{,}000. Identify each policy provision.
>
> > [!answer]-
> > - **Deductible**: $d = \$500$ (insured absorbs the first \$500)
> > - **Coinsurance percentage**: $\alpha = 80\%$ (insurer pays 80% of the excess above the deductible)
> > - **Benefit limit**: $u = \$10{,}000$ (maximum the insurer will pay in total)
> > These three provisions together define the payment function for any ground-up loss $X$.
