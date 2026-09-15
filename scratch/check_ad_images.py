import os
from PIL import Image

dir_path = "public/Home Screen Advertisement"
files = [
    "Forged in Titanium.avif",
    "Horizontal Visor Island.png",
    "Apple Intelligence (A20 Pro).png",
    "Iphone18PRoBanner.png"
]

for f in files:
    p = os.path.join(dir_path, f)
    if os.path.exists(p):
        im = Image.open(p)
        print(f"{f}: size={im.size} mode={im.mode} format={im.format}")
    else:
        print(f"Missing: {f}")
