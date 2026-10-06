import { useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Add imported assets to media.images as { src, alt, width, height, srcSet?, sizes? }.
// Multiple images render as a responsive composition, without a carousel dependency.
function ApplicationScreen({ image }) {
  return <figure className={`application-screen application-screen--${image.role}`}>
    <figcaption className="application-screen-label">{image.label}</figcaption>
    <div className="application-screen-frame">
      <div className="application-screen-chrome" aria-hidden="true"><span /><span /></div>
      <img src={image.src} srcSet={image.srcSet} sizes={image.sizes} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
    </div>
  </figure>;
}

function DesktopProjectMedia({ media }) {
  if (media.composition === 'case-study') return <div className="case-study-showcase">{media.images.map(image => <ApplicationScreen key={image.role} image={image} />)}</div>;
  if (media.composition === 'harvard') return (
    <div className="harvard-showcase">
      <div className="harvard-screens">
        {media.images.map(image => <figure key={image.role} className={`harvard-screen harvard-screen--${image.role}`}>
          <div className="harvard-screen-chrome" aria-hidden="true">
            <span className="harvard-screen-dot" />
            <span>{image.label}</span>
            <span className="harvard-screen-index">{image.role === 'hero' ? '01' : image.role === 'structure' ? '02' : '03'}</span>
          </div>
          <div className="harvard-screen-viewport">
            <img src={image.src} srcSet={image.srcSet} sizes={image.sizes} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
          </div>
        </figure>)}
      </div>
    </div>
  );
  if (media.composition === 'command-deck') return (
    <div className="command-deck-showcase">
      {media.images.map(image => <ApplicationScreen key={image.role} image={image} />)}
    </div>
  );
  if (media.composition === 'dragonpos') return (
    <div className="business-system-showcase">
      <ApplicationScreen image={media.images[0]} />
      <p className="business-system-flow"><span aria-hidden="true">↓</span> FIERO CORE <span>Management / products / reporting</span></p>
      <div className="business-system-rail">
        {media.images.slice(1).map(image => <ApplicationScreen key={image.role} image={image} />)}
      </div>
    </div>
  );
  const hasImages = media.images.length > 0;
  return (
    <div className={`project-media project-media--${media.variant}`}>
      <div className="project-media-chrome" aria-hidden="true"><span /><span /><span /></div>
      {hasImages ? <div className="project-images">
        {media.images.map(image => <img key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} srcSet={image.srcSet} sizes={image.sizes} loading="lazy" decoding="async" />)}
      </div> : <div className="project-media-placeholder" aria-hidden="true">
        <span className="project-media-cross">+</span>
        <span className="project-media-caption">PROJECT MEDIA</span>
        <span className="project-media-name">{media.label}</span>
        <span className="project-media-cross">+</span>
      </div>}
    </div>
  );
}



function MobileGallery({ media, title }) {
  const [index, setIndex] = useState(0);
  const gestureRef = useRef(null);
  const image = media.images[index];
  const instructionId = useId();
  function move(direction) {
    setIndex(current => (current + direction + media.images.length) % media.images.length);
  }
  function handleKeyDown(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') setIndex(0);
    else if (event.key === 'End') setIndex(media.images.length - 1);
    else move(event.key === 'ArrowLeft' ? -1 : 1);
  }
  function startGesture(event) {
    if (!event.isPrimary || event.pointerType === 'mouse' || event.target.closest('button')) return;
    gestureRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function endGesture(event) {
    const start = gestureRef.current;
    gestureRef.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
  }
  return <div className="mobile-project-media">
    <div className="mobile-project-gallery" role="region" aria-roledescription="carousel" aria-label={`${title} screenshots`} aria-describedby={instructionId} tabIndex={0} onKeyDown={handleKeyDown}>
      <p id={instructionId} className="gallery-instructions">Use Previous and Next, left and right arrow keys, or swipe to change the screenshot. Home and End select the first and last screenshots.</p>
      <figure className="mobile-project-slide">
        <figcaption aria-live="polite" aria-atomic="true"><span>{media.composition === 'dragonpos' && index > 0 ? `FIERO Core / ${image.label}` : image.label}</span><span>{index + 1} / {media.images.length}</span></figcaption>
        <div className="mobile-project-viewport" onPointerDown={startGesture} onPointerUp={endGesture} onPointerCancel={() => { gestureRef.current = null; }}>
          <img src={image.src} srcSet={image.srcSet} sizes="(max-width: 600px) calc(100vw - 42px)" alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
          <button className="gallery-control gallery-control--previous" type="button" aria-label={`Previous screenshot: ${title}`} onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button>
          <button className="gallery-control gallery-control--next" type="button" aria-label={`Next screenshot: ${title}`} onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button>
        </div>
      </figure>
      <div className="gallery-position" aria-hidden="true">{media.images.map((item, position) => <span key={item.role} className={position === index ? 'is-current' : ''} />)}</div>
    </div>
  </div>;
}

export default function ProjectMedia({ media, title }) {
  if (!media.images.length) return <div className="project-overview" aria-label={`${title} overview`}>
    <p className="eyebrow">CONNECTED SYSTEM</p>
    <dl><div><dt>LUCID</dt><dd>Core / local AI platform</dd></div><div><dt>SiFT</dt><dd>A capability/plugin within the LUCID ecosystem</dd></div></dl>
    <p className="project-media-note">Interface screenshots are not available in this portfolio.</p>
  </div>;
  return <>
    <div className="desktop-project-media"><DesktopProjectMedia media={media} /></div>
    <MobileGallery media={media} title={title} />
  </>;
}
