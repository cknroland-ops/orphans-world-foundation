import { NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';

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
