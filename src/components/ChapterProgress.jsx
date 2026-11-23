import './ChapterProgress.css';

export const SCENE_LIST = [
  { id: 'scene-hero', number: '01', label: 'Chương Cuối' },
  { id: 'scene-story', number: '02', label: 'Bốn Năm Thanh Xuân' },
  { id: 'scene-moment', number: '03', label: 'Khoảnh Khắc Tỏa Sáng' },
  { id: 'scene-invitation', number: '04', label: 'Thiệp Mời' },
  { id: 'scene-seeyou', number: '05', label: 'Hẹn Gặp Nhau' },
  { id: 'scene-epilogue', number: '06', label: 'Lời Kết' },
];

export default function ChapterProgress({ activeScene, isLightSurface }) {
  const activeIndex = Math.max(
    0,
    SCENE_LIST.findIndex((scene) => scene.id === activeScene)
  );
  const current = SCENE_LIST[activeIndex] || SCENE_LIST[0];

  return (
    <aside
      className={`chapter-progress ${isLightSurface ? 'chapter-progress--light' : 'chapter-progress--dark'}`}
      aria-label="Chapter progress"
    >
      <span className="chapter-progress__counter" aria-live="polite">
        {current.number} / 06
      </span>
      <ol className="chapter-progress__bars">
        {SCENE_LIST.map((scene, idx) => (
          <li key={scene.id}>
            <a
              href={`#${scene.id}`}
              className={`chapter-progress__bar ${idx <= activeIndex ? 'is-passed' : ''} ${
                idx === activeIndex ? 'is-current' : ''
              }`}
              aria-label={`Jump to Scene ${scene.number}: ${scene.label}`}
              title={`${scene.number} — ${scene.label}`}
            />
          </li>
        ))}
      </ol>
    </aside>
  );
}
