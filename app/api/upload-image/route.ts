import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';

const BUCKET = 'articles-images';
const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé. Utilisez JPG, PNG, WEBP ou GIF.' }, { status: 400 });
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ error: `Le fichier dépasse la limite de ${MAX_SIZE_MB} Mo.` }, { status: 400 });
    }

    const supabase = createAdminClient();
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const slug = file.name
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const fileName = `${Date.now()}-${slug}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('[upload-image] Storage error:', error.message);
      return NextResponse.json(
        { error: `Échec du téléversement : ${error.message}. Vérifiez que le bucket '${BUCKET}' existe et est public.` },
        { status: 500 }
      );
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

    return NextResponse.json({ url: data.publicUrl, fileName });
  } catch (err) {
    console.error('[upload-image] Unexpected error:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}
