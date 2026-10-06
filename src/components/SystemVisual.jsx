import { Braces, Layers, PanelTop, ArrowUpRight } from 'lucide-react';

export default function SystemVisual() {
  return (
    <div className="system-visual" aria-hidden="true">
      <div className="visual-grid" />
      <svg className="orbital-diagram" viewBox="0 0 600 600" fill="none">
        <defs>
          <radialGradient id="core-glow"><stop stopColor="var(--digital-blue)" stopOpacity=".12" /><stop offset="1" stopColor="var(--digital-blue)" stopOpacity="0" /></radialGradient>
          <linearGradient id="orbit-bronze" x1="80" y1="60" x2="530" y2="550" gradientUnits="userSpaceOnUse"><stop stopColor="var(--digital-signal-core)" stopOpacity=".7" /><stop offset=".5" stopColor="var(--digital-blue)" stopOpacity=".1" /><stop offset="1" stopColor="var(--digital-signal-core)" stopOpacity=".5" /></linearGradient>
        </defs>
        <circle cx="300" cy="300" r="280" fill="url(#core-glow)" />
        <path d="M300 30v540M30 300h540" stroke="var(--digital-blue)" strokeOpacity=".12" strokeDasharray="3 7" />
        <circle cx="300" cy="300" r="245" stroke="var(--digital-blue)" strokeOpacity=".14" />
        <circle cx="300" cy="300" r="224" stroke="var(--digital-blue)" strokeOpacity=".25" strokeDasharray="1 12" />
        <g className="orbit-rotation">
          <circle cx="300" cy="300" r="199" stroke="url(#orbit-bronze)" />
          <path d="M101 300a199 199 0 0 1 199-199M499 300a199 199 0 0 1-199 199" stroke="var(--digital-blue)" strokeWidth="2" />
          <circle cx="300" cy="101" r="4" fill="var(--digital-signal-core)" />
          <circle cx="300" cy="499" r="4" fill="var(--digital-signal-core)" />
        </g>
        <circle cx="300" cy="300" r="163" stroke="url(#orbit-bronze)" />
        <path className="hero-data-route" d="M300 137a163 163 0 0 1 115 278" />
        <path className="hero-data-signal digital-traveller" pathLength="100" d="M300 137a163 163 0 0 1 115 278" />
        <circle className="hero-receive-node" cx="441" cy="218.5" r="3" />
        <circle className="hero-status-node" cx="415" cy="415" r="3.5" />
        <ellipse cx="300" cy="300" rx="113" ry="163" stroke="var(--digital-blue)" strokeOpacity=".12" transform="rotate(40 300 300)" />
        <path d="M180 440c190-30 16-225 211-283M197 456c190-30 16-225 211-283" stroke="var(--digital-blue)" strokeOpacity=".17" />
        <path d="M55 290v20M45 300h20M535 300h20M545 290v20" stroke="var(--digital-blue)" strokeOpacity=".5" />
      </svg>
      <div className="system-core"><span>LUCID</span></div>
      <div className="interface-card card-web"><div className="card-label"><PanelTop size={14} /><span>Web</span><ArrowUpRight size={12} /></div><div className="mini-browser"><i /><i /><i /><span /></div><div className="mini-layout"><div /><div><i /><i /><i /></div></div></div>
      <div className="interface-card card-app"><div className="card-label"><Braces size={14} /><span>App</span></div><div className="code-fragment"><i /><i /><i /><i /></div></div>
      <div className="interface-card card-system"><div className="card-label"><Layers size={14} /><span>Systems</span></div><div className="system-nodes"><i /><span /><i /><span /><i /></div></div>
    </div>
  );
}
