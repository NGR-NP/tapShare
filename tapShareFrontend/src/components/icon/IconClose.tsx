import { forwardRef } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const IconClose = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("h-4 w-4 text-black", className)}
        ref={ref}
        {...rest}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    );
  }
);

IconClose.displayName = "IconClose";

export default IconClose;

export const MotionCloseIcon = () => {
  const Icon = motion.create(IconClose);
  return (
    <Icon
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
    />
  );
};
