import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import ServiceVisual from './ServiceVisual';
import CircuitTrace from './CircuitTrace';
import '../styles/services.css';

function ServiceRow({ service }) {
  const { id, number, title, description, commercial, capabilities, cta, href, featured } = service;
  const linkContent = <>{cta}<ArrowUpRight size={17} aria-hidden="true" /></>;
  const linkClass = `button service-cta${featured ? ' button-primary' : ''}`;

  return (
    <article id={id} className={`service-row${featured ? ' service-row--featured' : ''}`} aria-labelledby={`${id}-heading`}>
      <CircuitTrace compact />
      <span className="service-number" aria-hidden="true">{number}</span>
      <div className="service-heading">
        <h3 id={`${id}-heading`}>{title}</h3>
        <p className={`service-commercial${featured ? ' service-price' : ''}`}>{commercial}</p>
      </div>
      <ServiceVisual kind={id} />
      <div className="service-detail">
        <p className="service-description">{description}</p>
        <ul className="service-capabilities service-desktop-capabilities">{capabilities.map(item => <li key={item}>{item}</li>)}</ul>
        <details className="service-mobile-details"><summary>Explore capabilities</summary><ul className="service-capabilities">{capabilities.map(item => <li key={item}>{item}</li>)}</ul></details>
      </div>
      <div className="service-action">
        {href.startsWith('#')
          ? <a className={linkClass} href={href}>{linkContent}</a>
          : <Link className={linkClass} to={href} aria-label={`Discuss your project: ${title}`}>{linkContent}</Link>}
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section className="services container" aria-labelledby="services-heading">
      <CircuitTrace />
      <header className="services-intro">
        <p className="eyebrow">WHAT WE BUILD</p>
        <h2 id="services-heading">Digital solutions built<br className="services-heading-break" /> around your business.</h2>
        <p className="services-summary">From professional websites to purpose-built applications and operational systems, we design digital solutions around real business requirements.</p>
      </header>
      <div className="service-disciplines">{services.map(service => <ServiceRow key={service.id} service={service} />)}</div>
    </section>
  );
}
