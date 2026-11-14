---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:94dd79d3f9c271a2b243afcaaecd0dfc293eb4ad4393a50d93a097d0761a47db
  sources:
    - "Wikipedia, 'Insurability' (fetched 2026-10-10), sha256:68a5a12ac2c667fd605a4bb9c343733bee449dc6a0d6e8c1adc8928182da0233 — https://en.wikipedia.org/wiki/Insurability"
    - "IRMI Insurance Glossary, 'pure risk' (fetched 2026-10-10), sha256:53c02db03b0c4161afef15f3c858c900ee18e236a7a33bad7d389f085eabe39d — https://www.irmi.com/term/insurance-definitions/pure-risk"
    - "IRMI Insurance Glossary, 'speculative risk' (fetched 2026-10-10), sha256:33cd8e29012019052d89c1dafc07296e1b395ae4bb0addc4f1e6b9d23ade348e — https://www.irmi.com/term/insurance-definitions/speculative-risk"
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Exclusions A.3 water/flood, A.6 war (pp.12-13), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "Brainscape flashcards 'Assignment 5: Insurance as a Risk Management Technique' (CAS Online Course 1 pack), card 5, read via WebFetch 2026-10-10, no digest — https://brainscape.com/flashcards/assignment-5-insurance-as-a-risk-managem-12871202/packs/21196986"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurable Risk.md
---

An **Insurable Risk** is a [[Loss Exposure|loss exposure]] that private insurers can cover on a sound commercial basis because it has the characteristics of an ideally insurable loss exposure. Few real exposures meet all of them, so the list is a benchmark for judging how well, and on what terms, an exposure can be insured.

An ideally insurable loss exposure has six characteristics:

1. **Pure risk.** The exposure must offer only the chance of loss or no loss, as a fire or a theft does.
2. **Accidental.** Losses must be fortuitous from the insured's standpoint, neither intended nor certain.
3. **Definite and measurable.** The insurer must be able to tell when a loss happened, where, and how much it cost.
4. **Large number of similar exposure units.** Many similar units are pooled so that the average loss is predictable.
5. **Independent and not catastrophic.** One event must not strike many units at once.
6. **Economically feasible premium.** The premium must be one the people exposed can afford and will pay.

An insurer that paid for intentional losses would invite [[Moral Hazard|moral hazard]], and one that paid for certain losses, such as wear and tear, would simply be prepaying a known cost with expenses added. A loss a third party causes on purpose, such as vandalism, is still accidental from the insured's standpoint. Without definite and measurable losses an insurer cannot settle claims or collect the data it needs to price them.

Insurable risk is about the exposure, and [[Insurable Interest|insurable interest]] is about the buyer, who must suffer a financial loss if the event occurs. A policy needs both.

> [!example]- How do fire, flood and war damage to a home measure up against the six characteristics? {Example}
> - Fire is a pure risk, accidental unless the insured sets it, and definite in time and amount.
> - Millions of similar homes are exposed to fire, most fires strike one home at a time, and the premium is small relative to the house's value, so fire meets all six. It is the core of every [[Homeowners Policy|homeowners policy]].
> - Flood is pure, accidental and measurable, but one flood damages every home in the floodplain at once, so its losses are neither independent nor free of catastrophe.
> - The owners most likely to buy flood cover are those in the floodplain, so the premium for the pool that would buy it is high, and [[Adverse Selection|adverse selection]] follows. Standard homeowners forms exclude flood, and it is written separately, often with government backing ([[Flood Insurance]]).
> - War damage is catastrophic, and its probability and timing cannot be measured from any pool of past experience. A single war could exceed the capital of every insurer in the market.
> - Property and liability forms exclude war, and the losses fall to governments.

## Pure and speculative risk

Speculative risk is a risk in which the same exposure can produce a loss, no loss or a gain, such as an investment or a business venture. Speculative risk is not insured, because the insured controls it and could profit from it. A business's chance of a loss from a falling market price is speculative risk, because the same exposure can produce a gain. It is not insurable even though the loss is measurable.

## Pooling and correlation

Pooling many similar, independent units makes the average loss predictable, which is the [[Law of Large Numbers|law of large numbers]]. For $n$ similar units whose losses each have mean $\mu$ and standard deviation $\sigma$, the coefficient of variation of the average loss per unit, $\bar X_n$, is

> $$\text{CV}\big(\bar X_n\big) = \frac{\sigma}{\mu}\sqrt{\frac{1 + (n-1)\rho}{n}}$$

- $\rho$ is the correlation between the losses of any two units.

With $\rho = 0$ the coefficient of variation falls like $1/\sqrt{n}$, so a large pool needs little capital per unit beyond its expected loss. When losses are correlated it does not fall to zero but to $(\sigma/\mu)\sqrt{\rho}$, so pooling stops reducing the uncertainty. One event that strikes many units at once, such as a hurricane or a war, can exceed the insurer's capital, which is [[Catastrophe Risk|catastrophe risk]].

> [!example]- How do the annual fire and flood losses of this book of homes compare? {Example}
> An insurer writes 10,000 homes, each worth $\$200{,}000$. Each home has an independent 0.2% chance a year of being destroyed by fire. In addition, 4,000 of the homes sit in one river valley, and a flood that destroys all 4,000 at once has a 1% chance a year.
>
> > [!answer]-
> > - Fire losses are independent, so the number of homes lost is binomial, with mean $10{,}000 \times 0.002 = 20$ homes.
> > - The expected fire loss is $20 \times \$200{,}000 = \$4{,}000{,}000$.
> > - Its standard deviation is $\$200{,}000\sqrt{10{,}000 \times 0.002 \times 0.998} = \$893{,}532$, so its coefficient of variation is $0.223$.
> > - The flood is one event, so the 4,000 valley homes are perfectly correlated, $\rho = 1$, and behave like a single unit of $\$800{,}000{,}000$.
> > - The expected flood loss is $0.01 \times \$800{,}000{,}000 = \$8{,}000{,}000$, or $\$2{,}000$ a valley home a year, an affordable premium.
> > - Its standard deviation is $\$800{,}000{,}000\sqrt{0.01 \times 0.99} = \$79{,}598{,}995$, so its coefficient of variation is $9.95$.
> > - In a flood year the insurer owes $\$800{,}000{,}000$, a hundred times the expected annual flood loss, and writing more valley homes would not reduce that.
> > - Doubling the fire pool would cut its coefficient of variation by about 30%.

## Economically feasible premium

A premium covers the expected loss plus expenses and profit, so a loss that is very likely costs nearly as much as the loss itself, or more, to insure. The insured is then better off retaining it. A premium the people exposed won't pay leaves only the worst risks buying, which is adverse selection.

> [!trap] Judging insurability on the expected loss alone
> A flood or earthquake premium can be modest per home and the exposure still fail, because the losses are correlated. Check the catastrophe test as well as the cost. Many insured exposures fail one test or another and are covered anyway on adjusted terms, so an exposure that misses one characteristic is not "uninsurable".
