import { ArrowRight, Check } from 'lucide-react';
import { projectTypes } from '../../data/projectTypes';

export default function ProjectStage({ selectedId, onSelect }) {
  return <section className="builder-project-stage" aria-labelledby="builder-project-heading">
    <p className="builder-stage-label"><span>01</span> PROJECT</p>
    <h2 id="builder-project-heading">What are we building?</h2>
    <p className="builder-stage-description" id="builder-options-note">Choose the type of website you'd like to create.</p>
    <ul className="builder-options" aria-describedby="builder-options-note">
      {projectTypes.map(({ id, label, icon: Icon }) => <li key={id}>
        <button className="builder-option" type="button" aria-pressed={selectedId === id} onClick={() => onSelect(id)}>
          <Icon aria-hidden="true" /><span>{label}</span>
          {selectedId === id && <Check className="builder-option-check" aria-hidden="true" />}
        </button>
      </li>)}
    </ul>
    {selectedId && <div className="builder-progression">
      <button className="button builder-continue" type="button" disabled aria-describedby="builder-next-note">CONTINUE TO BRANDING<ArrowRight aria-hidden="true" /></button>
      <p id="builder-next-note">Project selected. Branding is next and is not available yet.</p>
    </div>}
  </section>;
}
