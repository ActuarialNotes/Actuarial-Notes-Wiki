---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:5d1b76d5da71c8afe9957019f72e0604c9c3f40f8e376114cc1ce9d608ff8c32
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope printed pp.3-4 (PDF pp.20-21): 'Analysis of covariance (ANCOVA) is used when at least one of the explanatory variables is continuous' and Table 1.1 (continuous response, nominal & some continuous explanatory -> ANCOVA; binary/count response with categorical & continuous -> logistic/Poisson regression); Contents PDF p.10 lists §6.5 Analysis of covariance p.132 (body not in preview), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 §2.8 'Analysis of Covariance Models', PDF pp.42-48: additive model (2.21) mu_ij = mu + alpha_i + beta x_ij, parallel lines; reference cell alpha_1 = 0; model matrix = constant + dummies (one dropped) + covariate; hierarchical anova Table 2.24 (Effort|Setting F on 2 and 16 d.f. = k-1, n-k-1); adjusted means mu + alpha_i + beta*xbar Table 2.26; different-slopes model (2.22) with alpha_1 = gamma_1 = 0, parallelism F on 2 and 14 d.f. (= k-1, n-2k) Table 2.28, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Penn State STAT 502 (online course notes), Lesson 9 'ANCOVA Part I', §9.1 covariate entered as a regression variable, treatments compared at the mean of the covariate, removes variation due to the covariate; §9.2 steps: test equal slopes (treatment x covariate interaction) first, then common-slope model with LS means at the covariate mean, else compare at three or more covariate values, sha256:02e005b021c61df817b6e7c1f86c458a016a2574ecba53f2261eaeafa04ec16c — https://online.stat.psu.edu/stat502/Lesson09.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), F-distribution table: F(2,18) upper 0.05 = 3.555 (PDF p.18); F(2,20) upper 0.05 = 3.493, 0.02 = 4.788, 0.01 = 5.849 (PDF p.19), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Dobson & Barnett Chapters 1-9 excluding 6.3.3, 6.7, 6.8 & 7.9 (so §6.5 ANCOVA is assigned), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Analysis of Covariance.md
---

**Analysis of Covariance (ANCOVA)** is a Normal [[Linear Regression|linear model]] whose explanatory variables are a categorical factor and at least one continuous variable, the **covariate**. It fits a straight line in the covariate for each level of the factor, so the levels are compared after adjusting for the covariate.

> $$\mu_{ij} = \mu + \alpha_i + \beta x_{ij}$$

> $$\mu_{ij} = (\mu + \alpha_i) + (\beta + \gamma_i)\,x_{ij}$$

- $Y_{ij} \sim N(\mu_{ij}, \sigma^2)$ is the response of unit $j$ in level $i$ of the factor, $i = 1, \ldots, k$, and $x_{ij}$ is its covariate value. The first model has a common slope $\beta$; the second gives each level its own slope $\beta + \gamma_i$.
- **Reference level:** set $\alpha_1 = 0$ (and $\gamma_1 = 0$). Then $\mu$ and $\beta$ are the intercept and slope of level 1, and $\alpha_i$ and $\gamma_i$ are level $i$'s differences in intercept and slope. In the [[Design Matrix]] this is a column of ones, $k - 1$ indicator columns for the [[Categorical Predictor|factor]] and a column for the covariate.
- **Parallel lines:** in the common-slope model the gap between level $i$ and level 1 is $\alpha_i$ at every value of $x$. The second model adds the factor-by-covariate [[Interaction]], so the gap $\alpha_i + \gamma_i x$ changes with $x$.
- **Special cases:** with $\beta = 0$ the model is one-way [[ANOVA]]; with every $\alpha_i = 0$ it is a single regression line. ANCOVA adds the covariate to an ANOVA as a regression variable, which removes the variation the covariate explains before the levels are compared.
- **Testing:** the models are nested, so each question is an [[F-Distribution|F test]] on the drop in [[Residual Sum of Squares|residual sum of squares]], the rows of a sequential ANOVA table. The common-slope model has $k + 1$ parameters and the separate-slopes model $2k$. Test parallelism ($\gamma_2 = \cdots = \gamma_k = 0$) on $(k - 1,\ n - 2k)$ df first; if it holds, test the factor adjusted for the covariate ($\alpha_2 = \cdots = \alpha_k = 0$) on $(k - 1,\ n - k - 1)$ df.
- **Adjusted means:** compare the levels at one covariate value, usually the overall mean $\bar{x}$: $\hat\mu + \hat\alpha_i + \hat\beta\bar{x}$. If the slopes differ, no single gap describes the levels, so compare them at several covariate values.
- A non-Normal response with the same mix of a factor and a continuous variable is fitted as a [[Generalized Linear Model]] (logistic or Poisson regression, for example).

> [!example]- Territory Effect on Severity After Adjusting for Vehicle Value {Example}
> An actuary models log claim severity for 24 claims, 8 from each of territories A, B and C, with vehicle value $x$ as a covariate. Four nested Normal linear models give these residual sums of squares:
>
> | Model | RSS | Residual df |
> | :--- | :--- | :--- |
> | Intercept only | 30.0 | 23 |
> | $x$ only | 18.0 | 22 |
> | $x$ + territory (common slope) | 12.0 | 20 |
> | $x$ $\times$ territory (separate slopes) | 11.1 | 18 |
>
> At the 5% level, are the territory lines parallel, and does territory matter once vehicle value is allowed for?
>
> > [!answer]-
> > **Parallelism.** The separate-slopes model adds 2 slope differences:
> >
> > $$
> > \begin{align*}
> > F &= \frac{(12.0 - 11.1)/2}{11.1/18} \\
> > &= \frac{0.45}{0.6167} \\
> > &= 0.73
> > \end{align*}
> > $$
> >
> > The CAS table's upper 5% point of $F(2, 18)$ is $3.555$. Since $0.73 < 3.555$, keep the common slope.
> >
> > **Territory, adjusted for $x$.** Compare the common-slope model with the $x$-only model, using the common-slope model's residual mean square:
> >
> > $$
> > \begin{align*}
> > F &= \frac{(18.0 - 12.0)/2}{12.0/20} \\
> > &= \frac{3.0}{0.6} \\
> > &= 5.0
> > \end{align*}
> > $$
> >
> > For $F(2, 20)$ the table gives $3.493$ (5%), $4.788$ (2%) and $5.849$ (1%). Since $5.0 > 3.493$, reject $H_0: \alpha_B = \alpha_C = 0$; the [[p-Value|p-value]] lies between 0.01 and 0.02. Territories differ in expected log severity at the same vehicle value, by the same amount at every vehicle value.

> [!example]- Adjusted Versus Raw Territory Means {Example}
> The common-slope model from the previous example is fitted with territory A as the reference level:
>
> $$\hat\mu = 7.20 + 0.25\,B + 0.40\,C + 0.030\,x$$
>
> where $B$ and $C$ are territory indicators and $x$ is vehicle value in \$000s. The territories' average vehicle values are $\bar{x}_A = 10$, $\bar{x}_B = 20$ and $\bar{x}_C = 15$, so the overall mean is $\bar{x} = 15$. Their raw average log severities are $7.50$, $8.05$ and $8.05$. Find the adjusted means and explain why territories B and C look the same in the raw data.
>
> > [!answer]-
> > Evaluate each territory's line at $\bar{x} = 15$, where $0.030 \times 15 = 0.45$:
> >
> > $$
> > \begin{align*}
> > \text{A} &= 7.20 + 0.45 \\
> > &= 7.65 \\
> > \text{B} &= 7.20 + 0.25 + 0.45 \\
> > &= 7.90 \\
> > \text{C} &= 7.20 + 0.40 + 0.45 \\
> > &= 8.05
> > \end{align*}
> > $$
> >
> > Territory B's claims come from more valuable vehicles ($\bar{x}_B = 20$), which adds $0.030 \times (20 - 15) = 0.15$ to its raw mean. With vehicle value held at 15, territory C sits $0.15$ above territory B on the log scale, a factor of $e^{0.15} \approx 1.16$ in severity, a difference the raw means hide.
