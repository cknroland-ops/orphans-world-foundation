import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ ok: false });
    }

    const supabase = createAdminClient();
    const today = new Date().toISOString().split('T')[0];

    await supabase.from('visites').upsert(
      { session_id: sessionId, date: today },
      { onConflict: 'session_id,date', ignoreDuplicates: true }
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
