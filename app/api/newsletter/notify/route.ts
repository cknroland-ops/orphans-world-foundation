import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../../lib/supabase-server';
import { notifyNewsletterSubscribers } from '../../../../lib/newsletter-mail';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://orphansworldfoundation.org';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });

    const body = await req.json();
    if (!body?.type || !body?.title || !body?.summary) {
      return NextResponse.json({ error: 'Données de notification incomplètes.' }, { status: 400 });
    }

    const isEvent = body.type === 'event';
    const result = await notifyNewsletterSubscribers({
      subject: isEvent ? `Nouvel événement : ${body.title}` : `Nouvel article : ${body.title}`,
      title: body.title,
      summary: body.summary,
      url: body.url || `${BASE_URL}/`,
      cta: isEvent ? "Voir l'événement" : "Lire l'article",
    });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('[API /newsletter/notify] Error:', error);
    return NextResponse.json({ error: 'Impossible d’envoyer la notification.' }, { status: 500 });
  }
}
