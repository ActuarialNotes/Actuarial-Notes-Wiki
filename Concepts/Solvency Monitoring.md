---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0cd2819931d6b346cc99e10fef237d524936971c854bf4db468e556e870279b6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Solvency Monitoring.md
---

**Solvency Monitoring** is the ongoing U.S. regulatory surveillance of insurers' financial condition — quarterly **off-site analysis** of statutory filings, periodic **on-site risk-focused examinations**, and the [[Risk-Based Capital]] ladder as a legal backstop — designed to find a deteriorating insurer while corrective action, rather than liquidation, is still possible.

> $$\text{Surveillance} = \underbrace{\text{off-site analysis}}_{\text{quarterly}} + \underbrace{\text{on-site exam}}_{\text{every} \,\le 5\text{ yrs}}$$

- **What it runs on.** Uniform [[NAIC Annual Statement|annual and quarterly statements]] prepared on [[Statutory Accounting Principles|statutory accounting]], with their [[Annual Statement Schedules|schedules]] ([[Schedule F]] for reinsurance, [[Schedule P]] for loss development), the appointed actuary's opinion and an independent CPA audit. The NAIC captures them electronically, which is what makes peer benchmarking and industry-wide stress tests possible.
- **Off-site analysis.** The domiciliary state reviews each domestic insurer quarterly using the NAIC *Financial Analysis Handbook*'s stair-step approach — deeper work for weaker or more complex insurers. The NAIC's **FAST** tools set priorities: the public [[IRIS Ratios]], the regulator-only Scoring System and Insurer Profiles, combined in the Analyst Team System. The Financial Analysis Working Group adds peer review of nationally significant insurers and groups.
- **On-site examination.** A full-scope financial exam at least every five years (three in some states), under the *Financial Condition Examiners Handbook*. It is **risk-focused**: identify inherent risks, assess the governance and controls that mitigate them, then test what remains, on a current and prospective basis. Groups are examined in coordination under a lead state.
- **Other inputs.** Holding-company filings (Form B registration, Form F enterprise risk report), the ORSA Summary Report and the Corporate Governance Annual Disclosure ([[Insurance Governance]]); prior approval of extraordinary dividends, material affiliate transactions and changes of control.
- **Intervention.** Regulators usually act on a finding of **hazardous financial condition** — adverse analysis or exam results, a failing reinsurer, unfit management, missing information — often well before RBC is breached. RBC adds automatic authority with limited court involvement. The last resort is receivership (conservation, rehabilitation, liquidation) in the domiciliary state's courts, with state guaranty associations paying covered claims up to statutory limits.
- **Its limits.** Every tool reads statutory statements, so an insurer that understates reserves looks healthy until development reveals it — which is why reserve-development ratios, the actuarial opinion and exam actuaries carry so much weight.

> [!example]- Growth That Trips the Early Warning {Example}
> A regional insurer's net written premium rises from $\$250$ million to $\$400$ million after it launches a commercial auto program through a managing general agent. Its RBC ratio is $340\%$, and its adjusted liabilities to liquid assets ratio has risen from $78\%$ to $96\%$ over two years. What does the monitoring system do?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Change in NPW} &= \frac{400 - 250}{250} \\
> > &= 60\%
> > \end{align*}
> > $$
> > That is outside IRIS's $-33\%$ to $+33\%$ usual range. The liquidity ratio is still inside its range (below $100\%$), but the IRIS manual notes that failed insurers typically show this ratio **rising** in their final years, so the trend matters more than the level.
> >
> > RBC gives no signal: $340\%$ is above every action level, and the P&C trend test applies only between $200\%$ and $300\%$.
> >
> > The analyst therefore escalates on judgement: request the business plan, the MGA agreement and the insurer's controls over it, pricing support, reserving by program, and the reinsurance program; then schedule a **limited-scope examination** of the program's claims and reserves. Rapid growth into an unfamiliar line through a delegated authority is a classic insolvency pattern. If the exam finds material under-reserving, the regulator can find **hazardous financial condition** and order writings limited or capital added — with RBC still reading "no action".
