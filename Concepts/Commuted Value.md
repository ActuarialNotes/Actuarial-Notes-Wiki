---
aliases:
  - Portability Option
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fc9366c7fbf1662b4e0ab0815ed475878adbfbe31660e5cf9896b80787a529af
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commuted Value.md
---
The **Commuted Value** ($CV$) of a pension is the lump sum that is actuarially equivalent to it: the present value, on a basis set by the standards of practice, of the [[Deferred Annuity|deferred pension]] a [[Vesting|vested]] member has earned. In Canada a [[Defined Benefit Plan|defined benefit]] member who terminates before retirement can usually take the commuted value out of the plan instead of the deferred pension. This choice is the plan's portability option, and the commuted value is the amount transferred, subject to locking-in, tax and funding limits.

> $$CV_x = B \cdot v_{\text{CV}}^{(r-x)} \cdot \ddot{a}_r^{(12)}$$

> $$v_{\text{CV}}^{(n)} = (1+i_1)^{-\min(n,\,10)}\,(1+i_2)^{-\max(n-10,\,0)}$$

> $$T_{\text{now}} = TR \times CV_x$$

- **Symbols:** $B$ is the annual pension the member has accrued, payable from age $r$, and $x$ is the member's age at termination. $\ddot{a}_r^{(12)}$ is the monthly [[Life Annuity|life annuity-due]] factor at $r$, including any guaranteed period or joint and survivor form the plan provides. $i_1$ and $i_2$ are the prescribed rates for the first 10 years and for later years, $TR$ is the plan's transfer ratio (solvency assets over solvency liabilities, capped at 1) and $T_{\text{now}}$ is the part of the value that may be paid out at once.
- **The CIA basis:** Section 3500 of the [[Canadian Institute of Actuaries (CIA)|CIA's]] Standards of Practice prescribes the assumptions so that every plan pays the same value for the same pension. The interest rates are taken each month from Government of Canada bond yields plus a spread based on provincial and corporate bond yields, with one rate for the first 10 years and another thereafter. Mortality is a prescribed Canadian pensioner table projected with a prescribed improvement scale, and an indexed pension is valued at rates reduced for the expected indexing.
- **Pre-retirement death:** Canadian pension standards commonly pay the commuted value as the death benefit before retirement. The value therefore carries no survival discount between $x$ and $r$, which is why the first block has no ${}_{r-x}p_x$.
- **Interest rate sensitivity:** A deferred pension has a long [[Duration|duration]], so a fall of 1% in the prescribed rates can raise the value of a young member's pension by a third. Members who can choose when to leave therefore watch rates, and a lump sum paid when rates are low drains more assets than the funding basis expected.
- **Portability options:** A terminating member may leave the deferred pension in the plan, transfer the value to a locked-in vehicle such as a locked-in retirement account, transfer it to another registered plan, or use it to buy a [[Life Annuity|life annuity]] from an insurer. Locked-in money must be used for retirement income, not spent, which is how the legislation preserves the pension's purpose.
- **Transfer limits:** The Income Tax Act caps the amount that moves tax-free to a locked-in [[Registered Retirement Savings Plan|RRSP]] at a prescribed factor times the lifetime pension given up, and pays the excess to the member in cash as taxable income. A plan that is underfunded on a solvency basis transfers only $TR \times CV$ at once, with the balance paid later, so that leavers do not take more than their share of the assets.
- **Sponsor risk:** A lump-sum option or window is an [[Embedded Option|embedded option]] the member holds. Members in poor health and members who leave when rates are low take it most, which is [[Adverse Selection|adverse selection]] against the plan, and each payment is a settlement that crystallizes any loss in [[Plan Curtailment|pension accounting]]. In the United States the same option is governed by the minimum lump-sum rules, which use corporate bond segment rates and a prescribed mortality table.

> [!example]- A Deferred Pension's Commuted Value and Its Rate Sensitivity {Example}
> A member aged 45 terminates with a vested pension of \$15,000 a year payable from 65. With illustrative prescribed rates of 4.0% for the first 10 years and 4.5% thereafter, the monthly annuity-due factor at 65 is 14.19. Find the commuted value, then find it again when both rates are 1% lower, where the factor at 65 is 15.62.
>
> > [!answer]-
> > The 20 years of deferral are discounted 10 years at each rate, and the annuity factor already reflects the ultimate rate.
> > $$
> > \begin{align*}
> > v_{\text{CV}}^{(20)} &= (1.04)^{-10}(1.045)^{-10} \\
> > &= 0.435014 \\
> > CV_{45} &= 15{,}000(0.435014)(14.19) \\
> > &= 92{,}593 \\
> > v_{\text{CV}}^{(20)\prime} &= (1.03)^{-10}(1.035)^{-10} \\
> > &= 0.527502 \\
> > CV_{45}' &= 15{,}000(0.527502)(15.62) \\
> > &= 123{,}594
> > \end{align*}
> > $$
> > A fall of 1% in the rates raises the commuted value by 33.5%, an effective duration of about 30 years. Both the deferral and the annuity at 65 are long, so a lump-sum window opened when rates are low is expensive for the plan.

> [!example]- Tax and Funding Limits on a Transfer {Example}
> A member aged 48 terminates from an Ontario plan with a pension of \$40,000 a year from 65. The illustrative prescribed rates are 2.5% for 10 years and 3.0% thereafter, and the annuity factor at 65 is 16.44. The plan's transfer ratio is 0.90, and the prescribed transfer factor for a member under 50 is 9.0. Find the commuted value, the amount that may go to a locked-in account tax-free, and the amount the plan may pay at once.
>
> > [!answer]-
> > The pension is deferred 17 years: 10 at 2.5% and 7 at 3.0%.
> > $$
> > \begin{align*}
> > CV_{48} &= 40{,}000(1.025)^{-10}(1.03)^{-7}(16.44) \\
> > &= 417{,}698 \\
> > \text{Tax-free limit} &= 9.0(40{,}000) \\
> > &= 360{,}000 \\
> > \text{Cash excess} &= 417{,}698 - 360{,}000 \\
> > &= 57{,}698 \\
> > T_{\text{now}} &= 0.90(417{,}698) \\
> > &= 375{,}928
> > \end{align*}
> > $$
> > The member's full value is \$417,698. Of it, \$360,000 can be locked in without tax and \$57,698 is paid as taxable cash. Because the plan is 90% funded on a solvency basis, it pays \$375,928 now and holds back \$41,770, which it pays later with interest once the deficiency is funded or the regulator's period runs out.

> [!tip]- How it appears on the exam
> - **RET-101 Sponsor Risks:** Written questions ask a candidate to assess the risk a portability option or a lump-sum window creates for the sponsor, such as adverse selection, rate timing, cash flow and settlement charges, and to recommend ways to limit it.
> - **RET-301 Methods:** Calculation questions apply the Section 3500 basis to a terminating member, deferred or immediate, indexed or not, and may add the transfer ratio, the tax transfer limit or a plan's [[Early Retirement|early retirement]] subsidy.
> - **Regulation:** RET-301 questions also ask what a terminating member may do with the value under the pension standards and the Income Tax Act, and how the regulator limits transfers from an underfunded plan.

> [!warning]- Exam traps
> - **No survival discount:** Applying ${}_{r-x}p_x$ before retirement understates the value when the plan pays the commuted value on pre-retirement death. Use the survival factor only when the question says there is no such death benefit.
> - **Two-tier rates:** The first rate applies only to the first 10 years from the calculation date. Discounting the whole deferral at the first rate, or valuing the annuity at 65 at it, mixes the tiers.
> - **The commuted value is not the solvency liability:** The commuted value uses the Section 3500 basis, while a solvency or wind-up valuation may value retirees at annuity purchase rates. A question that gives both bases expects them kept apart.
> - **Cash is not tax-free:** Only the prescribed amount moves to a locked-in RRSP without tax. Calling the whole value a tax-free transfer ignores the cash excess, which is common for older members and for low interest rates.
