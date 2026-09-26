---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fe5644b3ddccefaf9072768da2bfd2dd53de0e772bfac72513221ee809903b44
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policyholder.md
---

**A policyholder** is the person or organisation that buys an [[Insurance Policy|insurance policy]], pays its [[Insurance Premium|premium]] and holds the rights under it. The [[Insurer|insurer]] pays covered [[Claim|claims]] to the policyholder or on its behalf. On Exam P, the policyholder keeps whatever part of a loss $X$ the insurer's payment $Y$ does not cover.

> $$X = Y + (X - Y)$$

> $$Y = \min\!\big(c\,(X - d)^+,\ u\big)$$

- $X$ is the ground-up [[Loss Random Variable|loss]], $Y$ the insurer's [[Payment|payment]], and $X - Y$ the amount the policyholder retains. $d$ is the [[Deductible|deductible]], $c$ the insurer's [[Coinsurance Percentage|coinsurance percentage]] and $u$ the [[Benefit Limit|benefit limit]] (the maximum payment). Check the [[Policy Information|policy information]] for the order in which the terms apply. With coinsurance, capping the loss at $u$ and capping the payment at $u$ give different answers.
- The policyholder retains three things: the deductible, its coinsurance share $(1-c)(X-d)$, and anything above the limit. Deductibles and coinsurance are there to keep that share meaningful. They remove the cost of handling small claims and curb [[Moral Hazard|moral hazard]].
- **Inflation is leveraged.** With a fixed $d$, the deductible part of the policyholder's share doesn't grow with the loss, so the insurer's payment grows faster than the loss does. Once the limit binds, the policyholder absorbs all further growth ([[Inflation]]).
- **Policyholder, insured and claimant can be different people.** A parent's auto policy covers a child who drives it. A liability claim is brought by a third party and paid on the policyholder's behalf. A life policy's owner, insured life and beneficiary can be three separate people.
- In a mutual insurer the policyholders are also the owners. In any insurer they are the largest creditors, and protecting them is the purpose of [[Solvency Regulation|solvency regulation]].

> [!example]- Splitting Two Losses Before and After Inflation {Example}
> A policy has a $\$500$ deductible, $80\%$ coinsurance and a maximum payment of $\$8{,}000$. This year the policyholder has losses of $\$6{,}000$ and $\$12{,}000$. Next year every loss is $10\%$ larger.
>
> Split each loss between insurer and policyholder in both years.
>
> > [!answer]-
> > **The $\$6{,}000$ loss:**
> >
> > $$
> > \begin{align*}
> > Y_{\text{now}} &= 0.80 \times (6{,}000 - 500) \\
> > &= 4{,}400 \\[4pt]
> > Y_{\text{next}} &= 0.80 \times (6{,}600 - 500) \\
> > &= 4{,}880
> > \end{align*}
> > $$
> >
> > The policyholder keeps $\$1{,}600$ this year and $\$1{,}720$ next year. The insurer's payment rises $10.9\%$ and the policyholder's share rises $7.5\%$.
> >
> > **The $\$12{,}000$ loss:**
> >
> > $$
> > \begin{align*}
> > Y_{\text{now}} &= \min(0.80 \times 11{,}500,\ 8{,}000) \\
> > &= 8{,}000 \\[4pt]
> > Y_{\text{next}} &= \min(0.80 \times 12{,}700,\ 8{,}000) \\
> > &= 8{,}000
> > \end{align*}
> > $$
> >
> > The policyholder keeps $\$4{,}000$, then $\$5{,}200$, a $30\%$ increase. Below the limit, inflation lands mostly on the insurer. Above it, all of the inflation lands on the policyholder.

> [!example]- Expected Amount the Policyholder Retains {Example}
> A policyholder's loss is exponential with mean $\$1{,}000$. The policy has a $\$250$ deductible and no other terms.
>
> Find the insurer's expected payment and the policyholder's expected retained loss.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[Y] &= \int_{250}^{\infty} (x - 250)\,\frac{1}{1000}\,e^{-x/1000}\,dx \\
> > &= 1000\,e^{-0.25} \\
> > &= 778.80
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > E[X - Y] &= E[X] - E[Y] \\
> > &= 1000 - 778.80 \\
> > &= 221.20
> > \end{align*}
> > $$
> >
> > This is $E[X \wedge 250]$, the [[Limited Expected Value|limited expected value]] at the deductible. The deductible removes $22.1\%$ of expected loss. A share $1 - e^{-0.25} = 22.1\%$ of all losses produce no claim payment at all.
