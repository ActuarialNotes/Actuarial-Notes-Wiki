---
aliases:
  - Forecasting
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a66cd11cf963c801a1405ea99cb4887531d67105df2bec8f33d9e22e7cadc94d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Strategic Budgeting.md
---
**Strategic Budgeting** is budgeting that allocates an organization's money and capital to the initiatives its [[Business Strategy|strategy]] calls for, rather than rolling last year's spending forward. **Forecasting** is the companion process of projecting what the organization's revenue, costs, capital and returns will actually be, so that management can see whether the plan is on track and whether it creates value. Together they create value when they direct resources to activities that earn more than the [[Cost of Capital|cost of capital]] and grow the business at a rate its own earnings can fund.

> $$g = \text{ROE} \times b$$

> $$V_0 = \frac{\text{NOPLAT}_1\left(1 - \dfrac{g}{\text{RONIC}}\right)}{\text{WACC} - g}$$

- **Symbols:** $g$ is the growth rate, ROE is return on beginning equity and $b$ is the retention ratio, the share of earnings kept rather than paid out. ROE times $b$ is the sustainable growth rate, the fastest the organization can grow without new equity or more leverage. In the value driver formula, $V_0$ is the value of the business, $\text{NOPLAT}_1$ is next year's net operating profit less adjusted taxes, RONIC is the return on new invested capital and WACC is the weighted average cost of capital.
- **Value and growth:** The value driver formula shows that growth adds value only when RONIC exceeds WACC. When the two are equal, growth leaves value unchanged at $\text{NOPLAT}_1 / \text{WACC}$, and when RONIC is lower, growth destroys value, so a budget that rewards volume alone can make the organization worse off ([[Economic Value]], [[Return on Capital]]).
- **Strategic and operational budgets:** The operational budget funds the existing business, and the strategic budget funds the initiatives that move the organization toward its strategic goals. Keeping them separate lets management see what each initiative costs and stops initiatives from being cut first whenever the operating budget is tight.
- **Balanced scorecard:** The balanced scorecard sets strategic objectives in four perspectives (financial, customer, internal process, and learning and growth), each with measures, targets and the initiatives meant to reach them. The strategic budget is the set of funded initiatives, so every dollar in it is tied to an objective and a measure.
- **Forecasting performance:** A forecast starts from an analysis of past performance and the industry, builds the revenue forecast first and drives the income statement and balance sheet from it, and ends in a continuing value. Returns on capital and growth are usually assumed to fade toward sustainable levels over the forecast, because competition erodes unusually high returns ([[Porter's Five Forces]]).
- **Driver-based and rolling forecasts:** A driver-based forecast models results from the operational drivers that cause them, such as policy counts, average premium, claim frequency and staffing, so a change in assumptions flows through to the financials and can be run as a scenario. A rolling forecast is updated every month or quarter and always looks the same distance ahead, which keeps the outlook current when conditions change quickly instead of leaving a fixed annual budget to go stale.
- **Zero-based budgeting:** Each cost is justified from zero in every cycle, rather than budgeted as last year's amount plus an increment. It frees money for strategic initiatives, but it takes much more effort, so organizations often apply it to discretionary costs or rotate it across units.
- **Tracking progress:** The budget and the forecast are compared with actual results, and the variances are explained by their drivers. Effective tracking pairs lagging financial measures with leading measures and initiative milestones, reforecasts when assumptions change, and separates the forecast, a best estimate, from the budget target, so that incentives tied to the target don't bias the forecast.

> [!example]- When Does Growth Add Value? {Example}
> A business unit expects NOPLAT of \$100 million next year and plans to grow at 4% a year. Its WACC is 9%. Using the value driver formula, find the unit's value if its new investments earn a RONIC of 15%, 9% or 6%.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > V_{15\%} &= \frac{100\,(1 - 0.04/0.15)}{0.09 - 0.04} \\
> > &= \frac{73.33}{0.05} \\
> > &= 1{,}466.7 \\
> > V_{9\%} &= \frac{100\,(1 - 0.04/0.09)}{0.05} \\
> > &= 1{,}111.1 \\
> > V_{6\%} &= \frac{100\,(1 - 0.04/0.06)}{0.05} \\
> > &= 666.7
> > \end{align*}
> > $$
> > With no growth the unit is worth $100/0.09$, or \$1,111.1 million. At a RONIC of 15% the growth adds about \$356 million of value. At 9% it adds nothing, and at 6% it destroys about \$444 million, even though the forecast shows the same 4% growth in each case. A strategic budget should fund the growth plan only where the investments are expected to earn more than the cost of capital.

> [!example]- A Premium Growth Plan Against Sustainable Growth {Example}
> An insurer has surplus of \$1,000 million and writes \$2,000 million of premium, and it intends to keep its premium-to-surplus ratio at 2 to 1. Its ROE is 12% and it pays 40% of earnings as dividends. The driver-based plan for next year has policy count growing 5% and average premium growing 5%. Find the sustainable growth rate, the planned premium and the capital the plan is short.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > g &= 0.12 \times 0.60 \\
> > &= 7.2\% \\
> > \text{Premium}_1 &= 2{,}000 \times 1.05 \times 1.05 \\
> > &= 2{,}205 \\
> > \text{Surplus needed} &= \frac{2{,}205}{2} \\
> > &= 1{,}102.5 \\
> > \text{Surplus}_1 &= 1{,}000 + 0.60 \times 120 \\
> > &= 1{,}072 \\
> > \text{Shortfall} &= 1{,}102.5 - 1{,}072 \\
> > &= 30.5
> > \end{align*}
> > $$
> > The plan grows premium by 10.25%, well above the 7.2% that retained earnings can support. The insurer must raise about \$30.5 million of capital, cut the dividend, accept a premium-to-surplus ratio of about 2.06, or slow the plan ([[Capital and Surplus]], [[Insurance Leverage]]). A rolling forecast would show the gap again each quarter if the growth assumptions held, so it can be closed before the year ends.

> [!tip]- How it appears on the exam
> - **CP-311:** Candidates explain how strategic budgeting and forecasting create value and sustainable growth, usually in a written answer about a case organization: which initiatives to fund, whether planned growth earns more than the cost of capital, and whether the organization can finance it. A second objective asks candidates to assess how effective an organization's budgeting and forecasting are in tracking its initiatives, judging its use of balanced scorecard measures, driver-based and rolling forecasts, variance analysis and incentives.

> [!warning]- Exam traps
> - **Growth is not value:** Growth adds value only when the return on new capital exceeds the cost of capital. A plan that grows revenue at a RONIC below WACC lowers the value of the business, however good the growth looks in the forecast.
> - **Sustainable growth has conditions:** ROE times retention is the growth rate at a constant payout ratio and constant leverage. Growing faster needs new equity, a lower dividend or more leverage, and an answer should say which.
> - **Budget versus forecast:** A budget is a target used for control and incentives, and a forecast is the best estimate of the outcome. Using one number for both encourages managers to understate the forecast so the target is easy to beat.
> - **Rolling does not mean no plan:** A rolling forecast extends the outlook every period, but the organization still needs targets and an approved strategic budget to measure the forecast against.
