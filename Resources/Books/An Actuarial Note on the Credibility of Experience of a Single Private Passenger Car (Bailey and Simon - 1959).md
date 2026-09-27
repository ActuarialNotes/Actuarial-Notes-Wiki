---
Title: "An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car"
Authors: "Robert A. Bailey and LeRoy J. Simon"
Publisher: "Casualty Actuarial Society"
Year: "1959"
date: "1959"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fe1fad8b44529a44eb564482a97086d378132bb993818e97a6d67569b0e44156
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (Bailey and Simon - 1959).md
---
![[An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (Bailey and Simon - 1959) - Cover.svg]]

A note using the experience of the Canadian merit rating plan for private passenger cars to evaluate the experience rating credibility of one car's experience. The Canadian experience includes virtually every insurance company operating in Canada and is collated by the Statistical Agency (Canadian Underwriters' Association—Statistical Department) under instructions from the Superintendent of Insurance. The note appeared in the Proceedings of the Casualty Actuarial Society, Vol. XLVI (1959), pp. 159–164, and W. J. Hazam's discussion of it in Vol. XLVII (1960), pp. 150–152.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives A2–A4; the paper, including the discussion of it by W. J. Hazam (PCAS XLVII, 1960, pp. 150–152)

## The Canadian merit rating data
- Merit ratings in Canada depend on the number of full years since the insured's most recent accident or since the insured became licensed: ratings A, X, Y and B correspond to three or more, two, one and no years.
- A + X is the experience for two or more accident-free years and A + X + Y for one or more; Class 1A Select, introduced effective September 1, 1959 with a five-year period, is still part of Class 1A in the data.
- Earned premiums are converted to a common rate basis — premium at present B rates — using the relationship in the rate structure that A:X:Y:B = 65:80:90:100.
- Relative claim frequency is calculated on premium rather than car years. This avoids the maldistribution created by higher claim frequency territories producing more X, Y and B risks and also higher territorial premiums.

## Credibility from the experience rating formula
- The experience rating formula commonly used, with $Z$ the credibility and $R$ the ratio of the actual losses to the expected losses:

> $$\text{Modification} = ZR + (1 - Z)$$

- If the modification is made equal to the subsequent experience of experience-rated risks relative to the average experience of all risks, and $R$ equal to the past experience on which the rating is based relative to the average of all risks, the formula can be solved for the [[Credibility|credibility]].
- For accident-free risks $R = 0$, so the credibility equals $1 - \text{Modification}$. Setting the modification equal to Table 1's relative claim frequency gives the [[Merit Rating|merit rating]] credibilities for one, two and three years in Table 2: Class 1A's modification of .920 gives a three-year credibility of .080, and Class 5 A + X + Y's .962 gives a one-year credibility of .038.

## Credibility and the variation of hazards within a class
- If the variation of individual insureds' chances for an accident were the same within each class, the credibility for [[Experience Rating|experience rating]] would be expected to vary approximately in proportion to the average claim frequency (Appendix I).
- Classes 2, 3, 4 and 5 are more narrowly defined than Class 1, and their ratios of three-year credibility to annual claim frequency are all below Class 1's — confirming the expectation that there is less variation of individual hazards in those classes.
- Credibility for experience rating therefore depends not only on the volume of data in the experience period but also on the amount of variation of individual hazards within the [[Rating Class|class]].

## Credibility for one, two and three years
- If an individual insured's chance for an accident remained constant from one year to the next and no risks left or entered the class, the credibilities for one, two and three years would be expected to vary approximately in proportion to the number of years (Appendix I).
- Experience rating is a procedure to find the deviation of an individual risk from the average risk. It differs from class ratemaking, which finds the average, and where an increase in the volume of experience increases the reliability of the indication only in proportion to the square root of the volume.
- The relative credibilities in Table 3 for two and three years are much less than 2.00 and 3.00. Risks entering and leaving the class explain part of this; all of it can be accounted for only if an individual insured's chance for an accident changes within a year and from one year to the next ([[Shifting Risk Parameters|shifting risk parameters]]), or if the distribution of individual insureds is markedly skewed, reflecting varying degrees of accident proneness.

## Credibility of the Class 1B risks
- If Class 1B risks averaged 1.044 accidents in the year before the rating (Appendix II), their credibility for a one-year experience period solves $1.476 = Z\,(1.044/.087) + 1 - Z$, giving $Z = .043$.
- This confirms the one-year credibility of .046 produced by the combined A + X + Y group.

## Losses instead of claim counts
- Tables 1–3 are based on accident frequency to reduce chance fluctuations caused by variations in the size of claims.
- B risks had an average claim cost consistently higher than average and A risks consistently lower, which tends to increase the credibility; Table 4 repeats Tables 1–3 with losses instead of numbers of claims for Class 1, which has enough volume to make the average claim cost reliable.

## Conclusions
- The experience for one car for one year has significant and measurable credibility for experience rating.
- In a highly refined private passenger rating classification system that reflects inherent hazard, there would not be much accuracy in an individual risk merit rating plan; where a wide range of hazard is encompassed within a classification, credibility is much larger.
- Adding a second year to one year's experience increases the credibility roughly two-fifths; given two years' experience, a third year increases it by one-sixth of its two-year value.

## Table 1
- Canada excluding Saskatchewan, policy years 1957 and 1958 as of June 30, 1959, private passenger automobile liability — non-farmers: earned car years, earned premium at present B rates, number of claims incurred, claim frequency per \$1,000 of premium and relative claim frequency, by merit rating (A, X, Y, B, Total, A + X, A + X + Y), for five classes.
- Class 1 — Pleasure — no male operator under 25: 3,325,714 earned car years, \$194,106,000 of premium at B rates and 288,019 claims, a claim frequency of 1.484 per \$1,000; relative claim frequencies A .920, X 1.175, Y 1.322, B 1.476, A + X .932, A + X + Y .954.
- Class 2 — Pleasure — non-principal male operator under 25: A .932, X 1.070, Y 1.153, B 1.307, A + X .940, A + X + Y .955.
- Class 3 — Business use: A .920, X 1.123, Y 1.156, B 1.362, A + X .932, A + X + Y .949.
- Class 4 — Unmarried owner or principal operator under 25: A .901, X 1.041, Y 1.041, B 1.247, A + X .915, A + X + Y .929.
- Class 5 — Married owner or principal operator under 25: A .941, X 1.084, Y 1.139, B 1.302, A + X .950, A + X + Y .962.

## Table 2
- Credibility for one, two and three years, claim frequency per car year, and the ratio of the three-year credibility to the annual claim frequency:
    - Class 1: .046, .068, .080; frequency .087; ratio .920
    - Class 2: .045, .060, .068; frequency .120; ratio .567
    - Class 3: .051, .068, .080; frequency .142; ratio .563
    - Class 4: .071, .085, .099; frequency .162; ratio .611
    - Class 5: .038, .050, .059; frequency .110; ratio .536

## Table 3
- Relative credibility — the two- and three-year credibilities relative to one year's:
    - Class 1: 1.48 and 1.74
    - Class 2: 1.33 and 1.51
    - Class 3: 1.33 and 1.57
    - Class 4: 1.20 and 1.39
    - Class 5: 1.32 and 1.55

## Table 4
- Class 1 on the basis of Table 1, with incurred losses instead of claims: loss ratios A .397, X .513, Y .563, B .686, Total .436, A + X .403, A + X + Y .412; relative loss ratios .911, 1.177, 1.291, 1.573, 1.000, .924 and .945.
- Credibility .055, .076 and .089 for one, two and three years; relative credibility 1.000, 1.38 and 1.62.

## Appendix I
- A model of 250,000 risks — 100,000 with an inherent hazard (true claim frequency) of .05, 100,000 of .10 and 50,000 of .20 — illustrates that the credibilities vary approximately in proportion to the number of years for the first few years and for typical frequencies.
- Assuming a [[Poisson Distribution|Poisson]] approximation, 226,544, 205,873 and 187,594 risks are claim-free for the past one, two and three years, and their claim frequencies in the subsequent year are .09707, .09430 and .09169, against .10000 for the whole group.
- The credibilities are .0293, .0570 and .0831; the relative credibilities 1.000, 1.945 and 2.836.
- The illustration equally shows the credibilities varying approximately in proportion to the average annual frequency, because in the Poisson distribution an increase in the annual frequency has the same effect as an increase in the length of time.

## Appendix II
- Using the Poisson distribution as an approximation to the risk distribution, $Ne^{-m}$ of $N$ persons have no claim in a year, where $m$ is the class claim frequency, so $N(1 - e^{-m})$ persons produce all $Nm$ of the group's claims; the risks with one or more claims average:

> $$\frac{m}{1 - e^{-m}}$$

- With the Class 1 claim frequency of .087 per car, risks that had one or more claims last year (Class 1B this year) averaged $.087/(1 - e^{-.087}) = 1.044$ claims.
- Another curve the authors have used in practice fits more exactly, but for theoretical considerations such as these the Poisson is a good approximation.

## Discussion by W. J. Hazam
- Presented when a large segment of the industry was embarking on merit rating programs for individual private passenger risks, the paper provides a basis for the actuarial evaluation of plans; its data are Canadian, but its conclusions are not so geographically restricted.
- Its most provocative conclusion is that the experience for one car-year has significant and measurable credibility — a fact all but lost in the prevailing opinion that merit rating was unfeasible. The paper demonstrates a means to measure the actuarial justification for experience credits for one, two, three or more claim-free years.
- A premium base eliminates the maldistribution of an exposure base only if (1) high frequency territories are also high premium territories and (2) territorial differentials are proper. Premium, though not perfect, improves on exposure; if either assumption fails, the qualitative conclusions stand, but the relative frequencies of Table 1 and the values in Tables 2 and 3 may change somewhat.
- Credibilities proportional to the number of years hold largely true only for low credibilities; even there, the actuarially accepted formula for credibility in experience rating gives theoretical relative credibilities below 1.00, 2.00 and 3.00:

> $$Z = \frac{P}{P + K}$$

- With $K = 2{,}074$, derived by assuming that 100 claims a year produce Class 1's one-year credibility of .046:
    - $100/(100 + 2{,}074) = .046$ — relative credibility 1.00, observed 1.00
    - $200/(200 + 2{,}074) = .088$ — relative credibility 1.91, observed 1.48
    - $300/(300 + 2{,}074) = .126$ — relative credibility 2.74, observed 1.74
- This should be added to the other reasons why the observed relative credibilities in Table 3 are not 1.00, 2.00 and 3.00.
- In a balanced merit rating plan there is not enough credibility by class to warrant the magnitude of credits being offered by many U.S. plans. The results rest strictly on claim frequencies, not claim plus convictions frequencies; adding convictions no doubt helps substantiate larger credits, but it is dubious that it will support current merit rating differentials if the Canadian experience is at all indicative.
- The paper sets forth a basis for analysing current U.S. plans when the data by class become available.

## Sources
- [An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959)](https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf) — the document, pp. 159–164, read from its text layer and, for the tables and equations, its page images: title, authors, the text and its footnotes, Tables 1–4 and Appendices I and II. The text on pp. 159–161 runs without headings; the seven headings above it are this page's, one per group of paragraphs, while the tables and appendices are headed as printed
- [CAS Exam 8 Content Outline, Fall 2026 (v03, June 2026)](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation, the assigned objectives, and the inclusion of Hazam's discussion
- [Discussion of the paper by W. J. Hazam (PCAS XLVII, 1960)](https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon_Discussion_of_Paper.pdf) — the discussion, pp. 150–152, read from its text layer and page images; the file's three pages also carry the end of a discussion of Tarbell's paper and the start of R. A. Bailey's discussion of Dropkin's paper, which are not part of the reading
