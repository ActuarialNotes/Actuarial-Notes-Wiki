# Answerability: Exam DISC-DA (CAS)

Run `answerability-20261031-disc-da` · 11 questions checked of 11 attempted · cost $0.50

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 9 | 82% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 1 | 9% |
| **Gap** — something the solution uses is taught on no page | 1 | 9% |

Requirements: 49 — tagged 42 (86%), linked 5 (10%), syllabus 0 (0%), prerequisite 0 (0%), elsewhere 1 (2%), missing 1 (2%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 11 | 9 | 1 | 1 (9%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### **no page for ASOP No. 12 Risk Classification** — 1 question(s)

- `discda-an-230` (definition): A risk characteristic is shown to be related to expected outcomes when variation in actual or reasonably anticipated experience correlates with the characteristic.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `discda-an-235` | Supervised Learning |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Predictive Analytics | 2 | The business decision the model will inform is settled when framing the busines…; The business decision the model will feed determines which variables may lawful… |
| Credit-Based Insurance Scoring | 1 | To find how much a group pays relative to its own indicated rate, divide the re… |
| Data Preparation | 1 | An inner join keeps only rows with matches in both tables, so units with no rel… |
| Similarity and Distance Measures | 1 | With sparse binary data where most indicators are 0, simple matching makes reco…; Euclidean distance on 0/1 coded indicators (squaring and summing differences) t… |

## Every question

<details><summary><code>discda-an-226</code> · answerable</summary>

Tagged pages: Data Segmentation, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| Unsupervised clustering such as K-means always returns clusters whether or not the data contain real subgroups, and it finds structure only… | fact | tagged | Clustering: “**Clusters are always found:** Clustering returns clusters whether or not the data contain real sub…” |
| Separation of clusters in the predictor space does not imply that the clusters differ in expected cost or loss experience, so clusters form… | fact | tagged | Clustering: “Whether they would reappear in an independent sample is a hard question, so clusters used as [[Data…” |
| A valid rating segment groups risks with similar expected costs, differs from other segments in expected cost, and is large and stable enou… | fact | tagged | Data Segmentation: “fine enough that each group's risks share similar expected costs and emergence patterns ([[Homogene…” |
| Before adopting data-driven clusters as segments, check their credibility and validate their stability on other data or time periods. | procedure | tagged | Data Segmentation: “a proposed segment still has to pass the tests above, such as homogeneity, credibility and stabilit…” |

</details>

<details><summary><code>discda-an-227</code> · answerable</summary>

Tagged pages: Clustering, Similarity and Distance Measures, K-Means Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| Euclidean distance between two observations is the square root of the sum over features of squared differences in feature values. | formula | tagged | Similarity and Distance Measures: “$$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$” |
| When features are left on their raw scales, the distance is dominated by the feature with the largest numeric spread, so that feature drive… | fact | tagged | Similarity and Distance Measures: “A raw distance is dominated by whichever feature has the largest spread in its units.” |
| Standardize features to have standard deviation one (and typically mean zero) before clustering, especially when features are measured in d… | procedure | tagged | Clustering: “whether to **standardize** the variables (to standard deviation one) depends on the application: it…” |

</details>

<details><summary><code>discda-an-228</code> · answerable</summary>

Tagged pages: Data Preparation, SQL, Table Join, Underwriting Modeling Dataset

| Item | Kind | Status | Where |
|---|---|---|---|
| The unit of observation is the entity each row of the analysis data set represents (e.g., a policy term), and the table defining those unit… | definition | tagged | Data Preparation: “For an insurance model the result has one row per unit of observation, such as a policy term or a c…” |
| An inner join keeps only rows with matches in both tables, so units with no related records (e.g., policy terms with no claims) are dropped… | fact | tagged | Data Preparation (collapsed): “An inner join of claims onto terms removes every claim-free term, so the frequency computed afterwa…” |
| A left join keeps every row of the left table and fills columns from the right table with nulls where no match exists. | fact | tagged | Table Join: “A left join keeps every row of the left table, a right join keeps every row of the right table and …” |
| To combine a one-to-many relationship at the unit level, first aggregate the many-side table (e.g., count claims by term) to one row per ke… | procedure | tagged | Data Preparation: “Summarize the "many" side to the unit of observation before joining it, such as counting claims and…” |
| After a left join, replace null aggregates for units with no matches by 0 (e.g., using COALESCE) so that counts are correct. | procedure | linked | Missing Data: “`COALESCE(column, value)` returns the first of its arguments that is not null, which substitutes a …” |
| Counting rows after a left join gives an unmatched unit a count of 1 because of its single null-filled row; counting a non-null ID column (… | fact | tagged | SQL: “`COUNT(*)` counts rows, `COUNT(col)` counts rows where `col` is not null, and `SUM`, `AVG`, `MIN` a…” |

</details>

<details><summary><code>discda-an-229</code> · answerable</summary>

Tagged pages: Data Ethics, Data Ethics Checklist

| Item | Kind | Status | Where |
|---|---|---|---|
| Consent as a data ethics principle means individuals agree to the collection and use of their data, and that agreement is tied to the speci… | definition | tagged | Data Ethics: “People should know what data are collected about them and agree to its use. Consent given for one p…” |
| Consent given for one purpose does not automatically extend to a different secondary use of the data; using data for a new purpose requires… | fact | tagged | Data Ethics: “People should know what data are collected about them and agree to its use. Consent given for one p…” |
| The Gramm-Leach-Bliley Act (GLBA) requires financial institutions, including insurers, to give privacy notices and offer opt-out rights bef… | fact | linked | Insurance Data Regulation: “An institution may not disclose that information to a nonaffiliated third party without first givin…” |
| Accountability means a named party is responsible for owning a model and its outcomes, transparency means model decisions can be explained,… | definition | tagged | Data Ethics: “Someone must own each model and its outcomes, the decisions and tests must be documented, and affec…” |

</details>

<details><summary><code>discda-an-230</code> · gap</summary>

Tagged pages: Professional Responsibilities of the Actuary, Insurance Data Regulation, Rating Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| ASOP No. 12 requires the actuary to select risk characteristics that are related to expected outcomes, such as expected cost differences. | fact | tagged | Professional Responsibilities of the Actuary: “ASOP 12 (*Risk Classification*: risk characteristics must be related to expected outcomes, though a…” |
| A risk characteristic is shown to be related to expected outcomes when variation in actual or reasonably anticipated experience correlates … | definition | missing |  |
| Under ASOP No. 12, it is not necessary to establish a cause-and-effect relationship between a risk characteristic and the expected outcome … | fact | tagged | Professional Responsibilities of the Actuary: “ASOP 12 (*Risk Classification*: risk characteristics must be related to expected outcomes, though a…” |
| ASOP No. 12 directs the actuary to consider whether applicable law limits or prohibits use of a risk characteristic, but the standard does … | fact | tagged | Professional Responsibilities of the Actuary: “ASOP 12 (*Risk Classification*: risk characteristics must be related to expected outcomes, though a…” |
| Unfair discrimination in rating refers to rates that do not reflect differences in expected cost or that rely on prohibited bases, not to c… | definition | linked | Unfair Discrimination: “charging different premiums to risks that present the **same expected cost**, or charging on a basi…” |

</details>

<details><summary><code>discda-an-231</code> · answerable</summary>

Tagged pages: Unfair Discrimination, Proxy Discrimination, Credit-Based Insurance Scoring

| Item | Kind | Status | Where |
|---|---|---|---|
| Proxy discrimination occurs when a model that excludes a protected characteristic still reproduces its effect through other inputs that are… | definition | tagged | Proxy Discrimination: “occurs when a facially neutral variable predicts the outcome partly because it is correlated with a…” |
| Excluding a protected characteristic from the model's inputs does not guarantee a non-discriminatory outcome, so a model should be assessed… | fact | tagged | Unfair Discrimination: “Testing for it means measuring the model's output across the protected groups, not only checking th…” |
| Unfair discrimination in rating is a difference in rates or premiums between groups that is not supported by a corresponding difference in … | definition | tagged | Unfair Discrimination: “charging different premiums to risks that present the **same expected cost**, or charging on a basi…” |
| Fitting a model to loss data does not ensure that premiums match loss costs for every group, so group-level premium-to-loss-cost comparison… | fact | tagged | Proxy Discrimination: “The first test is on outputs rather than inputs: compare predicted premiums, decline rates and loss…” |
| When testing reveals a premium gap for a protected group, identify the inputs driving the gap and evaluate whether they relate to loss expe… | procedure | tagged | Proxy Discrimination: “A variable whose predictive power is mostly borrowed from $z$ can be dropped or replaced by one clo…” |
| Colorado law requires insurers that use external consumer data and algorithms to test for unfairly discriminatory outcomes against protecte… | fact | linked | Insurance Data Regulation: “insurers must disclose the external data they use, keep a risk management framework to test for unf…” |
| Withdrawing from writing business in particular neighborhoods raises its own unfair discrimination concern (such as redlining) and is not t… | fact | linked | Insurance Data Regulation: “refusing, canceling or limiting a property or casualty risk solely because of its geographic locati…” |

</details>

<details><summary><code>discda-an-232</code> · answerable</summary>

Tagged pages: Credit-Based Insurance Scoring, Unfair Discrimination

| Item | Kind | Status | Where |
|---|---|---|---|
| A loss ratio relativity (indicated relativity) compares a group's expected loss ratio to the base/average; a value below 1.00 means the gro… | definition | tagged | Credit-Based Insurance Scoring: “$$\text{LR relativity}_k = \frac{\text{Loss ratio}_k}{\text{Loss ratio}_{\text{total}}}$$” |
| To find how much a group pays relative to its own indicated rate, divide the relativity actually charged by the group's indicated relativit… | procedure | tagged | Credit-Based Insurance Scoring (collapsed): “Relative to a credit-rated plan, high-score drivers pay $1.00 / 0.775 = 1.29$ times their indicated…” |
| Banning a rating variable such as credit does not remove differences in expected cost between groups; it shifts premium from higher-cost gr… | fact | tagged | Credit-Based Insurance Scoring: “A ban does not remove the cost difference; it moves it from low-score to high-score drivers.” |

</details>

<details><summary><code>discda-an-233</code> · answerable</summary>

Tagged pages: Presentation Visualization, Visualization Design Principles

| Item | Kind | Status | Where |
|---|---|---|---|
| A presentation (explanatory) chart's title should state the main finding or takeaway for the audience rather than merely describe what the … | fact | tagged | Presentation Visualization: “The purpose of a plot title is to summarize the main finding, not to describe the chart.” |
| Descriptive information such as what is plotted, the variables, and units belongs in the axis titles, labels, or subtitle rather than in th… | fact | tagged | Presentation Visualization: “so the graphic has to explain itself: a title, axis titles with units, and labels on the data rathe…” |

</details>

<details><summary><code>discda-an-234</code> · answerable</summary>

Tagged pages: Similarity and Distance Measures, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| An asymmetric binary feature is one where presence (1) is informative but absence (0) is not, so a shared absence does not indicate that tw… | definition | tagged | Similarity and Distance Measures: “For *asymmetric* binary features, where joint absence says little, such as two policies that both l…” |
| The Jaccard dissimilarity between two binary records is (c10 + c01)/(c11 + c10 + c01), the share of disagreements among features present in… | formula | tagged | Similarity and Distance Measures: “For *asymmetric* binary features, where joint absence says little, such as two policies that both l…” |
| Simple matching dissimilarity is the proportion of all binary features on which two records disagree, (c10 + c01)/(c00 + c11 + c10 + c01), … | formula | tagged | Similarity and Distance Measures: “For nominal or binary features, a common measure is the share of features on which two records disa…” |
| With sparse binary data where most indicators are 0, simple matching makes records look very similar because of the many joint absences, so… | fact | tagged | Similarity and Distance Measures (collapsed): “For rare binary features, two records that both lack a feature are not thereby similar. Jaccard ign…” |
| Euclidean distance on 0/1 coded indicators (squaring and summing differences) treats joint absences as agreement, as simple matching does, … | fact | tagged | Similarity and Distance Measures (collapsed): “For rare binary features, two records that both lack a feature are not thereby similar. Jaccard ign…” |

</details>

<details><summary><code>discda-an-235</code> · untagged</summary>

Tagged pages: Predictive Analytics, Holdout Sample

| Item | Kind | Status | Where |
|---|---|---|---|
| A supervised learning model is trained on data in which the target variable is known for each observation, and it learns to predict that ta… | definition | elsewhere | Supervised Learning: “**Supervised learning** fits a model to predict a labelled response $Y$ from predictors $X$. Every …” |
| Whether a method is supervised or unsupervised depends on whether the training data contain a known target, not on whether the cases to be … | fact | tagged | Predictive Analytics: “Pricing and claims models are supervised” |
| In-sample fit always improves as terms are added to a model, so it is a poor measure of predictive performance on new data (overfitting). | fact | tagged | Predictive Analytics: “A prediction is only as good as its out-of-sample performance: in-sample fit always improves as ter…” |
| Model performance is evaluated on data not used for fitting, using a hold-out (test) sample or cross-validation. | procedure | tagged | Holdout Sample: “A **Holdout Sample** is data deliberately kept out of model building so the finished model can be t…” |
| The business decision the model will inform is settled when framing the business problem, before data work begins, because it determines ho… | fact | tagged | Predictive Analytics (collapsed): “The **decision** the model feeds — a rate change, an underwriting referral, a non-renewal — which f…” |

</details>

<details><summary><code>discda-an-236</code> · answerable</summary>

Tagged pages: Predictive Analytics

| Item | Kind | Status | Where |
|---|---|---|---|
| A predictive modeling project begins by framing the business problem, before data are acquired, explored, or modeled. | procedure | tagged | Predictive Analytics: “The workflow the CAS PCPA requirement is built around: frame the **business problem** → select and …” |
| Framing the problem means defining the target variable precisely (e.g., highest loss ratio, claim frequency, or largest single loss), since… | procedure | tagged | Predictive Analytics: “The **target** — "worst" could mean highest loss ratio, highest claim frequency, or largest single …” |
| The unit of analysis is the level at which each observation is recorded and modeled, such as policy, vehicle, or policy-year. | definition | tagged | Predictive Analytics: “The **unit of analysis** — policy, vehicle, or policy-year.” |
| The business decision the model will feed determines which variables may lawfully or appropriately be used as predictors, so it must be set… | fact | tagged | Predictive Analytics (collapsed): “The **decision** the model feeds — a rate change, an underwriting referral, a non-renewal — which f…” |
| Model-form selection, hold-out split design, and data acquisition come after problem framing, because they depend on the target, the data r… | fact | tagged | Predictive Analytics: “frame the **business problem** → select and review the data ([[Data Quality]]) → … → split off a [[…” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
