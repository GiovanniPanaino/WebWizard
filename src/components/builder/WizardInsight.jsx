import { useRef, useState } from 'react';
import CircuitTrace from '../CircuitTrace';
import '../../styles/wizard-insight.css';

export default function WizardInsight({ insight, onAddSection }) {
  const assessmentRef = useRef(null);
  const [announcement, setAnnouncement] = useState('');
  function addSuggestedSection(suggestion) {
    onAddSection(suggestion.sectionId);
    setAnnouncement(`${suggestion.sectionName} section added before Contact.`);
    assessmentRef.current?.focus({ preventScroll: true });
  }
  if (!insight) return null;
  return <aside className={`wizard-insight wizard-insight--${insight.complexity.id}`} aria-label="Wizard Insight">
    <CircuitTrace compact />
    <p className="eyebrow wizard-insight-label"><span aria-hidden="true" />WIZARD INSIGHT</p>
    <div className="wizard-assessment" role="status" aria-live="polite" aria-atomic="true">
      <h3 ref={assessmentRef} tabIndex={-1}>{insight.complexity.label}</h3>
      {insight.reasons.map(reason => <p key={reason}>{reason}</p>)}
    </div>
    <div className="wizard-package-guidance">
      <p>Likely starting point: <strong>{insight.packageGuidance.name}</strong></p>
      <p className="wizard-package-price">{insight.packageGuidance.price}</p>
      {!insight.growth && <p className="wizard-scope-reason">{insight.packageGuidance.explanation}</p>}
      <p className="wizard-guidance-note">{insight.packageGuidance.disclaimer}</p>
    </div>
    {insight.growth && <div className="wizard-project-growth">
      <h4>{insight.growth.label}</h4><p>{insight.growth.explanation}</p>
    </div>}
    {insight.suggestions.map(suggestion => <div key={suggestion.sectionId} className="wizard-section-suggestion">
      <h4>{suggestion.label}</h4><p>{suggestion.explanation}</p>
      <button className="button wizard-add-section" type="button" onClick={() => addSuggestedSection(suggestion)}>{suggestion.action}</button>
    </div>)}
    <p className="builder-sr-only" role="status">{announcement}</p>
  </aside>;
}
