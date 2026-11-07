---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:23e23471e82cfd8d77010000c834b04e382acfe47ee6ebf2a323ca95755b0b90
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expected Value of Process Variance.md
---

![[Media/Figures/Expected_Value_of_Process_Variance.svg|340]]

The **Expected Value of Process Variance** (EPV), written $v$, is the average, over the risks in a portfolio, of the variance of each risk's own outcomes. With risk parameter $\Theta$, it is

> $$v = E[v(\Theta)] = E\big[\text{Var}(X \mid \Theta)\big]$$

- $v(\theta) = \text{Var}(X \mid \Theta = \theta)$ is the process variance of a risk with parameter $\theta$.

The EPV measures the randomness in each risk's results. With the [[Variance of Hypothetical Means|variance of the hypothetical means]] $a$, it gives the [[Bühlmann Credibility|Bühlmann]] parameter $k = v/a$ and the credibility $Z = n/(n + k)$. A larger EPV raises $k$ and lowers $Z$, so the estimate leans on the overall mean.

> [!example]- Half the drivers have Poisson claim counts with mean 0.10, and half with mean 0.40. What is the EPV? {Example}
> - For a Poisson risk the process variance equals its mean.
> - The EPV weights each type's process variance by its share of the portfolio: $v = 0.5(0.10) + 0.5(0.40) = 0.25$.

## Total variance

The variance of a risk drawn at random from the portfolio splits into the EPV and the VHM:

> $$\text{Var}(X) = v + a$$

> [!example]- For the drivers above, what is the variance of one driver's claim count, drawn at random? {Example}
> - $\mu = 0.25$, and $a = 0.5(0.10 - 0.25)^2 + 0.5(0.40 - 0.25)^2 = 0.0225$.
> - $\text{Var}(X) = 0.25 + 0.0225 = 0.2725$.
> - The same value comes from $E[X^2] - \mu^2 = 0.335 - 0.0625$.

## Process variance of aggregate losses

When $X$ is a year's [[Aggregate Loss Model|aggregate loss]] with Poisson claim counts of mean $\lambda(\theta)$ and claim sizes $Y$, the process variance of a risk is

> $$v(\theta) = \lambda(\theta)\,E[Y^2 \mid \theta]$$

> [!example]- A risk group has Poisson claim counts with mean 2 and claim sizes uniform on $(100, 1000)$. What is its process variance of aggregate losses? {Example}
> - $E[Y^2] = (100^2 + 100 \times 1000 + 1000^2)/3 = 370{,}000$.
> - $v(\theta) = 2 \times 370{,}000 = 740{,}000$.

In practice the EPV is estimated from data as the pooled within-risk sample variance, by [[Empirical Bayes Credibility|empirical Bayes]].
