---
id: "altam-045"
exam: "Exam ALTAM"
topic: "Traditional Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Traditional+Unit+Credit+Method
  - Concepts/Service+Table
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Accrued+Benefit
points: 8
---

(*8 points*) You are given the following information about D, who is a member of a Career Average Earnings pension plan.

- (i) On the valuation date, 1/1/2021, D is 63 years old.
- (ii) D joined the pension plan on 1/1/1998.
- (iii) On 1/1/2021 D's total past earnings are 2,400,000.
- (iv) D's salary in 2021, assuming they stay in employment for the whole year, will be 170,000.
- (v) All salaries are set on the 1<sup>st</sup> of January each year.
- (vi) Contributions are paid on the 1<sup>st</sup> of January each year.
- (vii) The accrual rate is 2%.
- (viii) The normal pension form is a single life annuity-due payable monthly.
- (ix) On death in service, the benefit is a lump sum of 4 times the annual pension that the member would have received had they retired at the time of their death.
- (x) There are no other benefits.

The valuation assumptions are:

- Decrements from active service follow the Standard Service Table.
- Exits before age 65 occur half-way through the year of age.
- $i = 0.05$
- $\ddot{a}_{63.5}^{(12)} = 13.5139$; $\ddot{a}_{64.5}^{(12)} = 13.2312$; $\ddot{a}_{65}^{(12)} = 13.0870$
- The funding method is Traditional Unit Credit.

(This is Question 5 from the Spring 2021 Written Answer exam.)

## Part a (4 points)

- (i) Calculate the Actuarial Liability for the age retirement pension for D at 1/1/2021.
- (ii) Calculate the Normal Contribution for the age retirement pension for D at 1/1/2021.

### Explanation

**i)**

$$\begin{align*}
AL_0 &= \alpha\,(TPS)_{63} \times \left\{\frac{r_{63}}{l_{63}}\,v^{0.5}\,\ddot{a}_{63.5}^{(12)} + \frac{r_{64}}{l_{63}}\,v^{1.5}\,\ddot{a}_{64.5}^{(12)} + \frac{r_{65}}{l_{63}}\,v^{2}\,\ddot{a}_{65}^{(12)}\right\} \\
&= (0.02)(2{,}400{,}000) \cdot \left\{\frac{4515}{47{,}579}\,1.05^{-0.5}(13.5139) + \frac{4061}{47{,}579}\,1.05^{-1.5}(13.2312) + \frac{38{,}488}{47{,}579}\,1.05^{-2}(13.087)\right\} \\
&= 48{,}000\,\{1.2515 + 1.0496 + 9.6022\} \\
&= 571{,}358.40
\end{align*}$$

**ii)**

$$\begin{align*}
NC &= \alpha\,S_{63} \cdot \left\{0.5\,\frac{r_{63}}{l_{63}}\,v^{0.5}\,\ddot{a}_{63.5}^{(12)} + \frac{r_{64}}{l_{63}}\,v^{1.5}\,\ddot{a}_{64.5}^{(12)} + \frac{r_{65}}{l_{63}}\,v^{2}\,\ddot{a}_{65}^{(12)}\right\} \\
&= (0.02)(170{,}000)\left\{0.5\,\frac{4515}{47{,}579}\,1.05^{-0.5}(13.5139) + \frac{4061}{47{,}579}\,1.05^{-1.5}(13.2312) + \frac{38{,}488}{47{,}579}\,1.05^{-2}(13.087)\right\} \\
&= 3{,}400\left\{\frac{1.2515}{2} + 1.0496 + 9.6022\right\} \\
&= 38{,}344
\end{align*}$$

Alternatively,

$$\begin{align*}
NC &= v\,p_{63}\,AL_1 - AL_0 + EPV(\text{mid-year retirements}) \\
&= \left(\frac{1}{1.05}\right)\left(\frac{42{,}805}{47{,}579}\right)(638{,}995.53) - 571{,}358.40 + 62{,}199.55 \\
&= 38{,}346
\end{align*}$$

where

$$\begin{align*}
AL_1 &= \alpha\,[(TPS)_{63} + S_{63}] \cdot \left\{\frac{r_{64}}{l_{64}}\,v^{0.5}\,\ddot{a}_{64.5}^{(12)} + \frac{r_{65}}{l_{64}}\,v^{1}\,\ddot{a}_{65}^{(12)}\right\} \\
&= (0.02)(2{,}570{,}000)\left\{\frac{4061}{42{,}805}\left(\frac{13.2312}{1.05^{0.5}}\right) + \frac{38{,}488}{42{,}805}\left(\frac{13.087}{1.05}\right)\right\} \\
&= 51{,}400\,\{1.22502 + 11.2068\} \\
&= 638{,}995.53
\end{align*}$$

$$\begin{align*}
EPV(\text{mid-year retirements}) &= \alpha\,[(TPS)_{63} + 0.5\,S_{63}] \cdot \left\{\frac{r_{63}}{l_{63}}\,v^{0.5}\,\ddot{a}_{63.5}^{(12)}\right\} \\
&= (0.02)\,[2{,}485{,}000]\,\{1.2515\} \\
&= 62{,}199.55
\end{align*}$$

## Part b (4 points)

- (i) Calculate the Actuarial Liability for the death in service benefit for D at 1/1/2021.
- (ii) Calculate the Normal Contribution for the death in service benefit for D at 1/1/2021.

### Explanation

**i)**

$$\begin{align*}
AL_0 &= 4\,\alpha\,(TPS)_{63} \times \left\{\frac{d_{63}}{l_{63}}\,v^{0.5} + \frac{d_{64}}{l_{63}}\,v^{1.5}\right\} \\
&= 4(0.02)(2{,}400{,}000) \times \left\{\frac{213.9}{47{,}579}\,1.05^{-0.5} + \frac{215.1}{47{,}579}\,1.05^{-1.5}\right\} \\
&= 192{,}000\,\{0.004387 + 0.004202\} \\
&= 1649.09
\end{align*}$$

**ii)**

$$\begin{align*}
NC &= 4\alpha\,S_{63} \times \left\{0.5\,\frac{d_{63}}{l_{63}}\,v^{0.5} + \frac{d_{64}}{l_{63}}\,v^{1.5}\right\} \\
&= 4(0.02)(170{,}000) \times \left\{0.5\,\frac{213.9}{47{,}579}\,1.05^{-0.5} + \frac{215.1}{47{,}579}\,1.05^{-1.5}\right\} \\
&= 13{,}600\left\{\frac{0.004387}{2} + 0.004202\right\} \\
&= 86.98
\end{align*}$$

Alternatively,

$$\begin{align*}
NC &= v\,p_{63}\,AL_1 - AL_0 + EPV(\text{mid-year deaths}) \\
&= \left(\frac{1}{1.05}\right)\left(\frac{42{,}805}{47{,}579}\right)(1008.26) - 1649.09 + 872.20 \\
&= 86.95
\end{align*}$$

where

$$\begin{align*}
AL_1 &= 4\alpha\,[(TPS)_{63} + s_{63}] \cdot \left\{\frac{d_{64}}{l_{64}}\,v^{0.5}\right\} \\
&= 4(0.02)(2{,}570{,}000)\left\{\frac{215.1}{42{,}805}\,v^{0.5}\right\} \\
&= 1008.26
\end{align*}$$

$$\begin{align*}
EPV(\text{mid-year deaths}) &= 4\alpha\,[(TPS)_{63} + 0.5\,S_{63}] \cdot \left\{\frac{r_{63}}{l_{63}}\,v^{0.5}\right\} \\
&= 4(0.02)(2{,}485{,}000)\{0.004387\} \\
&= 872.14
\end{align*}$$
