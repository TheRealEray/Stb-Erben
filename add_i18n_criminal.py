#!/usr/bin/env python3
"""
Add i18n translation attributes to wissen-steuerstrafrecht.html article content
and update all 3 JSON translation files (de.json, en.json, tr.json).

Run from: /Users/eray/Desktop/Claude Code/steuerkanzlei-erben/
"""

import json
import re
import os

# ─── Configuration ───────────────────────────────────────────────────────────

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HTML_FILE = os.path.join(BASE_DIR, "wissen-steuerstrafrecht.html")
DE_JSON = os.path.join(BASE_DIR, "assets", "translations", "de.json")
EN_JSON = os.path.join(BASE_DIR, "assets", "translations", "en.json")
TR_JSON = os.path.join(BASE_DIR, "assets", "translations", "tr.json")

KEY_PREFIX = "knowledge.criminal.article"

# ─── Translation Definitions ─────────────────────────────────────────────────
# Each entry: (i18n_key_suffix, de_text, en_text, tr_text)
# These map to the sequential elements in the <article> between lines 207-334

TRANSLATIONS = [
    # ── Section 1: Wie wird ein Steuerstrafverfahren eingeleitet? ──
    ("s1_title",
     "1. Wie wird ein Steuerstrafverfahren eingeleitet?",
     "1. How Is a Tax Criminal Investigation Initiated?",
     "1. Vergi Ceza Soruşturması Nasıl Başlatılır?"),

    ("s1_p1",
     "Ein Steuerstrafverfahren wird eingeleitet, sobald zureichende tatsächliche Anhaltspunkte für eine Steuerstraftat vorliegen. Es genügt bereits ein Anfangsverdacht – ein Beweis ist zu diesem Zeitpunkt noch nicht erforderlich.",
     "Tax criminal proceedings are initiated as soon as there are sufficient factual indications of a tax offence. An initial suspicion is enough – proof is not yet required at this stage.",
     "Bir vergi suçuna ilişkin yeterli fiili göstergeler bulunduğunda vergi ceza davası başlatılır. Başlangıç şüphesi yeterlidir – bu aşamada henüz kanıt gerekli değildir."),

    ("s1_p2",
     "Die Einleitung kann auf unterschiedlichen Wegen erfolgen, etwa durch:",
     "The initiation can occur through various channels, for example:",
     "Soruşturma çeşitli yollarla başlatılabilir, örneğin:"),

    ("s1_li1",
     "Kontrollmitteilungen",
     "Control notifications",
     "Kontrol bildirimleri"),

    ("s1_li2",
     "Datenabgleiche",
     "Data matching",
     "Veri eşleştirmeleri"),

    ("s1_li3",
     "Anzeigen Dritter",
     "Reports by third parties",
     "Üçüncü kişilerin ihbarları"),

    ("s1_li4",
     "Mitteilungen anderer Behörden",
     "Notifications from other authorities",
     "Diğer makamlardan gelen bildirimler"),

    ("s1_li5",
     "Auswertungen von Banken, Plattformen oder Auslandsdaten",
     "Analysis of bank, platform or foreign data",
     "Banka, platform veya yurtdışı verilerinin değerlendirilmesi"),

    ("s1_li6",
     "Erkenntnisse aus anderen Verfahren",
     "Findings from other proceedings",
     "Diğer davalardan elde edilen bulgular"),

    ("s1_p3",
     "<strong>Wichtig:</strong> Der Betroffene erfährt hiervon oft erst sehr spät oder zufällig.",
     "<strong>Important:</strong> The affected person often only learns about this very late or by chance.",
     "<strong>Önemli:</strong> İlgili kişi bunu çoğu zaman çok geç veya tesadüfen öğrenir."),

    # ── Section 2: Besuch der Beamten ──
    ("s2_title",
     "2. Besuch der Beamten – unangekündigt oder mit Schreiben?",
     "2. Visit by Officials – Unannounced or by Letter?",
     "2. Memurların Ziyareti – Habersiz mi Yazılı mı?"),

    ("s2_h4a",
     "Unangekündigter Besuch",
     "Unannounced Visit",
     "Habersiz Ziyaret"),

    ("s2_p1",
     "In der Praxis kommt es häufig vor, dass Beamte:",
     "In practice, it is common for officials to:",
     "Uygulamada memurların şu şekilde davranması sıkça görülür:"),

    ("s2_li1",
     "unangekündigt erscheinen,",
     "appear unannounced,",
     "habersiz gelmek,"),

    ("s2_li2",
     '„nur kurz sprechen möchten",',
     '"just want to talk briefly",',
     '"sadece kısa bir konuşma yapmak istemek",'),

    ("s2_li3",
     "Fragen stellen oder Unterlagen sehen wollen.",
     "ask questions or want to see documents.",
     "soru sormak veya belgeleri görmek istemek."),

    ("s2_p2",
     "<strong>Dieser Besuch dient nicht der Information, sondern regelmäßig der Erkenntnisgewinnung.</strong> Auch scheinbar harmlose Gespräche können später als belastende Aussagen gewertet werden.",
     "<strong>This visit does not serve informational purposes, but regularly serves to gather evidence.</strong> Even seemingly harmless conversations can later be used as incriminating statements.",
     "<strong>Bu ziyaret bilgilendirme amacı taşımaz, düzenli olarak delil toplama amacına hizmet eder.</strong> Görünüşte zararsız konuşmalar bile daha sonra suçlayıcı ifadeler olarak değerlendirilebilir."),

    ("s2_h4b",
     "Einleitungsschreiben / Belehrung",
     "Initiation Letter / Instruction of Rights",
     "Başlatma Yazısı / Hak Bildirimi"),

    ("s2_p3",
     "Alternativ oder ergänzend erhält der Betroffene:",
     "Alternatively or additionally, the affected person receives:",
     "Alternatif olarak veya ek olarak ilgili kişi şunları alır:"),

    ("s2_li4",
     "ein Schreiben über die Einleitung des Steuerstrafverfahrens,",
     "a letter regarding the initiation of tax criminal proceedings,",
     "vergi ceza davasının başlatılmasına ilişkin bir yazı,"),

    ("s2_li5",
     "eine formelle Beschuldigtenbelehrung,",
     "a formal instruction of rights for the accused,",
     "şüpheliye yönelik resmi hak bildirimi,"),

    ("s2_li6",
     "ggf. eine Vorladung zur Vernehmung.",
     "possibly a summons for interrogation.",
     "gerektiğinde ifade için celp."),

    ("s2_p4",
     "Spätestens ab diesem Moment befindet sich der Betroffene offiziell im Strafverfahren.",
     "From this moment at the latest, the affected person is officially subject to criminal proceedings.",
     "En geç bu andan itibaren ilgili kişi resmi olarak ceza davası kapsamındadır."),

    # ── Section 3: Häufigste Fehler ──
    ("s3_title",
     "3. Die häufigsten Fehler in dieser Phase",
     "3. The Most Common Mistakes in This Phase",
     "3. Bu Aşamadaki En Sık Yapılan Hatalar"),

    ("s3_p1",
     'Viele Beschuldigte handeln aus Unsicherheit oder dem Wunsch heraus, „alles richtigzustellen". Typische Fehler sind:',
     'Many suspects act out of uncertainty or the desire to "set everything right". Typical mistakes are:',
     'Birçok şüpheli belirsizlikten veya "her şeyi düzeltme" isteğinden hareket eder. Tipik hatalar şunlardır:'),

    ("s3_li1",
     "vorschnelle Erklärungen oder Rechtfertigungen",
     "hasty explanations or justifications",
     "acele açıklamalar veya gerekçeler"),

    ("s3_li2",
     "freiwillige Herausgabe von Unterlagen",
     "voluntary surrender of documents",
     "belgelerin gönüllü olarak teslim edilmesi"),

    ("s3_li3",
     'Gespräche „unter vier Augen" mit Ermittlern',
     '"private" conversations with investigators',
     'soruşturmacılarla "baş başa" konuşmalar'),

    ("s3_li4",
     "Vermischung von steuerlicher Kooperation und strafrechtlicher Verteidigung",
     "mixing tax cooperation with criminal defence",
     "vergisel işbirliği ile cezai savunmanın karıştırılması"),

    ("s3_li5",
     "der Versuch, Missverständnisse spontan aufzuklären",
     "attempting to spontaneously clear up misunderstandings",
     "yanlış anlaşılmaları kendiliğinden çözme girişimi"),

    ("s3_p2",
     "<strong>Diese Fehler sind menschlich – aber vermeidbar.</strong>",
     "<strong>These mistakes are human – but avoidable.</strong>",
     "<strong>Bu hatalar insani – ama önlenebilir.</strong>"),

    # ── Section 4: Richtiges Verhalten ──
    ("s4_title",
     "4. Wie sollten sich Beschuldigte richtig verhalten?",
     "4. How Should Suspects Behave Correctly?",
     "4. Şüpheliler Nasıl Doğru Davranmalıdır?"),

    ("s4_h4a",
     "4.1 Ruhe bewahren",
     "4.1 Stay Calm",
     "4.1 Sakin Kalın"),

    ("s4_p1",
     "Ein Ermittlungsverfahren bedeutet keine Vorverurteilung. Panik führt fast immer zu falschen Entscheidungen.",
     "An investigation does not mean prejudgment. Panic almost always leads to wrong decisions.",
     "Bir soruşturma önyargı anlamına gelmez. Panik neredeyse her zaman yanlış kararlara yol açar."),

    ("s4_h4b",
     "4.2 Keine Aussagen zur Sache",
     "4.2 No Statements on the Matter",
     "4.2 Konuyla İlgili İfade Vermeyiniz"),

    ("s4_p2",
     "Beschuldigte haben das Recht zu schweigen. Dieses Schweigerecht ist kein Schuldeingeständnis, sondern ein zentrales Verteidigungsrecht. Aussagen ohne vollständige Aktenkenntnis sind fast immer nachteilig.",
     "Suspects have the right to remain silent. This right to silence is not an admission of guilt, but a fundamental right of defence. Statements without full knowledge of the case file are almost always disadvantageous.",
     "Şüphelilerin susma hakkı vardır. Bu susma hakkı bir suç kabulü değil, temel bir savunma hakkıdır. Dosya hakkında tam bilgi sahibi olmadan verilen ifadeler neredeyse her zaman aleyhe sonuçlar doğurur."),

    ("s4_h4c",
     "4.3 Keine freiwillige Herausgabe von Unterlagen",
     "4.3 No Voluntary Surrender of Documents",
     "4.3 Belgeleri Gönüllü Olarak Teslim Etmeyiniz"),

    ("s4_p3",
     "Unterlagen sollten nicht freiwillig herausgegeben werden. Es ist zu klären:",
     "Documents should not be surrendered voluntarily. The following must be clarified:",
     "Belgeler gönüllü olarak teslim edilmemelidir. Şunların açıklığa kavuşturulması gerekir:"),

    ("s4_li1",
     "welche Unterlagen verlangt werden,",
     "which documents are being requested,",
     "hangi belgelerin talep edildiği,"),

    ("s4_li2",
     "in welchem Umfang,",
     "to what extent,",
     "ne kapsamda,"),

    ("s4_li3",
     "auf welcher Rechtsgrundlage.",
     "on what legal basis.",
     "hangi hukuki dayanakla."),

    ("s4_h4d",
     "4.4 Keine informellen Gespräche",
     "4.4 No Informal Conversations",
     "4.4 Gayriresmi Görüşme Yapmayınız"),

    ("s4_p4",
     'Auch Gespräche „außerhalb der Vernehmung" können verwertet werden. Es gibt keine unverbindlichen Gespräche im Strafverfahren.',
     '"Off-the-record" conversations can also be used as evidence. There are no non-binding conversations in criminal proceedings.',
     '"Sorgu dışı" konuşmalar da delil olarak kullanılabilir. Ceza davasında bağlayıcı olmayan konuşma diye bir şey yoktur.'),

    ("s4_h4e",
     "4.5 Frühzeitige rechtliche Beratung",
     "4.5 Early Legal Advice",
     "4.5 Erken Hukuki Danışmanlık"),

    ("s4_p5",
     "Je früher eine strukturierte Verteidigung beginnt, desto größer sind:",
     "The earlier a structured defence begins, the greater are:",
     "Yapılandırılmış savunma ne kadar erken başlarsa, o kadar büyük olur:"),

    ("s4_li4",
     "die Einflussmöglichkeiten,",
     "the opportunities for influence,",
     "etki olanakları,"),

    ("s4_li5",
     "die Gestaltungsspielräume,",
     "the room for manoeuvre,",
     "hareket alanları,"),

    ("s4_li6",
     "die Chancen auf Verfahrensbegrenzung oder Einstellung.",
     "the chances of limiting or discontinuing the proceedings.",
     "davanın sınırlandırılması veya düşürülmesi şansları."),

    # ── Section 5: Steuerstrafverfahren ≠ Steuerverfahren ──
    ("s5_title",
     "5. Steuerstrafverfahren ≠ Steuerverfahren",
     "5. Tax Criminal Proceedings ≠ Tax Proceedings",
     "5. Vergi Ceza Davası ≠ Vergi Davası"),

    ("s5_p1",
     "Ein zentraler Irrtum besteht darin, das Steuerstrafverfahren wie ein normales Steuerverfahren zu behandeln.",
     "A central misconception is to treat tax criminal proceedings like ordinary tax proceedings.",
     "Yaygın bir yanılgı, vergi ceza davasını sıradan bir vergi davası gibi ele almaktır."),

    ("s5_p2",
     "<strong>Der entscheidende Unterschied:</strong>",
     "<strong>The decisive difference:</strong>",
     "<strong>Belirleyici fark:</strong>"),

    ("s5_li1",
     "Im Steuerverfahren geht es um Festsetzung von Steuern",
     "Tax proceedings concern the assessment of taxes",
     "Vergi davası vergilerin tahakkuku ile ilgilidir"),

    ("s5_li2",
     "Im Strafverfahren geht es um persönliche Schuld, Sanktionen und Strafe",
     "Criminal proceedings concern personal guilt, sanctions and punishment",
     "Ceza davası kişisel suçluluk, yaptırımlar ve ceza ile ilgilidir"),

    ("s5_p3",
     'Was steuerlich „bereinigt" werden kann, ist strafrechtlich oft nicht mehr rückgängig zu machen.',
     'What can be "corrected" for tax purposes is often no longer reversible under criminal law.',
     'Vergisel olarak "düzeltilebilen" şeyler, ceza hukuku açısından çoğu zaman artık geri alınamaz.'),

    # ── Section 6: Früher Zeitpunkt entscheidend ──
    ("s6_title",
     "6. Warum der frühe Zeitpunkt entscheidend ist",
     "6. Why Early Timing Is Decisive",
     "6. Erken Zamanlama Neden Belirleyicidir"),

    ("s6_p1",
     "Die ersten Stunden und Tage nach der Einleitung eines Strafverfahrens sind häufig verfahrensprägend. In dieser Phase entscheidet sich:",
     "The first hours and days after the initiation of criminal proceedings often shape the entire case. In this phase, the following is determined:",
     "Ceza davasının başlatılmasından sonraki ilk saatler ve günler çoğunlukla davanın seyrini belirler. Bu aşamada şunlar kararlaştırılır:"),

    ("s6_li1",
     "ob Aussagen den Akteninhalt bestimmen,",
     "whether statements determine the content of the case file,",
     "ifadelerin dosya içeriğini belirleyip belirlemediği,"),

    ("s6_li2",
     "ob Verteidigungsoptionen offenbleiben,",
     "whether defence options remain open,",
     "savunma seçeneklerinin açık kalıp kalmadığı,"),

    ("s6_li3",
     "ob Selbstanzeige- oder Korrekturmöglichkeiten noch bestehen,",
     "whether voluntary disclosure or correction options still exist,",
     "gönüllü bildirim veya düzeltme olanaklarının hâlâ mevcut olup olmadığı,"),

    ("s6_li4",
     "ob das Verfahren eskaliert oder eingegrenzt wird.",
     "whether the proceedings escalate or are contained.",
     "davanın tırmanıp tırmanmadığı veya sınırlandırılıp sınırlandırılmadığı."),

    ("s6_p2",
     "<strong>Viele Verfahren werden nicht wegen der Tat, sondern wegen ungeschickten Verhaltens problematisch.</strong>",
     "<strong>Many cases become problematic not because of the offence, but because of clumsy conduct.</strong>",
     "<strong>Birçok dava suç nedeniyle değil, beceriksiz davranış nedeniyle sorunlu hale gelir.</strong>"),

    # ── Section 7: Selbstanzeige und steuerliche Berichtigung ──
    ("s7_title",
     "7. Selbstanzeige und steuerliche Berichtigung – Chancen und Grenzen",
     "7. Voluntary Disclosure and Tax Correction – Opportunities and Limits",
     "7. Gönüllü Bildirim ve Vergisel Düzeltme – Fırsatlar ve Sınırlar"),

    ("s7_h4a",
     "7.1 Berichtigungspflicht (§ 153 AO)",
     "7.1 Obligation to Correct (Section 153 AO)",
     "7.1 Düzeltme Yükümlülüğü (§ 153 AO)"),

    ("s7_p1",
     "Wer erkennt, dass eine Steuererklärung objektiv unrichtig oder unvollständig ist, ist zur Berichtigung verpflichtet. Unterbleibt diese, kann sich hieraus der strafrechtliche Vorwurf entwickeln.",
     "Anyone who recognises that a tax return is objectively incorrect or incomplete is obliged to make a correction. If this is omitted, criminal charges may develop from it.",
     "Vergi beyannamesinin objektif olarak yanlış veya eksik olduğunu fark eden kişi düzeltme yapmakla yükümlüdür. Bu yapılmazsa, bundan cezai suçlama gelişebilir."),

    ("s7_h4b",
     "7.2 Strafbefreiende Selbstanzeige (§ 371 AO)",
     "7.2 Penalty-Exempting Voluntary Disclosure (Section 371 AO)",
     "7.2 Cezadan Muaf Tutan Gönüllü Bildirim (§ 371 AO)"),

    ("s7_p2",
     "Eine wirksame Selbstanzeige kann zur Straffreiheit führen – jedoch nur, wenn:",
     "An effective voluntary disclosure can lead to exemption from punishment – but only if:",
     "Etkili bir gönüllü bildirim cezadan muafiyete yol açabilir – ancak yalnızca şu koşullarda:"),

    ("s7_li1",
     "unrichtige Angaben berichtigt und unterlassene Angaben nachgeholt werden,",
     "incorrect information is corrected and omitted information is subsequently provided,",
     "yanlış bilgiler düzeltilir ve eksik bilgiler sonradan tamamlanırsa,"),

    ("s7_li2",
     "rechtzeitig erfolgt,",
     "it is made in a timely manner,",
     "zamanında yapılırsa,"),

    ("s7_li3",
     "keine Sperrgründe vorliegen (z. B. Tatentdeckung).",
     "no blocking reasons exist (e.g., discovery of the offence).",
     "engel nedenler bulunmuyorsa (örn. suçun tespit edilmesi)."),

    ("s7_p3",
     "Die Anforderungen sind hoch, formelle Fehler können zur Unwirksamkeit führen.",
     "The requirements are high; formal errors can render the disclosure ineffective.",
     "Gereksinimler yüksektir; biçimsel hatalar bildirimin geçersizliğine yol açabilir."),

    ("s7_h4c",
     "7.3 Keine Schnellschüsse",
     "7.3 No Hasty Actions",
     "7.3 Acele Kararlardan Kaçının"),

    ("s7_p4",
     "Unkoordinierte oder unvollständige Selbstanzeigen gehören zu den häufigsten Verteidigungsfehlern. Gerade bei komplexen Sachverhalten ist eine strategische Vorbereitung zwingend erforderlich.",
     "Uncoordinated or incomplete voluntary disclosures are among the most common defence errors. Especially in complex cases, strategic preparation is absolutely essential.",
     "Koordinasyonsuz veya eksik gönüllü bildirimler en yaygın savunma hatalarındandır. Özellikle karmaşık durumlarda stratejik hazırlık kesinlikle zorunludur."),

    # ── Section 8: Schätzung im Steuerstrafverfahren ──
    ("s8_title",
     "8. Schätzung im Steuerstrafverfahren",
     "8. Estimation in Tax Criminal Proceedings",
     "8. Vergi Ceza Davasında Tahmin (Takdir)"),

    ("s8_p1",
     "Auch im Steuerstrafverfahren sind Schätzungen grundsätzlich zulässig. Allerdings gilt:",
     "Estimations are generally permissible in tax criminal proceedings as well. However, the following applies:",
     "Vergi ceza davasında da tahminler prensipte kabul edilebilir. Ancak şu kurallar geçerlidir:"),

    ("s8_li1",
     "Die Verwirklichung des Tatbestandes (§ 370 AO) muss zur richterlichen Überzeugung feststehen, das Ausmaß jedoch ist ungewiss,",
     "The fulfilment of the offence elements (Section 370 AO) must be established to the judge's conviction, although the extent may be uncertain,",
     "Suç unsurlarının gerçekleşmesi (§ 370 AO) yargıcın kanaatine göre sabit olmalıdır, ancak boyutu belirsiz olabilir,"),

    ("s8_li2",
     "die konkrete Höhe der Steuerverkürzung darf geschätzt werden,",
     "the specific amount of tax evasion may be estimated,",
     "vergi kaçırmanın somut miktarı tahmin edilebilir,"),

    ("s8_li3",
     "Schätzungen müssen realistisch, schlüssig und plausibel sein.",
     "estimations must be realistic, consistent and plausible.",
     "tahminler gerçekçi, tutarlı ve makul olmalıdır."),

    ("s8_p2",
     "Der Bundesgerichtshof bestätigt die Zulässigkeit von Schätzungen, setzt ihnen jedoch klare Grenzen.",
     "The Federal Court of Justice confirms the admissibility of estimations, but sets clear limits for them.",
     "Federal Yüksek Mahkeme tahminlerin kabul edilebilirliğini onaylar, ancak bunlara net sınırlar koyar."),

    # ── Section 9: Unser Ansatz (inside .card div) ──
    ("s9_title",
     "9. Unser Ansatz: Struktur statt Aktionismus",
     "9. Our Approach: Structure Instead of Knee-Jerk Reactions",
     "9. Yaklaşımımız: Panik Yerine Yapı"),

    ("s9_p1",
     "Wir begleiten Mandanten ab dem ersten Kontakt mit Ermittlungsbehörden. Unser Fokus liegt auf:",
     "We accompany clients from the first contact with investigative authorities. Our focus is on:",
     "Müvekkillerimize soruşturma makamlarıyla ilk temastan itibaren eşlik ediyoruz. Odak noktamız:"),

    ("s9_li1",
     "sofortiger rechtlicher Einordnung der Situation,",
     "immediate legal assessment of the situation,",
     "durumun derhal hukuki değerlendirmesi,"),

    ("s9_li2",
     "klarer Kommunikationsstrategie,",
     "clear communication strategy,",
     "net iletişim stratejisi,"),

    ("s9_li3",
     "Schutz vor unzulässiger Beweisverwertung,",
     "protection against inadmissible use of evidence,",
     "hukuka aykırı delil kullanımına karşı koruma,"),

    ("s9_li4",
     "frühzeitiger Einflussnahme auf den Verfahrensverlauf.",
     "early influence on the course of proceedings.",
     "dava sürecine erken aşamada etki."),

    ("s9_p2",
     "Ziel ist nicht Eskalation, sondern Kontrolle, Begrenzung und rechtssichere Lösung.",
     "The goal is not escalation, but control, containment and a legally sound solution.",
     "Amaç tırmanma değil, kontrol, sınırlama ve hukuki açıdan güvenli çözümdür."),
]

# ─── HTML Replacement Map ─────────────────────────────────────────────────────
# Maps: (old_html_substring, new_html_with_i18n_attr)
# We match the exact HTML line content and inject the data-i18n attribute.

HTML_REPLACEMENTS = [
    # s1_title
    ('<h3>1. Wie wird ein Steuerstrafverfahren eingeleitet?</h3>',
     '<h3 data-i18n="knowledge.criminal.article.s1_title">1. Wie wird ein Steuerstrafverfahren eingeleitet?</h3>'),

    # s1_p1
    ('<p>Ein Steuerstrafverfahren wird eingeleitet, sobald zureichende tatsächliche Anhaltspunkte für eine Steuerstraftat vorliegen. Es genügt bereits ein Anfangsverdacht – ein Beweis ist zu diesem Zeitpunkt noch nicht erforderlich.</p>',
     '<p data-i18n="knowledge.criminal.article.s1_p1">Ein Steuerstrafverfahren wird eingeleitet, sobald zureichende tatsächliche Anhaltspunkte für eine Steuerstraftat vorliegen. Es genügt bereits ein Anfangsverdacht – ein Beweis ist zu diesem Zeitpunkt noch nicht erforderlich.</p>'),

    # s1_p2
    ('<p>Die Einleitung kann auf unterschiedlichen Wegen erfolgen, etwa durch:</p>',
     '<p data-i18n="knowledge.criminal.article.s1_p2">Die Einleitung kann auf unterschiedlichen Wegen erfolgen, etwa durch:</p>'),

    # s1_li1 through s1_li6
    ('<li>Kontrollmitteilungen</li>',
     '<li data-i18n="knowledge.criminal.article.s1_li1">Kontrollmitteilungen</li>'),

    ('<li>Datenabgleiche</li>',
     '<li data-i18n="knowledge.criminal.article.s1_li2">Datenabgleiche</li>'),

    ('<li>Anzeigen Dritter</li>',
     '<li data-i18n="knowledge.criminal.article.s1_li3">Anzeigen Dritter</li>'),

    ('<li>Mitteilungen anderer Behörden</li>',
     '<li data-i18n="knowledge.criminal.article.s1_li4">Mitteilungen anderer Behörden</li>'),

    ('<li>Auswertungen von Banken, Plattformen oder Auslandsdaten</li>',
     '<li data-i18n="knowledge.criminal.article.s1_li5">Auswertungen von Banken, Plattformen oder Auslandsdaten</li>'),

    ('<li>Erkenntnisse aus anderen Verfahren</li>',
     '<li data-i18n="knowledge.criminal.article.s1_li6">Erkenntnisse aus anderen Verfahren</li>'),

    # s1_p3 (contains <strong>)
    ('<p><strong>Wichtig:</strong> Der Betroffene erfährt hiervon oft erst sehr spät oder zufällig.</p>',
     '<p data-i18n="[html]knowledge.criminal.article.s1_p3"><strong>Wichtig:</strong> Der Betroffene erfährt hiervon oft erst sehr spät oder zufällig.</p>'),

    # s2_title
    ('<h3 style="margin-top: var(--spacing-xl);">2. Besuch der Beamten – unangekündigt oder mit Schreiben?</h3>',
     '<h3 style="margin-top: var(--spacing-xl);" data-i18n="knowledge.criminal.article.s2_title">2. Besuch der Beamten – unangekündigt oder mit Schreiben?</h3>'),

    # s2_h4a
    ('<h4>Unangekündigter Besuch</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s2_h4a">Unangekündigter Besuch</h4>'),

    # s2_p1
    ('<p>In der Praxis kommt es häufig vor, dass Beamte:</p>',
     '<p data-i18n="knowledge.criminal.article.s2_p1">In der Praxis kommt es häufig vor, dass Beamte:</p>'),

    # s2_li1 through s2_li3
    ('<li>unangekündigt erscheinen,</li>',
     '<li data-i18n="knowledge.criminal.article.s2_li1">unangekündigt erscheinen,</li>'),

    ('<li>„nur kurz sprechen möchten",</li>',
     '<li data-i18n="knowledge.criminal.article.s2_li2">„nur kurz sprechen möchten",</li>'),

    ('<li>Fragen stellen oder Unterlagen sehen wollen.</li>',
     '<li data-i18n="knowledge.criminal.article.s2_li3">Fragen stellen oder Unterlagen sehen wollen.</li>'),

    # s2_p2 (contains <strong>)
    ('<p><strong>Dieser Besuch dient nicht der Information, sondern regelmäßig der Erkenntnisgewinnung.</strong> Auch scheinbar harmlose Gespräche können später als belastende Aussagen gewertet werden.</p>',
     '<p data-i18n="[html]knowledge.criminal.article.s2_p2"><strong>Dieser Besuch dient nicht der Information, sondern regelmäßig der Erkenntnisgewinnung.</strong> Auch scheinbar harmlose Gespräche können später als belastende Aussagen gewertet werden.</p>'),

    # s2_h4b
    ('<h4>Einleitungsschreiben / Belehrung</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s2_h4b">Einleitungsschreiben / Belehrung</h4>'),

    # s2_p3
    ('<p>Alternativ oder ergänzend erhält der Betroffene:</p>',
     '<p data-i18n="knowledge.criminal.article.s2_p3">Alternativ oder ergänzend erhält der Betroffene:</p>'),

    # s2_li4 through s2_li6
    ('<li>ein Schreiben über die Einleitung des Steuerstrafverfahrens,</li>',
     '<li data-i18n="knowledge.criminal.article.s2_li4">ein Schreiben über die Einleitung des Steuerstrafverfahrens,</li>'),

    ('<li>eine formelle Beschuldigtenbelehrung,</li>',
     '<li data-i18n="knowledge.criminal.article.s2_li5">eine formelle Beschuldigtenbelehrung,</li>'),

    ('<li>ggf. eine Vorladung zur Vernehmung.</li>',
     '<li data-i18n="knowledge.criminal.article.s2_li6">ggf. eine Vorladung zur Vernehmung.</li>'),

    # s2_p4
    ('<p>Spätestens ab diesem Moment befindet sich der Betroffene offiziell im Strafverfahren.</p>',
     '<p data-i18n="knowledge.criminal.article.s2_p4">Spätestens ab diesem Moment befindet sich der Betroffene offiziell im Strafverfahren.</p>'),

    # s3_title
    ('<h3 style="margin-top: var(--spacing-xl);">3. Die häufigsten Fehler in dieser Phase</h3>',
     '<h3 style="margin-top: var(--spacing-xl);" data-i18n="knowledge.criminal.article.s3_title">3. Die häufigsten Fehler in dieser Phase</h3>'),

    # s3_p1
    ('<p>Viele Beschuldigte handeln aus Unsicherheit oder dem Wunsch heraus, „alles richtigzustellen". Typische Fehler sind:</p>',
     '<p data-i18n="knowledge.criminal.article.s3_p1">Viele Beschuldigte handeln aus Unsicherheit oder dem Wunsch heraus, „alles richtigzustellen". Typische Fehler sind:</p>'),

    # s3_li1 through s3_li5
    ('<li>vorschnelle Erklärungen oder Rechtfertigungen</li>',
     '<li data-i18n="knowledge.criminal.article.s3_li1">vorschnelle Erklärungen oder Rechtfertigungen</li>'),

    ('<li>freiwillige Herausgabe von Unterlagen</li>',
     '<li data-i18n="knowledge.criminal.article.s3_li2">freiwillige Herausgabe von Unterlagen</li>'),

    ('<li>Gespräche „unter vier Augen" mit Ermittlern</li>',
     '<li data-i18n="knowledge.criminal.article.s3_li3">Gespräche „unter vier Augen" mit Ermittlern</li>'),

    ('<li>Vermischung von steuerlicher Kooperation und strafrechtlicher Verteidigung</li>',
     '<li data-i18n="knowledge.criminal.article.s3_li4">Vermischung von steuerlicher Kooperation und strafrechtlicher Verteidigung</li>'),

    ('<li>der Versuch, Missverständnisse spontan aufzuklären</li>',
     '<li data-i18n="knowledge.criminal.article.s3_li5">der Versuch, Missverständnisse spontan aufzuklären</li>'),

    # s3_p2 (contains <strong>)
    ('<p><strong>Diese Fehler sind menschlich – aber vermeidbar.</strong></p>',
     '<p data-i18n="[html]knowledge.criminal.article.s3_p2"><strong>Diese Fehler sind menschlich – aber vermeidbar.</strong></p>'),

    # s4_title
    ('<h3 style="margin-top: var(--spacing-xl);">4. Wie sollten sich Beschuldigte richtig verhalten?</h3>',
     '<h3 style="margin-top: var(--spacing-xl);" data-i18n="knowledge.criminal.article.s4_title">4. Wie sollten sich Beschuldigte richtig verhalten?</h3>'),

    # s4_h4a
    ('<h4>4.1 Ruhe bewahren</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s4_h4a">4.1 Ruhe bewahren</h4>'),

    # s4_p1
    ('<p>Ein Ermittlungsverfahren bedeutet keine Vorverurteilung. Panik führt fast immer zu falschen Entscheidungen.</p>',
     '<p data-i18n="knowledge.criminal.article.s4_p1">Ein Ermittlungsverfahren bedeutet keine Vorverurteilung. Panik führt fast immer zu falschen Entscheidungen.</p>'),

    # s4_h4b
    ('<h4>4.2 Keine Aussagen zur Sache</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s4_h4b">4.2 Keine Aussagen zur Sache</h4>'),

    # s4_p2
    ('<p>Beschuldigte haben das Recht zu schweigen. Dieses Schweigerecht ist kein Schuldeingeständnis, sondern ein zentrales Verteidigungsrecht. Aussagen ohne vollständige Aktenkenntnis sind fast immer nachteilig.</p>',
     '<p data-i18n="knowledge.criminal.article.s4_p2">Beschuldigte haben das Recht zu schweigen. Dieses Schweigerecht ist kein Schuldeingeständnis, sondern ein zentrales Verteidigungsrecht. Aussagen ohne vollständige Aktenkenntnis sind fast immer nachteilig.</p>'),

    # s4_h4c
    ('<h4>4.3 Keine freiwillige Herausgabe von Unterlagen</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s4_h4c">4.3 Keine freiwillige Herausgabe von Unterlagen</h4>'),

    # s4_p3
    ('<p>Unterlagen sollten nicht freiwillig herausgegeben werden. Es ist zu klären:</p>',
     '<p data-i18n="knowledge.criminal.article.s4_p3">Unterlagen sollten nicht freiwillig herausgegeben werden. Es ist zu klären:</p>'),

    # s4_li1 through s4_li3
    ('<li>welche Unterlagen verlangt werden,</li>',
     '<li data-i18n="knowledge.criminal.article.s4_li1">welche Unterlagen verlangt werden,</li>'),

    ('<li>in welchem Umfang,</li>',
     '<li data-i18n="knowledge.criminal.article.s4_li2">in welchem Umfang,</li>'),

    ('<li>auf welcher Rechtsgrundlage.</li>',
     '<li data-i18n="knowledge.criminal.article.s4_li3">auf welcher Rechtsgrundlage.</li>'),

    # s4_h4d
    ('<h4>4.4 Keine informellen Gespräche</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s4_h4d">4.4 Keine informellen Gespräche</h4>'),

    # s4_p4
    ('<p>Auch Gespräche „außerhalb der Vernehmung" können verwertet werden. Es gibt keine unverbindlichen Gespräche im Strafverfahren.</p>',
     '<p data-i18n="knowledge.criminal.article.s4_p4">Auch Gespräche „außerhalb der Vernehmung" können verwertet werden. Es gibt keine unverbindlichen Gespräche im Strafverfahren.</p>'),

    # s4_h4e
    ('<h4>4.5 Frühzeitige rechtliche Beratung</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s4_h4e">4.5 Frühzeitige rechtliche Beratung</h4>'),

    # s4_p5
    ('<p>Je früher eine strukturierte Verteidigung beginnt, desto größer sind:</p>',
     '<p data-i18n="knowledge.criminal.article.s4_p5">Je früher eine strukturierte Verteidigung beginnt, desto größer sind:</p>'),

    # s4_li4 through s4_li6
    ('<li>die Einflussmöglichkeiten,</li>',
     '<li data-i18n="knowledge.criminal.article.s4_li4">die Einflussmöglichkeiten,</li>'),

    ('<li>die Gestaltungsspielräume,</li>',
     '<li data-i18n="knowledge.criminal.article.s4_li5">die Gestaltungsspielräume,</li>'),

    ('<li>die Chancen auf Verfahrensbegrenzung oder Einstellung.</li>',
     '<li data-i18n="knowledge.criminal.article.s4_li6">die Chancen auf Verfahrensbegrenzung oder Einstellung.</li>'),

    # s5_title
    ('<h3 style="margin-top: var(--spacing-xl);">5. Steuerstrafverfahren ≠ Steuerverfahren</h3>',
     '<h3 style="margin-top: var(--spacing-xl);" data-i18n="knowledge.criminal.article.s5_title">5. Steuerstrafverfahren ≠ Steuerverfahren</h3>'),

    # s5_p1
    ('<p>Ein zentraler Irrtum besteht darin, das Steuerstrafverfahren wie ein normales Steuerverfahren zu behandeln.</p>',
     '<p data-i18n="knowledge.criminal.article.s5_p1">Ein zentraler Irrtum besteht darin, das Steuerstrafverfahren wie ein normales Steuerverfahren zu behandeln.</p>'),

    # s5_p2 (contains <strong>)
    ('<p><strong>Der entscheidende Unterschied:</strong></p>',
     '<p data-i18n="[html]knowledge.criminal.article.s5_p2"><strong>Der entscheidende Unterschied:</strong></p>'),

    # s5_li1, s5_li2
    ('<li>Im Steuerverfahren geht es um Festsetzung von Steuern</li>',
     '<li data-i18n="knowledge.criminal.article.s5_li1">Im Steuerverfahren geht es um Festsetzung von Steuern</li>'),

    ('<li>Im Strafverfahren geht es um persönliche Schuld, Sanktionen und Strafe</li>',
     '<li data-i18n="knowledge.criminal.article.s5_li2">Im Strafverfahren geht es um persönliche Schuld, Sanktionen und Strafe</li>'),

    # s5_p3
    ('<p>Was steuerlich „bereinigt" werden kann, ist strafrechtlich oft nicht mehr rückgängig zu machen.</p>',
     '<p data-i18n="knowledge.criminal.article.s5_p3">Was steuerlich „bereinigt" werden kann, ist strafrechtlich oft nicht mehr rückgängig zu machen.</p>'),

    # s6_title
    ('<h3 style="margin-top: var(--spacing-xl);">6. Warum der frühe Zeitpunkt entscheidend ist</h3>',
     '<h3 style="margin-top: var(--spacing-xl);" data-i18n="knowledge.criminal.article.s6_title">6. Warum der frühe Zeitpunkt entscheidend ist</h3>'),

    # s6_p1
    ('<p>Die ersten Stunden und Tage nach der Einleitung eines Strafverfahrens sind häufig verfahrensprägend. In dieser Phase entscheidet sich:</p>',
     '<p data-i18n="knowledge.criminal.article.s6_p1">Die ersten Stunden und Tage nach der Einleitung eines Strafverfahrens sind häufig verfahrensprägend. In dieser Phase entscheidet sich:</p>'),

    # s6_li1 through s6_li4
    ('<li>ob Aussagen den Akteninhalt bestimmen,</li>',
     '<li data-i18n="knowledge.criminal.article.s6_li1">ob Aussagen den Akteninhalt bestimmen,</li>'),

    ('<li>ob Verteidigungsoptionen offenbleiben,</li>',
     '<li data-i18n="knowledge.criminal.article.s6_li2">ob Verteidigungsoptionen offenbleiben,</li>'),

    ('<li>ob Selbstanzeige- oder Korrekturmöglichkeiten noch bestehen,</li>',
     '<li data-i18n="knowledge.criminal.article.s6_li3">ob Selbstanzeige- oder Korrekturmöglichkeiten noch bestehen,</li>'),

    ('<li>ob das Verfahren eskaliert oder eingegrenzt wird.</li>',
     '<li data-i18n="knowledge.criminal.article.s6_li4">ob das Verfahren eskaliert oder eingegrenzt wird.</li>'),

    # s6_p2 (contains <strong>)
    ('<p><strong>Viele Verfahren werden nicht wegen der Tat, sondern wegen ungeschickten Verhaltens problematisch.</strong></p>',
     '<p data-i18n="[html]knowledge.criminal.article.s6_p2"><strong>Viele Verfahren werden nicht wegen der Tat, sondern wegen ungeschickten Verhaltens problematisch.</strong></p>'),

    # s7_title
    ('<h3 style="margin-top: var(--spacing-xl);">7. Selbstanzeige und steuerliche Berichtigung – Chancen und Grenzen</h3>',
     '<h3 style="margin-top: var(--spacing-xl);" data-i18n="knowledge.criminal.article.s7_title">7. Selbstanzeige und steuerliche Berichtigung – Chancen und Grenzen</h3>'),

    # s7_h4a
    ('<h4>7.1 Berichtigungspflicht (§ 153 AO)</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s7_h4a">7.1 Berichtigungspflicht (§ 153 AO)</h4>'),

    # s7_p1
    ('<p>Wer erkennt, dass eine Steuererklärung objektiv unrichtig oder unvollständig ist, ist zur Berichtigung verpflichtet. Unterbleibt diese, kann sich hieraus der strafrechtliche Vorwurf entwickeln.</p>',
     '<p data-i18n="knowledge.criminal.article.s7_p1">Wer erkennt, dass eine Steuererklärung objektiv unrichtig oder unvollständig ist, ist zur Berichtigung verpflichtet. Unterbleibt diese, kann sich hieraus der strafrechtliche Vorwurf entwickeln.</p>'),

    # s7_h4b
    ('<h4>7.2 Strafbefreiende Selbstanzeige (§ 371 AO)</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s7_h4b">7.2 Strafbefreiende Selbstanzeige (§ 371 AO)</h4>'),

    # s7_p2
    ('<p>Eine wirksame Selbstanzeige kann zur Straffreiheit führen – jedoch nur, wenn:</p>',
     '<p data-i18n="knowledge.criminal.article.s7_p2">Eine wirksame Selbstanzeige kann zur Straffreiheit führen – jedoch nur, wenn:</p>'),

    # s7_li1 through s7_li3
    ('<li>unrichtige Angaben berichtigt und unterlassene Angaben nachgeholt werden,</li>',
     '<li data-i18n="knowledge.criminal.article.s7_li1">unrichtige Angaben berichtigt und unterlassene Angaben nachgeholt werden,</li>'),

    ('<li>rechtzeitig erfolgt,</li>',
     '<li data-i18n="knowledge.criminal.article.s7_li2">rechtzeitig erfolgt,</li>'),

    ('<li>keine Sperrgründe vorliegen (z. B. Tatentdeckung).</li>',
     '<li data-i18n="knowledge.criminal.article.s7_li3">keine Sperrgründe vorliegen (z. B. Tatentdeckung).</li>'),

    # s7_p3
    ('<p>Die Anforderungen sind hoch, formelle Fehler können zur Unwirksamkeit führen.</p>',
     '<p data-i18n="knowledge.criminal.article.s7_p3">Die Anforderungen sind hoch, formelle Fehler können zur Unwirksamkeit führen.</p>'),

    # s7_h4c
    ('<h4>7.3 Keine Schnellschüsse</h4>',
     '<h4 data-i18n="knowledge.criminal.article.s7_h4c">7.3 Keine Schnellschüsse</h4>'),

    # s7_p4
    ('<p>Unkoordinierte oder unvollständige Selbstanzeigen gehören zu den häufigsten Verteidigungsfehlern. Gerade bei komplexen Sachverhalten ist eine strategische Vorbereitung zwingend erforderlich.</p>',
     '<p data-i18n="knowledge.criminal.article.s7_p4">Unkoordinierte oder unvollständige Selbstanzeigen gehören zu den häufigsten Verteidigungsfehlern. Gerade bei komplexen Sachverhalten ist eine strategische Vorbereitung zwingend erforderlich.</p>'),

    # s8_title
    ('<h3 style="margin-top: var(--spacing-xl);">8. Schätzung im Steuerstrafverfahren</h3>',
     '<h3 style="margin-top: var(--spacing-xl);" data-i18n="knowledge.criminal.article.s8_title">8. Schätzung im Steuerstrafverfahren</h3>'),

    # s8_p1
    ('<p>Auch im Steuerstrafverfahren sind Schätzungen grundsätzlich zulässig. Allerdings gilt:</p>',
     '<p data-i18n="knowledge.criminal.article.s8_p1">Auch im Steuerstrafverfahren sind Schätzungen grundsätzlich zulässig. Allerdings gilt:</p>'),

    # s8_li1 through s8_li3
    ('<li>Die Verwirklichung des Tatbestandes (§ 370 AO) muss zur richterlichen Überzeugung feststehen, das Ausmaß jedoch ist ungewiss,</li>',
     '<li data-i18n="knowledge.criminal.article.s8_li1">Die Verwirklichung des Tatbestandes (§ 370 AO) muss zur richterlichen Überzeugung feststehen, das Ausmaß jedoch ist ungewiss,</li>'),

    ('<li>die konkrete Höhe der Steuerverkürzung darf geschätzt werden,</li>',
     '<li data-i18n="knowledge.criminal.article.s8_li2">die konkrete Höhe der Steuerverkürzung darf geschätzt werden,</li>'),

    ('<li>Schätzungen müssen realistisch, schlüssig und plausibel sein.</li>',
     '<li data-i18n="knowledge.criminal.article.s8_li3">Schätzungen müssen realistisch, schlüssig und plausibel sein.</li>'),

    # s8_p2
    ('<p>Der Bundesgerichtshof bestätigt die Zulässigkeit von Schätzungen, setzt ihnen jedoch klare Grenzen.</p>',
     '<p data-i18n="knowledge.criminal.article.s8_p2">Der Bundesgerichtshof bestätigt die Zulässigkeit von Schätzungen, setzt ihnen jedoch klare Grenzen.</p>'),

    # s9_title (inside .card div)
    ('<h3 style="margin-top: 0; color: var(--color-primary);">9. Unser Ansatz: Struktur statt Aktionismus</h3>',
     '<h3 style="margin-top: 0; color: var(--color-primary);" data-i18n="knowledge.criminal.article.s9_title">9. Unser Ansatz: Struktur statt Aktionismus</h3>'),

    # s9_p1
    ('<p>Wir begleiten Mandanten ab dem ersten Kontakt mit Ermittlungsbehörden. Unser Fokus liegt auf:</p>',
     '<p data-i18n="knowledge.criminal.article.s9_p1">Wir begleiten Mandanten ab dem ersten Kontakt mit Ermittlungsbehörden. Unser Fokus liegt auf:</p>'),

    # s9_li1 through s9_li4 (indented with extra spaces in .card)
    ('<li>sofortiger rechtlicher Einordnung der Situation,</li>',
     '<li data-i18n="knowledge.criminal.article.s9_li1">sofortiger rechtlicher Einordnung der Situation,</li>'),

    ('<li>klarer Kommunikationsstrategie,</li>',
     '<li data-i18n="knowledge.criminal.article.s9_li2">klarer Kommunikationsstrategie,</li>'),

    ('<li>Schutz vor unzulässiger Beweisverwertung,</li>',
     '<li data-i18n="knowledge.criminal.article.s9_li3">Schutz vor unzulässiger Beweisverwertung,</li>'),

    ('<li>frühzeitiger Einflussnahme auf den Verfahrensverlauf.</li>',
     '<li data-i18n="knowledge.criminal.article.s9_li4">frühzeitiger Einflussnahme auf den Verfahrensverlauf.</li>'),

    # s9_p2 (has inline style)
    ('<p style="margin-bottom: 0; font-weight: 600;">Ziel ist nicht Eskalation, sondern Kontrolle, Begrenzung und rechtssichere Lösung.</p>',
     '<p style="margin-bottom: 0; font-weight: 600;" data-i18n="knowledge.criminal.article.s9_p2">Ziel ist nicht Eskalation, sondern Kontrolle, Begrenzung und rechtssichere Lösung.</p>'),
]


def build_nested_dict(translations_list):
    """Build a nested dict from the flat translation list for JSON insertion."""
    article = {}
    for suffix, de_text, en_text, tr_text in translations_list:
        article[suffix] = {"de": de_text, "en": en_text, "tr": tr_text}
    return article


def update_html():
    """Read the HTML file and add data-i18n attributes to article elements."""
    print(f"Reading HTML: {HTML_FILE}")
    with open(HTML_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    replacement_count = 0
    for old, new in HTML_REPLACEMENTS:
        if old in content:
            content = content.replace(old, new, 1)  # Replace only first occurrence
            replacement_count += 1
        else:
            print(f"  WARNING: Could not find HTML to replace:")
            print(f"    {old[:80]}...")

    with open(HTML_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"  -> {replacement_count}/{len(HTML_REPLACEMENTS)} replacements made in HTML")
    return replacement_count


def update_json(json_path, lang, translations_list):
    """Read a JSON translation file, add the article keys, and write it back."""
    print(f"Updating JSON: {json_path}")
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Ensure the knowledge.criminal.article nested structure exists
    if "knowledge" not in data:
        data["knowledge"] = {}
    if "criminal" not in data["knowledge"]:
        data["knowledge"]["criminal"] = {}

    # Build the article translations dict for this language
    article = {}
    lang_index = {"de": 1, "en": 2, "tr": 3}[lang]
    for entry in translations_list:
        suffix = entry[0]
        text = entry[lang_index]
        article[suffix] = text

    data["knowledge"]["criminal"]["article"] = article

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")  # Trailing newline

    print(f"  -> Added {len(article)} keys under knowledge.criminal.article")


def main():
    print("=" * 60)
    print("i18n Translation Script for wissen-steuerstrafrecht.html")
    print("=" * 60)
    print()

    # Step 1: Update HTML
    print("[1/4] Updating HTML with data-i18n attributes...")
    html_count = update_html()
    print()

    # Step 2: Update DE JSON
    print("[2/4] Updating de.json...")
    update_json(DE_JSON, "de", TRANSLATIONS)
    print()

    # Step 3: Update EN JSON
    print("[3/4] Updating en.json...")
    update_json(EN_JSON, "en", TRANSLATIONS)
    print()

    # Step 4: Update TR JSON
    print("[4/4] Updating tr.json...")
    update_json(TR_JSON, "tr", TRANSLATIONS)
    print()

    # Summary
    total_keys = len(TRANSLATIONS)
    print("=" * 60)
    print(f"DONE! Summary:")
    print(f"  - HTML replacements: {html_count}/{len(HTML_REPLACEMENTS)}")
    print(f"  - Translation keys added per language: {total_keys}")
    print(f"  - Key prefix: {KEY_PREFIX}")
    print(f"  - Languages: DE, EN, TR")
    print(f"  - Files modified:")
    print(f"    - {HTML_FILE}")
    print(f"    - {DE_JSON}")
    print(f"    - {EN_JSON}")
    print(f"    - {TR_JSON}")
    print("=" * 60)

    # Verification
    print()
    print("Verifying JSON validity...")
    for path in [DE_JSON, EN_JSON, TR_JSON]:
        try:
            with open(path, "r", encoding="utf-8") as f:
                json.load(f)
            print(f"  {os.path.basename(path)}: VALID JSON")
        except json.JSONDecodeError as e:
            print(f"  {os.path.basename(path)}: INVALID JSON - {e}")

    print()
    print("Verifying HTML data-i18n attributes...")
    with open(HTML_FILE, "r", encoding="utf-8") as f:
        html = f.read()
    article_i18n_count = html.count('data-i18n="knowledge.criminal.article.')
    print(f"  Found {article_i18n_count} article data-i18n attributes in HTML")

    if article_i18n_count == total_keys:
        print("  ALL GOOD - counts match!")
    else:
        print(f"  WARNING: Expected {total_keys}, found {article_i18n_count}")


if __name__ == "__main__":
    main()
