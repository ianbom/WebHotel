import concurrent.futures
import io
import json
import re
import urllib.parse
import urllib.request
import urllib.error
from pathlib import Path

from bs4 import BeautifulSoup
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
BASE = "https://lifetimedesign.co"
inventory = []


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=45) as response:
        return response.read()


def soup(path):
    return BeautifulSoup(fetch(path if path.startswith("https:") else BASE + path), "html.parser")


def meta(page, prop):
    element = page.find("meta", property=prop)
    return element.get("content", "") if element else ""


def image(url, folder, name, description, source):
    full_size = re.sub(r"-\d+x\d+(?=\.(?:jpg|png|webp)$)", "", url)
    try:
        payload = fetch(full_size)
        url = full_size
    except urllib.error.HTTPError:
        payload = fetch(url)
    original = Image.open(io.BytesIO(payload))
    original.load()
    original.thumbnail((2200, 2200))
    alpha = original.mode in ("RGBA", "LA") or "transparency" in original.info
    original = original.convert("RGBA" if alpha else "RGB")
    path = ROOT / "public" / "images" / folder / (name + ".webp")
    path.parent.mkdir(parents=True, exist_ok=True)
    original.save(path, "WEBP", quality=88, method=6)
    result = {"src": "/" + path.relative_to(ROOT / "public").as_posix(), "width": original.width, "height": original.height, "alt": description}
    inventory.append({**result, "original": url, "source": source, "role": folder})
    return result


project_specs = [
    ("The Soho Story", "/project/the-soho-story/", "Bogor", "Interior"),
    ("Titi Kamal's House", "/project/titi-kamals-house/", "Jakarta", "Interior"),
    ("Tranquil House", "/project/tranquil-house/", "Jakarta", "Interior"),
    ("Mr. Toni", "/portfolio/mr-toni-arsitektur/", "", "Arsitektur"),
    ("Mrs. Vitri", "/portfolio/mrs-vitri-arsitektur/", "", "Arsitektur"),
    ("Mrs. Yanti", "/portfolio/mrs-yanti-arsitektur/", "", "Arsitektur"),
    ("Mrs. Vaya", "/portfolio/mrs-vaya-interior/", "", "Interior"),
    ("Mrs. Nike", "/portfolio/mrs-nike-interior/", "", "Interior"),
    ("Mrs. Vera", "/portfolio/mrs-vera-interior/", "", "Interior"),
]


def project(spec):
    name, path, location, category = spec
    page = soup(path)
    slug = path.rstrip("/").split("/")[-1]
    url = meta(page, "og:image")
    return {"name": name, "slug": slug, "location": location, "category": category, "source": BASE + path, "image": image(url, "portfolio", slug, name + " - " + category + " oleh Lifetime Design", BASE + path)}


article_specs = [
    ("desain-rooftop-rumah", "17 Ide Desain Rooftop Mewah & Modern untuk Ruang Santai Maksimal", "Inspirasi"),
    ("desain-rumah-3-lantai-mewah", "19 Desain Rumah 3 Lantai Mewah Bergaya Modern dengan Fasad Elegan", "Arsitektur"),
    ("desain-ruang-keluarga", "12+ Inspirasi Desain Ruang TV Keluarga Menawan nan Mewah", "Interior"),
    ("tips-ruang-makan-mewah-untuk-rumah-yang-lebih-berkelas", "20 Inspirasi Desain Ruang Makan Mewah Menawan", "Interior"),
    ("tips-membuat-rumah-nyaman-mewah", "5 Tips Menghadirkan Rumah Nyaman Dan Mewah Impian Anda!", "Tips"),
    ("kamar-mandi-sederhana", "8 Inspirasi Kamar Mandi Sederhana, Cantik Banget!", "Interior"),
]


def article(spec):
    slug, title, category = spec
    url = BASE + "/blog/" + slug + "/"
    page = soup(url)
    content = page.select_one(".elementor-widget-theme-post-content")
    if not content:
        raise ValueError("Article content missing: " + url)
    blocks = []
    for element in content.select("h2,h3,p,li"):
        text = element.get_text(" ", strip=True)
        if not text or text.lower().startswith("baca juga"):
            continue
        if element.name == "p" and element.find_parent("li"):
            continue
        blocks.append({"type": element.name, "text": text})
    paragraphs = [item["text"] for item in blocks if item["type"] == "p"]
    if not paragraphs:
        raise ValueError("Empty article: " + url)
    excerpt = paragraphs[0]
    if len(excerpt) > 145:
        excerpt = excerpt[:142].rsplit(" ", 1)[0] + "..."
    return {"slug": slug, "title": title, "category": category, "date": meta(page, "article:published_time")[:10], "source": url, "excerpt": excerpt, "image": image(meta(page, "og:image"), "articles", slug, title, url), "blocks": blocks}


def main():
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        projects = list(pool.map(project, project_specs))
        articles = list(pool.map(article, article_specs))
    logo = image(BASE + "/wp-content/uploads/2024/11/2bdf40bd569571e54e2aad7b5d03c1b0.png", "branding", "lifetime-design-wordmark", "Lifetime Design", BASE + "/")
    about = image(BASE + "/wp-content/uploads/2024/11/about-left-img.webp", "about", "lifetime-design-interior", "Ruang interior Lifetime Design dengan detail klasik dan material hangat", BASE + "/")
    favicon = image(BASE + "/wp-content/uploads/2024/11/cropped-cropped-Logo-LDnew-e1598244167819-192x192.webp", "branding", "lifetime-design-symbol", "Simbol Lifetime Design", BASE + "/")
    design_build = image(BASE + "/wp-content/uploads/2024/11/1590d61039a4f7359fdcdfbe86c9d4bf.jpg", "interior", "classic-kitchen-design-build", "Interior dapur dan kabinet klasik modern oleh Lifetime Design", BASE + "/jasa-desain-interior/")
    bedroom = image(BASE + "/wp-content/uploads/2024/11/imge-mid-1024x717.webp", "furniture", "classic-bedroom-furnishing", "Furnitur kamar tidur dalam interior Lifetime Design", BASE + "/jasa-desain-interior/")
    data = {"projects": projects, "articles": articles, "assets": {"logo": logo, "about": about, "symbol": favicon, "designBuild": design_build, "bedroom": bedroom}}
    target = ROOT / "src/data/content.ts"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text("export const content = " + json.dumps(data, ensure_ascii=True, indent=2) + " as const;\n", encoding="utf8")
    lines = ["# Asset sources", "", "Collected 2026-10-22. User confirmed authorization for Lifetime Design branding, photography and relevant article content. Assets are official-site hosted, not public-domain or assumed Creative Commons. Authorization is project-specific; third-party rights/credits on original articles remain applicable. No M Design Group assets are included.", "", "Images resized to at most 2200px and encoded locally as WebP. Focal cropping is controlled in the application. Article text is sourced from each linked official article and stored as plain typed text, never injected HTML.", "", "| Local file | Original image URL | Source page | Intended section | Description | Dimensions / ratio | Rights |", "| --- | --- | --- | --- | --- | --- | --- |"]
    for item in sorted(inventory, key=lambda entry: entry["src"]):
        lines.append(f"| `{item['src']}` | {item['original']} | {item['source']} | {item['role']} | {item['alt']} | {item['width']} x {item['height']} / {item['width']/item['height']:.3f} | User-authorized official asset; source credits apply |")
    lines += ["", "## Fonts", "", "Inter, Cormorant Garamond, Montserrat and Poppins are obtained from the Google Fonts upstream repository under SIL Open Font License 1.1. Corresponding OFL texts are included alongside font files in public/fonts. No proprietary fonts from either reference are redistributed.", "", "## Composition mapping", "", "Hero: Mrs. Nike and the official interior-service bedroom photograph. Interior service: Mrs. Nike. Architecture service: Mr. Toni. Furniture: official interior-service bedroom furnishing, not a claim about a specific furniture product. Design/build and contact banner: official interior-service kitchen photograph. Company carousel: The Soho Story, Titi Kamal's House, Tranquil House, Mrs. Nike and Mrs. Vera. About: official homepage interior image, architecture and interior project photographs. Editorial highlight grid: six sourced articles plus four verified projects; no award claim. Local originals are reused rather than duplicated.", "", "The home-comfort article source thumbnail filename identifies Unsplash photography. It is kept as the genuine article thumbnail, not presented as a Lifetime client project. Original article credits and third-party licensing still apply; no exclusive ownership is claimed."]
    (ROOT / "docs/asset-sources.md").write_text("\n".join(lines) + "\n", encoding="utf8")
    fonts = ROOT / "public/fonts"
    fonts.mkdir(parents=True, exist_ok=True)
    for family, filename in [("inter", "Inter[opsz,wght].ttf"), ("cormorantgaramond", "CormorantGaramond[wght].ttf"), ("montserrat", "Montserrat[wght].ttf"), ("poppins", "Poppins-Regular.ttf")]:
        base = "https://raw.githubusercontent.com/google/fonts/main/ofl/" + family + "/"
        (fonts / (family + ".ttf")).write_bytes(fetch(base + urllib.parse.quote(filename)))
        (fonts / (family + "-OFL.txt")).write_bytes(fetch(base + "OFL.txt"))
    print("Collected", len(inventory), "images;", len(projects), "projects;", len(articles), "articles; four licensed font families.")


if __name__ == "__main__":
    main()
