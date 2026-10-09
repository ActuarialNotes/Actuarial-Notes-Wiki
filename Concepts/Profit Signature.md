---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1748897b1d28d95a4c381653f705f9f3d7c891ed314f33558f824c9163fb4bcc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Signature.md
---

**The Profit Signature** $\Pi = (\Pi_0, \Pi_1, \dots, \Pi_n)$ is the profit expected to emerge at the end of each year of a policy, per policy issued. Each entry is the [[Profit Vector|profit vector]] entry for that year times the probability that the policy is still in force at the start of the year. Because the signature is measured from the issue date, its present value at the risk discount rate is the policy's [[Net Present Value|net present value]], and the [[Internal Rate of Return|internal rate of return]], [[Profit Margin|profit margin]] and [[Discounted Payback Period|discounted payback period]] are all read from it.

> $$\Pi_0 = \mathrm{Pr}_0$$

> $$\Pi_t = {}_{t-1}p_x\,\mathrm{Pr}_t$$

> $$\text{NPV} = \sum_{t=0}^{n} \Pi_t\,(1+r)^{-t}$$

- **Symbols:** Following Dickson, Hardy & Waters, ${}_{t-1}p_x$ is the probability that a policy issued at age $x$ is still in force at time $t-1$, and $r$ is the risk discount rate. When policies can also [[Lapse|lapse]], the survival factor is ${}_{t-1}p_x^{(\tau)}$ from a [[Multiple Decrement Model|multiple decrement model]], the probability of surviving every decrement.
- **Why the signature is discounted:** $\mathrm{Pr}_t$ assumes the policy reached the start of year $t$, but the insurer commits its capital at issue, when it does not know which policies will survive. Weighting each year's profit by the chance of reaching it gives the expected profit per policy issued, which is the quantity whose present value the shareholders care about.
- **Its shape:** A typical signature is negative at time 0, because of the expenses paid at issue, and positive afterward. Reserves move profit later, and a signature that turns negative again after it has turned positive can have more than one internal rate of return.

> [!example]- From the Profit Vector to the Signature and the NPV {Example}
> A 5-year term insurance on $(60)$ has the profit vector $(-250,\ 90.59,\ 90.45,\ 93.33,\ 89.97,\ 91.30)$, worked out in [[Profit Testing]]. Mortality follows the SULT at 5%, so ${}_{t-1}p_{60}$ for $t = 1$ to $5$ is $1$, $0.996602$, $0.992823$, $0.988619$ and $0.983943$. Find the profit signature and the NPV at a risk discount rate of 10%. Then find the value you would get by discounting the profit vector instead.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Pi_2 &= 0.996602(90.45) \\
> > &= 90.14 \\
> > \Pi_3 &= 0.992823(93.33) \\
> > &= 92.66 \\
> > \Pi_4 &= 0.988619(89.97) \\
> > &= 88.95 \\
> > \Pi_5 &= 0.983943(91.30) \\
> > &= 89.83
> > \end{align*}
> > $$
> > With $\Pi_0 = -250$ and $\Pi_1 = 90.59$, the signature is $(-250,\ 90.59,\ 90.14,\ 92.66,\ 88.95,\ 89.83)$. Discounting each entry at 10% gives $82.35 + 74.50 + 69.62 + 60.75 + 55.78 = 343.00$, so the NPV is $343.00 - 250 = 93.00$.
> >
> > Discounting the profit vector instead gives 95.37. That figure counts the profit of every policy in every year, including the policies that have already ended in a death, so it overstates the NPV by 2.37.

> [!example]- Expected Profit from a Block of 1,000 Policies {Example}
> The insurer issues 1,000 of the term policies above. Find the total profit expected at time 3, and check it against the number of policies expected to be in force at the start of year 3.
>
> > [!answer]-
> > The signature is per policy issued, so the block's expected profit at time 3 is $1{,}000\,\Pi_3 = 1{,}000(92.66) = 92{,}660$. The same figure comes from the profit vector, since $1{,}000\,{}_2p_{60} = 992.82$ policies are expected to be in force at the start of year 3 and each earns $\mathrm{Pr}_3 = 93.33$.
> > $$
> > \begin{align*}
> > 992.82 \times 93.33 &= 92{,}660
> > \end{align*}
> > $$
> > The block costs \$250,000 in initial expenses at issue, and its NPV at 10% is $1{,}000 \times 93.00 = \$93{,}000$.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate the profit signature from a profit vector and a life table or a multiple decrement table, and then the NPV, internal rate of return, profit margin or discounted payback period from it.
> - **Interpretation:** Questions also ask what the signature's shape says about the policy, such as how long the initial expenses take to recover or why a negative entry late in the term needs a reserve.
> - **All three product types:** The same step appears in the profit tests of traditional, [[Universal Life Insurance|universal life]] and [[Equity-Linked Insurance|equity-linked]] policies.

> [!warning]- Exam traps
> - **The survival index:** $\Pi_t$ uses ${}_{t-1}p_x$, the probability of being in force at the start of year $t$, because $\mathrm{Pr}_t$ already allows for deaths during the year. Using ${}_tp_x$ removes the year's deaths twice.
> - **Time 0:** $\Pi_0 = \mathrm{Pr}_0$ with no survival factor, because every policy issued pays its initial expenses.
> - **Lapses:** When the policy has a lapse decrement, the survival factor must allow for both deaths and lapses. Using the life table alone keeps lapsed policies in the signature.
> - **Discounting the vector:** The NPV is the present value of the signature, not of the profit vector. Discounting the vector overstates the NPV whenever later profits are positive.
