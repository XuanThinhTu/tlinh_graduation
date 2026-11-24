import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MemoryGallery from './MemoryGallery';
import { MOTION_TOKENS, usePrefersReducedMotion } from '../utils/motion';
import './StoryTimeline.css';

gsap.registerPlugin(ScrollTrigger);

export default function StoryTimeline({ config }) {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-story-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: MOTION_TOKENS.eases.cinematic,
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const { story, project, gallery } = config;

  return (
    <section
      id="scene-story"
      ref={sectionRef}
      className="story scene-ivory paper-texture"
      aria-label="Phần 04: Kỷ Yếu Hành Trình"
    >
      <div className="story__filmstrip" aria-hidden="true" />

      <div className="editorial-container">
        {/* Yearbook Header */}
        <header className="story__header" data-story-reveal>
          <div className="story__header-meta">
            <span className="eyebrow eyebrow--muted">{story.eyebrow}</span>
            <span className="story__est-badge">TỪ NĂM {project.establishedYear}</span>
          </div>

          <h2 className="story__heading display-serif">
            {story.headingLines.map((line, i) => (
              <span key={i} className="story__heading-line">
                {line}
              </span>
            ))}
          </h2>

          <p className="story__subtitle">{story.subtitle}</p>
        </header>

        {/* Four Refined Text-Only Editorial Chapters */}
        <div className="story__chapters">
          {story.chapters.map((chapter) => (
            <article key={chapter.id} className="chapter-entry" data-story-reveal>
              <div className="chapter-entry__left">
                <span className="chapter-entry__index display-serif" aria-hidden="true">
                  {chapter.number}
                </span>
                <div className="chapter-entry__head">
                  <span className="eyebrow eyebrow--accent">
                    CHƯƠNG {chapter.number} · {chapter.period}
                  </span>
                  <h3 className="chapter-entry__title display-serif">{chapter.title}</h3>
                </div>
              </div>

              <div className="chapter-entry__right">
                <p className="chapter-entry__desc">{chapter.description}</p>
                {chapter.quote && (
                  <blockquote className="chapter-entry__quote">{chapter.quote}</blockquote>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Dedicated Archive: All 7 Photos in Clean Polaroid Frames */}
        <MemoryGallery gallery={gallery} />
      </div>
    </section>
  );
}
