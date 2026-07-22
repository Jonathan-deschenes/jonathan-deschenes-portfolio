// Bloc de crédibilité sous la pochette vidéo du hero : ancre la vidéo et comble
// l'espace de la colonne de droite. Purement présentational (composant serveur).
const stats: { value: string; label: string }[] = [
	{ value: "3+ ans", label: "d'expérience" },
	{ value: "100%", label: "sur mesure" },
	{ value: "Satisfaction", label: "garantie" },
];

export default function HeroCredibility({
	className = "",
}: {
	className?: string;
}) {
	return (
		<div className={className}>
			{/* Bandeau : avatar + nom/rôle + disponibilité */}
			<div className='mt-4 flex items-center gap-3'>
				<div
					className='flex-none w-11 h-11 rounded-full bg-brand text-white grid place-items-center font-bold text-body-sm'
					aria-hidden
				>
					JD
				</div>
				<div className='min-w-0'>
					<div className='font-semibold text-body-sm leading-tight'>
						Jonathan Deschênes
					</div>
					<div className='text-caption text-muted leading-tight mt-0.5'>
						Développeur
					</div>
				</div>
				<div className='ml-auto flex-none inline-flex items-center gap-2 text-caption text-muted'>
					<span
						className='w-2 h-2 rounded-full bg-[#28c93f] animate-pulse'
						aria-hidden
					/>
					Disponible
				</div>
			</div>

			{/* Pastilles de statistiques */}
			<div className='mt-4 flex flex-wrap gap-2.5'>
				{stats.map((s) => (
					<span
						key={s.value}
						className='inline-flex items-center gap-1.5 border border-border rounded-full px-2 py-0.5 sm:px-3.5 sm:py-2 text-caption text-ink'
					>
						<b className='font-bold text-brand'>{s.value}</b> {s.label}
					</span>
				))}
			</div>
		</div>
	);
}
