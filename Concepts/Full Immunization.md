**Full immunization** provides protection against **any** single interest rate shift (both small and large, up or down), in contrast to [[Redington Immunization]] which only covers small parallel shifts. Full immunization is achieved when:

1. $PV(assets) = PV(liabilities)$ at the current yield
2. The asset cash flows "surround" the liability cash flow date: there is at least one asset cash flow before and one after each liability payment date

Under these conditions, for any interest rate change $i \to i + \Delta$, the [[Portfolio]] surplus remains non-negative. Full immunization generally requires more asset cash flows than [[Redington Immunization]] and is more restrictive.

> [!example]- Full Immunization Setup {💡 Example}
> A single liability of $L$ is due at time $T$. Show how to fully immunize with two assets.
>
> > [!answer]- Answer
> > Purchase two zero-coupon bonds: one maturing before $T$ (at time $T_1 < T$) and one after $T$ (at time $T_2 > T$), with amounts $A_1$ and $A_2$ such that $A_1 v^{T_1} + A_2 v^{T_2} = L v^T$ and the Macaulay durations match. The bracketing of $T$ ensures protection against both rate increases and decreases.
