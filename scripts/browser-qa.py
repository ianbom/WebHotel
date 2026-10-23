import base64
import json
import os
from pathlib import Path


origin = os.environ.get("QA_ORIGIN", "http://127.0.0.1:3014").rstrip("/")
target = os.environ.get("QA_TARGET")
if target:
    switch_tab(target)
else:
    new_tab(origin)
    target = current_tab()["target_id"]

output = Path("artifacts/browser-qa")
output.mkdir(parents=True, exist_ok=True)
routes = ["/", "/our-expertise", "/about-us", "/awards-articles", "/contact"]
widths = [360, 390, 768, 1280, 1440, 1920]
results = []
for width in widths:
    switch_tab(target)
    height = 844 if width < 768 else 1024 if width == 768 else 1080 if width == 1920 else 900
    cdp("Emulation.setDeviceMetricsOverride", width=width, height=height, deviceScaleFactor=1, mobile=False)
    for route in routes:
        goto_url(origin + route)
        wait(1)
        assert js("location.origin") == origin, "Unexpected browser target/origin"
        js("document.fonts.ready.then(() => true)")
        page_height = int(js("document.body.scrollHeight"))
        for offset in range(0, page_height, 750):
            js(f"window.scrollTo({{top:{offset},behavior:'instant'}})")
            wait(.08)
        wait(.5)
        js("window.scrollTo({top:0,behavior:'instant'})")
        cdp("Input.dispatchMouseEvent", type="mouseMoved", x=0, y=0)
        js("document.querySelectorAll('.carousel-pause').forEach(button => {if(button.getAttribute('aria-pressed')==='false')button.click()})")
        info = js("""(() => ({
            url: location.href,
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            overflow: document.documentElement.scrollWidth > innerWidth,
            h1Count: document.querySelectorAll('h1').length,
            brokenImages: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.src),
            imageCount: document.images.length,
            referenceIdentity: /mdesigngroup|metaphor|ikons|modulo/i.test(document.body.innerText),
            internalLinks: [...new Set([...document.querySelectorAll('a[href]')].map(link => link.href).filter(href => href.startsWith(location.origin)))],
            sectionBoxes: [...document.querySelectorAll('main > section,main > div,footer')].map(section => ({name:section.className,top:Math.round(section.getBoundingClientRect().top + scrollY),height:Math.round(section.getBoundingClientRect().height)}))
        }))()""")
        name = route.strip("/") or "home"
        image = cdp("Page.captureScreenshot", format="jpeg", quality=60, captureBeyondViewport=True)
        filename = name + "-" + str(width) + ".jpg"
        (output / filename).write_bytes(base64.b64decode(image["data"]))
        results.append({"route": route, "viewport": [width, height], "screenshot": filename, **info})
        (output / "results.json").write_text(json.dumps(results, indent=2), encoding="utf8")
        print(json.dumps({"route": route, "width": width, "overflow": info["overflow"], "brokenImages": info["brokenImages"], "h1Count": info["h1Count"]}), flush=True)

assert all(not result["overflow"] and not result["brokenImages"] and not result["referenceIdentity"] and result["h1Count"] == 1 for result in results)
print("PASS: 30 route/viewport checks; screenshots and measurements in", output)
