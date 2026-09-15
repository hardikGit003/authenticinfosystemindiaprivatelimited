from PIL import Image

src = "public/Home Screen Advertisement/Forged in Titanium.png"
im = Image.open(src)
w, h = im.size
rgb = im.convert("RGB")

top_left = rgb.getpixel((5, 5))
top_right = rgb.getpixel((w - 5, 5))
bottom_left = rgb.getpixel((5, h - 5))
bottom_right = rgb.getpixel((w - 5, h - 5))

print("Size:", im.size)
print("Top-left color:", top_left)
print("Top-right color:", top_right)
print("Bottom-left color:", bottom_left)
print("Bottom-right color:", bottom_right)
