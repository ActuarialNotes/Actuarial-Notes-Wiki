---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:07c254e698fc9c39fca3dd86a667bccdd238d5538f484224db1133b2306cb95e
  sources:
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §1 'unstructured data' has no clear, semantically overt, easy-for-a-computer structure; opposite of structured data (relational database), sha256:2536b9352416ca671cd66b93bd5878c85d7461d479dc730c2f79687e69dd0e65 — https://nlp.stanford.edu/IR-book/html/htmledition/boolean-retrieval-1.html"
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §6.2.1 idf = log(N/df): rare terms high, frequent terms low, sha256:d41ee146d453cfb74d5f9f57e3c536e551201d5cb12da0aed889892e6f6b5c6f — https://nlp.stanford.edu/IR-book/html/htmledition/inverse-document-frequency-1.html"
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §6.2.2 tf-idf weight, highest for a term frequent in few documents, sha256:79ac59cc29b8fa1e2ba827f4a992d39e16c7b54e7f60162774098a68f86feaba — https://nlp.stanford.edu/IR-book/html/htmledition/tf-idf-weighting-1.html"
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §2.2.2 stop words, sha256:f0fd00d1b4a82db0dbaba96e1d87ceb9565f479b3ea68dabeab8197e1963f825 — https://nlp.stanford.edu/IR-book/html/htmledition/dropping-common-terms-stop-words-1.html"
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §10 semistructured retrieval of XML, sha256:6ad525b29d7965f8216806084a9bceb4bf533ad0533acc017fb58ac9724fb5df — https://nlp.stanford.edu/IR-book/html/htmledition/xml-retrieval-1.html"
    - "SOA Exam PA syllabus, October 2026, Topic 2 'Data Exploration and Visualization', objective a) 'Identify structured and unstructured data types', PDF p.2, sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unstructured Data.md
---
**Unstructured Data** is information with no predefined data model, such as free text, images, audio and video. It cannot be stored as rows of observations and columns of [[Data Types|typed variables]] until features are extracted from it, which is what makes it [[Structured Data|structured]].

| Kind | Shape | How it enters a model |
| :--- | :--- | :--- |
| Structured | A fixed schema of records and fields, such as a policy table ([[Tidy Data]]) | Directly, as columns |
| Semi-structured | Tags that label its pieces (JSON, XML, an email's header fields), but no single table | Parsed by its labels and flattened into rows |
| Unstructured | No predefined data model | Only after features are extracted |

A text field sitting in a database column is still unstructured. The table has a schema, its contents do not. Every unstructured source ends as one or more columns of a structured table, and that conversion is the work.

In an insurer, the unstructured sources are:

- Text: adjuster and underwriter notes, medical reports and demand letters.
- Images: vehicle-damage and roof photos, satellite and aerial imagery.
- Audio: call-centre recordings.
- Video: dashcam footage.

Telematics feeds are usually semi-structured, time-stamped records in JSON, and become structured once summarized per trip or per policy.

> [!example]- How would each source for this claims-triage model enter the model? {Example}
> A project to predict which new auto claims will exceed \$50,000 has access to: (1) the policy administration table, (2) first-notice-of-loss free-text descriptions, (3) photos uploaded by the claimant, (4) telematics crash-event records in JSON, and (5) recorded calls with the claimant.
>
> > [!answer]-
> > - (1) is structured. Its fixed fields (vehicle age, coverage, limit) join directly on policy number.
> > - (2) is unstructured text. A document-term matrix (words like "ambulance", "airbag", "rollover") with tf-idf weights is built, reduced and added as features.
> > - (3) is unstructured images. An image model, typically a neural network scoring damage severity, produces a score that becomes one structured column.
> > - (4) is semi-structured. The JSON is parsed and each event summarized: speed at impact, peak deceleration, airbag deployment flag.
> > - (5) is unstructured audio. It is transcribed to text and treated as source (2), which is expensive and subject to consent and privacy rules, so its value should be weighed before it is used.

> [!trap] Treating semi-structured data as unstructured
> JSON and XML carry labelled fields that can be parsed mechanically. An answer that prescribes text mining for a JSON feed has misread it.

## The document-term matrix

Text is tokenized, lower-cased, stripped of stop words and often stemmed before counting. For $n$ text records (claim notes, underwriter comments, complaint emails) and a vocabulary of $p$ terms, the **document-term matrix** is

> $$\mathbf{X} = \left[x_{ij}\right]_{n \times p}$$

- $x_{ij}$ is the number of times term $j$ appears in document $i$.

It is a structured table with one row per document and one column per term. Raw counts favour the most frequent words ("the", "vehicle"), which are the least informative. The **tf-idf** weight of term $j$ in document $i$, high for a term frequent in this document and rare across documents, is

> $$w_{ij} = \frac{x_{ij}}{\sum_{l=1}^{p} x_{il}} \cdot \ln\frac{n}{\text{df}_j}$$

- $\text{df}_j$ is the number of documents containing term $j$.

Conventions vary (raw count or proportion, the log's base), so state the one used.

> [!example]- What are the tf-idf weights of "attorney" and "vehicle" in note #17? {Example}
> An insurer has 1,000 bodily-injury claim notes. The term "attorney" appears in 50 of them and "vehicle" in 800. Note #17 is 40 terms long and contains "attorney" twice and "vehicle" three times. Use natural logs and term frequency as a proportion of the note's length.
>
> > [!answer]-
> > - For "attorney", $w = (2/40) \cdot \ln(1{,}000/50) = 0.050 \times 2.9957 = 0.1498$.
> > - For "vehicle", $w = (3/40) \cdot \ln(1{,}000/800) = 0.075 \times 0.2231 = 0.0167$.
> > - "Attorney" carries about 9 times the weight of "vehicle", although it appears less often in the note.
> > - Almost every auto claim mentions a vehicle but few mention a lawyer, so "attorney" is the word that distinguishes this claim, a natural feature for a litigation-propensity model.

## Other feature extraction

Images become pixel arrays fed to a [[Neural Network]]. The features extracted from text or images are wide and sparse ([[High-Dimensional Data]]), so they are usually reduced or penalized, by [[Principal Components Analysis]] or the [[Regularization|lasso]], before or while they enter a [[Supervised Learning|supervised]] model.

## Quality and governance

Unstructured sources are typed by people under no schema, so misspellings, abbreviations, copied boilerplate and personal or health information are common. [[Data Quality]] review and privacy controls ([[Model Governance|data governance]]) weigh more heavily than for a policy table.
