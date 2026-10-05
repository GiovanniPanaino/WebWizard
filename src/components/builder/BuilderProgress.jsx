const stages = ['PROJECT', 'BRANDING', 'SECTIONS', 'FEATURES', 'STYLE', 'REVIEW'];

export default function BuilderProgress() {
  return <nav className="builder-progress" aria-label="Workshop stages">
    <ol>{stages.map((stage, index) => <li key={stage} aria-current={index === 0 ? 'step' : undefined}>
      <span className="builder-step-number">{String(index + 1).padStart(2, '0')}</span>
      <span>{stage}</span>
      {index === 0 && <span className="builder-active-dot" aria-hidden="true" />}
    </li>)}</ol>
  </nav>;
}
