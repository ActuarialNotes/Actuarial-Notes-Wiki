---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f0b5f58208f9bb9900096ee403d42cc477c69a90054fd141296868dbb53d2374
  sources:
    - "NAIC testimony (Dilweg), House Financial Services, Mar 18 2010, PDF pp.2-6 (FAST tools, Analyst Team, Scoring System, Insurer Profiles, Financial Analysis Handbook stair-step, FAWG), sha256:6b54489519acef3b13de704b7ee457613331d9eb7881c25cb79a9928f9fa9239 — https://financialservices.house.gov/media/file/hearings/111/final_dilweg_testimony_3_18_2010.pdf"
    - "NAIC Model Law on Examinations (#390), examination frequency (not less than once every five years), sha256:0ac0345b424cbe0e28f85c01b9c87b276bdaa967c64dbb2accb192f04e9b46c4 — https://content.naic.org/sites/default/files/model-law-390.pdf"
    - "NAIC Model Regulation to Define Standards and Commissioner's Authority for Companies Deemed to be in Hazardous Financial Condition (#385), s.3 standards, s.4 orders, sha256:a85597cbe53da10521b464543813d02aa1ab01a9d6fe332e307f49ea6f2086a4 — https://content.naic.org/sites/default/files/model-law-385.pdf"
    - "NAIC Risk-Based Capital (RBC) for Insurers Model Act (#312), s.1 definitions (Regulatory Action Level RBC = 1.5 x ACL; P&C trend test band), s.4, sha256:973063eff4e1d044765b1d06e88d025da452d900d587faadd85528ba4c45bf63 — https://content.naic.org/sites/default/files/model-law-312.pdf"
    - "NAIC Risk Management and Own Risk and Solvency Assessment Model Act (#505), ORSA Summary Report, sha256:d5df715f08b8061178f58fbf5d6aefd4b5993d845584455f0fa7eef492108798 — https://content.naic.org/sites/default/files/model-law-505.pdf"
    - "NAIC Corporate Governance Annual Disclosure Model Act (#305), CGAD filing, sha256:8ae9cdde0ecc51884b9299b925008c5f9733e236cece540382ce551a4e98c64a — https://content.naic.org/sites/default/files/model-law-305.pdf"
    - "NAIC Insurer Receivership Model Act (#520), scope, sha256:0bcda9fc876090b38d9fce9b0edc98b0884b467840acc33801cb1eab4837b908 — https://content.naic.org/sites/default/files/model-law-520.pdf"
    - "NAIC 2025 Property and Casualty IRIS Ratios (means/medians and results), PDF p.2 (ratio list), p.5 (unusual-value row), sha256:0cb14c7a1f73bee94056296833cce0b70659e23b43842df033819fb962fde0ba — https://content.naic.org/sites/default/files/publication-iris-means-median-2025.pdf"
    - "NAMIC Issue Analysis, \"The Financial Examination\" (Dec 2019, rank 3), pp.4-6 (3-5 year cycle, risk-focused, controls, prospective), sha256:677c4dbbb2e5d4dba57816c5ccadf95831810b80b1360ba5d714ec22417b72c6 — https://www.NAMIC.org/pdf/publicpolicy/191218_financial_exam_v2.pdf"
    - "S. Harrington, testimony to Senate Banking Committee, July 18 2006, PDF pp.3-4, 9, sha256:b9f8f73ee163f8da541f0b1eac83254cafbcf66cdd8e508c0fb8e770a7fcf20c — https://www.banking.senate.gov/download/harrington-july-18-2006&download=1"
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
> A regional insurer's net written premium rises from $\$250$ million to $\$400$ million after it launches a commercial auto program through a managing general agent. Its RBC ratio is $340\%$, and its liabilities to liquid assets ratio has risen from $78\%$ to $96\%$ over two years. What does the monitoring system do?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Change in NPW} &= \frac{400 - 250}{250} \\
> > &= 60\%
> > \end{align*}
> > $$
> > That is outside IRIS's $-33\%$ to $+33\%$ usual range. The liabilities to liquid assets ratio is still below the $105\%$ at which IRIS flags it, but it has risen $18$ points in two years, so the trend is worth watching as well as the level.
> >
> > RBC gives no signal: $340\%$ is above every action level, and the P&C trend test applies only between $200\%$ and $300\%$.
> >
> > The analyst therefore escalates on judgement: request the business plan, the MGA agreement and the insurer's controls over it, pricing support, reserving by program, and the reinsurance program; then schedule a **limited-scope examination** of the program's claims and reserves. Rapid growth into an unfamiliar line through a delegated authority is a classic insolvency pattern. If the exam finds material under-reserving, the regulator can find **hazardous financial condition** and order writings limited or capital added — with RBC still reading "no action".

> [!tip]- How it appears on the exam
> - **DISC-IA:** The Insurance Regulation section asks how regulators monitor insurer solvency. Questions ask what off-site analysis, on-site examinations, IRIS ratios and risk-based capital each contribute, which state leads the work, and what regulators can do when an insurer is in hazardous financial condition.
> - **Applied questions:** A question describes an insurer's growth, ratios or capital and asks which tool would flag it and what action follows, as in the example.
