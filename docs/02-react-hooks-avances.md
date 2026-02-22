# Chapitre 2 : Les Hooks Classiques et React 19

Les Hooks permettent d'utiliser l'état et d'autres fonctionnalités de React sans avoir à écrire de classes.

## 1. `useEffect` : Les Effets Secondaires
`useEffect` sert à synchroniser votre composant avec un système externe (réseau réseau, DOM, abonnements).

```tsx
import { useEffect, useState } from 'react';

export const TitreDynamique = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // S'exécute après le rendu
    document.title = `Vous avez cliqué ${count} fois`;
  }, [count]); // Le tableau de dépendances : l'effet s'exécute uniquement si "count" change.

  return <button onClick={() => setCount(count + 1)}>+1</button>;
}
```
> [!WARNING]
> N'utilisez **pas** `useEffect` pour formater des données ou déclencher une action suite à un clic utilisateur. `useEffect` ne sert qu'à la *synchronisation*.

## 2. Performances : `useMemo` et `useCallback`
- `useMemo` : Met en cache le résultat d'un calcul coûteux.
- `useCallback` : Met en cache la définition d'une fonction pour éviter qu'elle ne soit recréée à chaque rendu.

## 3. Les Nouveautés de React 19 🔥

React 19 introduit des Hooks majeurs pour simplifier la vie des développeurs :

### Le Hook universel : `use`
`use` permet de lire la valeur d'une ressource (comme une Promesse ou un Contexte) directement pendant le rendu. Contrairement aux autres Hooks, `use` peut être appelé dans des blocs conditionnels (`if`).

```tsx
import { use } from 'react';

// Si fetchPosts retourne une Promesse :
function PostList({ postsPromise }) {
  // React va suspendre (suspend) ce composant jusqu'à ce que la promesse soit résolue
  const posts = use(postsPromise);
  
  return posts.map(post => <p>{post.title}</p>);
}
```
*(Note : Pour afficher un "chargement", ce composant doit être enveloppé dans un `<Suspense fallback={<Loader />}>`).*

### Les Actions asynchrones (`useTransition`)
Historiquement, gérer des états asynchrones (ex: afficher un 'spinner' pendant une mise à jour réseau) nécessitait beaucoup de `useState(isLoading)`. React 19 intègre ça nativement avec le concept d'**Action**.

```tsx
import { useState, useTransition } from 'react';

function UpdateName() {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      // isPending passe à 'true' pendant que cette fonction attend...
      await updateNameAPI(name);
      // isPending repasse à 'false' une fois fini
    });
  };

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Mise à jour..." : "Mettre à jour"}
      </button>
    </>
  );
}
```

---

> [!TIP]
> **Prochaine étape :** Les formulaires sont le nerf de la guerre. Découvrez comment React 19 et React Hook Form les gèrent dans [03-gestion-formulaires.md](./03-gestion-formulaires.md).
