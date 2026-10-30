/* The three.js scene behind <HeroCreature />: a pair of koi (or one snake)
   seen from above, as if the hero were a pond. Each body is rebuilt every
   frame around a spine that follows its own head, so a turn travels down the
   body by itself; a koi adds a tail beat on top. Everything is generated —
   there are no models or textures to download. */

import {
  ACESFilmicToneMapping,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  DynamicDrawUsage,
  Fog,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  RingGeometry,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type CreatureKind = "koi" | "snake";

/* The hero's navy (--canvas inside .tone-ink). Fog fades toward it, so a
   creature swimming deeper sinks into the background instead of greying. */
const NAVY = 0x0c1830;
const CAMERA_Z = 10;
/** The cursor's plane — creatures rise to it when they come for the cursor. */
const SURFACE_Z = 0.4;
/** How deep they swim while passing under the hero copy, so it stays legible. */
const UNDER_COPY_Z = -1.4;
/** The pond floor their shadows fall on. */
const FLOOR_Z = -2;

const TAIL_ROWS = 10;
const TAIL_LENGTH = 0.3; // body lengths
/** Pectoral, then pelvic fins: where they sit (t), their length, columns. */
const SIDE_FINS = [
  [0.2, 0.2, 4],
  [0.5, 0.1, 3],
] as const;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

/** Colours one body vertex: t runs snout (0) to tail (1), x/y go round the
    cross-section (y = 1 faces the camera), w is the half-width there. */
type Paint = (out: Color, t: number, x: number, y: number, w: number) => void;

interface Spec {
  /** Body length as a share of the hero's shorter side. */
  size: number;
  /** Spine points along the body, and vertices around each. */
  rings: number;
  sides: number;
  /** Half-width of the body at t, in body lengths. */
  width: (t: number) => number;
  /** Cross-section height over width. */
  depth: number;
  /** Speeds in body lengths per second; turn rates in rad/s. */
  cruise: number;
  dash: number;
  turn: number;
  chaseTurn: number;
  /** How far it rolls into a turn. */
  bank: number;
  /** Yaw swing of the head (rad) and its wavelength along the path (body
      lengths). A snake's whole body follows the wave its head draws. */
  wiggle: number;
  wavelength: number;
  /** Tail beat: resting rate (Hz) and sideways reach at the tail. */
  beat: number;
  tailSwing: number;
  fins: boolean;
}

const KOI: Spec = {
  size: 0.36,
  rings: 40,
  sides: 20,
  width: (t) =>
    0.105 *
    Math.sin((Math.min(t / 0.32, 1) * Math.PI) / 2) ** 0.55 *
    (1 - 0.8 * smoothstep(0.32, 1, t)),
  depth: 0.95,
  cruise: 0.45,
  dash: 1.5,
  turn: 1.3,
  chaseTurn: 3.2,
  bank: 0.3,
  wiggle: 0.1,
  wavelength: 1,
  beat: 0.8,
  tailSwing: 0.06,
  fins: true,
};

const SNAKE: Spec = {
  size: 0.78,
  rings: 120,
  sides: 14,
  width: (t) =>
    0.024 *
    Math.sin((Math.min(t / 0.04, 1) * Math.PI) / 2) ** 0.6 * // rounded snout
    (1 - 0.3 * Math.exp(-(((t - 0.068) / 0.02) ** 2))) * // neck
    (0.12 + 0.88 * (1 - smoothstep(0.25, 1, t))), // long taper
  depth: 0.72,
  cruise: 0.22,
  dash: 0.75,
  turn: 1,
  chaseTurn: 2.4,
  bank: 0,
  wiggle: 0.95,
  wavelength: 0.3,
  beat: 0,
  tailSwing: 0,
  fins: false,
};

const PEARL = new Color("#f4f1ea");
const KOI_BLUE = new Color("#2a62c8");
const FIN_ROOT = new Color("#f3f6fc");
const FIN_EDGE = new Color("#8ab4f8");

/** Kohaku-style patches in the brand blue: [t, offset across, radius]. */
type Patch = readonly [number, number, number];
const paintKoi =
  (patches: readonly Patch[]): Paint =>
  (out, t, x, y, w) => {
    const across = x * w; // what you see from above, in body lengths
    let blue = 0;
    for (const [pt, pa, pr] of patches) {
      const ragged = 0.12 * Math.sin(t * 47 + x * 5 + pt * 13);
      const d = Math.hypot(t - pt, across - pa) / pr + ragged;
      blue = Math.max(blue, 1 - smoothstep(0.8, 1, d));
    }
    out.copy(PEARL).lerp(KOI_BLUE, blue * smoothstep(-0.6, -0.1, y));
  };

const SNAKE_BASE = new Color("#1d4aa3");
const SNAKE_DARK = new Color("#0d2150");
const SNAKE_LIGHT = new Color("#8ab4f8");
const SNAKE_BELLY = new Color("#cfdaef");

const paintSnake: Paint = (out, t, x, y) => {
  // Chevrons down the back, starting behind the head.
  const v = Math.abs(((t * 26 + Math.abs(x) * 0.8) % 1) - 0.5) * 2;
  out
    .copy(SNAKE_BASE)
    .lerp(SNAKE_LIGHT, smoothstep(0.68, 0.9, v) * smoothstep(-0.1, 0.5, y) * smoothstep(0.03, 0.08, t))
    .lerp(SNAKE_DARK, smoothstep(0.1, -0.5, y) * 0.7)
    .lerp(SNAKE_BELLY, smoothstep(-0.55, -0.9, y));
};

interface Member {
  spec: Spec;
  scale: number;
  paint: Paint;
  /** -1 swims in from the left, 1 from the right. */
  from: number;
  /** How far off-screen it starts, in body lengths — staggers the entrances. */
  lead: number;
}

const CAST: Record<CreatureKind, Member[]> = {
  koi: [
    {
      spec: KOI,
      scale: 1,
      paint: paintKoi([[0.1, 0, 0.07], [0.35, 0.03, 0.12], [0.62, -0.03, 0.09], [0.84, 0.01, 0.05]]),
      from: -1,
      lead: 0.3,
    },
    {
      spec: KOI,
      scale: 0.8,
      paint: paintKoi([[0.2, -0.02, 0.09], [0.5, 0.03, 0.13], [0.78, -0.01, 0.07]]),
      from: 1,
      lead: 2.4,
    },
  ],
  snake: [{ spec: SNAKE, scale: 1, paint: paintSnake, from: -1, lead: 0.2 }],
};

interface Materials {
  skin: MeshPhysicalMaterial;
  fin: MeshPhysicalMaterial;
  eye: MeshPhysicalMaterial;
  shadow: MeshBasicMaterial;
  finShadow: MeshBasicMaterial;
  eyeGeometry: SphereGeometry;
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
  creatures: { head: Vector3 }[];
}

const tmp = new Vector3();
const tmp2 = new Vector3();
const dirV = new Vector3();

function createCreature(member: Member, mats: Materials, scene: Scene) {
  const { spec, scale, paint } = member;
  const { rings, sides } = spec;
  const tail = spec.fins ? TAIL_ROWS : 0;
  const n = rings + tail;
  const vectors = () => Array.from({ length: n }, () => new Vector3());
  const chain = vectors(); // where the spine is
  const spine = vectors(); // where it's drawn, tail beat included
  const T = vectors(); // toward the head
  const U = vectors(); // out of the back
  const S = vectors(); // out of the left flank
  /* t along the body for every spine point; tail-fin rows carry on past 1. */
  const ts = Array.from({ length: n }, (_, i) =>
    i < rings ? i / (rings - 1) : 1 + ((i - rings + 1) / tail) * TAIL_LENGTH
  );
  const gaps = ts.map((t, i) => (i === 0 ? 0 : t - ts[i - 1]));
  const widths = ts.map((t) => spec.width(Math.min(t, 1)));
  const ringCos = Array.from({ length: sides }, (_, j) => Math.cos((j / sides) * Math.PI * 2));
  const ringSin = Array.from({ length: sides }, (_, j) => Math.sin((j / sides) * Math.PI * 2));

  const color = new Color();
  const meshes: Mesh[] = [];
  const add = (mesh: Mesh) => {
    mesh.frustumCulled = false;
    scene.add(mesh);
    meshes.push(mesh);
    return mesh;
  };

  /* Body: a tube of rings around the spine. */
  const body = new BufferGeometry();
  const bodyPos = new BufferAttribute(new Float32Array(rings * sides * 3), 3).setUsage(DynamicDrawUsage);
  const bodyColor = new Float32Array(rings * sides * 3);
  const bodyIndex: number[] = [];
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < sides; j++) {
      paint(color, ts[i], ringCos[j], ringSin[j], widths[i]);
      color.toArray(bodyColor, (i * sides + j) * 3);
      if (i === rings - 1) continue;
      const v = i * sides + j;
      const next = i * sides + ((j + 1) % sides);
      bodyIndex.push(v, v + sides, next, v + sides, next + sides, next);
    }
  }
  body.setAttribute("position", bodyPos);
  body.setAttribute("color", new BufferAttribute(bodyColor, 3));
  body.setIndex(bodyIndex);
  add(new Mesh(body, mats.skin));
  const bodyShadow = add(new Mesh(body, mats.shadow));

  /* Fins: one geometry of small grids — the forked tail, then each side fin. */
  let fins: BufferGeometry | null = null;
  let finPos: BufferAttribute | null = null;
  let finShadow: Mesh | null = null;
  if (spec.fins) {
    const rgba: number[] = [];
    const index: number[] = [];
    let count = 0;
    const grid = (rows: number, cols: number, alpha: (u: number, x: number) => number) => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const u = r / (rows - 1);
          color.copy(FIN_ROOT).lerp(FIN_EDGE, u * 0.75);
          rgba.push(color.r, color.g, color.b, alpha(u, (c / (cols - 1)) * 2 - 1));
          if (r === rows - 1 || c === cols - 1) continue;
          const a = count + r * cols + c;
          index.push(a, a + cols, a + 1, a + cols, a + cols + 1, a + 1);
        }
      }
      count += rows * cols;
    };
    grid(TAIL_ROWS + 1, 5, (u, x) => (0.85 - 0.6 * u) * (0.8 + 0.2 * Math.cos(x * Math.PI * 4)));
    for (const [, , cols] of SIDE_FINS) {
      grid(5, cols, (u) => 0.8 - 0.55 * u);
      grid(5, cols, (u) => 0.8 - 0.55 * u);
    }
    fins = new BufferGeometry();
    finPos = new BufferAttribute(new Float32Array(count * 3), 3).setUsage(DynamicDrawUsage);
    fins.setAttribute("position", finPos);
    fins.setAttribute("color", new BufferAttribute(new Float32Array(rgba), 4));
    fins.setIndex(index);
    add(new Mesh(fins, mats.fin));
    finShadow = add(new Mesh(fins, mats.finShadow));
  }

  const eyes = [1, -1].map(() => add(new Mesh(mats.eyeGeometry, mats.eye)));
  for (const shadow of [bodyShadow, finShadow]) shadow?.scale.set(1, 1, 0.001);

  const head = chain[0];
  const waypoint = new Vector3();
  let waypointUntil = 0;
  let dir = member.from > 0 ? Math.PI : 0;
  let speed = spec.cruise;
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
  };

  const sampleSpine = (f: number, out: Vector3) => {
    const i = Math.min(Math.floor(f), n - 2);
    return out.lerpVectors(spine[i], spine[i + 1], f - i);
  };

  const update = (dt: number, now: number, world: World) => {
    const L = world.unit * spec.size * scale;

    if (!placed) {
      placed = true;
      head.set(member.from * (world.hw + member.lead * L), (Math.random() - 0.5) * world.hh, -0.4);
      dirV.set(-Math.cos(dir), -Math.sin(dir), 0);
      for (let i = 1; i < n; i++) chain[i].copy(chain[i - 1]).addScaledVector(dirV, gaps[i] * L);
      pickWaypoint(world, now);
    }

    /* Where to: the lure if there is one, else a point to wander to. */
    const lure = world.lure(now);
    if (!lure && (now > waypointUntil || Math.hypot(waypoint.x - head.x, waypoint.y - head.y) < 0.4 * L)) {
      pickWaypoint(world, now);
    }
    const goal = lure ? lure.at : waypoint;
    let gx = goal.x - head.x;
    let gy = goal.y - head.y;
    const dist = Math.hypot(gx, gy) || 1;
    gx /= dist;
    gy /= dist;
    for (const other of world.creatures) {
      if (other.head === head) continue;
      const ox = head.x - other.head.x;
      const oy = head.y - other.head.y;
      const d = Math.hypot(ox, oy);
      const room = 0.7 * L;
      if (d > 0 && d < room) {
        gx += (ox / d) * (1 - d / room) * 1.5;
        gy += (oy / d) * (1 - d / room) * 1.5;
      }
    }

    /* Turn toward it at a limited rate, so it swims arcs — and circles the
       cursor rather than stopping dead on it. */
    const limit = (lure ? spec.chaseTurn : spec.turn) * dt;
    const turn = clamp(wrapAngle(Math.atan2(gy, gx) - dir), -limit, limit);
    dir += turn;
    bank += (clamp((-turn / dt) * spec.bank, -0.6, 0.6) - bank) * (1 - Math.exp(-dt * 4));

    const want = !lure
      ? spec.cruise
      : lure.dash
        ? spec.dash
        : lerp(spec.cruise, spec.dash, smoothstep(0.4, 3, dist / L));
    speed += (want - speed) * (1 - Math.exp(-dt * 2));
    phase += dt * Math.PI * 2 * (spec.beat + speed / spec.wavelength);

    const heading = dir + spec.wiggle * Math.sin(phase);
    head.x += Math.cos(heading) * speed * L * dt;
    head.y += Math.sin(heading) * speed * L * dt;
    const surface = lure ? SURFACE_Z : waypoint.z;
    const depth = lerp(surface, UNDER_COPY_Z, world.underCopy(head, 0.6 * L));
    head.z += (depth - head.z) * (1 - Math.exp(-dt * (1.2 + speed * 1.5)));

    /* The rest of the spine follows the head, one fixed gap at a time. */
    for (let i = 1; i < n; i++) {
      tmp.subVectors(chain[i], chain[i - 1]);
      chain[i].copy(chain[i - 1]).addScaledVector(tmp, (gaps[i] * L) / (tmp.length() || 1));
    }

    /* A frame at every spine point, rolled into the turn, plus the tail beat. */
    const cb = Math.cos(bank);
    const sb = Math.sin(bank);
    for (let i = 0; i < n; i++) {
      T[i].subVectors(chain[Math.max(i - 1, 0)], chain[Math.min(i + 1, n - 1)]).normalize();
      tmp.set(0, 0, 1).addScaledVector(T[i], -T[i].z).normalize();
      tmp2.crossVectors(tmp, T[i]);
      U[i].copy(tmp).multiplyScalar(cb).addScaledVector(tmp2, -sb);
      S[i].copy(tmp2).multiplyScalar(cb).addScaledVector(tmp, sb);
      const t = ts[i];
      const swing = spec.tailSwing * L * (0.12 + t * t) * Math.sin(phase - t * Math.PI * 1.8);
      spine[i].copy(chain[i]).addScaledVector(S[i], swing);
    }

    const pos = bodyPos.array as Float32Array;
    for (let i = 0; i < rings; i++) {
      const w = widths[i] * L;
      const h = w * spec.depth;
      const c = spine[i];
      for (let j = 0; j < sides; j++) {
        const k = (i * sides + j) * 3;
        const x = ringCos[j] * w;
        const y = ringSin[j] * h;
        pos[k] = c.x + S[i].x * x + U[i].x * y;
        pos[k + 1] = c.y + S[i].y * x + U[i].y * y;
        pos[k + 2] = c.z + S[i].z * x + U[i].z * y;
      }
    }
    bodyPos.needsUpdate = true;
    body.computeVertexNormals();

    if (fins && finPos) {
      const out = finPos.array as Float32Array;
      let v = 0;
      const put = (p: Vector3) => {
        out[v++] = p.x;
        out[v++] = p.y;
        out[v++] = p.z;
      };
      // The tail: its middle columns run short, which forks it.
      for (let r = 0; r <= TAIL_ROWS; r++) {
        for (let c = 0; c < 5; c++) {
          const x = c / 2 - 1;
          const f = rings - 1 + r * (1 - 0.38 * (1 - Math.abs(x)) ** 1.6);
          const u = f - (rings - 1);
          sampleSpine(f, tmp).addScaledVector(S[Math.round(f)], x * (0.022 + 0.16 * (u / TAIL_ROWS) ** 0.85) * L);
          put(tmp);
        }
      }
      // Side fins spread wide and paddle while it idles, and tuck in at speed.
      const tuck = smoothstep(0.5, 1.3, speed);
      const spread = lerp(1.15, 0.35, tuck);
      const paddle = lerp(0.45, 0.12, tuck);
      for (const [t0, length, cols] of SIDE_FINS) {
        for (const side of [1, -1]) {
          const flap = Math.sin(now * 3.4 + (side > 0 ? 0 : 1.3) + t0 * 5) * paddle;
          for (let k = 0; k < 5; k++) {
            for (let m = 0; m < cols; m++) {
              const t = t0 + (0.06 * m) / (cols - 1);
              const i = Math.round(t * (rings - 1));
              const w = widths[i] * L;
              const reach = length * L * (1 - (0.5 * m) / (cols - 1)) * (k / 4);
              tmp
                .copy(spine[i])
                .addScaledVector(S[i], side * (w * 0.8 + Math.sin(spread) * reach))
                .addScaledVector(T[i], -Math.cos(spread) * reach)
                .addScaledVector(U[i], flap * reach - w * 0.35);
              put(tmp);
            }
          }
        }
      }
      finPos.needsUpdate = true;
      fins.computeVertexNormals();
    }

    /* Eyes sit high on the head, where they show from above. */
    const eyeAt = spec.fins ? 0.075 : 0.022;
    const ei = Math.round(eyeAt * (rings - 1));
    const ew = widths[ei] * L;
    eyes.forEach((eye, k) => {
      const side = k === 0 ? 1 : -1;
      eye.position.copy(spine[ei]).addScaledVector(S[ei], side * ew * 0.8).addScaledVector(U[ei], ew * spec.depth * 0.45);
      eye.scale.setScalar(ew * 0.22);
    });

    /* Shadows: the same meshes flattened onto the floor, nudged away from a
       light up and to the left — further the higher it swims. */
    const lift = head.z - FLOOR_Z;
    for (const shadow of [bodyShadow, finShadow]) shadow?.position.set(lift * 0.06, -lift * 0.1, FLOOR_Z);
  };

  return {
    head,
    update,
    dispose() {
      for (const mesh of meshes) scene.remove(mesh);
      body.dispose();
      fins?.dispose();
    },
  };
}

/**
 * Starts the scene inside `host` and returns a function that tears it down.
 * Returns a no-op if WebGL isn't available.
 */
export function mountCreatures(host: HTMLElement, kind: CreatureKind) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return () => {};
  }
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, finePointer ? 2 : 1.5));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.6s ease";
  host.appendChild(canvas);

  const scene = new Scene();
  scene.fog = new Fog(NAVY, CAMERA_Z - SURFACE_Z - 0.2, CAMERA_Z - FLOOR_Z + 0.6);
  const pmrem = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04).texture;
  room.dispose();
  pmrem.dispose();
  scene.environment = env;
  scene.environmentIntensity = 0.7;
  scene.add(new HemisphereLight(0xdce8ff, NAVY, 1.1));
  const sun = new DirectionalLight(0xffffff, 2.4);
  sun.position.set(-3, 4, 8);
  scene.add(sun);

  const camera = new PerspectiveCamera(35, 1, 0.1, 40);
  camera.position.set(0, 0, CAMERA_Z);

  const mats: Materials = {
    skin: new MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.32,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      iridescence: kind === "koi" ? 0.45 : 0.8,
      iridescenceIOR: 1.3,
    }),
    fin: new MeshPhysicalMaterial({
      vertexColors: true,
      transparent: true,
      side: DoubleSide,
      depthWrite: false,
      roughness: 0.45,
      clearcoat: 0.6,
    }),
    eye: new MeshPhysicalMaterial({ color: 0x04060b, roughness: 0.1, clearcoat: 1 }),
    shadow: new MeshBasicMaterial({ color: 0x02050d, transparent: true, opacity: 0.3, depthWrite: false, fog: false }),
    finShadow: new MeshBasicMaterial({
      color: 0x02050d,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      fog: false,
      side: DoubleSide,
    }),
    eyeGeometry: new SphereGeometry(1, 12, 8),
  };

  /* The cursor, food dropped by a click, and the rings they leave. */
  const pointer = { at: new Vector3(), movedAt: -Infinity, nx: 0, ny: 0 };
  const food = { at: new Vector3(), until: -Infinity };
  const chaseFood = { at: food.at, dash: true };
  const chaseCursor = { at: pointer.at, dash: false };
  const pellet = new Mesh(new SphereGeometry(1, 16, 12), new MeshBasicMaterial({ color: 0xdce8ff, fog: false }));
  pellet.visible = false;
  scene.add(pellet);

  const rippleGeometry = new RingGeometry(0.94, 1, 72);
  const ripples = Array.from({ length: 6 }, () => {
    const mesh = new Mesh(
      rippleGeometry,
      new MeshBasicMaterial({ color: 0x8ab4f8, transparent: true, depthWrite: false, fog: false })
    );
    mesh.visible = false;
    scene.add(mesh);
    return { mesh, born: -Infinity, size: 0 };
  });
  let nextRipple = 0;
  const ripple = (at: Vector3, size: number, delay = 0) => {
    const r = ripples[nextRipple++ % ripples.length];
    r.mesh.position.copy(at);
    r.born = performance.now() / 1000 + delay;
    r.size = size;
  };

  /* The hero copy's box on the surface plane, so the creatures can dive
     under it. Empty until measured. */
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
    creatures: [],
  };
  const creatures = CAST[kind].map((member) => createCreature(member, mats, scene));
  world.creatures = creatures;

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

    // A touch of parallax against the page as the cursor moves.
    const ease = 1 - Math.exp(-dt * 2);
    camera.position.x += (pointer.nx * 0.4 - camera.position.x) * ease;
    camera.position.y += (pointer.ny * 0.25 - camera.position.y) * ease;
    camera.lookAt(0, 0, 0);

    for (const creature of creatures) creature.update(dt, now, world);

    if (food.until > now) {
      pellet.visible = true;
      pellet.position.copy(food.at);
      pellet.position.z += Math.sin(now * 3) * 0.03;
      pellet.scale.setScalar(world.unit * 0.008);
      const eaten = creatures.some(
        (c) => Math.hypot(c.head.x - food.at.x, c.head.y - food.at.y) < world.unit * 0.04
      );
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
      (r.mesh.material as MeshBasicMaterial).opacity = 0.5 * (1 - age) ** 2;
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
  visibility.observe(host);

  return () => {
    stop();
    visibility.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    for (const creature of creatures) creature.dispose();
    for (const r of ripples) (r.mesh.material as MeshBasicMaterial).dispose();
    rippleGeometry.dispose();
    pellet.geometry.dispose();
    (pellet.material as MeshBasicMaterial).dispose();
    for (const value of Object.values(mats)) value.dispose();
    env.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
