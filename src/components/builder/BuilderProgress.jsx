import { Check } from 'lucide-react';

const stages = ['PROJECT', 'BRANDING', 'SECTIONS', 'FEATURES', 'STYLE', 'REVIEW'];

export default function BuilderProgress({ projectComplete = false, brandingComplete = false, sectionsComplete = false, activeStage = 'project', onStageChange }) {
  return <nav className="builder-progress" aria-label="Workshop stages">
    <ol>{stages.map((stage, index) => {
      const current = stage.toLowerCase() === activeStage;
      const complete = [projectComplete, brandingComplete, brandingComplete && sectionsComplete][index] || false;
      const next = !current && (index === 1 && projectComplete && !brandingComplete
        || index === 2 && brandingComplete
        || index === 3 && activeStage === 'sections' && sectionsComplete);
      const available = index === 0 || index === 1 && projectComplete || index === 2 && brandingComplete;
      const content = <>
        <span className="builder-step-number">{complete ? <Check aria-hidden="true" /> : String(index + 1).padStart(2, '0')}</span>
        {complete && <span className="builder-sr-only">Completed: </span>}
        <span>{stage}</span>
        {next && <span className="builder-next-label">NEXT</span>}
        {current && <span className="builder-active-dot" aria-hidden="true" />}
        {!available && <span className="builder-sr-only"> — unavailable</span>}
      </>;
      return <li key={stage} className={[complete && 'is-complete', next && 'is-next'].filter(Boolean).join(' ')}>
        {available ? <button type="button" className="builder-stage-control" aria-current={current ? 'step' : undefined} onClick={() => onStageChange(stage.toLowerCase())}>{content}</button> : <span className="builder-stage-control" aria-disabled="true">{content}</span>}
      </li>;
    })}</ol>
  </nav>;
}
