---
aliases:
  - Berquist-Sherman
  - B-S Method
---

[[Actuarial Notes Wiki|Wiki]] / [[Exam 5 (CAS)]] / **Berquist-Sherman Method**

## Definition
==Berquist-Sherman Method== is an adjustment technique that modifies development triangles to account for changes in case reserve adequacy levels over time, removing the distortion caused by systematic shifts in case reserving practices.

## Purpose
Addresses the problem when case reserve adequacy has changed:
- More conservative now than in past
- Less adequate now than in past
- Systematic change distorts development patterns

## Methodology

### Step 1: Quantify Case Adequacy Change
```
Analyze historical case development to measure:
- How much cases are developing beyond initial reserves
- Whether this pattern is changing over time
- Magnitude of inadequacy/redundancy
```

### Step 2: Adjust Historical Data
```
Adjust prior year losses to "as-if" current adequacy:

Adjusted Loss = Historical Loss × Adequacy Adjustment Factor

Example:
If current cases 10% more adequate than 2 years ago:
Adjust 2-year-old data upward by 10%
```

### Step 3: Develop Adjusted Triangle
```
Use standard methods on adjusted triangle:
- Apply chain ladder to adjusted data
- Calculate adjusted LDFs
- Project ultimate from adjusted current losses
```

### Step 4: Project Ultimate
```
Ultimate = Current Reported × Adjusted LDF
```

## Example
```
Situation: Case reserves have become 15% more adequate over 3 years

Original Triangle:
AY      12mo    24mo    36mo
2021    1,000   1,400   1,540
2022    1,050   1,470
2023    1,100

Case adequacy analysis shows:
2021 cases were 15% low
2022 cases were 7% low  
2023 cases are adequate

Adjusted Triangle (as-if current adequacy):
AY      12mo    24mo    36mo
2021    1,150   1,610   1,771
2022    1,124   1,573
2023    1,100

Now development factors reflect current adequacy:
12-24: 1.400 (vs 1.400 original)
24-36: 1.100 (vs 1.100 original)
Patterns now consistent
```

## When to Use

**Appropriate when:**
- Known changes in case reserve philosophy
- New claims system affecting reserves
- Systematic change in reserve adequacy
- Development patterns appear inconsistent

**Signs you may need B-S:**
- Decreasing development factors over time
- Known case reserve strengthening
- Claims department policy changes
- Acquisition/system changes

## Advantages
- Removes distortion from case changes
- Produces more reliable LDFs
- Reflects current reserve adequacy
- Better ultimate estimates

## Disadvantages
- Complex to implement
- Requires judgment on adequacy changes
- Needs detailed historical case data
- May be difficult to quantify adjustment

## Related Concepts
- [[Case Reserves#Definition]]
- [[Chain Ladder Method#Definition]]
- [[Case Adequacy#Definition]]

## References
- Friedland, Chapter 7
