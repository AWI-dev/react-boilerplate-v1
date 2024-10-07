import { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Button, Input } from "@nextui-org/react";
import useForm from "../../hooks/useForm";
import { TAuthProps } from "../../lib/Type/systemTypes";
import { API_BASE_URL } from "../../lib/constant";
import useCrud from "../../hooks/useCrud";
import useDataFetcher from "../../hooks/useDataFetcher";

function AccountList() {
  const { data: dataList } = useDataFetcher(`${API_BASE_URL}products`,true);
  const { POST } = useCrud();


  const baseFields = [
    { uid: "area", label: "AREA" },
    { uid: "name", label: "STORE" },
    { uid: "ros", label: "ROS" },
    { uid: "category_name", label: "CATEGORY" },
    { uid: "sub_category_name", label: "SUB CATEGORY" },
    { uid: "sub_sub_category_name", label: "SPECIFICS" },
    { uid: "sub_sub_deviation_name", label: "DEVIATION DETAILS" },
    { uid: "remarks", label: "REMARKS", sortable: false },
    { uid: "year", label: "YEAR", sortable: false },
    { uid: "wave", label: "WAVE", sortable: false }
  ];
  
  const initialColumns = baseFields.map(field => field.uid);
  
  const columns = [
    { name: "ID", uid: "id", sortable: true },
    ...baseFields.map(field => ({
      name: field.label,
      uid: field.uid,
      sortable: field.sortable !== false
    }))
  ];
  

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
          <li key={item.id}>{item.name} - {item.detail}</li>
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
