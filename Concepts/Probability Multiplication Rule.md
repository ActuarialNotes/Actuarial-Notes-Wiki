---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:ec4b18153d934058b6c244b90ae23579f8a4191f7e1cebb528fae41deda6a62d
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 conditional probability p.134 (PDF p.142), Example 4.5/Fig. 4.1 p.135 (PDF p.143), Def. 4.1 + Thm 4.1 pp.139-140 (PDF pp.147-148), eq. (4.2) p.146 (PDF p.154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q351 p.98 (multiplication rule for independent events), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Multiplication Rule.md
---

The **Probability Multiplication Rule** gives the joint probability of two events $A$ and $B$ occurring together.
- When $A$ and $B$ are [[Independent Events|independent]], the rule simplifies to $P(A \cap B) = P(A) \cdot P(B)$ since $P(B \mid A) = P(B)$
- For a chain of events, the rule extends to $P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1)\,P(A_2 \mid A_1)\,P(A_3 \mid A_1 \cap A_2) \cdots$

> $$P(A \cap B) = P(A) \cdot P(B \mid A)$$

> $$= P(B) \cdot P(A \mid B)$$

![[Media/Figures/Probability_Multiplication_Rule.svg|340]]

> [!example]- Sequential Claim Filing Without Replacement {Example}
> A portfolio has 10 policies: 4 will generate claims this year and 6 will not. Two policies are selected at random without replacement. What is the probability both generate claims?
>
> > [!answer]-
> > Let $A$ = first policy generates a claim, $B$ = second policy generates a claim. Applying the multiplication rule:
> > $$P(A \cap B) = P(A) \cdot P(B \mid A) = \frac{4}{10} \times \frac{3}{9} = \frac{12}{90} = \frac{2}{15} \approx 0.133$$
