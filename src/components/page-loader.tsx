'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/app/context/theme-context';

const NAME_CHARS = 'Abdullah Abu Sghaira'.split('');

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const shimmerRef   = useRef<HTMLSpanElement>(null);
  const roleRef      = useRef<HTMLParagraphElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);

  const isDark    = resolvedTheme === 'dark';
  const bg        = isDark ? '#0D1629' : '#F6F8FA';
  const roleColor = isDark ? 'rgba(55,167,180,0.55)' : 'rgba(35,73,154,0.4)';

  useEffect(() => {
    const chars = charRefs.current.filter((el): el is HTMLSpanElement => el !== null);
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(chars,              { opacity: 0, y: 10 });
      gsap.set(shimmerRef.current, { x: '-110%' });
      gsap.set(roleRef.current,    { opacity: 0, letterSpacing: '0.2em' });
      gsap.set(lineRef.current,    { width: 0 });

      gsap.timeline()
        // Characters appear one by one
        .to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power3.out',
          stagger: 0.045,
        })
        // Shimmer sweeps across
        .to(shimmerRef.current, {
          x: '200%',
          duration: 1.0,
          ease: 'power2.inOut',
        }, '-=0.1')
        // Role fades in
        .to(roleRef.current, {
          opacity: 0.6,
          letterSpacing: '0.35em',
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.5')
        // Accent line grows
        .to(lineRef.current, {
          width: 40,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.3')
        // Hold 1.4s then curtain drops — all inside one timeline
        .to(containerRef.current, {
          yPercent: 100,
          duration: 0.85,
          ease: 'expo.inOut',
          onComplete,
        }, '+=1.4');
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      {/* Name — character by character */}
      <div className="relative overflow-hidden">
        <h1
          className="font-headline font-bold"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #23499A 30%, #37A7B4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {NAME_CHARS.map((char, i) => (
            <span
              key={i}
              ref={el => { charRefs.current[i] = el; }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Shimmer streak */}
        <span
          ref={shimmerRef}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,220,0.7) 50%, transparent 80%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Role tagline */}
      <p
        ref={roleRef}
        style={{
          fontSize: '0.6875rem',
          color: roleColor,
          textTransform: 'uppercase',
          marginTop: '8px',
        }}
      >
        Full-Stack Developer
      </p>

      {/* Accent line */}
      <div
        ref={lineRef}
        style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, #23499A, #37A7B4)',
          borderRadius: '2px',
          marginTop: '12px',
          width: 0,
        }}
      />
    </div>
  );
}
