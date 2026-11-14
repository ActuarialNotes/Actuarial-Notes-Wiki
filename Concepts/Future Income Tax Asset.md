---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0cb396596fbcca1898d59866aa909e41099899fa37c1e6f3ebcb78f4497fdaf4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Future Income Tax Asset.md
---

A **Future Income Tax Asset** is the tax a P&C insurer has prepaid because its tax deduction for claim liabilities is smaller than the claim liabilities it carries. It is the CIA's *asset for Future Income Taxes* related to policy liabilities, shown on the P&C-1 as deferred tax assets, and it belongs to pre-[[IFRS 17]] Canadian practice.

Part XIV of the Income Tax Regulations allows **$95\%$ of the lesser of the reported reserve and the claim liability**. The asset is the tax prepaid on the difference, and the [[Appointed Actuary]] estimated the **effect of discounting it**. The calculation is off the current syllabus, because IFRS 17 leaves income taxes, other than those chargeable to the policyholder, out of the insurance liability.

Following the CIA's 2005 educational note, *Consideration of Future Income Taxes in the Valuation of Policy Liabilities*, the effect of discounting the asset is

> $$\text{Effect} = \big[\text{RR} - 0.95\min(\text{RR},\ \text{CL})\big] \times t \times (1 - \text{PVF})$$

- $\text{RR}$, the **reported reserve**, is the net claim liabilities carried in the balance sheet.
- $\text{CL}$, the **claim liability**, is the net claim liabilities under [[Accepted Actuarial Practice|accepted actuarial practice]], meaning discounted and including the explicit [[Margin for Adverse Deviations|PfADs]].
- $t$ is the future income tax rate.
- $\text{PVF}$ is a present value factor at the selected rate of return **net of the investment-return margin**.

The note cites Regulation 1408 for the definitions of $\text{RR}$ and $\text{CL}$. Both are net of reinsurance recoverable and of [[Salvage and Subrogation|salvage and subrogation]] recoverable. The first two factors are the asset itself: the carried reserve less the deductible amount, times the tax rate. This is the "future tax temporary difference", a prepayment of tax. The last factor turns the asset into the effect of discounting it. The income-statement effect is the change in that balance-sheet effect from one year to the next.

The note covers the part of the asset tied to claim liabilities. A part tied to premium liabilities is handled the same way, and future tax items unrelated to policy liabilities fall outside the actuary's valuation.

From the actuary's estimates, the note approximates the present value factor as

> $$\text{PVF} = \frac{\text{Discounted estimate excl. PfADs} + \text{PfAD}_{\text{IR}}}{\text{Undiscounted estimate}}$$

- $\text{PfAD}_{\text{IR}}$ is the investment-return PfAD, which sits in the numerator because the factor is net of that margin.

> [!example]- What is the effect of discounting this insurer's asset for future income taxes? {Example}
> The Appointed Actuary's net claim estimates (\$000s) are:
>
> | Item | Amount |
> | :--- | ---: |
> | Undiscounted estimate | 250,000 |
> | Discounted estimate excluding PfADs | 232,000 |
> | PfAD – investment return rate | 1,600 |
> | PfAD – claims development | 17,400 |
> | PfAD – reinsurance recovery | 1,000 |
>
> The reported reserve is $262{,}000$ and the future income tax rate is $26\%$.
>
> > [!answer]-
> > - The claim liability is $232{,}000 + 1{,}600 + 17{,}400 + 1{,}000 = 252{,}000$.
> > - The present value factor is $(232{,}000 + 1{,}600)/250{,}000 = 0.9344$.
> > - The claim liability is below the reported reserve, so the $\min$ picks $252{,}000$, and the bracket is $262{,}000 - 0.95 \times 252{,}000 = 22{,}600$.
> > - The effect is $22{,}600 \times 0.26 \times 0.0656 = 385.5$, which is $0.15\%$ of the claim liability.
> > - Had the insurer carried exactly $252{,}000$, the bracket would be $12{,}600$ and the effect $214.9$, or $0.09\%$. Every dollar carried above the actuary's estimate is non-deductible and enlarges the asset.

## Materiality of the effect

The note anticipated that "in most cases the effect of discounting the asset for Future Income Taxes would not be material". The formula was offered as a reasonable approximation for checking that assumption. Its worked example came to $0.10\%$ of the actuary's estimate. The effect grows with the discount rate, the length of the payout and any excess of the reported reserve over the claim liability, reaching about $1\%$ in the note's most extreme case. Where it is material, the note has the actuary reflect it in the estimate of the policy liabilities. [[Materiality]] turns on whether the error would change a user's conclusion or course of action.

## Working from the Annual Return

The unpaid claims on page 20.20 of the Annual Return are **gross**, so the net reported reserve is that amount less reinsurance and salvage and subrogation recoverables. Given a payout pattern instead of the actuary's estimates, the present value factor discounts it at the rate less the investment-return MfAD.

> [!example]- What is the effect of discounting the asset, working from this Annual Return? {Example}
> Page 20.20 of an insurer's Annual Return shows unpaid claims and adjustment expenses of $90{,}000$ (\$000s). Page 20.10 shows $24{,}000$ recoverable from reinsurers on unpaid claims and $1{,}500$ of salvage and subrogation recoverable. The actuary's net claim liability, discounted with PfADs, is $62{,}800$. The net unpaid claims pay out $55\%$, $30\%$ and $15\%$ over the next three years, at mid-year. The discount rate is $4\%$ with an investment-return MfAD of $0.5\%$, and the future income tax rate is $27\%$.
>
> > [!answer]-
> > - Page 20.20 is gross, so the reported reserve is $90{,}000 - 24{,}000 - 1{,}500 = 64{,}500$.
> > - The discount rate net of the MfAD is $3.5\%$.
> > - The three payments discount to $0.55(1.035)^{-0.5} = 0.5406$, $0.30(1.035)^{-1.5} = 0.2849$ and $0.15(1.035)^{-2.5} = 0.1376$.
> > - The present value factor is their sum, $0.9632$.
> > - With $\min(64{,}500,\ 62{,}800) = 62{,}800$, the bracket is $64{,}500 - 0.95 \times 62{,}800 = 4{,}840$.
> > - The effect is $4{,}840 \times 0.27 \times 0.0368 = 48.1$, under $0.1\%$ of the claim liability. A short payout and a low discount rate leave little to discount.

## Under IFRS 17

IFRS 17, in force in Canada from January 1, 2023, excludes income taxes from the [[Fulfilment Cash Flows|fulfilment cash flows]], apart from those specifically chargeable to the policyholder. The former CIA standards required consideration of all future income taxes. The tax rule itself survives: section 1400(3) of the Income Tax Regulations, rewritten in IFRS 17 terms, still applies a factor of $0.95$ to the [[Liability for Incurred Claims|liability for incurred claims]] other than structured settlements.

> [!trap] Leaving the interest-rate PfAD out of the present value factor
> Examiners took marks off for a present value factor of discounted estimate over undiscounted estimate alone. The factor is net of the investment-return margin, so $\text{PfAD}_{\text{IR}}$ belongs in its numerator. In the first example, leaving it out gives $0.928$ in place of $0.9344$.
