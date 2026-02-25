// ===== GERMAN NUMBER FORMATTING =====
function formatGermanNumber(value, decimals = 2) {
    if (value === null || value === undefined || value === '') return '';
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    return num.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function parseGermanNumber(value) {
    if (!value) return 0;
    // Remove thousand separators and replace comma with dot
    const normalized = value.toString().replace(/\./g, '').replace(',', '.');
    return parseFloat(normalized) || 0;
}

function formatCurrencyInput(input) {
    input.addEventListener('blur', function() {
        const value = parseGermanNumber(this.value);
        if (value > 0) {
            this.value = formatGermanNumber(value, 2);
        }
    });

    input.addEventListener('focus', function() {
        const value = parseGermanNumber(this.value);
        if (value > 0) {
            this.value = value.toString();
        }
    });
}

// ===== MODAL FUNCTIONALITY =====
const modal = document.getElementById('tool-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.tool-modal__close');
const overlay = document.querySelector('.tool-modal__overlay');

function openTool(toolName) {
    const content = getToolContent(toolName);
    modalBody.innerHTML = content;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Initialize calculator
    setTimeout(() => {
        initializeTool(toolName);
    }, 100);
}

function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

if (overlay) {
    overlay.addEventListener('click', closeModal);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
    }
});

// ===== INITIALIZE TOOLS =====
function initializeTool(toolName) {
    const currencyInputs = document.querySelectorAll('.currency-input');
    currencyInputs.forEach(input => {
        // Format existing values immediately
        if (input.value) {
            const numValue = parseFloat(input.value);
            if (!isNaN(numValue) && numValue > 0) {
                input.value = formatGermanNumber(numValue, 2);
            }
        }
        // Add event listeners for future changes
        formatCurrencyInput(input);
    });

    // Tool-specific initialization
    if (toolName === 'arbeitstage') {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + 30);
        document.getElementById('start-datum').valueAsDate = today;
        document.getElementById('end-datum').valueAsDate = futureDate;
    } else if (toolName === 'mutterschutz') {
        const today = new Date();
        document.getElementById('entbindungstermin').valueAsDate = today;
    } else if (toolName === 'fristenrechner') {
        const today = new Date();
        document.getElementById('ereignis-datum').valueAsDate = today;
    }
}

// ===== TOOL CONTENT =====
function getToolContent(toolName) {
    const tools = {
        'einkommensteuer': `
            <h2>Einkommensteuer-Rechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie Ihre Einkommensteuer und Solidaritätszuschlag basierend auf Ihrem zu versteuernden Einkommen.
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Zu versteuerndes Einkommen (€)</label>
                    <input type="text" id="einkommen" class="form__input currency-input" placeholder="50.000,00" value="50000">
                </div>
                <div class="form__group">
                    <label class="form__label">Steuerklasse</label>
                    <select id="steuerklasse" class="form__select">
                        <option value="1">I - Alleinstehend</option>
                        <option value="2">II - Alleinerziehend</option>
                        <option value="3">III - Verheiratet (höheres Einkommen)</option>
                        <option value="4">IV - Verheiratet (beide Einkommen ähnlich)</option>
                        <option value="5">V - Verheiratet (niedrigeres Einkommen)</option>
                        <option value="6">VI - Mehrere Arbeitgeber</option>
                    </select>
                </div>
                <button onclick="berechneEinkommensteuer()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="einkommen-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'schenkungssteuer': `
            <h2>Schenkungssteuer-Rechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie die Schenkungssteuer und Freibeträge für Schenkungen.
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Wert der Schenkung (€)</label>
                    <input type="text" id="schenkungswert" class="form__input currency-input" placeholder="100.000,00" value="100000">
                </div>
                <div class="form__group">
                    <label class="form__label">Verwandtschaftsgrad</label>
                    <select id="verwandtschaft" class="form__select">
                        <option value="1">Steuerklasse I - Ehepartner/Lebenspartner</option>
                        <option value="2">Steuerklasse I - Kinder/Enkelkinder</option>
                        <option value="3">Steuerklasse I - Eltern/Großeltern</option>
                        <option value="4">Steuerklasse II - Geschwister/Nichten/Neffen</option>
                        <option value="5">Steuerklasse III - Alle übrigen</option>
                    </select>
                </div>
                <button onclick="berechneSchenkungssteuer()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="schenkung-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'brutto-netto': `
            <h2>Brutto-Netto-Rechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie Ihr Nettogehalt aus dem Bruttogehalt unter Berücksichtigung von Steuern und Sozialabgaben.
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Bruttogehalt (€)</label>
                    <input type="text" id="brutto" class="form__input currency-input" placeholder="3.500,00" value="3500">
                </div>
                <div class="form__group">
                    <label class="form__label">Steuerklasse</label>
                    <select id="bn-steuerklasse" class="form__select">
                        <option value="1">I - Alleinstehend</option>
                        <option value="2">II - Alleinerziehend</option>
                        <option value="3">III - Verheiratet (höheres Einkommen)</option>
                        <option value="4">IV - Verheiratet (beide Einkommen ähnlich)</option>
                        <option value="5">V - Verheiratet (niedrigeres Einkommen)</option>
                        <option value="6">VI - Mehrere Arbeitgeber</option>
                    </select>
                </div>
                <div class="form__group">
                    <label class="form__label">Kinderfreibeträge</label>
                    <input type="number" id="kinder" class="form__input" placeholder="0" value="0" min="0" max="10">
                </div>
                <div class="form__group">
                    <div class="form__checkbox-wrapper">
                        <input type="checkbox" id="kirchensteuer" class="form__checkbox" checked>
                        <label for="kirchensteuer" class="form__checkbox-label">Kirchensteuerpflichtig</label>
                    </div>
                </div>
                <button onclick="berechneBruttoNetto()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="brutto-netto-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'elterngeld': `
            <h2>Elterngeld-Rechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie Ihren voraussichtlichen Elterngeldanspruch basierend auf Ihrem Nettoeinkommen.
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Durchschnittliches monatliches Nettoeinkommen (€)</label>
                    <input type="text" id="nettoeinkommen" class="form__input currency-input" placeholder="2.500,00" value="2500">
                    <small style="color: var(--color-text-light); display: block; margin-top: var(--spacing-xs);">
                        Durchschnitt der letzten 12 Monate vor der Geburt
                    </small>
                </div>
                <div class="form__group">
                    <label class="form__label">Elterngeld-Variante</label>
                    <select id="elterngeld-variante" class="form__select">
                        <option value="basis">Basiselterngeld (12 Monate)</option>
                        <option value="plus">ElterngeldPlus (24 Monate)</option>
                    </select>
                </div>
                <div class="form__group">
                    <div class="form__checkbox-wrapper">
                        <input type="checkbox" id="geschwister" class="form__checkbox">
                        <label for="geschwister" class="form__checkbox-label">Geschwisterbonus (10%)</label>
                    </div>
                </div>
                <div class="form__group">
                    <div class="form__checkbox-wrapper">
                        <input type="checkbox" id="mehrlinge" class="form__checkbox">
                        <label for="mehrlinge" class="form__checkbox-label">Mehrlingsgeburt (300€ pro Kind)</label>
                    </div>
                </div>
                <button onclick="berechneElterngeld()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="elterngeld-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'pflegegeld': `
            <h2>Pflegegeld-Rechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Ermitteln Sie das Pflegegeld und die Pflegesachleistungen nach Pflegegrad.
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Pflegegrad</label>
                    <select id="pflegegrad" class="form__select">
                        <option value="1">Pflegegrad 1 - Geringe Beeinträchtigung</option>
                        <option value="2">Pflegegrad 2 - Erhebliche Beeinträchtigung</option>
                        <option value="3">Pflegegrad 3 - Schwere Beeinträchtigung</option>
                        <option value="4">Pflegegrad 4 - Schwerste Beeinträchtigung</option>
                        <option value="5">Pflegegrad 5 - Schwerste Beeinträchtigung mit besonderen Anforderungen</option>
                    </select>
                </div>
                <div class="form__group">
                    <label class="form__label">Art der Pflege</label>
                    <select id="pflegeart" class="form__select">
                        <option value="geld">Pflegegeld (häusliche Pflege durch Angehörige)</option>
                        <option value="sach">Pflegesachleistung (professioneller Pflegedienst)</option>
                        <option value="kombi">Kombinationsleistung</option>
                    </select>
                </div>
                <button onclick="berechnePflegegeld()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="pflegegeld-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'mutterschutz': `
            <h2>Mutterschutz-Rechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie die Mutterschutzfristen vor und nach der Entbindung.
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Voraussichtlicher Entbindungstermin</label>
                    <input type="date" id="entbindungstermin" class="form__input">
                </div>
                <div class="form__group">
                    <div class="form__checkbox-wrapper">
                        <input type="checkbox" id="mehrlingsgeburt" class="form__checkbox">
                        <label for="mehrlingsgeburt" class="form__checkbox-label">Mehrlingsgeburt</label>
                    </div>
                </div>
                <div class="form__group">
                    <div class="form__checkbox-wrapper">
                        <input type="checkbox" id="fruehgeburt" class="form__checkbox">
                        <label for="fruehgeburt" class="form__checkbox-label">Frühgeburt (vor der 37. SSW)</label>
                    </div>
                </div>
                <button onclick="berechneMutterschutz()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="mutterschutz-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'arbeitstage': `
            <h2>Arbeitstage-Rechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie die Anzahl der Arbeitstage zwischen zwei Daten unter Berücksichtigung von Wochenenden und Feiertagen.
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Startdatum</label>
                    <input type="date" id="start-datum" class="form__input">
                </div>
                <div class="form__group">
                    <label class="form__label">Enddatum</label>
                    <input type="date" id="end-datum" class="form__input">
                </div>
                <div class="form__group">
                    <label class="form__label">Bundesland</label>
                    <select id="at-bundesland" class="form__select">
                        <option value="NW" selected>Nordrhein-Westfalen</option>
                        <option value="BY">Bayern</option>
                        <option value="BW">Baden-Württemberg</option>
                        <option value="Other">Andere</option>
                    </select>
                </div>
                <button onclick="berechneArbeitstage()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="arbeitstage-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'minijob': `
            <h2>Minijob-Rechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie die Abgaben und Kosten bei Minijobs (geringfügige Beschäftigung).
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Monatliches Arbeitsentgelt (€)</label>
                    <input type="text" id="minijob-lohn" class="form__input currency-input" placeholder="556,00" value="556">
                    <small style="color: var(--color-text-light); display: block; margin-top: var(--spacing-xs);">
                        Bis 556 € monatlich = Minijob (ab 01.01.2025)
                    </small>
                </div>
                <div class="form__group">
                    <label class="form__label">Art des Minijobs</label>
                    <select id="minijob-art" class="form__select">
                        <option value="gewerblich">Gewerblicher Minijob</option>
                        <option value="haushalt">Minijob im Privathaushalt</option>
                    </select>
                </div>
                <button onclick="berechneMinijob()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="minijob-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'gruendercheck': `
            <h2>Gründercheck</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Prüfen Sie mit diesem Selbsttest, ob Sie bereit für die Selbstständigkeit sind.
            </p>
            <div class="calculator">
                <div style="background: var(--color-bg-light); padding: var(--spacing-lg); border-radius: var(--border-radius); margin-bottom: var(--spacing-lg);">
                    <h3 style="font-size: 1.125rem; margin-bottom: var(--spacing-md);">Bewerten Sie folgende Aussagen (1-5):</h3>
                    <p style="font-size: 0.875rem; color: var(--color-text-light);">1 = Trifft nicht zu | 5 = Trifft voll zu</p>
                </div>

                <div class="form__group">
                    <label class="form__label">1. Ich habe eine klare Geschäftsidee</label>
                    <select id="frage1" class="form__select">
                        <option value="1">1 - Trifft nicht zu</option>
                        <option value="2">2</option>
                        <option value="3">3 - Teilweise</option>
                        <option value="4">4</option>
                        <option value="5">5 - Trifft voll zu</option>
                    </select>
                </div>
                <div class="form__group">
                    <label class="form__label">2. Ich bin bereit, hohes Risiko einzugehen</label>
                    <select id="frage2" class="form__select">
                        <option value="1">1 - Trifft nicht zu</option>
                        <option value="2">2</option>
                        <option value="3">3 - Teilweise</option>
                        <option value="4">4</option>
                        <option value="5">5 - Trifft voll zu</option>
                    </select>
                </div>
                <div class="form__group">
                    <label class="form__label">3. Ich habe ausreichend Eigenkapital/Rücklagen</label>
                    <select id="frage3" class="form__select">
                        <option value="1">1 - Trifft nicht zu</option>
                        <option value="2">2</option>
                        <option value="3">3 - Teilweise</option>
                        <option value="4">4</option>
                        <option value="5">5 - Trifft voll zu</option>
                    </select>
                </div>
                <div class="form__group">
                    <label class="form__label">4. Ich besitze Branchenerfahrung</label>
                    <select id="frage4" class="form__select">
                        <option value="1">1 - Trifft nicht zu</option>
                        <option value="2">2</option>
                        <option value="3">3 - Teilweise</option>
                        <option value="4">4</option>
                        <option value="5">5 - Trifft voll zu</option>
                    </select>
                </div>
                <div class="form__group">
                    <label class="form__label">5. Ich bin motiviert und durchsetzungsfähig</label>
                    <select id="frage5" class="form__select">
                        <option value="1">1 - Trifft nicht zu</option>
                        <option value="2">2</option>
                        <option value="3">3 - Teilweise</option>
                        <option value="4">4</option>
                        <option value="5">5 - Trifft voll zu</option>
                    </select>
                </div>
                <button onclick="berechneGruendercheck()" class="btn btn--primary" style="width: 100%;">Auswertung</button>
                <div id="gruendercheck-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'businessplan': `
            <h2>Businessplan-Vorlage</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Ein strukturierter Businessplan ist die Grundlage für eine erfolgreiche Gründung. Hier finden Sie die wichtigsten Komponenten.
            </p>
            <div class="calculator">
                <div style="background: var(--color-bg-light); padding: var(--spacing-lg); border-radius: var(--border-radius);">
                    <h3 style="margin-top: 0;">Wichtige Bestandteile eines Businessplans:</h3>
                    <ol style="line-height: 1.8; padding-left: var(--spacing-lg);">
                        <li><strong>Executive Summary</strong> - Zusammenfassung Ihrer Geschäftsidee</li>
                        <li><strong>Geschäftsidee</strong> - Detaillierte Beschreibung Ihres Vorhabens</li>
                        <li><strong>Marktanalyse</strong> - Zielgruppe, Wettbewerb, Marktpotenzial</li>
                        <li><strong>Marketing & Vertrieb</strong> - Ihre Vertriebs- und Marketingstrategie</li>
                        <li><strong>Unternehmensorganisation</strong> - Rechtsform, Team, Standort</li>
                        <li><strong>Finanzplanung</strong> - Kapitalbedarf, Umsatzprognose, Rentabilität</li>
                        <li><strong>Chancen & Risiken</strong> - SWOT-Analyse</li>
                    </ol>
                    <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: white; border-left: 4px solid var(--color-primary); border-radius: 4px;">
                        <p style="margin: 0; font-weight: 600; color: var(--color-primary);">💡 Tipp</p>
                        <p style="margin-top: var(--spacing-xs); margin-bottom: 0;">
                            Wir unterstützen Sie bei der Erstellung Ihres Businessplans und prüfen Ihre Finanzplanung auf Plausibilität.
                        </p>
                    </div>
                    <a href="kontakt.html" class="btn btn--primary" style="width: 100%; margin-top: var(--spacing-lg);">
                        Jetzt Beratung anfragen
                    </a>
                </div>
            </div>
        `,
        'foerderrechner': `
            <h2>Förderrechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Ermitteln Sie potenzielle Fördermittel für Ihre Unternehmensgründung.
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Gründungsart</label>
                    <select id="gruendungsart" class="form__select">
                        <option value="vollzeit">Vollzeit-Selbstständigkeit</option>
                        <option value="nebenerwerb">Nebenerwerbsgründung</option>
                        <option value="team">Teamgründung (mind. 2 Personen)</option>
                    </select>
                </div>
                <div class="form__group">
                    <label class="form__label">Kapitalbedarf (€)</label>
                    <input type="text" id="kapitalbedarf" class="form__input currency-input" placeholder="50.000,00" value="50000">
                </div>
                <div class="form__group">
                    <label class="form__label">Branche</label>
                    <select id="branche" class="form__select">
                        <option value="tech">Technologie/IT</option>
                        <option value="handel">Handel</option>
                        <option value="handwerk">Handwerk</option>
                        <option value="dienstleistung">Dienstleistung</option>
                        <option value="andere">Andere</option>
                    </select>
                </div>
                <div class="form__group">
                    <div class="form__checkbox-wrapper">
                        <input type="checkbox" id="alg-bezug" class="form__checkbox">
                        <label for="alg-bezug" class="form__checkbox-label">Aktuell Arbeitslosengeld-Bezug</label>
                    </div>
                </div>
                <button onclick="berechneFoerderung()" class="btn btn--primary" style="width: 100%;">Möglichkeiten prüfen</button>
                <div id="foerderung-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'gmbh-checkliste': `
            <h2>Gründungscheckliste GmbH</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Schritt-für-Schritt-Anleitung für die Gründung einer GmbH.
            </p>
            <div class="calculator">
                <div style="background: var(--color-bg-light); padding: var(--spacing-lg); border-radius: var(--border-radius);">
                    <h3 style="margin-top: 0;">Checkliste: GmbH-Gründung</h3>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>1. Gesellschaftsvertrag aufsetzen</strong><br>
                            <small style="color: var(--color-text-light);">Regelung der Gesellschafterrechte, Geschäftsführung, Gewinnverteilung</small></span>
                        </label>
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>2. Stammkapital einzahlen</strong><br>
                            <small style="color: var(--color-text-light);">Mindestens 25.000 € (mind. 12.500 € bei Gründung einzuzahlen)</small></span>
                        </label>
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>3. Notarielle Beurkundung</strong><br>
                            <small style="color: var(--color-text-light);">Gesellschaftsvertrag notariell beurkunden lassen</small></span>
                        </label>
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>4. Handelsregister-Anmeldung</strong><br>
                            <small style="color: var(--color-text-light);">Eintragung beim zuständigen Handelsregister</small></span>
                        </label>
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>5. Gewerbeanmeldung</strong><br>
                            <small style="color: var(--color-text-light);">Bei der zuständigen Gemeinde</small></span>
                        </label>
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>6. IHK-/HWK-Mitgliedschaft</strong><br>
                            <small style="color: var(--color-text-light);">Automatische Mitgliedschaft nach Handelsregistereintrag</small></span>
                        </label>
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>7. Finanzamt informieren</strong><br>
                            <small style="color: var(--color-text-light);">Steuernummer beantragen, Fragebogen zur steuerlichen Erfassung</small></span>
                        </label>
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>8. Geschäftskonto eröffnen</strong><br>
                            <small style="color: var(--color-text-light);">Trennung von privaten und geschäftlichen Finanzen</small></span>
                        </label>
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>9. Versicherungen abschließen</strong><br>
                            <small style="color: var(--color-text-light);">Betriebshaftpflicht, D&O-Versicherung, etc.</small></span>
                        </label>
                        <label style="display: flex; align-items: flex-start; gap: var(--spacing-sm); cursor: pointer;">
                            <input type="checkbox" style="margin-top: 4px;">
                            <span><strong>10. Buchhaltung einrichten</strong><br>
                            <small style="color: var(--color-text-light);">Buchführungspflicht beachten, ggf. Steuerberater mandatieren</small></span>
                        </label>
                    </div>
                    <div style="margin-top: var(--spacing-xl); padding: var(--spacing-md); background: white; border-left: 4px solid var(--color-primary); border-radius: 4px;">
                        <p style="margin: 0; font-weight: 600; color: var(--color-primary);">💼 Unsere Leistung</p>
                        <p style="margin-top: var(--spacing-xs); margin-bottom: 0;">
                            Wir begleiten Sie durch den gesamten Gründungsprozess und übernehmen Ihre steuerliche Betreuung von Anfang an.
                        </p>
                    </div>
                </div>
            </div>
        `,
        'altersvorsorge': `
            <h2>Betriebliche Altersvorsorge-Rechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie die Steuerersparnis bei betrieblicher Altersvorsorge (Entgeltumwandlung).
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Bruttogehalt (€)</label>
                    <input type="text" id="bav-brutto" class="form__input currency-input" placeholder="4.000,00" value="4000">
                </div>
                <div class="form__group">
                    <label class="form__label">Monatlicher Beitrag zur bAV (€)</label>
                    <input type="text" id="bav-beitrag" class="form__input currency-input" placeholder="200,00" value="200">
                    <small style="color: var(--color-text-light); display: block; margin-top: var(--spacing-xs);">
                        SV-frei: max. 322 €/Monat | Steuerfrei: max. 644 €/Monat (2025)
                    </small>
                </div>
                <div class="form__group">
                    <label class="form__label">Steuerklasse</label>
                    <select id="bav-steuerklasse" class="form__select">
                        <option value="1">I - Alleinstehend</option>
                        <option value="3">III - Verheiratet</option>
                        <option value="4">IV - Verheiratet</option>
                    </select>
                </div>
                <button onclick="berechneAltersvorsorge()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="bav-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'fristenrechner': `
            <h2>Fristenrechner (BGB)</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie gesetzliche Fristen nach dem BGB (z.B. Kündigungsfristen, Widerrufsfristen).
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Fristtyp</label>
                    <select id="fristtyp" class="form__select">
                        <option value="14tage">14 Tage (Widerruf bei Verbraucherverträgen)</option>
                        <option value="2wochen">2 Wochen</option>
                        <option value="1monat">1 Monat</option>
                        <option value="3monate">3 Monate (z.B. ordentliche Kündigung)</option>
                        <option value="6monate">6 Monate</option>
                    </select>
                </div>
                <div class="form__group">
                    <label class="form__label">Ereignisdatum (z.B. Zugang der Kündigung)</label>
                    <input type="date" id="ereignis-datum" class="form__input">
                </div>
                <div class="form__group">
                    <div class="form__checkbox-wrapper">
                        <input type="checkbox" id="frist-beginn-folgetag" class="form__checkbox" checked>
                        <label for="frist-beginn-folgetag" class="form__checkbox-label">Frist beginnt am Folgetag (§ 187 Abs. 1 BGB)</label>
                    </div>
                </div>
                <button onclick="berechneFrist()" class="btn btn--primary" style="width: 100%;">Fristende berechnen</button>
                <div id="frist-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'kreditrechner': `
            <h2>Kreditrechner</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Berechnen Sie Kreditraten, Zinsen und Gesamtkosten für Ihr Darlehen.
            </p>
            <div class="calculator">
                <div class="form__group">
                    <label class="form__label">Darlehensbetrag (€)</label>
                    <input type="text" id="kredit-betrag" class="form__input currency-input" placeholder="100.000,00" value="100000">
                </div>
                <div class="form__group">
                    <label class="form__label">Jahreszins (%)</label>
                    <input type="number" id="kredit-zins" class="form__input" placeholder="3.5" value="3.5" step="0.1" min="0" max="20">
                </div>
                <div class="form__group">
                    <label class="form__label">Laufzeit (Jahre)</label>
                    <input type="number" id="kredit-laufzeit" class="form__input" placeholder="10" value="10" min="1" max="40">
                </div>
                <div class="form__group">
                    <label class="form__label">Tilgungsart</label>
                    <select id="tilgungsart" class="form__select">
                        <option value="annuitaet">Annuitätendarlehen (gleiche Rate)</option>
                        <option value="raten">Ratendarlehen (sinkende Rate)</option>
                    </select>
                </div>
                <button onclick="berechneKredit()" class="btn btn--primary" style="width: 100%;">Berechnen</button>
                <div id="kredit-result" class="calculator__result" style="display: none;"></div>
            </div>
        `,
        'mustervertraege': `
            <h2>Musterverträge & Vorlagen</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Kostenlose Musterverträge und Vorlagen für Unternehmer.
            </p>
            <div class="calculator">
                <div style="background: var(--color-bg-light); padding: var(--spacing-lg); border-radius: var(--border-radius);">
                    <h3 style="margin-top: 0;">Verfügbare Musterverträge:</h3>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                        <div style="padding: var(--spacing-md); background: white; border-radius: 4px; border: 1px solid var(--color-border);">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem;">Arbeitsvertrag</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Muster für unbefristete und befristete Arbeitsverträge</p>
                        </div>
                        <div style="padding: var(--spacing-md); background: white; border-radius: 4px; border: 1px solid var(--color-border);">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem;">Dienstleistungsvertrag</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Vorlage für freie Mitarbeiter und Dienstleister</p>
                        </div>
                        <div style="padding: var(--spacing-md); background: white; border-radius: 4px; border: 1px solid var(--color-border);">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem;">Werkvertrag</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Muster für Werkverträge mit Erfolgsgarantie</p>
                        </div>
                        <div style="padding: var(--spacing-md); background: white; border-radius: 4px; border: 1px solid var(--color-border);">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem;">Gesellschaftsvertrag GmbH</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Vorlage für GmbH-Satzung</p>
                        </div>
                        <div style="padding: var(--spacing-md); background: white; border-radius: 4px; border: 1px solid var(--color-border);">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem;">Aufhebungsvertrag</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Einvernehmliche Beendigung von Arbeitsverhältnissen</p>
                        </div>
                    </div>
                    <div style="margin-top: var(--spacing-xl); padding: var(--spacing-md); background: white; border-left: 4px solid var(--color-primary); border-radius: 4px;">
                        <p style="margin: 0; font-weight: 600; color: var(--color-primary);">⚠️ Wichtiger Hinweis</p>
                        <p style="margin-top: var(--spacing-xs); margin-bottom: 0;">
                            Musterverträge sind nur Vorlagen. Lassen Sie jeden Vertrag vor Unterzeichnung rechtlich prüfen. Wir beraten Sie gerne individuell.
                        </p>
                    </div>
                    <a href="kontakt.html" class="btn btn--primary" style="width: 100%; margin-top: var(--spacing-lg);">
                        Beratung anfragen
                    </a>
                </div>
            </div>
        `,
        'formulare': `
            <h2>Steuerformulare zum Download</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Wichtige Steuerformulare und Anträge für Unternehmer und Privatpersonen.
            </p>
            <div class="calculator">
                <div style="background: var(--color-bg-light); padding: var(--spacing-lg); border-radius: var(--border-radius);">
                    <h3 style="margin-top: 0;">Häufig benötigte Formulare:</h3>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
                        <a href="https://www.formulare-bfinv.de" target="_blank" class="card" style="text-decoration: none; padding: var(--spacing-md); margin: 0;">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem; color: var(--color-primary);">📄 Einkommensteuererklärung</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Formulare für die jährliche Einkommensteuererklärung</p>
                        </a>
                        <a href="https://www.formulare-bfinv.de" target="_blank" class="card" style="text-decoration: none; padding: var(--spacing-md); margin: 0;">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem; color: var(--color-primary);">📄 Umsatzsteuer-Voranmeldung</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Monatliche/vierteljährliche USt-Voranmeldung</p>
                        </a>
                        <a href="https://www.formulare-bfinv.de" target="_blank" class="card" style="text-decoration: none; padding: var(--spacing-md); margin: 0;">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem; color: var(--color-primary);">📄 Fragebogen zur steuerlichen Erfassung</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Für Existenzgründer und Unternehmensgründungen</p>
                        </a>
                        <a href="https://www.formulare-bfinv.de" target="_blank" class="card" style="text-decoration: none; padding: var(--spacing-md); margin: 0;">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem; color: var(--color-primary);">📄 Antrag auf Dauerfristverlängerung</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Verlängerung der USt-Voranmeldungsfrist</p>
                        </a>
                        <a href="https://www.formulare-bfinv.de" target="_blank" class="card" style="text-decoration: none; padding: var(--spacing-md); margin: 0;">
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem; color: var(--color-primary);">📄 Lohnsteuerbescheinigung</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">Jährliche Lohnsteuerbescheinigung für Arbeitnehmer</p>
                        </a>
                    </div>
                    <div style="margin-top: var(--spacing-xl); padding: var(--spacing-md); background: white; border-left: 4px solid var(--color-primary); border-radius: 4px;">
                        <p style="margin: 0; font-weight: 600; color: var(--color-primary);">💡 Service</p>
                        <p style="margin-top: var(--spacing-xs); margin-bottom: 0;">
                            Wir übernehmen die gesamte Korrespondenz mit dem Finanzamt für Sie. Kontaktieren Sie uns für eine unkomplizierte steuerliche Betreuung.
                        </p>
                    </div>
                </div>
            </div>
        `,
        'tabellen': `
            <h2>Steuertabellen & Übersichten</h2>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
                Aktuelle Steuertabellen, Pauschbeträge und Grenzwerte für 2025.
            </p>
            <div class="calculator">
                <div style="background: var(--color-bg-light); padding: var(--spacing-lg); border-radius: var(--border-radius);">
                    <h3 style="margin-top: 0;">Wichtige Steuerwerte 2025:</h3>

                    <div style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; margin-bottom: var(--spacing-sm);">Grundfreibetrag</h4>
                        <div style="background: white; padding: var(--spacing-md); border-radius: 4px;">
                            <strong style="font-size: 1.25rem; color: var(--color-primary);">12.096 €</strong>
                            <p style="margin: var(--spacing-xs) 0 0 0; font-size: 0.875rem; color: var(--color-text-light);">Bis zu diesem Betrag keine Einkommensteuer (2024: 11.604 €)</p>
                        </div>
                    </div>

                    <div style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; margin-bottom: var(--spacing-sm);">Pendlerpauschale</h4>
                        <div style="background: white; padding: var(--spacing-md); border-radius: 4px;">
                            <strong style="font-size: 1.25rem; color: var(--color-primary);">0,30 € / 0,38 €</strong>
                            <p style="margin: var(--spacing-xs) 0 0 0; font-size: 0.875rem; color: var(--color-text-light);">Pro Entfernungskilometer (ab 21 km: 0,38 €)</p>
                        </div>
                    </div>

                    <div style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; margin-bottom: var(--spacing-sm);">Arbeitnehmerpauschbetrag</h4>
                        <div style="background: white; padding: var(--spacing-md); border-radius: 4px;">
                            <strong style="font-size: 1.25rem; color: var(--color-primary);">1.230 €</strong>
                            <p style="margin: var(--spacing-xs) 0 0 0; font-size: 0.875rem; color: var(--color-text-light);">Werbungskostenpauschale pro Jahr</p>
                        </div>
                    </div>

                    <div style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; margin-bottom: var(--spacing-sm);">Sparerpauschbetrag</h4>
                        <div style="background: white; padding: var(--spacing-md); border-radius: 4px;">
                            <strong style="font-size: 1.25rem; color: var(--color-primary);">1.000 € / 2.000 €</strong>
                            <p style="margin: var(--spacing-xs) 0 0 0; font-size: 0.875rem; color: var(--color-text-light);">Einzelperson / Verheiratete</p>
                        </div>
                    </div>

                    <div style="margin-bottom: var(--spacing-lg);">
                        <h4 style="font-size: 1rem; margin-bottom: var(--spacing-sm);">Kleinunternehmergrenze (§ 19 UStG) – neu ab 2025</h4>
                        <div style="background: white; padding: var(--spacing-md); border-radius: 4px;">
                            <strong style="font-size: 1.25rem; color: var(--color-primary);">25.000 € / 100.000 €</strong>
                            <p style="margin: var(--spacing-xs) 0 0 0; font-size: 0.875rem; color: var(--color-text-light);">Vorjahresumsatz max. 25.000 € | lfd. Jahr max. 100.000 € (bei Überschreitung sofort steuerpflichtig)</p>
                        </div>
                    </div>

                    <div>
                        <h4 style="font-size: 1rem; margin-bottom: var(--spacing-sm);">Minijob-Grenze</h4>
                        <div style="background: white; padding: var(--spacing-md); border-radius: 4px;">
                            <strong style="font-size: 1.25rem; color: var(--color-primary);">556 €</strong>
                            <p style="margin: var(--spacing-xs) 0 0 0; font-size: 0.875rem; color: var(--color-text-light);">Monatliche Verdienstgrenze ab 01.01.2025 (2024: 538 €)</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    return tools[toolName] || '<p>Dieser Rechner ist noch nicht verfügbar.</p>';
}

// Continued in next part...

// ===== CALCULATION FUNCTIONS =====

function berechneEinkommensteuer() {
    const einkommen = parseGermanNumber(document.getElementById('einkommen').value);
    const steuerklasse = parseInt(document.getElementById('steuerklasse').value);

    if (!einkommen || einkommen <= 0) {
        alert('Bitte geben Sie ein gültiges Einkommen ein.');
        return;
    }

    let steuer = 0;
    const grundfreibetrag = 12096; // 2025

    if (einkommen <= grundfreibetrag) {
        steuer = 0;
    } else if (einkommen <= 17443) {
        const y = (einkommen - grundfreibetrag) / 10000;
        steuer = (932.30 * y + 1400) * y;
    } else if (einkommen <= 68480) {
        const z = (einkommen - 17443) / 10000;
        steuer = (176.64 * z + 2397) * z + 1015.13;
    } else if (einkommen <= 277825) {
        steuer = 0.42 * einkommen - 10911.92;
    } else {
        steuer = 0.45 * einkommen - 19246.67;
    }
    steuer = Math.floor(steuer); // auf volle Euro abrunden

    let soli = 0;
    if (steuer > 19950) { // Freigrenze 2025
        soli = steuer * 0.055;
    }

    const gesamt = steuer + soli;
    const durchschnitt = (gesamt / einkommen * 100).toFixed(2);

    document.getElementById('einkommen-result').style.display = 'block';
    document.getElementById('einkommen-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Zu versteuerndes Einkommen:</span>
                <span class="result-value">${formatGermanNumber(einkommen)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Einkommensteuer:</span>
                <span class="result-value">${formatGermanNumber(steuer)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Solidaritätszuschlag:</span>
                <span class="result-value">${formatGermanNumber(soli)} €</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Gesamtsteuer:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(gesamt)} €</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Durchschnittssteuersatz:</span>
                <span class="result-value">${durchschnitt} %</span>
            </div>
        </div>
        <p style="margin-top: var(--spacing-lg); font-size: 0.875rem; color: var(--color-text-light);">
            <strong>Hinweis:</strong> Dies ist eine vereinfachte Berechnung. Für eine genaue Steuerberechnung kontaktieren Sie uns bitte.
        </p>
    `;
}

function berechneSchenkungssteuer() {
    const wert = parseGermanNumber(document.getElementById('schenkungswert').value);
    const verwandtschaft = parseInt(document.getElementById('verwandtschaft').value);

    if (!wert || wert <= 0) {
        alert('Bitte geben Sie einen gültigen Schenkungswert ein.');
        return;
    }

    const freibetraege = {
        1: { betrag: 500000, klasse: 'I', beschreibung: 'Ehepartner/Lebenspartner' },
        2: { betrag: 400000, klasse: 'I', beschreibung: 'Kinder/Enkelkinder' },
        3: { betrag: 100000, klasse: 'I', beschreibung: 'Eltern/Großeltern' },
        4: { betrag: 20000, klasse: 'II', beschreibung: 'Geschwister/Nichten/Neffen' },
        5: { betrag: 20000, klasse: 'III', beschreibung: 'Alle übrigen' }
    };

    const steuersaetze = {
        'I': [7, 11, 15, 19, 23, 27, 30],
        'II': [15, 20, 25, 30, 35, 40, 43],
        'III': [30, 30, 30, 30, 50, 50, 50]
    };

    const freibetrag = freibetraege[verwandtschaft].betrag;
    const steuerklasse = freibetraege[verwandtschaft].klasse;
    const beschreibung = freibetraege[verwandtschaft].beschreibung;
    const steuerpflichtig = Math.max(0, wert - freibetrag);

    let steuersatz = 0;
    if (steuerpflichtig <= 75000) steuersatz = steuersaetze[steuerklasse][0];
    else if (steuerpflichtig <= 300000) steuersatz = steuersaetze[steuerklasse][1];
    else if (steuerpflichtig <= 600000) steuersatz = steuersaetze[steuerklasse][2];
    else if (steuerpflichtig <= 6000000) steuersatz = steuersaetze[steuerklasse][3];
    else if (steuerpflichtig <= 13000000) steuersatz = steuersaetze[steuerklasse][4];
    else if (steuerpflichtig <= 26000000) steuersatz = steuersaetze[steuerklasse][5];
    else steuersatz = steuersaetze[steuerklasse][6];

    const steuer = steuerpflichtig * (steuersatz / 100);

    document.getElementById('schenkung-result').style.display = 'block';
    document.getElementById('schenkung-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Schenkungswert:</span>
                <span class="result-value">${formatGermanNumber(wert)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Verwandtschaftsgrad:</span>
                <span class="result-value">${beschreibung} (Steuerklasse ${steuerklasse})</span>
            </div>
            <div class="result-item">
                <span class="result-label">Freibetrag:</span>
                <span class="result-value">${formatGermanNumber(freibetrag, 0)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Steuerpflichtiger Betrag:</span>
                <span class="result-value">${formatGermanNumber(steuerpflichtig)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Steuersatz:</span>
                <span class="result-value">${steuersatz} %</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Schenkungssteuer:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(steuer)} €</strong></span>
            </div>
        </div>
        <p style="margin-top: var(--spacing-lg); font-size: 0.875rem; color: var(--color-text-light);">
            <strong>Hinweis:</strong> Der Freibetrag kann alle 10 Jahre erneut genutzt werden.
        </p>
    `;
}

function berechneBruttoNetto() {
    const brutto = parseGermanNumber(document.getElementById('brutto').value);
    const steuerklasse = parseInt(document.getElementById('bn-steuerklasse').value);
    const kinder = parseFloat(document.getElementById('kinder').value) || 0;
    const kirchensteuer = document.getElementById('kirchensteuer').checked;

    if (!brutto || brutto <= 0) {
        alert('Bitte geben Sie ein gültiges Bruttogehalt ein.');
        return;
    }

    const jahresbrutto = brutto * 12;
    const krankenversicherung = brutto * 0.073;    // AN-Anteil 7,3% (2025)
    const rentenversicherung = brutto * 0.093;     // AN-Anteil 9,3% (2025)
    const arbeitslosenversicherung = brutto * 0.013; // AN-Anteil 1,3% (2025)
    const pflegeversicherung = brutto * 0.018;     // AN-Anteil 1,8% mit Kinder (2025)
    const sozialabgaben = krankenversicherung + rentenversicherung + arbeitslosenversicherung + pflegeversicherung;

    const zvEinkommen = jahresbrutto - (sozialabgaben * 12) - 1230;
    let jahressteuer = 0;
    const grundfreibetrag = 12096; // 2025

    if (zvEinkommen > grundfreibetrag) {
        if (zvEinkommen <= 17443) {
            const y = (zvEinkommen - grundfreibetrag) / 10000;
            jahressteuer = (932.30 * y + 1400) * y;
        } else if (zvEinkommen <= 68480) {
            const z = (zvEinkommen - 17443) / 10000;
            jahressteuer = (176.64 * z + 2397) * z + 1015.13;
        } else if (zvEinkommen <= 277825) {
            jahressteuer = 0.42 * zvEinkommen - 10911.92;
        } else {
            jahressteuer = 0.45 * zvEinkommen - 19246.67;
        }
        jahressteuer = Math.floor(jahressteuer);
    }

    if (steuerklasse === 3) jahressteuer *= 0.7;
    else if (steuerklasse === 5) jahressteuer *= 1.3;

    const monatssteuer = jahressteuer / 12;
    const kirche = kirchensteuer ? monatssteuer * 0.09 : 0;
    const soli = jahressteuer > 19950 ? (jahressteuer * 0.055) / 12 : 0; // Freigrenze 2025
    const gesamtabzug = sozialabgaben + monatssteuer + kirche + soli;
    const netto = brutto - gesamtabzug;

    document.getElementById('brutto-netto-result').style.display = 'block';
    document.getElementById('brutto-netto-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item highlight">
                <span class="result-label"><strong>Bruttogehalt:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(brutto)} €</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Krankenversicherung:</span>
                <span class="result-value">- ${formatGermanNumber(krankenversicherung)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Rentenversicherung:</span>
                <span class="result-value">- ${formatGermanNumber(rentenversicherung)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Arbeitslosenversicherung:</span>
                <span class="result-value">- ${formatGermanNumber(arbeitslosenversicherung)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Pflegeversicherung:</span>
                <span class="result-value">- ${formatGermanNumber(pflegeversicherung)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Lohnsteuer:</span>
                <span class="result-value">- ${formatGermanNumber(monatssteuer)} €</span>
            </div>
            ${kirche > 0 ? `<div class="result-item"><span class="result-label">Kirchensteuer:</span><span class="result-value">- ${formatGermanNumber(kirche)} €</span></div>` : ''}
            ${soli > 0 ? `<div class="result-item"><span class="result-label">Solidaritätszuschlag:</span><span class="result-value">- ${formatGermanNumber(soli)} €</span></div>` : ''}
            <div class="result-item highlight" style="border-top: 2px solid var(--color-primary); padding-top: var(--spacing-md); margin-top: var(--spacing-md);">
                <span class="result-label"><strong>Nettogehalt:</strong></span>
                <span class="result-value" style="color: var(--color-primary);"><strong>${formatGermanNumber(netto)} €</strong></span>
            </div>
        </div>
        <p style="margin-top: var(--spacing-lg); font-size: 0.875rem; color: var(--color-text-light);">
            <strong>Hinweis:</strong> Vereinfachte Berechnung ohne Zusatzfreibeträge.
        </p>
    `;
}

function berechneElterngeld() {
    const netto = parseGermanNumber(document.getElementById('nettoeinkommen').value);
    const variante = document.getElementById('elterngeld-variante').value;
    const geschwister = document.getElementById('geschwister').checked;
    const mehrlinge = document.getElementById('mehrlinge').checked;

    if (!netto || netto <= 0) {
        alert('Bitte geben Sie ein gültiges Nettoeinkommen ein.');
        return;
    }

    let prozentsatz = 65;
    if (netto < 1000) prozentsatz = 67;
    if (netto < 1200) prozentsatz = 67;

    let elterngeld = netto * (prozentsatz / 100);
    const minElterngeld = 300;
    const maxElterngeld = variante === 'basis' ? 1800 : 900;
    elterngeld = Math.max(minElterngeld, Math.min(maxElterngeld, elterngeld));

    if (geschwister) elterngeld *= 1.1;
    if (mehrlinge) elterngeld += 300;

    const monate = variante === 'basis' ? 12 : 24;
    const gesamt = elterngeld * monate;

    document.getElementById('elterngeld-result').style.display = 'block';
    document.getElementById('elterngeld-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Monatliches Nettoeinkommen:</span>
                <span class="result-value">${formatGermanNumber(netto)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Ersatzrate:</span>
                <span class="result-value">${prozentsatz} %</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Monatliches Elterngeld:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(elterngeld)} €</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Bezugsdauer:</span>
                <span class="result-value">${monate} Monate</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Gesamtsumme:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(gesamt)} €</strong></span>
            </div>
        </div>
    `;
}

function berechnePflegegeld() {
    const pflegegrad = parseInt(document.getElementById('pflegegrad').value);
    const pflegeart = document.getElementById('pflegeart').value;

    // Offizielle Werte ab 01.01.2025 (+4,5% gegenüber 2024) – Quelle: BMG
    const pflegegeld = {
        1: { geld: 0, sach: 0 },
        2: { geld: 347, sach: 796 },
        3: { geld: 599, sach: 1497 },
        4: { geld: 799, sach: 1859 },
        5: { geld: 990, sach: 2299 }
    };

    const geld = pflegegeld[pflegegrad].geld;
    const sach = pflegegeld[pflegegrad].sach;

    let leistung = pflegeart === 'geld' ? geld : sach;
    let leistungsart = pflegeart === 'geld' ? 'Pflegegeld' : 'Pflegesachleistung';

    document.getElementById('pflegegeld-result').style.display = 'block';
    document.getElementById('pflegegeld-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Pflegegrad:</span>
                <span class="result-value">${pflegegrad}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Leistungsart:</span>
                <span class="result-value">${leistungsart}</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Monatliche Leistung:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(leistung)} €</strong></span>
            </div>
            ${pflegeart === 'kombi' ? `
            <div class="result-item">
                <span class="result-label">Pflegegeld (max.):</span>
                <span class="result-value">${formatGermanNumber(geld)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Pflegesachleistung (max.):</span>
                <span class="result-value">${formatGermanNumber(sach)} €</span>
            </div>
            ` : ''}
        </div>
        <p style="margin-top: var(--spacing-lg); font-size: 0.875rem; color: var(--color-text-light);">
            <strong>Hinweis:</strong> Werte ab 01.01.2025 (Quelle: BMG). Bei Kombinationsleistung können beide Leistungen anteilig bezogen werden.
        </p>
    `;
}

function berechneMutterschutz() {
    const entbindungstermin = new Date(document.getElementById('entbindungstermin').value);
    const mehrlingsgeburt = document.getElementById('mehrlingsgeburt').checked;
    const fruehgeburt = document.getElementById('fruehgeburt').checked;

    if (!entbindungstermin || isNaN(entbindungstermin)) {
        alert('Bitte geben Sie einen gültigen Entbindungstermin ein.');
        return;
    }

    // Mutterschutz: 6 Wochen vor, 8 Wochen nach (12 bei Mehrlingen/Frühchen)
    const wochenVor = 6;
    const wochenNach = (mehrlingsgeburt || fruehgeburt) ? 12 : 8;

    const schutzBeginn = new Date(entbindungstermin);
    schutzBeginn.setDate(schutzBeginn.getDate() - (wochenVor * 7));

    const schutzEnde = new Date(entbindungstermin);
    schutzEnde.setDate(schutzEnde.getDate() + (wochenNach * 7));

    const gesamtTage = Math.ceil((schutzEnde - schutzBeginn) / (1000 * 60 * 60 * 24));

    document.getElementById('mutterschutz-result').style.display = 'block';
    document.getElementById('mutterschutz-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Entbindungstermin:</span>
                <span class="result-value">${entbindungstermin.toLocaleDateString('de-DE')}</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Mutterschutz Beginn:</strong></span>
                <span class="result-value"><strong>${schutzBeginn.toLocaleDateString('de-DE')}</strong></span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Mutterschutz Ende:</strong></span>
                <span class="result-value"><strong>${schutzEnde.toLocaleDateString('de-DE')}</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Schutzfrist vor Geburt:</span>
                <span class="result-value">${wochenVor} Wochen</span>
            </div>
            <div class="result-item">
                <span class="result-label">Schutzfrist nach Geburt:</span>
                <span class="result-value">${wochenNach} Wochen</span>
            </div>
            <div class="result-item">
                <span class="result-label">Gesamtdauer:</span>
                <span class="result-value">${gesamtTage} Tage</span>
            </div>
        </div>
    `;
}

function berechneArbeitstage() {
    const startDatum = document.getElementById('start-datum').value;
    const endDatum = document.getElementById('end-datum').value;

    if (!startDatum || !endDatum) {
        alert('Bitte geben Sie Start- und Enddatum ein.');
        return;
    }

    const start = new Date(startDatum);
    const end = new Date(endDatum);

    if (start > end) {
        alert('Das Startdatum muss vor dem Enddatum liegen.');
        return;
    }

    const timeDiff = end.getTime() - start.getTime();
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    let workingDays = 0;
    let saturdays = 0;
    let sundays = 0;

    let currentDate = new Date(start);
    while (currentDate <= end) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workingDays++;
        } else if (dayOfWeek === 6) {
            saturdays++;
        } else {
            sundays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const estimatedHolidays = Math.round((10 * totalDays) / 365);
    const netWorkingDays = Math.max(0, workingDays - estimatedHolidays);

    document.getElementById('arbeitstage-result').style.display = 'block';
    document.getElementById('arbeitstage-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Zeitraum:</span>
                <span class="result-value">${start.toLocaleDateString('de-DE')} - ${end.toLocaleDateString('de-DE')}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Kalendertage gesamt:</span>
                <span class="result-value">${totalDays} Tage</span>
            </div>
            <div class="result-item">
                <span class="result-label">Werktage (Mo-Fr):</span>
                <span class="result-value">${workingDays} Tage</span>
            </div>
            <div class="result-item">
                <span class="result-label">Geschätzte Feiertage:</span>
                <span class="result-value">ca. ${estimatedHolidays} Tage</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Arbeitstage (ca.):</strong></span>
                <span class="result-value"><strong>${netWorkingDays} Tage</strong></span>
            </div>
        </div>
    `;
}

function berechneMinijob() {
    const lohn = parseGermanNumber(document.getElementById('minijob-lohn').value);
    const art = document.getElementById('minijob-art').value;

    if (!lohn || lohn <= 0) {
        alert('Bitte geben Sie einen gültigen Lohn ein.');
        return;
    }

    const arbeitgeber_rv = lohn * 0.15; // Rentenversicherung Arbeitgeber
    const arbeitgeber_kv = lohn * 0.13; // Krankenversicherung Arbeitgeber (pauschal)
    const arbeitgeber_steuer = lohn * 0.02; // Pauschalsteuer
    const arbeitgeber_umlage = lohn * 0.015; // Umlagen

    const arbeitnehmer_rv = lohn * 0.0372; // Rentenversicherung Arbeitnehmer (kann sich befreien)

    const arbeitgeber_gesamt = arbeitgeber_rv + arbeitgeber_kv + arbeitgeber_steuer + arbeitgeber_umlage;
    const netto_an = lohn - arbeitnehmer_rv;

    document.getElementById('minijob-result').style.display = 'block';
    document.getElementById('minijob-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Arbeitsentgelt:</span>
                <span class="result-value">${formatGermanNumber(lohn)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Art:</span>
                <span class="result-value">${art === 'gewerblich' ? 'Gewerblich' : 'Privathaushalt'}</span>
            </div>
            <h4 style="margin: var(--spacing-md) 0 var(--spacing-sm) 0; font-size: 1rem;">Arbeitgeberabgaben:</h4>
            <div class="result-item">
                <span class="result-label">Rentenversicherung (15%):</span>
                <span class="result-value">${formatGermanNumber(arbeitgeber_rv)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Krankenversicherung (13%):</span>
                <span class="result-value">${formatGermanNumber(arbeitgeber_kv)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Pauschalsteuer (2%):</span>
                <span class="result-value">${formatGermanNumber(arbeitgeber_steuer)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Umlagen:</span>
                <span class="result-value">${formatGermanNumber(arbeitgeber_umlage)} €</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Gesamtkosten Arbeitgeber:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(lohn + arbeitgeber_gesamt)} €</strong></span>
            </div>
            <h4 style="margin: var(--spacing-md) 0 var(--spacing-sm) 0; font-size: 1rem;">Arbeitnehmer:</h4>
            <div class="result-item">
                <span class="result-label">RV-Beitrag (3,72% - optional):</span>
                <span class="result-value">${formatGermanNumber(arbeitnehmer_rv)} €</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Auszahlung (mit RV):</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(netto_an)} €</strong></span>
            </div>
        </div>
        <p style="margin-top: var(--spacing-lg); font-size: 0.875rem; color: var(--color-text-light);">
            <strong>Hinweis:</strong> Arbeitnehmer können sich von der RV-Pflicht befreien lassen und erhalten dann ${formatGermanNumber(lohn)} € netto.
        </p>
    `;
}

function berechneGruendercheck() {
    const f1 = parseInt(document.getElementById('frage1').value);
    const f2 = parseInt(document.getElementById('frage2').value);
    const f3 = parseInt(document.getElementById('frage3').value);
    const f4 = parseInt(document.getElementById('frage4').value);
    const f5 = parseInt(document.getElementById('frage5').value);

    const gesamt = f1 + f2 + f3 + f4 + f5;
    const prozent = (gesamt / 25 * 100).toFixed(0);

    let bewertung = '';
    let farbe = '';
    let empfehlung = '';

    if (gesamt >= 20) {
        bewertung = 'Sehr gut vorbereitet';
        farbe = 'var(--color-success)';
        empfehlung = 'Sie sind gut auf die Selbstständigkeit vorbereitet. Nutzen Sie eine professionelle Beratung, um Ihre Gründung optimal zu planen.';
    } else if (gesamt >= 15) {
        bewertung = 'Gute Ausgangslage';
        farbe = 'var(--color-primary)';
        empfehlung = 'Sie haben eine gute Basis. Arbeiten Sie an den Bereichen mit niedrigerer Punktzahl und lassen Sie sich beraten.';
    } else if (gesamt >= 10) {
        bewertung = 'Noch Entwicklungspotenzial';
        farbe = 'orange';
        empfehlung = 'Nehmen Sie sich Zeit, um Ihre Vorbereitung zu verbessern. Eine umfassende Gründungsberatung ist empfehlenswert.';
    } else {
        bewertung = 'Intensive Vorbereitung nötig';
        farbe = 'var(--color-error)';
        empfehlung = 'Bereiten Sie sich gründlicher vor, bevor Sie den Schritt in die Selbstständigkeit wagen. Professionelle Unterstützung ist dringend empfohlen.';
    }

    document.getElementById('gruendercheck-result').style.display = 'block';
    document.getElementById('gruendercheck-result').innerHTML = `
        <h3>Ihre Auswertung</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Gesamtpunktzahl:</span>
                <span class="result-value">${gesamt} / 25 Punkte</span>
            </div>
            <div class="result-item highlight" style="border-color: ${farbe};">
                <span class="result-label"><strong>Bewertung:</strong></span>
                <span class="result-value" style="color: ${farbe};"><strong>${bewertung}</strong></span>
            </div>
            <div style="margin-top: var(--spacing-md); padding: var(--spacing-md); background: white; border-left: 4px solid ${farbe}; border-radius: 4px;">
                <p style="margin: 0;">${empfehlung}</p>
            </div>
        </div>
        <a href="kontakt.html" class="btn btn--primary" style="width: 100%; margin-top: var(--spacing-lg);">
            Gründungsberatung anfragen
        </a>
    `;
}

function berechneFoerderung() {
    const gruendungsart = document.getElementById('gruendungsart').value;
    const kapitalbedarf = parseGermanNumber(document.getElementById('kapitalbedarf').value);
    const algBezug = document.getElementById('alg-bezug').checked;

    let foerderungen = [];

    if (algBezug) {
        foerderungen.push({
            name: 'Gründungszuschuss (Agentur für Arbeit)',
            betrag: 'Bis zu 15.000 €',
            beschreibung: '6 Monate 300 € + Grundsicherung, danach 6 Monate 300 €'
        });
    }

    if (kapitalbedarf >= 25000) {
        foerderungen.push({
            name: 'KfW-Gründerkredit',
            betrag: 'Bis zu 125.000 €',
            beschreibung: 'Zinsgünstiges Darlehen der KfW-Bank für Existenzgründer'
        });
    }

    foerderungen.push({
        name: 'BAFA-Förderung für Unternehmensberatung',
        betrag: 'Bis zu 4.000 €',
        beschreibung: 'Zuschuss für professionelle Gründungsberatung (50-80%)'
    });

    if (gruendungsart === 'team') {
        foerderungen.push({
            name: 'EXIST-Gründerstipendium',
            betrag: 'Bis zu 150.000 €',
            beschreibung: 'Für innovative technologieorientierte oder wissensbasierte Gründungen'
        });
    }

    foerderungen.push({
        name: 'Mikrokredite',
        betrag: 'Bis zu 25.000 €',
        beschreibung: 'Für kleinere Finanzierungsbedarfe ohne Bankkredit'
    });

    document.getElementById('foerderung-result').style.display = 'block';
    document.getElementById('foerderung-result').innerHTML = `
        <h3>Mögliche Fördermittel für Sie</h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
            ${foerderungen.map(f => `
                <div style="padding: var(--spacing-md); background: var(--color-bg-light); border-radius: var(--border-radius); border-left: 4px solid var(--color-primary);">
                    <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem; color: var(--color-primary);">${f.name}</h4>
                    <p style="margin: 0 0 var(--spacing-xs) 0; font-weight: 600;">${f.betrag}</p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-light);">${f.beschreibung}</p>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: var(--spacing-xl); padding: var(--spacing-md); background: white; border-left: 4px solid var(--color-primary); border-radius: 4px;">
            <p style="margin: 0; font-weight: 600; color: var(--color-primary);">💡 Unser Service</p>
            <p style="margin-top: var(--spacing-xs); margin-bottom: 0;">
                Wir unterstützen Sie bei der Beantragung von Fördermitteln und erstellen die erforderlichen Unterlagen.
            </p>
        </div>
    `;
}

function berechneAltersvorsorge() {
    const brutto = parseGermanNumber(document.getElementById('bav-brutto').value);
    const beitrag = parseGermanNumber(document.getElementById('bav-beitrag').value);

    if (!brutto || brutto <= 0 || !beitrag || beitrag <= 0) {
        alert('Bitte geben Sie gültige Werte ein.');
        return;
    }

    const maxSteuerfrei = 322; // 4% der BBG 2025 (SV-frei)
    const steuerfreierBeitrag = Math.min(beitrag, maxSteuerfrei);

    const steuerersparnis = steuerfreierBeitrag * 0.30; // Annahme: 30% Durchschnittssteuersatz
    const svErsparnis = steuerfreierBeitrag * 0.20; // SV-Ersparnis ca. 20%

    const gesamtErsparnis = steuerersparnis + svErsparnis;
    const eigenanteil = beitrag - gesamtErsparnis;

    const jahresbeitrag = beitrag * 12;
    const jahresersparnis = gesamtErsparnis * 12;

    document.getElementById('bav-result').style.display = 'block';
    document.getElementById('bav-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Bruttogehalt:</span>
                <span class="result-value">${formatGermanNumber(brutto)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">bAV-Beitrag:</span>
                <span class="result-value">${formatGermanNumber(beitrag)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Steuerersparnis:</span>
                <span class="result-value">${formatGermanNumber(steuerersparnis)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">SV-Ersparnis:</span>
                <span class="result-value">${formatGermanNumber(svErsparnis)} €</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Ihr Eigenanteil:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(eigenanteil)} €</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Jahresbeitrag:</span>
                <span class="result-value">${formatGermanNumber(jahresbeitrag)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Jährliche Ersparnis:</span>
                <span class="result-value">${formatGermanNumber(jahresersparnis)} €</span>
            </div>
        </div>
        <p style="margin-top: var(--spacing-lg); font-size: 0.875rem; color: var(--color-text-light);">
            <strong>Vorteil:</strong> Für nur ${formatGermanNumber(eigenanteil)} € erhalten Sie ${formatGermanNumber(beitrag)} € Altersvorsorge!
        </p>
    `;
}

function berechneFrist() {
    const fristtyp = document.getElementById('fristtyp').value;
    const ereignisDatum = new Date(document.getElementById('ereignis-datum').value);
    const folgetag = document.getElementById('frist-beginn-folgetag').checked;

    if (!ereignisDatum || isNaN(ereignisDatum)) {
        alert('Bitte geben Sie ein gültiges Datum ein.');
        return;
    }

    let fristBeginn = new Date(ereignisDatum);
    if (folgetag) {
        fristBeginn.setDate(fristBeginn.getDate() + 1);
    }

    let fristEnde = new Date(fristBeginn);

    switch(fristtyp) {
        case '14tage':
            fristEnde.setDate(fristEnde.getDate() + 14);
            break;
        case '2wochen':
            fristEnde.setDate(fristEnde.getDate() + 14);
            break;
        case '1monat':
            fristEnde.setMonth(fristEnde.getMonth() + 1);
            break;
        case '3monate':
            fristEnde.setMonth(fristEnde.getMonth() + 3);
            break;
        case '6monate':
            fristEnde.setMonth(fristEnde.getMonth() + 6);
            break;
    }

    fristEnde.setDate(fristEnde.getDate() - 1);

    const tage = Math.ceil((fristEnde - fristBeginn) / (1000 * 60 * 60 * 24)) + 1;

    document.getElementById('frist-result').style.display = 'block';
    document.getElementById('frist-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Ereignisdatum:</span>
                <span class="result-value">${ereignisDatum.toLocaleDateString('de-DE')}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Fristbeginn:</span>
                <span class="result-value">${fristBeginn.toLocaleDateString('de-DE')}</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Fristende:</strong></span>
                <span class="result-value"><strong>${fristEnde.toLocaleDateString('de-DE')}</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Fristdauer:</span>
                <span class="result-value">${tage} Tage</span>
            </div>
        </div>
        <p style="margin-top: var(--spacing-lg); font-size: 0.875rem; color: var(--color-text-light);">
            <strong>Hinweis:</strong> Die Berechnung erfolgt nach §§ 187 ff. BGB. Bei rechtserheblichen Fristen sollten Sie einen Rechtsanwalt konsultieren.
        </p>
    `;
}

function berechneKredit() {
    const betrag = parseGermanNumber(document.getElementById('kredit-betrag').value);
    const zins = parseFloat(document.getElementById('kredit-zins').value);
    const laufzeit = parseInt(document.getElementById('kredit-laufzeit').value);
    const tilgungsart = document.getElementById('tilgungsart').value;

    if (!betrag || betrag <= 0 || !zins || zins < 0 || !laufzeit || laufzeit <= 0) {
        alert('Bitte geben Sie gültige Werte ein.');
        return;
    }

    const monate = laufzeit * 12;
    const monatszins = zins / 100 / 12;

    let monatsrate, gesamtzinsen;

    if (tilgungsart === 'annuitaet') {
        // Annuitätendarlehen
        if (monatszins === 0) {
            monatsrate = betrag / monate;
            gesamtzinsen = 0;
        } else {
            monatsrate = betrag * (monatszins * Math.pow(1 + monatszins, monate)) / (Math.pow(1 + monatszins, monate) - 1);
            gesamtzinsen = (monatsrate * monate) - betrag;
        }
    } else {
        // Ratendarlehen
        const tilgung = betrag / monate;
        let restschuld = betrag;
        gesamtzinsen = 0;

        for (let i = 0; i < monate; i++) {
            gesamtzinsen += restschuld * monatszins;
            restschuld -= tilgung;
        }

        monatsrate = tilgung + (betrag * monatszins); // Erste Rate
    }

    const gesamtsumme = betrag + gesamtzinsen;

    document.getElementById('kredit-result').style.display = 'block';
    document.getElementById('kredit-result').innerHTML = `
        <h3>Berechnungsergebnis</h3>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Darlehensbetrag:</span>
                <span class="result-value">${formatGermanNumber(betrag)} €</span>
            </div>
            <div class="result-item">
                <span class="result-label">Jahreszins:</span>
                <span class="result-value">${zins} %</span>
            </div>
            <div class="result-item">
                <span class="result-label">Laufzeit:</span>
                <span class="result-value">${laufzeit} Jahre (${monate} Monate)</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Monatsrate${tilgungsart === 'raten' ? ' (erste)' : ''}:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(monatsrate)} €</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Gesamtzinsen:</span>
                <span class="result-value">${formatGermanNumber(gesamtzinsen)} €</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label"><strong>Gesamtsumme:</strong></span>
                <span class="result-value"><strong>${formatGermanNumber(gesamtsumme)} €</strong></span>
            </div>
        </div>
        <p style="margin-top: var(--spacing-lg); font-size: 0.875rem; color: var(--color-text-light);">
            <strong>Hinweis:</strong> ${tilgungsart === 'annuitaet' ? 'Gleichbleibende monatliche Rate über die gesamte Laufzeit.' : 'Sinkende monatliche Raten. Erste Rate ist am höchsten.'}
        </p>
    `;
}
// tools-2025-update 1771780602
