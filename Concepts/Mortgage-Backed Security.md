---
aliases:
  - Mortgage-backed Security
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ab629df6889c85fdf2f4471ab28327d136ee56e344edf5fa6a7ec525354b49c5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mortgage-Backed Security.md
---
A **Mortgage-Backed Security** (MBS) is a bond whose cash flows come from a pool of [[Mortgage Loan|mortgage loans]]: the borrowers' interest, scheduled principal and prepayments are collected by a servicer and passed to the investors. An **agency passthrough** gives each investor a pro rata share of a pool guaranteed by Ginnie Mae, Fannie Mae or Freddie Mac, so the investor bears little default risk but all of the [[Prepayment Risk|prepayment risk]]. A **collateralized mortgage obligation** (CMO) carves the same cash flows into tranches that share out that prepayment risk.

The servicer keeps a fee for collecting payments and handling delinquencies, and the agency keeps a guarantee fee for promising timely payment. The rate investors receive, the net coupon, is

> $$\text{Net coupon} = \text{WAC} - \text{servicing fee} - \text{guarantee fee}$$

- $\text{WAC}$ is the pool's weighted average coupon, the mortgage rate the borrowers pay.

The passthrough rate is therefore below the WAC. Each month, the cash flow to investors is

> $$\text{CF}_t = \text{Net interest}_t + \text{Scheduled principal}_t + \text{Prepayment}_t$$

- $t$ is the month.
- $\text{Net interest}_t$ is the net coupon on the month's starting balance.
- $\text{Scheduled principal}_t$ is the principal in the borrowers' level payment at the WAC.
- $\text{Prepayment}_t$ is the principal paid ahead of schedule.

## Prepayment conventions

The single monthly mortality (SMM) is the fraction of the balance left after the month's scheduled principal that is prepaid in the month. The conditional prepayment rate (CPR) is its annualised equivalent, so

> $$\text{SMM} = 1 - (1 - \text{CPR})^{1/12}$$

The SMM applies to the balance after the month's scheduled principal.

100% PSA assumes a CPR of 0.2% in the first month, rising by 0.2% a month to 6% at month 30 and level after that. A pool is quoted as a multiple of it, such as 150 PSA, rather than as a model of borrower behavior. At a speed of $\text{PSA}$, the CPR in month $t$ is

> $$\text{CPR}_t = \frac{\text{PSA}}{100} \times 6\% \times \min\!\left(\frac{t}{30},\ 1\right)$$

- $t$ is the loan age in months.

The CPR depends on the age of the loans, not the age of the security. A seasoned pool past month 30 prepays at the full $6\% \times \text{PSA}/100$ from its first month as a security.

> [!example]- What is this passthrough's first-month cash flow to investors? {Example}
> A newly issued agency passthrough is backed by a $\$100$ million pool of 30-year fixed-rate mortgages with a WAC of 6.5%. The servicing and guarantee fees total 0.5%, so the net coupon is 6.0%. Prepayments run at 150 PSA.
>
> > [!answer]-
> > - The borrowers' monthly payment at $i = 0.065/12$ over 360 months is $100{,}000{,}000 \times i/\left(1 - (1+i)^{-360}\right) = \$632{,}068.02$.
> > - Their interest is $100{,}000{,}000 \times i = \$541{,}666.67$, so the scheduled principal is $632{,}068.02 - 541{,}666.67 = \$90{,}401.36$.
> > - The investors' net interest is $100{,}000{,}000 \times 0.06/12 = \$500{,}000.00$.
> > - In month 1 the CPR is $1.5 \times 0.2\% = 0.3\%$, so $\text{SMM} = 1 - (1 - 0.003)^{1/12} = 0.0002503444$.
> > - The prepayment is $0.0002503444 \times 99{,}909{,}598.64 = \$25{,}011.81$, on the balance after scheduled principal.
> > - The cash flow to investors is $500{,}000.00 + 90{,}401.36 + 25{,}011.81 = \$615{,}413.17$.
> > - The servicer and the agency keep the other $\$41{,}666.67$ of interest, and the pool balance falls to $\$99{,}884{,}586.83$.

## Agency credit

Ginnie Mae securities carry the full faith and credit of the U.S. government, and Fannie Mae and Freddie Mac securities carry the guarantee of those government-sponsored enterprises. Agency MBS are therefore priced as rate products, and their spread over Treasuries pays mainly for the prepayment option.

## Collateralized mortgage obligations

In a **sequential-pay CMO**, the tranches receive interest on their own balances, but all principal goes to the first tranche until it is retired, then to the second, and so on. The early tranches get short, fairly stable cash flows and the last tranche a long one, so investors can match the MBS to liabilities of different lengths.

A **planned amortization class** (PAC) tranche receives principal on a fixed schedule as long as prepayments stay within a band of speeds, such as 100 to 300 PSA. The **support** (companion) tranches absorb the excess or shortfall, so they carry the prepayment risk the PAC investors avoid. The pool's total prepayment risk is unchanged. CMOs only redistribute it, as tranching redistributes default risk in [[Structured Finance]].

> [!example]- How are this month's interest and principal allocated in this sequential-pay CMO? {Example}
> A sequential-pay CMO has tranches A, B and C with original balances of $\$40$ million, $\$35$ million and $\$25$ million, each paying a 6.0% coupon. At the start of a month, tranche A has $\$2$ million left, and B and C are untouched. The pool pays $\$3.5$ million of principal, scheduled and prepaid, that month.
>
> > [!answer]-
> > - Each tranche earns interest on its own balance at $0.06/12 = 0.5\%$ a month: $\$10{,}000$ to A, $\$175{,}000$ to B and $\$125{,}000$ to C.
> > - Principal goes to A until it is retired, so A receives $\min(3{,}500{,}000,\ 2{,}000{,}000) = \$2{,}000{,}000$.
> > - The rest, $3{,}500{,}000 - 2{,}000{,}000 = \$1{,}500{,}000$, goes to B, which now has $\$33.5$ million.
> > - C receives interest only. Its principal does not start until B is gone, which is why the last tranche is the longest and the most exposed to extension when rates rise.

## Negative convexity

When rates fall, borrowers refinance and principal returns at par just when it is worth more, so the price rises less than a bond's would. When rates rise, prepayments slow and the security lengthens as it loses value. The [[Convexity|convexity]] is negative, and the security's duration is measured as effective duration under a prepayment model.

Insurers hold agency MBS for their liquidity, credit quality and spread. Their shortening when rates fall can open a mismatch against fixed liabilities, which [[Asset-Liability Management|asset-liability management]] must monitor.

> [!trap] Paying investors the WAC
> The borrowers' payment and the scheduled principal come from the WAC, but the investors' interest uses the net coupon. In the passthrough example, paying investors the 6.5% WAC gives $\$541{,}666.67$ of interest in month 1, overstating it by the $\$41{,}666.67$ of fees.
