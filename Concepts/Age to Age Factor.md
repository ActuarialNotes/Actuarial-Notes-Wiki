---
aliases:
  - Link Ratio
  - ATF
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Age-to-Age Factor**

## Definition
==Age-to-Age Factor== (also called link ratio) is the ratio of cumulative losses at one development age to cumulative losses at the prior development age, representing the development expected between those two ages.

## Formula
```
Age-to-Age Factor = Losses at age (n+1) / Losses at age n

Example:
12-24 month factor = Losses @ 24 months / Losses @ 12 months
```

## Calculation from Triangle
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

## Selection Methods

### Simple Average
```
Average of all years: (1.500 + 1.500 + 1.500) / 3 = 1.500
```

### Volume Weighted
```
Sum of age 24 / Sum of age 12
= (750 + 825 + 900) / (500 + 550 + 600)
= 2,475 / 1,650 = 1.500
```

### Median
```
Use middle value to reduce outlier impact
```

### Latest Periods
```
Weight recent years more heavily
Example: Average last 3 years only
```

## Related Concepts
- [[Development Factor#Definition]]
- [[Link Ratio#Definition]]
- [[Cumulative Development Factor#Definition]]
- [[Chain Ladder Method#Definition]]

## References
- Friedland, Chapter 4
