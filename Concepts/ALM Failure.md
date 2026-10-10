---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:13b2dabcc753ec5b89e441bfc2f9df664c7fdef01c776168f8feba86fe088da0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ALM Failure.md
---

An **ALM failure** is the collapse, or near collapse, of an insurer, pension fund or bank caused by a mismatch between its assets and liabilities that it did not measure, did not price or could not unwind in time. The classic cases, General American Life, Equitable Life, the Japanese life insurers of the 1990s and Silicon Valley Bank, each turned an [[ALM Risk|ALM risk]] that looked remote into a loss of solvency or of liquidity, and their lessons shape how [[Asset-Liability Management|asset-liability management]] is practised.

> $$\text{Coverage} = \frac{\sum_j (1 - h_j)\,q_j\,A_j}{\sum_k r_k\,L_k}$$

> $$\text{GAO value} = F \times \max\left(g\,\ddot{a}_x - 1,\ 0\right)$$

> $$\text{Annual loss} = \left(i_g - i_A\right) \times L$$

- **Symbols:** In the liquidity coverage ratio, $A_j$ is the value of asset class $j$, $q_j$ the share of it that can be sold within the stress horizon and $h_j$ the haircut on a forced sale; $L_k$ is a liability class and $r_k$ the share of it expected to be withdrawn in the stress. A ratio below 1 means the institution runs out of cash. For a guaranteed annuity option (GAO), $F$ is the policyholder's fund at retirement, $g$ the guaranteed annual annuity per unit of fund and $\ddot{a}_x$ the market annuity factor. In the last line, $i_g$ is the guaranteed rate credited on liabilities $L$ and $i_A$ the yield the assets earn.
- **General American Life (1999):** The insurer had issued several billion dollars of funding agreements to money market funds that holders could put back for cash on seven days' notice, and it backed them with longer, less liquid assets. When Moody's downgraded it in the summer of 1999, the holders exercised their puts on more than \$4 billion at once. The company was solvent but couldn't sell assets fast enough, so Missouri regulators placed it under administrative supervision in August 1999, and MetLife bought it in January 2000. The lesson is that a ratings trigger can turn a put option that is rarely used into a run.
- **Equitable Life (UK, 2000):** The world's oldest mutual life office had sold with-profits pension policies with guaranteed annuity rates, mostly when interest rates were high and the guarantees seemed worthless. When rates and mortality fell in the 1990s, the guarantees became very valuable. It had neither reserved nor hedged for them, and when the courts ruled in 2000 that it could not cut the bonuses of the guaranteed-rate holders to pay for them, it closed to new business. The lesson is that [[Embedded Option|embedded options]] must be valued and hedged when they are written, not when they are in the money.
- **Japanese life insurers (late 1990s):** Insurers had sold savings policies guaranteeing rates of around 5% or more. After the bubble burst, Japanese government bond yields fell far below those rates and stayed there, and the insurers earned less on their assets than they had promised, a negative spread. Several failed between 1997 and 2001. The lesson is that long guarantees backed by shorter assets leave the insurer exposed to [[Reinvestment Risk|reinvestment risk]] for decades.
- **Silicon Valley Bank (2023):** The bank invested a surge of deposits in long-dated Treasuries and mortgage-backed securities without hedging their duration. When rates rose sharply, those securities lost a large part of their value. Most of its deposits were uninsured and concentrated among technology firms and venture funds, so when it announced a loss on selling securities and a plan to raise capital, depositors withdrew tens of billions of dollars in a day and it failed within 48 hours. The lesson is that unhedged duration and flighty, concentrated liabilities together can destroy a bank faster than accounting shows.
- **Common threads:** The failures share a few features. A liability option was held by others and exercised against the institution, the mismatch was invisible in the accounting measure the institution watched, concentration made the policyholders or depositors act together, and the institution's own downgrade or announcement started the run.
- **What the lessons changed:** Insurers now limit puttable and ratings-triggered liabilities, run liquidity stress tests alongside solvency tests, price and hedge guarantees with [[Interest Rate Derivative|interest rate derivatives]] when they are sold, and measure duration on surplus with key rate and scenario tools. Regulators added liquidity monitoring and asset adequacy testing that must consider these risks.

> [!example]- Liquidity Coverage After a Downgrade, General-American Style {Example}
> A life insurer has issued \$6.0 billion of funding agreements that holders can put on seven days' notice, and it expects other outflows of \$0.2 billion in any week. Its liquid sources over a week are:
>
> | Asset | Value (\$ billion) | Saleable in a week | Haircut |
> |---|---|---|---|
> | Cash | 0.4 | 100% | 0% |
> | Treasuries | 0.8 | 100% | 2% |
> | Agency MBS | 1.5 | 100% | 5% |
> | Public corporate bonds | 6.0 | 30% | 10% |
>
> Its private placements and commercial mortgages can't be sold within a week. Find the coverage ratio if 10% of the funding agreements are put in a normal week, and if 75% are put after a downgrade.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Sources} &= 0.4 + 0.8(0.98) + 1.5(0.95) + 6.0(0.30)(0.90) \\
> > &= 0.400 + 0.784 + 1.425 + 1.620 \\
> > &= 4.229 \\
> > \text{Coverage}_{\text{normal}} &= \frac{4.229}{0.10(6.0) + 0.2} \\
> > &= 5.29 \\
> > \text{Coverage}_{\text{stress}} &= \frac{4.229}{0.75(6.0) + 0.2} \\
> > &= 0.90
> > \end{align*}
> > $$
> > In a normal week the insurer has more than five times the cash it needs. After the downgrade it is short by $4.7 - 4.229 = \$0.471$ billion, even though its balance sheet may show a healthy surplus. To raise the rest it must sell private assets at a deep discount, which can turn a liquidity problem into a solvency one. Limiting the puttable liabilities to well under the liquid sources, or removing ratings triggers, would have prevented the run.

> [!example]- The Cost of a Guaranteed Annuity Rate When Rates Fall {Example}
> A with-profits pension policy guarantees that at retirement the fund will buy an annuity of 11.1% a year, so a fund of \$100,000 buys at least \$11,100 a year. When the policy was sold, interest rates were high and the market annuity factor at the retirement age was 8.0. By the time the policyholder retires, rates and mortality have fallen and the factor is 11.0. Find the value of the guarantee at each factor.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > g\,\ddot{a}_{\text{high}} &= 0.111(8.0) \\
> > &= 0.888 \\
> > g\,\ddot{a}_{\text{low}} &= 0.111(11.0) \\
> > &= 1.221 \\
> > \text{GAO value} &= 100{,}000 \times (1.221 - 1) \\
> > &= 22{,}100
> > \end{align*}
> > $$
> > At a factor of 8.0 the guaranteed annuity is worth only 88.8% of the fund, so the option is out of the money and costs nothing. At 11.0 the insurer must provide an annuity worth \$122,100 for a fund of \$100,000, a cost of 22% of the fund. A guarantee that was far out of the money when sold became deep in the money as rates fell, which is the shape of the Equitable Life problem; a receiver swaption bought at issue would have paid off in the same scenario.

> [!tip]- How it appears on the exam
> - **CP-351, learning objective 1b:** Candidates understand the lessons learned from ALM failures, from the case study on General American Life, Sweeting's case studies, the paper on what insurers and pension funds can learn from bank failures, and the IAA risk book's sections on failures and near failures. Expect a written answer that explains what went wrong in a named case and what an insurer should do differently.
> - **Applying the lessons:** Questions often describe a new product or balance sheet with features like those in the cases, such as a ratings trigger, a guarantee or deposits that can be withdrawn on demand, and ask what risks it carries and how to manage them.
> - **Supporting calculations:** A liquidity coverage test, the value of a guarantee at a new rate, or the loss from a negative spread can support the written answer.

> [!warning]- Exam traps
> - **Solvent is not liquid:** General American had positive surplus when it failed. An answer that blames losses on bad investments misses that the failure was the speed of the withdrawals, not the quality of the assets.
> - **The trigger matters as much as the mismatch:** A puttable liability is safe in normal times and dangerous only when an event makes all holders act together. Describing the risk without the downgrade trigger misses why the run happened.
> - **Options cost most when they look cheapest to ignore:** Equitable's guarantees were worthless at issue and very valuable later. Valuing an option at its current intrinsic value, rather than at its full value under changing rates, understates the liability.
> - **Negative spread is a slow failure:** The Japanese insurers did not fail from one shock but from years of earning less than they credited. A one-period stress test misses this, so long guarantees need multi-year projections under low-rate scenarios.
> - **Book values can hide the loss:** SVB's securities were mostly held at amortized cost, so the losses didn't reduce reported capital until securities were sold. Judging a balance sheet on book values hides the duration risk that market values would show.
