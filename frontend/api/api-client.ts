import axios from 'axios';
import { QueryClient, MutationCache } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

// add token to request headers to be sent on every use of api client. 
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.status === 401) {
            // token expired, log out user
            localStorage.removeItem('token');
            window.location.reload
        }
        return Promise.reject(error);
    }
);

// Create a new query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'offlineFirst', // use cache first, else fetch
            retry: (failureCount, error) => {
                if (!Object.hasOwn(error, 'response')) {
                    return false;
                }
                // auth errors or 404 errors should not be retried
                if ((error as any).response?.status === 401 || (error as any).response?.status === 404) {
                    return false;
                }
                if (failureCount < 3) {
                    return true;
                }
                return false;
            },
        },
    },
    mutationCache: new MutationCache({
        onSuccess: () => {
            queryClient.invalidateQueries(); // Invalidate all queries on success for refetch
        },
        onError: (error) => {
            console.log('Der opstod en fejl: ', error);
        },
    }),
});

// Create a new persister
const persister = createSyncStoragePersister({
    storage: localStorage,
});


export { apiClient, queryClient, persister };