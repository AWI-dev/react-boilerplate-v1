import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { FileUploader } from "react-drag-drop-files";
import { Check, FileText, MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function SystemManagementDashboard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [btnLoader, setBtnLoader] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [hasSubLink, setHasSubLink] = useState(false);
  const [quantity, setQuantity] = useState(0);

  //#region reset values
  function resetValues() {
    setFile(null);
    setPreviewImage(null);
    setQuantity(0);
    setHasSubLink(false);
  }
  //#endregion

  useEffect(() => {
    if (!hasSubLink) {
      resetValues();
    } else {
      setQuantity(1);
    }
  }, [hasSubLink]);

  const handleChange = (file: any) => {
    setFile(file);
    setBtnLoader(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setTimeout(() => {
        setBtnLoader(false);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 0));
  };

  return (
    <>
      <Breadcrumb
        pageName={`System Management`}
        items={[
          { name: "Dashboard", path: `/system-management` },
          { name: "Manufacturing Operations System" },
        ]}
      />
      <Tabs aria-label="System Management">
        <Tab key="Module Management" title="Module Management">
          <Card>
            <CardBody>
              <div className="flex justify-end">
                <Button onPress={onOpen} className="bg-csPrimary text-white">
                  Create New Module
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="System Maintenance" title="System Maintenance">
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
      </Tabs>

      <Modal
        isDismissable={false}
        hideCloseButton
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <div className="font-body">
              <ModalHeader className="flex flex-col gap-1 text-md">
                Create New Module
              </ModalHeader>
              <Divider />
              <ModalBody>
                <FileUploader
                  className=""
                  children={
                    <div>
                      {previewImage ? (
                        <div className="w-full flex relative justify-center items-center">
                          <div className="relative h-auto w-48 rounded-lg border-1">
                            <div>
                              <img
                                src={previewImage}
                                alt="Preview"
                                className={`cursor-pointer max-h-48 h-48 w-48 rounded-lg ${
                                  btnLoader ? "opacity-50" : "opacity-100"
                                }`}
                              />
                              <Button
                                size="sm"
                                spinnerPlacement="end"
                                isLoading={btnLoader}
                                className=" absolute w-full !rounded-b-md bg-opacity-75 bg-white -mt-8 border-t-1 mb-1 rounded-none px-2"
                              >
                                <div className="text-xs flex justify-between w-full">
                                  <div className="flex items-center">
                                    <span className="-ml-3 w-24 truncate ">
                                      Browse File
                                    </span>
                                  </div>
                                  {btnLoader ? (
                                    <></>
                                  ) : (
                                    <div className="flex items-center">
                                      <Check className="text-white bg-success p-1 rounded-full" />
                                    </div>
                                  )}
                                </div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex relative  justify-center items-center h-auto w-full rounded-lg ">
                          <div className="border border-dashed border-cta  cursor-pointer max-h-48 h-48 w-48 rounded-lg">
                            <div className="py-10 px-2">
                              <div className="mb-2 flex justify-center items-center">
                                <FileText className="text-cta" />
                              </div>
                              <div className="text-xs text-center text-gray-400">
                                Drag & drop to upload image
                              </div>
                              <div className="my-2 text-center flex items-center justify-center">
                                <span className="border-t border-default-200 flex-grow"></span>
                                <span className="px-2 text-xs">Or</span>
                                <span className="border-t border-default-200 flex-grow"></span>
                              </div>
                              <Button
                                className="w-full rounded-md text-cta"
                                size="sm"
                              >
                                Browse File
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                  handleChange={handleChange}
                  multiple={false}
                  name="file"
                  types={["JPG", "JPEG", "PNG"]}
                />
                <div className="flex w-full gap-x-2">
                  <div className="basis-6/12">
                    <Input
                      isRequired
                      type="text"
                      size="sm"
                      label="Title"
                      className=""
                    />
                  </div>
                  <div className="basis-6/12">
                    <Input
                      isRequired
                      type="text"
                      size="sm"
                      label="Path"
                      className=""
                    />
                  </div>
                </div>
                <div className="flex w-full items-center gap-x-2">
                  <div className="basis-6/12">
                    <Switch
                      size="sm"
                      isSelected={hasSubLink}
                      onChange={(e) => {
                        setHasSubLink(e.target.checked);
                      }}
                    >
                      Has Sub-Link
                    </Switch>
                  </div>
                  <div className="basis-6/12">
                    <Input
                      isDisabled={!hasSubLink}
                      classNames={{
                        input: "text-center",
                      }}
                      type="text"
                      size="md"
                      value={quantity.toString()}
                      startContent={
                        <MinusIcon
                          className="cursor-pointer"
                          size={17}
                          onClick={handleDecrement}
                        />
                      }
                      endContent={
                        <PlusIcon
                          className="cursor-pointer"
                          size={17}
                          onClick={handleIncrement}
                        />
                      }
                    />
                  </div>
                </div>

                <Divider />
                <div className="max-h-52 overflow-y-auto">
                  {Array.from({ length: quantity }).map((_, index) => (
                    <div className="flex w-full gap-x-2 mb-2" key={index}>
                      <div className="basis-6/12">
                        <Input
                          isRequired
                          type="text"
                          size="sm"
                          label={`Title ${index + 1}`}
                          className=""
                        />
                      </div>
                      <div className="basis-6/12">
                        <Input
                          isRequired
                          type="text"
                          size="sm"
                          label={`Path ${index + 1}`}
                          className=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  onPress={() => {
                    onClose(), resetValues();
                  }}
                >
                  Close
                </Button>
                <Button className="bg-csPrimary text-white" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
