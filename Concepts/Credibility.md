---
aliases:
  - Credibility Theory
  - Credibility Weighting
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Credibility**

## Definition
==Credibility== Credibility is a measure of the statistical reliability of experience data, used to determine how much weight to assign to observed data versus expected or complement data when making predictions.

## Fundamental Concept

### Credibility Formula
```
Estimate = Z × Actual Experience + (1-Z) × Expected Experience

Where:
Z = Credibility factor (0 ≤ Z ≤ 1)
1-Z = Complement of credibility
```

## Factors Affecting Credibility

### Volume of Data
- More exposures → Higher credibility
- Larger claim counts → More reliable
- Longer experience periods → Better estimates

### Stability of Data
- Consistent loss patterns → Higher credibility
- Homogeneous risks → More reliable
- Absence of catastrophes → Better predictability

### Quality of Data
- Accurate reporting → Higher credibility
- Complete information → More reliable
- Timely updates → Better estimates

## Credibility Standards

### Full Credibility
Criteria for Z = 1.00 (100% credibility):
- Sufficient data volume
- Statistical confidence level met
- Typically 1,082 claims for frequency
- Higher requirements for severity

### Partial Credibility
For data sets below full credibility:
- Square root rule: Z = √(n/n_full)
- Limited fluctuation credibility
- Greatest accuracy credibility

## Applications

### Ratemaking
**Rate Level Indications**
```
Final Rate Change = Z × Indicated Change + (1-Z) × Complement

Example:
Indicated change: +15%
Credibility: 60%
Complement (Prior): 0%
Final: 0.60 × 15% + 0.40 × 0% = 9%
```

**Classification Ratemaking**
- Class relativities
- Territory factors
- Individual risk rating

### Reserving
- Case reserve adequacy
- IBNR estimates
- Ultimate loss projections

### Experience Rating
- Individual risk pricing
- Retrospective rating
- Large deductible programs

## Methods

### Classical Credibility
- Limited fluctuation
- Full credibility standard
- Square root rule for partial

### Bühlmann Credibility
- Greatest accuracy approach
- Based on variance components
- More sophisticated theory

### Practical Considerations
- Actuarial judgment important
- Regulatory requirements
- Business constraints

## Example Calculation

```
Workers Comp Class Analysis:

Claims: 75
Full credibility standard: 1,082 claims

Z = √(75/1,082) = √0.0693 = 0.263 or 26.3%

Indicated class relativitivity: 1.25
Manual relativitivity: 1.00

Credibility-weighted: 
= 0.263 × 1.25 + (1-0.263) × 1.00
= 0.329 + 0.737
= 1.066

Selected relativitivity: 1.07 (rounded)
```

## Complement Selection

Common choices for complement:
1. **Industry data** - Similar risks from broader market
2. **Prior indication** - Previous rate level
3. **Manual rates** - Current rate structure
4. **Zero** - No adjustment (use indicated only)

Selection depends on:
- Availability of data
- Regulatory requirements
- Business judgment
- Market conditions

## Regulatory Considerations

Many states require:
- Credibility procedures documented
- Standards justified
- Complement explained
- Results reasonable

## Related Concepts
- [[Homogeneity]]
- [[Overall Rate Level Indication]]
- [[Classification Ratemaking]]
- [[Experience Rating]]
- [[Bühlmann Credibility]]

## References
- Werner & Modlin, Chapter 10
- Mahler & Dean, "Credibility"
- CAS Ratemaking Principles
