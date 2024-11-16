import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

// Custom Dependencies
import Button, { BtnProps } from "../Button";

// eslint-disable-next-line react/prop-types
const SubmitBtn: React.FC<BtnProps> = ({ title, ...otherProps }) => {
  const { handleSubmit } = useFormikContext();

  // @ts-ignore
  return <Button title={title} onPress={handleSubmit} {...otherProps} />;
};

export default SubmitBtn;
