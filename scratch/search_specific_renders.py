import urllib.request
import urllib.parse
import re
import os
from PIL import Image

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

queries = [
    'iphone 18 pro red blue white black concept',
    'iphone 18 pro horizontal camera island render',
    'iphone 18 pro max camera bar concept colors',
    'iphone 18 pro camera visor concept'
]

os.makedirs('public/Home Screen Advertisement/iphone18_renders', exist_ok=True)
count = 0

for q in queries:
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote(q)}&first=1&scenario=ImageBasicHover"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            murls = re.findall(r'murl&quot;:&quot;(https?://[^&]+?\.(?:jpg|jpeg|png|webp))&quot;', html)
            for m in murls:
                try:
                    r = urllib.request.Request(m, headers=headers)
                    with urllib.request.urlopen(r, timeout=5) as res:
                        data = res.read()
                        if len(data) > 20000:
                            path = f"public/Home Screen Advertisement/iphone18_renders/render_{count}.png"
                            temp = "scratch/temp_r"
                            with open(temp, 'wb') as f:
                                f.write(data)
                            im = Image.open(temp).convert("RGBA")
                            if im.width > 400 and im.height > 250:
                                im.save(path)
                                print(f"Saved {path}: size={im.size} url={m[:70]}")
                                count += 1
                                if count >= 12:
                                    break
                except Exception:
                    pass
            if count >= 12:
                break
    except Exception as e:
        print("Error:", e)

print(f"Total downloaded renders: {count}")
