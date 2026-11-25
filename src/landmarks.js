import * as THREE from 'three'
// Everything is cut paper: flat-shaded primitives in a small set of paper colours.
export const C = { paper: 0xf6f8fb, red: 0xd8343f, blue: 0x2057a8, gold: 0xf4a92b, leaf: 0x4f9d5b, deep: 0x2d6e4f, ink: 0x14304a, coral: 0xf27f62, sky: 0x7cc4d8, sand: 0xf3cf8e, pink: 0xf3a6b5 }
const cache = {}
export const mat = c => (cache[c] ??= new THREE.MeshStandardMaterial({ color: c, roughness: .95, flatShading: true, side: THREE.DoubleSide }))
export function mesh(geo, c, x = 0, y = 0, z = 0, parent) {
  const m = new THREE.Mesh(geo, mat(c)); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; parent?.add(m); return m
}
const box = (g, c, w, h, d, x, y, z) => mesh(new THREE.BoxGeometry(w, h, d), c, x, y + h / 2, z, g)
const cyl = (g, c, r1, r2, h, x, y, z, n = 10) => mesh(new THREE.CylinderGeometry(r1, r2, h, n), c, x, y + h / 2, z, g)
const ball = (g, c, r, x, y, z) => mesh(new THREE.IcosahedronGeometry(r, 1), c, x, y, z, g)
const ext = (g, shape, c, d, x, y, z) => mesh(new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false }), c, x, y, z, g)
const poly = pts => new THREE.Shape(pts.map(p => new THREE.Vector2(...p)))
const roof = (g, c, w, h, d, x, y, z) => ext(g, poly([[-w / 2, 0], [w / 2, 0], [0, h]]), c, d, x, y, z - d / 2)
const heart = s => { const h = new THREE.Shape(); h.moveTo(0, -s); h.bezierCurveTo(-1.6 * s, 0, -1.1 * s, 1.2 * s, 0, .45 * s); h.bezierCurveTo(1.1 * s, 1.2 * s, 1.6 * s, 0, 0, -s); return h }
export const star = (r, r2 = r * .48) => poly([...Array(10)].map((_, i) => { const a = i * Math.PI / 5 + Math.PI / 2, q = i % 2 ? r2 : r; return [Math.cos(a) * q, Math.sin(a) * q] }))
const tree = (g, x, z, s = 1) => {
  cyl(g, C.ink, .15 * s, .15 * s, .7 * s, x, 0, z, 5)
  mesh(new THREE.ConeGeometry(.9 * s, 1.5 * s, 6), C.deep, x, 1.3 * s, z, g)
  mesh(new THREE.ConeGeometry(.65 * s, 1.3 * s, 6), C.leaf, x, 2.1 * s, z, g)
}
const house = (g, c, x, z, s = 1) => { box(g, C.paper, 1.8 * s, 1.4 * s, 1.6 * s, x, 0, z); roof(g, c, 2.2 * s, 1.1 * s, 1.9 * s, x, 1.4 * s, z); box(g, C.ink, .4 * s, .8 * s, .1, x, 0, z + .82 * s) }

// Each builder fills a group (front = +z) and may return an animate(t).
export const build = {
  home(g) {
    box(g, C.ink, 2.6, .08, 13, 0, 0, 0)
    for (let i = -5; i < 6; i += 2) box(g, C.paper, .3, .1, 1, 0, 0, i)
    // Hangar: a barrel roof along z, with a blue door.
    mesh(new THREE.CylinderGeometry(2.1, 2.1, 4, 16).rotateX(Math.PI / 2), C.red, -4.2, .6, -1, g)
    mesh(new THREE.CircleGeometry(1.8, 16), C.paper, -4.2, .6, 1.03, g)
    box(g, C.blue, 2, 1.6, .1, -4.2, 0, 1.05)
    cyl(g, C.ink, .08, .08, 4, 4, 0, -2, 5)
    const sock = new THREE.Group(); sock.position.set(4, 3.7, -2); g.add(sock)
    const cone = mesh(new THREE.ConeGeometry(.5, 2.2, 8, 1, true).rotateZ(-Math.PI / 2).translate(1.1, 0, 0), C.coral, 0, 0, 0, sock)
    tree(g, 4.5, 2.5); tree(g, 5.4, .8, .8); tree(g, -5, 4, 1.1)
    return t => { sock.rotation.y = Math.sin(t) * .4; cone.rotation.z = Math.sin(t * 2) * .12 }
  },
  experience(g) {
    // One step per job, flag on the newest.
    const cs = [C.paper, C.sky, C.blue, C.gold, C.coral, C.red]
    cs.forEach((c, i) => box(g, c, 1.6, .8 + i * .85, 3, -4 + i * 1.6, 0, 0))
    cyl(g, C.ink, .08, .08, 3, 4, 5, 0, 5)
    const f = mesh(new THREE.PlaneGeometry(1.9, 1.1).translate(.95, 0, 0), C.gold, 4, 7.4, 0, g)
    tree(g, -4.4, 3.2, .9); tree(g, -5.6, -1.6); tree(g, 5.4, 2.6, .8)
    return t => { f.rotation.y = Math.sin(t * 2.6) * .35 }
  },
  payroll(g) {
    box(g, C.paper, 3.6, 7, 3, -1.4, 0, -1); box(g, C.red, 4, .4, 3.4, -1.4, 7, -1)
    for (let y = 0; y < 5; y++) for (let x = 0; x < 3; x++) box(g, (x + y) % 3 ? C.blue : C.gold, .7, .8, .1, -2.5 + x * 1.1, 1.2 + y * 1.15, .52)
    box(g, C.ink, 1, 1, .12, -1.4, 0, .52)
    // Payslip rolling out beside the office
    const slip = new THREE.Group(); g.add(slip); box(slip, C.paper, 2.6, 4, .12, 0, 0, 0); box(slip, C.leaf, 2, .4, .05, 0, 3.2, .08)
    for (const y of [.5, 1.1, 1.7, 2.3]) box(slip, C.sky, y > 2 ? 1.4 : 2, .22, .05, y > 2 ? -.3 : 0, y, .08)
    slip.position.set(2.9, .3, -.2); slip.rotation.y = -.25
    const coins = [[1.3, 2.4, 4], [2.6, 2.9, 2], [-4.3, 1.6, 3]].flatMap(([x, z, k]) => [...Array(k)].map((_, i) => cyl(g, C.gold, .6, .6, .26, x, i * .32, z, 14)))
    return t => { slip.position.y = .3 + Math.sin(t) * .25; coins.forEach((c, i) => { c.rotation.y = t * .5 + i }) }
  },
  opensource(g) {
    // A commit graph grown like a tree.
    const P = [[0, .8], [0, 3], [0, 5.2], [0, 7.4], [2.4, 4.2], [2.4, 6.2], [-2.4, 2.4], [-2.4, 4.8], [-4, 6.4]]
    const E = [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 3], [0, 6], [6, 7], [7, 2], [7, 8]]
    for (const [a, b] of E) { const [x, y] = P[a], dx = P[b][0] - x, dy = P[b][1] - y, L = Math.hypot(dx, dy); mesh(new THREE.BoxGeometry(.26, L, .26), C.ink, x + dx / 2, y + dy / 2, 0, g).rotation.z = -Math.atan2(dx, dy) }
    const ns = P.map(([x, y], i) => ball(g, [C.red, C.gold, C.blue, C.coral, C.leaf][i % 5], .68, x, y, 0))
    box(g, C.sand, 3, 1, 2, 0, 0, 0); tree(g, 4.6, 1.5, .9); tree(g, -5, 2, .8)
    return t => ns.forEach((n, i) => { n.scale.setScalar(1 + Math.sin(t * 2.4 - i) * .13); n.rotation.y = t + i })
  },
  insurance(g) {
    house(g, C.coral, -2, .6, 1.1); house(g, C.blue, 1.8, 1, .95); house(g, C.gold, .1, -2, 1.1); tree(g, 3.8, -1, .7); tree(g, -4, -1, .8)
    const u = new THREE.Group(); g.add(u); u.position.y = 1
    cyl(u, C.ink, .13, .13, 7.4, 0, 0, 0, 6)
    for (let i = 0; i < 10; i++) mesh(new THREE.ConeGeometry(5.4, 2.6, 1, 1, true, i * Math.PI / 5, Math.PI / 5), i % 2 ? C.paper : C.red, 0, 6.3, 0, u)
    ball(u, C.gold, .3, 0, 7.8, 0)
    return t => { u.rotation.y = t * .25; u.rotation.z = Math.sin(t * .9) * .03 }
  },
  sendwish(g) {
    const W = 7, H = 4.2
    ext(g, poly([[-W / 2, 0], [W / 2, 0], [W / 2, H], [-W / 2, H]]), C.paper, .15, 0, 0, -.8)
    ext(g, poly([[-W / 2, H], [W / 2, H], [0, H + 2.8]]), C.sky, .12, 0, 0, -.85)
    const card = new THREE.Group(); g.add(card); box(card, C.gold, 5.6, 4.2, .12, 0, 0, 0); ext(card, heart(.95), C.red, .15, 0, 2.9, .08)
    ext(g, poly([[-W / 2, 0], [W / 2, 0], [W / 2, H], [0, 1.5], [-W / 2, H]]), C.sky, .12, 0, 0, .45)
    ext(g, poly([[-W / 2, 0], [W / 2, 0], [0, 2.1]]), C.blue, .1, 0, 0, .6)
    const bs = [C.red, C.gold, C.coral, C.pink].map((c, i) => { const b = ball(g, c, .7, [-4.6, 4.6, -5.2, 5.3][i], 4, [-1, -1, 1, 1.2][i]); cyl(b, C.ink, .025, .025, 2.4, 0, -3.1, 0, 4); return b })
    return t => { card.position.y = 2.2 + Math.sin(t * .8) * .7; bs.forEach((b, i) => { b.position.y = 4.2 + Math.sin(t + i * 1.7) * .5 }) }
  },
  theecards(g) {
    const l = box(g, C.pink, 5, 6, .15, -2.2, 0, -.9), r = box(g, C.coral, 5, 6, .15, 2.2, 0, -.9); l.rotation.y = .5; r.rotation.y = -.5
    cyl(g, C.paper, 2.2, 2.3, 1.3, 0, 0, 1.2, 16); cyl(g, C.red, 2.25, 2.25, .25, 0, 1.2, 1.2, 16)
    cyl(g, C.gold, 1.4, 1.5, 1.1, 0, 1.45, 1.2, 14); cyl(g, C.paper, 1.45, 1.45, .2, 0, 2.5, 1.2, 14)
    const fl = [-.8, 0, .8].map(x => { cyl(g, C.blue, .1, .1, .8, x, 2.7, 1.2, 6); return mesh(new THREE.ConeGeometry(.16, .5, 5), C.gold, x, 3.75, 1.2, g) })
    const st = [[-3, 5], [2.8, 4.7], [0, 5.8], [-2.4, 3.4], [3.2, 3]].map(([x, y]) => ext(g, star(.5), C.gold, .1, x, y, .8))
    return t => { fl.forEach((f, i) => f.scale.setScalar(1 + Math.sin(t * 9 + i * 2) * .18)); st.forEach((s, i) => { s.rotation.z = Math.sin(t + i) * .5 }) }
  },
  school(g) {
    box(g, C.gold, 8, 2.8, 2.8, 0, 0, -.5); roof(g, C.red, 3.4, 1.4, 3.1, -2.8, 2.8, -.5); roof(g, C.red, 3.4, 1.4, 3.1, 2.8, 2.8, -.5)
    box(g, C.paper, 2.6, 5, 3.2, 0, 0, -.3); mesh(new THREE.ConeGeometry(2.2, 1.8, 4), C.blue, 0, 5.9, -.3, g).rotation.y = Math.PI / 4
    mesh(new THREE.CircleGeometry(.85, 20), C.sky, 0, 4, 1.32, g)
    const hand = mesh(new THREE.BoxGeometry(.1, .6, .06).translate(0, .3, 0), C.ink, 0, 4, 1.38, g)
    box(g, C.ink, 1, 1.7, .1, 0, 0, 1.35); for (const x of [-3.4, -2.2, 2.2, 3.4]) box(g, C.blue, .7, 1, .1, x, 1, .95)
    cyl(g, C.ink, .05, .05, 1.6, 0, 6.6, -.3, 4)
    const flag = mesh(new THREE.PlaneGeometry(1.3, .7).translate(.65, 0, 0), C.red, 0, 7.8, -.3, g)
    tree(g, -4.6, 2); tree(g, 4.6, 2)
    return t => { hand.rotation.z = -t * .8; flag.rotation.y = Math.sin(t * 3) * .3 }
  },
  shop(g) {
    box(g, C.paper, 6, 4, 3.6, 0, 0, -1); box(g, C.blue, 6.4, .4, 4, 0, 4, -1); box(g, C.sky, 3, 1.8, .1, -1.2, .6, .85); box(g, C.ink, 1.2, 2.2, .1, 1.9, 0, .85)
    for (let i = 0; i < 8; i++) { const a = box(g, i % 2 ? C.paper : C.red, .8, .12, 2, -2.8 + i * .8, 2.9, 1.6); a.rotation.x = .45 }
    const tag = new THREE.Group(); g.add(tag); tag.position.set(0, 5.9, 0); ext(tag, poly([[-1.8, -.8], [1, -.8], [1.8, 0], [1, .8], [-1.8, .8]]), C.gold, .2, 0, 0, -.1); ball(tag, C.paper, .24, 1.1, 0, 0)
    const ps = [[-3.6, 2.6, 1], [-2.7, 3.5, .7], [3.6, 2.4, 1.2], [3.8, 3.8, .7]].map(([x, z, s]) => { const p = box(g, C.sand, 1.2 * s, 1.1 * s, 1.2 * s, x, 0, z); box(p, C.red, 1.22 * s, .2 * s, 1.22 * s, 0, -.1 * s, 0); return p })
    return t => { tag.rotation.y = t * .7; ps.forEach((p, i) => { p.rotation.y = i * .5 + Math.sin(t + i) * .1 }) }
  },
  trading(g) {
    const bars = [...Array(9)].map((_, i) => {
      const n = new THREE.Group(); g.add(n); n.position.set(-4.4 + i * 1.1, 0, Math.sin(i * 2) * .5)
      return { b: box(n, [1, 0, 1, 1, 0, 1, 0, 1, 1][i] ? C.leaf : C.red, .78, 1, .78, 0, 0, 0), w: box(n, C.ink, .1, 1, .1, 0, 0, 0), i }
    })
    const a = ext(g, poly([[-.5, -1], [.5, -1], [.5, .2], [1.1, .2], [0, 1.4], [-1.1, .2], [-.5, .2]]), C.gold, .3, 0, 8.6, 0)
    return t => {
      for (const { b, w, i } of bars) { const h = 1.6 + i * .22 + Math.sin(t * 1.3 + i * 1.9) * .6, y = .75 + i * .2 + Math.sin(t * .9 + i * .8) * .45; b.scale.y = h; b.position.y = y + h / 2; w.scale.y = h + 1.6; w.position.y = y + h / 2 }
      a.position.y = 6.9 + Math.sin(t * 2) * .3
    }
  },
  ai(g) {
    const h = new THREE.Group(); g.add(h)
    box(g, C.blue, 4, 2, 2.6, 0, 0, 0); box(g, C.gold, 1.6, .9, .1, 0, .6, 1.32); box(h, C.ink, 1, .4, 1, 0, -.2, 0)
    box(h, C.sky, 5, 3.6, 3.2, 0, .2, 0); box(h, C.ink, 4, 2, .1, 0, 1, 1.6)
    const eyes = [-1, 1].map(x => mesh(new THREE.CircleGeometry(.45, 16), C.gold, x, 2.15, 1.68, h))
    box(h, C.coral, 1.4, .18, .1, 0, 1.3, 1.65); for (const s of [-1, 1]) box(h, C.red, .5, 1.3, 1.3, s * 2.75, 1.2, 0)
    cyl(h, C.ink, .08, .08, 1.2, 0, 3.8, 0, 5); const ant = ball(h, C.red, .42, 0, 5.2, 0)
    for (const s of [-1, 1]) { const m = box(g, C.sky, .8, 1.8, .8, s * 2.6, .1, .3); m.rotation.z = s * .35 }
    return t => { h.rotation.y = Math.sin(t * .6) * .4; h.position.y = 2.2 + Math.sin(t * 1.4) * .12; const b = t % 3.4 > 3.25 ? .1 : 1; eyes.forEach(e => { e.scale.y = b }); ant.scale.setScalar(1 + Math.sin(t * 4) * .15) }
  },
  stack(g) {
    const layers = [C.red, C.paper, C.blue, C.gold, C.leaf, C.coral].map((c, i) => box(g, c, 5 - i * .45, .8, 4 - i * .3, 0, 0, 0))
    const s = ext(g, star(1.1), C.gold, .25, 0, 8, 0)
    const gear = new THREE.Group(); g.add(gear); gear.position.set(-4, 1.7, 1.6)
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; mesh(new THREE.BoxGeometry(.5, .5, .4), C.ink, Math.cos(a) * 1.35, Math.sin(a) * 1.35, 0, gear).rotation.z = a }
    mesh(new THREE.CylinderGeometry(1.2, 1.2, .4, 16).rotateX(Math.PI / 2), C.ink, 0, 0, 0, gear)
    tree(g, 4.2, 1.5); tree(g, 3.6, -2.4, 1.2)
    return t => { layers.forEach((b, i) => { b.position.y = .4 + i * (1 + Math.sin(t * .9) * .08); b.rotation.y = i * .25 + Math.sin(t * .5 + i) * .12 }); s.rotation.y = t; gear.rotation.z = t * .6 }
  },
  contact(g) {
    for (let i = 0; i < 5; i++) cyl(g, i % 2 ? C.paper : C.red, 1.5 - i * .14, 1.64 - i * .14, 1.5, 0, i * 1.5, -1, 14)
    cyl(g, C.ink, 1.4, 1.4, .25, 0, 7.5, -1, 14); cyl(g, C.gold, .7, .7, 1.3, 0, 7.7, -1, 10); mesh(new THREE.ConeGeometry(1.3, 1.2, 12), C.blue, 0, 9.6, -1, g)
    const beam = new THREE.Mesh(new THREE.ConeGeometry(2, 14, 14, 1, true).rotateZ(Math.PI / 2).translate(7, 0, 0), new THREE.MeshBasicMaterial({ color: 0xfff0b8, transparent: true, opacity: .25, depthWrite: false, side: THREE.DoubleSide }))
    beam.position.set(0, 8.3, -1); g.add(beam)
    box(g, C.ink, .3, 1.7, .3, 3.4, 0, 2); box(g, C.red, 1.2, 1.1, 2, 3.4, 1.7, 2); const fl = box(g, C.gold, .1, 1, .3, 4.1, 2.4, 2); tree(g, -3.8, 1); tree(g, -3, -3, 1.2)
    return t => { beam.rotation.y = t * .7; fl.rotation.x = Math.sin(t * 2) * .15 }
  },
}

// Contour-map island: stacked sheets of cut paper.
export function islandBase(R, seed, tones) {
  const g = new THREE.Group()
  tones.forEach((c, k) => {
    const r = R * (1 - k * .13), s = new THREE.Shape()
    for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI * 2, q = r * (1 + .07 * Math.sin(a * 3 + seed) + .05 * Math.sin(a * 5 + seed * 2.3)); s[i ? 'lineTo' : 'moveTo'](Math.cos(a) * q, Math.sin(a) * q) }
    const m = mesh(new THREE.ExtrudeGeometry(s, { depth: .55, bevelEnabled: false }).rotateX(-Math.PI / 2), c, 0, -.3 + k * .55, 0, g); m.castShadow = k > 0
  })
  return g
}
