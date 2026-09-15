from PIL import Image, ImageFilter, ImageEnhance

src = "public/Home Screen Advertisement/apple_official/iphone18_lineup_clean.png"
im = Image.open(src).convert("RGBA")

# Upscale with high quality Lanczos
w, h = im.size
upscaled = im.resize((w * 4, h * 4), Image.Resampling.LANCZOS)
# Enhance sharpness subtly
enhancer = ImageEnhance.Sharpness(upscaled)
upscaled_sharp = enhancer.enhance(1.4)
upscaled_sharp.save("public/Home Screen Advertisement/apple_official/iphone18_lineup_hd.png")
print("Saved HD Lineup:", upscaled_sharp.size)

# Crop the unique burgundy & blue camera visor for the Camera Feature card!
uw, uh = upscaled_sharp.size
# Burgundy camera visor is on the rightmost phone (approx 60% to 100% width, top 0% to 65% height)
camera_crop = upscaled_sharp.crop((int(uw * 0.58), 0, uw, int(uh * 0.70)))
camera_crop.save("public/Home Screen Advertisement/apple_official/iphone18_camera_visor.png")
print("Saved Camera Visor Crop:", camera_crop.size)

# Crop the sleek black/silver titanium edges for the Titanium card
titanium_crop = upscaled_sharp.crop((0, 0, int(uw * 0.55), uh))
titanium_crop.save("public/Home Screen Advertisement/apple_official/iphone18_titanium_edge.png")
print("Saved Titanium Edge Crop:", titanium_crop.size)
