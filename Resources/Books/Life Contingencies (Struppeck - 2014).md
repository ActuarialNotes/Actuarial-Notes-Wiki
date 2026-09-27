---
Title: "Life Contingencies: Study Note for CAS Exam S"
Authors: "Tom Struppeck"
Publisher: "Casualty Actuarial Society"
Year: "2014"
date: "2014"
Type: "Study Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f1b42224fa8bed62300db085f39c2455c1dba0fc0390380c9c4293c86a29ecce
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Life Contingencies (Struppeck - 2014).md
---
![[Life Contingencies (Struppeck - 2014) - Cover.svg]]

A short CAS study note on life contingencies — survival models for human lives and the cash flows that start or stop contingent upon survival. Written by Tom Struppeck for CAS Exam S and marked "Revised 9/19/2015", it illustrates terminology and techniques in straightforward contexts for a P&C reader, for whom such calculations are typically intermediate results, and points to where further refinement is possible; exercises follow several chapters, with an appendix of selected solutions.

> [!info] On the syllabus
> - [[Exam MAS-I (CAS)|Exam MAS-I]] — objectives A5–A6; the whole note (cited as October 2014, revised September 2015; an online publication).

## Introduction
- "Life contingencies" is a term for survival models for human lives and the resulting cash flows that start or stop contingent upon survival — a central topic for life insurance actuaries.
- In P&C work, life contingency calculations are typically intermediate results used to estimate some other quantity of interest.

## 1 Life tables and an extended example
- A [[Life Table|life table]] presents a family of conditional survival random variables concisely; the chapter builds one from 300 vacuum cleaners that all fail within four years.
- The mortality rate (or mortality) is the number expected to fail in the coming year divided by the number still functioning at its start; $l_x$, $d_x$ and $q_x$ denote the number functioning, the number failing and the mortality.
- Actuarial present value (APV) is the present value of a stream of cash flows that depend on a random variable; assuming a single deterministic interest rate, the chapter prices a \$100 warranty paid at the end of the year of failure (APV \$90.09 at 5%) and the level annual subscription that funds it (\$43.30 a year).

## 2 Comments on Life tables
- $(x)$ denotes a life of exact age $x$; $d_x = l_x - l_{x+1}$, $q_x = d_x / l_x$ and $p_x = l_{x+1}/l_x$.
- The radix $l_0$ can be any positive number, usually a round one such as 100,000, since only the mortalities matter.
- ${}_np_x = l_{x+n}/l_x = p_x\,p_{x+1}\cdots p_{x+n-1}$, and ${}_nq_x = 1 - {}_np_x$.
- Exercises use the exam's Illustrative Life Table.

## 3 Contingent Cash flows
- Life insurance contracts pay \$1 at the end of the year of death: term insurance for a fixed period, [[Whole Life Insurance|whole life]] with an unlimited term, endowment insurance (term plus \$1 at maturity), and the pure endowment (the payment at maturity alone).
- The whole life APV satisfies $A_x = v\,q_x + v\,p_x A_{x+1}$, so $A_x = \sum_{n \ge 0} v^{n+1}\,{}_np_x\,q_{x+n}$.
- A [[Life Annuity|life-annuity-due]] pays at the start of each year while $(x)$ is alive, $\ddot a_x = 1 + v\,p_x\,\ddot a_{x+1}$; a life-annuity-immediate pays at the end of the year, $a_x$.
- By an arbitrage argument $1 = d\,\ddot a_x + A_x$, so $\ddot a_x = (1 - A_x)/d$, and the level annual premium $P$ solves $A_x = P\,\ddot a_x$.
- Annuities can be limited to $n$ years or guaranteed for at least $n$ years; the exercises derive the variance of an insurance (its second moment is the first moment at double the force of interest) and of an annuity.

## 4 An example from workers' compensation insurance
- An injured worker's monthly stipend stops on return to work, so "mortality" here is returning to work; the examples assume annual payments and a level 3% discount rate.
- An annuity-due on (20) with a 5-year certain period is a five-year annuity-certain plus a life annuity on (25) deliverable in five years: $\ddot a_{\overline{5}|} + (1.03)^{-5}\,\frac{l_{25}}{l_{20}}\,\ddot a_{25}$.
- An annuity on (40) paying until return to work or age 65 is replicated by a life annuity on (40) less one on (65) taken back in 25 years: $\ddot a_{40} - (1.03)^{-25}\,\frac{l_{65}}{l_{40}}\,\ddot a_{65}$.
- Under US regulatory accounting most reserves for future loss payments are not discounted, but certain workers' compensation reserves are.

## 5 Why P&C companies don't sell level premium products
- A level premium buys the first year's coverage plus the option to buy future years at the same price; a purchaser who does not renew has lapsed.
- With non-decreasing mortality the early excess premium (policy values, or premium reserves) is positive; with decreasing mortality the rational insured lapses after taking the subsidy and buys cheaper term cover.
- P&C risks tend to have decreasing [[Hazard Rate|hazard rates]] over time, because the worst risks have their accidents earlier and only better risks remain in the cohort.

## 6 What happens mid-year?
- Monthly timing needs mortalities between integer ages, typically interpolated from the annual ones: linearly, exponentially or hyperbolically.
- In continuous time mortality is described by survival functions and hazard rates, covered elsewhere in the syllabus; a hazard rate describing mortality is called the force of mortality.
- A workers' compensation claim in paying status faces competing forces — return to work, reaching 65, death — only one of which stops payment.
- Increased mortality is applied, by custom, by multiplying the mortalities (a footnote notes that multiplying the hazard rate by $k$ turns $p_x$ into $p_x^{\,k}$).
- A [[Joint Life|joint-life]] annuity pays until the first of two lives dies and a last-survivor annuity until both have died: $\ddot a_x + \ddot a_y = \ddot a_{xy} + \ddot a_{\overline{xy}}$.

## 7 Life expectancy
- The curtate life expectancy, the expected number of full years, is $\sum_{n \ge 1} {}_np_x$ from the life table; the complete expectation of life adds 0.5 when deaths are uniformly distributed over the year.
- The same calculation applied to claim closure gives the expected number of full years a claim stays open (0.75 in the example; 1.25 complete).

## Appendix: Solutions for selected problems from Life Contingencies Study Note for CAS Exam S
- Worked solutions to exercises from Chapters 2, 3 and 6.

## Related readings
- [[Poisson Processes and Mixture Distributions (Daniel - 2008)]] — assigned with it for Domain A (Probability Models) of the MAS-I outline
- [[Introduction to Probability Models (Ross - 2019)]] — assigned with it for Domain A of the MAS-I outline

## Sources
- [Life Contingencies Study Note for CAS Exam S (CAS, revised 2015)](https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf) — the document, read in full: title, author, revision date, the introduction, Chapters 1–7 and the appendix of solutions
- [CAS Exam MAS-I Content Outline (2025)](https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf) — the citation (October 2014, revised September 2015), the link to the CAS copy and the assignment
