import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { animate, stagger } from 'animejs'
import { toys } from './toys.js'
import { me, experience, contact, skills, islands as data } from './content.js'
gsap.registerPlugin(ScrollTrigger); gsap.config({ nullTargetWarn: false })
export const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
export const $ = s => document.querySelector(s)
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

function body(i, got) {
  let h = `<p class="lede">${esc(i.text)}</p>`
  if (i.points) h += `<ul>${i.points.map(p => `<li>${p.href ? `<a href="${esc(p.href)}" target="_blank" rel="noopener">${esc(p.name)}</a>: ${esc(p.text)}` : esc(p)}</li>`).join('')}</ul>`
  if (i.showExperience) h += `<div class="grp"><ul>${experience.map(e => `<li><b>${esc(e.role)}, ${esc(e.company)}</b><br>${esc(e.years)}<br>${esc(e.text)}</li>`).join('')}</ul></div>`
  for (const g of i.groups ?? []) h += `<div class="grp"><b>${esc(g.title)}</b><ul>${g.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`
  if (i.stack) h += `<div class="chips">${i.stack.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>`
  if (i.showSkills) for (const g of new Set(skills.map(s => s.group))) h += `<div class="grp"><b>${esc(g)}</b><div class="chips">${skills.filter(s => s.group === g).map(s => `<span class="chip ${got(s.name) ? 'got' : ''}">${esc(s.name)}</span>`).join('')}</div></div>`
  if (i.showContact) h += contact.length ? `<ul>${contact.map(c => `<li><b>${esc(c.label)}</b> <a href="${esc(c.href)}">${esc(c.value)}</a></li>`).join('')}</ul>` : '<p class="empty">Contact details are coming soon.</p>'
  return h
}
const visit = i => i.link ? `<a class="btn primary" href="${esc(i.link)}" target="_blank" rel="noopener">${esc(i.linkLabel ?? `Visit ${i.title}`)}</a>` : ''

export function intro() {
  $('#name').innerHTML = me.name.split(' ').map(w => `<div>${[...w].map(c => `<span>${esc(c)}</span>`).join('')}</div>`).join(''); $('#name').setAttribute('aria-label', me.name)
  $('#role').textContent = me.role; $('#introText').textContent = me.intro
  $('#keys').textContent = matchMedia('(pointer: coarse)').matches ? 'Drag to steer. Tap a stamp to fly there and deliver a letter.' : 'Arrow keys or WASD to steer. Space climbs, Shift boosts, R rolls. Enter delivers a letter.'
  if (calm) return
  animate('#name span', { y: ['60%', '0%'], rotate: [-25, 0], opacity: [0, 1], delay: stagger(90), duration: 1000, ease: 'outElastic(1,.6)' })
  gsap.from('#intro>*:not(h1)', { y: 24, autoAlpha: 0, stagger: .1, delay: .35, duration: .7, ease: 'power3.out' })
}
let untoy
export function dropToy() { untoy?.(); untoy = null }
export function openPanel(i, next, got, onClose, onNext, api) {
  dropToy()
  const p = $('#panel'); gsap.killTweensOf(p); p.hidden = false; p.scrollTop = 0
  $('#panelBody').innerHTML = `<div class="bigstamp"><img src="${i.img || ''}" alt=""><i>${esc(me.name)}<br>Air Mail</i></div><p class="kind">${esc(i.kind)}</p><h2 id="panelTitle">${esc(i.title)}</h2><div class="spacer"></div><div class="paper">${toys[i.id] ? `<section class="toy"><h3>${esc(toys[i.id].title)}</h3><div class="play"></div></section>` : ''}${body(i, got)}</div><div class="actions">${visit(i)}<button class="btn" id="close">Back to flying</button><button class="btn" id="next">Next: ${esc(next.name)}</button></div>`
  if (toys[i.id]) untoy = toys[i.id].run($('#panel .play'), api)
  $('#close').onclick = onClose; $('#next').onclick = onNext
  if (!calm) {
    const narrow = innerWidth <= 700
    gsap.fromTo(p, narrow ? { yPercent: 100, xPercent: 0 } : { xPercent: 105, yPercent: 0, rotate: 2 }, { xPercent: 0, yPercent: 0, rotate: 0, duration: .75, ease: 'power3.out' })
    gsap.from('#panelBody>*:not(.bigstamp):not(.paper)', { y: 20, opacity: 0, stagger: .05, delay: .3, duration: .5 })
    gsap.from('#panel .paper>*', { rotateX: -80, opacity: 0, transformOrigin: '50% 0', transformPerspective: 900, stagger: .13, delay: .35, duration: .8, ease: 'back.out(1.3)', clearProps: 'transform' })
    gsap.from('#panel .paper>.chips>*', { scale: 0, rotate: () => gsap.utils.random(-30, 30), stagger: .04, delay: .9, duration: .5, ease: 'back.out(2)', clearProps: 'transform' })
    animate('.bigstamp', { scale: [2.4, 1], rotate: [14, 2], opacity: [0, 1], delay: 600, duration: 450, ease: 'outBack(1.4)' })
    animate('.bigstamp i', { scale: [3, 1], rotate: [-50, -16], opacity: [0, 1], delay: 1050, duration: 300, ease: 'inQuad' })
  }
  $('#close').focus({ preventScroll: true })
}
export function closePanel() {
  dropToy()
  const p = $('#panel'); if (calm) { p.hidden = true; return }
  gsap.to(p, { ...(innerWidth <= 700 ? { yPercent: 100 } : { xPercent: 105 }), duration: .45, ease: 'power2.in', overwrite: true, onComplete: () => { p.hidden = true } })
}
let toastAnim
export function toast(text) {
  const t = $('#toast'); t.textContent = text; toastAnim?.cancel()
  toastAnim = animate(t, calm ? { opacity: [1, 1, 0], duration: 1600 } : { opacity: [0, 1, 1, 0], y: [30, 0, 0, -30], rotate: [-4, -2, -2, 0], duration: 1600, ease: 'outCubic' })
}

// Plain scrolling version: Lenis for smooth scroll, ScrollTrigger for parallax.
let lenis, gctx, tick
export function openPage(islands, got, onClose) {
  const pg = $('#page'); pg.hidden = false; pg.scrollTop = 0
  $('#pageBody').innerHTML = `<div class="top"><button class="btn" id="pageClose">Fly instead</button></div><header><h1>${esc(me.name)}</h1><p><b>${esc(me.role)}.</b> ${esc(me.intro)}</p></header>` +
    (islands ?? data).filter(i => i.id !== 'home' || i.points).map((i, k) => `<section class="entry ${k ? '' : 'first'}">${i.img ? `<figure><img src="${i.img}" alt="Paper model: ${esc(i.name)}"></figure>` : ''}<div><p class="kind">${esc(i.kind)}</p><h2>${esc(i.title)}</h2>${body(i, got)}${i.link ? `<div class="actions">${visit(i)}</div>` : ''}</div></section>`).join('')
  $('#pageBody').insertAdjacentHTML('beforeend', '<div class="route" aria-hidden="true"><svg viewBox="0 0 32 32" width="30"><path fill="#d8343f" d="M2 15 30 3 20 29l-5-9z"/><path fill="#2057a8" d="M15 20 30 3 12 17v10z"/></svg></div>')
  const b = $('#pageClose'); if (islands) b.onclick = onClose; else b.hidden = true
  pg.focus()
  if (calm) return
  lenis = new Lenis({ wrapper: pg, content: $('#pageBody'), lerp: .11 }); lenis.on('scroll', ScrollTrigger.update); tick = t => lenis.raf(t * 1000); gsap.ticker.add(tick)
  gctx = gsap.context(() => {
    gsap.to('.route svg', { top: '100%', ease: 'none', scrollTrigger: { trigger: '#pageBody', scroller: pg, start: 'top top', end: 'bottom bottom', scrub: .6 } })
    document.querySelectorAll('.entry').forEach(e => {
      const bits = e.querySelectorAll('li, .chip'); if (bits.length) gsap.from(bits, { x: 26, duration: .6, stagger: .03, ease: 'back.out(1.6)', scrollTrigger: { trigger: e, scroller: pg, start: 'top 80%' } })
      const img = e.querySelector('img'); if (!img) return
      const st = { trigger: e, scroller: pg }
      gsap.fromTo(img, { yPercent: -10 }, { yPercent: 0, ease: 'none', scrollTrigger: { ...st, start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.from(e.querySelector('figure'), { rotate: -3, scale: .94, duration: .9, ease: 'power3.out', scrollTrigger: { ...st, start: 'top 85%' } })
    })
  })
}
export function closePage() { lenis?.destroy(); gctx?.revert(); if (tick) gsap.ticker.remove(tick); lenis = gctx = tick = null; $('#page').hidden = true }
