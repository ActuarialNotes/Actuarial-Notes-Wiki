---
aliases:
  - Options Embedded
  - Equity-Linked Life Insurance Guarantee
  - Equity-Linked Life Insurance Cash Flow
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:066cc2b51376ab5bccb1a30ad1b4b4fa254fdcee372df46684b701be91d41b4e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Equity-Linked Insurance.md
---
**Equity-linked insurance** is [[Life Insurance|life insurance]] or an [[Annuity Contract|annuity contract]] whose premiums, after charges, are invested in a fund of equities or other assets, so that the benefits rise and fall with the value of that fund. The [[Policyholder|policyholder]] bears the investment risk except where the contract adds a guarantee, and these guarantees are options embedded in the contract that the [[Insurer|insurer]] must price, [[Reserve|reserve]] for and [[Hedging|hedge]]. Such contracts are sold as variable annuities in the United States, segregated fund contracts in Canada and unit-linked contracts in the United Kingdom.

> $$F_t = \left(F_{t-1} + a_tP_t\right)(1 - m)(1 + R_t)$$

> $$\begin{aligned} \text{Pr}_t = {} & \left[(1 - a_t)P_t + m\left(F_{t-1} + a_tP_t\right) - E_t\right](1 + i) \\ & - q_{x+t-1}\left(G_t - F_t\right)^+ \end{aligned}$$

- **Symbols:** $F_t$ is the policyholder's fund at time $t$, before the charge for the next year is taken. $P_t$ is the premium paid at the start of year $t$, of which the fraction $a_t$ is allocated to the fund, $m$ is the management charge deducted from the fund at the start of each year here, and $R_t$ is the fund's return in year $t$. In the insurer's cash flow $\text{Pr}_t$, $E_t$ is the expense at the start of the year, $i$ is the rate the insurer earns on its own funds, $q_{x+t-1}$ is the probability of death in the year and $G_t$ is the guaranteed death benefit.
- **Who owns what:** The fund belongs to the policyholder and is paid out on death, surrender or maturity, so it is not the insurer's income. The insurer receives the unallocated premium and the charges, and it pays the expenses and any amount by which a guaranteed benefit exceeds the fund.
- **The guarantees:** The [[Guaranteed Minimum Death Benefit|GMDB]] pays at least $G$ on death, and the [[Guaranteed Minimum Maturity Benefit|GMMB]] tops the fund up to $G$ at maturity, with the GMAB as its renewable form. The [[Guaranteed Minimum Income Benefit|GMIB]] guarantees a minimum annuity income, and the [[Guaranteed Minimum Withdrawal Benefit|GMWB]] guarantees a stream of withdrawals even if the fund runs out. Each pays $(G - F)^+$ in some form, so each is a put option on the fund, and [[Payoff]] works through their payoffs.
- **Pricing and profit testing:** The GMDB and GMMB are valued with the [[Black-Scholes Model]] weighted by mortality, and they are hedged with a [[Replicating Portfolio|replicating portfolio]]. The whole contract is assessed by [[Profit Testing|profit testing]]: the fund is projected along an assumed return path, the insurer's cash flows $\text{Pr}_t$ (the [[Profit Vector|profit vector]]) follow from it, and ${}_{t-1}p_x\,\text{Pr}_t$ is the [[Profit Signature|profit signature]]. A single best-estimate path usually shows no guarantee cost, so stress paths or stochastic scenarios are needed to see the risk.

> [!example]- Projecting the Insurer's Cash Flows Under a Market Fall {Example}
> A single premium of \$100,000 from a life aged 60 is fully allocated to an equity fund. A management charge of $1.5\%$ of the fund is deducted at the start of each year, and the death benefit, paid at the end of the year of death, is the larger of the fund and the premium. The insurer's expenses are \$1,000 at issue and \$100 at the start of each later year, and its own funds earn $5\%$. Mortality follows the Standard Ultimate Life Table, with $q_{60} = 0.003398$, $q_{61} = 0.003792$ and $q_{62} = 0.004234$. In a stress test the fund earns $-24\%$, $+6\%$ and $+4\%$ in the first three years. Find the profit vector and the profit signature for those years.
>
> > [!answer]-
> > The fund is $F_1 = 100{,}000(0.985)(0.76) = 74{,}860.00$, then $F_2 = 78{,}161.33$ and $F_3 = 80{,}068.46$. The charges are $1{,}500.00$, then $0.015(74{,}860) = 1{,}122.90$ and $0.015(78{,}161.33) = 1{,}172.42$.
> > $$
> > \begin{align*}
> > \text{Pr}_1 &= (1{,}500 - 1{,}000)(1.05) - 0.003398(25{,}140.00) \\
> > &= 525.00 - 85.43 \\
> > &= 439.57 \\
> > \text{Pr}_2 &= (1{,}122.90 - 100)(1.05) - 0.003792(21{,}838.67) \\
> > &= 1{,}074.05 - 82.81 \\
> > &= 991.24 \\
> > \text{Pr}_3 &= (1{,}172.42 - 100)(1.05) - 0.004234(19{,}931.54) \\
> > &= 1{,}126.04 - 84.39 \\
> > &= 1{,}041.65
> > \end{align*}
> > $$
> > With ${}_1p_{60} = 0.996602$ and ${}_2p_{60} = 0.992823$, the profit signature is $439.57$, $0.996602(991.24) = 987.87$ and $0.992823(1{,}041.65) = 1{,}034.17$. The fall cuts the charge income by about a quarter in the years after it and creates a death benefit cost. The larger cost, the maturity guarantee if the contract has one, would come at the end of the term if the fund has not recovered.

> [!example]- Do the Charges Pay for the Guarantees? {Example}
> The contract in the first example runs for 10 years and also guarantees \$100,000 at maturity to a policyholder who is alive then. With $r = 0.04$ and $\sigma = 0.20$, the GMMB is worth $10{,}282.79$ and the GMDB $593.66$ at issue (see [[Guaranteed Minimum Maturity Benefit]] and [[Guaranteed Minimum Death Benefit]]). You are also given $\sum_{t=0}^{9}{}_tp_{60}(0.985)^t = 9.16201$. Ignoring lapses, find the market-consistent value of the management charges and the part of the $1.5\%$ charge that pays for the guarantees.
>
> > [!answer]-
> > Under the risk-neutral measure the fund grows at $r$ before charges, so the charge taken at time $t$ is worth $0.015 \times 100{,}000(0.985)^t$ today, and it is collected only if the policy is still in force.
> > $$
> > \begin{align*}
> > \text{Value of charges} &= 1{,}500 \times 9.16201 \\
> > &= 13{,}743.02 \\
> > \text{Guarantees} &= 10{,}282.79 + 593.66 \\
> > &= 10{,}876.45 \\
> > \text{Share} &= \frac{10{,}876.45}{13{,}743.02} \\
> > &= 0.7914
> > \end{align*}
> > $$
> > About $79\%$ of the charge, or $0.015(0.7914) = 1.19\%$ of the fund a year, is needed for the guarantees, which leaves about $0.31\%$ a year for expenses and profit. Most of that cost is the GMMB, because it pays every survivor while the GMDB pays only those who die.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to "define and calculate payoffs" under the GMDB, GMMB, GMIB and GMWB, to value the GMDB and the GMMB "using the Black-Scholes model", and to hedge them with a replicating portfolio.
> - **Profit testing:** ALTAM also asks for "deterministic profit testing" of "equity-linked life insurance cash flows, including profit signature, profit vector, net present value, internal rate of return, profit margin, and discounted payback periods, under best estimate or stress test assumptions". The work is a year-by-year projection of the fund, then of the insurer's cash flows, as in the first example.
> - **Explanations:** Questions also ask which guarantee behaves like which option, and why the insurer's losses come in falling markets, when the charge income shrinks as the guarantee costs grow.

> [!warning]- Exam traps
> - **The fund is not income:** Counting the policyholder's fund, or its investment return, as the insurer's income overstates profit enormously. Only the charges, the unallocated premium and the guarantee top-ups belong in $\text{Pr}_t$.
> - **Charge timing:** A charge taken at the start of the year is $m(F_{t-1} + a_tP_t)$ and earns a year's interest for the insurer, while one taken at the end is $m$ times the grown fund. The question's convention changes both the charge and the fund.
> - **Charges in a stress test:** In a falling market the charges fall with the fund. A stress test that keeps the best-estimate charge income understates the loss.
> - **Death benefit cost:** The insurer pays only the excess $(G_t - F_t)^+$ on death, times the probability of death in the year. Charging the whole benefit $\max(G_t, F_t)$ double counts the fund the policyholder already owns.
