export type ProgrammeLocale = "EN" | "SW";

type ProgrammeTranslation = {
  badge: string;
  title: string;
  paragraphs: string[];
  cta: string;
};

export const programmeTranslations: Record<string, Record<ProgrammeLocale, ProgrammeTranslation>> = {
  "orphans-health": {
    EN: {
      badge: "HEALTH FOR ALL",
      title: "Orphans Health — Because every child deserves a healthy life",
      paragraphs: [
        "At Orphans World Foundation, we firmly believe that health is a fundamental right, not a privilege. This belief led to Orphans Health, an initiative dedicated to the physical and mental well-being of the orphaned and vulnerable children we support in South Kivu, Democratic Republic of the Congo.",
        "We promote children's health through prevention, awareness and health education, with special attention to children's mental health, early screening, psychosocial support, disease prevention and healthy practices.",
        "In a region affected by armed conflict and extreme poverty, psychological trauma among orphaned children is too often overlooked. Orphans Health responds by making psychological support central to our care, because healing a child means caring for both body and mind.",
      ],
      cta: "Would you like to support this program? Donate or become a child's medical sponsor today.",
    },
    SW: {
      badge: "AFYA KWA WOTE",
      title: "Orphans Health — Kwa sababu kila mtoto anastahili maisha yenye afya",
      paragraphs: [
        "Katika Orphans World Foundation, tunaamini kwa dhati kwamba afya ni haki ya msingi, si upendeleo. Ndiyo maana tumeanzisha Orphans Health, mpango unaolenga ustawi wa kimwili na kiakili wa watoto yatima na walio katika mazingira magumu tunaowasaidia Kivu Kusini, Jamhuri ya Kidemokrasia ya Kongo.",
        "Tunakuza afya ya watoto kupitia kinga, uhamasishaji na elimu ya afya, tukizingatia afya ya akili ya watoto, utambuzi wa mapema, msaada wa kisaikolojia na kijamii, kinga ya magonjwa na tabia bora za afya.",
        "Katika eneo lililoathiriwa na migogoro na umaskini, majeraha ya kisaikolojia ya watoto yatima mara nyingi hupuuzwa. Orphans Health inaweka msaada wa kisaikolojia katikati ya huduma zetu, kwa sababu kumponya mtoto ni kutunza mwili na akili yake.",
      ],
      cta: "Ungependa kusaidia mpango huu? Toa mchango au uwe mfadhili wa matibabu ya mtoto leo.",
    },
  },
  "orphans-gender": {
    EN: {
      badge: "EQUALITY & GENDER",
      title: "Orphans Gender — For equality, dignity and protection for everyone",
      paragraphs: [
        "Orphans Gender expresses Orphans World Foundation's commitment to a fair society that respects every child's rights, regardless of gender. Where inequalities between girls and boys persist, our program creates space for protection, education and social transformation.",
        "Our actions include awareness sessions on gender equality in schools and rural communities around Bukavu, workshops on girls' and boys' rights, and menstrual hygiene education. This often-taboo issue is essential because many girls miss school without suitable products and reliable information.",
        "The program also fights gender-based violence by offering listening and referral services for children affected by discrimination or abuse. Together with community leaders, teachers and families, we build fairer social norms so every child grows with dignity and respect.",
      ],
      cta: "Together, let us change mindsets. Your support makes a difference.",
    },
    SW: {
      badge: "USAWA NA JINSIA",
      title: "Orphans Gender — Kwa usawa, heshima na ulinzi wa kila mtu",
      paragraphs: [
        "Orphans Gender unaonyesha kujitolea kwa Orphans World Foundation kujenga jamii yenye haki inayoheshimu haki za kila mtoto, bila kujali jinsia. Katika eneo ambako tofauti kati ya wasichana na wavulana zinaendelea, mpango wetu unatoa ulinzi, elimu na mabadiliko ya kijamii.",
        "Tunafanya uhamasishaji wa usawa wa jinsia shuleni na vijijini karibu na Bukavu, warsha kuhusu haki za wasichana na wavulana, pamoja na elimu ya usafi wa hedhi. Eneo hili ni muhimu kwa sababu wasichana wengi hukosa shule kwa kukosa vifaa na taarifa sahihi.",
        "Mpango huu pia unapambana na ukatili wa kijinsia kwa kutoa nafasi ya kusikiliza na kuelekeza watoto walioathiriwa na ubaguzi au unyanyasaji. Pamoja na viongozi, walimu na familia, tunajenga jamii yenye haki zaidi.",
      ],
      cta: "Kwa pamoja, tubadili mitazamo. Msaada wako unaleta tofauti.",
    },
  },
  "orphans-magazine": {
    EN: {
      badge: "COMMUNICATION",
      title: "Orphans Magazine — A humanitarian voice beyond borders",
      paragraphs: [
        "In a world where information can save lives, Orphans World Foundation understands the strategic value of communication for humanitarian work. Orphans Magazine is more than a newsletter: it is a tool for awareness, advocacy and visibility for the organization's work in Bukavu and beyond.",
        "Through regular publications, field reports, testimonies and analysis of the humanitarian situation in the DRC, Orphans Magazine gives a voice to those who are too often unheard. Our editorial team creates rigorous, accessible and deeply human content for donors, partners, decision-makers and the public.",
        "The program also strengthens OWF's visibility on social media, local media and the international stage. By documenting each program, success and challenge, Orphans Magazine reinforces the organization's credibility and transparency.",
      ],
      cta: "Follow us on social media and stay informed about our work in the field.",
    },
    SW: {
      badge: "MAWASILIANO",
      title: "Orphans Magazine — Sauti ya kibinadamu inayovuka mipaka",
      paragraphs: [
        "Katika dunia ambamo taarifa zinaweza kuokoa maisha, Orphans World Foundation inaelewa umuhimu wa mawasiliano katika kazi ya kibinadamu. Orphans Magazine si jarida tu: ni chombo cha uhamasishaji, utetezi na kuonyesha kazi ya shirika Bukavu na kwingineko.",
        "Kupitia machapisho, ripoti za uwanjani, ushuhuda na uchambuzi wa hali ya kibinadamu nchini DRC, Orphans Magazine inawapa sauti wale ambao mara nyingi hawasikiki. Timu yetu inaunda maudhui sahihi, yanayoeleweka na yenye utu.",
        "Mpango huu pia unaimarisha mwonekano wa OWF kwenye mitandao ya kijamii, vyombo vya habari vya ndani na kimataifa. Kwa kurekodi kila mpango, mafanikio na changamoto, tunaimarisha uaminifu na uwazi wa shirika.",
      ],
      cta: "Tufuate kwenye mitandao ya kijamii na ujue kazi yetu ya uwanjani.",
    },
  },
  "orphans-justice": {
    EN: {
      badge: "CHILDREN'S RIGHTS",
      title: "Orphans Justice — Defending children's rights, here and now",
      paragraphs: [
        "In the Democratic Republic of the Congo, millions of children grow up without access to fundamental rights: identity, protection from violence and representation before the law. Orphans Justice was created in response to this reality and is a key pillar of our humanitarian work in South Kivu.",
        "The program focuses on advocacy, legal protection and institutional representation for vulnerable children. Our teams work with lawyers, social workers and institutions to support children facing exploitation, child labour, abuse or lack of civil registration, while educating communities and authorities about children's rights.",
        "Beyond individual cases, Orphans Justice advocates for systemic change to remove structural barriers to rights in the DRC. Every legal victory for a child sends a strong message to the whole community.",
      ],
      cta: "Together, let us make justice a reality for every child in the DRC.",
    },
    SW: {
      badge: "HAKI ZA WATOTO",
      title: "Orphans Justice — Kutetea haki za watoto, hapa na sasa",
      paragraphs: [
        "Katika Jamhuri ya Kidemokrasia ya Kongo, mamilioni ya watoto hukua bila haki za msingi: utambulisho, ulinzi dhidi ya ukatili na uwakilishi mbele ya sheria. Orphans Justice iliundwa kujibu hali hii na ni nguzo muhimu ya kazi yetu Kivu Kusini.",
        "Mpango huu unalenga utetezi, ulinzi wa kisheria na uwakilishi wa kitaasisi wa watoto walio katika mazingira magumu. Timu zetu hufanya kazi na mawakili, wafanyakazi wa kijamii na taasisi kusaidia watoto wanaokabili unyonyaji, ajira ya watoto, unyanyasaji au ukosefu wa usajili wa kiraia.",
        "Zaidi ya kesi binafsi, Orphans Justice inatetea mabadiliko ya mifumo ili kuondoa vikwazo vinavyozuia watoto kupata haki zao nchini DRC. Kila ushindi wa kisheria kwa mtoto ni ujumbe kwa jamii nzima.",
      ],
      cta: "Kwa pamoja, tufanye haki iwe ukweli kwa kila mtoto nchini DRC.",
    },
  },
  "orphans-education": {
    EN: {
      badge: "EDUCATION",
      title: "Orphans Education — Opening the doors of knowledge to every child",
      paragraphs: [
        "Education is the most powerful lever for breaking the cycle of poverty and giving orphaned and vulnerable children the best chance to build their future. This conviction is at the heart of Orphans Education, one of OWF's leading programs in Bukavu.",
        "The program provides tutoring, educational coaching and extracurricular activities for children whose studies have been affected by instability. School kits, uniforms and bags help the most disadvantaged children attend school with dignity, while scholarships support deserving students through exams and higher education.",
        "Orphans Education believes in every child's potential. Our mentors work with host families and teachers to create an environment that supports learning, even in difficult circumstances. Every child who graduates is a collective victory.",
      ],
      cta: "Invest in a child's education today. Your support can change an entire life.",
    },
    SW: {
      badge: "ELIMU",
      title: "Orphans Education — Kufungua milango ya maarifa kwa kila mtoto",
      paragraphs: [
        "Elimu ni nguvu kubwa zaidi ya kuvunja mzunguko wa umaskini na kuwapa watoto yatima na walio katika mazingira magumu nafasi bora ya kujenga maisha yao. Imani hii iko katikati ya Orphans Education, mojawapo ya mipango mikuu ya OWF Bukavu.",
        "Mpango huu hutoa masomo ya ziada, ushauri wa kielimu na shughuli za baada ya shule kwa watoto ambao masomo yao yameathiriwa na hali ya maisha. Vifaa vya shule, sare na mabegi huwasaidia watoto wasiojiweza kwenda shule kwa heshima, huku ufadhili ukiwasaidia wanafunzi wenye bidii.",
        "Orphans Education inaamini katika uwezo wa kila mtoto. Washauri wetu hushirikiana na familia na walimu kuunda mazingira yanayosaidia kujifunza hata katika hali ngumu. Kila mtoto anayehitimu ni ushindi wa pamoja.",
      ],
      cta: "Wekeza katika elimu ya mtoto leo. Msaada wako unaweza kubadilisha maisha yote.",
    },
  },
  "orphans-agri-business": {
    EN: {
      badge: "AGRI-BUSINESS",
      title: "Orphans Agri-Business — Nourishing bodies, building self-reliance",
      paragraphs: [
        "Despite the richness of its land, South Kivu faces major challenges in food security and economic empowerment. Orphans Agri-Business responds with an integrated approach linking sustainable agriculture, nutrition and community entrepreneurship.",
        "The program trains and supports young people, women and vulnerable families in responsible agriculture, food processing and local marketing. Practical workshops, micro-business training and nutrition education strengthen beneficiaries' skills and promote lasting economic independence.",
        "Our ambition is for every family supported by OWF to become an economic actor able to produce, transform, sell and meet its own needs with dignity. By combining agricultural knowledge and entrepreneurship, we help build resilient communities in and around Bukavu.",
      ],
      cta: "Self-reliance is cultivated. Support Orphans Agri-Business for a better economic future.",
    },
    SW: {
      badge: "BIASHARA YA KILIMO",
      title: "Orphans Agri-Business — Kulisha miili, kujenga kujitegemea",
      paragraphs: [
        "Licha ya utajiri wa ardhi yake, Kivu Kusini inakabiliwa na changamoto za usalama wa chakula na uwezeshaji wa kiuchumi. Orphans Agri-Business inajibu changamoto hizi kwa kuunganisha kilimo endelevu, lishe na ujasiriamali wa jamii.",
        "Mpango huu huwafundisha na kuwaunga mkono vijana, wanawake na familia zilizo katika mazingira magumu katika kilimo bora, usindikaji wa chakula na uuzaji wa bidhaa za ndani. Warsha, mafunzo ya biashara ndogo na elimu ya lishe huimarisha uwezo wao.",
        "Lengo letu ni kila familia inayosaidiwa na OWF iwe mshiriki wa kiuchumi anayeweza kuzalisha, kusindika, kuuza na kukidhi mahitaji yake kwa heshima. Kwa kuchanganya ujuzi wa kilimo na ujasiriamali, tunajenga jamii zenye uwezo wa kustahimili.",
      ],
      cta: "Kujitegemea hulimwa. Saidia Orphans Agri-Business kwa mustakabali bora wa kiuchumi.",
    },
  },
};
