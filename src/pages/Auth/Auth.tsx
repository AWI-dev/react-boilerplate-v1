import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Logo from "../../components/common/Logo";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useCrud from "../../hooks/useCrud";
import { TAuthProps } from "../../lib/Type/systemTypes";
import useForm from "../../hooks/useForm";
import { API_BASE_URL, SHARED_KEY } from "../../lib/constant";
import sideImage from "../../assets/images/vlc.png";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { useAccessTokenState } from "../../lib/StateManager/storeState";
import useEncryption from "../../hooks/useEncryption";
import useCookie from "../../hooks/useCookie";

function Auth() {
  //#region Intialize
  const initialFormState: TAuthProps = {
    email: "",
    password: "",
  };
  //#endregion

  //#region State
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { setAccessToken } = useAccessTokenState();
  //#endregion

  //#region Hooks
  const navigate = useNavigate();
  const { POST, GET } = useCrud();
  const { showToast } = useToast();
  const { encryptData, decryptData } = useEncryption(SHARED_KEY);
  const { setCookie, getCookie } = useCookie();

  const { handleInputChange, createFormData } =
    useForm<TAuthProps>(initialFormState);

  //#endregion

  //#region Function
  function setToken(access_token: string, refresh_token: string) {
    setAccessToken(access_token);
    setCookie("base", encryptData(refresh_token));
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const data = createFormData();
    await POST(API_BASE_URL + "login", data).then((res: any) => {
      try {
        setIsLoading(false);
        if (res.success) {
          showToast(res.message, "success");
          setToken(res.data.token.access_token, res.data.token.refresh_token);
          console.log("refresh_token", res.data.token.refresh_token);
          navigate("/accounts");
        } else {
          showToast(res.message, "error");
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    });
  };
  const handleRefreshToken = async () => {
    const decryptedRefreshToken = decryptData(getCookie("base"));
    await GET(API_BASE_URL + `refresh_token/${decryptedRefreshToken}`).then(
      (res: any) => {
        try {
          setIsLoading(false);
          setToken(res.data.token.access_token, res.data.token.refresh_token);
        } catch (error) {
          setIsLoading(false);
          console.error(error);
        }
      }
    );
  };
  //#endregion

  //#region

  //#endregion

  return (
    <div className="xl:flex min-h-screen bg-white">
      <div className="basis-7/12">
        <div className="flex h-screen max-h-screen items-center justify-center">
          <div className="flex flex-col items-center w-96 md:w-[48%]">
            <Logo className="w-14" />
            <div className="text-csPrimary text-3xl 3xl:text-5xl font-bold font-header mt-2 mb-10">
              AWI Solutions
            </div>
            <Button
              onClick={handleRefreshToken}
              type="submit"
              className="bg-cta text-white py-6"
            ></Button>
            <Card radius="sm" fullWidth>
              <CardBody className="p-10 w-full py-10">
                <div className="font-body text-xl font-bold text-start mb-10">
                  Welcome Back!
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="font-body flex flex-col gap-y-5">
                    <Input
                      autoComplete="false"
                      autoFocus
                      size="md"
                      type="text"
                      label="Email"
                      isRequired
                      name="email"
                      onChange={handleInputChange}
                    />
                    <Input
                      isRequired
                      autoComplete="false"
                      label="Password"
                      name="password"
                      endContent={
                        <button
                          tabIndex={0}
                          className="my-2"
                          type="button"
                          onClick={() => {
                            setIsVisible(!isVisible);
                          }}
                        >
                          {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      onChange={handleInputChange}
                    />
                    <div className="flex justify-end">
                      <Link
                        to="/password/forgot"
                        className="text-primary text-sm"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      className="bg-cta text-white py-6"
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
            <div className="text-sm text-gray-400 italic mt-10 font-header">
              © Copyright 2024. AWI Solutions. All rights reserved.
            </div>
          </div>
        </div>
      </div>
      <div className="basis-5/12 hidden xl:block">
        <div className="h-screen max-h-screen relative">
          <img className="object-fill w-full h-full" />
          <div className="absolute top-0 left-0 w-full h-full bg-csSecondary opacity-60"></div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
