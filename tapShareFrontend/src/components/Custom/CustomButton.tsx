import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ startIcon, endIcon, ...props }, _ref) => {
    return (
      <Button {...props}>
        {startIcon && <Slot className={cn("mr-2")}>{startIcon}</Slot>}
        {props.children}
        {endIcon && <Slot className={cn("ml-2")}>{endIcon}</Slot>}
      </Button>
    );
  }
);
CustomButton.displayName = "Button";

export { CustomButton };
