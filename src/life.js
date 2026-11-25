// Everything that makes the world feel alive: pop-up islands, time of day,
// origami cranes, the whale, balloons, lanterns and falling letters.
import * as THREE from 'three'
import { gsap } from 'gsap'
import { C, mesh } from './landmarks.js'
import { scene, islands, plane, skyU, lights, seaMat, camera } from './world.js'

// ── Pop-up book: landmarks lie folded until the plane comes near ──
export function foldIslands() {
  for (const i of islands) {
    i.pivots = [...i.l.children].map(ch => {
      const p = new THREE.Group(); p.position.set(ch.position.x, 0, ch.position.z); ch.position.x = ch.position.z = 0
      i.l.add(p); p.add(ch); p.rotation.x = -Math.PI / 2; p.scale.setScalar(.001); p.visible = false; return p
    })
    const s = new THREE.Group(); s.position.y = 2; i.g.add(s); i.sealed = s; i.up = false
    mesh(new THREE.BoxGeometry(7, .3, 4.6), C.paper, 0, .15, 0, s)
    const tri = new THREE.Shape([new THREE.Vector2(-3.5, 2.3), new THREE.Vector2(3.5, 2.3), new THREE.Vector2(0, -.4)])
    mesh(new THREE.ExtrudeGeometry(tri, { depth: .08, bevelEnabled: false }).rotateX(-Math.PI / 2), C.sky, 0, .3, 0, s)
    mesh(new THREE.CylinderGeometry(.75, .75, .25, 14), C.red, 0, .48, .2, s)
  }
}
export function unfold(i, instant) {
  if (i.up) return false
  i.up = true
  if (instant) { i.sealed.visible = false; i.pivots.forEach(p => { p.visible = true; p.rotation.x = 0; p.scale.setScalar(1) }); return true }
  gsap.to(i.sealed.rotation, { y: 5, duration: .7, ease: 'power2.in' })
  gsap.to(i.sealed.scale, { x: 0, y: 0, z: 0, duration: .7, ease: 'back.in(2)', onComplete: () => { i.sealed.visible = false } })
  i.pivots.forEach((p, k) => {
    const d = .45 + Math.min(k * .045, 1.1); p.visible = true
    gsap.to(p.rotation, { x: 0, duration: 1.5, delay: d, ease: 'elastic.out(1,.55)' })
    gsap.to(p.scale, { x: 1, y: 1, z: 1, duration: .6, delay: d, ease: 'back.out(1.6)' })
  })
  return true
}

// ── Time of day: 0 day, .4 sunset, .7 dusk, 1 night ──
const K = [
  { t: 0, a: 0xfbe3cb, b: 0xa3d6e6, c: 0x4799c7, sea: 0x1b8a93, sun: 0xffe2b8, si: 1.7, hi: 2.35 },
  { t: .4, a: 0xffb27a, b: 0xf7928a, c: 0x5f86bd, sea: 0x23758c, sun: 0xffb070, si: 1.9, hi: 2 },
  { t: .7, a: 0xd9799a, b: 0x7a62a8, c: 0x35448a, sea: 0x24577f, sun: 0xd9a0d0, si: 1.2, hi: 1.75 },
  { t: 1, a: 0x3d5c94, b: 0x1c3268, c: 0x0b1a40, sea: 0x153f66, sun: 0xa9c4ff, si: 1.1, hi: 1.35 },
].map(k => ({ ...k, ...Object.fromEntries(['a', 'b', 'c', 'sea', 'sun'].map(n => [n, new THREE.Color(k[n])])) }))
export const time = { k: 0 }
let applied = -1
function applyTime() {
  if (applied === time.k) return
  const x = applied = time.k, i = x >= .7 ? 2 : x >= .4 ? 1 : 0, A = K[i], B = K[i + 1], f = (x - A.t) / (B.t - A.t)
  skyU.a.value.lerpColors(A.a, B.a, f); skyU.b.value.lerpColors(A.b, B.b, f); skyU.c.value.lerpColors(A.c, B.c, f)
  scene.fog.color.copy(skyU.a.value); seaMat.color.lerpColors(A.sea, B.sea, f)
  lights.sun.color.lerpColors(A.sun, B.sun, f); lights.sun.intensity = A.si + (B.si - A.si) * f; lights.hemi.intensity = A.hi + (B.hi - A.hi) * f
  starMat.opacity = Math.max(0, (x - .55) / .45); lanternMat.opacity = .25 + .75 * x
}
export const setTime = (k, d = 3) => gsap.to(time, { k, duration: d, ease: 'sine.inOut', overwrite: true })

const sp = []; for (let i = 0; i < 700; i++) { const a = i * 2.399, y = .06 + .94 * ((i * 73) % 700) / 700, r = Math.sqrt(1 - y * y); sp.push(Math.cos(a) * r * 420, y * 420, Math.sin(a) * r * 420) }
const starMat = new THREE.PointsMaterial({ color: 0xfff3d0, size: 2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false })
const night = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(sp, 3)), starMat); night.frustumCulled = false; scene.add(night)

// ── Lanterns: a delivered island lights up ──
const lanternMat = new THREE.MeshBasicMaterial({ color: 0xffc860, transparent: true, opacity: .3 })
const lGeo = new THREE.CylinderGeometry(.42, .32, .9, 6), lanterns = []
export function light(i) {
  if (i.lit) return
  i.lit = true
  for (let k = 0; k < 7; k++) { const m = new THREE.Mesh(lGeo, lanternMat), a = k * .9; m.position.set(i.pos.x + Math.cos(a) * (8 + k % 3), 4 + k % 4 * 1.8, i.pos.z + Math.sin(a) * (8 + k % 3)); m.userData = { y: m.position.y, o: k + i.i }; m.scale.setScalar(.01); scene.add(m); lanterns.push(m); gsap.to(m.scale, { x: 1, y: 1, z: 1, duration: 1, delay: .8 + k * .12, ease: 'back.out(2)' }) }
}

// ── Origami cranes: every star you catch becomes one and follows you ──
const cranes = []
const tri = (pts, c, p) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); g.computeVertexNormals(); const m = mesh(g, c, 0, 0, 0, p); m.receiveShadow = false; return m }
export function addCrane(pos) {
  const g = new THREE.Group(), n = cranes.length
  const c = [C.red, C.paper, C.gold, C.coral, C.sky][n % 5]
  tri([0, 0, -.5, .18, .12, .35, -.18, .12, .35, 0, 0, -.5, 0, -.2, .3, .18, .12, .35, 0, 0, -.5, -.18, .12, .35, 0, -.2, .3], c, g)
  tri([0, 0, -.35, .05, .55, -.75, -.05, .5, -.7, 0, .55, -.75, 0, .42, -1.05, .05, .48, -.7], c, g)
  tri([0, .05, .3, .05, .5, 1, -.05, .5, 1], c, g)
  const wings = [-1, 1].map(s => { const w = new THREE.Group(); g.add(w); tri([0, .08, -.3, s * 1.15, .1, .1, 0, .08, .35], c, w); return { w, s } })
  g.position.copy(pos); g.scale.setScalar(.62); g.rotation.order = 'YXZ'; scene.add(g); cranes.push({ g, wings, n, v: 0 })
}
const slot = new THREE.Vector3()
function flock(t, dt) {
  const s = Math.sin(plane.rotation.y), c = Math.cos(plane.rotation.y)
  for (const k of cranes) {
    const row = Math.floor(k.n / 2) + 1, side = k.n % 2 ? 1 : -1, lx = side * (2.2 + row * .85), lz = 1.2 - row * .45
    slot.set(plane.position.x + lx * c + lz * s, plane.position.y + .4 + Math.sin(t * 1.5 + k.n) * .35 + row * .12, plane.position.z - lx * s + lz * c)
    k.g.position.lerp(slot, 1 - Math.exp(-dt * (3.4 - Math.min(row, 12) * .1)))
    const d = plane.rotation.y - k.g.rotation.y; k.g.rotation.y += Math.atan2(Math.sin(d), Math.cos(d)) * Math.min(1, dt * 4); k.g.rotation.z = plane.rotation.z * .6
    for (const { w, s: q } of k.wings) w.rotation.z = q * (.25 + Math.sin(t * 9 + k.n * 1.3) * .6)
  }
}

// ── Whale and balloons ──
const whale = new THREE.Group(); scene.add(whale)
mesh(new THREE.IcosahedronGeometry(3, 1).scale(.8, .75, 1.7), C.blue, 0, 0, 0, whale); mesh(new THREE.IcosahedronGeometry(2.8, 1).scale(.78, .5, 1.6), C.paper, 0, -.85, .1, whale)
for (const s of [-1, 1]) { const f = mesh(new THREE.ConeGeometry(.9, 2.8, 3), C.blue, s * 1.2, .2, -6.2, whale); f.rotation.set(Math.PI / 2, 0, s * .9 + Math.PI); mesh(new THREE.SphereGeometry(.22, 8, 6), C.ink, s * 2.05, .2, 2.4, whale) }
mesh(new THREE.ConeGeometry(1.3, 3.4, 6).rotateX(-Math.PI / 2), C.blue, 0, .1, -5, whale)
const balloons = [C.red, C.gold, C.blue, C.coral].map((c, i) => {
  const g = new THREE.Group(); for (let k = 0; k < 8; k++) mesh(new THREE.SphereGeometry(3, 2, 8, k * Math.PI / 4, Math.PI / 4), k % 2 ? C.paper : c, 0, 5, 0, g)
  mesh(new THREE.BoxGeometry(1.3, 1, 1.3), C.sand, 0, 0, 0, g); for (const [x, z] of [[-.6, -.6], [.6, -.6], [-.6, .6], [.6, .6]]) mesh(new THREE.CylinderGeometry(.03, .03, 2.6, 4), C.ink, x, 1.6, z, g)
  g.userData = { a: i * 1.6 + .4, r: 44 + i * 9 }; scene.add(g); return g
})

// ── Letter dropped from the plane on delivery ──
export function dropLetter(i, done) {
  const g = new THREE.Group(); mesh(new THREE.BoxGeometry(1.8, 1.2, .08), C.paper, 0, 0, 0, g); mesh(new THREE.CylinderGeometry(.22, .22, .12, 10).rotateX(Math.PI / 2), C.red, 0, 0, .05, g)
  g.position.copy(plane.position); scene.add(g)
  gsap.to(g.position, { x: i.pos.x + i.front.x * 5.5, z: i.pos.z + i.front.z * 5.5, duration: 1.25, ease: 'sine.out' })
  gsap.to(g.position, { y: 2.4, duration: 1.25, ease: 'bounce.out' })
  gsap.to(g.rotation, { x: Math.PI * 4.5, y: 5, duration: 1.25, onComplete: () => { done(); gsap.to(g.scale, { x: 0, y: 0, z: 0, delay: 1, duration: .4, onComplete: () => scene.remove(g) }) } })
}

export function updateLife(t, dt) {
  applyTime(); flock(t, dt); night.position.copy(camera.position)
  for (const l of lanterns) { l.position.y = l.userData.y + Math.sin(t + l.userData.o) * .5; l.rotation.y = t * .4 + l.userData.o }
  const p = (t % 11) / 4.2, n = Math.floor(t / 11) * 2.1 + .6
  whale.visible = p < 1
  if (p < 1) { const a = n + p * .42; whale.position.set(Math.cos(a) * 52, Math.sin(p * Math.PI) * 9 - 4, Math.sin(a) * 52); whale.rotation.set((p - .5) * 1.9, -a, 0, 'YXZ') }
  balloons.forEach((b, i) => { const a = b.userData.a + t * .012; b.position.set(Math.cos(a) * b.userData.r, 15 + i * 2 + Math.sin(t * .5 + i) * 1.4, Math.sin(a) * b.userData.r); b.rotation.y = t * .15 + i })
}
