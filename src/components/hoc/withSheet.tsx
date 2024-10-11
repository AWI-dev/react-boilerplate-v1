import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "@nextui-org/react";

type WithSheetProps = {
  triggerText?: string;
  title?: string;
  description?: string;
};

const withSheet = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: WithSheetProps & P) => (
    <Sheet>
      <SheetTrigger className="float-end mb-2">
        <div className="px-3 py-2 rounded-lg bg-success text-white ">{props.triggerText || "Open"}</div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{props.title || "Default Title"}</SheetTitle>
          <SheetDescription>
            {props.description}
          </SheetDescription>
        </SheetHeader>
        <WrappedComponent {...props} />
      </SheetContent>
    </Sheet>
  );
};

export default withSheet;
