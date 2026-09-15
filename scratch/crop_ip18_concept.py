import os
from PIL import Image

src_path = r"C:\Users\hardi\.gemini\antigravity-ide\brain\f9656c0e-5e9e-4f54-909d-3165d582a98f\.user_uploaded\media_1789472906031.png"
im = Image.open(src_path)
print("Original size:", im.size)

# Let's crop the actual phone image area from the screenshot (excluding dark borders and bottom text if any)
# In screenshot: top has dark bar, bottom has headline
# Let's inspect pixel colors to find bounding box of the inner image
rgb_im = im.convert("RGB")
w, h = im.size

# Save raw copy
im.save("public/Home Screen Advertisement/apple_official/iphone18_concept_raw.png")

# Let's crop the inner image (white background area with 4 phones)
# We can find the bounding box of the white inner box
box = None
for y in range(h):
    for x in range(w):
        r, g, b = rgb_im.getpixel((x, y))
        # White or light background of the image
        if r > 240 and g > 240 and b > 240:
            if box is None:
                box = [x, y, x, y]
            else:
                box[0] = min(box[0], x)
                box[1] = min(box[1], y)
                box[2] = max(box[2], x)
                box[3] = max(box[3], y)

if box:
    print("Detected inner image box:", box)
    cropped = im.crop(box)
    cropped.save("public/Home Screen Advertisement/apple_official/iphone18_lineup_4colors.png")
    print("Saved cropped inner image:", cropped.size)
