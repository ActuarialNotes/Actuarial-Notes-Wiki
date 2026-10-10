---
aliases:
  - Formulaic Reserve
  - Life Insurance Reserve
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8b0665af03d3a9288e3b1c0cbc4dc336a115e161ec75e040770c22f0773bc3ef
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commissioners Reserve Valuation Method.md
---
**The Commissioners Reserve Valuation Method** (CRVM) is the formula that the U.S. Standard Valuation Law sets for the minimum [[Statutory Accounting Principles|statutory]] reserve on a life insurance policy. It is a [[Modified Net Premium Policy Value|modified net premium reserve]], computed on a prescribed mortality table and valuation interest rate, whose first-year net premium is cut to the cost of one year's cover so that the reserve allows for the insurer's high first-year expenses. It is the classic formulaic reserve, and under [[Principles-Based Reserving|principles-based reserving]] the CRVM-style net premium reserve remains the floor under the modelled reserves.

> $${}_tV^{\text{CRVM}} = S\,A_{x+t} - \beta\,\ddot{a}_{x+t:\overline{n-t}|}$$

> $$\alpha + \beta\left(\ddot{a}_{x:\overline{n}|} - 1\right) = S\,A_x$$

> $$\beta - \alpha = \min\left(\beta^{FPT} - c_x,\ {}_{19}P_{x+1} - c_x\right)$$

- **Symbols:** For a policy of $S$ on $(x)$ with premiums payable for $n$ years, $\alpha$ is the first-year valuation net premium and $\beta$ the renewal valuation net premium. $c_x = S\,v\,q_x$ is the net premium for one year of term cover, $\beta^{FPT}$ is the full preliminary term renewal premium (the net level premium for the same plan on $(x+1)$ for one year less), and ${}_{19}P_{x+1}$ is the net level premium for a 19-payment whole life of $S$ issued at age $x+1$. $A_{x+t}$ stands for the present value of the future benefits of whatever plan is being valued, so for term or endowment it is the term or endowment insurance value.
- **The expense allowance:** The difference $\beta - \alpha$ is the expense allowance, and the second block says the modified premiums have the same present value at issue as the benefits, which is the [[Equivalence Principle|equivalence principle]]. CRVM is full preliminary term ($\alpha = c_x$) unless the FPT renewal premium is larger than the 19-pay life premium at $x+1$, in which case the allowance is capped and $\beta$ follows from the second block as $\beta = P + (\beta - \alpha)/\ddot{a}_{x:\overline{n}|}$, where $P$ is the net level premium.
- **When the cap bites:** The cap affects plans with high premiums, such as limited-pay life and short endowments, whose FPT renewal premiums would otherwise strip out far more than a year's acquisition cost. Ordinary whole life and term plans usually fall under the cap and are valued on pure FPT.
- **Against the net level reserve:** Because $\beta$ exceeds the net level premium, the CRVM reserve is below the [[Policy Value|net level policy value]] at every duration, and the gap $(\beta - P)\,\ddot{a}_{x+t:\overline{n-t}|}$ is the part of the allowance not yet repaid by the higher renewal premiums. The two reserves meet when premiums stop.
- **Prescribed basis:** Mortality is the Commissioners Standard Ordinary (CSO) table in force for the issue year, now the 2017 CSO, and interest is the maximum valuation rate the law sets for the issue year. Neither reflects the company's own experience, which is the point of a formulaic minimum: every company holds at least the same reserve for the same promise.
- **Deficiency reserves:** If the gross premium is less than the valuation net premium $\beta$, the formula would assume premiums the policy will never collect. The insurer then holds an additional deficiency reserve, the present value of the shortfall over the remaining premium period.
- **Annuities, CARVM:** For annuities, the Commissioners Annuity Reserve Valuation Method takes the greatest of the present values of the future guaranteed benefits under every way the contract could be ended or annuitized, less the present value of the future considerations the contract requires. A deferred annuity with a surrender charge that grades off is therefore reserved for at least its surrender value at each future date.
- **Under VM-20:** The Valuation Manual's net premium reserve (NPR) is a CRVM-style modified net premium reserve on the 2017 CSO table and a prescribed interest rate, with prescribed lapse rates for some term and secondary-guarantee products. The VM-20 reserve is the larger of the NPR and the deterministic and stochastic reserves, so CRVM survives as the floor.

> [!example]- CRVM and Net Level Reserves for a Three-Year Term {Example}
> A three-year term insurance of \$100,000 on $(55)$ has annual net premiums payable at the start of each year. The valuation basis has $q_{55} = 0.008$, $q_{56} = 0.010$, $q_{57} = 0.012$ and $i = 4\%$. A term premium is far below the 19-pay life premium at age 56, so the CRVM allowance is not capped. Find the net level reserves and the CRVM reserves at the ends of years 1 and 2.
>
> > [!answer]-
> > The present value of benefits is $2{,}734.07$ and the premium annuity is $\ddot{a}_{55:\overline{3}|} = 2.861834$, so the net level premium is $P = 955.36$. With no cap, CRVM is full preliminary term: the first-year premium buys one year of cover, and the renewal premium is the net level premium for two-year term on $(56)$.
> > $$
> > \begin{align*}
> > \alpha &= 100{,}000\,v\,(0.008) \\
> > &= 769.23 \\
> > \text{PVB at 56} &= 961.54 + 1{,}098.37 \\
> > &= 2{,}059.91 \\
> > \beta &= \frac{2{,}059.91}{1 + 0.99/1.04} \\
> > &= 1{,}055.32
> > \end{align*}
> > $$
> > Both reserves are the value of future benefits less future net premiums.
> > $$
> > \begin{align*}
> > {}_1V^{NL} &= 2{,}059.91 - 955.36(1.951923) \\
> > &= 195.13 \\
> > {}_1V^{\text{CRVM}} &= 2{,}059.91 - 1{,}055.32(1.951923) \\
> > &= 0.00 \\
> > {}_2V^{NL} &= 1{,}153.85 - 955.36 \\
> > &= 198.49 \\
> > {}_2V^{\text{CRVM}} &= 1{,}153.85 - 1{,}055.32 \\
> > &= 98.52
> > \end{align*}
> > $$
> > The CRVM reserve is zero at the end of year 1, because the whole first-year net premium has paid for that year's death claims. The net level reserve of \$195.13 is money a new policy cannot supply after paying commissions, which is exactly the strain CRVM exists to relieve.

> [!example]- The 19-Pay Cap on a 10-Pay Whole Life {Example}
> A 10-pay whole life insurance of \$100,000 is issued to $(40)$. Using the SULT at $5\%$ as an illustrative valuation basis, $A_{40} = 0.121059$, $\ddot{a}_{40:\overline{10}|} = 8.08633$, $A_{41} = 0.126652$, $\ddot{a}_{41:\overline{9}|} = 7.44457$, $\ddot{a}_{41:\overline{19}|} = 12.59979$, $q_{40} = 0.0005272$, $A_{45} = 0.151609$ and $\ddot{a}_{45:\overline{5}|} = 4.53868$. Find the CRVM premiums and compare ${}_5V^{\text{CRVM}}$ with the net level reserve.
>
> > [!answer]-
> > First test the FPT renewal premium against the 19-pay life premium at age 41.
> > $$
> > \begin{align*}
> > \beta^{FPT} &= \frac{12{,}665.20}{7.44457} \\
> > &= 1{,}701.27 \\
> > {}_{19}P_{41} &= \frac{12{,}665.20}{12.59979} \\
> > &= 1{,}005.19 \\
> > c_{40} &= \frac{100{,}000(0.0005272)}{1.05} \\
> > &= 50.21
> > \end{align*}
> > $$
> > The FPT premium is above the 19-pay premium, so the allowance is capped at $1{,}005.19 - 50.21 = 954.98$. The net level premium is $P = 12{,}105.90 / 8.08633 = 1{,}497.08$.
> > $$
> > \begin{align*}
> > \beta &= 1{,}497.08 + \frac{954.98}{8.08633} \\
> > &= 1{,}615.18 \\
> > \alpha &= 1{,}615.18 - 954.98 \\
> > &= 660.20 \\
> > {}_5V^{NL} &= 15{,}160.90 - 1{,}497.08(4.53868) \\
> > &= 8{,}366.12 \\
> > {}_5V^{\text{CRVM}} &= 15{,}160.90 - 1{,}615.18(4.53868) \\
> > &= 7{,}830.11
> > \end{align*}
> > $$
> > The CRVM reserve is \$536.01 lower, which is $(\beta - P)\,\ddot{a}_{45:\overline{5}|}$. Pure FPT would have given ${}_5V = 7{,}439.41$, so the cap keeps a limited-pay policy from releasing more reserve than a year's acquisition cost justifies. From duration 10 on, all three reserves equal $100{,}000\,A_{40+t}$.

> [!tip]- How it appears on the exam
> - **ILA-101:** Candidates calculate a basic life insurance reserve under CRVM from given values, usually a term or whole life policy where CRVM is full preliminary term, and compare it with the net level reserve.
> - **ILA-201U:** Questions set CRVM inside the Valuation Manual. Candidates apply the 19-pay cap, explain when a deficiency reserve is needed, value an annuity under CARVM, and explain why the VM-20 net premium reserve is the floor under the deterministic and stochastic reserves.
> - **Describe questions:** Short answers ask why statutory reserves use a prescribed basis and a modified premium, and what problem each solves.

> [!warning]- Exam traps
> - **The cap uses age $x+1$:** The comparison premium is a 19-payment whole life on a life one year older than the issue age. Using a 20-pay premium at age $x$ gives a different, wrong cap.
> - **The cap limits $\beta - \alpha$, not $\beta$:** When the cap binds, $\beta$ is found from the net level premium plus the capped allowance spread over the premium-paying annuity. It is not set equal to ${}_{19}P_{x+1}$.
> - **Renewal premium for term:** For FPT on an $n$-year term, $\beta^{FPT}$ is the premium for $(n-1)$-year term on $(x+1)$. Using a whole life or $n$-year premium at $x+1$ overstates it.
> - **Reserve after premiums stop:** Once premiums have stopped, the CRVM, FPT and net level reserves are all the value of the remaining benefits. A candidate who keeps subtracting $\beta$ beyond the premium period understates the reserve.
> - **Terminal versus balance-sheet reserve:** The formulas give terminal reserves at policy anniversaries. The annual statement holds mean or mid-terminal reserves at the calendar year-end, so a terminal reserve is not the amount reported.
