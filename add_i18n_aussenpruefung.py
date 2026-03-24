#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add i18n translations to wissen-aussenpruefung.html
and update de.json, en.json, tr.json with all translation keys.
"""

import json
import os
import sys

BASE_DIR = "/Users/eray/Desktop/Claude Code/steuerkanzlei-erben"
HTML_FILE = os.path.join(BASE_DIR, "wissen-aussenpruefung.html")
DE_JSON = os.path.join(BASE_DIR, "assets/translations/de.json")
EN_JSON = os.path.join(BASE_DIR, "assets/translations/en.json")
TR_JSON = os.path.join(BASE_DIR, "assets/translations/tr.json")

# ─────────────────────────────────────────────────────────────────────────────
# All translations stored as JSON to avoid Python string literal issues
# with German typographic quotation marks
# ─────────────────────────────────────────────────────────────────────────────

TRANSLATIONS_JSON = r'''
{
  "article1": {
    "de": {
      "intro_p1": "Eine steuerliche Au\u00dfenpr\u00fcfung ist f\u00fcr viele Unternehmer, Gesellschaften und Gesellschafter ein erheblicher Einschnitt. Was h\u00e4ufig als \u201eRoutinepr\u00fcfung\u201c beginnt, kann schnell zu Steuernachzahlungen, Zinsbelastungen oder sogar steuerstrafrechtlichen Risiken f\u00fchren.",
      "intro_p2": "Die Finanzverwaltung pr\u00fcft dabei nicht nur Zahlen, sondern bewertet unter anderem:",
      "intro_li1": "betriebliche Abl\u00e4ufe,",
      "intro_li2": "Kalkulationen,",
      "intro_li3": "Kassenf\u00fchrung und unternehmerische Entscheidungen.",
      "intro_p3": "(oftmals werden Richtsatzsammlungen, Kennzahlen und Sch\u00e4tzungsmethoden angewendet, die f\u00fcr den Einzelfall nicht immer sachgerecht sind)",
      "intro_p4": "Wir begleiten unsere Mandanten umfassend von der Pr\u00fcfungsanordnung bis zur Klage vor dem Bundesfinanzhof. Unser Fokus liegt nicht auf blo\u00dfer Reaktion, sondern auf fr\u00fchzeitiger Strukturierung, rechtlicher Einordnung und strategischer Verhandlungsf\u00fchrung mit der Finanzverwaltung.",
      "what_title": "Was pr\u00fcft die Finanzverwaltung tats\u00e4chlich?",
      "what_p1": "Im Rahmen einer steuerlichen Au\u00dfenpr\u00fcfung beschr\u00e4nkt sich die Finanzverwaltung nicht auf einen reinen Zahlenabgleich. Vielmehr nimmt sie eine gesamtbetriebliche W\u00fcrdigung vor, bei der wirtschaftliche Abl\u00e4ufe, organisatorische Strukturen und unternehmerische Entscheidungen umfassend bewertet werden.",
      "what_p2": "Im Einzelnen stehen dabei insbesondere folgende Bereiche im Fokus:",
      "card1_title": "Betriebliche Abl\u00e4ufe und Organisation",
      "card1_p1": "Die Pr\u00fcfer analysieren, wie ein Unternehmen tats\u00e4chlich arbeitet. Dazu geh\u00f6ren unter anderem:",
      "card1_li1": "interne Arbeitsabl\u00e4ufe und Zust\u00e4ndigkeiten",
      "card1_li2": "Einkaufs- und Verkaufsprozesse",
      "card1_li3": "Lagerhaltung, Warenbewegungen und Leistungsverflechtungen",
      "card1_li4": "Schnittstellen zwischen Buchhaltung, Kasse und operativem Gesch\u00e4ft",
      "card1_p2": "Abweichungen zwischen dokumentierten Prozessen und gelebter Praxis werden h\u00e4ufig als Risikoindikatoren gewertet \u2013 selbst dann, wenn sie wirtschaftlich erkl\u00e4rbar sind.",
      "card2_title": "Kalkulationen und Preisgestaltung",
      "card2_p1": "Ein weiterer Schwerpunkt liegt auf der Wirtschaftlichkeit des Unternehmens. Die Finanzverwaltung pr\u00fcft:",
      "card2_li1": "Rohgewinnaufschl\u00e4ge",
      "card2_li2": "Wareneinsatzquoten",
      "card2_li3": "Stunden- oder Leistungskalkulationen",
      "card2_li4": "Preisniveaus im Branchenvergleich",
      "card2_p2": "Hierbei werden unternehmensinterne Kalkulationen h\u00e4ufig mit externen Vergleichsma\u00dfst\u00e4ben abgeglichen. Individuelle Besonderheiten wie Standort, Zielgruppe, Gesch\u00e4ftsmodell oder unternehmerische Strategie bleiben dabei nicht immer ausreichend ber\u00fccksichtigt.",
      "card3_title": "Kassenf\u00fchrung und Bargesch\u00e4fte",
      "card3_p1": "Besondere Bedeutung kommt der ordnungsgem\u00e4\u00dfen Kassenf\u00fchrung zu \u2013 vor allem in bargeldintensiven Betrieben. Bereits formelle M\u00e4ngel (z. B. fehlende oder unvollst\u00e4ndige Aufzeichnungen) k\u00f6nnen dazu f\u00fchren, dass:",
      "card3_li1": "die gesamte Buchf\u00fchrung infrage gestellt wird,",
      "card3_li2": "Zusch\u00e4tzungen vorgenommen werden,",
      "card3_li3": "Sch\u00e4tzungen nach \u00a7 162 AO erfolgen.",
      "card3_p2": "Dabei gilt: Nicht jeder formelle Fehler rechtfertigt automatisch eine Vollverwerfung der Buchf\u00fchrung \u2013 diese Differenzierung geht in der Praxis jedoch h\u00e4ufig verloren.",
      "card4_title": "Unternehmerische Entscheidungen",
      "card4_p1": "Auch unternehmerische Entscheidungen geraten zunehmend in den Fokus der Pr\u00fcfung. Dazu z\u00e4hlen etwa:",
      "card4_li1": "Investitionsentscheidungen",
      "card4_li2": "Personal- und Verg\u00fctungsstrukturen",
      "card4_li3": "ungew\u00f6hnliche Vertragsgestaltungen",
      "card4_li4": "bewusste Niedrigpreis- oder Hochpreiskonzepte",
      "card4_p2": "Solche Entscheidungen sind steuerlich grunds\u00e4tzlich zu respektieren. Dennoch werden sie im Rahmen der Au\u00dfenpr\u00fcfung nicht selten r\u00fcckwirkend betriebswirtschaftlich bewertet und mit pauschalen Ma\u00dfst\u00e4ben verglichen.",
      "bench_title": "Einsatz von Richtsatzsammlungen, Kennzahlen und Sch\u00e4tzungsmethoden",
      "bench_p1": "Zur Bewertung der vorgenannten Bereiche greift die Finanzverwaltung h\u00e4ufig auf:",
      "bench_li1": "Richtsatzsammlungen,",
      "bench_li2": "branchenbezogene Kennzahlen und",
      "bench_li3": "Sch\u00e4tzungsmethoden",
      "bench_p2": "zur\u00fcck.",
      "bench_p3": "Diese Instrumente dienen zwar als Orientierungshilfe, sind jedoch keine verbindlichen Bewertungsma\u00dfst\u00e4be. In der Praxis werden sie dennoch h\u00e4ufig schematisch angewendet \u2013 ohne ausreichende Ber\u00fccksichtigung der betrieblichen Besonderheiten des Einzelfalls.",
      "bench_p4": "Gerade hier entstehen regelm\u00e4\u00dfig Konflikte, da statistische Durchschnittswerte:",
      "bench_li4": "keine individuelle Unternehmensrealit\u00e4t abbilden,",
      "bench_li5": "regionale und konzeptionelle Unterschiede ausblenden,",
      "bench_li6": "und unternehmerische Freiheit faktisch einschr\u00e4nken k\u00f6nnen.",
      "approach_title": "Unser Ansatz: Einzelfall statt Statistik",
      "approach_p1": "Eine steuerliche Au\u00dfenpr\u00fcfung darf keine \u201eStatistikbesteuerung\u201c sein. Wir setzen daher konsequent auf:",
      "approach_li1": "die Herausarbeitung der individuellen Unternehmensstruktur,",
      "approach_li2": "die rechtliche Begrenzung von Sch\u00e4tzungen,",
      "approach_li3": "und die argumentative Einordnung von Richts\u00e4tzen und Kennzahlen in den konkreten betrieblichen Kontext.",
      "approach_p2": "Ziel ist es, pauschale Annahmen der Finanzverwaltung durch nachvollziehbare, rechtlich belastbare Einzelfallargumente zu ersetzen.",
      "s1_title": "1. Was ist eine steuerliche Au\u00dfenpr\u00fcfung?",
      "s1_p1": "Die steuerliche Au\u00dfenpr\u00fcfung ist ein gesetzlich geregeltes Pr\u00fcfungsverfahren, mit dem die Finanzverwaltung die steuerlichen Verh\u00e4ltnisse eines Steuerpflichtigen umfassend \u00fcberpr\u00fcft. Rechtsgrundlage sind insbesondere die \u00a7\u00a7 193 ff. Abgabenordnung (AO) sowie die Betriebspr\u00fcfungsordnung.",
      "s1_p2": "<strong>Ziel der Au\u00dfenpr\u00fcfung:</strong> Gleichm\u00e4\u00dfigkeit der Besteuerung unter Beachtung des Verh\u00e4ltnism\u00e4\u00dfigkeitsgrundsatzes.",
      "s2_title": "2. Wer wird gepr\u00fcft \u2013 und wie oft?",
      "s2_p1": "Au\u00dfenpr\u00fcfungen betreffen nicht nur Gro\u00dfunternehmen. Gepr\u00fcft werden u. a.:",
      "s2_li1": "Kapitalgesellschaften (GmbH, UG, AG, ...)",
      "s2_li2": "Personengesellschaften",
      "s2_li3": "Einzelunternehmer und Freiberufler",
      "s2_li4": "Unternehmer mit/ohne Kassenf\u00fchrung oder Bargesch\u00e4ften",
      "s2_li5": "International t\u00e4tige Unternehmen",
      "s2_p2": "Die Pr\u00fcfungsdichte richtet sich u. a. nach Gr\u00f6\u00dfenklassen, Branche, Auff\u00e4lligkeiten und Risikokriterien der Finanzverwaltung.",
      "s3_title": "3. Die Pr\u00fcfungsanordnung \u2013 Ank\u00fcndigung der Au\u00dfenpr\u00fcfung",
      "s3_p1": "Jede gew\u00f6hnliche Au\u00dfenpr\u00fcfung wird durch eine Pr\u00fcfungsanordnung angek\u00fcndigt. Diese muss u. a. enthalten:",
      "s3_li1": "Rechtsgrundlage der Pr\u00fcfung",
      "s3_li2": "Pr\u00fcfungszeitraum",
      "s3_li3": "betroffene Steuerarten",
      "s3_li4": "ggf. besondere Pr\u00fcfungsschwerpunkte",
      "s3_warning": "<strong style=\"color: #f57c00;\">Wichtig:</strong> Die Pr\u00fcfungsanordnung ist kein blo\u00dfer Formalakt, sondern der erste strategische Ansatzpunkt. Fehler oder Unklarheiten k\u00f6nnen hier bereits rechtlich angreifbar sein.",
      "s4_title": "4. Ablauf der Au\u00dfenpr\u00fcfung",
      "s4_h4a": "4.1 Ort und Dauer der Pr\u00fcfung",
      "s4_p1": "Grunds\u00e4tzlich erfolgt die Pr\u00fcfung in den Gesch\u00e4ftsr\u00e4umen des Steuerpflichtigen. Dauer und Umfang orientieren sich am notwendigen Ma\u00df.",
      "s4_h4b": "4.2 Mitwirkungspflichten",
      "s4_p2": "Der Steuerpflichtige ist zur Mitwirkung verpflichtet \u2013 jedoch nicht grenzenlos.",
      "s4_h4c": "4.3 Datenzugriff und digitale Pr\u00fcfung",
      "s4_p3": "Die Finanzverwaltung greift zunehmend auf digitale Auswertungen zur\u00fcck (IDEA, Kennzahlenvergleiche, Zeitreihenanalysen).",
      "s5_title": "5. Sch\u00e4tzung von Besteuerungsgrundlagen (\u00a7 162 AO)",
      "s5_h4a": "5.1 Wann darf gesch\u00e4tzt werden?",
      "s5_p1": "Eine Sch\u00e4tzung ist zul\u00e4ssig, wenn:",
      "s5_li1": "Buchf\u00fchrung formelle oder materielle M\u00e4ngel aufweist,",
      "s5_li2": "Aufzeichnungen nicht vorgelegt werden,",
      "s5_li3": "Kassenf\u00fchrung nicht ordnungsgem\u00e4\u00df ist.",
      "s5_p2": "<strong>Wichtig:</strong> Nicht jeder formelle Mangel rechtfertigt automatisch eine Vollsch\u00e4tzung.",
      "s5_h4b": "5.2 Anforderungen an eine ordnungsgem\u00e4\u00dfe Sch\u00e4tzung",
      "s5_p3": "Die Rechtsprechung verlangt, dass eine Sch\u00e4tzung:",
      "s5_li4": "schl\u00fcssig",
      "s5_li5": "wirtschaftlich m\u00f6glich",
      "s5_li6": "realit\u00e4tsnah",
      "s5_li7": "und verh\u00e4ltnism\u00e4\u00dfig ist.",
      "s5_p4": "Pauschale oder schematische Zuschl\u00e4ge sind unzul\u00e4ssig.",
      "s6_title": "6. Richtsatzsammlungen \u2013 Grenzen und Rechtsprechung",
      "s6_p1": "Die Finanzverwaltung nutzt branchenspezifische Richtsatzsammlungen als Vergleichswerte. Diese d\u00fcrfen jedoch nicht mechanisch angewendet werden.",
      "s6_p2": "<strong>Zentrale Rechtsprechungsgrunds\u00e4tze (BFH):</strong>",
      "s6_li1": "Richts\u00e4tze sind nur Hilfsmittel, keine Beweisregeln",
      "s6_li2": "Abweichungen m\u00fcssen betriebsindividuell erkl\u00e4rt werden d\u00fcrfen",
      "s6_li3": "Besonderheiten des Unternehmens (Lage, Preisniveau, Konzept, Zielgruppe) sind zu ber\u00fccksichtigen",
      "s6_li4": "Eine Sch\u00e4tzung allein aufgrund von Richtsatzabweichungen w\u00e4re rechtswidrig",
      "s6_p3": "Die Rechtsprechung verlangt eine Einzelfallw\u00fcrdigung, keine Statistikbesteuerung.",
      "s7_title": "7. Schlussbesprechung \u2013 der entscheidende Moment",
      "s7_p1": "In der Schlussbesprechung werden die Pr\u00fcfungsfeststellungen er\u00f6rtert. Hier entscheidet sich h\u00e4ufig:",
      "s7_li1": "ob Zusch\u00e4tzungen abschlie\u00dfend reduziert werden,",
      "s7_li2": "ob Sachverhalte einvernehmlich gel\u00f6st werden,",
      "s7_li3": "ob der Weg in das Rechtsbehelfsverfahren f\u00fchrt.",
      "s7_p2": "<strong>Eine unvorbereitete Schlussbesprechung ist einer der h\u00e4ufigsten Fehler.</strong>",
      "s8_title": "8. Ge\u00e4nderte Steuerbescheide & Folgen",
      "s8_p1": "Nach Abschluss der Pr\u00fcfung erl\u00e4sst das Finanzamt ge\u00e4nderte Steuerbescheide. M\u00f6gliche Folgen:",
      "s8_li1": "Steuernachzahlungen",
      "s8_li2": "Zinsen nach \u00a7 233a AO",
      "s8_li3": "Haftungs- und Nebenfolgen",
      "s8_li4": "Steuerliche Nebenleistungen",
      "s8_li5": "Einleitung eines Steuerstraf- oder Bu\u00dfgeldverfahrens (wenn nicht bereits Ermittlungen aufgenommen wurden)",
      "s9_title": "9. Einspruch & Klage vor dem Finanzgericht",
      "s9_p1": "Nicht jede Pr\u00fcfungsfeststellung ist hinzunehmen.",
      "s9_p2": "Wir pr\u00fcfen:",
      "s9_li1": "Rechtm\u00e4\u00dfigkeit der Sch\u00e4tzung",
      "s9_li2": "Verfahrensfehler",
      "s9_li3": "Beweisw\u00fcrdigung",
      "s9_li4": "Verh\u00e4ltnism\u00e4\u00dfigkeit der Ma\u00dfnahmen",
      "s9_p3": "Wenn erforderlich, vertreten wir unsere Mandanten sowohl im Einspruchsverfahren wie auch vor Gerichten.",
      "s10_title": "10. Schnittstelle zum Steuerstrafrecht",
      "s10_p1": "Ergeben sich w\u00e4hrend der Pr\u00fcfung Anhaltspunkte f\u00fcr eine Steuerstraftat, \u00e4ndert sich die rechtliche Lage grundlegend. W\u00e4hrend im Betriebspr\u00fcfungsverfahren Pflichten zur Mitwirkung bestehen, haben Steuerpflichtige im Strafverfahren Auskunftsverweigerungsrechte. Eine fr\u00fchzeitige Beratung ist hier von bekannter existenzieller Bedeutung."
    },
    "en": {
      "intro_p1": "A tax field audit represents a significant disruption for many entrepreneurs, companies, and shareholders. What often begins as a \u2018routine audit\u2019 can quickly lead to back tax payments, interest charges, or even criminal tax risks.",
      "intro_p2": "The tax authorities do not merely review numbers but also assess, among other things:",
      "intro_li1": "operational processes,",
      "intro_li2": "cost calculations,",
      "intro_li3": "cash register management and business decisions.",
      "intro_p3": "(gross profit margin benchmarks, key performance indicators, and estimation methods are often applied that may not always be appropriate for the individual case)",
      "intro_p4": "We support our clients comprehensively from the audit notification through to litigation before the Federal Fiscal Court. Our focus is not on mere reaction but on early structuring, legal classification, and strategic negotiation with the tax authorities.",
      "what_title": "What do the tax authorities actually examine?",
      "what_p1": "During a tax field audit, the tax authorities do not limit themselves to a mere numerical comparison. Rather, they conduct an overall business assessment in which economic processes, organizational structures, and entrepreneurial decisions are comprehensively evaluated.",
      "what_p2": "In particular, the following areas are the focus:",
      "card1_title": "Operational Processes and Organization",
      "card1_p1": "The auditors analyze how a business actually operates. This includes, among other things:",
      "card1_li1": "internal workflows and responsibilities",
      "card1_li2": "procurement and sales processes",
      "card1_li3": "inventory management, goods movements, and service interconnections",
      "card1_li4": "interfaces between accounting, cash management, and day-to-day operations",
      "card1_p2": "Discrepancies between documented processes and actual practice are frequently treated as risk indicators \u2014 even when they are economically explainable.",
      "card2_title": "Cost Calculations and Pricing",
      "card2_p1": "Another focus area is the economic viability of the business. The tax authorities examine:",
      "card2_li1": "gross profit mark-ups",
      "card2_li2": "cost of goods ratios",
      "card2_li3": "hourly or service-based calculations",
      "card2_li4": "price levels compared to industry benchmarks",
      "card2_p2": "Internal cost calculations are frequently compared against external benchmarks. Individual characteristics such as location, target audience, business model, or entrepreneurial strategy are not always adequately considered.",
      "card3_title": "Cash Register Management and Cash Transactions",
      "card3_p1": "Proper cash register management is of particular importance \u2014 especially in cash-intensive businesses. Even formal deficiencies (e.g., missing or incomplete records) can result in:",
      "card3_li1": "the entire bookkeeping being called into question,",
      "card3_li2": "additional assessments being applied,",
      "card3_li3": "estimations pursuant to Section 162 of the German Fiscal Code (AO).",
      "card3_p2": "The key principle: not every formal error automatically justifies a complete rejection of the bookkeeping \u2014 however, this distinction is frequently lost in practice.",
      "card4_title": "Business Decisions",
      "card4_p1": "Business decisions are also increasingly coming under scrutiny during audits. These include, for example:",
      "card4_li1": "investment decisions",
      "card4_li2": "personnel and compensation structures",
      "card4_li3": "unusual contractual arrangements",
      "card4_li4": "deliberate low-price or premium pricing concepts",
      "card4_p2": "Such decisions must fundamentally be respected for tax purposes. Nevertheless, they are not infrequently assessed retroactively from a business perspective during the audit and compared against standardized benchmarks.",
      "bench_title": "Use of Gross Profit Margin Benchmarks, Key Indicators, and Estimation Methods",
      "bench_p1": "To evaluate the aforementioned areas, the tax authorities frequently rely on:",
      "bench_li1": "gross profit margin benchmarks,",
      "bench_li2": "industry-specific key performance indicators, and",
      "bench_li3": "estimation methods.",
      "bench_p2": "",
      "bench_p3": "While these instruments serve as orientation aids, they are not binding valuation standards. In practice, however, they are frequently applied schematically \u2014 without adequate consideration of the specific operational characteristics of the individual case.",
      "bench_p4": "It is precisely here that conflicts regularly arise, as statistical averages:",
      "bench_li4": "do not reflect the individual business reality,",
      "bench_li5": "disregard regional and conceptual differences,",
      "bench_li6": "and can effectively restrict entrepreneurial freedom.",
      "approach_title": "Our Approach: Individual Case Instead of Statistics",
      "approach_p1": "A tax field audit must not become \u2018taxation by statistics.\u2019 We therefore consistently focus on:",
      "approach_li1": "identifying the individual business structure,",
      "approach_li2": "legally limiting estimations,",
      "approach_li3": "and placing gross profit margin benchmarks and key indicators into the specific operational context through reasoned argumentation.",
      "approach_p2": "The goal is to replace the tax authorities\u2019 blanket assumptions with comprehensible, legally substantiated individual case arguments.",
      "s1_title": "1. What is a tax field audit?",
      "s1_p1": "The tax field audit is a statutory audit procedure through which the tax authorities comprehensively examine a taxpayer\u2019s tax affairs. The legal basis is found in Sections 193 ff. of the German Fiscal Code (Abgabenordnung, AO) and the Tax Audit Regulation (Betriebspr\u00fcfungsordnung).",
      "s1_p2": "<strong>Objective of the audit:</strong> Equal taxation in compliance with the principle of proportionality.",
      "s2_title": "2. Who is audited \u2014 and how often?",
      "s2_p1": "Tax field audits do not only affect large corporations. Those audited include, among others:",
      "s2_li1": "corporations (GmbH, UG, AG, etc.)",
      "s2_li2": "partnerships",
      "s2_li3": "sole proprietors and freelancers",
      "s2_li4": "businesses with or without cash registers or cash transactions",
      "s2_li5": "internationally active companies",
      "s2_p2": "The audit frequency depends on factors such as size categories, industry, anomalies, and risk criteria of the tax authorities.",
      "s3_title": "3. The Audit Notification \u2014 Announcement of the Tax Audit",
      "s3_p1": "Every standard tax field audit is announced by an audit notification. This must include, among other things:",
      "s3_li1": "legal basis for the audit",
      "s3_li2": "audit period",
      "s3_li3": "affected tax types",
      "s3_li4": "any specific audit focus areas, if applicable",
      "s3_warning": "<strong style=\"color: #f57c00;\">Important:</strong> The audit notification is not a mere formality but the first strategic point of action. Errors or ambiguities may already be legally contestable at this stage.",
      "s4_title": "4. Course of the Tax Field Audit",
      "s4_h4a": "4.1 Location and Duration of the Audit",
      "s4_p1": "As a general rule, the audit takes place on the taxpayer\u2019s business premises. Duration and scope are guided by what is necessary.",
      "s4_h4b": "4.2 Cooperation Obligations",
      "s4_p2": "The taxpayer is obligated to cooperate \u2014 but not without limits.",
      "s4_h4c": "4.3 Data Access and Digital Auditing",
      "s4_p3": "The tax authorities increasingly rely on digital analysis tools (IDEA, key performance indicator comparisons, time series analyses).",
      "s5_title": "5. Estimation of the Tax Assessment Basis (Section 162 AO)",
      "s5_h4a": "5.1 When is estimation permitted?",
      "s5_p1": "An estimation is permissible when:",
      "s5_li1": "the bookkeeping has formal or material deficiencies,",
      "s5_li2": "records are not provided,",
      "s5_li3": "cash register management is not proper.",
      "s5_p2": "<strong>Important:</strong> Not every formal deficiency automatically justifies a full estimation.",
      "s5_h4b": "5.2 Requirements for a Proper Estimation",
      "s5_p3": "Case law requires that an estimation must be:",
      "s5_li4": "consistent",
      "s5_li5": "economically feasible",
      "s5_li6": "realistic",
      "s5_li7": "and proportionate.",
      "s5_p4": "Blanket or schematic surcharges are impermissible.",
      "s6_title": "6. Gross Profit Margin Benchmarks \u2014 Limitations and Case Law",
      "s6_p1": "The tax authorities use industry-specific gross profit margin benchmarks as comparison values. However, these may not be applied mechanically.",
      "s6_p2": "<strong>Key case law principles (Federal Fiscal Court / BFH):</strong>",
      "s6_li1": "Benchmark rates are only auxiliary tools, not rules of evidence",
      "s6_li2": "Deviations must be allowed to be explained on an individual business basis",
      "s6_li3": "Specific features of the business (location, price level, concept, target audience) must be considered",
      "s6_li4": "An estimation based solely on benchmark deviations would be unlawful",
      "s6_p3": "Case law requires an individual case assessment, not taxation by statistics.",
      "s7_title": "7. Final Meeting \u2014 The Decisive Moment",
      "s7_p1": "The audit findings are discussed in the final meeting. This is often where the following is decided:",
      "s7_li1": "whether additional assessments are ultimately reduced,",
      "s7_li2": "whether matters are resolved by mutual agreement,",
      "s7_li3": "whether the case proceeds to the appeals process.",
      "s7_p2": "<strong>An unprepared final meeting is one of the most common mistakes.</strong>",
      "s8_title": "8. Amended Tax Assessments & Consequences",
      "s8_p1": "After the audit is concluded, the tax office issues amended tax assessments. Possible consequences include:",
      "s8_li1": "back tax payments",
      "s8_li2": "interest pursuant to Section 233a AO",
      "s8_li3": "liability and ancillary consequences",
      "s8_li4": "tax ancillary charges",
      "s8_li5": "initiation of tax criminal or administrative fine proceedings (if investigations have not already commenced)",
      "s9_title": "9. Objection & Lawsuit Before the Tax Court",
      "s9_p1": "Not every audit finding must be accepted.",
      "s9_p2": "We examine:",
      "s9_li1": "legality of the estimation",
      "s9_li2": "procedural errors",
      "s9_li3": "evaluation of evidence",
      "s9_li4": "proportionality of the measures",
      "s9_p3": "Where necessary, we represent our clients both in the objection proceedings and before the courts.",
      "s10_title": "10. Interface with Tax Criminal Law",
      "s10_p1": "If indications of a tax offense emerge during the audit, the legal situation changes fundamentally. While cooperation obligations apply in the tax audit procedure, taxpayers have the right to refuse to provide information in criminal proceedings. Early legal counsel is of well-known existential importance in this context."
    },
    "tr": {
      "intro_p1": "Vergi denetimi, bir\u00e7ok giri\u015fimci, \u015firket ve ortak i\u00e7in \u00f6nemli bir k\u0131r\u0131lma noktas\u0131d\u0131r. S\u0131kl\u0131kla \u2018rutin denetim\u2019 olarak ba\u015flayan s\u00fcre\u00e7, h\u0131zla ek vergi \u00f6demelerine, faiz y\u00fcklerine ve hatta vergi ceza hukuku risklerine yol a\u00e7abilir.",
      "intro_p2": "Mali y\u00f6netim yaln\u0131zca rakamlar\u0131 de\u011fil, ayn\u0131 zamanda di\u011fer unsurlar\u0131 da de\u011ferlendirir:",
      "intro_li1": "i\u015fletme s\u00fcre\u00e7leri,",
      "intro_li2": "maliyet hesaplamalar\u0131,",
      "intro_li3": "kasa y\u00f6netimi ve giri\u015fimsel kararlar.",
      "intro_p3": "(\u00e7o\u011fu zaman bireysel durum i\u00e7in her zaman uygun olmayan br\u00fct k\u00e2r marj\u0131 oranlar\u0131, performans g\u00f6stergeleri ve tahmin y\u00f6ntemleri uygulanmaktad\u0131r)",
      "intro_p4": "M\u00fcvekkillerimize denetim bildirimi a\u015famas\u0131ndan Federal Mali Mahkeme \u00f6n\u00fcndeki davaya kadar kapsaml\u0131 destek sunuyoruz. Odak noktam\u0131z salt tepki de\u011fil, erken yap\u0131land\u0131rma, hukuki s\u0131n\u0131fland\u0131rma ve mali y\u00f6netimle stratejik m\u00fczakere y\u00fcr\u00fctmektir.",
      "what_title": "Mali y\u00f6netim ger\u00e7ekte neyi denetler?",
      "what_p1": "Vergi denetimi kapsam\u0131nda mali y\u00f6netim, salt bir rakam kar\u015f\u0131la\u015ft\u0131rmas\u0131yla s\u0131n\u0131rl\u0131 kalmaz. Bilakis, ekonomik s\u00fcre\u00e7lerin, organizasyonel yap\u0131lar\u0131n ve giri\u015fimsel kararlar\u0131n kapsaml\u0131 olarak de\u011ferlendirildi\u011fi genel bir i\u015fletme de\u011ferlendirmesi yapar.",
      "what_p2": "\u00d6zellikle \u015fu alanlar odak noktas\u0131ndad\u0131r:",
      "card1_title": "\u0130\u015fletme S\u00fcre\u00e7leri ve Organizasyon",
      "card1_p1": "Denet\u00e7iler, bir i\u015fletmenin ger\u00e7ekte nas\u0131l \u00e7al\u0131\u015ft\u0131\u011f\u0131n\u0131 analiz eder. Buna di\u011ferlerinin yan\u0131 s\u0131ra \u015funlar dahildir:",
      "card1_li1": "i\u00e7 i\u015f s\u00fcre\u00e7leri ve sorumluluk alanlar\u0131",
      "card1_li2": "sat\u0131n alma ve sat\u0131\u015f s\u00fcre\u00e7leri",
      "card1_li3": "depo y\u00f6netimi, mal hareketleri ve hizmet ba\u011flant\u0131lar\u0131",
      "card1_li4": "muhasebe, kasa ve operasyonel i\u015f aras\u0131ndaki aray\u00fczler",
      "card1_p2": "Belgelenmi\u015f s\u00fcre\u00e7ler ile fiili uygulama aras\u0131ndaki sapmalar, ekonomik olarak a\u00e7\u0131klanabilir olsalar bile, s\u0131kl\u0131kla risk g\u00f6stergeleri olarak de\u011ferlendirilir.",
      "card2_title": "Maliyet Hesaplamalar\u0131 ve Fiyatland\u0131rma",
      "card2_p1": "Bir di\u011fer odak noktas\u0131, i\u015fletmenin ekonomik verimlili\u011fidir. Mali y\u00f6netim \u015funlar\u0131 denetler:",
      "card2_li1": "br\u00fct k\u00e2r marjlar\u0131",
      "card2_li2": "hammadde kullan\u0131m oranlar\u0131",
      "card2_li3": "saatlik veya hizmet bazl\u0131 hesaplamalar",
      "card2_li4": "sekt\u00f6r kar\u015f\u0131la\u015ft\u0131rmas\u0131nda fiyat seviyeleri",
      "card2_p2": "\u0130\u015fletme i\u00e7i maliyet hesaplamalar\u0131 s\u0131kl\u0131kla d\u0131\u015f kar\u015f\u0131la\u015ft\u0131rma \u00f6l\u00e7\u00fctleriyle kar\u015f\u0131la\u015ft\u0131r\u0131l\u0131r. Konum, hedef kitle, i\u015f modeli veya giri\u015fimsel strateji gibi bireysel \u00f6zellikler her zaman yeterince dikkate al\u0131nmaz.",
      "card3_title": "Kasa Y\u00f6netimi ve Nakit \u0130\u015flemler",
      "card3_p1": "D\u00fczg\u00fcn kasa y\u00f6netimi \u00f6zellikle nakit yo\u011fun i\u015fletmelerde b\u00fcy\u00fck \u00f6nem ta\u015f\u0131r. \u015eekli eksiklikler bile (\u00f6rn. eksik veya tamamlanmam\u0131\u015f kay\u0131tlar) \u015fu sonu\u00e7lara yol a\u00e7abilir:",
      "card3_li1": "t\u00fcm defter tutman\u0131n sorgulanmas\u0131,",
      "card3_li2": "ek takdir yoluyla vergilendirme yap\u0131lmas\u0131,",
      "card3_li3": "Alman Vergi Usul Kanunu \u00a7 162\u2019ye g\u00f6re tahmin yap\u0131lmas\u0131.",
      "card3_p2": "Temel ilke \u015fudur: Her \u015fekli hata otomatik olarak defterlerin tamamen reddedilmesini hakl\u0131 k\u0131lmaz \u2013 ancak bu ayr\u0131m uygulamada s\u0131kl\u0131kla g\u00f6z ard\u0131 edilir.",
      "card4_title": "Giri\u015fimsel Kararlar",
      "card4_p1": "Giri\u015fimsel kararlar da giderek artan \u015fekilde denetimin oda\u011f\u0131na girmektedir. Bunlara \u00f6rnek olarak \u015funlar say\u0131labilir:",
      "card4_li1": "yat\u0131r\u0131m kararlar\u0131",
      "card4_li2": "personel ve \u00fccretlendirme yap\u0131lar\u0131",
      "card4_li3": "ola\u011fand\u0131\u015f\u0131 s\u00f6zle\u015fme d\u00fczenlemeleri",
      "card4_li4": "bilin\u00e7li d\u00fc\u015f\u00fck fiyat veya y\u00fcksek fiyat konseptleri",
      "card4_p2": "Bu t\u00fcr kararlar vergi a\u00e7\u0131s\u0131ndan temelde sayg\u0131 g\u00f6sterilmesi gereken kararlard\u0131r. Yine de denetim kapsam\u0131nda geriye d\u00f6n\u00fck olarak i\u015fletme ekonomisi perspektifinden de\u011ferlendirilmekte ve genel \u00f6l\u00e7\u00fctlerle kar\u015f\u0131la\u015ft\u0131r\u0131lmaktad\u0131r.",
      "bench_title": "Br\u00fct K\u00e2r Marj\u0131 Oranlar\u0131, Performans G\u00f6stergeleri ve Tahmin Y\u00f6ntemlerinin Kullan\u0131m\u0131",
      "bench_p1": "Mali y\u00f6netim, yukar\u0131da belirtilen alanlar\u0131 de\u011ferlendirmek i\u00e7in s\u0131kl\u0131kla \u015funlara ba\u015fvurur:",
      "bench_li1": "br\u00fct k\u00e2r marj\u0131 oranlar\u0131,",
      "bench_li2": "sekt\u00f6re \u00f6zg\u00fc performans g\u00f6stergeleri ve",
      "bench_li3": "tahmin y\u00f6ntemleri.",
      "bench_p2": "",
      "bench_p3": "Bu ara\u00e7lar y\u00f6nlendirici nitelikte olmakla birlikte, ba\u011flay\u0131c\u0131 de\u011ferlendirme standartlar\u0131 de\u011fildir. Ancak uygulamada, bireysel durumun i\u015fletmeye \u00f6zg\u00fc \u00f6zelliklerinin yeterince dikkate al\u0131nmadan s\u0131kl\u0131kla \u015fematik olarak uygulanmaktad\u0131r.",
      "bench_p4": "\u00d6zellikle burada d\u00fczenli olarak ihtilaflar do\u011fmaktad\u0131r, \u00e7\u00fcnk\u00fc istatistiksel ortalama de\u011ferler:",
      "bench_li4": "bireysel i\u015fletme ger\u00e7ekli\u011fini yans\u0131tmaz,",
      "bench_li5": "b\u00f6lgesel ve kavramsal farkl\u0131l\u0131klar\u0131 g\u00f6z ard\u0131 eder,",
      "bench_li6": "ve giri\u015fim \u00f6zg\u00fcrl\u00fc\u011f\u00fcn\u00fc fiilen k\u0131s\u0131tlayabilir.",
      "approach_title": "Yakla\u015f\u0131m\u0131m\u0131z: \u0130statistik Yerine Bireysel De\u011ferlendirme",
      "approach_p1": "Vergi denetimi bir \u2018istatistik vergilendirmesi\u2019 olmamal\u0131d\u0131r. Bu nedenle tutarl\u0131 bir \u015fekilde \u015funlara odaklan\u0131yoruz:",
      "approach_li1": "bireysel i\u015fletme yap\u0131s\u0131n\u0131n ortaya konmas\u0131,",
      "approach_li2": "tahminlerin hukuki olarak s\u0131n\u0131rland\u0131r\u0131lmas\u0131,",
      "approach_li3": "ve br\u00fct k\u00e2r marj\u0131 oranlar\u0131 ile performans g\u00f6stergelerinin somut i\u015fletme ba\u011flam\u0131nda gerek\u00e7eli olarak konumland\u0131r\u0131lmas\u0131.",
      "approach_p2": "Ama\u00e7, mali y\u00f6netimin genel varsay\u0131mlar\u0131n\u0131 anla\u015f\u0131l\u0131r, hukuki a\u00e7\u0131dan sa\u011flam bireysel vaka arg\u00fcmanlar\u0131yla de\u011fi\u015ftirmektir.",
      "s1_title": "1. Vergi denetimi nedir?",
      "s1_p1": "Vergi denetimi, mali y\u00f6netimin bir vergi m\u00fckellefinin vergisel durumunu kapsaml\u0131 olarak inceledi\u011fi yasal olarak d\u00fczenlenmi\u015f bir denetim s\u00fcrecidir. Hukuki dayanak ba\u015fta Alman Vergi Usul Kanunu (AO) \u00a7\u00a7 193 vd. ve Denetim Y\u00f6netmeli\u011fi\u2019dir.",
      "s1_p2": "<strong>Denetimin amac\u0131:</strong> Orant\u0131l\u0131l\u0131k ilkesine uygun olarak vergilendirmede e\u015fitli\u011fin sa\u011flanmas\u0131.",
      "s2_title": "2. Kimler denetlenir \u2013 ve ne s\u0131kl\u0131kla?",
      "s2_p1": "Vergi denetimleri yaln\u0131zca b\u00fcy\u00fck \u015firketleri etkilemez. Denetlenenler aras\u0131nda \u015funlar da yer al\u0131r:",
      "s2_li1": "sermaye \u015firketleri (GmbH, UG, AG vb.)",
      "s2_li2": "\u015fah\u0131s \u015firketleri",
      "s2_li3": "bireysel giri\u015fimciler ve serbest meslek sahipleri",
      "s2_li4": "kasa y\u00f6netimi veya nakit i\u015flemleri olan/olmayan i\u015fletmeler",
      "s2_li5": "uluslararas\u0131 faaliyet g\u00f6steren \u015firketler",
      "s2_p2": "Denetim s\u0131kl\u0131\u011f\u0131, b\u00fcy\u00fckl\u00fck s\u0131n\u0131flar\u0131, sekt\u00f6r, dikkat \u00e7ekici unsurlar ve mali y\u00f6netimin risk kriterleri gibi fakt\u00f6rlere ba\u011fl\u0131d\u0131r.",
      "s3_title": "3. Denetim Bildirimi \u2013 Vergi Denetiminin Duyurulmas\u0131",
      "s3_p1": "Her ola\u011fan vergi denetimi bir denetim bildirimi ile duyurulur. Bu bildirimin di\u011ferlerinin yan\u0131 s\u0131ra \u015funlar\u0131 i\u00e7ermesi gerekir:",
      "s3_li1": "denetimin hukuki dayana\u011f\u0131",
      "s3_li2": "denetim d\u00f6nemi",
      "s3_li3": "ilgili vergi t\u00fcrleri",
      "s3_li4": "varsa \u00f6zel denetim odak noktalar\u0131",
      "s3_warning": "<strong style=\"color: #f57c00;\">\u00d6nemli:</strong> Denetim bildirimi salt bir formalite de\u011fil, ilk stratejik ba\u015flang\u0131\u00e7 noktas\u0131d\u0131r. Hatalar veya belirsizlikler bu a\u015famada zaten hukuki olarak itiraz edilebilir olabilir.",
      "s4_title": "4. Vergi Denetiminin Seyri",
      "s4_h4a": "4.1 Denetimin Yeri ve S\u00fcresi",
      "s4_p1": "Kural olarak denetim, vergi m\u00fckellefinin i\u015f yerinde ger\u00e7ekle\u015ftirilir. S\u00fcre ve kapsam, gerekli \u00f6l\u00e7\u00fcye g\u00f6re belirlenir.",
      "s4_h4b": "4.2 \u0130\u015fbirli\u011fi Y\u00fck\u00fcml\u00fcl\u00fckleri",
      "s4_p2": "Vergi m\u00fckellefi i\u015fbirli\u011fi yapmakla y\u00fck\u00fcml\u00fcd\u00fcr \u2013 ancak bu s\u0131n\u0131rs\u0131z de\u011fildir.",
      "s4_h4c": "4.3 Veri Eri\u015fimi ve Dijital Denetim",
      "s4_p3": "Mali y\u00f6netim giderek artan bir \u015fekilde dijital de\u011ferlendirme ara\u00e7lar\u0131na ba\u015fvurmaktad\u0131r (IDEA, performans g\u00f6stergesi kar\u015f\u0131la\u015ft\u0131rmalar\u0131, zaman serisi analizleri).",
      "s5_title": "5. Vergi Matrah\u0131n\u0131n Tahmini (\u00a7 162 AO)",
      "s5_h4a": "5.1 Tahmin ne zaman yap\u0131labilir?",
      "s5_p1": "A\u015fa\u011f\u0131daki durumlarda tahmin yap\u0131lmas\u0131 caizdir:",
      "s5_li1": "defter tutmada \u015fekli veya maddi eksiklikler bulunmas\u0131,",
      "s5_li2": "kay\u0131tlar\u0131n sunulmamas\u0131,",
      "s5_li3": "kasa y\u00f6netiminin d\u00fczg\u00fcn olmamas\u0131.",
      "s5_p2": "<strong>\u00d6nemli:</strong> Her \u015fekli eksiklik otomatik olarak tam bir tahmini hakl\u0131 k\u0131lmaz.",
      "s5_h4b": "5.2 Usul\u00fcne Uygun Bir Tahmin \u0130\u00e7in Gereklilikler",
      "s5_p3": "\u0130\u00e7tihat, bir tahminin \u015fu \u00f6zellikleri ta\u015f\u0131mas\u0131n\u0131 gerektirir:",
      "s5_li4": "tutarl\u0131",
      "s5_li5": "ekonomik olarak m\u00fcmk\u00fcn",
      "s5_li6": "ger\u00e7ek\u00e7i",
      "s5_li7": "ve orant\u0131l\u0131 olmas\u0131.",
      "s5_p4": "Genel veya \u015fematik ek tahakkuklar hukuka ayk\u0131r\u0131d\u0131r.",
      "s6_title": "6. Br\u00fct K\u00e2r Marj\u0131 Oranlar\u0131 \u2013 S\u0131n\u0131rlar ve \u0130\u00e7tihat",
      "s6_p1": "Mali y\u00f6netim, sekt\u00f6re \u00f6zg\u00fc br\u00fct k\u00e2r marj\u0131 oranlar\u0131n\u0131 kar\u015f\u0131la\u015ft\u0131rma de\u011ferleri olarak kullan\u0131r. Ancak bunlar mekanik olarak uygulanamaz.",
      "s6_p2": "<strong>Temel i\u00e7tihat ilkeleri (Federal Mali Mahkeme / BFH):</strong>",
      "s6_li1": "Oran cetvelleri yaln\u0131zca yard\u0131mc\u0131 ara\u00e7lard\u0131r, ispat kurallar\u0131 de\u011fildir",
      "s6_li2": "Sapmalar\u0131n i\u015fletmeye \u00f6zg\u00fc olarak a\u00e7\u0131klanmas\u0131na izin verilmelidir",
      "s6_li3": "\u0130\u015fletmenin \u00f6zellikleri (konum, fiyat seviyesi, konsept, hedef kitle) dikkate al\u0131nmal\u0131d\u0131r",
      "s6_li4": "Yaln\u0131zca oran cetvelinden sapmaya dayanan bir tahmin hukuka ayk\u0131r\u0131 olur",
      "s6_p3": "\u0130\u00e7tihat, istatistik vergilendirmesi de\u011fil, bireysel vaka de\u011ferlendirmesi gerektirir.",
      "s7_title": "7. Kapan\u0131\u015f Toplant\u0131s\u0131 \u2013 Belirleyici An",
      "s7_p1": "Kapan\u0131\u015f toplant\u0131s\u0131nda denetim bulgular\u0131 tart\u0131\u015f\u0131l\u0131r. Burada s\u0131kl\u0131kla \u015funlar belirlenir:",
      "s7_li1": "ek takdirlerin nihai olarak d\u00fc\u015f\u00fcr\u00fcl\u00fcp d\u00fc\u015f\u00fcr\u00fclmeyece\u011fi,",
      "s7_li2": "konular\u0131n kar\u015f\u0131l\u0131kl\u0131 mutabakat ile \u00e7\u00f6z\u00fcl\u00fcp \u00e7\u00f6z\u00fclmeyece\u011fi,",
      "s7_li3": "s\u00fcrecin itiraz yoluna gidip gitmeyece\u011fi.",
      "s7_p2": "<strong>Haz\u0131rl\u0131ks\u0131z bir kapan\u0131\u015f toplant\u0131s\u0131 en s\u0131k yap\u0131lan hatalardan biridir.</strong>",
      "s8_title": "8. De\u011fi\u015ftirilmi\u015f Vergi Tahakkuklar\u0131 ve Sonu\u00e7lar\u0131",
      "s8_p1": "Denetimin tamamlanmas\u0131n\u0131n ard\u0131ndan vergi dairesi de\u011fi\u015ftirilmi\u015f vergi tahakkuklar\u0131 \u00e7\u0131kar\u0131r. Olas\u0131 sonu\u00e7lar:",
      "s8_li1": "ek vergi \u00f6demeleri",
      "s8_li2": "\u00a7 233a AO uyar\u0131nca faiz",
      "s8_li3": "sorumluluk ve yan sonu\u00e7lar",
      "s8_li4": "vergi yan y\u00fck\u00fcml\u00fcl\u00fckleri",
      "s8_li5": "vergi ceza veya idari para cezas\u0131 i\u015flemlerinin ba\u015flat\u0131lmas\u0131 (soru\u015fturma hen\u00fcz ba\u015flat\u0131lmam\u0131\u015fsa)",
      "s9_title": "9. \u0130tiraz ve Mali Mahkeme \u00d6n\u00fcnde Dava",
      "s9_p1": "Her denetim bulgusu kabul edilmek zorunda de\u011fildir.",
      "s9_p2": "\u0130nceledi\u011fimiz hususlar:",
      "s9_li1": "tahminin hukuka uygunlu\u011fu",
      "s9_li2": "usul hatalar\u0131",
      "s9_li3": "delil de\u011ferlendirmesi",
      "s9_li4": "tedbirlerin orant\u0131l\u0131l\u0131\u011f\u0131",
      "s9_p3": "Gerekti\u011finde m\u00fcvekkillerimizi hem itiraz s\u00fcrecinde hem de mahkemeler \u00f6n\u00fcnde temsil ediyoruz.",
      "s10_title": "10. Vergi Ceza Hukuku ile Kesi\u015fim Noktas\u0131",
      "s10_p1": "Denetim s\u0131ras\u0131nda bir vergi su\u00e7una ili\u015fkin belirtiler ortaya \u00e7\u0131karsa, hukuki durum temelden de\u011fi\u015fir. Denetim s\u00fcrecinde i\u015fbirli\u011fi y\u00fck\u00fcml\u00fcl\u00fckleri ge\u00e7erliyken, ceza yarg\u0131lamas\u0131nda vergi m\u00fckellefleri ifade vermeyi reddetme hakk\u0131na sahiptir. Erken hukuki dan\u0131\u015fmanl\u0131k bu ba\u011flamda bilinen varolu\u015fsal bir \u00f6neme sahiptir."
    }
  },
  "article2": {
    "de": {
      "intro_p1": "Eine steuerliche Au\u00dfenpr\u00fcfung ist zun\u00e4chst kein Strafverfahren. Sie dient der \u00dcberpr\u00fcfung steuerlicher Sachverhalte im Rahmen des Besteuerungsverfahrens. Allerdings kann sich der Charakter der Pr\u00fcfung jederzeit grundlegend \u00e4ndern.",
      "critical_title": "Wann wird es kritisch?",
      "critical_p1": "Ergeben sich w\u00e4hrend der Au\u00dfenpr\u00fcfung tats\u00e4chliche Anhaltspunkte daf\u00fcr, dass steuerlich erhebliche Sachverhalte nicht nur fehlerhaft, sondern vors\u00e4tzlich oder leichtfertig falsch erkl\u00e4rt wurden, ist die Finanzverwaltung verpflichtet, den Vorgang neu zu bewerten.",
      "critical_p2": "Ab diesem Moment steht nicht mehr allein die zutreffende Steuerfestsetzung im Vordergrund, sondern der Verdacht einer Steuerstraftat oder Steuerordnungswidrigkeit.",
      "separation_title": "Der rechtliche Einschnitt: Trennung von Besteuerungs- und Strafverfahren",
      "separation_p1": "Sobald ein solcher Verdacht besteht, greifen fundamental andere rechtliche Regeln:",
      "separation_li1": "Die Au\u00dfenpr\u00fcfung darf nicht mehr uneingeschr\u00e4nkt fortgef\u00fchrt werden.",
      "separation_li2": "Der Steuerpflichtige darf nicht weiter zur Mitwirkung gezwungen werden.",
      "separation_li3": "Aussagen, Unterlagen und Erkl\u00e4rungen k\u00f6nnen strafrechtlich verwertbar sein.",
      "separation_p2": "Die Pr\u00fcfung bewegt sich damit von einem verwaltungsrechtlichen Verfahren hin zu einem repressiven Ermittlungsverfahren. Gerade dieser \u00dcbergang ist in der Praxis hochsensibel \u2013 und wird von Betroffenen h\u00e4ufig nicht erkannt oder untersch\u00e4tzt.",
      "triggers_title": "Typische Ausl\u00f6ser f\u00fcr den \u00dcbergang ins Steuerstrafverfahren",
      "triggers_p1": "In unserer Beratungspraxis erleben wir immer wieder, dass der Wechsel nicht durch \u201egro\u00dfe Gest\u00e4ndnisse\u201c, sondern durch scheinbar nebens\u00e4chliche Punkte ausgel\u00f6st wird, etwa:",
      "triggers_li1": "nicht erkl\u00e4rbare Abweichungen bei Richts\u00e4tzen oder Rohgewinnaufschl\u00e4gen",
      "triggers_li2": "formelle M\u00e4ngel in der Kassenf\u00fchrung mit materieller Bedeutung",
      "triggers_li3": "widerspr\u00fcchliche Aussagen von Unternehmern oder Mitarbeitern",
      "triggers_li4": "fehlende oder nachtr\u00e4glich erstellte Unterlagen",
      "triggers_li5": "Zusch\u00e4tzungen in erheblichem Umfang",
      "triggers_li6": "Hinweise aus Kontrollmitteilungen oder Datenabgleichen",
      "triggers_warning": "<strong>Wichtig: Nicht jeder Fehler ist strafbar. Aber jede unbedachte Aussage kann den Anfangsverdacht begr\u00fcnden.</strong>",
      "caution_title": "Ab diesem Zeitpunkt gilt: Vorsicht bei Aussagen und Mitwirkung",
      "caution_p1": "Ein h\u00e4ufiger \u2013 und folgenschwerer \u2013 Irrtum besteht darin, die Au\u00dfenpr\u00fcfung auch nach Eintritt eines Anfangsverdachts \u201ekooperativ zu Ende bringen zu wollen\u201c.",
      "caution_p2": "Tats\u00e4chlich gilt:",
      "caution_li1": "Was im Besteuerungsverfahren noch zul\u00e4ssig oder geboten war,",
      "caution_li2": "kann im Steuerstrafverfahren erhebliches Risiko bedeuten.",
      "caution_p3": "Hier entscheidet sich, ob:",
      "caution_li3": "ein Sachverhalt steuerlich bereinigt wird oder",
      "caution_li4": "ein Ermittlungsverfahren mit Geldstrafe, Strafbefehl oder Anklage folgt.",
      "strategy_title": "Strategiewechsel im richtigen Moment",
      "strategy_p1": "Sobald sich Anzeichen f\u00fcr einen strafrechtlich relevanten Vorwurf ergeben, ist ein Strategiewechsel zwingend erforderlich:",
      "strategy_li1": "Trennung von Steuer- und Strafverteidigung",
      "strategy_li2": "rechtssichere Begrenzung der Mitwirkung",
      "strategy_li3": "Pr\u00fcfung von Selbstanzeigeoptionen",
      "strategy_li4": "strukturierte Kommunikation mit der Finanzverwaltung",
      "strategy_li5": "Schutz vor unzul\u00e4ssiger Beweisverwertung",
      "strategy_p2": "<strong>Dieser Moment ist kein Zeichen von Schuld, sondern Ausdruck professioneller Vorsorge.</strong>",
      "advice_title": "Warum fr\u00fchzeitige Beratung entscheidend ist",
      "advice_p1": "Der \u00dcbergang von der Au\u00dfenpr\u00fcfung in das Steuerstrafverfahren erfolgt nicht immer offen oder transparent. H\u00e4ufig bemerken Betroffene erst im Nachhinein, dass sie sich bereits im strafrechtlich relevanten Bereich bewegt haben. Unsere Aufgabe ist es, diesen Wendepunkt fr\u00fchzeitig zu erkennen, rechtlich einzuordnen und Mandanten vor irreversiblen Fehlern zu sch\u00fctzen."
    },
    "en": {
      "intro_p1": "A tax field audit is initially not a criminal proceeding. It serves to verify tax-related matters within the taxation procedure. However, the nature of the audit can fundamentally change at any time.",
      "critical_title": "When does it become critical?",
      "critical_p1": "If, during the tax field audit, factual indications emerge that tax-relevant matters were not merely reported incorrectly but were intentionally or recklessly misrepresented, the tax authorities are obligated to reassess the matter.",
      "critical_p2": "From this moment on, the focus is no longer solely on the correct tax assessment but on the suspicion of a tax crime or tax administrative offense.",
      "separation_title": "The Legal Turning Point: Separation of Taxation and Criminal Proceedings",
      "separation_p1": "As soon as such a suspicion arises, fundamentally different legal rules apply:",
      "separation_li1": "The tax audit may no longer be continued without restriction.",
      "separation_li2": "The taxpayer may no longer be compelled to cooperate.",
      "separation_li3": "Statements, documents, and declarations may be used as evidence in criminal proceedings.",
      "separation_p2": "The audit thus moves from an administrative law procedure to a repressive investigation. It is precisely this transition that is highly sensitive in practice \u2014 and is frequently unrecognized or underestimated by those affected.",
      "triggers_title": "Typical Triggers for the Transition to Tax Criminal Proceedings",
      "triggers_p1": "In our advisory practice, we repeatedly observe that the transition is not triggered by \u2018major confessions\u2019 but by seemingly incidental points, such as:",
      "triggers_li1": "unexplainable deviations in benchmark rates or gross profit mark-ups",
      "triggers_li2": "formal deficiencies in cash register management with material significance",
      "triggers_li3": "contradictory statements by business owners or employees",
      "triggers_li4": "missing or retrospectively prepared documents",
      "triggers_li5": "additional assessments of considerable scope",
      "triggers_li6": "indications from cross-referencing notifications or data reconciliations",
      "triggers_warning": "<strong>Important: Not every error is a criminal offense. But every thoughtless statement can establish the initial suspicion.</strong>",
      "caution_title": "From This Point On: Caution with Statements and Cooperation",
      "caution_p1": "A common \u2014 and consequential \u2014 mistake is wanting to \u2018cooperatively complete\u2019 the tax audit even after the initial suspicion has arisen.",
      "caution_p2": "In fact, the following applies:",
      "caution_li1": "What was still permissible or required in the taxation procedure",
      "caution_li2": "can pose significant risk in tax criminal proceedings.",
      "caution_p3": "This is where it is decided whether:",
      "caution_li3": "a matter is resolved for tax purposes, or",
      "caution_li4": "an investigation proceeding with a fine, penalty order, or indictment follows.",
      "strategy_title": "Strategy Change at the Right Moment",
      "strategy_p1": "As soon as indications of a criminally relevant accusation emerge, a strategy change is imperative:",
      "strategy_li1": "separation of tax and criminal defense",
      "strategy_li2": "legally secure limitation of cooperation",
      "strategy_li3": "review of voluntary disclosure options",
      "strategy_li4": "structured communication with the tax authorities",
      "strategy_li5": "protection against impermissible use of evidence",
      "strategy_p2": "<strong>This moment is not a sign of guilt but an expression of professional precaution.</strong>",
      "advice_title": "Why Early Legal Counsel Is Decisive",
      "advice_p1": "The transition from the tax field audit to tax criminal proceedings does not always occur openly or transparently. Those affected frequently only realize in retrospect that they have already moved into criminally relevant territory. Our task is to recognize this turning point early, classify it legally, and protect our clients from irreversible mistakes."
    },
    "tr": {
      "intro_p1": "Vergi denetimi ba\u015flang\u0131\u00e7ta bir ceza yarg\u0131lamas\u0131 de\u011fildir. Vergilendirme s\u00fcreci kapsam\u0131nda vergisel konular\u0131n incelenmesine hizmet eder. Ancak denetimin niteli\u011fi her an temelden de\u011fi\u015febilir.",
      "critical_title": "Ne zaman kritik hale gelir?",
      "critical_p1": "Vergi denetimi s\u0131ras\u0131nda, vergisel a\u00e7\u0131dan \u00f6nemli konular\u0131n yaln\u0131zca hatal\u0131 de\u011fil, kas\u0131tl\u0131 veya dikkatsizce yanl\u0131\u015f beyan edildi\u011fine dair somut belirtiler ortaya \u00e7\u0131karsa, mali y\u00f6netim durumu yeniden de\u011ferlendirmekle y\u00fck\u00fcml\u00fcd\u00fcr.",
      "critical_p2": "Bu andan itibaren \u00f6n planda art\u0131k yaln\u0131zca do\u011fru vergi tahakkuku de\u011fil, bir vergi su\u00e7u veya vergi kabahatine ili\u015fkin \u015f\u00fcphe yer al\u0131r.",
      "separation_title": "Hukuki K\u0131r\u0131lma Noktas\u0131: Vergilendirme ve Ceza Yarg\u0131lamas\u0131n\u0131n Ayr\u0131lmas\u0131",
      "separation_p1": "B\u00f6yle bir \u015f\u00fcphe olu\u015ftu\u011fu anda, temelden farkl\u0131 hukuki kurallar devreye girer:",
      "separation_li1": "Vergi denetimi art\u0131k s\u0131n\u0131rs\u0131z olarak s\u00fcrd\u00fcr\u00fclemez.",
      "separation_li2": "Vergi m\u00fckellefi art\u0131k i\u015fbirli\u011fine zorlanamaz.",
      "separation_li3": "\u0130fadeler, belgeler ve beyanlar ceza yarg\u0131lamas\u0131nda delil olarak kullan\u0131labilir.",
      "separation_p2": "B\u00f6ylece denetim, idari hukuk s\u00fcrecinden bask\u0131c\u0131 bir soru\u015fturma s\u00fcrecine d\u00f6n\u00fc\u015f\u00fcr. \u00d6zellikle bu ge\u00e7i\u015f uygulamada son derece hassast\u0131r \u2013 ve ilgililer taraf\u0131ndan s\u0131kl\u0131kla fark edilmez veya hafife al\u0131n\u0131r.",
      "triggers_title": "Vergi Ceza Yarg\u0131lamas\u0131na Ge\u00e7i\u015fin Tipik Tetikleyicileri",
      "triggers_p1": "Dan\u0131\u015fmanl\u0131k prati\u011fimizde, ge\u00e7i\u015fin \u2018b\u00fcy\u00fck itiraflarla\u2019 de\u011fil, g\u00f6r\u00fcn\u00fc\u015fte \u00f6nemsiz noktalarla tetiklendi\u011fini s\u00fcrekli g\u00f6zlemliyoruz, \u00f6rne\u011fin:",
      "triggers_li1": "oran cetvellerinde veya br\u00fct k\u00e2r marjlar\u0131nda a\u00e7\u0131klanamayan sapmalar",
      "triggers_li2": "maddi \u00f6neme sahip kasa y\u00f6netimindeki \u015fekli eksiklikler",
      "triggers_li3": "giri\u015fimcilerin veya \u00e7al\u0131\u015fanlar\u0131n \u00e7eli\u015fkili ifadeleri",
      "triggers_li4": "eksik veya sonradan haz\u0131rlanm\u0131\u015f belgeler",
      "triggers_li5": "\u00f6nemli boyutta ek takdirler",
      "triggers_li6": "\u00e7apraz kontrol bildirimleri veya veri e\u015fle\u015ftirmelerinden gelen ipu\u00e7lar\u0131",
      "triggers_warning": "<strong>\u00d6nemli: Her hata cezai su\u00e7 te\u015fkil etmez. Ancak her d\u00fc\u015f\u00fcncesiz ifade ba\u015flang\u0131\u00e7 \u015f\u00fcphesini olu\u015fturabilir.</strong>",
      "caution_title": "Bu Noktadan \u0130tibaren Ge\u00e7erli: \u0130fade ve \u0130\u015fbirli\u011finde Dikkat",
      "caution_p1": "S\u0131k yap\u0131lan \u2013 ve a\u011f\u0131r sonu\u00e7lar\u0131 olan \u2013 bir hata, ba\u015flang\u0131\u00e7 \u015f\u00fcphesi olu\u015ftuktan sonra bile vergi denetimini \u2018i\u015fbirli\u011fi i\u00e7inde tamamlamak istemek\u2019tir.",
      "caution_p2": "Ger\u00e7ekte \u015fu ge\u00e7erlidir:",
      "caution_li1": "Vergilendirme s\u00fcrecinde h\u00e2l\u00e2 caiz veya gerekli olan \u015fey,",
      "caution_li2": "vergi ceza yarg\u0131lamas\u0131nda ciddi risk anlam\u0131na gelebilir.",
      "caution_p3": "Burada \u015fu belirlenir:",
      "caution_li3": "bir konu vergisel olarak m\u0131 \u00e7\u00f6z\u00fclecek, yoksa",
      "caution_li4": "para cezas\u0131, ceza kararnamesi veya iddianame ile bir soru\u015fturma s\u00fcreci mi takip edecek.",
      "strategy_title": "Do\u011fru Anda Strateji De\u011fi\u015fikli\u011fi",
      "strategy_p1": "Cezai a\u00e7\u0131dan ilgili bir su\u00e7lamaya dair belirtiler ortaya \u00e7\u0131kt\u0131\u011f\u0131 anda strateji de\u011fi\u015fikli\u011fi zorunludur:",
      "strategy_li1": "vergi ve ceza savunmas\u0131n\u0131n ayr\u0131lmas\u0131",
      "strategy_li2": "i\u015fbirli\u011finin hukuki g\u00fcvenlik alt\u0131nda s\u0131n\u0131rland\u0131r\u0131lmas\u0131",
      "strategy_li3": "g\u00f6n\u00fcll\u00fc bildirim se\u00e7eneklerinin incelenmesi",
      "strategy_li4": "mali y\u00f6netim ile yap\u0131land\u0131r\u0131lm\u0131\u015f ileti\u015fim",
      "strategy_li5": "hukuka ayk\u0131r\u0131 delil kullan\u0131m\u0131na kar\u015f\u0131 koruma",
      "strategy_p2": "<strong>Bu an bir su\u00e7 belirtisi de\u011fil, profesyonel tedbirli davran\u0131\u015f\u0131n ifadesidir.</strong>",
      "advice_title": "Neden Erken Hukuki Dan\u0131\u015fmanl\u0131k Belirleyicidir",
      "advice_p1": "Vergi denetiminden vergi ceza yarg\u0131lamas\u0131na ge\u00e7i\u015f her zaman a\u00e7\u0131k veya \u015feffaf bir \u015fekilde ger\u00e7ekle\u015fmez. \u0130lgililer \u00e7o\u011fu zaman ancak geriye d\u00f6n\u00fck olarak, zaten cezai a\u00e7\u0131dan ilgili alana girmi\u015f olduklar\u0131n\u0131 fark ederler. G\u00f6revimiz, bu d\u00f6n\u00fcm noktas\u0131n\u0131 erken tespit etmek, hukuki olarak s\u0131n\u0131fland\u0131rmak ve m\u00fcvekkillerimizi geri d\u00f6n\u00fc\u015f\u00fc olmayan hatalardan korumakt\u0131r."
    }
  }
}
'''


# ─────────────────────────────────────────────────────────────────────────────
# HTML replacement patterns: (old_snippet, new_snippet)
# Each pair identifies a unique substring in the HTML and adds data-i18n
# ─────────────────────────────────────────────────────────────────────────────

def build_html_replacements():
    R = []

    # ── ARTICLE 1 ──
    pfx = "knowledge.audit.article"

    # Intro
    R.append(('font-size: 1.125rem; line-height: 1.8; color: var(--color-text-light);">\n                    Eine steuerliche',
              f'font-size: 1.125rem; line-height: 1.8; color: var(--color-text-light);" data-i18n="{pfx}.intro_p1">\n                    Eine steuerliche'))
    R.append(('<p>Die Finanzverwaltung pr\u00fcft dabei nicht nur Zahlen, sondern bewertet unter anderem:</p>',
              f'<p data-i18n="{pfx}.intro_p2">Die Finanzverwaltung pr\u00fcft dabei nicht nur Zahlen, sondern bewertet unter anderem:</p>'))
    R.append(('<li>betriebliche Abl\u00e4ufe,</li>',
              f'<li data-i18n="{pfx}.intro_li1">betriebliche Abl\u00e4ufe,</li>'))
    R.append(('<li>Kalkulationen,</li>',
              f'<li data-i18n="{pfx}.intro_li2">Kalkulationen,</li>'))
    R.append(('<li>Kassenf\u00fchrung und unternehmerische Entscheidungen.</li>',
              f'<li data-i18n="{pfx}.intro_li3">Kassenf\u00fchrung und unternehmerische Entscheidungen.</li>'))
    R.append(('font-style: italic;">(oftmals werden Richtsatzsammlungen',
              f'font-style: italic;" data-i18n="{pfx}.intro_p3">(oftmals werden Richtsatzsammlungen'))
    R.append(('<p>Wir begleiten unsere Mandanten umfassend von der Pr\u00fcfungsanordnung',
              f'<p data-i18n="{pfx}.intro_p4">Wir begleiten unsere Mandanten umfassend von der Pr\u00fcfungsanordnung'))

    # What subsection
    R.append(('spacing-xl);">Was pr\u00fcft die Finanzverwaltung tats\u00e4chlich?</h3>',
              f'spacing-xl);" data-i18n="{pfx}.what_title">Was pr\u00fcft die Finanzverwaltung tats\u00e4chlich?</h3>'))
    R.append(('<p>Im Rahmen einer steuerlichen Au\u00dfenpr\u00fcfung beschr\u00e4nkt sich die Finanzverwaltung',
              f'<p data-i18n="{pfx}.what_p1">Im Rahmen einer steuerlichen Au\u00dfenpr\u00fcfung beschr\u00e4nkt sich die Finanzverwaltung'))
    R.append(('<p>Im Einzelnen stehen dabei insbesondere folgende Bereiche im Fokus:</p>',
              f'<p data-i18n="{pfx}.what_p2">Im Einzelnen stehen dabei insbesondere folgende Bereiche im Fokus:</p>'))

    # Card 1
    R.append(('margin-top: 0;">Betriebliche Abl\u00e4ufe und Organisation</h4>',
              f'margin-top: 0;" data-i18n="{pfx}.card1_title">Betriebliche Abl\u00e4ufe und Organisation</h4>'))
    R.append(('<p>Die Pr\u00fcfer analysieren, wie ein Unternehmen tats\u00e4chlich arbeitet. Dazu geh\u00f6ren unter anderem:</p>',
              f'<p data-i18n="{pfx}.card1_p1">Die Pr\u00fcfer analysieren, wie ein Unternehmen tats\u00e4chlich arbeitet. Dazu geh\u00f6ren unter anderem:</p>'))
    R.append(('<li>interne Arbeitsabl\u00e4ufe und Zust\u00e4ndigkeiten</li>',
              f'<li data-i18n="{pfx}.card1_li1">interne Arbeitsabl\u00e4ufe und Zust\u00e4ndigkeiten</li>'))
    R.append(('<li>Einkaufs- und Verkaufsprozesse</li>',
              f'<li data-i18n="{pfx}.card1_li2">Einkaufs- und Verkaufsprozesse</li>'))
    R.append(('<li>Lagerhaltung, Warenbewegungen und Leistungsverflechtungen</li>',
              f'<li data-i18n="{pfx}.card1_li3">Lagerhaltung, Warenbewegungen und Leistungsverflechtungen</li>'))
    R.append(('<li>Schnittstellen zwischen Buchhaltung, Kasse und operativem Gesch\u00e4ft</li>',
              f'<li data-i18n="{pfx}.card1_li4">Schnittstellen zwischen Buchhaltung, Kasse und operativem Gesch\u00e4ft</li>'))
    R.append(('font-style: italic;">Abweichungen zwischen dokumentierten Prozessen',
              f'font-style: italic;" data-i18n="{pfx}.card1_p2">Abweichungen zwischen dokumentierten Prozessen'))

    # Card 2
    R.append(('margin-top: 0;">Kalkulationen und Preisgestaltung</h4>',
              f'margin-top: 0;" data-i18n="{pfx}.card2_title">Kalkulationen und Preisgestaltung</h4>'))
    R.append(('<p>Ein weiterer Schwerpunkt liegt auf der Wirtschaftlichkeit des Unternehmens. Die Finanzverwaltung pr\u00fcft:</p>',
              f'<p data-i18n="{pfx}.card2_p1">Ein weiterer Schwerpunkt liegt auf der Wirtschaftlichkeit des Unternehmens. Die Finanzverwaltung pr\u00fcft:</p>'))
    R.append(('<li>Rohgewinnaufschl\u00e4ge</li>',
              f'<li data-i18n="{pfx}.card2_li1">Rohgewinnaufschl\u00e4ge</li>'))
    R.append(('<li>Wareneinsatzquoten</li>',
              f'<li data-i18n="{pfx}.card2_li2">Wareneinsatzquoten</li>'))
    R.append(('<li>Stunden- oder Leistungskalkulationen</li>',
              f'<li data-i18n="{pfx}.card2_li3">Stunden- oder Leistungskalkulationen</li>'))
    R.append(('<li>Preisniveaus im Branchenvergleich</li>',
              f'<li data-i18n="{pfx}.card2_li4">Preisniveaus im Branchenvergleich</li>'))
    R.append(('font-style: italic;">Hierbei werden unternehmensinterne Kalkulationen',
              f'font-style: italic;" data-i18n="{pfx}.card2_p2">Hierbei werden unternehmensinterne Kalkulationen'))

    # Card 3
    R.append(('margin-top: 0;">Kassenf\u00fchrung und Bargesch\u00e4fte</h4>',
              f'margin-top: 0;" data-i18n="{pfx}.card3_title">Kassenf\u00fchrung und Bargesch\u00e4fte</h4>'))
    R.append(('<p>Besondere Bedeutung kommt der ordnungsgem\u00e4\u00dfen Kassenf\u00fchrung zu',
              f'<p data-i18n="{pfx}.card3_p1">Besondere Bedeutung kommt der ordnungsgem\u00e4\u00dfen Kassenf\u00fchrung zu'))
    R.append(('<li>die gesamte Buchf\u00fchrung infrage gestellt wird,</li>',
              f'<li data-i18n="{pfx}.card3_li1">die gesamte Buchf\u00fchrung infrage gestellt wird,</li>'))
    R.append(('<li>Zusch\u00e4tzungen vorgenommen werden,</li>',
              f'<li data-i18n="{pfx}.card3_li2">Zusch\u00e4tzungen vorgenommen werden,</li>'))
    R.append(('<li>Sch\u00e4tzungen nach \u00a7 162 AO erfolgen.</li>',
              f'<li data-i18n="{pfx}.card3_li3">Sch\u00e4tzungen nach \u00a7 162 AO erfolgen.</li>'))
    R.append(('font-weight: 600;">Dabei gilt: Nicht jeder formelle Fehler',
              f'font-weight: 600;" data-i18n="{pfx}.card3_p2">Dabei gilt: Nicht jeder formelle Fehler'))

    # Card 4
    R.append(('margin-top: 0;">Unternehmerische Entscheidungen</h4>',
              f'margin-top: 0;" data-i18n="{pfx}.card4_title">Unternehmerische Entscheidungen</h4>'))
    R.append(('<p>Auch unternehmerische Entscheidungen geraten zunehmend in den Fokus der Pr\u00fcfung. Dazu z\u00e4hlen etwa:</p>',
              f'<p data-i18n="{pfx}.card4_p1">Auch unternehmerische Entscheidungen geraten zunehmend in den Fokus der Pr\u00fcfung. Dazu z\u00e4hlen etwa:</p>'))
    R.append(('<li>Investitionsentscheidungen</li>',
              f'<li data-i18n="{pfx}.card4_li1">Investitionsentscheidungen</li>'))
    R.append(('<li>Personal- und Verg\u00fctungsstrukturen</li>',
              f'<li data-i18n="{pfx}.card4_li2">Personal- und Verg\u00fctungsstrukturen</li>'))
    R.append(('<li>ungew\u00f6hnliche Vertragsgestaltungen</li>',
              f'<li data-i18n="{pfx}.card4_li3">ungew\u00f6hnliche Vertragsgestaltungen</li>'))
    R.append(('<li>bewusste Niedrigpreis- oder Hochpreiskonzepte</li>',
              f'<li data-i18n="{pfx}.card4_li4">bewusste Niedrigpreis- oder Hochpreiskonzepte</li>'))
    R.append(('color: var(--color-text-light);">Solche Entscheidungen sind steuerlich',
              f'color: var(--color-text-light);" data-i18n="{pfx}.card4_p2">Solche Entscheidungen sind steuerlich'))

    # Bench subsection
    R.append(('spacing-xl);">Einsatz von Richtsatzsammlungen, Kennzahlen und Sch\u00e4tzungsmethoden</h3>',
              f'spacing-xl);" data-i18n="{pfx}.bench_title">Einsatz von Richtsatzsammlungen, Kennzahlen und Sch\u00e4tzungsmethoden</h3>'))
    R.append(('<p>Zur Bewertung der vorgenannten Bereiche greift die Finanzverwaltung h\u00e4ufig auf:</p>',
              f'<p data-i18n="{pfx}.bench_p1">Zur Bewertung der vorgenannten Bereiche greift die Finanzverwaltung h\u00e4ufig auf:</p>'))
    R.append(('<li>Richtsatzsammlungen,</li>',
              f'<li data-i18n="{pfx}.bench_li1">Richtsatzsammlungen,</li>'))
    R.append(('<li>branchenbezogene Kennzahlen und</li>',
              f'<li data-i18n="{pfx}.bench_li2">branchenbezogene Kennzahlen und</li>'))
    R.append(('<li>Sch\u00e4tzungsmethoden</li>',
              f'<li data-i18n="{pfx}.bench_li3">Sch\u00e4tzungsmethoden</li>'))
    R.append(('<p>zur\u00fcck.</p>',
              f'<p data-i18n="{pfx}.bench_p2">zur\u00fcck.</p>'))
    R.append(('<p>Diese Instrumente dienen zwar als Orientierungshilfe',
              f'<p data-i18n="{pfx}.bench_p3">Diese Instrumente dienen zwar als Orientierungshilfe'))
    R.append(('<p>Gerade hier entstehen regelm\u00e4\u00dfig Konflikte, da statistische Durchschnittswerte:</p>',
              f'<p data-i18n="{pfx}.bench_p4">Gerade hier entstehen regelm\u00e4\u00dfig Konflikte, da statistische Durchschnittswerte:</p>'))
    R.append(('<li>keine individuelle Unternehmensrealit\u00e4t abbilden,</li>',
              f'<li data-i18n="{pfx}.bench_li4">keine individuelle Unternehmensrealit\u00e4t abbilden,</li>'))
    R.append(('<li>regionale und konzeptionelle Unterschiede ausblenden,</li>',
              f'<li data-i18n="{pfx}.bench_li5">regionale und konzeptionelle Unterschiede ausblenden,</li>'))
    R.append(('<li>und unternehmerische Freiheit faktisch einschr\u00e4nken k\u00f6nnen.</li>',
              f'<li data-i18n="{pfx}.bench_li6">und unternehmerische Freiheit faktisch einschr\u00e4nken k\u00f6nnen.</li>'))

    # Approach card
    R.append(('color: var(--color-primary);">Unser Ansatz: Einzelfall statt Statistik</h3>',
              f'color: var(--color-primary);" data-i18n="{pfx}.approach_title">Unser Ansatz: Einzelfall statt Statistik</h3>'))
    R.append(('<p>Eine steuerliche Au\u00dfenpr\u00fcfung darf keine',
              f'<p data-i18n="{pfx}.approach_p1">Eine steuerliche Au\u00dfenpr\u00fcfung darf keine'))
    R.append(('<li>die Herausarbeitung der individuellen Unternehmensstruktur,</li>',
              f'<li data-i18n="{pfx}.approach_li1">die Herausarbeitung der individuellen Unternehmensstruktur,</li>'))
    R.append(('<li>die rechtliche Begrenzung von Sch\u00e4tzungen,</li>',
              f'<li data-i18n="{pfx}.approach_li2">die rechtliche Begrenzung von Sch\u00e4tzungen,</li>'))
    R.append(('<li>und die argumentative Einordnung von Richts\u00e4tzen und Kennzahlen',
              f'<li data-i18n="{pfx}.approach_li3">und die argumentative Einordnung von Richts\u00e4tzen und Kennzahlen'))
    R.append(('font-weight: 600;">Ziel ist es, pauschale Annahmen der Finanzverwaltung',
              f'font-weight: 600;" data-i18n="{pfx}.approach_p2">Ziel ist es, pauschale Annahmen der Finanzverwaltung'))

    # S1
    R.append(('spacing-xl);">1. Was ist eine steuerliche Au\u00dfenpr\u00fcfung?</h3>',
              f'spacing-xl);" data-i18n="{pfx}.s1_title">1. Was ist eine steuerliche Au\u00dfenpr\u00fcfung?</h3>'))
    R.append(('<p>Die steuerliche Au\u00dfenpr\u00fcfung ist ein gesetzlich geregeltes Pr\u00fcfungsverfahren',
              f'<p data-i18n="{pfx}.s1_p1">Die steuerliche Au\u00dfenpr\u00fcfung ist ein gesetzlich geregeltes Pr\u00fcfungsverfahren'))
    R.append(('<p><strong>Ziel der Au\u00dfenpr\u00fcfung:</strong> Gleichm\u00e4\u00dfigkeit der Besteuerung',
              f'<p data-i18n="{pfx}.s1_p2"><strong>Ziel der Au\u00dfenpr\u00fcfung:</strong> Gleichm\u00e4\u00dfigkeit der Besteuerung'))

    # S2
    R.append(('spacing-xl);">2. Wer wird gepr\u00fcft',
              f'spacing-xl);" data-i18n="{pfx}.s2_title">2. Wer wird gepr\u00fcft'))
    R.append(('<p>Au\u00dfenpr\u00fcfungen betreffen nicht nur Gro\u00dfunternehmen. Gepr\u00fcft werden u. a.:</p>',
              f'<p data-i18n="{pfx}.s2_p1">Au\u00dfenpr\u00fcfungen betreffen nicht nur Gro\u00dfunternehmen. Gepr\u00fcft werden u. a.:</p>'))
    R.append(('<li>Kapitalgesellschaften (GmbH, UG, AG, ...)</li>',
              f'<li data-i18n="{pfx}.s2_li1">Kapitalgesellschaften (GmbH, UG, AG, ...)</li>'))
    R.append(('<li>Personengesellschaften</li>',
              f'<li data-i18n="{pfx}.s2_li2">Personengesellschaften</li>'))
    R.append(('<li>Einzelunternehmer und Freiberufler</li>',
              f'<li data-i18n="{pfx}.s2_li3">Einzelunternehmer und Freiberufler</li>'))
    R.append(('<li>Unternehmer mit/ohne Kassenf\u00fchrung oder Bargesch\u00e4ften</li>',
              f'<li data-i18n="{pfx}.s2_li4">Unternehmer mit/ohne Kassenf\u00fchrung oder Bargesch\u00e4ften</li>'))
    R.append(('<li>International t\u00e4tige Unternehmen</li>',
              f'<li data-i18n="{pfx}.s2_li5">International t\u00e4tige Unternehmen</li>'))
    R.append(('<p>Die Pr\u00fcfungsdichte richtet sich u. a. nach Gr\u00f6\u00dfenklassen',
              f'<p data-i18n="{pfx}.s2_p2">Die Pr\u00fcfungsdichte richtet sich u. a. nach Gr\u00f6\u00dfenklassen'))

    # S3
    R.append(('spacing-xl);">3. Die Pr\u00fcfungsanordnung',
              f'spacing-xl);" data-i18n="{pfx}.s3_title">3. Die Pr\u00fcfungsanordnung'))
    R.append(('<p>Jede gew\u00f6hnliche Au\u00dfenpr\u00fcfung wird durch eine Pr\u00fcfungsanordnung angek\u00fcndigt',
              f'<p data-i18n="{pfx}.s3_p1">Jede gew\u00f6hnliche Au\u00dfenpr\u00fcfung wird durch eine Pr\u00fcfungsanordnung angek\u00fcndigt'))
    R.append(('<li>Rechtsgrundlage der Pr\u00fcfung</li>',
              f'<li data-i18n="{pfx}.s3_li1">Rechtsgrundlage der Pr\u00fcfung</li>'))
    R.append(('<li>Pr\u00fcfungszeitraum</li>',
              f'<li data-i18n="{pfx}.s3_li2">Pr\u00fcfungszeitraum</li>'))
    R.append(('<li>betroffene Steuerarten</li>',
              f'<li data-i18n="{pfx}.s3_li3">betroffene Steuerarten</li>'))
    R.append(('<li>ggf. besondere Pr\u00fcfungsschwerpunkte</li>',
              f'<li data-i18n="{pfx}.s3_li4">ggf. besondere Pr\u00fcfungsschwerpunkte</li>'))
    # Warning div: add to the div content wrapper
    R.append(('>\n                    <strong style="color: #f57c00;">Wichtig:</strong> Die Pr\u00fcfungsanordnung ist kein blo\u00dfer Formalakt',
              f' data-i18n="{pfx}.s3_warning">\n                    <strong style="color: #f57c00;">Wichtig:</strong> Die Pr\u00fcfungsanordnung ist kein blo\u00dfer Formalakt'))

    # S4
    R.append(('spacing-xl);">4. Ablauf der Au\u00dfenpr\u00fcfung</h3>',
              f'spacing-xl);" data-i18n="{pfx}.s4_title">4. Ablauf der Au\u00dfenpr\u00fcfung</h3>'))
    R.append(('<h4>4.1 Ort und Dauer der Pr\u00fcfung</h4>',
              f'<h4 data-i18n="{pfx}.s4_h4a">4.1 Ort und Dauer der Pr\u00fcfung</h4>'))
    R.append(('<p>Grunds\u00e4tzlich erfolgt die Pr\u00fcfung in den Gesch\u00e4ftsr\u00e4umen des Steuerpflichtigen',
              f'<p data-i18n="{pfx}.s4_p1">Grunds\u00e4tzlich erfolgt die Pr\u00fcfung in den Gesch\u00e4ftsr\u00e4umen des Steuerpflichtigen'))
    R.append(('<h4>4.2 Mitwirkungspflichten</h4>',
              f'<h4 data-i18n="{pfx}.s4_h4b">4.2 Mitwirkungspflichten</h4>'))
    R.append(('<p>Der Steuerpflichtige ist zur Mitwirkung verpflichtet',
              f'<p data-i18n="{pfx}.s4_p2">Der Steuerpflichtige ist zur Mitwirkung verpflichtet'))
    R.append(('<h4>4.3 Datenzugriff und digitale Pr\u00fcfung</h4>',
              f'<h4 data-i18n="{pfx}.s4_h4c">4.3 Datenzugriff und digitale Pr\u00fcfung</h4>'))
    R.append(('<p>Die Finanzverwaltung greift zunehmend auf digitale Auswertungen zur\u00fcck',
              f'<p data-i18n="{pfx}.s4_p3">Die Finanzverwaltung greift zunehmend auf digitale Auswertungen zur\u00fcck'))

    # S5
    R.append(('spacing-xl);">5. Sch\u00e4tzung von Besteuerungsgrundlagen',
              f'spacing-xl);" data-i18n="{pfx}.s5_title">5. Sch\u00e4tzung von Besteuerungsgrundlagen'))
    R.append(('<h4>5.1 Wann darf gesch\u00e4tzt werden?</h4>',
              f'<h4 data-i18n="{pfx}.s5_h4a">5.1 Wann darf gesch\u00e4tzt werden?</h4>'))
    R.append(('<p>Eine Sch\u00e4tzung ist zul\u00e4ssig, wenn:</p>',
              f'<p data-i18n="{pfx}.s5_p1">Eine Sch\u00e4tzung ist zul\u00e4ssig, wenn:</p>'))
    R.append(('<li>Buchf\u00fchrung formelle oder materielle M\u00e4ngel aufweist,</li>',
              f'<li data-i18n="{pfx}.s5_li1">Buchf\u00fchrung formelle oder materielle M\u00e4ngel aufweist,</li>'))
    R.append(('<li>Aufzeichnungen nicht vorgelegt werden,</li>',
              f'<li data-i18n="{pfx}.s5_li2">Aufzeichnungen nicht vorgelegt werden,</li>'))
    R.append(('<li>Kassenf\u00fchrung nicht ordnungsgem\u00e4\u00df ist.</li>',
              f'<li data-i18n="{pfx}.s5_li3">Kassenf\u00fchrung nicht ordnungsgem\u00e4\u00df ist.</li>'))
    R.append(('<p><strong>Wichtig:</strong> Nicht jeder formelle Mangel rechtfertigt automatisch eine Vollsch\u00e4tzung.</p>',
              f'<p data-i18n="{pfx}.s5_p2"><strong>Wichtig:</strong> Nicht jeder formelle Mangel rechtfertigt automatisch eine Vollsch\u00e4tzung.</p>'))
    R.append(('spacing-lg);">5.2 Anforderungen an eine ordnungsgem\u00e4\u00dfe Sch\u00e4tzung</h4>',
              f'spacing-lg);" data-i18n="{pfx}.s5_h4b">5.2 Anforderungen an eine ordnungsgem\u00e4\u00dfe Sch\u00e4tzung</h4>'))
    R.append(('<p>Die Rechtsprechung verlangt, dass eine Sch\u00e4tzung:</p>',
              f'<p data-i18n="{pfx}.s5_p3">Die Rechtsprechung verlangt, dass eine Sch\u00e4tzung:</p>'))
    R.append(('<li>schl\u00fcssig</li>',
              f'<li data-i18n="{pfx}.s5_li4">schl\u00fcssig</li>'))
    R.append(('<li>wirtschaftlich m\u00f6glich</li>',
              f'<li data-i18n="{pfx}.s5_li5">wirtschaftlich m\u00f6glich</li>'))
    R.append(('<li>realit\u00e4tsnah</li>',
              f'<li data-i18n="{pfx}.s5_li6">realit\u00e4tsnah</li>'))
    R.append(('<li>und verh\u00e4ltnism\u00e4\u00dfig ist.</li>',
              f'<li data-i18n="{pfx}.s5_li7">und verh\u00e4ltnism\u00e4\u00dfig ist.</li>'))
    R.append(('<p>Pauschale oder schematische Zuschl\u00e4ge sind unzul\u00e4ssig.</p>',
              f'<p data-i18n="{pfx}.s5_p4">Pauschale oder schematische Zuschl\u00e4ge sind unzul\u00e4ssig.</p>'))

    # S6
    R.append(('spacing-xl);">6. Richtsatzsammlungen',
              f'spacing-xl);" data-i18n="{pfx}.s6_title">6. Richtsatzsammlungen'))
    R.append(('<p>Die Finanzverwaltung nutzt branchenspezifische Richtsatzsammlungen als Vergleichswerte',
              f'<p data-i18n="{pfx}.s6_p1">Die Finanzverwaltung nutzt branchenspezifische Richtsatzsammlungen als Vergleichswerte'))
    R.append(('<p><strong>Zentrale Rechtsprechungsgrunds\u00e4tze (BFH):</strong></p>',
              f'<p data-i18n="{pfx}.s6_p2"><strong>Zentrale Rechtsprechungsgrunds\u00e4tze (BFH):</strong></p>'))
    R.append(('<li>Richts\u00e4tze sind nur Hilfsmittel, keine Beweisregeln</li>',
              f'<li data-i18n="{pfx}.s6_li1">Richts\u00e4tze sind nur Hilfsmittel, keine Beweisregeln</li>'))
    R.append(('<li>Abweichungen m\u00fcssen betriebsindividuell erkl\u00e4rt werden d\u00fcrfen</li>',
              f'<li data-i18n="{pfx}.s6_li2">Abweichungen m\u00fcssen betriebsindividuell erkl\u00e4rt werden d\u00fcrfen</li>'))
    R.append(('<li>Besonderheiten des Unternehmens (Lage, Preisniveau, Konzept, Zielgruppe) sind zu ber\u00fccksichtigen</li>',
              f'<li data-i18n="{pfx}.s6_li3">Besonderheiten des Unternehmens (Lage, Preisniveau, Konzept, Zielgruppe) sind zu ber\u00fccksichtigen</li>'))
    R.append(('<li>Eine Sch\u00e4tzung allein aufgrund von Richtsatzabweichungen w\u00e4re rechtswidrig</li>',
              f'<li data-i18n="{pfx}.s6_li4">Eine Sch\u00e4tzung allein aufgrund von Richtsatzabweichungen w\u00e4re rechtswidrig</li>'))
    R.append(('<p>Die Rechtsprechung verlangt eine Einzelfallw\u00fcrdigung, keine Statistikbesteuerung.</p>',
              f'<p data-i18n="{pfx}.s6_p3">Die Rechtsprechung verlangt eine Einzelfallw\u00fcrdigung, keine Statistikbesteuerung.</p>'))

    # S7
    R.append(('spacing-xl);">7. Schlussbesprechung',
              f'spacing-xl);" data-i18n="{pfx}.s7_title">7. Schlussbesprechung'))
    R.append(('<p>In der Schlussbesprechung werden die Pr\u00fcfungsfeststellungen er\u00f6rtert',
              f'<p data-i18n="{pfx}.s7_p1">In der Schlussbesprechung werden die Pr\u00fcfungsfeststellungen er\u00f6rtert'))
    R.append(('<li>ob Zusch\u00e4tzungen abschlie\u00dfend reduziert werden,</li>',
              f'<li data-i18n="{pfx}.s7_li1">ob Zusch\u00e4tzungen abschlie\u00dfend reduziert werden,</li>'))
    R.append(('<li>ob Sachverhalte einvernehmlich gel\u00f6st werden,</li>',
              f'<li data-i18n="{pfx}.s7_li2">ob Sachverhalte einvernehmlich gel\u00f6st werden,</li>'))
    R.append(('<li>ob der Weg in das Rechtsbehelfsverfahren f\u00fchrt.</li>',
              f'<li data-i18n="{pfx}.s7_li3">ob der Weg in das Rechtsbehelfsverfahren f\u00fchrt.</li>'))
    R.append(('<p><strong>Eine unvorbereitete Schlussbesprechung ist einer der h\u00e4ufigsten Fehler.</strong></p>',
              f'<p data-i18n="{pfx}.s7_p2"><strong>Eine unvorbereitete Schlussbesprechung ist einer der h\u00e4ufigsten Fehler.</strong></p>'))

    # S8
    R.append(('spacing-xl);">8. Ge\u00e4nderte Steuerbescheide',
              f'spacing-xl);" data-i18n="{pfx}.s8_title">8. Ge\u00e4nderte Steuerbescheide'))
    R.append(('<p>Nach Abschluss der Pr\u00fcfung erl\u00e4sst das Finanzamt ge\u00e4nderte Steuerbescheide',
              f'<p data-i18n="{pfx}.s8_p1">Nach Abschluss der Pr\u00fcfung erl\u00e4sst das Finanzamt ge\u00e4nderte Steuerbescheide'))
    R.append(('<li>Steuernachzahlungen</li>',
              f'<li data-i18n="{pfx}.s8_li1">Steuernachzahlungen</li>'))
    R.append(('<li>Zinsen nach \u00a7 233a AO</li>',
              f'<li data-i18n="{pfx}.s8_li2">Zinsen nach \u00a7 233a AO</li>'))
    R.append(('<li>Haftungs- und Nebenfolgen</li>',
              f'<li data-i18n="{pfx}.s8_li3">Haftungs- und Nebenfolgen</li>'))
    R.append(('<li>Steuerliche Nebenleistungen</li>',
              f'<li data-i18n="{pfx}.s8_li4">Steuerliche Nebenleistungen</li>'))
    R.append(('<li>Einleitung eines Steuerstraf- oder Bu\u00dfgeldverfahrens',
              f'<li data-i18n="{pfx}.s8_li5">Einleitung eines Steuerstraf- oder Bu\u00dfgeldverfahrens'))

    # S9
    R.append(('spacing-xl);">9. Einspruch & Klage vor dem Finanzgericht</h3>',
              f'spacing-xl);" data-i18n="{pfx}.s9_title">9. Einspruch & Klage vor dem Finanzgericht</h3>'))
    R.append(('<p>Nicht jede Pr\u00fcfungsfeststellung ist hinzunehmen.</p>',
              f'<p data-i18n="{pfx}.s9_p1">Nicht jede Pr\u00fcfungsfeststellung ist hinzunehmen.</p>'))
    R.append(('<p>Wir pr\u00fcfen:</p>',
              f'<p data-i18n="{pfx}.s9_p2">Wir pr\u00fcfen:</p>'))
    R.append(('<li>Rechtm\u00e4\u00dfigkeit der Sch\u00e4tzung</li>',
              f'<li data-i18n="{pfx}.s9_li1">Rechtm\u00e4\u00dfigkeit der Sch\u00e4tzung</li>'))
    R.append(('<li>Verfahrensfehler</li>',
              f'<li data-i18n="{pfx}.s9_li2">Verfahrensfehler</li>'))
    R.append(('<li>Beweisw\u00fcrdigung</li>',
              f'<li data-i18n="{pfx}.s9_li3">Beweisw\u00fcrdigung</li>'))
    R.append(('<li>Verh\u00e4ltnism\u00e4\u00dfigkeit der Ma\u00dfnahmen</li>',
              f'<li data-i18n="{pfx}.s9_li4">Verh\u00e4ltnism\u00e4\u00dfigkeit der Ma\u00dfnahmen</li>'))
    R.append(('<p>Wenn erforderlich, vertreten wir unsere Mandanten sowohl im Einspruchsverfahren',
              f'<p data-i18n="{pfx}.s9_p3">Wenn erforderlich, vertreten wir unsere Mandanten sowohl im Einspruchsverfahren'))

    # S10
    R.append(('spacing-xl);">10. Schnittstelle zum Steuerstrafrecht</h3>',
              f'spacing-xl);" data-i18n="{pfx}.s10_title">10. Schnittstelle zum Steuerstrafrecht</h3>'))
    R.append(('<p>Ergeben sich w\u00e4hrend der Pr\u00fcfung Anhaltspunkte f\u00fcr eine Steuerstraftat',
              f'<p data-i18n="{pfx}.s10_p1">Ergeben sich w\u00e4hrend der Pr\u00fcfung Anhaltspunkte f\u00fcr eine Steuerstraftat'))

    # ── ARTICLE 2 ──
    pfx2 = "knowledge.audit.article2"

    R.append(('font-size: 1.125rem; line-height: 1.8;">\n                    Eine steuerliche Au\u00dfenpr\u00fcfung ist zun\u00e4chst kein Strafverfahren',
              f'font-size: 1.125rem; line-height: 1.8;" data-i18n="{pfx2}.intro_p1">\n                    Eine steuerliche Au\u00dfenpr\u00fcfung ist zun\u00e4chst kein Strafverfahren'))

    R.append(('<h3>Wann wird es kritisch?</h3>',
              f'<h3 data-i18n="{pfx2}.critical_title">Wann wird es kritisch?</h3>'))
    R.append(('<p>Ergeben sich w\u00e4hrend der Au\u00dfenpr\u00fcfung tats\u00e4chliche Anhaltspunkte daf\u00fcr',
              f'<p data-i18n="{pfx2}.critical_p1">Ergeben sich w\u00e4hrend der Au\u00dfenpr\u00fcfung tats\u00e4chliche Anhaltspunkte daf\u00fcr'))
    R.append(('<p>Ab diesem Moment steht nicht mehr allein die zutreffende Steuerfestsetzung',
              f'<p data-i18n="{pfx2}.critical_p2">Ab diesem Moment steht nicht mehr allein die zutreffende Steuerfestsetzung'))

    R.append(('spacing-xl);">Der rechtliche Einschnitt: Trennung von Besteuerungs- und Strafverfahren</h3>',
              f'spacing-xl);" data-i18n="{pfx2}.separation_title">Der rechtliche Einschnitt: Trennung von Besteuerungs- und Strafverfahren</h3>'))
    R.append(('<p>Sobald ein solcher Verdacht besteht, greifen fundamental andere rechtliche Regeln:</p>',
              f'<p data-i18n="{pfx2}.separation_p1">Sobald ein solcher Verdacht besteht, greifen fundamental andere rechtliche Regeln:</p>'))
    R.append(('<li>Die Au\u00dfenpr\u00fcfung darf nicht mehr uneingeschr\u00e4nkt fortgef\u00fchrt werden.</li>',
              f'<li data-i18n="{pfx2}.separation_li1">Die Au\u00dfenpr\u00fcfung darf nicht mehr uneingeschr\u00e4nkt fortgef\u00fchrt werden.</li>'))
    R.append(('<li>Der Steuerpflichtige darf nicht weiter zur Mitwirkung gezwungen werden.</li>',
              f'<li data-i18n="{pfx2}.separation_li2">Der Steuerpflichtige darf nicht weiter zur Mitwirkung gezwungen werden.</li>'))
    R.append(('<li>Aussagen, Unterlagen und Erkl\u00e4rungen k\u00f6nnen strafrechtlich verwertbar sein.</li>',
              f'<li data-i18n="{pfx2}.separation_li3">Aussagen, Unterlagen und Erkl\u00e4rungen k\u00f6nnen strafrechtlich verwertbar sein.</li>'))
    R.append(('<p>Die Pr\u00fcfung bewegt sich damit von einem verwaltungsrechtlichen Verfahren',
              f'<p data-i18n="{pfx2}.separation_p2">Die Pr\u00fcfung bewegt sich damit von einem verwaltungsrechtlichen Verfahren'))

    R.append(('spacing-xl);">Typische Ausl\u00f6ser f\u00fcr den \u00dcbergang ins Steuerstrafverfahren</h3>',
              f'spacing-xl);" data-i18n="{pfx2}.triggers_title">Typische Ausl\u00f6ser f\u00fcr den \u00dcbergang ins Steuerstrafverfahren</h3>'))
    R.append(('<p>In unserer Beratungspraxis erleben wir immer wieder',
              f'<p data-i18n="{pfx2}.triggers_p1">In unserer Beratungspraxis erleben wir immer wieder'))
    R.append(('<li>nicht erkl\u00e4rbare Abweichungen bei Richts\u00e4tzen oder Rohgewinnaufschl\u00e4gen</li>',
              f'<li data-i18n="{pfx2}.triggers_li1">nicht erkl\u00e4rbare Abweichungen bei Richts\u00e4tzen oder Rohgewinnaufschl\u00e4gen</li>'))
    R.append(('<li>formelle M\u00e4ngel in der Kassenf\u00fchrung mit materieller Bedeutung</li>',
              f'<li data-i18n="{pfx2}.triggers_li2">formelle M\u00e4ngel in der Kassenf\u00fchrung mit materieller Bedeutung</li>'))
    R.append(('<li>widerspr\u00fcchliche Aussagen von Unternehmern oder Mitarbeitern</li>',
              f'<li data-i18n="{pfx2}.triggers_li3">widerspr\u00fcchliche Aussagen von Unternehmern oder Mitarbeitern</li>'))
    R.append(('<li>fehlende oder nachtr\u00e4glich erstellte Unterlagen</li>',
              f'<li data-i18n="{pfx2}.triggers_li4">fehlende oder nachtr\u00e4glich erstellte Unterlagen</li>'))
    R.append(('<li>Zusch\u00e4tzungen in erheblichem Umfang</li>',
              f'<li data-i18n="{pfx2}.triggers_li5">Zusch\u00e4tzungen in erheblichem Umfang</li>'))
    R.append(('<li>Hinweise aus Kontrollmitteilungen oder Datenabgleichen</li>',
              f'<li data-i18n="{pfx2}.triggers_li6">Hinweise aus Kontrollmitteilungen oder Datenabgleichen</li>'))
    R.append(('<p><strong>Wichtig: Nicht jeder Fehler ist strafbar. Aber jede unbedachte Aussage kann den Anfangsverdacht',
              f'<p data-i18n="{pfx2}.triggers_warning"><strong>Wichtig: Nicht jeder Fehler ist strafbar. Aber jede unbedachte Aussage kann den Anfangsverdacht'))

    R.append(('spacing-xl);">Ab diesem Zeitpunkt gilt: Vorsicht bei Aussagen und Mitwirkung</h3>',
              f'spacing-xl);" data-i18n="{pfx2}.caution_title">Ab diesem Zeitpunkt gilt: Vorsicht bei Aussagen und Mitwirkung</h3>'))
    R.append(('<p>Ein h\u00e4ufiger',
              f'<p data-i18n="{pfx2}.caution_p1">Ein h\u00e4ufiger'))
    R.append(('<p>Tats\u00e4chlich gilt:</p>',
              f'<p data-i18n="{pfx2}.caution_p2">Tats\u00e4chlich gilt:</p>'))
    R.append(('<li>Was im Besteuerungsverfahren noch zul\u00e4ssig oder geboten war,</li>',
              f'<li data-i18n="{pfx2}.caution_li1">Was im Besteuerungsverfahren noch zul\u00e4ssig oder geboten war,</li>'))
    R.append(('<li>kann im Steuerstrafverfahren erhebliches Risiko bedeuten.</li>',
              f'<li data-i18n="{pfx2}.caution_li2">kann im Steuerstrafverfahren erhebliches Risiko bedeuten.</li>'))
    R.append(('<p>Hier entscheidet sich, ob:</p>',
              f'<p data-i18n="{pfx2}.caution_p3">Hier entscheidet sich, ob:</p>'))
    R.append(('<li>ein Sachverhalt steuerlich bereinigt wird oder</li>',
              f'<li data-i18n="{pfx2}.caution_li3">ein Sachverhalt steuerlich bereinigt wird oder</li>'))
    R.append(('<li>ein Ermittlungsverfahren mit Geldstrafe, Strafbefehl oder Anklage folgt.</li>',
              f'<li data-i18n="{pfx2}.caution_li4">ein Ermittlungsverfahren mit Geldstrafe, Strafbefehl oder Anklage folgt.</li>'))

    R.append(('spacing-xl);">Strategiewechsel im richtigen Moment</h3>',
              f'spacing-xl);" data-i18n="{pfx2}.strategy_title">Strategiewechsel im richtigen Moment</h3>'))
    R.append(('<p>Sobald sich Anzeichen f\u00fcr einen strafrechtlich relevanten Vorwurf ergeben',
              f'<p data-i18n="{pfx2}.strategy_p1">Sobald sich Anzeichen f\u00fcr einen strafrechtlich relevanten Vorwurf ergeben'))
    R.append(('<li>Trennung von Steuer- und Strafverteidigung</li>',
              f'<li data-i18n="{pfx2}.strategy_li1">Trennung von Steuer- und Strafverteidigung</li>'))
    R.append(('<li>rechtssichere Begrenzung der Mitwirkung</li>',
              f'<li data-i18n="{pfx2}.strategy_li2">rechtssichere Begrenzung der Mitwirkung</li>'))
    R.append(('<li>Pr\u00fcfung von Selbstanzeigeoptionen</li>',
              f'<li data-i18n="{pfx2}.strategy_li3">Pr\u00fcfung von Selbstanzeigeoptionen</li>'))
    R.append(('<li>strukturierte Kommunikation mit der Finanzverwaltung</li>',
              f'<li data-i18n="{pfx2}.strategy_li4">strukturierte Kommunikation mit der Finanzverwaltung</li>'))
    R.append(('<li>Schutz vor unzul\u00e4ssiger Beweisverwertung</li>',
              f'<li data-i18n="{pfx2}.strategy_li5">Schutz vor unzul\u00e4ssiger Beweisverwertung</li>'))
    R.append(('<p><strong>Dieser Moment ist kein Zeichen von Schuld, sondern Ausdruck professioneller Vorsorge.</strong></p>',
              f'<p data-i18n="{pfx2}.strategy_p2"><strong>Dieser Moment ist kein Zeichen von Schuld, sondern Ausdruck professioneller Vorsorge.</strong></p>'))

    R.append(('color: var(--color-primary);">Warum fr\u00fchzeitige Beratung entscheidend ist</h3>',
              f'color: var(--color-primary);" data-i18n="{pfx2}.advice_title">Warum fr\u00fchzeitige Beratung entscheidend ist</h3>'))
    R.append(('margin-bottom: 0;">Der \u00dcbergang von der Au\u00dfenpr\u00fcfung in das Steuerstrafverfahren erfolgt nicht immer offen',
              f'margin-bottom: 0;" data-i18n="{pfx2}.advice_p1">Der \u00dcbergang von der Au\u00dfenpr\u00fcfung in das Steuerstrafverfahren erfolgt nicht immer offen'))

    return R


def count_i18n(html, prefix):
    return html.count(f'data-i18n="{prefix}')


def main():
    print("=" * 70)
    print("Adding i18n translations to wissen-aussenpruefung.html")
    print("=" * 70)

    # Load translations from embedded JSON
    translations = json.loads(TRANSLATIONS_JSON)
    art1_de = translations["article1"]["de"]
    art1_en = translations["article1"]["en"]
    art1_tr = translations["article1"]["tr"]
    art2_de = translations["article2"]["de"]
    art2_en = translations["article2"]["en"]
    art2_tr = translations["article2"]["tr"]

    print(f"\n  Translation keys loaded:")
    print(f"    Article 1: {len(art1_de)} DE, {len(art1_en)} EN, {len(art1_tr)} TR")
    print(f"    Article 2: {len(art2_de)} DE, {len(art2_en)} EN, {len(art2_tr)} TR")
    print(f"    Total per language: {len(art1_de) + len(art2_de)}")

    # Step 1: Read HTML
    print("\n[1/5] Reading HTML file...")
    with open(HTML_FILE, "r", encoding="utf-8") as f:
        html = f.read()
    print(f"  Read {len(html)} characters")

    # Step 2: Apply HTML replacements
    print("\n[2/5] Adding data-i18n attributes to HTML...")
    replacements = build_html_replacements()
    print(f"  Total replacement patterns: {len(replacements)}")

    applied = 0
    warnings = []
    for old, new in replacements:
        if old in html:
            html = html.replace(old, new, 1)
            applied += 1
        else:
            warnings.append(old[:80])

    print(f"  Applied: {applied}/{len(replacements)}")
    if warnings:
        print(f"  WARNINGS ({len(warnings)} patterns not found):")
        for w in warnings:
            print(f"    - {w}...")

    # Write HTML
    with open(HTML_FILE, "w", encoding="utf-8") as f:
        f.write(html)

    art1_count = count_i18n(html, "knowledge.audit.article.")
    art2_count = count_i18n(html, "knowledge.audit.article2.")
    print(f"  data-i18n in HTML: article={art1_count}, article2={art2_count}")

    # Step 3: Update JSON files
    for label, path, a1, a2 in [
        ("de.json", DE_JSON, art1_de, art2_de),
        ("en.json", EN_JSON, art1_en, art2_en),
        ("tr.json", TR_JSON, art1_tr, art2_tr),
    ]:
        print(f"\n[3] Updating {label}...")
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)

        if "knowledge" not in data:
            data["knowledge"] = {}
        if "audit" not in data["knowledge"]:
            data["knowledge"]["audit"] = {}

        data["knowledge"]["audit"]["article"] = a1
        data["knowledge"]["audit"]["article2"] = a2

        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")

        print(f"  Added article: {len(a1)} keys, article2: {len(a2)} keys")

    # Step 4: Validate JSON files
    print("\n[4/5] Validating JSON files...")
    all_valid = True
    for path in [DE_JSON, EN_JSON, TR_JSON]:
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
            art = data.get("knowledge", {}).get("audit", {}).get("article", {})
            art2_v = data.get("knowledge", {}).get("audit", {}).get("article2", {})
            print(f"  OK: {os.path.basename(path)} - article: {len(art)} keys, article2: {len(art2_v)} keys")
        except json.JSONDecodeError as e:
            print(f"  ERROR: {os.path.basename(path)} - {e}")
            all_valid = False

    # Step 5: Key consistency
    print("\n[5/5] Checking key consistency...")
    de_keys_a1 = set(art1_de.keys())
    en_keys_a1 = set(art1_en.keys())
    tr_keys_a1 = set(art1_tr.keys())
    de_keys_a2 = set(art2_de.keys())
    en_keys_a2 = set(art2_en.keys())
    tr_keys_a2 = set(art2_tr.keys())

    if de_keys_a1 == en_keys_a1 == tr_keys_a1:
        print(f"  Article 1: All 3 languages have identical keys ({len(de_keys_a1)})")
    else:
        print("  Article 1: KEY MISMATCH!")
        all_valid = False

    if de_keys_a2 == en_keys_a2 == tr_keys_a2:
        print(f"  Article 2: All 3 languages have identical keys ({len(de_keys_a2)})")
    else:
        print("  Article 2: KEY MISMATCH!")
        all_valid = False

    print("\n" + "=" * 70)
    if all_valid and not warnings:
        print("SUCCESS: All i18n translations added and validated!")
    elif all_valid:
        print(f"COMPLETED with {len(warnings)} HTML pattern warnings (see above)")
    else:
        print("COMPLETED WITH ERRORS - check output above")
        sys.exit(1)
    print(f"  HTML: {applied} data-i18n attributes added")
    print(f"  Article 1: {len(art1_de)} keys per language")
    print(f"  Article 2: {len(art2_de)} keys per language")
    print(f"  Total: {len(art1_de) + len(art2_de)} keys x 3 languages = {(len(art1_de) + len(art2_de)) * 3} translations")
    print("=" * 70)


if __name__ == "__main__":
    main()
