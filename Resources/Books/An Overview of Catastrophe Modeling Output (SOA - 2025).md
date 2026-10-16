---
Title: "An Overview of Catastrophe Modeling Output"
Authors: "Society of Actuaries"
Publisher: "Society of Actuaries"
Year: "2025"
date: "2025"
Type: "Study Note"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-301-study-note-catastrophe-output.pdf)"
---
![[An Overview of Catastrophe Modeling Output (SOA - 2025) - Cover.svg]]

A four-page study note of the Education Committee of the Society of Actuaries, dated May 2025, taken from the discontinued General Insurance Applications Module for the General Insurance track. It builds on the American Academy of Actuaries' monograph, which presented probable maximum loss, return period loss and average annual loss as the metrics output from catastrophe models, and covers several other metrics from catastrophe models that the actuary should be familiar with.

> [!info] On the syllabus
> - [[Exam GI-301 (SOA)|Exam GI-301]] — Outcomes 8b, 8c; the whole note.

## Metrics the monograph presented
- The American Academy of Actuaries' monograph presented probable maximum loss (PML), return period loss (RPL) and the average annual loss (AAL) as the metrics output from catastrophe models, and showed how they could be used in actuarial projects.

## Exceedance probability curves
- The loss probabilities and amounts may be used to derive an exceedance probability (EP) curve, of which there are three types: occurrence EP (OEP), aggregate EP (AEP) and conditional EP (CEP).
- With event probabilities p_i and loss amounts L_i, AAL is the sum of p_i L_i; if the events are independent Bernoulli random variables, each event can occur at most once.
- The OEP curve is formed by sorting the L_i and p_i by loss amount, and the return period for L_i is the reciprocal of OEP(L_i).

## The event loss table example
- A simplistic example of ten possible events, with an annual occurrence probability and a loss for each, gives the insurer's event loss table (ELT), sorted from the largest loss to the smallest, and its OEPs.
- The AAL is the long-term average; catastrophe models also output the standard deviation, a measure of volatility that can be used as a basis for estimating a risk load in ratemaking.
- RPL and [[Probable Maximum Loss|PML]] are the same metric; in the example, the PML for a 1-in-509 years event is 80 million.
- In practice, catastrophe models normally simulate thousands of trials, each representing a potential outcome.

## Tail Value at Risk
- PML represents just one point on the OEP curve; Tail Value at Risk (TVaR), also called the Conditional Tail Expectation (CTE), is the average loss above a selected return period.

## The basis of the losses
- Output is shown as ground-up, gross or net losses, and there may also be final net losses, which are the net losses plus any reinstatements.
- Results can be shown with or without demand surge and with or without secondary uncertainty.

## Sources
- [An Overview of Catastrophe Modeling Output (SOA Study Note, May 2025)](https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-301-study-note-catastrophe-output.pdf) — the document: title page, the text of all four pages for the lead and the points under each group; the note carries no headings of its own, so the groups above are named for what each holds, and the title page names no author, so the Society of Actuaries is given
- [GI 301 Syllabus, Mar 2027/Jul 2027 (SOA)](https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf) — the citation and the assignment (outcomes 8b and 8c)
