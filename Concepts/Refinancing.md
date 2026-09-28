---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:3978e095fbaa581253b20e6ccc6789110ddcbd9bf900104236ba7acdfd4156c7
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2 (Refinanced loans), sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 60, questions PDF p.27, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 60, solutions PDF p.18, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Refinancing.md
---

**Refinancing** is paying off an existing loan with the proceeds of a new one on different terms — usually a lower [[Interest Rate|interest rate]], sometimes a different term or payment. The new loan's principal is the old loan's [[Outstanding Balance|outstanding balance]] at the refinancing date, plus any fees or prepayment penalty the borrower finances.

> $$L' = OB_k + \text{fees}$$

> $$OB_k = P\,a_{\overline{n-k}|\,i}$$

> $$P' = \frac{L'}{a_{\overline{n'}|\,i'}}$$

- $P$, $n$ and $i$ are the old loan's [[Payment Amount|payment]], term and rate; $k$ is the number of payments made before refinancing; $i'$ and $n'$ are the new rate and term. The balance is computed **at the old rate** — that is the amount the lender is owed.
- After refinancing, the new loan is amortized from scratch: interest in its first payment is $i' L'$, and the [[Amortization Schedule]] restarts from $L'$. Nothing about the payments already made changes.
- There are two usual ways to take the benefit. **Lower payment**: keep the remaining term and solve for $P'$. **Shorter term**: keep the old payment and solve for $n'$, with a smaller final [[Drop Payment]] if $n'$ is not a whole number.
- Whether it is worth doing is an [[Equation of Value]] question: compare the present value of the payment savings with the fees. A fee paid in cash up front can be set directly against that present value.
- The borrower's right to refinance when rates fall is what makes a lender's cash flows uncertain — the same option an issuer holds in a [[Callable Bond]], and the source of [[Prepayment Risk]] for mortgage investors.

> [!example]- Refinancing to a Lower Rate {Example}
> A \$250,000 loan is repaid by 20 level annual payments at 7%. Just after the 8th payment, the borrower refinances the balance at 5% over the remaining 12 years, adding a \$2,000 fee to the new loan. Find the new payment, the annual saving, and the split of the first new payment.
>
> > [!answer]-
> > Old payment and the balance after 8 payments (12 remain):
> >
> > $$
> > \begin{align*}
> > P &= \frac{250{,}000}{a_{\overline{20}|0.07}} \\
> > &= \frac{250{,}000}{10.5940} \\
> > &= 23{,}598.23 \\
> > OB_8 &= 23{,}598.23\,a_{\overline{12}|0.07} \\
> > &= 187{,}433.35
> > \end{align*}
> > $$
> >
> > New loan and payment:
> >
> > $$
> > \begin{align*}
> > L' &= 187{,}433.35 + 2{,}000 \\
> > &= 189{,}433.35 \\
> > P' &= \frac{189{,}433.35}{a_{\overline{12}|0.05}} \\
> > &= \frac{189{,}433.35}{8.86325} \\
> > &= 21{,}372.90
> > \end{align*}
> > $$
> >
> > The payment falls by \$2,225.34 a year. The first new payment contains $0.05 \times 189{,}433.35 = 9{,}471.67$ of interest and $21{,}372.90 - 9{,}471.67 = 11{,}901.23$ of principal — the old loan's next payment would have carried $0.07 \times 187{,}433.35 = 13{,}120.33$ of interest.

> [!example]- Keeping the Old Payment to Shorten the Term {Example}
> In the example above, the borrower instead keeps paying \$23,598.23 a year on the new \$189,433.35 loan at 5%. How many payments are needed, and what is the final one?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > a_{\overline{n'}|0.05} &= \frac{189{,}433.35}{23{,}598.23} \\
> > &= 8.02744 \\
> > n' &= \frac{-\ln(1 - 0.05 \times 8.02744)}{\ln 1.05} \\
> > &= 10.52
> > \end{align*}
> > $$
> >
> > So 10 full payments and a smaller 11th. The balance after 10 payments, retrospectively:
> >
> > $$
> > \begin{align*}
> > OB_{10} &= 189{,}433.35(1.05)^{10} - 23{,}598.23\,s_{\overline{10}|0.05} \\
> > &= 11{,}750.95 \\
> > \text{Final payment} &= 11{,}750.95 \times 1.05 \\
> > &= 12{,}338.49
> > \end{align*}
> > $$
> >
> > The loan is paid off in 11 years instead of 12, with a final payment of \$12,338.49.
