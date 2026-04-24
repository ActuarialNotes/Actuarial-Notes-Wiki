---
aliases:
  - CDF
  - Loss Development Factor
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Cumulative Development Factor**

## Definition
==Cumulative Development Factor (CDF)== is the product of all age-to-age factors from a given age to ultimate, representing the total development expected from that age.

## Formula
```
CDF_{age n to ultimate} = Product of all age-to-age factors from n to ultimate

Example:
Age-to-age factors:
12-24: 1.500
24-36: 1.167
36-48: 1.057
48-Ult: 1.020

CDF 12-Ult = 1.500 × 1.167 × 1.057 × 1.020 = 1.896
```

## Calculation Table
```
Age    Age-to-Age    CDF to Ultimate
12     1.500         1.896
24     1.167         1.264
36     1.057         1.084
48     1.020         1.033
Ult    1.000         1.000
```

## Uses

### Project Ultimate Losses
```
Ultimate = Reported Losses × CDF

Example:
Reported @ 12 months: $600,000
12-Ult CDF: 1.896
Ultimate: $600,000 × 1.896 = $1,137,600
```

### Calculate % Reported
```
% Reported = 1 / CDF

Example:
12-Ult CDF: 1.896
% Reported @ 12 months: 1/1.896 = 52.7%
% Unreported: 1 - 0.527 = 47.3%
```

## Related Concepts
- [[Age-to-Age Factor#Definition]]
- [[Development Factor#Definition]]
- [[Chain Ladder Method#Definition]]

## References
- Friedland, Chapter 4
