-- Listen recordings: the pre-made voice-overs the Listen view plays instead of the
-- browser voice (docs/listen-recordings.md). One public bucket of mp3 files and the
-- small JSON manifests that time them.
--
-- Public, because a recording is the page's own text read aloud and the app plays it
-- with a plain <audio src>. Read access needs no policy on a public bucket; there is
-- deliberately NO insert/update/delete policy, so only the service role — the
-- `upload` command of quiz/scripts/listen-recording.mjs — can write to it.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listen',
  'listen',
  true,
  20971520, -- 20 MB: a long page at 64 kbps is a few MB
  array['audio/mpeg', 'application/json']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
