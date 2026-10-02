---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:6c2ca0b930cd5682bf088ffa9ec8874ac96fef506a3e8f6510c1bde34798ae2f
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 60, solutions PDF p.18, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 232, solutions PDF pp.59-60, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Outstanding Balance.md
---

**Outstanding balance** (or outstanding loan balance) is the amount still owed on a loan at a given time, calculated by either the prospective or retrospective method.

- **Prospective method** (present value of future payments):

> $$OB_k = P \cdot a_{\overline{n-k}|i}$$

- **Retrospective method** (accumulated value of loan minus accumulated payments):

> $$OB_k = L(1+i)^k - P \cdot s_{\overline{k}|i}$$

- The **outstanding balance** $OB_k$ is the remaining principal owed immediately after the $k$-th payment on a loan of original amount $L$, level payment $P$, interest rate $i$ per period, and $n$ total payments.
- Both formulas give the same result. The prospective method needs only the remaining payments; the retrospective method needs only the original loan and the payments already made, which makes it the one to use when the future payments are not fully known — for example a loan settled by a final balloon payment of unknown size.
- Note that the formula $OB_k = L - P\,a_{\overline{k}|i}$ is **incorrect** in general; it would only apply if interest were zero.

![[Media/Figures/Outstanding_Balance.svg|340]]

> [!example]- Outstanding Balance After 3 Payments {Example}
> A \$$20{,}000$ loan is repaid with level annual payments over 6 years at $i = 8\%$. Find the outstanding balance immediately after the 3rd payment using both methods.
>
> > [!answer]-
> > **Payment**: $P = 20000 / a_{\overline{6}|8\%} = 20000 / 4.6228797 = \$4{,}326.3077$, about \$$4{,}326.31$ a year.
> >
> > **Prospective**: $OB_3 = P \cdot a_{\overline{3}|8\%} = 4326.3077 \times 2.577097 = \$11{,}149.31$
> >
> > **Retrospective**:
> >
> > $$
> > \begin{align*}
> > OB_3 &= 20000(1.08)^3 - 4326.3077\,s_{\overline{3}|8\%} \\
> > &= 20000(1.259712) - 4326.3077(3.2464) \\
> > &= 25194.24 - 14044.93 \\
> > &= \$11{,}149.31
> > \end{align*}
> > $$
> >
> > Both methods give the same balance. (Rounding $P$ to $4{,}326.31$ before using it moves the results by at most a cent — $11{,}149.32$ prospectively, $11{,}149.31$ retrospectively — which is rounding, not a difference between the methods.)
