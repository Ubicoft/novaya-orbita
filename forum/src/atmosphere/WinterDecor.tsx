export function WinterDecor() {
  return (
    <div className="winter-decor" aria-hidden="true">
      <div className="winter-decor__warm-glow" />
      <div className="winter-decor__ambient" />
      <div className="winter-decor__music-halo" />

      <svg
        className="winter-decor__svg"
        viewBox="0 0 220 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wd-foliage-1" x1="110" y1="24" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1f7a3f" />
            <stop offset="0.55" stopColor="#166534" />
            <stop offset="1" stopColor="#0f3d24" />
          </linearGradient>
          <linearGradient id="wd-foliage-2" x1="110" y1="70" x2="110" y2="175" gradientUnits="userSpaceOnUse">
            <stop stopColor="#228b45" />
            <stop offset="0.5" stopColor="#177a38" />
            <stop offset="1" stopColor="#0f4a28" />
          </linearGradient>
          <linearGradient id="wd-foliage-3" x1="110" y1="120" x2="110" y2="235" gradientUnits="userSpaceOnUse">
            <stop stopColor="#26a14d" />
            <stop offset="0.45" stopColor="#178a3c" />
            <stop offset="1" stopColor="#0d4024" />
          </linearGradient>
          <linearGradient id="wd-foliage-4" x1="110" y1="175" x2="110" y2="275" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2bb356" />
            <stop offset="0.4" stopColor="#189443" />
            <stop offset="1" stopColor="#0c3a20" />
          </linearGradient>
          <linearGradient id="wd-trunk" x1="110" y1="268" x2="110" y2="302" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5a35" />
            <stop offset="1" stopColor="#4a2c18" />
          </linearGradient>
          <radialGradient id="wd-star-glow" cx="110" cy="22" r="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fde68a" stopOpacity="0.9" />
            <stop offset="0.45" stopColor="#fbbf24" stopOpacity="0.35" />
            <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <filter id="wd-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
          <filter id="wd-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* floor glow */}
        <ellipse cx="110" cy="304" rx="68" ry="12" fill="rgba(253,230,138,0.18)" />
        <ellipse cx="110" cy="302" rx="48" ry="7" fill="rgba(255,255,255,0.2)" />

        {/* trunk */}
        <rect x="98" y="268" width="24" height="34" rx="4" fill="url(#wd-trunk)" />
        <rect x="102" y="270" width="6" height="28" rx="2" fill="rgba(255,255,255,0.08)" />

        {/* layered foliage — soft tapered silhouettes */}
        <path
          d="M110 28
             C128 48 148 78 152 108
             C120 104 100 104 68 108
             C72 78 92 48 110 28Z"
          fill="url(#wd-foliage-1)"
        />
        <path
          d="M110 62
             C136 88 162 128 168 168
             C128 160 92 160 52 168
             C58 128 84 88 110 62Z"
          fill="url(#wd-foliage-2)"
        />
        <path
          d="M110 108
             C142 138 178 188 184 232
             C138 220 82 220 36 232
             C42 188 78 138 110 108Z"
          fill="url(#wd-foliage-3)"
        />
        <path
          d="M110 158
             C148 190 190 238 198 275
             C142 262 78 262 22 275
             C30 238 72 190 110 158Z"
          fill="url(#wd-foliage-4)"
        />

        {/* soft highlight edge */}
        <path
          d="M110 36 C118 52 126 70 130 92"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M96 120 C88 150 78 185 72 220"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* snow caps on branches */}
        <path
          d="M74 104 C92 96 128 96 146 104"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M56 164 C88 152 132 152 164 164"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M40 228 C86 214 134 214 180 228"
          stroke="rgba(255,255,255,0.48)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M30 272 C82 258 138 258 190 272"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* star + glow */}
        <circle cx="110" cy="22" r="26" fill="url(#wd-star-glow)" />
        <path
          className="winter-decor__star"
          d="M110 6 L115.4 18.8 H129 L118 26.6 L122.2 39.5 L110 31.4 L97.8 39.5 L102 26.6 L91 18.8 H104.6 Z"
          fill="#fef3c7"
          filter="url(#wd-glow)"
        />

        {/* garland strings */}
        <path
          className="winter-decor__garland-wire"
          d="M78 96 C96 108 124 108 142 96"
          stroke="rgba(253,230,138,0.45)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          className="winter-decor__garland-wire"
          d="M58 148 C90 166 130 166 162 148"
          stroke="rgba(253,230,138,0.42)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          className="winter-decor__garland-wire"
          d="M42 208 C88 232 132 232 178 208"
          stroke="rgba(253,230,138,0.4)"
          strokeWidth="1.6"
          fill="none"
        />

        {/* garland beads */}
        <g className="winter-decor__garland" filter="url(#wd-glow)">
          <circle className="winter-decor__light winter-decor__light--b" cx="82" cy="98" r="4.4" />
          <circle className="winter-decor__light winter-decor__light--a" cx="98" cy="104" r="3.9" />
          <circle className="winter-decor__light winter-decor__light--d" cx="114" cy="106" r="4.6" />
          <circle className="winter-decor__light winter-decor__light--e" cx="130" cy="102" r="4.1" />
          <circle className="winter-decor__light winter-decor__light--c" cx="140" cy="96" r="4.2" />

          <circle className="winter-decor__light winter-decor__light--c" cx="64" cy="152" r="4.8" />
          <circle className="winter-decor__light winter-decor__light--b" cx="84" cy="160" r="4.2" />
          <circle className="winter-decor__light winter-decor__light--a" cx="106" cy="164" r="5.1" />
          <circle className="winter-decor__light winter-decor__light--e" cx="128" cy="160" r="4.4" />
          <circle className="winter-decor__light winter-decor__light--d" cx="150" cy="152" r="4.8" />

          <circle className="winter-decor__light winter-decor__light--a" cx="50" cy="214" r="5.1" />
          <circle className="winter-decor__light winter-decor__light--d" cx="74" cy="224" r="4.6" />
          <circle className="winter-decor__light winter-decor__light--b" cx="100" cy="230" r="5.2" />
          <circle className="winter-decor__light winter-decor__light--c" cx="126" cy="226" r="4.8" />
          <circle className="winter-decor__light winter-decor__light--e" cx="152" cy="218" r="4.9" />
          <circle className="winter-decor__light winter-decor__light--a" cx="170" cy="210" r="4.4" />
        </g>

        {/* ornaments / baubles */}
        <g className="winter-decor__baubles">
          <circle cx="92" cy="86" r="5.2" fill="#f43f5e" />
          <circle cx="92" cy="84.5" r="2" fill="rgba(255,255,255,0.35)" />
          <circle cx="128" cy="92" r="4.6" fill="#38bdf8" />
          <circle cx="128" cy="90.6" r="1.7" fill="rgba(255,255,255,0.35)" />
          <circle cx="78" cy="136" r="5.8" fill="#fbbf24" />
          <circle cx="78" cy="134.2" r="2.1" fill="rgba(255,255,255,0.32)" />
          <circle cx="142" cy="142" r="5.4" fill="#a78bfa" />
          <circle cx="142" cy="140.3" r="1.9" fill="rgba(255,255,255,0.32)" />
          <circle cx="96" cy="196" r="6.2" fill="#fb7185" />
          <circle cx="96" cy="194" r="2.3" fill="rgba(255,255,255,0.3)" />
          <circle cx="138" cy="188" r="5.6" fill="#34d399" />
          <circle cx="138" cy="186.2" r="2" fill="rgba(255,255,255,0.3)" />
          <circle cx="64" cy="240" r="5" fill="#fde68a" />
          <circle cx="156" cy="246" r="5.3" fill="#67e8f9" />
        </g>

        {/* extra scattered lights for color-music density */}
        <circle className="winter-decor__light winter-decor__light--b" cx="110" cy="74" r="4.1" />
        <circle className="winter-decor__light winter-decor__light--c" cx="100" cy="124" r="4.2" />
        <circle className="winter-decor__light winter-decor__light--e" cx="120" cy="134" r="3.9" />
        <circle className="winter-decor__light winter-decor__light--d" cx="88" cy="176" r="4.4" />
        <circle className="winter-decor__light winter-decor__light--a" cx="124" cy="208" r="4.2" />
        <circle className="winter-decor__light winter-decor__light--b" cx="110" cy="248" r="4.8" />
      </svg>
    </div>
  );
}
