---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:aefea820fa91b0351ecf5c368106bffc43b05461e5dd981214dcc7f34a9be3fb
  sources:
    - "CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.1-3, sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf"
    - "Froot, Risk Management, Capital Budgeting and Capital Structure Policy for Insurers and Reinsurers (NBER WP 10184, 2003), pp.2-10, 16, sha256:0de3a439eb286ea2a5ed225fcfa4cbb2ed62d964dc2485dbb79239dabfb6383e — https://www.nber.org/system/files/working_papers/w10184/w10184.pdf"
    - "Myers & Read, Capital Allocation for Insurance Companies (Brattle working paper, Aug 2001), pp.2-9, 22, 44-45, sha256:681450625dce92c765b9fb1762de4d299d060bb852906e79b3233bb6e4aa7a9b — https://www.brattle.com/wp-content/uploads/2017/10/Capital-Allocation-for-Insurance-Companies.pdf"
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Damodaran, The Cost of Capital: The Swiss Army Knife of Finance (April 2016), pp.2, 5, 17, sha256:5213c261bc05b5e8920f6a2feba1687c1f424fa1155b20789b6848a3e4223f90 — https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/costofcapital.pdf"
    - "NAIC, Surplus Notes (Insurance Topics page), read 2026-10-18 via a web reader; the publisher refuses scripted fetches (403), so no copy is cached or hashed — https://content.naic.org/insurance-topics/surplus-notes"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR 3(1), 2000), abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital Structure.md
---

**Capital Structure** is the mix of claims that finance a firm's assets and the order in which they absorb losses. For an [[Insurer|insurer]] the largest claimholders are its own [[Policyholder|policyholders]], because loss reserves and unearned premium are debt-like obligations to customers. The rest is funded by equity, by debt such as surplus notes, and by capital supplied off the balance sheet through [[Reinsurance|reinsurance]] and [[CAT Bonds|CAT bonds]].

An insurer's balance sheet is

> $$A = L + D + E$$

- $A$ is assets.
- $L$ is policyholder liabilities, the loss and LAE reserves and unearned premium.
- $D$ is debt and hybrid capital.
- $E$ is shareholders' equity.

In U.S. statutory accounting, surplus notes are classified as [[Capital and Surplus|surplus]] (equity), although GAAP reports them as debt.

## Priority of claims

Losses beyond what premium and reserves fund are absorbed by equity first, then by subordinated debt, and only then do policyholders go unpaid. Surplus notes are unsecured debt subordinated to all claims by policyholders and other creditors. Equity is first loss and the notes second loss, which is why subordinated notes count as capital from the policyholder's point of view even though they are debt to the investor.

> [!example]- Who is paid at each of these three levels of policyholder losses? {Example}
> An insurer ends the year with $\$1{,}300$M of assets. Its claims are policyholder losses, $\$100$M of surplus notes, and equity, which is the residual. Policyholder losses turn out to be (a) $\$1{,}000$M, (b) $\$1{,}250$M or (c) $\$1{,}400$M.
>
> > [!answer]-
> > - Claims are paid in order of priority: policyholders, then noteholders, then equity.
> > - At (a), policyholders get $\$1{,}000$M and noteholders $\$100$M, and equity keeps $\$200$M.
> > - At (b), policyholders get $\$1{,}250$M. The $\$50$M left pays noteholders half their $\$100$M, and equity is wiped out.
> > - At (c), assets fall $\$100$M short of policyholder claims. Notes and equity receive nothing.
> > - Policyholders recover $1{,}300/1{,}400 = 0.929$, about 93 cents on the dollar.

## Leverage and return on equity

Net income is investment income on *all* assets plus underwriting profit. Ignoring taxes and interest on debt, the return on equity is

> $$\text{ROE} = i \cdot \frac{A}{E} + u \cdot \frac{P}{E}$$

- $i$ is the investment yield.
- $u$ is the underwriting margin.
- $P$ is premium.

Policyholder-supplied funds are leverage that costs nothing while $u \geq 0$ ([[Insurance Leverage|insurance leverage]]). Leverage magnifies both the return and the risk.

> [!example]- How do these two insurers' ROEs compare in a normal year and in a bad year? {Example}
> Two insurers write identical books: premium of $\$1{,}000$M, policyholder liabilities of $\$1{,}500$M and an investment yield of 4%. Insurer H holds equity of $\$500$M and insurer K holds $\$1{,}000$M. The underwriting margin is $+2\%$ in a normal year and $-15\%$ in a bad year (a 115% combined ratio). Ignore taxes.
>
> > [!answer]-
> > - Assets are liabilities plus equity: $\$2{,}000$M for H and $\$2{,}500$M for K.
> > - Investment income is $0.04 \times 2{,}000 = \$80$M for H and $0.04 \times 2{,}500 = \$100$M for K.
> > - Underwriting profit is $+\$20$M in the normal year and $-\$150$M in the bad year for both.
> > - In the normal year, H's ROE is $(80 + 20)/500 = 20\%$ and K's is $(100 + 20)/1{,}000 = 12\%$.
> > - In the bad year, H's ROE is $(80 - 150)/500 = -14\%$ and K's is $(100 - 150)/1{,}000 = -5\%$.
> > - K's extra $\$500$M earns only the 4% investment yield, so excess capital lowers ROE, while leverage deepens H's loss in a bad year.

## Why capital structure matters for an insurer

Modigliani–Miller says financing does not change firm value in a perfect market. For an insurer it does. Policyholders are customers who cannot diversify their insurer's default risk, and they pay less, or leave, as that risk rises. [[Insurance Market Imperfections|Taxes, distress costs, agency costs and regulation]] also bear on the choice. The target structure trades the [[Cost of Capital|cost of capital]] against the cost of default risk.

## The default option

Limited liability gives shareholders a call on the assets. The policyholders' claim is worth the promised losses less an insolvency put, which is

> $$\text{PV}(L) - \text{Put}(A, L)$$

- $\text{PV}(L)$ is the present value of the promised losses.
- $\text{Put}(A, L)$ is the value of a put on the assets $A$ with strike $L$.

The put is closely related to the expected policyholder deficit, which leaves out discounting and a risk margin. It is what [[Risk Capital|risk capital]] is held to shrink, and what a [[Financial Risk|financial risk]] shock inflates.

> [!trap] Earning investment income on equity alone
> An insurer earns investment income on all its assets, including the funds policyholders supply, not only on its equity. For insurer H the investment income is $0.04 \times 2{,}000 = \$80$M, not $0.04 \times 500 = \$20$M. Leaving them out gives H a normal-year ROE of $(20 + 20)/500 = 8\%$ in place of 20%.
