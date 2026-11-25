import * as THREE from 'three'
import { C, mesh, build, islandBase, star } from './landmarks.js'
import { islands as data, skills } from './content.js'

const HORIZON = 0xfbe3cb
export const scene = new THREE.Scene(); scene.fog = new THREE.Fog(HORIZON, 70, 240)
export const camera = new THREE.PerspectiveCamera(50, 1, .5, 700)
const uTime = { value: 0 }

export const skyU = { a: { value: new THREE.Color(0xfbe3cb) }, b: { value: new THREE.Color(0xa3d6e6) }, c: { value: new THREE.Color(0x4799c7) } }
const sky = new THREE.Mesh(new THREE.SphereGeometry(450, 24, 12), new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false, uniforms: skyU,
  vertexShader: 'varying vec3 p;void main(){p=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader: 'varying vec3 p;uniform vec3 a,b,c;void main(){float h=max(p.y,0.);vec3 k=mix(a,b,smoothstep(0.,.22,h));k=mix(k,c,smoothstep(.15,.8,h));gl_FragColor=vec4(k,1.);\n#include <colorspace_fragment>\n}',
})); scene.add(sky)
const hemi = new THREE.HemisphereLight(0xf4faff, 0xd8b89a, 2.35); scene.add(hemi)
const sun = new THREE.DirectionalLight(0xffe2b8, 1.7); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -.0005; sun.shadow.normalBias = .05
Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 1, far: 160 }); scene.add(sun, sun.target)
export const lights = { sun, hemi }

export const seaMat = new THREE.MeshStandardMaterial({ color: 0x1b8a93, roughness: .8, flatShading: true })
seaMat.onBeforeCompile = s => {
  s.uniforms.uTime = uTime
  s.vertexShader = 'uniform float uTime;\n' + s.vertexShader.replace('#include <begin_vertex>', `vec3 transformed=position;vec2 q=(modelMatrix*vec4(position,1.)).xz;
  transformed.y+=sin(q.x*.21+uTime*.9)*.36+sin(q.y*.27+uTime*.7+q.x*.1)*.36-.62;`)
}
const sea = new THREE.Mesh(new THREE.PlaneGeometry(600, 600, 120, 120).rotateX(-Math.PI / 2), seaMat); sea.receiveShadow = true; scene.add(sea)

const TONES = [[C.sand, 0x9cc77a, 0x6fb06a, 0x549a5c], [C.sand, 0xf6b07a, 0xf09468, 0xe8835c], [C.sand, 0xa9d6c5, 0x7fc3b4, 0x62b0a4], [C.sand, 0xc9b8dd, 0xb09ccf, 0x9d88c2]]
const n = data.length - 1 // islands in the ring
export const islands = data.map((d, i) => {
  const a = (i - 1) / n * Math.PI * 2 - Math.PI / 2 - .35, r = i ? (i % 2 ? 78 : 102) : 0
  const pos = new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r), R = 13
  const g = new THREE.Group(); g.position.copy(pos); if (i) g.rotation.y = Math.atan2(-pos.x, -pos.z)
  g.add(islandBase(R, i * 1.7, TONES[i % 4]))
  const foam = new THREE.Mesh(new THREE.RingGeometry(R * .9, R * 1.2, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xd9f3f0, transparent: true, opacity: .35 })); foam.position.y = .12; g.add(foam)
  const l = new THREE.Group(); l.position.y = 1.9; l.scale.setScalar(1.12); g.add(l)
  const anim = build[d.id](l); anim?.(0)
  scene.add(g)
  return { ...d, i, pos, R, g, l, anim, foam, front: new THREE.Vector3(0, 0, 1).applyAxisAngle(THREE.Object3D.DEFAULT_UP, g.rotation.y), seen: false }
})

// Skill stars: two in each gap of the ring; extras go further in.
const sGeo = new THREE.ExtrudeGeometry(star(1.5), { depth: .3, bevelEnabled: false }).translate(0, 0, -.15)
export const stars = skills.filter(s => s.star).map((s, i) => {
  const gap = Math.floor(i / 2) % n, A = islands[1 + gap].pos, B = islands[1 + (gap + 1) % n].pos
  const m = mesh(sGeo, [C.gold, C.red, C.paper, C.coral][i % 4], 0, 0, 0, scene)
  m.position.lerpVectors(A, B, i % 2 ? .62 : .38); if (i >= n * 2) m.position.multiplyScalar(.75 - .1 * (i % 3))
  m.position.y = 7 + (i % 3)
  return { ...s, m, got: false }
})

const clouds = []
for (let i = 0; i < 22; i++) {
  const c = new THREE.Group(), a = i * 2.4, r = 40 + (i * 37) % 130
  for (let k = 0; k < 3; k++) { const b = mesh(new THREE.IcosahedronGeometry(2.6 + (k % 2) * 1.6, 1), C.paper, (k - 1) * 3.6, 0, (k % 2) * 1.5, c); b.scale.y = .45; b.castShadow = false }
  c.position.set(Math.cos(a) * r, 24 + (i * 7) % 16, Math.sin(a) * r); clouds.push(c); scene.add(c)
}
const boats = []
for (let i = 0; i < 9; i++) {
  const b = new THREE.Group()
  mesh(new THREE.CylinderGeometry(1.5, .7, .9, 4, 1).scale(1, 1, 2), C.paper, 0, .3, 0, b)
  mesh(new THREE.ConeGeometry(.9, 1.8, 4), [C.red, C.blue, C.gold][i % 3], 0, 1.5, 0, b)
  b.userData = { r: 30 + (i * 23) % 28, a: i * 1.9, s: (i % 2 ? 1 : -1) * .025 }; boats.push(b); scene.add(b)
}

// Paper plane, nose toward -z, with airmail edges.
export const plane = new THREE.Group()
{
  const tri = (pts, c) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts.flat(), 3)); g.computeVertexNormals(); mesh(g, c, 0, 0, 0, plane) }
  const N = [0, 0, -2], k = [0, -.75, 1.3], up = p => [p[0], p[1] + .02, p[2]]
  for (const s of [-1, 1]) {
    const i = [s * .16, .12, 1.4], o = [s * 1.55, .3, 1.4], o2 = [s * 1.32, .255, .9], i2 = [s * .137, .102, .9]
    tri([N, i, o], C.paper); tri([N, i, k], 0xd9e2ec)
    tri([up(i2), up(i), up(o), up(i2), up(o), up(o2)], s < 0 ? C.red : C.blue)
  }
  plane.children.forEach(m => { m.receiveShadow = false }) // thin wings would stripe themselves
  plane.rotation.order = 'YXZ'; scene.add(plane)
}

// Dotted mail route behind the plane.
const D = 70, trail = new THREE.InstancedMesh(new THREE.BoxGeometry(.18, .04, .9), new THREE.MeshBasicMaterial({ color: C.paper }), D); trail.frustumCulled = false; scene.add(trail)
const dashes = [...Array(D)].map(() => ({ p: new THREE.Vector3(0, -50, 0), q: new THREE.Quaternion(), life: 0 }))
let di = 0, dist = 0
const last = new THREE.Vector3(), M4 = new THREE.Matrix4(), S = new THREE.Vector3(), Q = new THREE.Quaternion()
export function updateTrail(dt) {
  dist += last.distanceTo(plane.position); last.copy(plane.position)
  if (dist > 1.9) { dist = 0; const d = dashes[di++ % D]; d.p.copy(plane.position); d.q.copy(plane.quaternion); d.life = 1 }
  dashes.forEach((d, i) => { d.life = Math.max(0, d.life - dt * .14); trail.setMatrixAt(i, M4.compose(d.p, d.q, S.setScalar(Math.min(1, d.life * 2)))) })
  trail.instanceMatrix.needsUpdate = true
}

// Paper confetti.
const CN = 160, conf = new THREE.InstancedMesh(new THREE.PlaneGeometry(.4, .6), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide }), CN); conf.frustumCulled = false; scene.add(conf)
const bits = [...Array(CN)].map((_, i) => { conf.setColorAt(i, new THREE.Color([C.red, C.blue, C.gold, C.paper, C.coral][i % 5])); conf.setMatrixAt(i, new THREE.Matrix4().makeScale(0, 0, 0)); return { p: new THREE.Vector3(), v: new THREE.Vector3(), r: new THREE.Euler(), life: 0 } })
let ci = 0
export function confetti(pos, count) { for (let k = 0; k < count; k++) { const b = bits[ci++ % CN]; b.p.copy(pos); b.v.set((Math.random() - .5) * 14, Math.random() * 10 + 2, (Math.random() - .5) * 14); b.life = 1 } }

export function updateWorld(t, dt) {
  uTime.value = t
  sea.position.set(Math.round(plane.position.x / 5) * 5, 0, Math.round(plane.position.z / 5) * 5)
  sky.position.copy(camera.position)
  for (const i of islands) { i.anim?.(t); i.foam.scale.setScalar(1 + Math.sin(t * 1.2 + i.i) * .025) }
  for (const s of stars) if (!s.got) s.m.rotation.y = t * 1.6
  clouds.forEach((c, i) => { c.position.x += dt * (.4 + i % 3 * .2); if (c.position.x > 180) c.position.x = -180 })
  boats.forEach((b, i) => { const u = b.userData, a = u.a + t * u.s; b.position.set(Math.cos(a) * u.r, Math.sin(t + i) * .15, Math.sin(a) * u.r); b.rotation.set(0, -a, Math.sin(t * 1.3 + i) * .08) })
  bits.forEach((b, i) => {
    if (b.life > 0) { b.life -= dt * .4; b.v.y -= 9 * dt; b.v.multiplyScalar(1 - dt * 1.2); b.p.addScaledVector(b.v, dt); b.r.x += dt * 6; b.r.y += dt * 4 }
    conf.setMatrixAt(i, M4.compose(b.p, Q.setFromEuler(b.r), S.setScalar(Math.max(0, Math.min(1, b.life * 3)))))
  }); conf.instanceMatrix.needsUpdate = true
}
export function aimSun(p) { sun.target.position.set(p.x, 0, p.z); sun.position.set(p.x + 34, 52, p.z + 26); sun.target.updateMatrixWorld() }

// Photograph each island for its stamp.
export function makeStamps(renderer) {
  const cam = new THREE.PerspectiveCamera(36, 1, .5, 700); plane.visible = trail.visible = false
  renderer.setPixelRatio(1); renderer.setSize(560, 560, false)
  for (const i of islands) {
    cam.position.copy(i.pos).addScaledVector(i.front, 27).add(new THREE.Vector3(0, 12, 0)).addScaledVector(new THREE.Vector3(i.front.z, 0, -i.front.x), 9); cam.lookAt(i.pos.x, 4.6, i.pos.z)
    sky.position.copy(cam.position); sea.position.set(i.pos.x, 0, i.pos.z); aimSun(i.pos); renderer.render(scene, cam); i.img = renderer.domElement.toDataURL('image/jpeg', .85)
  }
  plane.visible = trail.visible = true
}
