# React Dashboard with FSD Architecture

A modern, clean, and scalable React application built using **Vite**, **TypeScript**, and **Tailwind CSS**. This project demonstrates best practices in frontend development, leveraging a mock API (JSONPlaceholder) and strictly adhering to the **Feature-Sliced Design (FSD)** architectural methodology.

## 🚀 Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn UI (Radix UI)
- **State/Data Management**: TanStack Query (React Query) v5
- **HTTP Client**: Axios
- **Architecture**: Feature-Sliced Design (FSD)

## 🏗️ Architecture (Feature-Sliced Design)

This project is structured using the Feature-Sliced Design methodology, which promotes high cohesion, low coupling, and scalability. 

The `src/` directory is organized into the following layers:

*   **`app/`**: Application-wide settings, global styles, and the entry point (`App.tsx`, `main.tsx`).
*   **`pages/`**: Compositional layer to construct full views from entities and features (e.g., `HomePage.tsx`).
*   **`features/`**: User interactions and business logic orchestrations (e.g., `PostList.tsx`).
*   **`entities/`**: Business entities (e.g., `post/`). This includes the domain model types, API logic (`postsApi.ts`), React Query hooks (`queries.ts`), and basic UI representations (`PostCard.tsx`).
*   **`shared/`**: Reusable generic components, utilities, and configurations (e.g., `apiClient.ts`, Shadcn UI components).

## ✨ Key Features

- **Robust Data Fetching**: Utilizes Axios encapsulated within a custom API client, wrapped by TanStack Query for caching, retries, and loading/error state management.
- **Beautiful UI**: Incorporates custom-styled components inspired by Shadcn UI (`Card`, `Skeleton`, `Button`) for a sleek, modern aesthetic.
- **Developer Experience**: Includes `@tanstack/react-query-devtools` for deep insights into query states during development.

## 📚 Documentation & Roadmap (Français)

A comprehensive, step-by-step roadmap and documentation tailored for Beginner-to-Senior React Developers has been authored in French. You can find all the learning resources in the `docs/` folder:

1. [01 - Les Fondamentaux de React](./docs/01-react-fondamentaux.md)
2. [02 - Accéder au niveau supérieur avec React 19](./docs/02-react-hooks-avances.md)
3. [03 - L'Enfer des Formulaires (React Hook Form + Zod)](./docs/03-gestion-formulaires.md)
4. [04 - L'Architecture Feature-Sliced Design (FSD)](./docs/04-architecture-fsd.md)
5. [05 - L'Écosystème du Projet](./docs/05-ecosysteme.md)
6. [06 - La Roadmap vers l'Expertise Senior](./docs/06-roadmap-vers-senior.md)

##  scripts

In the project directory, you can run:

### `pnpm dev`
Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `pnpm build`
Compiles TypeScript and builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `pnpm lint`
Runs ESLint to catch errors and enforce code style.
