import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const listener = () => {
      const scroll = window.scrollY;

      const position = ids
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = Math.floor(rect.top + window.scrollY - offset);
          const bottom = Math.floor(rect.bottom + window.scrollY - offset);

          return { id, top, bottom };
        })
        .find(({ top, bottom }) => scroll >= top && scroll < bottom);

      setActiveId(position?.id || '');
    };

    listener();
    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    };
  }, [ids, offset]);

  return activeId;
}
