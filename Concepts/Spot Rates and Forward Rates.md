---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:efda7cb0134079057ac9f27fc710772e1597f0a04d6258e3a9570ecb163acb46
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.459-461, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 99, solutions PDF p.28, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 222, solutions PDF p.56, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 294, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Spot Rates and Forward Rates.md
---

**Spot rates and forward rates** are two descriptions of the same term structure of interest rates. The [[Spot Rate]] $s_t$ is the annual effective rate earned on an investment made now and repaid in one sum at time $t$; the [[Forward Rate]] $f_{n,n+k}$ is the annual effective rate for an investment that starts $n$ years from now and lasts $k$ years. Either set determines the other, because investing for $n$ years and then at the forward rate for $k$ more must accumulate to the same amount as investing at the $(n+k)$-year spot rate:

> $$(1+s_n)^n\,(1+f_{n,n+k})^k = (1+s_{n+k})^{n+k}$$

Chaining one-year forward rates builds the spot rates, and the spot rates discount any set of cash flows $C_t$:

> $$(1+s_t)^t = (1+f_{0,1})(1+f_{1,2})\cdots(1+f_{t-1,t})$$

> $$PV = \sum_{t} \frac{C_t}{(1+s_t)^t}$$

- $f_{n,n+k}$ is what SOA calls the "$k$-year forward rate, deferred $n$ years" (or "starting in $n$ years"); the one-year forward rate starting now is the one-year spot rate, $f_{0,1} = s_1$
- Plotted against term, the spot rates form the [[Yield Curve]]. Exam FM asks for the present value of a set of cash flows using a yield curve developed from forward and spot rates: convert whichever rates are given to spot rates (or to a product of forward-rate factors), then discount each cash flow at the rate for its own time
- For the one-step formulas — pricing a bond from spot rates, or a one-year forward rate from two adjacent spot rates — see [[Spot Rate]] and [[Forward Rate]]

> [!example]- From Forward Rates to Spot Rates and a Present Value {Example}
> The one-year forward rates are $f_{0,1} = 3\%$, $f_{1,2} = 4\%$ and $f_{2,3} = 5.5\%$. An insurer must pay $1{,}000$ at the end of each of the next three years. Find the 2- and 3-year spot rates and the present value of the payments.
>
> > [!answer]-
> > Chain the forward-rate factors:
> > $$
> > \begin{align*}
> > (1+s_2)^2 &= (1.03)(1.04) \\
> > &= 1.0712 \\
> > s_2 &= 1.0712^{1/2} - 1 \\
> > &= 3.50\% \\
> > (1+s_3)^3 &= (1.03)(1.04)(1.055) \\
> > &= 1.130116 \\
> > s_3 &= 1.130116^{1/3} - 1 \\
> > &= 4.16\%
> > \end{align*}
> > $$
> > Discount each payment by its own factor:
> > $$
> > \begin{align*}
> > PV &= \frac{1{,}000}{1.03} + \frac{1{,}000}{1.0712} + \frac{1{,}000}{1.130116} \\
> > &= 970.874 + 933.532 + 884.865 \\
> > &= 2{,}789.27
> > \end{align*}
> > $$

> [!example]- A Two-Year Forward Rate, Deferred Two Years {Example}
> The 2-year spot rate is $4.5\%$ and the 4-year spot rate is $5.5\%$. A company will borrow at the end of year 2 for two years. Find the 2-year forward rate, deferred 2 years, implied by these spot rates.
>
> > [!answer]-
> > With $n = 2$ and $k = 2$:
> > $$
> > \begin{align*}
> > (1.045)^2\,(1+f_{2,4})^2 &= (1.055)^4 \\
> > (1+f_{2,4})^2 &= \frac{1.238825}{1.092025} \\
> > &= 1.134429 \\
> > f_{2,4} &= 1.134429^{1/2} - 1 \\
> > &= 6.51\%
> > \end{align*}
> > $$
> > The forward rate is above both spot rates. The 4-year spot rate is a geometric average of the rate for years 1–2 and the rate for years 3–4, so for $s_4$ to exceed $s_2$ the later two years must earn more than $s_4$.
