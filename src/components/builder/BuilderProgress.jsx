import { Check } from 'lucide-react';

const stages = ['PROJECT', 'BRANDING', 'SECTIONS', 'FEATURES', 'STYLE', 'REVIEW'];

export default function BuilderProgress({ projectComplete = false, brandingComplete = false, activeStage = 'project', onStageChange }) {
  return <nav className="builder-progress" aria-label="Workshop stages">
    <ol>{stages.map((stage, index) => {
      const current = index === (activeStage === 'branding' ? 1 : 0);
      const complete = index === 0 ? projectComplete : index === 1 && brandingComplete;
      const next = index === 1 ? projectComplete && !current && !complete : index === 2 && brandingComplete;
      const available = index === 0 || index === 1 && projectComplete;
      const content = <>
        <span className="builder-step-number">{complete ? <Check aria-hidden="true" /> : String(index + 1).padStart(2, '0')}</span>
        {complete && <span className="builder-sr-only">Completed: </span>}
        <span>{stage}</span>
        {next && <span className="builder-next-label">NEXT</span>}
        {current && <span className="builder-active-dot" aria-hidden="true" />}
        {!available && <span className="builder-sr-only"> — unavailable</span>}
      </>;
      return <li key={stage} className={[complete && 'is-complete', next && 'is-next'].filter(Boolean).join(' ')}>
        {available ? <button type="button" className="builder-stage-control" aria-current={current ? 'step' : undefined} onClick={() => onStageChange(index === 0 ? 'project' : 'branding')}>{content}</button> : <span className="builder-stage-control" aria-disabled="true">{content}</span>}
      </li>;
    })}</ol>
  </nav>;
}
