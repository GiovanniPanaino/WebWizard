import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronUp, ChevronDown, Plus, X } from 'lucide-react';
import { sectionCatalogue } from '../../data/sections';

export default function SectionsStage({ selectedSections, onAdd, onRemove, onMove, complete, headingRef }) {
  const selectedIds = new Set(selectedSections.map(section => section.id));
  const availableSections = sectionCatalogue.filter(section => !selectedIds.has(section.id));
  const currentListRef = useRef(null);
  const libraryRef = useRef(null);
  const pendingFocusRef = useRef(null);
  const [announcement, setAnnouncement] = useState('');

  useLayoutEffect(() => {
    const pending = pendingFocusRef.current;
    if (!pending) return;
    if (pending.action === 'move') {
      const row = [...currentListRef.current.children].find(item => item.dataset.sectionId === pending.id);
      const target = row?.querySelector(`[data-move='${pending.direction}']:not(:disabled)`) || row?.querySelector('button:not(:disabled)') || currentListRef.current;
      target.focus({ preventScroll: true });
      pendingFocusRef.current = null;
      return;
    }
    const list = pending.action === 'add' ? libraryRef.current : currentListRef.current;
    const buttons = list.querySelectorAll('button:not(:disabled)');
    const target = buttons[Math.min(pending.index, buttons.length - 1)] || list;
    target.focus({ preventScroll: true });
    pendingFocusRef.current = null;
  }, [selectedSections]);

  function editSection(action, section, event) {
    const list = action === 'add' ? libraryRef.current : currentListRef.current;
    pendingFocusRef.current = { action, index: [...list.querySelectorAll('button:not(:disabled)')].indexOf(event.currentTarget) };
    if (action === 'add') onAdd(section.id);
    else onRemove(section.id);
    setAnnouncement(`${section.title} section ${action === 'add' ? 'added before Contact' : 'removed'}.`);
  }

  function moveSection(section, direction) {
    pendingFocusRef.current = { action: 'move', id: section.id, direction };
    onMove(section.id, direction);
    setAnnouncement(`${section.title} section moved ${direction}.`);
  }

  return <section className="builder-sections-stage" aria-labelledby="builder-sections-heading">
    <p className="builder-stage-label"><span>03</span> SECTIONS</p>
    <h2 id="builder-sections-heading" ref={headingRef} tabIndex={-1}>BUILD YOUR PAGE</h2>
    <p className="builder-stage-description">Choose the sections your website needs. Your starting layout is based on the project type you selected.</p>
    <div className="builder-section-group">
      <h3 id="builder-current-sections-heading">YOUR WEBSITE</h3>
      <p className="builder-field-note">Hero and Contact are core sections and stay in your page.</p>
      <ol className="builder-current-sections" ref={currentListRef} tabIndex={-1} aria-labelledby="builder-current-sections-heading">
        {selectedSections.map((section, index) => <li key={section.id} data-section-id={section.id}>
          <span className="builder-section-order" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className="builder-section-title">{section.title}</span>
          {section.core ? <span className="builder-section-core">CORE</span> : <div className="builder-section-actions">
            <button type="button" data-move="up" disabled={index === 1} aria-label={`Move ${section.title.toLowerCase()} section up`} title="Move up" onClick={() => moveSection(section, 'up')}><ChevronUp aria-hidden="true" /></button>
            <button type="button" data-move="down" disabled={index === selectedSections.length - 2} aria-label={`Move ${section.title.toLowerCase()} section down`} title="Move down" onClick={() => moveSection(section, 'down')}><ChevronDown aria-hidden="true" /></button>
            <button type="button" aria-label={`Remove ${section.title.toLowerCase()} section`} title="Remove section" onClick={event => editSection('remove', section, event)}><X aria-hidden="true" /><span className="builder-sr-only">Remove</span></button>
          </div>}
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
