-- ============================================================
-- ORPHANS WORLD FOUNDATION — Table de suivi des visites
-- À exécuter dans : Dashboard Supabase > SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.visites (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT NOT NULL,
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT visites_session_date_unique UNIQUE (session_id, date)
);

ALTER TABLE public.visites ENABLE ROW LEVEL SECURITY;

-- Les visiteurs anonymes peuvent enregistrer leur visite
CREATE POLICY "Insert anonyme visites"
  ON public.visites FOR INSERT
  WITH CHECK (true);

-- Seuls les admins authentifiés peuvent lire les statistiques
CREATE POLICY "Lecture admin visites"
  ON public.visites FOR SELECT
  USING (auth.role() = 'authenticated');
