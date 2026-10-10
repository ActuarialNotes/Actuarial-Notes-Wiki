---
id: "masi-an-094"
exam: "Exam MAS-I"
topic: "Model Structure"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multi-part
bloom: create
wiki_link:
  - Concepts/Model+Structure
  - Concepts/Poisson+Regression
  - Concepts/Link+Function
  - Concepts/Offset+Variable
  - Concepts/Control+Variable
  - Concepts/Categorical+Predictor
  - Concepts/Frequency
points: 5
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2a469923045a0a656bef4a472ad3e13e742d6764fae14780fd10e8ada71410c7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-094.md
---

A commercial auto insurer will specify a GLM for claim frequency. The modelling file has one record per vehicle per accident year, 2021 to 2025, with these fields:

| Field | Description |
|---|---|
| `n_claims` | number of claims on the vehicle in the year |
| `veh_years` | earned vehicle-years, between 0.05 and 1.00 |
| `acc_year` | accident year, 2021–2025 |
| `weight_class` | light, medium, heavy, extra-heavy |
| `territory` | nine rating regions, stored as the integers 1–9 |
| `drv_exp` | the driver's years of commercial driving experience |

The rating plan will vary by weight class, territory and driver experience. It will **not** vary by accident year, but frequency rose over 2021–2025 while the book's mix shifted toward heavier vehicles. Write $v$ for a record's earned vehicle-years. Specify the model one decision at a time.

## Part a (1 point)
Choose the response distribution and link.

- A) Normal, identity link
- B) Poisson, log link
- C) Gamma, log link
- D) Binomial, logit link
- E) Tweedie with power $p$ between 1 and 2, log link

### Answer
B

### Explanation
The response, `n_claims`, is a non-negative integer count, so a Poisson response with a log link: the log link keeps fitted frequencies positive and makes the rating factors multiplicative, which is the form a rating plan takes. **C** and **E** model amounts (a Gamma cannot take the value 0), **D** models a yes/no outcome and would cap a vehicle at one claim, and **A** allows negative fitted counts.

## Part b (1 point)
Choose how earned vehicle-years enter the model.

- A) As a predictor, $\ln v$, whose coefficient is estimated
- B) As an offset equal to $v$ itself
- C) Not at all, since every record is a single vehicle
- D) As an offset equal to $\ln v$
- E) As the response, replacing the claim count

### Answer
D

### Explanation
Expected claims are proportional to exposure, $\mu_i = v_i \times \text{frequency}_i$, so on the log-link scale

$$
\ln \mu_i = \ln(v_i) + \beta_0 + \beta_1 x_{i1} + \cdots
$$

and $\ln v$ enters with its coefficient fixed at 1 — an offset. **B** puts an unlogged quantity on the log scale, which would make expected claims grow like $e^{v}$; **A** estimates a power of exposure instead of imposing proportionality; **C** ignores that a vehicle on the books for a month has a twelfth of a full year's exposure.

## Part c (1 point)
Choose how accident year enters the model.

- A) As a categorical predictor whose effect is estimated, then left out when the rating relativities are extracted
- B) Not at all, because accident year will not be a rating variable
- C) As an offset, with its coefficient fixed at 1
- D) As a categorical predictor whose relativities are multiplied into the rates
- E) As a prior weight, so that recent years count for more

### Answer
A

### Explanation
Accident year is a **control variable**: frequency trended over the period and the vehicle mix shifted with it, so leaving it out (**B**) would let part of the trend be absorbed into the weight-class relativities (heavier vehicles would look worse partly because they are concentrated in later, higher-frequency years). Its effect is estimated so the rating variables are measured net of it, then it is dropped from the rates. **C** would impose a known effect, but the trend is unknown and must be estimated; **D** contradicts the plan, which does not vary by year; **E** changes the variance of each record, not its mean, so it does not remove the trend.

## Part d (1 point)
Choose how territory enters the model.

- A) As a single numeric predictor taking the values 1–9
- B) As an offset of the territory code
- C) As nine indicator columns plus the intercept
- D) As the logarithm of the territory code
- E) As eight indicator columns, against a base territory

### Answer
E

### Explanation
Territory codes are labels (a nominal variable), so territory is a categorical predictor: with an intercept it takes 9 - 1 = 8 indicator columns, the base being, ideally, the territory with the most exposure. **A** and **D** force a smooth monotone trend across arbitrary code numbers; **C** makes the nine indicators sum to the intercept column, so the design matrix is not of full rank and one coefficient cannot be estimated; **B** fixes rather than estimates the effect.

## Part e (1 point)
Write the linear predictor of the model you have specified, naming each term, and state how weight class and driver experience should enter it.

### Explanation
A full-credit answer gives the linear predictor with every term identified and justifies the treatment of the two remaining predictors:

1. Response $N_i \sim \text{Poisson}(\mu_i)$ with a log link.
2. The offset $\ln(v_i)$, coefficient fixed at 1.
3. Accident year as four indicators against a base year (control variable).
4. Territory as eight indicators against a base territory.
5. Weight class: ordinal with four levels; entered as three indicators against a base class (the safest choice when the spacing between classes is unknown), or as a single score only if the one-way and the model output show a steady, proportional progression.
6. Driver experience: continuous; enter it as a single slope only if its effect on $\ln(\text{frequency})$ is close to linear, otherwise band it or transform it (e.g. $\ln(1 + \text{experience})$ or a polynomial), because inexperience matters most in the first few years.

**Sample answer.**

$$
\ln \mu_i = \ln(v_i) + \beta_0 + \sum_{y=2022}^{2025} \gamma_y\, I[\text{AY}_i = y] + \sum_{t=2}^{9} \tau_t\, I[\text{terr}_i = t] + \sum_{w \ne \text{light}} \omega_w\, I[\text{wt}_i = w] + \delta\, \ln(1 + \text{drv\_exp}_i)
$$

with $N_i \sim \text{Poisson}(\mu_i)$. The offset makes the $\beta$s describe frequency per vehicle-year; the $\gamma$s absorb the trend and are dropped when the rates are built; territory and weight class are categorical because their codes carry no reliable spacing; and driver experience enters through a concave transformation because frequency falls fastest over the first years of experience.
