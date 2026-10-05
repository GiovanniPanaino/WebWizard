import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Plus, X } from 'lucide-react';
import { sectionCatalogue } from '../../data/sections';

export default function SectionsStage({ selectedSections, onAdd, onRemove, complete, headingRef }) {
  const selectedIds = new Set(selectedSections.map(section => section.id));
  const availableSections = sectionCatalogue.filter(section => !selectedIds.has(section.id));
  const currentListRef = useRef(null);
  const libraryRef = useRef(null);
  const pendingFocusRef = useRef(null);
  const [announcement, setAnnouncement] = useState('');

  useLayoutEffect(() => {
    const pending = pendingFocusRef.current;
    if (!pending) return;
    const list = pending.action === 'add' ? libraryRef.current : currentListRef.current;
    const buttons = list.querySelectorAll('button');
    const target = buttons[Math.min(pending.index, buttons.length - 1)] || list;
    target.focus({ preventScroll: true });
    pendingFocusRef.current = null;
  }, [selectedSections]);

  function editSection(action, section, event) {
    const list = action === 'add' ? libraryRef.current : currentListRef.current;
    pendingFocusRef.current = { action, index: [...list.querySelectorAll('button')].indexOf(event.currentTarget) };
    if (action === 'add') onAdd(section.id);
    else onRemove(section.id);
    setAnnouncement(`${section.title} section ${action === 'add' ? 'added before Contact' : 'removed'}.`);
  }

  return <section className="builder-sections-stage" aria-labelledby="builder-sections-heading">
    <p className="builder-stage-label"><span>03</span> SECTIONS</p>
    <h2 id="builder-sections-heading" ref={headingRef} tabIndex={-1}>BUILD YOUR PAGE</h2>
    <p className="builder-stage-description">Choose the sections your website needs. Your starting layout is based on the project type you selected.</p>
    <div className="builder-section-group">
      <h3 id="builder-current-sections-heading">YOUR WEBSITE</h3>
      <p className="builder-field-note">Hero and Contact are core sections and stay in your page.</p>
      <ol className="builder-current-sections" ref={currentListRef} tabIndex={-1} aria-labelledby="builder-current-sections-heading">
        {selectedSections.map((section, index) => <li key={section.id}>
          <span className="builder-section-order" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className="builder-section-title">{section.title}</span>
          {section.core ? <span className="builder-section-core">CORE</span> : <button type="button" aria-label={`Remove ${section.title.toLowerCase()} section`} onClick={event => editSection('remove', section, event)}><X aria-hidden="true" /><span className="builder-sr-only">Remove</span></button>}
        </li>)}
      </ol>
    </div>
    <div className="builder-section-group">
      <h3 id="builder-section-library-heading">ADD A SECTION</h3>
      <ul className="builder-section-library" ref={libraryRef} tabIndex={-1} aria-labelledby="builder-section-library-heading">
        {availableSections.map(section => <li key={section.id}><button type="button" aria-label={`Add ${section.title.toLowerCase()} section`} onClick={event => editSection('add', section, event)}><Plus aria-hidden="true" /><span>{section.title}</span></button></li>)}
      </ul>
      {!availableSections.length && <p className="builder-field-note">All available sections are in your page.</p>}
    </div>
    <p className="builder-sr-only" role="status">{announcement}</p>
    <div className="builder-progression">
      <button className="button builder-continue" type="button" disabled aria-describedby="builder-features-note">CONTINUE TO FEATURES<ArrowRight aria-hidden="true" /></button>
      <p id="builder-features-note">{complete ? 'Sections complete. Features is next and is not available yet.' : 'Keep at least one content section alongside Hero and Contact. Features is not available yet.'}</p>
    </div>
  </section>;
}
