import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles/App.css';
import { HomePage } from '../pages/home/ui/HomePage';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HomePage />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
