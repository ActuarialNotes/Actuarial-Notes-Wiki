---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:804a09f776fb9a517ab68bd9b0e200a118e7b9c7d496295f72d28076ef5c1eb0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lapse.md
---

**A Lapse** is the voluntary termination of a policy because the policyholder stops paying premiums. When the policy has a cash value, the policyholder who ends it usually takes that value as a **surrender**, while a lapse in the strict sense ends the cover with nothing paid. Lapse rates are an actuarial assumption in pricing, reserving and [[Profit Testing|profit testing]], set from experience studies, and they act as a decrement beside death in a [[Multiple Decrement Model|multiple decrement model]].

> $$\hat{q}^{(w)}_t = \frac{\text{lapses in policy year } t}{\text{exposure in policy year } t}$$

> $${}_tp^{(\tau)}_x = \prod_{k=0}^{t-1}\left(1 - q^{(d)}_{x+k} - q^{(w)}_{x+k}\right)$$

> $$\begin{aligned} \mathrm{Pr}_t = {} & \left({}_{t-1}V + P - E_t\right)(1+i) - q^{(d)}_{x+t-1}\,S \\ & - q^{(w)}_{x+t-1}\,CV_t - p^{(\tau)}_{x+t-1}\,{}_tV \end{aligned}$$

- **Symbols:** $q^{(d)}$ and $q^{(w)}$ are the probabilities of death and of lapse in the year, ${}_tp^{(\tau)}_x$ is the probability that the policy is still in force at time $t$ (its persistency), and $CV_t$ is the cash value paid on a surrender at the end of year $t$. The third block is the [[Profit Vector|profit vector]] with lapses, in the notation of Dickson, Hardy & Waters, and $CV_t = 0$ for a policy with no cash value.
- **Rates by duration:** Lapse rates are usually highest in the first policy years and fall toward a lower ultimate rate as the policy ages. They jump when the premium jumps, as at the end of a level-premium term period, and they also vary with premium mode, policy size, issue age, distribution channel and, for interest-sensitive products, market interest rates.
- **Anti-selective lapsation:** Policyholders in good health can buy cover elsewhere, so they are the ones most likely to lapse, especially when the premium rises. The policies that persist then carry heavier mortality than the original block, and a large lapse assumption should come with a mortality assumption that allows for it.
- **Lapse-supported products:** A product is lapse-supported when its profit depends on policyholders lapsing, because those who leave forfeit value that pays for the benefits of those who stay. For such a product a lower lapse rate is the prudent assumption, while for a product that loses money on early termination, such as one with unrecovered acquisition costs, a higher rate is prudent. In flexible-premium [[Universal Life Insurance|universal life]], premium persistency, whether premiums keep being paid at the planned level, is a separate assumption from lapse.

> [!example]- Lapse Rates from an Experience Study {Example}
> A block of level-premium term policies shows the experience below, and the pricing basis assumed lapse rates of 10%, 8%, 6%, 5% and 4% in policy years 1 to 5. Find the actual lapse rates, the actual-to-expected (A/E) ratio for each year, and the overall A/E ratio.
>
> | Policy year | Exposure | Lapses |
> |---|---|---|
> | 1 | 10,000 | 1,150 |
> | 2 | 8,820 | 760 |
> | 3 | 8,030 | 470 |
> | 4 | 7,530 | 340 |
> | 5 | 7,160 | 250 |
>
> > [!answer]-
> > Each expected count is the exposure times the assumed rate.
> >
> > | Year | Actual rate | Expected lapses | A/E |
> > |---|---|---|---|
> > | 1 | 11.50% | 1,000.0 | 115.0% |
> > | 2 | 8.62% | 705.6 | 107.7% |
> > | 3 | 5.85% | 481.8 | 97.6% |
> > | 4 | 4.52% | 376.5 | 90.3% |
> > | 5 | 3.49% | 286.4 | 87.3% |
> >
> > Over all five years, $2{,}970 / 2{,}850.3 = 104.2\%$, so lapses look slightly higher than priced. In years 3 to 5, however, the ratio is $1{,}060 / 1{,}144.7 = 92.6\%$, and it falls with every year. If the product is lapse-supported, the shortfall at the later durations is the part that costs money, and the overall ratio hides it.

> [!example]- Lapses in a Profit Test {Example}
> A 5-year term insurance of \$100,000 on $(60)$ has a premium of \$500, expenses of 3% of each premium, initial expenses of \$250, an earned rate of 6% and SULT mortality. It holds reserves of 84, 134, 140 and 100 at the end of years 1 to 4, and with no lapses its profit vector is $(-250,\ 90.59,\ 90.45,\ 93.33,\ 89.97,\ 91.30)$ and its NPV at 10% is 93.00. Now 5% of the policies alive at the end of each of years 1 to 4 lapse, with no cash value. Find the new profit vector, the signature and the NPV.
>
> > [!answer]-
> > In year 1, $p^{(\tau)}_{60} = 0.95(0.996602) = 0.946772$, so only that fraction of policies needs the year-end reserve.
> > $$
> > \begin{align*}
> > \mathrm{Pr}_1 &= 485(1.06) - 339.80 - 0.946772(84) \\
> > &= 514.10 - 339.80 - 79.53 \\
> > &= 94.77
> > \end{align*}
> > $$
> > The same steps give the profit vector $(-250,\ 94.77,\ 97.12,\ 100.30,\ 94.95,\ 91.30)$. The probabilities of being in force at the start of years 1 to 5 are now $1$, $0.946772$, $0.896023$, $0.847617$ and $0.801428$, so the signature is $(-250,\ 94.77,\ 91.95,\ 89.87,\ 80.48,\ 73.17)$, and its NPV at 10% is 80.07.
> >
> > Each lapse releases a reserve without paying a cash value, which raises the profit per policy in force. Fewer policies stay to earn about 90 a year, though, so the NPV falls from 93.00 to 80.07. This policy profits from persistency, and it is not lapse-supported.

> [!tip]- How it appears on the exam
> - **ILA-101** asks candidates to describe and evaluate lapse and premium persistency assumptions used for different purposes, and to develop them from experience, for example by actual-to-expected ratios by duration.
> - **ALTAM** treats lapses as a decrement in profit tests, using a multiple decrement table, and for [[Universal Life Insurance|universal life]] it pays the cash value, the account value less any surrender charge, to each policy that surrenders.
> - **Sensitivity:** A question may ask how the profit vector, the signature or the NPV changes when the lapse rate changes, and whether the product is lapse-supported.

> [!warning]- Exam traps
> - **Profit vector against signature:** Lapses without a cash value raise the profit vector, because each one releases a reserve. They also shrink the in-force, so the NPV can fall even though every entry of the vector rises.
> - **Timing and order:** When lapses happen at the year end, only the survivors of the year can lapse, so $q^{(w)} = w\,p^{(d)}$ for a lapse rate $w$. Applying $w$ to every policy that started the year counts some deaths as lapses.
> - **The prudent direction:** A higher lapse rate is not always the conservative assumption. For a lapse-supported product, fewer lapses mean larger losses.
> - **One ratio for all durations:** An overall A/E ratio near 100% can hide early lapses above the assumption and later lapses below it, so the ratios should be read by duration.
