import { usePosts } from '@/entities/post/model/queries';
import { PostCard, PostCardSkeleton } from '@/entities/post/ui/PostCard';

export const PostList = () => {
    const { data: posts, isLoading, isError, error } = usePosts();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50">
                <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Failed to load posts</h3>
                <p className="text-sm text-red-500/80 mb-4">{error?.message || 'Something went wrong while fetching data.'}</p>
                <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm cursor-pointer hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors" onClick={() => window.location.reload()}>
                    Try again
                </div>
            </div>
        );
    }

    if (!posts?.length) {
        return (
            <div className="text-center p-12 text-muted-foreground border rounded-lg bg-muted/20">
                No posts found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 12).map((post) => ( // only showing 12 posts to not overwhelm the UI
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};
