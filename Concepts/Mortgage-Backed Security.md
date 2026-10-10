---
aliases:
  - Mortgage-backed Security
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:228bc9e4408f820be7f182b10fe08ea2d6386c2517f7a62f30911a31c2d2b7dd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mortgage-Backed Security.md
---
A **Mortgage-Backed Security** (MBS) is a bond whose cash flows come from a pool of [[Mortgage Loan|mortgage loans]]: the borrowers' interest, scheduled principal and prepayments are collected by a servicer and passed to the investors. An **agency passthrough** gives each investor a pro rata share of a pool guaranteed by Ginnie Mae, Fannie Mae or Freddie Mac, so the investor bears little default risk but all of the [[Prepayment Risk|prepayment risk]]. A **collateralized mortgage obligation** (CMO) carves the same cash flows into tranches that share out that prepayment risk.

> $$\text{Net coupon} = \text{WAC} - \text{servicing fee} - \text{guarantee fee}$$

> $$\text{CPR}_t = \frac{\text{PSA}}{100} \times 6\% \times \min\!\left(\frac{t}{30},\ 1\right)$$

> $$\text{CF}_t = \text{Net interest}_t + \text{Scheduled principal}_t + \text{Prepayment}_t$$

- **Symbols:** WAC is the pool's weighted average coupon, the mortgage rate the borrowers pay, and WAM its weighted average maturity in months. $t$ is the loan age in months. SMM and CPR, the monthly and annual prepayment rates, are defined on [[Prepayment Risk]], with $\text{SMM} = 1 - (1 - \text{CPR})^{1/12}$ applied to the balance left after scheduled principal.
- **The fees:** The servicer keeps a fee for collecting payments and handling delinquencies, and the agency keeps a guarantee fee for promising timely payment. Investors receive the net coupon, so the passthrough rate is below the WAC.
- **The PSA benchmark:** 100% PSA assumes a CPR of 0.2% in the first month, rising by 0.2% a month to 6% at month 30 and level after that. A pool is quoted as a multiple of it, such as 150 PSA, rather than as a model of borrower behavior.
- **Agency credit:** Ginnie Mae securities carry the full faith and credit of the U.S. government, and Fannie Mae and Freddie Mac securities carry the guarantee of those government-sponsored enterprises. Agency MBS are therefore priced as rate products, and their spread over Treasuries pays mainly for the prepayment option.
- **Sequential-pay CMOs:** Tranches receive interest on their own balances, but all principal goes to the first tranche until it is retired, then to the second, and so on. The early tranches get short, fairly stable cash flows and the last tranche a long one, so investors can match the MBS to liabilities of different lengths.
- **PAC and support tranches:** A planned amortization class (PAC) receives principal on a fixed schedule as long as prepayments stay within a band of speeds, such as 100 to 300 PSA. The support (companion) tranches absorb the excess or shortfall, so they carry the prepayment risk the PAC investors avoid. The pool's total prepayment risk is unchanged; CMOs only redistribute it, as tranching redistributes default risk in [[Structured Finance]].
- **Negative convexity:** When rates fall, borrowers refinance and principal returns at par just when it is worth more, so the price rises less than a bond's would. When rates rise, prepayments slow and the security lengthens as it loses value. The [[Convexity|convexity]] is negative, and the security's duration must be measured as effective duration under a prepayment model.
- **Insurer use:** Insurers hold agency MBS for their liquidity, credit quality and spread. Their shortening when rates fall can open a mismatch against fixed liabilities, which [[Asset-Liability Management|asset-liability management]] must monitor.

> [!example]- First-Month Cash Flow of a Passthrough at 150 PSA {Example}
> A newly issued agency passthrough is backed by a \$100 million pool of 30-year fixed-rate mortgages with a WAC of 6.5%. The servicing and guarantee fees total 0.5%, so the net coupon is 6.0%. Prepayments run at 150 PSA. Find the first month's cash flow to investors, split into interest, scheduled principal and prepaid principal.
>
> > [!answer]-
> > The borrowers' monthly payment and its split follow from the WAC, with $i = 0.065/12$ and 360 months. The investors receive the net coupon on the balance.
> > $$
> > \begin{align*}
> > M &= 100{,}000{,}000 \times \frac{i}{1 - (1+i)^{-360}} \\
> > &= 632{,}068.02 \\
> > \text{Scheduled principal} &= 632{,}068.02 - 541{,}666.67 \\
> > &= 90{,}401.36 \\
> > \text{Net interest} &= 100{,}000{,}000 \times 0.06 / 12 \\
> > &= 500{,}000.00
> > \end{align*}
> > $$
> > At 150 PSA in month 1, the CPR is $1.5 \times 0.2\% = 0.3\%$.
> > $$
> > \begin{align*}
> > \text{SMM} &= 1 - (1 - 0.003)^{1/12} \\
> > &= 0.0002503444 \\
> > \text{Prepayment} &= 0.0002503444 \times 99{,}909{,}598.64 \\
> > &= 25{,}011.81 \\
> > \text{CF}_1 &= 500{,}000.00 + 90{,}401.36 + 25{,}011.81 \\
> > &= 615{,}413.17
> > \end{align*}
> > $$
> > The servicer and the agency keep the other \$41,666.67 of interest, and the pool balance falls to \$99,884,586.83. Prepayments are small in month 1 and grow until month 30, when the CPR reaches 9%.

> [!example]- Principal Through a Sequential-Pay CMO {Example}
> A sequential-pay CMO has tranches A, B and C with original balances of \$40 million, \$35 million and \$25 million, each paying a 6.0% coupon. At the start of a month, tranche A has \$2 million left, and B and C are untouched. The pool pays \$3.5 million of principal, scheduled and prepaid, that month. Allocate the month's interest and principal.
>
> > [!answer]-
> > Each tranche earns interest on its own balance, at $0.06/12 = 0.5\%$ a month. Principal goes to A until it is retired, and the rest to B.
> > $$
> > \begin{align*}
> > I_A &= 0.005 \times 2{,}000{,}000 \\
> > &= 10{,}000 \\
> > I_B &= 0.005 \times 35{,}000{,}000 \\
> > &= 175{,}000 \\
> > I_C &= 0.005 \times 25{,}000{,}000 \\
> > &= 125{,}000 \\
> > P_A &= \min(3{,}500{,}000,\ 2{,}000{,}000) \\
> > &= 2{,}000{,}000 \\
> > P_B &= 3{,}500{,}000 - 2{,}000{,}000 \\
> > &= 1{,}500{,}000
> > \end{align*}
> > $$
> > Tranche A is retired, B now has \$33.5 million and becomes the currently paying tranche, and C still receives interest only. If prepayments speed up, B is retired sooner, but C's principal does not start until B is gone, which is why the last tranche is the longest and most exposed to extension when rates rise.

> [!tip]- How it appears on the exam
> - **INV-101:** Learning outcome 1a lists mortgage-backed securities, from Fabozzi's chapters on agency passthroughs and agency CMOs. Written answers describe the cash flows of a passthrough, the role of the servicer and the guarantor, prepayment conventions and the risks to the investor.
> - **Calculations:** Questions ask for a month's cash flow at a given PSA speed, converting PSA to CPR to SMM, or for the allocation of principal and interest among sequential or PAC tranches.
> - **Comparisons:** Questions ask how a CMO structure changes each tranche's exposure to prepayment and extension, and why an insurer might prefer a PAC tranche to a passthrough. They link to [[Prepayment Risk]] and to the tranching ideas on [[Structured Finance]].

> [!warning]- Exam traps
> - **WAC versus net coupon:** The borrowers' payment and the scheduled principal come from the WAC, but the investors' interest uses the net coupon. Paying investors the WAC overstates their interest by the fees.
> - **SMM on the right balance:** The SMM applies to the balance after the month's scheduled principal. Applying it to the starting balance slightly overstates the prepayment.
> - **PSA ramps with loan age:** The CPR depends on the age of the loans, not the age of the security. A seasoned pool past month 30 prepays at the full $6\% \times \text{PSA}/100$ from its first month as a security.
> - **CMOs do not remove risk:** A PAC's stable schedule is paid for by the support tranches, which become very volatile. Saying a CMO "reduces" the pool's prepayment risk confuses redistribution with reduction.
