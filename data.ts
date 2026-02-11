
import { Category } from './types';

export const AI_DATA: Category[] = [
  {
    id: 'recherche',
    name: 'Recherche & Fact-checking',
    icon: '🔍',
    description: 'Vérification, actualités et sources en temps réel.',
    color: 'bg-blue-500',
    tasks: [
      { id: 1, task: "Question factuelle simple", recommendedIA: "Perplexity", why: "Web temps réel + réponses courtes avec sources cliquables." },
      { id: 2, task: "Vérifier une affirmation", recommendedIA: "Perplexity", why: "Conçu pour recouper plusieurs sources et afficher les références." },
      { id: 3, task: "Synthèse d'articles de presse", recommendedIA: "Perplexity", why: "Très bon pour agréger et lier vers les articles originaux." },
      { id: 5, task: "Comparer deux produits", recommendedIA: "Perplexity", why: "Recherche comparée, tableaux et renvoi vers tests externes." },
      { id: 7, task: "Jurisprudence récente", recommendedIA: "Perplexity", why: "Recherche ciblée sur sites officiels + doctrine en ligne." },
      { id: 14, task: "Alternatives open source", recommendedIA: "Perplexity", why: "Très bon pour listes d’outils comparatifs." }
    ]
  },
  {
    id: 'documents',
    name: 'Travail sur Documents',
    icon: '📄',
    description: 'Synthèse de PDF, contrats et corpus complexes.',
    color: 'bg-indigo-500',
    tasks: [
      { id: 16, task: "Résumer un long PDF (200p+)", recommendedIA: "Claude", why: "Très grand contexte, robuste pour résumés structurés." },
      { id: 17, task: "Synthèse multi-rapports", recommendedIA: "NotebookLM", why: "Conçu pour croiser plusieurs sources avec citations internes." },
      { id: 18, task: "Recherche dans un contrat", recommendedIA: "NotebookLM", why: "Réponses ancrées dans le texte avec renvoi aux clauses." },
      { id: 30, task: "Résumé audio d'un dossier", recommendedIA: "NotebookLM", why: "Fonction 'Audio Overview' intégrée gratuitement." }
    ]
  },
  {
    id: 'redaction',
    name: 'Rédaction & Communication',
    icon: '✍️',
    description: 'E-mails, blogs, marketing et style naturel.',
    color: 'bg-emerald-500',
    tasks: [
      { id: 31, task: "E-mail professionnel", recommendedIA: "ChatGPT", why: "Très bon style généraliste, facilement ajustable." },
      { id: 34, task: "Article de blog long (2000 mots)", recommendedIA: "ChatGPT", why: "Bon équilibre entre structure, fluidité et créativité." },
      { id: 39, task: "Rendre un texte plus lisible", recommendedIA: "Claude", why: "Excellent pour simplifier sans perdre le fond." },
      { id: 45, task: "Rendre un texte 'plus humain'", recommendedIA: "Claude", why: "Style naturel et moins verbeux réduisant l'effet robot." }
    ]
  },
  {
    id: 'dev',
    name: 'Programmation & Technique',
    icon: '💻',
    description: 'Code, bugs, architecture et documentation.',
    color: 'bg-slate-800',
    tasks: [
      { id: 56, task: "Expliquer du code inconnu", recommendedIA: "ChatGPT", why: "Très bon pour vulgariser du code multi‑langages." },
      { id: 57, task: "Corriger un bug simple", recommendedIA: "ChatGPT", why: "Très efficace sur les patterns d’erreur courants." },
      { id: 58, task: "Revoir un fichier de code large", recommendedIA: "Claude", why: "Grand contexte et commentaires limpides." },
      { id: 61, task: "Documenter une API", recommendedIA: "Claude", why: "Produit des docs structurées (endpoints, exemples)." }
    ]
  },
  {
    id: 'data',
    name: 'Données & Productivité',
    icon: '📊',
    description: 'Excel, statistiques et organisation.',
    color: 'bg-amber-500',
    tasks: [
      { id: 66, task: "Analyse de tableau CSV/Excel", recommendedIA: "ChatGPT", why: "Analyse de données avancée même en gratuit." },
      { id: 67, task: "Formules Excel complexes", recommendedIA: "Gemini", why: "Très bon avec Sheets, intégration directe à Google." },
      { id: 70, task: "Plan de projet & jalons", recommendedIA: "Claude", why: "Rédaction structurée et vision globale." }
    ]
  },
  {
    id: 'creativite',
    name: 'Créativité & Image',
    icon: '🎨',
    description: 'Brainstorming, images et multimédia.',
    color: 'bg-pink-500',
    tasks: [
      { id: 86, task: "Brainstorming d'idées", recommendedIA: "ChatGPT", why: "Très productif pour générer beaucoup d’idées." },
      { id: 89, task: "Générer des images", recommendedIA: "Gemini / Mistral", why: "Imagen (Gemini) et Mistral sont gratuits avec quotas." },
      { id: 93, task: "Script de podcast", recommendedIA: "Claude", why: "Reformule en style oral structuré." }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing & Vente',
    icon: '📢',
    description: 'SEO, clients et réseaux sociaux.',
    color: 'bg-orange-500',
    tasks: [
      { id: 101, task: "Fiche produit SEO", recommendedIA: "ChatGPT", why: "Crée descriptions engageantes avec mots-clés naturels." },
      { id: 103, task: "Calendrier éditorial", recommendedIA: "Claude", why: "Plans structurés avec thèmes et objectifs." },
      { id: 108, task: "Persona client", recommendedIA: "Claude", why: "Profils détaillés et cohérents." }
    ]
  },
  {
    id: 'rh',
    name: 'RH & Gestion de Projets',
    icon: '🤝',
    description: 'Emploi, formation et équipe.',
    color: 'bg-cyan-500',
    tasks: [
      { id: 111, task: "Appel à candidatures", recommendedIA: "ChatGPT", why: "Clair, attractif, structuré." },
      { id: 112, task: "Évaluer un CV / Offre", recommendedIA: "Claude", why: "Analyse compétences, gaps, suggestions." },
      { id: 119, task: "Gestion de conflits", recommendedIA: "Claude", why: "Approches neutres, étapes diplomatiques." }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Compta',
    icon: '💰',
    description: 'Budget, fiscalité et rapports.',
    color: 'bg-lime-600',
    tasks: [
      { id: 121, task: "Expliquer concept comptable", recommendedIA: "Claude", why: "Pédagogie claire, exemples concrets." },
      { id: 124, task: "Synthèse rapport financier", recommendedIA: "NotebookLM", why: "Points clés avec renvois pages." },
      { id: 130, task: "Réforme fiscale", recommendedIA: "Perplexity", why: "Sources officielles à jour via le web." }
    ]
  },
  {
    id: 'support',
    name: 'Service Client',
    icon: '🎧',
    description: 'FAQ, support et satisfaction.',
    color: 'bg-violet-500',
    tasks: [
      { id: 131, task: "Réponses FAQ standard", recommendedIA: "ChatGPT", why: "Variantes ton, personnalisation." },
      { id: 135, task: "Base de connaissances tickets", recommendedIA: "NotebookLM", why: "Synthèse thématique de corpus tickets." }
    ]
  },
  {
    id: 'media',
    name: 'Audio & Vidéo',
    icon: '🎬',
    description: 'YouTube, podcasts et scripts.',
    color: 'bg-red-500',
    tasks: [
      { id: 151, task: "Résumer vidéo YouTube", recommendedIA: "NotebookLM / Gemini", why: "Support natif YouTube et audio overview." },
      { id: 152, task: "Script tutoriel technique", recommendedIA: "Gemini", why: "Intégration YouTube pour timing." }
    ]
  },
  {
    id: 'cyber',
    name: 'Cybersécurité',
    icon: '🛡️',
    description: 'Vulnérabilités, audits et sécurité.',
    color: 'bg-zinc-800',
    tasks: [
      { id: 191, task: "Expliquer vulnérabilité CVE", recommendedIA: "Perplexity", why: "Détails techniques sourcés." },
      { id: 192, task: "Checklist audit sécurité", recommendedIA: "Claude", why: "Étapes complètes, outils gratuits." },
      { id: 200, task: "Revue code sécurité", recommendedIA: "Claude", why: "Scan statique simulé sur extraits." }
    ]
  }
];
