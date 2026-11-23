import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../utils/motion';
import './InvitationPrelude.css';

export default function InvitationPrelude({ config, recipientName, onComplete }) {
  const [stage, setStage] = useState('idle');
  const rootRef = useRef(null);
  const sealRef = useRef(null);
  const flapRef = useRef(null);
  const cardRef = useRef(null);
  const envelopeWrapRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onComplete]);

  const handleOpen = () => {
    if (stage !== 'idle') return;
    setStage('opening');

    if (reducedMotion || !rootRef.current) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(sealRef.current, {
      scale: 0.88,
      duration: 0.14,
      ease: 'power2.out',
    })
      .to(sealRef.current, {
        scale: 1.18,
        opacity: 0,
        duration: 0.28,
        ease: 'power2.in',
      })
      .to(
        flapRef.current,
        {
          rotateX: -178,
          duration: 0.54,
          ease: 'power3.inOut',
        },
        '-=0.1'
      )
      .to(
        cardRef.current,
        {
          y: -116,
          duration: 0.56,
          ease: 'back.out(1.18)',
        },
        '-=0.22'
      )
      .to(
        cardRef.current,
        {
          scale: 1.26,
          opacity: 0,
          duration: 0.52,
          ease: 'power3.inOut',
        },
        '+=0.08'
      )
      .to(
        envelopeWrapRef.current,
        {
          y: 38,
          opacity: 0,
          duration: 0.44,
          ease: 'power2.in',
        },
        '<'
      )
      .to(
        rootRef.current,
        {
          opacity: 0,
          duration: 0.42,
          ease: 'power2.out',
        },
        '-=0.26'
      );
  };

  const recipientCopy = recipientName
    ? `${config.prelude.personalizedPrefix} ${recipientName}`
    : config.prelude.genericRecipientLine;

  return (
    <div
      ref={rootRef}
      className="prelude film-grain"
      role="dialog"
      aria-modal="true"
      aria-label="Mở thiệp mời lễ tốt nghiệp"
    >
      <div className="prelude__spotlight" aria-hidden="true" />

      <button
        type="button"
        className="prelude__skip"
        onClick={onComplete}
        disabled={stage === 'opening'}
      >
        {config.prelude.skipLabel}
      </button>

      <div className="prelude__center">
        <p className="prelude__eyebrow eyebrow eyebrow--accent">
          {config.prelude.eyebrow}
        </p>

        <p className="prelude__recipient">{recipientCopy}</p>

        <div ref={envelopeWrapRef} className="prelude__envelope-stage">
          <button
            type="button"
            className={`envelope ${stage === 'idle' ? 'envelope--breathing' : ''}`}
            onClick={handleOpen}
            disabled={stage === 'opening'}
            aria-label={`${config.prelude.ctaLabel}. ${recipientCopy}`}
          >
            <span className="envelope__back" aria-hidden="true" />
            <span className="envelope__liner" aria-hidden="true" />

            <span ref={cardRef} className="envelope__card" aria-hidden="true">
              <span className="envelope__card-border">
                <span className="envelope__card-kicker">{config.graduate.classLabel}</span>
                <span className="envelope__card-title">{config.project.title}</span>
                <span className="envelope__card-sub">{config.graduate.fullName}</span>
              </span>
            </span>

            <span className="envelope__pocket-left" aria-hidden="true" />
            <span className="envelope__pocket-right" aria-hidden="true" />
            <span className="envelope__pocket-bottom" aria-hidden="true" />
            <span ref={flapRef} className="envelope__flap" aria-hidden="true" />

            {/* Embossed Academic Navy seal with subtle graduation-cap emblem */}
            <span ref={sealRef} className="envelope__seal" aria-hidden="true">
              <span className="envelope__seal-ring">
                <svg
                  viewBox="0 0 36 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="envelope__seal-cap"
                >
                  <path
                    d="M18 4L32 10.5L18 17L4 10.5L18 4Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 13.6V19.6C10 21.6 13.6 23.2 18 23.2C22.4 23.2 26 21.6 26 19.6V13.6"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <path d="M30 11.4V18.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="30" cy="19.6" r="1.3" fill="currentColor" />
                </svg>
              </span>
            </span>
          </button>
        </div>

        <p className="prelude__prompt">
          <span className="prelude__prompt-line" aria-hidden="true" />
          <span>{config.prelude.ctaLabel}</span>
          <span className="prelude__prompt-line" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
