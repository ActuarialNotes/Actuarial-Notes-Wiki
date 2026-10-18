---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:223d1af61693abb44aadb459bc9e04b14990ac8a79aa267fb66533fded418358
  sources:
    - "Erel, Myers & Read, A Theory of Risk Capital (JFE-2013-0394 revised, Oct 2013), abstract p.1; p.7 (Merton and Perold's definition of risk capital), sha256:1fb728de691bf9eed3c3443629227c8c0b6040fb83145ef2690f4a0c5ed815cf — https://web.actuaries.ie/sites/default/files/erm-resources/a_theory_of_risk_capital.pdf"
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Myers & Read, Capital Allocation for Insurance Companies (Brattle working paper, Aug 2001), pp.2-9, 22, 44-45, sha256:681450625dce92c765b9fb1762de4d299d060bb852906e79b3233bb6e4aa7a9b — https://www.brattle.com/wp-content/uploads/2017/10/Capital-Allocation-for-Insurance-Companies.pdf"
    - "CAS Exam 9 Practice Items and Solutions (2026; retired Spring 2026 items), Items 3 (M&M 11.3: cost of capital i = [g(s)-s]/[1-g(s)], g(s) = (s+i)/(1+i), LR = s/g(s)) and 4 (M&M pp.317-318: Shapley allocation), sha256:9cf61c6c2597a9a1a6d2d548d83f78a1a56e73778226176ab30308aa85f615fb — https://www.casact.org/sites/default/files/2026-08/Exam9_PracticeItems_2026.xlsx"
    - "D'Arcy, Capital Allocation in the Property-Liability Insurance Industry (Variance 5:2), pp.141-146 (PDF pp.1-6), sha256:e7a4dc616cf02bf9721fd906a35cdd3c2a017ae92921b058a6a932555c955612 — https://www.casact.org/sites/default/files/2021-07/Capital-Allocation-Darcy.pdf"
    - "Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf"
    - "CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR 3(1), 2000), abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Capital.md
---

**Risk Capital** is the capital an insurer holds to absorb unexpected losses — outcomes worse than those funded by premium and reserves — sized by a [[Risk Measure]] at a chosen tolerance. Merton and Perold define it as the present-value cost of complete insurance against a fall in the value of the firm's net assets below a risk-free investment of those net assets; allocating its [[Cost of Capital|cost]] to [[Business Unit|business units]] and [[Line of Business|lines]] is the core calculation of [[Financial Risk Management]].

> $$C = \rho(X) - E[X]$$

> $$\sum_i C_i = C \leq \sum_i C_i^{\text{standalone}}$$

- $X$ is the insurer's aggregate loss, $\rho$ the risk measure — VaR or TVaR at a chosen level, or the assets needed to hold the expected policyholder deficit (EPD) to a target — and $C_i$ the capital allocated to unit $i$. The gap below the sum of standalone amounts is the **diversification benefit**; how to share it is the allocation problem.
- **Allocation methods:**
  - **Proportional** to standalone capital, or to a regulatory [[Risk-Based Capital]] formula — simple, but blind to how each unit diversifies the rest.
  - **CAPM** — a cost of capital per line from underwriting betas; prices systematic risk only.
  - **VaR or EPD by line** — size each line to the firm's ruin probability or EPD ratio as if it stood alone. The EPD version is better, since it reflects the size of shortfalls, but both ignore diversification.
  - **Merton–Perold marginal** — $C_i = C(\text{all}) - C(\text{all but } i)$. Correct for adding or dropping a whole line, but the pieces do not in general sum to $C$ — they can fall short of it, leaving capital unallocated, or exceed it.
  - **Shapley** — each unit's marginal capital averaged over every order in which units could be added; adds up exactly.
  - **Myers–Read and Euler (gradient)** — each unit's contribution to the default value or risk measure for a *small* change in its size. For a measure that scales with the portfolio these add up exactly (Euler's theorem); for a standard-deviation measure they reduce to allocating by covariance with the total.
  - **Co-measures and margin allocation** — co-TVaR allocates by each unit's average loss in the tail; Mildenhall and Major allocate margin directly (the *natural allocation*) and let the implied capital follow.
- **Allocation is a device.** All capital stands behind every policy; the allocation exists to set [[Risk-Adjusted Pricing|prices]] and judge [[Risk-Adjusted Performance|performance]], and marginal methods that recognise diversification are the ones that support good decisions.

> [!example]- Four Allocations of the Same Capital {Example}
> Two lines have loss standard deviations $\sigma_A = 30$ and $\sigma_B = 50$ with correlation $0.5$. The insurer holds capital equal to twice the standard deviation of its total loss. Allocate total capital by (a) standalone proportions, (b) Merton–Perold, (c) Shapley, (d) covariance (Euler).
>
> > [!answer]-
> > Standalone capital: $C_A = 60$, $C_B = 100$, total $160$.
> >
> > $$
> > \begin{align*}
> > \sigma_{A+B}^2 &= 30^2 + 50^2 + 2(0.5)(30)(50) \\
> > &= 4{,}900 \\
> > C &= 2\sqrt{4{,}900} \\
> > &= 140
> > \end{align*}
> > $$
> >
> > so diversification saves $20$.
> >
> > - **(a) Proportional:** $A = 140 \times 60/160 = 52.5$; $B = 87.5$.
> > - **(b) Merton–Perold:** $A = 140 - 100 = 40$; $B = 140 - 60 = 80$. They sum to $120$, leaving $20$ unallocated.
> > - **(c) Shapley:** $A = \tfrac{1}{2}(60 + 40) = 50$; $B = \tfrac{1}{2}(100 + 80) = 90$.
> > - **(d) Covariance:** $\text{Cov}(A, A{+}B) = 900 + 750 = 1{,}650$ and $\text{Cov}(B, A{+}B) = 2{,}500 + 750 = 3{,}250$, so $A = 2(1{,}650)/70 = 47.14$ and $B = 2(3{,}250)/70 = 92.86$.
> >
> > Line A is charged anywhere from $40$ to $52.5$. Under every method that recognises diversification, the smaller line gets the larger *percentage* reduction from its standalone capital — $33\%$ against $20\%$ under Merton–Perold, $17\%$ against $10\%$ under Shapley, $21\%$ against $7\%$ by covariance — and that difference flows straight into its price and its measured return.

> [!example]- Capital from an EPD Target {Example}
> Aggregate losses are $50$ w.p. $0.50$, $100$ w.p. $0.30$, $200$ w.p. $0.15$ and $300$ w.p. $0.05$. The insurer targets an EPD ratio of $1\%$ of expected losses. Find the assets and risk capital required, and compare with $\text{VaR}_{0.95}$.
>
> > [!answer]-
> > $E[X] = 25 + 30 + 30 + 15 = 100$, so the target is $\text{EPD} = E[(X - a)_+] = 1$. For assets $a$ between $200$ and $300$ only the worst outcome falls short:
> >
> > $$
> > \begin{align*}
> > 0.05(300 - a) &= 1 \\
> > a &= 280
> > \end{align*}
> > $$
> >
> > Risk capital is $280 - 100 = 180$.
> >
> > $\text{VaR}_{0.95} = 200$ would suggest capital of only $100$ — but at $a = 200$ the EPD is $0.05 \times 100 = 5$, an EPD ratio of $5\%$. VaR sees only the probability of shortfall; the EPD also sees its size, which is why it is the better standard for capital.
