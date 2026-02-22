import { apiClient } from '@/shared/api';
import type { Post } from '../model/types';

export const fetchPosts = () => {
    return apiClient.get<Post[]>('posts');
};
