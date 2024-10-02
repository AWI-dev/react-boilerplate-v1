
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useAccessTokenState } from "../lib/StateManager/storeState";
const { accessToken } = useAccessTokenState();

const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const result = await response.json();
  return result.data;
};
const useDataFetcher = (endpoint: string) => {
  const [pollingEnabled, setPollingEnabled] = useState(true);
  const { data, error } = useSWR(endpoint, (endpoint) => fetcher(endpoint), {
    refreshInterval: pollingEnabled ? 8000 : 0,
  });

  useEffect(() => {
    return () => setPollingEnabled(false);
  }, []);
  return { data, isLoading: !data && !error, error };
};

export default useDataFetcher;
