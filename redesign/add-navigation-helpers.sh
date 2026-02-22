#!/bin/bash

# Script to add navigation helpers to all HTML pages
# This script adds:
# 1. Search button to header
# 2. Search modal before closing body tag
# 3. Scroll-to-top button before closing body tag
# 4. navigation-helpers.js script

# List of HTML files to update (excluding index.html which is already done)
FILES=(
  "leistungen.html"
  "ueber-uns.html"
  "faq.html"
  "wissen.html"
  "wissen-aussenpruefung.html"
  "wissen-steuerstrafrecht.html"
  "wissen-umwandlungssteuerrecht.html"
  "tools.html"
  "honorar.html"
  "karriere.html"
  "kontakt.html"
  "impressum.html"
  "datenschutz.html"
)

SEARCH_BUTTON='                    <!-- Search Button -->
                    <button class="search-toggle" aria-label="Suche öffnen">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>'

SEARCH_MODAL='    <!-- Search Modal -->
    <div class="search-modal">
        <div class="search-modal-content">
            <div class="search-modal-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" class="search-input" placeholder="Suchen Sie nach Themen, Leistungen oder Informationen...">
                <button class="search-close" aria-label="Schließen">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="search-results"></div>
        </div>
    </div>

    <!-- Scroll to Top Button -->
    <button class="scroll-to-top" aria-label="Nach oben scrollen">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    </button>

    <!-- Cookie Consent -->
    <script src="assets/js/cookies.js"></script>

    <!-- Navigation Helpers -->
    <script src="assets/js/navigation-helpers.js"></script>'

echo "Starting to update HTML files..."

for file in "${FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "⚠️  File not found: $file"
    continue
  fi

  echo "Processing $file..."

  # Check if search button already exists
  if grep -q "search-toggle" "$file"; then
    echo "  ✓ Search button already exists in $file"
  else
    # Add search button after lang-switcher closing div
    perl -i -pe 's|(\s+</div>\s*</div>\s+</div>\s+</div>\s+</header>)|'"$SEARCH_BUTTON"'\n$1|' "$file"
    echo "  ✓ Added search button to $file"
  fi

  # Check if search modal already exists
  if grep -q "search-modal" "$file"; then
    echo "  ✓ Search modal already exists in $file"
  else
    # Add search modal and scroll-to-top before Cookie Consent or i18n script
    if grep -q "assets/js/cookies.js" "$file"; then
      perl -i -pe 's|(\s+<!-- Cookie Consent -->)|'"$SEARCH_MODAL"'\n$1|' "$file"
      echo "  ✓ Added search modal and scroll-to-top to $file"
    elif grep -q "assets/js/i18n.js" "$file"; then
      perl -i -pe 's|(\s+<script src="assets/js/i18n.js"></script>)|'"$SEARCH_MODAL"'\n    <script src="assets/js/i18n.js"></script>|' "$file"
      echo "  ✓ Added search modal and scroll-to-top to $file"
    else
      echo "  ⚠️  Could not find insertion point in $file"
    fi
  fi

  echo "  ✅ Completed $file"
  echo ""
done

echo "✅ All files processed!"
echo ""
echo "Note: Please manually review the changes and adjust as needed."
