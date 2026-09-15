from PIL import Image

src = "public/Home Screen Advertisement/apple_official/iphone18_lineup_4colors.png"
im = Image.open(src)
w, h = im.size

# Let's crop only the white area (excluding the right dark area)
# The right dark area starts around where x has dark background
rgb = im.convert("RGB")
right_limit = w
for x in range(w-1, -1, -1):
    r, g, b = rgb.getpixel((x, h//2))
    if r < 100 and g < 100 and b < 100:
        right_limit = x
    else:
        break

# Also check top/bottom
cropped_clean = im.crop((0, 0, right_limit - 5, h - 5))
# Trim any remaining white borders cleanly and pad with pure white background or transparent
cropped_clean.save("public/Home Screen Advertisement/apple_official/iphone18_lineup_clean.png")
print("Saved clean crop:", cropped_clean.size)
