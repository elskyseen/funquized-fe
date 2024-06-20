import { QueryClient } from "@tanstack/react-query";

const query = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: 60000 * 5,
      staleTime: 60000 * 5,
      retry: 1,
    },
  },
});

export { query };
