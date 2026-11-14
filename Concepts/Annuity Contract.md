---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ab70f0f150eb6b55c972d56c75d70a55fc6bc82acd3725bda649cbfbd45aef48
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Annuity Contract.md
---

An **Annuity Contract** is an insurance contract that pays a stream of income for as long as a life (or lives) survive, or for a period, in exchange for a single premium or a series of premiums. It may be **immediate** (income starts at once) or **deferred** (an accumulation phase first), and **fixed** (guaranteed amounts) or **variable** (amounts linked to a fund, often with guarantees).

It is the product built on the [[Life Annuity|life annuity]] functions, and the insurer's main exposures are [[Mortality|longevity]] and investment risk. By the [[Equivalence Principle|equivalence principle]], the single premium $G$ is

> $$G = \text{EPV(benefits)} + \text{EPV(expenses)}$$

An expense set as a percentage of the premium makes $G$ appear on both sides, and the equation is solved for it.

> [!example]- What is the single premium for this immediate annuity? {Example}
> A life aged 65 buys an annuity of $\$12{,}000$ a year payable annually in advance. On the pricing basis $\ddot{a}_{65} = 13.0$. Expenses are $\$200$ plus 3% of the single premium, both at issue.
>
> > [!answer]-
> > - The EPV of the benefits is $12{,}000(13.0) = \$156{,}000$.
> > - The equation of value is $G = 156{,}000 + 200 + 0.03G$.
> > - $G = 156{,}200/0.97 = \$161{,}030.93$.
> > - The remaining $\$5{,}031$ covers expenses.

## Deferred annuities

An annuity of $B$ a year, payable in advance from age $x + n$ to a life now aged $x$, has EPV

> $$\text{EPV} = B\;{}_nE_x\;\ddot{a}_{x+n}$$

- ${}_nE_x = v^n\,{}_np_x$ is the [[Pure Endowment|pure endowment]] factor.
- $\ddot{a}_{x+n}$ is the annuity-due at the start of payout.

${}_nE_x$ already includes the survival to $x + n$, and $\ddot{a}_{x+n}$ starts from that age, so no further survival factor is needed. A [[Deferred Annuity|deferred annuity-certain]] is the non-life analogue.

## Income paid monthly

Income paid monthly in advance is valued with the monthly annuity-due $\ddot{a}^{(12)}_{x}$, in units of 1 a year. Under UDD it is approximately

> $$\ddot{a}^{(12)}_{x} \approx \ddot{a}_{x} - \frac{11}{24}$$

Using the annual $\ddot{a}_{65}$ for monthly income overstates the EPV by about $11/24$ of a year's income.

## Return of premium on death

A return-of-premium death benefit during deferral, or a guaranteed period, adds an insurance element and raises the price. When the premium itself is refunded at the end of the year of death in the deferral period, it is a fraction of the premium being solved for. The premium is then

> $$G = \frac{B\;{}_nE_x\;\ddot{a}_{x+n}}{1 - A^{1}_{x:\overline{n}|}}$$

- $A^{1}_{x:\overline{n}|}$ is the EPV of 1 paid at the end of the year of death within $n$ years.

> [!example]- What is the single premium for this deferred annuity, and what does the refund feature cost? {Example}
> A life aged 55 pays a single premium $G$ for an annuity of $\$10{,}000$ a year, annually in advance from age 65. If the life dies before 65, $G$ is returned without interest at the end of the year of death. Mortality before 65 has a constant force $\mu = 0.01$, $i = 5\%$ and $\ddot{a}_{65} = 13.0$.
>
> > [!answer]-
> > - Under a constant force, $p = e^{-0.01} = 0.990050$ and $q = 0.009950$.
> > - ${}_{10}E_{55} = v^{10}p^{10} = 0.613913(0.904837) = 0.555492$.
> > - $A^{1}_{55:\overline{10}|} = \sum_{k=0}^{9} v^{k+1}p^{k}q = \dfrac{qv\left(1 - (vp)^{10}\right)}{1 - vp} = 0.073777$.
> > - The EPV of the annuity is $10{,}000(0.555492)(13.0) = \$72{,}213.92$.
> > - $G = 72{,}213.92/(1 - 0.073777) = 72{,}213.92/0.926223 = \$77{,}966.00$.
> > - Without the refund the premium would be $\$72{,}213.92$, so the return-of-premium death benefit costs $\$5{,}752$, about 8% more.

## Product forms

The forms include the single premium immediate annuity (SPIA), the deferred annuity with a cash value during accumulation and annuitization at the end, the joint and last-survivor annuity on two lives, the guaranteed-period annuity, and [[Pension|pension]] annuities bought in a pension risk transfer.

A variable annuity may carry a GMDB, GMMB, GMIB or GMWB guarantee, whose [[Payoff|payoffs]] are valued with the [[Black-Scholes Model]]. The insurer profit tests the contract on its own interest, mortality and expense basis. Annuity blocks are long-dated and asset-intensive, which is why they are reinsured by asset-intensive coinsurance, funds withheld or longevity swaps ([[Reinsurance Transaction]]).

> [!trap] Using an annuity-immediate for payments in advance
> Income paid annually in advance is valued with $\ddot{a}_{65}$. Using $a_{65}$ drops the first payment: $\$12{,}000$ of EPV in the immediate annuity example.
