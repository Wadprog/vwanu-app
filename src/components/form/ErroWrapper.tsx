import React from "react";

import Error from "./Error";
const ErrorWrapper: React.FC<{
  error?: string;
  visible?: boolean;
  children: JSX.Element;
}> = (props): JSX.Element => {
  return (
    <>
      {props.children}
      <Error error={props.error || undefined} visible={props.visible} />
    </>
  );
};

export default ErrorWrapper;
