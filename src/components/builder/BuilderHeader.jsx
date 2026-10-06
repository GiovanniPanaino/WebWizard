import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BuilderHeader() {
  return <header className="builder-header container">
    <Link className="builder-brand" to="/" aria-label="The Web Wizard — Studio home">
      <span className="builder-brand-name">THE WEB WIZARD<span className="builder-brand-signature">DEVELOPMENT STUDIO</span></span>
    </Link>
    <div className="builder-header-actions">
      <Link className="builder-back" to="/"><ArrowLeft aria-hidden="true" /><span>BACK TO STUDIO</span></Link>
      <span className="builder-lucid"><i aria-hidden="true" /><span>Powered by</span> <strong>LUCID</strong></span>
    </div>
  </header>;
}
