# Chapitre 5 : L'Écosystème du Projet

React seul ne suffit pas pour créer une application d'entreprise robuste. Voici pourquoi nous utilisons ces outils spécifiques :

## 1. Vite (Remplaçant de Create React App / Webpack)
**Le problème :** Webpack (historique) empaquette tout votre code avant même de démarrer le serveur de test. Sur un gros projet, ça prend des dizaines de secondes.
**La solution :** Vite utilise le système de modules natifs des navigateurs (ES Modules). Le serveur démarre en *quelques millisecondes*. Seuls les fichiers que vous ouvrez sont compilés à la volée.
- **Commande clé :** `pnpm dev`
- **Configuration :** `vite.config.ts`

## 2. TanStack Query (ex-React Query)
**Le problème :** Gérer l'état du serveur (Les données récupérées de votre API) comme `isLoading`, `isError`, et les synchroniser avec Cache dans Redux ou des `useState` est lourd.
**La solution :** TanStack Query gère le cycle de vie de la donnée distante. Il met en cache (évite les requêtes doublons si vous passez d'une page à l'autre), permet le *refetch* en arrière-plan, et gère les mutations.

```tsx
// Exemple du projet :
const { data, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000 // La donnée reste "fraîche" pendant 5 minutes sans être re-téléchargée.
});
```

*Note : Appuyez sur la petite `🌺` en bas de l'écran (seulement en environnement de développement) pour ouvrir leurs DevTools incroyables.*

## 3. Tailwind CSS
**Le problème :** Inventer des noms de classes (BEM), avoir des milliers de lignes de CSS, et gérer la spécificité des balises mène souvent à des bugs visuels.
**La solution :** Tailwind met directement le style dans le HTML via des classes utilitaires (`p-4 bg-red-500 rounded-lg`). Vous codez les pixels sans jamais quitter votre composant `.tsx`. 
- **Tailwind v4** accélère drastiquement la compilation CSS et élimine beaucoup de configuration.

## 4. Shadcn UI
**Le problème :** Les bibliothèques de composants comme Material-UI ou Bootstrap dictent complètement le design et verrouillent les comportements. Il est difficile de les surcharger sans batailler avec des balises d'importance `!important`.
**La solution :** Shadcn **n'est pas** un Package NPM complet. C'est du "Copy-Paste". Lorsque vous exécutez `pnpm dlx shadcn@latest add button`, son code source s'installe physiquement dans `src/shared/ui/button.tsx`. Dès lors, le composant `<Button />` vous appartient à 100%. Vous pouvez altérer le code pour l'adapter aux besoins extravagants du design !

## 5. Axios
**Le problème :** L'API native `fetch()` requiert trop d'étapes manuelles (transformer en JSON, capter toutes les interférences HTTP, gérer les intercepteurs pour ajouter un token de sécurité).
**La solution :** Axios centralise toute la communication réseau (`import { apiClient }`). Il intercepte nativement les erreurs et parse le JSON en arrière-plan pour gagner du temps.

---

> [!TIP]
> **Prochaine étape :** Votre sac-à-dos technologique est plein ! Découvrez comment ces outils servent un objectif de haut niveau dans [06-roadmap-vers-senior.md](./06-roadmap-vers-senior.md).
