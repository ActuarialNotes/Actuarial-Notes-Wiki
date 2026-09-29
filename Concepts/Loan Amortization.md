---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:76bd938c98210ce05f578e7db09cdeb2144501643b14f24175624669ccbef550
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.333-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.342-343, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.345-346, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 125, questions PDF p.53, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loan Amortization.md
---

**Loan amortization** is the repayment of a loan by the [[Amortization|amortization method]]: the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rate equals the amount lent, and each payment first pays the interest due on the balance at the start of its period, with the rest repaying principal. One period of the loan is the recursion

> $$B_k = B_{k-1}(1+i) - K_k$$

> $$I_k = i\,B_{k-1}$$

> $$PR_k = K_k - I_k = B_{k-1} - B_k$$

- $B_0 = L$ is the amount lent, $i$ the rate per payment period, $K_k$ the $k$-th payment, $I_k$ and $PR_k$ its interest and principal portions, and $B_k$ the [[Outstanding Balance]] just after it. Each $k$ gives one row of an [[Amortization Schedule]]; the prospective and retrospective methods give $B_{k-1}$ directly, so any one row can be built without the rows before it.
- The relations hold whether or not the payments are level. A payment equal to the interest due repays no principal and leaves the balance unchanged; a smaller one makes the balance grow. A loan whose payments never exceed the interest due is never paid off.
- Adding up rows: the principal repaid in payments $j+1$ through $k$ is $B_j - B_k$, and the interest paid in them is those payments' total less $B_j - B_k$. Over the whole loan the principal portions add up to $L$, so the total interest is the total of the payments less $L$.
- With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{k+1} = PR_k(1+i)$ — see [[Amortization]].

> [!example]- Splitting a Payment When the Payments Change {Example}
> A \$$10{,}000$ loan at an annual effective rate of $5\%$ is repaid by 8 payments at the end of each year: \$$1{,}000$ in each of years 1–4 and a level amount $X$ in each of years 5–8. Find $X$, the balance just after the 4th payment, and the interest and principal in the 5th payment.
>
> > [!answer]-
> > The loan is the present value of the payments, with $a_{\overline{4}|5\%} = 3.545951$ and $v^4 a_{\overline{4}|5\%} = 2.917262$:
> >
> > $$
> > \begin{align*}
> > 10000 &= 1000\,a_{\overline{4}|} + X\,v^4\,a_{\overline{4}|} \\
> > X &= \frac{10000 - 3545.95}{v^4\,a_{\overline{4}|}} \\
> > &= \frac{6454.05}{2.917262} \\
> > &= \$2{,}212.37
> > \end{align*}
> > $$
> >
> > Balance just after the 4th payment, retrospectively, with $(1.05)^4 = 1.21550625$ and $s_{\overline{4}|5\%} = 4.310125$:
> >
> > $$
> > \begin{align*}
> > B_4 &= 10000(1.05)^4 - 1000\,s_{\overline{4}|5\%} \\
> > &= 12155.0625 - 4310.125 \\
> > &= \$7{,}844.94
> > \end{align*}
> > $$
> >
> > Prospectively it is the four remaining payments, $2212.365 \times 3.545951 = 7844.94$ — the same.
> >
> > **5th payment:** interest $I_5 = 0.05 \times 7844.94 = \$392.25$, principal $PR_5 = 2212.37 - 392.25 = \$1{,}820.12$, leaving $B_5 = 7844.94 - 1820.12 = \$6{,}024.82$. The jump in the payment at year 5 more than triples the principal repaid: in the 4th payment it was $1000 - 0.05 \times 8423.75 = \$578.81$, since $B_3 = 10000(1.05)^3 - 1000\,s_{\overline{3}|5\%} = 11576.25 - 3152.50 = 8423.75$.

> [!example]- Principal and Interest Over a Range of Payments {Example}
> A \$$50{,}000$ loan is repaid by 20 level annual payments at an annual effective rate of $6\%$. Find the total principal repaid and the total interest paid in payments 6 through 10.
>
> > [!answer]-
> > The payment is $P = 50000 / a_{\overline{20}|6\%} = 50000/11.4699212 = \$4{,}359.2279$. The balances just after the 5th and 10th payments, prospectively:
> >
> > $$
> > \begin{align*}
> > B_5 &= 4359.2279\,a_{\overline{15}|6\%} \\
> > &= 4359.2279 \times 9.712249 \\
> > &= 42{,}337.91 \\
> > B_{10} &= 4359.2279\,a_{\overline{10}|6\%} \\
> > &= 4359.2279 \times 7.360087 \\
> > &= 32{,}084.30
> > \end{align*}
> > $$
> >
> > Principal repaid in payments 6–10 is $B_5 - B_{10} = 42337.91 - 32084.30 = \$10{,}253.61$, and the interest is the rest of those five payments: $5(4359.2279) - 10253.61 = 21796.14 - 10253.61 = \$11{,}542.53$. Summing the five rows of the schedule one by one gives the same totals.
