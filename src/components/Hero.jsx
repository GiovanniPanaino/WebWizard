import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SystemVisual from './SystemVisual';

export default function Hero() {
  return (
    <div className="hero container">
      <section className="hero-layout" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <div className="hero-masthead">
            <p className="hero-company">THE TASSEOMANCER’S CUP</p>
            <p className="hero-descriptor">DEVELOPMENT STUDIO</p>
          </div>
          <h1 id="hero-heading">Websites.<br />Applications.<br /><span>Business Systems.</span></h1>
          <p className="hero-description">We design and develop modern digital solutions for businesses, from professional websites to custom applications and management platforms.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/build">BUILD YOUR PROJECT <ArrowUpRight aria-hidden="true" /></Link>
            <span className="button button-secondary" role="link" aria-disabled="true" title="Portfolio available in a future phase">VIEW OUR WORK <ArrowRight aria-hidden="true" /></span>
          </div>
          <div className="technology-signature"><span className="lucid-symbol" aria-hidden="true">✳</span><span>Powered by <strong>LUCID</strong></span><span className="signature-line" /></div>
        </div>
        <SystemVisual />
      </section>
      <div className="hero-baseline" aria-hidden="true" />
    </div>
  );
}
