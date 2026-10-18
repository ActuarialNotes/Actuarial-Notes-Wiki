---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b69c095c0cd9d382a508a4e63acd2b3b5b46a21f134dad3459894ed6b415bc93
  sources:
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.1-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-6 (notation), 19-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), pp.4-5, 7 (Domains B and C; text references; study-note and errata hyperlinks), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR vol. 3 no. 1, pp.7-27, 2000): abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry"
    - "CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.1-3 (r_E = r_A(1+k1+k2) + r1 s1 + r2 s2; corrected r_i = -(k_i/s_i) r_F + beta_i (r_M - r_F)), sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital Structure.md
---

**Capital Structure** is the mix of claims that finance a firm's assets and the order in which they absorb losses. For an [[Insurer|insurer]] the largest claimholders are its own [[Policyholder|policyholders]] — loss reserves and unearned premium are debt-like obligations to customers — with the rest funded by equity, debt such as surplus notes and holding-company bonds, and capital supplied off the balance sheet by [[Reinsurance]] and [[CAT Bonds]].

> $$A = L + D + E$$

- $A$ is assets, $L$ policyholder liabilities (loss and LAE reserves, unearned premium), $D$ debt and hybrid capital, and $E$ shareholders' equity. In U.S. statutory accounting, surplus notes are reported within [[Capital and Surplus|surplus]].
- **Priority of claims.** Losses beyond what premium and reserves fund are absorbed by equity first, then by subordinated debt, and only then do policyholders go unpaid. Surplus notes are subordinated to policyholder claims, and holding-company debt is structurally subordinated because it sits outside the regulated insurer.
- **Leverage magnifies return and risk.** Net income is investment income on *all* assets plus underwriting profit, so, ignoring taxes and interest on debt, $\text{ROE} = i \cdot A/E + u \cdot P/E$, with $i$ the investment yield, $u$ the underwriting margin and $P$ premium. Policyholder-supplied funds are leverage that costs nothing while $u \geq 0$ — see [[Insurance Leverage]].
- **Why capital structure is not irrelevant here.** Modigliani–Miller says financing does not change firm value in a perfect market. For an insurer it does: policyholders are customers who cannot diversify their insurer's default risk and pay less, or leave, as that risk rises; and [[Insurance Market Imperfections|taxes, distress costs, agency costs and regulation]] all bear on the choice. The target structure trades the [[Cost of Capital]] against the cost of default risk.
- **The default option.** Limited liability gives shareholders a call on the assets, and policyholders hold the promised losses less an insolvency put: $\text{PV}(L) - \text{Put}(A, L)$. That put — the expected policyholder deficit in present-value form — is what [[Risk Capital]] is held to shrink, and what a [[Financial Risk]] shock inflates.

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
