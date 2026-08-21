export function initRevealAnimations(documentRef, options = {}) {
  if (!documentRef) return () => {}
  const sections = Array.from(documentRef.querySelectorAll('[data-reveal="section"]'))
  const ObserverClass = options.ObserverClass ?? globalThis.IntersectionObserver
  const reducedMotion = options.reducedMotion ?? globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  if (reducedMotion || typeof ObserverClass !== 'function') {
    sections.forEach((section) => section.classList.add('is-visible'))
    return () => {}
  }

  const observer = new ObserverClass((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })

  sections.forEach((section) => observer.observe(section))
  return () => observer.disconnect()
}
