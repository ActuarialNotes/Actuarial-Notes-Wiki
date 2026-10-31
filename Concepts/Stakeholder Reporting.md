---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:8cb4bd9e1ff1dccca225462942b0665114af1f4dd6630442d4c0511dfd22103b
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.4-5, 10 (PDF pp.10-11, 16), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§2.1, 3.3, 3.8, 4.1, pp.2-10 (PDF pp.7-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stakeholder Reporting.md
---

**Stakeholder Reporting** is the communication of reserve and pricing results to the parties who act on them — management, the board, regulators, investors, rating agencies and auditors. Each needs the same substance at a different depth, and [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] fixes what must be disclosed.

> $$\Delta\text{Reserve} = \text{New AY} - \text{Payments} \pm \text{Prior-year development}$$

- **Management and board** — what changed, why, what it costs, and what to do. Development by accident year and driver, the read-across to pricing, and a view on whether the current selection is adequate. This audience can take the diagnostic detail and needs the recommendation.
- **Regulators** — the Annual Statement (Schedule P triangles), the Statement of Actuarial Opinion, and the supporting Actuarial Report, in prescribed form. See [[Regulatory Reporting]].
- **Investors and rating agencies** — reserve development history, volatility, and the earnings effect. Adverse development is a disclosure item; a pattern of it affects the rating and the cost of capital.
- **Auditors** — reproducible documentation: data reconciliations, method descriptions, and the basis for each significant assumption.
- **Claims and underwriting** — often overlooked, and often the audience whose behaviour the analysis is actually about. A finding that [[Case Adequacy|case adequacy]] or [[Settlement Rate|settlement speed]] has shifted belongs in front of the department that caused it.

The professional constraint: **the substance must not vary by audience.** Adapting depth, framing and emphasis is competent communication. Presenting a more favourable characterization to investors than to the regulator is not, and the disclosure requirements exist to make the difference visible.

![[Media/Figures/Stakeholder_Reporting.svg|340]]

> [!example]- One Result, Four Audiences {Example}
> Year-end reserves were $\$50{,}000{,}000$. $\$5{,}000{,}000$ of adverse development has emerged on accident years $2021$–$2023$, driven by severity on litigated general liability claims.
>
> What does each audience need?
>
> > [!answer]-
> > **Management** — the $\$5$M split by accident year and cause; whether the current selection should be strengthened further; and the pricing implication, since a severity trend running ahead of assumption means today's rates are inadequate by the same margin.
> >
> > **Regulators** — the development disclosed in Schedule P Part 2, an actuarial opinion reflecting the revised estimate, and an Actuarial Report identifying the changed assumptions explicitly rather than merely reflecting them in the number.
> >
> > **Investors** — the effect on reported earnings, with enough about the driver to distinguish a one-off from a continuing trend. "Adverse development of $\$5$M" without a cause invites the market to assume the worst.
> >
> > **Claims** — the finding that litigated severity is emerging above expectation, with the case-adequacy and [[Settlement Rate|disposal rate]] diagnostics that were reviewed and ruled out as explanations.

> [!example]- Reporting Uncertainty Without Undermining the Estimate {Example}
> An actuary's central estimate is $\$47{,}500{,}000$, with a reasonable range of $\$43{,}000{,}000$ to $\$54{,}000{,}000$. Management asks for "the number" and objects that a range implies the work is imprecise.
>
> How should this be handled?
>
> > [!answer]-
> > The range is not a hedge — it is a property of the liability. The point estimate is the [[Unpaid Claims|actuarial central estimate]]: the expected value over the range of reasonably possible outcomes.
> >
> > What the range adds is decision-relevant information the point estimate cannot carry:
> >
> > - **Where the width comes from.** If most of it is the [[Tail Factor|tail]] selection on old accident years, that is a different management problem from width driven by the current year's [[Loss Trend|severity trend]].
> > - **What would move it.** Stating that a one-point change in the severity trend moves the estimate by $\$2$M tells management which assumption to watch.
> > - **Asymmetry.** If the distribution is right-skewed — which reserve distributions generally are — the downside is bigger than the upside, and a board deciding on capital needs to know that.
> >
> > ASOP 43 requires significant uncertainties to be disclosed. The professional answer to "just give me the number" is to give the number *and* the two sentences about what could move it — not to suppress either.
