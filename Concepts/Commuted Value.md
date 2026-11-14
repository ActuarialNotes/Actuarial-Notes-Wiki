---
aliases:
  - Portability Option
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e1eee065394faff58954058aa137b00c109a1456fee4b3714c2b055f57b20d25
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commuted Value.md
---

The **Commuted Value** ($CV$) of a pension is the lump sum that is actuarially equivalent to it: the present value, on a basis set by the standards of practice, of the [[Deferred Annuity|deferred pension]] a [[Vesting|vested]] member has earned. In Canada a [[Defined Benefit Plan|defined benefit]] member who terminates before retirement can usually take the commuted value out of the plan instead of the deferred pension, subject to locking-in, tax and funding limits.

For a member aged $x$ with an accrued pension of $B$ a year payable from age $r$, the commuted value is

> $$CV_x = B \cdot v_{\text{CV}}^{(r-x)} \cdot \ddot{a}_r^{(12)}$$

- $v_{\text{CV}}^{(r-x)}$ is the discount factor for the $r-x$ years of deferral on the prescribed rates.
- $\ddot{a}_r^{(12)}$ is the monthly [[Life Annuity|life annuity-due]] factor at $r$, including any guaranteed period or joint and survivor form the plan provides.

Canadian pension standards commonly pay the commuted value as the death benefit before retirement. The value therefore carries no survival discount between $x$ and $r$, and the formula has no ${}_{r-x}p_x$.

> [!trap] Applying a survival discount before retirement
> Applying ${}_{r-x}p_x$ before retirement understates the value when the plan pays the commuted value on pre-retirement death. Use the survival factor only when the question says there is no such death benefit.

## The CIA basis

Section 3500 of the [[Canadian Institute of Actuaries (CIA)|CIA's]] Standards of Practice prescribes the assumptions so that every plan pays the same value for the same pension. The interest rates are taken each month from Government of Canada bond yields plus a spread based on provincial and corporate bond yields, with one rate for the first 10 years and another thereafter. With those rates $i_1$ and $i_2$, the discount factor for $n$ years is

> $$v_{\text{CV}}^{(n)} = (1+i_1)^{-\min(n,\,10)}\,(1+i_2)^{-\max(n-10,\,0)}$$

The first rate applies only to the first 10 years from the calculation date, so the annuity at $r$ is valued at the ultimate rate. Mortality is a prescribed Canadian pensioner table projected with a prescribed improvement scale, and an indexed pension is valued at rates reduced for the expected indexing.

The commuted value is not the solvency liability. A solvency or wind-up valuation may value retirees at annuity purchase rates, so a question that gives both bases expects them kept apart.

## Interest rate sensitivity

A deferred pension has a long [[Duration|duration]], so a fall of 1% in the prescribed rates can raise the value of a young member's pension by a third. Members who can choose when to leave therefore watch rates, and a lump sum paid when rates are low drains more assets than the funding basis expected.

> [!example]- What is this member's commuted value, and what is it when both rates are 1% lower? {Example}
> A member aged 45 terminates with a vested pension of $\$15{,}000$ a year payable from 65. The illustrative prescribed rates are 4.0% for the first 10 years and 4.5% thereafter, and the monthly annuity-due factor at 65 is 14.19. When both rates are 1% lower, the factor at 65 is 15.62.
>
> > [!answer]-
> > - The 20 years of deferral are discounted 10 years at each rate: $v_{\text{CV}}^{(20)} = (1.04)^{-10}(1.045)^{-10} = 0.435014$.
> > - The commuted value is $15{,}000(0.435014)(14.19) = \$92{,}593$.
> > - At the lower rates, $v_{\text{CV}}^{(20)} = (1.03)^{-10}(1.035)^{-10} = 0.527502$.
> > - The commuted value becomes $15{,}000(0.527502)(15.62) = \$123{,}594$.
> > - A fall of 1% in the rates raises the commuted value by 33.5%, an effective duration of about 30 years.

## Portability options

A terminating member may leave the deferred pension in the plan, transfer the value to a locked-in vehicle such as a locked-in retirement account, transfer it to another registered plan, or use it to buy a [[Life Annuity|life annuity]] from an insurer. Locked-in money must be used for retirement income, not spent, which is how the legislation preserves the pension's purpose.

## Transfer limits

The Income Tax Act caps the amount that moves tax-free to a locked-in [[Registered Retirement Savings Plan|RRSP]] at a prescribed factor times the lifetime pension given up. The excess is paid to the member in cash as taxable income. A plan that is underfunded on a solvency basis transfers only part of the value at once, with the balance paid later, so that leavers do not take more than their share of the assets. The part paid at once is

> $$T_{\text{now}} = TR \times CV_x$$

- $TR$ is the plan's transfer ratio, its solvency assets over its solvency liabilities, capped at 1.

> [!example]- How much of this commuted value can be locked in tax-free, and how much can the plan pay at once? {Example}
> A member aged 48 terminates from an Ontario plan with a pension of $\$40{,}000$ a year from 65. The illustrative prescribed rates are 2.5% for 10 years and 3.0% thereafter, and the annuity factor at 65 is 16.44. The plan's transfer ratio is 0.90, and the prescribed transfer factor for a member under 50 is 9.0.
>
> > [!answer]-
> > - The pension is deferred 17 years, 10 at 2.5% and 7 at 3.0%.
> > - The commuted value is $40{,}000(1.025)^{-10}(1.03)^{-7}(16.44) = \$417{,}698$.
> > - The tax-free limit is $9.0 \times 40{,}000 = \$360{,}000$, so $417{,}698 - 360{,}000 = \$57{,}698$ is paid as taxable cash.
> > - The plan pays $0.90 \times 417{,}698 = \$375{,}928$ now.
> > - It holds back $\$41{,}770$, which it pays later with interest once the deficiency is funded or the regulator's period runs out.

## Sponsor risk

A lump-sum option or window is an [[Embedded Option|embedded option]] the member holds. Members in poor health and members who leave when rates are low take it most, which is [[Adverse Selection|adverse selection]] against the plan. Each payment is a settlement that crystallizes any loss in [[Plan Curtailment|pension accounting]]. In the United States the same option is governed by the minimum lump-sum rules, which use corporate bond segment rates and a prescribed mortality table.
