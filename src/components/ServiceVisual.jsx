export default function ServiceVisual({ kind }) {
  return (
    <svg className={`service-visual service-visual--${kind}`} viewBox="0 0 240 180" fill="none" aria-hidden="true" focusable="false">
      <circle className="service-orbit" cx="120" cy="90" r="76" />
      <path className="service-guide" d="M0 90h240M120 0v180" />
      {kind === 'websites' && <g className="service-drawing">
        <rect x="35" y="35" width="170" height="110" rx="5" />
        <path d="M35 56h170" />
        <path className="service-solid" d="M48 45h3m5 0h3m5 0h3" />
        <rect className="service-fill" x="49" y="70" width="57" height="60" rx="2" />
        <path className="service-solid" d="M120 76h65M120 87h45" />
        <path className="service-muted" d="M120 105h65M120 113h54" />
        <path className="service-solid" d="M120 127h27" />
      </g>}
      {kind === 'applications' && <g className="service-drawing">
        <path d="M83 61h34v55h36M83 61v71h34M169 64v25h-52" />
        <rect className="service-panel" x="31" y="35" width="52" height="52" rx="6" />
        <rect className="service-panel" x="142" y="26" width="52" height="38" rx="6" />
        <rect className="service-panel" x="153" y="96" width="57" height="48" rx="6" />
        <rect className="service-fill" x="101" y="116" width="32" height="32" rx="5" />
        <path className="service-solid" d="m53 50-9 11 9 11m9-22 9 11-9 11M157 45h22M169 107v24m-10-12h21" />
        <circle className="service-fill" cx="117" cy="89" r="5" />
      </g>}
      {kind === 'business-systems' && <g className="service-drawing">
        <path d="M63 48h57v36m57-36h-57M45 130h75V96m75 34h-75" />
        <rect className="service-panel" x="37" y="30" width="44" height="36" rx="4" />
        <rect className="service-panel" x="159" y="30" width="44" height="36" rx="4" />
        <rect className="service-panel" x="23" y="114" width="44" height="36" rx="4" />
        <rect className="service-panel" x="173" y="114" width="44" height="36" rx="4" />
        <path className="service-fill" d="m120 66 24 24-24 24-24-24Z" />
        <path className="service-solid" d="M48 48h22M170 43h22m-22 9h14M34 136v-9m10 9v-17m10 17v-12M184 126h22m-22 9h14" />
      </g>}
      <g className="service-digital">
        {kind === 'websites' && <>
          <path className="service-data-route" d="M120 76h65" />
          <path className="service-data-edge" d="M49 130V70h57" />
          <circle className="service-status-halo" cx="189" cy="45" r="7" />
          <circle className="service-status-node" cx="189" cy="45" r="2.5" />
        </>}
        {kind === 'applications' && <>
          <path className="service-data-route" d="M83 61h34v28h52V64" />
          <path className="service-signal digital-traveller" pathLength="100" d="M83 61h34v28h52V64" />
          <circle className="service-data-node" cx="117" cy="89" r="3" />
          <circle className="service-status-halo" cx="169" cy="64" r="7" />
          <circle className="service-status-node" cx="169" cy="64" r="2.5" />
        </>}
        {kind === 'business-systems' && <>
          <path className="service-data-route" d="M81 48h39v18M120 114v16h53" />
          <path className="service-signal digital-traveller" pathLength="100" d="M81 48h39v18l24 24-24 24v16h53" />
          <circle className="service-data-node" cx="120" cy="66" r="3" />
          <circle className="service-status-halo" cx="173" cy="130" r="7" />
          <circle className="service-status-node" cx="173" cy="130" r="2.5" />
          <path className="service-data-edge" d="M184 126h22" />
        </>}
      </g>
      <path className="service-ticks" d="M8 12h8m-4-4v8M224 168h8m-4-4v8" />
    </svg>
  );
}
