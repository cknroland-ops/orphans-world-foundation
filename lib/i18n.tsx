"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "FR" | "EN" | "SW";

type Translation = { EN: string; SW: string };

const translations: Record<string, Translation> = {
  "Accueil": { EN: "Home", SW: "Mwanzo" },
  "À propos": { EN: "About", SW: "Kuhusu sisi" },
  "À propos de nous": { EN: "About us", SW: "Kuhusu sisi" },
  "Causes": { EN: "Causes", SW: "Sababu" },
  "Programmes": { EN: "Programs", SW: "Programu" },
  "Blog": { EN: "Blog", SW: "Blogu" },
  "Blogs": { EN: "Blog", SW: "Blogu" },
  "Contact": { EN: "Contact", SW: "Mawasiliano" },
  "Langue": { EN: "Language", SW: "Lugha" },
  "Faire un don": { EN: "Donate", SW: "Toa mchango" },
  "Faites un don maintenant": { EN: "Donate now", SW: "Toa mchango sasa" },
  "Faire un don maintenant →": { EN: "Donate now →", SW: "Toa mchango sasa →" },
  "Découvrez-nous →": { EN: "Discover us →", SW: "Tujue zaidi →" },
  "En savoir plus →": { EN: "Learn more →", SW: "Jifunze zaidi →" },
  "Voir toutes →": { EN: "View all →", SW: "Tazama zote →" },
  "Voir tous →": { EN: "View all →", SW: "Tazama zote →" },
  "Voir tous les programmes →": { EN: "View all programs →", SW: "Tazama programu zote →" },
  "Lire tout le blog →": { EN: "Read the full blog →", SW: "Soma blogu yote →" },
  "Lire l'article →": { EN: "Read article →", SW: "Soma makala →" },
  "En savoir plus": { EN: "Learn more", SW: "Jifunze zaidi" },
  "Défiler": { EN: "Scroll", SW: "Sogeza" },
  "Le monde voit": { EN: "The world sees", SW: "Dunia inaona" },
  "Nous voyons": { EN: "We see", SW: "Tunaona" },
  "Organisation Humanitaire · Sud-Kivu, RDC · 2023": { EN: "Humanitarian organization · South Kivu, DRC · 2023", SW: "Shirika la kibinadamu · Kivu Kusini, DRC · 2023" },
  "Notre impact": { EN: "Our impact", SW: "Athari yetu" },
  "Ensemble pour le changement": { EN: "Together for change", SW: "Pamoja kwa mabadiliko" },
  "Nourrir les familles, éduquer les enfants et reconstruire des vies, ce que notre impact montre.": { EN: "Feeding families, educating children and rebuilding lives — this is what our impact shows.", SW: "Kulisha familia, kuelimisha watoto na kujenga maisha upya — hayo ndiyo athari yetu." },
  "Enfants accompagnés": { EN: "Children supported", SW: "Watoto wanaosaidiwa" },
  "Parrainages réalisés": { EN: "Sponsorships completed", SW: "Ufadhili uliotekelezwa" },
  "Commissions & Années": { EN: "Commissions & Years", SW: "Tume na Miaka" },
  "Nos soutiens de confiance": { EN: "Our trusted supporters", SW: "Watu wanaotuunga mkono" },
  "Qui sommes-nous ?": { EN: "Who are we?", SW: "Sisi ni nani?" },
  "Orphans World Foundation est une organisation apolitique et non confessionnelle pour la défense des droits de l'enfant, créée en République Démocratique du Congo, dans la province du Sud-Kivu, ville de Bukavu.": { EN: "Orphans World Foundation is a non-political and non-denominational organization defending children's rights, founded in Bukavu, South Kivu province, Democratic Republic of the Congo.", SW: "Orphans World Foundation ni shirika lisilo la kisiasa wala kidini linalotetea haki za watoto, lililoanzishwa Bukavu, katika mkoa wa Kivu Kusini wa Jamhuri ya Kidemokrasia ya Kongo." },
  "Animée par une vision d'impact durable, aujourd'hui Orphans World Foundation réunit une équipe multidisciplinaire de professionnels engagés à protéger les droits des enfants, à restaurer leur dignité et à créer les conditions d'un avenir où chaque enfant peut pleinement réaliser son potentiel.": { EN: "Driven by a vision of lasting impact, Orphans World Foundation brings together a multidisciplinary team committed to protecting children's rights, restoring their dignity and creating the conditions for every child to reach their full potential.", SW: "Likiongozwa na maono ya athari ya kudumu, Orphans World Foundation linaunganisha timu ya wataalamu wa fani mbalimbali waliojitolea kulinda haki za watoto, kurejesha heshima yao na kuunda mazingira ambapo kila mtoto anaweza kutimiza uwezo wake." },
  "Impartialité": { EN: "Impartiality", SW: "Kutokuwa na upendeleo" },
  "Neutralité": { EN: "Neutrality", SW: "Kutokuwa upande" },
  "Droits de l'enfant": { EN: "Children's rights", SW: "Haki za mtoto" },
  "Non confessionnel": { EN: "Non-denominational", SW: "Isiyohusishwa na dini" },
  "Causes qui inspirent": { EN: "Causes that inspire", SW: "Sababu zinazohamasisha" },
  "Déclenchez un": { EN: "Trigger a", SW: "Anzisha" },
  "changement positif": { EN: "positive change", SW: "mabadiliko chanya" },
  "Comment aider": { EN: "How to help", SW: "Jinsi ya kusaidia" },
  "Unis, Nous Transformons": { EN: "United, we transform", SW: "Tukiwa pamoja, tunabadilisha" },
  "Devenez un acteur du changement en soutenant nos initiatives de terrain.": { EN: "Become an agent of change by supporting our field initiatives.", SW: "Kuwa mshirika wa mabadiliko kwa kuunga mkono mipango yetu ya eneo." },
  "Nos Dernières Histoires": { EN: "Our latest stories", SW: "Hadithi zetu za hivi karibuni" },
  "Témoignages": { EN: "Testimonials", SW: "Ushuhuda" },
  "Des histoires qui redonnent espoir": { EN: "Stories that restore hope", SW: "Hadithi zinazorejesha matumaini" },
  "Être la raison pour laquelle": { EN: "Be the reason why", SW: "Kuwa sababu ambayo" },
  "quelqu'un": { EN: "someone", SW: "mtu fulani" },
  "sourit": { EN: "smiles", SW: "anatabasamu" },
  "FAQ": { EN: "FAQ", SW: "Maswali yanayoulizwa mara kwa mara" },
  "Ce que vous pensez,": { EN: "What you are wondering,", SW: "Unachojiuliza," },
  "nous y avons répondu.": { EN: "we have answered.", SW: "tumekijibu." },
  "Conduite Par": { EN: "Driven by", SW: "Ikiongozwa na" },
  "Objectif Et Impact": { EN: "Purpose and impact", SW: "Lengo na athari" },
  "Notre mission": { EN: "Our mission", SW: "Dhamira yetu" },
  "Notre vision": { EN: "Our vision", SW: "Maono yetu" },
  "Notre équipe": { EN: "Our team", SW: "Timu yetu" },
  "Notre héritage": { EN: "Our legacy", SW: "Urithi wetu" },
  "en mouvement": { EN: "in motion", SW: "unaosonga" },
  "Rejoignez-nous": { EN: "Join us", SW: "Jiunge nasi" },
  "Programmes Ça": { EN: "Programs that", SW: "Programu zinazobeba" },
  "Marque Différence": { EN: "make a difference", SW: "tofauti" },
  "Dernières nouvelles": { EN: "Latest news", SW: "Habari za hivi karibuni" },
  "Histoires Ça": { EN: "Stories that", SW: "Hadithi zinazobeba" },
  "Inspire Espoir": { EN: "inspire hope", SW: "matumaini" },
  "Chaque Enfant": { EN: "Every child", SW: "Kila mtoto" },
  "Mérite un Avenir": { EN: "deserves a future", SW: "anastahili baadaye" },
  "Donnez. Impact.": { EN: "Give. Impact.", SW: "Toa. Athari." },
  "Transformer": { EN: "Transform", SW: "Badilisha" },
  "Des Vies.": { EN: "Lives.", SW: "Maisha." },
  "Financez un destin": { EN: "Fund a future", SW: "Fadhili maisha ya baadaye" },
  "Don unique": { EN: "One-time donation", SW: "Mchango wa mara moja" },
  "Don mensuel": { EN: "Monthly donation", SW: "Mchango wa kila mwezi" },
  "MÉTHODE DE PAIEMENT": { EN: "PAYMENT METHOD", SW: "NJIA YA MALIPO" },
  "Carte · Mobile Money": { EN: "Card · Mobile Money", SW: "Kadi · Mobile Money" },
  "Paiement sécurisé · 100% des dons vont aux enfants": { EN: "Secure payment · 100% of donations go to children", SW: "Malipo salama · 100% ya michango huenda kwa watoto" },
  "Navigation": { EN: "Navigation", SW: "Menyu" },
  "Autres liens": { EN: "Other links", SW: "Viungo vingine" },
  "Connexion sociale": { EN: "Social media", SW: "Mitandao ya kijamii" },
  "Contactez-nous": { EN: "Contact us", SW: "Wasiliana nasi" },
  "Politique de confidentialité": { EN: "Privacy policy", SW: "Sera ya faragha" },
  "Conditions Générales": { EN: "Terms and conditions", SW: "Masharti ya jumla" },
  "Soyez le premier à entendre à quel point vous faites une différence.": { EN: "Be the first to hear how much of a difference you make.", SW: "Kuwa wa kwanza kujua jinsi unavyobadilisha maisha." },
  "Inscrivez-vous à la newsletter et ne manquez jamais la mise à jour.": { EN: "Subscribe to our newsletter and never miss an update.", SW: "Jisajili kwenye jarida letu na usikose taarifa." },
  "Faire un don maintenant": { EN: "Donate now", SW: "Toa mchango sasa" },
  "Prénom": { EN: "First name", SW: "Jina la kwanza" },
  "Nom de famille": { EN: "Last name", SW: "Jina la ukoo" },
  "Email": { EN: "Email", SW: "Barua pepe" },
  "Votre message": { EN: "Your message", SW: "Ujumbe wako" },
  "Soumettre & Choisir le paiement": { EN: "Submit & choose payment", SW: "Tuma na uchague malipo" },
  "Soutien scolaire, nutritionnel et psychosocial.": { EN: "Educational, nutritional and psychosocial support.", SW: "Msaada wa elimu, lishe na kisaikolojia." },
  "Les familles restaurent la sécurité et l'espoir.": { EN: "Families regain security and hope.", SW: "Familia zinapata tena usalama na matumaini." },
  "6 commissions actives pendant 3 années d'impact.": { EN: "6 active commissions over 3 years of impact.", SW: "Tume 6 zinazofanya kazi katika miaka 3 ya athari." },
  "Voir les membres de l'équipe": { EN: "Meet the team", SW: "Wafahamu wanachama wa timu" },
  "Fondateur": { EN: "Founder", SW: "Mwanzilishi" },
  "Notre Vision": { EN: "Our vision", SW: "Maono yetu" },
  "Notre Mission": { EN: "Our mission", SW: "Dhamira yetu" },
  "Nos Valeurs": { EN: "Our values", SW: "Maadili yetu" },
  "Construire un monde où chaque enfant et chaque personne vulnérable vivent dans la dignité, jouissent pleinement de leurs droits et contribuent au développement durable de leur communauté.": { EN: "Build a world where every child and vulnerable person lives with dignity, fully enjoys their rights and contributes to sustainable community development.", SW: "Kujenga dunia ambamo kila mtoto na mtu aliye katika mazingira magumu anaishi kwa heshima, anafurahia haki zake na anachangia maendeleo endelevu ya jamii." },
  "Assurer la promotion et la protection des droits des enfants, avec une attention particulière aux enfants en situation difficile partout dans le monde.": { EN: "Promote and protect children's rights, with special attention to children in difficult situations around the world.", SW: "Kukuza na kulinda haki za watoto, hasa watoto walio katika hali ngumu duniani kote." },
  "Impartialité, neutralité, respect des droits de l'enfant et absence d'appartenance politique ou religieuse.": { EN: "Impartiality, neutrality, respect for children's rights and no political or religious affiliation.", SW: "Kutokuwa na upendeleo, kutokuwa upande, kuheshimu haki za mtoto na kutokuwa na uhusiano wa kisiasa au kidini." },
  "SANTÉ POUR TOUS": { EN: "HEALTH FOR ALL", SW: "AFYA KWA WOTE" },
  "Santé et bien-être des enfants accompagnés, prévention des troubles mentaux et accès aux soins essentiels.": { EN: "Health and well-being for supported children, mental health prevention and access to essential care.", SW: "Afya na ustawi wa watoto wanaosaidiwa, kinga ya matatizo ya akili na upatikanaji wa huduma muhimu." },
  "ÉGALITÉ & GENRE": { EN: "EQUALITY & GENDER", SW: "USAWA NA JINSIA" },
  "Égalité de genre, protection des droits des filles et garçons, lutte contre les discriminations.": { EN: "Gender equality, protection of girls' and boys' rights, and the fight against discrimination.", SW: "Usawa wa kijinsia, ulinzi wa haki za wasichana na wavulana, na kupambana na ubaguzi." },
  "COMMUNICATION": { EN: "COMMUNICATION", SW: "MAWASILIANO" },
  "Communication, sensibilisation et rayonnement de la cause humanitaire à travers les médias.": { EN: "Communication, awareness and visibility for humanitarian work through the media.", SW: "Mawasiliano, uhamasishaji na kueneza kazi ya kibinadamu kupitia vyombo vya habari." },
  "Vos dons financiers permettent de propulser nos programmes.": { EN: "Your financial donations help drive our programs.", SW: "Michango yako ya kifedha inasaidia kuendesha programu zetu." },
  "PARTAGER DES RESSOURCES": { EN: "SHARE RESOURCES", SW: "SHIRIKI RASILIMALI" },
  "Des soutiens en nature accélèrent notre logistique.": { EN: "In-kind support strengthens our logistics.", SW: "Msaada wa vitu unaimarisha vifaa na usafirishaji wetu." },
  "AGIR DANS L'URGENCE": { EN: "ACT IN AN EMERGENCY", SW: "CHUKUA HATUA DHARURA" },
  "Rejoignez-nous lors de crises pour des aides rapides.": { EN: "Join us during crises to provide rapid assistance.", SW: "Jiunge nasi wakati wa migogoro ili kutoa msaada wa haraka." },
  "PARRAINER UN ENFANT": { EN: "SPONSOR A CHILD", SW: "MFADHILI MTOTO" },
  "Un soutien mensuel pour changer une vie entière.": { EN: "Monthly support to change an entire life.", SW: "Msaada wa kila mwezi wa kubadilisha maisha yote." },
  "Rejoignez nos missions ↗": { EN: "Join our missions ↗", SW: "Jiunge na misheni zetu ↗" },
  "Lire l'article": { EN: "Read article", SW: "Soma makala" },
  "Présidente commission santé": { EN: "Health commission chair", SW: "Mwenyekiti wa tume ya afya" },
  "Trouvez des réponses utiles aux questions courantes sur le don, le bénévolat et la collecte de fonds.": { EN: "Find useful answers to common questions about donations, volunteering and fundraising.", SW: "Pata majibu muhimu ya maswali kuhusu michango, kujitolea na kuchangisha fedha." },
  "Quelle est la mission de votre ONG ?": { EN: "What is your organization's mission?", SW: "Dhamira ya shirika lenu ni nini?" },
  "Comment les dons sont-ils utilisés ?": { EN: "How are donations used?", SW: "Michango inatumikaje?" },
  "Puis-je faire du bénévolat ?": { EN: "Can I volunteer?", SW: "Naweza kujitolea?" },
  "À part faire un don, comment puis-je aider ?": { EN: "Besides donating, how can I help?", SW: "Mbali na kutoa mchango, ninawezaje kusaidia?" },
  "Puis-je parrainer un enfant ou une famille ?": { EN: "Can I sponsor a child or family?", SW: "Naweza kumfadhili mtoto au familia?" },
  "Orphans World Foundation assure la promotion et la protection des droits des enfants en situation difficile en RDC et dans le monde.": { EN: "Orphans World Foundation promotes and protects the rights of children in difficult situations in the DRC and around the world.", SW: "Orphans World Foundation inakuza na kulinda haki za watoto walio katika hali ngumu nchini DRC na duniani kote." },
  "Absolument ! Contactez-nous par email ou WhatsApp (+243 979 067 087) pour rejoindre notre équipe de bénévoles engagés.": { EN: "Absolutely! Contact us by email or WhatsApp (+243 979 067 087) to join our committed volunteer team.", SW: "Ndiyo! Wasiliana nasi kwa barua pepe au WhatsApp (+243 979 067 087) ili kujiunga na timu yetu ya kujitolea." },
  "Vous pouvez devenir partenaire, organiser des collectes ou simplement partager notre mission sur les réseaux sociaux.": { EN: "You can become a partner, organize fundraisers or simply share our mission on social media.", SW: "Unaweza kuwa mshirika, kuandaa michango au kushiriki tu dhamira yetu kwenye mitandao ya kijamii." },
  "Oui, notre programme de parrainage est conçu pour accompagner spécifiquement des enfants sur le long terme. Contactez-nous pour en savoir plus.": { EN: "Yes, our sponsorship program is designed to support children over the long term. Contact us to learn more.", SW: "Ndiyo, programu yetu ya ufadhili imeundwa kusaidia watoto kwa muda mrefu. Wasiliana nasi kujua zaidi." },
  "BULLETIN D'INFORMATION": { EN: "NEWSLETTER", SW: "JARIDA LA HABARI" },
  "SUD-KIVU, RDC": { EN: "SOUTH KIVU, DRC", SW: "KIVU KUSINI, DRC" },
  "Tous les droits d'auteur sont réservés © Orphans World Foundation 2023–2026": { EN: "All rights reserved © Orphans World Foundation 2023–2026", SW: "Haki zote zimehifadhiwa © Orphans World Foundation 2023–2026" },
  "Bukavu · Sud-Kivu · République Démocratique du Congo": { EN: "Bukavu · South Kivu · Democratic Republic of the Congo", SW: "Bukavu · Kivu Kusini · Jamhuri ya Kidemokrasia ya Kongo" },
};

const reverseTranslations: Record<string, string> = Object.entries(translations).reduce((result, [fr, values]) => {
  result[values.EN] = fr;
  result[values.SW] = fr;
  return result;
}, {} as Record<string, string>);

function translateText(value: string, locale: Locale) {
  if (locale === "FR") return value;
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const trimmed = value.trim();
  if (!trimmed) return value;

  let result = translations[trimmed]?.[locale] ?? trimmed;
  if (result === trimmed) {
    const keys = Object.keys(translations).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      if (result.includes(key)) result = result.split(key).join(translations[key][locale]);
    }
  }
  return `${leading}${result}${trailing}`;
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (value: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always render the server and the first client pass in French. The saved
  // preference is restored after hydration so it cannot cause a mismatch.
  const [locale, setLocaleState] = useState<Locale>("FR");

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("owf-locale", nextLocale);
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("owf-locale") as Locale | null;
    if (saved === "FR" || saved === "EN" || saved === "SW") {
      window.requestAnimationFrame(() => setLocaleState(saved));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "FR" ? "fr" : locale === "EN" ? "en" : "sw";
    const root = document.body;

    const translateDom = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (parent && !["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT"].includes(parent.tagName)) nodes.push(node as Text);
      }
      nodes.forEach((textNode) => {
        const current = textNode.nodeValue ?? "";
        const source = reverseTranslations[current.trim()] ?? current;
        const translated = translateText(source, locale);
        if (translated !== current) textNode.nodeValue = translated;
      });

      document.querySelectorAll<HTMLElement>("[placeholder], [aria-label], [title]").forEach((element) => {
        (["placeholder", "aria-label", "title"] as const).forEach((attribute) => {
          const current = element.getAttribute(attribute);
          if (!current) return;
          const source = reverseTranslations[current] ?? current;
          element.setAttribute(attribute, translateText(source, locale));
        });
      });
    };

    translateDom();
    const observer = new MutationObserver(translateDom);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t: (text: string) => translateText(text, locale) }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
