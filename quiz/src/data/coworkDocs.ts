/**
 * The bodies of Cowork's **sample source documents**.
 *
 * Each one stands for a *class* of document a publisher issues, not a
 * particular issue of it — Cowork does not carry FSRA's bulletin archive or
 * Intact's filings yet, and naming an imaginary one would put a citation in a
 * workflow that nothing supports. So a sample says what that kind of
 * document contains, what an actuary takes out of it, and where to go for the
 * real thing; it carries no date, no figures and no link it cannot support.
 * `docs/cowork.md` calls this the seed contract, and replacing a sample with a
 * real document is the shape the next phase takes.
 *
 * They are authored with `Resources/Books`-style front matter so the popup
 * viewer renders them with the same metadata card a vault resource page gets
 * (`lib/resourceMeta.ts`), and registered as virtual vault files by
 * `lib/coworkContent.ts`.
 */

/** Front matter + body, keyed by the virtual path in `data/coworkSources.ts`. */
export const COWORK_DOCS: Record<string, string> = {






















  'Cowork/Sources/msa-research/msa-researcher.md': `---
Title: "MSA Researcher — Canadian insurer financial database"
Author: "Market-Security Analysis & Research Inc."
Publisher: "MSA Research"
Type: "Financial database"
Available from: "[msaresearch.com](https://www.msaresearch.com)"
---

> [!info] Sample entry
> Cowork does not carry the database. This page describes it so a benchmarking
> exercise can be scoped against it; take every figure from MSA directly.

MSA compiles the financial returns Canadian insurers file into one database,
company by company and in aggregate, with the ratios computed on consistent
definitions. It is the practical answer to "how did we do against the market",
because the alternative — reading every competitor's return — is the same work
done worse.

## What a benchmarking exercise takes from it

- **A peer group**, defined explicitly: which companies, on what basis, over
  what period. The definition is the assumption; the ratio is the output.
- **Industry aggregates** for loss, expense and combined ratios, and for
  reserve development.
- **A consistent history**, which is what makes a company's movement separable
  from the market's.

## Cautions when citing it

- Ratio definitions are MSA's. A company's internally reported combined ratio
  and its MSA combined ratio are both correct and are not the same number;
  [[MSA Legend]] is the document that settles which is which.
- The data are **filed** figures. Restatements and late filings mean a
  comparison drawn at one date may not reproduce at another.
- A peer group chosen after seeing the answer is not a benchmark.

## How it is used in a deliverable

A financial-reporting or advisory deliverable carries the **peer group
definition** and the **ratio definition** as their own assumption rows, with the
benchmark figures beside them. Naming both is what lets a reader disagree with
the comparison without having to re-derive it.

Related: [[MSA Legend]], [[CCIR Instructions]].
`,

}
