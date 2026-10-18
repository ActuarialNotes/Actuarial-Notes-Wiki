---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:6b358fa31f395aa0d67474ec92b7cdb313876de0214c44afb631a7ea69c26fbe
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q26 PDF pp.93-95 (efficient frontier on three risk measures; cost of capital plus net cost of reinsurance), Q28 PDF p.97 (operational vs strategic risk; strategic risks), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf"
    - "CAS Exam 7 Spring 2016 — sample answers and examiner's report, Q21 PDF pp.88-89 (ERM program strengths and weaknesses), Q27 PDF p.102 (agency theory, cycle management), Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf"
    - "CAS Exam 7 Spring 2017 — sample answers and examiner's report, Q22 PDF pp.86-87 (accepted aspects of parameter risk), Q24 PDF pp.93-95 (scenario planning), Q25 PDF p.96 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Business Risk.md
---

**Business Risk** is the uncertainty in a firm's operating results — and so in its value — that comes from the business it is in and the way it runs it: its markets and competitors, the pricing cycle, its strategy and its operations, before any effect of how it is financed. In [[Enterprise Risk Management|ERM]] it is the overall risk the enterprise faces, the thing ERM exists to manage as a whole.

> $$\text{ROE} = \text{ROA} \times \frac{A}{E}$$

> $$\sigma_{\text{ROE}} = \frac{A}{E}\;\sigma_{\text{ROA}}$$

- ROA is the operating result — underwriting plus investment, before financing costs and tax — divided by assets $A$; $E$ is equity. $\sigma_{\text{ROA}}$ measures business risk; the multiplier $A/E$ is **financial (leverage) risk**, which converts it into risk to shareholders. A P&C insurer's liabilities are mostly loss reserves and unearned premium, so it is highly levered — the reason premium-to-surplus and reserves-to-surplus ratios are watched ([[Insurance Leverage]]).
- **Broad and narrow senses.** Broadly, business risk is the total risk to the plan from every source in the [[Risk Taxonomies|taxonomy]]. Narrowly, it is the *strategic* category: competition, shifts in demand, the underwriting cycle, regulatory and political change, reputation, technology, and simply choosing the wrong plan. For a P&C insurer the underwriting cycle is the classic case — rates soften under competition until business written in the soft market proves inadequate.
- **How ERM relates to it.** Some risks *are* the business: underwriting risk is what the insurer is paid to take, and ERM's job is to take it efficiently and exploit it. Others are incidental — most [[Operational Risk|operational risk]] — and should simply be reduced. ERM's contribution is to see them together, so strategy is chosen with its risk known.
- **ERM tools change business risk, and therefore strategy.** [[Reinsurance]], hedging and diversification lower $\sigma_{\text{ROA}}$; more capital lowers $A/E$. Either creates room to grow, to hold price, or to take a risk the firm could not previously afford. Each has a cost and may create another risk — reinsurance swaps insurance risk for [[Credit Risk|credit risk]]. See [[Risk Mitigation]] and [[Business Strategy]].

> [!example]- Growth, Leverage and Reinsurance {Example}
> An insurer has assets of $\$1{,}000$ million and equity of $\$300$ million; the standard deviation of its operating return on assets is $3.0\%$. A growth plan would take assets to $\$1{,}200$ million with equity unchanged. Find $\sigma_{\text{ROE}}$ before and after, and the $\sigma_{\text{ROA}}$ that would keep equity risk at today's level.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \sigma_{\text{ROE, today}} &= 3.0\% \times \frac{1{,}000}{300} \\
> > &= 10.0\% \\[4pt]
> > \sigma_{\text{ROE, growth}} &= 3.0\% \times \frac{1{,}200}{300} \\
> > &= 12.0\% \\[4pt]
> > \sigma_{\text{ROA, needed}} &= \frac{10.0\%}{4} \\
> > &= 2.5\%
> > \end{align*}
> > $$
> >
> > Unchanged, the plan raises shareholders' risk by a fifth. Two ERM tools restore it: a reinsurance programme that cuts operating volatility from $3.0\%$ to $2.5\%$ of assets, or new equity of $\$1{,}200\text{M} \times 0.30 - \$300\text{M} = \$60$ million to hold $A/E$ at $3.33$. The choice is between the net cost of the reinsurance and the cost of $\$60$ million of capital — a strategic decision made with risk numbers.

> [!example]- Soft Market: Hold Price or Hold Volume? {Example}
> Competitors have cut commercial property rates $10\%$ two years running, and the insurer's own analysis puts its current rates $5\%$ below the technical price. Matching the market keeps volume; holding price would lose about a quarter of the book. How should ERM inform the choice?
>
> > [!answer]-
> > This is **business (strategic) risk**, not hazard risk: the danger is writing a year of business at an expected loss, and the loss is invisible until the cycle turns and those accident years develop adversely.
> >
> > - **Model both paths over several years**, including pricing risk and [[Parameter Risk|parameter risk]] — soft-market years are exactly where loss-cost estimates are most optimistic.
> > - **Count the costs of shrinking**: fixed expenses spread over less premium, broker relationships and renewal retention that are hard to rebuild.
> > - **Use the tools to change the trade-off**: keep a market presence on a smaller net line by ceding more, redeploy capital to lines that are adequately priced, or return idle capital to shareholders.
> >
> > ERM does not make the call. It makes the risk of each path explicit, so the board chooses a strategy knowing what it is buying.
