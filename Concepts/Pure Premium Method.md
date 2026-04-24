---
aliases:
  - Pure Premium
  - Pure Premium Approach
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Pure Premium Method**

## Definition
==Pure Premium Method== The pure premium method is a ratemaking approach that calculates the insurance rate by first determining the expected loss and LAE per exposure unit, then dividing by the permissible loss ratio to account for expenses and profit.

## Formula

### Basic Pure Premium
```
Pure Premium = (Losses + LAE) / Exposures
```

### Indicated Rate
```
Rate = Pure Premium / (1 - V - Q)

Where:
V = Variable expense ratio
Q = Fixed expense and profit provision (as % of premium)

Or equivalently:
Rate = Pure Premium / Permissible Loss Ratio
```

## Components

### Numerator: Losses + LAE
- Historical losses adjusted to current level
- Developed to ultimate
- Trended to rating period
- Includes ALAE and ULAE

### Denominator: Exposures
- On-level exposures
- Trended to rating period
- Appropriate exposure base
- Consistent with loss period

### Load for Expenses and Profit
```
Permissible Loss Ratio = 1 - Expenses - Profit

Example:
Variable expenses: 20%
Fixed expenses: 10%
Profit & contingency: 5%

Permissible Loss Ratio = 1 - 0.20 - 0.10 - 0.05 = 0.65 or 65%
```

## Step-by-Step Process

### Step 1: Select Historical Data
- Determine experience period
- Organize by accident year
- Verify data quality

### Step 2: Develop Losses to Ultimate
```
Ultimate Losses = Reported Losses × LDF

Example:
Reported at 12 months: $800,000
LDF to ultimate: 1.250
Ultimate: $800,000 × 1.250 = $1,000,000
```

### Step 3: Trend Losses
```
Trended Losses = Ultimate × Trend Factor^periods

Example:
Ultimate: $1,000,000
Annual trend: 5%
Periods from exposure to rating midpoint: 2.0
Trend factor: 1.05^2.0 = 1.1025
Trended: $1,000,000 × 1.1025 = $1,102,500
```

### Step 4: Calculate Exposures
```
On-Level Exposures = Historical Exposures × On-Level Factors
Trended Exposures = On-Level Exposures × Trend Factors
```

### Step 5: Calculate Pure Premium
```
Pure Premium = Trended Losses / Trended Exposures
```

### Step 6: Load for Expenses and Profit
```
Rate = Pure Premium / (1 - V - Q)
```

### Step 7: Calculate Rate Change
```
Rate Change = (Indicated Rate / Current Rate) - 1
```

## Example Calculation

```
Historical Data (AY 2023):
Losses + LAE: $1,200,000 at 24 months maturity
Exposures: 5,000 units

Development:
LDF from 24 to ultimate: 1.150
Ultimate Losses: $1,200,000 × 1.150 = $1,380,000

Trending:
Loss trend: 4% annually
Midpoint AY 2023 to midpoint rating period: 2.5 years
Trend factor: 1.04^2.5 = 1.1041
Trended losses: $1,380,000 × 1.1041 = $1,523,658

Exposure trend: 1% annually  
Trend factor: 1.01^2.5 = 1.0252
Trended exposures: 5,000 × 1.0252 = 5,126

Pure Premium:
= $1,523,658 / 5,126
= $297.27 per exposure

Underwriting provisions:
Variable expenses: 22%
Fixed expenses: 8%
Profit & contingency: 5%
Permissible loss ratio: 1 - 0.22 - 0.08 - 0.05 = 0.65

Indicated Rate:
= $297.27 / 0.65
= $457.34 per exposure

Current Rate: $425.00

Indicated Change:
= ($457.34 / $425.00) - 1
= 7.6%
```

## Advantages
1. **Intuitive** - Easy to understand conceptually
2. **Exposure-based** - Focuses on expected cost per unit
3. **Detailed** - Can analyze frequency and severity separately
4. **Flexible** - Accommodates various adjustments

## Disadvantages
1. **Expense allocation** - Requires fixed/variable split
2. **Exposure trending** - Additional complexity
3. **Circularity** - Rate depends on expenses which depend on rate

## When to Use

**Preferred for:**
- New products with limited premium data
- Significant exposure changes
- Combining with frequency-severity analysis
- Lines where exposure base is very stable

**Less suitable for:**
- Mature products with stable rates
- When exposure data is unreliable
- Rapidly changing market conditions

## Comparison to Loss Ratio Method

| Aspect | Pure Premium | Loss Ratio |
|--------|--------------|------------|
| Focus | Loss per exposure | Loss per premium |
| Trending | Both losses and exposures | Only losses |
| Complexity | Higher | Lower |
| Best for | Exposure-driven | Premium-driven |

## Related Concepts
- [[Loss Ratio Method]]
- [[Trend]]
- [[Loss Development Factor (LDF)]]
- [[Permissible Loss Ratio]]
- [[Underwriting Profit]]
- [[Fixed Expenses]]
- [[Variable Expenses]]

## References
- Werner & Modlin, Chapter 5
- CAS Ratemaking Principles
