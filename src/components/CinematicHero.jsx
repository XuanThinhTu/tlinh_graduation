import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import EditorialPhoto from './EditorialPhoto';
import { MOTION_TOKENS, useMediaQuery, usePrefersReducedMotion } from '../utils/motion';
import './CinematicHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHero({ config, preludeDone, recipientName }) {
  const sectionRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const bgLayerRef = useRef(null);
  const fgTitleRef = useRef(null);
  const transitionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px) and (hover: hover)');

  // Coordinated entrance reveal once prelude finishes
  useEffect(() => {
    if (!preludeDone || !sectionRef.current) return undefined;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('[data-hero-reveal], [data-hero-line], [data-hero-portrait]', {
          clearProps: 'all',
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.08 });

      tl.fromTo(
        '[data-hero-meta]',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: MOTION_TOKENS.eases.cinematic }
      )
        .fromTo(
          '[data-hero-portrait]',
          { clipPath: 'inset(10% 14% 10% 14%)', scale: 1.08, opacity: 0.4 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            opacity: 1,
            duration: 1.05,
            ease: MOTION_TOKENS.eases.cinematic,
          },
          '-=0.35'
        )
        .fromTo(
          '[data-hero-line]',
          { yPercent: 108, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: MOTION_TOKENS.eases.cinematic,
          },
          '-=0.68'
        )
        .fromTo(
          '[data-hero-reveal]',
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: MOTION_TOKENS.eases.cinematic,
          },
          '-=0.45'
        );

      // Gentle scroll depth & transition line
      gsap.to(portraitWrapRef.current, {
        scale: 1.06,
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(fgTitleRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.fromTo(
        transitionRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: MOTION_TOKENS.eases.cinematic,
          scrollTrigger: {
            trigger: transitionRef.current,
            start: 'top 86%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [preludeDone, reducedMotion]);

  // Subtle desktop-only pointer parallax
  useEffect(() => {
    if (!isDesktop || reducedMotion || !sectionRef.current) return undefined;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e) => {
      const rect = sectionRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-0.5, Math.min(0.5, nx));
      targetY = Math.max(-0.5, Math.min(0.5, ny));
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (portraitWrapRef.current) {
        portraitWrapRef.current.style.transform = `translate3d(${currentX * 12}px, ${currentY * 10}px, 0)`;
      }
      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform = `translate3d(${currentX * -18}px, ${currentY * -12}px, 0)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const el = sectionRef.current;
    el.addEventListener('pointermove', onMove, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('pointermove', onMove);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (portraitWrapRef.current) portraitWrapRef.current.style.transform = '';
      if (bgLayerRef.current) bgLayerRef.current.style.transform = '';
    };
  }, [isDesktop, reducedMotion]);

  return (
    <section
      id="scene-hero"
      ref={sectionRef}
      className="hero scene-dark film-grain"
      aria-label="Scene 01: The Last Chapter"
    >
      <div className="hero__vignette" aria-hidden="true" />

      <div className="hero__inner editorial-container">
        {/* Top chapter labels */}
        <div className="hero__meta-row">
          <span className="eyebrow eyebrow--accent" data-hero-meta>
            {config.graduate.classLabel}
          </span>
          <span className="eyebrow eyebrow--muted" data-hero-meta>
            {recipientName ? `GỬI ĐẾN ${recipientName.toUpperCase()}` : 'PHẦN 01 / 06'}
          </span>
          <span className="eyebrow eyebrow--muted hero__meta-right" data-hero-meta>
            LỄ TỐT NGHIỆP CỦA {config.graduate.fullName}
          </span>
        </div>

        {/* Unobstructed Editorial Headline + Wide Framed Portrait */}
        <div className="hero__stage">
          <h1 ref={fgTitleRef} className="hero__title-block">
            <span className="hero__line-mask">
              <span className="hero__headline display-serif" data-hero-line>
                {config.hero.headlineLines[0]}
              </span>
            </span>
            <span className="hero__line-mask">
              <span className="hero__headline hero__headline--italic display-serif" data-hero-line>
                {config.hero.headlineLines[1]}
              </span>
            </span>
          </h1>

          <div ref={portraitWrapRef} className="hero__portrait-wrap">
            <div ref={bgLayerRef} className="hero__portrait-frame-accent" aria-hidden="true" />
            <div className="hero__portrait-clip" data-hero-portrait>
              <EditorialPhoto
                src={config.hero.portrait.src}
                alt={config.hero.portrait.alt}
                aspectRatio={config.hero.portrait.aspectRatio}
                mood={config.hero.portrait.mood}
                plateLabel={config.hero.portrait.plateLabel}
                recommendedSpec={config.hero.portrait.recommendedSpec}
                imgClassName="hero__portrait-img"
                priority
              />
            </div>
          </div>
        </div>

        {/* Supporting copy & scroll cue */}
        <div className="hero__footer">
          <div className="hero__subcopy" data-hero-reveal>
            <p className="hero__tagline">{config.hero.supportingLine}</p>
            <p className="hero__graduate-line">
              {config.graduate.fullName} · {config.graduate.university}
            </p>
          </div>

          <a href="#scene-moment" className="hero__scroll" data-hero-reveal>
            <span>{config.hero.scrollHint}</span>
            <ArrowDown size={15} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Cinematic transition bridge into Scene 02 */}
      <div className="hero__bridge">
        <p ref={transitionRef} className="hero__bridge-text display-serif">
          {config.hero.transitionLine}
        </p>
      </div>
    </section>
  );
}
