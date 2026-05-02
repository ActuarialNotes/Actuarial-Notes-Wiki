In the context of annuities, an **arithmetic progression** refers to a sequence of payments where each payment increases (or decreases) by a fixed amount $Q$ per period. Starting from an initial payment $P$, the payments are $P, P+Q, P+2Q, \ldots$

The present value of the increasing portion uses the increasing annuity symbol $(I\ddot{a})_{\overline{n}|}$ or $(Ia)_{\overline{n}|}$:
$$(Ia)_{\overline{n}|} = \frac{\ddot{a}_{\overline{n}|} - nv^n}{i}$$

Any arithmetic annuity can be decomposed into a [[Level Annuity]] of $P$ per period plus a pure increasing annuity of $Q$ per period.

> [!example]- Increasing Annuity {💡 Example}
> Payments of $100, 200, 300, \ldots, 500$ are made at end of years 1–5. Find the PV at $i=6\%$.
>
> > [!answer]- Answer
> > $P=100$, $Q=100$, $n=5$. This equals $100 \times (Ia)_{\overline{5}|6\%}$ where $(Ia)_{\overline{5}|}= (\ddot{a}_{\overline{5}|} - 5v^5)/i$.
> > $\ddot{a}_{\overline{5}|} = (1.06)a_{\overline{5}|} = 1.06 \times 4.2124 = 4.4651$. $5v^5 = 5(1.06)^{-5} = 5(0.7473) = 3.7363$.
> > $(Ia)_{\overline{5}|} = (4.4651-3.7363)/0.06 = 12.147$. PV $= 100 \times 12.147 = 1214.72$.
