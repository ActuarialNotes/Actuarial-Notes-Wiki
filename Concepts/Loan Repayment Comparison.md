---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:e72f438088762563eac1862c11420ea746531383dd4e9c50ee2ea3a4da53aeae
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 12, questions PDF p.7, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 12, solutions PDF p.6, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Loan Repayment Comparison.md
---

**Loan repayment comparison** problems compare two different repayment structures for a loan of the same [[Principal]] $L$ over $n$ periods at rate $i$ — most commonly [[Level Annuity|level payments]] (standard [[Amortization]]) versus **constant-principal** payments (equal principal repaid each period, plus interest on the declining [[Outstanding Balance]]) — and equate or contrast the resulting payments or total interest.

> $$P_{\text{level}} = \frac{L}{a_{\overline{n}|i}}$$

> $$\text{Total interest (level)} = n\,P_{\text{level}} - L$$

> $$\text{Total interest (constant principal)} = i\,L\cdot\frac{n+1}{2}$$

- Under constant-principal repayment, the principal portion each period is $L/n$, and interest is charged on the declining balance $L\cdot\frac{n-t+1}{n}$ at time $t$; summing the interest over all $n$ periods gives $iL\frac{n+1}{2}$.
- Level payments front-load more interest than the constant-principal method — the two can be tied together by setting their total payments or total interest equal and solving for an unknown rate or payment.
- The same comparison approach applies to two loans repaid by the same method at different [[Interest Rate]]s or [[Term of Loan]]s: write the equation of value for each and set the quantities of interest equal.

![[Media/Figures/Loan_Repayment_Comparison.svg|340]]

> [!example]- Solving for the Rate That Equates Two Repayment Methods {Example}
> A \$$3{,}000$ loan can be repaid over 5 years in one of two ways: (i) level annual payments at an annual effective rate of $10\%$, or (ii) principal payments of \$$600$ per year plus interest on the unpaid balance at rate $j$. The total payments under both options are equal. Find $j$.
>
> > [!answer]-
> > **Option (i):** $P = 3{,}000 / a_{\overline{5}|0.10} = 3{,}000/3.79079 \approx \$791.39$, so total paid $= 5(791.39) = \$3{,}956.96$ and total interest $= 3{,}956.96 - 3{,}000 = \$956.96$.
> >
> > **Option (ii):** Total interest $= j(3{,}000)\dfrac{6}{2} = 9{,}000j$.
> >
> > $$9{,}000j = 956.96 \implies j \approx 10.63\%$$

> [!example]- Total Interest Under Constant-Principal Repayment {Example}
> A borrower takes a \$$5{,}000$ loan at an annual effective interest rate of $6\%$, to be repaid with principal payments of \$$1{,}000$ per year for 5 years plus interest on the outstanding balance. Find the total interest paid over the life of the loan.
>
> > [!answer]-
> > $$\text{Total interest} = iL\cdot\frac{n+1}{2} = 0.06(5{,}000)\cdot\frac{6}{2} = 0.06(5{,}000)(3) = \$900$$
