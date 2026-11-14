---
aliases:
  - Residential Mortgage
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bb2da415526f94d81c8dd94b60ff7963376fbe603303da1404a918b837efeab1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mortgage Loan.md
---
A **Mortgage Loan** is a loan secured by a lien on real property, which the lender can take and sell through foreclosure if the borrower stops paying. A **residential mortgage** finances a home and is repaid from the borrower's income. A **commercial mortgage** finances an income-producing property, such as an office, apartment or warehouse building, and is repaid from the property's rent.

Most mortgages are repaid by level monthly payments under an [[Loan Amortization|amortization]] schedule. For an amount borrowed $B_0$, repaid over $n$ months at a monthly rate $i$, the level payment is

> $$M = B_0 \, \frac{i}{1 - (1+i)^{-n}}$$

- $i$ is the annual contract rate divided by 12, the effective monthly rate for a [[Nominal Interest Rate|nominal rate]] compounded monthly.

The [[Outstanding Balance|outstanding balance]] after $t$ payments is the [[Present Value|present value]] of the payments still due, discounted at the loan's monthly rate:

> $$B_t = M \, a_{\overline{n-t}|\,i}$$

Each payment pays the month's interest, $i B_{t-1}$, and the rest reduces principal. Early payments are mostly interest, so the balance falls slowly at first. An [[Amortization Schedule|amortization schedule]] lists the split for every month.

> [!example]- What are the payment and the balance after 5 years on this mortgage? {Example}
> A $\$400{,}000$ residential mortgage is repaid by level monthly payments over 30 years at a 6.0% annual rate, compounded monthly.
>
> > [!answer]-
> > - The monthly rate is $i = 0.06/12 = 0.005$, and $n = 360$.
> > - $400{,}000 \times 0.005 = 2{,}000$ and $1.005^{-360} = 0.16604$, so the payment is $M = 2{,}000/0.83396 = \$2{,}398.20$.
> > - The first payment's interest is $0.005 \times 400{,}000 = \$2{,}000.00$, so it repays $\$398.20$ of principal.
> > - After 60 payments, 300 remain, so $B_{60} = 2{,}398.20 \, a_{\overline{300}|\,0.005} = \$372{,}217.43$.
> > - After $\$143{,}892$ of payments, the borrower has repaid only $\$27{,}782.57$ of principal.

## Fixed and adjustable rates

A fixed-rate mortgage keeps the same rate and payment for its whole term. An adjustable-rate mortgage (ARM) resets to an index plus a margin, usually after an initial fixed period, with caps on each reset and over the life of the loan. The borrower of an ARM bears more of the interest rate risk and the lender less.

## Residential mortgages

Lenders underwrite a residential mortgage on the borrower's credit score, payment-to-income ratio and loan-to-value ratio (LTV). A higher LTV leaves less equity to absorb a fall in house prices, so conventional U.S. loans above 80% LTV usually require private mortgage insurance. Residential borrowers can usually prepay without penalty, which is why residential pools prepay quickly when rates fall and why the borrower's right to repay early is the source of the lender's [[Prepayment Risk|prepayment risk]]. Insurers hold residential mortgages mostly through [[Mortgage-Backed Security|mortgage-backed securities]].

## Commercial mortgages

A commercial loan is underwritten mainly on the property. The loan-to-value ratio measures the cushion against a fall in the property's value:

> $$LTV = \frac{\text{Loan amount}}{\text{Property value}}$$

The debt service coverage ratio measures how far income can fall before it no longer covers the payments:

> $$DSCR = \frac{NOI}{\text{Annual debt service}}$$

- $NOI$ is the property's net operating income, rent less operating expenses.
- Annual debt service is $12M$.

Commercial loans are typically non-recourse. They often amortize over 25 to 30 years but mature in 5 to 10, with a balloon payment, so they carry refinancing risk at maturity. Life insurers hold them directly as long-term, fixed-rate assets with a spread over [[Corporate Bond|corporate bonds]] and call protection.

> [!example]- Does this loan pass the lending policy, and what is the largest loan the policy allows? {Example}
> An insurer's lending policy allows a commercial mortgage of at most 75% LTV with a DSCR of at least 1.25. An apartment building is appraised at $\$20$ million and earns NOI of $\$1.5$ million a year. The borrower asks for $\$13$ million at 6.5%, amortized monthly over 25 years.
>
> > [!answer]-
> > - The LTV is $13/20 = 65.0\%$, within 75%.
> > - With $j = 0.065/12$ over 300 months, the monthly payment is $\$87{,}776.93$.
> > - The DSCR is $1{,}500{,}000/(12 \times 87{,}776.93) = 1.42$, above 1.25, so the loan passes both tests.
> > - The LTV test allows up to $0.75 \times 20 = \$15$ million.
> > - The DSCR test allows debt service of $1{,}500{,}000/1.25 = \$1{,}200{,}000$ a year, or $\$100{,}000$ a month.
> > - The largest loan with that payment is $100{,}000 \, a_{\overline{300}|\,j} = \$14{,}810{,}269$.
> > - The DSCR test binds, so the policy allows about $\$14.81$ million.

## Prepayment protection

Commercial mortgages held by insurers usually carry a lockout period, a prepayment penalty or **yield maintenance**, a payment that makes the lender whole for the interest it gives up. Commercial loans are therefore far less exposed to prepayment risk than a residential pool.

> [!example]- What does the yield maintenance clause pay on this prepaid loan? {Example}
> A $\$10$ million interest-only commercial mortgage pays 6.5% a year in monthly installments. With 48 months left, the borrower prepays, and the Treasury yield for the remaining term is 4.25%. The clause pays the present value, at the Treasury rate, of the interest lost.
>
> > [!answer]-
> > - The interest lost each month is $10{,}000{,}000 \times (0.065 - 0.0425)/12 = \$18{,}750$.
> > - At the monthly Treasury rate $0.0425/12$, $a_{\overline{48}|} = 44.0701$.
> > - The payment is $18{,}750 \times 44.0701 = \$826{,}315$.
> > - Reinvested in Treasuries with this payment, the $\$10$ million replaces the interest the insurer would have earned.

## Default and recovery

On default, the lender forecloses or takes the property and sells it, so its recovery depends on the property's value against the balance, net of legal and selling costs. A falling market raises default rates and lowers recoveries at the same time.

> [!trap] Using the annual rate for monthly payments
> Mortgage payments use the monthly rate, the annual rate divided by 12, and the number of months. Using the annual rate over 30 periods gives an annual payment, not twelve times the monthly one.
