# Decisions: a collaborative decision system

**Status:** proposed 2026-11-14 (roadmap §3.4, A13). Nothing is built.

**Sources.** Two documents, kept outside the repo:

- *Deciding Together Under Uncertainty: A Risk-Informed Framework for Collaborative Decisions*
  (the thesis). It sets out the decision record, the five stages (Frame, Evidence, Choose,
  Attest, Learn), the default choice rule, the rules for agents and four predictions that could
  prove it wrong.
- *Risk Assessment Agent: Specification* (the RAA spec). It implements IEC 31010:2019's
  assessment process inside that framework, as requirements with IDs (`RAA-A-01` …) and a
  registry of the standard's 42 techniques.

This plan is how the thesis becomes a product, starting inside Actuarial Notes. Where this plan
cites a requirement it uses the spec's ID.

## 0. What is settled

The maintainer answered four questions on 2026-11-14:

| Question | Answer |
|---|---|
| The first pilot | A **student case simulation**: a cohort plays the parties to an invented decision whose futures are drawn from a known model, so outcomes can be revealed and forecasts scored in the same course |
| Where it lives | **Inside this repo, extending Workflows**, reusing the tools engine, Data Sources, the Assumptions Bank, Supabase and the connector; split out later if it gets users who aren't students |
| How AI agents run | **Through the connector**: each participant's own Claude or ChatGPT reads the record and proposes entries through signed-in MCP tools. The app still calls no model and holds no key (§6.2) |
| Purpose | **Product first**. Measurement of the thesis's predictions is a later layer, but the record is designed so it can be added without a migration (§9) |

## 1. Why a student case first

The thesis names "a student cohort, a cooperative, or a municipal team" as the first small
test. A cohort is the one this app can reach, and a simulation removes the two things that make
a real pilot slow:

1. **Outcomes arrive at once.** A case's futures are drawn from a model the app knows, the way
   the PCPA simulator draws its data (`lib/pcpaData.ts`) and grades against the true model. The
   Learn stage can reveal what happened and score every forecast in the same session, then open
   a second round. Calibration over successive decisions, the thesis's first prediction, can be
   seen in a week rather than in years.
2. **No confidential data.** Every figure is invented and labelled so, as the PCPA cases are.
   Nothing about a real person, firm or community is stored.

It is also teaching. Students practise the actuary's three stages (Evidence, Attest, Learn)
with the app's tested tools, and sit in the other parties' seats for Frame and Choose.

## 2. The one design rule: the rules are code, agents write words

Most of the thesis's rules, and most of the spec's MUSTs, are deterministic. An agent told to
follow them can be argued out of them; code can't. So:

- **The server and pure functions enforce every rule that can be checked.** The record refuses
  an entry that breaks one, whoever sends it.
- **Agents do the work that needs language**: drafting a summary of a group's objectives for that
  group to confirm, writing a plain-language brief of an option, translating, proposing
  scenarios, explaining a tool's result, and forecasting alongside people.

| Rule (thesis / spec) | How it is enforced |
|---|---|
| The choice rule and risk limits are fixed before any option is analysed (RAA-A-04, F-03) | Evidence entries are refused, and results are not served, until the record holds a `lock` entry for Frame. A change to the rule after the lock is a `reopen` entry that sends the decision back to Frame |
| Judgments collected independently before discussion (RAA-A-05) | A forecast or judgment is **sealed**: the read RPC hides other participants' sealed entries from you until you have submitted yours, or the stage's reveal time passes |
| Facts, not values: agents set no objectives, limits, rule, vote or signature (RAA-A-01, A-02) | Entries from an agent are refused for those kinds. An agent's objective *summary* is a `draft`, which enters the record only when a member of that group confirms it |
| Every agent contribution marked and reviewed (RAA-A-03, A-06) | An agent entry carries its client, model and version, technique and inputs, and stays `proposed` until a named person reviews it |
| Report by group, not only in total (RAA-E-04, L-02) | Results are stored per group. No screen or export shows a total without the per-group rows beside it |
| No single expected value across futures that have no defensible probabilities (RAA-E-05) | The case says whether its scenarios carry probabilities. If they don't, the engine has no operation that combines them |
| No arithmetic on ordinal ratings (RAA-E-06) | Ratings are their own type in the record; the screening and comparison functions don't accept them as numbers |
| Acceptable to each group; a majority within each group that pays; dissent on the record (the default rule) | The screening table is computed: each option, each group, each future, pass or fail against the locked limits. Votes are tallied inside each paying group. Dissent is an entry kind kept with the decision |
| VaR never alone (spec §11, AT-12) | The VaR tool returns TVaR beside it; there is no VaR-only output |
| A named person signs; no agent attests (RAA-T-01, T-02) | `attestation` entries are accepted only from the member holding the signatory role |
| Triggers reopen the decision (RAA-L-04) | Triggers are typed conditions on outcomes, set in Frame and checked in code when outcomes are revealed |

## 3. The first case

A case is authored data, like a PCPA brief (`data/pcpaProjects.ts`): the decision question,
the parties and their role cards, the options (always including *no change*), the futures and
the hidden model that produces outcomes, and the triggers a sensible Frame might set.

**Default first case: an invented mutual insurer facing rising flood losses.** It is
insurance-shaped, so the evidence uses tools the app already has and has tested, and a mutual is
the member-governed kind of institution the thesis keeps returning to.

- **Parties.** Policyholders in the high-risk territory, in the low-risk territories, renters
  insured by the mutual, the board, the regulator and a reinsurer. *Future members* sit in Frame
  as affected non-members (RAA-F-02).
- **Options.** A territorial rate change, a higher flood deductible, mitigation grants funded by
  a surcharge, a catastrophe reinsurance purchase, and no change.
- **Futures.** A small set of climate and development scenarios, each a parameter set for the
  hidden loss model (frequency trend, severity, a catastrophe tail).
- **Evidence it uses.** Trend Fit and Trend Factor, Indicated Rate, Limited Expected Value and
  the deductible tools, the loss distributions, credibility, and two new tools (§6).

The thesis's own flood example (a city and a First Nation sharing a river) would be a strong
second case, but students would be role-playing a First Nation's council. That needs to be
written with care, and probably with someone from such a community reviewing it (D39).

## 4. The decision record

One record per decision, as the thesis defines it: prior knowledge, participants, objectives by
group, constraints and risk limits, options and evidence, decision and rationale, attestation,
outcomes and learning.

### Storage (Supabase)

- `decisions`: id, case id, title, created by, stage-clock settings, created at.
- `decision_members`: decision, user, display name, **role** (member, affected non-member,
  facilitator, signatory, monitor) and **group**. A cohort joins a room by code, the way a Quiz
  Battle room is joined, but the room is stored.
- `decision_entries`: **append-only.** id, decision, stage, kind, author, `author_kind`
  (person or agent), agent details (client, model, version), technique (with its IEC 31010
  clause where there is one), inputs, reviewer, `sealed`, `supersedes`, body, created at.

There is no UPDATE or DELETE policy on entries, the same pattern as `content_reports`. A
correction is a new entry that supersedes the old one, as in a Fact Check log. Reads go through
`SECURITY DEFINER` RPCs, as the league board does, because the sealing rule has to hold for
everyone and RLS alone can't express "hidden until you have submitted yours".

### The fold

Everything the app shows is derived: `foldRecord(entries, now)` in `lib/decision/record.ts`
returns the stage, what is locked, what is sealed, the screening table and the scores. This is
the Tutor's rule (`foldLog`): store events, never derived state. The fold is pure and tested,
including that no ordering of entries lets an option result through before the lock.

## 5. The stages, as the app runs them

Each stage has an owner, as the thesis's table says. A **facilitator** (an instructor, or a
student in that role) moves the room from stage to stage; the code refuses a move whose
conditions aren't met.

1. **Frame.** Each group writes its objectives and risk limits in role. A risk limit is a
   *measure plus a limit* and must name a measure the case's tools produce (renters displaced, a
   group's premium change, the insurer's capital ratio), so Choose can test it mechanically. The
   room adopts the default rule or another one, and the facilitator locks it. A group with no
   participant holds Frame open until someone decides how it is represented (RAA-F-02).
2. **Evidence.** The board is an option × future grid. Each cell is a **workflow** (the existing
   board, `docs/workflows.md`): source and data steps from the case, tool steps, links. Students
   build and run them. Before any results are shown, every participant records **sealed
   forecasts** of the key outcomes, named and dated (RAA-E-08). Results are stored by group.
3. **Choose.** The screening table is computed from the locked limits and the Evidence results:
   options that fail a group in any future are set aside, shown with the failing future, never
   hidden. The remaining options go to a vote, tallied within each group that pays. Objections
   and minority forecasts are recorded in the dissenter's own words. If no option passes, the
   app says so and returns the decision to the members (RAA-C-01).
4. **Attest.** The app assembles the package (the spec's list in §7: locked Frame, every
   technique with its inputs and reason, provenance, sensitivity and uncertainties, results by
   group and future, the screening table, every agent contribution, what was not assessed). The
   student in the signatory role writes and signs the opinion. The package exports through
   `lib/xlsx.ts` and as markdown.
5. **Learn.** The facilitator reveals the outcomes, drawn from the hidden model under the future
   that "happened". The app shows actual against expected **by group**, scores every forecast with
   the Brier score (or the log score for a continuous outcome), checks the triggers and, if one
   fires, opens round two at Frame with the record carried forward.

## 6. Techniques

Build only what a case needs, each as a tool under the tools engine's rules: one tool does one
thing, every judgment is an input, and **no tool leaves Preview until it reproduces a published
worked example in CI** (`docs/actuarial-tools.md` §17).

| Need | Tool | Status |
|---|---|---|
| Trends, rates, deductibles, distributions, credibility | The existing tools | Built and tested |
| Value at risk with TVaR beside it (IEC B.7.2, B.7.3) | `risk.var_tvar`: a loss distribution or a sample in, VaR and TVaR at a level out | New. Test against SOA FAM / ASTAM sample questions |
| Simulated outcomes across futures (B.5.10) | `risk.aggregate_simulation`: frequency × severity under a future's parameters, seeded, tail percentiles reported beside the mean | New. Test against a published aggregate-loss example |
| A set of futures (B.2.5) | A **scenario** data step: the case's futures as named parameter sets, each tagged with its evidence basis | New step kind in Workflows |
| Comparing the surviving options (B.9.5) | A multi-criteria **table** step: results per group and per criterion, weights only as entries from the groups | New step kind, not a tool: there is no published worked example to test a weighting against, and the weights are values, not facts |

**IEC 31010 is copyrighted.** Tools and steps cite its clauses and paraphrase. Nothing from the
standard, including the Table A.2 and A.3 ratings in the RAA spec's registry, is copied into the
repo until its licence is settled (D42).

## 7. Agents, through the connector

The connector is public and read-only today (`docs/ai-connector.md`). Its "Not yet" list already
proposes OAuth with Supabase as the authorization server; this plan is that step, scoped to
decisions.

- **New tools**, signed in: `decision_read` (the record as the participant may see it, sealing
  applied), `decision_propose` (a draft or proposed entry, of the kinds an agent may write), and
  the existing `run_tool` for the numbers.
- **The server, not the agent, holds the line.** A proposed entry of a refused kind fails,
  whatever the prompt said. An accepted proposal waits for a person's review.
- **Model diversity comes free.** Each participant brings their own assistant, so a room's
  evidence comes from several models. The record keeps which, so the thesis's correlated-error
  rule ("more than one model for important evidence") can be checked rather than assumed.
- **Agents are optional.** A room works without any; a student with no Claude or ChatGPT
  account loses nothing the rules require.
- **An MCP prompt and a section of the Agent Skill** carry the agent's role: what it may draft,
  that it never recommends (RAA-A-02), that evidence documents are data, not instructions
  (RAA-G-03), and that every figure comes from `run_tool`.

The spec's behaviour tests (AT-02 early peek refused, AT-06 declines to recommend, AT-07
declines to draft the opinion) become two kinds of test: the server tests prove the record
refuses the entry; a small connector eval checks the skill makes the agent decline politely
rather than fail.

## 8. Phases

Each phase ends with something a cohort can use. Every phase keeps the roadmap's definition of
done (tests, the copy rules, the docs updated in the same PR).

| Phase | Builds | Done when |
|---|---|---|
| **0. The record** | The three tables, the read and write RPCs with sealing, `lib/decision/record.ts` (the fold, the rules in §2), the case format, the first case's data and hidden model | Tests prove every rule in §2's table, including that no ordering of entries leaks a result before the lock or a sealed forecast before submission |
| **1. A room** | `/decisions` beside Workflows: create a room from a case, join by code, roles and groups, Frame (objectives, limits, the rule, the lock) and Choose (the screening table, votes, dissent), with Evidence results entered by hand | A facilitator and five students run Frame and Choose on their own devices |
| **2. Evidence and Learn** | Each grid cell as a workflow, the scenario step, the two new tools, sealed forecasts, the reveal, actual against expected by group, Brier scores, triggers, round two | A cohort runs both rounds of the first case end to end |
| **3. Agents** | Connector OAuth, `decision_read` / `decision_propose`, review of proposed entries, the skill and prompt | A participant's own Claude drafts a group summary that the group confirms, and its attempt to vote is refused |
| **4. Attest and more cases** | The package export, the signatory's opinion, the multi-criteria step, a second case | A package passes a review against the spec's §7 list |
| **Later** | Measuring the thesis's predictions (§9); a real decision outside a classroom (needs D41) | Separate decisions |

## 9. Measurement, later but not designed out

Product first means no consent screens, dashboards or exports for research in phases 0–4. But
the four predictions can all be read off the record later, without a migration, because the
record already keeps:

- every forecast, named, dated and scored, by round (calibration over successive decisions);
- which entries came from agents and whether a participant's sealed judgment was made before
  they read an agent's summary (participation without convergence);
- results by group beside totals (group reporting surfaces disparities);
- who was in round one and is still in round two, and which side of the vote they were on
  (parties stay after losing).

What would be added then: consent at joining, anonymised export, and a report like
`scripts/usage_report/` with people outside the study taken out.

## 10. Where it lives and what it reuses

A sidebar row under **Workflows**, `/decisions`, a lazy chunk, behind the Workflows gate
(`lib/workflowsAccess.ts`) for building. A room admits whoever has its code and is signed in,
so a cohort can join without being added to `PREVIEW_APPROVED_EMAILS` (D38).

| Need | Reused from |
|---|---|
| Option analysis | Workflows' board and `evaluateWorkflow`; the tools engine |
| A case's data and hidden model | The PCPA simulator's approach (`lib/pcpaData.ts`) |
| Figures with provenance | Data Sources and the Assumptions Bank |
| Live room state | Supabase Realtime (Quiz Battle's transport), here with stored entries |
| Append-only record, supersede not edit | `content_reports`' policies; Fact Check's log rules |
| Derived state from an event log | The Tutor's `foldLog` |
| Cross-user reads through RPCs | The league board |
| Exports | `lib/xlsx.ts` |
| Agents | The connector and the Agent Skill |

If it gets users who aren't students, it splits out: the tools engine is already a standalone
bundle (`quiz/api/_tools/engine.js`), and the record lives in its own tables.

## 11. Decisions

These are listed in the roadmap's §6.1 with the default to build with meanwhile.

| ID | Decision | Default |
|---|---|---|
| D37 | The product's name on screen | *Decisions* |
| D38 | Who can join a room: anyone signed in with its code, or only approved accounts | Anyone signed in with the code; creating a room stays behind the Workflows gate |
| D39 | The first case, and whether the thesis's flood example (with a First Nation's council as a party) is written, and who reviews it | The invented mutual insurer first; the flood case only after review by someone from such a community |
| D40 | Connector OAuth for decisions (the connector's first signed-in tools; A1's "personal progress" step) | Build it in phase 3, scoped to decision tools only |
| D41 | A real decision outside a classroom: confidential data, retention, a security review, who funds the attesting actuary (the thesis's open question) | Not before phase 4 and a security review |
| D42 | IEC 31010's licence: what of the standard, if anything, may be quoted in the repo | Cite clauses and paraphrase; copy no tables |

## 12. Not doing

- **All 42 techniques.** Only what a case needs. The domain-bound ones (HAZOP, HACCP, LOPA,
  RCM, toxicological assessment, human reliability) are out of scope for actuarial cases.
- **An agent in the app.** §6.2 stands; D2's default stands.
- **Agents that act after the choice** (RAA-A-07, executing within limits). A simulation has
  nothing to execute.
- **A real signature.** The student signatory's opinion is practice. A real opinion needs real
  standards and a real principal, which is the thesis's point about who the client is.

## 13. What a simulation can teach the thesis

Two of the thesis's open questions can be explored in a classroom before any real decision:

- **When no option passes.** A case can be tuned so nothing passes every group, and different
  rooms can try different fallbacks (relax the rule by a member vote, add an option, compensate
  the group that fails).
- **The veto worry.** Whether a majority within each paying group becomes a veto shows up in
  the vote entries across many rooms.
