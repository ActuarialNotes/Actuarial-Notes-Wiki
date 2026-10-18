---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f8adc73f007fffff712f326de4d498a5c270876edd5588b287af79ab5e35ec57
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

**Capital Structure** is the mix of claims that finance a firm's assets and the order in which they absorb losses. For an [[Insurer|insurer]] the largest claimholders are its own [[Policyholder|policyholders]] — loss reserves and unearned premium are debt-like obligations to customers — with the rest funded by equity, debt such as surplus notes, and capital supplied off the balance sheet by [[Reinsurance]] and [[CAT Bonds]].

> $$A = L + D + E$$

- $A$ is assets, $L$ policyholder liabilities (loss and LAE reserves, unearned premium), $D$ debt and hybrid capital, and $E$ shareholders' equity. In U.S. statutory accounting, surplus notes are classified as [[Capital and Surplus|surplus]] (equity), although GAAP reports them as debt.
- **Priority of claims.** Losses beyond what premium and reserves fund are absorbed by equity first, then by subordinated debt, and only then do policyholders go unpaid. Surplus notes are unsecured debt subordinated to all claims by policyholders and other creditors.
- **Leverage magnifies return and risk.** Net income is investment income on *all* assets plus underwriting profit, so, ignoring taxes and interest on debt, $\text{ROE} = i \cdot A/E + u \cdot P/E$, with $i$ the investment yield, $u$ the underwriting margin and $P$ premium. Policyholder-supplied funds are leverage that costs nothing while $u \geq 0$ — see [[Insurance Leverage]].
- **Why capital structure is not irrelevant here.** Modigliani–Miller says financing does not change firm value in a perfect market. For an insurer it does: policyholders are customers who cannot diversify their insurer's default risk and pay less, or leave, as that risk rises; and [[Insurance Market Imperfections|taxes, distress costs, agency costs and regulation]] all bear on the choice. The target structure trades the [[Cost of Capital]] against the cost of default risk.
- **The default option.** Limited liability gives shareholders a call on the assets, and policyholders hold the promised losses less an insolvency put: $\text{PV}(L) - \text{Put}(A, L)$. That put — closely related to the expected policyholder deficit, which leaves out discounting and a risk margin — is what [[Risk Capital]] is held to shrink, and what a [[Financial Risk]] shock inflates.

> [!example]- A Loss Waterfall Through the Capital Structure {Example}
> An insurer ends the year with $\$1{,}300$M of assets. Its claims are policyholder losses (uncertain), $\$100$M of surplus notes, and equity (the residual). Show who is paid if policyholder losses turn out to be (a) $\$1{,}000$M, (b) $\$1{,}250$M, (c) $\$1{,}400$M.
>
> > [!answer]-
> > Pay in order of priority — policyholders, then noteholders, then equity:
> >
> > - **(a)** Policyholders $\$1{,}000$M; noteholders $\$100$M; equity keeps $\$200$M.
> > - **(b)** Policyholders $\$1{,}250$M; $\$50$M is left, so noteholders recover half their $\$100$M; equity is wiped out.
> > - **(c)** Assets fall $\$100$M short of claims; notes and equity receive nothing, and policyholders recover
> >
> > $$\frac{1{,}300}{1{,}400} = 0.929$$
> >
> > i.e. about $93$ cents on the dollar.
> >
> > Equity is first loss, the notes second loss; policyholders bear loss only after both are exhausted. That is why subordinated notes count as capital from the policyholder's point of view even though they are debt to the investor.

> [!example]- Leverage, Return and Downside {Example}
> Two insurers write identical books: premium $\$1{,}000$M, policyholder liabilities $\$1{,}500$M, investment yield $4\%$. Insurer H holds equity of $\$500$M; insurer K holds $\$1{,}000$M. Ignore taxes.
>
> Compare ROE in a normal year (underwriting margin $+2\%$) and a bad year (combined ratio $115\%$, margin $-15\%$).
>
> > [!answer]-
> > Assets are liabilities plus equity: $\$2{,}000$M for H, $\$2{,}500$M for K.
> >
> > $$
> > \begin{align*}
> > \text{ROE}_H^{\text{normal}} &= \frac{0.04(2{,}000) + 0.02(1{,}000)}{500} \\
> > &= 20\% \\
> > \text{ROE}_K^{\text{normal}} &= \frac{0.04(2{,}500) + 0.02(1{,}000)}{1{,}000} \\
> > &= 12\% \\
> > \text{ROE}_H^{\text{bad}} &= \frac{80 - 150}{500} \\
> > &= -14\% \\
> > \text{ROE}_K^{\text{bad}} &= \frac{100 - 150}{1{,}000} \\
> > &= -5\%
> > \end{align*}
> > $$
> >
> > The more leveraged insurer earns more in a normal year and loses far more of its capital in a bad one. K's extra $\$500$M earns only the $4\%$ investment yield, which is why excess capital drags on ROE — and why the right amount of capital is a trade-off, not a maximum.
