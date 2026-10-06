import { useEffect, useId, useRef } from 'react';

export default function CircuitTrace({ compact = false }) {
  const traceRef = useRef(null);
  const id = useId();
  const seed = Array.from(id).reduce((hash, character) => Math.imul(hash, 31) + character.charCodeAt(0), 0) >>> 0;
  const timing = { '--circuit-duration': `${14 + seed % 7 * 2}s`, '--circuit-delay': `${-(seed % 140) / 10}s` };
  useEffect(() => {
    const element = traceRef.current;
    let visible = false;
    const updateActivity = () => element.classList.toggle('is-running', visible && document.visibilityState === 'visible');
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      updateActivity();
    }, { threshold: 0, rootMargin: '24px 0px' });
    observer.observe(element);
    document.addEventListener('visibilitychange', updateActivity);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateActivity);
    };
  }, []);

  return <svg ref={traceRef} style={timing} className={`circuit-trace${compact ? ' circuit-trace--compact' : ''}`} viewBox="0 0 800 40" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
    <path className="circuit-structure" d="M0 20H104V8H300V20H610V36H800M390 20V4H475M680 36V20H760" />
    <path className="circuit-route" d="M0 20H104V8H300V20H610" />
    <path className="circuit-packet" pathLength="100" d="M0 20H104V8H300V20H610" />
    <g className="circuit-terminals"><circle cx="104" cy="8" r="3" /><circle cx="475" cy="4" r="3" /><circle cx="760" cy="20" r="3" /></g>
    <circle className="circuit-endpoint" cx="610" cy="20" r="3" />
  </svg>;
}
