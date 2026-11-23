import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PREPARED_WAYPOINTS, smoothstep } from './capMotionConfig';
import { createGraduationCapModel } from './createGraduationCapModel';
import './GraduationCapCanvas.css';

/**
 * Persistent Viewport-Spanning 3D Graduation Cap Layer
 *
 * One cap. One WebGL canvas. Continuous scroll-driven motion across all scenes.
 * - Pointer events are strictly `none` so buttons, links, galleries, and scrolling
 *   are never obstructed.
 * - Zero React re-renders on scroll; all state lives in mutable refs inside a
 *   single requestAnimationFrame loop.
 * - Recomputes DOM section boundaries cleanly on resize and font loading.
 * - Smooth quaternion SLERP orientation + normalized responsive viewport positioning.
 * - Includes one-shot restrained silver & blush celebratory particle burst at
 *   Scene 03 climax (plus manual replay via `manualTossSignal`).
 */
export default function GraduationCapCanvas({
  preludeVisible,
  manualTossSignal,
  onWebGLError,
}) {
  const hostRef = useRef(null);
  const preludeRef = useRef(preludeVisible);
  const manualTossRef = useRef({ active: false, startTime: 0 });
  const burstStateRef = useRef({
    active: false,
    startTime: 0,
    heroArmed: true,
    tossArmed: true,
    intensity: 1,
  });

  useEffect(() => {
    preludeRef.current = preludeVisible;
  }, [preludeVisible]);

  useEffect(() => {
    if (manualTossSignal > 0) {
      const now = performance.now();
      manualTossRef.current = { active: true, startTime: now };
      burstStateRef.current = {
        ...burstStateRef.current,
        active: true,
        startTime: now,
        intensity: 1.15,
      };
    }
  }, [manualTossSignal]);

  useEffect(() => {
    const container = hostRef.current;
    if (!container) return undefined;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: isMobile ? 'default' : 'high-performance',
      });
    } catch {
      onWebGLError?.();
      return undefined;
    }

    // Keep Retina sharpness (up to 2x DPR) on mobile too so mortarboard edges stay silky smooth
    const maxDpr = 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const initialAspect = window.innerWidth / Math.max(window.innerHeight, 1);
    const camera = new THREE.PerspectiveCamera(32, initialAspect, 0.1, 50);
    // Slightly pull camera back on portrait mobile screens for cleaner, less distorted proportions
    camera.position.set(0, 0.25, initialAspect < 0.75 ? 9.6 : 8.2);
    camera.lookAt(0, 0, 0);

    // Studio Lighting harmonized with Midnight Navy, Cool Silver & Soft Blush
    const ambientLight = new THREE.AmbientLight(0xdce3f2, 0.72);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ec, 2.2);
    keyLight.position.set(4.8, 6.2, 5.5);
    scene.add(keyLight);

    const navyFill = new THREE.DirectionalLight(0x4b70b8, 1.35);
    navyFill.position.set(-5.5, 1.8, 2.4);
    scene.add(navyFill);

    const silverRim = new THREE.DirectionalLight(0xe6c7be, 1.05);
    silverRim.position.set(-2.5, 4.2, -5.2);
    scene.add(silverRim);

    const underBounce = new THREE.PointLight(0xc8cfda, 0.85, 14);
    underBounce.position.set(0, -3.2, 3.0);
    scene.add(underBounce);

    // Build Persistent Graduation Cap
    const capModel = createGraduationCapModel({ lowPoly: isMobile });
    scene.add(capModel.root);

    // Refined silver, white, blush & navy celebratory ribbon burst (Scene 03 climax)
    const PARTICLE_COUNT = isMobile ? 46 : 76;
    const confettiGroup = new THREE.Group();
    scene.add(confettiGroup);

    const confettiGeom = new THREE.PlaneGeometry(
      isMobile ? 0.08 : 0.11,
      isMobile ? 0.15 : 0.21
    );
    const confettiPalette = [0xfffdfc, 0xc8cfda, 0xe6c7be, 0x8ea6d6, 0xded3c1];
    const confettiParticles = [];

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const mat = new THREE.MeshStandardMaterial({
        color: confettiPalette[i % confettiPalette.length],
        roughness: 0.26,
        metalness: 0.58,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(confettiGeom, mat);
      confettiGroup.add(mesh);

      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.32;
      const speed = 1.65 + Math.random() * 2.55;
      confettiParticles.push({
        mesh,
        mat,
        vx: Math.cos(angle) * speed,
        vy: 1.9 + Math.random() * 2.4,
        vz: Math.sin(angle) * speed * 0.65,
        rx: (Math.random() - 0.5) * 6.2,
        ry: (Math.random() - 0.5) * 6.2,
        rz: (Math.random() - 0.5) * 4.5,
      });
    }

    // Track real DOM scroll anchors for every waypoint
    let mappedAnchors = [];
    let momentBounds = { top: 0, height: 1 };
    let epilogueDockEl = null;
    let currentMobileMode = isMobile;

    const computeScrollAnchors = () => {
      currentMobileMode = window.matchMedia('(max-width: 767px)').matches;
      epilogueDockEl = document.getElementById('epilogue-cap-dock');
      const vh = Math.max(window.innerHeight, 1);
      const sectionCache = new Map();

      PREPARED_WAYPOINTS.forEach((wp) => {
        if (!sectionCache.has(wp.sectionId)) {
          const el = document.getElementById(wp.sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const height = Math.max(rect.height, 1);
            sectionCache.set(wp.sectionId, { top, height });
          }
        }
      });

      const momentSec = sectionCache.get('scene-moment');
      if (momentSec) {
        momentBounds = momentSec;
      }

      mappedAnchors = PREPARED_WAYPOINTS.map((wp) => {
        const sec = sectionCache.get(wp.sectionId);
        // Align section progress smoothly with viewport center
        const scrollY = sec
          ? Math.max(0, sec.top - vh * 0.35 + sec.height * wp.at)
          : 0;
        return { ...wp, scrollY };
      }).sort((a, b) => a.scrollY - b.scrollY);
    };

    computeScrollAnchors();

    // Recompute anchors cleanly on viewport resize, layout shifts, and font loading
    let resizeTimer = null;
    const handleResize = () => {
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight, 1);
      const nextAspect = w / h;
      camera.aspect = nextAspect;
      camera.position.z = nextAspect < 0.75 ? 9.6 : 8.2;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h);

      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(computeScrollAnchors, 120);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    const bodyResizeObserver = new ResizeObserver(() => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(computeScrollAnchors, 140);
    });
    bodyResizeObserver.observe(document.body);
    document.fonts?.ready?.then(computeScrollAnchors);

    // Pre-allocated scratch math objects (zero per-frame GC allocations)
    const targetPos = new THREE.Vector3();
    const currentPos = new THREE.Vector3(2.8, 1.4, -0.4);
    const targetQuat = new THREE.Quaternion();
    const currentQuat = new THREE.Quaternion().copy(PREPARED_WAYPOINTS[0].quat);
    const idleQuat = new THREE.Quaternion();
    const idleEuler = new THREE.Euler(0, 0, 0, 'YXZ');
    const tossQuat = new THREE.Quaternion();
    const tossEuler = new THREE.Euler(0, 0, 0, 'YXZ');
    const finalQuat = new THREE.Quaternion();

    let currentScale = 0.01;
    let currentOpacity = 0;
    let prevScrollY = window.scrollY;
    let smoothedScrollVel = 0;
    let lastTime = performance.now();
    let rafId = null;

    // Convert normalized viewport coords (nx, ny) into world-space at depth nz
    const getWorldXY = (nx, ny, nz) => {
      const dist = Math.max(1, camera.position.z - nz);
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * dist;
      const halfW = halfH * camera.aspect;
      return { x: nx * halfW, y: ny * halfH };
    };

    // Helper to get live normalized viewport coordinates of the `20 [dock] 26` pocket
    const getDockViewportCoords = () => {
      const el = epilogueDockEl || document.getElementById('epilogue-cap-dock');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const vw = Math.max(window.innerWidth, 1);
      const vh = Math.max(window.innerHeight, 1);
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;
      return {
        nx: (cx / vw) * 2 - 1,
        ny: -((cy / vh) * 2 - 1),
      };
    };

    const sampleMotionAtScroll = (sy) => {
      if (mappedAnchors.length === 0) {
        const first = PREPARED_WAYPOINTS[0];
        const cfg = currentMobileMode ? first.mobile : first.desktop;
        return {
          nx: cfg.nx,
          ny: cfg.ny,
          nz: cfg.nz,
          scale: cfg.scale,
          quat: first.quat,
          opacity: first.opacity,
          idleAmp: first.idleAmp,
          lightBoost: first.lightBoost,
          isDocked: false,
        };
      }

      if (sy <= mappedAnchors[0].scrollY) {
        const a = mappedAnchors[0];
        const cfg = currentMobileMode ? a.mobile : a.desktop;
        return {
          ...cfg,
          quat: a.quat,
          opacity: cfg.opacity ?? a.opacity,
          idleAmp: a.idleAmp,
          lightBoost: a.lightBoost,
          isDocked: false,
        };
      }

      const last = mappedAnchors[mappedAnchors.length - 1];
      if (sy >= last.scrollY) {
        const cfg = currentMobileMode ? last.mobile : last.desktop;
        const dockCoords = last.dockElementId ? getDockViewportCoords() : null;
        return {
          ...cfg,
          nx: dockCoords ? dockCoords.nx : cfg.nx,
          ny: dockCoords ? dockCoords.ny : cfg.ny,
          quat: last.quat,
          opacity: cfg.opacity ?? last.opacity,
          idleAmp: last.idleAmp,
          lightBoost: last.lightBoost,
          isDocked: Boolean(dockCoords),
        };
      }

      // Locate active segment
      let idx = 0;
      for (let i = 0; i < mappedAnchors.length - 1; i += 1) {
        if (sy >= mappedAnchors[i].scrollY && sy <= mappedAnchors[i + 1].scrollY) {
          idx = i;
          break;
        }
      }

      const a = mappedAnchors[idx];
      const b = mappedAnchors[idx + 1];
      const span = Math.max(1, b.scrollY - a.scrollY);
      const rawT = (sy - a.scrollY) / span;
      const t = smoothstep(rawT);

      const cfgA = currentMobileMode ? a.mobile : a.desktop;
      const cfgB = currentMobileMode ? b.mobile : b.desktop;
      const dockB = b.dockElementId ? getDockViewportCoords() : null;

      const targetBNx = dockB ? dockB.nx : cfgB.nx;
      const targetBNy = dockB ? dockB.ny : cfgB.ny;

      // Subtle curved arc offset between diagonal waypoints so travel feels orbital
      const arcLift = Math.sin(t * Math.PI) * 0.055;
      const nx = THREE.MathUtils.lerp(cfgA.nx, targetBNx, t);
      const ny = THREE.MathUtils.lerp(cfgA.ny, targetBNy, t) + arcLift;
      const nz = THREE.MathUtils.lerp(cfgA.nz, cfgB.nz, t);
      const scale = THREE.MathUtils.lerp(cfgA.scale, cfgB.scale, t);
      const opA = cfgA.opacity ?? a.opacity;
      const opB = cfgB.opacity ?? b.opacity;
      const opacity = THREE.MathUtils.lerp(opA, opB, t);
      const idleAmp = THREE.MathUtils.lerp(a.idleAmp, b.idleAmp, t);
      const lightBoost = THREE.MathUtils.lerp(a.lightBoost, b.lightBoost, t);

      targetQuat.copy(a.quat).slerp(b.quat, t);

      return {
        nx,
        ny,
        nz,
        scale,
        quat: targetQuat,
        opacity,
        idleAmp,
        lightBoost,
        isDocked: false,
      };
    };

    const animate = (now) => {
      rafId = window.requestAnimationFrame(animate);
      if (document.hidden) {
        lastTime = now;
        return;
      }

      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      const elapsed = now * 0.001;

      const sy = window.scrollY;
      const instVel = (sy - prevScrollY) / Math.max(dt, 0.016);
      prevScrollY = sy;
      smoothedScrollVel += (THREE.MathUtils.clamp(instVel / 1800, -1, 1) - smoothedScrollVel) * 0.12;

      // Trigger celebratory bursts cleanly in Scene 03:
      // 1) Right when the cap reaches its largest hero center pose (`0.28..0.52`)
      // 2) Second celebratory burst at the upward toss climax (`0.60..0.84`)
      const momentProgress =
        (sy + window.innerHeight * 0.35 - momentBounds.top) / Math.max(momentBounds.height, 1);
      if (momentProgress < 0.08) {
        burstStateRef.current.heroArmed = true;
        burstStateRef.current.tossArmed = true;
      } else if (!preludeRef.current) {
        if (
          burstStateRef.current.heroArmed &&
          momentProgress >= 0.28 &&
          momentProgress <= 0.52
        ) {
          burstStateRef.current = {
            ...burstStateRef.current,
            active: true,
            startTime: now,
            heroArmed: false,
            intensity: 1.0,
          };
        } else if (
          burstStateRef.current.tossArmed &&
          momentProgress >= 0.6 &&
          momentProgress <= 0.84
        ) {
          burstStateRef.current = {
            ...burstStateRef.current,
            active: true,
            startTime: now,
            tossArmed: false,
            intensity: 1.18,
          };
        }
      }

      const pose = sampleMotionAtScroll(sy);
      const worldXY = getWorldXY(pose.nx, pose.ny, pose.nz);

      // Gentle breathing drift scaled by scene's `idleAmp`
      const driftY = Math.sin(elapsed * 1.25) * 0.09 * pose.idleAmp;
      const driftX = Math.cos(elapsed * 0.85) * 0.05 * pose.idleAmp;

      // Optional manual replay toss arc (from clicking the Scene 03 stage trigger)
      let manualLift = 0;
      let manualSpinY = 0;
      let manualPitch = 0;
      if (manualTossRef.current.active) {
        const mdt = (now - manualTossRef.current.startTime) / 1000;
        const dur = 1.45;
        if (mdt < dur) {
          const mt = mdt / dur;
          const arc = Math.sin(mt * Math.PI);
          manualLift = arc * 1.15;
          manualPitch = -arc * 0.55;
          manualSpinY = smoothstep(mt) * Math.PI * 2;
        } else {
          manualTossRef.current.active = false;
        }
      }

      targetPos.set(worldXY.x + driftX, worldXY.y + driftY + manualLift, pose.nz);

      // Tight tracking when docked between `20` and `26` so it stays locked to the DOM element
      const posDamp = pose.isDocked ? 1 - Math.exp(-26 * dt) : 1 - Math.exp(-7.2 * dt);
      const rotDamp = 1 - Math.exp(-7.2 * dt);
      currentPos.lerp(targetPos, posDamp);
      currentQuat.slerp(pose.quat, rotDamp);

      const desiredOpacity = preludeRef.current ? 0 : pose.opacity;
      const desiredScale = preludeRef.current ? pose.scale * 0.55 : pose.scale;
      currentOpacity += (desiredOpacity - currentOpacity) * (1 - Math.exp(-5.5 * dt));
      currentScale += (desiredScale - currentScale) * rotDamp;

      // Apply subtle idle sway + manual toss spin cleanly on top of SLERP quaternion
      idleEuler.set(
        Math.sin(elapsed * 0.9) * 0.04 * pose.idleAmp,
        Math.sin(elapsed * 0.55) * 0.14 * pose.idleAmp,
        Math.cos(elapsed * 0.75) * 0.035 * pose.idleAmp
      );
      idleQuat.setFromEuler(idleEuler);

      finalQuat.copy(currentQuat).multiply(idleQuat);
      if (manualSpinY !== 0 || manualPitch !== 0) {
        tossEuler.set(manualPitch, manualSpinY, 0);
        tossQuat.setFromEuler(tossEuler);
        finalQuat.multiply(tossQuat);
      }

      capModel.root.position.copy(currentPos);
      capModel.root.quaternion.copy(finalQuat);
      capModel.root.scale.setScalar(currentScale);
      capModel.setOpacity(currentOpacity);
      capModel.root.visible = currentOpacity > 0.01;

      // Secondary damped tassel inertia (settles completely still when docked at `20 26`)
      const velFactor = pose.isDocked ? 0 : smoothedScrollVel;
      const targetFringeZ =
        Math.sin(elapsed * 1.9) * 0.045 * pose.idleAmp - velFactor * 0.22;
      const targetFringeX = velFactor * 0.14;
      capModel.fringePivot.rotation.z += (targetFringeZ - capModel.fringePivot.rotation.z) * 0.1;
      capModel.fringePivot.rotation.x += (targetFringeX - capModel.fringePivot.rotation.x) * 0.1;

      // Subtle lighting emphasis per scene
      keyLight.intensity += (2.15 * pose.lightBoost - keyLight.intensity) * 0.08;

      // One-shot celebratory ribbon burst + soft studio glow pulse anchored around the cap
      if (burstStateRef.current.active) {
        const cdt = (now - burstStateRef.current.startTime) / 1000;
        const cDur = 2.65;
        const spread = burstStateRef.current.intensity || 1;
        if (cdt < cDur) {
          confettiGroup.visible = true;
          const ct = cdt / cDur;
          const flashBoost = ct < 0.25 ? Math.sin((ct / 0.25) * Math.PI) * 0.65 : 0;
          keyLight.intensity += (2.15 * pose.lightBoost + flashBoost - keyLight.intensity) * 0.18;

          confettiParticles.forEach((p) => {
            p.mesh.position.set(
              currentPos.x + p.vx * cdt * 0.9 * spread,
              currentPos.y + 0.22 + p.vy * cdt * spread - 1.95 * cdt * cdt,
              currentPos.z + p.vz * cdt * 0.8 * spread
            );
            p.mesh.rotation.x = p.rx * cdt;
            p.mesh.rotation.y = p.ry * cdt;
            p.mesh.rotation.z = (p.rz || 0) * cdt;
            p.mat.opacity =
              (ct < 0.1 ? ct / 0.1 : Math.max(0, 1 - (ct - 0.1) / 0.9)) * 0.95;
          });
        } else {
          burstStateRef.current.active = false;
          confettiGroup.visible = false;
          confettiParticles.forEach((p) => {
            p.mat.opacity = 0;
          });
        }
      } else {
        confettiGroup.visible = false;
      }

      if (capModel.root.visible || confettiGroup.visible) {
        renderer.render(scene, camera);
      } else {
        renderer.clear();
      }
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      bodyResizeObserver.disconnect();

      capModel.dispose();
      confettiGeom.dispose();
      confettiParticles.forEach((p) => p.mat.dispose());

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onWebGLError]);

  return (
    <div
      ref={hostRef}
      className="persistent-cap-canvas"
      aria-hidden="true"
    />
  );
}
