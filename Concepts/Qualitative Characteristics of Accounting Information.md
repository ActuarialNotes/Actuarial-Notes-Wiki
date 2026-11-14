---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6e3b1869577d02fec1347c114e46e150b78801a70b23295e480fce77764319f9
  sources:
    - "FASB, Concepts Statement No. 8, Conceptual Framework for Financial Reporting (as amended), Ch.3 QC1-QC39 (PDF pp.26-32); BC1.2, BC3.2 joint development (PDF pp.16, 34); BC3.19, BC3.27-BC3.28 (PDF pp.38, 40), sha256:30fc0735a3362490d5708953fbbb78ee9e6baf2e05fa02efd1e753d5aa2effae — https://storage.fasb.org/Concepts_Statement_No._8_(As_Amended).pdf"
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶20, ¶30-38 (P-4 to P-7, PDF pp.35-38), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Qualitative Characteristics of Accounting Information.md
---

**Qualitative Characteristics of Accounting Information** are the qualities that make financial information useful to the people who rely on it. FASB Concepts Statement No. 8, Chapter 3, which the FASB developed jointly with the IASB, sets them out as follows:

1. **Fundamental characteristics.** Information is useful only if it has both.
   - **Relevance**, through predictive value, confirmatory value or both, with materiality as relevance applied to one entity.
   - **Faithful representation**: complete, neutral and free from error.
2. **Enhancing characteristics.** They enhance information that already has both fundamental characteristics.
   - Comparability.
   - Verifiability.
   - Timeliness.
   - Understandability.
3. **The cost constraint.** Information is required only when its benefits justify its cost.

The enhancing characteristics cannot rescue information that is irrelevant or not faithfully represented. They can, however, decide between two depictions that are equally relevant and faithful. One may be traded against another, as when a new standard reduces comparability for a while to improve relevance.

For an insurer's statutory statements, the NAIC adds its own concepts of **conservatism**, **consistency** and **recognition** ([[Statutory Accounting Principles]]).

## Relevance

Relevant information is capable of making a difference in users' decisions. It does so through **predictive value**, when users can feed it into their own predictions, through **confirmatory value**, when it confirms or changes their earlier evaluations, or both. This year's earned premium can be the starting point for next year's forecast and also a check on last year's forecast of this year.

**Materiality** is relevance applied to one entity. An omission or misstatement is material if it is probable that the judgment of a reasonable person relying on the report would have been changed or influenced by it. Size alone does not decide it. The nature of the item and the circumstances count too.

## Faithful representation

A perfectly faithful depiction is **complete** (everything a user needs, including descriptions and explanations), **neutral** (not slanted to make the information received favourably or unfavourably) and **free from error** (no errors in describing the item or in the process that produced it). Free from error does not mean exact. An estimate such as a loss reserve is faithfully represented when it is described as an estimate, the limits of the process are explained, and the process was chosen and applied without error.

FASB Concepts Statement No. 8 does not include prudence or conservatism as part of faithful representation, because a deliberate lean would be inconsistent with neutrality, and understating assets in one period tends to overstate performance in a later one.

## Enhancing characteristics

- **Comparability** lets users see similarities and differences between entities and over time. **Consistency**, the same methods for the same items, helps achieve it but is not the same thing. Comparability also is not uniformity, because unlike things should look different.
- **Verifiability** means independent, knowledgeable observers could reach consensus that a depiction is faithful, directly (counting cash) or indirectly (recomputing a model's output from its inputs). It is not a part of faithful representation in Concepts Statement No. 8, which moved it out of the old notion of reliability.
- **Timeliness** means having information while it can still influence decisions.
- **Understandability** comes from classifying and presenting information clearly, without leaving out complex items, which would make a report incomplete.

> [!example]- Which characteristic does each of these four problems weaken? {Example}
> An analyst reviewing a regional insurer finds four problems:
>
> 1. The insurer changed its IBNR method in each of the last three years without explanation.
> 2. The annual figures reached the analyst nine months after the year end.
> 3. Management booked reserves at the high end of the actuary's range "to be safe" in its GAAP statements, and released the excess in a later year when earnings were weak.
> 4. The notes give the loss reserve as a single figure with no description of how it was estimated.
>
> > [!answer]-
> > - The first weakens **comparability**, through a lack of **consistency**. Results for one year cannot be compared with the next when the method keeps changing.
> > - The second weakens **timeliness**. Information that arrives too late to influence a decision loses value, even though some users may still use it to study trends.
> > - The third weakens **neutrality**, a component of faithful representation. Deliberately overstating a liability in one period and releasing it later overstates performance in that later period, which is why Concepts Statement No. 8 leaves conservatism out of the GAAP framework.
> > - The fourth weakens **completeness**. A reserve is an estimate, and a faithful depiction says so and explains the limits of the process that produced it. Without that, the figure is also hard to **verify**.

## The cost constraint

Reporting costs money, and preparers bear most of the effort, which users pay for in reduced returns. Information should be required only when its benefits are likely to justify the cost of providing and using it.

## Conservatism, consistency and recognition under SAP

The NAIC's Statement of Concepts takes the opposite view of conservatism for solvency regulation. Statutory accounting should be "reasonably conservative over the span of economic cycles" to give policyholders a margin of protection against adverse variation in management's estimates.

Under the Preamble, only assets that can be used to meet policyholder obligations belong on the statutory balance sheet. Others are charged against surplus. Liabilities are recognised as they are incurred, revenue only as the earnings process is completed, and treatments that defer expenses are generally not acceptable. Consistency means regulators get comparable information across insurers, and precedent alone does not justify keeping a practice that no longer meets regulators' objectives. How these concepts sit among the other sources of accounting rules is on [[Accounting Rule Hierarchy]], and how they shape the statements themselves is on [[Accounting Standards]] and [[Financial Statements]].

> [!example]- How does this commission affect GAAP equity and statutory surplus at inception, and which concept explains the statutory answer? {Example}
> An insurer writes a one-year policy for \$1,200 and pays a \$180 commission on day 1. Under GAAP the commission is deferred and expensed as the premium is earned. Under SAP it is expensed immediately while the full \$1,200 is held as unearned premium.
>
> > [!answer]-
> > - The insurer holds \$1,020 of cash, the premium less the commission, against an unearned premium of \$1,200.
> > - Statutory surplus changes by $1{,}020 - 1{,}200 = -\$180$.
> > - GAAP carries the \$180 as an asset, matching it to the premium it helps earn, so equity changes by $1{,}020 + 180 - 1{,}200 = 0$.
> > - SAP expenses it because, in the Preamble's words, the funds spent "are no longer available to pay future liabilities". That is the **recognition** concept, applied **conservatively**.

> [!trap] Treating conservatism as neutral
> Under the FASB framework a deliberately conservative estimate is biased. Conservatism is a statutory concept, adopted because regulators care about solvency.
