---
Title: "A Framework for Assessing Risk Margins"
Authors: "Karl Marshall, Scott Collings, Matt Hodson and Conor O'Dowd"
Publisher: "Institute of Actuaries of Australia"
Year: "2008"
date: "2008"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Marshall_et_al.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:26ac235635e451d7fff78e7ae5e4bb072136273220a3f0d92eabc3f44e1eeea1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/A Framework for Assessing Risk Margins (Marshall et al. - 2008).md
---
![[A Framework for Assessing Risk Margins (Marshall et al. - 2008) - Cover.svg]]

A framework for assessing insurance liability risk margins, with practical advice on how to implement it. Prepared by the Risk Margins Taskforce of the Institute of Actuaries of Australia, it examines the key sources of uncertainty and the main quantitative approaches to analysing them, recognises that quantitative analysis of historical data cannot alone capture every aspect of future uncertainty, and introduces a structured way of combining judgement with quantitative results. This is the final version of a draft presented to the Institute's 16th General Insurance Seminar, 9–12 November 2008, in Coolum; the authors describe the changes as minimal.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objective A14; the whole paper.

## 1 Introduction
- 1.1 Preamble
    - The Risk Margins Taskforce was created to give Australian general insurance actuaries support and guidance in assessing [[Risk Margin|risk margins]]; the paper's main purpose is to propose a comprehensive framework for assessing insurance liability risk margins and to advise on implementing it.
- 1.2 Current approaches to assessing risk margins
    - The generally adopted calculation: [[Coefficient of Variation|coefficients of variation]] (CoVs) for valuation portfolios, a matrix of assumed [[Correlation|correlations]] between them, separate CoVs and matrices for outstanding claim and premium liabilities, and a distribution that turns these into a risk margin at a probability of adequacy.
    - CoVs range from those read off the 2001 Tillinghast and Trowbridge papers to quantitative analysis supplemented by a qualitative assessment, as in O'Dowd, Smith and Hardy (2005), the PwC paper whose concepts played a prominent role in this framework.
    - Correlations are usually set by judgement in high, medium and low categories; the [[Lognormal Distribution|lognormal]] is the most common distribution, and the [[Normal Distribution|normal]] is used by some, particularly at lower probabilities of adequacy.
    - Most approaches are "bolt-on": the central estimate and the risk margin are analysed separately.
- 1.3 Practical framework for assessing risk margins
    - Quantitative analysis of historical data cannot alone capture all sources of future uncertainty; judgement will always be needed and often dominates, so the framework structures how it is combined with quantitative results.
    - It is written in the context of the Australian percentile approach to margins, can be extended to reserve and underwriting risk in capital (DFA) modelling, and is not intended to be prescriptive like a professional standard.
- 1.4 Structure of this paper
    - Table 1 summarises the framework in nine steps: portfolio preparation, independent risk analysis, internal systemic risk analysis, external systemic risk analysis, analysis of correlation effects, consolidation, additional analysis, documentation and review.

## 2 The proposed framework
- 2.1 Introduction to framework
    - Quantitative techniques must be supplemented by qualitative analysis so that every source of uncertainty is captured; Figure 1 divides a claims portfolio into valuation classes and homogeneous claim groups, each exposed to independent and systemic risk.
- 2.2 Sources of uncertainty
    - Systemic risks are potentially common across valuation classes or claim groups, and arise from two sources: [[Internal Systemic Risk|internal systemic risk]], the valuation model's imperfect representation of a complex process (also called model specification risk), and [[External Systemic Risk|external systemic risk]], future trends external to the modelling process.
    - [[Independent Risk|Independent risk]] arises from the randomness of the insurance process, as the random component of [[Parameter Risk|parameter risk]] and the random component of [[Process Risk|process risk]].
    - Traditional quantitative techniques such as bootstrapping and the stochastic chain ladder suit independent risk and past episodes of external systemic risk, but are inadequate alone for internal systemic risk and for external systemic risk that differs from the past.
- 2.3 Preparing the claims portfolio for analysis
    - The claims portfolio is split into valuation classes, preferably those used for the central estimate, and further into [[Homogeneity|homogeneous]] claim groups where uncertainty differs materially, such as a home portfolio's event, non-event and liability claims.
- 2.4 Analysing independent risk sources
    - A good stochastic model fits away most past systemic episodes external to the valuation process, leaving largely random uncertainty, but is unlikely to capture internal systemic risk.
    - Approaches include the Mack method, bootstrapping, the stochastic chain ladder, GLM techniques and Bayesian techniques, supplemented by internal and external benchmarking such as the independent risk component in the Tillinghast paper.
- 2.5 Analysing systemic risk sources
    - Internal systemic risk
        - Its three sources are specification error, parameter selection error and data error, assessed with a balanced scorecard: risk indicators are scored against best practice, the scores are weighted and combined for each valuation class, and the result is mapped to a CoV (Figure 2).
    - External systemic risk
        - Its risk categories are economic and social; legislative, political and claims inflation; claim management process change; expense; event; latent claim; and recovery.
        - Standard quantitative models inform only on past episodes, so each potential future source is identified, categorised and quantified, with categories ranked by expected impact to focus the effort.
        - For property classes event risk is likely to dominate the premium liabilities, and for long-tail portfolios legislative, political and claims inflation risks are likely to be the key contributors for both outstanding claim and premium liabilities.
    - Correlation effects
        - Independent risk is uncorrelated with every other source; internal systemic risk is correlated only between valuation classes (the same-actuary effect, template models) and between outstanding claim and premium liabilities; each external systemic risk category is uncorrelated with the others but may be correlated across classes, such as claims inflation across long-tail portfolios.
        - Correlations can be placed in five bands, nil, low, medium, high and full, with for example 25%, 50% and 75% for the middle three; more bands would give spurious accuracy. The PwC paper's hierarchy of root and class-of-business dummy variables is another way to assess them.
- 2.6 Consolidation of analysis into risk margin calculation
    - A simple linear correlation structure is proposed, with a correlation matrix for each of the three sources; the sources are independent, so each one's contribution to the total CoV is calculated separately and then combined. It is reasonable up to probabilities of adequacy of at least 90%.
    - Figure 3 works an example for Insurer ABC's Motor, Home and CTP classes: a consolidated insurance liability CoV of 8.7% gives a 75% risk margin of 5.8% under a normal distribution or 5.6% under a lognormal.
    - At 75% and below the normal gives the higher margin; at higher probabilities such as 90% the lognormal can, unless the CoV is high, and at very high CoVs lognormal margins can appear unreasonable.
- 2.7 Additional analysis
    - Sensitivity testing flexes each CoV and correlation: in the example, halving the independent risk CoVs moves the portfolio margin from 5.6% to 5.4%, while raising the internal systemic risk CoVs by 50% moves it to 6.6%.
    - Scenario testing strengthens central estimate assumptions until the provisions include the risk margin, and compares the implied frequencies, claim sizes and loss ratios with emerging experience.
    - Internal benchmarking compares CoVs between classes and between outstanding claim and premium liabilities; independent risk falls with portfolio size and rises with length of run-off.
    - External benchmarking against the 2001 papers or APRA's November 2008 industry report is a sanity check, not the basis of the assessment.
    - Hindsight analysis converts movements between past and latest liability estimates into a CoV; mechanical hindsight analysis removes one diagonal at a time and reapplies an objective chain ladder.
- 2.8 Documentation and regularity
    - The analysis and judgement behind each step should be documented; the full framework should be applied at least every three years, with key assumptions reviewed at each central estimate valuation.

## 3 Independent risk assessment
- Independent risk has two components, the random components of parameter and process risk, which it is not normally enlightening to split.
- The better a model fits past systemic episodes and trends, the more likely the remaining volatility reflects random effects alone; where data are too limited to separate the two, a model that does not fit away systemic risk can be used with additional allowances for the other sources.
- Independent risk assessment for outstanding claim liabilities
    - The method for analysing uncertainty should align with the central estimate method; GLMs are well placed, and a bootstrap can use residuals from stable periods identified in residual plots by accident, development and experience period.
- Independent risk assessment for premium liabilities
    - Simpler techniques can remove past systemic episodes, seasonality, and standard and superimposed inflation from claim frequencies and average claim sizes, and measure the CoV of the residual volatility.

## 4 Systemic risk assessment
- 4.1 Internal systemic risk
    - Standard triangulation methods analyse predictors aggregated to a high level, or that lag rather than lead the underlying drivers; the assessment must be of the approach actually used for the central estimate.
    - Scoring the modelling infrastructure
        - Each risk indicator is scored from 1 to 5, where 5 is best practice, and weighted by its importance to give a weighted average score for each valuation class; Table 2 lists potential indicators and Table 3 scores Insurer ABC's.
    - Calibrating scores to CoVs
        - The actuary builds a CoV scale from worst to best practice; the minimum CoV for a "perfect" model is unlikely to be much less than 5%, and 20% or more is readily justifiable for a single aggregated model with limited data.
        - Table 4's example scale is not linear and is higher for the long-tail CTP class than for Motor and Home.
    - Riley and Watson's alternative sets High and Low scenarios as the end points of a reasonable range of central estimates.
- 4.2 External systemic risk
    - External systemic risk arises from non-random risks outside the modelling process: episodes yet to occur, and emerging ones whose development is uncertain.
    - Communication with business experts
        - Meetings with portfolio and claims management should focus on identifying potential sources of systemic risk, and on quantifying them.
    - Selection of assumptions
        - CoVs combine quantitative analysis and judgement; the shape of the distribution matters, since highly skewed risks such as latent claims and some sources of superimposed inflation matter little at the 75th percentile but more at higher probabilities of adequacy.
        - Correlated risk categories may be combined so that the categories used are independent.
    - Economic and social risks
        - Standard inflation (AWE and CPI), general economic conditions, fuel prices and driving patterns, and systemic shifts in claim frequency for short-tail portfolios.
    - Legislative, political and claims inflation risk
        - Combined because they are often correlated and much more material for long-tail classes, where these risks are normally aggregated as [[Superimposed Inflation|superimposed inflation]]; the average of the range of impacts across the risks gives an estimate of it.
    - Claim management process change risk
        - Changes to reporting, payment, finalisation, reopening and case estimation; more relevant to outstanding claims than to premium liabilities.
    - Expense risk
        - Generally a small contributor, analysed through the key drivers of policy maintenance and claim handling expenses.
    - Event risk
        - Single events giving rise to a large number of claims, material for property and to a lesser extent motor; premium liability event risk can draw on past event experience and [[Catastrophe Modelling|catastrophe models]].
    - Latent claim risk
        - Uncertainty from claims that may arise from a source not currently considered to be covered ([[Latent Liability|latent claims]]); negligible for most classes but material for some, primarily workers compensation and liability.
        - The probability is low but the impact could be substantial, so it is quantified largely by judgement, with scenarios developed from discussions with underwriters and casualty reinsurers.
    - Recovery risk
        - Systemic uncertainty in reinsurance and non-reinsurance [[Recoveries|recoveries]], including reinsurers' ability to pay after catastrophic events or a downturn in asset returns.

## Bibliography

## Related readings
- [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)]] — listed in the Bibliography among its stochastic reserving papers, dated 1993 there
- [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)]] — the content outline assigns both for objective A14

## Sources
- [A Framework for Assessing Risk Margins (Institute of Actuaries of Australia, 2008)](https://www.casact.org/sites/default/files/2021-03/7_Marshall_et_al.pdf) — the document: title page, abstract, contents, section headings, Figures 1–3, Tables 1–4, the text of Sections 1–4 the points above are taken from, and the Bibliography
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
