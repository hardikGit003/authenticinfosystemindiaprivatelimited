import urllib.request
import re
import os
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
}

urls = [
    'https://www.apple.com/in/iphone-16-pro/',
    'https://www.apple.com/in/iphone/',
    'https://www.apple.com/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/'
]

all_images = set()

for url in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # find all image urls
            found = re.findall(r'(https://[^\s\"\'\(\)\<\>]+?\.(?:png|jpg|jpeg|webp))', html)
            for f in found:
                if 'apple.com' in f or 'cdn-apple.com' in f:
                    all_images.add(f)
            print(f"Processed {url}, total images now: {len(all_images)}")
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print("\nSample found images:")
for img in sorted(list(all_images))[:40]:
    print(img)
