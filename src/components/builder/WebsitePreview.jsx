import { Image as ImageIcon } from 'lucide-react';
import { sectionsById } from '../../data/sections';

const exampleBranding = { businessName: 'YOUR BUSINESS', tagline: 'Your tagline will appear here.' };
const exampleSections = ['hero', 'about', 'services', 'contact'].map(id => sectionsById[id]);

function PreviewSection({ section, branding }) {
  if (section.type === 'hero') return <div className="concept-hero">
    <div><span className="concept-kicker">A PLACE FOR YOUR IDEAS</span><h3>{branding.businessName}</h3><p>{branding.tagline}</p><span className="concept-action" /></div>
    <div className="concept-artwork"><ImageIcon /><span>HERO IMAGE / ARTWORK</span></div>
  </div>;
  if (section.type === 'services' || section.type === 'cards') return <div className="concept-section">
    <h4>{section.title}</h4><div className="concept-services">{[1, 2, 3].map(item => <div key={item}><span className="concept-service-icon" /><span className="concept-line" /><span className="concept-line concept-line--short" /></div>)}</div>
  </div>;
  if (section.type === 'contact') return <div className="concept-contact"><h4>{section.title}</h4><span className="concept-line" /><span className="concept-action" /></div>;
  return <div className="concept-section"><h4>{section.title}</h4><span className="concept-line" /><span className="concept-line concept-line--short" /></div>;
}

export default function WebsitePreview({ branding = {}, sections = exampleSections, projectType }) {
  const previewBranding = { ...branding, businessName: branding.businessName?.trim() || exampleBranding.businessName, tagline: branding.tagline?.trim() || exampleBranding.tagline };
  const navigationSections = sections.filter(section => section.type !== 'hero').slice(0, 3);
  return <section className="builder-preview" aria-labelledby="builder-preview-heading">
    <div className="builder-preview-heading"><h2 id="builder-preview-heading">Your website, taking shape.</h2><span>CONCEPT PREVIEW</span></div>
    <figure className="concept-preview">
      <div className="concept-browser" aria-hidden="true"><span className="concept-browser-dots"><i /><i /><i /></span><span className="concept-browser-project">{projectType || 'WEBSITE CANVAS'}</span><span className="concept-browser-size">DESKTOP</span></div>
      <div className="concept-canvas-viewport" tabIndex={0} role="region" aria-label="Concept website canvas" aria-describedby="builder-preview-summary">
      <div className={`concept-canvas${projectType ? ' concept-canvas--recipe' : ''}`} style={{ '--concept-brand-color': branding.brandColor || '#8e6b45' }} aria-hidden="true">
        <div className="concept-site-header"><span className="concept-site-brand">{branding.logo ? <img src={branding.logo.url} alt="" /> : previewBranding.businessName}</span><div>{navigationSections.map(section => <span key={section.id}>{section.title}</span>)}</div></div>
        {sections.map(section => <PreviewSection key={section.id} section={section} branding={previewBranding} />)}
      </div>
      </div>
      <figcaption id="builder-preview-summary" role="status">{projectType ? `${projectType} concept: ${sections.map(section => section.title || 'HERO').join(' → ')}. Concept layout only.` : 'Example layout only. Your website concept will appear here.'}</figcaption>
    </figure>
  </section>;
}
