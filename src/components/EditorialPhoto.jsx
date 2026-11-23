import './EditorialPhoto.css';

export default function EditorialPhoto({
  src,
  alt = '',
  aspectRatio = '4 / 5',
  mood = 'hero-noir',
  plateLabel = '',
  recommendedSpec = '',
  priority = false,
  className = '',
  imgClassName = '',
}) {
  return (
    <div
      className={`editorial-photo editorial-photo--${mood} ${className}`}
      style={{ aspectRatio }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          className={`editorial-photo__img ${imgClassName}`}
        />
      ) : (
        <div className="editorial-photo__placeholder" role="img" aria-label={alt}>
          <div className="editorial-photo__light" aria-hidden="true" />
          <div className="editorial-photo__frame" aria-hidden="true" />
          <div className="editorial-photo__silhouette" aria-hidden="true">
            <svg viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              {mood === 'hero-noir' ? (
                <>
                  {/* Editorial portrait studio silhouette with deep navy graduation stole */}
                  <ellipse cx="120" cy="96" rx="42" ry="50" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1" />
                  <path d="M52 268C58 202 82 172 120 172C158 172 182 202 188 268" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1" />
                  {/* Academic stole ribbon */}
                  <path d="M92 174L84 268M148 174L156 268" stroke="#2A4578" strokeOpacity="0.72" strokeWidth="10" strokeLinecap="round" />
                  {/* Graduation cap outline */}
                  <path d="M68 68L120 44L172 68L120 92L68 68Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
                  <line x1="172" y1="68" x2="172" y2="108" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
                  <circle cx="172" cy="112" r="3" fill="currentColor" fillOpacity="0.55" />
                </>
              ) : (
                <>
                  {/* Editorial architectural / photographic composition lines */}
                  <rect x="34" y="34" width="172" height="212" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
                  <line x1="34" y1="186" x2="206" y2="186" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
                  <circle cx="120" cy="118" r="38" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
                  <path d="M56 220L98 164L132 198L162 152L188 220" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
                </>
              )}
            </svg>
          </div>

          <div className="editorial-photo__meta">
            {plateLabel && <span className="editorial-photo__plate">{plateLabel}</span>}
            {recommendedSpec && (
              <span className="editorial-photo__spec">{recommendedSpec}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
