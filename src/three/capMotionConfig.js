import * as THREE from 'three';

/**
 * Centralized Persistent Graduation Cap Motion Choreography
 *
 * Synced to the exact scene order:
 *   01: scene-hero (Một Chương Rực Rỡ)
 *   02: scene-moment (Khoảnh Khắc Tỏa Sáng — 7-beat climax + bursts)
 *   03: scene-invitation (Thiệp Mời)
 *   04: scene-story (Kỷ Yếu Hành Trình + Góc Lưu Trữ Cuốn Phim Kỷ Yếu)
 *   05: scene-seeyou (Hẹn Gặp Nhau)
 *   06: scene-epilogue (Lời Kết — docked peacefully between `20` and `26`)
 */

export const CAP_WAYPOINTS = [
  // PHẦN 01 — MỘT CHƯƠNG RỰC RỠ (Hero)
  {
    id: 'hero-start',
    sectionId: 'scene-hero',
    at: 0.0,
    desktop: { nx: 0.74, ny: 0.36, nz: -0.45, scale: 0.66 },
    mobile: { nx: 0.72, ny: 0.56, nz: -0.6, scale: 0.34, opacity: 0.82 },
    rot: [0.34, -0.58, -0.14],
    opacity: 0.94,
    idleAmp: 0.75,
    lightBoost: 0.95,
  },
  {
    id: 'hero-bridge',
    sectionId: 'scene-hero',
    at: 0.84,
    desktop: { nx: 0.24, ny: -0.1, nz: 0.15, scale: 0.88 },
    mobile: { nx: 0.26, ny: -0.14, nz: -0.15, scale: 0.48, opacity: 0.9 },
    rot: [0.36, 0.35, 0.06],
    opacity: 0.96,
    idleAmp: 0.65,
    lightBoost: 1.1,
  },

  // PHẦN 02 — KHOẢNH KHẮC TỎA SÁNG (Graduation Climax — 7 Choreographed Beats)
  {
    id: 'moment-arrival',
    sectionId: 'scene-moment',
    at: 0.14,
    desktop: { nx: 0.0, ny: -0.02, nz: 0.45, scale: 1.08 },
    mobile: { nx: 0.0, ny: 0.02, nz: 0.1, scale: 0.62, opacity: 1.0 },
    rot: [0.32, 0.95, -0.04],
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
    rot: [0.26, 1.48, -0.06],
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
    rot: [0.48, 1.65, 0.06],
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
    rot: [-0.28, 2.85, -0.16],
    opacity: 1.0,
    idleAmp: 0.2,
    lightBoost: 1.45,
  },
  {
    id: 'moment-resolution',
    sectionId: 'scene-moment',
    at: 0.94,
    desktop: { nx: 0.52, ny: 0.18, nz: -0.1, scale: 0.74 },
    mobile: { nx: 0.58, ny: 0.4, nz: -0.45, scale: 0.34, opacity: 0.72 },
    rot: [0.28, 3.55, 0.04],
    opacity: 0.9,
    idleAmp: 0.5,
    lightBoost: 1.15,
  },

  // PHẦN 03 — THIỆP MỜI
  {
    id: 'invitation-rest',
    sectionId: 'scene-invitation',
    at: 0.38,
    desktop: { nx: 0.74, ny: 0.32, nz: -0.45, scale: 0.58 },
    mobile: { nx: 0.72, ny: 0.52, nz: -0.7, scale: 0.28, opacity: 0.56 },
    rot: [0.3, 4.15, -0.08],
    opacity: 0.84,
    idleAmp: 0.42,
    lightBoost: 1.15,
  },

  // PHẦN 04 — KỶ YẾU HÀNH TRÌNH & GÓC LƯU TRỮ CUỐN PHIM KỶ YẾU
  {
    id: 'story-chapters-left',
    sectionId: 'scene-story',
    at: 0.22,
    desktop: { nx: -0.72, ny: 0.18, nz: -0.3, scale: 0.62 },
    mobile: { nx: -0.7, ny: 0.46, nz: -0.65, scale: 0.28, opacity: 0.56 },
    rot: [0.32, 4.95, 0.1],
    opacity: 0.82,
    idleAmp: 0.6,
    lightBoost: 1.15,
  },
  {
    id: 'story-gallery-right',
    sectionId: 'scene-story',
    at: 0.72,
    desktop: { nx: 0.72, ny: -0.14, nz: -0.3, scale: 0.6 },
    mobile: { nx: 0.7, ny: -0.34, nz: -0.65, scale: 0.28, opacity: 0.56 },
    rot: [0.24, 5.75, -0.08],
    opacity: 0.82,
    idleAmp: 0.58,
    lightBoost: 1.1,
  },

  // PHẦN 05 — HẸN GẶP NHAU
  {
    id: 'seeyou-rest',
    sectionId: 'scene-seeyou',
    at: 0.4,
    desktop: { nx: -0.72, ny: 0.28, nz: -0.5, scale: 0.54 },
    mobile: { nx: -0.72, ny: 0.52, nz: -0.75, scale: 0.27, opacity: 0.54 },
    rot: [0.26, 6.55, 0.06],
    opacity: 0.78,
    idleAmp: 0.35,
    lightBoost: 1.1,
  },

  // PHẦN 06 — LỜI KẾT (docks serenely between `20` and `26` and comes to rest)
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
