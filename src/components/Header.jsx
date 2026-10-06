import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const sectionLinks = [
  { label: 'Websites', href: '/#website-packages' },
  { label: 'Applications', href: '/#applications' },
  { label: 'Business Systems', href: '/#business-systems' },
  { label: 'Portfolio', href: '/#portfolio' },
];
const futurePages = ['About', 'Contact'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  function handleKeyDown(event) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      toggleRef.current?.focus();
    }
  }

  return (
    <header className="site-header container" onKeyDown={handleKeyDown}>
      <a className="brand" href={import.meta.env.BASE_URL} aria-label="The Web Wizard — Home" onClick={() => setMenuOpen(false)}>
        <span className="brand-type">THE WEB WIZARD<span className="brand-signature brand-studio">DEVELOPMENT STUDIO</span></span>
      </a>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav id="primary-navigation" className={`navigation${menuOpen ? ' is-open' : ''}`} aria-label="Primary">
        <a href={import.meta.env.BASE_URL} aria-current="page" onClick={() => setMenuOpen(false)}>Home</a>
        {sectionLinks.map(({ label, href }) => <a key={href} href={`${import.meta.env.BASE_URL}${href.slice(1)}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        {futurePages.map(page => <button className="nav-placeholder" key={page} type="button" disabled aria-label={`${page} — not yet available`} title={`${page} — not yet available`}>{page}</button>)}
        <Link className="button header-cta" to="/build" onClick={() => setMenuOpen(false)}>BUILD YOUR PROJECT <ArrowUpRight aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}
