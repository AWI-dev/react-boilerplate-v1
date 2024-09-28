import { useEffect } from "react";
import { API_BASE_URL } from "../lib/constant";
// import useCrud from "../hooks/useCrud";
import { TPrivateRouteProps } from "../lib/Type/systemTypes";
// import { useAccessTokenState } from "../lib/StateManager/storeState";

const AuthProvider = ({ children }: TPrivateRouteProps) => {
 /*  const { GET } = useCrud();
  const { setAccessToken } = useAccessTokenState(); */

  useEffect(() => {
    // setAccessToken("your-token-here");

     const fetchToken = async () => {
      try {
        const response = await fetch(API_BASE_URL + "refresh_token");
        const data = await response.json();
        console.log('data', data);
        
        // setAccessToken(data.accessToken);
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
