A **Type I Error** occurs when a [[Hypothesis Testing|hypothesis test]] incorrectly **rejects a true null hypothesis** $H_0$. It is also called a **false positive**.

> $$\alpha = P(\text{Reject } H_0 \mid H_0 \text{ is true})$$

- $\alpha$ is the **significance level** of the test, chosen by the analyst before testing (commonly 0.05 or 0.01)
- A smaller $\alpha$ makes Type I errors rarer but increases the risk of a [[Type II Error]]
- The **critical region** is constructed so that $P(\text{test statistic in critical region} \mid H_0) = \alpha$
- In actuarial contexts, a Type I Error might mean incorrectly concluding that a rate change is needed when it is not

> [!example]- Identifying a Type I Error in Ratemaking {Example}
> An actuary tests $H_0$: the current premium rate is adequate. At $\alpha = 0.05$, the test rejects $H_0$ and the company increases rates. Later analysis reveals the rates were adequate all along. What type of error occurred?
>
> > [!answer]-
> > The null hypothesis was true (rates were adequate) but was rejected. This is a **Type I Error**. The probability of this occurring was $\alpha = 0.05$, i.e., there was a 5% chance of this false positive under the testing procedure.
