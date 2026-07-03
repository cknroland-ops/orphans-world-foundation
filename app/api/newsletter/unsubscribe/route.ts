import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../../lib/supabase';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new NextResponse(
      `<!DOCTYPE html><html lang="fr"><body style="font-family:sans-serif;text-align:center;padding:80px 24px">
        <h2 style="color:#c0392b">Lien invalide</h2>
        <p>L'adresse email est manquante ou invalide.</p>
      </body></html>`,
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('newsletter').delete().eq('email', email);

    if (error) {
      return new NextResponse(
        `<!DOCTYPE html><html lang="fr"><body style="font-family:sans-serif;text-align:center;padding:80px 24px">
          <h2 style="color:#c0392b">Erreur</h2>
          <p>Une erreur est survenue lors du désabonnement. Veuillez réessayer.</p>
        </body></html>`,
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    return new NextResponse(
      `<!DOCTYPE html><html lang="fr"><body style="font-family:sans-serif;text-align:center;padding:80px 24px;background:#f9fafb">
        <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;padding:48px 32px;box-shadow:0 4px 24px rgba(0,0,0,0.06)">
          <div style="font-size:48px;margin-bottom:16px">✅</div>
          <h2 style="color:#0f1824;margin-bottom:12px">Désabonnement confirmé</h2>
          <p style="color:#6b7280;line-height:1.6">L'adresse <strong>${email}</strong> a bien été retirée de notre liste de diffusion.</p>
          <p style="color:#9ca3af;font-size:14px;margin-top:24px">Orphans World Foundation — Sud-Kivu, RDC</p>
        </div>
      </body></html>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch {
    return new NextResponse(
      `<!DOCTYPE html><html lang="fr"><body style="font-family:sans-serif;text-align:center;padding:80px 24px">
        <h2 style="color:#c0392b">Erreur serveur</h2>
        <p>Veuillez réessayer ultérieurement.</p>
      </body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
