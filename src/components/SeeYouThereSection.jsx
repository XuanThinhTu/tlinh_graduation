import { useEffect, useRef, useState } from 'react';
import {
  CalendarPlus,
  Download,
  Loader2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { downloadIcsFile } from '../utils/calendar';
import { downloadKeepsakeCardPng, KEEPSAKE_THEMES } from '../utils/ticketExport';
import './SeeYouThereSection.css';

function computeTimeLeft(isoStart) {
  const target = new Date(isoStart).getTime();
  if (Number.isNaN(target)) return null;
  const diff = target - Date.now();
  if (diff <= 0) {
    return { ended: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { ended: false, days, hours, minutes, seconds };
}

const THEME_LIST = Object.values(KEEPSAKE_THEMES);

export default function SeeYouThereSection({ config, recipientName }) {
  const { seeYouThere, ceremony, graduate } = config;
  const [keepsakeName, setKeepsakeName] = useState(recipientName || '');
  const [dedication, setDedication] = useState('');
  const [themeId, setThemeId] = useState('navy');
  const [downloading, setDownloading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => computeTimeLeft(ceremony.isoStart));
  const cardRef = useRef(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(computeTimeLeft(ceremony.isoStart));
    }, 1000);
    return () => window.clearInterval(id);
  }, [ceremony.isoStart]);

  const displayGuest = keepsakeName.trim() || 'Bạn thân mến';
  const displayNote =
    dedication.trim() || 'Cảm ơn bạn đã là một phần thanh xuân thật đẹp.';
  const activeTheme = KEEPSAKE_THEMES[themeId] || KEEPSAKE_THEMES.navy;

  // Subtle interactive 3D tilt + holographic foil glint on desktop pointer hover
  const handleCardPointerMove = (e) => {
    const el = cardRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * 7;
    const rotX = (0.5 - py) * 5;
    el.style.setProperty('--tilt-x', `${rotX.toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${rotY.toFixed(2)}deg`);
    el.style.setProperty('--foil-x', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--foil-y', `${(py * 100).toFixed(1)}%`);
  };

  const handleCardPointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  const handleDownloadPng = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadKeepsakeCardPng({
        guestName: keepsakeName,
        dedication,
        themeId,
        config,
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section
      id="scene-seeyou"
      className="seeyou scene-paper paper-texture"
      aria-label="Phần 05: Hẹn Gặp Nhau"
    >
      <div className="editorial-container">
        <header className="seeyou__header">
          <span className="eyebrow eyebrow--accent">{seeYouThere.eyebrow}</span>
          <h2 className="seeyou__heading display-serif">
            {seeYouThere.headingLines.map((line, i) => (
              <span key={i} className="seeyou__heading-line">
                {line}
              </span>
            ))}
          </h2>
          <p className="seeyou__subtitle">{seeYouThere.subtitle}</p>
        </header>

        {/* Client-side Live Countdown */}
        {timeLeft && (
          <div className="seeyou__countdown" aria-label="Đồng hồ đếm ngược đến ngày lễ tốt nghiệp">
            <span className="eyebrow eyebrow--muted">{seeYouThere.countdownLabel}</span>
            {timeLeft.ended ? (
              <p className="seeyou__countdown-ended display-serif">
                {seeYouThere.countdownEndedText}
              </p>
            ) : (
              <div className="seeyou__timer-grid">
                <div className="seeyou__timer-cell">
                  <span className="seeyou__timer-num display-serif">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="seeyou__timer-unit">Ngày</span>
                </div>
                <div className="seeyou__timer-cell">
                  <span className="seeyou__timer-num display-serif">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="seeyou__timer-unit">Giờ</span>
                </div>
                <div className="seeyou__timer-cell">
                  <span className="seeyou__timer-num display-serif">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="seeyou__timer-unit">Phút</span>
                </div>
                <div className="seeyou__timer-cell">
                  <span className="seeyou__timer-num display-serif">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="seeyou__timer-unit">Giây</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upgraded Collectible Keepsake Invitation Studio (100% Client-Side) */}
        <div className="seeyou__keepsake-block">
          <div className="seeyou__keepsake-intro">
            <span className="eyebrow eyebrow--accent">
              <Sparkles size={13} aria-hidden="true" />
              <span>QUÀ LƯU NIỆM DÀNH RIÊNG CHO BẠN</span>
            </span>
            <h3 className="seeyou__keepsake-title display-serif">{seeYouThere.keepsakeTitle}</h3>
            <p className="seeyou__keepsake-note">{seeYouThere.keepsakeNote}</p>
          </div>

          {/* Controls Bar: Name + Optional Note + 3 Luxury Themes */}
          <div className="keepsake-controls">
            <div className="keepsake-controls__inputs">
              <div className="keepsake-controls__field">
                <label htmlFor="keepsake-guest-name" className="keepsake-controls__label">
                  Tên hiển thị trên thiệp
                </label>
                <input
                  id="keepsake-guest-name"
                  type="text"
                  maxLength={44}
                  placeholder="VD: Minh Anh"
                  value={keepsakeName}
                  onChange={(e) => setKeepsakeName(e.target.value)}
                  className="seeyou__input"
                />
              </div>

              <div className="keepsake-controls__field">
                <label htmlFor="keepsake-dedication" className="keepsake-controls__label">
                  Dòng nhắn kỷ niệm (tùy chọn)
                </label>
                <input
                  id="keepsake-dedication"
                  type="text"
                  maxLength={70}
                  placeholder="Cảm ơn bạn đã là một phần thanh xuân thật đẹp."
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  className="seeyou__input"
                />
              </div>
            </div>

            <div className="keepsake-themes" role="radiogroup" aria-label="Chọn phong cách thiệp">
              {THEME_LIST.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={themeId === t.id}
                  className={`keepsake-theme-pill ${themeId === t.id ? 'is-active' : ''}`}
                  onClick={() => setThemeId(t.id)}
                >
                  <span
                    className={`keepsake-theme-swatch keepsake-theme-swatch--${t.id}`}
                    aria-hidden="true"
                  />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Collectible Luxury Keepsake Card Preview */}
          <div className="keepsake-stage">
            <div
              ref={cardRef}
              className={`keepsake-ticket keepsake-ticket--${themeId}`}
              onPointerMove={handleCardPointerMove}
              onPointerLeave={handleCardPointerLeave}
            >
              <div className="keepsake-ticket__foil" aria-hidden="true" />

              {/* Main Ticket Surface */}
              <div className="keepsake-ticket__main">
                <div className="keepsake-ticket__inner-border">
                  {/* Left: Arched Portrait Column */}
                  <div className="keepsake-ticket__portrait-col">
                    <div className="keepsake-ticket__arch">
                      <img
                        src={activeTheme.photo}
                        alt={`Chân dung tốt nghiệp ${graduate.fullName}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="keepsake-ticket__grad-meta">
                      <span className="keepsake-ticket__micro">TÂN CỬ NHÂN · HCMIU</span>
                      <strong className="keepsake-ticket__grad-name display-serif">
                        {graduate.fullName}
                      </strong>
                      <span className="keepsake-ticket__grad-class">{graduate.classLabel}</span>
                    </div>
                  </div>

                  {/* Center: Personalized Invitation Details */}
                  <div className="keepsake-ticket__info-col">
                    <span className="keepsake-ticket__kicker">
                      THIỆP MỜI KỶ NIỆM LỄ TỐT NGHIỆP
                    </span>
                    <p className="keepsake-ticket__headline display-serif">
                      HẸN GẶP BẠN NHÉ!
                    </p>

                    <hr className="keepsake-ticket__rule" />

                    <div className="keepsake-ticket__guest-box">
                      <span className="keepsake-ticket__micro">THÂN GỬI</span>
                      <p className="keepsake-ticket__guest-name display-serif">{displayGuest}</p>
                      <p className="keepsake-ticket__dedication">“{displayNote}”</p>
                    </div>

                    <dl className="keepsake-ticket__details">
                      <div>
                        <dt>Thời gian</dt>
                        <dd>
                          {ceremony.displayDateFull} · {ceremony.startTime}
                        </dd>
                      </div>
                      <div>
                        <dt>Địa điểm</dt>
                        <dd>
                          {ceremony.venueName}
                          <span>{ceremony.fullAddress}</span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Right Stub with Notches, Refined Date/Time & Barcode */}
              <div className="keepsake-ticket__stub">
                <span className="keepsake-ticket__stub-kicker">THIỆP KỶ NIỆM</span>

                <div className="keepsake-ticket__stub-date">
                  <span className="display-serif">{ceremony.displayDateDay}</span>
                  <small>{ceremony.displayDateMonthYear}</small>
                  <hr className="keepsake-ticket__stub-rule" />
                  <strong className="keepsake-ticket__stub-weekday">
                    {ceremony.displayWeekday}
                  </strong>
                  <em>{ceremony.startTime}</em>
                </div>

                <div className="keepsake-ticket__barcode" aria-hidden="true">
                  <span className="keepsake-ticket__bars" />
                  <small>29 · 11 · 2026 · HCMIU</small>
                </div>
              </div>
            </div>
          </div>

          <div className="seeyou__keepsake-actions">
            <button
              type="button"
              className="btn-editorial btn-editorial--primary"
              onClick={handleDownloadPng}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <Loader2 size={15} className="seeyou__spinner" aria-hidden="true" />
                  <span>Đang tạo ảnh thiệp HD...</span>
                </>
              ) : (
                <>
                  <Download size={15} strokeWidth={1.7} aria-hidden="true" />
                  <span>Tải Thiệp Kỷ Niệm (PNG HD)</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn-editorial btn-editorial--outline-dark"
              onClick={() => downloadIcsFile(config)}
            >
              <CalendarPlus size={15} strokeWidth={1.7} aria-hidden="true" />
              <span>Thêm vào Lịch</span>
            </button>

            <a
              href={ceremony.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial btn-editorial--outline-dark"
            >
              <MapPin size={15} strokeWidth={1.7} aria-hidden="true" />
              <span>Xem Chỉ Đường</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
