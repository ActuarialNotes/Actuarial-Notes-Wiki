---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:62364346b5fc09d3df20158a822cf0a4558d2eff9dd8935a053dd70897dd3ea8
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 pp.4-5, 9-10, 14 (PDF pp.10-11, 15-16, 20), Ch.3 pp.39-43 (PDF pp.45-49), Ch.4 p.44 (PDF p.50), Ch.15 pp.345, 351 (PDF pp.351, 357), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§2.1, 3.3(a), 4.1(c),(f), 4.2(b), PDF pp.7-9, 14-15, sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Reserving.md
---

**Loss Reserving** is the estimation of an insurer's liability for claims that have already occurred — the **retrospective** counterpart to [[Ratemaking|ratemaking]]. Where ratemaking asks what future losses will cost, reserving asks what past losses will finally cost. The liability being estimated is [[Unpaid Claims|unpaid claims]].

> $$\text{Total Reserve} = \text{Case Reserves} + \text{IBNR}$$

> $$\text{IBNR} = \underbrace{\text{Pure IBNR}}_{\text{unreported}} + \underbrace{\text{IBNER}}_{\text{development on known claims}}$$

That is the usual two-way split. Friedland's broad definition of IBNR, the one she uses throughout, has four components: future development on known claims, reopened claims, pure IBNR, and claims in transit (reported but not recorded).

**The workflow**, following Friedland:

1. **Understand the business.** Meet claims, underwriting and operations to identify changes in coding, processing, case reserving, underwriting, policy provisions, marketing and reinsurance. Everything that later distorts a triangle originates here.
2. **Organize the data** ([[Reserving Data Organization]]) — accident, policy, report or underwriting year; gross, ceded and net; segmented for [[Homogeneity|homogeneity]] against [[Credibility|credibility]].
3. **Build the triangles** — [[Paid Losses|paid]], [[Incurred Losses|reported]], [[Claim Count Triangle|counts]], [[Allocated Loss Adjustment Expense|ALAE]], recoveries.
4. **Diagnose** before estimating: paid-to-reported ratios, average case outstanding, disposal rates, severities and frequencies by maturity. Column effects are cost-level changes; diagonal effects are calendar-year changes.
5. **Adjust** where a diagnostic demands it — [[Berquist-Sherman Method|Berquist-Sherman]] for [[Case Adequacy|case adequacy]] or [[Settlement Rate|settlement rate]] shifts, and separate treatment of [[Large Loss|large]] and [[Catastrophe Loss|catastrophe]] claims.
6. **Apply several methods** — [[Chain Ladder Method|chain ladder]], [[Expected Loss Method|expected claims]], [[Bornhuetter-Ferguson Method|BF]], [[Cape Cod Method|Cape Cod]], [[Benktander Method|Benktander]], [[Frequency-Severity Method|frequency-severity]], [[Case Outstanding Development Method|case outstanding development]] — on both paid and reported data.
7. **Select** an [[Ultimate Loss|ultimate]] by accident year, with reasons, and add [[Unallocated Loss Adjustment Expenses ULAE|ULAE]].
8. **Test** the result for [[Reserve Adequacy|reasonableness]], **monitor** it ([[Actual vs Expected Analysis|actual vs. expected]], [[Roll Forward Analysis|roll-forward]]), and **[[Reserve Communication|communicate]]** it.

Further points:

- No method is right; the **selection** is the deliverable. Methods disagree in informative ways, and the disagreement between paid and reported estimates is a diagnostic about the diagonal, not a menu.
- Reserving and pricing are the same problem viewed from opposite ends. A reserving finding — severity trend stepping up, case adequacy shifting — is usually a pricing finding too.
- Under-reserving can put **solvency** at risk: it presents the insurer as stronger than it is, and an inadequate estimate can lead it to cut rates on business already underpriced — worse still if the lower rates win market share (Friedland Ch. 1). Comparing actual with expected emergence between full analyses is how a deficiency is caught early (Ch. 15).
- Professional requirements come from [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]]: identify the **intended measure** of the estimate — an actuarial central estimate (an expected value over the range of reasonably possible outcomes) is one of the measures it lists, alongside a high or low estimate, median, mean or specified percentile — and disclose it with the scope, the significant assumptions, and, when updating a previous estimate, any material change in assumptions, procedures, methods or models.

![[Media/Figures/Loss_Reserving.svg|340]]

> [!example]- IBNR as the Plug {Example}
> An insurer has $\$10{,}000{,}000$ of reported losses (paid plus case) for accident year $2025$. The development analysis indicates ultimate losses of $\$13{,}000{,}000$.
>
> What IBNR is required, and what does it consist of?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{IBNR} &= \$13{,}000{,}000 - \$10{,}000{,}000 \\
> > &= \$3{,}000{,}000
> > \end{align*}$$
> >
> > In the usual two-way split it covers claims from $2025$ that the insurer has not yet heard about (**pure IBNR**), and the amount by which case reserves on the claims it *has* heard about will prove insufficient (**IBNER**). Separating them requires the count triangle.
> >
> > > [!tip] Why the estimate has consequences beyond the balance sheet
> > > A $\$3$M reserve set at $\$2$M overstates surplus by $\$1$M and understates the AY 2025 loss ratio by ten points on a $\$10$M premium book. That understated loss ratio then feeds the next rate indication, producing rates that are too low on business that is already unprofitable — and the deficiency compounds. Reserve error is not confined to the balance sheet; it propagates into pricing.

> [!example]- Reading Methods Against Each Other {Example}
> Ultimate estimates for one accident year at $24$ months, all from the same data:
>
> | Method | Ultimate |
> |---|---|
> | Paid chain ladder | $\$8{,}900{,}000$ |
> | Reported chain ladder | $\$7{,}600{,}000$ |
> | Expected claims | $\$7{,}800{,}000$ |
> | BF (reported) | $\$7{,}700{,}000$ |
>
> What should the actuary conclude?
>
> > [!answer]-
> > Three estimates cluster near $\$7.7$M; the **paid chain ladder is the outlier**, $16\%$ higher. Since all four use the same claims, the gap is information about the data rather than about the ultimate.
> >
> > The paid method uses only payments. For it to run high, payments must be **ahead** of their historical relationship to ultimate — which means either claims are settling faster than they used to ([[Settlement Rate|settlement rate]] change, making historical paid factors too large), or a few large claims have paid early.
> >
> > The diagnostics that resolve it: **closed-to-reported claim counts** by maturity (rising confirms faster settlement) and the **paid-to-reported ratio** against history.
> >
> > If faster settlement is confirmed, the response is not to average the four numbers. It is to restate the paid triangle to a common disposal rate ([[Berquist-Sherman Method|Berquist-Sherman]]) and re-run the paid method — after which it should fall into line with the others. If it still does not, the reported side deserves the same scrutiny, since one of the two must be wrong about something.
