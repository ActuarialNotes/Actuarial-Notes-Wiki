-- Research ontology v2: three changes driven by Actuarial-Ontology alignment review.
--
-- 1. Add 8 insurers present in the Actuarial-Ontology knowledge base but absent from
--    the original seed (Definity, Allstate, Wawanesa, Chubb, SGI Canada, MPI, SAAQ,
--    Gore Mutual). Keeps the agent registry consistent with the reference ontology.
--
-- 2. Add `accounting_standard` to research_documents so OSFI IFRS 17 implementation
--    bulletins are filterable independently of document type. The AO models IFRS17,
--    GAAP, and Solvency2 as first-class classes; this column is the pragmatic bridge.
--
-- 3. Add a trigger enforcing that `statistical_member_of` relationships in
--    research_relationships always originate from an `industry_bureau` agent.
--    `industry_bureau` is a local extension type (no direct AO equivalent); the
--    semantic constraint exists in researchOntology.ts:agentRelationship() but was
--    not previously enforced at the DB layer.

-- ── 1. Additional agents ──────────────────────────────────────────────────────
insert into research_agents (id, type, legal_name, short_name, jurisdiction, is_active)
values
  ('definity',       'federally_incorporated_insurer', 'Definity Financial Corporation',               'Definity',    '{"scope":"multi_provincial","provinces":["ON","AB","BC","QC"],"domains":["financial_disclosure"]}', true),
  ('allstate-canada','federally_incorporated_insurer', 'Allstate Insurance Company of Canada',         'Allstate',    '{"scope":"multi_provincial","provinces":["ON","AB","QC","BC"],"domains":["financial_disclosure"]}', true),
  ('wawanesa',       'federally_incorporated_insurer', 'Wawanesa Mutual Insurance Company',            'Wawanesa',    '{"scope":"multi_provincial","provinces":["BC","MB","ON"],"domains":["financial_disclosure"]}',       true),
  ('chubb-canada',   'federally_incorporated_insurer', 'Chubb Insurance Company of Canada',            'Chubb',       '{"scope":"multi_provincial","provinces":["ON","AB","QC","BC"],"domains":["financial_disclosure"]}', true),
  ('gore-mutual',    'province_incorporated_insurer',  'Gore Mutual Insurance Company',                'Gore Mutual', '{"scope":"multi_provincial","provinces":["ON","BC"],"domains":["financial_disclosure"]}',            true),
  ('sgi-canada',     'public_insurer',                 'SGI Canada',                                   'SGI Canada',  '{"scope":"multi_provincial","provinces":["SK","AB","MB","ON","BC"],"domains":["product_regulation"]}',true),
  ('mpi',            'public_insurer',                 'Manitoba Public Insurance',                     'MPI',         '{"scope":"provincial","provinces":["MB"],"domains":["product_regulation"]}',                        true),
  ('saaq',           'public_insurer',                 'Société de l''assurance automobile du Québec', 'SAAQ',        '{"scope":"provincial","provinces":["QC"],"domains":["product_regulation"]}',                        true)
on conflict (id) do nothing;

-- ── 2. accounting_standard column ────────────────────────────────────────────
-- Null = not standard-specific (most documents). Set explicitly for IFRS 17
-- transition documents, IFRS 4 filings, etc. to make them filterable.
alter table research_documents
  add column if not exists accounting_standard text
    check (accounting_standard in ('ifrs17', 'ifrs4', 'canadian_gaap', 'us_gaap', 'solvency2'));

comment on column research_documents.accounting_standard is
  'Accounting/solvency standard the document primarily references. '
  'Null = not standard-specific. Values mirror AO classes IFRS17, Solvency2, GAAP. '
  'MCT/MCCSR filings use null (they are capital tests, not accounting standards).';

-- ── 3. Trigger: statistical_member_of must originate from industry_bureau ─────
create or replace function enforce_statistical_member_of()
returns trigger language plpgsql as $$
begin
  if new.type = 'statistical_member_of' then
    if not exists (
      select 1 from research_agents
      where id = new.from_agent and type = 'industry_bureau'
    ) then
      raise exception
        'statistical_member_of relationships must originate from an industry_bureau agent '
        '(from_agent=% has type %)',
        new.from_agent,
        (select type from research_agents where id = new.from_agent);
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_statistical_member_of on research_relationships;
create trigger trg_statistical_member_of
  before insert or update on research_relationships
  for each row execute function enforce_statistical_member_of();
