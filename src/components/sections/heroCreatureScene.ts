/* The three.js scene behind <HeroCreature />: two koi seen from above, as if
   the hero were a pond — a Kohaku (white with red) and an Asagi (blue net
   back, orange flanks). Each body is rebuilt every frame around a spine that
   follows its own head, so a turn travels down the body by itself; the tail
   beats in short strokes and the fish glides between them. Skin, scales and
   fins are painted into textures on load, a little at a time so the page
   stays responsive — there are no models or images to download. */

import {
  ACESFilmicToneMapping,
  BufferAttribute,
  BufferGeometry,
  DataTexture,
  DirectionalLight,
  DoubleSide,
  DynamicDrawUsage,
  Fog,
  HemisphereLight,
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  RepeatWrapping,
  RingGeometry,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* The hero's navy (--canvas inside .tone-ink). Fog fades toward it, so a koi
   swimming deeper sinks into the background instead of greying. */
const NAVY = 0x0c1830;
const CAMERA_Z = 10;
/** The cursor's plane — koi rise to it when they come for the cursor. */
const SURFACE_Z = 0.4;
/** How deep they swim while passing under the hero copy, so it stays legible. */
const UNDER_COPY_Z = -1.4;
/** The pond floor their shadows fall on. */
const FLOOR_Z = -2;

/** Body length as a share of the hero's shorter side. */
const KOI_SIZE = 0.34;
/* Body: spine points, vertices round each, cross-section height over width. */
const RINGS = 48;
const SIDES = 24;
const DEPTH = 1.1;
/* Tail fin: rows down it, columns across it, length in body lengths. */
const TAIL_ROWS = 12;
const TAIL_COLS = 9;
const TAIL_LENGTH = 0.3;
const DORSAL_ROWS = 4;
const DORSAL_COLS = 12;
/** Pectoral, then pelvic fins: where they sit, length, grid, how wide they open. */
const SIDE_FINS = [
  { at: 0.19, length: 0.2, rows: 6, cols: 6, spread: 1.4 },
  { at: 0.5, length: 0.11, rows: 5, cols: 4, spread: 1 },
] as const;

/* Speeds in body lengths per second, turn rates in rad/s. */
const CRUISE = 0.38;
const CHASE = 1.1;
const DASH = 1.6;
const HOVER = 0.1;
const TURN = 1.1;
const CHASE_TURN = 2.4;
/** Sideways reach of the tail beat, in body lengths. */
const TAIL_SWING = 0.075;

/* Skin texture: along the body × around it. Scales: length along the body
   and spacing around it, in body lengths. */
const SKIN_W = 1024;
const SKIN_H = 512;
const FIN_TEX = 256;
const SCALE_X = 1 / 34;
const SCALE_Y = 0.045;

/** Soft shadow: the same silhouette drawn a few times, slightly apart. */
const SHADOW_TAPS = [
  [0, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [0.7, 0.7],
  [-0.7, -0.7],
] as const;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

const hash = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const noise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};
const fbm = (x: number, y: number) =>
  0.5 * noise(x, y) + 0.3 * noise(x * 2.1, y * 2.1) + 0.2 * noise(x * 4.3, y * 4.3);

/** Half-width seen from above at t (0 snout → 1 tail root), in body lengths:
    a blunt head, full shoulders at a third, tapering late to a slim tail root. */
const bodyWidth = (t: number) =>
  0.108 *
  Math.sin((Math.min(t / 0.3, 1) * Math.PI) / 2) ** 0.6 *
  (1 - 0.77 * smoothstep(0.32, 1.05, t) ** 1.4);

/* ---------------------------------------------------------------------------
   Skin and fin textures
   ------------------------------------------------------------------------ */

/** One skin texel, as the painters see it. */
interface Texel {
  /** Along the body, 0 snout → 1 tail root. */
  t: number;
  /** Round the body, 0 on the back → 1 on the belly. */
  side: number;
  /** Body lengths from the spine, round the body. */
  around: number;
  /** 0 at the centre of the scale on top → 1 at its free edge. */
  edge: number;
  /** 0 on the scaleless head → 1 where the scales start. */
  scaled: number;
  /** The gill cover's edge. */
  gill: number;
  /** Where the scale on top sits, so colour can follow whole scales. */
  scaleT: number;
  scaleAround: number;
}

type Rgb = [number, number, number];
type SkinPainter = (out: Rgb, s: Texel) => void;

interface Variety {
  skin: SkinPainter;
  /** Fin colour from root (0) to tip (1). */
  fin: (out: Rgb, u: number) => void;
}

/** Hi (red) plates: [t, around, length, width], in body lengths. */
type Plate = readonly [number, number, number, number];
const KOHAKU_PLATES: readonly Plate[] = [
  [0.1, 0, 0.05, 0.075],
  [0.3, 0.03, 0.085, 0.15],
  [0.47, -0.04, 0.07, 0.14],
  [0.63, 0.02, 0.075, 0.11],
  [0.79, -0.01, 0.035, 0.05],
];

const plateAt = (t: number, around: number) => {
  let hi = 0;
  for (const [pt, pa, length, width] of KOHAKU_PLATES) {
    const d = Math.hypot((t - pt) / length, (around - pa) / width);
    if (d > 1.5) continue;
    const ragged = d + 0.3 * (fbm(t * 11 + 3.1, around * 11) - 0.5);
    hi = Math.max(hi, 1 - smoothstep(0.9, 1, ragged));
  }
  return hi;
};

const KOHAKU: Variety = {
  skin: (out, s) => {
    // Half read at the scale itself, so a plate's outline scallops along the
    // scales the way a real kohaku's does; on the scaleless head it stays smooth.
    const hi =
      lerp(plateAt(s.t, s.around), plateAt(s.scaleT + SCALE_X * 0.5, s.scaleAround), s.scaled * 0.5) *
      smoothstep(0.78, 0.5, s.side);
    const thick = fbm(s.t * 9, s.around * 9);
    const belly = smoothstep(0.55, 1, s.side);
    const lips = (1 - smoothstep(0.005, 0.03, s.t)) * 0.55;
    const shade =
      1 - s.scaled * smoothstep(0.6, 1, s.edge) * (0.04 + 0.08 * hi) - s.gill * 0.12;
    out[0] = lerp(lerp(lerp(246, 238, belly), lerp(222, 184, thick), hi), 230, lips) * shade;
    out[1] = lerp(lerp(lerp(242, 222, belly), lerp(70, 38, thick), hi), 150, lips) * shade;
    out[2] = lerp(lerp(lerp(235, 216, belly), lerp(38, 22, thick), hi), 140, lips) * shade;
  },
  fin: (out) => {
    out[0] = 242;
    out[1] = 244;
    out[2] = 248;
  },
};

const ASAGI: Variety = {
  skin: (out, s) => {
    // Pale-centred blue scales with dark edges: the net down the back.
    const net = smoothstep(0.35, 1, s.edge) * s.scaled;
    let r = lerp(lerp(222, 168, s.scaled), 58, net);
    let g = lerp(lerp(228, 188, s.scaled), 84, net);
    let b = lerp(lerp(234, 212, s.scaled), 128, net);
    // Orange up the flanks and over the cheeks, a pale belly below.
    const flank = smoothstep(0.38, 0.62, s.side + 0.08 * (fbm(s.t * 14, s.side * 6) - 0.5));
    const cheek = (1 - smoothstep(0.12, 0.2, s.t)) * smoothstep(0.25, 0.5, s.side);
    const hi = Math.max(flank, cheek);
    const belly = smoothstep(0.82, 1, s.side);
    const shade = 1 - s.gill * 0.14;
    r = lerp(lerp(r, 214, hi), 236, belly) * shade;
    g = lerp(lerp(g, 96, hi), 222, belly) * shade;
    b = lerp(lerp(b, 50, hi), 210, belly) * shade;
    out[0] = r;
    out[1] = g;
    out[2] = b;
  },
  // Orange at the root of every fin, fading to clear.
  fin: (out, u) => {
    const root = 1 - smoothstep(0.05, 0.45, u);
    out[0] = lerp(226, 214, root);
    out[1] = lerp(232, 104, root);
    out[2] = lerp(240, 58, root);
  },
};

const pause = () => new Promise<void>((resolve) => setTimeout(resolve));

/** Calls each(i) for every i < count, handing control back to the page every
    few milliseconds. Resolves false if the scene was torn down meanwhile. */
async function sliced(count: number, each: (i: number) => void, alive: () => boolean) {
  let start = performance.now();
  for (let i = 0; i < count; i++) {
    each(i);
    if (performance.now() - start > 8) {
      await pause();
      if (!alive()) return false;
      start = performance.now();
    }
  }
  return true;
}

interface ScaleField {
  edge: Float32Array;
  scaled: Float32Array;
  gill: Float32Array;
  scaleT: Float32Array;
  scaleAround: Float32Array;
  height: Float32Array;
}

/** Lays overlapping scales over the skin, shared by both koi. Scales sit in
    staggered rings round the body, each ring half a scale off the one before;
    the ring in front lies on top, so each shows as a scallop whose free edge
    trails toward the tail. */
async function buildScales(alive: () => boolean): Promise<ScaleField | null> {
  const size = SKIN_W * SKIN_H;
  const field: ScaleField = {
    edge: new Float32Array(size),
    scaled: new Float32Array(size),
    gill: new Float32Array(size),
    scaleT: new Float32Array(size),
    scaleAround: new Float32Array(size),
    height: new Float32Array(size),
  };
  const girth = Array.from(
    { length: SKIN_W },
    (_, x) => Math.PI * bodyWidth((x + 0.5) / SKIN_W) * (1 + DEPTH)
  );
  const done = await sliced(
    SKIN_H,
    (y) => {
      const v = (y + 0.5) / SKIN_H;
      const side = Math.abs(v - 0.5) * 2;
      for (let x = 0; x < SKIN_W; x++) {
        const t = (x + 0.5) / SKIN_W;
        const around = (v - 0.5) * girth[x];
        // Neighbours in a ring just touch; the ring in front covers the joins.
        const i0 = Math.round(t / SCALE_X);
        let topI = Infinity;
        let topD = 1;
        let topT = t;
        let topAround = around;
        for (let i = i0 - 1; i <= i0 + 1; i++) {
          const stagger = (i & 1) * 0.5;
          const ct = i * SCALE_X;
          const j0 = Math.round(around / SCALE_Y - stagger);
          for (let j = j0 - 1; j <= j0 + 1; j++) {
            const ca = (j + stagger) * SCALE_Y;
            const d = Math.hypot((t - ct) / SCALE_X, (around - ca) / (SCALE_Y * 0.52));
            if (d < 1 && (i < topI || (i === topI && d < topD))) {
              topI = i;
              topD = d;
              topT = ct;
              topAround = ca;
            }
          }
        }
        const k = y * SKIN_W + x;
        const scaled = smoothstep(0.17, 0.23, t);
        const gill =
          Math.exp(-(((t - 0.165 - 0.06 * side * side) / 0.007) ** 2)) * smoothstep(0.15, 0.45, side);
        field.edge[k] = topD;
        field.scaled[k] = scaled;
        field.gill[k] = gill;
        field.scaleT[k] = topT;
        field.scaleAround[k] = topAround;
        field.height[k] = scaled * (1 - 0.5 * topD * topD) + gill * 0.8;
      }
    },
    alive
  );
  return done ? field : null;
}

function makeTexture(data: Uint8Array, width: number, height: number, color: boolean, anisotropy: number) {
  const texture = new DataTexture(data, width, height);
  if (color) texture.colorSpace = SRGBColorSpace;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

/** Normal map from the scale heights: each scale bulges, its edge drops. */
async function paintNormals(field: ScaleField, alive: () => boolean) {
  const data = new Uint8Array(SKIN_W * SKIN_H * 4);
  const h = field.height;
  const done = await sliced(
    SKIN_H,
    (y) => {
      const up = ((y + 1) % SKIN_H) * SKIN_W;
      const down = ((y - 1 + SKIN_H) % SKIN_H) * SKIN_W;
      const row = y * SKIN_W;
      for (let x = 0; x < SKIN_W; x++) {
        const nx = -(h[row + Math.min(x + 1, SKIN_W - 1)] - h[row + Math.max(x - 1, 0)]) * 0.8;
        const ny = -(h[up + x] - h[down + x]) * 0.8;
        const len = Math.hypot(nx, ny, 1);
        const k = (row + x) * 4;
        data[k] = (nx / len) * 127.5 + 127.5;
        data[k + 1] = (ny / len) * 127.5 + 127.5;
        data[k + 2] = (1 / len) * 127.5 + 127.5;
        data[k + 3] = 255;
      }
    },
    alive
  );
  return done ? data : null;
}

async function paintSkin(variety: Variety, field: ScaleField, alive: () => boolean) {
  const data = new Uint8Array(SKIN_W * SKIN_H * 4);
  const rgb: Rgb = [0, 0, 0];
  const s: Texel = { t: 0, side: 0, around: 0, edge: 0, scaled: 0, gill: 0, scaleT: 0, scaleAround: 0 };
  const girth = Array.from(
    { length: SKIN_W },
    (_, x) => Math.PI * bodyWidth((x + 0.5) / SKIN_W) * (1 + DEPTH)
  );
  const done = await sliced(
    SKIN_H,
    (y) => {
      const v = (y + 0.5) / SKIN_H;
      s.side = Math.abs(v - 0.5) * 2;
      for (let x = 0; x < SKIN_W; x++) {
        const k = y * SKIN_W + x;
        s.t = (x + 0.5) / SKIN_W;
        s.around = (v - 0.5) * girth[x];
        s.edge = field.edge[k];
        s.scaled = field.scaled[k];
        s.gill = field.gill[k];
        s.scaleT = field.scaleT[k];
        s.scaleAround = field.scaleAround[k];
        variety.skin(rgb, s);
        data[k * 4] = rgb[0];
        data[k * 4 + 1] = rgb[1];
        data[k * 4 + 2] = rgb[2];
        data[k * 4 + 3] = 255;
      }
    },
    alive
  );
  return done ? data : null;
}

/** Fin membrane: rays that fork toward the tip, clear between them, with a
    soft, ragged edge. x runs root → tip, y across the rays. */
function paintFin(variety: Variety) {
  const data = new Uint8Array(FIN_TEX * FIN_TEX * 4);
  const rgb: Rgb = [0, 0, 0];
  const ray = (v: number, count: number) =>
    1 - smoothstep(0, 0.24, Math.abs(((v * count) % 1) - 0.5) * 2);
  for (let y = 0; y < FIN_TEX; y++) {
    const v = (y + 0.5) / FIN_TEX;
    for (let x = 0; x < FIN_TEX; x++) {
      const u = (x + 0.5) / FIN_TEX;
      const rays = lerp(ray(v, 13), ray(v, 26), smoothstep(0.5, 0.7, u));
      let alpha = lerp(0.62, 0.26, u) + rays * 0.24 * (1 - 0.4 * u);
      alpha *= 1 - smoothstep(0.84 + 0.08 * noise(v * 11, 1.7), 1, u);
      alpha *= smoothstep(0, 0.06, v) * smoothstep(1, 0.94, v);
      variety.fin(rgb, u);
      const k = (y * FIN_TEX + x) * 4;
      data[k] = lerp(rgb[0], 255, rays * 0.3);
      data[k + 1] = lerp(rgb[1], 255, rays * 0.3);
      data[k + 2] = lerp(rgb[2], 255, rays * 0.3);
      data[k + 3] = clamp(alpha, 0, 1) * 255;
    }
  }
  return data;
}

/* ---------------------------------------------------------------------------
   Light through the water: moving caustics on whatever faces up
   ------------------------------------------------------------------------ */

const water = { time: { value: 0 } };

const CAUSTIC_GLSL = /* glsl */ `
varying vec3 vPond;
uniform float uTime;
uniform float uCaustics;
float caustic(vec2 p, float t) {
  p *= 3.4;
  vec2 q = p + 0.55 * vec2(sin(p.y * 1.3 + t * 0.7), cos(p.x * 1.1 - t * 0.6));
  float a = sin(q.x * 2.9 + t * 0.9) + sin(q.y * 3.3 - t * 0.8) + sin((q.x - q.y) * 2.2 + t * 0.6);
  float b = sin(q.x * 4.7 - t * 1.1) + sin((q.x + q.y) * 3.9 + t * 0.5);
  return pow(1.0 - abs(a) / 3.0, 7.0) * 0.7 + pow(1.0 - abs(b) / 2.0, 9.0) * 0.5;
}
`;

/** Adds the caustics to a material. Geometry here is built in world space,
    so `position` is already where the fragment sits in the pond. */
function withCaustics(material: MeshPhysicalMaterial, strength: number) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = water.time;
    shader.uniforms.uCaustics = { value: strength };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vPond;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvPond = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${CAUSTIC_GLSL}`)
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        totalEmissiveRadiance += vec3(0.82, 0.92, 1.0) * uCaustics * caustic(vPond.xy, uTime)
          * clamp(normal.z, 0.0, 1.0) * smoothstep(-1.8, 0.4, vPond.z);`
      );
  };
  return material;
}

/* ---------------------------------------------------------------------------
   A koi
   ------------------------------------------------------------------------ */

interface Member {
  variety: Variety;
  scale: number;
  /** -1 swims in from the left, 1 from the right. */
  from: number;
  /** How far off-screen it starts, in body lengths — staggers the entrances. */
  lead: number;
  /** Index of a koi it likes to swim beside. */
  leader?: number;
}

const CAST: readonly Member[] = [
  { variety: KOHAKU, scale: 1, from: -1, lead: 0.3 },
  { variety: ASAGI, scale: 0.82, from: 1, lead: 2.4, leader: 0 },
];

interface Look {
  skin: MeshPhysicalMaterial;
  fin: MeshPhysicalMaterial;
  eye: MeshPhysicalMaterial;
  eyeGeometry: SphereGeometry;
  shadow: MeshBasicMaterial;
  finShadow: MeshBasicMaterial;
}

interface World {
  /** Half-extents of the visible surface, and the hero's shorter side. */
  hw: number;
  hh: number;
  unit: number;
  /** 0–1: how far p is under the hero copy, easing in over `pad`. */
  underCopy: (p: Vector3, pad: number) => number;
  /** Food if there is some, else the cursor while it moves, else nothing. */
  lure: (now: number) => { at: Vector3; dash: boolean } | null;
  koi: { head: Vector3; escort: Vector3 }[];
}

const tmp = new Vector3();
const tmp2 = new Vector3();
const tmp3 = new Vector3();
const dirV = new Vector3();

function createKoi(member: Member, look: Look, scene: Scene) {
  const n = RINGS + TAIL_ROWS;
  const vectors = () => Array.from({ length: n }, () => new Vector3());
  const chain = vectors(); // where the spine is
  const spine = vectors(); // where it's drawn, tail beat included
  const T = vectors(); // toward the head
  const U = vectors(); // out of the back
  const S = vectors(); // out of the left flank
  /* t along the body for every spine point; tail-fin rows carry on past 1. */
  const ts = Array.from({ length: n }, (_, i) =>
    i < RINGS ? i / (RINGS - 1) : 1 + ((i - RINGS + 1) / TAIL_ROWS) * TAIL_LENGTH
  );
  const gaps = ts.map((t, i) => (i === 0 ? 0 : t - ts[i - 1]));
  const widths = ts.map((t) => bodyWidth(Math.min(t, 1)));
  /* Round each ring from the belly, so the texture's seam is out of sight. */
  const ringCos = Array.from({ length: SIDES + 1 }, (_, j) => Math.cos(-Math.PI / 2 + (j / SIDES) * Math.PI * 2));
  const ringSin = Array.from({ length: SIDES + 1 }, (_, j) => Math.sin(-Math.PI / 2 + (j / SIDES) * Math.PI * 2));

  const meshes: Mesh[] = [];
  const add = (mesh: Mesh) => {
    mesh.frustumCulled = false;
    scene.add(mesh);
    meshes.push(mesh);
    return mesh;
  };

  /* Body: a tube of rings round the spine. */
  const per = SIDES + 1;
  const body = new BufferGeometry();
  const bodyPos = new BufferAttribute(new Float32Array(RINGS * per * 3), 3).setUsage(DynamicDrawUsage);
  const bodyUv = new Float32Array(RINGS * per * 2);
  const bodyIndex: number[] = [];
  for (let i = 0; i < RINGS; i++) {
    for (let j = 0; j < per; j++) {
      const v = i * per + j;
      bodyUv[v * 2] = ts[i];
      bodyUv[v * 2 + 1] = j / SIDES;
      if (i < RINGS - 1 && j < SIDES) bodyIndex.push(v, v + per, v + 1, v + per, v + per + 1, v + 1);
    }
  }
  body.setAttribute("position", bodyPos);
  body.setAttribute("uv", new BufferAttribute(bodyUv, 2));
  body.setIndex(bodyIndex);
  add(new Mesh(body, look.skin));

  /* Fins: one geometry of small grids — tail, side fins, dorsal, barbels.
     Rows run along the rays (texture x), columns across them. */
  const finUv: number[] = [];
  const finIndex: number[] = [];
  let finCount = 0;
  const grid = (rows: number, cols: number) => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        finUv.push(r / (rows - 1), c / (cols - 1));
        if (r === rows - 1 || c === cols - 1) continue;
        const a = finCount + r * cols + c;
        finIndex.push(a, a + cols, a + 1, a + cols, a + cols + 1, a + 1);
      }
    }
    finCount += rows * cols;
  };
  grid(TAIL_ROWS + 1, TAIL_COLS);
  for (const fin of SIDE_FINS) {
    grid(fin.rows, fin.cols);
    grid(fin.rows, fin.cols);
  }
  grid(DORSAL_ROWS, DORSAL_COLS);
  grid(2, 2);
  grid(2, 2);
  const fins = new BufferGeometry();
  const finPos = new BufferAttribute(new Float32Array(finCount * 3), 3).setUsage(DynamicDrawUsage);
  fins.setAttribute("position", finPos);
  fins.setAttribute("uv", new BufferAttribute(new Float32Array(finUv), 2));
  fins.setIndex(finIndex);
  add(new Mesh(fins, look.fin));

  const eyes = [1, -1].map(() => add(new Mesh(look.eyeGeometry, look.eye)));
  const shadows = SHADOW_TAPS.map(() => [add(new Mesh(body, look.shadow)), add(new Mesh(fins, look.finShadow))]);
  for (const pair of shadows) for (const mesh of pair) mesh.scale.set(1, 1, 0.001);

  const head = chain[0];
  /** A spot beside this koi's tail, for a companion to keep station on. */
  const escort = new Vector3();
  let escortSide = 1;
  const waypoint = new Vector3();
  let waypointUntil = 0;
  let escorting = false;
  let mood = 1;
  let dir = member.from > 0 ? Math.PI : 0;
  let turnRate = 0;
  let speed = CRUISE;
  let thrusting = true;
  let beatsLeft = 2;
  let beat = 1;
  let bank = 0;
  let phase = Math.random() * 6;
  let placed = false;

  const pickWaypoint = (world: World, now: number) => {
    /* Mostly over to the other side, so it keeps crossing the hero, and
       mostly into open water rather than under the copy. */
    const side = (Math.random() < 0.7 ? -1 : 1) * (Math.sign(head.x) || 1);
    for (let k = 0; k < 6; k++) {
      waypoint.set(
        side * lerp(0.15, 0.85, Math.random()) * world.hw,
        (Math.random() * 2 - 1) * 0.75 * world.hh,
        lerp(-0.9, SURFACE_Z, Math.random())
      );
      if (world.underCopy(waypoint, 0) < 0.5) break;
    }
    waypointUntil = now + 7 + Math.random() * 6;
    mood = 0.75 + Math.random() * 0.5;
    escorting = member.leader !== undefined && Math.random() < 0.6;
    if (Math.random() < 0.3) escortSide = -escortSide;
  };

  const sampleSpine = (f: number, out: Vector3) => {
    const i = Math.min(Math.floor(f), n - 2);
    return out.lerpVectors(spine[i], spine[i + 1], f - i);
  };

  const update = (dt: number, now: number, world: World) => {
    const L = world.unit * KOI_SIZE * member.scale;

    if (!placed) {
      placed = true;
      head.set(member.from * (world.hw + member.lead * L), (Math.random() - 0.5) * world.hh, -0.4);
      dirV.set(-Math.cos(dir), -Math.sin(dir), 0);
      for (let i = 1; i < n; i++) chain[i].copy(chain[i - 1]).addScaledVector(dirV, gaps[i] * L);
      pickWaypoint(world, now);
    }

    /* Where to: the lure, a companion's side, or a point to wander to. */
    const lure = world.lure(now);
    const leader = member.leader === undefined ? undefined : world.koi[member.leader];
    if (!lure && (now > waypointUntil || Math.hypot(waypoint.x - head.x, waypoint.y - head.y) < 0.4 * L)) {
      pickWaypoint(world, now);
    }
    const goal = lure ? lure.at : escorting && leader ? leader.escort : waypoint;
    let gx = goal.x - head.x;
    let gy = goal.y - head.y;
    const dist = Math.hypot(gx, gy) || 1;
    gx /= dist;
    gy /= dist;
    for (const other of world.koi) {
      if (other.head === head) continue;
      const ox = head.x - other.head.x;
      const oy = head.y - other.head.y;
      const d = Math.hypot(ox, oy);
      const room = 0.6 * L;
      if (d > 0 && d < room) {
        gx += (ox / d) * (1 - d / room) * 1.5;
        gy += (oy / d) * (1 - d / room) * 1.5;
      }
    }

    /* Unhurried when wandering; quicker toward the cursor, easing to a hover
       once there; flat out for food. */
    const want = lure
      ? lure.dash
        ? DASH
        : lerp(HOVER, CHASE, smoothstep(0.5, 2.5, dist / L))
      : CRUISE * mood * (escorting ? lerp(0.7, 1.5, smoothstep(0.3, 2, dist / L)) : 1);

    /* Stroke and glide: a few tail beats, then coast until it slows. */
    const beatHz = thrusting ? lerp(1.3, 3, smoothstep(CRUISE, DASH, want)) : 0.7;
    if (thrusting) {
      beatsLeft -= dt * beatHz;
      speed += (want * 1.25 - speed) * (1 - Math.exp(-dt * 2.4));
      if (beatsLeft <= 0 && !lure?.dash) thrusting = false;
    } else {
      speed *= Math.exp(-dt * 0.6);
      if (speed < want * 0.8) {
        thrusting = true;
        beatsLeft = 1.5 + Math.random() * 2;
      }
    }
    const strength = thrusting ? lerp(0.55, 1, smoothstep(0.1, 1.2, want)) : 0.12;
    beat += (strength - beat) * (1 - Math.exp(-dt * 5));
    phase += dt * Math.PI * 2 * beatHz;

    /* Turning eases in and out, and is sharper on a stroke than in a glide. */
    const limit = (lure ? CHASE_TURN : TURN) * (thrusting ? 1 : 0.6);
    const aim = clamp(wrapAngle(Math.atan2(gy, gx) - dir) * 1.8, -limit, limit);
    turnRate += (aim - turnRate) * (1 - Math.exp(-dt * 3));
    dir += turnRate * dt;
    bank += (clamp(-turnRate * 0.2, -0.35, 0.35) - bank) * (1 - Math.exp(-dt * 3));

    const heading = dir + 0.07 * beat * Math.sin(phase);
    head.x += Math.cos(heading) * speed * L * dt;
    head.y += Math.sin(heading) * speed * L * dt;
    const surface = lure ? SURFACE_Z : goal.z;
    const depth = lerp(surface, UNDER_COPY_Z, world.underCopy(head, 0.6 * L));
    head.z += (depth - head.z) * (1 - Math.exp(-dt * (1.2 + speed * 1.5)));

    /* The rest of the spine follows the head, one fixed gap at a time. */
    for (let i = 1; i < n; i++) {
      tmp.subVectors(chain[i], chain[i - 1]);
      chain[i].copy(chain[i - 1]).addScaledVector(tmp, (gaps[i] * L) / (tmp.length() || 1));
    }

    /* A frame at every spine point, rolled into the turn, plus the tail beat
       — barely at the head, growing toward the tail. */
    const cb = Math.cos(bank);
    const sb = Math.sin(bank);
    for (let i = 0; i < n; i++) {
      T[i].subVectors(chain[Math.max(i - 1, 0)], chain[Math.min(i + 1, n - 1)]).normalize();
      tmp.set(0, 0, 1).addScaledVector(T[i], -T[i].z).normalize();
      tmp2.crossVectors(tmp, T[i]);
      U[i].copy(tmp).multiplyScalar(cb).addScaledVector(tmp2, -sb);
      S[i].copy(tmp2).multiplyScalar(cb).addScaledVector(tmp, sb);
      const t = ts[i];
      const swing = TAIL_SWING * beat * L * (0.12 + t * t) * Math.sin(phase - t * Math.PI * 1.8);
      spine[i].copy(chain[i]).addScaledVector(S[i], swing);
    }

    const pos = bodyPos.array as Float32Array;
    for (let i = 0; i < RINGS; i++) {
      const w = widths[i] * L;
      const h = w * DEPTH;
      const c = spine[i];
      for (let j = 0; j < per; j++) {
        const k = (i * per + j) * 3;
        const x = ringCos[j] * w;
        const y = ringSin[j] * h;
        pos[k] = c.x + S[i].x * x + U[i].x * y;
        pos[k + 1] = c.y + S[i].y * x + U[i].y * y;
        pos[k + 2] = c.z + S[i].z * x + U[i].z * y;
      }
    }
    bodyPos.needsUpdate = true;
    body.computeVertexNormals();

    const out = finPos.array as Float32Array;
    let o = 0;
    const put = (p: Vector3) => {
      out[o++] = p.x;
      out[o++] = p.y;
      out[o++] = p.z;
    };

    // Tail: the middle rays run short, which forks it. It twists a little
    // with each beat, and the membrane ripples behind.
    const twist = 0.35 * beat * Math.sin(phase - 1.2);
    for (let r = 0; r <= TAIL_ROWS; r++) {
      const u = r / TAIL_ROWS;
      for (let c = 0; c < TAIL_COLS; c++) {
        const x = (c / (TAIL_COLS - 1)) * 2 - 1;
        const f = RINGS - 1 + r * (1 - 0.34 * (1 - Math.abs(x)) ** 1.4);
        const k = Math.round(f);
        const half = x * (0.024 + 0.17 * u ** 0.85) * L;
        const ripple = Math.sin(phase * 1.3 - u * 4 + x) * 0.01 * L * u;
        sampleSpine(f, tmp)
          .addScaledVector(S[k], half * Math.cos(twist))
          .addScaledVector(U[k], half * Math.sin(twist) + ripple);
        put(tmp);
      }
    }

    // Side fins open wide and scull while it idles, and fold back at speed.
    const fold = smoothstep(0.35, 1.2, speed);
    for (const fin of SIDE_FINS) {
      const spread = lerp(fin.spread, fin.spread * 0.35, fold);
      const scull = lerp(0.5, 0.12, fold);
      for (const side of [1, -1]) {
        const flap = Math.sin(now * 2.6 + fin.at * 9 + (side > 0 ? 0 : 1.4)) * scull;
        for (let r = 0; r < fin.rows; r++) {
          const u = r / (fin.rows - 1);
          for (let c = 0; c < fin.cols; c++) {
            const v = c / (fin.cols - 1);
            const i = Math.round((fin.at + 0.07 * v) * (RINGS - 1));
            const w = widths[i] * L;
            // A broad, rounded paddle: the rays fan from out-sideways to
            // lying back along the body, the leading one longest.
            const reach = fin.length * L * (1 - 0.4 * v ** 1.5) * (0.85 + 0.15 * Math.sin(Math.PI * v)) * u;
            const a = Math.max(0.05, spread - 0.9 * v);
            tmp
              .copy(spine[i])
              .addScaledVector(S[i], side * (w * 0.85 + Math.sin(a) * reach))
              .addScaledVector(T[i], -Math.cos(a) * reach)
              .addScaledVector(U[i], (flap - 0.15) * reach - w * 0.45 - Math.sin(v * Math.PI) * 0.15 * reach);
            put(tmp);
          }
        }
      }
    }

    // Dorsal fin: tall at the front, raked back, swaying with the body.
    for (let r = 0; r < DORSAL_ROWS; r++) {
      const u = r / (DORSAL_ROWS - 1);
      for (let c = 0; c < DORSAL_COLS; c++) {
        const v = c / (DORSAL_COLS - 1);
        const t = lerp(0.36, 0.72, v);
        const i = Math.round(t * (RINGS - 1));
        const tall = 0.07 * L * Math.sin((Math.min(v / 0.15, 1) * Math.PI) / 2) * (1 - 0.6 * v) * u;
        const lean = bank * 1.5 + 0.5 * beat * Math.sin(phase - t * Math.PI * 1.8 - 0.8);
        tmp
          .copy(spine[i])
          .addScaledVector(U[i], widths[i] * DEPTH * L * 0.96 + tall * Math.cos(lean))
          .addScaledVector(S[i], tall * Math.sin(lean))
          .addScaledVector(T[i], -tall * 0.4);
        put(tmp);
      }
    }

    // Barbels: a whisker either side of the mouth.
    const bw = widths[1] * L;
    for (const side of [1, -1]) {
      const angle = 0.9 + Math.sin(now * 3 + side) * 0.25;
      dirV.copy(T[1]).multiplyScalar(Math.cos(angle)).addScaledVector(S[1], side * Math.sin(angle));
      tmp2.crossVectors(U[1], dirV).multiplyScalar(0.0025 * L);
      tmp3.copy(spine[1]).addScaledVector(S[1], side * bw * 0.75).addScaledVector(U[1], -bw * DEPTH * 0.35);
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 2; c++) {
          tmp
            .copy(tmp3)
            .addScaledVector(dirV, 0.045 * L * r)
            .addScaledVector(tmp2, c * 2 - 1)
            .addScaledVector(U[1], -0.006 * L * r);
          put(tmp);
        }
      }
    }
    finPos.needsUpdate = true;
    fins.computeVertexNormals();

    /* Eyes sit on the sides of the head, bulging just past its outline. */
    const ei = Math.round(0.085 * (RINGS - 1));
    const ew = widths[ei] * L;
    eyes.forEach((eye, k) => {
      eye.position
        .copy(spine[ei])
        .addScaledVector(S[ei], (k === 0 ? 1 : -1) * ew * 0.9)
        .addScaledVector(U[ei], ew * DEPTH * 0.12);
      eye.scale.setScalar(0.016 * L);
    });

    /* Shadows: the same meshes flattened onto the floor, nudged away from a
       light up and to the left, and softer the higher it swims. */
    const lift = head.z - FLOOR_Z;
    const blur = (0.02 + 0.012 * lift) * L;
    shadows.forEach((pair, k) => {
      const [dx, dy] = SHADOW_TAPS[k];
      for (const mesh of pair) mesh.position.set(lift * 0.06 + dx * blur, -lift * 0.1 + dy * blur, FLOOR_Z);
    });

    const ek = Math.round(0.85 * (RINGS - 1));
    escort.copy(chain[ek]).addScaledVector(S[ek], 0.5 * L * escortSide);
  };

  return {
    head,
    escort,
    update,
    dispose() {
      for (const mesh of meshes) scene.remove(mesh);
      body.dispose();
      fins.dispose();
    },
  };
}

/* ---------------------------------------------------------------------------
   The scene
   ------------------------------------------------------------------------ */

/**
 * Starts the scene inside `host` and returns a function that tears it down.
 * Returns a no-op if WebGL isn't available.
 */
export function mountCreatures(host: HTMLElement) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return () => {};
  }
  let alive = true;
  const isAlive = () => alive;
  /** GPU resources made along the way, freed on teardown. */
  const owned: { dispose(): void }[] = [];
  const own = <T extends { dispose(): void }>(thing: T) => {
    owned.push(thing);
    return thing;
  };

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, finePointer ? 2 : 1.5));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.6s ease";
  host.appendChild(canvas);

  const scene = new Scene();
  scene.fog = new Fog(NAVY, CAMERA_Z - SURFACE_Z - 0.2, CAMERA_Z - FLOOR_Z + 0.6);
  const pmrem = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = own(pmrem.fromScene(room, 0.04).texture);
  room.dispose();
  pmrem.dispose();
  scene.environment = env;
  scene.environmentIntensity = 0.5;
  scene.add(new HemisphereLight(0xdce8ff, NAVY, 1.25));
  const sun = new DirectionalLight(0xffffff, 2.8);
  sun.position.set(-3, 4, 8);
  scene.add(sun);

  const camera = new PerspectiveCamera(35, 1, 0.1, 40);
  camera.position.set(0, 0, CAMERA_Z);

  /* The cursor, food dropped by a click, and the rings they leave. */
  const pointer = { at: new Vector3(), movedAt: -Infinity, nx: 0, ny: 0 };
  const food = { at: new Vector3(), until: -Infinity };
  const chaseFood = { at: food.at, dash: true };
  const chaseCursor = { at: pointer.at, dash: false };
  const pellet = new Mesh(
    own(new SphereGeometry(1, 16, 12)),
    own(new MeshBasicMaterial({ color: 0x9a6a3c, fog: false }))
  );
  pellet.visible = false;
  scene.add(pellet);

  const rippleGeometry = own(new RingGeometry(0.94, 1, 72));
  const ripples = Array.from({ length: 6 }, () => {
    const material = own(
      new MeshBasicMaterial({ color: 0xdfe9ff, transparent: true, depthWrite: false, fog: false })
    );
    const mesh = new Mesh(rippleGeometry, material);
    mesh.visible = false;
    scene.add(mesh);
    return { mesh, material, born: -Infinity, size: 0 };
  });
  let nextRipple = 0;
  const ripple = (at: Vector3, size: number, delay = 0) => {
    const r = ripples[nextRipple++ % ripples.length];
    r.mesh.position.copy(at);
    r.born = performance.now() / 1000 + delay;
    r.size = size;
  };

  /* The hero copy's box on the surface plane, so the koi can dive under it.
     Empty until measured. */
  const copyEl = host.closest("section")?.querySelector("h1")?.parentElement ?? null;
  const copy = { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity };

  const world: World = {
    hw: 1,
    hh: 1,
    unit: 1,
    underCopy: (p, pad) => {
      const dx = Math.max(copy.x0 - p.x, 0, p.x - copy.x1);
      const dy = Math.max(copy.y0 - p.y, 0, p.y - copy.y1);
      return 1 - smoothstep(0, pad || 1e-6, Math.hypot(dx, dy));
    },
    lure: (now) => (food.until > now ? chaseFood : now - pointer.movedAt < 2.2 ? chaseCursor : null),
    koi: [],
  };
  let koi: ReturnType<typeof createKoi>[] = [];

  const resize = () => {
    const box = host.getBoundingClientRect();
    if (!box.width || !box.height) return;
    renderer.setSize(box.width, box.height, false);
    camera.aspect = box.width / box.height;
    camera.updateProjectionMatrix();
    world.hh = Math.tan((camera.fov * Math.PI) / 360) * (CAMERA_Z - SURFACE_Z);
    world.hw = world.hh * camera.aspect;
    world.unit = 2 * Math.min(world.hw, world.hh);
    if (copyEl) {
      const r = copyEl.getBoundingClientRect();
      const k = (2 * world.hw) / box.width; // world units per CSS pixel
      copy.x0 = (r.left - box.left) * k - world.hw;
      copy.x1 = (r.right - box.left) * k - world.hw;
      copy.y0 = world.hh - (r.bottom - box.top) * k;
      copy.y1 = world.hh - (r.top - box.top) * k;
    }
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  if (copyEl) resizeObserver.observe(copyEl);

  const toSurface = (e: PointerEvent, out: Vector3) => {
    const box = host.getBoundingClientRect();
    const nx = ((e.clientX - box.left) / box.width) * 2 - 1;
    const ny = 1 - ((e.clientY - box.top) / box.height) * 2;
    if (Math.abs(nx) > 1 || Math.abs(ny) > 1) return false;
    tmp.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize();
    out.copy(camera.position).addScaledVector(tmp, (SURFACE_Z - camera.position.z) / tmp.z);
    pointer.nx = finePointer ? nx : 0;
    pointer.ny = finePointer ? ny : 0;
    return true;
  };
  const onMove = (e: PointerEvent) => {
    if (toSurface(e, pointer.at)) pointer.movedAt = performance.now() / 1000;
    else pointer.nx = pointer.ny = 0;
  };
  const onDown = (e: PointerEvent) => {
    if (!toSurface(e, food.at)) return;
    food.until = performance.now() / 1000 + 4;
    ripple(food.at, 0.13);
    ripple(food.at, 0.09, 0.25);
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });

  let raf = 0;
  let last = 0;
  let shown = false;
  const frame = (ms: number) => {
    raf = requestAnimationFrame(frame);
    const now = ms / 1000;
    const dt = Math.min(0.05, Math.max(0.001, now - last));
    last = now;
    water.time.value = now;

    // A touch of parallax against the page as the cursor moves.
    const ease = 1 - Math.exp(-dt * 2);
    camera.position.x += (pointer.nx * 0.4 - camera.position.x) * ease;
    camera.position.y += (pointer.ny * 0.25 - camera.position.y) * ease;
    camera.lookAt(0, 0, 0);

    for (const fish of koi) fish.update(dt, now, world);

    if (food.until > now) {
      pellet.visible = true;
      pellet.position.copy(food.at);
      pellet.position.z += Math.sin(now * 3) * 0.03;
      pellet.scale.setScalar(world.unit * 0.007);
      const eaten = koi.some((f) => Math.hypot(f.head.x - food.at.x, f.head.y - food.at.y) < world.unit * 0.04);
      if (eaten) {
        food.until = -Infinity;
        ripple(food.at, 0.06);
      }
    } else {
      pellet.visible = false;
    }

    for (const r of ripples) {
      const age = (now - r.born) / 1.6;
      r.mesh.visible = age >= 0 && age < 1;
      if (!r.mesh.visible) continue;
      r.mesh.scale.setScalar(world.unit * r.size * (0.15 + 0.85 * (1 - (1 - age) ** 3)));
      r.material.opacity = 0.35 * (1 - age) ** 2;
    }

    renderer.render(scene, camera);
    if (!shown) {
      shown = true;
      canvas.style.opacity = "1";
    }
  };

  /* Only animate while the hero is on screen. */
  const start = () => {
    if (raf) return;
    last = performance.now() / 1000;
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };
  const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));

  /* Paint the textures, then let the koi in. */
  (async () => {
    const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const field = await buildScales(isAlive);
    const normals = field && (await paintNormals(field, isAlive));
    if (!field || !normals || !alive) return;
    const normalMap = own(makeTexture(normals, SKIN_W, SKIN_H, false, anisotropy));

    const shared = {
      eye: own(new MeshPhysicalMaterial({ color: 0x050505, roughness: 0.08, clearcoat: 1 })),
      eyeGeometry: own(new SphereGeometry(1, 12, 8)),
      shadow: own(
        new MeshBasicMaterial({ color: 0x02050d, transparent: true, opacity: 0.055, depthWrite: false, fog: false })
      ),
      finShadow: own(
        new MeshBasicMaterial({
          color: 0x02050d,
          transparent: true,
          opacity: 0.025,
          depthWrite: false,
          fog: false,
          side: DoubleSide,
        })
      ),
    };

    const looks: Look[] = [];
    for (const member of CAST) {
      const skin = await paintSkin(member.variety, field, isAlive);
      if (!skin || !alive) return;
      const skinMap = own(makeTexture(skin, SKIN_W, SKIN_H, true, anisotropy));
      const finMap = own(makeTexture(paintFin(member.variety), FIN_TEX, FIN_TEX, true, anisotropy));
      looks.push({
        ...shared,
        skin: own(
          withCaustics(
            new MeshPhysicalMaterial({
              map: skinMap,
              normalMap,
              normalScale: new Vector2(0.65, 0.65),
              roughness: 0.46,
              clearcoat: 0.5,
              clearcoatRoughness: 0.45,
              iridescence: 0.15,
              iridescenceIOR: 1.3,
            }),
            0.35
          )
        ),
        fin: own(
          withCaustics(
            new MeshPhysicalMaterial({
              map: finMap,
              transparent: true,
              side: DoubleSide,
              depthWrite: false,
              roughness: 0.5,
              clearcoat: 0.4,
            }),
            0.2
          )
        ),
      });
    }

    koi = CAST.map((member, k) => createKoi(member, looks[k], scene));
    world.koi = koi;
    visibility.observe(host);
  })();

  return () => {
    alive = false;
    stop();
    visibility.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    for (const fish of koi) fish.dispose();
    for (const thing of owned) thing.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
