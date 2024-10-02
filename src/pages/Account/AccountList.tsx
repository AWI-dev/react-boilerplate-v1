import { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Button, Input } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { TAuthProps } from "../../lib/Type/systemTypes";
import { API_BASE_URL } from "../../lib/constant";
import useCrud from "../../hooks/useCrud";
import useDataFetcher from "../../hooks/useDataFetcher";

function AccountList() {
  // const { data: dataList } = useDataFetcher(`${API_BASE_URL}products`);

  const [counter, setCounter] = useState(0);
  const { POST } = useCrud();

  const initialFormState: TAuthProps = {
    email: "",
    password: "",
  };
  const { handleInputChange, createFormData } =
    useForm<TAuthProps>(initialFormState);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // setIsLoading(true);
    const data = createFormData();
    console.log("data", data);
    await POST(API_BASE_URL + "login", data).then((res: any) => {
      console.log("res", res);
      try {
        const response = fetch(API_BASE_URL + "refresh_token");
        const data = response;
        console.log("data", data);

        // setAccessToken(data.accessToken);
      } catch (error) {
        console.error(error);
      }
    });
  };

  
  return (
    <>
      <Breadcrumb
        pageName="Account"
        items={[{ name: "Dashboard", path: "/" }, { name: "Account" }]}
      />

      <p>counter {counter}</p>

      <Input defaultValue={counter.toString()} />
      <Button onClick={() => setCounter((prev) => prev + 1)}>Click</Button>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <Input
            isRequired
            type="text"
            label="Email"
            className="mt-4 md:mt-0"
            size="sm"
            name="email"
            onChange={handleInputChange}
          />
          <Input
            maxLength={21}
            isRequired
            type="password"
            label="Password"
            name="password"
            className="mt-4 md:mt-0"
            size="sm"
            onChange={handleInputChange}
          />
        </div>

        <Button
          type="submit"
          variant="solid"
          className="bg-cta hover:opacity-80 w-28 text-white font-body"
        >
          Login
        </Button>
      </form>
    </>
  );
}

export default AccountList;
