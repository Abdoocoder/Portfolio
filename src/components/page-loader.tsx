'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/app/context/theme-context';

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLHeadingElement>(null);
  const roleRef      = useRef<HTMLParagraphElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);

  const isDark    = resolvedTheme === 'dark';
  const bg        = isDark ? '#0D1629' : '#F6F8FA';
  const roleColor = isDark ? 'rgba(55,167,180,0.55)' : 'rgba(35,73,154,0.4)';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(nameRef.current, { opacity: 0, y: 16, filter: 'blur(8px)' });
      gsap.set(roleRef.current, { opacity: 0, letterSpacing: '0.2em' });
      gsap.set(lineRef.current, { width: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: 100,
            duration: 0.85,
            ease: 'expo.inOut',
            onComplete,
          });
        },
      });

      tl.to(nameRef.current, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.8, ease: 'power2.out',
      })
      .to(roleRef.current, {
        opacity: 0.6, letterSpacing: '0.35em',
        duration: 0.6, ease: 'power2.out',
      }, '-=0.5')
      .to(lineRef.current, {
        width: 40,
        duration: 0.5, ease: 'power2.out',
      }, '-=0.4')
      .to({}, { duration: 1.4 }); // hold
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      <h1
        ref={nameRef}
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
        Abdullah Abu Sghaira
      </h1>

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
