export interface Programme {
  slug: string;
  badge: string;
  badgeColor: "crimson" | "gold";
  title: string;
  img: string;
  paragraphs: string[];
  cta: string;
}

export const programmes: Programme[] = [
  {
    slug: "orphans-health",
    badge: "SANTÉ POUR TOUS",
    badgeColor: "crimson",
    title: "Orphans Health — Parce que chaque enfant mérite une vie en bonne santé",
    img: "/component_pictures/programmes/sante.jpg",
    paragraphs: [
      "Chez Orphans World Foundation, nous croyons fermement que la santé est un droit fondamental, non un privilège. C'est dans cet esprit qu'est né le programme Orphans Health, une initiative entièrement dédiée au bien-être physique et mental des enfants orphelins et vulnérables que nous accompagnons dans la province du Sud-Kivu, en République Démocratique du Congo.",
      "Le programme s'articule autour de trois axes principaux : l'accès aux soins essentiels, la prévention des troubles mentaux et le parrainage médical. Concrètement, nous facilitons les consultations médicales, les vaccinations et l'accès aux médicaments pour des enfants qui, sans notre soutien, n'auraient aucune couverture sanitaire. Chaque enfant bénéficiant d'Orphans Health est suivi par un référent médical et, lorsque la situation l'exige, par un professionnel de la santé mentale.",
      "Dans un contexte marqué par les effets persistants des conflits armés et de la pauvreté extrême dans la région de Bukavu, les traumatismes psychologiques chez les enfants orphelins sont une réalité trop souvent ignorée. Orphans Health s'attaque à cette réalité invisible en intégrant le soutien psychologique comme composante centrale de sa prise en charge. Parce que guérir un enfant, c'est soigner à la fois son corps et son âme.",
    ],
    cta: "Souhaitez-vous soutenir ce programme ? Faites un don ou devenez parrain médical d'un enfant aujourd'hui.",
  },
  {
    slug: "orphans-gender",
    badge: "ÉGALITÉ & GENRE",
    badgeColor: "gold",
    title: "Orphans Gender — Pour l'égalité, la dignité et la protection de toutes et tous",
    img: "/component_pictures/programmes/egalite.jpeg",
    paragraphs: [
      "Le programme Orphans Gender est l'expression de l'engagement profond d'Orphans World Foundation pour une société juste, équitable et respectueuse des droits de chaque enfant, quelle que soit son identité de genre. Dans une région où les inégalités entre filles et garçons persistent et où les discriminations demeurent une réalité quotidienne, notre programme s'impose comme un espace de protection, d'éducation et de transformation sociale.",
      "Nos actions concrètes comprennent des séances de sensibilisation à l'égalité de genre dans les écoles et communautés rurales de la région de Bukavu, des ateliers de formation sur les droits des filles et des garçons, ainsi qu'un programme spécifique d'éducation à l'hygiène menstruelle en milieu rural. Ce dernier volet, souvent tabou, est pourtant crucial : chaque année, des milliers de jeunes filles manquent l'école faute d'accès aux produits hygiéniques adaptés et d'informations fiables sur leur propre corps.",
      "Le programme travaille également à la lutte contre les violences basées sur le genre, en offrant un espace d'écoute et d'orientation pour les enfants victimes de discriminations ou d'abus. En collaborant avec des leaders communautaires, des enseignants et des familles, nous construisons ensemble des normes sociales plus justes et plus humaines, pour que chaque enfant grandisse dans la dignité et le respect qui lui sont dus.",
    ],
    cta: "Ensemble, changeons les mentalités. Votre soutien fait la différence.",
  },
  {
    slug: "orphans-magazine",
    badge: "COMMUNICATION",
    badgeColor: "crimson",
    title: "Orphans Magazine — La voix humanitaire qui porte au-delà des frontières",
    img: "/component_pictures/programmes/comm.jpeg",
    paragraphs: [
      "Dans un monde où l'information peut sauver des vies, Orphans World Foundation a compris très tôt l'importance stratégique de la communication au service de la cause humanitaire. Le programme Orphans Magazine est bien plus qu'un simple bulletin d'information : c'est un outil de sensibilisation, de plaidoyer et de rayonnement pour l'ensemble des actions menées par l'organisation à Bukavu et au-delà.",
      "À travers des publications régulières, des reportages de terrain, des témoignages d'enfants accompagnés et des analyses de la situation humanitaire en RDC, Orphans Magazine donne une voix à ceux qui n'en ont pas. Notre équipe éditoriale produit un contenu rigoureux, accessible et profondément humain, conçu pour toucher un large public : donateurs, partenaires institutionnels, décideurs politiques et grand public national et international.",
      "Le programme joue également un rôle essentiel dans la visibilité et la promotion d'OWF sur les réseaux sociaux, dans les médias locaux et sur la scène internationale. En documentant chaque programme, chaque cause soutenue, chaque succès et chaque défi, Orphans Magazine renforce la crédibilité et la transparence de l'organisation auprès de l'ensemble de ses parties prenantes. Parce que raconter les histoires de ces enfants, c'est déjà agir pour eux.",
    ],
    cta: "Suivez-nous sur nos réseaux sociaux et restez informés de nos actions sur le terrain.",
  },
  {
    slug: "orphans-justice",
    badge: "DROITS DE L'ENFANT",
    badgeColor: "gold",
    title: "Orphans Justice — Défendre les droits de l'enfant, ici et maintenant",
    img: "/component_pictures/programmes/droits.jpg",
    paragraphs: [
      "En République Démocratique du Congo, des millions d'enfants grandissent sans accès aux droits les plus fondamentaux : le droit à une identité, à la protection contre les violences, à la représentation devant la loi. C'est face à cette réalité alarmante qu'Orphans World Foundation a mis en place le programme Orphans Justice, un pilier essentiel de son action humanitaire dans le Sud-Kivu.",
      "Le programme s'articule autour du plaidoyer, de la défense juridique et de la représentation institutionnelle des enfants vulnérables. Nos équipes travaillent en collaboration avec des avocats, des travailleurs sociaux et des institutions compétentes pour accompagner les enfants victimes de violations de leurs droits : exploitation, travail des enfants, abus, refus d'inscription à l'état civil, et bien d'autres situations. Nous intervenons également en amont, en sensibilisant les communautés, les familles et les autorités locales sur les droits de l'enfant tels qu'ils sont consacrés par le droit congolais et les conventions internationales.",
      "Au-delà des cas individuels, Orphans Justice s'engage dans un plaidoyer systémique pour lever les barrières structurelles qui empêchent des milliers d'enfants d'accéder à leurs droits en RDC. Parce qu'un enfant qui connaît ses droits est un enfant mieux armé pour affronter son avenir et résister aux abus. Chaque victoire juridique obtenue pour un enfant est un message fort envoyé à toute une communauté.",
    ],
    cta: "Ensemble, faire de la justice une réalité pour chaque enfant en RDC.",
  },
  {
    slug: "orphans-education",
    badge: "ÉDUCATION",
    badgeColor: "crimson",
    title: "Orphans Education — Ouvrir les portes du savoir à chaque enfant",
    img: "/component_pictures/programmes/edu.jpeg",
    paragraphs: [
      "L'éducation est le levier le plus puissant pour rompre le cycle de la pauvreté et offrir aux orphelins et enfants vulnérables les meilleures chances de construire leur avenir. C'est cette conviction profonde qui est au cœur du programme Orphans Education, l'un des programmes phares d'Orphans World Foundation à Bukavu, en République Démocratique du Congo.",
      "Concrètement, le programme intervient à plusieurs niveaux complémentaires. D'abord, le soutien scolaire direct : des cours de rattrapage, du coaching éducatif et des activités parascolaires sont organisés pour les enfants dont le parcours académique a souffert de l'instabilité de leur situation de vie. Ensuite, la distribution de kits scolaires — cahiers, stylos, uniformes, sacs — permet aux enfants les plus démunis d'accéder à l'école dans des conditions dignes. Enfin, des bourses d'études sont accordées aux élèves les plus méritants, pour les accompagner jusqu'à la réussite de leurs examens d'État et, pour certains, jusqu'à l'enseignement supérieur.",
      "Orphans Education croit en le potentiel absolu de chaque enfant. Nos mentors et accompagnateurs travaillent main dans la main avec les familles d'accueil et les enseignants pour créer un environnement propice à l'apprentissage, même dans les contextes les plus difficiles. Car chaque enfant qui obtient son diplôme est une victoire collective — la preuve vivante que l'espoir peut l'emporter sur l'adversité.",
    ],
    cta: "Investissez dans l'éducation d'un enfant aujourd'hui. Votre soutien peut changer une vie entière.",
  },
  {
    slug: "orphans-agri-business",
    badge: "AGRI-BUSINESS",
    badgeColor: "gold",
    title: "Orphans Agri-Business — Nourrir les corps, bâtir l'autonomie",
    img: "/component_pictures/programmes/agri.jpeg",
    paragraphs: [
      "La région du Sud-Kivu, malgré la richesse exceptionnelle de ses terres, connaît des défis de taille en matière de sécurité alimentaire et d'autonomisation économique des communautés vulnérables. Le programme Orphans Agri-Business d'Orphans World Foundation répond à ces enjeux en proposant une approche intégrée qui lie agriculture durable, nutrition et entrepreneuriat communautaire.",
      "Piloté par une commission agri-business dédiée, ce programme forme et accompagne des jeunes, des femmes et des familles vulnérables dans les pratiques d'agriculture responsable, de transformation agroalimentaire et de commercialisation des produits locaux. Des ateliers pratiques, des formations en gestion de micro-entreprises et des séances d'éducation nutritionnelle sont régulièrement organisés afin de renforcer les capacités des bénéficiaires et de favoriser leur autonomie économique durable.",
      "Orphans Agri-Business s'inscrit dans une vision globale ambitieuse : faire de chaque famille accompagnée par OWF non plus un simple bénéficiaire de l'aide humanitaire, mais un acteur économique à part entière, capable de produire, de transformer, de vendre et de subvenir dignement à ses propres besoins. En combinant savoir-faire agricole et esprit entrepreneurial, nous contribuons à bâtir des communautés plus résilientes et plus prospères à Bukavu et dans ses environs.",
    ],
    cta: "L'autonomie se cultive. Soutenez le programme Orphans Agri-Business pour un avenir économique meilleur.",
  },
];
