import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import CircuitTrace from './CircuitTrace';

export default function Footer() {
  return <footer className="site-footer container">
    <CircuitTrace />
    <div className="footer-heading"><div><p className="eyebrow">THE WEB WIZARD</p><p className="footer-invitation">Your next idea starts here.</p></div><Link className="button button-primary" to="/build">BUILD YOUR PROJECT<ArrowUpRight aria-hidden="true" /></Link></div>
    <div className="footer-signature"><p><svg className="footer-bean" viewBox="0 0 24 30" fill="none" aria-hidden="true"><ellipse cx="12" cy="15" rx="9" ry="13" transform="rotate(25 12 15)" /><path d="M17 3C6 12 18 17 7 27" /></svg>A product of The Tasseomancer’s Cup</p><span className="footer-lucid"><i aria-hidden="true" />Powered by <strong>LUCID</strong></span></div>
  </footer>;
}
