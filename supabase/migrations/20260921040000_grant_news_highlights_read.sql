-- Row level security decides which rows a role may see, but the role also needs
-- table-level privilege to query the table at all. Without this grant the public
-- site's anon-key queries fail with "permission denied for table news_highlights"
-- (42501) before the "published = true" policy is ever evaluated.
-- Read-only: no insert/update/delete for anon or authenticated.
grant select on public.news_highlights to anon, authenticated;
