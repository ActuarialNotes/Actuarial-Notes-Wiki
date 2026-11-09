# Exam P style drafts

Drafts for settling one style for the Exam P concept pages. Nothing here is built into the app, and nothing here has been fact checked yet.

## The chosen style: Teach

`teach/` holds five pages in the chosen style:

- [Conditional Probability](teach/Conditional%20Probability.md) (~780 words)
- [Deductible](teach/Deductible.md) (~780 words)
- [Bayes Theorem](teach/Bayes%20Theorem.md) (~1,100 words)
- [Poisson Distribution](teach/Poisson%20Distribution.md) (~750 words)
- [Order Statistics](teach/Order%20Statistics.md) (~920 words)

What makes a page "Teach":

- The opening the app reads is unchanged: bold term, formula, bullets, then the idea card and the figure.
- Below that, headed sections build on each other, and each one opens with a question or a difficulty.
- One running example runs through the body, worked as you read: a portfolio, a policy or a month of claims, often laid out as a table.
- A trap card sits beside the idea it distorts, at most one or two per page.
- The page ends with **Try it**, collapsed examples running easy to hard, each with a one-line plan.
- **Exam traps** closes the page. There is no "How it appears on the exam" callout.

## The other styles

`other-styles/` keeps the Lean (A) and Playbook (C) versions of Conditional Probability and Deductible, for reference.

## Before a draft replaces a live page

- **Fact check.** Every draft needs a VERIFY pass against the sources the live page cites.
- **Answerability (G8).** The answerability record quotes the live pages. Any quoted sentence a draft drops or rewords must be re-resolved, or Exam P loses its `ready` status. The drafts keep each topic the live pages cover, except these on Conditional Probability and Deductible:
  - Conditional Probability: conditional expectation given an event, $E[X \mid A]$.
  - Deductible: the capped count $E[N \wedge d]$, the discrete $E[X \wedge d]$ sum, and the Exam 5, 6C and DISC material.
