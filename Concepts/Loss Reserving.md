---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:df6f5b032e1c1f4ce58886aadda07dbf9708e54279babea28810842a8d7a6e2d
  sources: []
  open_findings: 0
  log: .verify/Concepts/Loss Reserving.md
---

**Loss Reserving** is the estimation of an insurer's liability for claims that have already occurred — the **retrospective** counterpart to [[Ratemaking|ratemaking]]. Where ratemaking asks what future losses will cost, reserving asks what past losses will finally cost. The liability being estimated is [[Unpaid Claims|unpaid claims]].

> $$\text{Total Reserve} = \text{Case Reserves} + \text{IBNR}$$

> $$\text{IBNR} = \underbrace{\text{Pure IBNR}}_{\text{unreported}} + \underbrace{\text{IBNER}}_{\text{development on known claims}}$$

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
- Under-reserving is a leading cause of **insolvency**: it overstates surplus, understates the loss ratio, and therefore feeds an inadequate rate indication back into pricing, which produces more under-reserved business. The feedback loop is the reason reserve monitoring is continuous rather than annual.
- Professional requirements come from [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]]: an actuarial central estimate, disclosure of methods and assumptions, and identification of any material change from the previous analysis.

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
> > It covers two things: claims from $2025$ that the insurer has not yet heard about (**pure IBNR**), and the amount by which case reserves on the claims it *has* heard about will prove insufficient (**IBNER**). Separating them requires the count triangle.
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
