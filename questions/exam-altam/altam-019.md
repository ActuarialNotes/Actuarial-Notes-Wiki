---
id: "altam-019"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
  - Concepts/Reserve
  - Concepts/Independent+Random+Variables
points: 11
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3d0bc6f915f9736c0c517fb708127b6afcc56834c1dd6a641ff6fff26ede1e71
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-019.md
---

Person P and Person R, each age 40, buy a fully discrete, last survivor insurance with a sum insured of 100,000

You are given:

(i) Premiums are payable while at least one life is alive, for a maximum of 20 years.

(ii) Mortality of each follows the Standard Ultimate Life Table (SULT).

(iii) $i = 0.05$

(iv) With independent future lifetimes, $\ddot{a}_{40:40:\overline{20}|} = 12.9028$.

## Part a (2 points)

Show that the annual net premium assuming that the future lifetimes are independent is 620 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
The equation of value is

$$P\,\ddot{a}_{\overline{40:40}:\overline{20}|} = 100{,}000\,A_{\overline{40:40}}$$

where
$$A_{\overline{40:40}} = 2A_{40} - A_{40:40} = 0.08157$$

and
$$\ddot{a}_{\overline{40:40}:\overline{20}|} = 2\ddot{a}_{40:\overline{20}|} - \ddot{a}_{40:40:\overline{20}|} = 13.0842$$

$$\Rightarrow P = 623.42$$

### Examiner Report
**Graders' Comments:** *Candidates did very well on this part, most of them achieving full credit.*

## Part b (1 point)

State two reasons why couples may have dependent future lifetimes.

### Explanation
- **Common shock**: both lives may die at the same time, e.g. as a result of an accident.
- **Common lifestyle**: couples tend to share a common lifestyle, e.g. healthy (exercising) or unhealthy (smoking) habits.
- **Broken heart syndrome**: mortality may increase temporarily after the death of one's partner.

### Examiner Report
**Graders' Comments:** *Almost all candidates stated at least one valid reason, and most candidates received full credit for this part.*

## Part c (3 points)

The insurer decides that premiums and policy values for this policy will be determined using a mortality model incorporating dependency.

You are given the following information about this model:

(i) The future lifetimes for the first 20 years are not independent.

(ii) If both lives survive 20 years, it is assumed that the future lifetimes from that time will be independent, and will follow the Standard Ultimate Life Table.

(iii) The mortality of each of P and R, individually, follows the Standard Ultimate Life Table, whether the other is alive or dead.

(iv) $\ddot{a}_{40:40:\overline{10}|} = 8.0703$; $\ddot{a}_{40:40:\overline{20}|} = 12.9254$; ${}_{20}E_{40:40} = 0.35912$; ${}_{10}E_{50:50} = 0.59290$.

(v) $A_{\overline{50:50}} = 0.13441$

(vi) ${}_{10}p_{40:40} = 0.9866$, ${}_{10}p_{\overline{40:40}} = 0.9980$

Use the dependent mortality model for the rest of this question.

(i) Show that $A_{40:40} = 0.158$ to the nearest 0.001. You should calculate the value to the nearest 0.0001.

(ii) Show that ${}_{10}E_{40:40} = 0.606$ to the nearest 0.01. You should calculate the value to the nearest 0.0001.

(iii) Show that $\ddot{a}_{50:50:\overline{10}|} = 8.02$ to the nearest 0.01. You should calculate the value to the nearest 0.0001.

### Explanation
(i)
$$A_{40:40} = 1 - d\,\ddot{a}_{40:40}$$

$$\ddot{a}_{40:40} = \ddot{a}_{40:40:\overline{20}|} + {}_{20}E_{40:40}\,\ddot{a}_{60:60}^{\text{SULT}} = 17.6836$$

$$\Rightarrow A_{40:40} = 1 - \frac{0.05}{1.05}(17.6836) = 0.15792$$

(ii)
$${}_{20}E_{40:40} = {}_{10}E_{40:40} \times {}_{10}E_{50:50} \Rightarrow {}_{10}E_{40:40} = \frac{0.35912}{0.59290} = 0.60570$$

(iii)
$$\ddot{a}_{40:40:\overline{20}|} = \ddot{a}_{40:40:\overline{10}|} + {}_{10}E_{40:40}\,\ddot{a}_{50:50:\overline{10}|} \Rightarrow \ddot{a}_{50:50:\overline{10}|} = \frac{12.9254 - 8.0703}{0.60570} = 8.0157$$

### Examiner Report
**Graders' Comments:** *Performance on this part was mixed. Many candidates did not correctly incorporate the independent SULT functions applying after 20 years, and some did not identify or utilize the relationship between the A and ä functions.*

## Part d (1 point)

Show that the annual net premium is 645 to the nearest 5. You should calculate the value to the nearest 0.1.

### Explanation
We now have

$$A_{\overline{40:40}} = 2A_{40} - A_{40:40} = 0.08420$$

$$\ddot{a}_{\overline{40:40}:\overline{20}|} = 2\ddot{a}_{40:\overline{20}|} - \ddot{a}_{40:40:\overline{20}|} = 13.0616$$

$$\Rightarrow P = 644.62$$

## Part e (3 points)

Let ${}_kL$ denote the net future loss random variable at time $k$ for the insurance.

(i) Calculate $E\left[{}_{10}L\right]$ given that only P is alive at time 10.

(ii) Calculate $E\left[{}_{10}L\right]$ given that both P and R are alive at time 10.

(iii) Calculate $E\left[{}_{10}L\right]$ given that at least one of P and R is alive at time 10.

### Explanation
(i)
$$\begin{align*}
\mathrm{E}\left[{}_{10}L \mid \text{only 1 life alive}\right] &= 100{,}000\,A_{50} - P\,\ddot{a}_{50:\overline{10}|} \\
&= 13{,}738.6
\end{align*}$$

(ii)
$$\mathrm{E}\left[{}_{10}L \mid \text{both alive}\right] = 100{,}000\,A_{\overline{50:50}} - P\,\ddot{a}_{\overline{50:50}:\overline{10}|} = 8{,}223.3$$

(iii)
$$\mathrm{E}\left[{}_{10}L \mid \text{at least 1 alive}\right] = \frac{\mathrm{E}\left[{}_{10}L \mid \text{only 1 life alive}\right] \times \Pr\left[\text{only 1 life alive}\right] + \mathrm{E}\left[{}_{10}L \mid \text{both alive}\right] \times \Pr\left[\text{both alive}\right]}{\Pr\left[\text{at least one alive}\right]}$$

$$\Pr\left[\text{Both alive}\right] = {}_{10}p_{40:40} = 0.9866$$

$$\Pr[\text{only 1 alive}] = {}_{10}p_{\overline{40:40}} - {}_{10}p_{40:40} = 0.0114$$

$$\Pr\left[\text{At least 1 alive}\right] = {}_{10}p_{\overline{40:40}} = 0.998$$

$$\Rightarrow \mathrm{E}\left[{}_{10}L \mid \text{at least 1 alive}\right] = 8{,}286.2$$

### Examiner Report
**Graders' Comments:** *Most candidates found this part challenging. Many received at least partial credit for (i) and (ii). Only a few candidates received full credit for part (iii).*

## Part f (1 point)

Because the insurer is not informed of the first death for these policies, the actuary decides that they should hold the same reserve for all policies in force. Explain which, if any, of the policy values in part (e) would be a suitable value for the time 10 reserve for each in-force policy.

(LTAM, Spring 2019, Question 4)
(This is Question 4 from the Spring 2019 Written Answer exam.)

### Explanation
The policy value used should correspond most closely with the information available. The insurance company knows that no claim has been made, so it knows that both lives have not died, but it does not know whether one or both lives are alive. Correspondingly, it should hold the reserve based on the policy value in (iii), which is suitable for the information that at least one life has survived. For each individual policy, this will be the wrong number – the correct number will either be the value in (i) or the value in (ii), but overall the value in (iii) will be most accurate in aggregate.

### Examiner Report
**Graders' Comments:** *Only the stronger candidates correctly identified the most suitable value for the policy value and provided an adequate explanation.*
