import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const IconHome = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        viewBox="0 0 24 24"
        className={cn("size-4", className)}
        ref={ref}
        {...rest}
      >
        <g id="icons">
          <path
            id="Home"
            d="M23.6 10.3L13.2 2.4c-.7-.5-1.7-.5-2.5 0L.4 10.3c-.8.6-.4 1.7.6 1.7h1v6.1C2 20.2 3.8 22 6 22h2c.6 0 1-.4 1-1v-4.9c0-1.1.9-2.1 2-2.1h2c1.1 0 2 1 2 2.1V21c0 .5.4 1 1 1h2c2.2 0 4-1.8 4-3.9V12h1c.9 0 1.3-1.1.6-1.7z"
          ></path>
        </g>
      </svg>
    );
  }
);

IconHome.displayName = "IconHome";

export default IconHome;
