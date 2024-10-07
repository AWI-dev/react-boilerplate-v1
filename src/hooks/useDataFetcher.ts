import useSWR from "swr";
import { useCallback } from "react";
import { useAuthHeaders } from "../lib/utils/getHeaders";
import { useAccessTokenState } from "../lib/StateManager/storeState";

const useDataFetcher = (endpoint: string, isPollingEnabled: boolean) => {
  const { accessToken } = useAccessTokenState();
  const { getHeaders } = useAuthHeaders();
  const fetcher = useCallback(
    async (url: string): Promise<any> => {
      const response = await fetch(url, {
        headers: getHeaders(),
      });
      const result = await response.json();
      return result.data;
    },
    [getHeaders]
  );

  const shouldFetch = !!accessToken;

  const { data, error } = useSWR(
    shouldFetch ? endpoint : null, // Pass null if accessToken is not available
    shouldFetch ? fetcher : null,  // Disable fetcher if no accessToken
    {
      refreshInterval: isPollingEnabled ? 1000 : 0,
    }
  );

  return { data, isLoading: !data && !error, error };
};
export default useDataFetcher;