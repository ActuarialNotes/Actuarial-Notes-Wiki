---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fd619a343e831d18fe32bdda8900f9b256d0a91f0dbc4e5c95d16dc8687addbe
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discounted Payback Period.md
---

The **Discounted Payback Period** (DPP) of a policy is the first year by whose end the shareholders have recovered the money they put in at issue together with their required return. In [[Profit Testing|profit testing]] it is the smallest $m$ for which the partial [[Net Present Value|net present value]] of the [[Profit Signature|profit signature]], discounted at the risk discount rate $r$, is zero or positive. It measures how long the capital committed to a policy stays at risk.

In the notation of Dickson, Hardy & Waters, the partial NPV of the first $m$ years is

> $$\text{NPV}(m) = \sum_{t=0}^{m} \Pi_t\,(1+r)^{-t}$$

- $\Pi_t$ is the expected profit at time $t$ per policy issued.
- $\text{NPV}(n)$, for a policy of $n$ years, is the policy's full NPV.

The discounted payback period is

> $$\text{DPP} = \min\left\{ m : \text{NPV}(m) \geq 0 \right\}$$

The initial expenses at time 0 are the outlay being recovered. If the full NPV is negative, the partial NPV never reaches zero and the policy has no discounted payback period.

> [!example]- A 5-year term insurance on $(60)$ has the profit signature $(-250,\ 90.59,\ 90.14,\ 92.66,\ 88.95,\ 89.83)$. What is its discounted payback period at 10%? {Example}
> - The signature is worked out in [[Profit Testing]].
> - Discount each entry at 10% and keep a running total of the partial NPVs:
>
> | $t$ | $\Pi_t$ | $\Pi_t(1.1)^{-t}$ | $\text{NPV}(t)$ |
> |---|---|---|---|
> | 0 | $-250.00$ | $-250.00$ | $-250.00$ |
> | 1 | 90.59 | 82.35 | $-167.65$ |
> | 2 | 90.14 | 74.50 | $-93.15$ |
> | 3 | 92.66 | 69.62 | $-23.53$ |
> | 4 | 88.95 | 60.75 | 37.22 |
> | 5 | 89.83 | 55.78 | 93.00 |
>
> - The partial NPV is still negative at time 3 and first becomes positive at time 4.
> - The discounted payback period is 4 years. The shareholders wait until the fourth year of a five-year policy to recover their $\$250$ with a 10% return.

## What changes the period

A higher risk discount rate lengthens the period, because later profits count for less. Larger initial expenses and larger [[Reserve|reserves]] lengthen it too, because reserves hold back profit in the early years and release it later.

> [!example]- With no reserves, the same policy's signature is $(-250,\ 174.30,\ 134.44,\ 90.05,\ 40.63,\ -14.46)$. What is its discounted payback period at 10%? {Example}
> - The present values of the entries for $t = 1$ to $5$ are 158.45, 111.11, 67.66, 27.75 and $-8.98$.
> - $\text{NPV}(1) = -250 + 158.45 = -91.55$.
> - $\text{NPV}(2) = -91.55 + 111.11 = 19.56$, so the policy pays back in 2 years instead of 4.
> - The partial NPV rises to 114.97 at time 4 and falls to 105.99 at time 5, because of the loss in the last year.
> - Without reserves the profit emerges earlier, but the loss in year 5 is left unfunded, which is why the insurer must hold at least the zeroized reserve.

If the signature turns negative after the payback year, the partial NPV falls again. The definition still takes the first year it is non-negative, so a short period does not mean the later years are safe.

## What it does not show

Two policies with the same NPV can pay back at different times, and a policy that pays back quickly can still have a small NPV. The DPP is a measure of timing and risk, so it is reported with the NPV, the [[Internal Rate of Return|internal rate of return]] and the [[Profit Margin|profit margin]].

> [!trap] Adding the undiscounted signature
> The partial sums use the risk discount rate. Adding the undiscounted signature gives the plain payback period, which is shorter: 3 years in place of 4 in the first example.
