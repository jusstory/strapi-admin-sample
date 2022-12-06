import { QueryClient } from 'react-query';

function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // onError: queryErrorHandler,
        staleTime: 600000, // 10 minutes
        cacheTime: 900000, // 15 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        // onError: queryErrorHandler,
      },
    },
  });
}

const queryClient = generateQueryClient();

export { generateQueryClient, queryClient };
