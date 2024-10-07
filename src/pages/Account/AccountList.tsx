import { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Button, Input } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { TAuthProps } from "../../lib/Type/systemTypes";
import { API_BASE_URL } from "../../lib/constant";
import useCrud from "../../hooks/useCrud";
import useDataFetcher from "../../hooks/useDataFetcher";
import useColumns from "../../hooks/useColumns";

function AccountList() {
  const { data: dataList } = useDataFetcher(`${API_BASE_URL}products`, true);
  const { POST } = useCrud();

  const baseFields = [
    { uid: "name", label: "Name", sortable: false },
    { uid: "detail", label: "DETAIL", sortable: false },
  ];

  const { initialColumns, columns } = useColumns(baseFields);


  console.log('columns', columns , 'initialColumns', initialColumns);
  
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
      <ul>
        {dataList?.map((item: any) => (
          <li key={item.id}>
            {item.name} - {item.detail}
          </li>
        ))}
      </ul>

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
