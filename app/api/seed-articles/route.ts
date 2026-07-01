import { NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase';

const LEGACY_ARTICLES = [
  {
    titre: 'Upendo Feast : Distribution de kits scolaires',
    slug: 'upendo-feast-distribution-kits-scolaires',
    extrait: "À l'occasion de la Journée internationale de l'enfant africain, nous avons distribué des kits scolaires aux enfants de l'E.P. Bukunda dans la chefferie de MITI.",
    contenu: "À l'occasion de la Journée internationale de l'enfant africain, nous avons distribué des kits scolaires aux enfants de l'E.P. Bukunda dans la chefferie de MITI. Cette initiative s'inscrit dans notre programme Upendo Feast qui vise à soutenir l'éducation des enfants vulnérables en leur fournissant le matériel nécessaire pour réussir leur scolarité.",
    image_url: '/component_pictures/blog/20_juin_2024.jpeg',
    categorie: 'Éducation',
    publie: true,
    created_at: '2024-06-20T10:00:00Z',
  },
  {
    titre: "1ère Assemblée Générale : Bâtir l'avenir ensemble",
    slug: '1ere-assemblee-generale-batir-avenir-ensemble',
    extrait: "Réunion des membres internes et externes pour définir les orientations stratégiques et renforcer la cohésion de l'organisation.",
    contenu: "Réunion des membres internes et externes pour définir les orientations stratégiques et renforcer la cohésion de l'organisation. Cette première assemblée générale a marqué un tournant dans la vie de l'ONG, avec l'adoption de notre plan stratégique triennal et la mise en place de nos commissions thématiques.",
    image_url: '/component_pictures/blog/6_juillet_2024.png',
    categorie: 'Organisation',
    publie: true,
    created_at: '2024-07-06T10:00:00Z',
  },
  {
    titre: 'Deuxième Assemblée Générale',
    slug: 'deuxieme-assemblee-generale',
    extrait: "Présentation et évaluation de la deuxième édition du projet annuel Upendo Feast. Les échanges ont porté sur l'écoute, l'empathie, la sensibilisation et le parrainage des enfants vulnérables.",
    contenu: "Présentation et évaluation de la deuxième édition du projet annuel Upendo Feast. Les échanges ont porté sur l'écoute, l'empathie, la sensibilisation et le parrainage des enfants vulnérables, ainsi que sur les améliorations futures du projet. L'assemblée a également validé les comptes de l'exercice et approuvé le budget prévisionnel.",
    image_url: '/component_pictures/blog/25_juin_2025.jpeg',
    categorie: 'Organisation',
    publie: true,
    created_at: '2025-06-25T10:00:00Z',
  },
  {
    titre: 'Hygiène Menstruelle : Briser le silence en milieu rural',
    slug: 'hygiene-menstruelle-briser-silence-milieu-rural',
    extrait: 'Séances de sensibilisation à l\'hygiène menstruelle pour les jeunes filles de MITI, avec distribution de kits hygiéniques.',
    contenu: "Séances de sensibilisation à l'hygiène menstruelle pour les jeunes filles de MITI, avec distribution de kits hygiéniques. Ces ateliers ont permis de briser les tabous autour de la santé menstruelle et d'outiller les jeunes filles avec des produits adaptés et des connaissances essentielles pour leur bien-être.",
    image_url: '/component_pictures/blog/5_aout_2025.jpeg',
    categorie: 'Santé',
    publie: true,
    created_at: '2025-08-05T10:00:00Z',
  },
  {
    titre: 'Activité « Arbre de Vie » — AFPD Bukavu',
    slug: 'activite-arbre-de-vie-afpd-bukavu',
    extrait: "Séance d'écoute et d'empathie avec les enfants du centre de l'AFPD à Nguba. Espace sécurisé pour partager rêves et aspirations.",
    contenu: "Séance d'écoute et d'empathie avec les enfants du centre de l'AFPD à Nguba. Espace sécurisé pour partager rêves et aspirations. L'activité Arbre de Vie est un outil psychosocial qui permet aux enfants de visualiser leur parcours, leurs forces et leurs projets d'avenir dans un cadre bienveillant et sécurisé.",
    image_url: '/component_pictures/blog/30_aout_2025.png',
    categorie: 'Social',
    publie: true,
    created_at: '2025-08-30T10:00:00Z',
  },
  {
    titre: "Journée de l'Éducation : Anglais et e-books",
    slug: 'journee-education-anglais-e-books',
    extrait: "Apprentissage de l'anglais et distribution d'e-books aux enfants de l'AFPD pour renforcer leur encadrement éducatif.",
    contenu: "Apprentissage de l'anglais et distribution d'e-books aux enfants de l'AFPD pour renforcer leur encadrement éducatif. Dans un monde de plus en plus connecté, la maîtrise de l'anglais et l'accès aux ressources numériques sont des leviers essentiels pour l'épanouissement des jeunes.",
    image_url: '/component_pictures/blog/24_janvier_2026.jpeg',
    categorie: 'Éducation',
    publie: true,
    created_at: '2026-01-24T10:00:00Z',
  },
  {
    titre: 'Ouverture officielle Commission Agri-Business',
    slug: 'ouverture-officielle-commission-agri-business',
    extrait: "Lancement de la commission d'agri-business pour promouvoir la santé nutritionnelle et l'entrepreneuriat communautaire.",
    contenu: "Lancement de la commission d'agri-business pour promouvoir la santé nutritionnelle et l'entrepreneuriat communautaire. Cette nouvelle commission vise à développer des projets agricoles durables qui permettront aux familles de renforcer leur résilience économique tout en assurant la sécurité alimentaire des enfants.",
    image_url: '/component_pictures/blog/24_fevrier_2026.jpeg',
    categorie: 'Agriculture',
    publie: true,
    created_at: '2026-02-24T10:00:00Z',
  },
];

export async function POST() {
  try {
    const supabase = createAdminClient();

    const { data: existing } = await supabase
      .from('articles')
      .select('slug');

    const existingSlugs = new Set((existing ?? []).map((a: { slug: string }) => a.slug));
    const toInsert = LEGACY_ARTICLES.filter(a => !existingSlugs.has(a.slug));

    if (toInsert.length === 0) {
      return NextResponse.json({ message: 'Tous les articles existent déjà.', inserted: 0 });
    }

    const { error, data } = await supabase.from('articles').insert(toInsert).select('titre');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: `${toInsert.length} article(s) importé(s) avec succès.`,
      inserted: toInsert.length,
      articles: data?.map((a: { titre: string }) => a.titre),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
