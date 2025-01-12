import { SWRConfiguration } from "swr";

export const swrConfig: SWRConfiguration = {
  // Revalidate data every 5 seconds in the background
  refreshInterval: 5000,

  // Keep data in cache for 5 minutes even if component is unmounted
  dedupingInterval: 300000,

  // Retry failed requests 3 times with exponential backoff
  errorRetryCount: 3,

  // Don't revalidate on focus for certain routes
  revalidateOnFocus: false,

  // Don't revalidate on reconnect
  revalidateOnReconnect: false,

  // Keep previous data when fetching new data
  keepPreviousData: true,

  // Custom comparison function to determine if data has changed
  compare: (a, b) => {
    // If both are arrays, compare lengths and content
    if (Array.isArray(a) && Array.isArray(b)) {
      return (
        a.length === b.length &&
        a.every(
          (item, index) => JSON.stringify(item) === JSON.stringify(b[index])
        )
      );
    }
    // For objects and other types, use strict equality
    return a === b;
  },
};
