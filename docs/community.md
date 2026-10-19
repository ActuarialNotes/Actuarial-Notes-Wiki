# Community

The Community tab (`/community`) is a hub for connecting with other actuaries. It doesn't host
a conversation of its own. It links to the places where actuaries already gather and answers
three questions:

1. **What are actuaries saying?** The newest posts on r/actuary, exactly as they were posted.
2. **What is coming up near me?** Upcoming meetings, sorted by distance from a city the reader
   chooses.
3. **Where can I join in?** Forums, the CAS regional affiliates, local actuaries' clubs and
   student associations.

The reader browses and follows all three by **topic**: Exams (and each exam under it),
Careers, Reforms & Regulation, AI & Technology, Property & Casualty, Life, Health & Pensions,
Climate & Catastrophe, Credentials & Professionalism, and Meetings & Events.

The tab is in **Preview**. It is open only to the accounts on `COMMUNITY_APPROVED_EMAILS` in
`quiz/src/lib/community/access.ts`, which is one account today. Anyone else sees no sidebar
row, and `/community` sends them to the dashboard. `COMMUNITY_ENABLED` in `featureFlags.ts`
turns the whole tab off. The e2e build opens the tab to every viewer with
`VITE_COMMUNITY_PREVIEW=on`. Who sees it next is decision D26 in the roadmap.

## The rule: transcribed, never constructed

The vault's rule applies here as everywhere else (roadmap §6.2).

- **Posts.** A post's title, author, flair, counts and text are passed through exactly as the
  archive states them. The excerpt is the start of the post's own text, cut at a word and
  marked with an ellipsis. Nothing is summarised or reworded. The endpoint drops any post the
  archive marks removed, deleted or NSFW.
- **Places and events.** Every name, date, venue, link and territory is copied from the
  organiser's own page. Each entry records that page (`source`) and the day it was read
  (`checked`). If a page doesn't state something, the entry leaves it out: an event with no
  venue on its page has `venue: null`, and `hybrid` is true only where the page offers a way
  to attend online.
  - A few clubs have no website. Their entry rests on the directory that lists them: the SOA's
    actuarial clubs page, the CIA's clubs and associations page, or the CAS's affiliate list.
  - Some pages list a meeting by date and venue but give it no title (SEAC's conferences, the
    Chicago Actuarial Association's workshop). For those, the title is the organiser's own
    name for the meeting.
- **Coordinates.** A city's coordinates are approximate city centres. They are the one thing
  worked out rather than read, they are used only to measure distance, and they are never
  printed.
- **Topic tags.** Tags are matched by plain word patterns (`lib/community/topics.ts`), so they
  follow a rule a reader could apply by eye. They are never a model's judgment. The patterns
  would rather miss a post than tag it wrongly, so ambiguous words are left out: a bare "P",
  "bill", "R".

## Where things live

| Piece | File |
|---|---|
| Access rule | `lib/community/access.ts` (pure, tested) |
| Topics: the catalogue, the classifier, follows | `lib/community/topics.ts` (pure, tested) |
| The feed's client half: parse, tag, filter | `lib/community/feed.ts` (pure, tested) |
| Places and events: upcoming, distance, nearness, affiliate territories, dates | `lib/community/places.ts` (pure, tested) |
| The feed endpoint | `quiz/api/community-feed.js` (tested by `lib/communityFeedEndpoint.test.ts`) |
| Catalogue | `data/communityPlaces.ts`, `data/communityEvents.ts` (held to their shape by `data/communityContent.test.ts`) |
| Reader's state: followed topics and places, home city, radius | `hooks/useCommunity.ts` (localStorage, `community.v1`) |
| Page | `pages/Community.tsx` (lazy), `components/community/` |
| Flow | `e2e/community.spec.ts` |

## The feed

`GET /api/community-feed` reads the newest 100 posts on r/actuary through the **Arctic Shift**
archive, which is also how the Store's reviews are read. It goes through the archive because
Reddit answers a cloud host's JSON requests with a 403. It is a server function because
neither Reddit nor the archive sends CORS headers.

- **Caching.** The CDN keeps a response for a quarter hour. A failed read is cached for only a
  minute.
- **When the archive can't be read.** The endpoint answers `{ posts: [] }`. The page then says
  plainly that the feed couldn't be read and links to the subreddit, rather than showing an
  empty feed as if nobody had posted.

## Near me

The reader picks a **home** in one of two ways:

- **From a list.** The list holds every city a community or an in-person event is in
  (`homeCities`).
- **"Near me".** The browser's location is snapped to the nearest city in that list. Only the
  city is stored, never the location itself.

`splitByDistance` sorts events and places into four groups:

- **near:** in person and within the chosen radius, nearest first.
- **online:** online only, or in person out of reach but joinable online (a hybrid meeting).
- **farther:** in person and beyond reach.
- **elsewhere:** neither a city nor online, which is what a CAS regional affiliate is.

An affiliate serves a **territory** rather than a city, so `servingHome` matches the home's
province or state against the territories each affiliate names on its page. A Toronto reader
is shown OCCA.

## Keeping it current

`upcomingEvents` drops past events from every list on its own. Refreshing the catalogue takes
three steps:

1. Re-read the sources (the CAS calendar, the SOA's events pages, the CIA's events page, the
   clubs' own sites).
2. Add the new meetings, each with its `source` and `checked`.
3. Prune the ones that have passed.

`communityContent.test.ts` fails on a malformed date, a missing source, or a host id that
isn't in the catalogue.

## Next

- **A refresh routine for the events table.** Events go stale fastest.
- **More sources in the feed.** GoActuary is a Discourse forum, and Discourse serves
  `latest.json`.
- **A server table for follows**, once the tab leaves Preview, so they cross devices.
