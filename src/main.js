import '@fontsource-variable/bricolage-grotesque/standard.css'
import '@fontsource/courier-prime/400.css'
import '@fontsource/courier-prime/700.css'
import './style.css'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { $, calm, esc, intro, openPanel, closePanel, toast, openPage, closePage } from './ui.js'
import { unlock, notes, toggle } from './sound.js'
import * as W from './world.js'
import * as L from './life.js'
import { envelope, foldPlane } from './envelope.js'

let renderer
try { renderer = new THREE.WebGLRenderer({ canvas: $('#scene'), antialias: true }) } catch { /* no WebGL: show the page version */ }
if (renderer) run(); else openPage(null, () => false)

function run() {
  const { scene, camera, islands, stars, plane } = W
  renderer.shadowMap.enabled = true; renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = .95
  L.updateLife(0, 0); W.makeStamps(renderer); L.foldIslands()

  // ── state ──
  const coarse = matchMedia('(pointer: coarse)').matches
  let mode = 'intro', focus = islands[0], target = null, near = null, reading = false, dismissed = null
  let th = 0, speed = 12, turn = 0, lift = 0, t = 0
  const blend = { k: 1 }, keys = {}, stick = { x: 0, y: 0 } // blend.k: 0 chase camera, 1 island camera
  const clearKeys = () => { for (const k in keys) keys[k] = false; stick.x = stick.y = 0 }
  plane.position.set(0, 9, 26)
  const save = () => { try { localStorage.setItem('raj-album', JSON.stringify({ i: islands.filter(x => x.seen).map(x => x.id), s: stars.filter(x => x.got).map(x => x.name) })) } catch { /* private mode */ } }
  try {
    const d = JSON.parse(localStorage.getItem('raj-album') || '{}')
    islands.forEach(x => { x.seen = !!d.i?.includes(x.id) }); stars.forEach(x => { if (d.s?.includes(x.name)) { x.got = true; x.m.visible = false } })
  } catch { /* ignore a bad save */ }
  islands.forEach(i => { if (i.seen) { L.unfold(i, true); L.light(i) } }); stars.forEach(s => { if (s.got) L.addCrane(plane.position) })
  const dayK = () => islands.filter(i => i.seen).length / islands.length
  L.time.k = dayK()
  const got = n => stars.some(s => s.got && s.name === n)

  // ── HUD ──
  const album = $('#album'), labels = $('#labels')
  for (const i of islands) {
    i.btn = document.createElement('button'); i.btn.className = 'stamp'; i.btn.title = `Fly to ${i.name}`; i.btn.setAttribute('aria-label', `Fly to ${i.name}`); i.btn.innerHTML = `<img src="${i.img}" alt="">`
    i.btn.onclick = () => { stopTour(); flyTo(i); i.btn.blur() }; album.append(i.btn)
    i.label = document.createElement('span'); i.label.innerHTML = esc(i.name); labels.append(i.label)
  }
  function hud() {
    $('#score').textContent = `Stamps ${islands.filter(i => i.seen).length}/${islands.length}   Stars ${stars.filter(s => s.got).length}/${stars.length}`
    islands.forEach(i => { i.btn.classList.toggle('got', i.seen); i.btn.classList.toggle('going', i === target); i.label.classList.toggle('seen', i.seen) })
  }
  hud()
  let tour = false, tourTimer, queue = [], busy = false
  const spin = { v: 0 }, roll = () => { if (!gsap.isTweening(spin)) { spin.v = 0; notes([440, 660, 880], .05); gsap.to(spin, { v: Math.PI * 2, duration: calm ? .01 : .9, ease: 'power2.inOut', onComplete: () => { spin.v = 0 } }) } }
  const celebrate = () => { for (let k = 0; k < 4; k++) setTimeout(() => W.confetti(new THREE.Vector3(focus.pos.x + (k - 1.5) * 4, 9 + k * 2, focus.pos.z), calm ? 8 : 36), k * 260) }
  const stopTour = () => { if (tour) { tour = false; clearTimeout(tourTimer); $('#tour').textContent = 'Guided tour'; document.body.classList.remove('touring') } }
  const startTour = () => { if (mode === 'panel') leave(); queue = islands.filter(i => !i.seen); if (!queue.length) queue = [...islands]; tour = true; $('#tour').textContent = 'Stop tour'; document.body.classList.add('touring'); flyTo(queue.shift()) }
  const api = { islands, byId: id => islands.find(i => i.id === id), flyTo: i => flyTo(i), tour: startTour, roll, celebrate, time: k => L.setTime(k), read: () => read() }
  $('#tour').onclick = e => { e.target.blur(); if (tour) { stopTour(); cancel() } else startTour() }
  $('#roll').onclick = roll
  $('#panel').addEventListener('pointerdown', stopTour)
  function finale() {
    const f = $('#finale'); f.hidden = false
    f.innerHTML = `<div class="cardback"><h2 id="finTitle">Every letter delivered</h2><p class="lede">You built the whole archipelago. Thank you for flying.</p><div class="grid">${islands.map(i => `<img src="${i.img}" alt="${esc(i.name)} stamp">`).join('')}</div><div class="row"><button class="btn primary" id="finMail">Write to me</button><button class="btn" id="finFly">Keep flying</button></div></div>`
    $('#finFly').onclick = () => { f.hidden = true }; $('#finMail').onclick = () => { f.hidden = true; flyTo(api.byId('contact')) }
    if (!calm) { gsap.from('#finale .cardback', { rotateY: 90, scale: .6, duration: 1.1, ease: 'back.out(1.4)' }); gsap.from('#finale img', { scale: 3, opacity: 0, rotate: () => gsap.utils.random(-50, 50), stagger: .1, delay: .6, duration: .45, ease: 'power3.in' }) }
    notes([392, 523, 659, 784, 1047, 1319], .12); for (let k = 0; k < 8; k++) setTimeout(() => W.confetti(new THREE.Vector3(plane.position.x + (Math.random() - .5) * 30, 16, plane.position.z + (Math.random() - .5) * 30), 20), k * 350)
    $('#finFly').focus()
  }
  let finDue = false
  function flyTo(i) { if (mode === 'panel') leave(); target = i; dismissed = null; toast(`To ${i.name}`); hud() }
  function land(i) {
    if (mode !== 'fly' || busy) return
    if (!i.up) L.unfold(i, calm)
    if (i.seen || calm) return arrive(i)
    busy = true; $('#prompt').hidden = true; target = null; notes([880, 660, 520, 440], .12); L.dropLetter(i, () => { busy = false; arrive(i) })
  }
  function arrive(i) {
    if (mode !== 'fly') return
    mode = 'panel'; focus = i; target = near = null; clearKeys()
    $('#prompt').hidden = $('#hud').hidden = album.hidden = $('#touch').hidden = $('#compass').hidden = true
    const fresh = !i.seen; i.seen = true; save(); hud()
    gsap.to(blend, { k: 1, duration: calm ? .01 : 1.6, ease: 'power2.inOut', overwrite: true })
    if (fresh) { if (!calm) W.confetti(new THREE.Vector3(i.pos.x, 12, i.pos.z), 70); notes([392, 523, 659, 784]) } else notes([523, 659])
    if (fresh) { L.light(i); L.setTime(dayK()); finDue = islands.every(x => x.seen) }
    const next = islands[(i.i + 1) % islands.length]
    openPanel(i, next, got, () => { stopTour(); leave() }, () => flyTo(next), api)
    if (tour) { clearTimeout(tourTimer); tourTimer = setTimeout(() => { if (!tour || mode !== 'panel' || reading) return; const nx = queue.shift(); if (nx) flyTo(nx); else { stopTour(); leave() } }, 9000) }
  }
  function leave() {
    if (mode !== 'panel') return
    mode = 'fly'; dismissed = focus; closePanel(); $('#hud').hidden = album.hidden = false; $('#touch').hidden = !coarse
    if (finDue) { finDue = false; stopTour(); setTimeout(finale, 900) }
    gsap.to(blend, { k: 0, duration: calm ? .01 : 1.4, ease: 'power2.inOut', overwrite: true }); document.activeElement?.blur()
  }
  let leaving = false
  $('#start').onclick = () => {
    if (mode !== 'intro' || leaving) return
    leaving = true; unlock(); notes([262, 330, 392, 523]); document.activeElement?.blur()
    const done = () => { $('#intro').hidden = true }
    if (calm) done(); else gsap.to('#intro', { xPercent: -135, duration: .8, ease: 'power3.in', onComplete: done })
    foldPlane(() => { mode = 'fly'; launch() })
  }
  function launch() {
    $('#hud').hidden = album.hidden = false; $('#touch').hidden = !coarse
    if (!calm) gsap.from('.stamp', { y: 120, rotate: () => gsap.utils.random(-30, 30), stagger: .05, delay: .6, duration: .7, ease: 'back.out(1.4)', clearProps: 'transform' })
    gsap.to(blend, { k: 0, duration: calm ? .01 : 2.2, ease: 'power2.inOut', overwrite: true })
  }
  $('#prompt').onclick = () => near && land(near)
  $('#sound').onclick = e => { const on = toggle(); e.target.textContent = on ? 'Sound on' : 'Sound off'; e.target.setAttribute('aria-pressed', on); e.target.blur() }
  const read = () => {
    if (reading) return
    reading = true; clearKeys(); stopTour()
    openPage(islands, got, () => { closePage(); reading = false; if (location.hash) history.replaceState(null, '', location.pathname + location.search) })
  }
  document.querySelectorAll('[data-read]').forEach(b => { b.onclick = read })

  // ── input ──
  const map = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'boost', KeyW: 'boost', ShiftLeft: 'boost', ShiftRight: 'boost', ArrowDown: 'brake', KeyS: 'brake', Space: 'climb' }
  const cancel = () => { stopTour(); if (target) { target = null; hud() } }
  addEventListener('keydown', e => {
    if (reading) { if (e.key === 'Escape') $('#pageClose').click(); return }
    if (mode === 'panel') { if (e.key === 'Escape') { stopTour(); leave() } return }
    if (mode !== 'fly' || !$('#finale').hidden || e.ctrlKey || e.metaKey || e.altKey) return
    const onBtn = document.activeElement?.tagName === 'BUTTON'
    if (e.code === 'Enter' && near && !onBtn) { e.preventDefault(); return land(near) }
    if (e.code === 'KeyR') roll()
    const k = map[e.code]; if (!k || (e.code === 'Space' && onBtn)) return
    e.preventDefault(); keys[k] = true; if (k === 'left' || k === 'right') cancel()
  })
  addEventListener('keyup', e => { const k = map[e.code]; if (k) keys[k] = false })
  addEventListener('blur', clearKeys)
  let sx, sy, pid = null; const cv = $('#scene')
  cv.addEventListener('pointerdown', e => { if (mode !== 'fly' || pid !== null) return; pid = e.pointerId; sx = e.clientX; sy = e.clientY; cv.setPointerCapture(pid) })
  cv.addEventListener('pointermove', e => { if (e.pointerId !== pid || mode !== 'fly') return; stick.x = THREE.MathUtils.clamp((e.clientX - sx) / 90, -1, 1); stick.y = THREE.MathUtils.clamp((sy - e.clientY) / 90, -1, 1); if (Math.abs(stick.x) > .15) cancel() })
  const up = e => { if (e.pointerId === pid) { pid = null; stick.x = stick.y = 0 } }
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up)
  document.querySelectorAll('[data-key]').forEach(b => { b.onpointerdown = e => { b.setPointerCapture(e.pointerId); keys[b.dataset.key] = true }; b.onpointerup = b.onpointercancel = () => { keys[b.dataset.key] = false } })

  // ── loop ──
  const v = new THREE.Vector3(), fwd = new THREE.Vector3(), cp = new THREE.Vector3(0, 14, 40), cl = new THREE.Vector3(), fp = new THREE.Vector3(), fl = new THREE.Vector3(), look = new THREE.Vector3()
  const { clamp, smoothstep } = THREE.MathUtils
  const flat = i => Math.hypot(plane.position.x - i.pos.x, plane.position.z - i.pos.z)
  const steerTo = (x, z) => {
    const d = Math.atan2(-(x - plane.position.x), -(z - plane.position.z)) - th
    return clamp(Math.atan2(Math.sin(d), Math.cos(d)) * 1.8, -1, 1)
  }
  const circle = (i, r) => { const a = Math.atan2(plane.position.z - i.pos.z, plane.position.x - i.pos.x) + .55; return steerTo(i.pos.x + Math.cos(a) * r, i.pos.z + Math.sin(a) * r) }

  function step(dt) {
    const p = plane.position, damp = (a, b, l) => THREE.MathUtils.damp(a, b, l, dt)
    let steer = 0, want = 10
    if (mode === 'fly') {
      steer = (keys.left ? 1 : 0) - (keys.right ? 1 : 0) - stick.x
      want = keys.boost || stick.y > .8 ? 26 : keys.brake ? 7 : 14
      if (target) { steer = steerTo(target.pos.x, target.pos.z); want = 30 } else if (p.length() > 150) steer = steerTo(0, 0)
    } else steer = circle(focus, focus.R + 5)
    turn = damp(turn, clamp(steer, -1, 1), 5); speed = damp(speed, want, 1.8)
    th += turn * dt * (target ? 1.9 : 1.5)
    fwd.set(-Math.sin(th), 0, -Math.cos(th)); p.addScaledVector(fwd, speed * dt)
    let floor = 7.5; if (mode === 'fly') for (const i of islands) floor = Math.max(floor, 5 + 11 * (1 - smoothstep(flat(i), 6, 19)))
    const climb = mode === 'fly' && (keys.climb || stick.y > .4), old = p.y
    p.y = damp(p.y, climb ? 26 : floor, climb ? .9 : 1.6); lift = damp(lift, (p.y - old) / Math.max(dt, .001), 5)
    plane.rotation.set(clamp(lift * .06, -.5, .5), th, turn * .75 + Math.sin(t * 2.2) * .04 + spin.v)
    for (const i of islands) if (!i.up && flat(i) < 64) { if (L.unfold(i, calm) && mode === 'fly') notes([330, 415, 494, 587], .09) }
    if (mode !== 'fly') return

    for (const s of stars) if (!s.got) {
      const d = s.m.position.distanceTo(p); if (d < 10) s.m.position.lerp(p, 1 - Math.exp(-dt * 5))
      if (d < 2.8) { s.got = true; L.addCrane(s.m.position); save(); hud(); toast(s.name); notes([659, 880, 1175]); if (!calm) W.confetti(s.m.position, 14); gsap.to(s.m.scale, { x: 0, y: 0, z: 0, duration: .3, onComplete: () => { s.m.visible = false } }) }
    }
    near = null
    for (const i of islands) { const d = flat(i); if (d < i.R + 9) near = i; else if (dismissed === i && d > i.R + 14) dismissed = null }
    const pr = $('#prompt'), show = near && near !== dismissed && near !== target && !busy && blend.k < .5
    if (show) { const s = coarse ? `${near.seen ? "Visit" : "Deliver to"} ${near.name}` : `${near.seen ? "Visit" : "Deliver to"} ${near.name} (Enter)`; if (pr.textContent !== s) pr.textContent = s }
    pr.hidden = !show
    if (target && flat(target) < target.R + 6) land(target)
  }
  const compass = $('#compass'), needle = compass.querySelector('svg'), ctext = compass.querySelector('span'); let goal = null
  compass.onclick = () => { if (goal) flyTo(goal); compass.blur() }
  function guide() {
    goal = null; let best = 1e9; for (const i of islands) if (!i.seen && flat(i) < best) { best = flat(i); goal = i }
    if (target) { goal = target; best = flat(target) }
    compass.hidden = mode !== 'fly' || !goal; if (compass.hidden) return
    const d = Math.atan2(-(goal.pos.x - plane.position.x), -(goal.pos.z - plane.position.z)) - th
    needle.style.transform = `rotate(${-d}rad)`; const s = `${goal.name}, ${Math.round(best / 5) * 5} m`; if (ctext.textContent !== s) ctext.textContent = s
  }
  function cameraStep(dt) {
    const p = plane.position, e = 1 - Math.exp(-dt * 4.5)
    v.copy(p).addScaledVector(fwd, -12).setY(p.y + 4.6); cp.lerp(v, e); v.copy(p).addScaledVector(fwd, 9).setY(p.y + .3); cl.lerp(v, e)
    const a = mode === 'intro' ? t * .07 : Math.sin(t * .25) * .22
    v.copy(focus.front).applyAxisAngle(THREE.Object3D.DEFAULT_UP, a + .3); fp.copy(focus.pos).addScaledVector(v, innerWidth < innerHeight ? 46 : 33).setY(13); fl.copy(focus.pos).setY(4)
    const k = blend.k, w = innerWidth, h = innerHeight
    camera.position.lerpVectors(cp, fp, k); camera.position.y += Math.sin(k * Math.PI) * 6; camera.lookAt(look.lerpVectors(cl, fl, k))
    camera.fov = 50 + Math.max(0, speed - 14) * .6 * (1 - k)
    // Slide the picture away from whichever panel covers it.
    const side = mode === 'intro' || !$('#intro').hidden ? -1 : 1
    camera.setViewOffset(w, h, w > 700 ? w * .17 * k * side : 0, w > 700 ? 0 : h * .25 * k, w, h)
  }
  const placed = []
  function drawLabels() {
    placed.length = 0
    for (const i of [...islands].sort((a, b) => flat(a) - flat(b))) {
      v.set(i.pos.x, 15, i.pos.z); const d = v.distanceTo(camera.position); v.project(camera)
      const ok = mode === 'fly' && v.z < 1 && d < 170 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1, s = i.label.style, lx = v.x * innerWidth / 2, ly = v.y * innerHeight / 2, free = ok && !placed.some(q => Math.abs(q[0] - lx) < 125 && Math.abs(q[1] - ly) < 34)
      if (free) placed.push([lx, ly])
      s.display = free ? '' : 'none'; if (!free) continue
      s.opacity = clamp(2 - d / 85, .35, 1) * (1 - blend.k)
      s.transform = `translate(${(v.x * .5 + .5) * innerWidth}px,${(-v.y * .5 + .5) * innerHeight}px) translate(-50%,-50%) scale(${clamp(1.25 - d / 170, .75, 1.1)})`
    }
  }
  function size() { renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix() }
  addEventListener('resize', size); size()
  let prev = performance.now()
  renderer.setAnimationLoop(now => {
    const dt = Math.max(0, Math.min((now - prev) / 1000, .05)); prev = now; if (reading) return
    t += dt; step(dt); W.updateWorld(t, dt); W.updateTrail(dt); L.updateLife(t, dt); guide(); cameraStep(dt); W.aimSun(blend.k > .5 ? focus.pos : plane.position); drawLabels(); renderer.render(scene, camera)
  })
  if (location.hash === '#read') { $('#intro').hidden = false; intro(); read() }
  else envelope(() => { $('#intro').hidden = false; intro(); $('#start').focus({ preventScroll: true }) })
  if (import.meta.env.DEV) window.__game = { islands, stars, plane, flyTo, get mode() { return mode } }
}
