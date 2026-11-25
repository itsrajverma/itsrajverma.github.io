// One small playable demo per island. Each gets its box and the game api; may return a cleanup.
// All figures inside the toys are made-up samples and say so on screen.
import { gsap } from 'gsap'
import { animate, stagger } from 'animejs'
import { experience, me, contact } from './content.js'
import { notes } from './sound.js'
import { esc, calm } from './ui.js'
import { foldPlane } from './envelope.js'

const btn = (label, cls = '') => `<button class="btn small ${cls}">${label}</button>`
export const toys = {
  home: { title: 'Short on time?', run(el, api) {
    el.innerHTML = `<p>The plane can fly the whole route by itself and stop at every island.</p>${btn('Take the guided tour', 'primary')}`
    el.querySelector('button').onclick = api.tour
  } },

  experience: { title: 'Fly through the years', run(el) {
    const yrs = experience.map(e => e.years.match(/\d{4}/g).map(Number)), min = Math.min(...yrs.map(y => y[0])), max = Math.max(...yrs.map(y => y[0]))
    el.innerHTML = `<label class="big" for="yr"></label><input id="yr" type="range" min="${min}" max="${max}" value="${max}"><p class="out" aria-live="polite"></p>`
    const r = el.querySelector('input'), show = () => {
      const y = +r.value, e = experience.find((_, i) => y >= yrs[i][0]) ?? experience.at(-1)
      el.querySelector('.big').textContent = y; el.querySelector('.out').innerHTML = `<b>${esc(e.role)}</b><br>${esc(e.company)}`
      if (!calm) animate(el.querySelector('.big'), { scale: [1.25, 1], rotate: [-4, 0], duration: 500, ease: 'outElastic(1,.5)' })
    }
    r.oninput = () => { show(); notes([260 + (r.value - min) * 45]) }; show()
  } },

  payroll: { title: 'Run payroll for 200 companies', run(el) {
    el.innerHTML = `<div class="cells">${'<i></i>'.repeat(200)}</div><div class="row">${btn('Run payroll', 'primary')}<span class="out" aria-live="polite">200 tenants waiting</span></div><small>Simulation</small>`
    const b = el.querySelector('button'), o = el.querySelector('.out'), n = { v: 0 }; let tw
    b.onclick = () => {
      b.disabled = true; n.v = 0
      animate(el.querySelectorAll('.cells i'), { backgroundColor: ['#d5dee7', '#f4a92b', '#4f9d5b'], scale: calm ? 1 : [1, 1.7, 1], delay: stagger(9, { grid: [25, 8], from: 'center' }), duration: 600 })
      tw = gsap.to(n, { v: 200, duration: 2.2, ease: 'none', onUpdate: () => { o.textContent = `${Math.round(n.v)} tenants paid` }, onComplete: () => { notes([523, 659, 784]); b.disabled = false; b.textContent = 'Run again' } })
    }
    return () => tw?.kill()
  } },

  insurance: { title: 'Policy auto-read', run(el) {
    const F = [['Policy number', 'DEMO-0042'], ['Insured', 'Asha Sample'], ['Premium', '₹ 12,400'], ['Valid until', '31 Mar 2027']]
    el.innerHTML = `<div class="scan"><div class="doc">${F.map(f => `<p>${f[0]}: <mark>${f[1]}</mark></p>`).join('')}<s></s></div><dl>${F.map(f => `<dt>${f[0]}</dt><dd>&nbsp;</dd>`).join('')}</dl></div>${btn('Read this policy', 'primary')} <small>Sample document</small>`
    let tl; el.querySelector('button').onclick = () => {
      tl?.kill(); const m = el.querySelectorAll('mark'), d = el.querySelectorAll('dd'); d.forEach(x => { x.innerHTML = '&nbsp;' }); m.forEach(x => x.classList.remove('hit'))
      tl = gsap.timeline().fromTo(el.querySelector('s'), { top: '0%', opacity: 1 }, { top: '100%', duration: 2, ease: 'none' }).to(el.querySelector('s'), { opacity: 0, duration: .2 })
      F.forEach((f, i) => tl.call(() => { m[i].classList.add('hit'); d[i].textContent = f[1]; notes([440 + i * 90]); if (!calm) animate(d[i], { x: [-60, 0], opacity: [0, 1], duration: 450, ease: 'outBack' }) }, [], .35 + i * .48))
    }
    return () => tl?.kill()
  } },

  sendwish: { title: 'Sign the group card', run(el, api) {
    el.innerHTML = `<div class="card"><p>Happy birthday!</p><canvas width="720" height="300" aria-label="Draw your signature"></canvas></div><div class="row">${btn('Send the card', 'primary')}${btn('Clear')}<span class="out" aria-live="polite"></span></div>`
    const c = el.querySelector('canvas'), x = c.getContext('2d'); let down = false, drew = false
    x.lineWidth = 7; x.lineCap = x.lineJoin = 'round'; x.strokeStyle = '#2057a8'
    const at = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 720, (e.clientY - r.top) / r.height * 300] }
    c.onpointerdown = e => { down = drew = true; c.setPointerCapture(e.pointerId); x.beginPath(); x.moveTo(...at(e)); x.lineTo(...at(e)); x.stroke() }
    c.onpointermove = e => { if (down) { x.lineTo(...at(e)); x.stroke() } }; c.onpointerup = c.onpointercancel = () => { down = false }
    const [s, k] = el.querySelectorAll('button'), o = el.querySelector('.out')
    k.onclick = () => { x.clearRect(0, 0, 720, 300); drew = false; o.textContent = '' }
    s.onclick = () => { if (!drew) { o.textContent = 'Sign it first'; return } o.textContent = 'Sent to the island'; notes([523, 659, 784, 1047]); api.celebrate(); if (!calm) animate(el.querySelector('.card'), { rotateY: [0, 360], scale: [1, .85, 1], duration: 1100, ease: 'inOutBack' }) }
  } },

  theecards: { title: 'Blow out the candles', run(el, api) {
    el.innerHTML = `<div class="candles">${[1, 2, 3, 4, 5].map(n => `<button aria-label="Blow out candle ${n}"><i></i></button>`).join('')}</div><p class="out" aria-live="polite">Tap each flame</p>`
    const a = [...el.querySelectorAll('button')]
    a.forEach((b, i) => { b.onclick = () => { if (b.classList.contains('off')) return; b.classList.add('off'); notes([780 - i * 60]); const left = a.filter(q => !q.classList.contains('off')).length; el.querySelector('.out').textContent = left ? `${left} to go` : 'Make a wish!'; if (!left) { api.celebrate(); notes([523, 659, 784, 1047]); setTimeout(() => a.forEach(q => q.classList.remove('off')), 3500) } } })
  } },

  shop: { title: 'Fill the cart', run(el, api) {
    el.innerHTML = `<div class="shop"><div class="goods">${['Kite', 'Boat', 'Star', 'Crane'].map((n, i) => `<button style="background:${['#d8343f', '#2057a8', '#f4a92b', '#4f9d5b'][i]}">${n}</button>`).join('')}</div><div class="cart">Cart <b>0</b></div></div><div class="row">${btn('Check out', 'primary')}<span class="out" aria-live="polite"></span></div>`
    let n = 0; const cart = el.querySelector('.cart'), num = cart.querySelector('b'), o = el.querySelector('.out')
    el.querySelectorAll('.goods button').forEach(b => { b.onclick = () => {
      n++; num.textContent = n; o.textContent = ''; notes([500 + n * 30]); if (calm) return
      const q = b.cloneNode(true), r = b.getBoundingClientRect(), z = cart.getBoundingClientRect(); q.className = 'flyer'; q.inert = true; Object.assign(q.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px' }); document.body.append(q)
      gsap.to(q, { x: z.left - r.left + 20, duration: .6, ease: 'power1.in' }); gsap.to(q, { y: z.top - r.top, rotate: 200, scale: .2, duration: .6, ease: 'back.in(2.2)', onComplete: () => { q.remove(); animate(cart, { scale: [1.15, 1], duration: 400, ease: 'outElastic(1,.5)' }) } })
    } })
    el.querySelector('.row button').onclick = () => { o.textContent = n ? `${n} parcel${n > 1 ? 's' : ''} on the way` : 'Your cart is empty'; if (n) { n = 0; num.textContent = 0; api.celebrate(); notes([523, 659, 784]) } }
  } },

  school: { title: 'Ring the school bell', run(el) {
    el.innerHTML = `<button class="bell" aria-label="Ring the bell"><svg viewBox="0 0 100 110" width="110"><path d="M50 6v10M20 80c8-10 8-22 8-34a22 22 0 0 1 44 0c0 12 0 24 8 34z" fill="#f4a92b" stroke="#14304a" stroke-width="5" stroke-linejoin="round"/><circle cx="50" cy="90" r="9" fill="#14304a"/></svg></button><p class="out" aria-live="polite">Class starts when you ring it</p>`
    let n = 0; const say = ['Good morning, students', 'Notice board updated', 'Admissions are open', 'Holiday announced']
    el.querySelector('button').onclick = () => { notes([988, 784, 988, 784], .16); el.querySelector('.out').textContent = say[n++ % say.length]; if (!calm) animate(el.querySelector('svg'), { rotate: [0, 26, -24, 18, -14, 8, 0], duration: 1300, ease: 'inOutSine' }) }
  } },

  ai: { title: 'Give the bot an order', run(el, api) {
    el.innerHTML = `<p>Priya runs a whole HRMS from plain words. This small cousin runs this website.</p><div class="chat" role="log"></div><form class="row"><input id="ask" autocomplete="off" aria-label="Your order" placeholder="Make it night"><button class="btn small primary">Send</button></form><div class="chips">${['Make it night', 'Do a barrel roll', 'Celebrate', 'Show me open source', 'Read as a page'].map(s => `<button class="chip">${s}</button>`).join('')}</div><small>Scripted demo, no AI model is called</small>`
    const log = el.querySelector('.chat'), inp = el.querySelector('input'); let timer
    const put = (who, s) => { const p = document.createElement('p'); p.className = who; p.textContent = s; log.append(p); log.scrollTop = 1e5; if (!calm) animate(p, { y: [14, 0], opacity: [0, 1], duration: 350 }) }
    const go = s => {
      s = s.trim(); if (!s) return; put('you', s); inp.value = ''; const q = s.toLowerCase().replace(/[^a-z ]/g, ''); notes([660])
      const tool = (name, say, fn, wait = 900) => { put('tool', `→ ${name}`); clearTimeout(timer); timer = setTimeout(() => { put('bot', say); fn() }, wait) }
      const dest = api.islands.find(i => [i.name, i.id, i.title].some(n => q.replace(/ /g, '').includes(n.toLowerCase().replace(/[^a-z]/g, '')))) ?? (/job|career|work/.test(q) ? api.byId('experience') : /hire|email|contact|message/.test(q) ? api.byId('contact') : /skill|tech|stack/.test(q) ? api.byId('stack') : null)
      if (/delete|destroy|drop |remove/.test(q)) tool('guardrail.check()', 'I can’t do that. Destructive orders are blocked.', () => {})
      else if (/night|dark/.test(q)) tool('set_time("night")', 'Lights out, lanterns on.', () => api.time(1))
      else if (/sunset|evening/.test(q)) tool('set_time("sunset")', 'Golden hour it is.', () => api.time(.42))
      else if (/\bday\b|morning|light/.test(q)) tool('set_time("day")', 'Good morning.', () => api.time(0))
      else if (/roll|trick|flip/.test(q)) tool('plane.roll()', 'Watch the plane.', api.roll)
      else if (/celebrat|party|confetti|firework/.test(q)) tool('celebrate()', 'Hooray!', api.celebrate)
      else if (/tour/.test(q)) tool('start_tour()', 'Sit back.', api.tour)
      else if (/read|page|resume|cv/.test(q)) tool('open_page()', 'Opening the page version.', api.read)
      else if (dest && dest.id !== 'ai') tool(`fly_to("${dest.id}")`, `Flying to ${dest.name}.`, () => setTimeout(() => api.flyTo(dest), 700))
      else put('bot', 'I can fly you to any island, change the time of day, do a trick or celebrate.')
    }
    el.querySelector('form').onsubmit = e => { e.preventDefault(); go(inp.value) }
    el.querySelectorAll('.chip').forEach(c => { c.onclick = () => go(c.textContent) })
    return () => clearTimeout(timer)
  } },

  trading: { title: 'Let the bot trade', run(el) {
    el.innerHTML = `<canvas class="chart" width="820" height="360" aria-label="Simulated price chart with bot trades"></canvas><div class="row">${btn('Pause the bot')}<span class="out"></span></div><small>Random prices. The bot buys when the fast average crosses above the slow one, and sells when it crosses back.</small>`
    const x = el.querySelector('canvas').getContext('2d'), b = el.querySelector('button'), P = [100]; let on = true, held = null, trades = 0; const marks = []
    const avg = (n, e) => { const s = P.slice(Math.max(0, e - n + 1), e + 1); return s.reduce((a, c) => a + c, 0) / s.length }
    const tick = () => {
      P.push(Math.max(40, P.at(-1) + (Math.random() - .5) * 5 + Math.sin(P.length / 9) * 1.1)); const e = P.length - 1
      const up = avg(5, e) > avg(14, e); if (up && !held) { held = true; marks.push([e, 1]); trades++ } else if (!up && held) { held = false; marks.push([e, 0]); trades++ }
      const from = Math.max(0, e - 60), v = P.slice(from), lo = Math.min(...v) - 2, hi = Math.max(...v) + 2, X = i => (i - from) / 62 * 820, Y = q => 350 - (q - lo) / (hi - lo) * 340
      x.fillStyle = '#14304a'; x.fillRect(0, 0, 820, 360)
      for (const [n, c, w] of [[1, '#f6f8fb', 4], [5, '#f4a92b', 3], [14, '#7cc4d8', 3]]) { x.beginPath(); x.strokeStyle = c; x.lineWidth = w; for (let i = from; i <= e; i++) x.lineTo(X(i), Y(avg(n, i))); x.stroke() }
      x.font = 'bold 26px sans-serif'; for (const [i, u] of marks) if (i >= from) { x.fillStyle = u ? '#7fd08a' : '#ff8a8f'; x.fillText(u ? '▲' : '▼', X(i) - 12, Y(P[i]) + (u ? 36 : -14)) }
      el.querySelector('.out').textContent = `${trades} trades, ${held ? 'holding' : 'waiting'}`
    }
    for (let i = 0; i < 40; i++) tick()
    const id = setInterval(() => on && tick(), 260)
    b.onclick = () => { on = !on; b.textContent = on ? 'Pause the bot' : 'Start the bot' }
    return () => clearInterval(id)
  } },

  opensource: { title: 'Talk to Bastion', run(el) {
    const A = { 'install ssl on my site': ['Plan: request certificate, update nginx, reload', 'Certificate issued', 'Done. Renewal scheduled.'], 'why is the load high': ['Checking top processes', 'A backup job is using 92% CPU', 'Suggestion: lower its priority'], 'wipe the production server': ['Guardrail: destructive action on production', 'BLOCKED. Nothing was changed.'] }
    el.innerHTML = `<pre class="term" aria-live="polite">$ bastion</pre><div class="chips">${Object.keys(A).map(k => `<button class="chip">${k}</button>`).join('')}</div><small>Scripted example output</small>`
    const t = el.querySelector('pre'); let id
    el.querySelectorAll('.chip').forEach(c => { c.onclick = () => {
      clearInterval(id); const s = `$ ${c.textContent}\n${A[c.textContent].map(l => '  ' + l).join('\n')}`; let n = 0; if (calm) { t.textContent = s; return }
      id = setInterval(() => { n += 2; t.textContent = s.slice(0, n) + (n < s.length ? '▌' : ''); if (n >= s.length) { clearInterval(id); notes(s.includes('BLOCKED') ? [220, 180] : [660, 880]) } }, 28)
    } })
    return () => clearInterval(id)
  } },

  contact: { title: 'Write a letter', run(el) {
    const mail = contact.find(c => c.href.startsWith('mailto:')); if (!mail) return
    el.innerHTML = `<textarea id="letter" rows="5" aria-label="Your letter" placeholder="Dear ${esc(me.name.split(' ')[0])},"></textarea><div class="row">${btn('Fold and send', 'primary')}<small>Opens your email app</small></div>`
    const ta = el.querySelector('textarea')
    el.querySelector('button').onclick = () => { if (!ta.value.trim()) { ta.focus(); return } notes([392, 523, 659]); foldPlane(() => { location.href = `${mail.href}?subject=${encodeURIComponent('A letter from your portfolio')}&body=${encodeURIComponent(ta.value)}` }) }
  } },
}
