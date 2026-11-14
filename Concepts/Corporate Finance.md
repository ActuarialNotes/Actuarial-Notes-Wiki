---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b23a83cd7486c23b4bd1968a8eacd3ceb502f6096162c12578f5792513db5e35
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Corporate Finance.md
---

**Corporate Finance** is the study of three decisions a firm makes in pursuit of shareholder value: which projects and businesses to invest in, how to finance them with debt and equity, and how much cash to return to its owners. A decision creates value when it raises the present value of the firm's future free cash flows, discounted at a rate that reflects their risk, by more than it costs.

The value of a firm's operations, discounting its free cash flows at its weighted average cost of capital (WACC), is

> $$V_0 = \sum_{t=1}^{\infty} \frac{\text{FCF}_t}{(1+\text{WACC})^t}$$

- $\text{FCF}_t$ is the free cash flow the operations generate in year $t$, after taxes and after the investment needed to grow, and available to all the firm's investors.

The WACC is

> $$\text{WACC} = \frac{E}{D+E}\,k_e + \frac{D}{D+E}\,k_d\,(1-T)$$

- $E$ and $D$ are the market values of equity and debt.
- $k_e$ and $k_d$ are the required returns on equity and debt.
- $T$ is the marginal tax rate.

The weights are market values or a target structure, not the balance sheet's book values. The interest tax shield enters through $k_d(1-T)$, so the cost of debt is taken after tax and the tax shield is not added to the cash flows as well.

By the capital asset pricing model, the cost of equity is

> $$k_e = r_f + \beta\left(E[R_m] - r_f\right)$$

- $r_f$ is the risk-free rate.
- $\beta$ is the stock's [[Beta|beta]].
- $E[R_m] - r_f$ is the market risk premium.

> [!example]- What are this firm's WACC and value of operations, and what is the value if the WACC were one point higher? {Example}
> A firm targets a capital structure of 60% equity and 40% debt at market values. The risk-free rate is 4%, its equity beta is 1.2, the market risk premium is 5%, its pre-tax cost of debt is 6% and its tax rate is 25%. Free cash flow next year is expected to be \$70 million, growing at 2% a year forever.
>
> > [!answer]-
> > - The cost of equity is $k_e = 0.04 + 1.2 \times 0.05 = 0.10$.
> > - The after-tax cost of debt is $0.06 \times 0.75 = 0.045$.
> > - The WACC is $0.60 \times 0.10 + 0.40 \times 0.045 = 0.078$.
> > - The free cash flows are a growing perpetuity, so $V_0 = 70/(0.078 - 0.02) = 1{,}206.9$, about \$1,207 million.
> > - At a WACC of 8.8%, the value is $70/0.068 = 1{,}029.4$, about 15% less.

## The investment decision

The firm should accept every project whose [[Net Present Value|net present value]] at a rate matching the project's risk is positive. Choosing and ranking projects is [[Capital Budgeting|capital budgeting]]. The rate a project must clear is its hurdle rate, the [[Cost of Capital|cost of capital]] for that risk rather than for the firm as a whole. Using the firm's WACC for a project riskier than average accepts too many risky projects and rejects too many safe ones.

Acquisitions and divestitures are investment decisions on a larger scale ([[Mergers and Acquisitions|mergers and acquisitions]]), and both rest on the same test of value against price.

## The financing decision

The mix of debt and equity is the [[Capital Structure|capital structure]]. With no taxes or frictions it does not change value (Modigliani and Miller), so the choice turns on the frictions. Debt adds the value of an interest tax shield and disciplines managers, while it also brings the expected costs of financial distress and less flexibility.

With taxes, Modigliani and Miller's value of a firm with permanent debt $D$ is

> $$V_L = V_U + T \times D$$

- $V_U$ is the value of the same firm financed only by equity.
- $T \times D$ is the present value of the perpetual interest tax shield.

A target structure balances the tax shield against the costs of distress, often set to keep a chosen credit rating. Borrowing adds value until the marginal tax benefit equals the marginal cost of distress. For an insurer the limit usually comes sooner, from the capital its regulator and rating agencies require.

> [!example]- What is this firm worth after the recapitalisation, before and after distress costs? {Example}
> An all-equity firm is worth \$1,000 million and pays tax at 25%. It issues \$300 million of permanent debt and uses the proceeds to repurchase shares. The extra leverage raises the present value of expected distress costs by \$40 million.
>
> > [!answer]-
> > - Ignoring distress costs, $V_L = 1{,}000 + 0.25 \times 300 = 1{,}075$.
> > - The \$75 million gain goes to the shareholders who remain, since the repurchase was at a fair price.
> > - After the \$40 million of distress costs, the net gain is \$35 million and the firm is worth \$1,035 million.

## The payout decision

Cash the firm cannot invest above the cost of capital should be returned through dividends or share repurchases. Paying it out does not create value by itself, but holding it in projects that earn less than their cost of capital destroys value.

## The key value driver formula

Koller, Goedhart and Wessels build their valuation framework on the key value driver formula. With constant growth, the value of operations is

> $$V_0 = \frac{\text{NOPLAT}_1\left(1 - g/\text{RONIC}\right)}{\text{WACC} - g}$$

- $\text{NOPLAT}_1$ is next year's net operating profit less adjusted taxes.
- $g$ is the constant growth rate.
- $\text{RONIC}$ is the return on new invested capital.

Growth adds value only when the return on new capital exceeds the WACC. When $\text{RONIC} = \text{WACC}$ the formula reduces to $\text{NOPLAT}_1 / \text{WACC}$, whatever the growth rate.

## Insurers and other financial firms

An insurer's policyholder liabilities are part of its operations rather than its financing, so the enterprise approach above is hard to apply. Insurers are usually valued on an equity basis instead, discounting the cash flows to shareholders at the cost of equity, with required capital treated as an investment the business must make. [[Reinsurance]], sidecars and other third-party capital are financing choices in the same framework, since they replace capital the insurer would otherwise hold.

> [!trap] Discounting cash flows at the wrong rate
> Free cash flow to the firm is discounted at the WACC, and cash flow to equity at the cost of equity. Discounting equity cash flows at the WACC overstates value.
