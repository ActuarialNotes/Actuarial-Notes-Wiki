-- Add user_subscriptions to the Supabase Realtime publication so that the
-- useSubscription hook's postgres_changes listener receives updates when
-- stripe-sync-session upserts the tier/status after checkout completes.
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_subscriptions;
