---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:dd4a9fbc568da5954ee6840d7f451d80e7313e3522723c2d84c3cb698bd67efb
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q26 PDF pp.93-95 (efficient frontier on three risk measures; cost of capital plus net cost of reinsurance), Q28 PDF p.97 (operational vs strategic risk; strategic risks), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf"
    - "Directive 2009/138/EC (Solvency II), Art.13(33), Art.101(4), Art.104(1), Art.107(1), sha256:cbd309f6304c5234f38013c0d1752bd4fbd3241a18ae22841d4825ddadeeaab6 — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Operational Risk.md
---

**Operational Risk** is the risk of loss resulting from inadequate or failed internal processes, people and systems, or from external events — the Basel Committee's definition, used almost word for word in [[Solvency II]]. It includes legal risk but excludes strategic and reputational risk, and it is classified by **cause**: a loss is operational because of why it happened, not because of the account it lands in.

> $$L_{\text{op}} = \sum_{i=1}^{N} X_i$$

> $$E[L_{\text{op}}] = E[N]\,E[X]$$

- $N$ is the number of operational loss events in a year and $X_i$ their severities — the **loss distribution approach**, the same [[Aggregate Loss Model|aggregate loss model]] actuaries use for claims. With Poisson frequency at rate $\lambda$, $\text{Var}(L_{\text{op}}) = \lambda\,E[X^2]$ ([[Compound Poisson Process]]). Internal loss data are sparse and severities heavy-tailed, so they are supplemented with external loss data and expert **scenario analysis**.
- **Basel's seven event types:** internal fraud; external fraud; employment practices and workplace safety; clients, products and business practices; damage to physical assets; business disruption and system failures; execution, delivery and process management.
- **In an insurer** these look like claims leakage and fraud, underwriting outside authority, a policy or claims system outage, a cyber attack, mis-selling or bad-faith claims handling, a data or [[Model Risk|model]] error in pricing or reserving, and failure of an outsourced provider.
- **Determining operational risks** is mostly identification and control: process mapping, risk and control self-assessment, a loss-event database, **key risk indicators** that give early warning (system downtime, claim-file backlog, staff turnover), and internal controls — for U.S. public companies, the [[Sarbanes-Oxley]] regime over financial reporting. Capital regimes charge for it too: the [[Operational Risk Margin|operational risk margin]] in Canada's MCT, a module in Solvency II, and a component of the NAIC [[Risk-Based Capital|RBC]] formula.
- It is largely **incidental** risk: an insurer earns nothing for bearing it, so the aim is to reduce it cost-effectively rather than to exploit it. It also tends to arrive alongside other risks — the catastrophe that floods the claims office.

> [!example]- Which of These Losses Are Operational? {Example}
> After a hurricane an insurer records: (a) $\$400$M of policyholder claims; (b) $\$6$M to restore its flooded claims centre; (c) $\$15$M of overpayments because emergency adjusters were given unchecked payment authority; (d) $\$20$M of prior-year reserve strengthening after a broken spreadsheet link is found; (e) $\$25$M of prior-year strengthening because construction inflation outran the assumption; (f) $\$10$M unrecoverable from a failed reinsurer; (g) the loss of $8\%$ of its renewals after complaints about slow claims service. Classify each.
>
> > [!answer]-
> > - (a) **Insurance (catastrophe) risk** — the risk the insurer is paid to take.
> > - (b) **Operational** — damage to physical assets and business disruption.
> > - (c) **Operational** — execution and process management; a control failure.
> > - (d) **Operational** — a process error, even though it appears as reserve development.
> > - (e) **Insurance (reserve) risk** — the estimate was reasonable; the world changed.
> > - (f) **Credit risk** — reinsurance counterparty default.
> > - (g) **Strategic / reputational**, outside the Basel definition — but its *cause*, poor claims handling, is operational, and the fix lies there.
> >
> > Items (d) and (e) hit the same line of the income statement. The cause decides the category, and the category decides the remedy: controls for (d), better trend assumptions for (e).

> [!example]- Is the Control Worth Its Cost? {Example}
> Claim-payment errors occur as a Poisson process with $\lambda = 4$ a year; each costs on average $\$250{,}000$ with standard deviation $\$500{,}000$. A dual-authorisation control costing $\$200{,}000$ a year would cut the frequency to $3$. Find the mean and standard deviation of annual loss before and after (in $\$000$).
>
> > [!answer]-
> > $E[X^2] = 250^2 + 500^2 = 312{,}500$.
> >
> > $$
> > \begin{align*}
> > \text{Before:} \quad E[L] &= 4 \times 250 \\
> > &= 1{,}000 \\
> > \text{SD}(L) &= \sqrt{4 \times 312{,}500} \\
> > &= 1{,}118 \\[6pt]
> > \text{After:} \quad E[L] &= 3 \times 250 \\
> > &= 750 \\
> > \text{SD}(L) &= \sqrt{3 \times 312{,}500} \\
> > &= 968
> > \end{align*}
> > $$
> >
> > The control saves $\$250{,}000$ a year in expectation for a cost of $\$200{,}000$, and cuts the standard deviation by $13\%$ — worth doing. If the concern were the tail rather than the mean, a control capping severity (a payment limit) would do more than one reducing frequency.
