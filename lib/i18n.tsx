"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "FR" | "EN" | "SW";

type Translation = { EN: string; SW: string };

const translations: Record<string, Translation> = {
  "Accueil": { EN: "Home", SW: "Mwanzo" },
  "À propos": { EN: "About", SW: "Kuhusu sisi" },
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
  "Éducation": { EN: "Education", SW: "Elimu" },
  "Organisation": { EN: "Organization", SW: "Shirika" },
  "Santé": { EN: "Health", SW: "Afya" },
  "Social": { EN: "Social", SW: "Kijamii" },
  "Agriculture": { EN: "Agriculture", SW: "Kilimo" },
  "Dernières nouvelles": { EN: "Latest news", SW: "Habari za hivi karibuni" },
  "Histoires Ça": { EN: "Stories that", SW: "Hadithi zinazobeba" },
  "Inspire Espoir": { EN: "inspire hope", SW: "matumaini" },
  "Découvrez des mises à jour pertinentes, des moments forts de la communauté et des histoires réelles sur le terrain.": { EN: "Discover relevant updates, community highlights and real stories from the field.", SW: "Gundua taarifa muhimu, matukio ya jamii na hadithi halisi kutoka uwanjani." },
  "Upendo Feast : Distribution de kits scolaires": { EN: "Upendo Feast: School kit distribution", SW: "Upendo Feast: Ugawaji wa vifaa vya shule" },
  "À l'occasion de la Journée internationale de l'enfant africain, nous avons distribué des kits scolaires aux enfants de l'E.P. Bukunda dans la chefferie de MITI.": { EN: "For the International Day of the African Child, we distributed school kits to children at E.P. Bukunda in the MITI chiefdom.", SW: "Katika Siku ya Kimataifa ya Mtoto wa Afrika, tuligawa vifaa vya shule kwa watoto wa E.P. Bukunda katika chefferie ya MITI." },
  "1ère Assemblée Générale : Bâtir l'avenir ensemble": { EN: "1st General Assembly: Building the future together", SW: "Mkutano Mkuu wa 1: Kujenga mustakabali pamoja" },
  "Réunion des membres internes et externes pour définir les orientations stratégiques et renforcer la cohésion de l'organisation.": { EN: "A meeting of internal and external members to define strategic priorities and strengthen the organization's cohesion.", SW: "Mkutano wa wanachama wa ndani na nje wa kuweka mwelekeo wa kimkakati na kuimarisha mshikamano wa shirika." },
  "Deuxième Assemblée Générale": { EN: "Second General Assembly", SW: "Mkutano Mkuu wa Pili" },
  "Hygiène Menstruelle : Briser le silence en milieu rural": { EN: "Menstrual hygiene: Breaking the silence in rural areas", SW: "Usafi wa hedhi: Kuvunja ukimya vijijini" },
  "Séances de sensibilisation à l'hygiène menstruelle pour les jeunes filles de MITI, avec distribution de kits hygiéniques.": { EN: "Menstrual hygiene awareness sessions for girls in MITI, with distribution of hygiene kits.", SW: "Vipindi vya uhamasishaji kuhusu usafi wa hedhi kwa wasichana wa MITI, pamoja na ugawaji wa vifaa vya usafi." },
  "Activité « Arbre de Vie » — AFPD Bukavu": { EN: "‘Tree of Life’ activity — AFPD Bukavu", SW: "Shughuli ya ‘Mti wa Maisha’ — AFPD Bukavu" },
  "Séance d'écoute et d'empathie avec les enfants du centre de l'AFPD à Nguba. Espace sécurisé pour partager rêves et aspirations.": { EN: "A listening and empathy session with children at the AFPD center in Nguba: a safe space to share dreams and aspirations.", SW: "Kipindi cha kusikiliza na huruma pamoja na watoto wa kituo cha AFPD Nguba, nafasi salama ya kushiriki ndoto na matarajio." },
  "Journée de l'Éducation : Anglais et e-books": { EN: "Education Day: English and e-books", SW: "Siku ya Elimu: Kiingereza na vitabu pepe" },
  "Apprentissage de l'anglais et distribution d'e-books aux enfants de l'AFPD pour renforcer leur encadrement éducatif.": { EN: "English learning and e-book distribution for AFPD children to strengthen their educational support.", SW: "Kujifunza Kiingereza na kugawa vitabu pepe kwa watoto wa AFPD ili kuimarisha msaada wao wa kielimu." },
  "Ouverture officielle Commission Agri-Business": { EN: "Official launch of the Agri-Business Commission", SW: "Uzinduzi rasmi wa Tume ya Biashara ya Kilimo" },
  "Lancement de la commission d'agri-business pour promouvoir la santé nutritionnelle et l'entrepreneuriat communautaire.": { EN: "Launch of the agri-business commission to promote nutritional health and community entrepreneurship.", SW: "Uzinduzi wa tume ya biashara ya kilimo kukuza afya ya lishe na ujasiriamali wa jamii." },
  "Votre soutien alimente nos missions, des communautés et de l'espoir qui change la vie.": { EN: "Your support fuels our missions, communities and life-changing hope.", SW: "Msaada wako unawezesha misheni zetu, jamii na matumaini yanayobadilisha maisha." },
  "Une organisation à but non lucratif œuvrant pour créer": { EN: "A nonprofit organization working to create", SW: "Shirika lisilo la faida linalofanya kazi kuunda" },
  "un changement durable dans les communautés": { EN: "lasting change in communities", SW: "mabadiliko ya kudumu katika jamii" },
  "du Sud-Kivu et au-delà.": { EN: "in South Kivu and beyond.", SW: "za Kivu Kusini na kwingineko." },
  "Impact humain ce mois-ci": { EN: "Human impact this month", SW: "Athari ya kibinadamu mwezi huu" },
  "Vies sauvées avec succès": { EN: "Lives successfully supported", SW: "Maisha yaliyosaidiwa kwa mafanikio" },
  "Enfants reçoivent éducation": { EN: "Children receiving education", SW: "Watoto wanaopata elimu" },
  "Vies sauvées ce mois-là": { EN: "Lives supported that month", SW: "Maisha yaliyosaidiwa mwezi huo" },
  "Ensemble pour": { EN: "Together for", SW: "Pamoja kwa" },
  "l'espoir durable": { EN: "lasting hope", SW: "matumaini ya kudumu" },
  "et l'humanité": { EN: "and humanity", SW: "na ubinadamu" },
  "Nous nous engageons à provoquer des changements à long terme dans les communautés vulnérables, en plaçant toujours l'enfant au cœur de nos priorités.": { EN: "We are committed to creating long-term change in vulnerable communities, always placing children at the heart of our priorities.", SW: "Tumejitolea kuleta mabadiliko ya muda mrefu katika jamii zilizo katika mazingira magumu, tukimweka mtoto katikati ya vipaumbele vyetu." },
  "Fondée le": { EN: "Founded on", SW: "Ilianzishwa tarehe" },
  "Opportunités et Égalité pour Tous": { EN: "Opportunities and equality for all", SW: "Fursa na usawa kwa wote" },
  "Un impact croissant guidé par la compassion et l'engagement.": { EN: "Growing impact guided by compassion and commitment.", SW: "Athari inayokua ikiongozwa na huruma na kujitolea." },
  "À propos de nous": { EN: "About us", SW: "Kuhusu sisi" },
  "Portée Dehors.": { EN: "Reach out.", SW: "Wasiliana nasi." },
  "Nous sommes": { EN: "We are", SW: "Tuko" },
  "Tiens Toujours.": { EN: "Always here.", SW: "Hapa daima." },
  "Vous avez des questions ou besoin de soutien ? Contactez-nous, nous sommes prêts à écouter.": { EN: "Do you have questions or need support? Contact us, we are ready to listen.", SW: "Una maswali au unahitaji msaada? Wasiliana nasi, tuko tayari kusikiliza." },
  "Informations de contact": { EN: "Contact information", SW: "Taarifa za mawasiliano" },
  "NOTRE COURRIER": { EN: "OUR EMAIL", SW: "BARUA PEPE YETU" },
  "NOTRE CONTACT": { EN: "OUR PHONE", SW: "SIMU YETU" },
  "NOTRE ADRESSE": { EN: "OUR ADDRESS", SW: "ANWANI YETU" },
  "Prénom *": { EN: "First name *", SW: "Jina la kwanza *" },
  "Nom de famille": { EN: "Last name", SW: "Jina la ukoo" },
  "Numéro de contact": { EN: "Phone number", SW: "Nambari ya simu" },
  "Notes": { EN: "Notes", SW: "Maelezo" },
  "Travaillons ensemble !": { EN: "Let's work together!", SW: "Tufanye kazi pamoja!" },
  "Soumettre": { EN: "Submit", SW: "Tuma" },
  "CAUSES": { EN: "CAUSES", SW: "SABABU" },
  "Ensemble, nous pouvons changer des vies. Votre soutien finance des": { EN: "Together, we can change lives. Your support funds", SW: "Pamoja tunaweza kubadilisha maisha. Msaada wako unafadhili" },
  "destins — pas seulement des projets.": { EN: "futures — not just projects.", SW: "mustakabali — si miradi pekee." },
  "VISION & MISSION": { EN: "VISION & MISSION", SW: "MAONO NA DHAMIRA" },
  "Pourquoi nous existons": { EN: "Why we exist", SW: "Kwa nini tupo" },
  "NOTRE VISION": { EN: "OUR VISION", SW: "MAONO YETU" },
  "Évoluer vers un impact mondial": { EN: "Towards global impact", SW: "Kuelekea athari duniani" },
  "NOTRE MISSION": { EN: "OUR MISSION", SW: "DHAMIRA YETU" },
  "Protéger et promouvoir les droits": { EN: "Protect and promote rights", SW: "Kulinda na kukuza haki" },
  "NOS VALEURS": { EN: "OUR VALUES", SW: "MAADILI YETU" },
  "Impartialité & Neutralité": { EN: "Impartiality & neutrality", SW: "Kutokuwa na upendeleo na kutokuwa upande" },
  "DOMAINES D'ACTION": { EN: "AREAS OF ACTION", SW: "MAENEO YA HATUA" },
  "Ce que votre don finance": { EN: "What your donation funds", SW: "Msaada wako unafadhili nini" },
  "Chaque contribution, quelle que soit sa taille, s'investit directement dans": { EN: "Every contribution, whatever its size, directly supports", SW: "Kila mchango, bila kujali ukubwa wake, unaunga mkono moja kwa moja" },
  "l'une de ces quatre causes vitales.": { EN: "one of these four vital causes.", SW: "moja ya sababu hizi nne muhimu." },
  "Kits scolaires, bourses d'études, coaching éducatif. Chaque enfant a le droit d'apprendre et de construire son avenir.": { EN: "School kits, scholarships and educational coaching. Every child has the right to learn and build a future.", SW: "Vifaa vya shule, ufadhili na ushauri wa kielimu. Kila mtoto ana haki ya kujifunza na kujenga mustakabali wake." },
  "Kits hygiéniques, parrainage médical, soutien psychologique. La santé est un droit fondamental, pas un privilège.": { EN: "Hygiene kits, medical sponsorship and psychological support. Health is a fundamental right, not a privilege.", SW: "Vifaa vya usafi, ufadhili wa matibabu na msaada wa kisaikolojia. Afya ni haki ya msingi, si upendeleo." },
  "Défense des droits, lutte contre les discriminations. Nous donnons une voix à ceux que la société veut faire taire.": { EN: "Defending rights and fighting discrimination. We give a voice to those society wants to silence.", SW: "Kutetea haki na kupambana na ubaguzi. Tunawapa sauti wale ambao jamii inataka kuwanyamazisha." },
  "Réinsertion communautaire, solidarité, espaces d'écoute. Nous créons des environnements protecteurs pour chaque enfant.": { EN: "Community reintegration, solidarity and safe listening spaces. We create protective environments for every child.", SW: "Urejeshaji katika jamii, mshikamano na nafasi salama za kusikiliza. Tunaunda mazingira ya ulinzi kwa kila mtoto." },
  "Si pas vous, alors qui ?": { EN: "If not you, then who?", SW: "Ikiwa si wewe, basi nani?" },
  "Si pas maintenant, alors": { EN: "If not now, then", SW: "Ikiwa si sasa, basi" },
  "quand ?": { EN: "when?", SW: "lini?" },
  "Chaque jour sans votre aide est un jour de trop pour un enfant qui attend.": { EN: "Every day without your help is one day too many for a waiting child.", SW: "Kila siku bila msaada wako ni siku moja zaidi kwa mtoto anayesubiri." },
  "Rejoignez-nous dès aujourd'hui.": { EN: "Join us today.", SW: "Jiunge nasi leo." },
  "Rejoignez-nous dans ce parcours pour autonomiser les communautés et changer des vies une à la fois.": { EN: "Join us on this journey to empower communities and change lives, one at a time.", SW: "Jiunge nasi katika safari hii ya kuyapa jamii uwezo na kubadilisha maisha moja baada ya jingine." },
  "Des millions d'enfants se réveillent chaque matin sans": { EN: "Millions of children wake up every morning without", SW: "Mamilioni ya watoto huamka kila asubuhi bila" },
  "personne pour leur dire que": { EN: "anyone to tell them that", SW: "mtu wa kuwaambia kwamba" },
  "leur vie a de la valeur": { EN: "their life has value", SW: "maisha yao yana thamani" },
  "Vous pouvez changer ça.": { EN: "You can change that.", SW: "Unaweza kubadilisha hilo." },
  "Plaidoyer": { EN: "Advocacy", SW: "Utetezi" },
  "Réinsertion sociale": { EN: "Social reintegration", SW: "Urejeshaji wa kijamii" },
  "À part le don, comment puis-je aider ? +": { EN: "Besides donating, how can I help? +", SW: "Mbali na kutoa mchango, ninawezaje kusaidia? +" },
  "Puis-je parrainer un enfant ? +": { EN: "Can I sponsor a child? +", SW: "Naweza kumfadhili mtoto? +" },
  "Vous pouvez parrainer un enfant, partager nos actions sur les réseaux, rejoindre une commission ou devenir partenaire institutionnel.": { EN: "You can sponsor a child, share our work online, join a commission or become an institutional partner.", SW: "Unaweza kumfadhili mtoto, kushiriki kazi yetu mtandaoni, kujiunga na tume au kuwa mshirika wa taasisi." },
  "Oui, nous offrons des programmes de parrainage. Contactez-nous pour connaître les modalités et choisir le programme adapté à votre engagement.": { EN: "Yes, we offer sponsorship programs. Contact us to learn the details and choose the program that suits your commitment.", SW: "Ndiyo, tunatoa mipango ya ufadhili. Wasiliana nasi kujua maelezo na kuchagua mpango unaofaa kujitolea kwako." },
  "Titulaire d'une licence en droit de l'Université Officielle de Bukavu (UOB) et boursier du Gouvernement australien en Humanity Community Service, il incarne un leadership fondé sur le service, la justice et l'innovation sociale. Son engagement vise à mobiliser les communautés, défendre les droits de l'enfant et promouvoir des initiatives durables qui transforment durablement la vie des enfants en situation de vulnérabilité.": { EN: "Holder of a law degree from the Official University of Bukavu and an Australian Government scholar in Humanity Community Service, he embodies leadership rooted in service, justice and social innovation. His commitment is to mobilize communities, defend children's rights and promote sustainable initiatives that transform the lives of vulnerable children.", SW: "Akiwa na shahada ya sheria kutoka Chuo Kikuu Rasmi cha Bukavu na akiwa msomi wa Serikali ya Australia katika Huduma ya Jamii ya Kibinadamu, anaongoza kwa huduma, haki na ubunifu wa kijamii. Kujitolea kwake ni kuhamasisha jamii, kutetea haki za watoto na kukuza mipango endelevu inayobadilisha maisha ya watoto walio katika mazingira magumu." },
  "Acteur humanitaire d'expérience avec plus de 20 ans passés au sein de la FAO (Nations Unies). Il transforme aujourd'hui ce riche parcours en un héritage puissant pour la fondation.": { EN: "An experienced humanitarian with more than 20 years at the FAO (United Nations), he now turns this rich experience into a powerful legacy for the foundation.", SW: "Mtaalamu wa kibinadamu mwenye uzoefu wa zaidi ya miaka 20 katika FAO ya Umoja wa Mataifa, sasa anageuza uzoefu huo kuwa urithi wenye nguvu kwa taasisi." },
  "Militante engagée dans le service communautaire, elle possède une expérience au sein d'Anglicare Australia. Passionée par l'impact social, elle met ses compétences en communication et en relations extérieures au service du développement de partenariats et de la mission de l'organisation.": { EN: "A committed community-service advocate with experience at Anglicare Australia, she uses her communication and external-relations skills to develop partnerships and advance the organization's mission.", SW: "Akiwa mwanaharakati aliyejitolea kwa huduma ya jamii mwenye uzoefu wa Anglicare Australia, anatumia ujuzi wake wa mawasiliano na mahusiano ya nje kuendeleza ushirikiano na dhamira ya shirika." },
  "Forte d'une expérience au sein de Family First en Ouganda, elle place l'épanouissement de l'enfant au cœur de toutes les initiatives de développement.": { EN: "With experience at Family First in Uganda, she places children's well-being at the heart of every development initiative.", SW: "Akiwa na uzoefu wa Family First nchini Uganda, anaweka ustawi wa mtoto katikati ya kila mpango wa maendeleo." },
  "Juriste et activiste engagée, elle préside la commission du genre et milite ardemment pour l'égalité et la stricte application des droits de l'enfant.": { EN: "A committed lawyer and activist, she chairs the gender commission and strongly advocates equality and the full application of children's rights.", SW: "Akiwa mwanasheria na mwanaharakati aliyejitolea, anaongoza tume ya jinsia na anatetea kwa nguvu usawa na utekelezaji kamili wa haki za watoto." },
  "Détentrice d'une licence en santé publique (UOB), elle déploie avec compassion son expertise pour garantir le bien-être sanitaire des enfants vulnérables.": { EN: "With a public health degree from UOB, she compassionately applies her expertise to protect the health and well-being of vulnerable children.", SW: "Akiwa na shahada ya afya ya umma kutoka UOB, anatumia utaalamu wake kwa huruma kulinda afya na ustawi wa watoto walio katika mazingira magumu." },
  "Licenciée en agro-industrie (UEA), elle allie transformation agro-alimentaire et sécurité nutritionnelle pour soutenir la santé infantile.": { EN: "With a degree in agro-industry from UEA, she combines food processing and nutritional security to support children's health.", SW: "Akiwa na shahada ya kilimo-viwanda kutoka UEA, anaunganisha usindikaji wa chakula na usalama wa lishe kusaidia afya ya watoto." },
  "Titulaire d'un Master en Droit de l'UOB, il agit avec détermination pour doter l'organisation d'un cadre administratif rigoureux au service de l'action humanitaire.": { EN: "With a Master's degree in Law from UOB, he works determinedly to provide the organization with a rigorous administrative framework for humanitarian action.", SW: "Akiwa na shahada ya uzamili ya sheria kutoka UOB, anafanya kazi kwa azma kuipa shirika mfumo thabiti wa utawala kwa ajili ya kazi ya kibinadamu." },
  "Détenteur d'un Master en Droit (UOB), il participe activement et avec abnégation aux initiatives visant à secourir et protéger les plus vulnérables.": { EN: "With a Master's degree in Law from UOB, he actively and selflessly contributes to initiatives that support and protect the most vulnerable.", SW: "Akiwa na shahada ya uzamili ya sheria kutoka UOB, anashiriki kwa bidii na kujitolea katika mipango ya kusaidia na kulinda walio katika mazingira magumu." },
  "Originaire de Bukavu, elle se distingue par sa capacité d'écoute et son efficacité redoutable dans le déploiement opérationnel des activités de terrain.": { EN: "Originally from Bukavu, she stands out for her listening skills and remarkable efficiency in implementing field activities.", SW: "Akitoka Bukavu, anatambulika kwa uwezo wake wa kusikiliza na ufanisi mkubwa katika kutekeleza shughuli za uwanjani." },
  "Licencié en informatique de l'Université Espoir d'Afrique. Il met la puissance du numérique au profit de l'encadrement stratégique de nos actions.": { EN: "A computer science graduate of Université Espoir d'Afrique, he uses the power of technology to strengthen the strategic direction of our work.", SW: "Akiwa mhitimu wa sayansi ya kompyuta wa Université Espoir d'Afrique, anatumia nguvu ya teknolojia kuimarisha uongozi wa kimkakati wa kazi yetu." },
  "Passionnée et organisée, elle s'investit avec humanisme et rigueur dans la gestion quotidienne de nos missions.": { EN: "Passionate and organized, she brings humanity and rigor to the daily management of our missions.", SW: "Akiwa na shauku na mpangilio, anajitolea kwa utu na umakini katika usimamizi wa kila siku wa misheni zetu." },
  "Président de la Commission Éducation, Activités humanitaires et Défense des droits de l'enfant. Titulaire d'un Master en droit de l'Université Officielle de Bukavu (UOB), il met son expertise juridique au service de la protection des droits de l'enfant et des actions humanitaires.": { EN: "Chair of the Education, Humanitarian Activities and Children's Rights Commission. With a Master's degree in Law from the Official University of Bukavu, he puts his legal expertise at the service of children's rights and humanitarian action.", SW: "Mwenyekiti wa Tume ya Elimu, Shughuli za Kibinadamu na Haki za Watoto. Akiwa na shahada ya uzamili ya sheria kutoka Chuo Kikuu Rasmi cha Bukavu, anatumia utaalamu wake wa kisheria kulinda haki za watoto na kazi ya kibinadamu." },
  "Fondateur & Président du CA": { EN: "Founder & Board Chair", SW: "Mwanzilishi na Mwenyekiti wa Bodi" },
  "Co-fondateur": { EN: "Co-founder", SW: "Mwanzilishi mwenza" },
  "Défenseure des Droits Humains": { EN: "Human Rights Defender", SW: "Mtetezi wa Haki za Binadamu" },
  "Coordinatrice Régionale & Genre": { EN: "Regional & Gender Coordinator", SW: "Mratibu wa Kanda na Jinsia" },
  "Présidente Commission Santé": { EN: "Health Commission Chair", SW: "Mwenyekiti wa Tume ya Afya" },
  "Présidente Agri-business": { EN: "Agri-business Chair", SW: "Mwenyekiti wa Biashara ya Kilimo" },
  "Activiste Humanitaire": { EN: "Humanitarian Activist", SW: "Mwanaharakati wa Kibinadamu" },
  "Membre du Conseil d'Administration": { EN: "Board Member", SW: "Mwanachama wa Bodi" },
  "Expert IT & Humanitaire": { EN: "IT & Humanitarian Expert", SW: "Mtaalamu wa TEHAMA na Kibinadamu" },
  "Président Commission Éducation & Droits de l'enfant": { EN: "Chair, Education & Children's Rights Commission", SW: "Mwenyekiti wa Tume ya Elimu na Haki za Watoto" },
  "Comment les dons sont-ils utilisés ? +": { EN: "How are donations used? +", SW: "Michango inatumikaje? +" },
  "100% de vos dons sont investis directement dans nos programmes : kits scolaires, kits hygiéniques, séances d'écoute, coaching éducatif et accès aux soins de santé.": { EN: "100% of your donations are invested directly in our programs: school kits, hygiene kits, listening sessions, educational coaching and access to healthcare.", SW: "100% ya michango yako inawekezwa moja kwa moja katika mipango yetu: vifaa vya shule, vifaa vya usafi, vipindi vya kusikiliza, ushauri wa kielimu na huduma za afya." },
  "Choisissez votre mode de contribution et aidez-nous à protéger l'avenir des enfants du Sud-Kivu.": { EN: "Choose how you would like to contribute and help us protect the future of South Kivu's children.", SW: "Chagua jinsi ya kuchangia na utusaidie kulinda mustakabali wa watoto wa Kivu Kusini." },
  "Faites un geste ponctuel — chaque don, aussi petit soit-il, offre espoir et dignité à un enfant.": { EN: "Make a one-time contribution — every donation, however small, gives hope and dignity to a child.", SW: "Toa mchango wa mara moja — kila mchango, hata mdogo, humpa mtoto matumaini na heshima." },
  "Devenez parrain mensuel et assurez un soutien régulier et durable à un enfant dans le besoin.": { EN: "Become a monthly sponsor and provide lasting, regular support to a child in need.", SW: "Kuwa mfadhili wa kila mwezi na umpatie mtoto mwenye uhitaji msaada wa kudumu." },
  "L'engagement de la fondation envers les jeunes vulnérables est tout simplement incroyable. Nous avons vu des enfants retrouver le sourire et des familles se reconstruire avec dignité.": { EN: "The foundation's commitment to vulnerable young people is simply incredible. We have seen children smile again and families rebuild their lives with dignity.", SW: "Kujitolea kwa taasisi kwa ajili ya vijana walio katika mazingira magumu ni jambo la kushangaza. Tumeona watoto wakitabasamu tena na familia zikijenga maisha yao kwa heshima." },
  "Être la raison": { EN: "Be the reason", SW: "Kuwa sababu" },
  "MONTANT DU DON (USD)": { EN: "DONATION AMOUNT (USD)", SW: "KIASI CHA MCHANGO (USD)" },
  "Autre montant (1$ à 150$ maximum)": { EN: "Other amount ($1 to $150 maximum)", SW: "Kiasi kingine ($1 hadi $150 kiwango cha juu)" },
  "Montant personnalisé": { EN: "Custom amount", SW: "Kiasi maalum" },
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
