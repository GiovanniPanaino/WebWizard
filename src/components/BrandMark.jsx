export default function BrandMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" />
      <path d="M12 16h24M24 16v21M16 22a8 8 0 0 0 16 0M19 10h10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="37" r="2" fill="currentColor" />
    </svg>
  );
}
