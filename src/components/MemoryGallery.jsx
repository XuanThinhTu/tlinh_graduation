import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import EditorialPhoto from './EditorialPhoto';
import { useMediaQuery } from '../utils/motion';
import './MemoryGallery.css';

export default function MemoryGallery({ gallery }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [offsets, setOffsets] = useState({});
  const dragStateRef = useRef({
    id: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });
  const closeBtnRef = useRef(null);
  const isDesktopPointer = useMediaQuery('(min-width: 1024px) and (hover: hover)');

  const items = gallery.items || [];
  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

  // Lightbox keyboard controls
  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedIndex, items.length]);

  const handlePointerDown = (e, id) => {
    if (!isDesktopPointer || e.button !== 0) return;
    const current = offsets[id] || { x: 0, y: 0 };
    dragStateRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      originX: current.x,
      originY: current.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e, id) => {
    const drag = dragStateRef.current;
    if (!isDesktopPointer || drag.id !== id) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      drag.moved = true;
    }
    if (!drag.moved) return;

    // Clamped offset so cards stay neatly within the table
    const nextX = Math.max(-72, Math.min(72, drag.originX + dx));
    const nextY = Math.max(-48, Math.min(48, drag.originY + dy));
    setOffsets((prev) => ({ ...prev, [id]: { x: nextX, y: nextY } }));
  };

  const handlePointerUp = (id, idx) => {
    const drag = dragStateRef.current;
    if (drag.id === id) {
      const wasDragged = drag.moved;
      dragStateRef.current = { id: null, startX: 0, startY: 0, originX: 0, originY: 0, moved: false };
      if (!wasDragged) {
        setSelectedIndex(idx);
      }
    }
  };

  const handleCardClick = (idx) => {
    if (!isDesktopPointer) {
      setSelectedIndex(idx);
    }
  };

  return (
    <div className="memory-gallery" aria-label="Interactive Polaroid gallery">
      <div className="memory-gallery__header">
        <span className="eyebrow eyebrow--muted">{gallery.eyebrow}</span>
        <h3 className="memory-gallery__title display-serif">{gallery.title}</h3>
        <p className="memory-gallery__subtitle">{gallery.subtitle}</p>
      </div>

      <div className="memory-gallery__rail" role="list">
        {items.map((item, idx) => {
          const offset = offsets[item.id] || { x: 0, y: 0 };
          return (
            <div key={item.id} role="listitem" className="memory-gallery__slot">
              <button
                type="button"
                className="polaroid-card"
                style={{
                  '--card-rot': `${item.rotation || 0}deg`,
                  '--card-tx': `${offset.x}px`,
                  '--card-ty': `${offset.y}px`,
                }}
                onPointerDown={(e) => handlePointerDown(e, item.id)}
                onPointerMove={(e) => handlePointerMove(e, item.id)}
                onPointerUp={() => handlePointerUp(item.id, idx)}
                onClick={() => handleCardClick(idx)}
                aria-label={`Mở ảnh: ${item.caption} (${item.date})`}
              >
                <span className="polaroid-card__frame">
                  <EditorialPhoto
                    src={item.src}
                    alt={item.caption}
                    aspectRatio="5 / 6"
                    mood={item.mood}
                    recommendedSpec={item.recommendedSpec}
                  />
                </span>
                <span className="polaroid-card__meta">
                  <span className="polaroid-card__caption">{item.caption}</span>
                  <span className="polaroid-card__date">{item.date}</span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Focused Lightbox Viewer */}
      {activeItem && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing photograph ${selectedIndex + 1} of ${items.length}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedIndex(null);
          }}
        >
          <div className="lightbox__panel">
            <div className="lightbox__topbar">
              <span className="eyebrow eyebrow--accent">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} ·{' '}
                {activeItem.date}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                className="lightbox__close"
                onClick={() => setSelectedIndex(null)}
                aria-label="Đóng trình xem ảnh"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            <div className="lightbox__media">
              <EditorialPhoto
                src={activeItem.src}
                alt={activeItem.caption}
                aspectRatio="4 / 5"
                mood={activeItem.mood}
                plateLabel={activeItem.date}
                recommendedSpec={activeItem.recommendedSpec}
              />
            </div>

            <div className="lightbox__footer">
              <p className="lightbox__caption">{activeItem.caption}</p>
              <div className="lightbox__controls">
                <button
                  type="button"
                  className="lightbox__nav-btn"
                  onClick={() => setSelectedIndex((prev) => (prev - 1 + items.length) % items.length)}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="lightbox__nav-btn"
                  onClick={() => setSelectedIndex((prev) => (prev + 1) % items.length)}
                  aria-label="Next photo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
