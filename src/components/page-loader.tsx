'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const NAME_CHARS = 'Abdullah Abu Sghaira'.split('');

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shimmerRef   = useRef<HTMLSpanElement>(null);
  const roleRef      = useRef<HTMLParagraphElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;

    gsap.set(shimmerRef.current, { x: '-110%' });

    if (reduced) {
      // Respect reduced motion — show briefly then exit immediately
      const timer = setTimeout(() => {
        if (cancelled || !containerRef.current) return;
        onComplete();
      }, 800);
      return () => { cancelled = true; clearTimeout(timer); };
    }

    const shimmerTimer = setTimeout(() => {
      if (cancelled) return;
      gsap.to(shimmerRef.current, { x: '200%', duration: 1.0, ease: 'power2.inOut' });
      gsap.to(roleRef.current,    { opacity: 1, letterSpacing: '0.35em', duration: 0.6, ease: 'power2.out', delay: 0.2 });
      gsap.to(lineRef.current,    { width: 40, duration: 0.5, ease: 'power2.out', delay: 0.4 });
    }, 900);

    const exitTimer = setTimeout(() => {
      if (cancelled || !containerRef.current) return;
      gsap.to(containerRef.current, {
        yPercent: 100,
        duration: 0.85,
        ease: 'expo.inOut',
        onComplete,
      });
    }, 2800);

    return () => {
      cancelled = true;
      clearTimeout(shimmerTimer);
      clearTimeout(exitTimer);
      gsap.killTweensOf([shimmerRef.current, roleRef.current, lineRef.current, containerRef.current]);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      <style>{`
        @keyframes loader-char-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .loader-char { animation-duration: 0.001ms !important; animation-delay: 0ms !important; }
        }
      `}</style>

      {/* Name — chars animate in one by one */}
      <div className="relative">
        <h1
          className="font-headline font-bold"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            letterSpacing: '-0.02em',
            color: 'hsl(var(--primary))',
          }}
        >
          {NAME_CHARS.map((char, i) => (
            <span
              key={i}
              className="loader-char"
              style={{
                display: 'inline-block',
                whiteSpace: 'pre',
                animation: 'loader-char-in 0.4s ease-out both',
                animationDelay: `${i * 0.04}s`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Shimmer streak — overlay blend, not gradient text */}
        <span
          ref={shimmerRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.45) 50%, transparent 80%)',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Role tagline */}
      <p
        ref={roleRef}
        className="font-body"
        style={{
          fontSize: '0.6875rem',
          color: 'hsl(var(--muted-foreground))',
          textTransform: 'uppercase',
          marginTop: '8px',
          opacity: 0,
          letterSpacing: '0.2em',
        }}
      >
        Full-Stack Developer
      </p>

      {/* Accent line */}
      <div
        ref={lineRef}
        style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
          borderRadius: '2px',
          marginTop: '12px',
          width: 0,
        }}
      />
    </div>
  );
}
