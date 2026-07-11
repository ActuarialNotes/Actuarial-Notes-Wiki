# Weekly XP Leagues (roadmap P4.1)

Opt-in, Duolingo-style weekly leaderboards, **one league per exam**: students
who join an exam's league are grouped into **cohorts of up to 30** at their
**tier** for the current UTC week and ranked by the XP they earn on that exam;
when the week ends, the top of each cohort is promoted a tier and the bottom
(plus anyone who earned nothing) is relegated. A student studying several exams
competes in a separate league for each. The feature is deliberately light social
— no chat, no friending, no public profiles — and **privacy-first**: nothing is
shared until the student explicitly joins, and leaving deletes what was shared.

The **exam** key is the exam_progress key (`'P'`, `'FM'`, `'MAS-I'`, …), the
same value `EXAM_LABEL_TO_ID` / `wikiExamIdToProgressKey` produce on the client
and that quiz completion credits XP to.

Where the pieces live:

| Piece | File |
|---|---|
| Shared constants + rendering math (pure, tested) | `quiz/src/lib/leagues.ts` (+ `leagues.test.ts`) |
| Client sync glue (RPC calls, `LEAGUE_EVENT`) | `quiz/src/lib/leagueStore.ts` |
| Hook (load + realtime + event + focus refresh) | `quiz/src/hooks/useLeague.ts` — `useLeague(exam)` |
| Leaderboard UI (Level popup tab) + its exam selector | `quiz/src/components/LeaderboardPanel.tsx` |
| Level badge popup that hosts the tab (Level / Quests / League) | `quiz/src/components/LevelBadge.tsx` |
| Settings opt-in card | `quiz/src/components/LeagueSettingsCard.tsx` |
| Tables + RLS + all server logic | `supabase/migrations/20260710_leagues.sql` |
| Feature flag | `LEAGUES_ENABLED` in `quiz/src/lib/featureFlags.ts` |

## Where it surfaces

There is no standalone Dashboard card. The leaderboard lives as the **League
tab** inside the Level-badge popup (top-left of the Dashboard), alongside the
**Level** and **Quests** tabs (`LevelBadge.tsx` → `LeaderboardPanel.tsx` /
`QuestsPanel.tsx`). Because leagues are per-exam, the League tab carries a
compact exam selector (styled like the Dashboard exam pills, smaller) when more
than one exam is active, defaulting to the Dashboard's active exam. Settings has
a parallel opt-in card with its own exam selector.

## Privacy model

Display name and avatar normally live in `auth.users.user_metadata`, which is
**not readable across users** — so a leaderboard has to copy them somewhere
cohort-mates can see. The design makes that copy an explicit, reversible act:

- **Nothing is shared until join.** The join UI (League tab and Settings)
  previews exactly what will be shared: display name, avatar, weekly XP —
  never email, user id, or any study data.
- **Joining snapshots** the profile name/avatar into `league_members` (visible
  to the cohort via the board RPC) and into `user_leagues` (so the weekly
  rollover can re-enroll the user without touching `auth.users`). Profile
  changes do *not* propagate automatically — rejoining refreshes the snapshot.
- **Leaving deletes** the `league_members` row immediately and NULLs the
  snapshots in `user_leagues`. Tier and last result are retained so a returning
  user resumes their ladder position.
- **Board reads are RPC-only.** `league_cohorts` and `league_members` have RLS
  enabled with **zero policies**, so no client can select from them at all.
  The only read path is `get_league_board(p_exam)`, which returns
  `(rank, display_name, avatar_url, weekly_xp, is_self)` for the caller's own
  cohort in that exam — peer user ids are never exposed; the caller finds
  themself via `is_self`. (This is also why the board has no realtime
  subscription — see Deferrals.)
- **Writes are server-authoritative.** All mutations go through
  `SECURITY DEFINER` RPCs (the `award_gems` pattern): the client can *add*
  earned XP via `record_league_xp(p_exam, p_amount)` but can never set totals,
  tier, or rank.

The RPCs are `join_league(p_exam, p_display_name, p_avatar_url)` →
returns the joined tier, `leave_league(p_exam)`, `record_league_xp(p_exam,
p_amount)` → new weekly total or NULL when not a member, and
`get_league_board(p_exam)`. Every one first runs `league_rollover_if_due()`.
Tables are keyed per-exam: `league_cohorts (exam, tier, week_start)`,
`league_members` unique on `(user_id, exam)`, and `user_leagues` with PK
`(user_id, exam)`.

## The ladder

Five tiers, indexed 0–4 (`LEAGUE_TIERS` in `lib/leagues.ts`, `CHECK` constraints
in SQL): **Bronze → Silver → Gold → Sapphire → Diamond**. First-time joiners
start at Bronze; the stored tier in `user_leagues` survives leaving/rejoining.

### Promotion / demotion zones

For a cohort of `n` ranked members:

```
promote = min(10, ceil(n / 3))    demote = min(5, floor(n / 5))
```

- Clamped at the ladder ends: no promotion out of Diamond, no demotion out of
  Bronze (a clamped move records as `stayed`).
- **Zero-XP rule:** a member who finishes the week with 0 XP is demoted
  regardless of rank (takes precedence over the promotion branch). Keeps
  inactive accounts from squatting tiers.
- Small cohorts degrade sensibly: a lone active member still promotes; a
  4-person cohort promotes 2 and demotes nobody.

**The formulas are deliberately duplicated** in `league_rollover_if_due()` (SQL)
and `promoteCount`/`demoteCount`/`zoneForRank` (TS, used only to render the zone
dividers). They're one-liners so they can't drift far, and `leagues.test.ts`
locks the TS side — if a zone test needs changing, change the SQL too.

## The week

Weeks run **Monday 00:00 UTC → Monday 00:00 UTC**
(`date_trunc('week', now() at time zone 'utc')` server-side; `weekStartUtc` /
`weekKey` client-side). Server-defined UTC on purpose: every member of a cohort
must share one boundary, and a client-supplied timezone would be spoofable —
unlike the streak/XP *daily* counters, which are deliberately local per user.

## Lazy rollover

There is no cron. Every public RPC (`join_league`, `record_league_xp`,
`get_league_board`) first calls `league_rollover_if_due()`:

1. Fast exit if no cohort has `week_start < league_week_start()`.
2. `pg_advisory_xact_lock(hashtext('league_rollover'))`, then **re-check** —
   concurrent Monday-morning calls collapse into exactly one rollover; the
   losers of the lock race see fresh state and no-op.
3. Rank every stale cohort (`row_number()` over `weekly_xp DESC, joined_at ASC`
   — unique, deterministic ranks; earlier join wins ties), resolve each
   member's new tier per the zone formulas + zero-XP rule, and write
   `tier` / `last_result` / `last_result_week` / `last_rank` to `user_leagues`.
4. Delete the stale cohorts (memberships cascade). **No history is kept** — by
   design, the previous week's board ceases to exist; only each user's own
   result survives, on their own row.
5. Re-enroll every still-opted-in user into fresh cohorts at their new tier
   (`league_assign_member`: first open cohort by age, else create one).

A gap of several zero-traffic weeks collapses into a **single one-step
rollover** — acceptable at current scale, documented simplification.

Invariant (per exam): `user_leagues.opted_in = true` ⟺ the user has a
`league_members` row for that exam for the current week (once rollover has run).
Join establishes both, leave clears both, rollover re-establishes it for
everyone opted in. Rollover runs globally across all exams in one pass.

## XP flow

`record_league_xp(exam, amount)` is called fire-and-forget on **quiz
completion** (`awardXpAndQuests` in `stores/quizStore.ts`), with the same amount
as `recordXp` and the quiz's exam (`EXAM_LABEL_TO_ID[questions[0].exam]`). The
RPC silently no-ops (returns NULL) for non-members and untracked exams, so the
client never needs to know membership before calling; guests short-circuit
client-side. XP earned *before* joining does not count retroactively — the
weekly total starts at 0 at join time.

Quest-claim XP is **deliberately not** credited to leagues: quests are
cross-exam (one daily board across all study), while a league is per-exam, so
there is no single exam to attribute the bonus to. League XP is quiz XP only.

Like every store in the gamification family, `leagueStore` **never throws**: a
league failure must not break quiz completion.

## Edge cases

| Case | Behavior |
|---|---|
| Mid-week join | Joins an open current-week cohort for that exam at the stored tier, `weekly_xp = 0`. |
| Leave mid-week | Membership row gone at once; no result recorded at rollover. |
| Rejoin later | Resumes stored tier (per exam); snapshots re-taken from the current profile. |
| Zero-XP week | Demoted one tier (Bronze floor → `stayed`). |
| Cohort of 1 | An active lone member promotes; an inactive one demotes (zero-XP rule). |
| Cohort-cap race | Soft cap — a concurrent join may overfill a cohort by one; harmless. |
| Multiple exams | Independent leagues, tiers, and opt-in per exam; the League tab's selector switches between them. |
| Unmigrated env | Store functions catch and `console.warn`; the tab shows the join view. |

## Deliberate deferrals

- **Board realtime** — would need a SELECT policy on `league_members` (leaking
  peer user ids) or per-cohort channels; refetch on `LEAGUE_EVENT` / tab focus
  is plenty for a weekly board.
- **Study-group leaderboards** (the "and/or" half of P4.1) — private invite-code
  groups could reuse the member/board/RPC shape later.
- **Multi-week catch-up granularity** — see Lazy rollover.
- **League history** — nothing is stored beyond each user's last result.
