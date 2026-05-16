'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/theme-context';

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';
  const bg = isDark ? '#0D1629' : '#F6F8FA';
  const roleColor = isDark ? 'rgba(55,167,180,0.55)' : 'rgba(35,73,154,0.4)';

  useEffect(() => {
    const timer = setTimeout(onComplete, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: bg }}
      exit={{
        scale: 1.2,
        filter: 'blur(14px)',
        opacity: 0,
        transition: { duration: 0.55, ease: 'easeIn' },
      }}
    >
      {/* Name */}
      <motion.h1
        className="font-headline font-bold"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #23499A 30%, #37A7B4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Abdullah Abu Sghaira
      </motion.h1>

      {/* Role tagline */}
      <motion.p
        style={{
          fontSize: '0.6875rem',
          color: roleColor,
          textTransform: 'uppercase',
          marginTop: '8px',
        }}
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        animate={{ opacity: 0.6, letterSpacing: '0.35em' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      >
        Full-Stack Developer
      </motion.p>

      {/* Accent line */}
      <motion.div
        style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, #23499A, #37A7B4)',
          borderRadius: '2px',
          marginTop: '12px',
        }}
        initial={{ width: 0 }}
        animate={{ width: 40 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      />
    </motion.div>
  );
}
