-- ============================================================
-- ORPHANS WORLD FOUNDATION — Script de configuration Supabase
-- Compatible avec le plan gratuit (Free Tier)
-- À exécuter dans : Dashboard Supabase > SQL Editor
-- ============================================================


-- ============================================================
-- 1. TABLE : articles (Blog & Événements)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.articles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  contenu      TEXT,
  extrait      TEXT,
  image_url    TEXT,
  categorie    TEXT DEFAULT 'blog',
  publie       BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique articles"
  ON public.articles FOR SELECT
  USING (publie = true);

CREATE POLICY "Admin full access articles"
  ON public.articles FOR ALL
  USING (auth.role() = 'authenticated');


-- ============================================================
-- 2. TABLE : temoignages
-- ============================================================
CREATE TABLE IF NOT EXISTS public.temoignages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom          TEXT NOT NULL,
  role         TEXT,
  contenu      TEXT NOT NULL,
  photo_url    TEXT,
  publie       BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.temoignages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique temoignages"
  ON public.temoignages FOR SELECT
  USING (publie = true);

CREATE POLICY "Admin full access temoignages"
  ON public.temoignages FOR ALL
  USING (auth.role() = 'authenticated');


-- ============================================================
-- 3. TABLE : partenaires (avec Realtime activé)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.partenaires (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom          TEXT NOT NULL,
  logo_url     TEXT,
  site_web     TEXT,
  actif        BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.partenaires ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique partenaires"
  ON public.partenaires FOR SELECT
  USING (actif = true);

CREATE POLICY "Admin full access partenaires"
  ON public.partenaires FOR ALL
  USING (auth.role() = 'authenticated');

ALTER PUBLICATION supabase_realtime ADD TABLE public.partenaires;


-- ============================================================
-- 4. TABLE : membres_equipe
-- ============================================================
CREATE TABLE IF NOT EXISTS public.membres_equipe (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom          TEXT NOT NULL,
  poste        TEXT,
  bio          TEXT,
  photo_url    TEXT,
  ordre        INTEGER DEFAULT 0,
  actif        BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.membres_equipe ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique membres"
  ON public.membres_equipe FOR SELECT
  USING (actif = true);

CREATE POLICY "Admin full access membres"
  ON public.membres_equipe FOR ALL
  USING (auth.role() = 'authenticated');


-- ============================================================
-- 5. TABLE : contacts (Formulaire de contact)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom          TEXT NOT NULL,
  email        TEXT NOT NULL,
  sujet        TEXT,
  message      TEXT NOT NULL,
  lu           BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Insertion publique contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin full access contacts"
  ON public.contacts FOR ALL
  USING (auth.role() = 'authenticated');


-- ============================================================
-- 6. TABLE : newsletter
-- ============================================================
CREATE TABLE IF NOT EXISTS public.newsletter (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        TEXT NOT NULL UNIQUE,
  actif        BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Insertion publique newsletter"
  ON public.newsletter FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin full access newsletter"
  ON public.newsletter FOR ALL
  USING (auth.role() = 'authenticated');


-- ============================================================
-- 7. DONNÉE DE TEST : Témoignage de Caroline (par défaut)
-- ============================================================
INSERT INTO public.temoignages (nom, role, contenu, photo_url, publie)
VALUES (
  'Mugoli Musese Caroline',
  'Présidente commission santé',
  'L''engagement de la fondation envers les jeunes vulnérables est tout simplement incroyable. Nous avons vu des enfants retrouver le sourire et des familles se reconstruire avec dignité.',
  '/component_pictures/a_propos/membres_de_l_organisation/caroline.jpeg',
  true
);
