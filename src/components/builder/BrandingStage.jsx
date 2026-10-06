import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const imageTypes = ['image/png', 'image/jpeg', 'image/webp'];

export default function BrandingStage({ branding, onChange, onLogoSelect, onHeroArtworkSelect, complete, onContinue, headingRef }) {
  const [hexValue, setHexValue] = useState(branding.brandColor);
  const [colorError, setColorError] = useState('');
  const [logoError, setLogoError] = useState('');
  const fileRef = useRef(null);
  const artworkFileRef = useRef(null);
  const [artworkError, setArtworkError] = useState('');

  function updateHex(value) {
    setHexValue(value);
    setColorError('');
    if (/^#[\da-f]{6}$/i.test(value)) onChange('brandColor', value);
  }

  function uploadLogo(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!imageTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      setLogoError('Choose a PNG, JPG or WEBP image up to 5 MB.');
      event.target.value = '';
      return;
    }
    setLogoError('');
    onLogoSelect(file);
    event.target.value = '';
  }

  function uploadHeroArtwork(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!imageTypes.includes(file.type) || file.size > 10 * 1024 * 1024) {
      setArtworkError('Choose a PNG, JPG or WEBP image up to 10 MB.');
      event.target.value = '';
      return;
    }
    setArtworkError('');
    onHeroArtworkSelect(file);
    event.target.value = '';
  }

  return <section className="builder-branding-stage" aria-labelledby="builder-branding-heading">
    <p className="builder-stage-label"><span>02</span> BRANDING</p>
    <h2 id="builder-branding-heading" ref={headingRef} tabIndex={-1}>MAKE IT YOURS</h2>
    <p className="builder-stage-description">Your name, tagline, colour and logo shape the website preview as you go.</p>
    <div className="builder-branding-fields">
      <div className="builder-field"><label htmlFor="builder-business-name">BUSINESS NAME</label><input id="builder-business-name" type="text" maxLength={80} placeholder="Your Business" value={branding.businessName} onChange={event => onChange('businessName', event.target.value)} /></div>
      <div className="builder-field"><label htmlFor="builder-tagline">TAGLINE</label><input id="builder-tagline" type="text" maxLength={160} placeholder="A short line about what you do" value={branding.tagline} onChange={event => onChange('tagline', event.target.value)} /></div>
      <div className="builder-field"><label htmlFor="builder-brand-color">BRAND COLOUR</label>
        <div className="builder-color-controls">
          <input id="builder-brand-color" type="color" value={branding.brandColor} onChange={event => { onChange('brandColor', event.target.value); setHexValue(event.target.value); setColorError(''); }} />
          <label className="builder-sr-only" htmlFor="builder-color-hex">Brand colour hexadecimal value</label>
          <input id="builder-color-hex" type="text" value={hexValue} maxLength={7} spellCheck={false} aria-invalid={Boolean(colorError)} aria-describedby="builder-color-note" onChange={event => updateHex(event.target.value)} onBlur={() => { if (!/^#[\da-f]{6}$/i.test(hexValue)) { setHexValue(branding.brandColor); setColorError('Use a six-digit hex colour, such as #8e6b45.'); } }} />
        </div>
        <p id="builder-color-note" className="builder-field-note" role={colorError ? 'alert' : undefined}>{colorError || 'Applied to accents in your preview.'}</p>
      </div>
      <div className="builder-field"><label htmlFor="builder-logo">LOGO</label>
        <input ref={fileRef} id="builder-logo" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadLogo} aria-describedby="builder-logo-note builder-logo-status" />
        <p id="builder-logo-note" className="builder-field-note">PNG, JPG or WEBP, up to 5 MB. Preview only.</p>
        <div id="builder-logo-status" className="builder-logo-status" role="status">{branding.logo ? <><span>{branding.logo.name}</span><button type="button" onClick={() => { onLogoSelect(null); setLogoError(''); fileRef.current.value = ''; }}>REMOVE LOGO</button></> : 'No logo selected.'}</div>
        {logoError && <p className="builder-field-note" role="alert">{logoError}</p>}
      </div>
      <div className="builder-field"><label htmlFor="builder-hero-artwork">HERO ARTWORK</label>
        <input ref={artworkFileRef} id="builder-hero-artwork" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadHeroArtwork} aria-describedby="builder-artwork-note builder-artwork-status" />
        <p id="builder-artwork-note" className="builder-field-note">Upload the main image you'd like visitors to see first. PNG, JPG or WEBP, up to 10 MB. Preview only.</p>
        <div id="builder-artwork-status" className="builder-logo-status" role="status">{branding.heroArtwork ? <><span>{branding.heroArtwork.name}</span><button type="button" onClick={() => { onHeroArtworkSelect(null); setArtworkError(''); artworkFileRef.current.value = ''; }}>REMOVE HERO ARTWORK</button></> : 'No hero artwork selected.'}</div>
        {artworkError && <p className="builder-field-note" role="alert">{artworkError}</p>}
      </div>
    </div>
    <div className="builder-progression">
      <button className="button builder-continue" type="button" disabled={!complete} onClick={onContinue} aria-describedby="builder-sections-note">CONTINUE TO SECTIONS<ArrowRight aria-hidden="true" /></button>
      <p id="builder-sections-note">{complete ? 'Branding complete. Choose your website sections next.' : 'Enter a business name to continue to Sections.'}</p>
    </div>
  </section>;
}
