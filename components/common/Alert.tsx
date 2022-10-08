import React, { ForwardedRef } from "react";

interface Alert {
  close: () => void;
  open: () => void;
}

interface AlertProps {}

const Alert = React.forwardRef<Alert, AlertProps>((props, ref) => {
  const [close, setClose] = React.useState<boolean>(true);
  React.useImperativeHandle(ref, () => ({
    close() {
      setClose(true);
    },
    open() {
      alert(false);
    },
  }));

  return (
    <div
      className={`${
        !close ? "hidden" : null
      } absolute bottom-10 right-10 rounded-lg px-5 py-2 border max-w-[400px] bg-white shadow-xl ${null}`}
    >
      <button className="absolute bg-white right-5 text-zinc-500">close</button>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quasi
      dolor rerum ratione, eos magnam veniam nostrum ipsum et fugit cum
      reprehenderit a voluptates harum iste, totam animi ipsa dolorem?
    </div>
  );
});

Alert.displayName = "Alert";
export default Alert;
