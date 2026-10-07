---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:14af64bd13ca9506bf1183fd95ba258a05c3f7c07734fb7a9de0b42bcd92299a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Coverage.md
---

An **insurance coverage** is the protection an [[Insurance Policy|insurance policy]] provides: the insured event, the benefit the [[Insurer|insurer]] pays when it occurs, the period over which the promise runs, and the limits, exclusions and conditions that bound it. Every coverage is either an **indemnity** — it reimburses a measured loss — or a **fixed benefit** — it pays a stated amount when the event happens.

> $$0 \le Y = g(X) \le X$$

> $$Y = b \cdot \mathbf{1}\{\text{insured event occurs}\}$$

- $X$ is the loss the event causes and $g$ the payment function set by the [[Deductible|deductible]], [[Coinsurance|coinsurance]] and limits ([[Coverage Modifications]]); indemnity never pays more than the loss. A fixed benefit $b$ — a life insurance sum insured, a monthly disability income — is paid whatever the loss, which is why it needs [[Insurable Interest|insurable interest]] and underwriting of the amount rather than loss adjustment.
- **Short-term coverages** ([[Short-Term Insurance Coverage]]) — property, liability, auto, group health — run a year or less and are repriced at renewal, so the work is in frequency, severity and outstanding claims.
- **Long-term coverages** — [[Life Insurance|life insurance]] (whole life, term, endowment), [[Annuity Contract|annuities]], long-term health and disability cover, and [[Defined Benefit Plan|defined benefit]] and [[Defined Contribution Plan|defined contribution]] [[Pension Plan|pension plans]] — fix premiums and benefits for many years, so interest and survival dominate and the insurer must hold [[Reserve|reserves]].
- The same event can be covered either way: a hospital stay can trigger an expense-reimbursing indemnity and a fixed daily cash benefit at once.

> [!example]- Indemnity Versus Fixed Benefit for One Illness {Example}
> A policyholder incurs $\$12{,}000$ of medical expenses. Her medical expense coverage has a $\$1{,}000$ deductible and pays $80\%$ above it; she also holds a critical illness policy paying a fixed $\$25{,}000$ on diagnosis. What does each coverage pay?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > Y_{\text{medical}} &= 0.80\,(12{,}000 - 1{,}000) \\
> > &= \$8{,}800 \\
> > Y_{\text{critical illness}} &= \$25{,}000
> > \end{align*}
> > $$
> >
> > The indemnity leaves her $\$3{,}200$ of the expense and could never pay more than $\$12{,}000$; the fixed benefit pays $\$25{,}000$ regardless of what the illness cost.

> [!example]- How Coverage Design Moves the Cost {Example}
> For a life aged $x$, $q_x = 0.010$, $q_{x+1} = 0.012$, $q_{x+2} = 0.015$ and $i = 5\%$. Compare the expected present value of a 3-year term insurance and a 3-year endowment insurance, each with sum insured $\$100{,}000$ payable at the end of the year of death (and, for the endowment, on survival to $x+3$).
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Term} &= 100{,}000\big[v q_x + v^2 p_x q_{x+1} + v^3\, {}_2p_x\, q_{x+2}\big] \\
> > &= 952.38 + 1{,}077.55 + 1{,}267.41 \\
> > &= \$3{,}297.34
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > {}_3p_x &= (0.990)(0.988)(0.985) \\
> > &= 0.963448 \\
> > \text{Pure endowment} &= 100{,}000\, v^3 (0.963448) \\
> > &= \$83{,}226.28 \\
> > \text{Endowment} &= 3{,}297.34 + 83{,}226.28 \\
> > &= \$86{,}523.62
> > \end{align*}
> > $$
> >
> > The death cover is the same in both; adding the survival benefit makes the endowment cost 26 times the term, because it pays with near certainty — it is mostly a savings contract.

> [!tip]- How it appears on the exam
> - **FAM** (*understand the key features of insurance coverages and retirement financial security programs*): identify which long-term coverage — whole life, term, endowment, annuity, health, DB or DC pension — fits a described need, or what a given contract pays under a stated scenario.
> - The same section opens with insurable interest, so a question may combine the two: who can buy the coverage, and what it pays.
> - The calculation side is in the rest of FAM: the present value random variables, premiums and policy values for these coverages, and coverage modifications for the short-term ones.

> [!warning]- Exam traps
> - **Treating a fixed benefit as an indemnity.** A life or critical illness benefit is not reduced to the "loss" the event caused; capping it at expenses is wrong.
> - **Mixing up term and endowment.** Term pays only on death within the term; endowment also pays on survival to the end, so an answer that gives the endowment a zero survival payout (or the term one) has swapped them.
> - **DB versus DC risk-bearer.** In a defined benefit plan the sponsor bears investment and longevity risk; in a defined contribution plan the member does. Reversing them is the usual written-answer slip.
