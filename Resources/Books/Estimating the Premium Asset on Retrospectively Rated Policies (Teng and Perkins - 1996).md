---
Title: "Estimating the Premium Asset on Retrospectively Rated Policies"
Authors: "Michael T. S. Teng and Miriam E. Perkins"
Publisher: "Casualty Actuarial Society"
Year: "1996"
date: "1996"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0c156fcf92c7cc9fac1acf69264b25ecc1ef2d902c9a0e10ebb351b987b88246
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Estimating the Premium Asset on Retrospectively Rated Policies (Teng and Perkins - 1996).md
---
![[Estimating the Premium Asset on Retrospectively Rated Policies (Teng and Perkins - 1996) - Cover.svg]]

A paper presenting a method for estimating the premium asset on retrospectively rated policies from the relationship between losses and retrospective premium. The relationship is examined using historical premium and loss development and the retro rating parameters sold; the cumulative ratio of premium development to loss development, applied to expected future loss emergence, gives the expected future premium development, and the sum of all future premium development is the premium asset. Published in the Proceedings of the Casualty Actuarial Society, Volume LXXXIII (1996), with a discussion by Sholom Feldblum in Volume LXXXV (1998).

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objective A5; PCAS LXXXIII, 1996, pp. 611-647, excluding Section 5, including the discussion by Sholom Feldblum (PCAS LXXXV, 1998, pp. 274-315), Sections 1 and 2 only (its Sections 3 and 4 appear below as bare headings); candidates are not held responsible for specific Annual Statement notation but are responsible for the concepts presented.

## 1 Introduction
- The [[Retrospective Premium Reserve|premium asset]] is the premium the insurer expects to collect on retro rated policies based on expected ultimate loss experience, less the premium already booked; many insurers call it earned but not reported premium, and its admitted portion appears on the balance sheet as the "Asset for Accrued Retrospective Premiums."
- [[Retrospective Rating|Retro rated]] policies grew because they return premium for good loss experience, let the insured pay premium as losses are reported or paid, and shift a large portion of the risk to the insured; the asset frequently exceeds 10% of surplus.
- Berry and Fitzgibbon calculated the "retro reserve," the negative equivalent of the premium asset, by relating premium deviation to loss ratio statistically; Berry's second approach develops premium with its historical emergence pattern.
- Because retro premium is a function of loss defined by the retro rating parameters, the premium asset should be a function of reported losses and the reserve for loss development; that relationship is the ratio of premium development to loss development, the [[PDLD Ratio|PDLD ratio]], calculated from the retro rating parameters or from historical data.
- The method applies to retro rated policies and similar loss sensitive plans, not prospectively rated ones, and to an aggregate book of business rather than individual policies.

## 2 The Formula Approach to Calculating PDLD Ratios
- The retro premium at the $n$th adjustment, with basic premium BP, capped loss $CL_n$, loss conversion factor LCF and tax multiplier TM, is:

> $$P_n = [\text{BP} + (CL_n \times \text{LCF})] \times \text{TM}$$

- The first PDLD ratio divides this by the loss $L_1$ developed for the first adjustment; its first term is approximated with standard premium SP, the expected loss ratio ELR and the expected percentage of loss emerged at the first adjustment:

> $$\frac{P_1}{L_1} = \frac{\text{BP} \times \text{TM}}{L_1} + \frac{CL_1}{L_1} \times \text{LCF} \times \text{TM}$$
>
> $$\frac{\text{BP} \times \text{TM}}{L_1} \approx \frac{\text{BP} \times \text{TM}}{\text{SP} \times \text{ELR} \times \%\text{Loss}_1}$$

- $CL/L$ is the loss capping ratio: capped losses exclude the portion outside the retro maximum and minimum and above any per accident limit, and the ratio usually decreases with maturity as more development occurs outside the loss limitations.
- With a basic premium factor of 0.20, ELR 0.70, LCF 1.20, TM 1.03, 78.4% of loss emerged and a capping ratio of 0.85, the first PDLD ratio is 1.426.
- Later PDLD ratios divide incremental premium by incremental loss between adjustments; an incremental capping ratio of 0.58 gives $0.58 \times 1.20 \times 1.03 = 0.717$:

> $$\frac{P_n - P_{n-1}}{L_n - L_{n-1}} = \frac{CL_n - CL_{n-1}}{L_n - L_{n-1}} \times \text{LCF} \times \text{TM}$$

- The formula responds to changes in the retro rating parameters sold, so it deserves more weight when they change significantly; it should be tested retrospectively against actual emergence for bias from using average parameters.

## 3 The Empirical Approach to Calculating PDLD Ratios
- It uses booked premium development and reported loss development, segregated into homogeneous groups by account size and rating plan, with policies grouped by policy effective quarter.
- Premium is booked 3 to 9 months after the losses behind it: the first adjustment uses losses at 18 months and is booked by 27 months, the second uses losses at 30 months booked by 39, the third 42 and 51.
- The first empirical PDLD, premium through 27 months over losses through 18 months, averages 1.460 against a formula ratio of 1.426; recent quarters trend upward, more likely from improved loss experience than from more liberal parameters, and 1.750 is selected.
- The second is selected at 0.700 against a formula 0.717; historical ratios fluctuate after the first adjustment and can even be negative for a policy quarter, when upward development above the loss limits coincides with downward development within them.
- After the third adjustment the historical and formula ratios diverge, from worse mid-1980s loss experience or shifting parameters; the fourth to sixth are selected between the two methods, and the ratio after the sixth is zero.

## 4 Cumulative PDLD Ratios
- A cumulative (CPDLD) ratio is the average of the PDLD ratios in all subsequent adjustment periods, weighted by the percentage of losses to emerge in each; in the example the first is 1.492 and the second 0.556.

> $$\text{CPDLD}_k = \frac{\sum_{n \ge k} \text{PDLD}_n \times \%\text{Loss emerged}_n}{\sum_{n \ge k} \%\text{Loss emerged}_n}$$

- The PDLD is usually above unity at the first adjustment, because the basic premium is included and little loss is limited yet; later incremental premium, the capping ratio times LCF and TM, is generally less than loss.
- Expected future premium is the CPDLD times the expected future loss emergence; added to premium booked from prior adjustments it gives ultimate premium, and ultimate less premium booked at the valuation date is the premium asset.
- At 12/31/94, policy quarters 1993.1–1994.4 have no adjustment yet: \$280,844,000 of expected loss times 1.492 is \$419,019,000; quarters 1992.1–1992.4 add \$50,747,000 times 0.556 to the \$328,778,000 booked at their first adjustment; the total asset is \$43 million.

## 5 Loss Capping Ratio

## 6 Further Issues
- The definition of loss may include allocated loss adjustment expense, and the loss data should be consistent with the rating plan.
- Changes in the mix of business by state, industry group or region change the average parameters sold and the claim frequency and severity, and so the PDLD ratio.
- Collectibility should be considered: an unsecured portion of the premium asset needs a provision for bad debt.

## Exhibits
- Exhibit 1 Calculation of Future Premium Emergence and Premium Asset
- Exhibit 2 Loss Projections
    - Expected future loss emergence is ultimate losses less losses reported at the prior retro adjustment.
- Exhibit 3 CPDLD Ratio Calculation
- Exhibit 4 PDLD Ratio Calculation
- Exhibit 5 Loss Capping Ratio Calculation
- Exhibit 6 Booked Premium
- Exhibit 7 Reported Losses

## Discussion by Sholom Feldblum

### 1 Introduction
- The PDLD procedure is modeled directly on the retrospective rating formula, so it is easily explained to underwriters and claims staff; its emphasis on premium sensitivity parallels the [[Risk-Based Capital|risk-based capital]] loss-sensitive contract offset and [[Schedule P]] Part 7; and it may help when changes in plan parameters distort other methods.
- The discussion's first part explains Fitzgibbon's method and the PDLD method graphically and combines the better parts of the two; its second part concerns risk-based capital and Schedule P Part 7. "Premium responsiveness" is used for premium sensitivity.

### 2 The PDLD Procedure
- A [[Chain Ladder Method|chain ladder]] on premium triangles is not used because ultimate losses can be estimated sooner than retrospective premiums and retro premium depends on losses: a premium chain ladder cannot give an estimate until at least nine months after policy expiration and updates only annually, where the loss-based methods can update each quarter.
- Retrospective Premium Determination
    - Retro premium is the tax multiplier times the sum of the basic premium — the expense provision, insurance charge and excess loss charge — and the loss conversion factor times limited incurred losses.
- The Reserving Formula
    - Fitzgibbon's reserving formula makes premium a linear function of losses; for a book of business, as ratios to standard premium, the retrospective adjustment is $A + B \times$ standard loss ratio.
- The Historical Regression
    - $A$ and $B$ are estimated by [[Linear Regression|regression]] on mature policy years because plan parameters vary by year, state and plan, and underwriters depart from the recommended ones; the regression reflects the premiums actually charged.
- Graphical Representations
    - The intercept $A$ represents the basic premium percentage and the slope $B$ the premium responsiveness, which is not unity because of loss limits and maximum premiums reached before the first adjustment, minimums above the basic premium, and the loss conversion factor and tax multiplier.
- Projections versus Reality
    - Fitzgibbon's projection ignores the emerging experience of the book, so when responsiveness proves lower than expected it stays too high; Berry shifts weight over time to his "DR2" method.
- The Perkins and Teng Solution
    - The graph is reread as the movement over time of the reported loss ratio and net earned premium ratio of a single book, rather than the relation of ultimate loss ratios and ultimate premium ratios across books or years.
- Decreasing Slopes
    - That graph is a set of line segments of steadily decreasing slope: as a book matures premium responsiveness declines, since late development — a sprain re-evaluated as a permanent total injury — is capped by loss limits and maximum premiums.
    - At higher loss ratios premium responsiveness also declines, as more insureds reach their maximum premium, so Fitzgibbon's line is really a concave curve.
- Actual versus Expected Experience
    - Actual reported losses and the premium relationship can both differ from projection: with an intercept of 20% and a first slope of 1.100, a 50% reported loss ratio projects a 75% premium ratio, while the actual premium ratio may be 72%.
- The Perkins and Teng Assumptions
    - A: premium responsiveness in later adjustments is independent of that in preceding adjustments; B: a segment's slope depends on the time period, not on the beginning loss ratio or premium ratio.
    - Each segment starts from the actual point reached, so the method projects future loss development in each adjustment period and multiplies it by that period's slope; the sum of the products is the accrued retrospective premium asset.
- An Enhancement
    - Perkins and Teng draw the first segment through the origin, combining the basic premium ratio with the true first slope; the first CPDLD, 1.492, therefore relates to all expected losses from inception, not to each dollar of emerged loss.
    - For a wide-swing plan the true slope, the LCF times TM less non-rateable losses, is about 1.200; the basic premium charge over the expected loss ratio, $0.25 / 0.85 = 0.294$, supplies the rest.
    - Combining them hides whether a rising first ratio comes from the basic premium, from responsiveness, or from a lengthening reporting pattern; the fix is to estimate the average basic premium charge as a ratio to the standard loss ratio and subtract it from the first CPDLD.

### 3 Loss-Sensitive Contracts and Underwriting Risk

### 4 Conclusion

## Sources
- [Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996)](https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf) — the paper: title page, abstract, Sections 1–6 (Section 5 read, left bare as outside the assignment) and the titles of Exhibits 1–7, read from page images
- [Discussion by Sholom Feldblum (PCAS LXXXV, 1998)](https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins_Discussion_of_Paper.pdf) — the discussion: Sections 1 and 2 and their run-in subheadings, and the headings of Sections 3 and 4
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation (volume, year and page ranges, which the PDFs do not print as a journal line) and the assigned scope
