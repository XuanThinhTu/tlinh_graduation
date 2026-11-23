import { ArrowUp } from 'lucide-react';
import EditorialPhoto from './EditorialPhoto';
import './ClosingEpilogue.css';

export default function ClosingEpilogue({ config, onReplayPrelude }) {
  const { epilogue, graduate, ceremony, project } = config;
  const yearStr = String(project.graduationYear || '2026');
  const yearLeft = yearStr.slice(0, 2);
  const yearRight = yearStr.slice(2);

  return (
    <footer
      id="scene-epilogue"
      className="epilogue scene-dark film-grain"
      aria-label="Phần 06: Lời Kết"
    >
      <div className="editorial-container epilogue__inner">
        <span className="eyebrow eyebrow--accent">{epilogue.eyebrow}</span>

        {/* Monumental typographic lockup creating a serene resting pocket for the persistent 3D cap */}
        <div className="epilogue__lockup" aria-label={`Niên khóa ${yearStr}`}>
          <span className="epilogue__lockup-num display-serif">{yearLeft}</span>
          <span id="epilogue-cap-dock" className="epilogue__lockup-pocket" aria-hidden="true" />
          <span className="epilogue__lockup-num display-serif">{yearRight}</span>
        </div>

        <div className="epilogue__photo-wrap">
          <EditorialPhoto
            src={epilogue.portrait.src}
            alt={epilogue.portrait.alt}
            aspectRatio={epilogue.portrait.aspectRatio}
            mood={epilogue.portrait.mood}
            plateLabel={epilogue.portrait.plateLabel}
            recommendedSpec={epilogue.portrait.recommendedSpec}
          />
        </div>

        <h2 className="epilogue__headline display-serif">
          {epilogue.headlineLines.map((line, i) => (
            <span key={i} className="epilogue__headline-line">
              {line}
            </span>
          ))}
        </h2>

        <p className="epilogue__supporting">{epilogue.supportingCopy}</p>

        {/* Embossed Monogram & Signature */}
        <div className="epilogue__signoff">
          <div className="epilogue__monogram" aria-hidden="true">
            <span>{project.monogram}</span>
          </div>
          <p className="epilogue__signature display-serif">{graduate.signatureText}</p>
          <p className="epilogue__credit">
            {graduate.fullName} — {graduate.classLabel}
          </p>
        </div>

        <hr className="editorial-rule" />

        {/* Useful Minimal Footer Navigation */}
        <div className="epilogue__footer-bar">
          <nav className="epilogue__nav" aria-label="Điều hướng cuối trang">
            <a href="#scene-invitation">Chi Tiết Buổi Lễ</a>
            <a href="#scene-seeyou">Hẹn Gặp Nhau</a>
            <a href={ceremony.mapsUrl} target="_blank" rel="noreferrer">
              Chỉ Đường
            </a>
            <button type="button" onClick={onReplayPrelude} className="epilogue__nav-btn">
              Mở Lại Phong Bì
            </button>
          </nav>

          <a href="#scene-hero" className="epilogue__top-link">
            <span>Lên Đầu Trang</span>
            <ArrowUp size={14} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
