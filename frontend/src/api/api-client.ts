import axios, { AxiosError } from "axios";
import { QueryClient, MutationCache } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// Create an Axios instance
const apiClient = axios.create({
	baseURL: "http://localhost:8080",
	withCredentials: true, // Ensure credentials (cookies) are sent with requests
});

// Intercept the response to handle token expiration
apiClient.interceptors.response.use(
	function (response) {

		response.headers['Access-Control-Allow-Origin'] = '*';
		response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
		response.headers['Access-Control-Allow-Headers'] = 'Content-Type: application/json, Accept: application/json, Authorization';

		return response;
	},
)

// Create a new query client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: "offlineFirst", // Use cache first, else fetch
			retry: (failureCount, error) => {
				if (!Object.prototype.hasOwnProperty.call(error, "response")) {
					return false;
				}
				// Auth errors or 404 errors should not be retried
				if (
					(error as AxiosError).response?.status === 401 ||
					(error as AxiosError).response?.status === 404
				) {
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
			console.log("Error occurred: ", error);
		},
	}),
});

// Create a new persister
const persister = createSyncStoragePersister({
	storage: localStorage,
});

export { apiClient, queryClient, persister };
