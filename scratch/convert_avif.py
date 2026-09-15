from PIL import Image

avif_path = "public/Home Screen Advertisement/Forged in Titanium.avif"
png_path = "public/Home Screen Advertisement/Forged in Titanium.png"

im = Image.open(avif_path)
im.save(png_path)
print("Saved PNG version of Forged in Titanium:", png_path)
