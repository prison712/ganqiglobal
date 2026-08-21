import json
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parent
URL = "https://www.xingyungroup.com/"


def scroll_and_capture(page, prefix, step):
    height = page.evaluate("document.documentElement.scrollHeight")
    for index, y in enumerate(range(0, height, step)):
        page.evaluate("value => window.scrollTo(0, value)", y)
        page.wait_for_timeout(450)
        page.screenshot(path=ROOT / f"{prefix}-{index:02}.png")
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch()

    desktop = browser.new_page(viewport={"width": 1440, "height": 1000}, locale="zh-CN")
    desktop.goto(URL, wait_until="domcontentloaded", timeout=90_000)
    desktop.wait_for_timeout(4_000)
    scroll_and_capture(desktop, "xingyun-desktop", 760)
    desktop.screenshot(path=ROOT / "xingyun-home-desktop-loaded.png", full_page=True)

    nav_link = desktop.get_by_text("关于我们", exact=True).first
    nav_link.hover()
    desktop.wait_for_timeout(700)
    desktop.screenshot(path=ROOT / "xingyun-nav-about-hover.png")

    desktop_data = desktop.evaluate(
        """
        () => ({
          viewport: { width: innerWidth, height: innerHeight },
          pageHeight: document.documentElement.scrollHeight,
          links: [...document.querySelectorAll('a')].map(a => ({
            text: a.innerText.trim().replace(/\\s+/g, ' '),
            href: a.href
          })).filter(item => item.text).slice(0, 80),
          headings: [...document.querySelectorAll('h1,h2,h3')].map(el => ({
            tag: el.tagName,
            text: el.innerText.trim().replace(/\\s+/g, ' '),
            top: Math.round(el.getBoundingClientRect().top + scrollY)
          })).filter(item => item.text),
          visibleTopText: [...document.querySelectorAll('body *')].filter(el => {
            const r = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            return r.width > 0 && r.height > 0 && r.top >= 0 && r.bottom <= innerHeight && s.visibility !== 'hidden' && s.display !== 'none' && el.children.length === 0 && typeof el.innerText === 'string' && el.innerText.trim();
          }).map(el => el.innerText.trim()).slice(0, 80)
        })
        """
    )

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, locale="zh-CN")
    mobile.goto(URL, wait_until="domcontentloaded", timeout=90_000)
    mobile.wait_for_timeout(4_000)
    scroll_and_capture(mobile, "xingyun-mobile", 700)
    mobile.screenshot(path=ROOT / "xingyun-home-mobile-loaded.png", full_page=True)

    mobile_controls = mobile.evaluate(
        """
        () => [...document.querySelectorAll('button,[role=button],header a,header div')].map((el, index) => {
          const r = el.getBoundingClientRect();
          return {
            index,
            tag: el.tagName,
            text: el.innerText.trim().replace(/\\s+/g, ' '),
            aria: el.getAttribute('aria-label'),
            className: String(el.className),
            x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height)
          }
        }).filter(item => item.y >= 0 && item.y < innerHeight && item.width > 0 && item.height > 0).slice(0, 80)
        """
    )

    menu = mobile.locator("header button").first
    if menu.count():
        menu.click()
        mobile.wait_for_timeout(500)
        mobile.screenshot(path=ROOT / "xingyun-mobile-menu-open.png")

    output = {"desktop": desktop_data, "mobileControls": mobile_controls}
    (ROOT / "xingyun-structure.json").write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    browser.close()
