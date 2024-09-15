import Breadcrumb from "../../components/common/Breadcrumb";

function AccountList() {
  return (
    <>
      <Breadcrumb
        pageName="Account"
        items={[
          { name: "Dashboard", path: "/" },
          { name: "Account" },
        ]}
      />
    </>
  );
}

export default AccountList;
