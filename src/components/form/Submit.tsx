import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

// Custom Dependencies
import Button from "../Button";
interface Props {
  title: string;
}

// eslint-disable-next-line react/prop-types
const SubmitBtn: React.FC<Props> = ({ title, ...otherProps }) => {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} {...otherProps} />;
};

SubmitBtn.prototype = {
  title: PropTypes.string.isRequired,
  otherProps: PropTypes.object,
};

export default SubmitBtn;
