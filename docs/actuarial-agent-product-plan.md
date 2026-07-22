# Product Plan — The Actuarial Agent

_Last updated: 2026-07-22_

This is a **product plan for a new product line**: an AI **Actuarial Agent** grounded in
the [Actuarial Notes Knowledge Base](https://wiki.actuarialnotes.com) (this repo's content
vault) and the [Actuarial Ontology](https://github.com/Actuarial-Notes/Actuarial-Ontology).

> **This is not the roadmap.** `docs/roadmap.md` plans the *gamified learning app* for exam
> candidates — mastery, streaks, quests, study plans. That product answers "help me pass my
> exam." This plan answers a different question — "help me *do* actuarial work" — and is
> deliberately kept separate: different users, different value proposition, different trust
> bar, different build. The two share foundations (the vault, the ontology, the existing AI
> plumbing) and should reinforce each other, but they are distinct products and should be
> planned, staffed, and shipped as such. Where the Agent reuses learning-app infrastructure,
> this document says so explicitly.
>
> Read `CLAUDE.md` for the repo map and this document assumes it. The ontology-side companion
> to this plan lives at `Actuarial-Ontology/docs/actuarial-agent.md` — read it for the
> semantic-foundation details (competency questions as the eval harness, SPARQL/SHACL needs).

---

## 1. Thesis: the ontology's third benefit, realized

The Actuarial Ontology names three benefits, in order of ambition (see its README §"Why
create an ontology?"):

1. **Communication** — a shared, unambiguous vocabulary for a domain full of overloaded
   terms ("claim", "risk", "reserve" mean different things across practice areas).
2. **Knowledge base** — model real-world entities so the corpus can *answer questions about
   the real world*. The Actuarial Notes Wiki is that knowledge base.
3. **Artificial intelligence** — "develop AI **agents that can perform actuarial tasks**."

Benefits 1 and 2 exist today: the ontology is at v0.7 (~320 classes, ~90 properties, aligned
to UFO/COVER/ASOPs) and the wiki is a large structured knowledge base (~915 questions, concept
and exam pages, a Canadian P&C corpus, a canonical topic→concept→objective map). **Benefit 3
is unbuilt** — and it is the point of the whole project. This plan is how we build it.

The thesis is simple and specific: **general LLMs are fluent but ungrounded actuaries; the
Actuarial Agent is an LLM made accountable to a formal ontology and a curated knowledge
base.** A general model will confidently misuse "IBNR", invent an ASOP citation, or blur a
Canadian regulatory rule with a US one. The Agent's differentiator is not a better model — it
is that every answer is *grounded* (traceable to vault content or KB facts), *disambiguated*
(terms resolved through the ontology, not guessed), and *governed* (bounded by actuarial
professional standards, with a human in the loop for anything that matters). That is a thing
a general chatbot structurally cannot be, and it is exactly what the domain — where a wrong
number has legal and financial consequences — requires.

**Why now.** Three things converged. (1) The ontology reached practice-wide coverage in v0.7.
(2) The knowledge base is large and, critically, *validated* — content-validation CI now
guarantees the frontmatter contract the Agent would retrieve against. (3) The AI plumbing
already exists: `api/chat.js` proxies Anthropic, and the flag-gated **Research "Ask"**
assistant (`api/research.js`, `api/research-ask.js`, the `research_*` tables, the `research*`
lib modules) is a complete, parked RAG-over-corpus feature. The Agent does not start from
zero; it starts from a built-but-dark assistant and makes it *grounded and governed*.

---

## 2. What it is (and what it is not)

**The Actuarial Agent is a grounded, ontology-aware assistant that helps people understand
and perform actuarial work**, with every substantive claim traceable to the knowledge base
and every domain term resolved through the ontology.

It is **not**:

- **Not the learning app.** It does not run quizzes, track mastery, or gamify. A student *can*
  use it (see personas), but its job is "answer/assist/reason", not "make me retain this for
  an exam." The learning app's job is retention; the Agent's job is application.
- **Not a general chatbot with an actuarial system prompt.** The entire product is the
  grounding and governance layer around the model. If an answer can't be traced to the KB or
  reasoned from the ontology, the Agent says so rather than confabulating.
- **Not a replacement for a credentialed actuary.** It is a copilot. Anything that would
  constitute an actuarial opinion, a filed number, or professional advice is drafted *for
  human review*, framed as such, and never presented as a signed work product. This is a
  product constraint, not a disclaimer — it shapes every surface (see §6).
- **Not, initially, a system-of-record integration.** v1 reasons over the *published*
  knowledge base and ontology, not a customer's live policy/claims systems. Connecting to
  proprietary data is a later, deliberate step (§5, Phase D) with its own trust model.

---

## 3. Who it is for

The Agent serves a wider audience than the learning app, spanning the ontology's own stated
users ("actuaries, non-actuarial professionals, organizations, governments, regulators,
clients, and artificial agents"). Four personas, roughly in build order:

| Persona | Core job-to-be-done | Example ask |
|---------|--------------------|-------------|
| **P1 — Exam candidate (existing user)** | "Explain this, grounded in my study material, and let me interrogate it." | "Why does chain-ladder assume stable development factors, and when does that break?" |
| **P2 — Practicing actuary / student-at-work** | "Be a fast, cited first-draft and sanity-checker for real tasks." | "Draft the ASOP 41 disclosure section for a reserve review." / "Is quota-share or excess-of-loss better for capping cat exposure on this book?" |
| **P3 — Adjacent professional** (underwriter, claims, finance, product, legal) | "Translate actuarial concepts and outputs into my context, unambiguously." | "What does the actuary mean by 'IBNR' vs 'case reserve', and why did the combined ratio move?" |
| **P4 — Regulator / non-actuarial decision-maker** | "Interrogate methods and compliance in plain language, with citations." | "Is this rating approach consistent with the way the ontology/standards define fair discrimination?" |

P1 is the wedge: the audience already exists in the app, the content already serves them, and
the trust bar is lowest (an explanation that's slightly off is a teaching moment, not a filed
error). P2 is the value center — the first paying-practitioner use case. P3/P4 are the
ontology's communication benefit turned into a product, and are where the ontology's
disambiguation work is worth the most.

---

## 4. Foundations the Agent stands on

The Agent is a thin, accountable layer over three existing assets plus one existing plumbing.

### 4.1 The Ontology — the semantic layer (`Actuarial-Ontology/*.ttl`)
- **Canonical vocabulary + disambiguation.** ~320 classes / ~90 properties with "A is a B
  that C" definitions and UFO/COVER/ASOP alignment. This is how the Agent resolves an
  overloaded term to a *specific* sense before answering — the product's core defense against
  the "confidently wrong" failure mode.
- **The class/property graph** gives the Agent structure to reason over: taxonomy (is a
  CatastropheExcessOfLoss a NonProportionalReinsurance?), relationships (`covers`,
  `triggeredBy`, `hasReserve`, `manages`, `exposedTo`), and ASOP references per class.
- **The competency questions** (AO-Documentation §"Competency Questions") are not just docs —
  they are the Agent's **evaluation harness** (see §7 and the ontology companion doc).

### 4.2 The Knowledge Base — the fact layer (this repo)
- **Concept + exam pages** (`Concepts/*.md`, `Exam *.md`) — the explanatory ground truth,
  already Obsidian-linked and mapped to the ontology via `scripts/ontology_map.py` and
  `lib/conceptMatch.ts` (`slugForLink` resolves name variants to a canonical slug — the
  runtime bridge between free text and the ontology).
- **The question bank** (`questions/<exam-id>/*.md`) — ~915 worked problems with LaTeX
  solutions: a corpus of *reasoning traces*, not just facts. Invaluable for grounding
  calculation and method explanations.
- **The Canadian P&C instance KB** (`Actuarial-Ontology/canadian-pc-insurance-knowledge-base.ttl`)
  — real-world *instances* (perils, insurers, regulations) typed against the ontology. This is
  what lets the Agent answer entity questions ("which perils are standard exclusions?") rather
  than only definitional ones.
- **The Resources corpus** (`Resources/{Regulation,Events,Benchmarks,Books}/*.md`) — dated,
  source-linked regulatory/event/benchmark pages: the substrate for jurisdiction-aware,
  citable answers, and the same corpus the Research tab already indexes.

### 4.3 Existing AI plumbing — do not rebuild
- `api/chat.js` — a working Anthropic proxy with rate limiting, invite-gating, and a
  structured-JSON system-prompt pattern. The Agent's endpoints follow this template.
- **The parked Research "Ask" feature** — a *complete* RAG-over-corpus assistant behind
  `RESEARCH_AI_ENABLED` / `RESEARCH_TAB_ENABLED`: `api/research.js` (page-level Ask),
  `api/research-ask.js` (project Ask), the `research_*` Supabase tables (documents, FTS,
  ontology, projects, project-questions), `stores/researchStore.ts`, the `research*` lib
  modules, and `docs/research-ai-disabled.md`'s re-enable checklist. **The Agent is, in large
  part, this feature promoted from "parked search assistant" to "grounded, governed,
  ontology-aware product."** See §8 for exactly what carries over vs. what's net-new.
- **Feature-flag + pure-`lib/` + tests discipline** — the house pattern (`featureFlags.ts`,
  small tested modules, dated migrations with RLS). The Agent ships the same way.

---

## 5. Architecture — the grounding stack

The Agent is five layers. The model is the *smallest* interesting part; the value is
everything wrapped around it.

```
 ┌─────────────────────────────────────────────────────────────┐
 │ 5. INTERFACE      chat + task surfaces (reuse Research UI +   │
 │                   api/chat.js pattern); streaming; citations  │
 ├─────────────────────────────────────────────────────────────┤
 │ 4. REASONING      LLM + tools: calculators, SPARQL/graph      │
 │    & TOOLS        query, unit/date math, citation composer    │
 ├─────────────────────────────────────────────────────────────┤
 │ 3. GROUNDING      ontology-aware retrieval over KB + KB        │
 │    & RETRIEVAL    instances; entity resolution (conceptMatch) │
 ├─────────────────────────────────────────────────────────────┤
 │ 2. SEMANTIC       the Ontology: term disambiguation, class/    │
 │    LAYER          property graph, ASOP refs, competency Qs     │
 ├─────────────────────────────────────────────────────────────┤
 │ 1. KNOWLEDGE      wiki concepts/exams, question bank,          │
 │    LAYER          Canadian P&C instance KB, Resources corpus  │
 └─────────────────────────────────────────────────────────────┘
```

**How a query flows (design intent).**
1. **Resolve terms.** Map the user's language to canonical ontology classes/senses
   (`conceptMatch.slugForLink` + an ontology term index). Ambiguity is surfaced, not guessed
   ("by 'claim' do you mean the ReportedClaim event or the ClaimReserve liability?").
2. **Retrieve grounded context.** Ontology-aware RAG: pull the relevant concept/exam pages,
   worked questions, regulation/resource pages, and any matching KB instances — biased by the
   ontology graph (retrieve neighbors along `subClassOf`/relationships, not just text-similar
   chunks). This is the upgrade over the Research tab's keyword+FTS retrieval.
3. **Reason with tools.** The model composes an answer but delegates anything exact to tools:
   actuarial calculators (loss ratios, development factors, present values — grounded in the
   question bank's methods), a graph/SPARQL query tool for entity/relationship questions, and
   date/unit math. Tools return checkable values; the model narrates them.
4. **Compose with citations.** Every substantive claim carries a source (wiki page, KB
   instance, resource with its `source_url`). Uncited claims are flagged or withheld.
5. **Govern the output.** Scope guardrails and the human-in-the-loop framing (§6) wrap the
   response before it reaches the user.

**Grounding contract (the product's spine).** The Agent prefers *"I can ground X but not Y,
here's X and here's why Y is out of scope"* over a fluent, unsourced whole. This is the single
most important product decision: it is what makes it an *actuarial* agent rather than a
chatbot that talks about actuarial things. It costs perceived fluency and buys the only thing
that matters in this domain — trust.

---

## 6. Trust, safety & governance (the hard part)

In a domain where outputs feed pricing, reserves, and regulatory filings, governance *is* the
product. These are requirements, not aspirations.

1. **Grounding & citation, always.** Substantive claims trace to a source; the UI shows it.
   An answer the Agent cannot ground is labeled as ungrounded ("general knowledge, not from
   the knowledge base") or declined. Track *grounding rate* as a first-class metric (§7).
2. **Human-in-the-loop by construction.** The Agent drafts; a qualified human decides. Any
   output resembling an actuarial opinion, a filed figure, or professional advice is framed as
   a reviewable draft, never a conclusion. This mirrors the repo's existing content rule ("no
   wiki content is published 100% AI-written without human review") — the Agent operationalizes
   the same principle for generated work.
3. **Standards-awareness via the ontology.** The ontology carries `asopReference` annotations
   and an ASOP 41 communication framework (`ActuarialCommunication`, `ActuarialOpinion`,
   `Disclosure`, `IntendedUser`). The Agent uses these to (a) cite the relevant standard and
   (b) recognize when a request crosses into territory a standard governs, and adjust its
   framing accordingly.
4. **Jurisdiction discipline.** The Canadian P&C corpus is *Canadian*. The Agent must not
   silently generalize a Canadian regulatory rule to another jurisdiction; scope (jurisdiction,
   line of business) is explicit — reusing the Research project's existing scope model
   (document type / jurisdiction / line of business).
5. **Scope guardrails.** Out-of-domain, and anything the KB can't ground, is declined
   gracefully with a reason. No medical/legal/individualized-financial advice. No fabricated
   citations — a citation must resolve to a real vault/KB source or it is not emitted.
6. **Confidence & disagreement surfacing.** Where the KB is thin or sources conflict
   (e.g. two reserving methods disagree), the Agent says so rather than papering over it —
   the calibration principle from the learning-app's §2.2, applied to generation.
7. **Privacy & data boundaries.** v1 reasons over *published* content only. Any later
   connection to proprietary data (Phase D) is opt-in, tenant-isolated, and never used to
   train shared models — decided explicitly, not defaulted into.
8. **Auditability.** The ontology already models `AuditTrail` / `WorkPaper`; the Agent should
   log what it retrieved and cited for each answer, so a reviewer can reconstruct *why* it said
   what it said. This is also the dataset that drives eval (§7).

---

## 7. Evaluation & success metrics

The Agent is judged on evidence, following the roadmap's "measure everything" principle — but
with metrics suited to a *correctness-critical* product, not an engagement one.

**The competency questions are the eval harness.** The ontology defines competency questions
(risk, insurance ops, financial analysis, actuarial process, regulatory) and claims 100%
*answerability* at the schema level. The Agent must be measured on *actual answer quality*
against an expanded, versioned competency-question suite — the bridge from "the ontology
*could* express this" to "the Agent *does* answer this correctly, with citations." This suite
is co-owned with the ontology repo (see the companion doc).

| Category | Metric | Why it matters |
|----------|--------|----------------|
| **Grounding** | % of substantive claims with a resolvable citation | The core trust metric; the product's spine (§5) |
| **Factuality** | Expert-rated correctness on the competency-question suite | Is it *right*, not just sourced |
| **Faithfulness** | Rate of claims *entailed by* their cited source (no citation-washing) | Guards against citing a source that doesn't actually support the claim |
| **Term precision** | Correct ontology-sense resolution of overloaded terms | The disambiguation differentiator (§1) |
| **Calibrated refusal** | % of ungroundable asks correctly declined/flagged vs. confabulated | Punishes the worst failure mode |
| **Task usefulness (P2)** | Expert "would edit vs. discard" rate on drafted work products | The practitioner value test |
| **Coverage** | Competency-question answerability by domain over time | Tracks the capability build-out (§9) |
| **Adoption** | Grounded-answer sessions; return usage by persona | Product-market fit signal |

An answer that is fluent, useful-sounding, and *wrong* is the failure this product exists to
prevent — so factuality and calibrated refusal outrank adoption early. We do not optimize
engagement here (that's the learning app's job).

---

## 8. Relationship to existing surfaces — reuse, don't rebuild

The Agent is mostly a **promotion and hardening of the parked Research feature**, not a
greenfield build.

**Carries over directly:**
- `api/chat.js` / `api/research*.js` — the Anthropic-proxy pattern (rate limit, gating,
  structured prompts). New Agent endpoints follow it.
- The Research **corpus + retrieval** (`research_documents` + FTS, the resource timeline,
  `research*` lib modules, `researchStore.ts`) — the Agent's retrieval layer starts here.
- The Research **project model** — scope (jurisdiction / LoB / doc type), source collections,
  the "Ask" surface, and `docs/research-ai-disabled.md`'s re-enable checklist.
- **Feature-flag discipline** — the Agent ships behind its own flag (e.g. `AGENT_ENABLED`),
  dark first, following the `: boolean`-annotated `featureFlags.ts` pattern, with RLS'd dated
  migrations and pure tested `lib/` modules.

**Net-new (what makes it *the Agent*, not just re-enabled Research):**
- The **semantic/grounding layer** — ontology term resolution, ontology-aware retrieval, and
  the KB-instance query path. Research does keyword+FTS; the Agent does ontology-graph-biased
  retrieval + entity resolution.
- **Tool use** — calculators, SPARQL/graph queries, citation composition. Research "Ask" is
  retrieval→generate; the Agent is retrieval→reason-with-tools→cite→govern.
- The **governance layer** (§6) — grounding contract, standards-awareness, calibrated refusal,
  auditability. This is the bulk of the net-new product work.
- The **competency-question eval harness** (§7).

**Sequencing note for the learning app.** Re-enabling Research is roadmap item P4.4. The Agent
should *lead* that re-enablement rather than duplicate it: light Research back up as the
Agent's first surface, governed, rather than turning it on twice. Coordinate the flag flip.

---

## 9. Phased build plan

Phases are ordered by *trust earned* and *dependency*, not calendar. Each capability is framed
against the ontology's nine target task domains (Risk Assessment, Pricing, Reserving,
Valuation, Investment, Capital Modelling, Capital Allocation, Regulatory Compliance, Product
Development) and climbs a capability ladder: **Explain → Retrieve/Reason → Assist/Draft →
(eventually) Perform**. We do not attempt "Perform" on a domain before "Explain" and
"Retrieve" are proven and measured there.

### Phase A — Grounded Q&A ("Ask the Knowledge Base") · the wedge
_Goal: a genuinely grounded, cited assistant over the existing vault — the P1/P3 value, and
the foundation everything else stands on._
- **A1 — Grounding contract + citations.** Retrieval over the wiki + Resources corpus with
  every substantive claim cited; ungrounded answers labeled or declined. (Hardens Research
  "Ask" into the grounding contract of §5.)
- **A2 — Ontology term resolution.** Wire `conceptMatch` + an ontology term index so overloaded
  terms are disambiguated before answering. First delivery of the §1 differentiator.
- **A3 — Agent endpoint + flag + surface.** New `AGENT_ENABLED` flag; endpoint on the
  `api/chat.js` pattern; ship dark on the Research surface first.
- **A4 — Competency-question eval v1.** Stand up the eval harness (§7) on the ontology's
  existing competency questions; baseline grounding + factuality.
- **Exit:** a signed-out user can ask a domain question and get a cited, ontology-disambiguated
  answer or an honest "I can't ground that"; grounding + factuality baselined.

### Phase B — Ontology-aware reasoning & the entity KB
_Goal: move from "explains concepts" to "answers questions about real-world entities" — the
ontology's benefit #2 turned into Agent capability._
- **B1 — Instance-KB query path.** Load the Canadian P&C KB (`.ttl` instances) behind a
  graph/SPARQL query tool so entity/relationship questions ("which perils are excluded?",
  "which insurers write X?") are answered from *facts*, not prose.
- **B2 — Ontology-graph-biased retrieval.** Retrieve along `subClassOf`/relationships, not just
  text similarity — the retrieval upgrade in §5 step 2.
- **B3 — Calculation tools.** Actuarial calculators grounded in the question bank's methods
  (loss/expense/combined ratios, development factors, PV/annuity math), with checkable outputs.
- **B4 — Expand the competency-question suite** beyond the ontology's seed set; add
  faithfulness + term-precision metrics.
- **Exit:** entity and calculation questions answered from KB facts + tools with citations;
  competency-question answerability measured per domain.

### Phase C — Task assistants (the P2 value center)
_Goal: cited first-draft + sanity-check for real practitioner tasks, one governed domain at a
time. Start where the KB is strongest and the trust bar is manageable._
- **C1 — Explain/Assist copilots** for the domains with the deepest KB coverage first
  (Risk Assessment, Pricing, Reserving), each as a scoped surface that drafts *reviewable*
  outputs (e.g. an ASOP 41-aware disclosure draft, a method-selection rationale) — never a
  filed conclusion (§6).
- **C2 — Standards-aware framing.** Use `asopReference` + the ASOP 41 model so drafts cite the
  governing standard and carry the right review framing.
- **C3 — Task-usefulness eval.** The "edit vs. discard" expert metric (§7) gates each copilot's
  graduation from dark → limited → general.
- **Exit:** at least one practitioner task, in one domain, that an actuary would rather edit
  than write from scratch — proven by the edit-vs-discard metric, governed end to end.

### Phase D — Toward performing tasks (agentic, deliberate, gated)
_Goal: multi-step workflows and (opt-in) proprietary-data grounding — only after C proves the
single-step drafts are trustworthy. This is where "AI agents that can perform actuarial tasks"
is fully realized, and it is intentionally last._
- **D1 — Multi-step workflows** (retrieve → compute → draft → self-check against the ontology)
  with the audit trail (§6.8) as a first-class output.
- **D2 — Proprietary-data grounding** (opt-in, tenant-isolated) — the system-of-record step,
  with its own trust/privacy model decided explicitly.
- **D3 — Broaden domain coverage** toward Valuation, Capital, Regulatory Compliance as their KB
  coverage matures (ties to roadmap P2.4 content expansion + the ontology's instance-KB growth).
- **Exit:** a bounded, audited, multi-step task performed end-to-end with human sign-off, and a
  data-backed decision on proprietary-data grounding.

---

## 10. Dependencies on the foundations (what the Agent needs that isn't there yet)

The Agent's build surfaces concrete gaps in both foundations. These are tracked in the ontology
companion doc; summarized here because they gate the phases:

- **From the ontology** (its own "Future Development" list, now demand-driven):
  a **SPARQL query library** (gates B1), **SHACL shapes / formal constraints** (validation the
  Agent's graph tool relies on), an **expanded instance KB** beyond Canadian P&C (gates domain
  breadth in D3), and **FIBO/schema.org mappings** (interoperability).
- **From the knowledge base** (overlaps roadmap P2.4): coverage is lopsided (~38% of concepts
  have linked questions; upper CAS exams have wiki pages but thin banks). The Agent's per-domain
  capability is capped by KB depth in that domain — which is why Phase C starts with the
  best-covered domains.
- **A shared eval asset:** the versioned competency-question suite (§7) is co-owned by both
  repos and is the single clearest signal of whether benefit #3 is being delivered.

---

## 11. Risks & mitigations

- **Confident hallucination — the existential risk.** A fluent wrong answer in this domain has
  real consequences. _Mitigation:_ the grounding contract (§5), calibrated-refusal metric (§7),
  and faithfulness checks are non-negotiable and precede any adoption push.
- **Overreach into professional advice / unauthorized practice.** _Mitigation:_ human-in-the-loop
  by construction, ASOP-aware framing, scope guardrails (§6) — enforced in the surface, not just
  the prompt.
- **Jurisdiction blur.** Canadian rules generalized silently. _Mitigation:_ explicit scope
  (reuse Research's jurisdiction/LoB model); the Agent states its jurisdiction and declines to
  extrapolate.
- **KB coverage caps capability.** The Agent can only be as good as the vault in a domain.
  _Mitigation:_ sequence Phase C by coverage; be honest about thin domains rather than
  bluffing; feed gaps back into roadmap P2.4.
- **Ontology-app drift.** The ontology and the vault's `ontology_map.py` can diverge.
  _Mitigation:_ the competency-question suite is the contract test that catches drift; keep
  `conceptMatch`/`ontology_map` as the enforced bridge.
- **Product confusion with the learning app.** Two AI-ish surfaces could muddle positioning.
  _Mitigation:_ this plan's §2 boundary; distinct surfaces, distinct value props, shared
  foundations only.
- **Scope creep / building the platform before the wedge.** _Mitigation:_ Phase A ships a real,
  narrow, grounded thing on existing plumbing before any agentic ambition; "Perform" is
  deliberately Phase D.
- **Cost & latency of tool-heavy, retrieval-heavy answers.** _Mitigation:_ reuse the existing
  rate-limit/gating plumbing; measure cost per grounded answer as a product metric from A1.

---

## 12. Open decisions (need a human call)

These shape the build and are the product owner's to make — flagged rather than assumed:

1. **Primary v1 persona / wedge:** lead with P1 (exam candidate, in-app, lowest trust bar) or
   P2 (practitioner, highest value, highest trust bar)? _This plan recommends P1 as the wedge
   and P2 as the value center_ — but it's a strategy call.
2. **Packaging:** is the Agent a surface *inside* the existing app (shared auth/billing) or a
   separate product? Affects whether it reuses the app shell or stands alone.
3. **Monetization:** free-for-students + paid-for-practitioners, usage-based, or bundled with a
   premium tier? (Interacts with roadmap P4.3.)
4. **Research re-enablement coordination:** confirm the Agent *leads* P4.4 rather than
   duplicating it (§8) — who owns the flag flip.
5. **Data boundary for Phase D:** do we ever ground on proprietary data, and if so under what
   trust/privacy model? (Can defer, but shapes the architecture.)

---

## 13. Immediate next steps

1. **Ratify §2 (scope) and the §12(1) wedge decision** — everything downstream depends on
   whether v1 leads with the student or the practitioner.
2. **Stand up the competency-question eval harness (A4/§7)** against the ontology's existing
   competency questions — before writing Agent code, so every step is measured. This is the
   shared asset that proves benefit #3 is real.
3. **Prototype A1+A2 on the parked Research "Ask"** — add the grounding contract + ontology
   term resolution to the existing assistant, behind `AGENT_ENABLED`, dark. This turns "we have
   a parked search assistant" into "we have a grounded actuarial agent in one narrow domain,"
   which is the smallest honest version of benefit #3.

In parallel, open the shared competency-question suite in the ontology repo (companion doc,
§7) so both foundations evolve against the same contract.
