# Bloom's taxonomy for actuarial questions

The revised taxonomy (Anderson & Krathwohl, 2001) orders six cognitive
processes from recalling to producing. The level of a question is set by **what
the reader must do to answer it** — the verb in the task — not by its length,
its arithmetic or how many people get it wrong. Pick the level first, then write
a stem that cannot be answered by any lower process.

The test for a level: *what is the least a reader could do and still get this
right?* If recognising a phrase from the concept page suffices, it is Remember
however long the stem is. If running a memorised formula on given inputs
suffices, it is Apply however many steps there are.

## The six levels

### 1. Remember — retrieve a fact

Verbs: identify, recall, recognise, name, state.

Use sparingly, and only for a fact the exam genuinely expects to be at hand
without derivation: a distribution's mean and variance, which plot shows
leverage, what a link function maps. Never ask for a definition worded as on the
concept page — paraphrase it, or ask for the fact the definition implies.

> *Stems:* Which of the following is the variance of …? · Which plot is used to
> assess …? · Which distribution has …?

Formats: single best answer, true/false, matching (terms ↔ facts).

### 2. Understand — explain, classify, compare, interpret

Verbs: explain, classify, compare, contrast, interpret, summarise, predict
(qualitatively), give an example.

The workhorse of conceptual questions: the reader must hold a model of the idea
in mind. Ask what *changes* when something changes, which of several items is an
instance, how two neighbouring ideas differ, what a result *means*.

> *Stems:* If exposure doubles while claims stay fixed, what happens to …? ·
> Which of the following is an example of …? · Which statement correctly
> distinguishes … from …? · What does a coefficient of 0.18 on the log scale mean
> for …?

Formats: single best answer, I/II/III, matching, true/false with a reason.

### 3. Apply — carry out a procedure in a familiar situation

Verbs: calculate, compute, estimate, solve, use, implement.

Most exam questions live here. The procedure is known; the reader must select
it, set it up and run it on the given data. Distractors are the results of the
classic setup mistakes.

> *Stems:* Calculate the maximum likelihood estimate of … · Using percentile
> matching at the 25th and 75th percentiles, estimate … · Calculate the expected
> time spent in state 2 starting from state 1.

Formats: numeric single best answer (values or CAS ranges), free-entry numeric,
multi-part calculation.

### 4. Analyze — break a situation into parts and find the structure

Verbs: diagnose, distinguish (relevant from irrelevant), attribute, organise,
determine which/why, deconstruct.

The reader is given a situation that is *not* labelled with the procedure:
model output, a described plot, a data set with a feature, a set of facts some
of which don't matter. They must work out what is going on. Including one
irrelevant but plausible fact is legitimate here — ignoring it *is* the skill.

> *Stems:* A QQ plot of the deviance residuals bends upward at both ends. Which
> conclusion is best supported? · Given the output below, which predictor's
> effect is not distinguishable from zero after accounting for …? · Which
> assumption of the test is violated by this sampling plan?

Formats: single best answer over a described output, I/II/III, matching
(symptom ↔ diagnosis), ordering (steps of an analysis), multi-part.

### 5. Evaluate — judge against criteria and defend a choice

Verbs: choose, select (the best), justify, critique, recommend, assess, rank.

Two or more defensible options exist; the reader must weigh them against stated
criteria (fit, parsimony, the data's behaviour, the purpose of the model). This
is where MAS-I objective C.1–C.3 ("select the appropriate model … evaluate
models") lives. The key is the *best* option given the criteria in the stem —
the stem must state the criteria, or the question has no single answer.

> *Stems:* Which model is most appropriate for … given …? · Using AIC, which of
> the four models is preferred, and is the improvement over Model 2 worth its
> extra parameters? · An analyst proposes … Which critique is most valid?

Formats: single best answer (with the criteria stated), ranking/ordering,
written part ("recommend and justify"), multi-part (compute, then choose).

### 6. Create — assemble something new

Verbs: design, construct, formulate, propose, specify, write.

Rare in a multiple-choice bank, and that is fine. Two honest ways to reach it:
a multi-part where the reader **specifies** a model (distribution, link, offset,
predictors) for a described business problem, each part graded as a choice; or
a written part asking for a design, with the sample answer as the rubric. Don't
label an item Create because it says "construct" if it only asks the reader to
pick from four finished constructions — that is Evaluate.

> *Stems:* Specify a GLM for … : (a) the response distribution, (b) the link,
> (c) how to account for exposure. · Design a test of … at level 5%: state the
> statistic and the rejection region.

Formats: multi-part with graded choices, written part, ordering (assemble the
steps of a procedure).

## The mix

A bank that is all Apply trains calculators; one that is all Understand trains
readers of the concept page. Aim, across a batch for one exam:

| Level | Share | Why |
|---|---|---|
| Remember | ≤ 10% | Only facts the exam assumes at hand |
| Understand | 25–30% | The conceptual base every calculation stands on |
| Apply | 25–35% | What most exam marks are for |
| Analyze | 15–25% | Reading output and plots — heavy on MAS-I C |
| Evaluate | 10–15% | Model selection, the stated aim of MAS-I C.1–C.3 |
| Create | ≤ 5% | Model specification; written design |

Per concept, climb: the second question is at a **higher** level than the first,
and in a different format. Match the ceiling to the objective's verb — a
"calculate" objective tops out at Apply/Analyze; a "select" or "evaluate"
objective needs an Evaluate item.

## Bloom is not difficulty

| | Easy | Hard |
|---|---|---|
| **Low level** | Recall the mean of a Poisson | Recall which of five similar variance formulas belongs to the ZTNB |
| **High level** | Pick the better of two models when one has lower AIC *and* fewer parameters | Pick between models where AIC and BIC disagree and the residual plot matters |

Set `difficulty` by how many candidates you expect to miss it (easy ≈ most get
it, hard ≈ most miss), independently of `bloom`.

## Calibrating a draft

Ask, in order:

1. Could a reader who only *recognises* the term get it? → Remember (or rewrite).
2. Could they get it by restating the idea in their own words? → Understand.
3. Is there a known procedure they just run? → Apply.
4. Must they first work out *which* procedure, or what the data/output is
   telling them? → Analyze.
5. Must they weigh defensible alternatives against criteria? → Evaluate.
6. Must they produce a specification or design? → Create.

Record the first "yes" from the top that the question cannot be answered below.
