# Jonathan Deschênes — Portfolio (Étape 1)

Site monopage ciblé pour les **cabinets comptables et tenue de livres**.
Implémente le design `Jonathan Deschenes.dc.html` (Claude Design) et le cahier
des besoins du `CLAUDE.md` racine.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS 4
- TypeScript 5
- Resend (courriels transactionnels)
- Zod (validation)
- Cal.com (réservation embarquée)
- Vercel (hébergement recommandé)

## Démarrage

```bash
npm install
cp .env.local.example .env.local   # remplir les valeurs
npm run dev                         # http://localhost:3000
```

## Variables d'environnement

Voir `.env.local.example`. Sans `RESEND_API_KEY`, les routes API
fonctionnent en « dry-run » (validation OK, aucun courriel envoyé) — utile
pour le développement local.

## Structure

```
src/
  app/
    page.tsx              # SPA principale (toutes les sections)
    rendez-vous/          # Calendrier Cal.com embarqué
    soumission/           # Formulaire de soumission détaillé
    contact/              # Contact général
    confidentialite/      # Politique + mentions légales
    realisations/[slug]/  # Études de cas (statiques)
    api/                  # quote / contact / booking
    sitemap.ts            # Sitemap auto
    robots.ts             # Robots auto
  components/             # SiteHeader, SiteFooter, Faq, formulaires, etc.
  lib/                    # data.ts, email.ts, validation.ts, site.ts
public/og.svg             # Image d'aperçu social
```

## Branches Git

- `developpement` — branche de travail (commits réguliers)
- `production` — branche déployée (uniquement par PR/merge depuis `developpement`)

## SEO

- Métadonnées par page (`generateMetadata`)
- JSON-LD : `ProfessionalService`, `WebSite`, `FAQPage`, `Article`
- `sitemap.xml` et `robots.txt` générés automatiquement
- Open Graph image (`/og.svg`)
- `hreflang` français-Canada (préparé pour version EN à venir)

## Workflow contacts (Temps 1)

Chaque formulaire :
1. Valide les données (Zod) et filtre les bots (honeypot)
2. Envoie un courriel de confirmation au visiteur (Resend)
3. Envoie une notification interne avec les détails

Pour la **réservation Cal.com**, configurer un webhook → `/api/booking` afin
de profiter du même workflow Temps 1 (confirmation + notif interne) en plus
de l'invitation calendrier native de Cal.com.

## Conformité

- HTTPS via Vercel
- Politique de confidentialité Loi 25 du Québec
- Honeypot anti-spam sur tous les formulaires
- Aucun cookie de suivi par défaut

## Déploiement

1. Vercel → importer le dépôt
2. Brancher `production` au déploiement principal
3. Variables d'env (production) :
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_BOOKING_URL`
   - `RESEND_API_KEY`
   - `RESEND_FROM`
   - `NOTIFY_EMAIL`
4. Vérifier le domaine dans Resend (DKIM/SPF/DMARC)

## À faire (post-étape 1)

- Vraies captures d'écran des réalisations (remplacer placeholders)
- Photo professionnelle (section « À propos »)
- Domaine personnalisé + fiche Google Business
- Articles de blogue (MDX dans `content/`)
- Démonstration d'agent IA conversationnel
- Version anglaise (i18n)
