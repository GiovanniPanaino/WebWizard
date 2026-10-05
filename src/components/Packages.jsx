import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { packages, paymentTerms } from '../data/packages';
import PackageVisual from './PackageVisual';
import '../styles/packages.css';

function PackageStage({ item }) {
  return (
    <article id={`package-${item.id}`} className={`package-stage${item.recommended ? ' package-stage--recommended' : ''}`} aria-labelledby={`package-${item.id}-heading`}>
      <div className="package-identity">
        <span className="package-number" aria-hidden="true">{item.stage}</span>
        <div>
          {item.recommended && <p className="package-recommendation">RECOMMENDED</p>}
          <h3 id={`package-${item.id}-heading`}>{item.name}</h3>
        </div>
        <PackageVisual level={item.level} />
      </div>
      <div className="package-specification">
        <p className="package-description">{item.description}</p>
        <ul className="package-highlights">{item.features.slice(0, 3).map(feature => <li key={feature}>{feature}</li>)}</ul>
        <details className="package-details">
          <summary><span>View {item.name} {item.level >= 3 ? 'capabilities' : 'inclusions'}</span><ChevronDown size={16} aria-hidden="true" /></summary>
          <ul>{item.features.slice(3).map(feature => <li key={feature}>{feature}</li>)}</ul>
        </details>
      </div>
      <div className="package-commercial">
        <p className={`package-price${item.id === 'custom' ? ' package-price--quoted' : ''}`}>{item.price}</p>
        {item.note && <p className="package-price-note">{item.note}</p>}
        <Link className={`button package-cta${item.recommended ? ' button-primary' : ''}`} to={`/build?package=${item.id}`}>{item.cta}<ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </article>
  );
}

export default function Packages() {
  return (
    <section id="website-packages" className="packages container" aria-labelledby="packages-heading">
      <header className="packages-intro">
        <p className="eyebrow">WEBSITE DEVELOPMENT</p>
        <h2 id="packages-heading">Choose the right<br /> starting point.</h2>
        <p className="packages-summary">Start with the package that best matches your business. Every website is professionally designed, responsive and built around your requirements.</p>
      </header>
      <nav className="package-progression" aria-label="Website packages">
        {packages.map(item => <a key={item.id} href={`#package-${item.id}`}><span>{item.stage}</span>{item.name}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
      </nav>
      <div className="package-stages">{packages.map(item => <PackageStage key={item.id} item={item} />)}</div>
      <aside className="package-terms" aria-labelledby="package-terms-heading">
        <h3 id="package-terms-heading">Website development payment terms</h3>
        <dl className="package-payment-grid">{paymentTerms.map(term => <div key={term.name}><dt>{term.name}</dt><dd>{term.stages.map(stage => <p key={stage}>{stage}</p>)}</dd></div>)}</dl>
        <div className="package-notes">
          <p>Domain registration, hosting and significant ongoing maintenance are separate costs unless specifically included in a quotation.</p>
          <p>Additional work outside the agreed project scope is quoted separately and requires approval before development proceeds.</p>
        </div>
      </aside>
    </section>
  );
}
