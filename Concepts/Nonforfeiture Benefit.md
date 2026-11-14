---
aliases:
  - Nonforfeiture
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cde2fa92e18dc19c227f4ef35c53da01e02cc825f73c4399506988184f17ab02
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nonforfeiture Benefit.md
---

A **Nonforfeiture Benefit** is the value a life insurance or deferred annuity policyholder keeps when they stop paying premiums or surrender the contract, so that the reserve built up by the early level premiums is not forfeited to the insurer. For [[Whole Life Insurance|whole life]] and other cash-value policies, it is taken as a cash surrender value, as reduced paid-up insurance or as extended term insurance.

The U.S. Standard Nonforfeiture Law sets the minimum cash value by the adjusted premium method. For a policy of $S$ on $(x)$ with premiums payable for $n$ years, the minimum cash value at duration $t$ is

> $${}_tCV = S\,A_{x+t} - P^{A}\,\ddot{a}_{x+t:\overline{n-t}|}$$

- $P^{A}$ is the adjusted premium.
- All values use the nonforfeiture mortality table and interest rate.

The minimum cash value is a [[Policy Value|prospective policy value]] in which the adjusted premium takes the place of the net premium. Any policy loan is deducted from the cash value.

The adjusted premium is the level premium that pays for the benefits and an initial expense allowance $E$, so it is

> $$P^{A} = \frac{S\,A_x + E}{\ddot{a}_{x:\overline{n}|}}$$

The initial expense allowance is 1% of the face amount plus 125% of the nonforfeiture net level premium, with that premium capped at 4% of the face. It is

> $$E = 0.01\,S + 1.25\,\min\left(P^{NL},\ 0.04\,S\right)$$

- $P^{NL} = S\,A_x / \ddot{a}_{x:\overline{n}|}$ is the nonforfeiture net level premium.

The 4% cap limits the premium that the 125% multiplies, not the allowance as a whole, and the 1% of face is added in either case. The allowance lets an insurer recover its acquisition costs from a policyholder who leaves early, much as the [[Commissioners Reserve Valuation Method|CRVM]] expense allowance does for the reserve. Because $P^{A}$ is larger than $P^{NL}$, the minimum cash value sits below the net level reserve by $(P^{A} - P^{NL})\,\ddot{a}_{x+t:\overline{n-t}|}$, the part of the allowance not yet recovered.

Mortality is the Commissioners Standard Ordinary table for the issue year, now the 2017 CSO. The nonforfeiture interest rate is 125% of the statutory valuation interest rate for the issue year, rounded to the nearest quarter percent, so the minimum moves with the reserve basis. A company may pay more than the minimum and usually does, often through a surrender charge schedule on [[Universal Life Insurance|universal life]].

> [!example]- What is the minimum cash value at duration 10 of this whole life policy? {Example}
> A whole life insurance of $\$100{,}000$ with level annual premiums for life is issued to $(45)$. On an illustrative nonforfeiture basis (the SULT at $5\%$), $A_{45} = 0.151609$, $\ddot{a}_{45} = 17.81621$, $A_{55} = 0.235244$ and $\ddot{a}_{55} = 16.05987$.
>
> > [!answer]-
> > - The nonforfeiture net level premium is $100{,}000(0.151609)/17.81621 = 850.96$, below the 4% cap of $\$4{,}000$.
> > - The expense allowance is $E = 1{,}000 + 1.25(850.96) = 2{,}063.70$.
> > - The adjusted premium is $P^{A} = (15{,}160.90 + 2{,}063.70)/17.81621 = 966.79$.
> > - The minimum cash value is ${}_{10}CV = 23{,}524.40 - 966.79(16.05987) = \$7{,}997.88$.
> > - The net level reserve on the same basis is $23{,}524.40 - 850.96(16.05987) = 9{,}858.09$, so $\$1{,}860.21$ of the expense allowance is still unrecovered.

## Reduced paid-up insurance

The cash value buys a single-premium policy of the same plan with no further premiums. At the nonforfeiture basis, the reduced paid-up amount is

> $$\text{RPU} = \frac{{}_tCV}{A_{x+t}}$$

The divisor is the single premium at the attained age $x+t$, not at the issue age. Reduced paid-up insurance suits a policyholder who wants lifetime cover without premiums and accepts a smaller face.

> [!example]- How much reduced paid-up whole life does a cash value of $\$7{,}997.88$ buy at age 55, where $A_{55} = 0.235244$? {Example}
> - The reduced paid-up amount is $7{,}997.88/0.235244 = \$33{,}998.22$.

## Extended term insurance

The cash value buys term cover for the full face amount, net of any loan, for as long as it will pay for. The term $m$ solves

> $$S\,A^{1}_{x+t:\overline{m}|} = {}_tCV$$

If the cash value is more than the cost of term cover to the policy's expiry, as on an endowment, the excess buys a pure endowment at maturity.

> [!example]- For how long does extended term insurance run on this policy? {Example}
> A $\$100{,}000$ policy on $(55)$ has a cash value of $\$7{,}997.88$. Term covers of $\$100{,}000$ on $(55)$ for 21 and 22 years cost $\$7{,}406.26$ and $\$8{,}010.17$.
>
> > [!answer]-
> > - The cash value is more than the 21-year cost and less than the 22-year cost.
> > - By linear interpolation, the term is $21 + (7{,}997.88 - 7{,}406.26)/(8{,}010.17 - 7{,}406.26) = 21.98$ years.

## The default option

A policyholder who stops paying and makes no election receives the option the policy names as automatic, usually extended term insurance. Some policies, such as those issued on substandard lives, make reduced paid-up insurance the default instead.

## Deferred annuities

The Standard Nonforfeiture Law for Individual Deferred Annuities sets a minimum paid-up or cash value built from 87.5% of the gross considerations, accumulated at a nonforfeiture rate tied to the five-year Treasury yield, less withdrawals and prescribed contract charges. A [[Deferred Annuity|deferred annuity]] with a surrender charge must still pay at least that amount.

> [!example]- Does this deferred annuity's surrender value at the end of year 3 meet the nonforfeiture minimum? {Example}
> A single-premium deferred annuity takes a premium of $\$50{,}000$ and credits 1.5% a year. A surrender in year 3 pays the account value less a 7% surrender charge. Use an illustrative nonforfeiture rate of $2\%$ and ignore contract charges.
>
> > [!answer]-
> > - The account value is $50{,}000(1.015)^3 = 52{,}283.92$.
> > - The surrender value is $0.93(52{,}283.92) = 48{,}624.04$.
> > - The minimum is $0.875(50{,}000)(1.02)^3 = 46{,}427.85$.
> > - The surrender value exceeds the minimum by $\$2{,}196.19$, so the design complies.
> > - The minimum grows at the nonforfeiture rate while the surrender charge grades off, so the test is tightest in the early years of a contract with a low crediting rate and a high surrender charge.

> [!trap] Using the net premium in place of the adjusted premium
> The minimum cash value subtracts the adjusted premium annuity. Using the net level premium gives the net level reserve, which is larger than the minimum by the unrecovered expense allowance ($\$9{,}858.09$ against $\$7{,}997.88$ in the example).
