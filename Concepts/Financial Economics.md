---
aliases:
  - Underwriting Profit Margin
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e76d664eab149e4eef19cda312a3bb57e838697424eaa20771e89217c3a19803
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Economics.md
---
**Financial economics** is the study of how capital markets value securities and the return investors require for bearing risk. Applied to general insurance, it treats a policy as a set of cash flows and a claim on the insurer's capital. The premium, and so the **underwriting profit margin** (UPM) on the [[Underwriting Profit|underwriting profit]], is then the amount that gives the owners a fair return once investment income, taxes and risk are counted. D'Arcy and Dyer (1997) set out four such models: the target total rate of return, the insurance CAPM, discounted cash flow and option pricing.

> $$\text{TRR} = \frac{IA}{S}\,IR + \frac{P}{S}\,\text{UPM}$$

> $$\text{UPM} = -k\,R_f + \beta_u\big[E(R_m) - R_f\big]$$

> $$PV(P) = PV(L) + PV(E) + PV(T_{UW}) + PV(T_{II})$$

> $$\text{UPM} = 1 - \frac{L + E}{P}$$

- **Symbols:** $\text{TRR}$ is the target total rate of return on equity, $IA$ is investable assets, $S$ is the owners' equity, $IR$ is the investment return and $P$ is premium. $k$ is the funds generating coefficient, the average time the insurer holds premium before paying losses and expenses, and $\beta_u$ is the underwriting beta. $R_f$ is the risk-free rate and $E(R_m) - R_f$ is the market risk premium. In the cash flow model, $L$ is losses and loss adjustment expenses, $E$ is underwriting expenses, and $T_{UW}$ and $T_{II}$ are the taxes on underwriting and investment income.
- **Target total rate of return:** The return on equity is the investment return plus the underwriting return, both expressed per unit of equity. Once investment income is projected, the UPM is whatever is needed to reach the target, so $\text{UPM} = (S/P)\big[\text{TRR} - (IA/S)\,IR\big]$. The paper sets the target at the [[Cost of Capital|cost of equity]] from the CAPM, $\text{TRR} = R_f + \beta_e\big[E(R_m) - R_f\big]$, using the insurer's equity beta. Equity must be the owners' real investment, not statutory surplus, which would distort the margin.
- **Insurance CAPM:** Fairley's model gives the insurer the risk-free rate on the premium it holds, $-k\,R_f$, plus a premium for systematic underwriting risk, $\beta_u\big[E(R_m) - R_f\big]$. It ignores the insurer's actual investment performance. A long-tailed line has a large $k$, so its indicated UPM is lower. The Hill and Modigliani tax version adds the taxation of underwriting and investment income, which raises the indicated margin in the paper's example.
- **Limits of the CAPM:** The CAPM prices only risk that is systematic with market returns, and ignores catastrophe risk, insurer-specific risk and the cost of bankruptcy. Its margin is therefore likely to be too low, as the studies the paper cites found.
- **Discounted cash flow:** The risk-adjusted discount technique, first used in the 1982 Massachusetts automobile rate hearings and based on Myers and Cohn, sets the premium equal to the present value of losses, expenses and the taxes on underwriting and investment income. Losses are discounted at a risk-adjusted rate below the risk-free rate, which compensates the insurer for putting capital at risk. The UPM is a by-product of this method rather than an input. Its difficulties are choosing that rate and how much equity to allocate, for how long.
- **Internal rate of return:** The paper notes that the NCCI's discounted cash flow approach is an [[Internal Rate of Return|internal rate of return]] calculation. It finds the premium at which the equity holders' cash flows earn the required return.
- **Option pricing:** Doherty and Garven value the policyholders' claim, the government's tax claim and the equity as options on the insurer's assets, priced with the [[Black-Scholes Model|Black-Scholes]] formula by [[Risk-Neutral Valuation|risk-neutral valuation]], so that the insurer's option to default has a value. The fair premium makes the market value of equity equal to the equity put in. This part of the paper is outside the sections GI-201 assigns.
- **Pension assumptions:** RET-201 asks for the financial economics perspective on pension assumptions. On that view, a [[Pension Plan|pension plan's]] liability is valued like a bond, at [[Discount Rate|discount rates]] that reflect the risk of the benefit cash flows, rather than at the expected return on the plan's assets. The traditional actuarial view uses the expected return for budgeting and funding.

> [!example]- Two Indications for a Liability Line {Example}
> An insurer prices a liability line whose premium is paid out as illustrative losses and expenses: 40% after half a year, 35% after a year and a half and 25% after three years. The risk-free rate is 4%, the market risk premium is 7% and the underwriting beta is 0.15.
>
> (a) Find the UPM by the insurance CAPM.
>
> (b) The insurer's equity beta is 1.1, its investable assets are three times its equity, it expects to earn 5% on them, and it writes premium of twice its equity. Find the UPM by the target total rate of return model.
>
> > [!answer]-
> > **(a)** The funds generating coefficient is the payment-weighted holding period.
> > $$
> > \begin{align*}
> > k &= 0.40(0.5) + 0.35(1.5) + 0.25(3.0) \\
> > &= 1.475 \\
> > \text{UPM} &= -1.475(4\%) + 0.15(7\%) \\
> > &= -5.90\% + 1.05\% \\
> > &= -4.85\%
> > \end{align*}
> > $$
> > The interest earned while the premium is held outweighs the small premium for systematic risk.
> >
> > **(b)** The CAPM sets the target, and investment income supplies part of it.
> > $$
> > \begin{align*}
> > \text{TRR} &= 4\% + 1.1(7\%) \\
> > &= 11.7\% \\
> > \text{UPM} &= \tfrac{1}{2}\big[11.7\% - 3(5\%)\big] \\
> > &= -1.65\%
> > \end{align*}
> > $$
> > Investment income alone returns 15% on equity, above the 11.7% target, so the insurer can accept an underwriting loss. The TRR model uses the whole balance sheet and the actual investment return, while the insurance CAPM uses the line's payout and the risk-free rate.

> [!example]- Discounted Cash Flow Premium for a One-Year Policy {Example}
> A one-year policy has expenses of \$25 paid at inception and expected losses of \$75 paid at the end of the year. The insurer allocates \$60 of equity to it for the year, earns the risk-free rate of 5% on the equity and on the premium less expenses, and pays tax at an illustrative 21% on underwriting and investment income at year end. Losses are discounted at a risk-adjusted 3%, and every other cash flow at 5%. Find the premium and the UPM.
>
> > [!answer]-
> > The underwriting tax is $0.21(P - 100)$ and the investment income tax is $0.21 \times 0.05 \times (60 + P - 25)$, both paid at year end. Dividing $0.21$ and $0.21 \times 0.05$ by $1.05$ gives $0.20$ and $0.01$.
> > $$
> > \begin{align*}
> > P &= \frac{75}{1.03} + 25 + 0.20(P - 100) + 0.01(35 + P) \\
> > &= 72.816 + 25 - 20 + 0.35 + 0.21P \\
> > 0.79P &= 78.166 \\
> > P &= 98.94
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{UPM} &= 1 - \frac{75 + 25}{98.94} \\
> > &= -1.07\%
> > \end{align*}
> > $$
> > The premium of \$98.94 is less than the \$100 of losses and expenses, because the insurer earns investment income before it pays the losses. Discounting losses at the risk-free 5% in place of 3% would lower it further, so the gap between the two rates is what pays for the risk.

> [!tip]- How it appears on the exam
> - **GI-201:** The objective asks candidates to calculate an underwriting profit margin under different financial economics models, from D'Arcy and Dyer's sections on the target total rate of return, the insurance CAPM and discounted cash flow. Expect given rates, betas, payout patterns and balance-sheet ratios, and a written part on each model's weaknesses, such as the CAPM's neglect of catastrophe and bankruptcy risk.
> - **RET-201:** The objective asks candidates to describe the perspectives on selecting pension assumptions, including financial economics. The question shapes are written: contrast a market-consistent valuation of the liability with one that discounts at the expected return on assets, and explain what each is used for.

> [!warning]- Exam traps
> - **The sign of $k R_f$:** In the insurance CAPM, the investment term enters as $-k\,R_f$. Adding it raises the margin for long-tailed lines, which is the opposite of what holding premium longer should do.
> - **Which beta:** The TRR model's target uses the insurer's equity beta, and the insurance CAPM uses the underwriting beta of the line. Putting the equity beta into Fairley's formula gives an implausibly large margin.
> - **Ratios the wrong way up:** The TRR formula multiplies by $S/P$, the equity-to-premium ratio, and investment income is $IA/S$ times $IR$. Inverting either ratio gives a margin several times too large or too small.
> - **The UPM in the cash flow model:** The discounted cash flow model solves for the premium, and the margin is computed from it afterward. A negative UPM there doesn't mean the policy is unprofitable, because the premium already covers the risk-adjusted cost of every cash flow.
