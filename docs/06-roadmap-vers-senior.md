# Chapitre 6 : Roadmap vers l'Expertise (De Débutant à Senior)

Votre voyage Front-end ne s'arrête pas à afficher des divs colorées. Un développeur Senior Frontend ne se différencie pas uniquement par la *quantité* de code qu'il écrit, mais par **les problèmes qu'il est capable de diagnostiquer et d'anticiper**.

Voici votre parcours pour franchir chaque palier d'expertise sur React.

---

## Palier 1 : Débutant Actif (Comprendre ce projet)
*Vous savez écrire un composant, vous comprenez les props, et les state basiques.*
- [ ] **Maitriser le JSX et TypeScript :** Savoir typer les Props d'un composant statique.
- [ ] **Rendu conditionnel et Map :** Afficher une condition (`{isLoading && <Loader />}`) et boucler sur des tableaux.
- [ ] **Écouter le navigateur :** Savoir gérer les `onClick` et les formulaires basiques avec `onSubmit`.
- [ ] **Consommer une API :** Exécuter un `useEffect` au bon moment pour lancer la requête `apiClient.get()`.

---

## Palier 2 : Intermédiaire (Architecture et Optimisations de base)
*Vous savez que votre code marche, mais vous cherchez à ce qu'il reste propre.*
- [ ] **FSD & Centralisation :** Arrêter de répéter les variables. Sortir les requêtes API des composants (`src/entities/api`).
- [ ] **Gérer le cache asynchrone :** Gérer les chargements et erreurs sans le faire "à la main", en comprenant l'impact de `TanStack Query (React Query)`.
- [ ] **Maîtriser les Formulaires (La bête noire) :** Utiliser `react-hook-form` pour ne pas ré-rendre la page toute entière à chaque lettre tapée au clavier. Connecter un dictionnaire de validation comme `Zod`.
- [ ] **Routing 101 :** Comprendre l'évolution d'une Single Page Application avec des paramètres clairs dans l'URL (Ex: `/posts/14` ou avec TanStack Router).

---

## Palier 3 : Confirmé (Performance et Résilience)
*Où on commence à se soucier de l'expérience utilisateur et des "Edge cases" (Les cas marginaux).*
- [ ] **Hydratation & Rendu Concurrent (React 19) :** Comprendre les `<Suspense>` Bounds, `useTransition` et le serveur client (SSR via React Server Components).
- [ ] **Mémoïsation :** Savoir quand `useMemo` et `useCallback` sont *essentiels*, et surtout quand ils ralentissent *plus* qu'ils ne servent.
- [ ] **Gestion des États Globaux :** (Zustand, Redux). Savoir exactement quelles données méritent le `Context` (Thème, Auth) et lesquelles n'en ont pas besoin (Les posts).
- [ ] **Accessibilité (A11y) :** Les gens au clavier et derrière un liseuse vocale ont-ils accès à votre formulaire ? Shadcn inclut les bases `aria-labels` nativement, mais saurez-vous gérer les Focus Traps ?

---

## Palier 4 : L'expertise Senior Front-end 🔥
*Vous pensez "Système".*
- [ ] **Tests Unitaires et E2E :** Savoir rédiger les tests avec Vitest et RTL pour bloquer les dégradations silencieuses sur tous vos composants clés. Et écrire des parcours automatisés `Playwright`.
- [ ] **Performance Web Vitals (SEO) :** Surveiller le LCP (Largest Contentful Paint) ou le CLS (Cumulative Layout Shift). Comprendre la taille des bundles Javascript.
- [ ] **Intégration d'outillage :** Maîtriser le Terminal, l'implémentation de processus automatisés CI/CD (Github Actions / GitLab). Ne pas déployer une ligne de code si l'ESLint et le Prettier ne passent pas !
- [ ] **Encadrement CI/CD :** Rédiger des docs *comme ce README et ce dossier `docs/`*, aider les juniors avec des Code Reviews, repérer le couplage serré pour améliorer la robustesse du code.

> "Le code pour vous faire gagner de l'argent peut être écrit par n'importe qui. Le code optimisé, testé, modulaire, qui tiendra pendant 10 ans de modifications... est écrit par un Ingénieur Front-end."
