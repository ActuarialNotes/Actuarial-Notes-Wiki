---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b0a6ebd8b1f042d3f496c7948093f8a7e6fd962d03d29455ce77312c94149d0b
  sources:
    - "D'Arcy, Capital Allocation in the Property-Liability Insurance Industry (Variance 5:2), pp.141-146 (PDF pp.1-6), sha256:e7a4dc616cf02bf9721fd906a35cdd3c2a017ae92921b058a6a932555c955612 — https://www.casact.org/sites/default/files/2021-07/Capital-Allocation-Darcy.pdf"
    - "Damodaran, The Cost of Capital: The Swiss Army Knife of Finance (April 2016), pp.2, 5, 17, sha256:5213c261bc05b5e8920f6a2feba1687c1f424fa1155b20789b6848a3e4223f90 — https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/costofcapital.pdf"
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Myers & Read, Capital Allocation for Insurance Companies (Brattle working paper, Aug 2001), pp.2-9, 22, 44-45, sha256:681450625dce92c765b9fb1762de4d299d060bb852906e79b3233bb6e4aa7a9b — https://www.brattle.com/wp-content/uploads/2017/10/Capital-Allocation-for-Insurance-Companies.pdf"
    - "Froot, Risk Management, Capital Budgeting and Capital Structure Policy for Insurers and Reinsurers (NBER WP 10184, 2003), pp.2-10, 16, sha256:0de3a439eb286ea2a5ed225fcfa4cbb2ed62d964dc2485dbb79239dabfb6383e — https://www.nber.org/system/files/working_papers/w10184/w10184.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "CAS Exam 9 Practice Items and Solutions (2026; retired Spring 2026 items), Items 3 (M&M 11.3: cost of capital i = [g(s)-s]/[1-g(s)], g(s) = (s+i)/(1+i), LR = s/g(s)) and 4 (M&M pp.317-318: Shapley allocation), sha256:9cf61c6c2597a9a1a6d2d548d83f78a1a56e73778226176ab30308aa85f615fb — https://www.casact.org/sites/default/files/2026-08/Exam9_PracticeItems_2026.xlsx"
    - "Robbin, IRR, ROE, and PVI/PVE (CAS Forum Winter 2007), pp.189-191, 201-206, 227-229 (PDF pp.1-3, 13-18, 39-41), sha256:151252827511805261ec416c1454571361957b728d9fcce961f15c7fab268e7c — https://casact.org/sites/default/files/database/forum_07wforum_07w195.pdf"
    - "CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.1-3, sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR 3(1), 2000), abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry"
    - "Goldfarb, P&C Insurance Company Valuation (CAS study note, rev. Oct 2010), pp.27 and fn 28 (book value as the firm's equity capital; assets and liabilities fairly stated on the balance sheet), 30 (book value: reported book value of the firm's equity; tangible book value), 35-39 (6.1.3 shortcut to valuation and comparable firms; 6.2 P-BV or price to tangible book; 6.2.1 P-BV = 1 + (ROE - k)/(k - g), formula image read from text layer; 6.4 market vs transaction multiples and cautions: control premiums, M&A overpricing, IPO underpricing, reported variables, underlying economic assumptions), sha256:2402ab80aaa255b46db5da92a48324890c2f990776b4852c549515f4e4de5ba4 — https://www.casact.org/sites/default/files/2021-03/7_Goldfarb.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cost of Capital.md
---

**The Cost of Capital** is the return investors require for supplying capital to an insurer — the hurdle rate $k$ that a [[Line of Business|line]], [[Business Unit|business unit]] or policy must earn on the [[Risk Capital]] allocated to it for the business to add value. For an insurer it has two layers: the market's required return for the risk borne, and the **frictional costs** of holding capital inside an insurance company, which arise from [[Insurance Market Imperfections]].

> $$k_E = r_f + \beta_E\,\bigl(E[r_m] - r_f\bigr)$$

> $$\text{Capital charge}_i = k \times C_i$$

- $k_E$ is the cost of equity by the capital asset pricing model: $r_f$ the risk-free rate, $\beta_E$ the equity beta, $E[r_m] - r_f$ the market risk premium. With debt in the [[Capital Structure]], the firm-wide rate is the weighted average cost of capital, $k_{\text{WACC}} = \frac{E}{D+E}\,k_E + \frac{D}{D+E}\,k_D(1-t)$.
- **Allocating the cost.** $C_i$ is the capital allocated to unit $i$, so the allocation method (see [[Risk Capital]]) decides each unit's charge. The charge is due for every year the capital is held, which is why long-tailed lines carry far more of it than their first-year capital suggests.
- **Line-specific rates.** One could instead estimate a beta for each line and charge each line its own CAPM rate. In practice underwriting betas are hard to estimate, and the CAPM prices only systematic risk, whereas an insurer's frictional costs depend on *total* risk — including the diversifiable risk the CAPM treats as free.
- **Frictional costs.** Capital inside an insurer costs more than the same capital held by investors directly: investment income on it is taxed at the corporate level before it reaches shareholders ([[Insurance Income Tax|double taxation]]), surplus capital invites agency costs, and replacing capital after a large loss is expensive. The part pricing must recover is the required return **less** what the capital earns while it is held.
- **The discount rate in a valuation multiple.** The cost of equity is also the discount rate $k$ that ties the price-to-book value multiple to a firm's fundamentals: with constant ROE and book value growing at $g$, $\text{P/BV} = 1 + (\text{ROE} - k)/(k - g)$. Firms with similar ROE, growth and discount rates should therefore trade at similar multiples. A shortcut valuation applies the P-BV multiples of such comparable firms, or of comparable past acquisitions and IPOs (**transaction multiples**), to the firm's book value (or tangible book value), giving a range of values. Book value is the reported book value of the firm's equity, resting on the asset and liability values its balance sheet reports; tangible book value is that reported book value adjusted to remove the impact of intangible assets such as goodwill. Transaction prices avoid the day-to-day swings of market prices, but can carry a control premium or an acquirer's overpayment, IPOs tend to be underpriced, and a past deal reflects the interest rates and outlook of its own time.
- **Cost versus return.** The hurdle $k$ is compared with the unit's [[Return on Capital]] (RAROC), or subtracted from its income to give EVA — see [[Risk-Adjusted Performance]]. In Mildenhall and Major's notation the cost of capital $\iota$ is margin divided by capital, and it sets the premium in [[Risk-Adjusted Pricing]].

> [!example]- Cost of Equity and the Charge to Each Line {Example}
> The risk-free rate is $4\%$, the insurer's equity beta $0.9$ and the market risk premium $6\%$. Capital of $\$1{,}000$M is allocated: property $\$450$M, auto $\$350$M, workers compensation $\$200$M. Compute the cost of equity and each line's annual capital charge.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > k_E &= 0.04 + 0.9(0.06) \\
> > &= 9.4\%
> > \end{align*}
> > $$
> >
> > - Property: $0.094 \times 450 = \$42.3$M
> > - Auto: $0.094 \times 350 = \$32.9$M
> > - Workers compensation: $0.094 \times 200 = \$18.8$M
> >
> > The charges sum to $\$94.0$M, the cost of the whole $\$1{,}000$M. Each line's result must cover its charge; which line bears how much is entirely a product of the allocation.

> [!example]- The Tax Wedge and the Net Cost a Line Must Earn {Example}
> Investors require $10\%$ after tax. Capital held inside the insurer is invested in bonds yielding $5\%$ pre-tax, and the insurer pays tax at $21\%$. Commercial auto is allocated $\$200$M of capital. What after-tax and pre-tax underwriting profit must the line earn?
>
> > [!answer]-
> > After tax, the capital earns $5\% \times (1 - 0.21) = 3.95\%$ while held. Underwriting must supply the rest:
> >
> > $$
> > \begin{align*}
> > \text{After-tax UW profit} &= (0.10 - 0.0395) \times 200 \\
> > &= \$12.1\text{M} \\
> > \text{Pre-tax UW profit} &= \frac{12.1}{1 - 0.21} \\
> > &= \$15.3\text{M}
> > \end{align*}
> > $$
> >
> > An investor who pays no tax (a pension fund, say) would earn the full $5\%$ holding the same bonds directly; inside the insurer it earns $3.95\%$. The $1.05\%$ wedge — $\$2.1$M a year on this line — is a pure frictional cost of holding capital in an insurance company, and it is paid by the line's customers through the price.
