import { ArrowRight, Check } from 'lucide-react';
import { featureCatalogue } from '../../data/features';

export default function FeaturesStage({ selectedFeatures, noExtraFeatures, onToggle, onNoExtraFeatures, complete, headingRef }) {
  return <section className="builder-features-stage" aria-labelledby="builder-features-heading">
    <p className="builder-stage-label"><span>04</span> FEATURES</p>
    <h2 id="builder-features-heading" ref={headingRef} tabIndex={-1}>WHAT SHOULD IT DO?</h2>
    <p className="builder-stage-description">Choose the features your website needs. You can select as many as apply.</p>
    <ul className="builder-feature-grid">
      {featureCatalogue.map(({ id, label, description, icon: Icon }) => <li key={id}>
        <button className="builder-feature-card" type="button" aria-pressed={selectedFeatures.includes(id)} onClick={() => onToggle(id)}>
          <Icon className="builder-feature-icon" aria-hidden="true" /><strong>{label}</strong>
          <span className="builder-feature-indicator" aria-hidden="true">{selectedFeatures.includes(id) && <Check />}</span>
          <span className="builder-feature-description">{description}</span>
        </button>
      </li>)}
    </ul>
    <button className="builder-feature-card builder-no-extra" type="button" aria-pressed={noExtraFeatures} onClick={onNoExtraFeatures}>
      <strong>NO EXTRA FEATURES</strong><span className="builder-feature-indicator" aria-hidden="true">{noExtraFeatures && <Check />}</span>
      <span className="builder-feature-description">My website does not need any extra functionality.</span>
    </button>
    <p className="builder-field-note" role="status">{noExtraFeatures ? 'No extra features selected.' : selectedFeatures.length ? `${selectedFeatures.length} ${selectedFeatures.length === 1 ? 'feature' : 'features'} selected.` : 'Select features, or choose No extra features to complete this step.'}</p>
    <div className="builder-progression">
      <button className="button builder-continue" type="button" disabled aria-describedby="builder-style-note">CONTINUE TO STYLE<ArrowRight aria-hidden="true" /></button>
      <p id="builder-style-note">{complete ? 'Features complete. Style is next and is not available yet.' : 'Answer the features question to complete this step. Style is not available yet.'}</p>
    </div>
  </section>;
}
