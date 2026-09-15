import urllib.request
import re
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

urls = [
    'https://thefreelancemedia.in',
    'https://thefreelancemedia.in/apple-iphone-18-pro-max-price-india-release-date-preorder/'
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            imgs = re.findall(r'(https?://[^\s\"\'\(\)\<\>]+?\.(?:png|jpg|jpeg|webp))', html)
            for img in imgs:
                if 'iphone' in img.lower() or '18' in img.lower() or 'upload' in img.lower():
                    print("Found:", img)
    except Exception as e:
        print("Error fetching:", u, e)
