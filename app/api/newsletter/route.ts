import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';
import { sendWelcomeEmail } from '../../../lib/newsletter-mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

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
      return NextResponse.json({ error: "Erreur lors de l'inscription." }, { status: 500 });
    }

    let emailSent = false;
    try { emailSent = await sendWelcomeEmail(email); }
    catch (emailError) { console.error('Newsletter confirmation email failed:', emailError); }

    return NextResponse.json({
      success: true,
      emailSent,
      message: emailSent ? 'Inscription réussie. Vérifiez votre boîte de réception.' : 'Inscription réussie.',
    });
  } catch (err) {
    console.error('Newsletter API error:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}
