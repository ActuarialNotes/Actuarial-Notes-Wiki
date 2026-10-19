---
id: "cas5-an-011"
exam: "Exam 5"
topic: "Bornhuetter-Ferguson Method"
learning_objective: "Estimating Claim Liabilities (Reserving)"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Cumulative+Development+Factor
  - Concepts/Age+to+Age+Factor
  - Concepts/Tail+Factor
  - Concepts/IBNR
  - Concepts/Chain+Ladder+Method
points: 3
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:091e2c70c2de57a77a291be55a7be7f52eff3910b198967a74e6880821add4d9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/cas5-an-011.md
---

An actuary is estimating unpaid claims for accident year 2025 of a general liability book, evaluated at December 31, 2025 (12 months). The selected reported age-to-age factors and tail factor are:

| 12–24 | 24–36 | 36–48 | 48–Ultimate (tail) |
|---|---|---|---|
| 1.80 | 1.25 | 1.08 | 1.02 |

For accident year 2025, earned premium is \$4,000,000, the expected claim ratio is 68%, and reported claims at 12 months are \$1,150,000.

## Part a (1 point)
Calculate the reported cumulative development factor from 12 months to ultimate. Give your answer to three decimal places.

### Answer
2.479

### Explanation
The cumulative development factor at 12 months is the product of every age-to-age factor from 12 months onward, **including the tail factor**:

$$
\text{CDF}_{12} = 1.80 \times 1.25 \times 1.08 \times 1.02 = 2.4786 \approx \mathbf{2.479}
$$

**Common wrong entries**

- **2.430** — leaving out the tail factor projects only to 48 months, not to ultimate.
- **5.150** — adding the factors instead of multiplying them; development factors compound.

## Part b (1 point)
Using $\text{CDF}_{12} = 2.479$, calculate the Bornhuetter-Ferguson estimate of IBNR for accident year 2025. Do not round the percentage unreported. Give your answer to the nearest dollar.

### Answer
1622783

### Explanation
The a priori expected claims are the expected claim ratio times earned premium, and BF IBNR is the expected unreported share of them:

$$
\begin{align*}
U_0 &= 0.68 \times 4{,}000{,}000 \\
&= 2{,}720{,}000 \\[4pt]
\% \text{ unreported} &= 1 - \frac{1}{2.479} \\
&= 0.5966115 \\[4pt]
\text{IBNR}_{\text{BF}} &= 0.5966115 \times 2{,}720{,}000 \\
&= \mathbf{1{,}622{,}783}
\end{align*}
$$

The reported claims of \$1,150,000 do not enter the BF IBNR; they enter only the BF ultimate.

**Common wrong entries**

- **1,097,217** — multiplying the a priori by the reciprocal of the CDF, the percentage *reported*, gives the claims expected to have been reported by now, not the unreported claims.
- **1,700,850** — the chain ladder IBNR, the reported \$1,150,000 times $(\text{CDF} - 1)$, which develops the actual reported claims rather than the a priori.
- **1,623,840** — rounding the percentage unreported to 0.597 before multiplying.

## Part c (1 point)
Using the results above, calculate the chain ladder estimate of IBNR minus the Bornhuetter-Ferguson estimate of IBNR. Give your answer to the nearest dollar.

### Answer
78067

### Explanation
The chain ladder develops the actual reported claims:

$$
\begin{align*}
\text{IBNR}_{\text{CL}} &= 1{,}150{,}000 \times (2.479 - 1) \\
&= 1{,}700{,}850 \\[4pt]
\text{Difference} &= 1{,}700{,}850 - 1{,}622{,}783 \\
&= \mathbf{78{,}067}
\end{align*}
$$

The chain ladder is higher because reported claims (\$1,150,000) are running ahead of what the a priori implies should have been reported by 12 months, \$2,720,000 / 2.479 = \$1,097,217. The chain ladder multiplies that excess by the full CDF; BF takes reported claims at face value and does not extrapolate the excess into the unreported portion.

**Common wrong entries**

- **-78,067** — the subtraction in the wrong order; a negative difference would mean reporting is running *behind* the a priori.
- **52,783** — the difference between reported claims and the claims expected to be reported, \$1,150,000 minus \$1,097,217. That gap is what drives the difference, but the chain ladder multiplies it by the CDF minus one, 1.479.
