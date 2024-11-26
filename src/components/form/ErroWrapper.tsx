import React from "react";
import { FormikErrors, FormikTouched } from "formik";

interface ErrorProps {
  errors: FormikErrors<any>;
  visible: FormikTouched<any>;
  name: string;
  children: JSX.Element;
}
import Error from "./Error";

const ErrorWrapper: React.FC<ErrorProps> = ({
  visible,
  errors,
  name,
  children,
}): JSX.Element => {
  return (
    <>
      {children}
      {/* <Error error={props.error || undefined} visible={props.visible} /> */}

      <Error
        error={typeof errors === "string" ? errors[name] : undefined}
        visible={typeof visible[name] === "boolean" ? visible[name] : false}
      />
    </>
  );
};

export default ErrorWrapper;
