A **level annuity** is an annuity with equal, constant payments at regular intervals. It is synonymous with [[Level Payment Annuity]] and is the standard annuity type. The two main forms are:

- **[[Annuity Immediate]]**: payments at the **end** of each period; PV factor $a_{\overline{n}|} = (1-v^n)/i$
- **[[Annuity Due]]**: payments at the **beginning** of each period; PV factor $\ddot{a}_{\overline{n}|} = (1-v^n)/d$

The relationship between the two: $\ddot{a}_{\overline{n}|} = (1+i) \cdot a_{\overline{n}|}$.

Level annuities are used to model loan repayments, regular deposits, and structured insurance payments.

> [!example]- Annuity-Immediate vs. Annuity-Due {💡 Example}
> Find the PV of a 4-year level annuity paying $1{,}000$/year at $i=5\%$, both immediate and due.
>
> > [!answer]- Answer
> > Immediate: $1000 \times a_{\overline{4}|5\%} = 1000 \times 3.5460 = 3546.0$
> > Due: $1000 \times \ddot{a}_{\overline{4}|5\%} = 3546.0 \times 1.05 = 3723.3$
