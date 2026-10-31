# Answerability: Exam SRM (SOA)

Run `answerability-20261031-srm` · 1 questions checked of 1 attempted · cost $0.02

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 1 | 100% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 0 | 0% |
| **Gap** — something the solution uses is taught on no page | 0 | 0% |

Requirements: 2 — tagged 1 (50%), linked 1 (50%), syllabus 0 (0%), prerequisite 0 (0%), elsewhere 0 (0%), missing 0 (0%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 1 | 1 | 0 | 0 (0%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

No gaps found.
## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

None.

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

None.

## Every question

<details><summary><code>srm-001</code> · answerable</summary>

Tagged pages: Hierarchical Clustering, Linkage, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| Complete linkage defines the intercluster dissimilarity as the largest pairwise dissimilarity between an observation in one cluster and an … | definition | tagged | Linkage: “$$\text{complete: } \max_{i \in A,\, j \in B} d_{ij} \qquad \text{single: } \min_{i \in A,\, j \in …” |
| The Euclidean distance between two points is the square root of the sum of squared differences in their coordinates. | formula | linked | Similarity and Distance Measures: “$$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
