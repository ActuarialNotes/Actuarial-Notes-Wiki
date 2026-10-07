---
aliases:
  - Applicable Best Practice
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4cc32abcf06bfdc02660035b0facd2a3a82981e4f0db709c5f951df7eb12c1f4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Best Practice.md
---
**Best practice** — on SOA syllabi, "applicable best practices" — is the standard an actuary's work is held to for a given task: the professional standards that apply to it ([[Actuarial Standards of Practice|ASOPs]] in the United States, the CIA's [[Standards of Practice]] in Canada), together with the methods, checks, documentation and disclosures those standards and accepted practice expect. Outside actuarial work (CFE-201, INV-101) it means the processes regarded as leading practice in a field, such as credit risk management.

> $$\Delta = \hat{U}_0 - \left(P_{0 \to 1} + \hat{U}_1\right)$$

> $$\text{Runout ratio} = \frac{P_{0 \to 1} + \hat{U}_1}{\hat{U}_0}$$

- **The follow-up study** is the clearest quantitative best practice in reserving: ASOP 5 (section 3.5) lets the actuary test the reasonableness of prior estimates against what has since emerged. $\hat{U}_0$ is the liability held at the prior valuation for claims incurred before it, $P_{0 \to 1}$ what has since been paid on those claims, and $\hat{U}_1$ today's estimate of what remains. $\Delta > 0$ is a redundancy, $\Delta < 0$ a deficiency.
- **Which standards apply** depends on the task and the jurisdiction, and the guides name them: incurred claims ASOP 5, other health assets and liabilities ASOP 42, cash flow analysis ASOP 7, data ASOP 23, communications ASOP 41, risk adjustment ASOP 45, risk classification ASOP 12, credibility ASOP 25, long-term care ASOP 18, audits ASOP 21. GH-201C and CP-321 point to the CIA standards and educational notes instead — see [[Accepted Actuarial Practice]].
- **Common threads**: consider more than one method (ASOP 5, section 3.4); consider and **disclose** any explicit provision for adverse deviation (sections 3.3.1(d) and 4.1); review [[Data Quality|data]] for reasonableness and disclose its limitations; document well enough for another actuary to assess the work; and disclose any deviation from a standard's guidance in the [[Actuarial Communication|actuarial communication]].
- A standard says "should" for what is normally expected and "may" for what is optional. A non-binding practice note or educational note describes common practice but does not itself set the standard.

> [!example]- Follow-Up Study of a Health Claim Reserve {Example}
> At last year-end a health insurer held $\$4.2$M of unpaid claims: a best estimate of $\$4.0$M plus an explicit, disclosed $\$0.2$M provision for adverse deviation. Since then $\$3.75$M has been paid on those claims, and $\$0.15$M is estimated to remain. Evaluate the prior estimate.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Runout} &= 3.75 + 0.15 \\
> > &= 3.90 \\
> > \Delta_{\text{held}} &= 4.20 - 3.90 \\
> > &= 0.30 \\
> > \Delta_{\text{held}} / 4.20 &= 7.1\% \\
> > \Delta_{\text{BE}} &= 4.00 - 3.90 \\
> > &= 0.10 \\
> > \Delta_{\text{BE}} / 4.00 &= 2.5\%
> > \end{align*}
> > $$
> >
> > The held liability ran off $7.1\%$ redundant, but most of that is the margin doing its job: the **best estimate** was only $2.5\%$ high. Best practice is to compare the runout against the best estimate, check whether the redundancy recurs across valuations (a systematic bias in the completion factors), and reflect what is learned in this year's [[Claim Reserve|claim reserve]] assumptions.

> [!example]- Budget Neutrality in a Risk Adjustment Program {Example}
> A state Medicaid program pays three health plans a base capitation of $\$400$ PMPM adjusted by risk score. Membership and raw average risk scores: Plan A $50{,}000$ at $1.10$, Plan B $30{,}000$ at $0.95$, Plan C $20{,}000$ at $0.80$. The program is to be budget neutral. Find each plan's risk-adjusted PMPM.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{r} &= \frac{50{,}000(1.10) + 30{,}000(0.95) + 20{,}000(0.80)}{100{,}000} \\
> > &= 0.995 \\
> > \text{A} &= 400 \times 1.10/0.995 \\
> > &= 442.21 \\
> > \text{B} &= 400 \times 0.95/0.995 \\
> > &= 381.91 \\
> > \text{C} &= 400 \times 0.80/0.995 \\
> > &= 321.61
> > \end{align*}
> > $$
> >
> > Monthly payments are $\$22.111$M, $\$11.457$M and $\$6.432$M, totalling the $\$40.000$M budget. Paying $400 \times$ raw score would have paid $\$39.8$M: normalizing makes risk adjustment move money between plans without changing the total, as ASOP 45 (section 3.8) has the actuary consider.

> [!tip]- How it appears on the exam
> - GH-201U and GH-201C (Reserving, objective 7): applying the standards to a reserve — choosing methods, testing prior estimates by runout, setting and disclosing a margin, communicating results. Written answers, sometimes on a calculated reserve.
> - GH-201U (Financial Statements, objective 5) and CP-321 (Insurer Financial Statements): working with auditors and examiners (ASOP 21) and communicating financial results.
> - GH-301 (Healthcare Risk Adjustment, objective 3): ASOP 45 considerations — model selection, input data and coding, recalibration, budget neutrality — usually as critique of a described risk adjustment process.
> - GH-101 and CP-321 (Manual Rates, Retiree Group Benefits): applying data quality, credibility, risk classification and communication standards to claim projections and to post-retirement valuations.

> [!warning]- Exam traps
> - Calling a margin a redundancy: runout against the held liability mixes the explicit provision with estimation error. Measure against the best estimate, and remember an explicit provision must be disclosed.
> - Answering a Canadian-practice question with ASOPs: GH-201C and the CP-321 retiree material are judged against the CIA's standards.
> - Normalizing risk scores to the wrong population: the average must be weighted by the members actually paid, or the program is no longer budget neutral.
> - Listing a standard instead of applying it: "follow ASOP 23" earns little; say what the data review checks and what you would disclose.
