---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:263507eac73610ae6e5f27c340f063217083f81cbaa372e4c57dda2e01712693
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Annuity Contract.md
---

An **Annuity Contract** is an insurance contract that pays a stream of income for as long as a life (or lives) survive, or for a period, in exchange for a single premium or a series of premiums. It may be **immediate** (income starts at once) or **deferred** (an accumulation phase first), and **fixed** (guaranteed amounts) or **variable** (amounts linked to a fund, often with guarantees). It is the product built on the [[Life Annuity|life annuity]] functions, and the insurer's main exposure is to [[Mortality|longevity]] and investment risk.

> $$G = \text{EPV(benefits)} + \text{EPV(expenses)}$$

> $$\text{Deferred: } \text{EPV} = B\;{}_nE_x\;\ddot{a}_{x+n}$$

- $G$ is the single premium set by the [[Equivalence Principle|equivalence principle]]; ${}_nE_x = v^n\,{}_np_x$ is the pure endowment factor and $\ddot{a}_{x+n}$ the annuity-due at the start of payout (use $\ddot{a}^{(12)}$ for monthly income). A [[Deferred Annuity|deferred annuity-certain]] is the non-life analogue
- **Product forms:** single premium immediate annuity (SPIA); deferred annuity with a cash value during accumulation and annuitization at the end; joint and last-survivor annuity on two lives; guaranteed-period annuity; [[Pension|pension]] annuities bought in a pension risk transfer; variable annuities with GMDB, GMMB, GMIB or GMWB guarantees whose [[Payoff|payoffs]] are valued with the [[Black-Scholes Model]]
- A return-of-premium death benefit during deferral, or a guaranteed period, adds an insurance element and raises the price; the insurer profit tests the contract on its own interest, mortality and expense basis
- Annuity blocks are long-dated and asset-intensive, which is why they are reinsured by asset-intensive coinsurance, funds withheld or longevity swaps ([[Reinsurance Transaction]])

> [!example]- Pricing a Single Premium Immediate Annuity {Example}
> A life aged 65 buys an annuity of $12{,}000$ a year payable annually in advance. On the pricing basis $\ddot{a}_{65} = 13.0$. Expenses are $\$200$ plus $3\%$ of the single premium, both at issue. Find the single premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > G &= 12{,}000(13.0) + 200 + 0.03G \\
> > G &= \frac{156{,}000 + 200}{0.97} \\
> > &= 161{,}030.93
> > \end{align*}
> > $$
> > The expected benefit cost is $\$156{,}000$; the remaining $\$5{,}031$ covers expenses.

> [!example]- Deferred Annuity With Return of Premium on Death {Example}
> A life aged 55 pays single premium $G$ for an annuity of $10{,}000$ a year, annually in advance from age 65. If the life dies before 65, $G$ (without interest) is returned at the end of the year of death. Mortality before 65 has a constant force $\mu = 0.01$, $i = 5\%$ and $\ddot{a}_{65} = 13.0$. Find $G$, and the cost of the refund feature.
>
> > [!answer]-
> > $p = e^{-0.01} = 0.990050$, $q = 0.009950$, so ${}_{10}E_{55} = v^{10}p^{10} = 0.613913(0.904837) = 0.555492$.
> > $$
> > \begin{align*}
> > A^{1}_{55:\overline{10}|} &= \sum_{k=0}^{9} v^{k+1}p^{k}q \\
> > &= \frac{qv\left(1 - (vp)^{10}\right)}{1 - vp} \\
> > &= 0.073777
> > \end{align*}
> > $$
> > The equivalence principle gives $G = 10{,}000\,{}_{10}E_{55}\,\ddot{a}_{65} + G\,A^{1}_{55:\overline{10}|}$:
> > $$
> > \begin{align*}
> > G &= \frac{10{,}000(0.555492)(13.0)}{1 - 0.073777} \\
> > &= \frac{72{,}213.92}{0.926223} \\
> > &= 77{,}966.00
> > \end{align*}
> > $$
> > Without the refund the premium would be $72{,}213.92$, so the return-of-premium death benefit costs $\$5{,}752$, about $8\%$ more.

> [!tip]- How it appears on the exam
> - **ALTAM** values annuity contracts on single and joint lives and in multiple state settings (for example CCRC contracts), and profit tests them: the profit vector and signature, NPV, IRR, profit margin and the premium or reserves for a given profit objective.
> - ALTAM's embedded-options objectives treat the variable annuity as an annuity contract carrying a guarantee: payoffs of GMDB, GMMB, GMIB and GMWB, their Black-Scholes values and the delta hedge.
> - **CP-341** asks to describe and evaluate reinsurance transactions for annuity contracts: asset-intensive coinsurance, funds withheld, pension risk transfer and longevity swaps, and why insurers cede annuity blocks offshore.

> [!warning]- Exam traps
> - Pricing a return-of-premium benefit as if $G$ were known: the refund is a fraction of the premium being solved for, so $G$ appears on both sides and the answer divides by $1 - A^1$.
> - Using $a_{65}$ when payments are in advance, which drops the first payment, or an annual $\ddot{a}_{65}$ for monthly income in advance, which overstates the EPV by about $11/24$ of a year's income ($\ddot{a}^{(12)}_{65} \approx \ddot{a}_{65} - 11/24$ under UDD).
> - Applying the deferral survival probability twice. ${}_nE_x$ already includes ${}_np_x$, and $\ddot{a}_{x+n}$ starts from age $x+n$, so no further survival factor is needed.
