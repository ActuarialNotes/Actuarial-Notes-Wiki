---
aliases:
  - Link Ratio
  - LDF
  - Age-to-Age Factor
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Development Factor**

## Definition
==Development Factor== A development factor (or link ratio) represents the factor by which losses are expected to increase as they mature from one evaluation point to another.

## Types

### Age-to-Age Factor
```
Factor_{n to n+k} = Losses at age n+k / Losses at age n

Example:
12-24 month factor = Losses @ 24mo / Losses @ 12mo
```

### Cumulative Development Factor (CDF)
```
CDF_{n to ultimate} = Ultimate Losses / Losses at age n

Example:
12-to-ultimate CDF = Ultimate / Losses @ 12mo
```

## Calculating Development Factors

### From Triangle
```
         Age (months)
AY       12      24      36
2021     500     750     875
2022     550     825     950
2023     600     900

12-24 factors:
2021: 750/500 = 1.500
2022: 825/550 = 1.500
2023: 900/600 = 1.500

Selected 12-24: 1.500
```

### Volume Weighted
```
Weighted Factor = Σ(Age n+1) / Σ(Age n)

For 12-24:
= (750 + 825 + 900) / (500 + 550 + 600)
= 2,475 / 1,650
= 1.500
```

## Cumulative Factors

### Calculation
```
CDF = Product of age-to-age factors

If:
12-24: 1.500
24-36: 1.167
36-48: 1.057
48-Ult: 1.020 (tail)

Then:
12-Ult CDF = 1.500 × 1.167 × 1.057 × 1.020
           = 1.896
```

## Tail Factor
The development factor from the end of the triangle to ultimate:
- Based on industry data
- Actuarial judgment  
- Curve fitting
- Varies significantly by line

## Related Concepts
- [[Loss Development Triangle]]
- [[Chain Ladder Method]]
- [[Cumulative Development Factor]]
- [[Tail Factor]]

## References
- Friedland, Chapters 3-4
