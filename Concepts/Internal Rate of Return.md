---
aliases:
  - Internal Rate
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:86feb3a229f28798f77a7db4697199fbc6c300d3a47841aa1d8bd5058334f324
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Internal Rate of Return.md
---

**The Internal Rate of Return** (IRR) of a policy is the interest rate $j$ at which the [[Net Present Value|net present value]] of its [[Profit Signature|profit signature]] is zero. It is the return the policy is expected to earn on the money the shareholders put in at issue, and in [[Profit Testing|profit testing]] the policy meets the shareholders' requirement when its IRR is at least the risk discount rate. The calculation is the one behind the [[Yield Rate|yield rate]] and the [[Rate of Return|rate of return]] in Exam FM, applied to expected profits rather than to fixed cash flows.

> $$\sum_{t=0}^{n} \Pi_t\,(1+j)^{-t} = 0$$

- **Symbols:** Following Dickson, Hardy & Waters, $\Pi_t$ is the expected profit at time $t$ per policy issued, and $j$ is the IRR. The risk discount rate $r$ is the benchmark the IRR is compared with.
- **One sign change:** When the signature is negative at issue and positive afterward, the NPV falls steadily as the rate rises, so there is exactly one IRR. The NPV at $r$ is then positive exactly when $j > r$, and the NPV and IRR give the same decision.
- **Existence and uniqueness:** The number of IRRs is at most the number of sign changes in the signature. A signature that turns negative again late in the term can have two IRRs or none, and one with no negative entry has none. Zeroized reserves remove the late negative entries, which leaves a single sign change and a unique IRR.
- **Against the other measures:** The IRR does not depend on the risk discount rate, which makes it easy to compare with a hurdle rate. It ignores the size of the policy, so the NPV and the [[Profit Margin|profit margin]] are reported with it.

> [!example]- IRR of a 5-Year Term Insurance {Example}
> A 5-year term insurance on $(60)$ has the profit signature $(-250,\ 90.59,\ 90.14,\ 92.66,\ 88.95,\ 89.83)$, worked out in [[Profit Testing]], and an NPV of 93.00 at a risk discount rate of 10%. Find the IRR by interpolating between 22% and 24%, and compare it with the risk discount rate.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{NPV}(22\%) &= -250 + \frac{90.59}{1.22} + \frac{90.14}{1.22^2} + \cdots + \frac{89.83}{1.22^5} \\
> > &= 9.23 \\
> > \text{NPV}(24\%) &= -1.46 \\
> > j &\approx 0.22 + 0.02\left(\frac{9.23}{9.23 + 1.46}\right) \\
> > &= 0.2373
> > \end{align*}
> > $$
> > Solving the equation exactly gives $j = 23.72\%$. The signature changes sign only once, so this is the only IRR, and since it is well above the 10% risk discount rate, the NPV at 10% is positive, as the profit test found.

> [!example]- Two Rates of Return from One Signature {Example}
> A policy holds no reserve. It shows a large profit in its first year and a loss in its second, and its profit signature per policy issued is $(-100,\ 230,\ -132)$. Find every IRR, and say what they imply at a risk discount rate of 12%.
>
> > [!answer]-
> > Write $v = 1/(1+j)$ and solve the quadratic $-100 + 230v - 132v^2 = 0$.
> > $$
> > \begin{align*}
> > v &= \frac{230 \pm \sqrt{230^2 - 4(132)(100)}}{2(132)} \\
> > &= \frac{230 \pm 10}{264} \\
> > &= 0.909091 \ \text{or} \ 0.833333 \\
> > j &= 10\% \ \text{or} \ 20\%
> > \end{align*}
> > $$
> > The signature changes sign twice, so it has two IRRs. The NPV is positive only between them: it is 0.13 at 12% and 0.19 at 15%, but $-0.68$ at 5% and $-0.48$ at 25%. Neither IRR says on its own whether the policy is worth writing at 12%, so the decision rests on the NPV, or on a reserve at time 1 that removes the loss in year 2.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate and interpret the IRR of a profit signature, alongside its NPV, profit margin and discounted payback period, for traditional, [[Universal Life Insurance|universal life]] and [[Equity-Linked Insurance|equity-linked]] policies.
> - **Solving for the rate:** For a long signature, the IRR is found numerically, by trial rates and interpolation or with a calculator's cash-flow function. A short signature may reduce to a quadratic in $v$.
> - **Interpretation:** Questions ask whether the policy meets a hurdle rate, or why the IRR is not unique for a given signature.

> [!warning]- Exam traps
> - **Signature, not vector:** The IRR solves the equation for the profit signature. Using the profit vector ignores the policies that leave, and when the later profits are positive it gives a rate that is too high.
> - **Checking the sign changes:** Before reporting an IRR, count the sign changes in the signature. A root found by a calculator may be one of two, and a signature that never turns positive has no IRR at all.
> - **Interpolation error:** Linear interpolation between two trial rates only approximates the IRR. The trial rates should bracket the root closely, and the exact root may differ in the second decimal place of a percentage.
> - **The rate's role:** The IRR is an output of the test, while the risk discount rate is an input set by the shareholders. Using the IRR as the discount rate makes the NPV zero by construction and says nothing about value.
