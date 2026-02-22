# Chapitre 3 : La Gestion des Formulaires

Les formulaires (Inputs, Textareas, Selects) sont la principale source d'interaction utilisateur. Gérer un état par champ (Input) avec des `useState` séparés devient vite un cauchemar (problèmes de performance et de re-render excessif).

## 1. La nouvelle API native de React 19 pour les formulaires

### Les "Actions" dans `<form>`
React 19 s'intègre profondément au tag `<form>`, permettant d'y attacher nativement une fonction asynchrone sans avoir besoin d'appeler `e.preventDefault()`.

```tsx
function FormulaireBasique() {
  const createUser = async (formData: FormData) => {
    // Cette fonction reçoit automatiquement les données du formulaire
    const name = formData.get("name");
    await submitToServer({ name });
  };

  return (
    // "action" n'est plus une adresse URL, mais une fonction asynchrone React
    <form action={createUser}>
      <input type="text" name="name" />
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

### Extraire l'état d'un formulaire : `useActionState`
Pour gérer le message d'erreur et la valeur de retour, on utilise le nouveau hook `useActionState()`.

```tsx
import { useActionState } from 'react';

async function myAction(previousState: string | null, formData: FormData) {
  const result = await postData(formData.get("nom"));
  if (!result.success) return "Erreur: Le nom est invalide";
  return "Succès!";
}

function Form() {
  const [errorOrSuccess, submitAction, isPending] = useActionState(myAction, null);

  return (
    <form action={submitAction}>
      <input type="text" name="nom" disabled={isPending} />
      <button type="submit" disabled={isPending}>Sauvegarder</button>
      {errorOrSuccess && <p>{errorOrSuccess}</p>}
    </form>
  );
}
```

### Le statut partagé avec `useFormStatus`
Si un bouton `<Submit>` se trouve profondément ancré en enfant dans votre composant `<form>`, il n'a normalement pas accès à l'état "chargement" du parent sans passer des props fastidieuses. `useFormStatus` lit l'état du formulaire parent le plus proche automatiquement.

```tsx
import { useFormStatus } from "react-dom";

function BoutonEnvoyerPersonnalise() {
  // Lit si l'action du <form> parent est en cours de traitement
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Enregistrement..." : "Envoyer"}
    </button>
  );
}
```

## 2. L'approche d'entreprise : React Hook Form + Zod

Bien que les nouveautés de React 19 gèrent superbement le cycle réseau asynchrone, elles ne règlent pas la validation complexe côté client. Comment s'assurer qu'un mot de passe contient au moins une majuscule, ou qu'une date de naissance indique une majorité légale ?

C'est pourquoi, dans les projets d'entreprise (comme cette architecture FSD), nous couplons :
1. **React Hook Form (RHF) :** Une librairie ultra-performante qui gère les champs en mode "non-contrôlés". Contrairement aux `useState` classiques, taper une lettre dans un champ ne provoque pas le re-rendu de toute la page.
2. **Zod :** Un outil de déclaration et de validation de schéma. Il permet de définir des règles strictes sur la donnée et de générer automatiquement les types TypeScript associés.

### Décorticage de l'approche

Voici l'anatomie complète d'un formulaire robuste et typé de bout en bout :

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Définition du Schéma (La source de vérité)
// Zod nous permet d'enchaîner des règles très précises avec des messages d'erreur personnalisés.
const userSchema = z.object({
  username: z.string().min(3, "Le nom doit comporter au moins 3 caractères"),
  email: z.string().email("Cet email est invalide"),
  password: z.string().min(8, "Le mot de passe doit faire 8 caractères minimum"),
});

// 2. Inférence du Type
// Grâce à TypeScript, nous extrayons le type exact du schéma Zod. Pas besoin de l'écrire à la main !
type FormValues = z.infer<typeof userSchema>;

export const InscriptionForm = () => {
  // 3. Initialisation du Contrôleur RHF
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(userSchema), // On connecte le "videur" Zod à RHF ici
  });

  // 4. La fonction de soumission
  // Elle ne s'exécutera QUE si toutes les règles Zod sont validées avec succès.
  const onSubmit = (data: FormValues) => {
    // "data" est garanti à 100% de correspondre à notre type "FormValues"
    console.log("Les données propres et validées :", data);
  };

  return (
    // handleSubmit agit comme un bouclier de validation avant de déclencher "onSubmit"
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nom d'utilisateur</label>
        {/* L'attribut {...register("nomDuChamp")} lie l'input à la mémoire interne de React Hook Form */}
        <input {...register("username")} placeholder="Nom" />
        {/* Si une erreur Zod concerne l'username, on l'affiche dynamiquement */}
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...register("email")} placeholder="Email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label>Mot de passe</label>
        <input type="password" {...register("password")} placeholder="***" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button type="submit">S'inscrire</button>
    </form>
  );
}
```

### Pourquoi c'est le standard de l'industrie ?
- **Typage de bout en bout :** Si on modifie le schéma Zod (ex: changement de `username` à `pseudo`), TypeScript hurlera automatiquement et signalera des erreurs dans toutes les fonctions (`onSubmit`) ou les champs (`register("pseudo")`) qui utilisaient l'ancienne version.
- **Performance :** L'utilisateur peut taper un mot de passe de 15 caractères, le composant `<InscriptionForm>` ne subit *aucun* re-rendu inutile. Le re-rendu n'a lieu qu'au moment d'afficher l'erreur ou la soumission de l'envoi.
- **Simplicité du code :** On se débarrasse complètement des `e.preventDefault()`, des gestions complexes du `onChange` manuel et des dizaines de variables `useState`. Zod gère la logique de validation métier et RHF gère l'orchestration DOM.

---

> [!TIP]
> **Prochaine étape :** Maintenant que vous maîtrisez la granularité de ces composants React, comment les assembler propement pour ne pas faire un "code spaghetti" ? Découvrez-le dans [04-architecture-fsd.md](./04-architecture-fsd.md).
