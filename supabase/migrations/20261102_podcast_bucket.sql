-- The daily podcast: Today's Study Plan read aloud (docs/daily-podcast.md). One
-- public bucket of short mp3 clips — a concept's brief, its refresher, and three
-- fixed bridges — and `index.json`, which lists the clips current with the vault.
--
-- Public, because a clip is a concept page's own text read aloud: the same text
-- every reader can already read. What makes the podcast Pro is the episode —
-- today's plan put in order and played — which only the Pro study plan card
-- offers. Read access needs no policy on a public bucket; there is deliberately
-- NO insert/update/delete policy, so only the service role — the `sync` command
-- of quiz/scripts/podcast-segments.mjs, run by .github/workflows/podcast-segments.yml
-- — can write to it.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'podcast',
  'podcast',
  true,
  10485760, -- 10 MB: a brief is ~0.5 MB at 64 kbps; the index is a few hundred KB
  array['audio/mpeg', 'application/json']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
