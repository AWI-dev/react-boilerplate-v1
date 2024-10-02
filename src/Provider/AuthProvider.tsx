import { useEffect } from "react";
import { API_BASE_URL, SHARED_KEY } from "../lib/constant";
import useCrud from "../hooks/useCrud";
import { TPrivateRouteProps } from "../lib/Type/systemTypes";
import { useAccessTokenState } from "../lib/StateManager/storeState";
import useEncryption from "../hooks/useEncryption";
import useCookie from "../hooks/useCookie";

const AuthProvider = ({ children }: TPrivateRouteProps) => {
  const { GET } = useCrud();
  const { setAccessToken, accessToken } = useAccessTokenState();

  const { encryptData, decryptData } = useEncryption(SHARED_KEY);
  const { setCookie, getCookie } = useCookie();
  useEffect(() => {
    const fetchToken = async () => {
      const decryptedRefreshToken = decryptData(getCookie("base"));
      await GET(API_BASE_URL + `refresh_token/${decryptedRefreshToken}`).then(
        (res: any) => {
          try {
            setAccessToken(res.data.token.access_token);
            setCookie("base", encryptData(res.data.token.refresh_token));
          } catch (error) {
            console.error(error);
          }
        }
      );
    };
    if (!accessToken) {
      fetchToken();
    }
  }, [accessToken]);

  return <>{children}</>;
};

export default AuthProvider;
