import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';
import { notifyNewsletterSubscribers } from '../../../lib/newsletter-mail';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('articles')
      .select('id, titre, slug, extrait, contenu, image_url, categorie, created_at, publie')
      .eq('publie', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[API /articles] Supabase error:', error.message);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data ?? [], {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('[API /articles] Unexpected error:', err);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { titre, slug, extrait, contenu, categorie, publie, image_url } = body;
    if (!titre || !extrait || !slug) {
      return NextResponse.json({ error: 'Titre, slug et extrait sont obligatoires.' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: article, error } = await supabase
      .from('articles')
      .insert({ titre, slug, extrait, contenu: contenu || null, categorie: categorie || 'blog', publie: Boolean(publie), image_url: image_url || null })
      .select('id, titre, slug, extrait, publie')
      .single();

    if (error || !article) {
      console.error('[API /articles] Insert error:', error);
      return NextResponse.json({ error: "Impossible d'enregistrer l'article." }, { status: 500 });
    }

    if (article.publie) {
      try { await notifyNewsletterSubscribers({ subject: `Nouvel article : ${article.titre}`, title: article.titre, summary: article.extrait, url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://orphansworldfoundation.org'}/?page=blog&article=${encodeURIComponent(article.slug)}`, cta: "Lire l'article" }); }
      catch (notificationError) { console.error('[API /articles] Notification error:', notificationError); }
    }
    return NextResponse.json({ success: true, article });
  } catch (err) {
    console.error('[API /articles] Create error:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}
