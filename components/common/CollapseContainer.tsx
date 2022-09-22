import React, { Children, ReactNode } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

export interface CollapseHandle extends React.HTMLProps<HTMLDivElement> {
  toggle: () => void;
  setOpen: () => void;
  setClose: () => void;
}

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label: string;
}

const CollapseContainer = React.forwardRef<CollapseHandle, CollapseProps>(
  (props, ref) => {
    const [_open, setOpen] = React.useState<boolean>(false);
    React.useImperativeHandle(ref, () => ({
      setOpen() {
        setOpen(true);
      },
      toggle() {
        setOpen(!_open);
      },
      setClose() {
        setOpen(false);
      },
    }));

    return (
      <div
        className={`${
          _open ? "h-fit" : "h-12"
        } border w-full self-start top-0 transition-all duration-150 overflow-clip flex flex-col gap-3 items-start px-8 rounded py-3 ${
          props.className
        }`}
      >
        <button
          onClick={() => setOpen(!_open)}
          className="flex items-center gap-3"
        >
          {props.label}{" "}
          {_open ? (
            <AiOutlineDown className="text-zinc-400" />
          ) : (
            <AiOutlineUp className="text-zinc-400" />
          )}{" "}
        </button>
        {props.children}
      </div>
    );
  }
);

CollapseContainer.displayName = "Collapse Container";

export default CollapseContainer;
