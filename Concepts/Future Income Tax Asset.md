---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2934c69a504355b41abeaf8c6d1f123849b0e2542ba6d4025dbd7bb13ffd0cd8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Future Income Tax Asset.md
---

**The Future Income Tax Asset** (the CIA's *asset for Future Income Taxes* related to policy liabilities, shown on the P&C-1 as deferred tax assets) arose, under pre-[[IFRS 17]] Canadian practice, because the tax deduction for a P&C insurer's claim liabilities is smaller than the claim liabilities it carries. Part XIV of the Income Tax Regulations allows **$95\%$ of the lesser of the reported reserve and the claim liability**. The asset is the tax prepaid on that difference, and the [[Appointed Actuary]] estimated the **effect of discounting it**. The calculation is off the current syllabus: IFRS 17 leaves income taxes, other than those chargeable to the policyholder, out of the insurance liability.

> $$\text{Effect} = \big[\text{RR} - 0.95\min(\text{RR},\ \text{CL})\big] \times t \times (1 - \text{PVF})$$
>
> $$\text{PVF} = \frac{\text{Discounted estimate excl. PfADs} + \text{PfAD}_{\text{IR}}}{\text{Undiscounted estimate}}$$

- **The symbols.** The definitions follow the CIA's 2005 educational note, *Consideration of Future Income Taxes in the Valuation of Policy Liabilities*, which cites Regulation 1408 for the first two:
  - $\text{RR}$, the **reported reserve**, is the net claim liabilities carried in the balance sheet.
  - $\text{CL}$, the **claim liability**, is the net claim liabilities under [[Accepted Actuarial Practice|accepted actuarial practice]], meaning discounted and including the explicit [[Margin for Adverse Deviations|PfADs]].
  - Both are net of reinsurance recoverable and of [[Salvage and Subrogation|salvage and subrogation]] recoverable.
  - $t$ is the future income tax rate.
  - $\text{PVF}$ reflects the time value of money at the selected rate of return **net of the investment-return margin**, which is why the investment-return PfAD, $\text{PfAD}_{\text{IR}}$, sits in its numerator. The ratio above is the note's approximation from the actuary's estimates; given a payout pattern instead, discount it at the rate less that MfAD.
- **The first two factors are the asset itself**: the carried reserve less the deductible amount, times the tax rate. This is the "future tax temporary difference", a prepayment of tax. The last factor turns the asset into the effect of discounting it. The income-statement effect is the change in that balance-sheet effect from one year to the next.
- **Usually immaterial, and the note said so.** It anticipated that "in most cases the effect of discounting the asset for Future Income Taxes would not be material". The formula was offered as a reasonable approximation for checking that assumption. Its worked example came to $0.10\%$ of the actuary's estimate. The effect grows with the discount rate, the length of the payout and any excess of the reported reserve over the claim liability, reaching about $1\%$ in the note's most extreme case. Where it is material, the note has the actuary reflect it in the estimate of the policy liabilities. [[Materiality]] turns on whether the error would change a user's conclusion or course of action.
- **Scope.** The note covers the part of the asset tied to claim liabilities. A part tied to premium liabilities is handled the same way, and future tax items unrelated to policy liabilities fall outside the actuary's valuation.
- **Where candidates lost marks**, per the examiner's reports:
  - Leaving the interest-rate PfAD out of the PVF numerator.
  - Skipping the $\min$.
  - Using gross figures. The unpaid claims on page 20.20 of the Annual Return are **gross**, so the net reported reserve is that amount less reinsurance and salvage and subrogation recoverables.
  - Using $1 - t$ instead of $t$.
  - Defining the asset as arising when the tax deduction *exceeds* the carried liability.
- **What replaced it.** IFRS 17, in force in Canada from January 1, 2023, excludes income taxes from the [[Fulfilment Cash Flows|fulfilment cash flows]], apart from those specifically chargeable to the policyholder. The former CIA standards required consideration of all future income taxes. The tax rule itself survives: section 1400(3) of the Income Tax Regulations, rewritten in IFRS 17 terms, still applies a factor of $0.95$ to the [[Liability for Incurred Claims|liability for incurred claims]] other than structured settlements.

> [!example]- When the Reported Reserve Exceeds the Actuary's Estimate {Example}
> The Appointed Actuary's net claim estimates (\$000s) are:
>
> | Item | Amount |
> |---|---|
> | Undiscounted estimate | 250,000 |
> | Discounted estimate excluding PfADs | 232,000 |
> | PfAD – investment return rate | 1,600 |
> | PfAD – claims development | 17,400 |
> | PfAD – reinsurance recovery | 1,000 |
>
> The reported reserve is $262{,}000$ and the future income tax rate is $26\%$. Calculate the estimated effect of discounting the asset for future income taxes, as an amount and as a percentage of the claim liability.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{CL} &= 232{,}000 + 1{,}600 + 17{,}400 + 1{,}000 \\
> > &= 252{,}000 \\
> > \text{PVF} &= \frac{232{,}000 + 1{,}600}{250{,}000} \\
> > &= 0.9344
> > \end{align*}
> > $$
> >
> > The claim liability is below the reported reserve, so the $\min$ picks $252{,}000$:
> >
> > $$
> > \begin{align*}
> > \text{Effect} &= (262{,}000 - 0.95 \times 252{,}000)(0.26)(1 - 0.9344) \\
> > &= (22{,}600)(0.26)(0.0656) \\
> > &= 385.5
> > \end{align*}
> > $$
> >
> > That is $385.5 / 252{,}000 = 0.15\%$ of the claim liability.
> >
> > **Why the excess matters.** Had the insurer carried exactly the actuary's $252{,}000$, the bracket would be $0.05 \times 252{,}000 = 12{,}600$ and the effect $214.9$, or $0.09\%$. The deduction stops at $95\%$ of the claim liability, so every dollar carried above the actuary's estimate is non-deductible and enlarges the asset.

> [!example]- Working from the Annual Return {Example}
> Page 20.20 of an insurer's Annual Return shows unpaid claims and adjustment expenses of $90{,}000$ (\$000s). Page 20.10 shows $24{,}000$ recoverable from reinsurers on unpaid claims and $1{,}500$ of salvage and subrogation recoverable. The actuary's net claim liability, discounted with PfADs, is $62{,}800$.
>
> The net unpaid claims pay out $55\%$, $30\%$ and $15\%$ over the next three years, at mid-year. The discount rate is $4\%$ with an investment-return MfAD of $0.5\%$, and the future income tax rate is $27\%$. Calculate the estimated effect of discounting the asset for future income taxes.
>
> > [!answer]-
> > **Net the reported reserve down**, since page 20.20 is gross:
> >
> > $$
> > \begin{align*}
> > \text{RR} &= 90{,}000 - 24{,}000 - 1{,}500 \\
> > &= 64{,}500
> > \end{align*}
> > $$
> >
> > **Present value factor**, at the discount rate net of the MfAD, $3.5\%$:
> >
> > $$
> > \begin{align*}
> > \text{PVF} &= 0.55(1.035)^{-0.5} + 0.30(1.035)^{-1.5} + 0.15(1.035)^{-2.5} \\
> > &= 0.5406 + 0.2849 + 0.1376 \\
> > &= 0.9632
> > \end{align*}
> > $$
> >
> > **Effect**, with $\min(64{,}500,\ 62{,}800) = 62{,}800$:
> >
> > $$
> > \begin{align*}
> > \text{Effect} &= (64{,}500 - 0.95 \times 62{,}800)(0.27)(1 - 0.9632) \\
> > &= (4{,}840)(0.27)(0.0368) \\
> > &= 48.1
> > \end{align*}
> > $$
> >
> > That is under $0.1\%$ of the claim liability: a short payout and a low discount rate leave little to discount, the note's typical immaterial case.
