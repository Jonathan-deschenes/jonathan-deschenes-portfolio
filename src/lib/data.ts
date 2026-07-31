export type Problem = {
	title: string;
	desc: string;
	iconPath: string;
};

export const problems: Problem[] = [
	{
		title: "Site web vieillissant ou inexistant",
		desc: "Un site web inaccessible ou mal adapté vous fait perdre des clients potentiels régulièrement, ne laissez pas cela vous affecter.",
		iconPath: "M3 3h18v18H3z|M9 3v18M3 9h6",
	},
	{
		title: "Collecte de documents sans fin",
		desc: "Documents manquants ou dossiers incomplets, n'attendez pas après vos clients avec des délais interminable. Relancez automatiquement vos clients grâce aux automatisations.",
		iconPath:
			"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M8 13h8M8 17h8M8 9h2",
	},
	{
<<<<<<< HEAD
		title: "Tâches répétitives",
		desc: "Classement, saisie de données, accueil de nouveaux clients, etc. Bref, des processus manuels qui peuvent être rapidement automatisés.",
		iconPath: "M12 8v4l3 2|c-circle-9",
	},
	{
		title: "Prises de rendez-vous et rappels d'échéanciers",
		desc: "Laissez les clients prendre des rendez-vous eux-mêmes. De plus, des rappels automatisés changent la donne et optimisent votre temps.",
=======
		title: "Tâches répétitives qui grignotent du temps facturable",
		desc: "Classement, saisie de données, accueil de nouveaux clients, etc. Bref, des processus manuels qui vous coûtent des heures chaque semaine.",
		iconPath: "M12 8v4l3 2|c-circle-9",
	},
	{
		title: "Site web vieillissant",
		desc: "Un site qui donne une mauvaise première impression ou qui n'amène pas de nouveaux clients. Votre image en ligne mérite mieux.",
		iconPath: "M3 3h18v18H3z|M9 3v18M3 9h6",
	},
	{
		title: "Rappels d'échéances fiscales gérés à la main",
		desc: "Courriels écrits un à un, risque d'oubli, image peu professionnelle. Des rappels automatisés changent la donne et optimisent votre temps.",
>>>>>>> origin/production
		iconPath: "M3 4h18v18H3z|M16 2v4M8 2v4M3 10h18",
	},
];

export type Service = {
	title: string;
	desc: string;
	options: string[];
	iconPath: string;
};

export const services: Service[] = [
	{
		title: "Développement web et d'applications",
		desc: "Conception de sites web et d'applications sur mesure.",
		options: [
			"Accessibilité 24/7",
			"Design professionnel",
			"Référencement SEO",
			"Réactivité mobile",
		],
		iconPath: "M3 3h18v18H3z|M9 3v18M3 9h6",
	},
	{
		title: "Automatisation",
		desc: "Développement d'un système sur mesure pour faciliter vos tâches répétitives.",
		options: [
			"Optimisation du workflow",
			"Maintenance régulière",
			"Aucune interruption",
		],
		iconPath: "M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M5 21a7 7 0 0 1 14 0",
	},
	{
		title: "Intégration de l'IA",
		desc: "Automatiser vos processus efficacement grâce aux modèles performants de l'IA.",
		options: ["Modèle performant", "Réelle optimisation du temps", "Autonomie"],
		iconPath:
			"c-circle-4|M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19",
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
		title: "Rencontre",
		desc: "Rencontre gratuite de 30 minutes pour découvrir les besoins.",
	},
	{
		num: "02",
		title: "Planification",
		desc: "Début du projet et planification des échéanciers avec un objectif selon vos besoins.",
	},
	{
		num: "03",
		title: "Développement",
		desc: "Approbation de la maquette initiale, puis développement avec des révisions selon vous.",
	},
	{
		num: "04",
		title: "Déploiement",
		desc: "Livraison et transfert du projet aux clients. Ensuite, l'optimisation et la maintenance du projet sont nécessaires.",
	},
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
	{
<<<<<<< HEAD
=======
		question: "Qu'est-ce que l'automatisation peut faire pour mon cabinet?",
		answer:
			"Collecte de documents, accueil de nouveaux clients, rappels d'échéances, saisie de données, traitement de documents par IA, donc des heures récupérées chaque semaine, sans intervention manuelle.",
	},
	{
		question: "Combien coûte votre projet?",
		answer:
			"Chaque projet est unique. Après notre rencontre de 30 minutes, vous recevez une proposition écrite avec une portée, un prix et un échéancier fixes, sans aucune surprise en cours de route.",
	},
	{
>>>>>>> origin/production
		question: "Travaillez-vous à distance?",
		answer:
			"Oui, je travaille avec des entreprises partout au Québec. En personne, en rencontre en ligne, en courriel, aucun déplacement de votre part est requis.",
	},
	{
		question: "J'ai déjà un site web existant?",
		answer:
			"Aucun problème, je fais la refonte de votre site avec un design moderne et intuitif. Je m'occupe de la rédaction, du référencement et de la réactivité mobile.",
	},
	{
		question: "Qu'est-ce que l'automatisation peut faire pour mon entreprise?",
		answer:
			"Collecte de documents, accueil de nouveaux clients, rappels d'échéances, saisie de données, traitement de documents par IA, tout est automatisé sans aucun travail manuel de votre part.",
	},
	{
		question:
			"Comment assurer que mes automatisations restent 100% du temps efficace?",
		answer:
			"Même une fois le projet complété, il est possible de vous procurer le forfait de maintenance. Ce forfait vous assure que je m'occupe régulièrement des maintenances de votre système.",
	},
	{
		question: "Quels sont les délais typiques d'un projet?",
		answer:
			"Un site vitrine prend généralement de 2 à 4 semaines. Les projets d'automatisation et sur mesure peuvent varier, mais aucun projet ne prend plus d'un mois de développement.",
	},
	{
		question: "Combien coûte un projet?",
		answer:
			"Chaque projet est unique, après notre rencontre gratuite de 30min je vous envoie par écrit un document avec toutes les informations du projet. Si vous hésitez encore, demandez une soumission rapide et je vous réponds le plus rapidement possible.",
	},
	{
		question: "L'IA est-elle 100% fiable pour des tâches simples?",
		answer:
			"Bien que l'IA n'est jamais 100% fiable, avec une bonne conception et des mesures de validation bien programmées cette technologie reste très fiable (95-99%). Je m'assure pour chaque projet que chaque automatisation est bien testée et qu'elle retourne des résultats fiables et concrets.",
	},
	{
		question: "Comment l'IA peut me faire sauver du temps dans mon quotidien?",
		answer:
			"Des modèles d'intelligence artificielle légers, rapides et peu coûteux excellent dans des tâches simples comme le traitement de données.",
	},
];
