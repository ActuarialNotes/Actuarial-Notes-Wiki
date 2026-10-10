---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e6237c4c104f2c4de54f486f064094696300d15243f29c4062e5b5d977d10ee8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Corporate Finance.md
---

**Corporate Finance** is the study of three decisions a firm makes in pursuit of shareholder value: which projects and businesses to invest in, how to finance them with debt and equity, and how much cash to return to its owners. A decision creates value when it raises the present value of the firm's future free cash flows, discounted at a rate that reflects their risk, by more than it costs.

> $$V_0 = \sum_{t=1}^{\infty} \frac{\text{FCF}_t}{(1+\text{WACC})^t}$$

> $$\text{WACC} = \frac{E}{D+E}\,k_e + \frac{D}{D+E}\,k_d\,(1-T)$$

> $$k_e = r_f + \beta\left(E[R_m] - r_f\right)$$

> $$V_0 = \frac{\text{NOPLAT}_1\left(1 - g/\text{RONIC}\right)}{\text{WACC} - g}$$

- **Symbols:** $\text{FCF}_t$ is the free cash flow the operations generate in year $t$, after taxes and after the investment needed to grow, and available to all the firm's investors. $E$ and $D$ are the market values of equity and debt, $k_e$ and $k_d$ their required returns, and $T$ the marginal tax rate. In the cost of equity, $r_f$ is the risk-free rate and $\beta$ is the stock's [[Beta|beta]]. In the last block, $\text{NOPLAT}_1$ is next year's net operating profit less adjusted taxes, $g$ the constant growth rate and $\text{RONIC}$ the return on new invested capital.
- **The investment decision:** The firm should accept every project whose [[Net Present Value|net present value]] at a rate matching the project's risk is positive. Choosing and ranking projects is [[Capital Budgeting|capital budgeting]], and the rate a project must clear is its hurdle rate, the [[Cost of Capital|cost of capital]] for that risk rather than for the firm as a whole.
- **The financing decision:** The mix of debt and equity is the [[Capital Structure|capital structure]]. With no taxes or frictions it does not change value (Modigliani and Miller), so the choice turns on the frictions. Debt adds the value of an interest tax shield and disciplines managers, while it also brings the expected costs of financial distress and less flexibility. A target structure balances these, often set to keep a chosen credit rating.
- **The payout decision:** Cash the firm cannot invest above the cost of capital should be returned through dividends or share repurchases. Paying it out does not create value by itself, but holding it in projects that earn less than their cost of capital destroys value.
- **Value creation:** The last block is the key value driver formula that Koller, Goedhart and Wessels build their valuation framework on. Growth adds value only when the return on new capital exceeds the WACC; when $\text{RONIC} = \text{WACC}$ the formula reduces to $\text{NOPLAT}_1 / \text{WACC}$, whatever the growth rate.
- **Insurers and other financial firms:** An insurer's policyholder liabilities are part of its operations rather than its financing, so the enterprise approach above is hard to apply. Insurers are usually valued on an equity basis instead, discounting the cash flows to shareholders at the cost of equity, with required capital treated as an investment the business must make. [[Reinsurance]], sidecars and other third-party capital are financing choices in the same framework, since they replace capital the insurer would otherwise hold.
- **Related decisions:** Acquisitions and divestitures are investment decisions on a larger scale (see [[Mergers and Acquisitions]]), and both rest on the same test of value against price.

> [!example]- WACC and the Value of a Growing Perpetuity of Free Cash Flow {Example}
> A firm targets a capital structure of 60% equity and 40% debt at market values. The risk-free rate is 4%, its equity beta is 1.2, the market risk premium is 5%, its pre-tax cost of debt is 6% and its tax rate is 25%. Free cash flow next year is expected to be \$70 million, growing at 2% a year forever. Find the WACC and the value of operations, and the value if the WACC were one point higher.
>
> > [!answer]-
> > The cost of equity comes from the CAPM, and the cost of debt is taken after tax.
> > $$
> > \begin{align*}
> > k_e &= 0.04 + 1.2(0.05) \\
> > &= 0.10 \\
> > k_d(1-T) &= 0.06(0.75) \\
> > &= 0.045 \\
> > \text{WACC} &= 0.60(0.10) + 0.40(0.045) \\
> > &= 0.078 \\
> > V_0 &= \frac{70}{0.078 - 0.02} \\
> > &= 1{,}206.9
> > \end{align*}
> > $$
> > The operations are worth about \$1,207 million. At a WACC of 8.8%, the same cash flows are worth $70/0.068 = 1{,}029.4$, about 15% less. A one-point error in the discount rate moves value far more than a one-point error in most cash flow assumptions, which is why the cost of capital deserves as much care as the forecast.

> [!example]- A Leveraged Recapitalisation with an Interest Tax Shield {Example}
> An all-equity firm is worth \$1,000 million and pays tax at 25%. It issues \$300 million of permanent debt and uses the proceeds to repurchase shares. Ignoring distress costs, find the value of the levered firm. Then suppose the extra leverage raises the present value of expected distress costs by \$40 million.
>
> > [!answer]-
> > With taxes, Modigliani and Miller's levered value adds the present value of the perpetual tax shield, $T \times D$.
> > $$
> > \begin{align*}
> > V_L &= V_U + T \times D \\
> > &= 1{,}000 + 0.25(300) \\
> > &= 1{,}075
> > \end{align*}
> > $$
> > The \$75 million gain goes to the shareholders who remain, since the repurchase was at a fair price. With \$40 million of distress costs the net gain is \$35 million. This trade-off is the basis for a target capital structure: borrowing adds value until the marginal tax benefit equals the marginal cost of distress. For an insurer the limit usually comes sooner, from the capital its regulator and rating agencies require.

> [!tip]- How it appears on the exam
> - **CFE-201 learning outcome 1a:** Candidates recommend an optimal capital structure for given business objectives and competitive conditions. The answer weighs the tax shield against distress costs, rating targets and the insurer's regulatory capital, and it reads from Koller's section on setting a target capital structure.
> - **CFE-201 learning outcome 1b:** Candidates value a business or project with a discounted cash flow model, which needs the WACC or the cost of equity, a forecast of free cash flow and a continuing value. Non-financial factors and flexibility ([[Capital Budgeting|real options]]) enter the same objective.
> - **CFE-201 learning outcome 1c:** Candidates assess whether an acquisition, divestiture or reinsurance transaction creates value. The test is the same in each case: compare the present value of what the firm gains with the price it pays.
> - **Written answers:** CFE-201 is a written-answer exam, so most questions mix a short calculation with a recommendation that must be justified from the case facts.

> [!warning]- Exam traps
> - **Firm-wide rate for every project:** A project riskier than the firm's average needs a higher hurdle rate than the WACC. Using the firm's WACC accepts too many risky projects and rejects too many safe ones.
> - **Cash flows and rates that don't match:** Free cash flow to the firm is discounted at the WACC, and cash flow to equity at the cost of equity. Discounting equity cash flows at the WACC overstates value.
> - **Pre-tax cost of debt:** The interest tax shield enters the WACC through $k_d(1-T)$. Leaving the cost of debt pre-tax, and then also adding the tax shield to the cash flows, counts it twice or not at all.
> - **Book weights:** The weights in the WACC are market values or a target structure, not the balance sheet's book values. Book equity understates the weight of equity for most firms that create value.
> - **Growth for its own sake:** Growth at a return equal to the cost of capital adds nothing. A candidate who raises $g$ in the key value driver formula without checking RONIC against WACC will overstate value.
