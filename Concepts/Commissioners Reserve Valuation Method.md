---
aliases:
  - Formulaic Reserve
  - Life Insurance Reserve
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6960e5f027311daa0008ef573e882c5c007b0af28dd7d210954e8e4a2da70ac5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commissioners Reserve Valuation Method.md
---
The **Commissioners Reserve Valuation Method** (CRVM) is the formula that the U.S. Standard Valuation Law sets for the minimum [[Statutory Accounting Principles|statutory]] reserve on a life insurance policy. It is a [[Modified Net Premium Policy Value|modified net premium reserve]] on a prescribed mortality table and valuation interest rate, whose first-year net premium is cut to the cost of one year's cover so that the reserve allows for the insurer's high first-year expenses.

For a policy of $S$ on $(x)$ with premiums payable for $n$ years, the CRVM reserve at duration $t$ is

> $${}_tV^{\text{CRVM}} = S\,A_{x+t} - \beta\,\ddot{a}_{x+t:\overline{n-t}|}$$

- $A_{x+t}$ stands for the present value of the future benefits of whatever plan is being valued, so for term or endowment it is the term or endowment insurance value.
- $\beta$ is the renewal valuation net premium.
- $\ddot{a}_{x+t:\overline{n-t}|}$ is the premium annuity over the remaining premium period, at the attained age $x+t$.

The first-year valuation net premium $\alpha$ and the renewal premium $\beta$ have the same present value at issue as the benefits, which is the [[Equivalence Principle|equivalence principle]]. The modified premiums satisfy

> $$\alpha + \beta\left(\ddot{a}_{x:\overline{n}|} - 1\right) = S\,A_x$$

The difference $\beta - \alpha$ is the expense allowance. Because $\beta$ exceeds the net level premium $P$, the CRVM reserve is below the [[Policy Value|net level policy value]] at every duration, by $(\beta - P)\,\ddot{a}_{x+t:\overline{n-t}|}$. This gap is the part of the allowance not yet repaid by the higher renewal premiums. The two reserves meet when premiums stop, and from then on every reserve is the value of the remaining benefits.

## Full preliminary term

The allowance is set by

> $$\beta - \alpha = \min\left(\beta^{FPT} - c_x,\ {}_{19}P_{x+1} - c_x\right)$$

- $c_x = S\,v\,q_x$ is the net premium for one year of term cover.
- $\beta^{FPT}$ is the full preliminary term renewal premium (the net level premium for the same plan on $(x+1)$ for one year less). For an $n$-year term, it is the premium for $(n-1)$-year term on $(x+1)$.
- ${}_{19}P_{x+1}$ is the net level premium for a 19-payment whole life of $S$ issued at age $x+1$.

CRVM is full preliminary term ($\alpha = c_x$) unless the FPT renewal premium is larger than the 19-pay life premium at $x+1$. Ordinary whole life and term plans usually fall under the cap and are valued on pure FPT.

> [!example]- What are the net level and CRVM reserves of this three-year term at the ends of years 1 and 2? {Example}
> A three-year term insurance of $\$100{,}000$ on $(55)$ has annual net premiums payable at the start of each year. The valuation basis has $q_{55} = 0.008$, $q_{56} = 0.010$, $q_{57} = 0.012$ and $i = 4\%$. A term premium is far below the 19-pay life premium at age 56, so the CRVM allowance is not capped.
>
> > [!answer]-
> > - The present value of benefits is $2{,}734.07$ and $\ddot{a}_{55:\overline{3}|} = 2.861834$, so the net level premium is $P = 955.36$.
> > - With no cap, CRVM is full preliminary term, so $\alpha = 100{,}000\,v\,(0.008) = 769.23$.
> > - The renewal premium is the net level premium for two-year term on $(56)$. Its benefits are worth $961.54 + 1{,}098.37 = 2{,}059.91$ at 56.
> > - The premium annuity at 56 is $1 + 0.99/1.04 = 1.951923$, so $\beta = 2{,}059.91/1.951923 = 1{,}055.32$.
> > - At the end of year 1, ${}_1V^{NL} = 2{,}059.91 - 955.36(1.951923) = 195.13$.
> > - At the end of year 1, ${}_1V^{\text{CRVM}} = 2{,}059.91 - 1{,}055.32(1.951923) = 0.00$.
> > - At the end of year 2, the benefit is worth $1{,}153.85$, so ${}_2V^{NL} = 1{,}153.85 - 955.36 = 198.49$.
> > - At the end of year 2, ${}_2V^{\text{CRVM}} = 1{,}153.85 - 1{,}055.32 = 98.52$.
> > - The CRVM reserve is zero at the end of year 1, because the whole first-year net premium has paid for that year's death claims.

## The 19-pay cap

The cap affects plans with high premiums, such as limited-pay life and short endowments, whose FPT renewal premiums would otherwise strip out far more than a year's acquisition cost. When the cap binds, the allowance is ${}_{19}P_{x+1} - c_x$, and the renewal premium follows from the equivalence equation as

> $$\beta = P + \frac{\beta - \alpha}{\ddot{a}_{x:\overline{n}|}}$$

- $P$ is the net level premium.

> [!example]- What are the CRVM premiums of this 10-pay whole life, and how does ${}_5V^{\text{CRVM}}$ compare with the net level reserve? {Example}
> A 10-pay whole life insurance of $\$100{,}000$ is issued to $(40)$. The SULT at $5\%$ is used as an illustrative valuation basis:
>
> | Value | Amount |
> | :--- | ---: |
> | $A_{40}$ | 0.121059 |
> | $\ddot{a}_{40:\overline{10}\vert}$ | 8.08633 |
> | $A_{41}$ | 0.126652 |
> | $\ddot{a}_{41:\overline{9}\vert}$ | 7.44457 |
> | $\ddot{a}_{41:\overline{19}\vert}$ | 12.59979 |
> | $q_{40}$ | 0.0005272 |
> | $A_{45}$ | 0.151609 |
> | $\ddot{a}_{45:\overline{5}\vert}$ | 4.53868 |
>
> > [!answer]-
> > - The FPT renewal premium is $\beta^{FPT} = 12{,}665.20/7.44457 = 1{,}701.27$.
> > - The 19-pay premium at 41 is ${}_{19}P_{41} = 12{,}665.20/12.59979 = 1{,}005.19$.
> > - The one-year term cost is $c_{40} = 100{,}000(0.0005272)/1.05 = 50.21$.
> > - The FPT premium is above the 19-pay premium, so the allowance is capped at $1{,}005.19 - 50.21 = 954.98$.
> > - The net level premium is $P = 12{,}105.90/8.08633 = 1{,}497.08$.
> > - The renewal premium is $\beta = 1{,}497.08 + 954.98/8.08633 = 1{,}615.18$, and $\alpha = 1{,}615.18 - 954.98 = 660.20$.
> > - The net level reserve is ${}_5V^{NL} = 15{,}160.90 - 1{,}497.08(4.53868) = 8{,}366.12$.
> > - The CRVM reserve is ${}_5V^{\text{CRVM}} = 15{,}160.90 - 1{,}615.18(4.53868) = 7{,}830.11$.
> > - The CRVM reserve is $\$536.01$ lower, which is $(\beta - P)\,\ddot{a}_{45:\overline{5}|}$. Pure FPT would have given ${}_5V = 7{,}439.39$.

## Prescribed basis and deficiency reserves

Mortality is the Commissioners Standard Ordinary (CSO) table in force for the issue year, now the 2017 CSO, and interest is the maximum valuation rate the law sets for the issue year. Neither reflects the company's own experience, so every company holds at least the same reserve for the same promise.

If the gross premium is less than the valuation net premium $\beta$, the formula would assume premiums the policy will never collect. The insurer then holds an additional deficiency reserve, the present value of the shortfall over the remaining premium period.

The formulas give terminal reserves at policy anniversaries. The annual statement holds mean or mid-terminal reserves at the calendar year-end.

## Annuities: CARVM

For annuities, the Commissioners Annuity Reserve Valuation Method takes the greatest of the present values of the future guaranteed benefits under every way the contract could be ended or annuitized, less the present value of the future considerations the contract requires. A deferred annuity with a surrender charge that grades off is therefore reserved for at least its surrender value at each future date.

## Under VM-20

The Valuation Manual's net premium reserve (NPR) is a CRVM-style modified net premium reserve on the 2017 CSO table and a prescribed interest rate, with prescribed lapse rates for some term and secondary-guarantee products. The VM-20 reserve is the larger of the NPR and the deterministic and stochastic reserves, so CRVM survives as the floor under [[Principles-Based Reserving|principles-based reserving]].

> [!trap] Capping $\beta$ instead of $\beta - \alpha$
> The cap limits the allowance, not the renewal premium, and its comparison premium is a 19-payment whole life on a life one year older than the issue age. In the 10-pay example, setting $\beta = {}_{19}P_{41} = 1{,}005.19$ is wrong. The renewal premium is $P$ plus the capped allowance spread over the premium annuity, $1{,}615.18$.
