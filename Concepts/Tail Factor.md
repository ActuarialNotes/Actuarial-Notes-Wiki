---
aliases:
  - Tail Development
  - Beyond-Triangle Development
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Tail Factor**

## Definition
==Tail Factor== The tail factor represents the development expected to occur beyond the last age shown in the development triangle.

## Purpose
- Account for long-term development
- Estimate ultimate losses
- Complete the development pattern
- Critical for long-tail lines

## Estimation Methods

### Industry Data
Use published tail factors from industry studies:
- ISO data
- Rating bureau factors
- Reinsurance studies

### Curve Fitting
Fit mathematical curve to development pattern:
```
Common functions:
- Exponential decay
- Power curve: y = a × x^b
- Inverse power: y = a + b/x
```

### Judgment
Based on:
- Line of business characteristics
- Historical settlement patterns
- Claim department experience
- Legal environment

## Example by Line of Business

```
Workers Compensation:
60-ultimate tail: 1.030-1.050
Long development, medical inflation

General Liability:
60-ultimate tail: 1.050-1.100  
Very long tail, legal uncertainty

Medical Malpractice:
60-ultimate tail: 1.100-1.200
Extremely long tail

Auto Physical Damage:
60-ultimate tail: 1.000-1.005
Minimal tail, fast settlement
```

## Impact on Reserves

```
Example:
Reported @ 60 months: $1,000,000

60-Ultimate CDF without tail: 1.020
With tail factor: 1.030

Without tail:
Ultimate = $1,000,000 × 1.020 = $1,020,000

With tail:
Ultimate = $1,000,000 × 1.020 × 1.030 = $1,050,600

Difference: $30,600 (3.0% of reported)
```

## Related Concepts
- [[Development Factor]]
- [[Cumulative Development Factor]]
- [[Long Tail Insurance]]

## References
- Friedland, Chapter 4
