'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const NAME_CHARS = 'Abdullah Abu Sghaira'.split('');

const PARTICLES = [
  { w: 3, h: 3, left: '12%', top: '72%', delay: '0s',   dur: '3.8s' },
  { w: 2, h: 2, left: '78%', top: '65%', delay: '1.2s', dur: '4.6s' },
  { w: 4, h: 4, left: '48%', top: '82%', delay: '0.6s', dur: '5.1s' },
  { w: 2, h: 2, left: '28%', top: '68%', delay: '2.1s', dur: '3.2s' },
  { w: 3, h: 3, left: '67%', top: '78%', delay: '1.7s', dur: '4.2s' },
  { w: 2, h: 2, left: '85%', top: '88%', delay: '0.9s', dur: '5.4s' },
  { w: 3, h: 3, left: '8%',  top: '58%', delay: '2.8s', dur: '4.0s' },
];

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shimmerRef   = useRef<HTMLSpanElement>(null);
  const roleRef      = useRef<HTMLParagraphElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const counterRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;

    const shimmer   = shimmerRef.current;
    const role      = roleRef.current;
    const line      = lineRef.current;
    const container = containerRef.current;

    gsap.set(shimmer, { x: '-110%' });
    gsap.set(container, { willChange: 'transform' });

    if (reduced) {
      const timer = setTimeout(() => {
        if (cancelled || !container) return;
        onComplete();
      }, 800);
      return () => { cancelled = true; clearTimeout(timer); };
    }

    const counterObj = { val: 0 };
    const counterTween = gsap.to(counterObj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate() {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counterObj.val)).padStart(2, '0');
        }
      },
    });

    const shimmerTimer = setTimeout(() => {
      if (cancelled) return;
      gsap.to(shimmer, { x: '200%', duration: 0.6, ease: 'power3.out' });
      gsap.to(role,    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 });
      gsap.to(line,    { scaleX: 1,  duration: 0.5, ease: 'power2.out', delay: 0.4 });
    }, 900);

    const exitTimer = setTimeout(() => {
      if (cancelled || !container) return;
      gsap.to(container, {
        yPercent: -100,
        duration: 0.7,
        ease: 'expo.inOut',
        onComplete,
      });
    }, 2800);

    return () => {
      cancelled = true;
      counterTween.kill();
      clearTimeout(shimmerTimer);
      clearTimeout(exitTimer);
      gsap.killTweensOf([shimmer, role, line, container]);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      <style>{`
        @keyframes loader-char-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes loader-particle-float {
          0%   { transform: translateY(0)     scale(1);   opacity: 0.35; }
          100% { transform: translateY(-70px) scale(0.4); opacity: 0;    }
        }
        @keyframes loader-glow-pulse {
          from { transform: translate(-50%, -50%) scale(0.85); opacity: 0.3;  }
          to   { transform: translate(-50%, -50%) scale(1.2);  opacity: 0.65; }
        }
        @media (prefers-reduced-motion: reduce) {
          .loader-char     { animation-duration: 0.001ms !important; animation-delay: 0ms !important; }
          .loader-particle { animation: none !important; opacity: 0 !important; }
          .loader-glow     { animation: none !important; }
          .loader-counter  { display: none !important; }
        }
      `}</style>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="loader-particle pointer-events-none absolute rounded-full"
          style={{
            width:      p.w,
            height:     p.h,
            left:       p.left,
            top:        p.top,
            opacity:    0,
            background: 'hsl(var(--accent))',
            animation:  `loader-particle-float ${p.dur} ${p.delay} ease-out infinite`,
          }}
        />
      ))}

      {/* Name block */}
      <div className="relative">
        {/* Breathing glow behind the name */}
        <div
          className="loader-glow pointer-events-none absolute"
          style={{
            width:      '320px',
            height:     '160px',
            left:       '50%',
            top:        '50%',
            background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.13) 0%, transparent 70%)',
            filter:     'blur(24px)',
            animation:  'loader-glow-pulse 2.6s ease-in-out infinite alternate',
          }}
        />

        <h1
          className="font-headline font-bold relative z-10"
          style={{
            fontSize:      'clamp(1.75rem, 4vw, 2.75rem)',
            letterSpacing: '-0.02em',
            color:         'hsl(var(--primary))',
          }}
        >
          {NAME_CHARS.map((char, i) => (
            <span
              key={i}
              className="loader-char"
              style={{
                display:        'inline-block',
                whiteSpace:     'pre',
                willChange:     'transform, opacity',
                animation:      'loader-char-in 0.5s cubic-bezier(0.23, 1, 0.32, 1) both',
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
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:   'linear-gradient(105deg, transparent 20%, hsl(var(--foreground) / 0.3) 50%, transparent 80%)',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Role tagline */}
      <p
        ref={roleRef}
        className="font-body"
        style={{
          fontSize:      '0.6875rem',
          color:         'hsl(var(--muted-foreground))',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          marginTop:     '8px',
          opacity:       0,
          transform:     'translateY(4px)',
        }}
      >
        Full-Stack Developer
      </p>

      {/* Accent line */}
      <div
        ref={lineRef}
        style={{
          height:          '1.5px',
          background:      'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
          borderRadius:    '2px',
          marginTop:       '12px',
          width:           '40px',
          transform:       'scaleX(0)',
          transformOrigin: 'left center',
        }}
      />

      {/* Progress counter — bottom-right, monospace */}
      <div
        className="loader-counter pointer-events-none absolute bottom-8 right-10 flex items-baseline gap-px font-mono"
        style={{
          fontSize:      '0.6875rem',
          letterSpacing: '0.08em',
          color:         'hsl(var(--muted-foreground) / 0.4)',
        }}
      >
        <span ref={counterRef}>00</span>
        <span style={{ fontSize: '0.5rem' }}>%</span>
      </div>
    </div>
  );
}
