---
aliases:
  - Cape Cod
  - Stanard-Bühlmann
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Cape Cod Method**

## Definition
==Cape Cod Method== The Cape Cod method (also called Stanard-Bühlmann) is a reserving technique that estimates expected loss ratios from the data itself, using reported losses and exposure to iteratively determine ultimate losses.

## Formula
```
ELR = Σ(Reported Losses) / Σ(Exposures × % Reported)

Ultimate_i = ELR × Exposure_i

IBNR_i = Ultimate_i - Reported_i

Where:
% Reported = 1 / CDF
```

## Comparison to BF Method

### Bornhuetter-Ferguson
- Requires **a priori** expected loss ratio
- External estimate needed
- Fixed ELR for all years

### Cape Cod  
- **Derives** expected loss ratio from data
- Internal estimate from reported losses
- Single ELR estimated from all years combined

## Methodology

### Step 1: Calculate % Reported
```
% Reported = 1 / CDF_to_ultimate

Example:
12-month CDF: 1.896
% Reported at 12 months: 1/1.896 = 52.7%
```

### Step 2: Calculate Expected Loss Ratio
```
ELR = Total Reported / Σ(Exposures × % Reported)
```

### Step 3: Calculate Ultimate Losses
```
Ultimate = ELR × Exposure (for each year)
```

### Step 4: Calculate IBNR
```
IBNR = Ultimate - Reported
```

## Complete Example
```
Given Data:
AY    Exposure    Reported    Age    CDF      % Rptd
2020  $5M         $2,800      60mo   1.010    99.0%
2021  $5.5M       $2,900      48mo   1.033    96.8%
2022  $6M         $2,850      36mo   1.084    92.2%
2023  $6.5M       $2,600      24mo   1.264    79.1%
2024  $7M         $1,750      12mo   1.896    52.7%

Step 1: Calculate weighted exposures
AY 2020: $5M × 0.990 = $4.95M
AY 2021: $5.5M × 0.968 = $5.32M
AY 2022: $6M × 0.922 = $5.53M
AY 2023: $6.5M × 0.791 = $5.14M
AY 2024: $7M × 0.527 = $3.69M
Total: $24.63M

Step 2: Calculate ELR
Total Reported: $12,900
ELR = $12,900 / $24.63M = 52.38%

Step 3: Calculate ultimates
AY 2020: $5M × 0.5238 = $2,619 (vs reported $2,800)
AY 2021: $5.5M × 0.5238 = $2,881
AY 2022: $6M × 0.5238 = $3,143
AY 2023: $6.5M × 0.5238 = $3,405
AY 2024: $7M × 0.5238 = $3,667
Total Ultimate: $15,714

Step 4: Calculate IBNR
Total IBNR = $15,714 - $12,900 = $2,814
```

## When to Use

**Preferred when:**
- No reliable a priori expected loss ratio
- Want to derive ELR from data
- Exposure levels vary significantly
- Mix of business changing

**Less appropriate when:**
- Strong external information available
- Known changes not reflected in data
- Very immature years dominate

## Related Concepts
- [[Bornhuetter-Ferguson Method]]
- [[Expected Loss Method]]
- [[Development Factor]]

## References
- Friedland, Chapter 5
