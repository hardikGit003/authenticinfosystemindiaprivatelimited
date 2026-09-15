import urllib.request
import urllib.parse
import re
import os
from PIL import Image

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

queries = [
    'iphone 18 pro concept camera renders',
    'iphone 18 pro max horizontal camera bar concept',
    'iphone 18 pro burgundy red color render',
    'iphone 18 pro max official render leak',
    'iphone 18 pro lineup renders colors'
]

os.makedirs('public/Home Screen Advertisement/iphone18_visuals', exist_ok=True)
saved_imgs = []

for q in queries:
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote(q)}&FORM=HDRSC2"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            murls = re.findall(r'murl&quot;:&quot;(https?://[^&]+?\.(?:jpg|jpeg|png|webp))&quot;', html)
            print(f"Query '{q}' found {len(murls)} images")
            for m in murls[:8]:
                try:
                    r = urllib.request.Request(m, headers=headers)
                    with urllib.request.urlopen(r, timeout=6) as res:
                        data = res.read()
                        if len(data) > 30000:
                            fname = f"public/Home Screen Advertisement/iphone18_visuals/ip18_{len(saved_imgs)}.png"
                            temp = "scratch/temp_img"
                            with open(temp, 'wb') as f:
                                f.write(data)
                            im = Image.open(temp).convert("RGBA")
                            if im.width >= 400 and im.height >= 300:
                                im.save(fname)
                                saved_imgs.append((fname, m, im.size))
                                print(f"Saved {fname} size={im.size} from {m[:60]}")
                except Exception as e:
                    pass
    except Exception as e:
        print(f"Search failed for {q}: {e}")

print(f"\nTotal iPhone 18 visuals saved: {len(saved_imgs)}")
