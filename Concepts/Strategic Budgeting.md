---
aliases:
  - Forecasting
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6d5a31eb3e112e9cd97a0278a523979759b93fa7122a087595950277dd9190ae
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Strategic Budgeting.md
---

**Strategic Budgeting** is budgeting that allocates an organization's money and capital to the initiatives its [[Business Strategy|strategy]] calls for, rather than rolling last year's spending forward. **Forecasting** is the companion process of projecting what the organization's revenue, costs, capital and returns will actually be, so that management can see whether the plan is on track and whether it creates value.

Together they create value when they direct resources to activities that earn more than the [[Cost of Capital|cost of capital]] and grow the business at a rate its own earnings can fund. That rate, the sustainable growth rate, is

> $$g = \text{ROE} \times b$$

- $\text{ROE}$ is the return on beginning equity.
- $b$ is the retention ratio, the share of earnings kept rather than paid out.

The sustainable growth rate is the fastest the organization can grow at a constant payout ratio and constant leverage. Growing faster needs new equity, a lower dividend or more leverage.

> [!example]- How much capital is this insurer's premium growth plan short? {Example}
> An insurer has surplus of $\$1{,}000$ million, writes $\$2{,}000$ million of premium and intends to keep its premium-to-surplus ratio at 2 to 1. Its ROE is 12% and it pays 40% of earnings as dividends. The driver-based plan for next year has policy count growing 5% and average premium growing 5%.
>
> > [!answer]-
> > - The sustainable growth rate is $0.12 \times 0.60 = 7.2\%$.
> > - The planned premium is $2{,}000 \times 1.05 \times 1.05 = 2{,}205$, growth of 10.25%.
> > - At 2 to 1, the plan needs surplus of $2{,}205/2 = 1{,}102.5$.
> > - Retained earnings bring surplus to $1{,}000 + 0.60 \times 120 = 1{,}072$.
> > - The plan is short $1{,}102.5 - 1{,}072 = \$30.5$ million of capital.
> > - The insurer must raise the capital, cut the dividend, accept a premium-to-surplus ratio of about 2.06, or slow the plan ([[Capital and Surplus]], [[Insurance Leverage]]).

## Growth and value

The value of a business that grows at rate $g$ is given by the value driver formula,

> $$V_0 = \frac{\text{NOPLAT}_1\left(1 - \dfrac{g}{\text{RONIC}}\right)}{\text{WACC} - g}$$

- $\text{NOPLAT}_1$ is next year's net operating profit less adjusted taxes.
- $\text{RONIC}$ is the return on new invested capital.
- $\text{WACC}$ is the weighted average cost of capital.

Growth adds value only when RONIC exceeds WACC. When the two are equal, growth leaves value unchanged at $\text{NOPLAT}_1 / \text{WACC}$. When RONIC is lower, growth destroys value, so a budget that rewards volume alone can make the organization worse off ([[Economic Value]], [[Return on Capital]]).

> [!example]- What is this unit worth if its new investments earn a RONIC of 15%, 9% or 6%? {Example}
> A business unit expects NOPLAT of $\$100$ million next year and plans to grow at 4% a year. Its WACC is 9%.
>
> > [!answer]-
> > - At 15%, $V_0 = 100(1 - 0.04/0.15)/(0.09 - 0.04) = \$1{,}466.7$ million.
> > - At 9%, $V_0 = 100(1 - 0.04/0.09)/0.05 = \$1{,}111.1$ million.
> > - At 6%, $V_0 = 100(1 - 0.04/0.06)/0.05 = \$666.7$ million.
> > - With no growth the unit is worth $100/0.09 = \$1{,}111.1$ million.
> > - The same 4% growth adds about $\$356$ million at a RONIC of 15%, nothing at 9%, and destroys about $\$444$ million at 6%.
> > - A strategic budget should fund the growth plan only where the investments are expected to earn more than the cost of capital.

## Strategic and operational budgets

The operational budget funds the existing business, and the strategic budget funds the initiatives that move the organization toward its strategic goals. Keeping them separate lets management see what each initiative costs. It also stops initiatives from being cut first whenever the operating budget is tight.

The balanced scorecard sets strategic objectives in four perspectives (financial, customer, internal process, and learning and growth), each with measures, targets and the initiatives meant to reach them. The strategic budget is the set of funded initiatives, so every dollar in it is tied to an objective and a measure.

In zero-based budgeting, each cost is justified from zero in every cycle, rather than budgeted as last year's amount plus an increment. It frees money for strategic initiatives, but it takes much more effort, so organizations often apply it to discretionary costs or rotate it across units.

## Forecasting performance

A forecast starts from an analysis of past performance and the industry. It builds the revenue forecast first, drives the income statement and balance sheet from it, and ends in a continuing value. Returns on capital and growth are usually assumed to fade toward sustainable levels over the forecast, because competition erodes unusually high returns ([[Porter's Five Forces]]).

A driver-based forecast models results from the operational drivers that cause them, such as policy counts, average premium, claim frequency and staffing. A change in assumptions then flows through to the financials and can be run as a scenario.

A rolling forecast is updated every month or quarter and always looks the same distance ahead. It keeps the outlook current when conditions change quickly, where a fixed annual budget goes stale. The organization still needs targets and an approved strategic budget to measure the rolling forecast against.

## Tracking progress

The budget and the forecast are compared with actual results, and the variances are explained by their drivers. Effective tracking pairs lagging financial measures with leading measures and initiative milestones, and reforecasts when assumptions change.

> [!trap] Using one number as both budget and forecast
> A budget is a target used for control and incentives, and a forecast is the best estimate of the outcome. When one number serves as both, managers have a reason to understate the forecast so the target is easy to beat. Keep the two separate.
