import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

req = urllib.request.Request('https://www.apple.com/in/iphone-16-pro/', headers=headers)
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# find script tags or css files
css_and_js = re.findall(r'href=[\"\']([^\"\']+\.css)[\"\']|src=[\"\']([^\"\']+\.js)[\"\']', html)
urls = []
for c, j in css_and_js:
    url = c or j
    if url.startswith('/'):
        url = 'https://www.apple.com' + url
    urls.append(url)

print(f"Found {len(urls)} asset bundles")

found_images = set()
for u in urls[:10]:
    try:
        r = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(r) as res:
            content = res.read().decode('utf-8', errors='ignore')
            imgs = re.findall(r'([^\s\"\'\(\)]+?\.(?:png|jpg|jpeg|webp))', content)
            for img in imgs:
                if 'images/' in img or 'overview/' in img:
                    if not img.startswith('http'):
                        base = u.rsplit('/', 1)[0]
                        img = base + '/' + img.lstrip('/')
                    found_images.add(img)
    except Exception as e:
        pass

print(f"Total extracted high-res asset image paths: {len(found_images)}")
for img in sorted(list(found_images))[:30]:
    print(img)
