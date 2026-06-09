-- research_documents.url must be unique for the upsert in research-ingest
-- (onConflict: 'url') to work. The original migration declared it NOT NULL
-- but omitted the UNIQUE constraint.
alter table research_documents add constraint research_documents_url_key unique (url);
