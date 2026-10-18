---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:19be90c1d06088e95e11bdcd95aeb8bf7950eaf65bc4a55e304eae897f014836
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §5.4 Exercise 2(c), printed p.219 (PDF p.228), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Out-of-Bag Error.md
---

**Out-of-bag (OOB) error** is a free test-error estimate for [[Bagging|bagged]] models. Each [[Bootstrap|bootstrap]] resample leaves out about a third of the observations; each observation is predicted using only the trees that did not see it, and those predictions are scored.

> $$P(\text{observation } i \notin \text{ resample } b) = \left(1 - \frac{1}{n}\right)^{n} \xrightarrow[n\to\infty]{} e^{-1} \approx 0.368$$

- Each observation is out-of-bag for roughly $0.368B$ of the $B$ trees; averaging those trees' predictions gives $\hat y_i^{\text{oob}}$, and the OOB MSE or error rate follows
- It requires **no extra fitting** — the estimate falls out of the fit that was happening anyway
- With $B$ large it is essentially equivalent to leave-one-out [[Cross-Validation]], at a fraction of the cost
- Only defined for methods that resample; a single [[Decision Tree]] or a [[Boosting|boosted]] model has no OOB estimate
- Slightly **pessimistic** for small $B$: each prediction uses only ~37% of the forest, so a 100-tree forest's OOB error overstates the error of the full 100-tree model

![[Media/Figures/Out-of-Bag_Error.svg|340]]

> [!example]- OOB Coverage {Example}
> A random forest with $B = 600$ trees is fitted to $n = 4{,}000$ claims. About how many trees contribute to the OOB prediction of a single claim, and why does the estimate need no held-out data?
>
> > [!answer]-
> > $$0.368 \times 600 \approx 221 \text{ trees}$$
> > Those 221 trees were fitted on resamples that never contained the claim, so their averaged prediction for it is genuinely out-of-sample. Every claim gets its own such subset, and the average of the 4,000 errors is an honest test-error estimate — the bootstrap has built the holdout for free.
