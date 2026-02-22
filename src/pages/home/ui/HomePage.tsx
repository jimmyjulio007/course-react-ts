import { PostList } from "@/features/posts/ui/PostList";

export const HomePage = () => {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8 space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        JSONPlaceholder <span className="text-primary">Dashboard</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        A clean implementation of a fake REST API using TanStack Query and Shadcn UI.
                    </p>
                </div>

                <PostList />
            </div>
        </main>
    );
};
