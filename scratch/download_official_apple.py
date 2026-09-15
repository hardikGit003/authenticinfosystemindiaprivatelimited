import urllib.request
import os
from PIL import Image

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

dest_dir = 'public/Home Screen Advertisement/apple_official'
os.makedirs(dest_dir, exist_ok=True)

assets = {
    'apple_iphone_lineup_2x.jpg': 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large_2x.jpg',
    'apple_iphone_hero_2x.jpg': 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large_2x.jpg',
    'apple_camera_system_2x.jpg': 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-camera-system-240909_inline.jpg.large_2x.jpg',
    'apple_camera_control_2x.jpg': 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-Camera-Control-ChatGPT-240909_inline.jpg.large_2x.jpg',
    'apple_intelligence_2x.jpg': 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-Apple-Intelligence-Writing-Tools-240909_inline.jpg.large_2x.jpg',
    'apple_fusion_photo_2x.jpg': 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-Fusion-photography-01-240909_big.jpg.large_2x.jpg',
    'apple_macro_photo_2x.jpg': 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-macro-photography-240909_big.jpg.large_2x.jpg',
}

for fname, url in assets.items():
    dest = os.path.join(dest_dir, fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        im = Image.open(dest)
        print(f"Downloaded {fname}: {im.size} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {fname}: {e}")
