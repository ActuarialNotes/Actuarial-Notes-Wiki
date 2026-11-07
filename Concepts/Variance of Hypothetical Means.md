---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:c458b937e6be687820b579d5b9ae9cd47877935e5f00b3e7240ef02b0771ef0e
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance of Hypothetical Means.md
---

![[Media/Figures/Variance_of_Hypothetical_Means.svg|340]]

The **Variance of Hypothetical Means** (VHM), written $a$, is the variance, across the risks in a portfolio, of each risk's expected outcome. With risk parameter $\Theta$, it is

> $$a = \text{Var}\big(\mu(\Theta)\big)$$

- $\mu(\theta) = E[X \mid \Theta = \theta]$ is the hypothetical mean, the long-run mean of a risk with parameter $\theta$.

The overall mean is $\mu = E[\mu(\Theta)]$. The VHM measures how much the true risk levels differ from one another. With the [[Expected Value of Process Variance|expected value of the process variance]] $v$, it gives the [[Bühlmann Credibility|Bühlmann]] parameter $k = v/a$ and the credibility $Z = n/(n + k)$. A larger VHM lowers $k$ and raises $Z$, so experience rating is most useful in a heterogeneous class. When $a = 0$ every risk has the same mean, and $Z = 0$ for any $n$.

> [!example]- Half the drivers have Poisson claim counts with mean 0.10, and half with mean 0.40. What is the VHM? {Example}
> - The hypothetical means are 0.10 and 0.40, so $\mu = 0.25$.
> - $a = 0.5(0.10 - 0.25)^2 + 0.5(0.40 - 0.25)^2 = 0.0225$.
> - With $v = 0.25$, $k = 0.25/0.0225 = 11.1$.

## Poisson claim counts with a gamma mean

When claim counts are Poisson with mean $\Lambda$, and $\Lambda$ has a gamma distribution with shape $\alpha$ and scale $\beta$, the hypothetical mean and process variance are both $\Lambda$, so

> $$k = \frac{v}{a} = \frac{\alpha\beta}{\alpha\beta^2} = \frac{1}{\beta}$$

The shape $\alpha$ cancels, so $Z = n/(n + 1/\beta)$ does not depend on it. Written with its rate $1/\beta$, the gamma's mean is $\alpha$ divided by the rate and its variance $\alpha$ divided by the rate squared, and $k$ is the rate.

> [!example]- Claim counts are Poisson with mean $\Lambda$, where $\Lambda$ is gamma with $\alpha = 4$ and $\beta = 0.05$. What are $\mu$, $v$, $a$ and $k$? {Example}
> - $\mu = v = E[\Lambda] = 4(0.05) = 0.20$.
> - $a = \text{Var}(\Lambda) = 4(0.05)^2 = 0.01$.
> - $k = 0.20/0.01 = 20 = 1/\beta$.
