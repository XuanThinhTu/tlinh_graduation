import * as THREE from 'three';

/**
 * Centralized Persistent Graduation Cap Motion Choreography
 *
 * Each waypoint is anchored to a real DOM section (`sectionId`) and a local
 * progress value (`at` in [0..1]) within that section.
 *
 * Coordinates (`nx`, `ny`) are normalized viewport space:
 *   nx: -1 (left edge) .. +1 (right edge)
 *   ny: -1 (bottom edge) .. +1 (top edge)
 *   nz: world Z depth offset
 *
 * Orientations (`rot: [rx, ry, rz]`) are pre-converted into Quaternions so
 * interpolation uses smooth SLERP with zero gimbal-lock or 360° snapping.
 */

export const CAP_WAYPOINTS = [
  // SCENE 01 — THE LAST CHAPTER (Hero)
  {
    id: 'hero-start',
    sectionId: 'scene-hero',
    at: 0.0,
    desktop: { nx: 0.74, ny: 0.36, nz: -0.45, scale: 0.66 },
    mobile: { nx: 0.72, ny: 0.56, nz: -0.6, scale: 0.34, opacity: 0.82 },
    rot: [0.34, -0.58, -0.14],
    opacity: 0.94,
    idleAmp: 0.75,
    lightBoost: 0.9,
  },
  {
    id: 'hero-bridge',
    sectionId: 'scene-hero',
    at: 0.82,
    desktop: { nx: 0.34, ny: -0.16, nz: 0.1, scale: 0.84 },
    mobile: { nx: 0.44, ny: -0.24, nz: -0.35, scale: 0.42, opacity: 0.82 },
    rot: [0.46, 0.28, 0.1],
    opacity: 0.96,
    idleAmp: 0.85,
    lightBoost: 1.0,
  },

  // SCENE 02 — FOUR YEARS, A THOUSAND MEMORIES (Yearbook)
  {
    id: 'story-header',
    sectionId: 'scene-story',
    at: 0.05,
    desktop: { nx: 0.68, ny: 0.16, nz: -0.2, scale: 0.66 },
    mobile: { nx: 0.68, ny: 0.46, nz: -0.65, scale: 0.3, opacity: 0.62 },
    rot: [0.28, 0.82, -0.08],
    opacity: 0.9,
    idleAmp: 0.7,
    lightBoost: 1.15,
  },
  {
    id: 'story-chapter-02',
    sectionId: 'scene-story',
    at: 0.34,
    desktop: { nx: -0.66, ny: 0.12, nz: 0.05, scale: 0.7 },
    mobile: { nx: -0.68, ny: 0.42, nz: -0.65, scale: 0.3, opacity: 0.58 },
    rot: [0.36, 1.55, 0.12],
    opacity: 0.88,
    idleAmp: 0.75,
    lightBoost: 1.15,
  },
  {
    id: 'story-chapter-03',
    sectionId: 'scene-story',
    at: 0.62,
    desktop: { nx: 0.68, ny: -0.12, nz: -0.15, scale: 0.64 },
    mobile: { nx: 0.68, ny: -0.34, nz: -0.65, scale: 0.3, opacity: 0.58 },
    rot: [0.22, 2.25, -0.1],
    opacity: 0.84,
    idleAmp: 0.7,
    lightBoost: 1.1,
  },
  {
    id: 'story-exit',
    sectionId: 'scene-story',
    at: 0.94,
    desktop: { nx: 0.16, ny: -0.22, nz: 0.15, scale: 0.82 },
    mobile: { nx: 0.18, ny: -0.24, nz: -0.2, scale: 0.42, opacity: 0.84 },
    rot: [0.38, 2.85, 0.04],
    opacity: 0.94,
    idleAmp: 0.8,
    lightBoost: 1.0,
  },

  // SCENE 03 — THE MOMENT (Graduation Climax — 7 Choreographed Beats)
  {
    id: 'moment-arrival',
    sectionId: 'scene-moment',
    at: 0.14,
    desktop: { nx: 0.0, ny: -0.02, nz: 0.45, scale: 1.08 },
    mobile: { nx: 0.0, ny: 0.02, nz: 0.1, scale: 0.62, opacity: 1.0 },
    rot: [0.32, 3.45, -0.04],
    opacity: 1.0,
    idleAmp: 0.45,
    lightBoost: 1.25,
  },
  {
    id: 'moment-hero-pose',
    sectionId: 'scene-moment',
    at: 0.36,
    desktop: { nx: 0.0, ny: 0.03, nz: 0.65, scale: 1.18 },
    mobile: { nx: 0.0, ny: 0.03, nz: 0.2, scale: 0.7, opacity: 1.0 },
    rot: [0.26, 3.92, -0.06],
    opacity: 1.0,
    idleAmp: 0.3,
    lightBoost: 1.35,
  },
  {
    id: 'moment-anticipation',
    sectionId: 'scene-moment',
    at: 0.5,
    desktop: { nx: 0.0, ny: -0.1, nz: 0.55, scale: 1.12 },
    mobile: { nx: 0.0, ny: -0.06, nz: 0.15, scale: 0.66, opacity: 1.0 },
    rot: [0.48, 4.08, 0.06],
    opacity: 1.0,
    idleAmp: 0.2,
    lightBoost: 1.35,
  },
  {
    id: 'moment-toss-peak',
    sectionId: 'scene-moment',
    at: 0.7,
    desktop: { nx: 0.04, ny: 0.34, nz: 0.8, scale: 1.24 },
    mobile: { nx: 0.02, ny: 0.26, nz: 0.3, scale: 0.74, opacity: 1.0 },
    rot: [-0.28, 5.25, -0.16],
    opacity: 1.0,
    idleAmp: 0.2,
    lightBoost: 1.45,
  },
  {
    id: 'moment-resolution',
    sectionId: 'scene-moment',
    at: 0.94,
    desktop: { nx: 0.42, ny: 0.08, nz: 0.15, scale: 0.8 },
    mobile: { nx: 0.56, ny: 0.36, nz: -0.4, scale: 0.36, opacity: 0.72 },
    rot: [0.28, 5.95, 0.04],
    opacity: 0.92,
    idleAmp: 0.55,
    lightBoost: 1.1,
  },

  // SCENE 04 — YOU ARE INVITED
  {
    id: 'invitation-rest',
    sectionId: 'scene-invitation',
    at: 0.35,
    desktop: { nx: 0.72, ny: 0.3, nz: -0.45, scale: 0.58 },
    mobile: { nx: 0.72, ny: 0.52, nz: -0.7, scale: 0.28, opacity: 0.56 },
    rot: [0.3, 6.45, -0.08],
    opacity: 0.84,
    idleAmp: 0.42,
    lightBoost: 1.15,
  },

  // SCENE 05 — SEE YOU THERE
  {
    id: 'seeyou-rest',
    sectionId: 'scene-seeyou',
    at: 0.4,
    desktop: { nx: -0.7, ny: 0.26, nz: -0.5, scale: 0.54 },
    mobile: { nx: -0.72, ny: 0.52, nz: -0.75, scale: 0.27, opacity: 0.54 },
    rot: [0.26, 7.05, 0.06],
    opacity: 0.78,
    idleAmp: 0.35,
    lightBoost: 1.1,
  },

  // SCENE 06 — THE EPILOGUE
  // Drifts serenely into the exact center between `20` and `26` (#epilogue-cap-dock) and comes to rest
  {
    id: 'epilogue-settle',
    sectionId: 'scene-epilogue',
    at: 0.14,
    dockElementId: 'epilogue-cap-dock',
    desktop: { nx: 0.0, ny: 0.0, nz: 0.1, scale: 0.72 },
    mobile: { nx: 0.0, ny: 0.0, nz: -0.1, scale: 0.42, opacity: 0.98 },
    rot: [0.26, 7.52, 0.0],
    opacity: 0.98,
    idleAmp: 0.0,
    lightBoost: 1.15,
  },
];

// Precompute immutable quaternions for every waypoint once at module load
export const PREPARED_WAYPOINTS = CAP_WAYPOINTS.map((wp) => {
  const euler = new THREE.Euler(wp.rot[0], wp.rot[1], wp.rot[2], 'YXZ');
  return {
    ...wp,
    quat: new THREE.Quaternion().setFromEuler(euler),
  };
});

export function smoothstep(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}
