import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';
import nodemailer from 'nodemailer';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://orphansworldfoundation.org';

function escapeHtml(value: string) {
  const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return value.replace(/[&<>"']/g, (character) => entities[character] ?? character);
}

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
      try { await notifyNewsletterSubscribers(article); }
      catch (notificationError) { console.error('[API /articles] Notification error:', notificationError); }
    }
    return NextResponse.json({ success: true, article });
  } catch (err) {
    console.error('[API /articles] Create error:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}

async function notifyNewsletterSubscribers(article: { titre: string; slug: string; extrait: string }) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) return;

  const supabase = createAdminClient();
  const { data: subscribers, error } = await supabase.from('newsletter').select('email');
  if (error) throw error;

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: gmailUser, pass: gmailPass } });
  const articleUrl = `${BASE_URL}/blog/${encodeURIComponent(article.slug)}`;
  await Promise.all((subscribers ?? []).map(({ email }) => transporter.sendMail({
    from: gmailUser,
    to: email,
    subject: `Nouvel article : ${article.titre}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#0f1824">
      <h1>${escapeHtml(article.titre)}</h1><p>${escapeHtml(article.extrait)}</p>
      <p><a href="${articleUrl}" style="display:inline-block;background:#c0392b;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none">Lire l'article</a></p>
      <hr style="border:0;border-top:1px solid #eee;margin:32px 0">
      <p style="font-size:12px;color:#777">Vous recevez cet e-mail car vous êtes inscrit à la newsletter d'Orphans World Foundation.<br>
        <a href="${BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}">Se désinscrire</a></p>
    </div>`,
  })));
}
