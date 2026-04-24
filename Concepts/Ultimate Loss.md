---
aliases:
  - Ultimate Losses
  - Final Loss
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Ultimate Loss**

## Definition
==Ultimate Loss== Ultimate loss is the total projected cost of all claims for a given exposure period, including both payments already made and reserves for future payments.

## Formula
```
Ultimate Loss = Paid Losses + Case Reserves + IBNR

Or equivalently:
Ultimate Loss = Reported Losses + IBNR

Where:
Reported = Paid + Case Reserves
```

## Estimation Methods

### Chain Ladder
```
Ultimate = Reported × CDF
```

### Bornhuetter-Ferguson
```
Ultimate = Reported + (Expected × % Unreported)
```

### Expected Loss
```
Ultimate = Expected Loss Ratio × Earned Premium
```

## Uses

### Reserving
- Determine reserve adequacy
- Calculate IBNR
- Financial statement preparation

### Ratemaking
```
Loss Ratio = Ultimate Losses / Earned Premium

Used for rate indications
```

### Pricing
- Estimate expected costs
- Set premiums
- Risk assessment

## Example Projection
```
AY 2023 @ 12 months:
Paid: $300,000
Case Reserves: $200,000
Reported: $500,000

Method 1 - Chain Ladder:
12-Ult CDF: 2.400
Ultimate = $500,000 × 2.400 = $1,200,000

Method 2 - BF:
Expected: $1,000,000
% Unreported: 58.3%
Ultimate = $500,000 + ($1,000,000 × 0.583)
        = $1,083,000

Selected Ultimate: $1,140,000 (blend)
```

## Related Concepts
- [[IBNR Reserves]]
- [[Case Reserves]]
- [[Development Factor]]
- [[Chain Ladder Method]]

## References
- Friedland, Chapters 1-5
