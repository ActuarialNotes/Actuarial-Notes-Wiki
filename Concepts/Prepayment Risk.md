---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3d2f5fe6f1fd5ee1f32049e321b2924047bb0596dfb530a06c54c3258041f929
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Prepayment Risk.md
---

**Prepayment Risk** is the risk that borrowers repay principal earlier than scheduled — usually because interest rates have fallen and [[Refinancing|refinancing]] has become attractive — leaving the investor to reinvest at lower yields and capping the asset's price gain. It dominates the risk of mortgage-backed and other amortizing securities; [[Callable Bond|callable bonds]] carry the same exposure through the issuer's call. Its mirror image, **extension risk**, is repayment slowing when rates rise.

> $$\text{CPR} = 1 - (1 - \text{SMM})^{12}$$

> $$\text{Prepayment}_t = \text{SMM}_t \times \bigl(B_{t-1} - \text{Scheduled principal}_t\bigr)$$

- **SMM** (single monthly mortality) is the fraction of the remaining balance prepaid in a month; **CPR** (conditional prepayment rate) is its annualised equivalent; $B_{t-1}$ is the pool balance at the start of month $t$. The PSA benchmark ($100\%$ PSA) assumes a CPR of $0.2\%$ in month 1, rising $0.2\%$ a month to $6\%$ at month 30 and level thereafter; $200\%$ PSA doubles every rate.
- **The investor is short an option.** Each borrower holds a call: the right to repay at par. When rates fall prepayments speed up and principal comes back at par just when it can only be reinvested at lower yields ([[Reinvestment Risk]]); when rates rise prepayments slow and the security lengthens just as its value falls. Both moves hurt, which is **negative convexity**: the price rises less than it falls.
- **Measure with effective duration.** Because the cash flows depend on rates, cash-flow durations mislead. Reprice at $\pm\Delta y$ under a prepayment model: $D_{\text{eff}} = (P_- - P_+)/(2P_0\,\Delta y)$ and $C_{\text{eff}} = (P_- + P_+ - 2P_0)/(P_0\,\Delta y^2)$.
- **Why it matters to an insurer.** Mortgage-backed securities are widely held for their yield spread, which is partly payment for the option sold. Their duration shortens as rates fall, opening a mismatch against the liabilities, so [[Interest Rate Risk]] management must use effective rather than stated durations. Tranching — sequential-pay classes, planned amortization classes — reallocates prepayment risk among investors; see [[Structured Finance]].
- **Where it sits.** The Exam 9 syllabus lists prepayment beside default and reinsurance under [[Credit Risk]]: like default, it is the borrower's behaviour changing the cash flows the insurer receives — but it is driven by interest rates, not by inability to pay, so it is usually measured and hedged as part of interest rate risk.

> [!example]- Converting CPR and Projecting One Month's Prepayment {Example}
> A mortgage pool has a balance of $\$200$M at the start of the month and scheduled principal of $\$400{,}000$. It is seasoned past month 30 and prepays at $100\%$ PSA. Find the SMM and the month's prepayment.
>
> > [!answer]-
> > At $100\%$ PSA after month 30, $\text{CPR} = 6\%$.
> >
> > $$
> > \begin{align*}
> > \text{SMM} &= 1 - (1 - 0.06)^{1/12} \\
> > &= 0.005143 \\
> > \text{Prepayment} &= 0.005143 \times (200{,}000{,}000 - 400{,}000) \\
> > &= \$1{,}026{,}545
> > \end{align*}
> > $$
> >
> > The pool returns about $\$1.03$M of unscheduled principal this month — more than two and a half times the scheduled amount. At $200\%$ PSA (a $12\%$ CPR, as in a refinancing wave) it would be roughly double, and all of it must be reinvested at the lower prevailing yield.

> [!example]- Negative Convexity of a Mortgage-Backed Security {Example}
> An MBS is priced at $100$. Under the prepayment model it is worth $103$ if yields fall $1\%$ and $95$ if they rise $1\%$. Find its effective duration and convexity and compare with an option-free bond of the same duration and convexity $+20$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > D_{\text{eff}} &= \frac{103 - 95}{2(100)(0.01)} \\
> > &= 4.0 \\
> > C_{\text{eff}} &= \frac{103 + 95 - 2(100)}{100(0.01)^2} \\
> > &= -200
> > \end{align*}
> > $$
> >
> > Using $\Delta P/P \approx -D\,\Delta y + \tfrac{1}{2}C\,(\Delta y)^2$, the option-free bond gains $4.1\%$ when yields fall and loses $3.9\%$ when they rise. The MBS gains $3\%$ and loses $5\%$: the borrowers' refinancing option takes the upside away. Matched to liabilities on duration alone, the MBS would leave the insurer short convexity — hurt by a large rate move in either direction.
