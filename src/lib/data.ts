export type Problem = {
	title: string;
	desc: string;
	iconPath: string;
};

export const problems: Problem[] = [
	{
		title: "Collecte de documents clients",
		desc: "Relances manuelles par courriel, documents manquants, dossiers incomplets et des heures perdues qui pourraient être facturées.",
		iconPath:
			"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M8 13h8M8 17h8M8 9h2",
	},
	{
		title: "Tâches répétitives qui grignotent du temps facturable",
		desc: "Classement, saisie de données, accueil de nouveaux clients, etc. Bref,  des processus manuels qui vous coûtent des heures chaque semaine.",
		iconPath: "M12 8v4l3 2|c-circle-9",
	},
	{
		title: "Site web vieillissant",
		desc: "Un site qui donne une mauvaise première impression ou qui n'amène pas de nouveaux clients. Votre image en ligne mérite mieux.",
		iconPath: "M3 3h18v18H3z|M9 3v18M3 9h6",
	},
	{
		title: "Rappels d'échéances fiscales gérés à la main",
		desc: "Courriels écrits un à un, risque d'oubli, image peu professionnelle. Des rappels automatisés changent la donne et optimise votre temp.",
		iconPath: "M3 4h18v18H3z|M16 2v4M8 2v4M3 10h18",
	},
];

export type Service = {
	title: string;
	desc: string;
	options: string[]
	iconPath: string;
};

export const services: Service[] = [
	{
		title: "Développement web et d'application",
		desc: "Conception de site web et d'application sur mesure.",
		options: [],
		iconPath: "M3 3h18v18H3z|M9 3v18M3 9h6",
	},
	{
		title: "Automatisation",
		desc: "Collecte de documents clients, accueil de nouveaux clients, rappels d'échéances, des heures récupérées chaque semaine sans intervention manuelle.",
		options: [],
		iconPath: "M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M5 21a7 7 0 0 1 14 0",
	},
	{
		title: "Intégration de l'IA",
		desc: "Un agent qui répond aux questions fréquentes de vos clients, qualifie les prospects et traite les documents en portant une attention particulière à la confidentialité des données financières.",
		options: [],
		iconPath:
			"c-circle-4|M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19",
	}
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
		question: "Qu'est-ce que l'automatisation peut faire pour mon cabinet?",
		answer:
			"Collecte de documents, accueil de nouveaux clients, rappels d'échéances, saisie de données, traitement de documents par IA, donc des heures récupérées chaque semaine, sans intervention manuelle.",
	},
	{
		question: "Combien coûte votre projet?",
		answer:
			"Chaque projet est unique. Après notre rencontre de 30 minutes, vous recevez une proposition écrite avec une portée, un prix et un échéancier fixes avec aucune surprise en cours de route.",
	},
	{
		question: "Travaillez-vous à distance?",
		answer:
			"Oui. Je travaille avec des cabinets partout au Québec, en personne, en rencontre en ligne et par courriel. L'ensemble du processus peut se faire à distance, sans déplacement de votre part.",
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
];
