import { useState, useEffect } from 'react';

/**
 * useScrollSpy: Monitors which section is currently active in the viewport.
 * Optimized with IntersectionObserver to avoid layout thrashing and reduce CPU usage.
 */
export function useScrollSpy(ids: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (ids.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      // The rootMargin defines the "active" area of the viewport.
      // We monitor the top half of the screen (minus the header offset).
      rootMargin: `-${offset}px 0px -50% 0px`,
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [ids, offset]);

  return activeId;
}
