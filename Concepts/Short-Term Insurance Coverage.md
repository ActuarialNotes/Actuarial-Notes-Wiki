---
aliases:
  - Short-Term Insurance
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0fc9e6bce0398992b88a40eea8c7cc44354caf3153af812b2bbb7f875bee6df8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Short-Term Insurance Coverage.md
---
A **short-term insurance coverage** is an [[Insurance Coverage|insurance coverage]] written for a short term — usually one year or less — after which the [[Insurer|insurer]] may reprice, change or decline to renew it: property, liability, auto, workers compensation, group health. Because the premium covers one period's claims, the actuarial work is to model that period's aggregate losses, price the next term, and estimate what is still owed on terms already expired.

> $$S = X_1 + X_2 + \cdots + X_N$$

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q}$$

> $$\text{Unpaid} = \text{Ultimate} - \text{Paid}$$

- $S$ is the [[Aggregate Loss Model|aggregate loss]] for one term: $N$ claims ([[Frequency]]) of sizes $X_i$ ([[Severity]]), each net of [[Coverage Modifications|coverage modifications]] such as a [[Deductible|deductible]] or limit. $F$ is the fixed expense per exposure, $V$ the variable expense ratio and $Q$ the profit and contingencies provision ([[Pure Premium Method]], [[Loss Ratio Method]]).
- **Pricing.** Historical data are adjusted — losses [[Loss Development|developed]] and [[Trend|trended]], premium brought to current rate level ([[On-Leveling]]) — to produce the [[Overall Rate Level Indication|overall rate change]].
- **Reserving.** The period of cover is short but settlement is not: claims are reported and paid after the term ends, so the insurer holds [[Unpaid Claims|outstanding claims]] (case reserves plus [[IBNR]]), estimated by the [[Expected Loss Method|expected loss ratio]], [[Chain Ladder Method|chain-ladder]] and [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] methods, and [[Unearned Premium|unearned premium]] for the unexpired part of each term.
- Contrast with long-term coverages (life insurance, annuities), where premiums and benefits are fixed for decades and interest and mortality, not claim development, dominate.

> [!example]- Rate for an Auto Coverage With a Deductible {Example}
> Losses per exposure are Poisson with mean $0.08$; ground-up loss size is exponential with mean $\$5{,}000$. The coverage has a $\$1{,}000$ ordinary deductible. Fixed expenses are $\$25$ per exposure, variable expenses $20\%$ of premium and the profit provision $5\%$. The current rate is $\$440$. Find the indicated rate and rate change.
>
> > [!answer]-
> > For an exponential, the expected payment per loss is $E[(X - 1{,}000)_+] = 5{,}000\,e^{-0.2}$.
> >
> > $$
> > \begin{align*}
> > E[(X-1{,}000)_+] &= 5{,}000\,e^{-0.2} \\
> > &= 4{,}093.65 \\
> > \text{Pure premium} &= 0.08 \times 4{,}093.65 \\
> > &= 327.49 \\
> > \text{Indicated rate} &= \frac{327.49 + 25}{1 - 0.20 - 0.05} \\
> > &= 469.99 \\
> > \text{Indicated change} &= \frac{469.99}{440} - 1 \\
> > &= +6.8\%
> > \end{align*}
> > $$
> >
> > The current rate is about $6.8\%$ short of covering expected losses, expenses and profit.

> [!example]- Outstanding Claims Two Ways {Example}
> An accident year at $12$ months has earned premium $\$10{,}000{,}000$, paid claims $\$3{,}000{,}000$, a paid cumulative development factor to ultimate of $2.5$, and an expected loss ratio of $65\%$. Estimate outstanding claims by the chain-ladder and Bornhuetter-Ferguson methods.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{CL ultimate} &= 3{,}000{,}000 \times 2.5 \\
> > &= 7{,}500{,}000 \\
> > \text{CL outstanding} &= 7{,}500{,}000 - 3{,}000{,}000 \\
> > &= 4{,}500{,}000
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{BF outstanding} &= 0.65 \times 10{,}000{,}000 \times \left(1 - \tfrac{1}{2.5}\right) \\
> > &= 3{,}900{,}000
> > \end{align*}
> > $$
> >
> > Paid emergence is running ahead of expectation (chain-ladder ultimate loss ratio $75\%$ against $65\%$); BF gives that early emergence no weight in the unpaid portion, so it reserves $\$600{,}000$ less.

> [!tip]- How it appears on the exam
> - **FAM** (*use basic methods to calculate premiums and reserves for short-term insurance coverages*): an indicated rate or rate change by the loss cost or loss ratio method from adjusted data, or outstanding claims by expected loss ratio, chain-ladder or BF from a small triangle.
> - **FAM** pricing questions are often two-stage: compute the pure premium from a frequency-severity model with a coverage modification, then load it for expenses and profit.
> - **ASTAM** (*calculate reserves for short-term insurance coverages*): the same reserving methods at greater depth, including the reading on outstanding claims reserves, where the methods are compared and their variability assessed.

> [!warning]- Exam traps
> - **Loading fixed expenses in the denominator.** $F$ is added to the pure premium in the numerator; only variable expenses and profit go in $1 - V - Q$. Dividing $F$ by $1 - V - Q$ separately double-loads it.
> - **Ground-up severity in the pure premium.** With a deductible, use the expected payment per *loss*, $E[(X-d)_+]$, times loss frequency — or per-*payment* severity times the reduced payment frequency — never ground-up severity times loss frequency.
> - **BF ultimate versus BF outstanding.** BF outstanding is $\text{ELR} \times \text{EP} \times (1 - 1/\text{CDF})$; adding paid gives the ultimate. Answers that report one as the other are common distractors.
