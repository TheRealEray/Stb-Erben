#!/usr/bin/env python3
import plistlib
import base64
import os
import hashlib
from pathlib import Path

# Pfade
webarchive_path = "limegreen-monkey-750690.hostingersite.com.webarchive"
output_dir = "redesign/assets/images/extracted"

# Output-Verzeichnis erstellen
Path(output_dir).mkdir(parents=True, exist_ok=True)

# Webarchive laden
with open(webarchive_path, 'rb') as f:
    plist = plistlib.load(f)

# Zähler und Liste für Bilder
image_count = 0
image_list = []

# Funktion zum Speichern eines Bildes
def save_image(data, url, mime_type):
    global image_count

    # Dateiendung aus MIME-Type
    ext_map = {
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/svg+xml': '.svg',
        'image/webp': '.webp'
    }

    ext = ext_map.get(mime_type, '.bin')

    # Dateinamen aus URL extrahieren oder Hash verwenden
    if url:
        filename = os.path.basename(url.split('?')[0])
        if not filename or filename == '' or '.' not in filename:
            # Hash als Fallback
            hash_name = hashlib.md5(data).hexdigest()[:8]
            filename = f"image-{hash_name}{ext}"
    else:
        hash_name = hashlib.md5(data).hexdigest()[:8]
        filename = f"image-{hash_name}{ext}"

    # Bereinige Dateinamen
    filename = filename.replace('%20', '-').replace(' ', '-')

    # Speichern
    output_path = os.path.join(output_dir, filename)

    # Vermeide Duplikate
    counter = 1
    base_name = filename
    while os.path.exists(output_path):
        name, ext = os.path.splitext(base_name)
        filename = f"{name}-{counter}{ext}"
        output_path = os.path.join(output_dir, filename)
        counter += 1

    with open(output_path, 'wb') as f:
        f.write(data)

    image_count += 1
    image_list.append({
        'filename': filename,
        'original_url': url,
        'mime_type': mime_type,
        'size': len(data)
    })

    print(f"✓ Extrahiert: {filename} ({len(data)} bytes)")

# Hauptressource durchsuchen (falls es ein Bild ist)
main_resource = plist.get('WebMainResource', {})
main_mime = main_resource.get('WebResourceMIMEType', '')
if main_mime.startswith('image/'):
    data = main_resource.get('WebResourceData')
    url = main_resource.get('WebResourceURL', '')
    if data:
        save_image(data, url, main_mime)

# Subressourcen durchsuchen
subresources = plist.get('WebSubresources', [])
print(f"\nGefunden: {len(subresources)} Subressourcen")

for resource in subresources:
    mime_type = resource.get('WebResourceMIMEType', '')

    # Nur Bilder
    if mime_type.startswith('image/'):
        data = resource.get('WebResourceData')
        url = resource.get('WebResourceURL', '')

        if data:
            save_image(data, url, mime_type)

# Zusammenfassung
print(f"\n{'='*60}")
print(f"Extraktion abgeschlossen!")
print(f"{'='*60}")
print(f"Gesamt extrahiert: {image_count} Bilder")
print(f"Zielordner: {output_dir}")

# Liste speichern
if image_list:
    with open(os.path.join(output_dir, '_image-list.txt'), 'w') as f:
        f.write("Extrahierte Bilder aus webarchive\n")
        f.write("="*60 + "\n\n")
        for img in image_list:
            f.write(f"Datei: {img['filename']}\n")
            f.write(f"Original URL: {img['original_url']}\n")
            f.write(f"MIME Type: {img['mime_type']}\n")
            f.write(f"Größe: {img['size']} bytes\n")
            f.write("-"*60 + "\n")
    print(f"\nBildliste gespeichert: {output_dir}/_image-list.txt")
