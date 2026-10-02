---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-02
  last_checked_by: agent:validate-v1
  content_hash: sha256:e3f3cbb9be8c7264b8d9d7fbe7edc2d86196f4ca6fa81ef6f36bb0c37f42cd18
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026 (7 pp.), pp.1-7 incl. p.7 link annotations, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), title page p.1 and contents p.2, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.1 (title), sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Exam FM Sample Questions and Solutions (rev. Aug 2026), p.1 of each, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 and sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf, https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA study notes FM-22-05 (BA-35, sha256:1fbd8c493e3febfe0f4bf20e5440a80d3fe9c0b0c3838cef14ce186594e94f5e) and FM-23-05 (BA II Plus, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa), Broverman, Review of Calculator Functions, title pages — https://www.soa.org/globalassets/assets/files/edu/FM-22-05.pdf, https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Exam FM-2 (SOA).md
---

<div class="exam-nav"
     data-current="FM-2|Financial Mathematics">
</div>

# Exam FM-2
The **Financial Mathematics (FM-2) Exam** is a 2.5 hour SOA exam with 30 multiple choice questions about financial mathematics concepts and how they are applied in calculating present and accumulated values for streams of cash flows.

> [!question]- Other resources
>
> - [Notation and terminology used for Exam FM](https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf)
> - [All released exam papers since 2000](https://www.soa.org/education/exam-req/syllabus-study-materials/edu-multiple-choice-exam/) — SOA's Past Exams and Solutions page
> - Exam FM Sample Questions and Solutions: [questions](https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf) and [solutions](https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf)
> - Review of Calculator Functions for the Texas Instruments [BA-35](https://www.soa.org/globalassets/assets/files/edu/FM-22-05.pdf) and [BA II Plus](https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf) — several calculators are allowed, but the BA II Plus or Plus Professional is strongly recommended for its ability to solve for interest rates, and some exam problems may require it to find the answer
> - [Online Sample Exam FM](https://www.soa.org/education/exam-req/syllabus-study-materials/edu-exam-p-online-sample/) — a balanced yet randomized set of questions on each attempt, drawn from the sample questions and coded to the learning objectives

## Learning Objectives

> [!example]- Time Value of Money {5–15%}
> Understand and be able to perform calculations relating to [[Present Value]], [[Current Value]], and [[Accumulated Value]].
> 1. Define and recognize the definitions of the following terms: [[Interest Rate]] ([[Interest Rate|rate of interest]]), [[Simple Interest]], [[Compound Interest]], [[Accumulation Function]], [[Future Value]], [[Current Value|current value]], [[Present Value|present value]], [[Net Present Value]], [[Discount Factor]], [[Discount Rate]] ([[Discount Rate|rate of discount]]), [[Convertible m-thly]], [[Nominal Interest Rate|Nominal Rate]], [[Effective Rate]], [[Inflation]] and [[Real Rate of Interest]], [[Force of Interest]], [[Equation of Value]].
>    - *Key concepts:* [[Fund Accumulation]]
> 2. Given any three of [[Interest Rate|interest rate]], [[Number of Periods|period of time]], [[Present Value|present value]], and [[Future Value|future value]], calculate the remaining item using [[Simple Interest|simple]] or [[Compound Interest|compound interest]]. Solve [[Time Value of Money Equations]] involving [[Variable Force of Interest]].
> 3. Given any one of the [[Effective Rate|effective interest rate]], the [[Nominal Interest Rate Convertible m-thly]], the [[Effective Discount Rate]], the [[Nominal Discount Rate Convertible m-thly]], or the [[Force of Interest|force of interest]], calculate any of the other items.
> 4. Write the [[Equation of Value|equation of value]] given a set of [[Cash Flow|cash flows]] and an [[Interest Rate|interest rate]].

> [!example]- Annuities/Cash Flows with Non-Contingent Payments {20–30%}
> Be able to calculate [[Present Value|present value]], [[Current Value|current value]], and [[Accumulated Value|accumulated value]] for [[Annuities|sequences of non-contingent payments]].
> 1. Define and recognize the definitions of the following terms: [[Annuity Immediate|Annuity-Immediate]], [[Annuity Due]], [[Perpetuity]], [[Payable m-thly]] or [[Payable Continuously]], [[Level Payment Annuity]], [[Arithmetic Increasing Annuity|Arithmetic Increasing/Decreasing Annuity]], [[Geometric Increasing Annuity|Geometric Increasing/Decreasing Annuity]], [[Term of Annuity]].
>    - *Key concepts:* [[Decreasing Annuity]], [[Continuous Annuity]]
> 2. For each of the following types of [[Annuities|annuity]]/[[Cash Flow|cash flows]], given sufficient information of [[Annuity Immediate|immediate]] or [[Annuity Due|due]], [[Present Value|present value]], [[Future Value|future value]], [[Current Value|current value]], [[Interest Rate|interest rate]], [[Payment Amount|payment amount]], and [[Term of Annuity|term of annuity]], calculate any remaining item.
>	- [[Level Annuity]], [[Term of Annuity|finite term]].
>	- [[Level Perpetuity]].
>	- [[Non-level Annuities]]/cash flows.
>		- [[Arithmetic Progression]], [[Term of Annuity|finite term]] and [[Perpetuity|perpetuity]].
>		- [[Geometric Progression]], [[Term of Annuity|finite term]] and [[Perpetuity|perpetuity]].
>		- Other [[Non-level Annuities|non-level annuities]]/[[Cash Flow|cash flows]].

> [!example]- Loans {15–25%}
> Understand key concepts concerning [[Loans]] and how to perform related calculations.
> 1. Define and recognize the definitions of the following terms: [[Principal]], [[Interest]], [[Term of Loan]], [[Outstanding Balance]], [[Final Payment]] ([[Drop Payment]], [[Balloon Payment]]), [[Amortization]].
>    - *Key concepts:* [[Loan Repayment Comparison]]
> 2. Calculate:
> 	- The missing item, given any four of: [[Term of Loan|term of loan]], [[Interest Rate|interest rate]], [[Payment Amount|payment amount]], [[Payment Period|payment period]], [[Principal|principal]].
> 	- The [[Outstanding Balance|outstanding balance]] at any point in time.
> 	- The amount of [[Interest|interest]] and [[Amortization Schedule|principal repayment]] in a given [[Payment Amount|payment]].
> 	- Similar calculations to the above when [[Refinancing|refinancing]] is involved.

> [!example]- Bonds {15–25%}
> Understand key concepts concerning [[Bonds]], and how to perform related calculations.
> 1. Define and recognize the definitions of the following terms: [[Bond Price|Price]], [[Book Value]], [[Market Value]], [[Amortization of Premium]], [[Accumulation of Discount]], [[Redemption Value]], [[Face Value|Par Value]]/[[Face Value]], [[Yield Rate]], [[Coupon]], [[Coupon Rate]], [[Term of Bond]], [[Callable Bond|Callable]]/[[Non-Callable Bond|Non-Callable]], [[Call Price]], [[Call Premium]], [[Accumulated Value]] with [[Reinvestment of Coupons]].
> 2. Given sufficient partial information about the items listed below, calculate any of the remaining items
> 	- [[Bond Price|Price]], [[Book Value|book value]], [[Market Value|market value]], [[Accumulated Value|accumulated value]] with [[Reinvestment of Coupons|reinvestment of coupons]], [[Amortization of Premium|amortization of premium]], [[Accumulation of Discount|accumulation of discount]]. (Note that [[Bond Price|valuation]] of [[Bonds|bonds]] between [[Coupon|coupon payment dates]] will not be covered).
> 	- [[Redemption Value|Redemption value]], [[Face Value|face value]].
> 	- [[Yield Rate|Yield rate]].
> 	- [[Coupon]], [[Coupon Rate|coupon rate]].
> 	- [[Term of Bond|Term of bond]], point in time that a [[Bonds|bond]] has a given [[Book Value|book value]], [[Amortization of Premium|amortization of premium]], or [[Accumulation of Discount|accumulation of discount]].
> 3. Calculate the [[Bond Price|price]] of a [[Callable Bond|callable bond]] to achieve a specified [[Yield Rate|minimum yield]]

> [!example]- General Cash Flows, Portfolios, and Asset Liability Management {20–30%}
> Understand key concepts concerning [[Yield Curve|yield curves]], [[Rate of Return|rates of return]], measures of [[Duration|duration]] and [[Convexity|convexity]], [[Cash Flow Matching|cash flow matching]] and [[Immunization|immunization]], and how to perform related calculations.
> 1. Define and recognize the definitions of the following terms: [[Yield Rate]]/[[Rate of Return|rate of return]], [[Current Value]], [[Duration]] and [[Convexity]] ([[Macaulay Duration|Macaulay]] and [[Modified Duration|Modified]]), [[Portfolio]], [[Spot Rate]], [[Forward Rate]], [[Yield Curve]], [[Cash Flow Matching|Cash Flow]] and [[Duration Matching]], and [[Immunization]] (including [[Full Immunization]] and [[Redington Immunization]]).
> 2. Calculate:
> 	- The [[Duration]] and [[Convexity|convexity]] of a set of [[Cash Flow|cash flows]].
> 	- Either [[Macaulay Duration|Macaulay]] or [[Modified Duration|modified duration]] given the other.
> 	- The [[1st-Order Linear Approximation|approximate change]] in [[Present Value|present value]] due to a change in [[Interest Rate|interest rate]],
> 		- Using [[1st-Order Linear Approximation]] based on [[Modified Duration|modified duration]].
> 		- Using [[1st-Order Macaulay Approximation|1st-order approximation]] based on [[Macaulay Duration|Macaulay duration]].
> 	- The [[Present Value|present value]] of a set of [[Cash Flow|cash flows]], using a [[Yield Curve|yield curve]] developed from [[Forward Rate|forward]] and [[Spot Rate|spot rates]].
> 3. Construct an [[Portfolio|investment portfolio]] to:
> 	- Protect the value of an [[Asset-Liability Portfolio]] using either [[Redington Immunization|Redington]] or [[Full Immunization|full immunization]]
> 	- Exactly match a set of [[Cash Flow Matching|liability cash flows]].


## Source Material

> [!answer]- Source Material
> - [[Mathematics of Investment and Credit (Broverman, S.A. – 2024)]]
>      - Chapters 1–7^[excluding 1.2.1, 1.8; 2.3.1.2, 2.4.2, 2.4.3, 2.4.5; 3.2.1, 3.2.2, 3.3, 3.4; 4.1.3, 4.1.4, 4.4 (background only); 5.2, investment year method portion of 5.3.1, 5.3.2–5.3.4; 6.2, 6.4; 7.1.3, 7.3]|
>      - Candidates may also use the Seventh Edition (2017, ACTEX Learning, ISBN 978-1-63588-221-6), with the same sections
> - [[Mathematical Interest Theory (Vaaler, L.J.F., Harper, S.K., and Daniel, J.W. – 2019)]]
>      - Chapters 1–6, 8–9^[excluding 1.13–1.16; 2.6; 3.10, 3.12, investment year method portion of 3.13; 5.3; 6.6–6.7, example 6.8.1, 6.10; Ch. 8: 8.3 only; 9.4, 9.5, 9.7]|
> - [[Financial Mathematics: Theory and Practice (Brown, R. and Kopp, S. – 2024)]]
>      - Chapter 1, all sections; Chapter 2, sections 1, 2, 3; Chapter 3, all sections; Chapter 4, sections 1, 3, 4, 5; Chapter 5, sections 1, 2, 3; Chapter 6, sections 1, 2, 3, 4, 5, 6; Chapter 7, sections 1, 2; Chapter 8, all sections; Chapter 9, all sections
>      - Candidates may also use the First Edition (2012, ACTEX Learning, published by McGraw-Hill Ryerson, ISBN 978-1-63588-694-8), with the same chapters and sections
> - [[Interest Theory – Financial Mathematics and Deterministic Valuation (Francis, J. and Ruckman, C. – 2022)]]
>      - Chapters 1–16 excluding 14.04 and 14.05
> - [[Financial Mathematics for Actuaries (Chan, Wai-Sum, and Tse, Yiu-Kuen – 2022)]]
>      - Chapters 1–8 excluding 2.4; 3.5; 4.2, 4.5; 5.3; 6.4; 8.6, 8.7, 8.8
> - [[Using Duration and Convexity to Approximate Change in Present Value (Alps - 2017)]]
>      - Sections 1–4 (required reading)
