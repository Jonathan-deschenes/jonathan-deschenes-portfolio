export type Problem = {
	title: string;
	desc: string;
	iconPath: string;
};

export const problems: Problem[] = [
	{
		title: "Collecte de documents clients",
		desc: "Relances manuelles par courriel, documents manquants, dossiers incomplets — des heures perdues qui pourraient être facturées.",
		iconPath:
			"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M8 13h8M8 17h8M8 9h2",
	},
	{
		title: "Tâches répétitives qui grignotent du temps facturable",
		desc: "Classement, saisie de données, accueil de nouveaux clients — des processus manuels qui vous coûtent des heures chaque semaine.",
		iconPath: "M12 8v4l3 2|c-circle-9",
	},
	{
		title: "Site web vieillissant",
		desc: "Un site qui donne une mauvaise première impression ou qui n'amène pas de nouveaux clients. Votre image en ligne mérite mieux.",
		iconPath: "M3 3h18v18H3z|M9 3v18M3 9h6",
	},
	{
		title: "Rappels d'échéances fiscales gérés à la main",
		desc: "Courriels écrits un à un, risque d'oubli, image peu professionnelle. Des rappels automatisés changent la donne.",
		iconPath: "M3 4h18v18H3z|M16 2v4M8 2v4M3 10h18",
	},
];

export type Project = {
	slug: string;
	title: string;
	tag: string;
	tagBg: string;
	tagColor: string;
	desc: string;
	chips: string[];
	cta: string;
	linkColor: string;
	concept?: boolean;
	imageAlt: string;
	imageUrl: string;
};

export const projects: Project[] = [
	{
		slug: "marche-ac",
		title: "Marchés Ahuntsic-Cartierville",
		tag: "SITE VITRINE",
		tagBg: "#e7eaff",
		tagColor: "#3b46e0",
		desc: "Site vitrine professionel avec un design soigné, adapté au mobile et conçu pour les marchés Ahuntsic-Cartierville. Un formulaire de contact est intégrés directement dans la boite courriel de l'organisme. Développement rapide, excellent et abordable.",
		chips: ["Site vitrine", "OBNL", "Mobile"],
		cta: "Voir l'étude de cas",
		linkColor: "#1a60f5",
		imageUrl: "/marcheac-logo.avif",
		imageAlt: "Capture du site web des marcheac",
	},
	{
		slug: "application-web-sur-mesure",
		title: "Application web sur mesure",
		tag: "APPLICATION WEB",
		tagBg: "#efe7ff",
		tagColor: "#7c3aed",
		desc: "Application web complète développée de A à Z — interface intuitive, architecture robuste et déploiement en production. Une maîtrise technique que peu de concepteurs maîtrisent.",
		chips: ["Application", "Sur mesure", "Production"],
		cta: "Voir l'étude de cas",
		linkColor: "#7c3aed",
		imageAlt: "Capture de l'application web",
		imageUrl: "",
	},
	{
		slug: "concept-cabinet-comptable",
		title: "Concept — cabinet comptable",
		tag: "CABINET COMPTABLE",
		tagBg: "#fcefd8",
		tagColor: "#b8791a",
		desc: "Démonstration concrète de ce que je livre pour un cabinet : site ciblé, agent IA pour les questions fréquentes et automatisation de la collecte de documents clients.",
		chips: ["Concept", "Agent IA", "Automatisation"],
		cta: "Voir la démonstration",
		linkColor: "#d98a14",
		concept: true,
		imageAlt: "Maquette du site de cabinet comptable",
		imageUrl: "",
	},
];

export type Service = {
	title: string;
	tail: string;
	desc: string;
	iconPath: string;
};

export const services: Service[] = [
	{
		title: "Site web professionnel",
		tail: "— Crédibilité immédiate et nouveaux clients.",
		desc: "Conception sur mesure orientée conversion : présentation claire de vos services, prise de rendez-vous en ligne, formulaires et référencement de base inclus.",
		iconPath: "M3 3h18v18H3z|M9 3v18M3 9h6",
	},
	{
		title: "Automatisation",
		tail: "— Du temps facturable récupéré.",
		desc: "Collecte de documents clients, accueil de nouveaux clients, rappels d'échéances — des heures récupérées chaque semaine, sans intervention manuelle.",
		iconPath: "M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M5 21a7 7 0 0 1 14 0",
	},
	{
		title: "Intégration de l'IA",
		tail: "— Moins de questions répétitives, plus de qualité.",
		desc: "Un agent qui répond aux questions fréquentes de vos clients, qualifie les prospects et traite les documents — en portant une attention particulière à la confidentialité des données financières.",
		iconPath:
			"c-circle-4|M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19",
	},
	{
		title: "Applications sur mesure",
		tail: "— Pour un besoin particulier.",
		desc: "Du portail client au tableau de bord interne, des solutions construites entièrement pour votre cabinet selon vos besoins spécifiques. Sur devis.",
		iconPath: "M9 8l-4 4 4 4|M15 8l4 4-4 4",
	},
];

export type Step = {
	num: string;
	title: string;
	desc: string;
};

export const steps: Step[] = [
	{
		num: "01",
		title: "Cadrage & proposition",
		desc: "Rencontre de 30 minutes pour cerner votre besoin. Une proposition écrite avec portée, prix et délais fixes vous est envoyée sous 24-48 h.",
	},
	{
		num: "02",
		title: "Planification",
		desc: "Échéancier, livrables et nombre de révisions définis par écrit. Chaque étape se termine par une approbation avant de passer à la suivante.",
	},
	{
		num: "03",
		title: "Conception & développement",
		desc: "Design, puis développement à partir de la maquette approuvée. Contact direct avec moi à chaque étape — jamais délégué.",
	},
	{
		num: "04",
		title: "Livraison & optimisation",
		desc: "Transfert complet après paiement, formation et suivi post-lancement pour s'assurer que tout fonctionne comme prévu.",
	},
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
	{
		question: "Combien coûte votre projet?",
		answer:
			"Chaque projet est unique. Après notre rencontre de 30 minutes, vous recevez une proposition écrite avec une portée, un prix et un échéancier fixes — aucune surprise en cours de route.",
	},
	{
		question: "Travaillez-vous à distance?",
		answer:
			"Oui. Je travaille avec des cabinets partout au Québec, en visioconférence et par courriel. L'ensemble du processus peut se faire à distance, sans déplacement de votre part.",
	},
	{
		question: "Mes données financières sont-elles en sécurité?",
		answer:
			"La confidentialité est une priorité. J'applique les bonnes pratiques de sécurité, je signe une entente de confidentialité avant tout accès à vos données et je respecte les exigences de la Loi 25 du Québec sur la protection des renseignements personnels.",
	},
	{
		question: "Et si j'ai déjà un site?",
		answer:
			"Aucun problème. Je peux refondre votre site existant ou en bâtir un nouveau, en récupérant ce qui fonctionne déjà bien pour vous (contenus, références, référencement acquis).",
	},
	{
		question: "Quels sont les délais typiques?",
		answer:
			"Un site vitrine prend généralement de 2 à 4 semaines. Les projets d'automatisation et sur mesure varient selon la portée, définie ensemble dès le départ.",
	},
	{
		question: "Qu'est-ce que l'automatisation peut faire pour mon cabinet?",
		answer:
			"Collecte de documents, accueil de nouveaux clients, rappels d'échéances, saisie de données, traitement de documents par IA — des heures récupérées chaque semaine, sans intervention manuelle.",
	},
];

export type CaseStudy = {
	slug: string;
	title: string;
	tag: string;
	challenge: string;
	solution: string;
	result: string;
	tech: string[];
	concept?: boolean;
	imageUrl: string;
	imageAlt: string;
};

export const caseStudies: CaseStudy[] = [
	{
		slug: "marche-ac",
		title: "Marchés Ahuntsic-Cartierville",
		tag: "Site vitrine",
		challenge:
			"L'organisme ne possédait aucun site web et aucun visibilité en ligne. Une bonne communication des promotions et dates importantes pour un marché d'été est crucial pour son bon fonctionnement. Le défi : centraliser le service clientèle.",
		solution:
			"Conception complète d'un nouveau site vitrine avec une architecture claire, un design soigné, un reactivité adapté au mobile, un formulaires de contact en ligne, un transfert de propriété et une configuration de l'hébergement. Le problème est résolu.",
		result:
			"Un plus grand traffic dans les marché grâce à la visibilité en ligne. Une réduction marquée des appels manuels grâce aux formulaires en ligne et image en ligne enfin à la hauteur de la mission de l'organisme.",
		tech: ["CMS", "Wix", "Référencement web", "Rédaction de contenu"],
		imageUrl: "/marcheac-hero.png",
		imageAlt: "Visualisation site web vitrine marcheac",
	},
	{
		slug: "application-web-sur-mesure",
		title: "Application web sur mesure",
		tag: "Application web en production",
		challenge:
			"Un besoin métier précis qu'aucun outil disponible sur le marché ne couvrait : il fallait construire une application sur mesure, fiable et déployable rapidement.",
		solution:
			"Architecture complète : interface utilisateur intuitive, logique métier propre, base de données structurée et déploiement en production. Code propre et documenté pour permettre l'évolution future.",
		result:
			"Application livrée en production et utilisée au quotidien. La capacité à concevoir une application complète — pas seulement un site — démontre une compétence technique que peu de fournisseurs généralistes possèdent.",
		tech: ["Next.js", "TypeScript", "Base de données", "Authentification"],
		imageUrl: "",
		imageAlt: "",
	},
	{
		slug: "concept-cabinet-comptable",
		title: "Concept — cabinet comptable",
		tag: "Démonstration ciblée",
		challenge:
			"Donner aux cabinets comptables une image concrète de ce que je peux livrer : un site moderne, un agent IA pour les questions fréquentes et une automatisation de la collecte de documents clients.",
		solution:
			"Maquette interactive d'un site de cabinet, intégrant un agent conversationnel pour la foire aux questions et un flux de collecte de documents automatisé (relances, dépôt sécurisé, accusé de réception).",
		result:
			"Concept présenté honnêtement comme une démonstration. Le but : faire vivre au prospect l'expérience exacte que ses propres clients auraient — du premier contact au dépôt des documents — avant même la rencontre.",
		tech: ["Next.js", "Agent IA", "Automatisation des formulaires", "Resend"],
		concept: true,
		imageUrl: "",
		imageAlt: "",
	},
];
