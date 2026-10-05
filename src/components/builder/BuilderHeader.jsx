import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandMark from '../BrandMark';

export default function BuilderHeader() {
  return <header className="builder-header container">
    <Link className="builder-brand" to="/" aria-label="The Web Wizard by The Tasseomancer's Cup — Studio home">
      <BrandMark className="builder-brand-mark" />
      <span className="builder-brand-name">THE WEB WIZARD<span className="builder-brand-signature">by The Tasseomancer’s Cup<span>Development Studio</span></span></span>
    </Link>
    <Link className="builder-back" to="/"><ArrowLeft aria-hidden="true" /><span>BACK TO STUDIO</span></Link>
  </header>;
}
