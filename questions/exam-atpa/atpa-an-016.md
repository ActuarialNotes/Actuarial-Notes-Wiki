---
id: "atpa-an-016"
exam: "Exam ATPA"
topic: "Outlier"
learning_objective: "Working with Data"
difficulty: medium
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Outlier
  - Concepts/Data+Quality
points: 2
---

An analyst is preparing 3,000 auto physical damage claims for a severity model. The first quartile of the claim amounts is \$800 and the third quartile is \$4,800. Three claims draw attention: \$9,500, \$52,000 and $-\$1{,}500$.

## Part a (1 point)
Using the fences at 1.5 times the interquartile range, which of the three claims are flagged as outliers?

- A) All three claims
- B) The \$52,000 claim only
- C) The \$9,500 and \$52,000 claims
- D) The \$52,000 and $-\$1{,}500$ claims
- E) None of the three claims

### Answer
B

### Explanation
$$
\text{IQR} = 4{,}800 - 800 = 4{,}000
$$

$$
\text{Upper fence} = 4{,}800 + 1.5 \times 4{,}000 = 10{,}800
$$

$$
\text{Lower fence} = 800 - 1.5 \times 4{,}000 = -5{,}200
$$

Only \$52,000 lies outside the fences. The answer is **B**.

- **A** and **D** flag $-\$1{,}500$, which is inside the lower fence of $-\$5{,}200$.
- **C** flags \$9,500, which follows from a fence of one IQR (an upper fence of $Q_3 + \text{IQR} = 8{,}800$) instead of 1.5.
- **E** misses that \$52,000 is far above the upper fence.

## Part b (1 point)
Recommend how the analyst should treat the \$52,000 claim and the $-\$1{,}500$ claim in the severity data, and justify the recommendation.

### Explanation
A full-credit answer makes these points:

1. The first question about the \$52,000 claim is why it is extreme. The analyst checks it against the claim record, since it could be an error or a genuine total loss on an expensive vehicle.
2. If it is an error, it is corrected at source. If it is real, it is kept. Deleting a real observation because it is inconvenient biases the severity.
3. A real extreme value can be kept from dominating the fit by capping it at a threshold and loading the excess back separately, or by transforming the variable (a log compresses the tail) or using a heavy-tailed distribution.
4. Insurance losses are right-skewed, so a fence built for symmetric data flags legitimate claims. The flag is a reason to investigate, not a removal rule.
5. The $-\$1{,}500$ claim passes the fence but is still questionable. A negative claim is likely a salvage or subrogation recovery recorded as a separate transaction, a data quality problem the fence cannot see. It is matched to its claim and netted, or the severity basis (gross or net of recoveries) is chosen and applied consistently.
6. Whatever is done is described in the report.

**Sample answer.** I would check the \$52,000 claim against the claim file. If it is a keying error I would correct it; if it is a genuine total loss I would keep it, cap it at a threshold for the severity fit and add the excess back as a separate load estimated from a broader base. I would not delete it just because it lies outside the fence, since physical damage losses are skewed and large claims are real. The $-\$1{,}500$ record is inside the fences but cannot be a claim amount on its own; it is most likely a recovery, so I would net it against its claim on a stated basis. I would describe both treatments in the report.
