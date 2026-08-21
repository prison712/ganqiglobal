import test from 'node:test'
import assert from 'node:assert/strict'

test('reveals intersecting sections once and stops observing them', async () => {
  let revealModule = {}
  try {
    revealModule = await import('../src/reveal.js')
  } catch {}
  assert.equal(typeof revealModule.initRevealAnimations, 'function')

  const first = { classList: { values: new Set(), add(value) { this.values.add(value) } } }
  const second = { classList: { values: new Set(), add(value) { this.values.add(value) } } }
  const observed = []
  const unobserved = []
  let notify
  class Observer {
    constructor(callback) { notify = callback }
    observe(element) { observed.push(element) }
    unobserve(element) { unobserved.push(element) }
    disconnect() {}
  }
  const cleanup = revealModule.initRevealAnimations(
    { querySelectorAll: () => [first, second] },
    { ObserverClass: Observer, reducedMotion: false },
  )

  assert.deepEqual(observed, [first, second])
  notify([{ isIntersecting: true, target: first }, { isIntersecting: false, target: second }])
  assert.equal(first.classList.values.has('is-visible'), true)
  assert.equal(second.classList.values.has('is-visible'), false)
  assert.deepEqual(unobserved, [first])
  assert.equal(typeof cleanup, 'function')
})

test('reveals sections immediately when reduced motion is preferred', async () => {
  let revealModule = {}
  try {
    revealModule = await import('../src/reveal.js')
  } catch {}
  assert.equal(typeof revealModule.initRevealAnimations, 'function')

  const section = { classList: { values: new Set(), add(value) { this.values.add(value) } } }
  revealModule.initRevealAnimations(
    { querySelectorAll: () => [section] },
    { ObserverClass: undefined, reducedMotion: true },
  )
  assert.equal(section.classList.values.has('is-visible'), true)
})
