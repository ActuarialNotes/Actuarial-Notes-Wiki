---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:487ae31f9d42beee126437338307c0d040341f7e15f3c59ce2b651460280ac6a
  sources:
    - "International Actuarial Association, IAA Risk Book: Reinsurance (May 2023), §11.2 Catastrophe Bonds and §11.3 Catastrophe Swaps, printed pp.21-22 (PDF pp.26-27: exchange different exposures directly between two parties at a modelled 'exchange rate' acceptable to both, usually through accepted natural catastrophe models; two undertakings with 'peak' exposures in different parts of the world swap, e.g. x units of European windstorm for y units of Japanese earthquake within a given period), sha256:925844f73a5c5e99698a5e26b44452702123c186e60f9fcfb27a645ca8036780 — https://actuaries.org/app/uploads/2025/08/IAARiskBook_Reinsurance_2023-05.pdf"
    - "CAS Exam 9 Spring 2013 — exam, model solutions and examiner's report, Q13: model solutions PDF p.46 (CAT bond fully collateralised, no credit risk; swap only an agreement to pay, not prefunded, counterparty default risk; pairing uncorrelated risks on opposite sides of the world; low counterparty risk by a financially strong participant; basis risk depends on the trigger for both; a CAT bond gives the issuing company no diversification), examiner's report PDF p.95 (diversification of a CAT bond accrues to its investors, not the issuer; both instruments can limit basis risk by trigger selection), sha256:8cad072030f7457e0220739fd8af1f74ce23873efd78efdd1d99021816131e75 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_13-9.pdf"
    - "U.S. GAO, Catastrophe Insurance Risks: The Role of Risk-Linked Securities (GAO-02-941, 2002), PDF pp.8, 10 (fn.10: U.S. capital markets about $31 trillion), 21 (CBOT catastrophe options from 1995, trading ceased 1999 for lower-than-expected demand; nonindemnity triggers limit moral hazard and expose the sponsor to basis risk; multiyear pricing; Rule 144A placements), 23 (SPRV holds proceeds in a trust in Treasuries; sponsor has minimal credit risk because the bond is fully collateralized; basis risk), 39 (App. II), sha256:14de86f282f00ef14b4382979e503f0a202138d57bc482017228da5d9a200d24 — https://www.gao.gov/assets/gao-02-941.pdf (read this session through WebFetch's saved copy; same sha256)"
    - "Blanchet, Lam, Tang & Yuan, Mitigating Extreme Risks Through Securitization (SOA research report, Mar 2017), PDF pp.6, 8 (indemnity triggers: moral hazard, disclosure, slow settlement; Lehman as total return swap counterparty in four of ten principal losses; §1.4 ILWs: dual triggers, standardized, low transaction costs, indemnity-triggered ILW treated as reinsurance by regulators), sha256:674f956d74f5f5bae9ad9f92126ebf0a8c47693af78dfbf2bd12454f5d9b3d66 — https://www.soa.org/globalassets/assets/files/research/projects/2017-03-mitigating-risks-through-securitization.pdf"
    - "IRMI glossary, 'catastrophe equity put' (option to raise additional equity capital if losses exceed a predetermined level), sha256:d086aee105beabe45b755f8ab70b368c8195593973328df13ab168418e345058 (this session's fetch) — https://www.irmi.com/term/insurance-definitions/catastrophe-equity-put"
    - "NAIC, Insurance Topics: Insurance-Linked Securities (read this session via WebFetch, no file hash): sidecars are special-purpose vehicles through which reinsurers cede premiums on a book of business, investors place funds in the vehicle, 'tactical instruments of limited duration during a hard market', 'became very popular in the aftermath of Hurricane Katrina' — https://content.naic.org/insurance-topics/insurance-linked-securities"
    - "Cummins (2008), CAT Bonds and Other Risk-Linked Securities, RMIR 11(1) pp.23-47 — abstract as IDEAS/RePEc prints it (read via WebFetch this session: not expected to replace reinsurance but to complement it; spreading to automobile insurance, life insurance and annuities) — https://ideas.repec.org/a/bla/rmgtin/v11y2008i1p23-47.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance-Linked Securities.md
---

**Insurance-Linked Securities** (ILS) are financial instruments whose value depends on insurance losses, usually catastrophe losses, through which capital-market investors take insurance risk directly rather than through the shares of an insurer or reinsurer. The family covers [[CAT Bonds|cat bonds]], sidecars, industry loss warranties, collateralised reinsurance and related derivatives.

As a fraction of the capital posted, an investor's return on an ILS is

> $$R_{\text{investor}} = r_{\text{collateral}} + s - \ell$$

- $r_{\text{collateral}}$ is the return earned on the collateral.
- $s$ is the premium or spread received.
- $\ell$ is the loss suffered, with $0 \le \ell \le 1$ for a fully collateralised instrument.

The expected excess return $s - E[\ell]$ is the price of the risk. Because [[Catastrophe Risk|catastrophe losses]] are nearly independent of financial markets, investors value that return as a diversifier.

## Catastrophe bonds

Cat bonds are notes issued by a special purpose reinsurer, tradable among institutional investors and typically multi-year. Their triggers are indemnity, industry-index, modelled-loss or parametric. A cat bond is protection on the issuer's own risk, so the diversification benefit goes to the investors, not to the issuer.

## Sidecars

A sidecar is a special purpose vehicle through which a (re)insurer cedes premium and risk on a defined book, for example by a [[Quota Share|quota share]], to outside investors whose funds are held as collateral. Sidecars are tactical instruments of limited duration, used in a hard market, and became very popular after Hurricane Katrina.

> [!example]- What is the investors' return on this sidecar if the book's loss ratio is $30\%$, $250\%$ or $400\%$? {Example}
> A reinsurer cedes a $40\%$ quota share of its $\$250$ million property-catastrophe book to a sidecar for one year, receiving a $25\%$ ceding commission. Investors fund the sidecar with $\$300$ million held as collateral. Its liability is limited to that collateral plus the premium it receives. Ignore the collateral yield.
>
> > [!answer]-
> > - The sidecar's premium is $0.40 \times \$250\text{M} \times (1 - 0.25) = \$75\text{M}$, and its loss is $0.40 \times \$250\text{M} = \$100\text{M}$ times the loss ratio.
> > - At $30\%$ the loss is $\$30$M, the profit $\$45$M and the return $45/300 = 15.0\%$.
> > - At $250\%$ the loss is $\$250$M, the profit $-\$175$M and the return $-58.3\%$.
> > - At $400\%$ the loss of $\$400$M exceeds the sidecar's $\$375$M of resources, so the investors lose everything ($-100\%$) and the sponsor bears the $\$25$M excess.

## Industry loss warranties

An industry loss warranty (ILW) pays a fixed limit if an industry loss index exceeds a trigger. Written as reinsurance, it adds a second trigger on the buyer's own loss, which supplies the indemnity, and regulators treat buying one with that trigger as a reinsurance purchase. An ILW is standardised protection against a *market-wide* event, with relatively low transaction costs.

> [!example]- What does this ILW pay in each of three hurricane outcomes? {Example}
> An insurer buys a $\$50$ million ILW in reinsurance form: it pays the full limit if U.S. hurricane industry losses reach $\$30$ billion **and** the buyer's own loss exceeds $\$1$ million. The outcomes are (a) industry losses of $\$34$ billion and a buyer's loss of $\$220$ million, (b) $\$26$ billion and $\$400$ million, and (c) $\$34$ billion and nothing.
>
> > [!answer]-
> > - In (a) both triggers are met, so it pays **$\$50$ million**.
> > - In (b) the industry trigger is missed, so it pays **nothing**, despite a heavy own loss. That is basis risk.
> > - In (c) the own-loss trigger is missed, so it pays **nothing**.

## Catastrophe risk swaps

In a catastrophe risk swap, two parties with "peak" exposures in different parts of the world exchange them directly instead of turning a catastrophe exposure into a premium. For example, European windstorm exposure is exchanged for Japanese earthquake exposure at an "exchange rate" both accept, usually from catastrophe models. Pairing uncorrelated exposures diversifies both parties' books, which a cat bond does not do for its issuer.

A swap is not prefunded. It is only an agreement to pay if the covered event occurs, so each party carries counterparty default risk, reduced by choosing a financially strong counterparty. Its basis risk depends, as a cat bond's does, on the trigger chosen.

## Other risk-linked instruments

Contingent capital includes the catastrophe equity put, an option to raise additional equity capital if losses exceed a predetermined level. Exchange-traded catastrophe options, offered on the Chicago Board of Trade from 1995, were among the first attempts, and trading ceased in 1999 for lack of demand.

## Insurance-linked securities and reinsurance

Against traditional [[Reinsurance|reinsurance]], collateral replaces a reinsurer's promise, so there is no [[Reinsurance Credit Risk|credit risk]] on the limit. Capacity comes from the capital markets. Index or parametric triggers trade moral hazard for **basis risk**. Cummins concludes that ILS complement reinsurance rather than replace it ([[Securitization]]).
