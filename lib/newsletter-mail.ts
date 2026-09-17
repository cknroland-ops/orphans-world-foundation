import nodemailer from 'nodemailer';
import { createAdminClient } from './supabase';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://orphansworldfoundation.org';

export function unsubscribeUrl(email: string) {
  return `${BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
}

export function escapeHtml(value: string) {
  const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return value.replace(/[&<>"']/g, character => entities[character] ?? character);
}

export function createNewsletterTransporter() {
  const user = process.env.GMAIL_USER?.trim();
  const password = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');
  if (!user || !password) return null;
  return { user, transporter: nodemailer.createTransport({ service: 'gmail', auth: { user, pass: password } }) };
}

export async function sendWelcomeEmail(email: string) {
  const mailer = createNewsletterTransporter();
  if (!mailer) return false;
  const link = unsubscribeUrl(email);
  await mailer.transporter.sendMail({
    from: mailer.user,
    to: email,
    replyTo: mailer.user,
    subject: 'Bienvenue dans la newsletter d’Orphans World Foundation',
    text: `Merci pour votre inscription à la newsletter d’Orphans World Foundation. Vous recevrez nos nouvelles et pouvez vous désinscrire ici : ${link}`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.65;color:#0f1824;max-width:620px;margin:auto">
      <h2 style="color:#c0392b">Merci pour votre inscription !</h2>
      <p>Vous recevrez désormais les nouvelles d’Orphans World Foundation et de ses actions en faveur des enfants vulnérables.</p>
      <hr style="border:0;border-top:1px solid #eee;margin:28px 0">
      <p style="font-size:13px;color:#6b7280">Vous ne souhaitez plus recevoir nos messages ?<br><a href="${link}" style="color:#c0392b">Se désinscrire de la newsletter</a></p>
    </div>`,
  });
  return true;
}

export async function notifyNewsletterSubscribers(content: {
  subject: string;
  title: string;
  summary: string;
  url: string;
  cta: string;
}) {
  const mailer = createNewsletterTransporter();
  if (!mailer) return { sent: 0, failed: 0, skipped: true };

  const supabase = createAdminClient();
  const { data: subscribers, error } = await supabase.from('newsletter').select('email');
  if (error) throw error;

  const results = await Promise.allSettled((subscribers ?? []).map(({ email }) => {
    const link = unsubscribeUrl(email);
    return mailer.transporter.sendMail({
      from: mailer.user,
      to: email,
      replyTo: mailer.user,
      subject: content.subject,
      text: `${content.title}\n\n${content.summary}\n\n${content.cta}: ${content.url}\n\nSe désinscrire : ${link}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.65;color:#0f1824;max-width:620px;margin:auto">
        <div style="border-top:5px solid #c0392b;padding-top:24px"><p style="font-size:12px;letter-spacing:1.5px;color:#c0392b;font-weight:bold;text-transform:uppercase">Orphans World Foundation</p>
        <h1 style="font-size:27px;margin:10px 0 18px">${escapeHtml(content.title)}</h1><p style="color:#4b5563">${escapeHtml(content.summary)}</p>
        <p><a href="${content.url}" style="display:inline-block;background:#c0392b;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold">${escapeHtml(content.cta)}</a></p></div>
        <hr style="border:0;border-top:1px solid #eee;margin:32px 0"><p style="font-size:12px;color:#777">Vous recevez cet e-mail car vous êtes inscrit à la newsletter d’Orphans World Foundation.<br><a href="${link}" style="color:#c0392b">Se désinscrire de la newsletter</a></p>
      </div>`,
    });
  }));
  return { sent: results.filter(result => result.status === 'fulfilled').length, failed: results.filter(result => result.status === 'rejected').length, skipped: false };
}
