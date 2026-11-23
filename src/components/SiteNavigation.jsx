import { ArrowUpRight } from 'lucide-react';
import './SiteNavigation.css';

export default function SiteNavigation({ activeScene, isLightSurface }) {
  return (
    <nav
      className={`site-nav ${isLightSurface ? 'site-nav--light' : 'site-nav--dark'}`}
      aria-label="Điều hướng chính"
    >
      <div className="site-nav__inner editorial-container">
        <a href="#scene-hero" className="site-nav__brand" aria-label="Về đầu trang — Khóa 2026">
          <span className="site-nav__monogram">KHÓA</span>
          <span className="site-nav__slash" aria-hidden="true">/</span>
          <span className="site-nav__year">26</span>
        </a>

        <div className="site-nav__links">
          <a
            href="#scene-story"
            className={`site-nav__link ${activeScene === 'scene-story' ? 'is-active' : ''}`}
          >
            Câu Chuyện
          </a>
          <a
            href="#scene-invitation"
            className={`site-nav__link ${activeScene === 'scene-invitation' ? 'is-active' : ''}`}
          >
            Thiệp Mời
          </a>
          <a
            href="#scene-seeyou"
            className={`site-nav__link ${activeScene === 'scene-seeyou' ? 'is-active' : ''}`}
          >
            Hẹn Gặp Nhau
          </a>
        </div>

        <a href="#scene-invitation" className="site-nav__cta">
          <span>Chi Tiết Buổi Lễ</span>
          <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
