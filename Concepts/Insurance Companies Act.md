---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:1a5f76a5d274aa64483db384511ec8bb9732d8e671af37e78fe8c5e318a9e634
  sources:
    - "Insurance Companies Act (S.C. 1991, c. 47), Justice Laws consolidation as of 12 December 2017 (the Exam 6C version), ss. 22, 49(1), 165(2), 207(b), 357, 358-359 (repealed), 359.1-359.2, 360-370, 440(1), 515(1)-(4), sha256:e3ff56e53382a462405acb34825e046a5c1c217efdfee98f175bd89c13b088ca — https://laws-lois.justice.gc.ca/eng/acts/I-11.8/20171212/P1TT3xt3.html"
    - "Insurance Companies Act (S.C. 1991, c. 47), Justice Laws full text current to 2026-09-21, ss. 49(1), 207(b), 357-370, 515 (same text as the 2017 consolidation for these sections), sha256:9c041a9b453cb6cd89fbe883b60546990c43aa794a458cf5fde014225b17b1a2 — https://laws-lois.justice.gc.ca/eng/acts/I-11.8/FullText.html"
    - "OSFI Guideline E-15, Appointed Actuary: Legal Requirements, Qualifications and Peer Review (2023), Legal requirements: appointment (49(1), 165(2)(i), 357), revocation (360), statements (363-364), valuation (365), report (367), financial position and FCT report (368), report to officers (369), sha256:013acdce02f8efaf144e9eb58a8d97518a58b67ded097261c9893338bcb39e50 — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/appointed-actuary-legal-requirements-qualifications-peer-review-guideline-2023"
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble (ICA ss. 515(1), 608(1)); §1.1.1, §1.1.2 (target-level requirements less diversification credit, divided by 1.5; MCT ratio = capital available / minimum capital required); §1.2.1 (100% minimum, 150% supervisory target, internal target); §4.2.1, §4.3.3.2, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "CIA, Educational Note: Role of the Appointed Actuary Under IFRS 17 (December 2022), PDF p.6, §1 What has not changed (reserved role under the ICA, the Quebec Insurers Act or other provincial Act; footnote 1), sha256:cef090fa90c49605ee6cc51e4bfb05243e192524bab1769762accf68d13f5e13 — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_Role_of_the_Appointed_Actuary_Under_IFRS_17.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Companies Act.md
---

**The Insurance Companies Act** (ICA, S.C. 1991, c. 47) is the federal statute governing federally regulated insurers in Canada: it provides for their incorporation by letters patent (s. 22), limits the business they may carry on (s. 440), sets their corporate governance (Part VI), and gives the Superintendent of Financial Institutions ([[OSFI]]) powers over them. It is the source of the [[Appointed Actuary]] role — in the Act's words, the *actuary of the company* — and of the requirement to value [[Insurance Contract Liabilities|policy liabilities]] in accordance with generally accepted actuarial practice.

- **The actuary's appointment (ss. 49, 207, 357, 360–364).** The *directors* appoint the actuary at their first meeting (s. 49(1)); they may not delegate filling a vacancy in the office of actuary (s. 207(b)), and must fill one forthwith (s. 362). The company notifies the Superintendent of the appointment (s. 357). Only the directors may revoke it (ss. 360(1), 361(1)(d)), and the company must notify the Superintendent of the revocation (s. 360(2)). An actuary who resigns or is removed gives the directors and the Superintendent a written statement of the circumstances and reasons (s. 363), and no successor may accept the appointment without first requesting that statement (s. 364).
- **Valuation (s. 365).** The actuary values the [[Insurance Contract Liabilities|actuarial and other policy liabilities]] as at the end of a financial year, and any other matter the Superintendent directs, in accordance with generally accepted actuarial practice with such changes and additional directions as the Superintendent may make.
- **Reporting duties (ss. 366–369).** The actuary is entitled to access to the records, information and explanations the actuary considers necessary (s. 366); reports to the shareholders and policyholders on the valuation, stating whether the annual statement presents fairly its results (s. 367); meets the directors (or audit committee) at least once a year to report on the company's financial position and, where the Superintendent so directs, its expected future financial condition — the [[FCT|financial condition testing]] report (s. 368); and reports in writing to the CEO and CFO any matter with *material adverse effects* on the financial condition that requires rectification, copying the directors, and — if suitable action is not being taken — sending the report to the Superintendent (s. 369). See [[Duty to Report]].
- **Privilege and civil immunity (s. 370).** The actuary's statements and reports under the Act have qualified privilege, and an actuary who in good faith makes a statement or report under s. 363 or s. 369 is not liable in a civil action for damages for having made it.
- **Adequacy of capital (s. 515).** The company must maintain adequate capital and adequate and appropriate forms of liquidity (s. 515(1)), and the Superintendent may direct it to increase its capital even when it meets the regulations and guidelines (s. 515(3)). The [[MCT]] guideline is not made under s. 515(2), but its standards are the framework within which the Superintendent assesses whether a P&C company has adequate capital under s. 515(1).
- Provincially incorporated insurers come under provincial legislation instead — Quebec's Insurers Act or another provincial Act — which also makes the appointed actuary a reserved role, though not identically: the Quebec Act, for instance, does not require the actuary's opinion in the financial statements.

> [!example]- The Actuary Discovers a Reserve Deficiency {Example}
> During the year-end valuation, the Appointed Actuary of a federally regulated insurer concludes that a reserve strengthening of $\$40$ million is needed. The CFO instructs the actuary to book $\$15$ million now and "phase in the rest." Surplus is $\$120$ million.
>
> What does the ICA require?
>
> > [!answer]-
> > The valuation is the *actuary's*, not management's. Under s. 365 the liabilities must be valued in accordance with generally accepted actuarial practice, so the actuary's valuation is the amount the actuary's work supports — $\$40$ million — regardless of what management prefers to carry.
> >
> > If management then carries $\$15$ million:
> >
> > 1. Under s. 367 the actuary's report must state whether the annual statement presents fairly the results of the valuation — and it does not. A $\$25$ million shortfall against $\$120$ million of surplus is plainly material.
> > 2. This is a matter with **material adverse effects on the financial condition** of the company that requires rectification, so s. 369 applies: report in writing to the CEO and CFO, give the **directors** a copy forthwith, and if suitable action is not being taken, send the report to the **Superintendent** and tell the directors so.
> > 3. Section 370 protects the actuary from civil liability for making that report in good faith.
> >
> > Resigning does not avoid this. Under s. 363 an actuary who resigns must give the directors and the Superintendent a written statement of the circumstances and reasons, so the deficiency reaches the regulator either way.

> [!example]- Who Can Fire the Appointed Actuary? {Example}
> A new CEO is unhappy with the Appointed Actuary's insistence on a higher [[Risk Adjustment for Non-Financial Risk|risk adjustment]] and tells the actuary they are being replaced effective immediately.
>
> > [!answer]-
> > The CEO cannot do this. Under s. 360(1) the **directors** may revoke the appointment — revocation by the directors is the only way an actuary is removed from office (s. 361(1)) — and under s. 207(b) they cannot delegate filling the office. If the directors do revoke it, the company must notify the Superintendent (s. 360(2)), and the actuary must give the directors and the Superintendent a written statement of why, in the actuary's opinion, the appointment was revoked (s. 363) — so a dismissal over a valuation disagreement becomes visible to the regulator rather than invisible.
> >
> > A successor actuary may not accept the appointment without first requesting that statement from the predecessor (s. 364; the appointment is void otherwise, unless no reply comes within fifteen days). The combined effect is that "replace the actuary until you get the answer you want" is a strategy the Act is specifically built to defeat.
