// ODONTIA — données pédagogiques complètes (fidèles au CM6 UE2 — Lésions carieuses)
// Chaque mission : briefing, codex (blocs), flashcards, quiz (boss).
// quiz : type "multi" (plusieurs bonnes réponses possibles) ou "single".

export const GRADES = [
  { lvl: 1, title: 'Stagiaire en Brossage', icon: '🪥', xp: 0 },
  { lvl: 2, title: 'Sentinelle de la Pellicule', icon: '🛡️', xp: 500 },
  { lvl: 3, title: 'Chasseur de Mutans', icon: '⚔️', xp: 1200 },
  { lvl: 4, title: 'Chevalier de la Salive', icon: '💧', xp: 2000 },
  { lvl: 5, title: 'Cartographe des Lésions', icon: '🗺️', xp: 3000 },
  { lvl: 6, title: "Grand Maître de l'Émail", icon: '👑', xp: 4000 },
]

export const MISSIONS = [
  // ───────────────────────── MISSION 1 ─────────────────────────
  {
    id: 'm1',
    n: 1,
    title: "L'Aube du Gardien",
    zone: "Surface de l'émail",
    icon: '🌅',
    color: '#f6c453',
    badge: { icon: '🩺', name: 'Premier Diagnostic' },
    xpReward: 200,
    briefing:
      "Tu te réveilles miniaturisé sur une plaine d'émail étincelant : le Royaume d'Odontia. Un vieux Gardien t'accueille : « Tout semble calme… mais une maladie silencieuse ronge déjà ce monde. Apprends à la nommer, car on ne combat bien que ce que l'on comprend. »",
    codex: [
      {
        h: 'Vocabulaire fondateur (à ne jamais confondre)',
        items: [
          '**Maladie carieuse** : maladie infectieuse, multifactorielle, transmissible (dent→dent, plus rarement mère→bébé via la flore buccale), chronique, caractérisée par la destruction localisée des tissus dentaires par les acides issus de la fermentation bactérienne des glucides.',
          '**Lésion carieuse** : le signe et la conséquence de la maladie non prise en charge. Ce n\'est PAS la maladie.',
          '**Cariologie** : étude de la maladie carieuse (scientifique, médical, épidémiologique).',
          '⚠️ Soigner seulement la lésion sans traiter les causes = soin incomplet. On gère d\'abord la maladie, ensuite la conséquence.',
        ],
      },
      {
        h: 'Les 4 stades de l\'effondrement',
        intro:
          '**Étiopathogénie** : processus par lequel une lésion apparaît sur un site précis puis évolue jusqu\'à former une cavité.',
        table: {
          head: ['Stade', 'Localisation', 'Douleur', 'Réversible', 'Conduite'],
          rows: [
            ['1', 'Émail (sub-surface)', 'Non (émail non innervé)', '✅ Oui', 'Reminéralisation (Ca, PO₄)'],
            ['2', 'Dentine', 'Oui (canalicules)', '❌ Non', 'Chirurgical + biomatériaux'],
            ['3', 'Pulpe', 'Très douloureux (rage de dent)', '❌ Non', 'Retrait pulpe enflammée'],
            ['4', 'Périapical', 'Disparaît puis cellulite', '❌ Non', 'Traitement canalaire'],
          ],
        },
        items: [
          '🔑 Séquence : **Émail → Dentine → Pulpe → Périapical**. Jamais l\'inverse.',
          '🔑 L\'organisme reminéralise l\'émail (calcium) mais ne recrée PAS de collagène (la dentine ne se régénère pas).',
          'Tant que l\'émail n\'est pas effondré → simple reminéralisation, pas de chirurgie systématique.',
        ],
      },
    ],
    flashcards: [
      { q: 'Maladie vs lésion carieuse ?', a: 'La maladie = cause infectieuse multifactorielle ; la lésion = sa conséquence / son signe.' },
      { q: 'La maladie carieuse est-elle transmissible ?', a: 'Oui (dent→dent, mère→bébé via la salive).' },
      { q: '4 caractères de la maladie carieuse ?', a: 'Infectieuse, multifactorielle, transmissible, chronique.' },
      { q: 'Le stade 1 (émail) est-il douloureux ?', a: 'Non, l\'émail n\'est pas innervé.' },
      { q: 'Dernier stade réversible ?', a: 'Stade 1 (émail), tant que la jonction émail-dentine est intacte.' },
      { q: 'Rage de dent = quel stade ?', a: 'Stade 3 (atteinte pulpaire).' },
      { q: 'Joue gonflée / cellulite = quel stade ?', a: 'Stade 4 (nécrose + complication péri-apicale).' },
      { q: 'L\'organisme peut-il recréer du collagène dentinaire ?', a: 'Non ; il sait seulement reminéraliser l\'émail (calcium).' },
      { q: 'Séquence évolutive de la lésion ?', a: 'Émail → Dentine → Pulpe → Périapical.' },
    ],
    quiz: [
      {
        type: 'multi',
        q: 'Concernant la maladie carieuse, quelle(s) proposition(s) est/sont exacte(s) ?',
        options: [
          { t: 'C\'est une maladie infectieuse multifactorielle.', ok: true },
          { t: 'Elle est due uniquement à la présence de bactéries.', ok: false },
          { t: 'Le saccharose est le sucre le plus cariogène.', ok: true },
          { t: 'Le temps (fréquence des repas, grignotage) est un facteur clé.', ok: true },
          { t: 'Elle n\'est pas transmissible.', ok: false },
        ],
        explain:
          'Les bactéries seules ne suffisent pas (il faut sucre + hôte + temps). Elle est bien transmissible (ex. mère→enfant via salive).',
      },
      {
        type: 'single',
        q: 'Quelle est la bonne séquence évolutive d\'une lésion non traitée ?',
        options: [
          { t: 'Émail → dentine → pulpe → tissus périapicaux', ok: true },
          { t: 'Pulpe → dentine → émail', ok: false },
          { t: 'Émail → pulpe → dentine', ok: false },
          { t: 'Dentine → émail → pulpe', ok: false },
        ],
        explain: 'La carie commence par l\'émail ; la dentine est toujours touchée avant la pulpe.',
      },
      {
        type: 'single',
        q: 'Tache blanche indolore sur l\'émail, sans effondrement de surface. Conduite ?',
        options: [
          { t: 'Reminéralisation (lésion réversible)', ok: true },
          { t: 'Traitement canalaire immédiat', ok: false },
          { t: 'Extraction de la dent', ok: false },
          { t: 'Aucune action, c\'est définitif', ok: false },
        ],
        explain: 'Le stade 1 est réversible : reminéralisation, pas de chirurgie systématique.',
      },
    ],
  },

  // ───────────────────────── MISSION 2 ─────────────────────────
  {
    id: 'm2',
    n: 2,
    title: 'La Balance Sacrée',
    zone: "Surface de l'émail",
    icon: '⚖️',
    color: '#9ad0ec',
    badge: { icon: '⚖️', name: 'Maître de l\'Équilibre' },
    xpReward: 250,
    briefing:
      "Au cœur d'Odontia trône la Balance Sacrée : d'un plateau, l'acide qui déminéralise ; de l'autre, la salive qui reminéralise. Tant qu'elle est en équilibre, le royaume tient. Mais elle vacille…",
    codex: [
      {
        h: 'Le diagramme de Keyes (1962) — les 3 facteurs',
        items: [
          '**Hôte** (le patient et ses dents)',
          '**Bactéries** (l\'écosystème buccal)',
          '**Alimentation** (les sucres, surtout le saccharose)',
          '🔑 Supprimer un seul des 3 facteurs → le risque de lésion diminue.',
        ],
      },
      {
        h: 'Enrichissement de König (1987) — le facteur TEMPS',
        items: [
          'König ajoute le 4ᵉ facteur : le **temps** pendant lequel les 3 autres sont réunis.',
          'Le grignotage et les prises répétées majorent considérablement le risque.',
          'Le risque est proportionnel au temps de latence entre la prise alimentaire et le brossage.',
          '➡️ Se brosser après le repas. Le **temps est le facteur le plus important**.',
        ],
      },
      {
        h: 'Les 3 niveaux de facteurs étiopathogéniques',
        table: {
          head: ['Niveau', 'Exemples'],
          rows: [
            ['Primaires (directs)', 'Hôte, bactéries, alimentation, temps'],
            ['Secondaires (environnement oral)', 'Salive, espèces bactériennes, fluorures (eau, sel)'],
            ['Tertiaires (environnement personne)', 'Niveau socio-économique, couverture sociale, information, hygiène'],
          ],
        },
      },
      {
        h: 'La dynamique déminéralisation ↔ reminéralisation',
        items: [
          'Après un repas → glucides métabolisés par les bactéries → acide → chute du pH → déminéralisation.',
          'La salive réagit : ses ions **calcium + phosphate** (éléments majeurs de l\'émail) reminéralisent en précipitant.',
          'Trop de glucides OU trop de bactéries → la défense salivaire est dépassée.',
          '➡️ La lésion apparaît quand la balance penche durablement vers la déminéralisation.',
        ],
      },
    ],
    flashcards: [
      { q: '3 facteurs de Keyes ?', a: 'Hôte, bactéries, alimentation.' },
      { q: 'Qu\'ajoute König en 1987 ?', a: 'Le temps (4ᵉ facteur).' },
      { q: 'Facteur le plus important ?', a: 'Le temps / la fréquence.' },
      { q: 'Si on supprime 1 facteur de Keyes ?', a: 'Le risque diminue.' },
      { q: 'Salive = facteur primaire ou secondaire ?', a: 'Secondaire.' },
      { q: 'Niveau socio-économique = quel niveau ?', a: 'Tertiaire.' },
      { q: '2 ions reminéralisateurs majeurs de l\'émail ?', a: 'Calcium + phosphate.' },
      { q: 'Quand apparaît la lésion ?', a: 'Quand la balance penche durablement vers la déminéralisation.' },
    ],
    quiz: [
      {
        type: 'single',
        q: 'Quel facteur König ajoute-t-il au diagramme de Keyes en 1987 ?',
        options: [
          { t: 'Le temps', ok: true },
          { t: 'La salive', ok: false },
          { t: 'Le fluor', ok: false },
          { t: 'La génétique', ok: false },
        ],
        explain: 'Le temps pendant lequel hôte + bactéries + alimentation sont réunis ; c\'est le facteur le plus important.',
      },
      {
        type: 'multi',
        q: 'Quels éléments sont des facteurs étiopathogéniques SECONDAIRES ?',
        options: [
          { t: 'La salive et sa composition', ok: true },
          { t: 'Les fluorures (eau, sel)', ok: true },
          { t: 'Le niveau socio-économique', ok: false },
          { t: 'Les espèces bactériennes', ok: true },
          { t: 'Le temps', ok: false },
        ],
        explain: 'Niveau socio-économique = tertiaire ; temps = primaire. Salive, fluorures et espèces bactériennes = secondaires (environnement oral).',
      },
      {
        type: 'single',
        q: 'La balance penche vers la déminéralisation chez un patient qui grignote toute la journée malgré une bonne hygiène. Levier prioritaire ?',
        options: [
          { t: 'Réduire la fréquence (facteur temps)', ok: true },
          { t: 'Changer de dentifrice', ok: false },
          { t: 'Augmenter le brossage à 5 fois/jour', ok: false },
          { t: 'Ne rien faire', ok: false },
        ],
        explain: 'Le temps/la fréquence est le facteur déterminant : espacer les prises alimentaires.',
      },
    ],
  },

  // ───────────────────────── MISSION 3 ─────────────────────────
  {
    id: 'm3',
    n: 3,
    title: "L'Armée de l'Ombre",
    zone: 'Jonction émail-dentine',
    icon: '🦠',
    color: '#b388eb',
    badge: { icon: '⚔️', name: 'Chasseur de Mutans' },
    xpReward: 350,
    briefing:
      "L'ennemi ne charge pas en bloc : il bâtit une cité fortifiée sur tes murs — la plaque. Comprends comment elle se construit, identifie les trois factions ennemies, et perce les secrets de leur seigneur : Streptococcus Mutans.",
    codex: [
      {
        h: 'L\'écosystème buccal & le biofilm',
        items: [
          'Cavité buccale = écosystème : composante biotique (bactéries) + abiotique (salive, température, O₂, nutriments, fluide créviculaire).',
          'Flore : stérile à la naissance → flore en quelques heures → 1ᵉˢ espèces à 10 j → moitié à 5 mois → **toutes les espèces à 6 mois** (apparition des dents).',
          '~750 millions de bactéries/ml de salive ; > 10¹⁰ bactéries, > 500 espèces ; 6 milliards renouvelées en 2 h.',
          'Pas de vaccin efficace → le meilleur vaccin = l\'hygiène / le brossage.',
          '**Biofilm** : organisation 3D dynamique et symbiotique adhérant à une surface, avec matrice adhésive et protectrice.',
        ],
      },
      {
        h: 'Propriétés des bactéries cariogènes',
        items: [
          '**Acidogènes** : rejettent des acides (surtout acide lactique).',
          '**Acidophiles** : se développent en milieu acide.',
          'Capables de synthétiser des polymères de sucre (intra et extracellulaires).',
        ],
      },
      {
        h: 'Les 3 grandes familles cariogènes (à connaître)',
        table: {
          head: ['Famille', '%', 'Cible / rôle'],
          rows: [
            ['Streptocoques (mutans…)', '50 %', 'Émail — INITIENT la lésion (la + importante)'],
            ['Lactobacilles', '20 %', 'Dentine — colonisateurs secondaires, aciduriques'],
            ['Actinomyces', '2 %', 'Racine — caries radiculaires'],
          ],
        },
        items: [
          'S. Mutans : affinité pour le saccharose ; 10 à 100× plus nombreux sur une lésion initiale que sur surface saine.',
        ],
      },
      {
        h: 'La formation de la plaque',
        items: [
          '1. Glycoprotéines salivaires + hydroxyapatite → **Pellicule Exogène Acquise (PAE)** : abactérienne, permanente.',
          '2. Colonisation primaire : bactéries à récepteurs s\'ancrent sur les glycoprotéines.',
          '3. Polysaccharides extracellulaires → ancrage des colonisateurs secondaires → coagrégation.',
          '4. La pellicule grossit → acide lactique → déminéralise l\'émail ; devient imperméable → bloque Ca/PO₄/F → plaque.',
          '🔑 Plaque = biofilm. Biofilm minéralisé = **tartre**.',
        ],
      },
      {
        h: 'Facteurs de virulence du S. Mutans (à connaître)',
        items: [
          '**Habitat naturel** : la dent (sillons, faces proximales).',
          '**Aciduricité** : développement en milieu acide.',
          '**Acidogénécité** : production d\'acides (déminéralisation des tissus durs).',
          '**Acido-tolérance** : survie en milieu acide.',
        ],
      },
    ],
    flashcards: [
      { q: 'Quand toutes les espèces bactériennes sont-elles présentes ?', a: 'À 6 mois (apparition des dents).' },
      { q: 'Combien de bactéries par ml de salive ?', a: '~750 millions.' },
      { q: 'Définition du biofilm ?', a: 'Communauté 3D dynamique symbiotique adhérant à une surface, avec matrice protectrice.' },
      { q: '3 familles cariogènes + cible ?', a: 'Streptocoques (émail/initiation), Lactobacilles (dentine), Actinomyces (racine).' },
      { q: '% des trois familles ?', a: 'Streptocoques 50 %, Lactobacilles 20 %, Actinomyces 2 %.' },
      { q: 'Quelle bactérie initie la lésion ?', a: 'Streptocoque mutans (sur l\'émail).' },
      { q: 'Sucre préféré du S. Mutans ?', a: 'Le saccharose.' },
      { q: 'La PAE est-elle bactérienne ?', a: 'Non, abactérienne (glycoprotéines sur hydroxyapatite).' },
      { q: 'Plaque minéralisée = ?', a: 'Tartre.' },
      { q: '3 propriétés des bactéries cariogènes ?', a: 'Acidogènes, acidophiles, synthèse de polymères de sucre.' },
      { q: '4 facteurs de virulence du S. Mutans ?', a: 'Habitat dentaire, aciduricité, acidogénécité, acido-tolérance.' },
      { q: 'Acidogène vs acidophile/acidurique ?', a: 'Acidogène = produit l\'acide ; acidophile/acidurique = survit/se développe en milieu acide.' },
    ],
    quiz: [
      {
        type: 'single',
        q: 'Quelle bactérie initie la lésion carieuse au niveau de l\'émail ?',
        options: [
          { t: 'Streptocoque mutans', ok: true },
          { t: 'Lactobacille', ok: false },
          { t: 'Actinomyces', ok: false },
          { t: 'Aucune, c\'est chimique', ok: false },
        ],
        explain: 'Les streptocoques (50 %) agissent sur l\'émail et initient la lésion ; lactobacilles → dentine, actinomyces → racine.',
      },
      {
        type: 'single',
        q: 'La Pellicule Exogène Acquise (PAE) est :',
        options: [
          { t: 'Abactérienne (glycoprotéines sur hydroxyapatite)', ok: true },
          { t: 'Bactérienne dès sa formation', ok: false },
          { t: 'Du tartre minéralisé', ok: false },
          { t: 'Une couche de fluor', ok: false },
        ],
        explain: 'La PAE est abactérienne et permanente ; c\'est la colonisation qui vient ensuite.',
      },
      {
        type: 'multi',
        q: 'Parmi les facteurs de virulence du S. Mutans :',
        options: [
          { t: 'Acidogénécité (produit des acides)', ok: true },
          { t: 'Aciduricité (se développe en milieu acide)', ok: true },
          { t: 'Acido-tolérance (survit en milieu acide)', ok: true },
          { t: 'Habitat sur les surfaces planes lisses', ok: false },
          { t: 'Affinité pour le saccharose', ok: true },
        ],
        explain: 'Son habitat est la dent (sillons et faces proximales), pas les surfaces planes. Les autres sont exacts.',
      },
    ],
  },

  // ───────────────────────── MISSION 4 ─────────────────────────
  {
    id: 'm4',
    n: 4,
    title: 'La Forteresse de Salive',
    zone: 'Dentine',
    icon: '💧',
    color: '#5ec6e8',
    badge: { icon: '💧', name: 'Chevalier de la Salive' },
    xpReward: 400,
    briefing:
      "La dernière grande défense d'Odontia est la Forteresse de Salive : un système d'irrigation « high-tech » qui neutralise l'acide et reconstruit les murs. Mais des sabotages — maladies, médicaments, malpositions — menacent son débit.",
    codex: [
      {
        h: 'Facteur hôte — facteurs GÉNÉRAUX',
        items: [
          '**Génétique** : la carie n\'est PAS héréditaire, mais influence le nombre/qualité des dents, la croissance, les anomalies d\'embryogenèse.',
          '**Hormonal** (indirect) : grossesse (↓ flux, gingivite, alimentation sucrée) ; diabète (médications ↓ flux).',
          '**Maladies générales** : les dents échappent au cycle du calcium (pas d\'auto-réparation) ; traitements ↓ flux salivaire.',
          '**Âge** : personnes âgées → plus de lésions radiculaires.',
        ],
      },
      {
        h: 'Facteur hôte — facteurs LOCAUX',
        items: [
          '**Structure des tissus** : émail non mature en période éruptive/post-éruptive ; amélogénèse imparfaite ; sillons marqués (jeune) = risque.',
          '**Anatomie/position** : encombrements/malpositions, avulsion non compensée (égression/ingression), espaces larges, **dents de sagesse retenues → extraction**.',
          '**Iatrogène** : protéger les dents adjacentes saines pendant un soin.',
          '**Orthodontie** : bagues → hygiène difficile → white spot (déminéralisation).',
          '**Hygiène** : brossage mal réalisé → plaque non éliminée ; révélateurs de plaque pour éduquer.',
        ],
      },
      {
        h: 'Le facteur SALIVAIRE — système « high-tech »',
        items: [
          'Composition : ionique (Ca, F, PO₄), antibactériens (peroxydases, lactoferrine), immunité (IgG, IgA, lysozyme), enzymes (amylases).',
          'Débit : **0,4 ml/min repos** ; **> 3 ml/min stimulé** ; interrompu pendant le sommeil (→ brossage avant de dormir).',
          '**Hyposialie** : débit stimulé < 0,7 ml/min · **Asialie** : sécrétion nulle · **Xérostomie** : sensation de bouche sèche (pas forcément vraie baisse).',
          '**Pouvoir tampon** : neutralise les acides (système carbonate/bicarbonate HCO₃⁻, PO₄, urée).',
          '**Ions reminéralisateurs** : Ca²⁺, PO₄²⁻, F⁻.',
          'Facteurs organiques : IgA/IgG/IgM, lysozyme, lactoferrine, lactoperoxydase, glycoprotéines, mucine, pellicule acquise (barrière aux acides).',
        ],
      },
      {
        h: 'Comportements & exposition professionnelle',
        items: [
          'Comportements : hygiène (fréquence/durée/fil dentaire), alimentation, addictions, tics/parafonctions.',
          'Exposition pro : confiseur, pâtissier (sucre dans l\'air), sportif de haut niveau (barres énergétiques, grignotage).',
        ],
      },
    ],
    flashcards: [
      { q: 'La carie est-elle héréditaire ?', a: 'Non, mais la génétique a une influence indirecte (structure, morphologie…).' },
      { q: 'Caries fréquentes chez la personne âgée ?', a: 'Lésions radiculaires.' },
      { q: 'Émail le plus vulnérable quand ?', a: 'En période éruptive/post-éruptive (non mature).' },
      { q: 'Dent de sagesse retenue : conduite ?', a: 'Extraction (nid à bactéries).' },
      { q: 'White spot = ?', a: 'Déminéralisation de l\'émail (tache blanchâtre).' },
      { q: 'Débit salivaire repos / stimulé ?', a: '0,4 ml/min / > 3 ml/min.' },
      { q: 'Hyposialie ?', a: 'Débit stimulé < 0,7 ml/min.' },
      { q: 'Xérostomie vs hyposialie ?', a: 'Xérostomie = sensation de bouche sèche, pas forcément vraie baisse de débit.' },
      { q: '3 ions reminéralisateurs ?', a: 'Ca²⁺, PO₄²⁻, F⁻.' },
      { q: 'Sur quoi repose le pouvoir tampon ?', a: 'Système carbonate/bicarbonate (HCO₃⁻), PO₄, urée.' },
      { q: '2 protéines enzymatiques antibactériennes ?', a: 'Lysozyme, lactoferrine.' },
      { q: 'Pourquoi se brosser avant de dormir ?', a: 'La sécrétion salivaire s\'interrompt pendant le sommeil.' },
    ],
    quiz: [
      {
        type: 'multi',
        q: 'Quels rôles sont assurés par la salive ?',
        options: [
          { t: 'Action mécanique de nettoyage', ok: true },
          { t: 'Pouvoir tampon neutralisant les acides', ok: true },
          { t: 'Reminéralisation par calcium, phosphates et fluorures', ok: true },
          { t: 'Favoriser l\'adhésion bactérienne par les glycoprotéines', ok: false },
          { t: 'Défenses antibactériennes (lysozyme, lactoferrine, IgA)', ok: true },
        ],
        explain: 'Les glycoprotéines forment une pellicule acquise BARRIÈRE protectrice ; c\'est la colonisation bactérienne qui détourne ce mécanisme.',
      },
      {
        type: 'single',
        q: 'Patient sous neuroleptiques avec hyposialie : pourquoi son risque carieux explose-t-il ?',
        options: [
          { t: 'Baisse du flux → moins de nettoyage, tampon, reminéralisation et défense', ok: true },
          { t: 'Les neuroleptiques sont acides pour les dents', ok: false },
          { t: 'Ils détruisent directement l\'émail', ok: false },
          { t: 'Ils favorisent la croissance de l\'os', ok: false },
        ],
        explain: 'La baisse du débit salivaire fait chuter toutes les protections → déséquilibre vers la déminéralisation.',
      },
      {
        type: 'single',
        q: 'Que signifie une hyposialie ?',
        options: [
          { t: 'Débit salivaire stimulé inférieur à 0,7 ml/min', ok: true },
          { t: 'Sécrétion salivaire totalement nulle', ok: false },
          { t: 'Sensation de bouche sèche sans cause objective', ok: false },
          { t: 'Excès de salive', ok: false },
        ],
        explain: 'Asialie = sécrétion nulle ; xérostomie = sensation de sécheresse. Hyposialie = débit stimulé < 0,7 ml/min.',
      },
    ],
  },

  // ───────────────────────── MISSION 5 ─────────────────────────
  {
    id: 'm5',
    n: 5,
    title: 'Le Siège du Temps',
    zone: 'Pulpe menacée',
    icon: '⏳',
    color: '#f08a5d',
    badge: { icon: '⏳', name: 'Stratège du Temps' },
    xpReward: 450,
    briefing:
      "L'ennemi a compris que le temps est son arme : à chaque repas — surtout à chaque grignotage — le pH plonge sous le point critique. Pilote une journée alimentaire pour garder le royaume hors de la zone rouge.",
    codex: [
      {
        h: 'Facteur alimentation / substrat',
        table: {
          head: ['Apport', 'Effet'],
          rows: [
            ['Protides', 'Anti-cariogène ; n\'abaisse pas le pH'],
            ['Lipides', 'Pas de pouvoir cariogène ; diminuent celui des glucides'],
            ['Glucides (sucres fermentescibles)', 'Confèrent au régime son potentiel cariogène'],
          ],
        },
        items: [
          'Dépend aussi de la consistance (dur/mou/collant) et de la **fréquence**. ~40 kg de sucre/personne/an.',
          'Mono- et di-saccharides = les plus dangereux.',
          '**Saccharose** = le plus courant et le plus cariogène : favorise S. Mutans (voie hétéro-fermentaire), ↑ plaque via polysaccharides extracellulaires.',
          'Voie homofermentaire (lactate) = acides plus agressifs que la voie hétéro-fermentaire.',
        ],
      },
      {
        h: 'Les courbes de Stephan',
        items: [
          'Après une prise sucrée, le pH chute sous le point critique pendant ~15 min, puis remonte grâce au pouvoir tampon salivaire.',
          '4 repas/jour : le pH a le temps de remonter entre les prises.',
          'Grignotage : le pH rechute AVANT d\'être revenu à la neutralité → reste acide toute la journée.',
          '➡️ La **fréquence** prime sur la quantité.',
        ],
      },
      {
        h: 'Risque Carieux Individuel (RCI)',
        items: [
          '**Prédicteurs de risque** : lésions avérées ; lésions initiales (cliniques/radiologiques) ; antécédent de restauration < 3 ans.',
          '**Facteurs généraux** : alimentation, fluor, addictions, hygiène/santé, médications, niveau socio-économique, âge.',
          '**Facteurs locaux** : plaque, hygiène orale, fluor, salive, caractéristiques cliniques (CAOD, malpositions).',
          'Évaluation via une charte : système **CAMBRA** (Caries Management By Risk Assessment), facteurs protecteurs vs pathologiques.',
        ],
      },
    ],
    flashcards: [
      { q: 'Sucre le plus cariogène ?', a: 'Le saccharose.' },
      { q: 'Sucres les plus dangereux ?', a: 'Mono- et di-saccharides.' },
      { q: 'Effet des protides ?', a: 'Anti-cariogène (n\'abaisse pas le pH).' },
      { q: 'Effet des lipides avec les glucides ?', a: 'Diminuent le pouvoir cariogène des glucides.' },
      { q: 'Durée de chute du pH après une prise sucrée ?', a: '~15 min sous le point critique.' },
      { q: '4 repas vs grignotage ?', a: 'Grignotage = pH acide toute la journée (rechute avant neutralisation).' },
      { q: 'Qui fait remonter le pH ?', a: 'Le pouvoir tampon salivaire.' },
      { q: 'Voie homo- vs hétéro-fermentaire ?', a: 'Homo = lactate (plus agressif) ; hétéro = acides moins agressifs.' },
      { q: '3 prédicteurs de risque ?', a: 'Lésions avérées, lésions initiales, restauration < 3 ans.' },
      { q: 'CAMBRA = ?', a: 'Caries Management By Risk Assessment (charte d\'évaluation du RCI).' },
      { q: 'Fréquence ou quantité, le plus déterminant ?', a: 'La fréquence.' },
    ],
    quiz: [
      {
        type: 'single',
        q: 'Quel est le sucre le plus cariogène ?',
        options: [
          { t: 'Le saccharose', ok: true },
          { t: 'Le glucose seul', ok: false },
          { t: 'Le lactose', ok: false },
          { t: 'Le fructose', ok: false },
        ],
        explain: 'Le saccharose : forme la plus courante, favorise S. Mutans et augmente la plaque (polysaccharides extracellulaires).',
      },
      {
        type: 'single',
        q: 'Pourquoi le grignotage est-il pire que 4 repas structurés (courbes de Stephan) ?',
        options: [
          { t: 'Le pH rechute avant la neutralisation → acide toute la journée', ok: true },
          { t: 'Le grignotage contient plus de calcium', ok: false },
          { t: 'Il augmente le débit salivaire', ok: false },
          { t: 'Il n\'a aucun effet sur le pH', ok: false },
        ],
        explain: 'Multiplie les passages sous le point critique sans laisser le pouvoir tampon ramener le pH à neutre.',
      },
      {
        type: 'multi',
        q: 'Quels sont des prédicteurs du risque carieux individuel ?',
        options: [
          { t: 'Présence de lésions avérées', ok: true },
          { t: 'Lésions initiales cliniques ou radiologiques', ok: true },
          { t: 'Restauration dentaire dans les 3 dernières années', ok: true },
          { t: 'Couleur des yeux du patient', ok: false },
        ],
        explain: 'Les 3 prédicteurs officiels déterminent la maladie ; la couleur des yeux n\'a aucun rapport.',
      },
    ],
  },

  // ───────────────────────── MISSION 6 ─────────────────────────
  {
    id: 'm6',
    n: 6,
    title: 'Le Grand Codex',
    zone: 'Salle des cartes',
    icon: '🗺️',
    color: '#8ac926',
    badge: { icon: '🗺️', name: 'Cartographe des Lésions' },
    xpReward: 500,
    briefing:
      "Pour vaincre l'ennemi, il faut savoir le nommer et le cartographier. Le Grand Codex renferme 4 cartes anciennes : apprends à les lire et à traduire une même lésion d'un système à l'autre.",
    codex: [
      {
        h: 'Nomenclature des faces dentaires',
        items: [
          '**Mésiale** : face proximale la plus proche de la ligne médiane.',
          '**Distale** : face proximale la plus éloignée de la ligne médiane.',
          '**Vestibulaire** : au contact des joues/lèvres.',
          '**Palatine/linguale** : au contact de la langue.',
          '**Occlusale** : surface de mastication.',
        ],
      },
      {
        h: 'Nomenclature des dents (système FDI, code XY)',
        items: [
          '**X = quadrant.** Adulte : 1 (haut-droite), 2 (haut-gauche), 3 (bas-gauche), 4 (bas-droite). Enfant : 5, 6, 7, 8.',
          '**Y = position** : 1 = incisive (proche médiane) → 8 = 3ᵉ molaire (la plus éloignée).',
          '**Iceberg de Pitts** : beaucoup de lésions sont invisibles à l\'œil nu (radio/microscopie).',
        ],
      },
      {
        h: 'a) Classification de BLACK (1910) — topographique',
        intro: '6 classes par localisation. Ne tient pas compte du volume ni de la thérapeutique. À connaître.',
        table: {
          head: ['Classe', 'Localisation'],
          rows: [
            ['I', 'Sillons (anfractuosités) de toutes les dents'],
            ['II', 'Faces proximales des prémolaires/molaires (simple ou composée)'],
            ['III', 'Faces proximales incisives/canines, SANS l\'angle incisif'],
            ['IV', 'Comme III MAIS avec l\'angle incisif'],
            ['V', 'Collet (cervical) de toutes les dents'],
            ['VI', 'Pointes cuspidiennes et surfaces lisses ("tout le reste")'],
          ],
        },
      },
      {
        h: 'b) Mount & Hume (1997) — site + stade',
        items: [
          'Intègre le volume. 3 sites + 4 stades.',
          'Site 1 : puits/fissures + zones lisses (sauf cervical). Site 2 : contact inter-proximal. Site 3 : rebord gingival.',
          'Stades 1 (minimal) → 4 (étendu) ; stade 3 = aménagement cavitaire pour protéger.',
        ],
      },
      {
        h: 'c) Classification SiSta (Site et Stade)',
        intro: 'Issue de Mount & Hume, associe une stratégie thérapeutique et ajoute un stade 0. 3 sites + 5 stades (0–4).',
        table: {
          head: ['Stade', 'Description / conduite'],
          rows: [
            ['0', 'Lésion active SANS cavitation → reminéralisation'],
            ['1', 'Dentine 1/3 externe → traitement a minima'],
            ['2', 'Cavitaire localisée, dentine 1/3 médian, cuspides intactes → restauration'],
            ['3', 'Cavitaire étendue au-delà du 1/3 interne, fragilise les cuspides → restauration'],
            ['4', 'Détruit une partie des structures cuspidiennes → restauration'],
          ],
        },
      },
      {
        h: 'd) Classification ICDAS',
        items: [
          'International Caries Detection and Assessment System.',
          'Première classification **visuelle** : signes cliniques + évolution histologique + propositions thérapeutiques.',
          '⚠️ Clinique visuelle, PAS radiologique uniquement.',
        ],
      },
    ],
    flashcards: [
      { q: 'Face proximale la plus proche de la ligne médiane ?', a: 'Mésiale.' },
      { q: 'Face au contact de la langue ?', a: 'Palatine/linguale.' },
      { q: 'Code FDI : que signifient X et Y ?', a: 'X = quadrant, Y = position (1 incisive → 8 molaire).' },
      { q: 'Quadrants adulte ?', a: '1 (haut-droite), 2 (haut-gauche), 3 (bas-gauche), 4 (bas-droite).' },
      { q: 'Iceberg de Pitts ?', a: 'Beaucoup de lésions invisibles à l\'œil nu (radio/microscopie).' },
      { q: 'Black : combien de classes, sur quelle base ?', a: '6 classes, topographique (localisation).' },
      { q: 'Black classe I ?', a: 'Sillons de toutes les dents.' },
      { q: 'Black II simple vs composée ?', a: 'Simple = 1 face proximale ; composée = + face occlusale.' },
      { q: 'Black III vs IV ?', a: 'III sans angle incisif ; IV avec angle incisif.' },
      { q: 'Black classe V ?', a: 'Collet (cervical).' },
      { q: 'SiSta : combien de sites et stades ?', a: '3 sites, 5 stades (0 à 4).' },
      { q: 'SiSta stade 0 ?', a: 'Lésion active sans cavitation → reminéralisation.' },
      { q: 'Mount & Hume vs SiSta ?', a: 'M&H = 4 stades ; SiSta = 5 stades (ajoute le 0) + thérapeutique.' },
      { q: 'ICDAS est-elle radiologique ?', a: 'Non : clinique visuelle (+ histologie + thérapeutique).' },
      { q: 'Quelle classification ne tient pas compte du volume ?', a: 'Black.' },
    ],
    quiz: [
      {
        type: 'multi',
        q: 'Quelles correspondances classification ↔ caractéristique sont correctes ?',
        options: [
          { t: 'Black → 6 classes selon la localisation', ok: true },
          { t: 'Mount & Hume → site + stade (1 à 4)', ok: true },
          { t: 'SiSta → 3 sites, 5 stades, orientation thérapeutique', ok: true },
          { t: 'ICDAS → classification radiologique uniquement', ok: false },
          { t: 'Black → prend en compte l\'évolution histologique', ok: false },
        ],
        explain: 'ICDAS est une classification clinique visuelle. Black est purement topographique (pas d\'histologie, pas de volume).',
      },
      {
        type: 'single',
        q: 'Combien de stades comporte la classification SiSta ?',
        options: [
          { t: '5 stades (0 à 4)', ok: true },
          { t: '4 stades (1 à 4)', ok: false },
          { t: '6 classes (I à VI)', ok: false },
          { t: '3 stades', ok: false },
        ],
        explain: 'SiSta ajoute un stade 0 (lésion active sans cavitation → reminéralisation) aux 4 stades de Mount & Hume.',
      },
      {
        type: 'single',
        q: 'Une lésion au collet (cervical) d\'une dent correspond à quelle classe de Black ?',
        options: [
          { t: 'Classe V', ok: true },
          { t: 'Classe I', ok: false },
          { t: 'Classe III', ok: false },
          { t: 'Classe VI', ok: false },
        ],
        explain: 'Classe V = collet ; I = sillons ; III = proximales antérieures sans angle ; VI = cuspides/surfaces lisses.',
      },
    ],
  },

  // ───────────────────────── BOSS FINAL ─────────────────────────
  {
    id: 'boss',
    n: 7,
    title: 'Duel contre Streptococcus Mutans',
    zone: 'Pulpe Royale',
    icon: '👑',
    color: '#e94f64',
    isFinal: true,
    badge: { icon: '👑', name: 'Grand Maître de l\'Émail' },
    xpReward: 800,
    briefing:
      "Streptococcus Mutans surgit au cœur de la Pulpe Royale. « Tu crois me connaître, Gardien ? Prouve-le ! » Le duel mêle toutes les missions. Cas : patiente de 28 ans, pâtissière, grignotage sucré fréquent, traitement réduisant le flux salivaire. Tache blanche indolore (sillon) + cavitation proximale au 1/3 médian de la dentine sans fragiliser les cuspides. Restauration il y a 1 an.",
    codex: [
      {
        h: 'Cas clinique de synthèse — points de résolution',
        items: [
          '**RCI : élevé** — prédicteurs (lésion avérée + lésion initiale + restauration < 3 ans) + pathologiques (grignotage, sucre pro, hyposialie médicamenteuse).',
          '**Bactéries** : tache blanche émail = S. Mutans (initiation) ; lésion dentinaire = lactobacilles.',
          '**Stade de la tache blanche** : stade 1 émail, réversible → reminéralisation.',
          '**Lésion du sillon** : Black classe I ; SiSta Site 1, Stade 0.',
          '**Cavitation proximale** : Black classe II ; SiSta Site 2, Stade 2.',
          '**Conduite** : gérer d\'abord la maladie (↓ fréquence/sucre, fluor, ↑ flux), reminéraliser le stade 0, restaurer la lésion cavitaire.',
        ],
      },
    ],
    flashcards: [],
    quiz: [
      {
        type: 'single',
        q: 'Cas : la tache blanche indolore sur le sillon (émail) est à quel stade et quelle conduite ?',
        options: [
          { t: 'Stade 1 (émail), réversible → reminéralisation', ok: true },
          { t: 'Stade 3 (pulpe) → traitement canalaire', ok: false },
          { t: 'Stade 4 → extraction', ok: false },
          { t: 'Lésion dentinaire → restauration immédiate', ok: false },
        ],
        explain: 'Tache blanche émail sans effondrement = stade 1 réversible → reminéralisation.',
      },
      {
        type: 'single',
        q: 'La cavitation proximale (1/3 médian, cuspides intactes) se classe :',
        options: [
          { t: 'Black classe II ; SiSta Site 2, Stade 2', ok: true },
          { t: 'Black classe V ; SiSta Site 3, Stade 0', ok: false },
          { t: 'Black classe I ; SiSta Site 1, Stade 1', ok: false },
          { t: 'Black classe IV ; SiSta Site 2, Stade 4', ok: false },
        ],
        explain: 'Proximale de molaire = Black II ; dentine 1/3 médian sans fragiliser les cuspides = SiSta Site 2 Stade 2.',
      },
      {
        type: 'single',
        q: 'Quel est le RCI de cette patiente et pourquoi ?',
        options: [
          { t: 'Élevé : prédicteurs présents + facteurs pathologiques (grignotage, hyposialie, sucre pro)', ok: true },
          { t: 'Faible : elle se brosse les dents', ok: false },
          { t: 'Nul : aucune lésion', ok: false },
          { t: 'Impossible à déterminer', ok: false },
        ],
        explain: 'Lésions avérée + initiale + restauration < 3 ans (prédicteurs) et facteurs pathologiques nombreux → RCI élevé.',
      },
      {
        type: 'multi',
        q: 'Synthèse — quelles affirmations sont vraies ?',
        options: [
          { t: 'On gère la maladie avant de restaurer la conséquence', ok: true },
          { t: 'Le saccharose est le sucre le plus cariogène', ok: true },
          { t: 'La séquence est émail → dentine → pulpe → périapical', ok: true },
          { t: 'Le S. Mutans initie la lésion dentinaire', ok: false },
          { t: 'L\'ICDAS est une classification visuelle', ok: true },
        ],
        explain: 'Le S. Mutans initie sur l\'ÉMAIL ; ce sont les lactobacilles qui dominent la dentine.',
      },
    ],
  },
]
