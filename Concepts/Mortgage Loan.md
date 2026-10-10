---
aliases:
  - Residential Mortgage
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0aa38a342fe9054a34a4f33a6910549fc1c40101dc1cca7a0c6f3092615fcc8a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mortgage Loan.md
---
A **Mortgage Loan** is a loan secured by a lien on real property, which the lender can take and sell through foreclosure if the borrower stops paying. A **residential mortgage** finances a home and is repaid from the borrower's income; a **commercial mortgage** finances an income-producing property, such as an office, apartment or warehouse building, and is repaid from the property's rent. Most are repaid by level monthly payments under an [[Loan Amortization|amortization]] schedule, and the borrower's right to repay early is the source of the lender's [[Prepayment Risk|prepayment risk]].

> $$M = B_0 \, \frac{i}{1 - (1+i)^{-n}}$$

> $$B_t = M \, a_{\overline{n-t}|\,i}$$

> $$LTV = \frac{\text{Loan amount}}{\text{Property value}}$$

> $$DSCR = \frac{NOI}{\text{Annual debt service}}$$

- **Symbols:** $B_0$ is the amount borrowed, $i$ the monthly rate (the annual contract rate divided by 12), $n$ the number of monthly payments and $M$ the level payment. $B_t$ is the [[Outstanding Balance|outstanding balance]] after $t$ payments, the [[Present Value|present value]] of the payments still due. $NOI$ is the property's net operating income, rent less operating expenses, and annual debt service is $12M$.
- **Amortization:** Each payment pays the month's interest, $i B_{t-1}$, and the rest reduces principal, so early payments are mostly interest and the balance falls slowly at first. An [[Amortization Schedule|amortization schedule]] lists the split for every month.
- **Fixed and adjustable rates:** A fixed-rate mortgage keeps the same rate and payment for its whole term. An adjustable-rate mortgage (ARM) resets to an index plus a margin, usually after an initial fixed period, with caps on each reset and over the life of the loan, so the borrower bears more of the interest rate risk and the lender less.
- **Residential underwriting:** Lenders look at the borrower's credit score, payment-to-income ratio and LTV. A higher LTV leaves less equity to absorb a fall in house prices, so conventional U.S. loans above 80% LTV usually require private mortgage insurance.
- **Commercial underwriting:** A commercial loan is underwritten mainly on the property: the LTV measures the cushion against a fall in value, and the DSCR measures how far income can fall before it no longer covers the payments. Commercial loans are typically non-recourse, often amortize over 25 to 30 years but mature in 5 to 10 with a balloon payment, and so carry refinancing risk at maturity.
- **Prepayment and its protection:** Residential borrowers can usually prepay without penalty, which is why residential pools prepay quickly when rates fall. Commercial mortgages held by insurers usually carry a lockout period, a prepayment penalty or **yield maintenance**, a payment that makes the lender whole for the interest it gives up.
- **Default and recovery:** On default, the lender forecloses or takes the property and sells it, so its recovery depends on the property's value against the balance, net of legal and selling costs. A falling market raises default rates and lowers recoveries at the same time.
- **The insurer's view:** Life insurers hold commercial mortgage loans directly as long-term, fixed-rate assets with a spread over [[Corporate Bond|corporate bonds]] and call protection. They hold residential mortgages mostly through [[Mortgage-Backed Security|mortgage-backed securities]].

> [!example]- Payment and Balance on a 30-Year Fixed Loan {Example}
> A \$400,000 residential mortgage is repaid by level monthly payments over 30 years at a 6.0% annual rate, compounded monthly. Find the monthly payment, the split of the first payment, and the outstanding balance after 5 years.
>
> > [!answer]-
> > The monthly rate is $i = 0.06/12 = 0.005$ and $n = 360$.
> > $$
> > \begin{align*}
> > M &= 400{,}000 \times \frac{0.005}{1 - 1.005^{-360}} \\
> > &= 2{,}398.20 \\
> > \text{Interest}_1 &= 0.005 \times 400{,}000 \\
> > &= 2{,}000.00 \\
> > \text{Principal}_1 &= 2{,}398.20 - 2{,}000.00 \\
> > &= 398.20 \\
> > B_{60} &= 2{,}398.20 \times a_{\overline{300}|\,0.005} \\
> > &= 372{,}217.43
> > \end{align*}
> > $$
> > After five years and \$143,892 of payments, the borrower has repaid only \$27,782.57 of principal. A lender who expects 30 years of interest receives \$372,217 back early if the borrower sells the house or refinances.

> [!example]- LTV and DSCR Tests on a Commercial Loan {Example}
> An insurer's lending policy allows a commercial mortgage of at most 75% LTV with a DSCR of at least 1.25. An apartment building is appraised at \$20 million and earns NOI of \$1.5 million a year. The borrower asks for \$13 million at 6.5%, amortized monthly over 25 years. Test the loan, and find the largest loan the policy allows.
>
> > [!answer]-
> > The monthly rate is $j = 0.065/12$ and the amortization period is 300 months.
> > $$
> > \begin{align*}
> > LTV &= \frac{13{,}000{,}000}{20{,}000{,}000} \\
> > &= 65.0\% \\
> > M &= 13{,}000{,}000 \times \frac{j}{1 - (1+j)^{-300}} \\
> > &= 87{,}776.93 \\
> > DSCR &= \frac{1{,}500{,}000}{12 \times 87{,}776.93} \\
> > &= 1.42
> > \end{align*}
> > $$
> > The loan passes both tests. The largest loan under the LTV test is \$15 million. Under the DSCR test, debt service may be at most $1{,}500{,}000/1.25 = 1{,}200{,}000$ a year, or \$100,000 a month.
> > $$
> > \begin{align*}
> > B_{\max} &= 100{,}000 \times a_{\overline{300}|\,j} \\
> > &= 14{,}810{,}269
> > \end{align*}
> > $$
> > The DSCR test binds, so the policy allows about \$14.81 million.

> [!example]- Yield Maintenance on a Prepaid Commercial Loan {Example}
> A \$10 million interest-only commercial mortgage pays 6.5% a year in monthly installments. With 48 months left, the borrower prepays, and the Treasury yield for the remaining term is 4.25%. The yield maintenance clause pays the present value, at the Treasury rate, of the interest lost. Find the payment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Lost interest} &= 10{,}000{,}000 \times \frac{0.065 - 0.0425}{12} \\
> > &= 18{,}750 \\
> > YM &= 18{,}750 \times a_{\overline{48}|\,0.0425/12} \\
> > &= 18{,}750 \times 44.0701 \\
> > &= 826{,}315
> > \end{align*}
> > $$
> > The insurer can reinvest the \$10 million in Treasuries and, with the \$826,315, replace the interest it would have earned. That is why a commercial mortgage is far less exposed to prepayment risk than a residential pool.

> [!tip]- How it appears on the exam
> - **INV-101:** Learning outcome 1a lists commercial and residential mortgages, from Fabozzi's overview of mortgages and Geltner and Miller's chapter on mortgage basics. Written answers describe the cash flows of a level-payment loan, the difference between fixed and adjustable rates, and the risks to the lender: default, prepayment and, for commercial loans, the balloon at maturity.
> - **Calculations:** Questions ask for a payment, a balance, or the split of a payment into interest and principal, as in the loan amortization questions of Exam FM. Commercial questions add the LTV and DSCR tests, or the size of a loan the tests allow.
> - **Portfolio role:** Questions compare a whole commercial mortgage loan with a [[Mortgage-Backed Security|mortgage-backed security]] or a [[Corporate Bond|corporate bond]] for an insurer's portfolio, weighing spread, call protection and liquidity.

> [!warning]- Exam traps
> - **Monthly, not annual:** Mortgage payments use the monthly rate, the annual rate divided by 12, and the number of months. Using the annual rate over 30 periods gives an annual payment, not twelve times the monthly one.
> - **DSCR uses annual debt service:** NOI is annual, so compare it with twelve monthly payments. Dividing annual NOI by one monthly payment gives a ratio twelve times too large.
> - **Amortization term versus maturity:** A commercial loan amortized over 25 years with a 10-year maturity has a large balloon due in year 10. Treating it as fully repaid by its payments ignores the refinancing risk.
> - **Penalties differ by market:** Residential borrowers usually prepay freely, while commercial borrowers face yield maintenance or lockouts. Applying a residential prepayment speed to a commercial loan overstates its prepayment risk.
