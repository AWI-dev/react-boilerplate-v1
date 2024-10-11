import { useAccessTokenState } from "../StateManager/storeState";
import { useMemo } from "react";

export const useAuthHeaders = () => {
  const { accessToken } = useAccessTokenState();

  const headers = useMemo(() => ({
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  }), [accessToken]);

  return { getHeaders: () => headers };
};
