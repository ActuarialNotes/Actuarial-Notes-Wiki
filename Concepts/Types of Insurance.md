---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:02f0629364c3cb18ab4ee1614833cf852a0f641886f9c3f9fbec8045ff791997
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 printed pp.40-43 (PDF pp.46-49), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 printed p.99 (PDF p.111) and Ch.15 printed p.305 (PDF p.317), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Types of Insurance.md
---

![[Media/Figures/Types_of_Insurance.svg|340]]

A **Type of Insurance**, for reserving and ratemaking, is a line of business described by how its claims behave rather than by what it covers. Three properties set the data, the methods and the uncertainty of an analysis of the line:

1. **Tail length**, how long claims take to report and settle.
2. **[[Frequency]] and [[Severity|severity]]**, how many claims there are and how large they are.
3. **Coverage trigger**, whether the policy responds to claims occurring or to claims reported in its term.

> [!example]- Personal auto comprehensive is written on an occurrence basis, and its claims are many, small and settled within weeks. How should its claim liabilities be estimated? {Example}
> - Comprehensive is short-tail, so its claims are nearly all reported and paid within a year and its IBNR is small.
> - Its high frequency and low severity make its own experience credible, so the [[Chain Ladder Method|development technique]] on its own data works well.
> - It is an occurrence coverage, so it is organized by [[Accident Year|accident year]].
> - The uncertainty is a [[Catastrophe Loss|hail catastrophe]] distorting a diagonal, not slow development.

## Long tail and short tail lines

[[Short Tail Insurance|Short-tail]] lines, such as automobile physical damage and property, have short reporting and settlement periods. Paid claims and case outstanding are a high proportion of their ultimate claims at early maturities, and IBNR is a small share of what remains unpaid. [[Long Tail Lines|Long-tail]] lines, such as medical malpractice occurrence, U.S. workers compensation and general liability, have lengthy reporting and settlement periods, so IBNR is a large share of what remains unpaid at early maturities.

> [!example]- Two lines each have $\$1{,}000{,}000$ of reported claims at 24 months. Automobile physical damage is 95% reported at that age, and medical malpractice is 30% reported. What is each line's IBNR, and how much does a 5% overstatement of each line's development factor move its ultimate claims? {Example}
> - The physical damage ultimate claims are $1{,}000{,}000/0.95 = \$1{,}052{,}632$, so its IBNR is $\$52{,}632$.
> - The medical malpractice ultimate claims are $1{,}000{,}000/0.30 = \$3{,}333{,}333$, so its IBNR is $\$2{,}333{,}333$.
> - A 5% higher factor raises the physical damage ultimate by $0.05 \times 1{,}052{,}632 = \$52{,}632$.
> - It raises the medical malpractice ultimate by $0.05 \times 3{,}333{,}333 = \$166{,}667$, more than three times as much.

## High frequency and low frequency lines

High-frequency, low-severity lines, such as automobile physical damage, produce stable and credible experience, and the development technique is particularly suitable for them. In low-frequency, high-severity lines, such as excess liability and medical malpractice, a handful of claims drives the result. A single [[Large Loss|large loss]] can move a whole accident year, so their estimates are less accurate and ordinarily require more extensive analysis.

## Occurrence and claims-made coverage

[[Occurrence Coverage|Occurrence]] policies respond to claims occurring during the policy term, however late they are reported, so they have pure [[IBNR]] and are organized by accident year. [[Claims Made Coverage|Claims-made]] policies respond to claims reported during the term, so they have no pure IBNR and are often organized by [[Report Year|report year]].
