import urllib.request
import os
from PIL import Image

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

urls = [
    'https://cms.thefreelancemedia.in/uploads/hindi/16_9_1/hindi-84-20260912181256-2024.webp',
    'https://cms.thefreelancemedia.in/uploads/hindi/16_9_1/hindi-83-20260912162209-7470.webp',
    'https://cms.thefreelancemedia.in/uploads/hindi/16_9_1/hindi-82-20260912155438-4680.webp',
    'https://cms.thefreelancemedia.in/uploads/hindi/16_9_1/hindi-81-20260911132305-8791.webp',
    'https://cms.thefreelancemedia.in/uploads/hindi/16_9_1/hindi-80-20260911090100-4093.webp',
    'https://cms.thefreelancemedia.in/uploads/hindi/16_9_1/hindi-79-20260911085700-1025.webp',
    'https://cms.thefreelancemedia.in/uploads/hindi/16_9_2/hindi-87-20260914102638-2474.webp',
    'https://cms.thefreelancemedia.in/uploads/hindi/16_9_1/hindi-86-20260913125844-3252.webp',
    'https://cms.thefreelancemedia.in/uploads/hindi/16_9_1/hindi-85-20260913101315-2985.webp',
]

os.makedirs('scratch/tfm', exist_ok=True)

for i, u in enumerate(urls):
    dest = f"scratch/tfm/img_{i}.webp"
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        im = Image.open(dest)
        print(f"Downloaded {dest}: size={im.size}")
    except Exception as e:
        print(f"Failed {u}: {e}")
