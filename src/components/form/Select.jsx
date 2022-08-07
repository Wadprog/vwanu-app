import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
// Custom dependencies
import Error from './Error';
import Select from '../Select';

const FormSelect = ({ name, items, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched } = useFormikContext();

  return (
    <>
      <Select
        items={items}
        onBlur={() => setFieldTouched(name)}
        onValueChange={(value) => setFieldValue(name, value)}
        {...otherProps}
      />

      <Error error={errors[name]} visible={touched[name]} />
    </>
  );
};

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default FormSelect;
