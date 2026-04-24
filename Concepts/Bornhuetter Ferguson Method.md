---
aliases:
  - BF Method
  - B-F Method
  - Bornhuetter-Ferguson
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Bornhuetter-Ferguson Method**

## Definition
==Bornhuetter Ferguson Method== The Bornhuetter-Ferguson (BF) method is a reserving technique that combines actual reported losses with an a priori expected loss estimate, weighted by the percentage of losses unreported.

## Formula

```
Ultimate Losses = Reported Losses + (Expected Losses × % Unreported)

Where:
% Unreported = 1 - (1 / CDF)

IBNR = Expected Losses × % Unreported
```

## Methodology

### Step 1: Determine Expected Losses
```
Expected Losses = Expected Loss Ratio × Earned Premium

Or:
Expected Losses = Pure Premium × Exposures

Sources for expected loss ratio:
- Pricing assumptions
- Industry benchmarks  
- Recent historical experience
- Budgeted loss ratio
```

### Step 2: Calculate % Unreported
```
% Unreported = 1 - (1/CDF)

Example:
12-month CDF to ultimate: 1.896
% Unreported at 12 months: 1 - (1/1.896) = 0.473 or 47.3%

Interpretation: 47.3% of ultimate losses not yet reported at 12 months
```

### Step 3: Calculate IBNR
```
IBNR = Expected Losses × % Unreported

Example:
Expected Losses: $1,000,000
% Unreported: 47.3%
IBNR: $1,000,000 × 0.473 = $473,000
```

### Step 4: Calculate Ultimate
```
Ultimate = Reported + IBNR

Example:
Reported: $600,000
IBNR: $473,000
Ultimate: $1,073,000
```

## Complete Example

```
AY 2023 Analysis:

Given Information:
- Earned Premium: $2,000,000
- Reported Losses @ 12 months: $600,000
- Expected Loss Ratio: 65%
- 12-Ult CDF (from development): 1.896

Step 1: Expected Losses
= $2,000,000 × 0.65
= $1,300,000

Step 2: % Unreported
= 1 - (1/1.896)
= 1 - 0.528
= 0.472 or 47.2%

Step 3: IBNR
= $1,300,000 × 0.472
= $613,600

Step 4: Ultimate
= $600,000 + $613,600
= $1,213,600

Comparison to Chain Ladder:
CL Ultimate: $600,000 × 1.896 = $1,137,600
BF Ultimate: $1,213,600
Difference: $76,000 (6.7% higher)
```

## Key Features

### Blending Actuals and Expected
The BF method gives:
- **100% weight** to reported losses
- **0% weight** to expected losses for reported portion
- **100% weight** to expected losses for unreported portion

### Credibility Perspective
```
BF is equivalent to:
- Chain Ladder with 100% credibility on reported
- Expected losses with credibility on unreported

Reported portion: Fully credible (actual data)
Unreported portion: Use a priori estimate
```

## Advantages

1. **Stability** - Less volatile than chain ladder for immature years
2. **Uses external info** - Incorporates expected losses
3. **Exposure responsive** - Reflects premium/exposure changes
4. **Credibility-based** - Logical weighting of information
5. **Works with limited data** - Effective for new years

## Disadvantages

1. **Requires expected losses** - Need credible a priori estimate
2. **Ignores actual emergence** - Doesn't respond to unusual reporting
3. **Selection risk** - Results depend on expected loss ratio choice
4. **Less responsive** - Slower to react to changes

## When to Use

**Preferred for:**
- Immature accident years
- Limited development history
- Known operational changes
- Unstable development patterns
- New products or lines

**Less suitable for:**
- Mature accident years (use Chain Ladder)
- When actual emergence is credible
- Stable, well-developed books
- When expected losses uncertain

## Comparison to Chain Ladder

| Aspect | Chain Ladder | Bornhuetter-Ferguson |
|--------|--------------|---------------------|
| Data used | Historical only | Historical + Expected |
| Volatility | Higher for immature years | Lower |
| Responsiveness | More responsive | Less responsive |
| Best for | Mature years | Immature years |
| Stability | Less stable | More stable |

## Selecting Expected Losses

### Pricing Indication
```
Use loss ratio from rate filing:
Expected LR = Target Loss Ratio from pricing
```

### Historical Average
```
Average loss ratio from recent stable years:
Expected LR = Avg(Historical Loss Ratios)
```

### Blend of Methods
```
Expected LR = w₁(Pricing) + w₂(Historical) + w₃(Industry)
```

### Considerations
- Credibility of each source
- Recent trends
- Known changes
- Regulatory requirements

## Practical Application

### By Accident Year Maturity

**Recent Years (12-24 months)**
- BF typically preferred
- Limited credibility of actual emergence
- Expected losses more reliable

**Middle Years (24-48 months)**
- Blend of BF and CL
- Increasing credibility of actuals
- May use Benktander

**Mature Years (48+ months)**
- Chain Ladder typically preferred
- Actual emergence highly credible
- Less reliance on expected

## Related Concepts
- [[Chain Ladder Method]]
- [[Expected Loss Method]]
- [[Benktander Method]]
- [[Cape Cod Method]]
- [[IBNR Reserves]]
- [[Development Factor]]

## References
- Friedland, Chapter 5
- Bornhuetter & Ferguson, "The Actuary and IBNR"
