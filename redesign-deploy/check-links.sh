#!/bin/bash

echo "=== LINK CHECKER ==="
echo ""

# Check all HTML files
for html_file in *.html; do
  echo "Checking $html_file..."
  
  # Extract all href links
  grep -o 'href="[^"]*"' "$html_file" | sed 's/href="//;s/"$//' | while read link; do
    # Skip external URLs, anchors, mailto, tel
    if [[ $link == http* ]] || [[ $link == mailto:* ]] || [[ $link == tel:* ]] || [[ $link == "#"* ]]; then
      continue
    fi
    
    # Remove anchor from link
    file_part=$(echo "$link" | sed 's/#.*//')
    
    # Skip empty links
    if [ -z "$file_part" ]; then
      continue
    fi
    
    # Check if file exists
    if [ ! -f "$file_part" ]; then
      echo "  ✗ BROKEN: $link in $html_file"
    fi
  done
done

echo ""
echo "=== NAVIGATION LINKS CHECK ==="
echo ""

# Check if navigation dropdowns are consistent
echo "Checking Wissen dropdown consistency..."
for html_file in *.html; do
  if grep -q "wissen-aussenpruefung.html" "$html_file"; then
    echo "  ✓ $html_file has Wissen dropdown"
  fi
done

echo ""
echo "✅ Link check complete!"
