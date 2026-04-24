---
aliases:
  - Benktander
  - Iterative BF
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Benktander Method**

## Definition
==Benktander Method== The Benktander method is a reserving technique that iteratively combines the Chain Ladder and Bornhuetter-Ferguson methods, providing estimates that fall between these two approaches.

## Formula
```
One iteration:
Ultimate = Reported + [(Expected - Reported) × % Unreported]

Where:
Expected = a priori expected ultimate or prior estimate
% Unreported = 1 - (1/CDF)
```

## Relationship to Other Methods

### After 0 iterations: Expected Loss Method
```
Ultimate = Expected Losses
(Ignores reported entirely)
```

### After 1 iteration: Bornhuetter-Ferguson
```
Ultimate = Reported + (Expected × % Unreported)
```

### After ∞ iterations: Chain Ladder
```
Ultimate = Reported × CDF
(Ignores expected entirely)
```

### Standard Benktander: 2 iterations
Provides middle ground between BF and CL

## Methodology

### Iteration 1 (BF Method)
```
Ultimate₁ = Reported + (Expected₀ × % Unreported)
```

### Iteration 2 (Benktander)
```
Ultimate₂ = Reported + [(Ultimate₁ - Reported) × % Unreported]
```

## Example
```
Given:
Reported: $600
Expected: $1,000
CDF: 2.000
% Unreported: 50%

Iteration 0 (Expected):
Ultimate₀ = $1,000

Iteration 1 (BF):
Ultimate₁ = $600 + ($1,000 × 0.50)
         = $600 + $500 = $1,100

Iteration 2 (Benktander):
Ultimate₂ = $600 + [($1,100 - $600) × 0.50]
         = $600 + ($500 × 0.50)
         = $600 + $250 = $850

Chain Ladder:
Ultimate_CL = $600 × 2.000 = $1,200

Summary:
Expected:    $1,000
BF:          $1,100
Benktander:  $850
Chain Ladder: $1,200
```

## Credibility Interpretation

Benktander can be viewed as assigning different credibility:
- More weight to actual emergence than BF
- Less weight than Chain Ladder
- Compromise between the two

## When to Use

**Advantages:**
- Moderates between BF and CL
- More responsive than BF
- More stable than CL
- Good for middle-maturity years

**Use when:**
- Transitioning from BF (immature) to CL (mature)
- Want compromise between methods
- Actual emergence becoming credible
- BF too stable, CL too volatile

## Related Concepts
- [[Bornhuetter-Ferguson Method]]
- [[Chain Ladder Method]]
- [[Expected Loss Method]]

## References
- Friedland, Chapter 5
- Benktander, "An Approach to Credibility in Calculating IBNR"
