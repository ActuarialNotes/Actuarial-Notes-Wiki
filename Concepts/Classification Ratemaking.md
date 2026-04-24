---
aliases:
  - Class Relativities
  - Classification Rating
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Classification Ratemaking**

## Definition
==Classification Ratemaking== Classification ratemaking is the process of segmenting risks into classes with similar characteristics and developing relative rates for each class.

## Purpose
- Achieve rate equity
- Reflect cost differences
- Competitive positioning
- Regulatory compliance

## Process

### 1. Define Classes
Group risks by characteristics:
- Age, gender (personal auto)
- Territory
- Vehicle type
- Industry classification (workers comp)
- Construction type (property)

### 2. Calculate Class Relativities
```
Relativity = Class Loss Cost / Base Class Loss Cost

Example - Auto Liability:
Class A losses: $250 per exposure
Base class losses: $200 per exposure
Relativity: $250 / $200 = 1.25 or 125%
```

### 3. Apply Credibility
```
Final Relativity = Z × Indicated + (1-Z) × Current
```

### 4. Constrain if Needed
- Maximum rate change limits
- Competitive considerations
- Regulatory restrictions

## Common Rating Variables

### Personal Auto
- Driver age
- Vehicle year/make/model
- Territory
- Coverage selections
- Prior claims

### Workers Compensation
- Classification code
- Experience modification
- Safety programs  

### Commercial Property
- Construction type
- Protection class
- Occupancy
- Territory

## Example Calculation
```
Territory Rating Analysis:

Territory   Exposures   Losses      Pure Prem   Relativity
Base        10,000      $2,000,000  $200        1.00
Urban       5,000       $1,500,000  $300        1.50
Suburban    8,000       $1,760,000  $220        1.10
Rural       3,000       $450,000    $150        0.75

Rates (assume 60% loss ratio target):
Base: $200 / 0.60 = $333
Urban: $333 × 1.50 = $500
Suburban: $333 × 1.10 = $366
Rural: $333 × 0.75 = $250
```

## Testing Classification Plans

### Statistical Significance
- Chi-square test
- Z-scores for differences
- Confidence intervals

### Homogeneity
- Within-class similarity
- Between-class differences
- Coefficient of variation

### Practicality
- Operational feasibility
- Data availability
- Ease of administration

## Regulatory Considerations
Classes must be:
- Actuarially justified
- Not unfairly discriminatory
- Based on objective criteria
- Properly documented

## Related Concepts
- [[Homogeneity]]
- [[Credibility]]
- [[Rate Equity]]
- [[ASOP 12 - Risk Classification]]

## References
- Werner & Modlin, Chapter 10
- ASOP 12
