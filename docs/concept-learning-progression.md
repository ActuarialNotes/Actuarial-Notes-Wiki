# Concept Learning Progression

Every concept in the quiz system moves through a five-state mastery ladder. The ladder is designed around the Ebbinghaus forgetting curve: the more you've successfully recalled something, the longer it stays in memory before you need to revisit it.

## The Five States

| State | Meaning |
|---|---|
| **New** | You haven't answered a question on this concept yet |
| **Level 1** | First correct answer — concept is on your radar |
| **Level 2** | Reinforced — you've answered it correctly across two sessions |
| **Level 3** | Mastered — answered correctly three or more times, including at least once on a hard question |
| **Forgotten** | Mastery was lost due to inactivity or a run of failures |

## Advancing Through the Levels

Correct answers move a concept up the ladder. A few rules keep the progression meaningful:

- **New → Level 1**: Any correct answer, no matter the difficulty.
- **Level 1 → Level 2**: At least 2 total correct answers on the concept.
- **Level 2 → Level 3**: At least 3 total correct answers **and** at least 1 of them must have been on a hard-difficulty question. This prevents reaching full mastery by only practising easy variations.
- **One advance per day**: A concept can only move up one level per calendar day, regardless of how many questions you answer. If you answer a concept correctly multiple times in a session, the later answers still count toward your totals — they just don't trigger another level jump until tomorrow.

## Falling Back: Failures

Three consecutive incorrect answers on a concept that you previously learned (Level 1 or above) drop it to **Forgotten**. This only triggers if the concept was learned on a prior day; a concept you first encountered today cannot be forgotten in the same session.

A forgotten concept re-enters the ladder on your next correct answer, just like a new one — you earn Level 3 back from scratch.

## Falling Back: Decay

Even without failures, mastery fades if you don't revisit a concept. The gaps grow longer at higher levels, reflecting that well-recalled material is genuinely more durable:

| Level | Drops to | After |
|---|---|---|
| Level 3 | Level 2 | 30 days without a correct answer |
| Level 2 | Level 1 | 14 more days (44 days total from Level 3) |
| Level 1 | Forgotten | 7 more days (51 days total from Level 3) |

Decay is computed at the moment you open a concept, not on a schedule, so there are no background jobs silently changing your progress.

## The Learning Progress Graph

The concept detail view shows a step-function chart of your mastery over time:

- **Y-axis**: The five levels, from Forgotten (bottom) to Level 3 (top).
- **X-axis**: Calendar dates.
- **Green dots**: Correct answers.
- **Red dots**: Incorrect answers.
- **Step line**: When the state changed and in which direction.

The graph also draws **projected decay steps** — forward-looking dashes that show when your current level will start to slide if you don't revisit the concept. This makes it easy to spot concepts that are about to need attention before they actually decay.

## Concept Aliases

Some concepts are displayed under a short name (e.g. "Price") but stored under their full canonical name (e.g. "Bond Price"). The system resolves aliases automatically so your mastery record follows the concept regardless of which name appears in a question or on the wiki page.

## What "Mastered" Means for the Study Plan

Only Level 3 concepts count as mastered for pacing purposes. Level 1 and Level 2 concepts are still in-progress and will appear in upcoming study plan sessions until they reach Level 3. See [Study Plan Generation](study-plan-generation.md) for how mastery state drives scheduling.
