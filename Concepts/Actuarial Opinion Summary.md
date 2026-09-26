---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5be12018cbe0bc261b34c916728556d57ccbb0ce75e3f0d08ee8717bae00a67c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Opinion Summary.md
---

**The Actuarial Opinion Summary** (AOS) is the **confidential** supplement in which a U.S. property-casualty insurer's Appointed Actuary gives the domiciliary regulator the numbers the public opinion leaves out: the actuary's range and/or point estimate of loss and loss adjustment expense reserves, the company's carried reserves, and the difference between them — each **net and gross of reinsurance**.

> $$\text{Difference} = \text{Carried} - \text{Actuary's estimate}$$

> $$\frac{\text{One-year adverse development}_t}{\text{Surplus}_{t-1}} > 5\%$$

- **Why it exists.** The public Statement of Actuarial Opinion says only *whether* the carried reserve is reasonable ([[SAO Language]]); the AOS says *where* in the actuary's range it sits. Because that is proprietary, the AOS is not filed with the NAIC, is kept separate from any copy of the opinion and is not for public inspection — though it may refer to the opinion and its date.
- **Filing.** Where the domiciliary state requires an AOS, it is filed there by **March 15** (or a later date the state sets), two weeks after the opinion goes out with the [[NAIC Annual Statement]]. A non-domiciliary state can obtain it within 15 days of a request, no earlier than March 15, and only if it shows it can keep the document confidential. Exemptions are the same as for the opinion.
- **Required contents**, signed and dated by the actuary who signed the opinion:
  - **(A)** the actuary's range of reasonable estimates and **(B)** point estimate, each net and gross — *when calculated*, so an actuary who produces only a range reports only a range;
  - **(C)** the company's carried loss and LAE reserves, net and gross;
  - **(D)** the difference between the carried reserves and the estimates in (A) and (B), net and gross;
  - **(E)** where [[Schedule P]] Part 2 Summary shows one-year adverse development above **5% of the prior year-end policyholders' surplus** in **three or more of the past five** calendar years, an explicit description of the reserve elements or management decisions that were the major contributors.
- **Consistency.** The net and gross figures should reconcile to the Annual Statement, the opinion and the [[Actuarial Report]], or the difference must be explained. A pool member states its pooling percentage and reports its own share (a 0% participant reports the lead company's figures). If factually incorrect data made the AOS wrong, the same 5-business-day notice to the board and amended filing apply as for the opinion.
- **How it is used.** A carried reserve near the bottom of the range, combined with repeated adverse development, is exactly the pattern [[Solvency Monitoring|solvency surveillance]] looks for; the AOS supplies it alongside the reserve tests in the [[IRIS Ratios]] without making it public. It is one of the [[Appointed Actuary Responsibilities]] and should follow ASOP Nos. 23, 41 and [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|43]].

> [!example]- Create an Actuarial Opinion Summary {Example}
> Year-end 2025, figures in \$ millions. The Appointed Actuary's loss and LAE estimates:
>
> - **Net:** range $410$ to $480$, point estimate $440$; carried $425$.
> - **Gross:** range $520$ to $610$, point estimate $560$; carried $548$.
>
> One-year development on prior-year reserves from Schedule P Part 2 Summary (adverse positive), against prior year-end surplus:
>
> | Calendar year | Development | Prior surplus |
> |---|---|---|
> | 2021 | 18 | 300 |
> | 2022 | 9 | 310 |
> | 2023 | 21 | 320 |
> | 2024 | 17 | 330 |
> | 2025 | 12 | 340 |
>
> Build the AOS.
>
> > [!answer]-
> > **(A)–(D), carried minus estimate:**
> >
> > - Net: $425 - 410 = +15$ against the low end, $425 - 440 = -15$ against the point estimate, $425 - 480 = -55$ against the high end.
> > - Gross: $548 - 520 = +28$, $548 - 560 = -12$, $548 - 610 = -62$.
> >
> > **(E), the five-year development test:**
> >
> > $$
> > \begin{align*}
> > 2021: \tfrac{18}{300} &= 6.0\% \\
> > 2022: \tfrac{9}{310} &= 2.9\% \\
> > 2023: \tfrac{21}{320} &= 6.6\% \\
> > 2024: \tfrac{17}{330} &= 5.2\% \\
> > 2025: \tfrac{12}{340} &= 3.5\%
> > \end{align*}
> > $$
> >
> > Three of the five years (2021, 2023, 2024) exceed $5\%$, so the AOS must also describe explicitly which reserve elements or management decisions drove that development.
> >
> > The public opinion will say "reasonable" — net carried is inside the range. The AOS tells the regulator more: carried sits $15$ below the actuary's point estimate, only $15/70 = 21\%$ of the way up the range, at a company whose reserves have repeatedly developed adversely.

> [!example]- Reasonable Net, Deficient Gross {Example}
> Figures in \$ millions. Net: range $300$ to $350$, point $325$, carried $310$. Gross: range $420$ to $500$, point $460$, carried $405$. What does the AOS show, and what follows for the opinion?
>
> > [!answer]-
> > Net carried is $10$ above the low end and $15$ below the point estimate — reasonable. Gross carried is $405 - 420 = -15$ against the low end: **below the range**.
> >
> > - When the opinion's scope covers both direct-and-assumed and net reserves, ASOP No. 36 requires an opinion on each basis. The gross opinion is **deficient or inadequate**, and must disclose the minimum reasonable amount, $420$.
> > - Exhibit B is completed on the net basis (type R). A different gross answer must be identified and discussed in the Relevant Comments.
> > - The implied ceded reserve is the real story. At the point estimates the actuary expects $460 - 325 = 135$ to be recovered from reinsurers; the company carries $405 - 310 = 95$. Of the $55$ gross shortfall against the point estimate, $40$ is expected to be ceded, so the net figure is only adequate if reinsurers pay more than the company has booked — making their ability to pay ([[Schedule F]], ratings, overdue recoverables) the regulator's next question.
