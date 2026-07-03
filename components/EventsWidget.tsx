'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────
type OWFEvent = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  image_url: string | null;
  target_amount: number;
  current_amount: number;
  status: 'active' | 'paused' | 'completed';
};

// ─── localStorage helpers ─────────────────────────────────────────────────────
const LS_KEY = 'owf_events_dismissed';

function getDismissed(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function dismissEvent(id: string) {
  try {
    const s = getDismissed();
    s.add(id);
    localStorage.setItem(LS_KEY, JSON.stringify([...s]));
  } catch {}
}

function allDismissed(events: OWFEvent[]): boolean {
  if (events.length === 0) return true;
  const dismissed = getDismissed();
  return events.every(e => dismissed.has(e.id));
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function formatEventDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
}

function progressPct(current: number, target: number): number {
  if (!target || target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

// ─── Component ────────────────────────────────────────────────────────────────
export function EventsWidget({ openDonateModal }: { openDonateModal?: () => void }) {
  const [events, setEvents] = useState<OWFEvent[]>([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── 1. Fetch active events (not yet past date) ────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true });
      setEvents((data as OWFEvent[]) ?? []);
      setLoaded(true);
    };
    fetch();
  }, []);

  // ── 2. Auto-open / auto-close cycle (only for un-dismissed events) ────────
  const startAutoOpenCycle = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (cycleRef.current) clearInterval(cycleRef.current);

    const openModal = () => {
      if (allDismissed(events)) return;
      setOpen(true);
      // Auto-close after 10 s
      closeTimerRef.current = setTimeout(() => {
        setOpen(false);
      }, 10_000);
    };

    // First open after 4 s
    autoTimerRef.current = setTimeout(openModal, 4_000);

    // Repeat every 15 min
    cycleRef.current = setInterval(openModal, 15 * 60_000);
  }, [events]);

  useEffect(() => {
    if (!loaded || events.length === 0) return;
    if (allDismissed(events)) return;
    startAutoOpenCycle();
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [loaded, events, startAutoOpenCycle]);

  // ── 3. Manual interactions ────────────────────────────────────────────────
  const handleFabClick = () => {
    // Cancel auto-cycle — user took control
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (cycleRef.current) clearInterval(cycleRef.current);
    setOpen(o => !o);
  };

  const handleClose = () => {
    // Dismiss all current events so auto-open stops
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (cycleRef.current) clearInterval(cycleRef.current);
    events.forEach(e => dismissEvent(e.id));
    setOpen(false);
  };

  const handleSupport = () => {
    dismissEvent(events[index]?.id);
    setOpen(false);
    if (openDonateModal) openDonateModal();
  };

  const goTo = (dir: 'prev' | 'next') => {
    setIndex(i => dir === 'next'
      ? (i + 1) % events.length
      : (i - 1 + events.length) % events.length
    );
  };

  // ── Don't render if no events ─────────────────────────────────────────────
  if (!loaded || events.length === 0) return null;

  const ev = events[index];
  const pct = progressPct(ev.current_amount, ev.target_amount);

  return (
    <>
      {/* ── Floating Action Button ─────────────────────────────────────── */}
      <button
        onClick={handleFabClick}
        aria-label="Événements en cours"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 9000,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#c0392b,#e74c3c)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 28px rgba(192,57,43,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
          animation: open ? 'none' : 'owf-pulse 2.4s ease-in-out infinite',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 36px rgba(192,57,43,0.55)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(192,57,43,0.45)';
        }}
      >
        {/* Calendar icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {/* Badge */}
        {events.length > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            background: '#f59e0b', color: '#1a1a1a',
            borderRadius: '50%', width: 20, height: 20,
            fontSize: 11, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #fff', lineHeight: 1,
          }}>{events.length}</span>
        )}
      </button>

      {/* ── Modal Backdrop ────────────────────────────────────────────── */}
      {open && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9001,
            background: 'rgba(10,15,25,0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
            padding: '0 28px 104px 28px',
            animation: 'owf-fade-in 0.2s ease',
          }}
        >
          {/* ── Modal Card ─────────────────────────────────────────────── */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 24,
              width: '100%',
              maxWidth: 420,
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
              overflow: 'hidden',
              animation: 'owf-slide-up 0.28s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {/* Header — gradient brand banner */}
            <div style={{
              background: 'linear-gradient(135deg, #7f1d1d 0%, #c0392b 60%, #e74c3c 100%)',
              padding: '24px 24px 20px',
              position: 'relative',
            }}>
              {/* Status badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.18)', color: '#fff',
                fontSize: 10, fontWeight: 700, padding: '4px 10px',
                borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.7px',
                marginBottom: 12, backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                Événement actif
              </span>
              {/* Title */}
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.3, paddingRight: 36 }}>
                {ev.title}
              </h3>
              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Fermer"
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px 24px' }}>

              {/* Meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span style={{ fontWeight: 600, color: '#374151' }}>{formatEventDate(ev.date)}</span>
                </div>
                {ev.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {ev.location}
                  </div>
                )}
              </div>

              {/* Description */}
              {ev.description && (
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7, margin: '0 0 16px' }}>
                  {ev.description}
                </p>
              )}

              {/* Crowdfunding gauge */}
              {ev.target_amount > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>Collecte de fonds</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#c0392b' }}>{pct}%</span>
                  </div>
                  {/* Track */}
                  <div style={{ height: 8, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: pct >= 100
                        ? 'linear-gradient(90deg,#10b981,#059669)'
                        : 'linear-gradient(90deg,#c0392b,#e74c3c)',
                      borderRadius: 99,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#9ca3af' }}>
                    <span>{ev.current_amount.toLocaleString('fr-FR')} $ collectés</span>
                    <span>Objectif : {ev.target_amount.toLocaleString('fr-FR')} $</span>
                  </div>
                </div>
              )}

              {/* Action button */}
              <button
                onClick={handleSupport}
                style={{
                  width: '100%', padding: '13px 0',
                  background: 'linear-gradient(135deg,#c0392b,#e74c3c)',
                  color: '#fff', border: 'none', borderRadius: 12,
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 16px rgba(192,57,43,0.35)',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                ❤ Soutenir cet événement
              </button>
            </div>

            {/* Carousel navigation (only if multiple events) */}
            {events.length > 1 && (
              <div style={{
                borderTop: '1px solid #f3f4f6',
                padding: '14px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <button
                  onClick={() => goTo('prev')}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid #e5e7eb', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  Précédent
                </button>
                {/* Dots */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {events.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      style={{
                        width: i === index ? 18 : 8,
                        height: 8, borderRadius: 99,
                        background: i === index ? '#c0392b' : '#e5e7eb',
                        border: 'none', cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.25s ease',
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => goTo('next')}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid #e5e7eb', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151' }}
                >
                  Suivant
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Keyframe animations ───────────────────────────────────────── */}
      <style>{`
        @keyframes owf-pulse {
          0%, 100% { box-shadow: 0 8px 28px rgba(192,57,43,0.45), 0 0 0 0 rgba(192,57,43,0.4); }
          50%       { box-shadow: 0 8px 28px rgba(192,57,43,0.45), 0 0 0 10px rgba(192,57,43,0); }
        }
        @keyframes owf-fade-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes owf-slide-up { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </>
  );
}
