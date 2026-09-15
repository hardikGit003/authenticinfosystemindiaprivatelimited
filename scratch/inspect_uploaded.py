import os
from PIL import Image

uploaded_dir = r"C:\Users\hardi\.gemini\antigravity-ide\brain\f9656c0e-5e9e-4f54-909d-3165d582a98f\.user_uploaded"
files = sorted(os.listdir(uploaded_dir), key=lambda x: os.path.getmtime(os.path.join(uploaded_dir, x)))

for f in files[-5:]:
    path = os.path.join(uploaded_dir, f)
    im = Image.open(path)
    print(f"{f}: size={im.size} mode={im.mode}")
