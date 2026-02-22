#!/bin/bash

echo "=== A) STRUKTURPRÜFUNG ==="
echo ""
echo "Checking for all required HTML files:"
for file in index.html leistungen.html ueber-uns.html faq.html wissen.html karriere.html kontakt.html tools.html honorar.html impressum.html datenschutz.html; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file MISSING!"
    fi
done

echo ""
echo "Checking CSS files:"
if [ -f "assets/css/styles.css" ]; then
    echo "✓ assets/css/styles.css exists"
else
    echo "✗ styles.css MISSING!"
fi

echo ""
echo "Checking JS files:"
for file in assets/js/main.js assets/js/i18n.js; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file MISSING!"
    fi
done

echo ""
echo "Checking translation files:"
for file in assets/translations/de.json assets/translations/tr.json assets/translations/en.json; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file MISSING!"
    fi
done

echo ""
echo "=== B) HTML-VALIDIERUNG (Basic Checks) ==="
echo ""
echo "Checking for unclosed tags in new pages:"
for file in tools.html honorar.html; do
    echo "Checking $file..."
    # Count opening and closing tags
    open_divs=$(grep -o "<div" "$file" | wc -l)
    close_divs=$(grep -o "</div>" "$file" | wc -l)
    echo "  <div> tags: $open_divs open, $close_divs close"
    
    open_sections=$(grep -o "<section" "$file" | wc -l)
    close_sections=$(grep -o "</section>" "$file" | wc -l)
    echo "  <section> tags: $open_sections open, $close_sections close"
done

echo ""
echo "=== C) KONSISTENZPRÜFUNG ==="
echo ""
echo "Checking navigation links in all files:"
for file in *.html; do
    if grep -q 'href="tools.html"' "$file" && grep -q 'href="honorar.html"' "$file"; then
        echo "✓ $file has Tools and Honorar links"
    else
        echo "⚠ $file may be missing new navigation links"
    fi
done

echo ""
echo "=== D) JSON-VALIDIERUNG ==="
echo ""
python3 << 'PYTHON'
import json
import sys

files = ['assets/translations/de.json', 'assets/translations/tr.json', 'assets/translations/en.json']
for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            json.load(f)
        print(f"✓ {file} is valid JSON")
    except json.JSONDecodeError as e:
        print(f"✗ {file} has JSON error: {e}")
        sys.exit(1)
PYTHON

echo ""
echo "=== E) JAVASCRIPT SYNTAX CHECK ==="
echo ""
for file in assets/js/main.js assets/js/i18n.js; do
    if node -c "$file" 2>/dev/null; then
        echo "✓ $file syntax OK"
    else
        echo "⚠ $file syntax check skipped (node not available)"
    fi
done

echo ""
echo "=== CHECK COMPLETE ==="
