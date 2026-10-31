---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:bcbfa268ea6f1d1f5b77f104835b3295e8c2b21627a2c474daa28f643ef54b6a
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.6, 9 fn.5 (PDF pp.12, 15), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 36, Statements of Actuarial Opinion Regarding Property/Casualty Loss and Loss Adjustment Expense Reserves (ASB, March 2024, Doc. No. 213), §§3.8-3.11, 3.14, 4.2-4.3, pp.7-11 (PDF pp.14-18), sha256:3bdfe0e5e237233d7333a051b34fa8c1bf805510f0f1dbe8947c52a3cfe14b8b — https://www.actuarialstandardsboard.org/wp-content/uploads/2024/09/asop036_213.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§1.2, 4.1-4.2, pp.1-10 (PDF pp.6-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Regulatory Reporting.md
---

**Regulatory Reporting** is the prescribed communication of reserves and supporting actuarial work to insurance regulators. The three linked deliverables are the **Annual Statement** (Schedule P), the **Statement of Actuarial Opinion** (SAO), and the **Actuarial Report** that supports it.

> $$\text{Opinion range: } \; \text{Low} \le \text{Carried Reserve} \le \text{High}$$

- **Schedule P** is the statutory loss development disclosure: paid and incurred triangles by line, with claim counts, for ten accident years, plus the one-year and two-year development on prior reserves. It is how regulators monitor reserve adequacy across the industry and identify deteriorating companies.
- **The Statement of Actuarial Opinion** states whether the carried reserves make a reasonable provision for the insurer's unpaid claim obligations. The standard opinion types are **reasonable**, **inadequate (deficient)**, **redundant (excessive)**, **qualified** (some component the actuary cannot opine on), and **no opinion**.
- **The Actuarial Report** documents the analysis behind the opinion — data, methods, assumptions, and the reasoning for the selections — in enough detail that another actuary could follow it. [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] requires disclosure of significant assumptions, material assumption changes from the prior analysis, and significant limitations or uncertainties.
- The opinion also addresses **risk of material adverse deviation**: the actuary identifies whether such risk exists, the materiality standard used, and the major factors driving it.
- Reserves are stated on a **statutory** basis, which is generally undiscounted except for defined categories (tabular workers compensation indemnity, and some long-term disability), and gross and net of reinsurance separately.

![[Media/Figures/Regulatory_Reporting.svg|340]]

> [!example]- Can the Actuary Sign a Clean Opinion? {Example}
> An insurer's carried reserve is $\$36{,}000{,}000$. The actuary's central estimate is $\$41{,}000{,}000$ and the range of reasonable estimates is $\$38{,}000{,}000$ to $\$44{,}000{,}000$.
>
> What opinion is required?
>
> > [!answer]-
> > The carried reserve of $\$36$M falls **below the bottom of the range**. The actuary cannot issue a reasonable opinion; the required conclusion is that the reserves are **inadequate**, disclosing the deficiency and its drivers.
> >
> > What the actuary may *not* do is adopt the carried figure as the point estimate because management prefers it. The opinion is on whether the carried amount makes a reasonable provision, and the actuary's own range is the standard against which it is measured.
> >
> > Had the carried reserve been $\$38{,}500{,}000$ — inside the range but below the central estimate — a reasonable opinion would be available, though a competent report would note that the carrying is toward the low end and quantify what that implies about future development.

> [!example]- Reading Schedule P as a Regulator {Example}
> An insurer's one-year development on prior-year reserves, as reported in successive Schedule P filings, expressed as a percentage of the opening reserve: $+2.4\%$, $+3.2\%$, $+4.1\%$, $+5.1\%$. Surplus is $\$60{,}000{,}000$ and reserves are $\$47{,}000{,}000$.
>
> What would a regulator conclude?
>
> > [!answer]-
> > Four consecutive years of **adverse** development, accelerating. That is not random variation around an unbiased estimate — it is a demonstrated bias in the reserving process, and it is exactly the pattern Schedule P exists to surface.
> >
> > The regulator's concerns, in order:
> >
> > 1. **Current adequacy.** If the process has been low four years running, the current $\$47$M is probably low too. At the latest rate, another $\$2.4$M of deterioration is expected, and the trend suggests more.
> > 2. **Surplus.** The cumulative development has been consuming surplus each year while reported results looked better than they were. Reserves are $78\%$ of surplus, so a $10\%$ reserve deficiency is an $8\%$ surplus hit.
> > 3. **Pricing.** Understated reserves feed understated loss ratios into rate indications, so the business being written now is likely inadequately priced — the deficiency reproduces itself.
> >
> > The likely regulatory response is heightened scrutiny of the next SAO, questions about whether the risk of material adverse deviation was properly identified, and possibly a request for an independent review. The actuary should have raised all three points before the regulator did — see [[Reserve Adequacy]] and [[Roll Forward Analysis]].
