---
aliases:
  - Development Method
  - Link Ratio Method
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Chain Ladder Method**

## Definition
==Chain Ladder Method== The chain ladder method (also called development method or link ratio method) is a reserving technique that projects ultimate losses by applying historical development patterns to current reported losses.

## Methodology

### Step 1: Create Development Triangle
Organize cumulative incurred (or paid) losses by accident year and age.

### Step 2: Calculate Age-to-Age Factors
```
Age-to-Age Factor (Link Ratio) = Loss at age (n+1) / Loss at age n

Example for 12-24 month factor:
AY 2020: 800/500 = 1.600
AY 2021: 825/550 = 1.500
AY 2022: 875/575 = 1.522
Average: 1.541
```

### Step 3: Select Development Factors
Methods for selection:
- **Simple average** - All years equally weighted
- **Weighted average** - Weight by volume
- **Medians** - Reduce impact of outliers
- **Latest periods** - More weight to recent
- **Excluding outliers** - Remove abnormal years

### Step 4: Calculate Cumulative LDFs
```
Cumulative LDF = Product of age-to-age factors

Example:
12-24: 1.541
24-36: 1.150
36-48: 1.055
48-Ultimate: 1.030

12-Ultimate CDF = 1.541 × 1.150 × 1.055 × 1.030 = 1.928
```

### Step 5: Project Ultimate Losses
```
Ultimate = Latest Reported × CDF

Example for AY 2023 @ 12 months:
Reported: $600,000
12-Ult CDF: 1.928
Ultimate: $600,000 × 1.928 = $1,156,800
```

### Step 6: Calculate IBNR
```
IBNR = Ultimate - Reported

Example:
Ultimate: $1,156,800
Reported: $600,000
IBNR: $556,800
```

## Complete Example

```
Incurred Loss Development Triangle:

Age (months)
AY      12      24      36      48      60
2020    500     800     920     968     990
2021    550     825     979     1,028
2022    575     875     1,025
2023    600     900
2024    625

Age-to-Age Factors:
        12-24   24-36   36-48   48-60
2020    1.600   1.150   1.052   1.023
2021    1.500   1.187   1.050
2022    1.522   1.171
2023    1.500
Avg:    1.531   1.169   1.051   1.023

Selected LDFs:
12-24: 1.500
24-36: 1.170
36-48: 1.050
48-60: 1.023
60-Ult: 1.010 (tail)

Cumulative LDFs:
12-Ult: 1.500 × 1.170 × 1.050 × 1.023 × 1.010 = 1.896
24-Ult: 1.170 × 1.050 × 1.023 × 1.010 = 1.264
36-Ult: 1.050 × 1.023 × 1.010 = 1.084
48-Ult: 1.023 × 1.010 = 1.033
60-Ult: 1.010

Ultimate Projections:
AY 2020: 990 × 1.010 = 1,000
AY 2021: 1,028 × 1.033 = 1,062
AY 2022: 1,025 × 1.084 = 1,111
AY 2023: 900 × 1.264 = 1,138
AY 2024: 625 × 1.896 = 1,185
Total Ultimate: 5,496

IBNR Reserve:
Total Ultimate: 5,496
Total Reported: 4,603
IBNR: 893
```

## Advantages
1. **Simple** - Easy to understand and implement
2. **Objective** - Based solely on historical data
3. **Industry standard** - Widely accepted
4. **Flexible** - Can use various averaging methods

## Disadvantages
1. **Assumes stability** - Past patterns continue
2. **No external data** - Ignores known changes
3. **Volatile** - Can be affected by outliers
4. **Requires volume** - Needs sufficient data

## Key Assumptions

### Pattern Stability
- Historical development patterns will continue
- No systematic changes in reporting or settlement
- Consistent case reserving practices

### Homogeneity
- All years develop similarly
- Mix of business is consistent
- No significant operational changes

### Adequate Data
- Sufficient volume for stable patterns
- Mature enough to observe development
- Representative of future experience

## Variations and Refinements

### Weighted vs Unweighted
```
Volume-weighted average:
Factor = Σ(Loss_n+1) / Σ(Loss_n)

Advantages:
- More credibility to larger years
- Reduces impact of small years
- Better when volume varies significantly
```

### Outlier Treatment
- Exclude unusual years
- Cap extreme factors
- Use medians instead of means

### Trend Adjustments
```
Adjust historical losses for trend before developing:
Trended Loss = Historical Loss × Trend Factor
```

### Separate Tail Factor
```
Tail Factor accounts for development beyond triangle:
- Based on industry data
- Actuarial judgment
- Curve fitting methods
```

## Diagnostics and Testing

### Reasonableness Checks
1. **Factor progression** - Should generally decline
2. **Year-over-year consistency** - No wild swings
3. **Ultimate loss ratios** - Within expected range
4. **IBNR patterns** - Reasonable by accident year

### Sensitivity Testing
- Try different averaging methods
- Test various tail factors
- Exclude/include questionable years
- Compare to other methods

## When to Use

**Appropriate for:**
- Stable development patterns
- Sufficient historical data
- Homogeneous books of business
- Standard reserving analyses

**Less appropriate for:**
- Known operational changes
- Unstable patterns
- Limited historical data
- Rapidly evolving lines

## Related Concepts
- [[Loss Development Triangle]]
- [[Development Factor]]
- [[Age-to-Age Factor]]
- [[Cumulative Development Factor]]
- [[IBNR Reserves]]
- [[Tail Factor]]

## References
- Friedland, Chapter 4
- Werner & Modlin, Chapter 6
