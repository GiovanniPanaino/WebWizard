export default function PackageVisual({ level }) {
  return (
    <svg className="package-visual" viewBox="0 0 200 110" fill="none" aria-hidden="true" focusable="false">
      <path className="package-gridline" d="M10 55h180M100 10v90" />
      <rect className="package-shell" x="25" y="30" width="68" height="50" rx="3" />
      <path className="package-shell" d="M25 42h68M35 36h10" />
      <path className="package-circuit" d="M37 60h42" />
      <circle className="package-led" cx="79" cy="60" r="2.5" />
      {level >= 2 && <>
        <path className="package-circuit" d="M93 56h24V32h22" />
        <rect className="package-shell" x="139" y="20" width="35" height="25" rx="3" />
        <path className="package-shell" d="M147 32h18" />
        <circle className="package-led" cx="139" cy="32" r="2.5" />
      </>}
      {level >= 3 && <>
        <path className="package-circuit" d="M117 56v28h22" />
        <rect className="package-shell" x="139" y="71" width="35" height="25" rx="3" />
        <path className="package-shell" d="M147 83h18" />
        <circle className="package-led" cx="139" cy="84" r="2.5" />
      </>}
      {level === 4 && <>
        <path className="package-shell" d="M174 32h14v52h-14M59 30V15h58v17M59 80v17h58V84" strokeDasharray="3 4" />
        <path className="package-circuit" d="m117 49 7 7-7 7-7-7Z" />
      </>}
    </svg>
  );
}
