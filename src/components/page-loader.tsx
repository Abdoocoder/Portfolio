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
  const shimmerRef   = useRef<HTMLSpanElement>(null);
  const roleRef      = useRef<HTMLParagraphElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);

  const isDark    = resolvedTheme === 'dark';
  const bg        = isDark ? '#0D1629' : '#F6F8FA';
  const roleColor = isDark ? 'rgba(55,167,180,0.55)' : 'rgba(35,73,154,0.4)';

  useEffect(() => {
    // Set shimmer start position
    gsap.set(shimmerRef.current, { x: '-110%' });

    // After chars are mostly visible (~900ms), run shimmer + role + line
    const shimmerTimer = setTimeout(() => {
      gsap.to(shimmerRef.current, {
        x: '200%', duration: 1.0, ease: 'power2.inOut',
      });
      gsap.to(roleRef.current, {
        opacity: 0.6, letterSpacing: '0.35em', duration: 0.6, ease: 'power2.out', delay: 0.2,
      });
      gsap.to(lineRef.current, {
        width: 40, duration: 0.5, ease: 'power2.out', delay: 0.4,
      });
    }, 900);

    // Curtain drops after hold
    const exitTimer = setTimeout(() => {
      gsap.to(containerRef.current, {
        yPercent: 100, duration: 0.85, ease: 'expo.inOut', onComplete,
      });
    }, 2800);

    return () => {
      clearTimeout(shimmerTimer);
      clearTimeout(exitTimer);
      gsap.killTweensOf([
        shimmerRef.current,
        roleRef.current,
        lineRef.current,
        containerRef.current,
      ]);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      {/* CSS keyframe — immune to React Strict Mode / GSAP cleanup */}
      <style>{`
        @keyframes char-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

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
              style={{
                display: 'inline-block',
                whiteSpace: 'pre',
                animation: `char-in 0.4s ease-out both`,
                animationDelay: `${i * 0.04}s`,
              }}
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

      {/* Role — starts hidden, GSAP fades in */}
      <p
        ref={roleRef}
        style={{
          fontSize: '0.6875rem',
          color: roleColor,
          textTransform: 'uppercase',
          marginTop: '8px',
          opacity: 0,
          letterSpacing: '0.2em',
        }}
      >
        Full-Stack Developer
      </p>

      {/* Accent line — starts at 0 width */}
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
