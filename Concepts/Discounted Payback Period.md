---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:691a436eeaccc3feca46a313e523a6db124c63906b8d34f9ac38bd9566cdc726
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discounted Payback Period.md
---

**The Discounted Payback Period** (DPP) of a policy is the first year by whose end the shareholders have recovered the money they put in at issue together with their required return. In [[Profit Testing|profit testing]] it is the smallest $m$ for which the partial [[Net Present Value|net present value]] of the [[Profit Signature|profit signature]], discounted at the risk discount rate, is zero or positive. It measures how long the capital committed to a policy stays at risk.

> $$\text{NPV}(m) = \sum_{t=0}^{m} \Pi_t\,(1+r)^{-t}$$

> $$\text{DPP} = \min\left\{ m : \text{NPV}(m) \geq 0 \right\}$$

- **Symbols:** Following Dickson, Hardy & Waters, $\Pi_t$ is the expected profit at time $t$ per policy issued and $r$ is the risk discount rate. $\text{NPV}(m)$ is the partial NPV of the first $m$ years, and $\text{NPV}(n)$ is the policy's full NPV.
- **When there is none:** If the full NPV is negative, the partial NPV never reaches zero and the policy has no discounted payback period. The shareholders never recover their outlay with the required return.
- **What moves it:** A higher risk discount rate lengthens the period, because later profits count for less. Larger initial expenses and larger [[Reserve|reserves]] lengthen it too, because reserves hold back profit in the early years and release it later.
- **What it does not show:** Two policies with the same NPV can pay back at different times, and a policy that pays back quickly can still have a small NPV. The DPP is a measure of timing and risk, so it is reported with the NPV, the [[Internal Rate of Return|internal rate of return]] and the [[Profit Margin|profit margin]].

> [!example]- Payback Period of a 5-Year Term Insurance {Example}
> A 5-year term insurance on $(60)$ has the profit signature $(-250,\ 90.59,\ 90.14,\ 92.66,\ 88.95,\ 89.83)$, worked out in [[Profit Testing]]. Find the discounted payback period at a risk discount rate of 10%.
>
> > [!answer]-
> > Discount each entry at 10% and accumulate the partial NPVs until the total turns non-negative.
> >
> > | $t$ | $\Pi_t$ | $\Pi_t(1.1)^{-t}$ | $\text{NPV}(t)$ |
> > |---|---|---|---|
> > | 0 | $-250.00$ | $-250.00$ | $-250.00$ |
> > | 1 | 90.59 | 82.35 | $-167.65$ |
> > | 2 | 90.14 | 74.50 | $-93.15$ |
> > | 3 | 92.66 | 69.62 | $-23.53$ |
> > | 4 | 88.95 | 60.75 | 37.22 |
> > | 5 | 89.83 | 55.78 | 93.00 |
> >
> > The partial NPV is still negative at time 3 and first becomes positive at time 4, so the discounted payback period is 4 years. The shareholders wait until the fourth year of a five-year policy to recover their \$250 with a 10% return.

> [!example]- Reserves Delay the Payback {Example}
> If the insurer holds no reserves for the same policy, the profit signature is $(-250,\ 174.30,\ 134.44,\ 90.05,\ 40.63,\ -14.46)$. Find the discounted payback period at 10% and compare it with the policy that holds reserves.
>
> > [!answer]-
> > The present values of the entries for $t = 1$ to $5$ are 158.45, 111.11, 67.66, 27.75 and $-8.98$.
> > $$
> > \begin{align*}
> > \text{NPV}(1) &= -250 + 158.45 \\
> > &= -91.55 \\
> > \text{NPV}(2) &= -91.55 + 111.11 \\
> > &= 19.56
> > \end{align*}
> > $$
> > The policy pays back in 2 years instead of 4. Its partial NPV rises to 114.97 at time 4 and falls to 105.99 at time 5, because of the loss in the last year. Without reserves, the profit emerges earlier and the NPV at 10% is higher than the 93.00 with reserves, but the loss in year 5 is left unfunded, which is why the insurer must hold at least the zeroized reserve.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate and interpret the discounted payback period with the NPV, IRR and profit margin of a profit test, for traditional, [[Universal Life Insurance|universal life]] and [[Equity-Linked Insurance|equity-linked]] policies.
> - **Building the table:** The usual route is a running total of the discounted signature, read off at the first year it is non-negative.
> - **Comparisons:** Questions may ask how the period changes under a stress-test assumption, a different risk discount rate or a different reserve basis.

> [!warning]- Exam traps
> - **Discounted, not undiscounted:** The partial sums use the risk discount rate. Adding the undiscounted signature gives the plain payback period, which is shorter and not what the question asks for.
> - **Signature, not vector:** Each term is a profit per policy issued. Accumulating the profit vector ignores the policies that have ended and makes the payback look earlier.
> - **Time 0 counts:** The initial expenses at time 0 are the outlay being recovered. A payback period of $m$ means that the total first turns non-negative at the end of year $m$.
> - **Later losses:** If the signature turns negative after the payback year, the partial NPV falls again. The definition still takes the first year it is non-negative, so a short period does not mean the later years are safe.
