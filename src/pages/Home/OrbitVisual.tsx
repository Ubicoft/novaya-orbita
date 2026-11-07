/** Abstract orbital mark for the home hero — decorative, theme-colored via CSS. */
export function OrbitVisual() {
  return (
    <svg
      className="home-orbit"
      viewBox="0 0 640 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="home-orbit-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="55%" stopColor="var(--accent-strong)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="home-orbit-ring" x1="80" y1="120" x2="560" y2="520" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="0.45" stopColor="var(--accent)" stopOpacity="0.85" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <circle cx="320" cy="320" r="210" fill="url(#home-orbit-core)" />

      <g className="home-orbit__spin home-orbit__spin--a">
        <ellipse
          cx="320"
          cy="320"
          rx="250"
          ry="118"
          stroke="url(#home-orbit-ring)"
          strokeWidth="1.6"
          transform="rotate(-28 320 320)"
        />
        <circle className="home-orbit__node" cx="545" cy="265" r="6.5" fill="var(--accent)" />
      </g>

      <g className="home-orbit__spin home-orbit__spin--b">
        <ellipse
          cx="320"
          cy="320"
          rx="250"
          ry="118"
          stroke="url(#home-orbit-ring)"
          strokeWidth="1.4"
          transform="rotate(34 320 320)"
        />
        <circle className="home-orbit__node" cx="160" cy="380" r="5" fill="var(--accent-strong)" />
      </g>

      <g className="home-orbit__spin home-orbit__spin--c">
        <ellipse
          cx="320"
          cy="320"
          rx="198"
          ry="198"
          stroke="color-mix(in srgb, var(--accent) 35%, transparent)"
          strokeWidth="1"
          strokeDasharray="4 10"
        />
        <circle
          className="home-orbit__node"
          cx="390"
          cy="140"
          r="4.5"
          fill="color-mix(in srgb, var(--accent) 70%, white)"
        />
      </g>

      <circle cx="320" cy="320" r="18" fill="color-mix(in srgb, var(--accent) 55%, white 20%)" />
      <circle cx="320" cy="320" r="7" fill="currentColor" className="home-orbit__core-hole" opacity="0.35" />
    </svg>
  );
}
