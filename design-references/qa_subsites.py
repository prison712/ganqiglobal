import json
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parent
GROUP = "http://127.0.0.1:5173"
SITES = {
    "group": f"{GROUP}/",
    "enterprise": f"{GROUP}/companies/enterprise-services",
    "education": f"{GROUP}/companies/education",
    "exhibition": "http://127.0.0.1:4174/",
}


with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    results = {"sites": {}, "interactions": {}}

    for name, url in SITES.items():
        page = browser.new_page(viewport={"width": 1440, "height": 1000}, locale="zh-CN")
        errors = []
        page.on("console", lambda message, errors=errors: errors.append(message.text) if message.type == "error" else None)
        response = page.goto(url, wait_until="domcontentloaded")
        page.wait_for_timeout(900)
        page.evaluate("""async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += 800) {
            scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 70));
          }
          scrollTo(0, 0);
        }""")
        page.screenshot(path=ROOT / f"qa-{name}-desktop.png", full_page=True)
        page.screenshot(path=ROOT / f"qa-{name}-first-screen.png")
        results["sites"][name] = page.evaluate("""() => ({
          title: document.title,
          width: innerWidth,
          pageHeight: document.documentElement.scrollHeight,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
          friendLinks: [...document.querySelectorAll('[data-site-network] a, .business-site-friend-links a')].map((a) => a.textContent.trim()),
          sections: [...document.querySelectorAll('[data-home-section], [data-company-section], [data-exhibition-section]')].map((section) => section.dataset.homeSection || section.dataset.companySection || section.dataset.exhibitionSection),
        })""")
        results["sites"][name]["status"] = response.status if response else None
        results["sites"][name]["consoleErrors"] = errors
        page.close()

    for name in ["group", "enterprise", "education", "exhibition"]:
        mobile = browser.new_page(viewport={"width": 390, "height": 844}, locale="zh-CN")
        mobile.goto(SITES[name], wait_until="domcontentloaded")
        mobile.wait_for_timeout(700)
        mobile.evaluate("""async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += 620) {
            scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 60));
          }
          scrollTo(0, 0);
        }""")
        mobile.screenshot(path=ROOT / f"qa-{name}-mobile.png", full_page=True)
        results["sites"][f"{name}Mobile"] = mobile.evaluate("""() => ({
          width: innerWidth,
          pageHeight: document.documentElement.scrollHeight,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        })""")
        if name in ["enterprise", "education"]:
            mobile.locator('input[name="name"]').fill("测试联系人")
            mobile.locator('input[name="organization"]').fill("测试机构")
            mobile.locator('input[name="phone"]').fill("13800000000")
            mobile.locator('select[name="direction"]').select_option(index=1)
            mobile.locator('textarea[name="message"]').fill("站群页面交互验证")
            mobile.locator('form[data-inquiry-ui="frontend-only"] button[type="submit"]').click()
            results["interactions"][f"{name}Form"] = "前端" in mobile.locator('.business-form-status').inner_text()
        elif name == "group":
            results["interactions"]["groupBusinessCards"] = mobile.locator('[data-high-value-card]').count()
            results["interactions"]["groupMoreBusinessHref"] = mobile.locator('[data-more-business="true"]').get_attribute('href')
        else:
            mobile.locator('select[name="country"]').select_option('巴西')
            mobile.locator('select[name="industry"]').select_option('汽车及零部件')
            mobile.locator('[data-search-form] button[type="submit"]').click()
            mobile.wait_for_timeout(350)
            results["interactions"]["exhibitionVisibleCards"] = mobile.locator('[data-exhibition-card]:visible').count()
            results["interactions"]["exhibitionSearchStatus"] = mobile.locator('[data-status]').inner_text()
            mobile.locator('input[name="company"]').fill("测试企业")
            mobile.locator('input[name="contact"]').fill("测试联系人")
            mobile.locator('input[name="phone"]').fill("13800000000")
            mobile.locator('textarea[name="need"]').fill("测试参展需求")
            mobile.locator('[data-exhibition-inquiry] button[type="submit"]').click()
            results["interactions"]["exhibitionInquiry"] = mobile.locator('[data-inquiry-status]').inner_text()
        mobile.close()

    (ROOT / "qa-subsidiaries.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(results, ensure_ascii=False))
    browser.close()
