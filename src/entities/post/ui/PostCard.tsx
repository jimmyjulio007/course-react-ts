import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import type { Post } from '../model/types';

interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    return (
        <Card className="h-full hover:shadow-md transition-shadow duration-200">
            <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                <CardDescription>Post #{post.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground line-clamp-3 text-sm">{post.body}</p>
            </CardContent>
        </Card>
    );
};

export const PostCardSkeleton = () => {
    return (
        <Card className="h-full">
            <CardHeader className="space-y-2">
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
            </CardContent>
        </Card>
    );
};
