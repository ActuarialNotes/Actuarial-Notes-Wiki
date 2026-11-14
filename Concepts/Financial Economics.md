---
aliases:
  - Underwriting Profit Margin
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c6185baa53d02caa02dead154d9158ba037cfcb46105373bc2e3d29a96d68109
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Economics.md
---
**Financial Economics** is the study of how capital markets value securities and the return investors require for bearing risk. Applied to general insurance, it treats a policy as a set of cash flows and a claim on the insurer's capital, and sets the premium that gives the owners a fair return once investment income, taxes and risk are counted.

The result is often stated as an **underwriting profit margin** (UPM) on the [[Underwriting Profit|underwriting profit]]. For a premium $P$, the UPM is

> $$\text{UPM} = 1 - \frac{L + E}{P}$$

- $L$ is losses and loss adjustment expenses.
- $E$ is underwriting expenses.

D'Arcy and Dyer (1997) set out four models that indicate it: the target total rate of return, the insurance CAPM, discounted cash flow and option pricing.

## Target total rate of return model

The return on equity is the investment return plus the underwriting return, both expressed per unit of equity, so the target total rate of return is

> $$\text{TRR} = \frac{IA}{S}\,IR + \frac{P}{S}\,\text{UPM}$$

- $IA$ is investable assets.
- $S$ is the owners' equity.
- $IR$ is the investment return.

Once investment income is projected, the UPM is whatever is needed to reach the target:

> $$\text{UPM} = \frac{S}{P}\Big[\text{TRR} - \frac{IA}{S}\,IR\Big]$$

The paper sets the target at the [[Cost of Capital|cost of equity]] from the CAPM, $\text{TRR} = R_f + \beta_e\big[E(R_m) - R_f\big]$, using the insurer's equity beta. Here $R_f$ is the risk-free rate and $E(R_m) - R_f$ is the market risk premium. Equity must be the owners' real investment, not statutory surplus, which would distort the margin.

> [!example]- What UPM does the target total rate of return model indicate for this insurer? {Example}
> The risk-free rate is 4%, the market risk premium is 7% and the insurer's equity beta is 1.1. Its investable assets are three times its equity, it expects to earn 5% on them, and it writes premium of twice its equity.
>
> > [!answer]-
> > - The target is $\text{TRR} = 4\% + 1.1(7\%) = 11.7\%$.
> > - Investment income returns $3 \times 5\% = 15\%$ on equity.
> > - The equity-to-premium ratio is $S/P = 1/2$, so $\text{UPM} = \tfrac{1}{2}(11.7\% - 15\%) = -1.65\%$.
> > - Investment income alone beats the target, so the insurer can accept an underwriting loss.

## Insurance CAPM

The insurance CAPM indicates

> $$\text{UPM} = -k\,R_f + \beta_u\big[E(R_m) - R_f\big]$$

- $k$ is the funds generating coefficient, the average time the insurer holds premium before paying losses and expenses.
- $\beta_u$ is the underwriting beta of the line.

Fairley's model gives the insurer the risk-free rate on the premium it holds, $-k\,R_f$, plus a premium for systematic underwriting risk, $\beta_u\big[E(R_m) - R_f\big]$. It ignores the insurer's actual investment performance. A long-tailed line has a large $k$, so its indicated UPM is lower. The Hill and Modigliani tax version adds the taxation of underwriting and investment income, which raises the indicated margin in the paper's example.

The CAPM prices only risk that is systematic with market returns, and ignores catastrophe risk, insurer-specific risk and the cost of bankruptcy. Its margin is therefore likely to be too low, as the studies the paper cites found.

> [!example]- What UPM does the insurance CAPM indicate for this liability line? {Example}
> The line's losses and expenses are paid 40% after half a year, 35% after a year and a half and 25% after three years. The risk-free rate is 4%, the market risk premium is 7% and the underwriting beta is 0.15.
>
> > [!answer]-
> > - The funds generating coefficient is the payment-weighted holding period, $k = 0.40(0.5) + 0.35(1.5) + 0.25(3.0) = 1.475$.
> > - The investment term is $-1.475 \times 4\% = -5.90\%$, and the risk term is $0.15 \times 7\% = 1.05\%$.
> > - The UPM is $-5.90\% + 1.05\% = -4.85\%$. The interest earned while the premium is held outweighs the small premium for systematic risk.

> [!trap] Using the equity beta in the insurance CAPM
> The target total rate of return model's target uses the insurer's equity beta, and the insurance CAPM uses the underwriting beta of the line. Putting the equity beta into Fairley's formula gives an implausibly large margin.

## Discounted cash flow model

The risk-adjusted discount technique, first used in the 1982 Massachusetts automobile rate hearings and based on Myers and Cohn, sets the premium equal to the present value of the losses, expenses and taxes. The premium is

> $$PV(P) = PV(L) + PV(E) + PV(T_{UW}) + PV(T_{II})$$

- $T_{UW}$ and $T_{II}$ are the taxes on underwriting and investment income.

Losses are discounted at a risk-adjusted rate below the risk-free rate, which compensates the insurer for putting capital at risk. The UPM is a by-product of this method rather than an input, so a negative UPM doesn't mean the policy is unprofitable. The method's difficulties are choosing the risk-adjusted rate and how much equity to allocate, for how long. The paper notes that the NCCI's discounted cash flow approach is an [[Internal Rate of Return|internal rate of return]] calculation, which finds the premium at which the equity holders' cash flows earn the required return.

> [!example]- What premium and UPM does the discounted cash flow model give for this one-year policy? {Example}
> The policy has expenses of \$25 paid at inception and expected losses of \$75 paid at the end of the year. The insurer allocates \$60 of equity to it for the year, earns the risk-free rate of 5% on the equity and on the premium less expenses, and pays tax at an illustrative 21% on underwriting and investment income at year end. Losses are discounted at a risk-adjusted 3%, and every other cash flow at 5%.
>
> > [!answer]-
> > - The underwriting tax is $0.21(P - 100)$, and the investment income tax is $0.21 \times 0.05 \times (60 + P - 25)$, both paid at year end.
> > - Discounting $0.21$ and $0.21 \times 0.05$ for a year at 5% gives $0.20$ and $0.01$.
> > - So $P = 75/1.03 + 25 + 0.20(P - 100) + 0.01(35 + P)$, which is $P = 78.166 + 0.21P$ after collecting terms.
> > - Then $0.79P = 78.166$ and $P = \$98.94$.
> > - The UPM is $1 - 100/98.94 = -1.07\%$. The premium is less than the \$100 of losses and expenses because the insurer earns investment income before it pays the losses.
> > - Discounting losses at the risk-free 5% in place of 3% would lower the premium further, so the gap between the two rates is what pays for the risk.

## Option pricing model

Doherty and Garven value the policyholders' claim, the government's tax claim and the equity as options on the insurer's assets, priced with the [[Black-Scholes Model|Black-Scholes]] formula by [[Risk-Neutral Valuation|risk-neutral valuation]], so that the insurer's option to default has a value. The fair premium makes the market value of equity equal to the equity put in. This part of the paper is outside the sections GI-201 assigns.

## Financial economics and pension assumptions

On the financial economics view, a [[Pension Plan|pension plan's]] liability is valued like a bond, at [[Discount Rate|discount rates]] that reflect the risk of the benefit cash flows, rather than at the expected return on the plan's assets. The traditional actuarial view uses the expected return for budgeting and funding.
