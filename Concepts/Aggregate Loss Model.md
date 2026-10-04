---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:c99230b26a9122ffed79cc81d55b110ec55462335cf3d5eedb6a8e4965b58679
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), §1.2 Definition 1.8 and Examples 1.9-1.10 (PDF p.6-7), Fact 1.11 E[S] = E[N]E[X], Var[S] = E[N]Var[X] + Var[N]E[X]^2 = E[N]E[X^2] and the normal approximation when E[N] is large (PDF p.7-8), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.5 Aggregate Loss Models: §5.1 collective risk model, §5.3.1 E(S_N) = mu E(N), Var(S_N) = sigma^2 E(N) + mu^2 Var(N), M_S(t) = P_N[M_X(t)] and the Poisson case e^{lambda(M_X(t)-1)}, Var = lambda E(X^2), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 6 \"Model insurance claims in aggregate\" (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Aggregate Loss Model.md
---

An **Aggregate Loss Model** models the total (aggregate) losses $S$ from a portfolio as the sum of a **random number** of individual claim amounts:

> $$S = X_1 + X_2 + \cdots + X_N$$

> $$E[S] = E[N] \cdot E[X]$$

> $$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$

- $N$ is the **claim count** (frequency) random variable; $X_i$ are i.i.d. **claim severity** random variables independent of $N$
- This is called the **collective risk model**
- When $N \sim \text{Poi}(\lambda)$: $\text{Var}(S) = \lambda \cdot E[X^2]$ (simplification since $\text{Var}(N) = E[N] = \lambda$)
- When $N \sim \text{Poi}(\lambda)$: $S$ has a **compound Poisson** distribution; the MGF is $M_S(t) = \exp\!\left(\lambda(M_X(t) - 1)\right)$
- The [[Normal Distribution|Normal]] approximation via the [[Central Limit Theorem (CLT)]] applies when the portfolio is large

![[Media/Figures/Aggregate_Loss_Model.svg|340]]

> [!example]- Mean and Variance of Aggregate Losses {Example}
> A portfolio has $N \sim \text{Poi}(100)$ claims per year. Individual claim sizes $X_i$ have $E[X] = 500$ and $\text{Var}(X) = 90{,}000$. Find $E[S]$ and $\text{Var}(S)$.
>
> > [!answer]-
> > $$E[S] = E[N]\cdot E[X] = 100 \times 500 = 50{,}000$$
> > $$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2 = 100(90{,}000) + 100(500)^2 = 9{,}000{,}000 + 25{,}000{,}000 = 34{,}000{,}000$$

> [!example]- Normal Approximation for Aggregate Losses {Example}
> Using the values above, approximate $P(S > 55{,}000)$.
>
> > [!answer]-
> > $\sigma_S = \sqrt{34{,}000{,}000} \approx 5{,}831$.
> > $$Z = \frac{55{,}000 - 50{,}000}{5{,}831} \approx 0.858$$
> > $$P(S > 55{,}000) = 1 - \Phi(0.858) \approx 1 - 0.8045 = 0.1955$$
