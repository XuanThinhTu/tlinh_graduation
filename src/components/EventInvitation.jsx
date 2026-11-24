import { useState } from 'react';
import { CalendarPlus, Check, ExternalLink, MapPin, Share2 } from 'lucide-react';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';
import './EventInvitation.css';

export default function EventInvitation({ config, recipientName }) {
  const [shareFeedback, setShareFeedback] = useState('');
  const { ceremony, graduate } = config;

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: `${config.project.title} — Lễ Tốt Nghiệp của ${graduate.fullName}`,
      text: `Trân trọng kính mời bạn đến chung vui trong lễ tốt nghiệp của ${graduate.fullName}.`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareFeedback('Đã chia sẻ');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareFeedback('Đã sao chép liên kết');
      } else {
        setShareFeedback('Hãy sao chép đường dẫn trên trình duyệt');
      }
    } catch {
      // Người dùng hủy hộp thoại chia sẻ
      return;
    }

    window.setTimeout(() => setShareFeedback(''), 2600);
  };

  return (
    <section
      id="scene-invitation"
      className="invitation scene-ivory paper-texture"
      aria-label="Scene 04: You Are Invited"
    >
      <div className="editorial-container">
        <div className="invitation__card">
          <div className="invitation__inner-frame">
            {/* Left column: Date identity & formal invitation statement */}
            <div className="invitation__lead">
              <span className="eyebrow eyebrow--accent">{ceremony.eyebrow}</span>

              <div className="invitation__date-emblem" aria-label={`Ceremony date: ${ceremony.displayDateFull}`}>
                <span className="invitation__day display-serif">{ceremony.displayDateDay}</span>
                <div className="invitation__date-stack">
                  <span className="invitation__month">{ceremony.displayDateMonthYear}</span>
                  <span className="invitation__weekday">{ceremony.displayWeekday}</span>
                </div>
              </div>

              <div className="invitation__statement">
                <p className="invitation__kicker">
                  {recipientName ? `THÂN GỬI ${recipientName.toUpperCase()}, ` : ''}
                  {ceremony.leadLine}
                </p>
                <p className="invitation__subkicker">{ceremony.subLeadLine}</p>
                <h2 className="invitation__name display-serif">{graduate.fullName}</h2>
                <p className="invitation__uni">{graduate.university}</p>
                <p className="invitation__class">{graduate.classLabel}</p>
              </div>
            </div>

            {/* Right column: Ceremony logistics & functional actions */}
            <div className="invitation__details">
              <dl className="invitation__dl">
                <div className="invitation__row">
                  <dt>Ngày tổ chức</dt>
                  <dd>{ceremony.displayDateFull}</dd>
                </div>
                <div className="invitation__row">
                  <dt>Thời gian</dt>
                  <dd>{ceremony.startTime}</dd>
                </div>
                <div className="invitation__row">
                  <dt>Địa điểm</dt>
                  <dd>
                    <strong>{ceremony.venueName}</strong>
                    <span className="invitation__address">{ceremony.fullAddress}</span>
                  </dd>
                </div>
                <div className="invitation__row">
                  <dt>Liên hệ</dt>
                  <dd>{ceremony.contactText}</dd>
                </div>
                <div className="invitation__row">
                  <dt>Đi bằng Metro</dt>
                  <dd>{ceremony.metroGuide}</dd>
                </div>
              </dl>

              <div className="invitation__actions">
                <button
                  type="button"
                  className="btn-editorial btn-editorial--primary"
                  onClick={() => downloadIcsFile(config)}
                >
                  <CalendarPlus size={16} strokeWidth={1.7} aria-hidden="true" />
                  <span>Thêm vào lịch (.ics)</span>
                </button>

                <a
                  href={ceremony.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-editorial btn-editorial--outline-dark"
                >
                  <MapPin size={16} strokeWidth={1.7} aria-hidden="true" />
                  <span>Xem chỉ đường</span>
                </a>
              </div>

              <div className="invitation__secondary-actions">
                <a
                  href={getGoogleCalendarUrl(config)}
                  target="_blank"
                  rel="noreferrer"
                  className="invitation__text-action"
                >
                  <span>Mở bằng Google Calendar</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  className="invitation__text-action"
                  onClick={handleShare}
                >
                  {shareFeedback ? (
                    <>
                      <Check size={13} aria-hidden="true" />
                      <span>{shareFeedback}</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={13} aria-hidden="true" />
                      <span>Chia sẻ thiệp mời</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
