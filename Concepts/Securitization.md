---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b587848f871a849ad1a362c84a071db43f0d186b2f507dd873f87f2e936a6e1a
  sources:
    - "Coval, Jurek & Stafford, The Economics of Structured Finance, HBS Working Paper 09-060, printed pp.1-3 (amplification of errors; diversifiable for systematic risk), pp.5-6 (pass-through inherits the average rating, no credit enhancement; prioritized tranches; SPV), pp.14-15 (CDO2 sensitivity; senior tranche impaired only short of an economic catastrophe), pp.16-17 (GSEs Fannie Mae, Freddie Mac, Ginnie Mae chartered 'to ensure a continuous supply of credit to home buyers' to purchase mortgages originated by local banks meeting size and credit-quality requirements; repackaged into MBS with the implicit U.S. guarantee; non-conforming jumbo and subprime ineligible, held or sold directly; private-label MBS originated among others by Wall Street banks), pp.18-21 (credit ratings reflect only expected payoffs; yield spread over a Treasury of the same duration; catastrophe bond earns a spread for expected losses; senior tranches resemble a digital call and should earn more than single-name bonds of similar rating), sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf"
    - "Board of Governors of the Federal Reserve System, Report to the Congress on Risk Retention (October 2010), PDF pp.14-18 (bankruptcy-remote entity and SPV; pass-through vs senior-subordinate; 'the same underlying assets, which will generate the same cash flows'; adverse selection), sha256:da618c157b7cc5129c05bee978d0fb6b376adb221d006155226ff093af3b238b — https://www.federalreserve.gov/boarddocs/rptcongress/securitization/riskretention.pdf"
    - "U.S. GAO, Catastrophe Insurance Risks: The Role of Risk-Linked Securities (GAO-02-941, 2002), PDF pp.8, 10 (fn.10: U.S. capital markets about $31 trillion), 21 (CBOT catastrophe options from 1995, trading ceased 1999 for lower-than-expected demand; nonindemnity triggers limit moral hazard and expose the sponsor to basis risk; multiyear pricing; Rule 144A placements), 23 (SPRV holds proceeds in a trust in Treasuries; sponsor has minimal credit risk because the bond is fully collateralized; basis risk), 39 (App. II), sha256:14de86f282f00ef14b4382979e503f0a202138d57bc482017228da5d9a200d24 — https://www.gao.gov/assets/gao-02-941.pdf (read this session through WebFetch's saved copy; same sha256)"
    - "Blanchet, Lam, Tang & Yuan, Mitigating Extreme Risks Through Securitization (SOA research report, Mar 2017), PDF pp.6, 8 (indemnity triggers: moral hazard, disclosure, slow settlement; Lehman as total return swap counterparty in four of ten principal losses; §1.4 ILWs: dual triggers, standardized, low transaction costs, indemnity-triggered ILW treated as reinsurance by regulators), sha256:674f956d74f5f5bae9ad9f92126ebf0a8c47693af78dfbf2bd12454f5d9b3d66 — https://www.soa.org/globalassets/assets/files/research/projects/2017-03-mitigating-risks-through-securitization.pdf"
    - "15 U.S.C. § 78o-11(c)(1)(B)(i) (Dodd-Frank §941: not less than 5 percent of the credit risk), LII copy, sha256:0dc5dee11cfd1db3d2a71c99c5d8f082997761cc7856a0784daa945778b86fac — https://www.law.cornell.edu/uscode/text/15/78o-11"
    - "Patel, The Drivers of Catastrophe Bond Pricing, PartnerReviews (PartnerRe, Oct 2015), pp.3-5 (collateral, total return swap, Lehman), sha256:9a516152899ad4ec9709961e15f1417bfe74c8e0a259d5268e597c7635f6456a — https://www.partnerre.com/wp-content/uploads/2017/08/Catastrophe-Bond-Pricing.pdf"
    - "Cummins (2008), CAT Bonds and Other Risk-Linked Securities, RMIR 11(1) pp.23-47 — abstract as IDEAS/RePEc prints it (read via WebFetch this session: not expected to replace reinsurance but to complement it; spreading to automobile insurance, life insurance and annuities) — https://ideas.repec.org/a/bla/rmgtin/v11y2008i1p23-47.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Securitization.md
---

**Securitization** is the transfer of a pool of assets — or of a defined block of insurance risk — to a bankruptcy-remote **special purpose vehicle** (SPV) that funds itself by issuing securities to capital-market investors, who are paid only from what the pool produces. In insurance it is how [[Catastrophe Risk|catastrophe risk]] moves from insurers' balance sheets to investors, through [[CAT Bonds|cat bonds]] and other [[Insurance-Linked Securities|insurance-linked securities]].

> $$\sum_{j} \text{CF}_j = \text{CF}_{\text{pool}} - \text{Fees}$$

- $\text{CF}_j$ is the cash flow to the $j$-th class of security. Whether the classes are pro-rata (a *pass-through*) or prioritised tranches ([[Structured Finance]]), investors collectively receive exactly what the pool produces: securitization repackages risk and return, it does not create them.
- **The originator gains** funding and liquidity, capital relief (the assets or risk leave its balance sheet) and a transfer of risk to parties who can hold it more cheaply. **Investors gain** exposures cut to the risk level they want and, for insurance risk, returns largely uncorrelated with the rest of their portfolio.
- **The U.S. mortgage agencies.** To ensure a continuous supply of credit to home buyers, government-sponsored enterprises such as Fannie Mae, Freddie Mac and Ginnie Mae were chartered to buy mortgages originated by local banks, provided the loans meet size and credit-quality requirements. They repackage these *conforming* mortgages into mortgage-backed securities and resell them in the capital markets with the implicit guarantee of the U.S. government. Non-conforming loans — jumbo and subprime mortgages — are ineligible: their originators hold them or sell them directly, and subprime loans reached the capital markets through *private-label* mortgage-backed securities issued by, among others, Wall Street banks.
- **Its weak points are incentives and correlation.** An originator that sells everything it makes has little reason to underwrite carefully ([[Moral Hazard|moral hazard]]) and every reason to sell its worst assets ([[Adverse Selection|adverse selection]]); after [[Dodd-Frank]], U.S. securitizers must generally retain at least $5\%$ of the credit risk. Correlated defaults defeat the diversification the ratings assumed, and mortgage pools add [[Prepayment Risk|prepayment risk]].
- **Why securitize catastrophe risk:** a mega-catastrophe is large relative to reinsurers' capital but small relative to capital markets — a \$100 billion loss is well under $1\%$ of the value of U.S. stocks and bonds. Catastrophe losses are nearly uncorrelated with financial markets, so investors earn a diversifier. The securities are **fully collateralised**, removing the [[Reinsurance Credit Risk|reinsurer credit risk]] that is worst exactly when a catastrophe strikes. And multi-year terms lock in price through the reinsurance cycle.
- **What it costs:** higher fixed set-up costs (legal, modelling, rating, the SPV), disclosure of the sponsor's exposure, and — unless the trigger is the sponsor's own losses — **basis risk**, which can also cost the contract its treatment as reinsurance. Cummins's view is that securitization complements [[Reinsurance|reinsurance]] rather than replacing it.

> [!example]- Reinsurer Promise vs. Collateral in the 1-in-100 Year {Example}
> An insurer needs $\$100$ million of protection on a layer that is fully used with probability $1\%$ a year and untouched otherwise. Option A is a traditional reinsurer whose default probability is $0.5\%$ in an ordinary year but $8\%$ *given* the industry catastrophe that exhausts the layer. Option B is a fully collateralised cat bond. Compare expected recoveries.
>
> > [!answer]-
> > The expected loss to the layer is $0.01 \times \$100\text{M} = \$1.00\text{M}$.
> >
> > $$
> > \begin{align*}
> > E[\text{Recovery}_A] &= 0.01 \times \$100\text{M} \times (1 - 0.08) \\
> > &= \$0.92\text{M} \\[4pt]
> > \text{Credit shortfall}_A &= \$1.00\text{M} - \$0.92\text{M} \\
> > &= \$0.08\text{M}
> > \end{align*}
> > $$
> >
> > Using the ordinary-year default rate, the shortfall would have been estimated at $0.01 \times \$100\text{M} \times 0.005 = \$0.005\text{M}$ — the correlation between the catastrophe and the reinsurer's failure makes it **16 times** larger.
> >
> > Option B's recovery is the full $\$1.00\text{M}$: the principal sits in a collateral trust, so there is no counterparty to fail — provided the collateral itself is safe, which 2008 tested when Lehman Brothers' failure as swap counterparty impaired several cat bonds. That is part of what the insurer buys with the cat bond's higher cost.

> [!example]- Risk Retention: Vertical Slice vs. First-Loss Piece {Example}
> An originator securitizes a $\$500$ million pool of auto loans and retains $5\%$ ($\$25$ million). Expected pool losses are $2\%$ ($\$10$ million). Lax underwriting would raise them to $4\%$ ($\$20$ million). How much of the extra $\$10$ million does the originator bear if its retention is (a) a $5\%$ vertical slice of every tranche, (b) a $\$25$ million first-loss piece?
>
> > [!answer]-
> > (a) A vertical slice bears $5\%$ of every loss:
> >
> > $$0.05 \times \$10\text{M} = \$0.5\text{M}$$
> >
> > (b) A first-loss piece absorbs every dollar of pool loss up to $\$25$ million. While pool losses stay below that, the originator bears the **whole** $\$10$ million increase.
> >
> > The horizontal retention makes the originator pay for its own underwriting; the vertical slice mostly signals.
