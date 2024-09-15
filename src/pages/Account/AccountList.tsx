import { useEffect, useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Button, Input } from "@nextui-org/react";

function AccountList() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    
  }, [counter]);

  return (
    <>
      <Breadcrumb
        pageName="Account"
        items={[{ name: "Dashboard", path: "/" }, { name: "Account" }]}
      />

      <p>counter {counter}</p>

      <Input defaultValue={counter.toString()}/>
      <Button onClick={() => setCounter((prev) => prev + 1)}>Click</Button>

    </>
  );
}

export default AccountList;
