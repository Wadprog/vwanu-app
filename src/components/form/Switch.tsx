import React from "react";
import { useFormikContext } from "formik";
// import PropTypes from 'prop-types'
import Checkbox from "expo-checkbox";

interface Props {
  name: string;
  value?: boolean;
}
const Switch: React.FC<Props> = ({ value = false, name }) => {
  const { handleChange } = useFormikContext();
  return (
    <Checkbox
      value={value}
      onValueChange={() => handleChange(name)}
      color="#4630EB"
    />
  );
};

// FormSwitch.propTypes = {
// name: PropTypes.string.isRequired,
// value: PropTypes.string.isRequired,
// otherProps: PropTypes.object,
// }
export default Switch;
