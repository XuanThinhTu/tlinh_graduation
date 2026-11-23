import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GraduationCapFallback from './GraduationCapFallback';
import { MOTION_TOKENS, usePrefersReducedMotion } from '../utils/motion';
import './GraduationMoment.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scene 03 — The Moment (Graduation Climax)
 *
 * Provides the open Midnight Navy cinematic stage where the persistent
 * traveling 3D Graduation Cap performs its 7-beat arrival, hero 3/4 pose,
 * anticipation, parabolic toss, and restrained silver/blush celebration burst.
 *
 * When 3D WebGL is unavailable or reduced-motion is requested, renders the
 * cohesive art-directed SVG GraduationCapFallback inside the exact same pocket.
 */
export default function GraduationMoment({
  config,
  persistent3DActive,
  onTriggerToss,
}) {
  const sectionRef = useRef(null);
  const [isFallbackTossing, setIsFallbackTossing] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const handleStageTap = () => {
    if (reducedMotion) return;
    if (persistent3DActive) {
      onTriggerToss?.();
    } else {
      setIsFallbackTossing(true);
      window.setTimeout(() => setIsFallbackTossing(false), 1400);
    }
  };

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-moment-prelude]',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: MOTION_TOKENS.eases.cinematic,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '[data-moment-climax]',
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: MOTION_TOKENS.eases.cinematic,
          scrollTrigger: {
            trigger: '[data-moment-stage]',
            start: 'top 58%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const { moment } = config;

  return (
    <section
      id="scene-moment"
      ref={sectionRef}
      className="moment scene-dark film-grain"
      aria-label="Phần 03: Khoảnh Khắc Tỏa Sáng"
    >
      <div className="moment__glow" aria-hidden="true" />

      <div className="moment__inner editorial-container">
        <div className="moment__intro">
          <span className="eyebrow eyebrow--accent" data-moment-prelude>
            {moment.eyebrow}
          </span>
          <p className="moment__prelude display-serif" data-moment-prelude>
            {moment.preludeLines.map((line, i) => (
              <span key={i} className="moment__prelude-line">
                {line}
              </span>
            ))}
          </p>
        </div>

        {/* Dedicated Center Stage Pocket for the Persistent 3D Cap (or SVG Fallback) */}
        <div className="moment__stage" data-moment-stage>
          <button
            type="button"
            className="moment__cap-trigger"
            onClick={handleStageTap}
            aria-label="Mũ tốt nghiệp tương tác — nhấn để tung mũ ăn mừng"
          >
            {!persistent3DActive && (
              <GraduationCapFallback
                isTossing={isFallbackTossing}
                reducedMotion={reducedMotion}
              />
            )}
          </button>

          {!reducedMotion && (
            <span className="moment__hint eyebrow eyebrow--muted">{moment.tossHint}</span>
          )}
        </div>

        <div className="moment__climax">
          <h2 className="moment__headline display-serif" data-moment-climax>
            {moment.headline}
          </h2>
          <p className="moment__subline" data-moment-climax>
            {moment.subline}
          </p>
        </div>
      </div>
    </section>
  );
}
