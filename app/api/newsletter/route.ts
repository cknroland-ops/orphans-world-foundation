import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';
import nodemailer from 'nodemailer';

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
      return NextResponse.json({ error: "Erreur lors de l'inscription." }, { status: 500 });
    }

    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');
    let emailSent = false;

    if (gmailUser && gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: gmailUser, pass: gmailAppPassword },
        });

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://orphansworldfoundation.org';
        const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;

        await transporter.sendMail({
          from: gmailUser,
          to: email,
          replyTo: gmailUser,
          subject: 'Bienvenue dans la newsletter d’Orphans World Foundation',
          text: `Merci pour votre inscription à la newsletter d’Orphans World Foundation. Pour vous désinscrire : ${unsubscribeUrl}`,
          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f1824">
              <h2>Merci pour votre inscription !</h2>
              <p>Vous recevrez désormais les nouvelles d’Orphans World Foundation et de ses actions en faveur des enfants vulnérables.</p>
              <p style="font-size:13px;color:#6b7280">
                Vous ne souhaitez plus recevoir nos messages ?
                <a href="${unsubscribeUrl}" style="color:#c21b28">Se désinscrire de la newsletter</a>.
              </p>
            </div>
          `,
        });
        emailSent = true;
      } catch (emailError) {
        console.error('Newsletter confirmation email failed:', emailError);
      }
    } else {
      console.warn('GMAIL_USER or GMAIL_APP_PASSWORD is not configured; confirmation email skipped.');
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: emailSent
        ? 'Inscription réussie. Vérifiez votre boîte de réception et vos courriers indésirables.'
        : 'Inscription réussie, mais le message de bienvenue n’a pas pu être envoyé.',
    });
  } catch (err) {
    console.error('Newsletter API error:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}