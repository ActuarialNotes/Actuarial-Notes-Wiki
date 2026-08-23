---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e63cf0c5c6d71198dc7458e8981e85abe125d211ec71b6cc27fad8bc5547f192
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Partial Autocorrelation Function.md
---

The **partial autocorrelation function (PACF)** gives the correlation between $Y_t$ and $Y_{t-k}$ **after removing the effect of the intervening lags** $Y_{t-1}, \dots, Y_{t-k+1}$. It is what separates a direct dependence at lag $k$ from one inherited through the lags in between.

> $$\phi_{kk} = \mathrm{Corr}\!\left(Y_t, Y_{t-k} \mid Y_{t-1}, \dots, Y_{t-k+1}\right)$$
>
> $$\phi_{kk} = \text{the } k\text{-th coefficient in an AR}(k) \text{ fit}$$

- The problem it solves: in an AR(1) with $\phi = 0.8$, the [[Autocorrelation Function|ACF]] at lag 2 is $0.64$ — not because $Y_{t-2}$ matters directly, but because it acted through $Y_{t-1}$. The PACF at lag 2 is 0, correctly reporting no direct link
- **The identification rule, the mirror of the ACF's:** an AR($p$) process has PACF **cutting off** after lag $p$; an MA($q$) has a PACF that **tails off**
- Same significance bands, $\pm 1.96/\sqrt{n}$
- $\phi_{11} = \rho_1$ always; the two functions agree at lag 1 and diverge after
- Read together with the ACF, the pair identifies the model:

| | ACF | PACF |
| :--- | :--- | :--- |
| AR($p$) | tails off | **cuts off after $p$** |
| MA($q$) | **cuts off after $q$** | tails off |
| ARMA($p,q$) | tails off | tails off |

![[Media/Figures/Partial_Autocorrelation_Function.svg|340]]

> [!example]- ACF and PACF Together {Example}
> A stationary series of 100 observations has ACF 0.71, 0.48, 0.35, 0.24, 0.17 (a smooth geometric decay) and PACF 0.71, −0.05, 0.08, 0.02, −0.03. Identify the model.
>
> > [!answer]-
> > Bands: $\pm 0.196$. The ACF decays geometrically and stays significant for several lags — **tailing off**. The PACF has one significant spike at lag 1 and nothing after — **cutting off at 1**.
> > **AR(1)**, with $\hat\phi_1 \approx 0.71$. Consistent: the ACF of an AR(1) is $\rho_k = \phi^k$, and $0.71^2 = 0.50 \approx 0.48$, $0.71^3 = 0.36 \approx 0.35$ ✓
