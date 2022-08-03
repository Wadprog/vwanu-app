import React from 'react';
import { useFormikContext } from 'formik';
// import PropTypes from 'prop-types'
import Checkbox from 'expo-checkbox';

function FormSwitch() {
  const { handleChange } = useFormikContext();
  return (
    <Checkbox value={false} onValueChange={handleChange} color="#4630EB" />
  );
}

// FormSwitch.propTypes = {
// name: PropTypes.string.isRequired,
// value: PropTypes.string.isRequired,
// otherProps: PropTypes.object,
// }
export default FormSwitch;
