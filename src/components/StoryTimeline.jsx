import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EditorialPhoto from './EditorialPhoto';
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
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.78,
            ease: MOTION_TOKENS.eases.cinematic,
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray('[data-story-photo]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(8% 0% 8% 0%)', opacity: 0.6 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.95,
            ease: MOTION_TOKENS.eases.cinematic,
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
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
      aria-label="Scene 02: Four Years, A Thousand Memories"
    >
      {/* Subtle film-strip top border motif */}
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

        {/* Four Alternating Editorial Chapters */}
        <div className="story__chapters">
          {story.chapters.map((chapter) => {
            if (chapter.layout === 'full-landscape') {
              return (
                <article key={chapter.id} className="chapter chapter--landscape">
                  <div className="chapter__photo-stage" data-story-photo>
                    <EditorialPhoto
                      src={chapter.image.src}
                      alt={chapter.image.alt}
                      aspectRatio={chapter.image.aspectRatio}
                      mood={chapter.image.mood}
                      plateLabel={chapter.image.plateLabel}
                      recommendedSpec={chapter.image.recommendedSpec}
                    />
                  </div>
                  <div className="chapter__landscape-overlay" data-story-reveal>
                    <span className="eyebrow eyebrow--accent">
                      CHƯƠNG {chapter.number} · {chapter.period}
                    </span>
                    <h3 className="chapter__title display-serif">{chapter.title}</h3>
                    <p className="chapter__desc">{chapter.description}</p>
                    {chapter.quote && <blockquote className="chapter__quote">{chapter.quote}</blockquote>}
                  </div>
                </article>
              );
            }

            if (chapter.layout === 'asymmetric-split') {
              return (
                <article key={chapter.id} className="chapter chapter--asymmetric">
                  <div className="chapter__asymmetric-copy" data-story-reveal>
                    <span className="chapter__index-large display-serif" aria-hidden="true">
                      {chapter.number}
                    </span>
                    <span className="eyebrow eyebrow--muted">{chapter.period}</span>
                    <h3 className="chapter__title display-serif">{chapter.title}</h3>
                    <p className="chapter__desc">{chapter.description}</p>
                    {chapter.annotation && (
                      <p className="chapter__annotation">{chapter.annotation}</p>
                    )}
                  </div>
                  <div className="chapter__asymmetric-media" data-story-photo>
                    <EditorialPhoto
                      src={chapter.image.src}
                      alt={chapter.image.alt}
                      aspectRatio={chapter.image.aspectRatio}
                      mood={chapter.image.mood}
                      plateLabel={chapter.image.plateLabel}
                      recommendedSpec={chapter.image.recommendedSpec}
                    />
                  </div>
                </article>
              );
            }

            if (chapter.layout === 'polaroid-wall') {
              return (
                <article key={chapter.id} className="chapter chapter--wall">
                  <div className="chapter__wall-header" data-story-reveal>
                    <span className="eyebrow eyebrow--muted">
                      CHƯƠNG {chapter.number} · {chapter.period}
                    </span>
                    <h3 className="chapter__title display-serif">{chapter.title}</h3>
                    <p className="chapter__desc">{chapter.description}</p>
                  </div>

                  <div className="chapter__wall-grid">
                    <div className="chapter__wall-main" data-story-photo>
                      <EditorialPhoto
                        src={chapter.image.src}
                        alt={chapter.image.alt}
                        aspectRatio={chapter.image.aspectRatio}
                        mood={chapter.image.mood}
                        plateLabel={chapter.image.plateLabel}
                        recommendedSpec={chapter.image.recommendedSpec}
                      />
                    </div>

                    <div className="chapter__wall-polaroids">
                      {(chapter.accentImages || []).map((item, idx) => (
                        <figure
                          key={idx}
                          className={`wall-polaroid wall-polaroid--${idx + 1}`}
                          data-story-reveal
                        >
                          <EditorialPhoto
                            src={item.src}
                            alt={item.alt}
                            aspectRatio="4 / 5"
                            mood={item.mood}
                            recommendedSpec={item.recommendedSpec}
                          />
                          <figcaption className="wall-polaroid__cap">
                            <span>{item.caption}</span>
                            <time className="wall-polaroid__date">{item.date}</time>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                </article>
              );
            }

            // Chapter 04 — Dramatic Spread
            return (
              <article key={chapter.id} className="chapter chapter--spread">
                <div className="chapter__spread-top" data-story-reveal>
                  <span className="eyebrow eyebrow--muted">
                    CHƯƠNG {chapter.number} · {chapter.period}
                  </span>
                  <h3 className="chapter__title chapter__title--spread display-serif">
                    {chapter.title}
                  </h3>
                </div>
                <div className="chapter__spread-media" data-story-photo>
                  <EditorialPhoto
                    src={chapter.image.src}
                    alt={chapter.image.alt}
                    aspectRatio={chapter.image.aspectRatio}
                    mood={chapter.image.mood}
                    plateLabel={chapter.image.plateLabel}
                    recommendedSpec={chapter.image.recommendedSpec}
                  />
                </div>
                <div className="chapter__spread-footer" data-story-reveal>
                  <p className="chapter__desc">{chapter.description}</p>
                  {chapter.quote && <blockquote className="chapter__quote">{chapter.quote}</blockquote>}
                </div>
              </article>
            );
          })}
        </div>

        {/* Dedicated Interactive Polaroid Gallery */}
        <MemoryGallery gallery={gallery} />
      </div>
    </section>
  );
}
