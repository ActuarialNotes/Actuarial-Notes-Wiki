---
id: "masii-2019s-systolic"
exam: "Exam MAS-II"
title: "Systolic Blood Pressure Case Study"
year: 2019
session: Spring
source: "CAS Exam MAS-II, Spring 2019 — supplemental material"
---

The case study examines the change in systolic blood pressure from three different
treatments with the study conducted in 20 different hospitals. The patients included in
the study had varying ages, but in all cases the study was conducted over a one year time
period and all patients that began the study were included in the final study results. The
question the study was intended to respond to is what is the effect of the three different
treatments on systolic blood pressure and does that effect vary by age of the patient.

## B. Exploratory Data Output

```
##     Treament            hospital         Age          end_systolic
##  Min.   :0.0000    1      : 100    Min.   :50.00   Min.   : 58.18
##  1st Qu.:0.0000    2      : 100    1st Qu.:55.00   1st Qu.:111.30
##  Median :1.0000    3      : 100    Median :62.00   Median :131.29
##  Mean   :0.9709    4      : 100    Mean   :60.96   Mean   :131.32
##  3rd Qu.:2.0000    5      : 100    3rd Qu.:65.00   3rd Qu.:149.86
##  Max.   :2.0000    6      : 100    Max.   :71.00   Max.   :224.16
##                    (Other):1499
##   beg_systolic     change_systolic   Treatment  norm_change_systolic
##  Min.   : 62.69   Min.   :-8.3653    0:639     Min.   :-2.7802
##  1st Qu.:111.73   1st Qu.:-2.6882    1:882     1st Qu.:-0.7140
##  Median :131.56   Median :-1.1343    2:578     Median :-0.1484
##  Mean   :132.05   Mean   :-0.7265              Mean   : 0.0000
##  3rd Qu.:149.42   3rd Qu.: 0.9967              3rd Qu.: 0.6272
##  Max.   :216.95   Max.   : 9.0491              Max.   : 3.5579
##
```

```
## # A tibble: 2,099 x 8
##    Treament hospital   Age end_systolic beg_systolic change_systolic
##       <int> <fct>    <int>        <dbl>        <dbl>           <dbl>
##  1        0 0           71         188.         189.          -1.29
##  2        1 0           61         124.         126.          -1.81
##  3        2 0           64         143.         140.           3.10
##  4        0 0           54         103.         105.          -2.56
##  5        2 0           67         162.         158.           4.13
##  6        1 0           65         146.         146.           0.333
##  7        1 0           64         143.         143.           0.839
##  8        2 0           61         131.         128.           2.64
##  9        0 0           70         174.         175.          -1.28
## 10        1 0           70         181.         179.           1.33
##    Treatment norm_change_systolic
##    <fct>                    <dbl>
##  1 0                       -0.204
##  2 1                       -0.395
##  3 2                        1.39
##  4 0                       -0.668
##  5 2                        1.77
##  6 1                        0.386
##  7 1                        0.570
##  8 2                        1.22
##  9 0                       -0.200
## 10 1                        0.748
## # ... with 2,089 more rows
```

![Two box plots: change in systolic blood pressure by patient age, with medians rising steadily and close to linearly from about -3 at age 50 to about +1 at age 71 and box heights broadly similar across ages; and change in systolic by treatment, where treatments 0 and 1 sit below zero with medians near -2 and -1.5 while treatment 2 sits entirely above zero with a median near 3](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-eda-1.png)

![Two box plots: change in systolic blood pressure by hospital, with all 21 hospitals showing similar medians just below zero and similar spread; and change in systolic by hospital separated by treatment](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-eda-2.png)

![A scatter plot of change in systolic against age with points marked by treatment 0, 1 and 2, showing an upward drift with age and treatment 2 sitting highest; and a box plot of change in systolic by age separated into three panels, one per treatment, each rising with age](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-eda-3.png)

![QQ plot for change in systolic: standardized residuals against the standard normal distribution, following the reference line closely through the middle with mild departures at both tails](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-eda-4.png)

## C. Results of Fitting Models

### C.1 — Create Model 1

Fit model via REML and assume that change in systolic is a function of two main effects:
patient age and treatment. Include hospital as a random effect. Assume constant variance.

```
## Linear mixed-effects model fit by REML
##   Data: systolic_g
##        AIC      BIC    logLik
##   7327.429 7361.313 -3657.715
##
## Random effects:
##  Formula: ~1 | hospital
##         (Intercept) Residual
## StdDev:   0.4262212 1.361067
##
## Fixed effects: change_systolic ~ Treatment + Age
##                  Value Std.Error   DF   t-value p-value
## (Intercept) -12.487130 0.3181821 2075 -39.24523       0
## Treatment1    0.654929 0.0709604 2075   9.22950       0
## Treatment2    5.024052 0.0784480 2075  64.04309       0
## Age           0.165733 0.0049154 2075  33.71726       0
##
##             numDF denDF   F-value p-value
## (Intercept)     1  2075   55.3061  <.0001
## Treatment       2  2075 2521.6816  <.0001
## Age             1  2075 1136.8534  <.0001
##
## Number of Observations: 2099
## Number of Groups: 21
```

![Model_1 diagnostics: standardized residuals against fitted systolic change, showing a broad even band with no funnelling; and standardized residuals against treatment, showing three vertical strips of similar height](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model1-resid-1.png)

![Model_1 diagnostics: standardized residuals against patient age, showing vertical strips of similar height at every age from 50 to 71; and a QQ plot of standardized residuals following the reference line closely with one low outlier near -4](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model1-resid-2.png)

### C.2 — Create Model 2

Fit model via restricted maximum likelihood and assume that change in systolic is a
function of two main effects: patient age and treatment. Include hospital as a random
effect. Assume constant variance.

```
## Linear mixed-effects model fit by maximum likelihood
##   Data: systolic_g
##        AIC     BIC    logLik
##   7308.765 7342.66 -3648.382
##
## Random effects:
##  Formula: ~1 | hospital
##         (Intercept) Residual
## StdDev:   0.4148813 1.360086
##
## Fixed effects: change_systolic ~ Treatment + Age
##                  Value Std.Error   DF   t-value p-value
## (Intercept) -12.488019 0.3175521 2075 -39.32589       0
## Treatment1    0.654856 0.0709757 2075   9.22648       0
## Treatment2    5.023998 0.0784647 2075  64.02879       0
## Age           0.165748 0.0049164 2075  33.71350       0
##  Correlation:
##            (Intr) Trtmn1 Trtmn2
## Treatment1 -0.137
## Treatment2 -0.100  0.525
## Age        -0.943  0.008 -0.018
##
## Standardized Within-Group Residuals:
##          Min           Q1          Med           Q3          Max
## -4.220719085 -0.669274492  0.004643611  0.695385460  3.559238300
##
## Number of Observations: 2099
## Number of Groups: 21
##
##             numDF denDF   F-value p-value
## (Intercept)     1  2075   57.9706  <.0001
## Treatment       2  2075 2520.5690  <.0001
## Age             1  2075 1136.6000  <.0001
```

![Model_2 diagnostics: standardized residuals against fitted systolic change; and standardized residuals against treatment](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model2-resid-1.png)

![Model_2 diagnostics: standardized residuals against patient age; and a QQ plot of standardized residuals](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model2-resid-2.png)

### C.3 — Create Model 3

Fit model via maximum likelihood and assume that change in systolic is a function of two
main effects and include an interaction effect: patient age and treatment. Include
hospital as a random effect. Assume constant variance.

```
## Linear mixed-effects model fit by REML
##   Data: systolic_g
##        AIC      BIC   logLik
##   7345.421 7390.592 -3664.71
##
## Random effects:
##  Formula: ~1 | hospital
##         (Intercept) Residual
## StdDev:   0.4261245  1.36164
##
## Fixed effects: change_systolic ~ Treatment + Age + Treatment * Age
##                     Value Std.Error   DF    t-value p-value
## (Intercept)    -12.383800 0.5482496 2073 -22.587888  0.0000
## Treatment1       0.638400 0.7128276 2073   0.895588  0.3706
## Treatment2       4.672223 0.7881578 2073   5.928030  0.0000
## Age              0.164038 0.0088235 2073  18.591054  0.0000
## Treatment1:Age   0.000267 0.0116514 2073   0.022920  0.9817
## Treatment2:Age   0.005757 0.0128419 2073   0.448268  0.6540
##  Correlation:
##                (Intr) Trtmn1 Trtmn2 Age    Trt1:A
## Treatment1     -0.746
## Treatment2     -0.674  0.518
## Age            -0.981  0.753  0.680
## Treatment1:Age  0.742 -0.995 -0.514 -0.756
## Treatment2:Age  0.672 -0.516 -0.995 -0.685  0.518
##
## Standardized Within-Group Residuals:
##         Min          Q1         Med          Q3         Max
## -4.21106656 -0.66702337  0.00195741  0.69141317  3.54297491
##
## Number of Observations: 2099
## Number of Groups: 21
##
##               numDF denDF   F-value p-value
## (Intercept)       1  2073   55.3245  <.0001
## Treatment         2  2073 2519.5614  <.0001
## Age               1  2073 1135.9036  <.0001
## Treatment:Age     2  2073    0.1305  0.8777
```

![Model_3 diagnostics: standardized residuals against fitted systolic change; and standardized residuals against treatment](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model3-resid-1.png)

![Model_3 diagnostics: standardized residuals against patient age; and a QQ plot of standardized residuals](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model3-resid-2.png)

### C.4 — Create Model 4

Fit model via maximum likelihood and assume that change in systolic is a function of two
main effects: patient age and treatment. Include hospital as a random effect. Assume
constant variance.

```
## Linear mixed-effects model fit by maximum likelihood
##   Data: systolic_g
##        AIC      BIC    logLik
##   7312.503 7357.697 -3648.252
##
## Random effects:
##  Formula: ~1 | hospital
##         (Intercept) Residual
## StdDev:   0.4147901 1.360003
##
## Fixed effects: change_systolic ~ Treatment + Age + Treatment * Age
##                     Value Std.Error   DF    t-value p-value
## (Intercept)    -12.385084 0.5479691 2073 -22.601792  0.0000
## Treatment1       0.639184 0.7129802 2073   0.896496  0.3701
## Treatment2       4.672374 0.7883255 2073   5.926961  0.0000
## Age              0.164059 0.0088253 2073  18.589618  0.0000
## Treatment1:Age   0.000253 0.0116539 2073   0.021708  0.9827
## Treatment2:Age   0.005753 0.0128446 2073   0.447909  0.6543
##  Correlation:
##                (Intr) Trtmn1 Trtmn2 Age    Trt1:A
## Treatment1     -0.747
## Treatment2     -0.674  0.518
## Age            -0.981  0.753  0.680
## Treatment1:Age  0.742 -0.995 -0.514 -0.756
## Treatment2:Age  0.672 -0.516 -0.995 -0.685  0.518
##
## Standardized Within-Group Residuals:
##          Min           Q1          Med           Q3          Max
## -4.216841053 -0.668376991  0.001482204  0.692266958  3.545667320
##
## Number of Observations: 2099
## Number of Groups: 21
##
##               numDF denDF   F-value p-value
## (Intercept)       1  2073   57.9389  <.0001
## Treatment         2  2073 2518.4700  <.0001
## Age               1  2073 1135.6550  <.0001
## Treatment:Age     2  2073    0.1306  0.8776
```

![Model_4 diagnostics: standardized residuals against fitted systolic change; and standardized residuals against treatment](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model4-resid-1.png)

![Model_4 diagnostics: standardized residuals against patient age; and a QQ plot of standardized residuals](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model4-resid-2.png)

### C.5 — Create Model 5

Fit model via restricted maximum likelihood and assume that change in systolic is a
function of two main effects: patient age and treatment. Include hospital as a random
effect. Assume variance is a function of patient age.

```
## Linear mixed-effects model fit by REML
##   Data: systolic_g
##        AIC      BIC    logLik
##   7328.156 7367.687 -3657.078
##
## Random effects:
##  Formula: ~1 | hospital
##         (Intercept) Residual
## StdDev:   0.427332 1.139657
##
## Combination of variance functions:
##  Structure: Exponential of variance covariate
##  Formula: ~Age/2
##  Parameter estimates:
##      expon
## 0.00581435
## Fixed effects: change_systolic ~ Treatment + Age
##                  Value  Std.Error   DF  t-value p-value
## (Intercept) -12.453354 0.31578612 2075 -39.43604       0
## Treatment1    0.654950 0.07089656 2075   9.23811       0
## Treatment2    5.023061 0.07842213 2075  64.05157       0
## Age           0.165182 0.00488987 2075  33.78050       0
##  Correlation:
##            (Intr) Trtmn1 Trtmn2
## Treatment1 -0.137
## Treatment2 -0.101  0.525
## Age        -0.940  0.007 -0.018
##
## Standardized Within-Group Residuals:
##          Min           Q1          Med           Q3          Max
## -4.179745856 -0.679512321  0.002767709  0.698735726  3.512537373
##
## Number of Observations: 2099
## Number of Groups: 21
##
##             numDF denDF   F-value p-value
## (Intercept)     1  2075   60.8281  <.0001
## Treatment       2  2075 2521.8727  <.0001
## Age             1  2075 1141.1222  <.0001
```

![Model_5 diagnostics: standardized residuals against fitted systolic change; and standardized residuals against treatment](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model5-resid-1.png)

![Model_5 diagnostics: standardized residuals against patient age, with strips of broadly similar height across the age range; and a QQ plot of standardized residuals](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model5-resid-2.png)

### C.6 — Create Model 6

Fit model via maximum likelihood and assume that change in systolic is a function of two
main effects: patient age and treatment. Include hospital as a random effect. Assume
variance is a function of patient age.

```
## Linear mixed-effects model fit by maximum likelihood
##   Data: systolic_g
##        AIC      BIC    logLik
##   7309.484 7349.028 -3647.742
##
## Random effects:
##  Formula: ~1 | hospital
##         (Intercept) Residual
## StdDev:   0.4159726 1.138249
##
## Combination of variance functions:
##  Structure: Exponential of variance covariate
##  Formula: ~Age/2
##  Parameter estimates:
##      expon
## 0.005831218
## Fixed effects: change_systolic ~ Treatment + Age
##                  Value  Std.Error   DF  t-value p-value
## (Intercept) -12.454165 0.31514020 2075 -39.51944       0
## Treatment1    0.654879 0.07091161 2075   9.23514       0
## Treatment2    5.023004 0.07843874 2075  64.03728       0
## Age           0.165196 0.00489079 2075  33.77698       0
##  Correlation:
##            (Intr) Trtmn1 Trtmn2
## Treatment1 -0.137
## Treatment2 -0.101  0.525
## Age        -0.942  0.007 -0.018
##
## Standardized Within-Group Residuals:
##          Min           Q1          Med           Q3          Max
## -4.183346230 -0.680588398  0.003433337  0.698196584  3.513372530
##
## Number of Observations: 2099
## Number of Groups: 21
##
##             numDF denDF   F-value p-value
## (Intercept)     1  2075   63.7766  <.0001
## Treatment       2  2075 2520.7572  <.0001
## Age             1  2075 1140.8843  <.0001
```

![Model_6 diagnostics: standardized residuals against fitted systolic change; and standardized residuals against treatment](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model6-resid-1.png)

![Model_6 diagnostics: standardized residuals against patient age; and a QQ plot of standardized residuals](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masii-2019s-case-model6-resid-2.png)
