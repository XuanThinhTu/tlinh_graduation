import { useEffect, useState } from 'react';
import {
  ArrowLeftRight,
  Bus,
  Car,
  Footprints,
  MapPin,
  QrCode,
  TrainFront,
} from 'lucide-react';
import { usePrefersReducedMotion } from '../utils/motion';
import './TravelGuide.css';

function StepIcon({ mode }) {
  switch (mode) {
    case 'metro':
      return <TrainFront size={18} strokeWidth={1.75} aria-hidden="true" />;
    case 'bus':
      return <Bus size={18} strokeWidth={1.75} aria-hidden="true" />;
    case 'walk':
      return <Footprints size={18} strokeWidth={1.75} aria-hidden="true" />;
    default:
      return <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />;
  }
}

export default function TravelGuide({ travelGuide, mapsUrl }) {
  const [direction, setDirection] = useState('outbound'); // 'outbound' | 'return'
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const steps =
    direction === 'outbound'
      ? travelGuide.outboundSteps || []
      : travelGuide.returnSteps || [];

  // Gentle auto-advancing route beacon so guests can visually trace the journey
  useEffect(() => {
    setActiveStep(0);
    if (reducedMotion || steps.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [direction, steps.length, reducedMotion]);

  const progressPct =
    steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0;

  return (
    <div className="travel-guide" aria-label="Hướng dẫn di chuyển">
      <div className="travel-guide__header">
        <span className="eyebrow eyebrow--accent">{travelGuide.eyebrow}</span>
        <h3 className="travel-guide__title display-serif">{travelGuide.title}</h3>
      </div>

      {/* Parking Info Strip */}
      <div className="travel-guide__parking">
        <div className="travel-guide__parking-icon" aria-hidden="true">
          <Car size={20} strokeWidth={1.7} />
        </div>
        <div className="travel-guide__parking-body">
          <span className="travel-guide__parking-label">{travelGuide.parkingLabel}</span>
          <p className="travel-guide__parking-text">{travelGuide.parkingText}</p>
        </div>
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="travel-guide__parking-link"
          >
            <MapPin size={14} aria-hidden="true" />
            <span>Mở bản đồ</span>
          </a>
        )}
      </div>

      {/* Interactive Metro & Bus 166 Visual Route Board */}
      <div className="travel-guide__metro-board">
        <div className="travel-guide__metro-top">
          <div className="travel-guide__metro-heading">
            <span className="travel-guide__metro-badge">
              <TrainFront size={14} aria-hidden="true" />
              <span>TUYẾN METRO + BUS 166</span>
            </span>
            <h4 className="travel-guide__metro-title display-serif">
              {travelGuide.metroTitle}
            </h4>
          </div>

          {/* Direction Switcher: Chiều đi / Chiều về */}
          <div
            className="travel-guide__tabs"
            role="tablist"
            aria-label="Chọn chiều di chuyển bằng Metro"
          >
            <button
              type="button"
              role="tab"
              aria-selected={direction === 'outbound'}
              className={`travel-guide__tab ${direction === 'outbound' ? 'is-active' : ''}`}
              onClick={() => setDirection('outbound')}
            >
              <span>Chiều đi</span>
            </button>
            <span className="travel-guide__tab-sep" aria-hidden="true">
              <ArrowLeftRight size={13} />
            </span>
            <button
              type="button"
              role="tab"
              aria-selected={direction === 'return'}
              className={`travel-guide__tab ${direction === 'return' ? 'is-active' : ''}`}
              onClick={() => setDirection('return')}
            >
              <span>Chiều về</span>
            </button>
          </div>
        </div>

        {/* Animated Transit Track + Interactive Station Nodes */}
        <div
          className={`transit-route transit-route--cols-${steps.length}`}
          style={{ '--route-progress': `${progressPct}%` }}
          role="tabpanel"
        >
          {/* Desktop Horizontal Animated Track Line */}
          <div className="transit-route__track-h" aria-hidden="true">
            <span className="transit-route__track-fill" />
            {!reducedMotion && <span className="transit-route__beacon" />}
          </div>

          <ol className="transit-route__list">
            {steps.map((step, index) => {
              const isCurrent = index === activeStep;
              const isPassed = index <= activeStep;

              return (
                <li
                  key={step.id}
                  className={`transit-step ${isCurrent ? 'is-current' : ''} ${
                    isPassed ? 'is-passed' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="transit-step__card"
                    onClick={() => setActiveStep(index)}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    <span className="transit-step__node-wrap">
                      <span className="transit-step__node">
                        <StepIcon mode={step.mode} />
                      </span>
                      <span className="transit-step__num">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </span>

                    <span className="transit-step__content">
                      <span className="transit-step__badge">{step.badge}</span>
                      <strong className="transit-step__title display-serif">
                        {step.title}
                      </strong>
                      <span className="transit-step__detail">{step.detail}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Free Bus 166 QR CCCD/VNeID Callout */}
        <div className="travel-guide__tip" role="note">
          <div className="travel-guide__tip-icon" aria-hidden="true">
            <QrCode size={22} strokeWidth={1.7} />
          </div>
          <div className="travel-guide__tip-body">
            <span className="travel-guide__tip-kicker">
              *LƯU Ý QUAN TRỌNG · MIỄN PHÍ VÉ BUS 166
            </span>
            <p className="travel-guide__tip-text">{travelGuide.freeBusNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
