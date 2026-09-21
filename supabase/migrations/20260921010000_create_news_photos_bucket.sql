-- Public bucket for Brother Highlight photos. Public means anyone can fetch an
-- object by its URL (/storage/v1/object/public/news-photos/...); no select
-- policy is added, so the bucket contents cannot be listed through the API.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'news-photos',
  'news-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- Only admins can upload, replace, or remove photos. An admin is a user whose
-- app_metadata.role is 'admin'; app_metadata can only be set server-side (service
-- role or Supabase dashboard), never by the user. Dashboard uploads and the
-- service role bypass these policies regardless.
create policy "Admins can upload news photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'news-photos' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update news photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'news-photos' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check (bucket_id = 'news-photos' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete news photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'news-photos' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
