import urllib.request
import json
import re
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

queries = [
    'iPhone 18 Pro Max Prices Revealed Pre-Orders Start',
    'iPhone 18 Pro concept render colors burgundy blue titanium',
    'iPhone 18 Pro leak colors camera design',
    'iPhone 18 Pro Max renders leak'
]

found_images = set()

for q in queries:
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(q)}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract urls
            links = re.findall(r'href=[\"\'](https?://[^\s\"\']+)[\"\']', html)
            for l in links:
                if any(ext in l.lower() for ext in ['.jpg', '.png', '.webp', '.jpeg']):
                    found_images.add(l)
    except Exception as e:
        print(f"Error for {q}: {e}")

# Also try Yahoo Image Search
for q in ['iphone 18 pro concept colors', 'iphone 18 pro max leaks colors red blue']:
    y_url = f"https://images.search.yahoo.com/search/images?p={urllib.parse.quote(q)}"
    try:
        req = urllib.request.Request(y_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            imgs = re.findall(r'imgurl=([^&]+)', html)
            for img in imgs:
                found_images.add(urllib.parse.unquote(img))
    except Exception as e:
        print(f"Error yahoo: {e}")

print(f"Found {len(found_images)} candidate images")
for img in sorted(list(found_images))[:40]:
    print(img)
