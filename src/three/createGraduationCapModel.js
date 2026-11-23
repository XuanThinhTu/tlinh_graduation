import * as THREE from 'three';

/**
 * Builds a refined, studio-lit procedural 3D academic mortarboard graduation cap.
 *
 * Craft highlights:
 * - Extruded beveled square mortarboard with matte charcoal cloth finish
 * - Subtle Midnight Navy velvet perimeter stitching & Academic Navy inner band
 * - Sculpted curved LatheGeometry skullcap crown (natural head silhouette)
 * - Covered matte center button with cool-silver bezel ring
 * - Draped curved silk tassel cord, bound knot, multi-layered silver-champagne
 *   fringe cluster, and miniature brushed-silver 2026 charm tag
 *
 * Returns `{ root, tasselPivot, fringePivot, dispose }` for clean lifecycle control.
 */
export function createGraduationCapModel({ lowPoly = false } = {}) {
  const disposables = [];
  const track = (obj) => {
    disposables.push(obj);
    return obj;
  };

  const root = new THREE.Group();

  // Materials — matte academic fabric + cool silver & restrained champagne accents
  const mortarClothMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x171923,
      roughness: 0.78,
      metalness: 0.08,
    })
  );

  const crownClothMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x1d2232,
      roughness: 0.72,
      metalness: 0.1,
    })
  );

  const navyBandMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x2a4578,
      roughness: 0.52,
      metalness: 0.16,
    })
  );

  const silverAccentMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xd0d7e3,
      roughness: 0.28,
      metalness: 0.84,
    })
  );

  const silkTasselMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xd8dce5,
      roughness: 0.42,
      metalness: 0.48,
    })
  );

  const blushGoldCharmMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xdfd3c7,
      roughness: 0.26,
      metalness: 0.86,
    })
  );

  // 1. Beveled Diamond Mortarboard (Extruded rounded square)
  const boardHalf = 1.28;
  const cornerRadius = 0.07;
  const boardShape = new THREE.Shape();
  boardShape.moveTo(-boardHalf + cornerRadius, -boardHalf);
  boardShape.lineTo(boardHalf - cornerRadius, -boardHalf);
  boardShape.quadraticCurveTo(boardHalf, -boardHalf, boardHalf, -boardHalf + cornerRadius);
  boardShape.lineTo(boardHalf, boardHalf - cornerRadius);
  boardShape.quadraticCurveTo(boardHalf, boardHalf, boardHalf - cornerRadius, boardHalf);
  boardShape.lineTo(-boardHalf + cornerRadius, boardHalf);
  boardShape.quadraticCurveTo(-boardHalf, boardHalf, -boardHalf, boardHalf - cornerRadius);
  boardShape.lineTo(-boardHalf, -boardHalf + cornerRadius);
  boardShape.quadraticCurveTo(-boardHalf, -boardHalf, -boardHalf + cornerRadius, -boardHalf);

  const boardGeom = track(
    new THREE.ExtrudeGeometry(boardShape, {
      depth: 0.055,
      bevelEnabled: true,
      bevelThickness: 0.022,
      bevelSize: 0.022,
      bevelSegments: 4,
      curveSegments: 8,
    })
  );
  boardGeom.center();

  const boardMesh = new THREE.Mesh(boardGeom, mortarClothMat);
  boardMesh.rotation.x = Math.PI / 2;
  boardMesh.rotation.z = Math.PI / 4;
  boardMesh.position.y = 0.42;
  root.add(boardMesh);

  // Fine cool-silver hairline rim highlight (softer on mobile for ultra-clean edges)
  const rimGeom = track(new THREE.EdgesGeometry(boardGeom, 32));
  const rimBaseOpacity = lowPoly ? 0.14 : 0.22;
  const rimMat = track(
    new THREE.LineBasicMaterial({
      color: 0xc8cfda,
      transparent: true,
      opacity: rimBaseOpacity,
    })
  );
  const rimLines = new THREE.LineSegments(rimGeom, rimMat);
  boardMesh.add(rimLines);

  // 2. Sculpted Skullcap Crown (smooth curved LatheGeometry)
  const radialSegs = lowPoly ? 40 : 48;
  const lathePoints = [
    new THREE.Vector2(0.0, 0.39),
    new THREE.Vector2(0.62, 0.37),
    new THREE.Vector2(0.84, 0.25),
    new THREE.Vector2(0.95, 0.05),
    new THREE.Vector2(1.0, -0.22),
    new THREE.Vector2(0.98, -0.44),
    new THREE.Vector2(0.92, -0.44),
    new THREE.Vector2(0.93, -0.2),
  ];
  const crownGeom = track(new THREE.LatheGeometry(lathePoints, radialSegs));
  const crownMesh = new THREE.Mesh(crownGeom, crownClothMat);
  root.add(crownMesh);

  // Academic Navy satin trim band around lower crown
  const bandGeom = track(new THREE.TorusGeometry(0.985, 0.034, lowPoly ? 8 : 14, radialSegs));
  const bandMesh = new THREE.Mesh(bandGeom, navyBandMat);
  bandMesh.rotation.x = Math.PI / 2;
  bandMesh.position.y = -0.34;
  root.add(bandMesh);

  // Subtle silver stitch line above the navy band
  const stitchGeom = track(new THREE.TorusGeometry(0.992, 0.009, 6, radialSegs));
  const stitchMesh = new THREE.Mesh(stitchGeom, silverAccentMat);
  stitchMesh.rotation.x = Math.PI / 2;
  stitchMesh.position.y = -0.29;
  root.add(stitchMesh);

  // 3. Covered Center Button + Cool Silver Bezel Ring
  const buttonBaseGeom = track(new THREE.CylinderGeometry(0.115, 0.135, 0.048, 24));
  const buttonBaseMesh = new THREE.Mesh(buttonBaseGeom, mortarClothMat);
  buttonBaseMesh.position.y = 0.49;
  root.add(buttonBaseMesh);

  const bezelGeom = track(new THREE.TorusGeometry(0.125, 0.014, 10, 28));
  const bezelMesh = new THREE.Mesh(bezelGeom, silverAccentMat);
  bezelMesh.rotation.x = Math.PI / 2;
  bezelMesh.position.y = 0.485;
  root.add(bezelMesh);

  // 4. Draped Silk Tassel System (with independent secondary inertia pivots)
  const tasselPivot = new THREE.Group();
  tasselPivot.position.set(0, 0.495, 0);
  root.add(tasselPivot);

  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, 0.0, 0.0),
    new THREE.Vector3(0.55, 0.025, 0.14),
    new THREE.Vector3(1.12, 0.01, 0.28),
    new THREE.Vector3(1.38, -0.04, 0.34),
    new THREE.Vector3(1.46, -0.34, 0.36),
  ]);
  const cordGeom = track(
    new THREE.TubeGeometry(cordCurve, lowPoly ? 24 : 28, 0.022, lowPoly ? 8 : 10, false)
  );
  const cordMesh = new THREE.Mesh(cordGeom, silkTasselMat);
  tasselPivot.add(cordMesh);

  // Hanging fringe pivot anchored at the drape drop-point
  const fringePivot = new THREE.Group();
  fringePivot.position.set(1.46, -0.34, 0.36);
  tasselPivot.add(fringePivot);

  // Bound silver silk knot + collar
  const knotGeom = track(new THREE.SphereGeometry(0.056, 16, 14));
  const knotMesh = new THREE.Mesh(knotGeom, silverAccentMat);
  fringePivot.add(knotMesh);

  const collarGeom = track(new THREE.CylinderGeometry(0.045, 0.062, 0.085, 16));
  const collarMesh = new THREE.Mesh(collarGeom, blushGoldCharmMat);
  collarMesh.position.y = -0.075;
  fringePivot.add(collarMesh);

  // Sculpted multi-strand silk fringe cluster
  const strandGeom = track(new THREE.CylinderGeometry(0.016, 0.024, 0.46, 8));
  const strandCount = lowPoly ? 7 : 11;
  for (let i = 0; i < strandCount; i += 1) {
    const angle = (i / strandCount) * Math.PI * 2;
    const radius = i === 0 ? 0 : 0.042;
    const strand = new THREE.Mesh(strandGeom, silkTasselMat);
    strand.position.set(Math.cos(angle) * radius, -0.32, Math.sin(angle) * radius);
    strand.rotation.z = -Math.cos(angle) * 0.09;
    strand.rotation.x = Math.sin(angle) * 0.09;
    fringePivot.add(strand);
  }

  // Miniature brushed-silver 2026 year charm tag
  const charmGeom = track(new THREE.BoxGeometry(0.11, 0.14, 0.016));
  const charmMesh = new THREE.Mesh(charmGeom, blushGoldCharmMat);
  charmMesh.position.set(0.07, -0.15, 0.04);
  charmMesh.rotation.z = -0.22;
  fringePivot.add(charmMesh);

  const allMaterials = [
    mortarClothMat,
    crownClothMat,
    navyBandMat,
    silverAccentMat,
    silkTasselMat,
    blushGoldCharmMat,
    rimMat,
  ];

  // Enable transparency cleanly for smooth prelude fade-in and scene opacity modulation
  allMaterials.forEach((m) => {
    m.transparent = true;
    m.opacity = 1;
  });

  const setOpacity = (alpha) => {
    const clamped = Math.max(0, Math.min(1, alpha));
    mortarClothMat.opacity = clamped;
    crownClothMat.opacity = clamped;
    navyBandMat.opacity = clamped;
    silverAccentMat.opacity = clamped;
    silkTasselMat.opacity = clamped;
    blushGoldCharmMat.opacity = clamped;
    rimMat.opacity = clamped * rimBaseOpacity;
  };

  const dispose = () => {
    disposables.forEach((item) => {
      if (typeof item.dispose === 'function') {
        item.dispose();
      }
    });
  };

  return {
    root,
    tasselPivot,
    fringePivot,
    setOpacity,
    dispose,
  };
}
