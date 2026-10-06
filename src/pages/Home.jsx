import Header from '../components/Header';
import { useLayoutEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Packages from '../components/Packages';
import SelectedWork from '../components/SelectedWork';
import Footer from '../components/Footer';
import '../styles/home-refinement.css';

export default function Home() {
  useLayoutEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content');
    document.title = 'The Web Wizard | Development Studio';
    description?.setAttribute('content', 'The Web Wizard Development Studio. Professional websites, custom applications and business systems. Powered by LUCID.');
    // On a fresh route load, native fragment navigation can precede React's DOM.
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({ behavior: 'instant', block: 'start' });
    return () => {
      document.title = previousTitle;
      if (previousDescription !== null && previousDescription !== undefined) description?.setAttribute('content', previousDescription);
    };
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
      <Footer />
    </div>
  );
}
