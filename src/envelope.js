import { gsap } from 'gsap'
import { me } from './content.js'
import { $, calm, esc } from './ui.js'

// Opening: a sealed envelope. Breaking the seal releases the letter.
export function envelope(done) {
  const o = $('#envelope'); o.hidden = false
  o.innerHTML = `<p class="greet">You have mail from <b>${esc(me.name)}</b></p>
  <div class="env"><div class="back"></div><div class="letter"><b>${esc(me.name)}</b><span>${esc(me.role)}</span></div><div class="side l"></div><div class="side r"></div><div class="bottom"></div><div class="flap"><i></i><i></i></div><button class="seal" aria-label="Break the seal and open the letter">${esc(me.name[0])}</button></div>
  <p class="keys">Break the seal to open it</p>`
  const seal = o.querySelector('.seal'); let opened = false
  const finish = () => { o.hidden = true; done() }
  let pulse
  if (!calm) { gsap.from('.env', { y: -500, rotate: -18, duration: 1.2, ease: 'bounce.out' }); gsap.from('.greet', { opacity: 0, y: 20, delay: .9 }); pulse = gsap.to(seal, { scale: 1.08, duration: .7, repeat: -1, yoyo: true, delay: 1.3, ease: 'sine.inOut' }) }
  seal.onclick = () => {
    if (opened) return
    opened = true; if (calm) return finish()
    pulse.kill()
    gsap.timeline({ onComplete: finish })
      .to(seal, { scale: 1.35, rotate: 25, duration: .18 }).to(seal, { y: 330, rotate: 160, opacity: 0, duration: .55, ease: 'power2.in' })
      .to('.greet, #envelope .keys', { opacity: 0, duration: .3 }, '<')
      .to('.flap', { rotateX: 180, duration: .7, ease: 'power2.inOut' }, '-=.35').set('.flap', { zIndex: 0 }, '-=.35')
      .to('.letter', { yPercent: -88, duration: .8, ease: 'back.out(1.2)' })
      .to('.env > :not(.letter)', { y: 700, duration: .7, ease: 'power3.in', stagger: .02 }, '-=.1')
      .to('.letter', { yPercent: -60, scale: 1.6, opacity: 0, duration: .55, ease: 'power2.in' }, '-=.35')
      .to(o, { opacity: 0, duration: .4 }, '-=.35')
  }
  seal.focus({ preventScroll: true })
}

// A sheet of paper folds itself into a plane and flies off.
export function foldPlane(done) {
  if (calm) return done()
  const f = document.createElement('div'); f.className = 'fold'; f.setAttribute('aria-hidden', 'true')
  f.innerHTML = '<div class="sheet"><div class="s l"><i class="p"></i><i class="c"></i></div><div class="s r"><i class="p"></i><i class="c"></i></div></div>'
  document.body.append(f); const q = s => f.querySelector(s)
  gsap.timeline({ onComplete: () => { f.remove(); done() } })
    .from(q('.sheet'), { scale: 0, rotate: -30, duration: .5, ease: 'back.out(1.5)' })
    .to(q('.l .c'), { rotation: 0, '--f': 180, duration: .5, ease: 'power2.inOut' })
    .to(q('.r .c'), { '--f': 180, duration: .5, ease: 'power2.inOut' }, '-=.3')
    .to(q('.s.l'), { rotateY: 62, duration: .5, ease: 'power2.inOut' }).to(q('.s.r'), { rotateY: -62, duration: .5, ease: 'power2.inOut' }, '<')
    .to(q('.sheet'), { rotateX: 58, rotateZ: 28, duration: .5, ease: 'power2.inOut' }, '<.1')
    .to(q('.sheet'), { x: innerWidth * .6, y: -innerHeight * .55, scale: .12, duration: .8, ease: 'power2.in' })
}
