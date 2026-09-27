---
Title: "Claims Development by Layer: The Relationship between Claims Development Patterns, Trend and Claim Size Models"
Authors: "Rajesh Sahasrabuddhe"
Publisher: "Casualty Actuarial Society"
Year: "2010"
date: "2010"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Sahasrabuddhe.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8c2b11ebad90ee2c34b815e3f211f4208c45adcbccfa437217e8241a6e7eea80
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Claims Development by Layer (Sahasrabuddhe - 2010).md
---
![[Claims Development by Layer (Sahasrabuddhe - 2010) - Cover.svg]]

A paper relating claims development patterns to trend and claim size models, with an approach to calculate the development pattern for any claims layer. Where Cook's 1970 paper showed that trend and development are mutually exclusive adjustments, this one shows that limited development patterns and trend are related through the claim size model, and its approach produces development patterns, trend factors and increased or decreased limit factors that are internally consistent. Published in the Casualty Actuarial Society E-Forum, Fall 2010; this revision of January 2, 2013 restores exhibits left out of the November 2012 revision.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objective A4; the revised version of January 2, 2013 (Casualty Actuarial Society E-Forum, Fall 2010, Volume 1), including errata.

## 1 Introduction
- The approach adjusts a development pattern appropriate for any claim layer to produce one for any other layer, allows for the cost level implicit in a pattern, and keeps claim size, development and trend assumptions internally consistent.
- It applies to paid or reported claims, and to claims with allocated claim adjustment expenses when all parameters are defined consistently.
- 1.1 Research Context
    - The current approach to excess layer development, Pinto and Gogol's, fits observed development factors from a large industry database as a function of retention; many actuaries lack such data, and it does not use the relationship of claim size models, trend and development.
- 1.2 Scope and Objective
    - The objective is a method to calculate development factors by layer once the actuary has a "base" development pattern, trend and claim size model; developing those models is beyond its scope.
- 1.3 Outline

## 2 Background
- The data is an $n \times n$ triangle of cumulative claims $C^L_{i,j}$ in a layer $L(d, p)$, truncated from below at $d$ and censored from above at $p$; $d = 0$ and $p = \infty$ is ground-up, unlimited (GUU) data.
- 2.1 Trend Factors
    - Trend is expressed as cost level indices $T_{i,j}$ for cumulative GUU claims of exposure period $i$ at development interval $j$, relative to a base cost level, typically ultimate claims of the oldest exposure period.
    - Trend may act in several directions — exposure period and calendar period — and [[Loss Trend|trend]] estimated from limited data must first be adjusted to a GUU basis with the claim size model.
- 2.2 Claim Size Model
    - The [[Severity Distribution|claim size model]] must have parameters that can be adjusted for inflation and [[Limited Expected Value|limited expected values]] and means that can be calculated with reasonable effort; the parameters $\Phi_{i,j}$ vary by exposure period and interval with cost level.
    - 2.2.1 Limit Adjustment Factors
        - $S_{i,j}(L_a, L_b)$ is the ratio of expected claims in layer $L_a$ to those in layer $L_b$, a ratio of layer LEVs:
        > $$S_{i,j}(L_a, L_b) = \frac{LEV(p_a; \Phi_{i,j}) - LEV(d_a; \Phi_{i,j})}{LEV(p_b; \Phi_{i,j}) - LEV(d_b; \Phi_{i,j})}$$
    - 2.2.2 Gross-up Factors
        - When $p_a = \infty$ and $d_a = 0$ the factor grosses claims up to a GUU basis, with the mean $M(\Phi)$ in the numerator.
- 2.3 Claims Development
    - Claims development factors are the expected ratios of ultimate claims to claims at earlier maturities:
    > $$F^L_{i,j} = E\left[C^L_{i,\infty} / C^L_{i,j}\right]$$

## 3 Results and Discussion
- 3.1 Claim Size and Trend
    - Claim size parameters for other exposure periods follow from those of the latest period and the trend indices: $\Phi_{i,j} \sim f(\Phi_{n,j}, T_{i,j}, T_{n,j})$.
- 3.2 Claim Development Patterns, Claim Size and Trend
    - A pattern estimated from unadjusted data and applied to every exposure period is appropriate only if the data is GUU and trend acts only in the accident year direction; otherwise the triangle is adjusted for cost level and limit first.
    - 3.2.1 Development of Basic Limit Claims Development Pattern, Exposure Year n Cost Level
        - A basic limit $B$ is selected at which the data is credible for estimating development; each observation is restated to $B$ at the exposure period $n$ cost level and developed to give the pattern $F^B_{n,j}$:
        > $$E\left[C^{B\prime}_{i,j} \mid C^L_{i,j}\right] = C^L_{i,j} \times \frac{LEV(B; \Phi_{n,j})}{LEV(L; \Phi_{i,j})}$$
    - 3.2.2 Calculation of Claims Development Pattern for Any Layer and Cost Level
        - The development factor for any layer $X$ and exposure period $i$ follows from the basic limit pattern (Equation 3.7) — the [[Layer Development Factor|layer development factor]]:
        > $$F^X_{i,j} = F^B_{n,j} \times \frac{LEV(X; \Phi_{i,\infty}) / LEV(B; \Phi_{n,\infty})}{LEV(X; \Phi_{i,j}) / LEV(B; \Phi_{n,j})}$$
        - The primary findings (Equations 3.8 and 3.9): development factors at different cost levels and different layers are related to each other based on claim size models and trend.
- 3.3 Other Practical Uses
    - When a pattern is simply provided, its cost level is taken to be that of the latest exposure period; with a claim size model at ultimate only (such as [[Increased Limits|increased limit factors]]), the denominator becomes $R_j(X, B)$, the ratio of claims in layers $X$ and $B$ observed along a single diagonal (Equation 3.10, corrected by the errata below).
    - Using $R_j$ assumes that differences in cost level are immaterial to the ratios of claims by layer.
    - Absent negative development, and developing a lower layer from a higher one, $R$ decreases with maturity, never falls below its ultimate value $U$, and, when the base pattern is unlimited, is at most $U$ times the claims development factor (Appendix A).
- 3.4 Issues
    - Selecting a basic limit is already implicit in any development analysis; the ultimate claim size model is often available, and only relative limited expected values matter, so a simpler size of loss model may suffice; adjusting the triangle is not a significant additional burden.
    - Claim size models by maturity are generally not available, though only ratios of expected values are needed to move a pattern between layers; a triangle of trend indices is hard to conceptualize, because trend acts on incremental activity and its effect on case reserves is hard to time.

## 4 Examples
- The first two examples use the claims triangle from Mack's *Distribution-Free Calculation of the Standard Error of Chain Ladder Reserve Estimates*.
- 4.1 Example 1 & 2
    - Contrived information: a basic limit of \$500 thousand, a \$2 million policy limit, data ground-up to \$1 million, 2% trend per exposure period with 5% between periods 6 and 7, and 1% per calendar period with a one-time 5% decrease between periods 2 and 3; the claim size model is exponential.
    - In Example 1 the basic limit is well above the working layer and the differences from unadjusted factors are small; in Example 2 it is within the working layer and they are much greater, and they grow when trend or development act longer or at higher rates.
    - Factors for some excess layers are "very large" because expected claims in the layer at early maturities are very small; layers that are excess for an insurer are working layers for reinsurers.
- 4.2 Example 3
    - The simpler approach of Section 3.3 converts a pattern at \$1 million to \$500 thousand and to the layer between them, with selected ratios at each maturity decaying toward the ultimate ratio:
    > $$\text{Selected Ratio} = \text{Ultimate Ratio} + (1 - \text{Ultimate Ratio}) \times \text{Decay Factor}$$
    - The decay keeps most of the distance between the ultimate ratio and unity at the earliest maturity and none at ultimate, where all development factors equal unity.

## 5 Conclusion
- Limited development factors are a function of both maturity and cost level, so the same pattern of limited factors should not always be applied to all exposure periods.
- With short development patterns, low trend rates and limits above the working layer the adjustment is small and often immaterial; for other exposures it may be meaningful.

## Appendix A: Calculation of Maximum Ratios of Basic Limit to Unlimited Claims
- The maximum ratio before ultimate is the limiting case in which all development in the unlimited layer occurs above the basic limit; with $R$ the ultimate ratio and $D$ the unlimited claim development factor, $A_{\max} = D \times R$.

## Errata
- Equation 3.10: both subscripts of the numerator of the second term should be $i$, so the basic limit LEV at ultimate is at exposure period $i$'s cost level:

> $$F^X_{i,j} = F^B_{n,j} \times \frac{LEV(X; \Phi_{i,\infty}) / LEV(B; \Phi_{i,\infty})}{R_j(X, B)}$$

- The paragraph that follows Equation 3.10 should reference Equations 3.10 and 3.7, not 3.8 and 3.6.
- The cross references for columns (7) and (8) of Example 3 should read $LEV[\text{exponential}(\theta); x] = \theta\left(1 - \exp(-x/\theta)\right)$.
- The cross reference for column (10) of Example 3 should be "Selected".

## Related readings
- [[A Model for Reserving Workers Compensation High Deductibles (Siewert - 1996)]] — assigned with it for objective A4 in the Exam 7 content outline

## Sources
- [Claims Development by Layer (CAS E-Forum, Fall 2010, revised January 2, 2013)](https://www.casact.org/sites/default/files/2021-03/7_Sahasrabuddhe.pdf) — the paper: abstract, revision note, bookmark outline, Sections 1–5, Appendix A and the Example 3 exhibit
- [Errata to Claims Development by Layer](https://www.casact.org/sites/default/files/2021-03/7_Sahasrabuddhe_Errata.pdf) — the four corrections
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
