---
aliases:
  - Case Development Method
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Case Outstanding Development Method**

## Definition
==Case Outstanding Development Method== is a reserving technique that separately develops paid losses and case outstanding reserves using different development patterns, recognizing that case reserves may have different emergence patterns than paid losses.

## Methodology

### Step 1: Create Separate Triangles
```
Paid Loss Triangle:
Shows only actual payments by age

Case Outstanding Triangle:
Shows case reserves by age
```

### Step 2: Develop Each Component
```
Paid Ultimate = Paid × Paid LDF
Case Ultimate = Case × Case Development Factor

Total Ultimate = Paid Ultimate + Case Ultimate
```

### Step 3: Calculate IBNR
```
IBNR = Total Ultimate - (Paid + Case Outstanding)
```

## Formula
```
Ultimate = Paid + (Case Outstanding × Case Development Factor)

Where Case Development Factor represents:
- Changes in case adequacy
- Settlement patterns
- Additional payments beyond current cases
```

## When to Use

**Preferred when:**
- Case reserve practices have changed
- Settlement patterns shifting
- Want to isolate case adequacy issues
- Paid and case have different development

**Example situations:**
- New claims system implemented
- Case reserve philosophy changed
- Settlement rates accelerating/decelerating
- Unusual case reserve levels

## Example
```
AY 2023 @ 24 months:
Paid: $800,000
Case Outstanding: $500,000
Incurred: $1,300,000

Traditional Method:
24-Ult incurred LDF: 1.350
Ultimate: $1,300,000 × 1.350 = $1,755,000

Case Development Method:
Paid 24-Ult LDF: 1.500
Case 24-Ult Factor: 1.200
Ultimate = $800,000 × 1.500 + $500,000 × 1.200
        = $1,200,000 + $600,000
        = $1,800,000

Difference: $45,000 (2.6%)
```

## Advantages
- Recognizes different development patterns
- Can identify case reserve inadequacy
- More responsive to operational changes
- Better when case practices unstable

## Disadvantages
- More complex than incurred methods
- Requires both paid and case data
- Selection of case factors can be subjective
- May not have sufficient case data

## Related Concepts
- [[Chain Ladder Method#Definition]]
- [[Case Reserves#Definition]]
- [[Development Factor#Definition]]

## References
- Friedland, Chapter 6
