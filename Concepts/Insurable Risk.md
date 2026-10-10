---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9714fb86621547b10c5fb797de79e7f6fedfcb50c3afeef44a5b0aa7855138b0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurable Risk.md
---

**Insurable Risk** is a [[Loss Exposure|loss exposure]] that private insurers can cover on a sound commercial basis because it has the characteristics of an ideally insurable loss exposure. The Institutes list six: it involves pure risk, its losses are accidental, they are definite and measurable, it is one of a large number of similar exposure units, it is independent of the others and not catastrophic, and it can be covered for an economically feasible premium. Few real exposures meet all six, so the list is a benchmark for judging how well, and on what terms, an exposure can be insured.

> $$\text{CV}\big(\bar X_n\big) = \frac{\sigma}{\mu}\sqrt{\frac{1 + (n-1)\rho}{n}}$$

> $$P = \frac{p \times L}{1 - e}$$

- **Symbols:** In the first block, $\bar X_n$ is the average loss per exposure unit over $n$ similar units, $\mu$ and $\sigma$ are the mean and standard deviation of one unit's loss, and $\rho$ is the correlation between the losses of any two units. In the second, $p$ is the probability of a loss in the year, $L$ is its size, $e$ is the share of the premium needed for expenses and profit, and $P$ is the premium that results.
- **Pure risk:** The exposure must offer only the chance of loss or no loss, as a fire or a theft does. Speculative risk, such as an investment or a business venture that could also produce a gain, is not insured, because the insured controls it and could profit from it.
- **Accidental:** Losses must be fortuitous from the insured's standpoint, neither intended nor certain. An insurer that paid for intentional losses would invite [[Moral Hazard|moral hazard]], and one that paid for certain losses, such as wear and tear, would simply be prepaying a known cost with expenses added.
- **Definite and measurable:** The insurer must be able to tell when a loss happened, where, and how much it cost. Without that it cannot settle claims or collect the data it needs to price them.
- **Large number of similar exposure units:** Pooling many similar, independent units makes the average loss predictable, which is the [[Law of Large Numbers|law of large numbers]]. With $\rho = 0$ the first block falls like $1/\sqrt{n}$, so a large pool needs little capital per unit beyond its expected loss.
- **Independent and not catastrophic:** When losses are correlated the first block does not fall to zero but to $(\sigma/\mu)\sqrt{\rho}$, so pooling stops reducing the uncertainty. One event that strikes many units at once, such as a hurricane or a war, can exceed the insurer's capital, which is [[Catastrophe Risk|catastrophe risk]].
- **Economically feasible premium:** The second block shows why a frequent loss is hard to insure. When $p$ is high the premium approaches or exceeds the loss itself, and the insured is better off retaining it. The premium must also be one the people exposed can afford and will pay, or only the worst risks buy, which is [[Adverse Selection|adverse selection]].
- **Not the same as insurable interest:** Insurable risk is about the exposure, and [[Insurable Interest|insurable interest]] is about the buyer, who must suffer a financial loss if the event occurs. A policy needs both.

> [!example]- Testing Three Exposures Against the List {Example}
> A homeowner asks about insuring three exposures: a fire destroying the house, a river flood damaging it, and damage caused by a war. Test each against the six characteristics and say how each is usually handled.
>
> > [!answer]-
> > - **Fire:** Fire is a pure risk, accidental unless the insured sets it, and definite in time and amount. Millions of similar homes are exposed, most fires strike one home at a time, and the premium is small relative to the house's value. It meets all six, which is why fire is the core of every [[Homeowners Policy|homeowners policy]].
> > - **Flood:** Flood is pure, accidental and measurable, but it fails two tests. One flood damages every home in the floodplain at once, so losses are neither independent nor free of catastrophe. The owners most likely to buy are those in the floodplain, so the premium for the pool that would buy it is high, and adverse selection follows. Standard homeowners forms exclude it, and it is written separately, often with government backing ([[Flood Insurance]]).
> > - **War:** War damage is catastrophic, and its probability and timing cannot be measured from any pool of past experience. A single war could exceed the capital of every insurer in the market. Property and liability forms exclude war, and the losses fall to governments.

> [!example]- How Correlation Defeats Pooling {Example}
> An insurer writes 10,000 homes, each worth \$200,000. Each home has an independent 0.2% chance a year of being destroyed by fire. In addition, 4,000 of the homes sit in one river valley, and a flood that destroys all 4,000 at once has a 1% chance a year. Compare the expected loss and the coefficient of variation of the annual loss for the two perils.
>
> > [!answer]-
> > Fire losses are independent, so the number of homes lost is binomial.
> > $$
> > \begin{align*}
> > E[S_{\text{fire}}] &= 10{,}000(0.002)(200{,}000) \\
> > &= 4{,}000{,}000 \\
> > \text{SD}[S_{\text{fire}}] &= 200{,}000\sqrt{10{,}000(0.002)(0.998)} \\
> > &= 893{,}532 \\
> > \text{CV}_{\text{fire}} &= 0.223
> > \end{align*}
> > $$
> > The flood is one event, so the 4,000 valley homes are perfectly correlated, $\rho = 1$, and the pool behaves like a single unit of \$800,000,000.
> > $$
> > \begin{align*}
> > E[S_{\text{flood}}] &= 0.01(800{,}000{,}000) \\
> > &= 8{,}000{,}000 \\
> > \text{SD}[S_{\text{flood}}] &= 800{,}000{,}000\sqrt{0.01(0.99)} \\
> > &= 79{,}598{,}995 \\
> > \text{CV}_{\text{flood}} &= 9.95
> > \end{align*}
> > $$
> > The flood's expected cost is only \$800 a home a year, so the premium is affordable. The problem is the catastrophe: in a flood year the insurer owes \$800,000,000, a hundred times the expected annual flood loss, and writing more valley homes would not reduce that. The fire pool's annual loss has a standard deviation under a quarter of its \$4,000,000 mean, and doubling the pool would cut that share by about 30%.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is to describe the characteristics of an ideally insurable loss exposure. Questions ask for the list, or give an exposure, such as flood, earthquake, war, a business's market losses or wear and tear, and ask which characteristics it fails and why.
> - **Applied reasoning:** A question can ask why an exposure that fails a test is still insured, through government programs, excess layers, catastrophe reinsurance or careful pricing, so a candidate should tie each failure to the mechanism that works around it.
> - **Related objectives:** The list sits beside [[Insurable Interest|insurable interest]] and the characteristics of [[Insurance Policy|insurance policies]], so expect it to be paired with those in the same question set.

> [!warning]- Exam traps
> - **Affordable is not enough:** A flood or earthquake premium can be modest per home and the exposure still fail, because the losses are correlated. Judging insurability on the expected loss alone misses the catastrophe test.
> - **Pure versus speculative:** A business's chance of a loss from a falling market price is speculative risk, because the same exposure can produce a gain. It is not insurable even though the loss is measurable.
> - **Accidental from whose standpoint:** The test is fortuitous from the insured's standpoint. A loss the insured causes on purpose fails it, but a loss a third party causes on purpose, such as vandalism, does not.
> - **Insurable risk is a benchmark:** Many insured exposures fail one test or another, and insurers cover them anyway on adjusted terms. An answer that says an exposure "cannot be insured" because it misses one characteristic overstates the rule.
