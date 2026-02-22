#!/bin/bash

# Deployment Test Script
# Testet ob die wichtigsten Features funktionieren

echo "🔍 Testing Deployment..."
echo ""

BASE_URL="https://steuerkanzlei-erben-demo.netlify.app"
FAILED=0

# Test 1: TOC Button vorhanden
echo "Test 1: TOC Button auf Wissensseiten..."
for page in wissen-aussenpruefung wissen-steuerstrafrecht wissen-umwandlungssteuerrecht; do
    COUNT=$(curl -s "$BASE_URL/${page}.html" | grep -c "toc-toggle-btn")
    if [ $COUNT -eq 1 ]; then
        echo "  ✅ ${page}.html - TOC Button gefunden"
    else
        echo "  ❌ ${page}.html - TOC Button FEHLT (count: $COUNT)"
        FAILED=$((FAILED+1))
    fi
done

# Test 2: TOC Sidebar vorhanden
echo ""
echo "Test 2: TOC Sidebar auf Wissensseiten..."
for page in wissen-aussenpruefung wissen-steuerstrafrecht wissen-umwandlungssteuerrecht; do
    COUNT=$(curl -s "$BASE_URL/${page}.html" | grep -c "toc-sidebar")
    if [ $COUNT -eq 1 ]; then
        echo "  ✅ ${page}.html - TOC Sidebar gefunden"
    else
        echo "  ❌ ${page}.html - TOC Sidebar FEHLT (count: $COUNT)"
        FAILED=$((FAILED+1))
    fi
done

# Test 3: JavaScript geladen
echo ""
echo "Test 3: navigation-helpers.js geladen..."
for page in wissen-aussenpruefung wissen-steuerstrafrecht wissen-umwandlungssteuerrecht; do
    COUNT=$(curl -s "$BASE_URL/${page}.html" | grep -c "navigation-helpers.js")
    if [ $COUNT -eq 1 ]; then
        echo "  ✅ ${page}.html - JavaScript geladen"
    else
        echo "  ❌ ${page}.html - JavaScript FEHLT (count: $COUNT)"
        FAILED=$((FAILED+1))
    fi
done

# Test 4: JavaScript Funktionen vorhanden
echo ""
echo "Test 4: JavaScript Funktionen..."
JS_CONTENT=$(curl -s "$BASE_URL/assets/js/navigation-helpers.js")

if echo "$JS_CONTENT" | grep -q "function initTOCToggle"; then
    echo "  ✅ initTOCToggle vorhanden"
else
    echo "  ❌ initTOCToggle FEHLT"
    FAILED=$((FAILED+1))
fi

if echo "$JS_CONTENT" | grep -q "headerOffset.*150"; then
    echo "  ✅ Header-Offset korrekt (150px)"
else
    echo "  ❌ Header-Offset falsch oder fehlt"
    FAILED=$((FAILED+1))
fi

if echo "$JS_CONTENT" | grep -q "closest.*card"; then
    echo "  ✅ Card-Filter vorhanden"
else
    echo "  ❌ Card-Filter fehlt"
    FAILED=$((FAILED+1))
fi

# Test 5: CSS korrekt
echo ""
echo "Test 5: CSS Styles..."
CSS_CONTENT=$(curl -s "$BASE_URL/assets/css/styles.css")

if echo "$CSS_CONTENT" | grep -A2 "\.toc-sidebar\.is-open" | grep -q "right.*0.*important"; then
    echo "  ✅ TOC Sidebar is-open CSS korrekt"
else
    echo "  ❌ TOC Sidebar is-open CSS fehlt oder falsch"
    FAILED=$((FAILED+1))
fi

if echo "$CSS_CONTENT" | grep -A15 "\.toc-toggle-btn" | grep -q "display.*flex"; then
    echo "  ✅ TOC Button sichtbar"
else
    echo "  ❌ TOC Button möglicherweise versteckt"
    FAILED=$((FAILED+1))
fi

# Ergebnis
echo ""
echo "================================"
if [ $FAILED -eq 0 ]; then
    echo "✅ Alle Tests bestanden!"
    exit 0
else
    echo "❌ $FAILED Test(s) fehlgeschlagen"
    exit 1
fi
