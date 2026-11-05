"""Make the website's photos self-hosted.

The pages currently load their photos from Higgsfield's image server
(d8j0ntlcm91z4.cloudfront.net). Each <img> also carries a data-local attribute
naming the file it should live in. This script downloads every photo, saves it
as an optimised JPEG at that path under assets/img/, and rewrites the page to
use the local file.

Run from this folder:  python3 fetch-images.py
Needs internet access and Pillow (pip install pillow). Safe to run again.
"""
import glob
import io
import os
import re
import urllib.request

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = re.compile(r'src="(https://d8j0ntlcm91z4\.cloudfront\.net/[^"]+)" data-local="(assets/img/[^"]+)"')
cache = {}


def max_width(path):
    name = os.path.basename(path)
    if name.startswith("hero-"):
        return 1920
    if name.startswith(("svc-", "bnpl")):
        return 1200
    return 900


for page in sorted(glob.glob(os.path.join(HERE, "*.html"))):
    html = open(page, encoding="utf-8").read()
    for url, local in sorted(set(IMG.findall(html))):
        target = os.path.join(HERE, local)
        if not os.path.exists(target):
            if url not in cache:
                with urllib.request.urlopen(url, timeout=60) as r:
                    cache[url] = Image.open(io.BytesIO(r.read())).convert("RGB")
            im = cache[url].copy()
            w = max_width(local)
            if im.width > w:
                im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            im.save(target, "JPEG", quality=84, optimize=True, progressive=True)
            print("saved", local, im.size)
        html = html.replace(f'src="{url}" data-local="{local}"', f'src="{local}"')
    open(page, "w", encoding="utf-8").write(html)
    print("updated", os.path.basename(page))
