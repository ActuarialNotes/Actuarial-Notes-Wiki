---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:48a4fcdb1f09bea1bbad699358c9445e5c1f15b3dae875b01bb524fbec077a4d
  sources:
    - "Siegrist, Random, ch.8 Hypothesis Testing §1 Introduction: 'A type 1 error is rejecting the null hypothesis H0 when H0 is true'; significance level = maximum type 1 error probability, rejection region constructed so the level is a prescribed small value (typically 0.1, 0.05, 0.01); reducing type 1 error by shrinking R necessarily increases type 2 error, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed., §13.1.2 and Table 13.1, pp.559-560 (PDF pp.565-566): 'Type I errors are also known as false positives'; Type I error rate = probability of rejecting H0 given H0 holds; Type I/Type II trade-off, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 415 (2026 notes), Lesson 9 §9.1 and §9.3: Def 9.3 alpha = probability of a Type I error = significance level, alpha a conditional probability given H0 true, typical values 0.01/0.05/0.10, as alpha decreases beta increases, sha256:4b40913ee64c6e155867542d9d3517e3384e5a942452f6fc8b1e72bf815a8acf — https://online.stat.psu.edu/stat415/Lesson09.html"
    - "NIST/SEMATECH e-Handbook §7.1.3.1 Critical values and p values: alpha = 0.05 means H0 is rejected 5% of the time when true; critical region exceeded with probability alpha under H0, sha256:1de003010ccb462a50f87f25eb777a581442a61423c97e884266d8e89b0ff797 — https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Type I Error.md
---

A **Type I Error** occurs when a [[Hypothesis Testing|hypothesis test]] incorrectly **rejects a true null hypothesis** $H_0$. It is also called a **false positive**.

> $$\alpha = P(\text{Reject } H_0 \mid H_0 \text{ is true})$$

- $\alpha$ is the **significance level** of the test, chosen by the analyst before testing (commonly 0.05 or 0.01)
- A smaller $\alpha$ makes Type I errors rarer but increases the risk of a [[Type II Error]]
- The **critical region** is constructed so that $P(\text{test statistic in critical region} \mid H_0) = \alpha$
- In actuarial contexts, a Type I Error might mean incorrectly concluding that a rate change is needed when it is not

![[Media/Figures/Type_I_Error.svg|340]]

> [!example]- Identifying a Type I Error in Ratemaking {Example}
> An actuary tests $H_0$: the current premium rate is adequate. At $\alpha = 0.05$, the test rejects $H_0$ and the company increases rates. Later analysis reveals the rates were adequate all along. What type of error occurred?
>
> > [!answer]-
> > The null hypothesis was true (rates were adequate) but was rejected. This is a **Type I Error**. The probability of this occurring was $\alpha = 0.05$, i.e., there was a 5% chance of this false positive under the testing procedure.
