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

export default function ProjectMedia({ media }) {
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
