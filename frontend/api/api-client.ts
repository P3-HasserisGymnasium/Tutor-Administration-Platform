import axios from 'axios';
import { QueryClient, MutationCache } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true, // Ensure credentials (cookies) are sent with requests
});

// Intercept the response to handle token expiration
apiClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.status === 401) {
            // If the token is expired or invalid, log the user out
            // Handle logout by removing cookies or redirecting to login page
            // Example: window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Create a new query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'offlineFirst', // Use cache first, else fetch
            retry: (failureCount, error) => {
                if (!Object.hasOwn(error, 'response')) {
                    return false;
                }
                // Auth errors or 404 errors should not be retried
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
            console.log('Error occurred: ', error);
        },
    }),
});

// Create a new persister
const persister = createSyncStoragePersister({
    storage: localStorage,
});

export { apiClient, queryClient, persister };
