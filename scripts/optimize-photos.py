"""Convierte las fotos de fotos-originales/<proyecto>/ a WebP en public/images/projects/
y genera src/data/photos.json, que la página usa para portada y galería de cada proyecto.

Uso:  python scripts/optimize-photos.py
El orden de la galería es el orden alfabético de los archivos; el primero es la portada.
"""
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "fotos-originales"
OUT = ROOT / "public" / "images" / "projects"
MANIFEST = ROOT / "src" / "data" / "photos.json"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}
# Deben coincidir con los slug de src/data/projects.js
SLUGS = {"marina-san-fernando", "casa-kosmos", "marina-guanajuato", "casa-cuarzita"}


def save(im, path, max_side):
    im = im.copy()
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    im.save(path, "WEBP", quality=78, method=6)
    return im.size


def main():
    manifest = {}
    for folder in sorted(p for p in SRC.iterdir() if p.is_dir()):
        if folder.name not in SLUGS:
            raise SystemExit(f"Carpeta desconocida: {folder.name}. Usa una de: {sorted(SLUGS)}")
        files = sorted(f for f in folder.iterdir() if f.suffix.lower() in EXTS)
        if not files:
            continue
        dest = OUT / folder.name
        dest.mkdir(parents=True, exist_ok=True)
        photos = []
        for i, f in enumerate(files, 1):
            im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
            name = f"{i:02d}"
            w, h = save(im, dest / f"{name}.webp", 1600)
            save(im, dest / f"{name}-sm.webp", 800)
            base = f"images/projects/{folder.name}/{name}"
            photos.append({"src": f"{base}.webp", "sm": f"{base}-sm.webp", "w": w, "h": h})
        manifest[folder.name] = photos
        print(f"{folder.name}: {len(photos)} fotos")
    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Manifest: {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
