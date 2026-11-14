/* StudStack Studio 3D 1.2.0. Original models. Three.js MIT, bundled locally. */
import * as THREE from "./vendor/three/three.module.js";
import { OrbitControls } from "./vendor/three/OrbitControls.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { RoomEnvironment } from "./vendor/three/RoomEnvironment.js";

const UNIT_H = 1.14;
const palette = {
  red: "#d32d28",
  blue: "#1360c4",
  yellow: "#f4c600",
  green: "#268058",
  white: "#e9e9e5",
  black: "#303239",
  sand: "#c2ac85",
  gray: "#9ba2a9",
  orange: "#ef7933",
  purple: "#7d5aa8",
  pink: "#df91ae",
  teal: "#258f9b",
};
const text = {
  en: {
    rotate: "Drag to rotate · Scroll or pinch to zoom",
    reset: "Reset view",
    left: "Rotate view left",
    right: "Rotate view right",
    top: "View from above",
    three: "3D view",
    two: "2D view",
    canvas: "Interactive 3D building canvas",
    ready: "Snapped to grid · Click to place",
    invalid: "Cannot place here",
    fallback:
      "3D is unavailable in this browser. The 2D builder remains available.",
    snap: "Magnetic grid · 12 × 12 studs",
    heroTag: "YOUR NEXT GREAT BUILD",
    heroTitle: "Big ideas.\nBuilt by you.",
    heroLead:
      "Find the right piece. Create something entirely yours. A colourful little world, ready for your next idea.",
    heroCta: "Create your own",
    heroSecond: "Explore the parts",
    heroHelp: "Drag to explore · 3D",
    heroCaption: "The little corner house · Made from 33 pieces",
    entry1: "Find your missing piece.",
    entry1sub: "Explore shapes, colours and possibilities.",
    entry2: "Make something yours.",
    entry2sub: "Build, rotate and personalise in 3D.",
    entry3: "Start with a little spark.",
    entry3sub: "Discover ideas and step-by-step plans.",
    entryCta: "Explore",
    detail: "Studio-rendered product view",
    validKey:
      "Use arrow keys to move the placement cursor, Enter to place, R to rotate the piece. Alt + arrow keys rotates the camera.",
  },
  de: {
    rotate: "Ziehen zum Drehen · Scrollen oder Pinch zum Zoomen",
    reset: "Ansicht zurücksetzen",
    left: "Ansicht nach links drehen",
    right: "Ansicht nach rechts drehen",
    top: "Ansicht von oben",
    three: "3D-Ansicht",
    two: "2D-Ansicht",
    canvas: "Interaktive 3D-Baufläche",
    ready: "Im Raster eingerastet · Klicken zum Setzen",
    invalid: "Hier nicht platzierbar",
    fallback:
      "3D ist in diesem Browser nicht verfügbar. Der 2D-Baukasten bleibt nutzbar.",
    snap: "Magnetisches Raster · 12 × 12 Noppen",
    heroTag: "DEIN NÄCHSTES GROSSES BAUPROJEKT",
    heroTitle: "Große Ideen.\nVon dir gebaut.",
    heroLead:
      "Finde das richtige Teil. Erschaffe etwas ganz Eigenes. Eine kleine, bunte Welt – bereit für deine nächste Idee.",
    heroCta: "Selbst gestalten",
    heroSecond: "Teile entdecken",
    heroHelp: "Ziehen zum Entdecken · 3D",
    heroCaption: "Das kleine Eckhaus · Aus 33 Teilen gebaut",
    entry1: "Finde das fehlende Teil.",
    entry1sub: "Entdecke Formen, Farben und Möglichkeiten.",
    entry2: "Mach es zu deinem Projekt.",
    entry2sub: "Bauen, drehen und gestalten – in 3D.",
    entry3: "Eine kleine Idee als Anfang.",
    entry3sub: "Entdecke Bauideen und Schritt-für-Schritt-Pläne.",
    entryCta: "Entdecken",
    detail: "Produktrendering im Studiolicht",
    validKey:
      "Pfeiltasten bewegen die Platzierungsvorschau, Enter setzt den Stein, R dreht ihn. Alt + Pfeiltasten dreht die Kamera.",
  },
};
let productViewer,
  heroAssembled = false;
let builderFailed = false;
let locale = "en",
  hostApi,
  thumbViewer,
  builderViewer,
  heroViewer,
  productObserver,
  mutationObserver;
const t = (k) => text[locale][k] || k;
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const geometryCache = new Map(),
  materialCache = new Map(),
  imageCache = new Map();
function material(color) {
  if (!materialCache.has(color))
    materialCache.set(
      color,
      new THREE.MeshPhysicalMaterial({
        color: palette[color] || color,
        roughness: 0.255,
        metalness: 0,
        clearcoat: 0.38,
        clearcoatRoughness: 0.18,
        ior: 1.46,
        reflectivity: 0.4,
      }),
    );
  return materialCache.get(color);
}
function shapeKey(p) {
  return [p.id, p.nx, p.ny, p.h].join("-");
}
function bodyGeometry(p) {
  const key = shapeKey(p);
  if (geometryCache.has(key)) return geometryCache.get(key);
  const w = p.nx - 0.045,
    d = p.ny - 0.045,
    h = p.h * 0.96;
  let geo;
  if (p.id === "4073") geo = new THREE.CylinderGeometry(0.46, 0.46, h, 48, 1);
  else if (p.category === "slopes") {
    const s = new THREE.Shape();
    s.moveTo(-w / 2, -h / 2);
    s.lineTo(w / 2, -h / 2);
    s.lineTo(w / 2, -h * 0.28);
    s.lineTo(-w / 2, h / 2);
    s.closePath();
    geo = new THREE.ExtrudeGeometry(s, {
      depth: d,
      bevelEnabled: true,
      bevelSize: 0.018,
      bevelThickness: 0.018,
      bevelSegments: 3,
      steps: 1,
    });
    geo.translate(0, 0, -d / 2);
  } else if (p.category === "technic" || p.id === "3659") {
    const s = new THREE.Shape();
    s.moveTo(-w / 2, -h / 2);
    s.lineTo(-w / 2, h / 2);
    s.lineTo(w / 2, h / 2);
    s.lineTo(w / 2, -h / 2);
    if (p.id === "3659") {
      const q = w / 2 - 0.65;
      s.lineTo(q, -h / 2);
      s.lineTo(q, -h * 0.16);
      s.quadraticCurveTo(q, h * 0.4, 0, h * 0.4);
      s.quadraticCurveTo(-q, h * 0.4, -q, -h * 0.16);
      s.lineTo(-q, -h / 2);
    }
    s.closePath();
    if (p.category === "technic")
      for (let i = 1; i < p.nx; i++) {
        const hole = new THREE.Path();
        hole.absarc(-p.nx / 2 + i, 0, 0.24, 0, Math.PI * 2, true);
        s.holes.push(hole);
      }
    geo = new THREE.ExtrudeGeometry(s, {
      depth: d,
      bevelEnabled: true,
      bevelSize: 0.018,
      bevelThickness: 0.018,
      bevelSegments: 2,
      steps: 1,
    });
    geo.translate(0, 0, -d / 2);
  } else geo = new RoundedBoxGeometry(w, h, d, 3, 0.045 * Math.min(1, p.h * 2));
  geometryCache.set(key, geo);
  return geo;
}
const studGeometry = new THREE.LatheGeometry(
  [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.27, 0),
    new THREE.Vector2(0.295, 0.025),
    new THREE.Vector2(0.295, 0.145),
    new THREE.Vector2(0.278, 0.175),
    new THREE.Vector2(0, 0.175),
  ],
  40,
);
function part(p) {
  const g = new THREE.Group(),
    h = p.h * 0.96,
    mat = material(p.color);
  const body = new THREE.Mesh(bodyGeometry(p), mat);
  body.position.y = h / 2;
  body.castShadow = body.receiveShadow = true;
  g.add(body);
  if (p.category !== "tiles" && p.category !== "slopes")
    for (let x = 0; x < p.nx; x++)
      for (let z = 0; z < p.ny; z++) {
        const stud = new THREE.Mesh(studGeometry, mat);
        stud.position.set(x - (p.nx - 1) / 2, h, z - (p.ny - 1) / 2);
        stud.castShadow = stud.receiveShadow = true;
        g.add(stud);
      }
  return g;
}
function makeModel(layout, products, options = {}) {
  const group = new THREE.Group(),
    lookup = new Map(products.map((p) => [p.key, p]));
  for (const b of layout) {
    const p = lookup.get(b.key);
    if (!p) continue;
    const g = part(p),
      w = b.r ? p.ny : p.nx,
      d = b.r ? p.nx : p.ny;
    g.position.set(b.x + w / 2 - 6, b.z * UNIT_H, b.y + d / 2 - 6);
    g.rotation.y = b.r ? Math.PI / 2 : 0;
    g.userData.uid = b.uid;
    if (Number.isInteger(options.layer) && b.z !== options.layer)
      g.traverse((o) => {
        if (o.isMesh) {
          o.material = o.material.clone();
          o.material.transparent = true;
          o.material.opacity = 0.22;
          o.material.depthWrite = false;
          o.castShadow = false;
          o.userData.temporaryMaterial = true;
        }
      });
    group.add(g);
  } // Batch identical bodies/studs to keep orbiting inexpensive on smaller devices.
  group.updateMatrixWorld(true);
  const buckets = new Map(),
    boxes = {};
  for (const brick of group.children) {
    if (brick.userData.uid)
      boxes[brick.userData.uid] = new THREE.Box3().setFromObject(brick);
    brick.traverse((o) => {
      if (!o.isMesh) return;
      const k = o.geometry.uuid + "|" + o.material.uuid;
      if (!buckets.has(k))
        buckets.set(k, {
          geometry: o.geometry,
          material: o.material,
          cast: o.castShadow,
          receive: o.receiveShadow,
          temp: o.userData.temporaryMaterial,
          entries: [],
        });
      buckets
        .get(k)
        .entries.push({
          matrix: o.matrixWorld.clone(),
          uid: brick.userData.uid,
        });
    });
  }
  const batched = new THREE.Group();
  for (const b of buckets.values()) {
    const mesh = new THREE.InstancedMesh(
      b.geometry,
      b.material,
      b.entries.length,
    );
    b.entries.forEach((e, i) => mesh.setMatrixAt(i, e.matrix));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = b.cast;
    mesh.receiveShadow = b.receive;
    mesh.userData.uids = b.entries.map((e) => e.uid);
    mesh.userData.temporaryMaterial = b.temp;
    batched.add(mesh);
  }
  batched.userData.partBoxes = boxes;
  return batched;
}
class Viewer {
  constructor(container, { thumbnail = false, interactive = true } = {}) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: thumbnail,
      powerPreference: "low-power",
    });
    this.renderer.setPixelRatio(
      thumbnail ? 1 : Math.min(devicePixelRatio, 1.6),
    );
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.82;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setClearColor(0, 0);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(36, 1, 0.05, 160);
    this.scene.add(new THREE.HemisphereLight(0xeef6ff, 0xb5adb0, 1.3));
    const key = new THREE.DirectionalLight(0xfff7e9, 2.6);
    key.position.set(-6, 14, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(
      thumbnail || matchMedia("(max-width:700px)").matches ? 1024 : 2048,
      thumbnail || matchMedia("(max-width:700px)").matches ? 1024 : 2048,
    );
    Object.assign(key.shadow.camera, {
      left: -12,
      right: 12,
      top: 12,
      bottom: -12,
      near: 0.1,
      far: 45,
    });
    key.shadow.normalBias = 0.025;
    key.shadow.bias = -0.00015;
    key.shadow.radius = 3;
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xc9ddff, 1.1);
    fill.position.set(9, 7, -5);
    this.scene.add(fill);
    const pmrem = new THREE.PMREMGenerator(this.renderer),
      room = new RoomEnvironment();
    this.env = pmrem.fromScene(room, 0.04);
    this.scene.environment = this.env.texture;
    this.scene.environmentIntensity = 0.5;
    room.dispose();
    pmrem.dispose();
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.ShadowMaterial({ opacity: 0.105, color: 0x172238 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.028;
    floor.receiveShadow = true;
    this.scene.add(floor);
    this.floor = floor;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;
    this.controls.enablePan = false;
    this.controls.minPolarAngle = 0.08;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 40;
    this.controls.addEventListener("change", () => this.render());
    this.controls.enabled = interactive;
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.setContainer(container);
    this.renderer.domElement.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.lost = true;
      this.container?.classList.add("ss3d-lost");
    });
  }
  setContainer(container) {
    this.container = container;
    if (container) {
      container.append(this.renderer.domElement);
      this.resizeObserver.disconnect();
      this.resizeObserver.observe(container);
      this.resize();
    }
  }
  resize() {
    if (!this.container) return;
    const r = this.container.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    this.renderer.setSize(r.width, r.height, false);
    this.camera.aspect = r.width / r.height;
    this.camera.updateProjectionMatrix();
    this.render();
  }
  render() {
    if (this.lost) return;
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = null;
      if (!this.lost) this.renderer.render(this.scene, this.camera);
    });
  }
  setModel(group) {
    if (this.model) {
      this.scene.remove(this.model);
      this.model.traverse((o) => {
        if (o.userData.temporaryMaterial) o.material.dispose();
      });
    }
    this.model = group;
    this.scene.add(group);
    this.render();
  }
  frameModel(group, scale = 1.25) {
    const box = new THREE.Box3().setFromObject(group),
      size = box.getSize(new THREE.Vector3()),
      center = box.getCenter(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z, 1);
    this.controls.target.copy(center);
    this.camera.position
      .copy(center)
      .add(
        new THREE.Vector3(1.25, 1, 1.5)
          .normalize()
          .multiplyScalar(radius * 2.35 * scale),
      );
    this.camera.zoom = 1;
    this.camera.updateProjectionMatrix();
    this.controls.update();
    this.initial = {
      position: this.camera.position.clone(),
      target: this.controls.target.clone(),
    };
    this.render();
  }
  reset() {
    if (!this.initial) return;
    this.camera.position.copy(this.initial.position);
    this.controls.target.copy(this.initial.target);
    this.camera.zoom = 1;
    this.camera.updateProjectionMatrix();
    this.controls.update();
    this.render();
  }
  rotate(delta = 0, top = false) {
    const v = this.camera.position.clone().sub(this.controls.target),
      s = new THREE.Spherical().setFromVector3(v);
    s.theta += delta;
    if (top) s.phi = 0.12;
    else s.phi = THREE.MathUtils.clamp(s.phi, 0.15, 1.45);
    this.camera.position.copy(
      new THREE.Vector3().setFromSpherical(s).add(this.controls.target),
    );
    this.controls.update();
    this.render();
  }
}
function thumb() {
  if (!thumbViewer) {
    const v = new Viewer(null, { thumbnail: true, interactive: false });
    v.renderer.setSize(1200, 800);
    v.camera = new THREE.OrthographicCamera(-1.5, 1.5, 1, -1, 0.01, 100);
    v.controls.dispose();
    thumbViewer = v;
  }
  return thumbViewer;
}
function renderImage(group, key) {
  if (imageCache.has(key)) return imageCache.get(key);
  const v = thumb();
  v.setModel(group);
  const box = new THREE.Box3().setFromObject(group),
    center = box.getCenter(new THREE.Vector3());
  v.camera.left = -1.5;
  v.camera.right = 1.5;
  v.camera.top = 1;
  v.camera.bottom = -1;
  v.camera.position.copy(center).add(new THREE.Vector3(8, 6.6, 10));
  v.camera.lookAt(center);
  v.camera.updateProjectionMatrix();
  v.camera.updateMatrixWorld();
  let factor = 0.1;
  for (const x of [box.min.x, box.max.x])
    for (const y of [box.min.y, box.max.y])
      for (const z of [box.min.z, box.max.z]) {
        const p = new THREE.Vector3(x, y, z).project(v.camera);
        factor = Math.max(factor, Math.abs(p.x), Math.abs(p.y));
      }
  factor *= 1.18;
  v.camera.left *= factor;
  v.camera.right *= factor;
  v.camera.top *= factor;
  v.camera.bottom *= factor;
  v.camera.updateProjectionMatrix();
  v.renderer.render(v.scene, v.camera);
  const image = v.renderer.domElement.toDataURL("image/png");
  imageCache.set(key, image);
  if (imageCache.size > 85) imageCache.delete(imageCache.keys().next().value);
  return image;
}
let queue = [],
  busy = false,
  renderFailed = false;
function enqueue(job) {
  queue.push(job);
  pump();
}
function pump() {
  if (busy || !queue.length || renderFailed) return;
  busy = true;
  const next = () => {
    const job = queue.shift();
    try {
      if (job?.element?.isConnected) job.run();
    } catch {
      renderFailed = true;
      document.querySelector(".ss-app")?.classList.add("ss3d-no-render");
    }
    busy = false;
    if (queue.length) pump();
  };
  if ("requestIdleCallback" in window)
    requestIdleCallback(next, { timeout: 700 });
  else setTimeout(next, 25);
}
function productImages(api) {
  if (!productObserver) {
    productObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            const el = e.target;
            productObserver.unobserve(el);
            enqueue({
              element: el,
              run: () => {
                const info = el.dataset.ssPart.split("|"),
                  p = api.products.find((p) => p.id === info[0]);
                if (!p) return;
                const image = renderImage(
                  part({ ...p, color: info[1] }),
                  "part:" + info.join(":"),
                );
                el.src = image;
                el.width = 1200;
                el.height = 800;
                el.classList.add("ss3d-rendered");
              },
            });
          }
      },
      { rootMargin: "250px" },
    );
  }
  for (const img of api.host.querySelectorAll("img[data-creation-key]")) {
    if (!img.dataset.creationKey || img.dataset.ssCreation) continue;
    const def = api
      .creations?.()
      .find((d) => d.key === img.dataset.creationKey);
    if (!def) continue;
    img.dataset.ssCreation = "1";
    enqueue({
      element: img,
      run: () => {
        img.src = renderImage(
          makeModel(def.layout, api.products),
          "creation:" + def.key,
        );
        img.width = 1200;
        img.height = 800;
        img.classList.add("ss3d-rendered");
      },
    });
  }
  for (const img of api.host.querySelectorAll('img[src*=".svg"]')) {
    if (img.dataset.ssPart) continue;
    const match = img.getAttribute("src").match(/\/(\d+)-([a-z]+)\.svg/);
    if (!match) continue;
    img.dataset.ssPart = match[1] + "|" + match[2];
    productObserver.observe(img);
  }
  if (!mutationObserver) {
    let scheduled = false;
    mutationObserver = new MutationObserver(() => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          productImages(hostApi);
        });
      }
    });
    mutationObserver.observe(api.host, { childList: true, subtree: true });
  }
}
function modelImage(container, layout, api, key, options = {}) {
  if (!container || container.dataset.ss3dModel === key) return;
  container.dataset.ss3dModel = key;
  enqueue({
    element: container,
    run: () => {
      const image = renderImage(
        makeModel(layout, api.products, options),
        "model:" +
          key +
          ":" +
          JSON.stringify(
            layout.map(({ key, x, y, z, r }) => ({ key, x, y, z, r })),
          ),
      );
      const existing = container.querySelector("svg");
      if (!existing) return;
      const img = document.createElement("img");
      img.src = image;
      img.width = 1200;
      img.height = 800;
      img.alt =
        locale === "de"
          ? "Dreidimensionale Baustein-Kreation im Studiolicht"
          : "Three-dimensional brick creation in studio lighting";
      existing.replaceWith(img);
    },
  });
}
function enhanceHome(api, layout) {
  const hero = api.host.querySelector("main:not(#ss-creative) .hero");
  if (!hero || hero.dataset.ss3dHome) return;
  hero.dataset.ss3dHome = "1";
  hero.classList.add("ss3d-home");
  hero.innerHTML = `<div class="wrap ss3d-home-grid"><div class="ss3d-home-copy"><div class="eyebrow">${t("heroTag")}</div><h1>${t(
    "heroTitle",
  )
    .split("\n")
    .map((s, i) => (i ? "<span>" + s + "</span>" : s))
    .join(
      "",
    )}</h1><p>${t("heroLead")}</p><div class="ss3d-home-actions"><a class="button" href="#build">${t("heroCta")} ↗</a><a class="textlink" href="#ss-catalog">${t("heroSecond")} →</a></div><div class="ss3d-home-mini"><span>01 / 03</span><b>${api.brand}</b><span>${locale === "de" ? "Deine Ideen haben Platz." : "Room for your imagination."}</span></div></div><div class="ss3d-home-art"><span class="ss3d-model-tag">${locale === "de" ? "VON EINER IDEE ZUM EIGENEN MODELL" : "FROM A LITTLE IDEA TO YOUR OWN CREATION"}</span><div class="ss3d-hero-view"></div><div class="ss3d-home-caption"><span>${t("heroCaption")}</span><button class="ss3d-hero-reset" aria-label="${t("reset")}">↺</button></div><small>${t("heroHelp")}</small></div></div>`;
  const entries = document.createElement("section");
  entries.className = "wrap ss3d-entry-grid";
  entries.setAttribute(
    "aria-label",
    locale === "de"
      ? "Drei Wege zu deinem Bauprojekt"
      : "Three ways to your next build",
  );
  entries.innerHTML = [
    ["ss-catalog", "entry1", "3001-red.svg", "01"],
    ["build", "entry2", "3003-yellow.svg", "02"],
    ["discover", "entry3", "3004-blue.svg", "03"],
  ]
    .map(
      ([route, title, img, n]) =>
        `<a href="#${route}" class="ss3d-entry"><div><span>${n}</span><h2>${t(title)}</h2><p>${t(title + "sub")}</p><b>${t("entryCta")} ↗</b></div><img src="${api.assetBase + img}" width="480" height="320" alt=""></a>`,
    )
    .join("");
  hero.after(entries);
  const container = hero.querySelector(".ss3d-hero-view");
  try {
    if (!heroViewer) {
      heroViewer = new Viewer(container);
      heroViewer.renderer.domElement.setAttribute(
        "aria-label",
        locale === "de"
          ? "Drehbare 3D-Ansicht des kleinen Eckhauses"
          : "Rotatable 3D view of the little corner house",
      );
    } else heroViewer.setContainer(container);
    const g = makeModel(layout, api.products);
    heroViewer.setModel(g);
    heroViewer.frameModel(g, 0.98);
    heroViewer.renderer.domElement.setAttribute(
      "aria-label",
      locale === "de"
        ? "Drehbare 3D-Ansicht des kleinen Eckhauses"
        : "Rotatable 3D view of the little corner house",
    );
    if (!heroAssembled) {
      const watch = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting) && !heroAssembled) {
            heroAssembled = true;
            assemble(heroViewer, heroViewer.model);
            watch.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      watch.observe(hero);
    }
    heroViewer.controls.enableZoom = false;
    heroViewer.renderer.domElement.style.touchAction = "pan-y";
    hero.querySelector(".ss3d-hero-reset").onclick = () => heroViewer.reset();
  } catch {
    container.innerHTML = api.preview(layout);
    hero.classList.add("ss3d-fallback");
    hero.querySelector(".ss3d-home-art>small").textContent = t("fallback");
    hero.querySelector(".ss3d-hero-reset").disabled = true;
  }
}
function mountBuilder(container, input) {
  if (!container) return;
  const fallback = container.querySelector("#cs-drawing");
  if (!fallback) return;
  let viewport = container.querySelector(".ss3d-builder-view");
  if (!viewport) {
    viewport = document.createElement("div");
    viewport.className = "ss3d-builder-view";
    container.prepend(viewport);
  }
  if (builderFailed) {
    viewport.remove();
    fallback.hidden = false;
    return;
  }
  try {
    if (!builderViewer) {
      builderViewer = new Viewer(viewport);
      setupBuilderEvents(builderViewer);
    } else builderViewer.setContainer(viewport);
  } catch {
    builderFailed = true;
    viewport.remove();
    fallback.hidden = false;
    container.classList.add("ss3d-fallback");
    const msg = document.createElement("p");
    msg.className = "ss3d-unavailable-message";
    msg.textContent = t("fallback");
    msg.setAttribute("role", "status");
    container.after(msg);
    return;
  }
  const v = builderViewer;
  v.input = input;
  v.fallback = fallback;
  viewport.hidden = !!v.use2d;
  fallback.hidden = !v.use2d;
  v.renderer.domElement.className = "ss3d-canvas";
  v.renderer.domElement.tabIndex = 0;
  v.renderer.domElement.setAttribute("role", "application");
  v.renderer.domElement.setAttribute("aria-label", t("canvas"));
  v.renderer.domElement.setAttribute("aria-describedby", "cs-key-help");
  const state = input.state(),
    signature = JSON.stringify(state.layout);
  if (v.signature !== signature) {
    const newIds = v.previousIds
      ? new Set(
          state.layout
            .filter((b) => !v.previousIds.has(b.uid))
            .map((b) => b.uid),
        )
      : null;
    v.setModel(makeModel(state.layout, hostApi.products));
    v.previousIds = new Set(state.layout.map((b) => b.uid));
    if (newIds?.size) assemble(v, v.model, newIds, 260);
    v.signature = signature;
  }
  if (!v.base) {
    const base = new THREE.Mesh(
      new RoundedBoxGeometry(12.1, 0.14, 12.1, 2, 0.07),
      new THREE.MeshPhysicalMaterial({
        color: 0xe1e6df,
        roughness: 0.45,
        clearcoat: 0.15,
      }),
    );
    base.position.y = -0.11;
    base.receiveShadow = true;
    v.scene.add(base);
    const geo = new THREE.CylinderGeometry(0.14, 0.14, 0.06, 18),
      mat = new THREE.MeshStandardMaterial({
        color: 0xc3ccc0,
        roughness: 0.45,
      });
    const studs = new THREE.InstancedMesh(geo, mat, 144),
      m = new THREE.Matrix4();
    for (let x = 0; x < 12; x++)
      for (let y = 0; y < 12; y++) {
        m.makeTranslation(x - 5.5, -0.005, y - 5.5);
        studs.setMatrixAt(x * 12 + y, m);
      }
    studs.receiveShadow = true;
    v.scene.add(studs);
    v.base = base;
    v.controls.target.set(0, 1.4, 0);
    v.camera.position.set(15, 14, 17);
    v.controls.minDistance = 8;
    v.controls.maxDistance = 38;
    v.controls.update();
    v.initial = {
      position: v.camera.position.clone(),
      target: v.controls.target.clone(),
    };
  }
  let tools = container.querySelector(".ss3d-view-tools");
  if (!tools) {
    tools = document.createElement("div");
    tools.className = "ss3d-view-tools";
    container.append(tools);
  }
  tools.innerHTML = `<button data-view="left" aria-label="${t("left")}" title="${t("left")}">↶</button><button data-view="top" aria-label="${t("top")}" title="${t("top")}">▱</button><button data-view="right" aria-label="${t("right")}" title="${t("right")}">↷</button><button data-view="reset" aria-label="${t("reset")}" title="${t("reset")}">⌂</button><button data-view="2d">${t(v.use2d ? "three" : "two")}</button>`;
  tools.dataset.mode = v.use2d ? "2d" : "3d";
  tools.onclick = (e) => {
    const b = e.target.closest("[data-view]");
    if (!b) return;
    const a = b.dataset.view;
    if (a === "reset") v.reset();
    else if (a === "left") v.rotate(-Math.PI / 6);
    else if (a === "right") v.rotate(Math.PI / 6);
    else if (a === "top") v.rotate(0, true);
    else {
      v.use2d = !v.use2d;
      const showing = v.use2d;
      viewport.hidden = showing;
      fallback.hidden = !showing;
      tools.dataset.mode = showing ? "2d" : "3d";
      b.textContent = t(showing ? "three" : "two");
      const help = container
        .closest(".cs-board-wrap")
        .querySelector("#cs-key-help");
      if (help)
        help.textContent = showing
          ? input.twoDHelp
          : t("rotate") + ". " + t("validKey");
      container
        .querySelector(".ss3d-preview")
        ?.classList.toggle("is-hidden", showing);
    }
  };
  let preview = container.querySelector(".ss3d-preview");
  if (!preview) {
    preview = document.createElement("div");
    preview.className = "ss3d-preview";
    container.append(preview);
  }
  preview.innerHTML = `<i></i><span>${t("snap")}</span>`;
  const keyHelp = container
    .closest(".cs-board-wrap")
    .querySelector("#cs-key-help");
  if (keyHelp)
    keyHelp.textContent = v.use2d
      ? input.twoDHelp
      : t("rotate") + ". " + t("validKey");
  preview.classList.toggle("is-hidden", !!v.use2d);
  v.camera.zoom = state.zoom || 1;
  v.camera.updateProjectionMatrix();
  updateGhost(v);
  v.resize();
}
function updateGhost(v) {
  if (!v.input) return;
  const s = v.input.state(),
    p = hostApi.products.find((p) => p.key === s.variant);
  if (!p) return;
  const key = p.key + "|" + s.rotation;
  if (v.ghostKey !== key) {
    if (v.ghost) {
      v.scene.remove(v.ghost);
      v.ghost.traverse((o) => {
        if (o.isMesh) o.material.dispose();
      });
    }
    const g = part(p);
    g.traverse((o) => {
      if (o.isMesh) {
        o.material = o.material.clone();
        o.material.transparent = true;
        o.material.opacity = 0.4;
        o.material.depthWrite = false;
        o.castShadow = false;
      }
    });
    g.rotation.y = s.rotation ? Math.PI / 2 : 0;
    v.scene.add(g);
    v.ghost = g;
    v.ghostKey = key;
    if (v.outline) {
      v.scene.remove(v.outline);
      v.outline.geometry.dispose();
      v.outline.material.dispose();
    }
    v.outline = new THREE.BoxHelper(g, 0x168b62);
    v.scene.add(v.outline);
  }
  if (!v.selectedOutline) {
    v.selectedOutline = new THREE.Box3Helper(new THREE.Box3(), 0x0759bf);
    v.scene.add(v.selectedOutline);
  }
  const selectedBox = v.model?.userData.partBoxes?.[s.selected];
  v.selectedOutline.visible = !!selectedBox && s.tool === "select";
  if (selectedBox) v.selectedOutline.box.copy(selectedBox);
  const w = s.rotation ? p.ny : p.nx,
    d = s.rotation ? p.nx : p.ny;
  v.ghost.position.set(
    s.cursor.x + w / 2 - 6,
    s.layer * UNIT_H,
    s.cursor.y + d / 2 - 6,
  );
  v.ghost.updateMatrixWorld(true);
  const error = v.input.check({
    ...s.cursor,
    z: s.layer,
    r: s.rotation,
    key: s.variant,
  });
  v.ghost.visible = s.tool === "place";
  v.outline.visible = v.ghost.visible;
  v.outline.setFromObject(v.ghost);
  v.outline.material.color.set(error ? 0xd74735 : 0x168b62);
  const preview = v.container.parentElement.querySelector(".ss3d-preview");
  if (preview) {
    preview.classList.toggle("invalid", !!error);
    preview.querySelector("span").textContent =
      s.tool === "place"
        ? error
          ? t("invalid") + " · " + v.input.errorText(error)
          : t("ready")
        : t("rotate");
  }
  v.render();
}
function setupBuilderEvents(v) {
  const canvas = v.renderer.domElement,
    ray = new THREE.Raycaster(),
    pointer = new THREE.Vector2();
  let down = null,
    multiTouch = false;
  const activePointers = new Set();
  const position = (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      (-(e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    ray.setFromCamera(pointer, v.camera);
    const state = v.input.state(),
      plane = new THREE.Plane(
        new THREE.Vector3(0, 1, 0),
        -state.layer * UNIT_H,
      ),
      hit = ray.ray.intersectPlane(plane, new THREE.Vector3());
    if (!hit) return null;
    return { x: Math.floor(hit.x + 6), y: Math.floor(hit.z + 6) };
  };
  canvas.addEventListener("pointerdown", (e) => {
    activePointers.add(e.pointerId);
    if (activePointers.size > 1) {
      multiTouch = true;
      down = null;
      return;
    }
    down = { x: e.clientX, y: e.clientY, button: e.button };
    canvas.focus({ preventScroll: true });
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!v.input || multiTouch) return;
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
    const pos = position(e);
    if (pos && pos.x >= 0 && pos.y >= 0 && pos.x < 12 && pos.y < 12) {
      v.input.cursor(pos);
      updateGhost(v);
    }
  });
  canvas.addEventListener("pointerup", (e) => {
    activePointers.delete(e.pointerId);
    if (multiTouch) {
      if (!activePointers.size) multiTouch = false;
      down = null;
      return;
    }
    if (!down) return;
    const click =
      down.button === 0 &&
      Math.hypot(e.clientX - down.x, e.clientY - down.y) < 7;
    down = null;
    if (!click) return;
    const pos = position(e);
    if (!pos) return;
    const state = v.input.state();
    if (state.tool === "select") {
      const hits = ray.intersectObject(v.model, true);
      if (hits.length) {
        const hit = hits[0];
        let obj = hit.object;
        const instanceUid = obj.isInstancedMesh
          ? obj.userData.uids?.[hit.instanceId]
          : null;
        while (obj && !obj.userData.uid) obj = obj.parent;
        const id = instanceUid || obj?.userData.uid;
        if (id) {
          v.input.select(id);
          v.renderer.domElement.focus({ preventScroll: true });
          return;
        }
      }
      v.input.cursor(pos);
      updateGhost(v);
    } else {
      v.input.place(pos);
      v.renderer.domElement.focus({ preventScroll: true });
    }
  });
  canvas.addEventListener("pointercancel", (e) => {
    activePointers.delete(e.pointerId);
    down = null;
    if (!activePointers.size) multiTouch = false;
  });
  canvas.addEventListener("keydown", (e) => {
    if (e.altKey && ["ArrowLeft", "ArrowRight", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      v.rotate(
        e.key === "ArrowLeft" ? -0.22 : e.key === "ArrowRight" ? 0.22 : 0,
        e.key === "ArrowUp",
      );
    }
  });
}

function productPreview(container, p) {
  if (!container) return;
  try {
    if (!productViewer) productViewer = new Viewer(container);
    else productViewer.setContainer(container);
    const fallback = container.querySelector("img");
    if (fallback) fallback.hidden = true;
    const v = productViewer,
      g = part(p);
    v.setModel(g);
    if (v.productId !== p.id) {
      v.frameModel(g, 0.9);
      v.productId = p.id;
    }
    v.renderer.domElement.setAttribute("role", "img");
    v.renderer.domElement.setAttribute(
      "aria-label",
      locale === "de" ? "Drehbare Produktansicht" : "Rotatable product view",
    );
    v.renderer.domElement.style.touchAction = "pan-y";
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
      v.renderer.domElement.animate?.([{ opacity: 0.35 }, { opacity: 1 }], {
        duration: 240,
      });
    v.resize();
  } catch {}
}
function productView(view) {
  const v = productViewer;
  if (!v) return;
  if (view === "iso") {
    v.reset();
    return;
  }
  const c = v.controls.target,
    dist = v.camera.position.distanceTo(c);
  v.camera.position
    .copy(c)
    .add(
      view === "front"
        ? new THREE.Vector3(0, 0.15, dist)
        : view === "side"
          ? new THREE.Vector3(dist, 0.15, 0)
          : new THREE.Vector3(0, dist, 0.01),
    );
  v.controls.update();
  v.render();
}
function assemble(viewer, group, ids = null, duration = 700) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const sets = [];
  group.traverse((o) => {
    if (!o.isInstancedMesh) return;
    const originals = [];
    for (let i = 0; i < o.count; i++) {
      const id = o.userData.uids?.[i];
      if (ids && !ids.has(id)) continue;
      const m = new THREE.Matrix4();
      o.getMatrixAt(i, m);
      originals.push({ i, m, id });
    }
    if (originals.length) sets.push({ mesh: o, originals });
  });
  if (!sets.length) return;
  const start = performance.now();
  const frame = (now) => {
    if (viewer.model !== group) return;
    let active = false;
    for (const b of sets) {
      for (const e of b.originals) {
        let hash = 0;
        for (const ch of String(e.id)) hash = (hash + ch.charCodeAt(0)) % 11;
        const delay = ids ? 0 : hash * 17,
          progress = THREE.MathUtils.clamp(
            (now - start - delay) / duration,
            0,
            1,
          ),
          ease = 1 - Math.pow(1 - progress, 3),
          m = e.m.clone();
        m.elements[13] += (ids ? 0.7 : 1.7) * (1 - ease);
        b.mesh.setMatrixAt(e.i, m);
        if (progress < 1) active = true;
      }
      b.mesh.instanceMatrix.needsUpdate = true;
    }
    viewer.render();
    if (active) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
function refresh(api) {
  hostApi = api;
  locale = api.language() === "de" ? "de" : "en";
  productImages(api);
}
window.StudStack3D = {
  refresh,
  home: enhanceHome,
  builder: mountBuilder,
  image: modelImage,
  product: productPreview,
  productView,
  zoom: (value) => {
    if (builderViewer) {
      builderViewer.camera.zoom = value;
      builderViewer.camera.updateProjectionMatrix();
      builderViewer.render();
    }
  },
  labels: () => text[locale],
  fallback: () => t("fallback"),
};
window.dispatchEvent(new Event("studstack3d-ready"));
