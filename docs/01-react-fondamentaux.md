# Chapitre 1 : Les Fondamentaux de React

Bienvenue dans ce guide ! Si vous débutez avec React (surtout avec la version 19), vous devez maîtriser quelques concepts clés avant d'aller plus loin. React n'est pas un framework rigide, c'est une bibliothèque pour construire des interfaces utilisateur basées sur des composants.

## 1. Les Composants (Components)
Tout dans React est un composant. Un composant est une fonction JavaScript qui retourne du balisage (HTML imbriqué dans JS, qu'on appelle **JSX**).

```tsx
// Un composant simple
export const Button = () => {
  return <button>Cliquez-moi</button>;
}
```

**Règle d'or :** Un composant doit toujours commencer par une Majuscule.

## 2. Le JSX
Le JSX ressemble à du HTML, mais il est plus strict.
- Il doit fermer toutes les balises (ex: `<img />`).
- Il ne peut retourner qu'**un seul élément parent** (on utilise les fragments `<> ... </>` si besoin).
- Pour écrire du JavaScript à l'intérieur, on utilise les accolades `{}`.

## 3. Les Propriétés (Props)
Les *props* sont les arguments que l'on passe à un composant. Elles permettent de rendre un composant dynamique et réutilisable.

```tsx
interface UserCardProps {
  name: string;
  role: string;
}

export const UserCard = (props: UserCardProps) => {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.role}</p>
    </div>
  );
}

// Utilisation :
<UserCard name="Alice" role="Développeuse Front-end" />
```
> [!IMPORTANT]
> Les props sont **en lecture seule** (immuables). Un composant enfant ne doit *jamais* modifier ses propres props.

## 4. L'État Local (State) avec `useState`
Si les *props* sont passées de parent à enfant, l'**état** est la mémoire interne du composant. Dès que l'état change, React re-rend (réaffiche) le composant pour mettre à jour l'interface.

```tsx
import { useState } from 'react';

export const Counter = () => {
  // count : la valeur actuelle
  // setCount : la fonction pour mettre à jour la valeur
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Compteur : {count}
    </button>
  );
}
```

## 5. Le Rendu Déclaratif
En Vanilla JavaScript (JS classique), on modifie le DOM (la page web) à la main (ex: `document.getElementById('titre').innerText = 'Bonjour';`).
Avec React, on écrit le code de manière **déclarative**. On décrit à quoi l'interface doit ressembler en fonction de son *état*, et React s'occupe de mettre à jour le DOM quand l'état change.

---

> [!TIP]
> **Prochaine étape :** Une fois ces bases acquises, passez à [02-react-hooks-avances.md](./02-react-hooks-avances.md) pour découvrir les super-pouvoirs de React 19 (les Hooks).
