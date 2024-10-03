import useSWR from "swr";
import { useCallback } from "react";
import { useAuthHeaders } from "../lib/utils/getHeaders";

const useDataFetcher = (endpoint: string, isPollingEnabled: boolean) => {
  const { getHeaders } = useAuthHeaders();

  const fetcher = useCallback(async (url: string): Promise<any> => {
    const response = await fetch(url, {
      headers: getHeaders(),
    });
    const result = await response.json();
    return result.data;
  }, [getHeaders]);

  const { data, error } = useSWR(endpoint, fetcher, {
    refreshInterval: isPollingEnabled ? 1000 : 0,
  });

  return { data, isLoading: !data && !error, error };
};

export default useDataFetcher;
