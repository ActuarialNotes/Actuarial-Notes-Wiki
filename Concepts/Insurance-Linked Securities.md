---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:cd6bc4c246269bbace7c2e211a1cfa1bff2dc252ba64fcdf34522b48f553895e
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

**Insurance-Linked Securities** (ILS) are financial instruments whose value depends on insurance losses — usually catastrophe losses — through which capital-market investors take insurance risk directly rather than through the shares of an insurer or reinsurer. The family covers [[CAT Bonds|cat bonds]], sidecars, industry loss warranties, collateralised reinsurance and related derivatives.

> $$R_{\text{investor}} = r_{\text{collateral}} + s - \ell$$

- $s$ is the premium or spread received and $\ell$ the loss suffered, both as fractions of the capital posted; for a fully collateralised instrument $0 \leq \ell \leq 1$. The expected excess return $s - E[\ell]$ is the price of the risk. Because [[Catastrophe Risk|catastrophe losses]] are nearly independent of financial markets, investors value that return as a diversifier.
- **The main forms:**
  - **Cat bonds** — notes issued by a special purpose reinsurer, tradable among institutional investors, typically multi-year, with indemnity, industry-index, modelled-loss or parametric triggers.
  - **Sidecars** — special purpose vehicles through which a (re)insurer cedes premium and risk on a defined book, for example by a [[Quota Share|quota share]], to outside investors whose funds are held as collateral. They are tactical instruments of limited duration, used in a hard market, and became very popular after Hurricane Katrina.
  - **Industry loss warranties** (ILWs) — pay a fixed limit if an industry loss index exceeds a trigger. Written as reinsurance they add a second trigger on the buyer's own loss, which supplies the indemnity.
  - **Catastrophe risk swaps** — instead of turning a catastrophe exposure into a premium, two parties with "peak" exposures in different parts of the world exchange them directly, for example units of European windstorm exposure for units of Japanese earthquake exposure over a set period, at an "exchange rate" both accept, usually from catastrophe models. Pairing uncorrelated exposures diversifies both parties' books, which a cat bond — protection on the issuer's own risk — does not do for its issuer. A swap is not prefunded: it is only an agreement to pay if the covered event occurs, so each party carries counterparty default risk, reduced by choosing a financially strong counterparty; its basis risk depends, as a cat bond's does, on the trigger chosen.
  - **Other risk-linked instruments** — contingent capital such as a catastrophe equity put, an option to raise additional equity capital if losses exceed a predetermined level; the instruments have also spread to life insurance and annuities. Exchange-traded catastrophe options, offered on the Chicago Board of Trade from 1995, were among the first attempts, and trading ceased in 1999 for lack of demand.
- **Against traditional [[Reinsurance|reinsurance]]:** collateral replaces a reinsurer's promise, so there is no [[Reinsurance Credit Risk|credit risk]] on the limit; capacity comes from capital markets; and index or parametric triggers trade moral hazard for **basis risk**. Cummins concludes that ILS complement reinsurance rather than replace it. See [[Securitization]] for the economic case.

> [!example]- A Sidecar's Return in Three Years {Example}
> A reinsurer cedes a $40\%$ quota share of its $\$250$ million property-catastrophe book to a sidecar for one year, receiving a $25\%$ ceding commission. Investors fund the sidecar with $\$300$ million held as collateral; its liability is limited to that collateral plus the premium it receives. Ignoring collateral yield, find the investors' return if the book's loss ratio is (a) $30\%$, (b) $250\%$, (c) $400\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Sidecar premium} &= 0.40 \times \$250\text{M} \times (1 - 0.25) \\
> > &= \$75\text{M} \\[4pt]
> > \text{Ceded loss} &= 0.40 \times \$250\text{M} \times \text{LR} \\
> > &= \$100\text{M} \times \text{LR}
> > \end{align*}
> > $$
> >
> > - (a) Loss $\$30$M; profit $\$75\text{M} - \$30\text{M} = \$45\text{M}$; return $45/300 = 15.0\%$.
> > - (b) Loss $\$250$M; profit $\$75\text{M} - \$250\text{M} = -\$175\text{M}$; return $-58.3\%$.
> > - (c) Loss $\$400$M exceeds the sidecar's $\$375$M of resources. Investors lose everything ($-100\%$) and the sponsor bears the $\$25$M excess.
> >
> > The sponsor gains capacity and commission income without raising equity; the investors take the sponsor's **underwriting**, not just the hazard, because a quota share passes through its risk selection and pricing. And the cover is limited-recourse: beyond the collateral, the tail comes back to the sponsor.

> [!example]- Industry Loss Warranty: Two Triggers {Example}
> An insurer buys a $\$50$ million ILW in reinsurance form: it pays the full limit if U.S. hurricane industry losses reach $\$30$ billion **and** the buyer's own loss exceeds $\$1$ million. What does it pay if (a) industry losses are $\$34$ billion and the buyer's loss $\$220$ million; (b) industry $\$26$ billion, buyer $\$400$ million; (c) industry $\$34$ billion, buyer nothing?
>
> > [!answer]-
> > - (a) Both triggers met: **$\$50$ million**.
> > - (b) Industry trigger missed: **nothing**, despite a heavy own loss — basis risk.
> > - (c) Own-loss trigger missed: **nothing**.
> >
> > The ILW is standardised protection against a *market-wide* event, with relatively low transaction costs. The own-loss trigger is what makes it indemnity, and regulators treat buying one with that trigger as a reinsurance purchase.
