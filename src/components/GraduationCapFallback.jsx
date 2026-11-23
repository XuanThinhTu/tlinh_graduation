export default function GraduationCapFallback({ isTossing, reducedMotion }) {
  return (
    <div
      className={`cap-fallback ${isTossing && !reducedMotion ? 'is-tossing' : ''}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 360 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cap-fallback__svg"
      >
        <defs>
          <linearGradient id="capBoardGrad" x1="40" y1="50" x2="320" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#262C42" />
            <stop offset="55%" stopColor="#161926" />
            <stop offset="100%" stopColor="#0F1016" />
          </linearGradient>
          <linearGradient id="capSilverGrad" x1="170" y1="80" x2="290" y2="195" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFDFC" />
            <stop offset="50%" stopColor="#C8CFDA" />
            <stop offset="100%" stopColor="#8B96AE" />
          </linearGradient>
        </defs>

        {/* Soft studio shadow */}
        <ellipse cx="180" cy="212" rx="92" ry="14" fill="#0F1016" fillOpacity="0.52" />

        {/* Skullcap crown */}
        <path
          d="M112 114V162C112 178 143 190 180 190C217 190 248 178 248 162V114H112Z"
          fill="#1D2232"
          stroke="#C8CFDA"
          strokeOpacity="0.28"
          strokeWidth="1.2"
        />
        {/* Academic Navy satin trim band */}
        <path
          d="M112 158C132 172 228 172 248 158"
          stroke="#2A4578"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Mortarboard top */}
        <polygon
          points="180,38 326,96 180,148 34,96"
          fill="url(#capBoardGrad)"
          stroke="#C8CFDA"
          strokeOpacity="0.44"
          strokeWidth="1.4"
        />

        {/* Center button */}
        <ellipse cx="180" cy="92" rx="9" ry="5" fill="url(#capSilverGrad)" />

        {/* Silver silk tassel cord & fringe */}
        <path
          d="M180 92C225 96 268 106 286 122C294 130 296 146 296 164"
          stroke="url(#capSilverGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="296" cy="166" r="5" fill="url(#capSilverGrad)" />
        <path d="M291 170L285 204H307L301 170H291Z" fill="url(#capSilverGrad)" />
      </svg>
    </div>
  );
}
