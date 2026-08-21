import json
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parent
URL = "http://127.0.0.1:5173/"


with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    results = {"consoleErrors": [], "routes": {}, "interactions": {}}

    desktop = browser.new_page(viewport={"width": 1440, "height": 1000}, locale="zh-CN")
    desktop.on("console", lambda message: results["consoleErrors"].append(message.text) if message.type == "error" else None)
    desktop.goto(URL, wait_until="domcontentloaded")
    desktop.wait_for_timeout(1600)
    desktop.screenshot(path=ROOT / "ganqi-implementation-desktop.png", full_page=True)
    results["desktop"] = desktop.evaluate("""() => ({
      width: innerWidth,
      height: innerHeight,
      pageHeight: document.documentElement.scrollHeight,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      homeSections: [...document.querySelectorAll('[data-home-section]')].map(el => el.dataset.homeSection),
      anchorLinks: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href'))
    })""")
    desktop.get_by_role("link", name="关于集团").first.hover()
    desktop.wait_for_timeout(350)
    desktop.screenshot(path=ROOT / "ganqi-implementation-nav-hover.png")

    for route in ["/about", "/business", "/strategy", "/companies", "/global", "/news", "/contact", "/companies/enterprise-services", "/companies/education"]:
        check = browser.new_page(viewport={"width": 1280, "height": 800}, locale="zh-CN")
        route_errors = []
        check.on("console", lambda message: route_errors.append(message.text) if message.type == "error" else None)
        response = check.goto(URL.rstrip("/") + route, wait_until="domcontentloaded")
        check.wait_for_timeout(250)
        results["routes"][route] = {"status": response.status if response else None, "title": check.locator("h1").first.inner_text() if check.locator("h1").count() else "", "consoleErrors": route_errors}
        check.close()

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, locale="zh-CN")
    mobile.on("console", lambda message: results["consoleErrors"].append(message.text) if message.type == "error" else None)
    mobile.goto(URL, wait_until="domcontentloaded")
    mobile.wait_for_timeout(1000)
    mobile.screenshot(path=ROOT / "ganqi-implementation-mobile.png", full_page=True)
    results["mobile"] = mobile.evaluate("""() => ({
      width: innerWidth,
      height: innerHeight,
      pageHeight: document.documentElement.scrollHeight,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth
    })""")
    menu = mobile.get_by_role("button", name="打开菜单")
    menu.click()
    mobile.wait_for_timeout(250)
    mobile.screenshot(path=ROOT / "ganqi-implementation-mobile-menu.png")
    results["interactions"]["mobileMenu"] = mobile.locator("[data-mobile-drawer]").get_attribute("aria-hidden") == "false"

    contact = browser.new_page(viewport={"width": 1440, "height": 1000}, locale="zh-CN")
    contact.goto(URL.rstrip("/") + "/contact", wait_until="domcontentloaded")
    contact.locator('input[name="company"]').fill("赣企测试企业")
    contact.locator('input[name="contact"]').fill("陈女士")
    contact.locator('input[name="phone"]').fill("123")
    contact.locator('textarea[name="need"]').fill("海外市场咨询")
    contact.get_by_role("button", name="提交询盘（前端演示）").click()
    results["interactions"]["invalidPhone"] = contact.locator('input[name="phone"]').get_attribute("aria-invalid") == "true"
    contact.screenshot(path=ROOT / "ganqi-implementation-contact-validation.png", full_page=True)

    (ROOT / "ganqi-local-qa.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    browser.close()
