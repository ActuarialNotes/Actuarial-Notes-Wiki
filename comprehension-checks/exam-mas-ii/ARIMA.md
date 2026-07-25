---
concept: "ARIMA"
exam: exam-mas-ii
topic: "D. Time Series with Constant Variance"
correct: B
---
A series drifts steadily upward over time, so it is not stationary. Which order in $\text{ARIMA}(p,d,q)$ handles that, and how?

- A) $p$ — enough autoregressive lags will absorb a trend
- B) $d$ — differencing the series removes the trend
- C) $q$ — moving-average terms average the trend away
- D) None of them; the trend has to be stripped out before an ARIMA model can be fitted at all

<!-- rationale: 0: treats AR order as a cure for non-stationarity, when AR terms presuppose it · 2: confuses smoothing the error process with removing a trend in the level · 3: misses that the "I" is precisely the built-in detrending step -->
