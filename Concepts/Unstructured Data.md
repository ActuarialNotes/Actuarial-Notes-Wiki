---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7edf238ef268b4f3b76a401a70622879da8afa72735feefcca0e7fa4f3bfa317
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unstructured Data.md
---

**Unstructured data** is information with no predefined data model — free text, images, audio, video — so it cannot be stored as rows of observations and columns of [[Data Types|typed variables]] until features are extracted from it. **Structured data** already has that shape: a fixed schema of records and fields, such as a policy table ([[Tidy Data]]). Between them, **semi-structured** data (JSON, XML, an email's header fields) carries tags that label its pieces but fits no single table.

> $$\mathbf{X} = \left[x_{ij}\right]_{n \times p}$$
>
> $$x_{ij} = \text{number of times term } j \text{ appears in document } i$$
>
> $$w_{ij} = \frac{x_{ij}}{\sum_{l=1}^{p} x_{il}} \cdot \ln\frac{n}{\text{df}_j}$$

- $\mathbf{X}$ is the **document-term matrix** that turns a set of $n$ text records (claim notes, underwriter comments, complaint emails) into a structured table with one column per term in a vocabulary of size $p$. $\text{df}_j$ is the number of documents containing term $j$, and $w_{ij}$ is the **tf-idf** weight: frequent in this document, rare across documents, therefore distinctive.
- **Insurance sources.** Adjuster and underwriter notes, medical reports and demand letters (text); vehicle-damage and roof photos, satellite and aerial imagery (images); call-centre recordings (audio); dashcam footage (video). Telematics feeds are usually semi-structured — time-stamped records in JSON — and become structured once summarized per trip or per policy.
- **Feature extraction first, model second.** Text is tokenized, lower-cased, stripped of stop words and often stemmed before counting; images become pixel arrays fed to a [[Neural Network]]. The result is wide and sparse ([[High-Dimensional Data]]), so it is usually reduced or penalized — [[Principal Components Analysis]], [[Regularization|lasso]] — before or while it enters a [[Supervised Learning|supervised]] model.
- **Quality and governance.** Unstructured sources are typed by people under no schema: misspellings, abbreviations, copied boilerplate and personal or health information are common. [[Data Quality]] review and privacy controls ([[Model Governance|data governance]]) weigh more heavily than for a policy table.

> [!example]- Which Word Flags a Litigated Claim? {Example}
> An insurer has $1{,}000$ bodily-injury claim notes. The term "attorney" appears in $50$ of them and "vehicle" in $800$. Note #17 is $40$ terms long and contains "attorney" twice and "vehicle" three times. Compute the tf-idf weight of each term in note #17, using natural logs and term frequency as a proportion of the note's length.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > w_{\text{attorney}} &= \frac{2}{40} \cdot \ln\frac{1{,}000}{50} \\
> > &= 0.050 \times 2.9957 \\
> > &= 0.1498
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > w_{\text{vehicle}} &= \frac{3}{40} \cdot \ln\frac{1{,}000}{800} \\
> > &= 0.075 \times 0.2231 \\
> > &= 0.0167
> > \end{align*}
> > $$
> >
> > "Attorney" carries about $9$ times the weight of "vehicle" despite appearing less often in the note: almost every auto claim mentions a vehicle, but few mention a lawyer, so it is the word that distinguishes this claim — a natural feature for a litigation-propensity model.

> [!example]- Classifying the Sources for a Claims-Triage Model {Example}
> A project to predict which new auto claims will exceed \$50,000 has access to: (1) the policy administration table; (2) first-notice-of-loss free-text descriptions; (3) photos uploaded by the claimant; (4) telematics crash-event records in JSON; (5) recorded calls with the claimant. Classify each and say how it would enter a model.
>
> > [!answer]-
> > 1. **Structured.** Fixed fields (vehicle age, coverage, limit) join directly on policy number.
> > 2. **Unstructured text.** Build a document-term matrix (words like "ambulance", "airbag", "rollover") with tf-idf weights, reduce it, and add the features.
> > 3. **Unstructured images.** Needs an image model — typically a neural network scoring damage severity — whose output score becomes one structured column.
> > 4. **Semi-structured.** Parse the JSON and summarize each event: speed at impact, peak deceleration, airbag deployment flag.
> > 5. **Unstructured audio.** Transcribe to text, then treat as source 2; expensive, and subject to consent and privacy rules, so its value should be weighed before it is used.
> >
> > Every unstructured source ends as one or more columns of a structured table: that conversion is the work.

> [!tip]- How it appears on the exam
> - **PA** (written): identify structured and unstructured data types — classify the sources in a business scenario and say how each could be used, or why it could not be used without further work.
> - **DISC-DA** (The Institutes' course exam): working with unstructured data — recognizing the forms it takes in an insurer and the steps that turn it into analysable data.
> - Both exams pair it with data quality and ethics: what the extra source adds against its cost, reliability and privacy risk.

> [!warning]- Exam traps
> - **Storage is not structure.** A text field sitting in a database column is still unstructured: the table has a schema, its contents do not. Calling claim notes "structured because they are in the claims system" is wrong.
> - **Semi-structured is not unstructured.** JSON and XML carry labelled fields that can be parsed mechanically; an answer that prescribes text mining for a JSON feed has misread it.
> - **Raw counts are not tf-idf.** The most frequent word ("the", "vehicle") is the least informative; ranking terms by count alone points at boilerplate. Conventions vary (raw count or proportion; log base), so state the one used.
