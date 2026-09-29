---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:4ce677c4c122c35dc97ae15650fb9e1519c15059bde37cec5e8e1c2de20bf7e8
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.11-12, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 87, questions PDF p.39, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 337, solutions PDF p.89, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 380, solutions PDF p.100, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Term of Loan.md
---

The **term of a loan** is the total number of payment periods until the loan is fully repaid.

- Along with the [[Interest Rate]], [[Principal]], [[Payment Amount|payment amount]] and [[Payment Period|payment period]], it is one of the five items of a loan calculation — given any four, the missing one can be solved.
- When the term is not an integer, the regular payments cannot repay the loan exactly, and the [[Final Payment]] differs from them. If the remainder is paid together with the last regular payment, that final payment is larger than the others — a [[Balloon Payment]]. If it is paid one period after the last regular payment, it is a separate payment smaller than the others — a [[Drop Payment]].

![[Media/Figures/Term_of_Loan.svg|340]]

> [!example]- Solving for Term {Example}
> A $5{,}000$ loan at $8\%$ annual interest is repaid with annual payments of $900$. Find the term.
>
> > [!answer]-
> > $5000 = 900\,a_{\overline{n}|8\%}$, so $a_{\overline{n}|} = 5.555556$:
> >
> > $$
> > \begin{align*}
> > n &= \frac{-\ln(1 - 0.08 \times 5.555556)}{\ln 1.08} \\
> > &= \frac{0.587787}{0.076961} \\
> > &= 7.64 \text{ years}
> > \end{align*}
> > $$
> >
> > 8 payments needed, with a smaller final payment: 7 full payments of $900$ leave a balance of $5000(1.08)^7 - 900\,s_{\overline{7}|8\%} = 538.60$, repaid by a drop payment of $538.60(1.08) = 581.69$ at the end of year 8.
