import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from('newsletter').insert({ email });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Cet email est déjà inscrit à la newsletter.' }, { status: 409 });
      }
      console.error('Supabase newsletter error:', error);
      return NextResponse.json({ error: 'Erreur lors de l\'inscription.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter API error:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}
