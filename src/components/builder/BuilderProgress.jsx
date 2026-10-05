import { Check } from 'lucide-react';

const stages = ['PROJECT', 'BRANDING', 'SECTIONS', 'FEATURES', 'STYLE', 'REVIEW'];

export default function BuilderProgress({ projectComplete = false }) {
  return <nav className="builder-progress" aria-label="Workshop stages">
    <ol>{stages.map((stage, index) => <li key={stage} className={projectComplete ? index === 0 ? 'is-complete' : index === 1 ? 'is-next' : undefined : undefined} aria-current={index === 0 ? 'step' : undefined}>
      <span className="builder-step-number">{index === 0 && projectComplete ? <Check aria-hidden="true" /> : String(index + 1).padStart(2, '0')}</span>
      {index === 0 && projectComplete && <span className="builder-sr-only">Completed: </span>}
      <span>{stage}</span>
      {index === 1 && projectComplete && <span className="builder-next-label">NEXT</span>}
      {index === 0 && !projectComplete && <span className="builder-active-dot" aria-hidden="true" />}
    </li>)}</ol>
  </nav>;
}
