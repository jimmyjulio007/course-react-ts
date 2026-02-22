# Chapitre 4 : La Feature-Sliced Design (FSD)

Lorsque les applications grandissent, le code finit très souvent en désordre (spaghetti). Les fichiers s'entremêlent, modifier un bouton sur une page casse les requêtes sur une autre page... 

C'est là qu'intervient la **Feature-Sliced Design (FSD)**. C'est la structure que l'on a adoptée sur ce projet.

## 1. Le Concept Fondamental : Cohésion et Couplage

En FSD, on découpe le projet selon les "domaines métiers" (features, entities) plutôt que par type de fichiers (`components/`, `hooks/`, `api/`). 

Il y a une **règle d'or directionnelle** : Un module inférieur ne peut jamais importer (dépendre) d'un module situé plus haut que lui. (La couche `shared/` ne peut pas importer la couche `pages/`).

## 2. L'Arbre des Couches (Du plus haut au plus bas)

### 1. `app/` (La configuration globale)
La couche supérieure. Elle configure l'application, les styles, le routeur (`react-router`), les providers (comme `QueryClientProvider` pour TanStack Query) et le magasin de configuration global.
**Il import TOUT le reste de l'application.**

### 2. `pages/` (L'assemblage final)
Les composants racines des vues de l'utilisateur (Ex: `HomePage`, `ProfilePage`). 
`HomePage` ne contient quasiment pas de logique de composants bruts, elle importe les "Features" ou "Widgets" et les dispose sur une grille visuelle.

### 3. `widgets/` (Les gros blocs, optionnel)
Composants complexes assemblant plusieurs entités et fonctionnalités. (Exemple: Une barre de navigation `Navbar` avec la photo profil `UserAvatar` et une barre de recherche `SearchFeature`).

### 4. `features/` (Les interactions utilisateur orientées "Actions")
La logique métier (cas d'utilisation complet). Ex: 
- Soumettre le formulaire d'inscription.
- Ajouter un article au panier.
- Notre `PostList.tsx` qui gère la fetching des données asynchrones des posts et les mappent sur une grille.

### 5. `entities/` (Les entités du Système / Domaines métiers)
Ce sont les blocs fondateurs "passifs" propres à un métier spécifique du client. Exemple, dans le dossier `entities/post/` de ce projet, on retrouve :
- `model/types.ts` : Comment définir (Typage TS) un Post.
- `api/postsApi.ts` : Les requêtes serveur exclusives relatives au Post.
- `ui/PostCard.tsx` : Le rendu d'une carte basique représentant de la donnée "Post", sans savoir *comment* la carte a été amenée ici (Pas du `useMutation` dedans !).

### 6. `shared/` (L'Agnosticisme / Les utilitaires partagés)
La couche fondamentale (la plus basse). Elle ne sait absolument rien de votre business.
- Config `apiClient` Axios.
- Les blocs de Design System (Boutons Shadcn, Skeleton, Card, Typography).
- Des hooks génériques (`useFormatDate`).
**Cette couche ne doit IMPORTER AUCUNE des couches ci-dessus.**

## Exemple d'application dans le projet

Regardez l'intégration `PostList` et comment elle respecte cette FSD :
1. `src/entities/post/api/postsApi.ts` définit la requête API.
2. `src/features/posts/ui/PostList.tsx` : Importe l'API depuis `entities` et exécute le hook asynchrone (Couche #4 utilise la Couche #5).
3. `src/pages/home/ui/HomePage.tsx` : Importe le `PostList` prêt à l'emploi et le lie à la page `<main>` de l'utilisateur (Couche #2 utilise la Couche #4).

---

> [!TIP]
> **Prochaine étape :** Familiarisez-vous avec les librairies clés listées dans le `package.json` afin de tirer le maximum de cette architecture dans [05-ecosysteme.md](./05-ecosysteme.md).
