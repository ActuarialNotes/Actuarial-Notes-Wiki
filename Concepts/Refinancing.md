---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:358690eb38b179cd6497c3a93469d27df9e7952da654a5e94e51ad29b632a9c6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Refinancing.md
---

**Refinancing** is paying off an existing loan with the proceeds of a new one on different terms — usually a lower [[Interest Rate|interest rate]], sometimes a different term or payment. The new loan's principal is the old loan's [[Outstanding Balance|outstanding balance]] at the refinancing date, plus any fees or prepayment penalty the borrower finances.

> $$L' = OB_k + \text{fees}$$

> $$OB_k = P\,a_{\overline{n-k}|\,i}$$

> $$P' = \frac{L'}{a_{\overline{n'}|\,i'}}$$

- $P$, $n$ and $i$ are the old loan's [[Payment Amount|payment]], term and rate; $k$ is the number of payments made before refinancing; $i'$ and $n'$ are the new rate and term. The balance is always computed **at the old rate** — that is the amount the lender is owed.
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
