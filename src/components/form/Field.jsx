import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import tw from '../../lib/tailwind';

import Input from '../Input';
import Error from './Error';

function FormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <Input
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <Error error={errors[name]} visible={touched[name]} style={tw`block`} />
    </>
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  otherProps: PropTypes.object,
};
export default FormField;
