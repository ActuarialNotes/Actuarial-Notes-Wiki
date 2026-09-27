---
Title: "Individual Risk Rating Study Note"
Authors: "Ginda Kaplan Fisher, Lawrence McTaggart, Jill Petker and Rebecca Pettingell"
Publisher: "Casualty Actuarial Society"
Year: "2019"
date: "2019"
Type: "Study Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:342ed05b7a6e81d506e466dd379929f3312fd4ce21ac5477b0176b94269dfce1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Individual Risk Rating Study Note (Fisher et al. - 2019).md
---
![[Individual Risk Rating Study Note (Fisher et al. - 2019) - Cover.svg]]

A CAS study note, dated October 31, 2019, on the concepts and methods used in excess, deductible and individual risk pricing. Its Foreword says the authors consolidate insights from several foundational papers, give examples beyond U.S. workers' compensation practice and add a few fresh insights. Chapter 1 summarises experience rating, Chapter 2 surveys loss sensitive rating plans, Chapter 3 introduces aggregate excess loss estimation and Chapter 4 closes with cautions on pricing excess and aggregate loss; an Excel case study applies the methods to one set of fictional claims. The content outline cites it as Version 3, October 2019.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives B1–B6; the whole study note (CAS Study Note, Version 3, October 2019)

## Foreword
- By Lawrence McTaggart. The note introduces concepts and methods employed when supporting excess, deductible and [[Individual Risk Rating|individual risk]] pricing, consolidating several foundational papers.
- As insureds grow their appetite for risk grows, and [[Loss Sensitive Rating|loss sensitive plans]] let them retain part of their own loss experience; the actuary is asked to price many combinations of per-occurrence and aggregate retentions.
- The Excel-based case study applies the methods to a single set of fictional claims data; in practice, or on the exam, the combinations of retentions, limits and aggregates are practically unlimited.

## 1 Experience Rating
- By Rebecca Pettingell
- 1 Introduction/Definition
    - [[Experience Rating|Experience rating]] uses an insured's past loss experience to set rates for a future exposure period, usually as a factor on manual rates: standard premium $=$ e-mod $\times$ manual premium.
    - A mod above 1.0 is a debit mod and one below 1.0 a credit mod; the mod indicates the risk's expected loss relative to its class, and is not an attempt to "charge back" past losses.
- 2 Advantages of Experience Rating
    - It accounts for differences between risks within a class, and for variables that are difficult, impractical or impossible to quantify — a further refinement of [[Classification Ratemaking|classification rating]].
- 3 Differences within Class
    - The fewer or broader the rating classes, the more useful experience rating is; it accounts for the [[Variance of Hypothetical Means|variance of the hypothetical means]] of the risks within a class, illustrated by two similar companies with different attitudes to safety.
- 4 Objectives/Goals
    - Greater risk equity, an increased incentive for safety, and enhanced market competition, because an insurer that can charge a rate in line with a risk's loss potential views more risks as desirable to write.
- 5 Equity
    - Following Venter, "to the extent that the loss experience is indicative of true differences from the classification average, it appears equitable to charge for it"; the mod is a prospective measure, not a penalty or reward.
- 6 Credibility
    - Arguably the most important design consideration: each risk is treated as its own rating class and its experience is [[Credibility|credibility]]-weighted with that of its class.
    - 6.1 Credibility Review
        - Surveys [[Limited Fluctuation Credibility|classical (limited fluctuation)]], [[Bühlmann Credibility|Bühlmann (greatest accuracy)]] and [[Bayesian Credibility|Bayesian]] credibility, and the properties $Z$ should have: $0 \le Z \le 1$, $Z$ non-decreasing in the risk's expected losses $E$, and $Z/E$ decreasing.
        - Experience rating uses the Bühlmann framework, $Z = E/(E+K)$ with $K$ the ratio of the [[Expected Value of Process Variance|expected process variance]] to the variance of the hypothetical means, giving the mod $M = [ZA + (1-Z)E]/E = (A+K)/(E+K)$.
- 7 Credibility Issues in Experience Rating
    - The maximum single loss (MSL) caps individual large losses entering the risk's experience $A$, and minimum and maximum mods keep the adjustment from being too extreme; both, and $Z$, vary with the size of the risk.
- 8 Split Loss Plans
    - A [[Split Loss Plan|split loss plan]] separates each claim into primary and excess layers — the worked example splits eleven claims at \$5,000 into \$36,500 primary and \$58,025 excess — and compares each layer with its expected value separately.
    - Primary losses reflect frequency and excess losses severity; giving much more weight to the primary portion approximates assigning credibility to the log of the loss amount. The NCCI workers compensation plan is a split plan, stated with an excess loss weighting factor $w$ and a ballast value $B$.
- 9 Schedule Rating
    - [[Schedule Rating|Schedule rating]] applies credits and debits for a risk's individual characteristics; in the illustrative commercial general liability schedule the maximum credit or debit per characteristic runs from 2% (medical facilities, safety program) to 10% (premises, equipment, classification).
    - Overlap with experience rating must be avoided: a safety manager hired recently earns a schedule credit, while one present throughout the experience period is already reflected in the mod.
- 10 Evaluating and Comparing Plans
    - Defines manual premium (before experience rating) and standard premium (after the mod), ignoring the schedule mod.
    - The [[Quintiles Test|quintile test]]: rank risks by mod, collapse them into five groups, and compare manual and standard loss ratios. Rising manual loss ratios show the plan identifies differences; flat standard loss ratios show it adjusts for them, while a downward trend means too much credibility and an upward trend too little.
    - The efficiency test statistic is the variance of the standard loss ratios divided by the variance of the manual loss ratios; in the worked example Plan A scores 0.0039 and Plan B 0.0237, so Plan A is the better plan.
- Questions 1–6 and Acknowledgments

## 2 Risk Sharing Through Retrospective Rating and Other Loss Sensitive Rating Plans
- By Jill Petker
- 1 Risk Sharing: Risk Retention and Risk Transfer
    - Retrospective rating, large deductibles, self-insurance and other loss sensitive plans share risk between insured and insurer, in contrast with guaranteed-cost policies; large deductible plans are now more common than retrospective rating.
    - The insured typically retains the more predictable primary losses, often limited in aggregate, and transfers the more volatile per-occurrence excess losses; the section lists the advantages and disadvantages to the insured and to the insurer.
- 2 What is Retrospective Rating?
    - [[Retrospective Rating|Retrospective rating]] uses the loss experience of a policy period to adjust the premium for that same period, subject to maximum and minimum ratable loss amounts set directly or through maximum and minimum premiums.
- 3 The Retrospective Rating Formula
    - Premium $= (B + cL) \times T$: $B$ the basic premium amount, $c$ the loss conversion factor, $L$ the ratable losses and $T$ the tax multiplier, $1/(1 - \text{tax rate})$.
    - The basic premium covers fixed expenses, expected per-occurrence excess losses, expected aggregate excess losses (the [[Insurance Charge|insurance charge]]) less a credit for a minimum (the savings), and the underwriting profit provision; its expense portion is $e - (c - 1)E$.
    - Ratable losses may or may not include [[Allocated Loss Adjustment Expense|ALAE]], be subject to per-occurrence and aggregate loss limits and a minimum, and be paid or incurred; an aggregate limit may be set as a multiple of expected limited losses, or to make the maximum premium a multiple of guaranteed-cost premium, which requires iteration.
    - There must be a per-occurrence or an aggregate loss limit for risk to transfer; the "balance principle" of equal expected premium with guaranteed cost does not make sense given the different risk transfer and capital.
- 4 Regulatory Approval and the Large Risk Alternative Rating Option (LRARO)
    - In the US retro pricing parameters are filed with regulators, but LRARO lets large insureds be rated "as mutually agreed upon by carrier with insured", with flexibility in both pricing and structure (a paid loss basis, ratable loss limits set directly, factors based on exposures).
- 5 Other Loss Sensitive Plans
    - [[Large Deductible Policy|Large deductibles]] (at or above \$100,000 per occurrence for US casualty): the insurer pays claims and bills the insured; there must be a per-occurrence limit and there is no minimum; the risk transfer matches a retro plan with a loss limit and a maximum but no minimum, and the insured's expected cost is generally lower because deductible reimbursements are not premium and bear no premium tax.
    - [[Self-Insured Retention|Self-insured retentions]]: the insured adjusts and pays claims, ALAE is generally shared pro rata above the retention, the insurer takes no credit risk, and the excess limit is not eroded by the retention.
    - Loss sensitive dividend plans return money when losses are low but collect nothing when they are high, so they are not balanced.
- 6 Other Variations on Loss Sensitive Plans
    - Clash coverage, basket (account) aggregate coverage, multi-year plans and captives.
- 7 Credit Risk
    - Retrospective rating, large deductible and loss sensitive dividend plans subject the insurer to [[Credit Risk|credit risk]], which grows for long-tailed lines and higher retentions; the insurer can protect itself with security, loss development factors and holdbacks.
- 8 Setting Retention Levels
    - The insured should keep the predictable working layer, retentions should suit its risk tolerance and financial capacity, and they should increase with loss trend.
- 9 Capital and Profit Provisions
    - A loss sensitive plan (other than a dividend plan) transfers less risk and needs less capital, but not in proportion to the loss sharing, so the profit provision falls in dollars but rises as a percentage of insured loss.
- 10 The Dissolution of Loss Sensitive Rating Plans for Long-Tailed Lines
    - Retro plans are closed by a closeout applying final loss development factors; large deductible plans by a buyout or a loss portfolio transfer; self-insured retentions by a loss portfolio transfer.
- Questions 1–11 and Acknowledgments

## Appendix to Chapter 2: Examples of Expected Cash Flow
- Compares policyholder and insurer cash flows over time under an incurred retrospective rating plan and a large deductible plan built on the same pricing assumptions, ignoring processing lags and aggregate excess exposure.
- The retro plan has a basic premium of \$405,000, a loss conversion factor of 1.100 and a tax multiplier of 1.031; the large deductible premium is \$479,381. Under the retro plan the policyholder gets a partial return of premium at 18 months, then pays additional premiums from 30 to 90 months, which create credit risk.

## 3 Aggregate Excess Loss Cost Estimation
- By Ginda Kaplan Fisher
- 1 Overview
    - 1.1 Who Pays, and How Much?
        - Aggregate slices matter for a retro maximum or minimum, a deductible with an aggregate limit, a self-insured retention and an aggregate limit on a (re)insurance policy; a deductible with an aggregate limit gives the same risk transfer as a retro with the same loss limit and maximum.
    - 1.2 Some definitions and notation to describe aggregate losses
        - $N$ claims, severity $X$, aggregate loss $A$ with $E = E\{A\} = E\{N\}E\{X\}$, and the entry ratio $r = A/E$; policies are grouped by size (expected loss groups, or expected claim count groups) because the variance of the loss distribution is very sensitive to the expected number of claims.
        - Defines the [[Insurance Charge|Table M charge]] $\phi(r)$, the Table M savings $\psi(r)$ and the net insurance charge; Table $M_D$ built from limited losses, with $k$ the per-occurrence excess ratio; and the [[Table L|Table L]] charge $\phi^*_D(r)$ and savings $\psi^*_D(r)$, ratios to expected unlimited loss.
- 2 Visualizing Aggregate Excess Losses
    - Adapted from Yoong-Sin Lee's paper: [[Lee Diagram|Lee diagrams]] put size on the vertical axis and the cumulative claim count or probability on the horizontal axis.
    - 2.1 Lee Diagrams of Severity Distributions
        - Vertical strips group losses by size and horizontal strips by [[Layer of Insurance|layer]], so $\int_0^\infty x\,dF(x) = \int_0^\infty S(x)\,dx = E\{X\}$; limits and deductibles appear as areas cut off by horizontal lines.
    - 2.2 Lee Diagrams of Aggregate Loss Distributions
        - Graphs the entry-ratio distribution, reads off $\phi(0) = 1$, $\phi'(r) = -S(r)$ and $\psi'(r) = F(r)$, and derives $\psi(r) = \phi(r) + r - 1$ (Formula 3.1) and $E\{L\}/E = 1 + \psi(r_1) - \phi(r_2)$ (Formula 3.2).
        - For retrospective rating it derives the basic premium $B = e - (c-1)E + cI$ with net insurance charge $I = [\phi(r_G) - \psi(r_H)]E$ (Formula 3.3), and the balance equations $\phi(r_H) - \phi(r_G) = [(e+E) - H]/(cE)$ and $r_G - r_H = (G - H)/(cE)$ (Formulas 3.4 and 3.5).
- 3 Estimating Aggregate Loss Costs Using Table M
    - 3.1 How Table M is Used
        - Table M holds charges and savings by entry ratio and by policy size, grouped by expected loss or expected number of claims; in the example an entry ratio of 0.4 with a charge of 0.72 gives a \$144,000 loss cost on \$200,000 of expected losses.
    - 3.2 Empirical Construction of Table M
        - Adapted from Brosius: group similar risks, use the group's average loss as expected, compute entry ratios, then the charges by vertical slicing (per risk; $\phi(1.2) = 0.21$ in the example) or horizontal slicing (per layer), interpolating where needed and taking savings from Formula 3.1.
    - 3.3 Calculating Table M from a parameterized aggregate loss distribution
        - Frequency and severity (e.g. Poisson and Pareto) or a direct lognormal fit can be simulated or computed in closed form and sliced horizontally; in practice a hybrid of empirical data and fitted curves is common.
- 4 Estimating Limited Aggregate Excess Loss Costs
    - Adapted from Fisher's "Pricing Aggregates on Deductible Policies".
    - 4.1 Introduction of Limited Aggregate Deductible Policies
        - A deductible policy with an aggregate deductible limit can be priced for per-occurrence and aggregate excess together (Table L) or separately, with a Table $M_D$ of charges on limited losses.
    - 4.2 Considerations for Table MD
        - The per-occurrence limit is applied first, so the aggregate charge must be built from losses already limited per occurrence, or the two charges overlap; lower deductibles reduce the variance of limited aggregate losses and usually lower the charges above an entry ratio of 1.
    - 4.3 Construction of Table MD
        - The entry ratio uses expected limited losses; Table $M_D$ is indexed by policy size, entry ratio and per-occurrence limit. With a \$250,000 deductible the example's aggregate charge is \$20,000 and total loss cost \$220,000; with a \$150,000 deductible, \$7,733 and \$307,733.
- 5 Other Methods of Combining Per-Occurrence and Aggregate Excess Loss Cost
    - 5.1 Estimating Per-Occurrence and Aggregate Combined Excess Loss Cost Using Table L
        - Based on Skurnick's California [[Table L|Table L]]: $\phi^*_D(r) = \int_r^\infty (y - r)\,dF_D(y) + k$ (Formula 3.6), where the entry ratio is limited aggregate loss over expected unlimited loss, and $\psi^*_D(r) = \phi^*_D(r) + r - 1$ (Formula 3.9); an empirical construction gives $k = 0.08$.
    - 5.2 The ICRLL Method
        - NCCI's Insurance Charge Reflecting Loss Limitation adjusted an unlimited Table M to approximate Table $M_D$: the expected loss group is chosen from expected unlimited loss times the state/hazard group relativity and the loss group adjustment factor $(1 + 0.8k)/(1 - k)$ (Formula 3.10), and the table is entered at the limited entry ratio; the example's factor of 1.588 moves the risk from expected loss group 31 to 29, for a total loss cost of \$237,567.
- 6 Understanding Aggregate Loss Distributions
    - Extreme cases show how variance drives the charge: the higher the expected number of claims, the lower the variance of the entry ratios and the smaller the charge above 1; severity matters too, reflected by NCCI hazard groups A–G and state relativities that change a risk's implied claim count.
- Questions 1–20, Acknowledgments, and an index of equivalent terms (Table M charge, insurance charge, aggregate excess loss factor, aggregate excess ratio; Table M saving, insurance saving, aggregate minimum loss factor; net insurance charge; Table M)

## 4 Concluding Remarks
- By Ginda Kaplan Fisher
- 1 General Observations
    - A balanced plan, with expected premium independent of the retro provisions, is not necessary or desirable for most policy types, but expected losses must still balance; a layer whose estimated loss cost is negligible should still carry a charge for its risk and expense.
- 2 Sensitivity of Table M charges to the Accuracy of the Loss Pick or Rate Adequacy
    - A loss pick of \$500,000 against a true \$550,000 prices the \$1 million aggregate limit at \$105,400 instead of \$122,540, underpricing it by more than 16%; loss picks 10% inadequate can leave charges more than 20% inadequate, and 10% excessive picks more than 25% excessive.
- 3 Consistency of Assumptions
    - Per-occurrence and aggregate charges developed by independent methods, or bureau factors loaded for non-loss items, can price the same plan differently; the sum of predicted primary, per-occurrence excess and aggregate excess losses should be compared with predicted total losses.
- Acknowledgments

## Solutions to Chapter Questions
- Chapter 1 Answers
- Chapter 2 Answers
- Chapter 3 Answers
- Chapter 4 Answers

## References
- The works the chapters draw on, among them Bahnemann's *Distributions for Actuaries*, Brosius's "Table M Construction", Fisher's "Pricing Aggregates on Deductible Policies", Gillam's papers on workers compensation experience rating, Lee's graphical approach, Robbin's ICRLL paper, Skurnick's "The California Table L", Venter on equity, and the NCCI and ISO rating plan manuals.

## Related readings
- [[Individual Risk Rating Case Study (Fisher et al.)]] — the Excel case study the Foreword describes, assigned with the note for objectives B1–B6
- [[CGL Experience and Schedule Rating Plan (ISO)]] — assigned with the note for objectives B5–B6; the References list ISO's Commercial General Liability Experience and Schedule Rating Plan
- [[Distributions for Actuaries (Bahnemann)]] — cited in Chapter 2 for excess/total loss ratios and in Chapter 3, §3.3, for aggregate loss methods; assigned with the note for objectives B1–B3

## Sources
- [Individual Risk Rating Study Note (CAS, October 2019)](https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf) — the document, read in full: title pages, contents, Foreword, the four chapters with their sections and questions, the Appendix to Chapter 2, the solutions and the references (PDF pages 3, 7, 20, 39 and 64 have no text layer and are blank)
- [CAS Exam 8 Content Outline, Fall 2026 (v03, June 2026)](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation (CAS Study Note, Version 3, October 2019) and the assignment, objectives B1–B6
