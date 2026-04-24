---
aliases:
  - Trending
  - Trend Factor
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Trend**

## Definition
==Trend== Trend is the systematic change in loss costs or exposures over time, used in ratemaking to project historical experience to future rating periods.

## Types of Trend

### Loss Trend
Change in average claim costs over time due to:
- **Inflation** - General price level changes
- **Medical inflation** - Healthcare cost increases
- **Severity trend** - Average claim size changes
- **Social inflation** - Legal/social environment changes

### Exposure Trend
Change in exposure base values:
- **Payroll growth** (workers comp)
- **Wage inflation**
- **Property values**
- **Economic factors**

### Premium Trend
Change in average premium per exposure:
- Reflects rate changes
- Mix of business shifts
- Coverage changes

## Trend Methods

### Exponential Trend (Compound)
```
Future Value = Historical Value × (1 + r)^n

Where:
r = annual trend rate
n = number of years

Example:
Historical loss: $1,000
Annual trend: 5%
Years: 2.5
Future: $1,000 × 1.05^2.5 = $1,131
```

### Linear Trend (Additive)
```
Future Value = Historical Value × (1 + r × n)

Example:
Historical loss: $1,000
Annual trend: 5%
Years: 2.5
Future: $1,000 × (1 + 0.05 × 2.5) = $1,125
```

## Trend Period Calculation

```
Trend Period = Rating Period Midpoint - Historical Period Midpoint

Example:
Historical: AY 2023 (midpoint 7/1/2023)
Rating: 1/1/2026 - 12/31/2026 (midpoint 7/1/2026)
Trend Period: 3.0 years

Policies earned uniformly, so:
- From 7/1/2023 to 7/1/2026 = 3.0 years
```

## Estimating Trend Rates

### Historical Analysis
```
Fit regression to historical data:
- Collect loss costs by period
- Fit exponential or linear model
- Calculate implied annual trend
```

### External Indices
- CPI (Consumer Price Index)
- Medical CPI
- Wage indices
- Industry benchmarks

### Judgment
- Expected future conditions
- Economic forecasts
- Regulatory environment
- Known changes

## Applications in Ratemaking

### Pure Premium Method
```
Trend both losses and exposures:

Trended Losses = Historical × Loss Trend^years
Trended Exposures = Historical × Exposure Trend^years

Pure Premium = Trended Losses / Trended Exposures
```

### Loss Ratio Method
```
Trend losses only:

Trended Losses = Historical × Loss Trend^years
On-Level Premium = Historical (adjusted for rates)

Loss Ratio = Trended Losses / On-Level Premium
```

## Example Calculation

```
Workers Compensation Rate Indication:

Historical Data (AY 2023):
- Ultimate Losses: $1,000,000
- Exposures: $50,000,000 payroll
- Historical midpoint: 7/1/2023

Rating Period:
- Effective: 1/1/2026
- Midpoint: 7/1/2026

Trend Estimates:
- Loss trend: 4% annually (severity)
- Exposure trend: 2% annually (wage inflation)

Trend Period: 3.0 years (7/1/2023 to 7/1/2026)

Trending:
Loss: $1,000,000 × 1.04^3.0 = $1,124,864
Exposure: $50,000,000 × 1.02^3.0 = $53,030,401

Pure Premium:
= $1,124,864 / $53,030,401
= $0.0212 per $1 of payroll
= $2.12 per $100 of payroll
```

## Related Concepts
- [[Exponential Trend]]
- [[Linear Trend]]
- [[Loss Trend]]
- [[Exposure Trend]]
- [[On-Level Premium]]
- [[ASOP 13 - Trending Procedures]]

## References
- Werner & Modlin, Chapter 8
- ASOP 13
