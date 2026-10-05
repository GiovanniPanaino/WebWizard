import Header from '../components/Header';
import { useLayoutEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Packages from '../components/Packages';
import SelectedWork from '../components/SelectedWork';

export default function Home() {
  useLayoutEffect(() => {
    // On a fresh route load, native fragment navigation can precede React's DOM.
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);

  return (
    <div className="home-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Services />
        <Packages />
        <SelectedWork />
      </main>
    </div>
  );
}
