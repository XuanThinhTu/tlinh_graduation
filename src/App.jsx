import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { eventConfig } from './config/eventConfig';
import { usePrefersReducedMotion } from './utils/motion';
import {
  getSanitizedRecipientName,
  hasSeenPreludeThisSession,
  markPreludeSeenThisSession,
} from './utils/personalization';
import InvitationPrelude from './components/InvitationPrelude';
import SiteNavigation from './components/SiteNavigation';
import ChapterProgress, { SCENE_LIST } from './components/ChapterProgress';
import CinematicHero from './components/CinematicHero';
import StoryTimeline from './components/StoryTimeline';
import GraduationMoment from './components/GraduationMoment';
import EventInvitation from './components/EventInvitation';
import SeeYouThereSection from './components/SeeYouThereSection';
import ClosingEpilogue from './components/ClosingEpilogue';

const GraduationCapCanvas = lazy(() => import('./three/GraduationCapCanvas'));

const LIGHT_SCENES = new Set(['scene-story', 'scene-invitation', 'scene-seeyou']);

export default function App() {
  const recipientName = useMemo(() => getSanitizedRecipientName(), []);
  const reducedMotion = usePrefersReducedMotion();

  const [showPrelude, setShowPrelude] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.location.hash && window.location.hash !== '#scene-hero') return false;
    return !hasSeenPreludeThisSession();
  });

  const [activeScene, setActiveScene] = useState('scene-hero');
  const [webglFailed, setWebglFailed] = useState(false);
  const [tossSignal, setTossSignal] = useState(0);

  const persistent3DActive =
    Boolean(eventConfig.project.experience?.enable3D) && !reducedMotion && !webglFailed;

  const handlePreludeComplete = useCallback(() => {
    markPreludeSeenThisSession();
    setShowPrelude(false);
  }, []);

  const handleReplayPrelude = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowPrelude(true);
  }, []);

  const handleTriggerToss = useCallback(() => {
    setTossSignal((n) => n + 1);
  }, []);

  useEffect(() => {
    const ids = SCENE_LIST.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveScene(visible[0].target.id);
        }
      },
      {
        rootMargin: '-32% 0px -45% 0px',
        threshold: [0.05, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isLightSurface = LIGHT_SCENES.has(activeScene);

  return (
    <div className="app-shell">
      <a href="#scene-invitation" className="sr-only">
        Chuyển thẳng đến thông tin thiệp mời lễ tốt nghiệp
      </a>

      {/* Single Persistent Traveling 3D Graduation Cap Layer across all scenes */}
      {persistent3DActive && (
        <Suspense fallback={null}>
          <GraduationCapCanvas
            preludeVisible={showPrelude}
            manualTossSignal={tossSignal}
            onWebGLError={() => setWebglFailed(true)}
          />
        </Suspense>
      )}

      {showPrelude && (
        <InvitationPrelude
          config={eventConfig}
          recipientName={recipientName}
          onComplete={handlePreludeComplete}
        />
      )}

      <SiteNavigation activeScene={activeScene} isLightSurface={isLightSurface} />
      <ChapterProgress activeScene={activeScene} isLightSurface={isLightSurface} />

      <main>
        <CinematicHero
          config={eventConfig}
          preludeDone={!showPrelude}
          recipientName={recipientName}
        />
        <GraduationMoment
          config={eventConfig}
          persistent3DActive={persistent3DActive}
          onTriggerToss={handleTriggerToss}
        />
        <EventInvitation config={eventConfig} recipientName={recipientName} />
        <StoryTimeline config={eventConfig} />
        <SeeYouThereSection config={eventConfig} recipientName={recipientName} />
      </main>

      <ClosingEpilogue config={eventConfig} onReplayPrelude={handleReplayPrelude} />
    </div>
  );
}
