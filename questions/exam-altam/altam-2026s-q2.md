---
id: "altam-2026s-q2"
exam: "Exam ALTAM"
topic: "Profit Testing"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Profit+Testing
  - Concepts/Profit+Signature
  - Concepts/Profit+Margin
  - Concepts/Net+Present+Value
  - Concepts/Joint+Life
  - Concepts/Adverse+Selection
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:516a58625bb3496b9371174cdbf7f6cc1ee124228165c6600a85537e8cb113f1
  sources:
    - "SOA Exam ALTAM Spring (April) 2026 – exam (questions), Q2, pp.4-5, sha256:be424c84e360f858fda955257513b27618d695b7e05cae80fca475145f90a9aa — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-exam.pdf"
    - "SOA ALTAM Spring 2026 Model Solutions and Examiners' Comments, Q2, pp.2-4, sha256:ca1bffa86e9b64729358c65e002dc38c533661dda14693310f8b3cddc852b4d6 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2026s-q2.md
---

An insurer offers a fully discrete two-year special joint life insurance policy to a couple aged $x$ and $y$. You are given the following policy information:

(i) A death benefit of 10,000 is payable at the end of the year of the first death if it occurs within two years.

(ii) A survival benefit of 500 is payable at the end of year 2 if both lives survive.

(iii) A 50% refund of the first premium without interest is payable at the end of year 1 if the policy is surrendered at that time.

(iv) The policy terminates upon the earliest of the first death, surrender, or maturity.

(v) The gross annual premium is $G$.

The assumptions used for profit testing this policy are:

(i) The pre-contract expense is 100.

(ii) Maintenance expenses of 50 are incurred at the start of each year.

(iii) The commissions are 5% of the gross premium in each year.

(iv) The earned interest rate is 3%.

(v) The hurdle rate is 10%.

(vi) The future lifetimes of $(x)$ and $(y)$ are independent.

(vii) The mortality rates are:

$$q_x = 0.02 \qquad q_{x+1} = 0.03 \qquad q_y = 0.04 \qquad q_{y+1} = 0.05$$

(viii) 10% of the policies in force at the end of the first year surrender.

(ix) The insurer does not hold reserves for this policy.

## Part a (2.5 points)

(i) Determine $\Pr_0$.

(ii) You are given that $\Pr_1 = 400$. Show that $G = 1100$ to the nearest 100. You should calculate the value to the nearest 0.1.

(iii) Show that $\Pr_2 = -200$ to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
**(i)** $\Pr_0 = -100$

**(ii)**

$$\Pr_1 = (0.95G - 50)(1.03) - (1 - p_{xy})(10{,}000) - 0.1\,p_{xy}(0.5G) = 400$$

$$p_{xy} = 0.98 \times 0.96 = 0.9408$$

$$\Rightarrow G = \frac{400 + 50(1.03) + 0.0592(10{,}000)}{0.95(1.03) - (0.1)(0.5)(0.9408)} = 1{,}120.28$$

**(iii)**

$$\Pr_2 = (0.95G - 50)(1.03) - (1 - p_{x+1:y+1})(10{,}000) - p_{x+1:y+1}(500)$$

$$p_{x+1:y+1} = 0.97 \times 0.95 = 0.9215$$

$$\Rightarrow \Pr_2 = -201.05$$

### Examiner Report
Overall, this question was done well by most candidates. The numerical parts scored significantly higher than the verbal parts.

1. Candidates generally did very well on this part.

## Part b (2.5 points)

(i) Determine the profit signature, $\Pi$.

(ii) Calculate the Net Present Value.

(iii) Calculate the profit margin to the nearest 0.0001.

### Explanation
**(i)**

$$\Pi = \left(-100,\ 400,\ -201.05(0.9\,p_{xy})\right) = (-100,\ 400,\ -170.24)$$

**(ii)**

$$NPV = -100 + 400\,v_{10\%} - 170.24\,v_{10\%}^2 = 122.95$$

**(iii)**

$$pm = \frac{NPV}{G\left(1 + 0.9\,p_{xy}\,v_{10\%}\right)} = \frac{122.95}{1982.62} = 6.20\%$$

### Examiner Report
1. Candidates generally did very well on this part.
2. The most common errors were omitting the 0.9 term in the survival probability, and using the earned interest rate instead of the hurdle rate to calculate the NPV and profit margin.

## Part c (3 points)

(i) Explain why the insurer would be concerned about the negative emerging profit at time 2.

(ii) The insurer decides to hold a reserve at time 1, denoted ${}_1V$ such that $\Pr_2 = 0$. Calculate ${}_1V$.

(iii) Calculate the revised Net Present Value.

(iv) Explain why the Net Present Value has decreased.

### Explanation
**(i)** A negative projected cash flow implies a need for new money. It is imprudent to create a product that requires funding mid-term, without making provision for that funding (i.e. setting reserves).

**(ii)**

$$\left({}_1V + 0.95G - 50\right)(1.03) - 10000\left(1 - p_{x+1:y+1}\right) - 500\,p_{x+1:y+1} = 0$$

$$
\begin{align*}
\Rightarrow {}_1V &= \left(10000(0.0785) + 500(0.9215)\right)/1.03 + 50 - .95G \\
&= 195.20
\end{align*}
$$

Or:

$$\Pr_2^{new} = \Pr_2^{old} + {}_1V(1.03) = -201.05 + {}_1V(1.03) = 0$$

$$\Rightarrow {}_1V = \frac{201.05}{1.03} = 195.20$$

**(iii)**

$$\Pr_1^{new} = \Pr_1^{old} - \left(0.9\,p_{xy}\right)\left({}_1V\right) = 234.73$$

$$\Rightarrow \Pi^{new} = (-100,\ 234.73,\ 0)$$

$$\Rightarrow NPV = -100 + 234.73\,v_{10\%} = 113.39$$

**(iv)** The hurdle rate is 10%; the reserves are only earning 3%. Higher reserves implies pulling funds out of the pool that is potentially earning 10% and investing them at only 3%, which leads to less profit for the insurer.

### Examiner Report
1. Parts (ii) and (iii) were done fairly well. Parts (i) and (iv), which tested candidates' understanding of the fundamental principles of reserving and profit testing, were done less well.
2. For full credit in part (iv), candidates were required to note the difference between the earned rate and the hurdle rate.

## Part d (2 points)

(i) Describe two factors that insured couples should take into consideration in deciding whether or not to surrender their policy at the end of the first year.

(ii) Explain how adverse selection might impact the insurer's assumption about mortality in the second year.

### Explanation
**(i)** Examples of factors to take into consideration

- The health status of $(x)$ and $(y)$ at that time; less likely to surrender if they believe their mortality risk is high.
- The ability of the policyholders to afford the second year premium (perhaps their circumstances have changed).
- The cost of purchasing insurance cover through a new 1-year policy if they do surrender, noting that the cost would be offset by the 50% return of premium benefit from the original policy.
- Changing needs for insurance cover -- perhaps their circumstances have changed such that a different product would be more suitable.

**(ii)** Since we expect the surrendering policyholders to be healthier than average, the remaining policyholders would be expected to have higher mortality than the surrendering policyholders, through adverse selection.

### Examiner Report
1. In part (i), some candidates merely listed factors. The key word in the question was "describe", which signals that the examiners are looking for (a little) more than a list of words. For full credit, candidates were required to give a brief explanation of why the factor listed is relevant.
2. In part (ii), some candidates gave answers that were too brief for full credit – e.g. "adverse selection means higher mortality". The word "Explain" in the question signals that for full credit the examiners were looking for a brief explanation as to why the non-surrendering policyholders would be expected to have higher mortality.
3. Many candidates answered part (ii) by explaining what adverse selection is, without addressing the specific product in the question (for example, some candidates used annuities to describe adverse selection). Note that in the solution above, adverse selection is not defined, as the question did not specifically ask for a definition. Generic answers to both (i) and (ii) earned little or no credit.
