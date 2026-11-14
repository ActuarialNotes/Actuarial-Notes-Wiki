---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5ea783a130eea4b6d486b5808cfb06101c7e987b69fb3ec13c1cdbdebe571d90
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Recursion.md
---
A **Recursion** expresses a value at one time step in terms of its value at the step before. For a loan repaid by level payments $P$ at the end of each period, at periodic effective rate $i$, the [[Outstanding Balance|outstanding balance]] after the $k$th payment is

> $$B_k = B_{k-1}(1+i) - P$$

- $B_{k-1}$ is the outstanding balance after the $(k-1)$th payment, with $B_0$ the original loan amount.

Each step rolls the balance forward one period at interest and then subtracts the payment. Repeating the step builds an [[Amortization Schedule|amortization schedule]] row by row, without evaluating a long sum.

> [!example]- A loan of $\$5{,}000$ is repaid by level annual payments over 4 years at $i = 8\%$. What is the outstanding balance after the 2nd payment? {Example}
> - The level payment is $P = 5{,}000/a_{\overline{4}|} = 5{,}000/3.31213 = \$1{,}509.604$.
> - $B_1 = 5{,}000(1.08) - 1{,}509.604 = \$3{,}890.40$.
> - $B_2 = 3{,}890.40(1.08) - 1{,}509.604 = \$2{,}692.02$.
> - The outstanding balance after the 2nd payment is $\$2{,}692.02$.

## Recursion for an annuity-immediate

An $n$-payment [[Annuity Immediate|annuity-immediate]] is one payment at the end of the first period plus an $(n-1)$-payment annuity-immediate starting then. Discounting both one period, its present value is

> $$a_{\overline{n}|} = v\bigl(1 + a_{\overline{n-1}|}\bigr)$$

- $v = 1/(1+i)$ is the discount factor for one period.

This recursion is also how annuity formulas are proved by induction. In life insurance, the same step from one year to the next gives the [[Policy Value#The recursion|policy value recursion]].

> [!example]- At $i = 8\%$, $a_{\overline{2}|} = 1.783265$. What is $a_{\overline{3}|}$? {Example}
> - The discount factor is $v = 1/1.08$.
> - $a_{\overline{3}|} = (1 + 1.783265)/1.08 = 2.577097$.
