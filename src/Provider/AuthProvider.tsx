import { useEffect, useMemo } from "react";
import { API_BASE_URL, SHARED_KEY } from "../lib/constant";
import useCrud from "../hooks/useCrud";
import { TPrivateRouteProps } from "../lib/Type/systemTypes";
import { useAccessTokenState } from "../lib/StateManager/storeState";
import useEncryption from "../hooks/useEncryption";
import useCookie from "../hooks/useCookie";
import { useNavigate } from "react-router";
const AuthProvider = ({ children }: TPrivateRouteProps) => {
  const { GET } = useCrud();
  const navigate = useNavigate();
  const { setAccessToken, accessToken } = useAccessTokenState();
  const { encryptData, decryptData } = useEncryption(SHARED_KEY);
  const { setCookie, getCookie } = useCookie();

  const decryptedRefreshToken = useMemo(
    () => decryptData(getCookie("base")),
    [getCookie, decryptData]
  );
  useEffect(() => {
    const fetchToken = async () => {
      await GET(API_BASE_URL + `refresh_token/${decryptedRefreshToken}`).then(
        (res: any) => {
          try {
            if (res.message == "Unable to refresh token.") {
              navigate("/login");
              return;
            } else if (res.message == "signal is aborted without reason") {
              return;
            } else {
              setAccessToken(res.data.data.token.access_token);
              setCookie("base", encryptData(res.data.data.token.refresh_token));
            }
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
