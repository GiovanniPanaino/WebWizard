import { Image as ImageIcon } from 'lucide-react';

const exampleBranding = { businessName: 'YOUR BUSINESS', tagline: 'Your tagline will appear here.' };
const exampleSections = [
  { id: 'hero', type: 'hero' },
  { id: 'about', type: 'about', title: 'ABOUT' },
  { id: 'services', type: 'services', title: 'SERVICES' },
  { id: 'contact', type: 'contact', title: 'CONTACT' },
];

function PreviewSection({ section, branding }) {
  if (section.type === 'hero') return <div className="concept-hero">
    <div><span className="concept-kicker">A PLACE FOR YOUR IDEAS</span><h3>{branding.businessName}</h3><p>{branding.tagline}</p><span className="concept-action" /></div>
    <div className="concept-artwork"><ImageIcon /><span>HERO IMAGE / ARTWORK</span></div>
  </div>;
  if (section.type === 'services') return <div className="concept-section">
    <h4>{section.title}</h4><div className="concept-services">{[1, 2, 3].map(item => <div key={item}><span className="concept-service-icon" /><span className="concept-line" /><span className="concept-line concept-line--short" /></div>)}</div>
  </div>;
  if (section.type === 'contact') return <div className="concept-contact"><h4>{section.title}</h4><span className="concept-line" /><span className="concept-action" /></div>;
  return <div className="concept-section"><h4>{section.title}</h4><span className="concept-line" /><span className="concept-line concept-line--short" /></div>;
}

export default function WebsitePreview({ branding = exampleBranding, sections = exampleSections }) {
  return <section className="builder-preview" aria-labelledby="builder-preview-heading">
    <div className="builder-preview-heading"><h2 id="builder-preview-heading">Your website, taking shape.</h2><span>CONCEPT PREVIEW</span></div>
    <figure className="concept-preview">
      <div className="concept-browser" aria-hidden="true"><span className="concept-browser-dots"><i /><i /><i /></span><span>WEBSITE CANVAS</span><span className="concept-browser-size">DESKTOP</span></div>
      <div className="concept-canvas" aria-hidden="true">
        <div className="concept-site-header"><span>{branding.businessName}</span><div><span>ABOUT</span><span>SERVICES</span><span>CONTACT</span></div></div>
        {sections.map(section => <PreviewSection key={section.id} section={section} branding={branding} />)}
      </div>
      <figcaption>Example layout only. Your website concept will appear here.</figcaption>
    </figure>
  </section>;
}
