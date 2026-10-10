---
aliases:
  - Generalized Cape Cod
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6184aa834ae03f3351493769c3dd0fa728376897d33786a2e907309d0731ad68
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Generalized Cape Cod Method.md
---
**The Generalized Cape Cod Method** is a reserving technique, due to Gluck (1997), that estimates a separate a priori [[Expected Loss Method|expected claim ratio]] for each accident year as a weighted average of the trended, on-level loss ratios of all the years, with weights that decay as the years move further apart. The selected ratio is then used exactly as in the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method, so the method sits between the [[Cape Cod Method|Cape Cod method]], which uses one ratio for every year, and the development method, which uses each year's own experience.

> $$\text{ELR}_j = \frac{\sum_i D^{|i-j|}\, C_i\, T_{i \to j}}{\sum_i D^{|i-j|}\, P_i / \text{CDF}_i}$$

> $$\text{IBNR}_j = \text{ELR}_j \times P_j \times \left(1 - \frac{1}{\text{CDF}_j}\right)$$

> $$\hat U_j = C_j + \text{IBNR}_j$$

- **Symbols:** $C_i$ is the reported (or paid) claims of accident year $i$ to date, $P_i$ is its on-level earned premium, and $\text{CDF}_i$ is its [[Cumulative Development Factor|cumulative development factor]] to ultimate. $P_i / \text{CDF}_i$ is the **used-up premium**, the share of the premium that the claims reported so far correspond to. $T_{i \to j}$ is the trend factor that restates year $i$'s claims at year $j$'s cost level, net of any change already in the on-level premium. $D$, between 0 and 1, is the **decay factor**.
- **Weights:** Each year's developed loss ratio $C_i\,\text{CDF}_i / P_i$ enters with weight $D^{|i-j|}\,P_i/\text{CDF}_i$. Year $j$ itself gets weight $D^0 = 1$, its neighbours $D$, the years two apart $D^2$, and so on, so nearby years count most. An immature year still counts little in every average, because its used-up premium is small.
- **Limiting cases:** With $D = 1$, every year gets the same weights and the method is the [[Cape Cod Method|Cape Cod method]], whose single ratio differs between years only by trend. With $D = 0$, only year $j$ counts, so $\text{ELR}_j$ is the development method's loss ratio and the ultimate equals the [[Chain Ladder Method|chain ladder]] ultimate. Choosing $D$ is a judgment about how far the true loss ratio drifts from year to year.
- **Key assumptions (GI-101 objective 5):** The development method assumes claims to date predict the claims still to come. [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] assumes unreported claims follow an independent a priori ratio. Cape Cod assumes one trended, on-level ratio holds for every year. The generalized Cape Cod assumes the ratio can drift, but slowly enough that neighbouring years carry information about each other.
- **Inputs it needs:** Premium must be [[On-Leveling|on level]], claims must be [[Loss Trend|trended]] and adjusted for changes such as tort reform, and the development factors must be sound. A distorted CDF corrupts both the used-up premium and the IBNR.
- **Relation to the [[Benktander Method|Benktander method]]:** Benktander credibility-weights the development and BF ultimates for the same year, giving the development method weight equal to the year's percent reported. The generalized Cape Cod instead borrows strength across years before applying BF.
- **A different model:** The [[Stochastic Cape Cod Model|stochastic Cape Cod model]] is Meyers' Bayesian model, in which every accident year shares one expected loss ratio estimated by MCMC. It shares the name but has no decay weighting, so its answers are not those of the method on this page.

> [!example]- Decay-Weighted Expected Claim Ratios, Decay 0.75 {Example}
> A commercial liability book has four accident years, with amounts in \$000s. Premium is on level, and claims trend at a net 2% a year that the on-level premium does not capture. Using a decay factor of $D = 0.75$, find each year's expected claim ratio, IBNR and ultimate, and compare them with the chain ladder and Cape Cod results.
>
> | AY | On-level premium | Reported claims | CDF |
> |---|---|---|---|
> | 2021 | 8,000 | 5,820 | 1.10 |
> | 2022 | 8,400 | 5,040 | 1.25 |
> | 2023 | 8,800 | 3,850 | 1.60 |
> | 2024 | 9,200 | 2,430 | 2.50 |
>
> > [!answer]-
> > The used-up premiums are 7,272.7, 6,720.0, 5,500.0 and 3,680.0, and the developed loss ratios are 80.0%, 75.0%, 70.0% and 66.0%, so the loss ratio has been falling. For 2024, the weights on 2021 to 2024 are $0.75^3 = 0.421875$, $0.5625$, $0.75$ and $1$, and each year's claims are trended forward to 2024.
> > $$
> > \begin{align*}
> > \text{Num} &= 0.421875(5{,}820)(1.02)^3 + 0.5625(5{,}040)(1.02)^2 \\
> > &\quad + 0.75(3{,}850)(1.02) + 2{,}430 \\
> > &= 2{,}605.6 + 2{,}949.5 + 2{,}945.2 + 2{,}430.0 \\
> > &= 10{,}930.4 \\
> > \text{Den} &= 0.421875(7{,}272.7) + 0.5625(6{,}720.0) \\
> > &\quad + 0.75(5{,}500.0) + 3{,}680.0 \\
> > &= 14{,}653.2 \\
> > \text{ELR}_{2024} &= 10{,}930.4 / 14{,}653.2 \\
> > &= 0.7459 \\
> > \text{IBNR}_{2024} &= 0.7459 \times 9{,}200 \times (1 - 1/2.5) \\
> > &= 4{,}118
> > \end{align*}
> > $$
> > The other years follow the same way, with claims trended backward when $i > j$.
> >
> > | AY | ELR, $D=0.75$ | IBNR | Ultimate | Chain ladder IBNR | Cape Cod IBNR |
> > |---|---|---|---|---|---|
> > | 2021 | 74.1% | 539 | 6,359 | 582 | 526 |
> > | 2022 | 74.2% | 1,247 | 6,287 | 1,260 | 1,239 |
> > | 2023 | 74.2% | 2,448 | 6,298 | 2,310 | 2,482 |
> > | 2024 | 74.6% | 4,118 | 6,548 | 3,645 | 4,235 |
> > | Total | | 8,352 | | 7,797 | 8,481 |
> >
> > Cape Cod ($D = 1$) gives ratios of 72.3% rising to 76.7%, only because of trend, while the chain ladder ($D = 0$) gives 80.0% falling to 66.0%. The decay-weighted ratios lie between them: they lean toward each year's own experience but are pulled toward the neighbouring years, so 2024's thin, leveraged 66.0% is replaced by 74.6%.

> [!tip]- How it appears on the exam
> - **GI-101 (objective 5):** Written questions ask for the key assumptions behind the development, expected, BF, Benktander, Cape Cod and generalized Cape Cod methods, and how they differ. The expected answer contrasts one fixed ratio, an independent a priori, and a ratio that may drift.
> - **Calculation:** A small triangle with on-level premium, trend and a decay factor is given, and the question asks for one year's expected claim ratio and IBNR. The work is a table of weights, trended claims and used-up premium for that year.
> - **Real-life scenarios (GI-101 topic 7):** Candidates choose among projection methods for a book whose loss ratio has shifted, and justify a decay factor or the choice of Cape Cod over BF.

> [!warning]- Exam traps
> - **Used-up premium, not premium:** The denominator weights are $D^{|i-j|} P_i/\text{CDF}_i$. Weighting the developed loss ratios by full premium gives immature years far too much say.
> - **Trend direction:** Claims of a year earlier than $j$ are trended up to year $j$'s level, and claims of a later year are trended down. Trending every year to the latest level and then applying the ratio to each year's premium overstates the older years' IBNR.
> - **The year's own weight:** Year $j$ is in its own average with weight 1. Leaving it out, as "the other years" wording might suggest, removes the information the method is meant to lean on most.
> - **Which limit is which:** A decay of 1 reproduces Cape Cod, and a decay of 0 reproduces the development method. Swapping them reverses every conclusion about responsiveness.
