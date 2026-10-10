---
aliases:
  - Nonforfeiture
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8be42f557d8da6004fe6b24cdef6e534db8640710f07cf01e43d9ad1f879ca9a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nonforfeiture Benefit.md
---
**A Nonforfeiture Benefit** is the value a life insurance or deferred annuity policyholder keeps when they stop paying premiums or surrender the contract, so that the reserve built up by the early level premiums is not forfeited to the insurer. For [[Whole Life Insurance|whole life]] and other cash-value policies, it is taken as a cash surrender value, as reduced paid-up insurance, or as extended term insurance. The U.S. Standard Nonforfeiture Law sets the minimum cash value by the adjusted premium method.

> $${}_tCV = S\,A_{x+t} - P^{A}\,\ddot{a}_{x+t:\overline{n-t}|}$$

> $$P^{A}\,\ddot{a}_{x:\overline{n}|} = S\,A_x + E$$

> $$E = 0.01\,S + 1.25\,\min\left(P^{NL},\ 0.04\,S\right)$$

- **Symbols:** For a policy of $S$ on $(x)$ with premiums payable for $n$ years, ${}_tCV$ is the minimum cash value at duration $t$, $P^{A}$ is the adjusted premium, $E$ is the initial expense allowance, and $P^{NL} = S\,A_x / \ddot{a}_{x:\overline{n}|}$ is the nonforfeiture net level premium. All values use the nonforfeiture mortality table and interest rate, and any policy loan is deducted from the cash value.
- **The adjusted premium method:** The minimum cash value is a [[Policy Value|prospective policy value]] in which the adjusted premium takes the place of the net premium. The adjusted premium is larger than the net level premium because it also repays the initial expense allowance, so the cash value sits below the net level reserve by $(P^{A} - P^{NL})\,\ddot{a}_{x+t:\overline{n-t}|}$, the part of the allowance not yet recovered.
- **The expense allowance:** The allowance is 1% of the face amount plus 125% of the nonforfeiture net level premium, with that premium capped at 4% of the face. It lets an insurer recover its acquisition costs from a policyholder who leaves early, much as the [[Commissioners Reserve Valuation Method|CRVM]] expense allowance does for the reserve.
- **Basis:** Mortality is the Commissioners Standard Ordinary table for the issue year, now the 2017 CSO. The nonforfeiture interest rate is set from the statutory valuation interest rate for the issue year (125% of it, rounded to the nearest quarter percent), so the minimum moves with the reserve basis. A company may pay more than the minimum and usually does, often through a surrender charge schedule on [[Universal Life Insurance|universal life]].
- **Reduced paid-up insurance:** The cash value buys a single-premium policy of the same plan with no further premiums, for an amount $CV / A_{x+t}$ at the nonforfeiture basis. It suits a policyholder who wants lifetime cover without premiums and accepts a smaller face.
- **Extended term insurance:** The cash value buys term cover for the full face amount, net of any loan, for as long as it will pay for, so the term $m$ solves $S\,A^{1}_{x+t:\overline{m}|} = CV$. If the cash value is more than the cost of term cover to the policy's expiry, as on an endowment, the excess buys a pure endowment at maturity.
- **Default option:** A policyholder who stops paying and makes no election receives the option the policy names as automatic, usually extended term insurance. Some policies, such as those issued on substandard lives, make reduced paid-up insurance the default instead.
- **Deferred annuities:** The Standard Nonforfeiture Law for Individual Deferred Annuities sets a minimum paid-up or cash value built from 87.5% of the gross considerations, accumulated at a nonforfeiture rate tied to the five-year Treasury yield, less withdrawals and prescribed contract charges. A [[Deferred Annuity|deferred annuity]] with a surrender charge must still pay at least that amount.

> [!example]- Minimum Cash Value and the Options It Buys {Example}
> A whole life insurance of \$100,000 with level annual premiums for life is issued to $(45)$. Using the SULT at $5\%$ as an illustrative nonforfeiture basis, $A_{45} = 0.151609$, $\ddot{a}_{45} = 17.81621$, $A_{55} = 0.235244$ and $\ddot{a}_{55} = 16.05987$. The 21-year and 22-year term insurances of \$100,000 on $(55)$ cost \$7,406.26 and \$8,010.17. Find the minimum cash value at duration 10, the reduced paid-up amount, and the extended term period.
>
> > [!answer]-
> > The nonforfeiture net level premium is $100{,}000(0.151609)/17.81621 = 850.96$, which is below the 4% cap of \$4,000.
> > $$
> > \begin{align*}
> > E &= 1{,}000 + 1.25(850.96) \\
> > &= 2{,}063.70 \\
> > P^{A} &= \frac{15{,}160.90 + 2{,}063.70}{17.81621} \\
> > &= 966.79 \\
> > {}_{10}CV &= 23{,}524.40 - 966.79(16.05987) \\
> > &= 7{,}997.88
> > \end{align*}
> > $$
> > The net level reserve on the same basis is $23{,}524.40 - 850.96(16.05987) = 9{,}858.09$, so \$1,860.21 of the expense allowance is still unrecovered. As reduced paid-up insurance, the cash value buys a smaller lifetime policy.
> > $$
> > \begin{align*}
> > \text{RPU} &= \frac{7{,}997.88}{0.235244} \\
> > &= 33{,}998.22
> > \end{align*}
> > $$
> > As extended term insurance, it pays for the full \$100,000 of cover for more than 21 years but not quite 22, about 21.98 years by linear interpolation between the two term costs.

> [!example]- Testing a Deferred Annuity Surrender Value {Example}
> A single-premium deferred annuity takes a premium of \$50,000 and credits 1.5% a year. A surrender in year 3 pays the account value less a 7% surrender charge. Using an illustrative nonforfeiture rate of $2\%$ and ignoring contract charges, does the surrender value at the end of year 3 meet the nonforfeiture minimum?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{AV}_3 &= 50{,}000(1.015)^3 \\
> > &= 52{,}283.92 \\
> > \text{CSV}_3 &= 0.93(52{,}283.92) \\
> > &= 48{,}624.04 \\
> > \text{Minimum}_3 &= 0.875(50{,}000)(1.02)^3 \\
> > &= 46{,}427.85
> > \end{align*}
> > $$
> > The surrender value exceeds the minimum by \$2,196.19, so the design complies. The minimum grows at the nonforfeiture rate while the surrender charge grades off, so the test is usually tightest in the early years of a contract with a low crediting rate and a high surrender charge.

> [!tip]- How it appears on the exam
> - **ILA-101:** Candidates apply nonforfeiture calculation techniques. They compute a minimum cash value by the adjusted premium method from given actuarial values, convert it into a reduced paid-up amount or an extended term period, and test whether a product's surrender values meet the law.
> - **Design questions:** Short answers ask how the nonforfeiture options differ, which one is the default, and how nonforfeiture requirements constrain the design of whole life, universal life and deferred annuity products.

> [!warning]- Exam traps
> - **Adjusted, not net, premium:** The minimum cash value subtracts the adjusted premium annuity. Using the net level premium gives the net level reserve, which is larger than the minimum by the unrecovered expense allowance.
> - **The 4% cap applies inside the allowance:** The cap limits the nonforfeiture net level premium that the 125% multiplies, not the allowance as a whole. The 1% of face is added in either case.
> - **Loans reduce every option:** An outstanding policy loan is deducted from the cash value before it buys reduced paid-up or extended term insurance, and extended term insurance covers the face less the loan.
> - **Price at the attained age:** The reduced paid-up amount divides by $A_{x+t}$ at the attained age, not by $A_x$ at issue. Using the issue-age value overstates the paid-up face.
