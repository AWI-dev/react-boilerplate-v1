import { Card, CardBody } from "@nextui-org/react";
import HRIS_ICON from "../../assets/Images/Icons/HRIS_IS_ICON.svg";
import VRS_ICON from "../../assets/Images/Icons/VRS_IS_ICON.svg";
import MGIOS_ICON from "../../assets/Images/Icons/MGIOS_IS_ICON.svg";
import MOS_ICON from "../../assets/Images/Icons/MOS_IS_ICON.svg";
import WMS_ICON from "../../assets/Images/Icons/WMS_IS_ICON.svg";
import ROS_IS_ICON from "../../assets/Images/Icons/ROS_IS_ICON.svg";
import { Link } from "react-router-dom";

export default function Systems() {

  //#region Type
  type TSystems = {
    title: string;
    isDisabled: boolean;
    icon: string;
    alt: string;
    link: string;
  };
  //#endregion

  const operationsData: TSystems[] = [
    {
      title: "Human Resource Information System",
      isDisabled: true,
      icon: HRIS_ICON,
      alt: "HRIS Icon",
      link: "/hris",
    },
    {
      title: "Vehicle Reservation System",
      isDisabled: true,
      icon: VRS_ICON,
      alt: "VRS Icon",
      link: "/vrs",
    },
    {
      title: "MG Inventory and Ordering System",
      isDisabled: true,
      icon: MGIOS_ICON,
      alt: "MGIOS Icon",
      link: "/mgios",
    },
    {
      title: "Restaurant Operations System",
      isDisabled: true,
      icon: ROS_IS_ICON,
      alt: "ROS Icon",
      link: "/",
    },
  ];

  const supplyChainData: TSystems[] = [
    {
      title: "Manufacturing Operations System",
      isDisabled: false,
      icon: MOS_ICON,
      alt: "MOS Icon",
      link: "/system-management-dashboard/mos",
    },
    {
      title: "Warehouse Management System",
      isDisabled: false,
      icon: WMS_ICON,
      alt: "WMS Icon",
      link: "/system-management-dashboard/wms",
    }
    
  ];
  //#region render
  const RenderSystems: React.FC<{ systemsData: TSystems }> = ({
    systemsData,
  }) => {
    return (
      <CardBody>
        <img
          src={systemsData?.icon}
          className="h-20 xl:h-40 my-4"
          alt={systemsData?.alt}
        />
        <div className="text-customPrimary font-medium text-sm xl:text-xl text-center pb-2">
          {systemsData?.title}
        </div>
      </CardBody>
    );
  };
  //#endregion

  return (
    <div className="p-4">
      <div className="font-body font-bold text-xl xl:text-4xl">
        Where do you want to go?
      </div>

      <div className="font-body text-md xl:text-2xl font-semibold mt-5 text-default-600">
        Supply Chain Management
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 py-5">
        {supplyChainData.map((item, index) => (
          <Card
            key={index}
            className="2xs:h-52 sm:!h-full"
            isDisabled={item.isDisabled}
          >
            {item.isDisabled ? (
              <RenderSystems systemsData={item} />
            ) : (
              <Link to={item.link}>
                <RenderSystems systemsData={item} />
              </Link>
            )}
          </Card>
        ))}
      </div>
      <div className="font-body text-md xl:text-2xl font-semibold mt-5 text-default-600">
        Operations
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 py-5">
        {operationsData.map((item, index) => (
          <Card
            key={index}
            className="2xs:h-52 sm:!h-full"
            isDisabled={item.isDisabled}
          >
            {item.isDisabled ? (
              <RenderSystems systemsData={item} />
            ) : (
              <Link to={item.link}>
                <RenderSystems systemsData={item} />
              </Link>
            )}
          </Card>
        ))}
      </div>

    </div>
  );
}
