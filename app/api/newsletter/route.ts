import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    // Si email est null (absent) ou mal formaté
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // TypeScript saura ici que emailToDisplay est forcement une chaîne de caractères (string)
      const emailToDisplay = email || 'Adresse non fournie';
      
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      
      // On utilise replace sur emailToDisplay qui ne sera jamais null
      const safeEmail = emailToDisplay.replace(/[&<>"']/g, (char) => entities[char] ?? char);

      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="fr">
          <body style="font-family:sans-serif;text-align:center;padding:80px 24px;background-color:#f9fafb;">
            <h2 style="color:#c21b28;">Lien de désinscription invalide</h2>
            <p style="color:#4b5563;">L'adresse renseignée (${safeEmail}) est incorrecte ou absente.</p>
            <a href="https://orphansworldfoundation.org" style="color:#0f1824;text-decoration:underline;">Retour au site</a>
          </body>
        </html>`,
        { status: 400, headers: { 'content-type': 'text/html; charset=utf-8' } }
      );
    }

    // Suppression effective dans Supabase
    const supabase = createAdminClient();
    const { error } = await supabase.from('newsletter').delete().eq('email', email);

    if (error) {
      console.error('Erreur Supabase lors de la desinscription:', error);
      return new NextResponse('Erreur lors de la désinscription.', { status: 500 });
    }

    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="fr">
        <body style="font-family:sans-serif;text-align:center;padding:80px 24px;background-color:#f9fafb;">
          <h2 style="color:#0f1824;">Désinscription confirmée</h2>
          <p style="color:#4b5563;">L'adresse <strong>${email}</strong> a été retirée de la newsletter d'Orphans World Foundation.</p>
          <a href="https://orphansworldfoundation.org" style="color:#c21b28;text-decoration:underline;">Retour à l'accueil</a>
        </body>
      </html>`,
      { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }
    );
  } catch (err) {
    console.error('Unsubscribe API error:', err);
    return new NextResponse('Erreur serveur inattendue.', { status: 500 });
  }
}
