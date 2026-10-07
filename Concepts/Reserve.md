---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e7e6863c81f511e7381a71a065135491932d913bd940e20638d11fca9b179b9b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reserve.md
---

**A Reserve** is the liability an [[Insurer|insurer]] or benefit plan holds at a valuation date for obligations under contracts already written: the [[Valuation|value]] of the future outgo it is committed to, less the future income it will receive under those contracts. For long-term [[Life Insurance|life]], annuity and long-term health contracts, the reserve is the **policy value**. For [[Short-Term Insurance Coverage|short-term coverages]], it is chiefly the **[[Claim Reserve|claim reserve]]** for claims already incurred, plus the [[Unearned Premium|unearned premium]] reserve for coverage not yet given.

> $${}_tV = \text{EPV}_t(\text{benefits} + \text{expenses}) - \text{EPV}_t(\text{premiums})$$

> $$\left({}_tV + P_t - E_t\right)(1+i) = q_{x+t}\,S + p_{x+t}\;{}_{t+1}V$$

> $$\text{Claim reserve} = \text{Ultimate incurred} - \text{Paid to date}$$

- **Policy values.** The first block values future cash flows **prospectively** at duration $t$, for a policy still in force. Using gross premiums and expenses gives the gross premium policy value. Using the net premium and no expenses gives the net premium policy value. The second block is the annual recursion, with sum insured $S$, premium $P_t$ and expense $E_t$; Thiele's equation is its continuous form. With the premium set by the [[Equivalence Principle|equivalence principle]], ${}_0V = 0$ on the pricing basis.
- **Claim reserves.** For incurred claims, the reserve is [[Case Reserves|case reserves]] plus [[IBNR]]. These [[Unpaid Claims|unpaid claims]] are projected by development methods such as the [[Chain Ladder Method|chain ladder]], health completion factors and [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]]. The non-IBNR reserves in GH-201 also include the [[Unearned Premium|unearned premium]] reserve, a [[Premium Deficiency|premium deficiency]] reserve, and active-life and disabled-life reserves.
- **One obligation, several numbers.** The same block carries a different reserve under each [[Valuation Principle|valuation principle]]: [[Statutory Accounting Principles|statutory]] (formulaic and principle-based), [[GAAP]], [[IFRS 17]] (fulfilment cash flows plus [[Risk Adjustment for Non-Financial Risk|risk adjustment]] plus [[Contractual Service Margin|CSM]]) and tax.
- **Profit testing (ALTAM).** Reserves set aside at the end of each year are a cost in the profit vector. **Zeroizing** sets the reserve just large enough that no future year shows negative profit. [[Universal Life Insurance|Universal life]] adds reserves for no-lapse guarantees.

> [!example]- Gross and Net Premium Policy Values {Example}
> The 20-pay whole life policy of \$100,000 on $(45)$ in [[Equivalence Principle]] has gross premium $G = 1{,}351.78$ and net premium $P = 1{,}171.72$. Renewal expenses are $5\%$ of premium plus \$50. On the SULT at $5\%$, $A_{55} = 0.23524$ and $\ddot{a}_{55:\overline{10}|} = 8.0192$. Find the gross and net premium policy values at time 10, just before the premium is paid.
>
> > [!answer]-
> > Ten premiums remain.
> > $$
> > \begin{align*}
> > {}_{10}V^{g} &= 100{,}000A_{55} - (0.95G - 50)\,\ddot{a}_{55:\overline{10}|} \\
> > &= 23{,}524 - (1{,}234.19)(8.0192) \\
> > &= 13{,}626.78 \\
> > {}_{10}V^{n} &= 100{,}000A_{55} - P\,\ddot{a}_{55:\overline{10}|} \\
> > &= 23{,}524 - (1{,}171.72)(8.0192) \\
> > &= 14{,}127.74
> > \end{align*}
> > $$
> > The gross premium policy value is lower. Future premium loadings exceed future renewal expenses, and that surplus repays the unrecovered initial expense, which the net premium policy value ignores.

> [!example]- Health Claim Reserve by Completion Factors {Example}
> At June 30, a group medical plan has paid \$41,000, \$30,500 and \$9,800 for claims incurred in April, May and June. From the paid-claim lag triangle, the completion factors at those durations are $0.62$, $0.45$ and $0.15$. Estimate the claim reserve.
>
> > [!answer]-
> > Ultimate incurred for each month is paid to date divided by its completion factor.
> > $$
> > \begin{align*}
> > \text{Apr:}\ \tfrac{41{,}000}{0.62} - 41{,}000 &= 25{,}129 \\
> > \text{May:}\ \tfrac{30{,}500}{0.45} - 30{,}500 &= 37{,}278 \\
> > \text{Jun:}\ \tfrac{9{,}800}{0.15} - 9{,}800 &= 55{,}533 \\
> > \text{Reserve} &= 117{,}940
> > \end{align*}
> > $$
> > About \$118,000 is still to be paid on claims already incurred. Nearly half of it comes from June, where a completion factor of $0.15$ makes the estimate highly leveraged.

> [!tip]- How it appears on the exam
> - **FAM** asks for gross premium, net premium or modified net premium policy values, often by recursion from one year to the next. FAM also asks for short-term claim reserves from a development triangle with chain ladder, Bornhuetter-Ferguson or expected loss ratio.
> - **ALTAM** asks for policy values for joint-life and multiple-state contracts, sets reserves within a profit test (including zeroizing), and values no-lapse guarantee reserves for universal life.
> - **ASTAM** calculates outstanding claims reserves for short-term coverages from development data.
> - **GH-201** and **CP-321** test claim reserves from data: completion factors, projection methods for recent months, and the effect of trend, seasonality and claims processing changes. Written answers describe and evaluate non-IBNR reserves.
> - **ILA-101/201** and **GI-101** ask how a reserve is calculated under a stated framework: statutory, GAAP, IFRS 17 or tax.

> [!warning]- Exam traps
> - **Wrong side of the premium.** "Just before" the time-$t$ premium includes it in the future premiums. "Just after" it does not. The two answers differ by about one premium less expenses.
> - **Gross vs net.** A net premium policy value uses the net premium on the valuation basis, never the gross premium or expenses. Mixing them gives a value between the two correct answers.
> - **Leveraged completion factors.** Dividing a month's paid claims by a small completion factor magnifies noise. Standard practice switches to a projection (PMPM) method for the most recent months.
> - **Stale factors after a processing change.** If claims are now paid faster than in the lag history, recent months are more complete than the old factors say. Dividing by those factors then overstates ultimate claims and the reserve. A slowdown has the opposite effect.
