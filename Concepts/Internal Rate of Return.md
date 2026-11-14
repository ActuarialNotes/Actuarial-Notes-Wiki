---
aliases:
  - Internal Rate
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:84247e26f7469905af77cb049e150a4fb8259489651322518e94eee5c8e8de15
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Internal Rate of Return.md
---

The **Internal Rate of Return** (IRR) of a policy is the interest rate $j$ at which the [[Net Present Value|net present value]] of its [[Profit Signature|profit signature]] is zero. The calculation is the one behind the [[Yield Rate|yield rate]] and the [[Rate of Return|rate of return]] in Exam FM, applied to expected profits rather than to fixed cash flows.

For a profit signature $\Pi_0, \Pi_1, \dots, \Pi_n$, the equation of value for the IRR $j$ is

> $$\sum_{t=0}^{n} \Pi_t\,(1+j)^{-t} = 0$$

- $\Pi_t$ is the expected profit at time $t$ per policy issued.

In [[Profit Testing|profit testing]], the policy meets the shareholders' requirement when its IRR is at least the risk discount rate $r$. The IRR does not depend on the risk discount rate, which makes it easy to compare with a hurdle rate. It ignores the size of the policy, so the NPV and the [[Profit Margin|profit margin]] are reported with it.

## Uniqueness of the IRR

When the signature is negative at issue and positive afterward, the NPV falls steadily as the rate rises, so there is exactly one IRR. The NPV at $r$ is then positive exactly when $j > r$, and the NPV and IRR give the same decision. To compare the IRR with a given rate, compute the NPV at that rate and check its sign.

The number of IRRs is at most the number of sign changes in the signature. A signature that turns negative again late in the term can have two IRRs or none, and one with no negative entry has none. Zeroized reserves remove the late negative entries, which leaves a single sign change and a unique IRR.

## Solving for the IRR by interpolation

For a long signature, the IRR is found numerically, by trial rates and interpolation or with a calculator's cash-flow function. Between two trial rates $j_1 < j_2$ whose NPVs have opposite signs, the linear interpolation estimate of the IRR is

> $$j \approx j_1 + (j_2 - j_1)\,\frac{\text{NPV}(j_1)}{\text{NPV}(j_1) - \text{NPV}(j_2)}$$

- $\text{NPV}(j)$ is the net present value of the signature at rate $j$.

The estimate is only approximate, so the trial rates should bracket the root closely.

> [!example]- What is the IRR of this 5-year term insurance, and does it meet the risk discount rate? {Example}
> A 5-year term insurance on $(60)$ has the profit signature $(-250,\ 90.59,\ 90.14,\ 92.66,\ 88.95,\ 89.83)$, worked out in [[Profit Testing]], and an NPV of 93.00 at a risk discount rate of 10%. Interpolate between 22% and 24%.
>
> > [!answer]-
> > - At 22%, $\text{NPV} = -250 + 90.59/1.22 + 90.14/1.22^2 + \cdots + 89.83/1.22^5 = 9.23$.
> > - At 24%, $\text{NPV} = -1.46$.
> > - Interpolating, $j \approx 0.22 + 0.02 \times 9.23/(9.23 + 1.46) = 0.2373$. Solving the equation exactly gives $j = 23.72\%$.
> > - The signature changes sign only once, so this is the only IRR.
> > - The IRR is well above the 10% risk discount rate, so the NPV at 10% is positive, as the profit test found.

## A signature that reduces to a quadratic

A short signature may reduce to a quadratic in $v = 1/(1+j)$, and cash flows at times 0, 2 and 4 give a quadratic in $v^2$. The roots of $a v^2 + b v + c = 0$ are

> $$v = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

Each positive root $v$ gives an IRR $j = 1/v - 1$.

> [!example]- What are the IRRs of the signature $(-100,\ 230,\ -132)$, and what do they say at a risk discount rate of 12%? {Example}
> - Write $v = 1/(1+j)$ and solve the quadratic $-100 + 230v - 132v^2 = 0$.
> - The roots are $v = \big(230 \pm \sqrt{230^2 - 4(132)(100)}\big)/264 = (230 \pm 10)/264$, which is $0.909091$ or $0.833333$.
> - So $j = 10\%$ or $j = 20\%$. The signature changes sign twice, so it has two IRRs.
> - The NPV is positive only between them: it is 0.13 at 12% and 0.19 at 15%, but $-0.68$ at 5% and $-0.48$ at 25%.
> - Neither IRR says on its own whether the policy is worth writing at 12%. The decision rests on the NPV, or on a reserve at time 1 that removes the loss in year 2.

> [!trap] Solving with the profit vector instead of the signature
> The IRR solves the equation for the profit signature. Using the profit vector ignores the policies that leave, and when the later profits are positive it gives a rate that is too high.
