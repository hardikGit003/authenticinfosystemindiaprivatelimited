import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

req = urllib.request.Request('https://www.apple.com/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/', headers=headers)
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# find all images and data-src or background-image
matches = re.findall(r'(https://www\.apple\.com/newsroom/images/[^\s\"\'\(\)\<\>]+?\.(?:png|jpg|jpeg|webp))', html)
for m in sorted(set(matches)):
    print(m)
