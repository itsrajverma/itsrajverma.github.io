let ctx, on = true
export const toggle = () => (on = !on)
export function unlock() { try { ctx ??= new AudioContext(); ctx.resume() } catch { /* no audio: play silently */ } }
export function notes(list, gap = .07) {
  if (!on || !ctx) return
  list.forEach((f, i) => {
    const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime + i * gap
    o.type = 'triangle'; o.frequency.value = f
    g.gain.setValueAtTime(.09, t); g.gain.exponentialRampToValueAtTime(.0001, t + .4)
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + .42)
  })
}
