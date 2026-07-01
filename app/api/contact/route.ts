import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, notes } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Prénom et email sont requis.' }, { status: 400 });
    }

    const nom = `${firstName} ${lastName || ''}`.trim();
    const supabase = createAdminClient();

    const { error: dbError } = await supabase.from('contacts').insert({
      nom,
      email,
      sujet: phone ? `Tél: ${phone}` : null,
      message: notes || '(aucun message)',
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Erreur lors de l\'enregistrement du message.' }, { status: 500 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `"OWF Contact" <${gmailUser}>`,
        to: 'orphansworld020@gmail.com',
        subject: `Nouveau message de ${nom}`,
        html: `
          <h2>Nouveau message via le formulaire de contact</h2>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
          <p><strong>Message :</strong></p>
          <p>${(notes || '(aucun message)').replace(/\n/g, '<br/>')}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}
